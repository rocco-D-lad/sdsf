/**
 * @Author: MocYang
 * @Email: 958292256@qq.com
 * @Date: 2022/1/10 18:02
 * @File: appSlice.js
 * @Description 1
 */

/*
Calling createEntityAdapter gives us an "adapter" object that contains several premade reducer functions, including:

addOne / addMany: add new items to the state
upsertOne / upsertMany: add new items or update existing ones
updateOne / updateMany: update existing items by supplying partial values
removeOne / removeMany: remove items based on IDs
setAll: replace all existing items

 */

import {
  createSlice,
  createSelector,
  createEntityAdapter
} from '@reduxjs/toolkit';

const EMPTY_ARRAY = [];

export const CATEGORY_TAB_SPACE = 1; // 空间目录
export const CATEGORY_TAB_OTHER = 2; // 第三方目录



// 组织目录
const categoryAdapter = createEntityAdapter();

const cameraAdapter = createEntityAdapter({
    selectId: camera => camera.camera_code
  }
);
const categoryOtherListAdapter = createEntityAdapter({
    selectId: category => category.region_id
  }
);

const cameraStatusAdapter = createEntityAdapter({
  selectId: camera => camera.camera_code
});

const appSlice = createSlice({
  name: 'app',
  initialState: {
    // 监控列表 - 空间数据库
    camera: cameraAdapter.getInitialState(),

    // 监控状态列表 - DIS 平台实时数据
    cameraStatusList: cameraStatusAdapter.getInitialState(),

    // 监控数据,完成加载
    cameraStatusReady: false,

    // 组织目录 - 内部的空间目录
    category: categoryAdapter.getInitialState(),

    // 从空间数据库中,获取到的第三方组织目录
    categoryOtherList: categoryOtherListAdapter.getInitialState(),

    // 目录类型
    categoryType: CATEGORY_TAB_SPACE,

    filter: {
      // 关键词
      keyword: '',

      // 在线
      online: false,

      // 离线
      offline: false
    },

    // 面板状态的同步。
    // 整体的左侧面板是否显示
    leftPanelVisible: true,

    // 整体的右侧面板是否显示
    rightPanelVisible: true,
    //
    cameraLoading:true
  },
  reducers: {
    setCategory: (state, action) => {
      // 将建筑的树形节点信息，转成列表结构 - 主要在于，方便对单节点更新属性。比如更新节点上的数量值，状态值等。
      const tree = action.payload;
      const categoryList = [];
      const iterateNode = (nodeArray) => {
        for (let child of nodeArray) {
          let childCopy = JSON.parse(JSON.stringify(child));
          let children =
            (childCopy.children && childCopy.children.slice());
          delete childCopy.children;

          if (child.id === 'SW' || children && children.length > 0) {
            categoryList.push(childCopy);
          } else if (children === undefined) {
            categoryList.push(childCopy);
          }
          if (children) {
            iterateNode(children);
          }
        }
      };
      iterateNode(tree);

      categoryAdapter.setAll(state.category, categoryList);
    },

    setCameraList: (state, action) => {
      let data = !Array.isArray(action.payload) ? [] : action.payload;
      cameraAdapter.setAll(state.camera, data);
    },

    setCameraStatusReady: (state, action) => {
      state.cameraStatusReady = action.payload;
    },

    // 更新单个设备的属性
    cameraUpdateOne: (state, action) => {
      cameraAdapter.updateOne(state.camera, {
        id: action.payload.camera_code,
        changes: action.payload
      });
    },

    setCameraStatusList: (state, action) => {
      let data = !Array.isArray(action.payload) ? [] : action.payload;
      cameraStatusAdapter.setAll(state.cameraStatusList, data);
    },

    setKeyword: (state, action) => {
      state.keyword = action.payload;
    },

    setFilter: (state, action) => {
      state.filter = {
        ...state.filter,
        ...action.payload
      };
    },

    setLeftPanelVisible: (state, action) => {
      state.leftPanelVisible = action.payload;
    },

    setRightPanelVisible: (state, action) => {
      state.rightPanelVisible = action.payload;
    },

    setCategoryOtherList: (state, action) => {
      categoryOtherListAdapter.setAll(state.categoryOtherList, action.payload.map(category => {
        return {
          ...category,
          children: []
        };
      }));
    },

    setCategoryType: (state, action) => {
      state.categoryType = action.payload;
    },
    setCameraLoading(state, { payload }) {
      state.cameraLoading = payload;
    }
  }
});

export const {
  setCategory,
  setFilter,
  setCameraList,
  cameraUpdateOne,
  setCameraStatusList,

  setLeftPanelVisible,
  setRightPanelVisible,

  setCategoryType,
  setCategoryOtherList,

  setCameraStatusReady,
  setCameraLoading
} = appSlice.actions;

export const {
  selectAll: selectCategory,
  selectById: selectCategoryById
} = categoryAdapter.getSelectors(store => store.app.category);


export const {
  selectAll: selectCamera,
  selectEntities: selectCameraEntities
} = cameraAdapter.getSelectors(store => store.app.camera);

export const {
  selectAll: selectCameraStatus,
  selectEntities: selectCameraStatusEntities
} = cameraAdapter.getSelectors(store => store.app.cameraStatusList);

export const {
  selectAll: selectCategoryOtherList
} = categoryOtherListAdapter.getSelectors(store => store.app.categoryOtherList);

