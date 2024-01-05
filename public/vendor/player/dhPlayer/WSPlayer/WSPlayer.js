var __defProp = Object.defineProperty,
  __defNormalProp = (e, t, s) =>
    t in e
      ? __defProp(e, t, {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: s
        })
      : (e[t] = s),
  __publicField = (e, t, s) => (
    __defNormalProp(e, 'symbol' != typeof t ? t + '' : t, s), s
  )
!(function (e, t) {
  'object' == typeof exports && 'undefined' != typeof module
    ? t(exports)
    : 'function' == typeof define && define.amd
    ? define(['exports'], t)
    : t(
        ((e =
          'undefined' != typeof globalThis ? globalThis : e || self).WSPlayer =
          {})
      )
})(this, function (e) {
  'use strict'
  const t = {
      websocketPorts: {
        realmonitor: 'realmonitor-websocket',
        playback: 'playback-websocket',
        realmonitor_ws: '9100',
        playback_ws: '9320',
        realmonitor_wss: '9102',
        playback_wss: '9322'
      },
      errorVideoInfo: {
        101: '播放延时大于8s',
        201: '当前音频无法播放',
        202: 'websocket连接错误',
        203: '文件播放完成',
        401: '该用户无操作权限',
        404: '请求超时或未找到',
        405: '播放超时',
        406: '视频流类型解析失败，请检查通道配置',
        407: '请求超时',
        457: '时间设置错误',
        503: 'SETUP服务不可用',
        504: '对讲失败',
        701: 'Chrome版本低，请升级到最新的Chrome版本',
        702: 'Firefox版本低，请升级到最新的Firefox版本',
        703: 'Edge版本低，请升级到最新的Edge版本',
        defaultErrorMsg: '播放失败，请检查配置'
      },
      errorInfo: {
        101: '所选通道离线，无法播放',
        102: '查询实时预览rtsp失败',
        201: '所选通道未查询到录像文件',
        202: '查询录像文件列表失败',
        203: '查询录像rtsp失败',
        204: '$0倍速无法播放音频',
        301: '正在对讲，无法打开音频',
        302: '其他设备对讲中，无法开启音频',
        303: '其他设备对讲中，无法开启对讲',
        304: '查询对讲rtsp失败',
        305: 'http协议不支持对讲',
        501: '解码库未初始化完成，请稍后播放！',
        502: '解码库未初始化完成，请稍后对讲！',
        503: '请检查创建播放器时，播放器容器是否存在',
        601: '所操作播放器不存在',
        602: '所选播放器正在本地录像中，不可重复本地录像',
        603: '所选播放器未播放录像，不可本地录像',
        604: '所选播放器未开始本地录像，不可操作关闭本地录像',
        605: '时间跳转播放传参错误',
        606: '设置自适应拉伸传参错误',
        607: '实时预览不支持倍速播放',
        608: '需传入正确的$0方法：$1',
        701: '云台被用户$0锁定，无法操作',
        702: '控制云台三维定位失败$0',
        703: '控制云台$0$1失败$2',
        704: '控制云台方向失败$0'
      }
    },
    s = {
      Opera: 'Opera',
      Chrome: 'Chrome',
      Firefox: 'Firefox',
      Edge: 'Edge',
      IE: 'IE',
      Safari: 'Safari'
    }
  const i = {
    checkBrowser: function () {
      const e = (function () {
          const { userAgent: e } = navigator
          return e.includes('Edge')
            ? s.Edge
            : e.includes('Firefox')
            ? s.Firefox
            : e.includes('Chrome')
            ? s.Chrome
            : e.includes('Safari')
            ? s.Safari
            : e.includes('compatible') &&
              e.includes('MSIE') &&
              e.includes('Opera')
            ? s.IE
            : e.includes('Opera')
            ? s.Opera
            : ''
        })(),
        t =
          navigator.userAgent.includes('x64') ||
          navigator.userAgent.includes('x86_64')
            ? 64
            : 32,
        i = (function (e) {
          const { userAgent: t } = navigator
          return t.split(e)[1].split('.')[0].slice(1)
        })(e)
      let a = !1,
        r = 0
      switch (e) {
        case s.Chrome:
          ;(a = i >= 91 && 64 === t), (r = 701)
          break
        case s.Firefox:
          ;(a = i >= 97), (r = 702)
          break
        case s.Edge:
          ;(a = i >= 91), (r = 703)
          break
        default:
          a = 0
      }
      return { isVersionCompliance: a, browserType: e, errorCode: r }
    },
    validFunction: function (e) {
      return '[object Function]' === toString.call(e)
    },
    mergeObject: function e() {
      let t = {}
      for (let i = 0; i < arguments.length; i++) {
        let a = arguments[i]
        for (let i in a) {
          let r = a[i]
          ;(s = r),
            '[object Object]' === toString.call(s) ? (t[i] = e(r)) : (t[i] = r)
        }
      }
      var s
      return t
    },
    getDateFormatByUnderline: function () {
      return (function () {
        let e = new Date()
        return [
          e.getFullYear(),
          e.getMonth() + 1,
          e.getDate(),
          e.getHours(),
          e.getMinutes(),
          e.getSeconds(),
          e.getMilliseconds()
        ]
      })().join('_')
    },
    throttle: function (e, t) {
      let s
      return function () {
        s ||
          (e.apply(this, arguments),
          (s = setTimeout(() => {
            s = 0
          }, t)))
      }
    },
    debounce: function (e, t) {
      let s
      return function () {
        s && clearTimeout(s),
          (s = setTimeout(() => {
            e.apply(this, arguments), (s = 0)
          }, t))
      }
    }
  }
  class a {
    constructor(e) {
      ;(this.$el = null),
        (this.canvasElem = null),
        (this.videoElem = null),
        (this.domId = e.wrapperDomId + '-' + e.index),
        (this.wsPlayer = e.wsPlayer),
        (this.index = e.index),
        (this.firstTime = 0),
        (this.isAudioPlay = !1),
        (this.speed = 1)
    }
    initDom() {
      let e = this.getTemplate(),
        t = $(e)
      this.wsPlayer.$wrapper.append(t[0]),
        (this.$el = $('#' + this.domId)),
        (this.canvasElem = document.getElementById(this.canvasId) || {}),
        (this.ivsCanvasElem = document.getElementById(this.ivsCanvasId) || {}),
        (this.pztCanvasElem = document.getElementById(this.pztCanvasId) || {}),
        (this.videoElem = document.getElementById(this.videoId))
      let s = this.wsPlayer.config.showIcons || {}
      s.streamChangeSelect ||
        $('.select-container', this.$el).css({ display: 'none' }),
        this.setTalkIconShow(),
        s.audioIcon || $('.audio-icon', this.$el).css({ display: 'none' }),
        s.snapshotIcon || $('.capture-icon', this.$el).css({ display: 'none' }),
        s.localRecordIcon ||
          $('.record-icon', this.$el).css({ display: 'none' }),
        s.closeIcon || $('.close-icon', this.$el).css({ display: 'none' })
    }
    setTalkIconShow(e) {
      let { talkIcon: t } = this.wsPlayer.config.showIcons || {},
        s = location.protocol
      t && 'https:' === s && !e && 'real' === this.wsPlayer.type
        ? $('.talk-icon', this.$el).css({ display: 'block' })
        : $('.talk-icon', this.$el).css({ display: 'none' })
    }
    initMouseEvent() {
      this.$el.click((e) => {
        this.wsPlayer.setSelectIndex(this.index),
          this.$el.siblings().removeClass('selected').addClass('unselected'),
          this.$el.removeClass('unselected').addClass('selected')
      }),
        this.$el.dblclick((e) => {
          1 !== this.wsPlayer.options.maxNum &&
            (this.wsPlayer.$el.hasClass('fullplayer')
              ? this.wsPlayer.setPlayerNum(this.wsPlayer.beforeShowNum)
              : ((this.wsPlayer.beforeShowNum = this.wsPlayer.showNum),
                this.wsPlayer.setPlayerNum(1)),
            this.wsPlayer.setSelectIndex(this.index),
            this.$el.siblings().removeClass('selected').addClass('unselected'),
            this.$el.removeClass('unselected').addClass('selected'))
        }),
        $('.audio-icon', this.$el).click((e) => {
          if (this.wsPlayer.isTalking)
            this.wsPlayer.sendErrorMessage(this.isTalking ? '301' : '302')
          else {
            if (this.isAudioPlay)
              this.player.setAudioVolume(0),
                $(e.target).removeClass('on').addClass('off')
            else {
              if (this.player.isPlayback && 1 !== this.speed)
                return void this.wsPlayer.sendErrorMessage('204', {
                  insert: [this.speed]
                })
              this.closeOtherAudio(),
                this.player.setAudioVolume(1),
                this.resumeAudio(),
                $(e.target).removeClass('off').addClass('on')
            }
            this.isAudioPlay = !this.isAudioPlay
          }
        })
      $('.talk-icon', this.$el).click(
        i.throttle((e) => {
          'http:' !== location.protocol
            ? this.wsPlayer.isTalking && !this.isTalking
              ? this.wsPlayer.sendErrorMessage('303')
              : this.isTalking
              ? this.stopTalk()
              : (this.resumeAudio(),
                this.setAuthority(
                  {
                    channelCode: this.options.channelData
                      ? this.options.channelData.channelCode
                      : this.options.channelId,
                    function: '3'
                  },
                  () => {
                    ;(this.wsPlayer.talkIndex = this.index),
                      this.wsPlayer.__startTalk(this.options.channelData)
                  },
                  (e) => {
                    1103 === e.code &&
                      this.wsPlayer.sendErrorMessage(401, { type: 'talk' })
                  }
                ))
            : this.wsPlayer.sendErrorMessage('305')
        }, 2e3)
      ),
        $('.capture-icon', this.$el).click((e) => {
          let t = (this.options.channelData || {}).name || '抓图'
          this.setAuthority(
            {
              channelCode: this.options.channelData
                ? this.options.channelData.channelCode
                : this.options.channelId,
              function: '4'
            },
            () => {
              this.player.capture(`抓图_${t}_${i.getDateFormatByUnderline()}`)
            },
            (e) => {
              1103 === e.code &&
                this.wsPlayer.sendErrorMessage(401, { type: 'capture' })
            }
          )
        }),
        $('.close-icon', this.$el).click((e) => {
          this.close()
        }),
        $('.record-icon', this.$el).click((e) => {
          let t = (this.options.channelData || {}).name || '录像'
          this.isRecording
            ? ((this.isRecording = !1),
              this.player.stopLocalRecord(),
              $(e.target).removeClass('recording'))
            : 'playing' === this.status &&
              this.setAuthority(
                {
                  channelCode: this.options.channelData
                    ? this.options.channelData.channelCode
                    : this.options.channelId,
                  function: '8'
                },
                () => {
                  ;(this.isRecording = !0),
                    this.player.startLocalRecord(
                      `视频_${t}_${i.getDateFormatByUnderline()}`
                    ),
                    $(e.target).addClass('recording')
                },
                (e) => {
                  1103 === e.code &&
                    this.wsPlayer.sendErrorMessage(401, { type: 'record' })
                }
              )
        })
    }
    closeOtherAudio() {
      this.wsPlayer.playerList.forEach((e) => {
        e.isAudioPlay &&
          ((e.isAudioPlay = !1),
          e.player.setAudioVolume(0),
          $('.audio-icon', e.$el).removeClass('on').addClass('off'))
      })
    }
    setAuthority(e, t, s) {
      this.wsPlayer.fetchChannelAuthority
        ? this.wsPlayer
            .fetchChannelAuthority(e)
            .then((e) => {
              e.data.result && t()
            })
            .catch((e) => {
              s(e)
            })
        : t()
    }
    resumeAudio() {
      if (window.wsAudioPlayer) window.wsAudioPlayer.manualResume('fromTalk')
      else {
        let e = setInterval(() => {
          window.wsAudioPlayer &&
            (window.wsAudioPlayer.manualResume('fromTalk'), clearInterval(e))
        }, 100)
      }
    }
    setStatus() {}
    play() {
      this.player.playSpeed(this.speed),
        this.setStatus('playing'),
        $('.ws-record-play', this.wsPlayer.$el).css({ display: 'none' }),
        $('.ws-record-pause', this.wsPlayer.$el).css({ display: 'block' })
    }
    pause() {
      this.player.pause(),
        this.setStatus('pause'),
        $('.ws-record-pause', this.wsPlayer.$el).css({ display: 'none' }),
        $('.ws-record-play', this.wsPlayer.$el).css({ display: 'block' })
    }
    close(e = !1, t = !1) {
      this.player && window.wsPlayerManager.unbindPlayer(this.player.nPlayPort),
        this.wsPlayer.videoClosed(this.index, e),
        this.setDomVisible($('.play-pause-wrapper', this.$el), !1),
        (this.videoElem.style.display = 'none'),
        (this.canvasElem.style.display = 'none'),
        this.isTalking && !t && this.stopTalk(),
        (this.speed = 1),
        this.index === this.wsPlayer.selectIndex &&
          ('real' === this.wsPlayer.type
            ? !e && this.wsPlayer.setPtzChannel()
            : (this.wsPlayer.setTimeLine([]),
              this.wsPlayer.__setPlaySpeed(),
              $('.ws-record-play', this.wsPlayer.$el).css({ display: 'block' }),
              $('.ws-record-pause', this.wsPlayer.$el).css({
                display: 'none'
              }))),
        this.isRecording &&
          ((this.isRecording = !1),
          this.player.stopLocalRecord(),
          $('.record-icon', this.$el).removeClass('recording')),
        this.wsPlayer.config.openIvs && this.player && this.player.closeIVS(),
        this.spinner && this.spinner.stop(),
        this.player && this.player.stop(),
        this.player && this.player.close(),
        e || ((this.player = null), (this.options = null)),
        this.setStatus('closed')
    }
    setDomVisible(e, t) {
      e && e.css({ visibility: t ? 'visible' : 'hidden' })
    }
    updateAdapter(e, t = {}) {
      let s = t.width / t.height,
        i =
          'video' === (t.decodeMode || this.decodeMode)
            ? this.videoElem
            : this.canvasElem,
        a = i.parentNode
      t.decodeMode
        ? ((this.decodeMode = t.decodeMode),
          (this.width = t.width),
          (this.height = t.height))
        : (s = this.width / this.height)
      let r = '100%',
        l = '100%'
      if ('selfAdaption' === e) {
        let e = a.offsetHeight,
          t = a.offsetWidth,
          n = t / e
        s > n ? (l = t / s + 'px') : s < n && (r = e * s + 'px'),
          $(i).css({ width: r, height: l, 'object-fit': 'contain' }),
          $(this.ivsCanvasElem).css({
            width: r,
            height: l,
            'object-fit': 'contain'
          }),
          $(this.pztCanvasElem).css({
            width: r,
            height: l,
            'object-fit': 'contain'
          })
      } else $(i).css({ width: r, height: l, 'object-fit': 'fill' }), $(this.ivsCanvasElem).css({ width: r, height: l, 'object-fit': 'fill' }), $(this.pztCanvasElem).css({ width: r, height: l, 'object-fit': 'fill' })
      this.player &&
        ((this.ivsCanvasElem.width = i.offsetWidth),
        (this.ivsCanvasElem.height = i.offsetHeight),
        this.player.setIVSCanvasSize(i.offsetWidth, i.offsetHeight),
        (this.pztCanvasElem.width = i.offsetWidth),
        (this.pztCanvasElem.height = i.offsetHeight))
    }
  }
  var r =
      (globalThis && globalThis.__assign) ||
      function () {
        return (
          (r =
            Object.assign ||
            function (e) {
              for (var t, s = 1, i = arguments.length; s < i; s++)
                for (var a in (t = arguments[s]))
                  Object.prototype.hasOwnProperty.call(t, a) && (e[a] = t[a])
              return e
            }),
          r.apply(this, arguments)
        )
      },
    l = {
      lines: 12,
      length: 7,
      width: 5,
      radius: 10,
      scale: 1,
      corners: 1,
      color: '#000',
      fadeColor: 'transparent',
      animation: 'spinner-line-fade-default',
      rotate: 0,
      direction: 1,
      speed: 1,
      zIndex: 2e9,
      className: 'spinner',
      top: '50%',
      left: '50%',
      shadow: '0 0 1px transparent',
      position: 'absolute'
    },
    n = (function () {
      function e(e) {
        void 0 === e && (e = {}), (this.opts = r(r({}, l), e))
      }
      return (
        (e.prototype.spin = function (e) {
          return (
            this.stop(),
            (this.el = document.createElement('div')),
            (this.el.className = this.opts.className),
            this.el.setAttribute('role', 'progressbar'),
            o(this.el, {
              position: this.opts.position,
              width: 0,
              zIndex: this.opts.zIndex,
              left: this.opts.left,
              top: this.opts.top,
              transform: 'scale(' + this.opts.scale + ')'
            }),
            e && e.insertBefore(this.el, e.firstChild || null),
            (function (e, t) {
              var s = Math.round(t.corners * t.width * 500) / 1e3 + 'px',
                i = 'none'
              !0 === t.shadow
                ? (i = '0 2px 4px #000')
                : 'string' == typeof t.shadow && (i = t.shadow)
              for (
                var a = (function (e) {
                    for (
                      var t =
                          /^\s*([a-zA-Z]+\s+)?(-?\d+(\.\d+)?)([a-zA-Z]*)\s+(-?\d+(\.\d+)?)([a-zA-Z]*)(.*)$/,
                        s = [],
                        i = 0,
                        a = e.split(',');
                      i < a.length;
                      i++
                    ) {
                      var r = a[i].match(t)
                      if (null !== r) {
                        var l = +r[2],
                          n = +r[5],
                          o = r[4],
                          d = r[7]
                        0 !== l || o || (o = d),
                          0 !== n || d || (d = o),
                          o === d &&
                            s.push({
                              prefix: r[1] || '',
                              x: l,
                              y: n,
                              xUnits: o,
                              yUnits: d,
                              end: r[8]
                            })
                      }
                    }
                    return s
                  })(i),
                  r = 0;
                r < t.lines;
                r++
              ) {
                var l = ~~((360 / t.lines) * r + t.rotate),
                  n = o(document.createElement('div'), {
                    position: 'absolute',
                    top: -t.width / 2 + 'px',
                    width: t.length + t.width + 'px',
                    height: t.width + 'px',
                    background: d(t.fadeColor, r),
                    borderRadius: s,
                    transformOrigin: 'left',
                    transform:
                      'rotate(' + l + 'deg) translateX(' + t.radius + 'px)'
                  }),
                  h = (r * t.direction) / t.lines / t.speed
                h -= 1 / t.speed
                var p = o(document.createElement('div'), {
                  width: '100%',
                  height: '100%',
                  background: d(t.color, r),
                  borderRadius: s,
                  boxShadow: c(a, l),
                  animation:
                    1 / t.speed + 's linear ' + h + 's infinite ' + t.animation
                })
                n.appendChild(p), e.appendChild(n)
              }
            })(this.el, this.opts),
            this
          )
        }),
        (e.prototype.stop = function () {
          return (
            this.el &&
              ('undefined' != typeof requestAnimationFrame
                ? cancelAnimationFrame(this.animateId)
                : clearTimeout(this.animateId),
              this.el.parentNode && this.el.parentNode.removeChild(this.el),
              (this.el = void 0)),
            this
          )
        }),
        e
      )
    })()
  function o(e, t) {
    for (var s in t) e.style[s] = t[s]
    return e
  }
  function d(e, t) {
    return 'string' == typeof e ? e : e[t % e.length]
  }
  function c(e, t) {
    for (var s = [], i = 0, a = e; i < a.length; i++) {
      var r = a[i],
        l = h(r.x, r.y, t)
      s.push(r.prefix + l[0] + r.xUnits + ' ' + l[1] + r.yUnits + r.end)
    }
    return s.join(', ')
  }
  function h(e, t, s) {
    var i = (s * Math.PI) / 180,
      a = Math.sin(i),
      r = Math.cos(i)
    return [
      Math.round(1e3 * (e * r + t * a)) / 1e3,
      Math.round(1e3 * (-e * a + t * r)) / 1e3
    ]
  }
  const p = window.PlayerControl
  class y extends a {
    constructor(e) {
      super(e),
        (this.canvasId = `${this.domId}-livecanvas`),
        (this.ivsCanvasId = `${this.domId}-ivs-livecanvas`),
        (this.pztCanvasId = `${this.domId}-pzt-livecanvas`),
        (this.videoId = `${this.domId}-liveVideo`),
        this.initDom(),
        (this.defaultStatus = $('.default-status', this.$el)),
        (this.error = $('.error', this.$el)),
        (this.controller = $('.player-control', this.$el)),
        this.controller.dblclick((e) => {
          e.stopPropagation()
        }),
        this.initMouseEvent(),
        this.setStatus('created')
    }
    getTemplate() {
      return `\n        <div id="${
        this.domId
      }" class="wsplayer-item wsplayer-item-${this.index} ${0 === this.index ? 'selected' : 'unselected'}">\n            <div class="ws-full-content ws-flex">\n                <canvas id="${this.canvasId}" class="kind-stream-canvas" kind-channel-id="0" width="800" height="600"></canvas>\n                <video id="${this.videoId}" class="kind-stream-canvas" kind-channel-id="0" muted style="display:none" width="800" height="600"></video>\n                <canvas id="${this.ivsCanvasId}" class="kind-stream-canvas" style="position: absolute" kind-channel-id="0" width="800" height="600"></canvas>\n                <canvas id="${this.pztCanvasId}" class="kind-stream-canvas" style="display: none; position: absolute" kind-channel-id="0" width="800" height="600"></canvas>\n            </div>\n            <div class="default-status">\n                <img src="./static/WSPlayer/icon/default.png" alt="">\n            </div>\n            <div class="player-control top-control-bar">\n                <div class="stream">\n                    <div class="select-container">\n                        <div class="select-show select">\n                            <div class="code-stream">主码流</div>\n                            \x3c!-- 下拉箭头 --\x3e\n                            <img src="./static/WSPlayer/icon/spread.png" />\n                        </div>\n                        <div class="stream-type" style="display: none">\n                            <ul class="select-ul">\n                                <li optionValue="主码流" stream-type="1" class="stream-type-item">主码流</li>\n                                <li optionValue="辅码流1" stream-type="2" class="stream-type-item">辅码流1</li>\n                                <li optionValue="辅码流2" stream-type="3" class="stream-type-item">辅码流2</li>\n                            </ul>\n                        </div>\n                    </div>\n                    <span class="stream-info"></span>\n                </div>\n                <div class="opt-icons">\n                    <div class="opt-icon talk-icon off" title="对讲"></div>\n                    <div class="opt-icon record-icon" title="录像"></div>\n                    <div class="opt-icon audio-icon off" title="声音"></div>\n                    <div class="opt-icon capture-icon" title="抓图"></div>\n                    <div class="opt-icon close-icon" title="关闭"></div>\n                </div>\n            </div>\n            <div class="ws-talking">对讲中...</div>\n            <div class="error">\n                <div class="error-message"></div>\n            </div>\n        </div>\n        `
    }
    initMouseEvent() {
      super.initMouseEvent()
      let e = this
      ;(this.hideTimer = null),
        this.$el.on('mouseenter mousemove', (e) => {
          ;['created', 'closed'].includes(this.status) ||
            this.setDomVisible($('.player-control', $(`#${this.domId}`)), !0),
            ('playing' !== this.status && 'error' !== this.status) ||
              (this.hideTimer && clearTimeout(this.hideTimer))
        }),
        this.$el.on('mouseleave', (e) => {
          this.hideTimer = setTimeout(() => {
            $('.stream-type', this.$el).hide(),
              this.setDomVisible($('.player-control', $(`#${this.domId}`)), !1),
              (this.streamSelectShow = !1)
          }, 300)
        }),
        (this.streamSelectShow = !1),
        $('.select', this.$el).click((e) => {
          this.streamSelectShow
            ? ($('.stream-type', this.$el).hide(), (this.streamSelectShow = !1))
            : ($('.stream-type', this.$el).show(), (this.streamSelectShow = !0))
        }),
        $('.stream-type', this.$el).click((t) => {
          let s = t.target.getAttribute('stream-type')
          e.streamType !== s &&
            e.options &&
            e.wsPlayer.changeStreamType(e.options.channelData, s, e.index)
        })
    }
    setStreamType(e) {
      this.streamType = e
      let t = $('.stream-type .select-ul', this.$el)[0].children[e - 1]
      $('.code-stream', this.$el).text($(t).attr('optionValue')),
        $(t)
          .addClass('stream-type-select')
          .siblings()
          .removeClass('stream-type-select')
    }
    setStatus(e, s) {
      switch (
        (this.wsPlayer.sendMessage('statusChanged', {
          status: e,
          windowIndex: this.index
        }),
        (this.status = e),
        this.status)
      ) {
        case 'created':
        case 'closed':
          this.setDomVisible(this.defaultStatus, !0),
            this.setDomVisible(this.error, !1),
            this.setDomVisible(this.controller, !1),
            (this.videoElem.src = ''),
            $('.audio-icon', this.$el).removeClass('on').addClass('off')
          break
        case 'ready':
        case 'playing':
        case 'pause':
          this.setDomVisible(this.defaultStatus, !1),
            this.setDomVisible(this.error, !1)
          break
        case 'error':
          this.setDomVisible(this.defaultStatus, !1),
            $('.error-message', this.$el).text(
              t.errorVideoInfo[s.errorCode]
                ? t.errorVideoInfo[s.errorCode]
                : t.errorVideoInfo.defaultErrorMsg
            ),
            this.setDomVisible(this.error, !0)
      }
    }
    init(e) {
      if (this.wsPlayer.config.isDynamicLoadLib && !window.m_nModuleInitialized)
        return void this.wsPlayer.sendErrorMessage('501')
      let t = (this.options || {}).channelId === e.channelId
      ;(this.options = e),
        this.player &&
          (this.isAudioPlay &&
            $('.audio-icon', this.$el).removeClass('on').addClass('off'),
          this.close(!0, t)),
        this.setTalkIconShow((e.channelData || {}).domainId),
        this.spinner && this.spinner.stop(),
        (this.spinner = new n({ color: '#ffffff' }).spin(this.$el[0])),
        this.setStatus('ready'),
        this.setStreamType(e.streamType),
        this.createPlayer(e)
    }
    startPlay(e, t) {
      let s = this
      'video' === t.decodeMode
        ? ((s.videoElem.style.display = ''),
          (s.canvasElem.style.display = 'none'))
        : ((s.videoElem.style.display = 'none'),
          (s.canvasElem.style.display = '')),
        s.updateAdapter(e.playerAdapter, t),
        (this.width = t.width),
        (this.height = t.height),
        $('.stream-info', $(`#${s.domId}`)).text(
          `${t.encodeMode ? `${t.encodeMode}, ` : ''}${
            t.width ? `${t.width}*` : ''
          }${t.height ? t.height : ''}`
        )
    }
    createPlayer(e) {
      let t = this
      ;(this.player = new p({
        wsURL: e.wsURL,
        rtspURL: e.rtspURL,
        config: this.wsPlayer.config,
        events: {
          PlayStart: (e) => {
            console.log('PlayStart', e),
              t.spinner.stop(),
              t.setStatus('playing')
          },
          DecodeStart: (s) => {
            console.log('DecodeStart', s),
              t.startPlay(e, s),
              t.wsPlayer.sendMessage('realSuccess', e)
          },
          GetFrameRate: (s) => {
            console.log('GetFrameRate', s), t.startPlay(e, s)
          },
          Error: (s) => {
            if (t.player && t.player.ws && s.symbol === t.player.ws.symbol) {
              if ('408' === s.errorCode)
                return void (
                  '2' === t.streamType &&
                  t.wsPlayer.changeStreamType(
                    t.options.channelData,
                    '1',
                    t.index
                  )
                )
              t.spinner.stop(),
                console.log('Error: ' + JSON.stringify(s)),
                t.setStatus('error', s),
                t.wsPlayer.sendMessage('realError', e, s)
            }
          },
          FileOver: (e) => {
            console.log('FileOver: ', e)
          },
          UpdatePlayingTime: (e) => {}
        }
      })),
        this.player.init(this.canvasElem, this.videoElem, this.ivsCanvasElem),
        this.player.connect(),
        this.wsPlayer.config.openIvs && this.player.openIVS(),
        window.wsPlayerManager.bindPlayer(this.player.nPlayPort, this.player)
    }
    startTalk(e) {
      if (this.wsPlayer.config.isDynamicLoadLib && !window.m_nModuleInitialized)
        return void this.wsPlayer.sendErrorMessage('502')
      ;(this.wsPlayer.isTalking = !0),
        (this.isTalking = !0),
        $('.talk-icon', this.$el).removeClass('off').addClass('on')
      let t = this
      ;(this.talkPlayer = new p({
        rtspURL: e.rtspURL,
        wsURL: this.wsPlayer.__getWSUrl(e.rtspURL, e.serverIp),
        isTalkService: !0,
        config: this.wsPlayer.config,
        events: {
          Error: (e) => {
            '504' === e.errorCode &&
              (t.stopTalk(), t.wsPlayer.sendMessage('talkError', e))
          }
        }
      })),
        this.talkPlayer.talk('on'),
        window.wsPlayerManager.bindPlayer(
          this.talkPlayer.nPlayPort,
          this.talkPlayer
        ),
        $('.ws-talking', this.$el).css({ visibility: 'visible' }),
        this.closeOtherAudio()
    }
    stopTalk() {
      this.talkPlayer &&
        window.wsPlayerManager.unbindPlayer(this.talkPlayer.nPlayPort),
        this.isTalking &&
          ((this.wsPlayer.isTalking = !1), (this.isTalking = !1)),
        this.talkPlayer &&
          (this.talkPlayer.talk('off'), (this.talkPlayer = null)),
        $('.talk-icon', this.$el).removeClass('on').addClass('off'),
        $('.ws-talking', this.$el).css({ visibility: 'hidden' })
    }
  }
  const m = window.PlayerControl
  class u extends a {
    constructor(e) {
      super(e),
        (this.speed = 1),
        (this.canvasId = `${this.domId}-recordcanvas`),
        (this.ivsCanvasId = `${this.domId}-ivs-livecanvas`),
        (this.videoId = `${this.domId}-recordVideo`),
        (this.curTimestamp = 0),
        this.initDom(),
        (this.defaultStatus = $('.default-status', this.$el)),
        (this.error = $('.error', this.$el)),
        (this.controller = $('.player-control', this.$el)),
        (this.timeInfo = $('.time-info', this.$el)),
        this.initMouseEvent(),
        this.setStatus('created')
    }
    getTemplate() {
      return `\n        <div id="${
        this.domId
      }" class="wsplayer-item wsplayer-item-${this.index} ${0 === this.index ? 'selected' : 'unselected'}">\n            <canvas id="${this.canvasId}" class="kind-stream-canvas" kind-channel-id="0" width="800" height="600"></canvas>\n            <video id="${this.videoId}" class="kind-stream-canvas" kind-channel-id="0" muted style="display:none" width="800" height="600"></video>\n            <canvas id="${this.ivsCanvasId}" class="kind-stream-canvas" style="position: absolute" kind-channel-id="0" width="800" height="600"></canvas>\n            <div class="default-status">\n                <img src="./static/WSPlayer/icon/default.png" alt="">\n            </div>\n            <div class="player-control top-control-bar">\n                <span class="stream-info"></span>\n                <div class="opt-icons">\n                    <div class="opt-icon record-icon" title="录像"></div>\n                    <div class="opt-icon audio-icon off"></div>\n                    <div class="opt-icon capture-icon"></div>\n                    <div class="opt-icon close-icon"></div>\n                </div>\n            </div>\n            <div class="player-control record-control-bar">\n                <div class="wsplayer-progress-bar">\n                    <div class="progress-bar_background"></div>\n                    <div class="progress-bar_hover_light"></div>\n                    <div class="progress-bar_light"></div>\n                </div>\n                <div class="record-control-left">\n                    <div class="opt-icon play-ctrl-btn play-icon play"></div>\n                    <div class="time-info"></div>/<div class="time-long"></div>\n                </div>\n                <div class="record-control-right">\n                    <div class="opt-icon close-icon"></div>\n                </div>\n            </div>\n            <div class="error">\n                <div class="error-message"></div>\n            </div>\n            <div class="play-pause-wrapper">\n                <div class="play-ctrl-btn center-play-icon"></div>\n            </div>\n        </div>\n        `
    }
    initMouseEvent() {
      super.initMouseEvent(),
        (this.hideTimer = null),
        this.$el.on('mouseenter mousemove', (e) => {
          ;['created', 'closed'].includes(this.status) ||
            this.setDomVisible($('.player-control', $(`#${this.domId}`)), !0),
            'playing' === this.status
              ? this.hideTimer && clearTimeout(this.hideTimer)
              : 'ready' === this.status &&
                this.setDomVisible(this.progressBar, !0)
        }),
        this.$el.on('mouseleave', (e) => {
          'pause' !== this.status &&
            (this.hideTimer = setTimeout(() => {
              this.setDomVisible($('.player-control', $(`#${this.domId}`)), !1)
            }, 300))
        }),
        $('.wsplayer-progress-bar', this.$el).on('mousemove', (e) => {
          $('.progress-bar_hover_light', this.$el).css({
            width: e.offsetX + 'px'
          })
        }),
        $('.wsplayer-progress-bar', this.$el).on('mouseleave', (e) => {
          $('.progress-bar_hover_light', this.$el).css({ width: 0 })
        }),
        $('.play-ctrl-btn', this.$el).click((e) => {
          'playing' === this.status
            ? (this.pause(),
              $('.play-icon', this.$el).removeClass('play').addClass('pause'))
            : (this.play(),
              $('.play-icon', this.$el).removeClass('pause').addClass('play'))
        })
    }
    setStatus(e, s) {
      switch (
        (this.wsPlayer.sendMessage('statusChanged', {
          status: e,
          windowIndex: this.index
        }),
        (this.status = e),
        this.status)
      ) {
        case 'created':
        case 'closed':
          this.setDomVisible(this.defaultStatus, !0),
            this.setDomVisible(this.error, !1),
            this.setDomVisible(this.controller, !1),
            $('.audio-icon', this.$el).removeClass('on').addClass('off')
          break
        case 'ready':
          this.setDomVisible(this.defaultStatus, !1),
            this.setDomVisible(this.error, !1)
          break
        case 'playing':
          this.wsPlayer.selectIndex === this.index &&
            $('#ws-record-time-box').css({ visibility: 'visible' }),
            this.setDomVisible(this.defaultStatus, !1),
            this.setDomVisible(this.error, !1),
            this.setDomVisible($('.play-pause-wrapper', this.$el), !1)
          break
        case 'pause':
          this.setDomVisible(this.defaultStatus, !1),
            this.setDomVisible(this.error, !1),
            this.setDomVisible(this.controller, !1),
            this.setDomVisible($('.play-pause-wrapper', this.$el), !0)
          break
        case 'error':
          this.setDomVisible(this.defaultStatus, !1),
            $('.error-message', this.$el).text(
              t.errorVideoInfo[s.errorCode]
                ? t.errorVideoInfo[s.errorCode]
                : t.errorVideoInfo.defaultErrorMsg
            ),
            this.setDomVisible(this.error, !0)
      }
    }
    init(e) {
      !this.wsPlayer.config.isDynamicLoadLib || window.m_nModuleInitialized
        ? ((this.options = e),
          this.player &&
            (this.isAudioPlay &&
              $('.audio-icon', this.$el).removeClass('on').addClass('off'),
            this.close(!0)),
          this.spinner && this.spinner.stop(),
          (this.spinner = new n({ color: '#ffffff' }).spin(this.$el[0])),
          this.createPlayer(e))
        : this.wsPlayer.sendErrorMessage('501')
    }
    createPlayer(e) {
      let t = this
      ;(this.player = new m({
        wsURL: e.wsURL,
        rtspURL: e.rtspURL,
        isPlayback: e.isPlayback,
        config: this.wsPlayer.config,
        events: {
          PlayStart: (e) => {
            console.log('PlayStart'),
              t.setStatus('playing'),
              t.wsPlayer.selectIndex === t.index &&
                ($('.ws-record-play', t.wsPlayer.$el).css({ display: 'none' }),
                $('.ws-record-pause', t.wsPlayer.$el).css({ display: 'block' }))
          },
          DecodeStart: (s) => {
            console.log('DecodeStart', s),
              t.DecodeStart &&
                t.wsPlayer.config.playCenterRecordByTime &&
                (t.DecodeStart(), (t.DecodeStart = null)),
              t.spinner.stop(),
              'video' === s.decodeMode
                ? ((t.videoElem.style.display = ''),
                  (t.canvasElem.style.display = 'none'))
                : ((t.videoElem.style.display = 'none'),
                  (t.canvasElem.style.display = '')),
              t.updateAdapter(e.playerAdapter, s),
              $('.stream-info', $(`#${t.domId}`)).text(
                s.width
                  ? `${s.encodeMode}, ${s.width}*${s.height}`
                  : s.encodeMode
              ),
              t.wsPlayer.sendMessage('recordSuccess', e)
          },
          GetFrameRate: (e) => {
            console.log('GetFrameRate: ', e)
          },
          GetRtspRange: (e) => {
            console.log('GetRtspRange: ', e)
          },
          Error: (s) => {
            if (t.player && s.symbol === t.player.ws.symbol) {
              if ('408' === s.errorCode) return
              t.spinner.stop(),
                console.log('Error: ' + JSON.stringify(s)),
                t.setStatus('error', s),
                t.wsPlayer.sendMessage('recordError', e, err)
            }
          },
          FileOver: (e) => {
            console.log('回放播放完成')
            let s = '',
              i = t.options.ssId,
              a = t.options.ssIdList || []
            i && (s = a[a.indexOf(i) + 1]),
              !t.options.playRecordByTime || s
                ? (t.close(), t.wsPlayer.playNextRecord(t.index, s))
                : t.close()
          },
          UpdatePlayingTime: (e, s, i, a, r, l) => {
            'playing' === t.status &&
              t.wsPlayer.__setPlayingTime(t.index, e, s, i, a, r, l)
          }
        }
      })),
        (this.timeLong = e.endTime - e.startTime)
      let s = this.timeLong % 60,
        i = parseInt(this.timeLong / 60) % 60,
        a = parseInt(this.timeLong / 3600) % 60
      ;(this.timeLongStr = `${a > 0 ? a + ':' : ''}${i < 10 ? '0' + i : i}:${
        s < 10 ? '0' + s : s
      }`),
        $('.time-long', this.$el).text(this.timeLongStr),
        this.setStatus('ready'),
        this.player.init(this.canvasElem, this.videoElem, this.ivsCanvasElem),
        this.player.connect(),
        this.wsPlayer.config.openIvs && this.player.openIVS(),
        window.wsPlayerManager.bindPlayer(this.player.nPlayPort, this.player)
    }
    playSpeed(e) {
      ;(this.speed = e),
        1 !== e &&
          (this.player.setAudioVolume(0),
          $('.audio-icon', this.$el).removeClass('on').addClass('off'),
          (this.isAudioPlay = !1)),
        this.player && this.player.playSpeed(e)
    }
  }
  class v {
    constructor() {
      ;(this.wsPlayerList = []),
        (this.portToPlayer = {}),
        (window.cPlusVisibleDecCallBack =
          this.cPlusVisibleDecCallBack.bind(this)),
        (window.cExtraDrawDataCallBack =
          this.cExtraDrawDataCallBack.bind(this)),
        (window.cExtraDrawDrawCallBack =
          this.cExtraDrawDrawCallBack.bind(this)),
        (window.cRecordDataCallBack = this.cRecordDataCallBack.bind(this))
    }
    cPlusVisibleDecCallBack(e, t, s, i, a, r) {
      this.portToPlayer[e] &&
        this.portToPlayer[e].setFrameData(e, t, s, i, a, r)
    }
    cExtraDrawDataCallBack(e, t, s, i) {
      this.portToPlayer[e] && this.portToPlayer[e].setIVSData(e, t, s, i)
    }
    cExtraDrawDrawCallBack(e) {
      this.portToPlayer[e] && this.portToPlayer[e].drawIVSData(e)
    }
    cRecordDataCallBack(e, t, s, i, a) {
      this.portToPlayer[e] && this.portToPlayer[e].setRecordData(e, t, s, i, a)
    }
    bindPlayer(e, t) {
      this.portToPlayer[e] || (this.portToPlayer[e] = t)
    }
    unbindPlayer(e) {
      this.portToPlayer[e] = null
    }
    addWSPlayer(e) {
      this.wsPlayerList.push()
    }
    removeWSPlayer(e) {
      this.wsPlayerList = this.wsPlayerList.filter((t) => t === e)
    }
  }
  const w = {
      clientType: 'WINPC',
      clientMac: '30:9c:23:79:40:08',
      clientPushId: '',
      project: 'PSDK',
      method: 'MTS.Video.StartVideo',
      data: {
        optional: '/admin/API/MTS/Video/StartVideo',
        dataType: '3',
        streamType: '2',
        channelId: '',
        trackId: ''
      }
    },
    g = {
      clientType: 'WINPC',
      clientMac: '30:9c:23:79:40:08',
      clientPushId: '',
      project: 'PSDK',
      method: 'MTS.Audio.StartTalk',
      data: {
        optional:
          '/admin/API/MTS/Audio/StartTalk?token=ff93dabe5d754ea8acb0a95dbe6c4a0f',
        source: '',
        deviceCode: '',
        talkType: '1',
        target: '',
        audioBit: 16,
        audioType: 2,
        broadcastChannels: '',
        sampleRate: 8e3,
        talkmode: '',
        channelSeq: '0'
      }
    },
    f = {
      clientType: 'WINPC',
      clientMac: '30:9c:23:79:40:08',
      clientPushId: '',
      project: 'PSDK',
      method: 'SS.Record.QueryRecords',
      data: {
        cardNo: '',
        optional: '/admin/API/SS/Record/QueryRecords',
        diskPath: '',
        startIndex: '',
        streamType: '0',
        recordType: '0',
        recordSource: '3',
        endIndex: '',
        startTime: '',
        endTime: '',
        channelId: ''
      }
    },
    P = {
      clientType: 'WINPC',
      clientMac: '30:9c:23:79:40:08',
      clientPushId: '',
      project: 'PSDK',
      method: 'SS.Playback.StartPlaybackByTime',
      data: {
        nvrId: '',
        optional: '/admin/API/SS/Playback/StartPlaybackByTime',
        recordType: '0',
        recordSource: '1',
        streamType: '1',
        channelId: '',
        startTime: '',
        endTime: ''
      }
    },
    S = {
      clientType: 'WINPC',
      clientMac: '30:9c:23:79:40:08',
      clientPushId: '',
      project: 'PSDK',
      method: 'SS.Playback.StartPlaybackByFile',
      data: {
        ssId: '',
        optional: '/evo-apigw/admin/API/SS/Playback/StartPlaybackByFile',
        startTime: '',
        endTime: '',
        fileName: '',
        diskId: '',
        nvrId: '',
        recordSource: '',
        channelId: '',
        playbackMode: '0',
        streamId: ''
      }
    }
  class I {
    constructor(e) {
      ;(this.realPlayer = null),
        (this.recordPlayer = null),
        (this.playCenterRecordByTime = e.playCenterRecordByTime),
        'real' === e.type
          ? (this.realPlayer = e.player)
          : (this.recordPlayer = e.player),
        (this.playIndex = 0),
        (this.recordList = []),
        (this.getRealRtsp = e.getRealRtsp),
        (this.getRecords = e.getRecords),
        (this.getRecordRtspByTime = e.getRecordRtspByTime),
        (this.getRecordRtspByFile = e.getRecordRtspByFile),
        (this.getTalkRtsp = e.getTalkRtsp)
    }
    getCurrentRtsp(e) {
      let t = e
        .split('|')
        .filter(
          (e) =>
            !e.includes('localhost') &&
            !e.includes('127.0.0.1') &&
            !e.startsWith('rtsp://[')
        )
      return t.find((e) => e.includes(window.location.hostname)) || t[0]
    }
    openSomeWindow(e) {
      let t = this.realPlayer || this.recordPlayer
      e > t.showNum &&
        (e < t.maxWindow
          ? (this.playNum = e > 16 ? 25 : e > 9 ? 16 : e > 4 ? 9 : 4)
          : (this.playNum = t.maxWindow),
        t.setPlayerNum(this.playNum))
    }
    playRealVideo(e, t = '2', s, a = !1) {
      let r = [],
        l = []
      e.forEach((e) => {
        e.isOnline ? r.push(e) : l.push(e)
      }),
        l.length && this.realPlayer.sendErrorMessage(101, { channelList: l }),
        r.length &&
          (i.validFunction(this.getRealRtsp)
            ? (this.openSomeWindow(r.length),
              r.map((e, i) => {
                let l = this.playIndex
                r.length > 1
                  ? (l = this.playIndex + i)
                  : s > -1 && (l = s || 0),
                  (w.data.streamType = t),
                  (w.data.channelId = e.id),
                  this.getRealRtsp(JSON.parse(JSON.stringify(w))).then(
                    (s) => {
                      if ('string' == typeof s)
                        return this.realPlayer.sendMessage(
                          'realError',
                          e,
                          '在传入的 getRealRtsp 方法上，resolve 返回的值应该为一个icc返回的标准对象'
                        )
                      ;(s.rtspURL =
                        this.getCurrentRtsp(s.url) + '?token=' + s.token),
                        this.realPlayer.playReal({
                          selectIndex: l,
                          streamServerIp: s.innerIp,
                          rtspURL: s.rtspURL,
                          channelId: e.id,
                          channelData: e,
                          streamType: t
                        })
                    },
                    (t) => {
                      a
                        ? this.realPlayer.sendErrorMessage(102, {
                            channelList: [e],
                            apiErrorInfo: t
                          })
                        : this.playRealVideo([e], '1', l, !0)
                    }
                  )
              }))
            : this.realPlayer.sendErrorMessage(608, {
                insert: ['请求实时预览接口', 'getRealRtsp']
              }))
    }
    startTalk(e) {
      i.validFunction(this.getTalkRtsp)
        ? ((g.data.deviceCode = e.deviceCode),
          (g.data.audioBit = e.audioBit || 16),
          (g.data.sampleRate = e.sampleRate || 8e3),
          [1, 6, 10, 43].includes(e.deviceType)
            ? ((g.data.talkType = '2'), (g.data.channelSeq = e.channelSeq))
            : ((g.data.talkType = '1'), (g.data.channelSeq = '0')),
          this.getTalkRtsp(JSON.parse(JSON.stringify(g)))
            .then((t) => {
              if ('string' == typeof t)
                return this.realPlayer.sendMessage(
                  'realError',
                  e,
                  '在传入的 getTalkRtsp 方法上，resolve 返回的值应该为一个icc返回的标准对象'
                )
              let s = this.getCurrentRtsp(t.url) + '?token=' + t.token
              this.realPlayer.playerList[this.realPlayer.talkIndex].startTalk({
                rtspURL: s,
                serverIp: t.innerIp
              })
            })
            .catch((t) => {
              this.realPlayer.sendErrorMessage(401, { type: 'talk' }, t),
                this.realPlayer.sendErrorMessage(304, {
                  channelList: [e],
                  apiErrorInfo: t
                })
            }))
        : this.realPlayer.sendErrorMessage(608, {
            insert: ['请求对讲接口', 'getTalkRtsp']
          })
    }
    getRecordList(e, t) {
      if (!i.validFunction(this.getRecords))
        return void this.recordPlayer.sendErrorMessage(608, {
          insert: ['请求录像接口', 'getRecords']
        })
      ;(f.data.streamType = e.streamType || '0'),
        (f.data.recordType = e.recordType || '0'),
        (f.data.recordSource = e.recordSource),
        (f.data.startTime = e.startTime),
        (f.data.endTime = e.endTime)
      let s = e.channelList.length > 1 ? 0 : this.playIndex
      e.channelList.forEach((i) => {
        ;(f.data.channelId = i.id),
          this.getRecords(JSON.parse(JSON.stringify(f))).then(
            (a) => {
              let r = (a.records || []).sort(
                (e, t) => e.startTime - t.startTime
              )
              r.length
                ? (e.channelList.length > 1 && this.openSomeWindow(s + 1),
                  this.getRecordRtsp(
                    { ...e, channel: i },
                    r.map((e) => ((e.isImportant = '2' === e.recordType), e)),
                    !e.isUpdateRecords,
                    s,
                    t
                  ),
                  s++)
                : this.recordPlayer.sendErrorMessage(201, { channelList: [i] })
            },
            (e) => {
              this.recordPlayer.sendErrorMessage(202, {
                channelList: [i],
                apiErrorInfo: e
              })
            }
          )
      })
    }
    getRecordRtsp(e, t, s = !0, a, r) {
      let l = null,
        n = t[0].recordSource || e.recordSource,
        o = e.ssId,
        d = [],
        c = !1
      if (2 === Number(n) || this.playCenterRecordByTime) {
        if (!i.validFunction(this.getRecordRtspByTime))
          return void this.recordPlayer.sendErrorMessage(608, {
            insert: ['请求录像接口', 'getRecordRtspByTime']
          })
        ;(c = !0),
          (P.data.streamType = t[0].streamType || e.streamType || '0'),
          (P.data.recordType = '1'),
          (P.data.recordSource = n),
          (P.data.startTime = e.startTime),
          (P.data.endTime = e.endTime),
          (P.data.channelId = e.channel.id),
          (P.data.streamId = t[0].streamId || ''),
          this.playCenterRecordByTime &&
            ((o = o || t[0].ssId),
            (d = Array.from(new Set(t.map((e) => e.ssId)))),
            (P.data.ssId = o)),
          (l = this.getRecordRtspByTime(JSON.parse(JSON.stringify(P))))
      } else if (3 === Number(n)) {
        if (!i.validFunction(this.getRecordRtspByFile))
          return void this.recordPlayer.sendErrorMessage(608, {
            insert: ['请求录像接口', 'getRecordRtspByFile']
          })
        let s = t[0]
        ;(S.data = {
          ssId: s.ssId,
          optional: '/evo-apigw/admin/API/SS/Playback/StartPlaybackByFile',
          startTime: s.startTime,
          endTime: s.endTime,
          fileName: s.recordName,
          diskId: s.diskId,
          nvrId: '',
          recordSource: s.recordSource ? s.recordSource : '3',
          channelId: e.channel.id,
          playbackMode: '0',
          streamId: s.streamId
        }),
          (l = this.getRecordRtspByFile(JSON.parse(JSON.stringify(S))))
      }
      l &&
        l.then(
          (i) => {
            if ('string' == typeof i)
              return this.realPlayer.sendMessage(
                'realError',
                channel,
                '在传入的 getRecordRtspByTime/getRecordRtspByFile 方法上，resolve 返回的值应该为一个icc返回的标准对象'
              )
            if (
              ((i.channelId = e.channel.id),
              (i.rtspURL = this.getCurrentRtsp(i.url) + '?token=' + i.token),
              !i.rtspURL)
            )
              return (
                this.recordPlayer.sendErrorMessage(201, {
                  channelList: [e.channel]
                }),
                void console.warn('所选通道未查询到录像文件')
              )
            ;(i.channelData = e.channel),
              this.recordPlay(i, a, o, d, e.isJumpPlay, r, c)
            let l = this.recordList[a]
            if (s)
              this.recordList[a] = {
                ...e,
                recordList: t,
                recordIndex: 0,
                isPlaying: !0
              }
            else {
              let e = t[0].recordName
              ;(l.recordIndex = l.recordList.findIndex(
                (t) => t.recordName === e
              )),
                (l.isPlaying = !0)
            }
            this.playIndex === a &&
              (s || ((t = l.recordList), (l.isPlaying = !0)),
              this.setTimeLine(t))
          },
          (t) => {
            this.recordPlayer.sendErrorMessage(203, {
              channelList: [e.channel],
              apiErrorInfo: t
            })
          }
        )
    }
    recordPlay(e, t, s, i, a, r, l) {
      this.recordPlayer.playRecord(
        {
          ...e,
          streamServerIp: e.innerIp,
          selectIndex: t,
          ssId: s,
          ssIdList: i,
          isJumpPlay: a,
          playRecordByTime:
            l || (this.recordPlayer.config.playCenterRecordByTime && !!s)
        },
        r
      )
    }
    setTimeLine(e) {
      this.recordPlayer.setTimeLine(e)
    }
    clickRecordTimeLine(e, t) {
      let s = this.recordList[this.playIndex],
        i = s.startTime
      ;(i = new Date(1e3 * i).setHours(0)),
        (i = new Date(i).setMinutes(0)),
        (i = new Date(i).setSeconds(0) / 1e3),
        this.playCenterRecordByTime || (i += e)
      let a = {
        channelList: [s.channel],
        startTime: i,
        endTime: s.endTime,
        recordSource: s.recordSource,
        isUpdateRecords: !0,
        ssId: t,
        isJumpPlay: !0
      }
      this.getRecordList(a, {
        DecodeStart() {
          this.player.playByTime(e)
        }
      })
    }
    playNextRecord(e, t) {
      if (t) {
        if (!i.validFunction(this.getRecordRtspByTime))
          return void this.recordPlayer.sendErrorMessage(608, {
            insert: ['请求录像接口', 'getRecordRtspByTime']
          })
        let s = this.recordList[e],
          a = s.recordList.find((e) => e.ssId === t)
        ;(P.data.streamType = a.streamType || '0'),
          (P.data.recordType = '1'),
          (P.data.recordSource = a.recordSource),
          (P.data.startTime =
            new Date(1e3 * a.startTime).setHours(0, 0, 0) / 1e3),
          (P.data.endTime =
            new Date(1e3 * a.endTime).setHours(23, 59, 59) / 1e3),
          (P.data.channelId = a.channelId),
          (P.data.ssId = t),
          (P.data.streamId = a.streamId || '')
        let r = Array.from(new Set(s.recordList.map((e) => e.ssId)))
        return void this.getRecordRtspByTime(
          JSON.parse(JSON.stringify(P))
        ).then((i) => {
          ;(i.channelId = a.channelId),
            (i.rtspURL = this.getCurrentRtsp(i.url) + '?token=' + i.token),
            this.recordPlay(i, e, t, r, !0),
            this.setTimeLine(s.recordList)
        })
      }
      if (!i.validFunction(this.getRecordRtspByFile))
        return void this.recordPlayer.sendErrorMessage(608, {
          insert: ['请求录像接口', 'getRecordRtspByFile']
        })
      let s = this.recordList[e]
      s.recordIndex++, (s.isPlaying = !0)
      let a = s.recordList[s.recordIndex]
      a &&
        ((S.data = {
          ssId: a.ssId,
          optional: '/evo-apigw/admin/API/SS/Playback/StartPlaybackByFile',
          startTime: a.startTime,
          endTime: a.endTime,
          fileName: a.recordName,
          diskId: a.diskId,
          nvrId: '',
          recordSource: a.recordSource,
          channelId: a.channelId,
          playbackMode: '0',
          streamId: a.streamId
        }),
        this.getRecordRtspByFile(JSON.parse(JSON.stringify(S))).then(
          (t) => {
            ;(t.rtspURL = this.getCurrentRtsp(t.url) + '?token=' + t.token),
              t.rtspURL
                ? (this.recordPlay(t, e, '', [], !0),
                  this.setTimeLine(s.recordList))
                : this.recordPlayer.sendErrorMessage(201, {
                    channelList: [s.channel]
                  })
          },
          (e) => {
            this.recordPlayer.sendErrorMessage(203, {
              channelList: [s.channel],
              apiErrorInfo: e
            })
          }
        ))
    }
    changeTimeLine(e) {
      let t = this.recordList[e]
      t && t.isPlaying && this.setTimeLine(t.recordList)
    }
    videoClosed(e, t) {
      this.recordList[e] && (this.recordList[e].isPlaying = !1)
    }
    setPlayIndex(e) {
      this.playIndex = e
    }
  }
  class b {
    constructor(e = {}, t) {
      ;(this.el = e.el),
        (this.wsPlayer = t),
        (this.$el = $('#' + this.el)),
        this.$el && !this.$el.children().length && this.__createPanTilt(),
        (this.channel = null),
        (this.channelCodeForPositionList = []),
        (this.setPtzDirection = e.setPtzDirection),
        (this.setPtzCamera = e.setPtzCamera),
        (this.controlSitPosition = e.controlSitPosition),
        (this.mousedownCanvasEvent = this.__mousedownCanvasEvent.bind(this)),
        (this.mousemoveCanvasEvent = this.__mousemoveCanvasEvent.bind(this)),
        (this.mouseupCanvasEvent = this.__mouseupCanvasEvent.bind(this))
    }
    setChannel(e) {
      this.channel = e
      let t = this.wsPlayer.selectIndex,
        s = this.channelCodeForPositionList[t]
      if (!e)
        return (
          $('.ws-pan-tilt-mask', this.$el).css({ display: 'block' }),
          $('.ws-pan-tilt-mask-position', this.$el).css({ display: 'none' }),
          void this.__removeCanvasEvent()
        )
      s
        ? s !== e.id
          ? ((this.channelCodeForPositionList[t] = null),
            this.__removeCanvasEvent())
          : this.__openSitPosition(!0)
        : this.openSitPositionFlag && this.__removeCanvasEvent()
      let i = e.capability
      switch (e.cameraType + '') {
        case '1':
          parseInt(i, 2) & parseInt('100', 2) ||
          parseInt(i, 2) & parseInt('10000000000000000', 2)
            ? $('.ws-pan-tilt-mask-zoom', this.$el).css({ display: 'none' })
            : $('.ws-pan-tilt-mask-zoom', this.$el).css({ display: 'block' }),
            parseInt(i, 2) & parseInt('10000000000000000', 2)
              ? ($('.ws-pan-tilt-mask-direction', this.$el).css({
                  display: 'none'
                }),
                $('.ws-pan-tilt-mask-position', this.$el).css({
                  display: 'block'
                }),
                this.__removeCanvasEvent())
              : ($('.ws-pan-tilt-mask-direction', this.$el).css({
                  display: 'block'
                }),
                $('.ws-pan-tilt-mask-position', this.$el).css({
                  display: 'none'
                })),
            $('.ws-pan-tilt-mask-aperture', this.$el).css({ display: 'block' })
          break
        case '2':
          $('.ws-pan-tilt-mask', this.$el).css({ display: 'none' }),
            $('.ws-pan-tilt-mask-position', this.$el).css({ display: 'none' })
          break
        default:
          $('.ws-pan-tilt-mask', this.$el).css({ display: 'block' }),
            $('.ws-pan-tilt-mask-position', this.$el).css({ display: 'none' }),
            this.__removeCanvasEvent()
      }
    }
    __createPanTilt() {
      this.$el.append(
        '\n            <div class="ws-pan-tilt-control">\n                <div class="ws-pan-tilt-circle-wrapper">\n                    \x3c!--云台方向控制--\x3e\n                    <div class="ws-pan-tilt-circle-rotate">\n                        <div class="ws-pan-tilt-circle">\n                            <div class="ws-pan-tilt-direction-item"><img src="./static/WSPlayer/icon/arrow-t.svg" title="上" direct="1"/></div>\n                            <div class="ws-pan-tilt-direction-item"><img src="./static/WSPlayer/icon/arrow-rt.svg" title="右上" direct="7"/></div>\n                            <div class="ws-pan-tilt-direction-item"><img src="./static/WSPlayer/icon/arrow-r.svg" title="右" direct="4"/></div>\n                            <div class="ws-pan-tilt-direction-item"><img src="./static/WSPlayer/icon/arrow-rb.svg" title="右下" direct="8"/></div>\n                            <div class="ws-pan-tilt-direction-item"><img src="./static/WSPlayer/icon/arrow-b.svg" title="下" direct="2"/></div>\n                            <div class="ws-pan-tilt-direction-item"><img src="./static/WSPlayer/icon/arrow-lb.svg" title="左下" direct="6"/></div>\n                            <div class="ws-pan-tilt-direction-item"><img src="./static/WSPlayer/icon/arrow-l.svg" title="左" direct="3"/></div>\n                            <div class="ws-pan-tilt-direction-item"><img src="./static/WSPlayer/icon/arrow-lt.svg" title="左上" direct="5"/></div>\n                            <div class="ws-pan-tilt-inner-circle">\n                                <img\n                                    class="ws-pan-tilt-pzt-select"\n                                    src="./static/WSPlayer/icon/ptz-select.svg"\n                                    title="三维定位"\n                                />\n                            </div>\n                        </div>\n                    </div>\n                </div>\n                \n                \x3c!--云台变倍、聚焦、光圈控制--\x3e\n                <div class="ws-cloud-control-wrapper">\n                    <div class="ws-pan-tilt-control-item"><img src="./static/WSPlayer/icon/ptz-icon1.svg" title="变倍-" operateType="1" direct="2"/></div>\n                    <div class="ws-pan-tilt-control-item"><img src="./static/WSPlayer/icon/ptz-icon2.svg" title="变倍+" operateType="1" direct="1"/></div>\n                    <div class="cloud-control-separate"></div>\n                    <div class="ws-pan-tilt-control-item"><img src="./static/WSPlayer/icon/ptz-icon3.svg" title="聚焦-" operateType="2" direct="2"/></div>\n                    <div class="ws-pan-tilt-control-item"><img src="./static/WSPlayer/icon/ptz-icon4.svg" title="聚焦+" operateType="2" direct="1"/></div>\n                    <div class="cloud-control-separate"></div>\n                    <div class="ws-pan-tilt-control-item"><img src="./static/WSPlayer/icon/ptz-icon5.svg" title="光圈-" operateType="3" direct="2"/></div>\n                    <div class="ws-pan-tilt-control-item"><img src="./static/WSPlayer/icon/ptz-icon6.svg" title="光圈+" operateType="3" direct="1"/></div>\n                </div>\n                \n                \x3c!--遮罩，当通道没有云台功能时，使用遮罩遮住云台按钮--\x3e\n                \x3c!--方向按钮遮罩--\x3e\n                <div class="ws-pan-tilt-mask ws-pan-tilt-mask-direction"></div>\n                \x3c!--三维定位遮罩--\x3e\n                <div class="ws-pan-tilt-mask ws-pan-tilt-mask-position"></div>\n                \x3c!--变倍、聚焦遮罩--\x3e\n                <div class="ws-pan-tilt-mask ws-pan-tilt-mask-zoom"></div>\n                \x3c!--光圈遮罩--\x3e\n                <div class="ws-pan-tilt-mask ws-pan-tilt-mask-aperture"></div>\n            </div>\n        '
      ),
        $('.ws-pan-tilt-circle', this.$el).mouseup((e) => {
          let t = this.__getDirect(e.target)
          t && this.__setPtzDirection(t, '0')
        }),
        $('.ws-pan-tilt-circle', this.$el).mousedown((e) => {
          let t = this.__getDirect(e.target)
          t && this.__setPtzDirection(t, '1')
        }),
        $('.ws-pan-tilt-control-item img', this.$el).mouseup((e) => {
          this.__setPtzCamera(
            e.target.getAttribute('operateType'),
            e.target.getAttribute('direct'),
            '0'
          )
        }),
        $('.ws-pan-tilt-control-item img', this.$el).mousedown((e) => {
          this.__setPtzCamera(
            e.target.getAttribute('operateType'),
            e.target.getAttribute('direct'),
            '1'
          )
        }),
        $('.ws-pan-tilt-pzt-select', this.$el).click((e) => {
          this.__openSitPosition(!this.openSitPositionFlag)
        })
    }
    __getDirect(e) {
      let t = e.getAttribute('direct')
      if (!t) {
        let s = e.childNodes[0]
        s && s.getAttribute && (t = s.getAttribute('direct'))
      }
      return t
    }
    __setPtzDirection(e, t) {
      const s = {
        project: 'PSDK',
        method: 'DMS.Ptz.OperateDirect',
        data: {
          direct: e,
          command: t,
          stepX: '4',
          stepY: '4',
          channelId: this.channel.id
        }
      }
      this.setPtzDirection &&
        this.setPtzDirection(s)
          .then((e) => {
            let s = e.data || e
            '1' === t &&
              s.result &&
              '0' === s.result &&
              this.wsPlayer.sendErrorMessage(701, {
                insert: [e.data.lockUser.userName],
                apiErrorInfo: e
              })
          })
          .catch((e) => {
            let s = ['']
            1103 === (e.data || e).code && (s = ['：您无权限进行此操作']),
              '1' === t &&
                this.wsPlayer.sendErrorMessage(704, {
                  apiErrorInfo: e,
                  insert: s
                })
          })
    }
    __setPtzCamera(e, t, s) {
      const i = {
        project: 'PSDK',
        method: 'DMS.Ptz.OperateCamera',
        data: {
          operateType: e,
          direct: t,
          command: s,
          step: '4',
          channelId: this.channel.id
        }
      }
      this.setPtzCamera &&
        this.setPtzCamera(i)
          .then((e) => {
            let t = e.data || e
            '1' === s &&
              t.result &&
              '0' === t.result &&
              this.wsPlayer.sendErrorMessage(701, {
                insert: [e.data.lockUser.userName],
                apiErrorInfo: e
              })
          })
          .catch((e) => {
            let t = ['', '变倍', '变焦', '光圈'],
              a = ['', '+', '-'],
              r = ['', '', '']
            1103 === (e.data || e).code &&
              (r = [
                t[i.data.operateType],
                a[i.data.direct],
                '：您无权限进行此操作'
              ]),
              '1' === s &&
                this.wsPlayer.sendErrorMessage(703, {
                  apiErrorInfo: e,
                  insert: r
                })
          })
    }
    __openSitPosition(e) {
      this.openSitPositionFlag = e
      let t = this.wsPlayer.playerList,
        s = this.wsPlayer.selectIndex
      ;(this.canvasElem = t[s].pztCanvasElem),
        this.canvasElem.addEventListener(
          'mousedown',
          this.mousedownCanvasEvent
        ),
        this.canvasElem.addEventListener(
          'mousemove',
          this.mousemoveCanvasEvent
        ),
        this.canvasElem.addEventListener('mouseup', this.mouseupCanvasEvent),
        (this.canvasContext = this.canvasElem.getContext('2d')),
        (this.canvasContext.lineWidth = 2),
        (this.canvasContext.strokeStyle = '#009cff'),
        this.openSitPositionFlag
          ? ((this.channelCodeForPositionList[s] = this.channel.id),
            $(this.canvasElem).css({ display: 'block' }),
            $('.ws-pan-tilt-pzt-select', this.$el).attr({
              src: './static/WSPlayer/icon/ptz-select-hover.svg'
            }))
          : ((this.channelCodeForPositionList[s] = null),
            $(this.canvasElem).css({ display: 'none' }),
            $('.ws-pan-tilt-pzt-select', this.$el).attr({
              src: './static/WSPlayer/icon/ptz-select.svg'
            }))
    }
    __mousedownCanvasEvent(e) {
      e.target === this.canvasElem &&
        (e.offsetX || e.layerX) &&
        ((this.pointX = e.offsetX || e.layerX),
        (this.pointY = e.offsetY || e.layerY),
        (this.startDraw = !0))
    }
    __mousemoveCanvasEvent(e) {
      if (
        e.target === this.canvasElem &&
        this.startDraw &&
        (e.offsetX || e.layerX)
      ) {
        const t = e.offsetX || e.layerX,
          s = e.offsetY || e.layerY,
          i = t - this.pointX,
          a = s - this.pointY
        this.canvasContext.clearRect(
          0,
          0,
          this.canvasElem.width,
          this.canvasElem.height
        ),
          this.canvasContext.beginPath(),
          this.canvasContext.strokeRect(this.pointX, this.pointY, i, a)
      }
    }
    __mouseupCanvasEvent(e) {
      if (e.target === this.canvasElem && (e.offsetX || e.layerX)) {
        this.startDraw = !1
        const t = e.offsetX || e.layerX,
          s = e.offsetY || e.layerY
        let i = '',
          a = '',
          r = ''
        const l = (t + this.pointX) / 2,
          n = (s + this.pointY) / 2,
          o = this.canvasElem.width / 2,
          d = this.canvasElem.height / 2,
          c = Math.abs(t - this.pointX),
          h = Math.abs(s - this.pointY),
          p = t < this.pointX
        ;(i = (8192 * (l - o) * 2) / this.canvasElem.width),
          (a = (8192 * (n - d) * 2) / this.canvasElem.height),
          t === this.pointX || s === this.pointY
            ? (r = 0)
            : ((r = (this.canvasElem.width * this.canvasElem.height) / (c * h)),
              p && (r = -r)),
          this.canvasContext.clearRect(
            0,
            0,
            this.canvasElem.width,
            this.canvasElem.height
          ),
          this.__controlSitPosition(i, a, r)
      }
    }
    __removeCanvasEvent() {
      this.canvasElem &&
        (this.canvasElem.removeEventListener(
          'mousedown',
          this.mousedownCanvasEvent
        ),
        this.canvasElem.removeEventListener(
          'mousemove',
          this.mousemoveCanvasEvent
        ),
        this.canvasElem.removeEventListener('mouseup', this.mouseupCanvasEvent),
        $(this.canvasElem).css({ display: 'none' }),
        (this.canvasElem = null),
        (this.canvasContext = null),
        (this.openSitPositionFlag = !1),
        $('.ws-pan-tilt-pzt-select', this.$el).attr({
          src: './static/WSPlayer/icon/ptz-select.svg'
        }))
    }
    __controlSitPosition(e, t, s) {
      const i = {
        project: 'PSDK',
        method: 'DMS.Ptz.SitPosition',
        data: {
          magicId: localStorage.getItem('magicId') || '',
          pointX: String(Math.round(e)),
          pointY: String(Math.round(t)),
          pointZ: String(Math.round(s)),
          extend: '1',
          channelId: this.channel.id
        }
      }
      this.controlSitPosition &&
        this.controlSitPosition(i)
          .then((e) => {
            let t = e.data || e
            t.result &&
              '0' === t.result &&
              this.wsPlayer.sendErrorMessage(701, {
                insert: [e.data.lockUser.userName],
                apiErrorInfo: e
              })
          })
          .catch((e) => {
            let t = ['']
            1103 === (e.data || e).code && (t[0] = '：您无权限进行此操作'),
              this.wsPlayer.sendErrorMessage(702, {
                apiErrorInfo: e,
                insert: t
              })
          })
    }
  }
  const C = {
      num: 1,
      maxNum: 25,
      showControl: !0,
      showRecordProgressBar: !0,
      isDynamicLoadLib: !0,
      onlyLoadSingleLib: !1,
      useNginxProxy: !0,
      openIvs: !0,
      ivsTypeArr: [1, 2],
      useH264MSE: !0,
      useH265MSE: !0,
      showIcons: {
        streamChangeSelect: !0,
        talkIcon: !0,
        localRecordIcon: !0,
        audioIcon: !0,
        snapshotIcon: !0,
        closeIcon: !0
      },
      downloadMp4Record: !0,
      localRecordSize: 100,
      playCenterRecordByTime: !1
    },
    T = { selfAdaption: '自适应', stretching: '拉伸' }
  class k {
    constructor(e) {
      if (!e.type) return console.error('type 为必传参数，请校验入参'), !1
      if (
        ((this.options = e),
        (this.type = e.type),
        (this.config = i.mergeObject(C, e.config)),
        (this.proxyServerIp =
          e.proxyServerIp || e.serverIp || location.hostname),
        (this.streamServerIp = e.streamServerIp || e.serverIp),
        (this.procedure = new I({
          type: this.type,
          player: this,
          playCenterRecordByTime: this.config.playCenterRecordByTime,
          getRealRtsp: e.getRealRtsp,
          getRecords: e.getRecords,
          getRecordRtspByTime: e.getRecordRtspByTime,
          getRecordRtspByFile: e.getRecordRtspByFile,
          getTalkRtsp: e.getTalkRtsp
        })),
        (this.sendMessage =
          e.receiveMessageFromWSPlayer || function (e, t, s) {}),
        (this.el = e.el),
        (this.fetchChannelAuthority = e.getChannelAuthority),
        (this.$el = $('#' + this.el)),
        !this.$el.length)
      )
        return void this.sendErrorMessage(503)
      ;(this.width = this.$el.attr('width')),
        (this.height = this.$el.attr('height')),
        this.$el.height(`${this.height}px`),
        this.$el.width(`${this.width}px`),
        this.$el.addClass('ws-player'),
        this.$el.append('<div class="player-wrapper"></div>'),
        (this.$wrapper = $('.player-wrapper', this.$el)),
        (this.playerList = []),
        (this.playerAdapter = 'selfAdaption'),
        (this.canvas = {}),
        (this.ctx = {}),
        (this.showNum = 1),
        (this.maxWindow = 1),
        $(this.$el).attr('inited', !0)
      let {
          isVersionCompliance: t,
          browserType: s,
          errorCode: a
        } = i.checkBrowser(),
        r = 'https:' === location.protocol
      switch (
        (this.config.isDynamicLoadLib && this.loadLibPlay(r, t),
        this.setMaxWindow(),
        (this.beforeShowNum = 1),
        this.type)
      ) {
        case 'real':
          this.createRealPlayer(e)
          break
        case 'record':
          this.createRecordPlayer(e)
      }
      this.setSelectIndex(0),
        this.setPlayerNum(this.config.num),
        this.setCanvasGetContext(),
        (this.bindUpdatePlayerWindow = this.__updatePlayerWindow.bind(this)),
        window.addEventListener('resize', this.bindUpdatePlayerWindow),
        window.wsPlayerManager || (window.wsPlayerManager = new v())
    }
    setCanvasGetContext() {
      var e
      window.wsCanvasGetContextSet ||
        ((window.wsCanvasGetContextSet = !0),
        (HTMLCanvasElement.prototype.getContext =
          ((e = HTMLCanvasElement.prototype.getContext),
          function (t, s) {
            return (
              'webgl' === t &&
                (s = Object.assign({}, s, { preserveDrawingBuffer: !0 })),
              e.call(this, t, s)
            )
          })))
    }
    setMaxWindow() {
      let e = parseInt(this.config.maxNum, 10)
      this.maxWindow = e > 16 ? 25 : e > 9 ? 16 : e > 4 ? 9 : e > 1 ? 4 : 1
    }
    createRealPlayer() {
      this.config.showControl
        ? this.__addRealControl()
        : this.$wrapper.addClass('nocontrol'),
        Array(this.maxWindow)
          .fill(1)
          .forEach((e, t) => {
            let s = new y({ wrapperDomId: this.el, index: t, wsPlayer: this })
            this.playerList.push(s)
          })
    }
    createRecordPlayer() {
      this.config.showRecordProgressBar && this.__addRecordControl(),
        this.config.showControl && this.__addRealControl(),
        !this.config.showRecordProgressBar &&
          !this.config.showControl &&
          this.$wrapper.addClass('nocontrol'),
        Array(this.maxWindow)
          .fill(1)
          .forEach((e, t) => {
            let s = new u({ wrapperDomId: this.el, index: t, wsPlayer: this })
            this.playerList.push(s)
          })
    }
    loadScript(e) {
      let t = document.createElement('script')
      ;(t.src = e), document.head.appendChild(t)
    }
    loadLibPlay(e, t) {
      if (window.loadLibPlayerFlag) return
      ;(window.loadLibPlayerFlag = !0),
        (window.m_nModuleInitialized = !1),
        window.Module || (window.Module = {}),
        (Module.onRuntimeInitialized = function () {
          window.m_nModuleInitialized = !0
        })
      let s = setInterval(() => {
          window.m_nModuleInitialized &&
            (this.sendMessage('initializationCompleted'), clearInterval(s))
        }, 100),
        i = './static/WSPlayer/multiThread/libplay.js'
      try {
        new SharedArrayBuffer(1)
      } catch (a) {
        i = './static/WSPlayer/singleThread/libplay.js'
      }
      ;(e && t && !this.config.onlyLoadSingleLib) ||
        (i = './static/WSPlayer/singleThread/libplay.js'),
        this.loadScript(i)
    }
    playReal(e) {
      if (!e.rtspURL) return void console.error('播放实时视频需要传入rtspURL')
      ;(e.wsURL = this.__getWSUrl(e.rtspURL, e.streamServerIp)),
        (e.playerAdapter = this.playerAdapter)
      let t = this.playerList[e.selectIndex]
      e.selectIndex + 1 < this.showNum
        ? this.setSelectIndex(e.selectIndex + 1)
        : this.selectIndex === e.selectIndex &&
          t &&
          this.setPtzChannel(e.channelData),
        t && t.init(e)
    }
    playRecord(e, t = {}) {
      let s = this.playerList[e.selectIndex]
      ;(e.wsURL = this.__getWSUrl(e.rtspURL, e.streamServerIp)),
        (e.playerAdapter = this.playerAdapter),
        (e.isPlayback = !0),
        e.selectIndex + 1 < this.showNum && !e.isJumpPlay
          ? this.setSelectIndex(e.selectIndex + 1)
          : ($('.ws-record-play', this.$el).css({ display: 'none' }),
            $('.ws-record-pause', this.$el).css({ display: 'block' }))
      for (let i in t) s[i] = t[i]
      s && s.init(e)
    }
    play(e) {
      let t = this.playerList[void 0 === e ? this.selectIndex : e]
      t
        ? 'pause' === t.status && t.play()
        : this.sendErrorMessage(601, { method: 'play', arguments: arguments })
    }
    pause(e) {
      let t = this.playerList[void 0 === e ? this.selectIndex : e]
      t
        ? 'playing' === t.status && t.pause()
        : this.sendErrorMessage(601, { method: 'pause', arguments: arguments })
    }
    playSpeed(e, t) {
      if ('real' === this.type)
        return void this.sendErrorMessage(607, {
          method: 'playSpeed',
          arguments: arguments
        })
      let s = this.playerList[void 0 === t ? this.selectIndex : t]
      s
        ? s.playSpeed(parseInt(e))
        : this.sendErrorMessage(601, {
            method: 'playSpeed',
            arguments: arguments
          })
    }
    setSelectIndex(e) {
      if (this.selectIndex === e || void 0 === e) return
      let t = this.playerList[e]
      if (t) {
        if (
          (this.procedure && this.procedure.setPlayIndex(e),
          'record' === this.type)
        ) {
          let s = t.status
          'playing' === s &&
            ($('.ws-record-play', this.$el).css({ display: 'none' }),
            $('.ws-record-pause', this.$el).css({ display: 'block' })),
            ['playing', 'pause'].includes(s)
              ? this.procedure && this.procedure.changeTimeLine(e)
              : (this.setTimeLine([]),
                $('.ws-record-pause', this.$el).css({ display: 'none' }),
                $('.ws-record-play', this.$el).css({ display: 'block' })),
            this.__setPlaySpeed('', e)
        }
        this.sendMessage('selectWindowChanged', {
          channelId: (t.options || {}).channelId,
          playIndex: e
        }),
          (this.selectIndex = e),
          this.setPtzChannel((t.options || {}).channelData),
          this.playerList.forEach((t, s) => {
            s === e
              ? t.$el.removeClass('unselected').addClass('selected')
              : t.$el.removeClass('selected').addClass('unselected'),
              this.__updateVoice(t, s === e)
          })
      } else this.sendErrorMessage(601, { method: 'setSelectIndex', arguments: arguments })
    }
    setPlayerNum(e) {
      let t = parseInt(e) || 1
      t <= 1
        ? ((t = 1),
          this.$el.removeClass(
            'screen-split-4 screen-split-9 screen-split-16 screen-split-25'
          ),
          this.$el.addClass('fullplayer'))
        : t > 1 && t <= 4
        ? ((t = 4),
          this.$el.removeClass(
            'fullplayer screen-split-9 screen-split-16 screen-split-25'
          ),
          this.$el.addClass('screen-split-4'))
        : t > 4 && t <= 9
        ? ((t = 9),
          this.$el.removeClass(
            'fullplayer screen-split-4 screen-split-16 screen-split-25'
          ),
          this.$el.addClass('screen-split-9'))
        : t > 9 && t <= 16
        ? ((t = 16),
          this.$el.removeClass(
            'fullplayer screen-split-4 screen-split-9 screen-split-25'
          ),
          this.$el.addClass('screen-split-16'))
        : ((t = 25),
          this.$el.removeClass(
            'fullplayer screen-split-4 screen-split-9 screen-split-16'
          ),
          this.$el.addClass('screen-split-25')),
        t > this.maxWindow && (t = this.maxWindow),
        this.showNum !== t &&
          ((this.showNum = t),
          this.sendMessage('windowNumChanged', this.showNum),
          setTimeout(() => {
            this.__updatePlayerWindow()
          }, 200))
    }
    setPlayerAdapter(e) {
      this.playerAdapter !== e &&
        (['selfAdaption', 'stretching'].includes(e)
          ? ((this.playerAdapter = e),
            $('.ws-select-show-option', this.$el).text(T[e]),
            this.__updatePlayerWindow())
          : this.sendErrorMessage(606, {
              method: 'setPlayerAdapter',
              arguments: arguments
            }))
    }
    setTimeLine(e = []) {
      ;(this.timeList = e),
        this.timeList.length
          ? $('#ws-record-time-box', this.$el).css({ visibility: 'visible' })
          : $('#ws-record-time-box', this.$el).css({ visibility: 'hidden' }),
        this.__setTimeRecordArea(e)
    }
    setFullScreen() {
      let e = this.$el[0].children[0]
      e.requestFullscreen
        ? e.requestFullscreen()
        : e.webkitRequestFullscreen
        ? e.webkitRequestFullscreen()
        : e.mozRequestFullScreen
        ? e.mozRequestFullScreen()
        : e.msRequestFullscreen && e.msRequestFullscreen(),
        this.__updatePlayerWindow()
    }
    close(e) {
      let t = Number(e),
        s = this.playerList[t]
      s
        ? (s.close(), this.selectIndex === t && this.setTimeLine([]))
        : (this.setTimeLine([]),
          this.playerList.forEach((e) => {
            e.close()
          }),
          window.removeEventListener('resize', this.bindUpdatePlayerWindow))
    }
    __addRealControl() {
      this.$el.append(
        '\n            <div class="ws-control">\n                <div class="ws-flex ws-control-record ws-flex-left">\n                    <div class="ws-ctrl-record-icon ws-record-play" style="display: none" title="播放"></div>\n                    <div class="ws-ctrl-record-icon ws-record-pause" title="暂停"></div>\n                    <div class="ws-ctrl-record-icon ws-record-speed-sub" title="倍速-"></div>\n                    <div class="ws-ctrl-record-icon ws-record-speed-txt">1x</div>\n                    <div class="ws-ctrl-record-icon ws-record-speed-add" title="倍速+"></div>\n                </div>\n                <div class="ws-flex ws-flex-end">\n                    <div class="ws-select-self-adaption">\n                        <div class="ws-select-show select">\n                            <div class="ws-select-show-option">自适应</div>\n                            \x3c!-- 下拉箭头 --\x3e\n                            <img src="./static/WSPlayer/icon/spread.png" />\n                        </div>\n                        <div class="ws-self-adaption-type" style="display: none">\n                            <ul class="ws-select-ul">\n                                <li optionValue="自适应" value="selfAdaption" class="ws-select-type-item">自适应</li>\n                                <li optionValue="拉伸" value="stretching" class="ws-select-type-item">拉伸</li>\n                            </ul>\n                        </div>\n                    </div>\n                    <span class="ws-ctrl-btn-spread"></span>\n                    <div class="ws-ctrl-icon close-all-video" title="一键关闭"></div>\n                    <span class="ws-ctrl-btn-spread"></span>\n                    <div class="ws-ctrl-icon one-screen-icon" title="单屏"></div>\n                    <div class="ws-ctrl-icon four-screen-icon" title="4分屏"></div>\n                    <div class="ws-ctrl-icon nine-screen-icon" title="9分屏"></div>\n                    <div class="ws-ctrl-icon sixteen-screen-icon" title="16分屏"></div>\n                    <div class="ws-ctrl-icon twenty-five-screen-icon" title="25分屏"></div>\n                    <span class="ws-ctrl-btn-spread"></span>\n                    <div class="ws-ctrl-icon full-screen-icon" title="全屏"></div>\n                </div>\n            </div>\n        '
      ),
        this.maxWindow <= 16 &&
          $('.twenty-five-screen-icon', this.$el).css({ display: 'none' }),
        this.maxWindow <= 9 &&
          $('.sixteen-screen-icon', this.$el).css({ display: 'none' }),
        this.maxWindow <= 4 &&
          $('.nine-screen-icon', this.$el).css({ display: 'none' }),
        1 === this.maxWindow &&
          ($('.four-screen-icon', this.$el).css({ display: 'none' }),
          $('.one-screen-icon', this.$el).css({ display: 'none' })),
        $('.full-screen-icon', this.$el).click(() => {
          this.setFullScreen()
        }),
        $('.one-screen-icon', this.$el).click(() => {
          this.setPlayerNum(1)
        }),
        $('.four-screen-icon', this.$el).click(() => {
          this.setPlayerNum(4)
        }),
        $('.nine-screen-icon', this.$el).click(() => {
          this.setPlayerNum(9)
        }),
        $('.sixteen-screen-icon', this.$el).click(() => {
          this.setPlayerNum(16)
        }),
        $('.twenty-five-screen-icon', this.$el).click(() => {
          this.setPlayerNum(25)
        }),
        $('.close-all-video', this.$el).click(() => {
          this.close()
        }),
        (this.selfAdaptionSelectShow = !1),
        $('.ws-select-self-adaption', this.$el).click((e) => {
          this.selfAdaptionSelectShow
            ? ($('.ws-self-adaption-type', this.$el).hide(),
              (this.selfAdaptionSelectShow = !1))
            : ($('.ws-self-adaption-type', this.$el).show(),
              (this.selfAdaptionSelectShow = !0),
              $('.ws-select-ul .ws-select-type-item', this.$el).css({
                background: 'none'
              }),
              $(`.ws-select-ul [value=${this.playerAdapter}]`, this.$el).css({
                background: '#1A78EA'
              }))
        }),
        $('.ws-self-adaption-type', this.$el).click((e) => {
          let t = e.target.getAttribute('value')
          this.setPlayerAdapter(t),
            $('.ws-select-show-option', this.$el).text(T[t])
        }),
        'record' !== this.type &&
          $('.ws-control-record', this.$el).css({ display: 'none' }),
        $('.ws-record-pause', this.$el).click((e) => {
          this.pause()
        }),
        $('.ws-record-play', this.$el).click((e) => {
          this.play()
        }),
        $('.ws-record-speed-sub', this.$el).click((e) => {
          'playing' === this.playerList[this.selectIndex].status &&
            this.__setPlaySpeed('PREV')
        }),
        $('.ws-record-speed-add', this.$el).click((e) => {
          'playing' === this.playerList[this.selectIndex].status &&
            this.__setPlaySpeed('NEXT')
        })
    }
    __setPlaySpeed(e, t) {
      let s,
        i,
        a = [
          { value: 0.125, label: '0.125x' },
          { value: 0.25, label: '0.25x' },
          { value: 0.5, label: '0.5x' },
          { value: 1, label: '1x' },
          { value: 1.25, label: '1.25x' },
          { value: 1.5, label: '1.5x' },
          { value: 2, label: '2x' },
          { value: 4, label: '4x' },
          { value: 8, label: '8x' }
        ],
        r = this.playerList[void 0 === t ? this.selectIndex : t]
      a.some((l, n) => {
        if (l.value === r.speed)
          return (
            (i = 'PREV' === e ? n - 1 : 'NEXT' === e ? n + 1 : n),
            (s = a[i]),
            !s ||
              (i
                ? i === a.length - 1
                  ? $('.ws-record-speed-add', this.$el).css({
                      cursor: 'not-allowed'
                    })
                  : ($('.ws-record-speed-sub', this.$el).css({
                      cursor: 'pointer'
                    }),
                    $('.ws-record-speed-add', this.$el).css({
                      cursor: 'pointer'
                    }))
                : $('.ws-record-speed-sub', this.$el).css({
                    cursor: 'not-allowed'
                  }),
              $('.ws-record-speed-txt', this.$el).text(s.label),
              'playing' === r.status && this.playSpeed(s.value, t),
              !0)
          )
      })
    }
    __addRecordControl() {
      this.$el.append(
        '\n            <div class="ws-control ws-record-control">\n                <div class="ws-timeline">\n                    <div class="ws-timeline-group"></div>\n                    <div class="ws-timeline-group"></div>\n                </div>\n                \x3c!--当前播放的时间点--\x3e\n                <div id="ws-record-time-box">\n                    <div class=\'ws-record-time\'>\n                        <span></span>\n                    </div>\n                </div>\n                <canvas height="60" id="ws-record-canvas" class="ws-record-area"/>\n            </div>\n        '
      ),
        (this.canvas = document.getElementById('ws-record-canvas')),
        (this.ctx = this.canvas.getContext('2d'))
      let e = $(
          this.$el[0].getElementsByClassName('ws-timeline-group')[0],
          this.$el
        ),
        t = $(
          this.$el[0].getElementsByClassName('ws-timeline-group')[1],
          this.$el
        )
      new Array(49).fill(1).forEach((t, s) => {
        let i = 'ws-time-space ' + (s % 4 ? '' : 'ws-time-space-long')
        e.append(`<span class="${i}"></span>`)
      }),
        new Array(13).fill(1).forEach((e, s) => {
          t.append(
            `<span class="ws-time-point">${(2 * s + ':00').padStart(
              5,
              '0'
            )}</span>`
          )
        }),
        $('.ws-record-control', this.$el).mouseenter((e) => {
          $('.ws-record-control').append(
            "<div id='ws-cursor'><div class='ws-cursor-time'><span></span></div></div>"
          )
        }),
        $('.ws-record-control', this.$el).mousemove((e) => {
          let t = $('.ws-record-control', this.$el).width(),
            s =
              e.clientX -
              $('.ws-record-control', this.$el)[0].getBoundingClientRect().left,
            i = new Date(1e3 * ((s / t) * 24 * 60 * 60 - 28800)),
            a = `${`${i.getHours()}`.padStart(
              2,
              '0'
            )}:${`${i.getMinutes()}`.padStart(
              2,
              '0'
            )}:${`${i.getSeconds()}`.padStart(2, '0')}`
          $('#ws-cursor', this.$el).css('left', s),
            $('#ws-cursor span', this.$el).text(a)
        }),
        $('.ws-record-control', this.$el).mouseleave((e) => {
          $('#ws-cursor', this.$el).remove()
        }),
        $('.ws-record-control', this.$el).click((e) => {
          if (
            ['playing', 'pause'].includes(
              (this.playerList[this.selectIndex] || {}).status
            )
          ) {
            let t = $('.ws-record-control', this.$el).width(),
              s =
                e.clientX -
                $('.ws-record-control', this.$el)[0].getBoundingClientRect()
                  .left,
              i = parseInt((s / t) * 24 * 60 * 60, 10)
            this.clickRecordTimeLine(i)
          }
        })
    }
    __setTimeRecordArea(e = []) {
      if (e.length) {
        let t = $('.ws-record-control', this.$el).width()
        this.canvas.width = t
        let s = [],
          i = [],
          a = this.ctx.createLinearGradient(0, 0, 0, 60)
        a.addColorStop(0, 'rgba(77, 201, 233, 0.1)'),
          a.addColorStop(1, '#1c79f4')
        let r = this.ctx.createLinearGradient(0, 0, 0, 60)
        r.addColorStop(0, 'rgba(251, 121, 101, 0.1)'),
          r.addColorStop(1, '#b52c2c'),
          e.forEach((e) => {
            e.width = ((e.endTime - e.startTime) * t) / 86400
            let a = new Date(1e3 * e.startTime),
              r = a.getHours(),
              l = a.getMinutes(),
              n = a.getSeconds()
            ;(e.left = ((3600 * r + 60 * l + n) / 86400) * t),
              e.isImportant ? i.push(e) : s.push(e)
          }),
          s.forEach((e) => {
            this.ctx.clearRect(e.left, 0, e.width, 60),
              (this.ctx.fillStyle = a),
              this.ctx.fillRect(e.left, 0, e.width, 60)
          }),
          i.forEach((e) => {
            this.ctx.clearRect(e.left, 0, e.width, 60),
              (this.ctx.fillStyle = r),
              this.ctx.fillRect(e.left, 0, e.width, 60)
          })
      } else this.canvas.width = 0
    }
    __setPlayingTime(e, t, s, i, a, r, l) {
      if (this.selectIndex === e) {
        let e =
            ((3600 * a + 60 * r + l) / 86400) * $('.ws-record-control').width(),
          t = `${String(a).padStart(2, '0')}:${String(r).padStart(
            2,
            '0'
          )}:${String(l).padStart(2, '0')}`
        $('#ws-record-time-box', this.$el).css('left', e),
          $('#ws-record-time-box span', this.$el).text(t)
      }
    }
    __getWSUrl(e, s) {
      let i = 'https:' === location.protocol,
        a = e.match(/\d{1,3}(\.\d{1,3}){3}/g)[0]
      a || (a = e.split('//')[1].split(':')[0])
      let r = i ? 'wss' : 'ws'
      if (this.config.useNginxProxy) {
        let e =
          'real' === this.type
            ? t.websocketPorts.realmonitor
            : t.websocketPorts.playback
        return `${r}://${this.proxyServerIp}/${e}?serverIp=${
          s || this.streamServerIp || a
        }`
      }
      if (this.streamServerIp.includes(':'))
        return `${r}://${this.streamServerIp}`
      let l = ''
      return (
        (l = i
          ? 'real' === this.type
            ? t.websocketPorts.realmonitor_wss
            : t.websocketPorts.playback_wss
          : 'real' === this.type
          ? t.websocketPorts.realmonitor_ws
          : t.websocketPorts.playback_ws),
        `${r}://${this.streamServerIp}:${l}`
      )
    }
    __updatePlayerWindow() {
      setTimeout(() => {
        this.playerList.forEach((e) => {
          e.updateAdapter(this.playerAdapter)
        }),
          this.setTimeLine(this.timeList)
      }, 24)
    }
    __updateVoice(e, t) {
      t
        ? $('.audio-icon', e.$el).hasClass('on') && e.player.setAudioVolume(1)
        : e.player && e.player.setAudioVolume(0)
    }
    __startTalk(e) {
      this.procedure && this.procedure.startTalk(e)
    }
    playRealVideo(e, t = '2', s) {
      this.procedure && this.procedure.playRealVideo(e, t, s)
    }
    changeStreamType(e, t, s) {
      this.procedure && this.procedure.playRealVideo([e], t, s)
    }
    getRecordList(e) {
      this.procedure && this.procedure.getRecordList(e)
    }
    clickRecordTimeLine(e) {
      let t =
        new Date(1e3 * this.timeList[0].startTime).setHours(0, 0, 0) / 1e3 + e
      this.timeList.some((s) => {
        if (t >= s.startTime && t < s.endTime) {
          let t = this.playerList[this.selectIndex]
          return (
            t.options.playRecordByTime && t.options.ssId === s.ssId
              ? t.player.playByTime(e)
              : this.procedure && this.procedure.clickRecordTimeLine(e, s.ssId),
            !0
          )
        }
      }) || console.warn('所选时间点无录像')
    }
    jumpPlayByTime(e) {
      let t = e.split(':'),
        s = 60 * (t[0] || 0) * 60 + 60 * (t[1] || 0) + 1 * (t[2] || 0)
      3 !== t.length || !s || s >= 86400
        ? this.sendErrorMessage(605, {
            method: 'jumpPlayByTime',
            arguments: arguments
          })
        : this.clickRecordTimeLine(s)
    }
    playNextRecord(e, t) {
      this.procedure && this.procedure.playNextRecord(e, t)
    }
    videoClosed(e, t) {
      this.sendMessage('closeVideo', { selectIndex: e, changeVideoFlag: t }),
        this.procedure && this.procedure.videoClosed(e, t)
    }
    sendErrorMessage(e, s = {}) {
      let i = t.errorInfo[e]
      s.insert &&
        (s.insert.forEach((e, t) => {
          i = i.replace(`$${t}`, e)
        }),
        delete s.insert),
        this.sendMessage('errorInfo', {
          errorCode: e,
          errorInfo: i,
          errorData: s
        })
    }
    startLocalRecord(e, t, s, i) {
      let a = this.playerList[e]
      a
        ? 'playing' === a.status && 'pause' === a.status
          ? a.isRecording
            ? this.sendErrorMessage(602, {
                method: 'startLocalRecord',
                arguments: arguments
              })
            : ((a.isRecording = !0),
              a.player.startLocalRecord(t, s, i),
              $('.record-icon', a.$el).addClass('recording'))
          : this.sendErrorMessage(603, {
              method: 'startLocalRecord',
              arguments: arguments
            })
        : this.sendErrorMessage(601, {
            method: 'startLocalRecord',
            arguments: arguments
          })
    }
    stopLocalRecord(e) {
      let t = this.playerList[e]
      t
        ? t.isRecording
          ? ((t.isRecording = !1),
            t.player.stopLocalRecord(),
            $('.record-icon', t.$el).removeClass('recording'))
          : this.sendErrorMessage(604, {
              method: 'stopLocalRecord',
              arguments: arguments
            })
        : this.sendErrorMessage(601, {
            method: 'stopLocalRecord',
            arguments: arguments
          })
    }
    initPanTilt(e) {
      this.panTilt = new b(e, this)
    }
    setPtzChannel(e) {
      this.panTilt && this.panTilt.setChannel(e)
    }
  }
  __publicField(k, 'version', '1.2.7'),
    (e.WSPlayer = k),
    (e.default = k),
    Object.defineProperties(e, {
      __esModule: { value: !0 },
      [Symbol.toStringTag]: { value: 'Module' }
    })
})
