import React, { useState } from 'react'
import './index.scss'

const List = (props) => {
const {xunGengList} =props
  return (
    <div id="list-one">
      <div id="details-header">
        <div className="details-header-text">巡更点列表</div>
        <div className="details-header-img" onClick={props.onsize}>
          关闭
        </div>
      </div>
      <div id="details-context">
        <div className="details-context-header">
          <div className="details-context-kong">
            <ul className="details-context-ul">
              <li className="details-context-li">序号</li>
              <li>巡更点名称</li>
              <li>详情</li>
            </ul>
          </div>
        </div>
        <div className="details-foot">
          {xunGengList.map((val, index) => (
            <ul className="details-foot-ul">
              <li>
                <div className="details-foot-yi">1</div>
              </li>
              <li>
                <div className="details-foot-301">{val.positionName}</div>
              </li>
              <li>
                <div id="details-foot-button">
                  <span className="details-foot-button-img"></span>
                </div>
              </li>
            </ul>
          ))}
        </div>
      </div>
    </div>
  )
}
export default List