export const selectFilter = (store) => store.app.filter;

export const selectLeftPanelVisible = (store) => store.app.leftPanelVisible;

export const selectRightPanelVisible = (store) => store.app.rightPanelVisible;

export const selectCategoryType = (store) => store.app.categoryType;

export const selectCameraStatusReady = (store) => store.app.cameraStatusReady

// 合并空间数据库和 DIS 实时数据
export const selectCombinedCameraList = createSelector(
  [
    selectCamera,
    selectCameraEntities,
    selectCameraStatus,
    selectCameraStatusEntities
  ],
  (cameraList, cameraEntities, cameraStatus, cameraStatusEntities) => {
    if (!cameraList || cameraList.length === 0) {
      return EMPTY_ARRAY;
    }

    if (!cameraStatus || cameraStatus.length === 0) {
      return cameraList.map(camera => ({
        ...camera,
        status: -1
      }));
    }

    return cameraList.map(camera => {
      let status = cameraStatusEntities[camera.camera_code]?.status;
      if (status === undefined) {
        status = -1; // -1 表示是实时的设备，在空间数据库中没有对于的设备（编码不同了，但是没有在物联网后台做同步）
      }
      return {
        ...camera,
        status: Number(status)
      };
    });
  }
);

// 列表模式下 - 监控模糊搜索
export const selectFilteredCameraList = createSelector(
  [selectCombinedCameraList, selectFilter],
  (cameraList, filter) => {
    if (!cameraList || cameraList.length === 0) {
      return EMPTY_ARRAY;
    }
    const {
      keyword,
      online,
      offline
    } = filter;

    let filteredCamera = cameraList;

    if (online) {
      filteredCamera = filteredCamera.filter(camera => !!camera.status);
    }

    if (offline) {
      filteredCamera = filteredCamera.filter(camera => !camera.status);
    }

    if (keyword) {
      filteredCamera = filteredCamera.filter(camera => camera.camera_name.indexOf(keyword) !== -1);
    }

    return filteredCamera;
  }
);

// 计算监控的总数据，离线，在线数量
export const selectCameraStatusCounts = createSelector(
  [selectCombinedCameraList],
  (cameraStatus) => {

    // 总数以实际的总数为准
    let total = cameraStatus.length;
    let offline = 0;
    let online = 0;
    let others = 0;

    cameraStatus.map(camera => {
      if (Number(camera.status) === 1) {
        online++;
      } else if (Number(camera.status) === 0) {
        offline++;
      } else {
        others++;
      }
    });

    return {
      total,
      offline,
      online,
      others
    };
  }
);

// 过滤出所有配置过投地的监控
export const selectVideoCastingList = createSelector(
  [selectCombinedCameraList],
  (cameraList) => {
    return cameraList.filter(camera => !!camera.camera_ground);
  }
);

// 过滤出所有配置收藏的设备
export const selectLikedDevices = createSelector(
  [selectCombinedCameraList],
  (cameraList) => {
    return cameraList.filter(camera => !!camera.is_like);
  }
);


export const isLeaf = node => node.camera_code !== undefined;

export const isCategory = (node) => {
  return node.camera_code === undefined;
};

export const isRoot = (node) => node.pid === node.id;

/**
 * 判断当前节点是否室内， 包含 室内节点、某楼栋节点，某楼层节点
 * @param node
 */
export const isIndoor = (node) => {
  return node && (node.id === "SN" || !!node.group_id);
};

// 准确匹配室内这个节点
export const isInDoorRootNode = (node) => node && node.id === "SN";

/**
 * 判断当前节点是否室外
 * @param node
 */
export const isOutDoor = (node) => {
  return node && node.id === "SW";
};

// 是否地下
export const isDX = (node) => node && node.id === "DX";

/**
 * 判断点选的节点是否楼栋节点
 * @param node
 */
export const isBuildingNode = (node) => {
  return node.build_name !== undefined && node.pid === "SN";
};

// 判断是否楼层节点
export const isFloorNode = (node) => {
  return node.floor_name !== undefined && node.build_id !== undefined;
};

// 从当前选中的节点，提取出楼栋 ID
export function getBuildIdFromCategory(node) {
  if (isOutDoor(node)) {
    return "";
  }
  // 有 build_name 的节点，说明就是直接的楼栋节点
  // 没有的话，就是楼层节点，取楼层节点的 build_id 属性
  return node.build_name ? node.group_id : node.build_id;
}

// 从当前选中的节点，提取出楼层 ID
export function getFloorIdFromCategory(node) {
  if (isOutDoor(node)) {
    return "";
  }
  // 楼层节点是直接有 build_id 属性的。所以这时的 floor_id 就是 group_id
  return node.build_id ? node.group_id : "";
}

// 是否地下这个根节点
export const isDXRootNode = (node) => node && node.id === "DX" && !node.group_id;

/**
 * 是否地下子节点
 * @param node
 */
export const isDXFloorNode = (node) => {
  return node && node.pid === 'DX' && node.group_id;
};


// 是否地下模型节点
export const isDXModelNode = (node) => {
  const dxModelReg = /^V\d+_DXS_B\d+_\d+(_\d+)?$/;
  return node && node.group_id && node.group_id.match(dxModelReg);
};


export const initCameraLoading = (store) => store.app.cameraLoading; //弹窗
export default appSlice.reducer;
