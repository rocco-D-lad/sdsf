var PlayerControl = (function (e) {
  var t = {}
  function n(r) {
    if (t[r]) return t[r].exports
    var i = (t[r] = { i: r, l: !1, exports: {} })
    return e[r].call(i.exports, i, i.exports, n), (i.l = !0), i.exports
  }
  return (
    (n.m = e),
    (n.c = t),
    (n.d = function (e, t, r) {
      n.o(e, t) || Object.defineProperty(e, t, { enumerable: !0, get: r })
    }),
    (n.r = function (e) {
      'undefined' !== typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(e, Symbol.toStringTag, { value: 'Module' }),
        Object.defineProperty(e, '__esModule', { value: !0 })
    }),
    (n.t = function (e, t) {
      if ((1 & t && (e = n(e)), 8 & t)) return e
      if (4 & t && 'object' === typeof e && e && e.__esModule) return e
      var r = Object.create(null)
      if (
        (n.r(r),
        Object.defineProperty(r, 'default', { enumerable: !0, value: e }),
        2 & t && 'string' != typeof e)
      )
        for (var i in e)
          n.d(
            r,
            i,
            function (t) {
              return e[t]
            }.bind(null, i)
          )
      return r
    }),
    (n.n = function (e) {
      var t =
        e && e.__esModule
          ? function () {
              return e.default
            }
          : function () {
              return e
            }
      return n.d(t, 'a', t), t
    }),
    (n.o = function (e, t) {
      return Object.prototype.hasOwnProperty.call(e, t)
    }),
    (n.p = ''),
    n((n.s = 3))
  )
})([
  function (e, t, n) {
    'use strict'
    n.d(t, 'h', function () {
      return r
    }),
      n.d(t, 'e', function () {
        return d
      }),
      n.d(t, 'c', function () {
        return c
      }),
      n.d(t, 'b', function () {
        return h
      }),
      n.d(t, 'd', function () {
        return f
      }),
      n.d(t, 'a', function () {
        return u
      }),
      n.d(t, 'g', function () {
        return s
      }),
      n.d(t, 'f', function () {
        return l
      }),
      n.d(t, 'i', function () {
        return p
      })
    var r = {
      log: function () {},
      error: function () {},
      count: function () {},
      info: function () {}
    }
    var i = {
      Opera: 'Opera',
      Chrome: 'Chrome',
      Firefox: 'Firefox',
      Edge: 'Edge',
      IE: 'IE',
      Safari: 'Safari'
    }
    function a() {
      var e = navigator.userAgent
      return e.includes('Edge')
        ? i.Edge
        : e.includes('Firefox')
        ? i.Firefox
        : e.includes('Chrome')
        ? i.Chrome
        : e.includes('Safari')
        ? i.Safari
        : e.includes('compatible') && e.includes('MSIE') && e.includes('Opera')
        ? i.IE
        : e.includes('Opera')
        ? i.Opera
        : ''
    }
    function o(e) {
      return navigator.userAgent.split(e)[1].split('.')[0].slice(1)
    }
    function s() {
      var e,
        t = a(),
        n = o(t),
        r = !1,
        s = !0
      switch (t) {
        case i.Chrome:
          r = n >= 104
          break
        default:
          r = !1
      }
      try {
        e = new MediaSource()
      } catch (e) {
        ;(r = !1), (s = !1)
      }
      return (
        e || ((r = !1), (s = !1)), { bSupportH265MSE: r, bSupportH264MSE: s }
      )
    }
    function l() {
      var e = a(),
        t = o(e),
        n = !1,
        r = 0
      switch (e) {
        case i.Chrome:
          ;(n = t >= 91), (r = 701)
          break
        case i.Firefox:
          ;(n = t >= 97), (r = 702)
          break
        case i.Edge:
          ;(n = t >= 91), (r = 703)
          break
        default:
          n = 0
      }
      return { isVersionCompliance: n, browserType: e, errorCode: r }
    }
    function u() {
      var e = navigator.userAgent.toLowerCase(),
        t = navigator.appName,
        n = null
      return (
        'Microsoft Internet Explorer' === t ||
        e.indexOf('trident') > -1 ||
        e.indexOf('edge/') > -1
          ? ((n = 'ie'),
            'Microsoft Internet Explorer' === t
              ? ((e = /msie ([0-9]{1,}[\.0-9]{0,})/.exec(e)),
                (n += parseInt(e[1])))
              : e.indexOf('trident') > -1
              ? (n += 11)
              : e.indexOf('edge/') > -1 && (n = 'edge'))
          : e.indexOf('safari') > -1
          ? (n = e.indexOf('chrome') > -1 ? 'chrome' : 'safari')
          : e.indexOf('firefox') > -1 && (n = 'firefox'),
        n
      )
    }
    var c = (function () {
        function e() {}
        return (
          (e.createFromElementId = function (t) {
            for (
              var n = document.getElementById(t), r = '', i = n.firstChild;
              i;

            )
              3 === i.nodeType && (r += i.textContent), (i = i.nextSibling)
            var a = new e()
            return (a.type = n.type), (a.source = r), a
          }),
          (e.createFromSource = function (t, n) {
            var r = new e()
            return (r.type = t), (r.source = n), r
          }),
          e
        )
      })(),
      f = (function () {
        return function (e, t) {
          if ('x-shader/x-fragment' === t.type)
            this.shader = e.createShader(e.FRAGMENT_SHADER)
          else {
            if ('x-shader/x-vertex' !== t.type)
              return void error('Unknown shader type: ' + t.type)
            this.shader = e.createShader(e.VERTEX_SHADER)
          }
          e.shaderSource(this.shader, t.source),
            e.compileShader(this.shader),
            e.getShaderParameter(this.shader, e.COMPILE_STATUS) ||
              error(
                'An error occurred compiling the shaders: ' +
                  e.getShaderInfoLog(this.shader)
              )
        }
      })(),
      h = (function () {
        function e(e) {
          ;(this.gl = e), (this.program = this.gl.createProgram())
        }
        return (
          (e.prototype = {
            attach: function (e) {
              this.gl.attachShader(this.program, e.shader)
            },
            link: function () {
              this.gl.linkProgram(this.program)
            },
            use: function () {
              this.gl.useProgram(this.program)
            },
            getAttributeLocation: function (e) {
              return this.gl.getAttribLocation(this.program, e)
            },
            setMatrixUniform: function (e, t) {
              var n = this.gl.getUniformLocation(this.program, e)
              this.gl.uniformMatrix4fv(n, !1, t)
            }
          }),
          e
        )
      })(),
      d = (function () {
        var e = null
        function t(e, t, n) {
          ;(this.gl = e),
            (this.size = t),
            (this.texture = e.createTexture()),
            e.bindTexture(e.TEXTURE_2D, this.texture),
            (this.format = n || e.LUMINANCE),
            e.texImage2D(
              e.TEXTURE_2D,
              0,
              this.format,
              t.w,
              t.h,
              0,
              this.format,
              e.UNSIGNED_BYTE,
              null
            ),
            e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MAG_FILTER, e.NEAREST),
            e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MIN_FILTER, e.NEAREST),
            e.texParameteri(e.TEXTURE_2D, e.TEXTURE_WRAP_S, e.CLAMP_TO_EDGE),
            e.texParameteri(e.TEXTURE_2D, e.TEXTURE_WRAP_T, e.CLAMP_TO_EDGE)
        }
        return (
          (t.prototype = {
            fill: function (e, t) {
              var n = this.gl
              n.bindTexture(n.TEXTURE_2D, this.texture),
                t
                  ? n.texSubImage2D(
                      n.TEXTURE_2D,
                      0,
                      0,
                      0,
                      this.size.w,
                      this.size.h,
                      this.format,
                      n.UNSIGNED_BYTE,
                      e
                    )
                  : n.texImage2D(
                      n.TEXTURE_2D,
                      0,
                      this.format,
                      this.size.w,
                      this.size.h,
                      0,
                      this.format,
                      n.UNSIGNED_BYTE,
                      e
                    )
            },
            bind: function (t, n, r) {
              var i = this.gl
              e || (e = [i.TEXTURE0, i.TEXTURE1, i.TEXTURE2]),
                i.activeTexture(e[t]),
                i.bindTexture(i.TEXTURE_2D, this.texture),
                i.uniform1i(i.getUniformLocation(n.program, r), t)
            }
          }),
          t
        )
      })()
    function p(e, t, n) {
      var r = (
          arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {}
        ).downloadMP4,
        i = parseInt(n) || 500
      e.postMessage({
        type: 'init',
        options: {
          recordName: t,
          singleSize: 1048576 * i,
          nameOptions: { namedBy: 'date', nameFormat: ['ymd_his'] },
          limitOptions: { limitBy: 'count', count: 10 }
        }
      }),
        (e.onMessage = function (n) {
          switch (n.type) {
            case 'pendding':
              break
            case 'download':
              !(function (e, t) {
                var n = new Blob([t]),
                  r = document.createElement('a')
                ;(r.href = URL.createObjectURL(n)),
                  (r.download = e),
                  r.click(),
                  URL.revokeObjectURL(r.href),
                  (r = null),
                  (t = null)
              })(t, n.data.buffer)
              break
            case 'closed':
              e = null
              break
            case 'downloadMP4':
              r && r()
          }
        })
    }
  },
  ,
  function (e, t) {
    e.exports = function () {
      return new Worker('./static/WSPlayer/audioTalkWorker.js')
    }
  },
  function (e, t, n) {
    'use strict'
    n.r(t)
    var r = function (e) {
      var t = [],
        n = {},
        r = e
      function i() {
        for (var e in t)
          t[e] = [
            e.charCodeAt(0),
            e.charCodeAt(1),
            e.charCodeAt(2),
            e.charCodeAt(3)
          ]
        0,
          1 == r
            ? (n.FTYP = new Uint8Array([
                105, 115, 111, 109, 0, 0, 0, 1, 105, 115, 111, 109, 97, 118, 99,
                49
              ]))
            : 2 == r &&
              (n.FTYP = new Uint8Array([
                105, 115, 111, 109, 0, 0, 2, 0, 105, 115, 111, 109, 105, 115,
                111, 50, 97, 118, 99, 49, 109, 112, 52, 49
              ])),
          (n.STSD_PREFIX = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 1])),
          (n.STTS = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0])),
          (n.STSC = n.STCO = n.STTS),
          (n.STSZ = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])),
          (n.HDLR_VIDEO = new Uint8Array([
            0, 0, 0, 0, 0, 0, 0, 0, 118, 105, 100, 101, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 86, 105, 100, 101, 111, 72, 97, 110, 100, 108, 101, 114,
            0
          ])),
          (n.HDLR_AUDIO = new Uint8Array([
            0, 0, 0, 0, 0, 0, 0, 0, 115, 111, 117, 110, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 83, 111, 117, 110, 100, 72, 97, 110, 100, 108, 101, 114,
            0
          ])),
          (n.DREF = new Uint8Array([
            0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 12, 117, 114, 108, 32, 0, 0, 0, 1
          ])),
          (n.SMHD = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0])),
          (n.VMHD = new Uint8Array([0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0]))
      }
      t = {
        avc1: [],
        avcC: [],
        btrt: [],
        dinf: [],
        dref: [],
        esds: [],
        ftyp: [],
        hdlr: [],
        mdat: [],
        mdhd: [],
        mdia: [],
        mfhd: [],
        minf: [],
        moof: [],
        moov: [],
        mp4a: [],
        mvex: [],
        mvhd: [],
        sdtp: [],
        stbl: [],
        stco: [],
        stsc: [],
        stsd: [],
        stsz: [],
        stts: [],
        tfdt: [],
        tfhd: [],
        traf: [],
        trak: [],
        trun: [],
        trex: [],
        tkhd: [],
        vmhd: [],
        smhd: [],
        hev1: [],
        hvcC: []
      }
      var a = function (e) {
          for (
            var t = 8, n = Array.prototype.slice.call(arguments, 1), r = 0;
            r < n.length;
            r++
          )
            t += n[r].byteLength
          var i = new Uint8Array(t),
            a = 0
          ;(i[a++] = (t >>> 24) & 255),
            (i[a++] = (t >>> 16) & 255),
            (i[a++] = (t >>> 8) & 255),
            (i[a++] = 255 & t),
            i.set(e, a),
            (a += 4)
          for (r = 0; r < n.length; r++) i.set(n[r], a), (a += n[r].byteLength)
          return i
        },
        o = function (e) {
          return a(
            t.mp4a,
            new Uint8Array([
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              1,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              (65280 & e.channelcount) >> 8,
              255 & e.channelcount,
              (65280 & e.samplesize) >> 8,
              255 & e.samplesize,
              0,
              0,
              0,
              0,
              (65280 & e.samplerate) >> 8,
              255 & e.samplerate,
              0,
              0
            ]),
            (function (e) {
              var n = e.config,
                r = n.length,
                i = new Uint8Array(
                  [
                    0,
                    0,
                    0,
                    0,
                    3,
                    23 + r,
                    0,
                    1,
                    0,
                    4,
                    15 + r,
                    64,
                    21,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    5
                  ]
                    .concat([r])
                    .concat(n)
                    .concat([6, 1, 2])
                )
              return a(t.esds, i)
            })(e)
          )
        },
        s = function (e) {
          return 'audio' === e.type
            ? a(t.stsd, n.STSD_PREFIX, o(e))
            : a(
                t.stsd,
                n.STSD_PREFIX,
                (function (e) {
                  var n = e.vps || [],
                    i = e.sps || [],
                    o = e.pps || [],
                    s = [],
                    l = [],
                    u = [],
                    c = 0
                  for (c = 0; c < n.length; c++)
                    s.push((65280 & n[c].byteLength) >>> 8),
                      s.push(255 & n[c].byteLength),
                      (s = s.concat(Array.prototype.slice.call(n[c])))
                  for (c = 0; c < i.length; c++)
                    l.push((65280 & i[c].byteLength) >>> 8),
                      l.push(255 & i[c].byteLength),
                      (l = l.concat(Array.prototype.slice.call(i[c])))
                  for (c = 0; c < o.length; c++)
                    u.push((65280 & o[c].byteLength) >>> 8),
                      u.push(255 & o[c].byteLength),
                      (u = u.concat(Array.prototype.slice.call(o[c])))
                  return 1 == r
                    ? a(
                        t.avc1,
                        new Uint8Array([
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          1,
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          (65280 & e.width) >> 8,
                          255 & e.width,
                          (65280 & e.height) >> 8,
                          255 & e.height,
                          0,
                          72,
                          0,
                          0,
                          0,
                          72,
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          1,
                          19,
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          24,
                          17,
                          17
                        ]),
                        a(
                          t.avcC,
                          new Uint8Array(
                            [
                              1,
                              e.profileIdc,
                              e.profileCompatibility,
                              e.levelIdc,
                              255
                            ]
                              .concat([i.length])
                              .concat(l)
                              .concat([o.length])
                              .concat(u)
                          )
                        )
                      )
                    : 2 == r
                    ? a(
                        t.hev1,
                        new Uint8Array([
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          1,
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          (65280 & e.width) >> 8,
                          255 & e.width,
                          (65280 & e.height) >> 8,
                          255 & e.height,
                          0,
                          72,
                          0,
                          0,
                          0,
                          72,
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          1,
                          19,
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          24,
                          17,
                          17
                        ]),
                        a(
                          t.hvcC,
                          new Uint8Array(
                            [
                              1,
                              e.general_profile_flag,
                              (4278190080 &
                                e.general_profile_compatibility_flags) >>>
                                24,
                              (16711680 &
                                e.general_profile_compatibility_flags) >>>
                                16,
                              (65280 &
                                e.general_profile_compatibility_flags) >>>
                                8,
                              255 & e.general_profile_compatibility_flags,
                              (0xff0000000000 &
                                e.general_constraint_indicator_flags) >>>
                                40,
                              (0xff00000000 &
                                e.general_constraint_indicator_flags) >>>
                                32,
                              (4278190080 &
                                e.general_constraint_indicator_flags) >>>
                                24,
                              (16711680 &
                                e.general_constraint_indicator_flags) >>>
                                16,
                              (65280 & e.general_constraint_indicator_flags) >>>
                                8,
                              255 & e.general_constraint_indicator_flags,
                              e.general_level_idc,
                              240,
                              0,
                              252,
                              252 | e.chroma_format_idc,
                              248 | e.bitDepthLumaMinus8,
                              248 | e.bitDepthChromaMinus8,
                              0,
                              0,
                              e.rate_layers_nested_length,
                              3
                            ]
                              .concat([32, 0, 1])
                              .concat(s)
                              .concat([33, 0, 1])
                              .concat(l)
                              .concat([34, 0, 1])
                              .concat(u)
                          )
                        )
                      )
                    : void 0
                })(e)
              )
        },
        l = function (e) {
          var r = null
          return (
            (r = 'audio' === e.type ? a(t.smhd, n.SMHD) : a(t.vmhd, n.VMHD)),
            a(
              t.minf,
              r,
              a(t.dinf, a(t.dref, n.DREF)),
              (function (e) {
                return a(
                  t.stbl,
                  s(e),
                  a(t.stts, n.STTS),
                  a(t.stsc, n.STSC),
                  a(t.stsz, n.STSZ),
                  a(t.stco, n.STCO)
                )
              })(e)
            )
          )
        },
        u = function (e) {
          return a(
            t.mdia,
            (function (e) {
              var n = e.timescale,
                r = e.duration
              return a(
                t.mdhd,
                new Uint8Array([
                  0,
                  0,
                  0,
                  0,
                  0,
                  0,
                  0,
                  0,
                  0,
                  0,
                  0,
                  0,
                  (n >>> 24) & 255,
                  (n >>> 16) & 255,
                  (n >>> 8) & 255,
                  255 & n,
                  (r >>> 24) & 255,
                  (r >>> 16) & 255,
                  (r >>> 8) & 255,
                  255 & r,
                  85,
                  196,
                  0,
                  0
                ])
              )
            })(e),
            (function (e) {
              var r = null
              return (
                (r = 'audio' === e.type ? n.HDLR_AUDIO : n.HDLR_VIDEO),
                a(t.hdlr, r)
              )
            })(e),
            l(e)
          )
        },
        c = function (e) {
          return a(
            t.trak,
            (function (e) {
              var n = e.id,
                r = e.duration,
                i = e.width,
                o = e.height
              return a(
                t.tkhd,
                new Uint8Array([
                  0,
                  0,
                  0,
                  7,
                  0,
                  0,
                  0,
                  0,
                  0,
                  0,
                  0,
                  0,
                  (n >>> 24) & 255,
                  (n >>> 16) & 255,
                  (n >>> 8) & 255,
                  255 & n,
                  0,
                  0,
                  0,
                  0,
                  (r >>> 24) & 255,
                  (r >>> 16) & 255,
                  (r >>> 8) & 255,
                  255 & r,
                  0,
                  0,
                  0,
                  0,
                  0,
                  0,
                  0,
                  0,
                  0,
                  0,
                  0,
                  0,
                  0,
                  0,
                  0,
                  0,
                  0,
                  1,
                  0,
                  0,
                  0,
                  0,
                  0,
                  0,
                  0,
                  0,
                  0,
                  0,
                  0,
                  0,
                  0,
                  0,
                  0,
                  1,
                  0,
                  0,
                  0,
                  0,
                  0,
                  0,
                  0,
                  0,
                  0,
                  0,
                  0,
                  0,
                  0,
                  0,
                  64,
                  0,
                  0,
                  0,
                  (i >>> 8) & 255,
                  255 & i,
                  0,
                  0,
                  (o >>> 8) & 255,
                  255 & o,
                  0,
                  0
                ])
              )
            })(e),
            u(e)
          )
        },
        f = function (e) {
          return a(
            t.mvex,
            (function (e) {
              var n = e.id,
                r = new Uint8Array([
                  0,
                  0,
                  0,
                  0,
                  (n >>> 24) & 255,
                  (n >>> 16) & 255,
                  (n >>> 8) & 255,
                  255 & n,
                  0,
                  0,
                  0,
                  1,
                  0,
                  0,
                  0,
                  0,
                  0,
                  0,
                  0,
                  0,
                  0,
                  1,
                  0,
                  1
                ])
              return a(t.trex, r)
            })(e)
          )
        },
        h = function (e) {
          var n,
            r,
            i =
              ((n = e.timescale),
              (r = e.duration),
              a(
                t.mvhd,
                new Uint8Array([
                  0,
                  0,
                  0,
                  0,
                  0,
                  0,
                  0,
                  0,
                  0,
                  0,
                  0,
                  0,
                  (n >>> 24) & 255,
                  (n >>> 16) & 255,
                  (n >>> 8) & 255,
                  255 & n,
                  (r >>> 24) & 255,
                  (r >>> 16) & 255,
                  (r >>> 8) & 255,
                  255 & r,
                  0,
                  1,
                  0,
                  0,
                  1,
                  0,
                  0,
                  0,
                  0,
                  0,
                  0,
                  0,
                  0,
                  0,
                  0,
                  0,
                  0,
                  1,
                  0,
                  0,
                  0,
                  0,
                  0,
                  0,
                  0,
                  0,
                  0,
                  0,
                  0,
                  0,
                  0,
                  0,
                  0,
                  1,
                  0,
                  0,
                  0,
                  0,
                  0,
                  0,
                  0,
                  0,
                  0,
                  0,
                  0,
                  0,
                  0,
                  0,
                  64,
                  0,
                  0,
                  0,
                  0,
                  0,
                  0,
                  0,
                  0,
                  0,
                  0,
                  0,
                  0,
                  0,
                  0,
                  0,
                  0,
                  0,
                  0,
                  0,
                  0,
                  0,
                  0,
                  0,
                  0,
                  0,
                  0,
                  0,
                  255,
                  255,
                  255,
                  255
                ])
              )),
            o = c(e),
            s = f(e)
          return a(t.moov, i, o, s)
        },
        d = function (e, n) {
          return 'audio' === e.type
            ? audioTrun(e, n)
            : (function (e, n) {
                var r,
                  i = null,
                  o = null,
                  s = 0,
                  l = n
                if (null === (r = e.samples || [])[0].frameDuration)
                  for (
                    l += 24 + 4 * r.length, i = trunHeader(r, l), s = 0;
                    s < r.length;
                    s++
                  )
                    (o = r[s]),
                      (i = i.concat([
                        (4278190080 & o.size) >>> 24,
                        (16711680 & o.size) >>> 16,
                        (65280 & o.size) >>> 8,
                        255 & o.size
                      ]))
                else
                  for (
                    i = (function (e, t) {
                      return [
                        0,
                        0,
                        3,
                        5,
                        (4278190080 & e.length) >>> 24,
                        (16711680 & e.length) >>> 16,
                        (65280 & e.length) >>> 8,
                        255 & e.length,
                        (4278190080 & t) >>> 24,
                        (16711680 & t) >>> 16,
                        (65280 & t) >>> 8,
                        255 & t,
                        0,
                        0,
                        0,
                        0
                      ]
                    })(r, (l += 24 + 4 * r.length + 4 * r.length)),
                      s = 0;
                    s < r.length;
                    s++
                  )
                    (o = r[s]),
                      (i = i.concat([
                        (4278190080 & o.frameDuration) >>> 24,
                        (16711680 & o.frameDuration) >>> 16,
                        (65280 & o.frameDuration) >>> 8,
                        255 & o.frameDuration,
                        (4278190080 & o.size) >>> 24,
                        (16711680 & o.size) >>> 16,
                        (65280 & o.size) >>> 8,
                        255 & o.size
                      ]))
                return a(t.trun, new Uint8Array(i))
              })(e, n)
        },
        p = function (e, n) {
          return a(
            t.moof,
            (function (e) {
              var n = new Uint8Array([
                0,
                0,
                0,
                0,
                (e >>> 24) & 255,
                (e >>> 16) & 255,
                (e >>> 8) & 255,
                255 & e
              ])
              return a(t.mfhd, n)
            })(e),
            (function (e) {
              var n, r, i
              return (
                (n = a(t.tfhd, new Uint8Array([0, 2, 0, 0, 0, 0, 0, 1]))),
                (r = a(
                  t.tfdt,
                  new Uint8Array([
                    0,
                    0,
                    0,
                    0,
                    (e.baseMediaDecodeTime >>> 24) & 255,
                    (e.baseMediaDecodeTime >>> 16) & 255,
                    (e.baseMediaDecodeTime >>> 8) & 255,
                    255 & e.baseMediaDecodeTime
                  ])
                )),
                (i = d(e, 72)),
                a(t.traf, n, r, i)
              )
            })(n)
          )
        }
      return (
        (i.prototype = {
          initSegment: function (e) {
            var r = a(t.ftyp, n.FTYP),
              i = h(e),
              o = new Uint8Array(r.byteLength + i.byteLength)
            return o.set(r, 0), o.set(i, r.byteLength), o
          },
          mediaSegment: function (e, n, r, i) {
            var o = p(e, n),
              s = (function (e) {
                return a(t.mdat, e)
              })(r),
              l = null
            return (
              (l = new Uint8Array(o.byteLength + s.byteLength)).set(o),
              l.set(s, o.byteLength),
              l
            )
          }
        }),
        new i()
      )
    }
    function i(e) {
      var t = 7,
        n = 7,
        r = 2,
        i = 3,
        o = 4,
        s = 5,
        l = 8,
        u = 16,
        c = 32,
        f = 255,
        h = 0,
        d = null,
        p = e
      function m() {
        ;(h = 0), (d = new a())
      }
      function g(e, r) {
        var a = r,
          o = (h + a) >> i
        return (a = (h + r) & t), (e[o] >> (n - (a & n))) & 1
      }
      function y(e, t) {
        var n = h >> i,
          r = 8 * (n + 1) - h
        if (r < 8)
          for (var a = 0; a < 3; a++) {
            var o = e[n + a]
            ;(o =
              0 == a
                ? (o >> r) << r
                : 2 == a
                ? (o & (255 >> (8 - r))) | (1 << r)
                : 0),
              e.set([o], n + a)
          }
        else e.set([0], n), e.set([1], n + 1)
      }
      function v(e, t) {
        if (t <= 25) var n = w(e, t)
        else n = (w(e, 16) << (t - 16)) | w(e, t - 16)
        return n
      }
      function w(e, t) {
        var n = 0
        if (1 === t) n = g(e, 0)
        else for (var r = 0; r < t; r++) n = (n << 1) + g(e, r)
        return (h += t), n
      }
      function S(e, t) {
        for (var n = 0, i = 0, a = t; h + a < 8 * e.length && !g(e, a++); ) n++
        if (0 === n) return (h += 1), 0
        i = 1 << n
        for (var o = n - 1; o >= 0; o--, a++) i |= g(e, a) << o
        return (h += n * r + 1), i - 1
      }
      function _(e, t) {
        var n = S(e, t)
        return 1 & n ? (n + 1) / r : -n / r
      }
      function b(e) {
        d.put('cpb_cnt_minus1', S(e, 0)),
          d.put('bit_rate_scale', w(e, o)),
          d.put('cpb_size_scale', w(e, o))
        for (
          var t = d.get('cpb_cnt_minus1'),
            n = new Array(t),
            r = new Array(t),
            i = new Array(t),
            a = 0;
          a <= t;
          a++
        )
          (n[a] = S(e, 0)), (r[a] = S(e, 0)), (i[a] = w(e, 1))
        d.put('bit_rate_value_minus1', n),
          d.put('cpb_size_value_minus1', r),
          d.put('cbr_flag', i),
          d.put('initial_cpb_removal_delay_length_minus1', w(e, s)),
          d.put('cpb_removal_delay_length_minus1', w(e, s)),
          d.put('dpb_output_delay_length_minus1', w(e, s)),
          d.put('time_offset_length', w(e, s))
      }
      return (
        (m.prototype = {
          parse: function (e) {
            if (((h = 0), d.clear(), 1 == p)) {
              d.put('forbidden_zero_bit', w(e, 1)),
                d.put('nal_ref_idc', w(e, r)),
                d.put('nal_unit_type', w(e, s)),
                d.put('profile_idc', w(e, l)),
                d.put('profile_compatibility', w(e, l)),
                d.put('level_idc', w(e, l)),
                d.put('seq_parameter_set_id', S(e, 0))
              var t = d.get('profile_idc')
              if (
                (100 === t ||
                  110 === t ||
                  122 === t ||
                  244 === t ||
                  44 === t ||
                  83 === t ||
                  86 === t ||
                  118 === t ||
                  128 === t ||
                  138 === t ||
                  139 === t ||
                  134 === t) &&
                (d.put('chroma_format_idc', S(e, 0)),
                d.get('chroma_format_idc') === i &&
                  d.put('separate_colour_plane_flag', w(e, 1)),
                d.put('bit_depth_luma_minus8', S(e, 0)),
                d.put('bit_depth_chroma_minus8', S(e, 0)),
                d.put('qpprime_y_zero_transform_bypass_flag', w(e, 1)),
                d.put('seq_scaling_matrix_present_flag', w(e, 1)),
                d.get('seq_scaling_matrix_present_flag'))
              ) {
                for (
                  var n = d.get('chroma_format_idc') !== i ? l : 12,
                    a = new Array(n),
                    o = 0;
                  o < n;
                  o++
                )
                  if (((a[o] = w(e, 1)), a[o]))
                    for (
                      var m = o < 6 ? u : 64, g = 8, x = 8, A = 0;
                      A < m;
                      A++
                    )
                      x && (x = (g + _(e, 0) + 256) % 256),
                        (g = 0 === x ? g : x)
                d.put('seq_scaling_list_present_flag', a)
              }
              if (
                (d.put('log2_max_frame_num_minus4', S(e, 0)),
                d.put('pic_order_cnt_type', S(e, 0)),
                0 === d.get('pic_order_cnt_type'))
              )
                d.put('log2_max_pic_order_cnt_lsb_minus4', S(e, 0))
              else if (1 === d.get('pic_order_cnt_type')) {
                d.put('delta_pic_order_always_zero_flag', w(e, 1)),
                  d.put('offset_for_non_ref_pic', _(e, 0)),
                  d.put('offset_for_top_to_bottom_field', _(e, 0)),
                  d.put('num_ref_frames_in_pic_order_cnt_cycle', S(e, 0))
                for (
                  var P = 0;
                  P < d.get('num_ref_frames_in_pic_order_cnt_cycle');
                  P++
                )
                  d.put('num_ref_frames_in_pic_order_cnt_cycle', _(e, 0))
              }
              d.put('num_ref_frames', S(e, 0)),
                d.put('gaps_in_frame_num_value_allowed_flag', w(e, 1)),
                d.put('pic_width_in_mbs_minus1', S(e, 0)),
                d.put('pic_height_in_map_units_minus1', S(e, 0)),
                d.put('frame_mbs_only_flag', w(e, 1)),
                0 === d.get('frame_mbs_only_flag') &&
                  d.put('mb_adaptive_frame_field_flag', w(e, 1)),
                d.put('direct_8x8_interence_flag', w(e, 1)),
                d.put('frame_cropping_flag', w(e, 1)),
                1 === d.get('frame_cropping_flag') &&
                  (d.put('frame_cropping_rect_left_offset', S(e, 0)),
                  d.put('frame_cropping_rect_right_offset', S(e, 0)),
                  d.put('frame_cropping_rect_top_offset', S(e, 0)),
                  d.put('frame_cropping_rect_bottom_offset', S(e, 0))),
                d.put('vui_parameters_present_flag', w(e, 1)),
                d.get('vui_parameters_present_flag') &&
                  (function (e) {
                    d.put('aspect_ratio_info_present_flag', w(e, 1)),
                      d.get('aspect_ratio_info_present_flag') &&
                        (d.put('aspect_ratio_idc', w(e, l)),
                        d.get('aspect_ratio_idc') === f &&
                          (y(e),
                          d.put('sar_width', w(e, u)),
                          y(e),
                          d.put('sar_height', w(e, u)))),
                      d.put('overscan_info_present_flag', w(e, 1)),
                      d.get('overscan_info_present_flag') &&
                        d.put('overscan_appropriate_flag', w(e, 1)),
                      d.put('video_signal_type_present_flag', w(e, 1)),
                      d.get('video_signal_type_present_flag') &&
                        (d.put('video_format', w(e, i)),
                        d.put('video_full_range_flag', w(e, 1)),
                        d.put('colour_description_present_flag', w(e, 1)),
                        d.get('colour_description_present_flag') &&
                          (d.put('colour_primaries', w(e, l)),
                          d.put('transfer_characteristics', w(e, l)),
                          d.put('matrix_coefficients', w(e, l)))),
                      d.put('chroma_loc_info_present_flag', w(e, 1)),
                      d.get('chroma_loc_info_present_flag') &&
                        (d.put('chroma_sample_loc_type_top_field', S(e, 0)),
                        d.put('chroma_sample_loc_type_bottom_field', S(e, 0))),
                      d.put('timing_info_present_flag', w(e, 1)),
                      d.get('timing_info_present_flag') &&
                        (d.put('num_units_in_tick', w(e, c)),
                        d.put('time_scale', w(e, c)),
                        d.put('fixed_frame_rate_flag', w(e, 1))),
                      d.put('nal_hrd_parameters_present_flag', w(e, 1)),
                      d.get('nal_hrd_parameters_present_flag') && b(e),
                      d.put('vcl_hrd_parameters_present_flag', w(e, 1)),
                      d.get('vcl_hrd_parameters_present_flag') && b(e),
                      (d.get('nal_hrd_parameters_present_flag') ||
                        d.get('vcl_hrd_parameters_present_flag')) &&
                        d.put('low_delay_hrd_flag', w(e, 1)),
                      d.put('pic_struct_present_flag', w(e, 1)),
                      d.put('bitstream_restriction_flag', w(e, 1)),
                      d.get('bitstream_restriction_flag') &&
                        (d.put(
                          'motion_vectors_over_pic_boundaries_flag',
                          w(e, 1)
                        ),
                        d.put('max_bytes_per_pic_denom', S(e, 0)),
                        d.put('max_bits_per_mb_denom', S(e, 0)))
                  })(e)
            } else if (2 == p) {
              var C = new ArrayBuffer(256),
                T = new Uint8Array(C)
              !(function (e, t, n, r) {
                for (var i = 0, a = 0; i + 2 < t && a + 2 < r; ++i)
                  0 == e[i] && 0 == e[i + 1] && 3 == e[i + 2]
                    ? ((n[a++] = e[i++]), (n[a++] = e[i++]))
                    : (n[a++] = e[i])
                for (; i < t && a < r; ) n[a++] = e[i++]
              })(e, e.length, T, 256)
              var R = [],
                M = []
              w(T, 4)
              var U = w(T, 3)
              for (
                d.put('temporalIdNested', w(T, 1)),
                  d.put('general_profile_space', w(T, 2)),
                  d.put('general_tier_flag', w(T, 1)),
                  d.put('general_profile_idc', w(T, 5)),
                  d.put('general_profile_compatibility_flags', v(T, 32)),
                  d.put(
                    'general_constraint_indicator_flags',
                    ((I = T),
                    (D = 48) <= 32 ? v(I, D) : (v(I, D - 32) << 32) | v(I, 32))
                  ),
                  d.put('general_level_idc', w(T, 8)),
                  o = 0;
                o < U && o < 6;
                o++
              )
                (R[o] = w(T, 1)), (M[o] = w(T, 1))
              if (U > 0) for (o = U; o < 8; o++) w(T, 2)
              for (o = 0; o < U && o < 6; o++) M[o] && w(T, 8)
              S(T, 0)
              d.put('chroma_format_idc', S(T, 0))
              S(T, 0), S(T, 0)
              w(T, 1),
                S(T, 0),
                S(T, 0),
                S(T, 0),
                S(T, 0),
                d.put('bitDepthLumaMinus8', S(T, 0) + 8),
                d.put('bitDepthChromaMinus8', S(T, 0) + 8),
                (C = null),
                (T = null)
            }
            var I, D
            return !0
          },
          getSizeInfo: function () {
            var e = 0,
              t = 0
            0 === d.get('chroma_format_idc')
              ? (e = t = 0)
              : 1 === d.get('chroma_format_idc')
              ? (e = t = r)
              : d.get('chroma_format_idc') === r
              ? ((e = r), (t = 1))
              : d.get('chroma_format_idc') === i &&
                (0 === d.get('separate_colour_plane_flag')
                  ? (e = t = 1)
                  : 1 === d.get('separate_colour_plane_flag') && (e = t = 0))
            var n = d.get('pic_width_in_mbs_minus1') + 1,
              a = d.get('pic_height_in_map_units_minus1') + 1,
              o = (r - d.get('frame_mbs_only_flag')) * a,
              s = 0,
              l = 0,
              c = 0,
              f = 0
            1 === d.get('frame_cropping_flag') &&
              ((s = d.get('frame_cropping_rect_left_offset')),
              (l = d.get('frame_cropping_rect_right_offset')),
              (c = d.get('frame_cropping_rect_top_offset')),
              (f = d.get('frame_cropping_rect_bottom_offset')))
            var h = n * u * (o * u)
            return {
              width: n * u - e * (s + l),
              height: o * u - t * (r - d.get('frame_mbs_only_flag')) * (c + f),
              decodeSize: h
            }
          },
          getSpsValue: function (e) {
            return d.get(e)
          },
          getCodecInfo: function () {
            return (
              d.get('profile_idc').toString(u) +
              (d.get('profile_compatibility') < 15
                ? '0' + d.get('profile_compatibility').toString(u)
                : d.get('profile_compatibility').toString(u)) +
              d.get('level_idc').toString(u)
            )
          }
        }),
        new m()
      )
    }
    var a = function () {
      this.map = {}
    }
    a.prototype = {
      put: function (e, t) {
        this.map[e] = t
      },
      get: function (e) {
        return this.map[e]
      },
      containsKey: function (e) {
        return e in this.map
      },
      containsValue: function (e) {
        for (var t in this.map) if (this.map[t] === e) return !0
        return !1
      },
      isEmpty: function (e) {
        return 0 === this.size()
      },
      clear: function () {
        for (var e in this.map) delete this.map[e]
      },
      remove: function (e) {
        delete this.map[e]
      },
      keys: function () {
        var e = new Array()
        for (var t in this.map) e.push(t)
        return e
      },
      values: function () {
        var e = new Array()
        for (var t in this.map) e.push(this.map[t])
        return e
      },
      size: function () {
        var e = 0
        for (var t in this.map) e++
        return e
      }
    }
    var o = function () {
        var e = 200,
          t = null,
          n = null,
          r = null,
          i = 0,
          a = 0,
          o = !1,
          s = 0,
          l = 0,
          u = null,
          c = !1,
          f = new Float32Array(8e4),
          h = 0,
          d = null,
          p = 0
        function m(n, i) {
          var o = i - s
          if (
            ((o > e || o < 0) &&
              ((a = 0), (h = 0), (c = !0), null !== d && d.stop()),
            a - t.currentTime < 0 && (a = 0),
            (s = i),
            (f = (function (e, t, n) {
              var r = e
              return (
                n + t.length >= r.length &&
                  (r = new Float32Array(r.length + 8e4)).set(r, 0),
                r.set(t, n),
                r
              )
            })(f, n, h)),
            (h += n.length),
            !c)
          ) {
            var l = 0
            if (
              h / n.length > 1 &&
              (null !== u && (l = u * p), l >= h || null === u)
            )
              return void (h = 0)
            var m = null
            ;(m = t.createBuffer(1, h - l, p))
              .getChannelData(0)
              .set(f.subarray(l, h)),
              (h = 0),
              ((d = t.createBufferSource()).buffer = m),
              d.connect(r),
              a || (a = t.currentTime + 0.1),
              d.start(a),
              (a += m.duration)
          }
        }
        function g() {}
        return (
          (g.prototype = {
            audioInit: function (e, i) {
              if (((a = 0), null !== t))
                debug.info('Audio context already defined!')
              else
                try {
                  return (
                    (window.AudioContext =
                      window.AudioContext ||
                      window.webkitAudioContext ||
                      window.mozAudioContext ||
                      window.oAudioContext ||
                      window.msAudioContext),
                    ((t = new AudioContext()).onstatechange = function () {
                      'running' === t.state && (o = !0)
                    }),
                    (p = i),
                    (n = t.createGain()),
                    (r = t.createBiquadFilter()).connect(n),
                    (r.type = 'lowpass'),
                    (r.frequency.value = 1500),
                    (r.gain.value = 40),
                    n.connect(t.destination),
                    this.setVolume(e),
                    !0
                  )
                } catch (e) {
                  return (
                    console.error(
                      'Web Audio API is not supported in this web browser! : ' +
                        e
                    ),
                    !1
                  )
                }
            },
            play: function () {
              this.setVolume(i)
            },
            stop: function () {
              ;(i = 0), (n.gain.value = 0), (a = 0), (t = null)
            },
            bufferAudio: function (e, t) {
              o && m(e, 0)
            },
            setVolume: function (e) {
              i = e
              var t = e / 1
              t <= 0
                ? ((n.gain.value = 0), (a = 0))
                : (n.gain.value = t >= 1 ? 1 : t)
            },
            getVolume: function () {
              return i
            },
            Mute: function (e) {
              if (e) (n.gain.value = 0), (a = 0)
              else {
                var t = i / 1
                t <= 0
                  ? ((n.gain.value = 0), (a = 0))
                  : (n.gain.value = t >= 1 ? 1 : t)
              }
            },
            terminate: function () {
              'closed' !== t.state && ((a = 0), (o = !1), t.close())
            },
            setBufferingFlag: function (e, t) {
              'init' === t
                ? (l = e)
                : c &&
                  (0 === e || 'undefined' === typeof e || null === e
                    ? (u = null)
                    : ((u = e - l), (l = 0)),
                  (c = !1))
            },
            getBufferingFlag: function () {
              return c
            },
            setInitVideoTimeStamp: function (e) {
              l = e
            },
            getInitVideoTimeStamp: function () {
              return l
            },
            setSamplingRate: function (e) {
              p = e
            },
            manualResume: function () {
              t && t.resume()
            }
          }),
          new g()
        )
      },
      s = n(0),
      l = 1e-6
    function u() {}
    function c() {}
    function f() {}
    function h() {}
    ;(u.prototype = {
      e: function (e) {
        return e < 1 || e > this.elements.length ? null : this.elements[e - 1]
      },
      dimensions: function () {
        return this.elements.length
      },
      modulus: function () {
        return Math.sqrt(this.dot(this))
      },
      eql: function (e) {
        var t = this.elements.length,
          n = e.elements || e
        if (t != n.length) return !1
        do {
          if (Math.abs(this.elements[t - 1] - n[t - 1]) > l) return !1
        } while (--t)
        return !0
      },
      dup: function () {
        return u.create(this.elements)
      },
      map: function (e) {
        var t = []
        return (
          this.each(function (n, r) {
            t.push(e(n, r))
          }),
          u.create(t)
        )
      },
      each: function (e) {
        var t,
          n = this.elements.length,
          r = n
        do {
          ;(t = r - n), e(this.elements[t], t + 1)
        } while (--n)
      },
      toUnitVector: function () {
        var e = this.modulus()
        return 0 === e
          ? this.dup()
          : this.map(function (t) {
              return t / e
            })
      },
      angleFrom: function (e) {
        var t = e.elements || e,
          n = this.elements.length
        if (n != t.length) return null
        var r = 0,
          i = 0,
          a = 0
        if (
          (this.each(function (e, n) {
            ;(r += e * t[n - 1]), (i += e * e), (a += t[n - 1] * t[n - 1])
          }),
          (i = Math.sqrt(i)),
          (a = Math.sqrt(a)),
          i * a === 0)
        )
          return null
        var o = r / (i * a)
        return o < -1 && (o = -1), o > 1 && (o = 1), Math.acos(o)
      },
      isParallelTo: function (e) {
        var t = this.angleFrom(e)
        return null === t ? null : t <= l
      },
      isAntiparallelTo: function (e) {
        var t = this.angleFrom(e)
        return null === t ? null : Math.abs(t - Math.PI) <= l
      },
      isPerpendicularTo: function (e) {
        var t = this.dot(e)
        return null === t ? null : Math.abs(t) <= l
      },
      add: function (e) {
        var t = e.elements || e
        return this.elements.length != t.length
          ? null
          : this.map(function (e, n) {
              return e + t[n - 1]
            })
      },
      subtract: function (e) {
        var t = e.elements || e
        return this.elements.length != t.length
          ? null
          : this.map(function (e, n) {
              return e - t[n - 1]
            })
      },
      multiply: function (e) {
        return this.map(function (t) {
          return t * e
        })
      },
      x: function (e) {
        return this.multiply(e)
      },
      dot: function (e) {
        var t = e.elements || e,
          n = 0,
          r = this.elements.length
        if (r != t.length) return null
        do {
          n += this.elements[r - 1] * t[r - 1]
        } while (--r)
        return n
      },
      cross: function (e) {
        var t = e.elements || e
        if (3 != this.elements.length || 3 != t.length) return null
        var n = this.elements
        return u.create([
          n[1] * t[2] - n[2] * t[1],
          n[2] * t[0] - n[0] * t[2],
          n[0] * t[1] - n[1] * t[0]
        ])
      },
      max: function () {
        var e,
          t = 0,
          n = this.elements.length,
          r = n
        do {
          ;(e = r - n),
            Math.abs(this.elements[e]) > Math.abs(t) && (t = this.elements[e])
        } while (--n)
        return t
      },
      indexOf: function (e) {
        var t,
          n = null,
          r = this.elements.length,
          i = r
        do {
          ;(t = i - r), null === n && this.elements[t] == e && (n = t + 1)
        } while (--r)
        return n
      },
      toDiagonalMatrix: function () {
        return c.Diagonal(this.elements)
      },
      round: function () {
        return this.map(function (e) {
          return Math.round(e)
        })
      },
      snapTo: function (e) {
        return this.map(function (t) {
          return Math.abs(t - e) <= l ? e : t
        })
      },
      distanceFrom: function (e) {
        if (e.anchor) return e.distanceFrom(this)
        var t = e.elements || e
        if (t.length != this.elements.length) return null
        var n,
          r = 0
        return (
          this.each(function (e, i) {
            ;(n = e - t[i - 1]), (r += n * n)
          }),
          Math.sqrt(r)
        )
      },
      liesOn: function (e) {
        return e.contains(this)
      },
      liesIn: function (e) {
        return e.contains(this)
      },
      rotate: function (e, t) {
        var n, r, i, a, o
        switch (this.elements.length) {
          case 2:
            return 2 != (n = t.elements || t).length
              ? null
              : ((r = c.Rotation(e).elements),
                (i = this.elements[0] - n[0]),
                (a = this.elements[1] - n[1]),
                u.create([
                  n[0] + r[0][0] * i + r[0][1] * a,
                  n[1] + r[1][0] * i + r[1][1] * a
                ]))
          case 3:
            if (!t.direction) return null
            var s = t.pointClosestTo(this).elements
            return (
              (r = c.Rotation(e, t.direction).elements),
              (i = this.elements[0] - s[0]),
              (a = this.elements[1] - s[1]),
              (o = this.elements[2] - s[2]),
              u.create([
                s[0] + r[0][0] * i + r[0][1] * a + r[0][2] * o,
                s[1] + r[1][0] * i + r[1][1] * a + r[1][2] * o,
                s[2] + r[2][0] * i + r[2][1] * a + r[2][2] * o
              ])
            )
          default:
            return null
        }
      },
      reflectionIn: function (e) {
        if (e.anchor) {
          var t = this.elements.slice(),
            n = e.pointClosestTo(t).elements
          return u.create([
            n[0] + (n[0] - t[0]),
            n[1] + (n[1] - t[1]),
            n[2] + (n[2] - (t[2] || 0))
          ])
        }
        var r = e.elements || e
        return this.elements.length != r.length
          ? null
          : this.map(function (e, t) {
              return r[t - 1] + (r[t - 1] - e)
            })
      },
      to3D: function () {
        var e = this.dup()
        switch (e.elements.length) {
          case 3:
            break
          case 2:
            e.elements.push(0)
            break
          default:
            return null
        }
        return e
      },
      inspect: function () {
        return '[' + this.elements.join(', ') + ']'
      },
      setElements: function (e) {
        return (this.elements = (e.elements || e).slice()), this
      }
    }),
      (u.create = function (e) {
        return new u().setElements(e)
      }),
      (u.i = u.create([1, 0, 0])),
      (u.j = u.create([0, 1, 0])),
      (u.k = u.create([0, 0, 1])),
      (u.Random = function (e) {
        var t = []
        do {
          t.push(Math.random())
        } while (--e)
        return u.create(t)
      }),
      (u.Zero = function (e) {
        var t = []
        do {
          t.push(0)
        } while (--e)
        return u.create(t)
      }),
      (c.prototype = {
        e: function (e, t) {
          return e < 1 ||
            e > this.elements.length ||
            t < 1 ||
            t > this.elements[0].length
            ? null
            : this.elements[e - 1][t - 1]
        },
        row: function (e) {
          return e > this.elements.length
            ? null
            : u.create(this.elements[e - 1])
        },
        col: function (e) {
          if (e > this.elements[0].length) return null
          var t,
            n = [],
            r = this.elements.length,
            i = r
          do {
            ;(t = i - r), n.push(this.elements[t][e - 1])
          } while (--r)
          return u.create(n)
        },
        dimensions: function () {
          return { rows: this.elements.length, cols: this.elements[0].length }
        },
        rows: function () {
          return this.elements.length
        },
        cols: function () {
          return this.elements[0].length
        },
        eql: function (e) {
          var t = e.elements || e
          if (
            ('undefined' == typeof t[0][0] && (t = c.create(t).elements),
            this.elements.length != t.length ||
              this.elements[0].length != t[0].length)
          )
            return !1
          var n,
            r,
            i,
            a = this.elements.length,
            o = a,
            s = this.elements[0].length
          do {
            ;(n = o - a), (r = s)
            do {
              if (((i = s - r), Math.abs(this.elements[n][i] - t[n][i]) > l))
                return !1
            } while (--r)
          } while (--a)
          return !0
        },
        dup: function () {
          return c.create(this.elements)
        },
        map: function (e) {
          var t,
            n,
            r,
            i = [],
            a = this.elements.length,
            o = a,
            s = this.elements[0].length
          do {
            ;(n = s), (i[(t = o - a)] = [])
            do {
              ;(r = s - n), (i[t][r] = e(this.elements[t][r], t + 1, r + 1))
            } while (--n)
          } while (--a)
          return c.create(i)
        },
        isSameSizeAs: function (e) {
          var t = e.elements || e
          return (
            'undefined' == typeof t[0][0] && (t = c.create(t).elements),
            this.elements.length == t.length &&
              this.elements[0].length == t[0].length
          )
        },
        add: function (e) {
          var t = e.elements || e
          return (
            'undefined' == typeof t[0][0] && (t = c.create(t).elements),
            this.isSameSizeAs(t)
              ? this.map(function (e, n, r) {
                  return e + t[n - 1][r - 1]
                })
              : null
          )
        },
        subtract: function (e) {
          var t = e.elements || e
          return (
            'undefined' == typeof t[0][0] && (t = c.create(t).elements),
            this.isSameSizeAs(t)
              ? this.map(function (e, n, r) {
                  return e - t[n - 1][r - 1]
                })
              : null
          )
        },
        canMultiplyFromLeft: function (e) {
          var t = e.elements || e
          return (
            'undefined' == typeof t[0][0] && (t = c.create(t).elements),
            this.elements[0].length == t.length
          )
        },
        multiply: function (e) {
          if (!e.elements)
            return this.map(function (t) {
              return t * e
            })
          var t = !!e.modulus
          if (
            ('undefined' == typeof (p = e.elements || e)[0][0] &&
              (p = c.create(p).elements),
            !this.canMultiplyFromLeft(p))
          )
            return null
          var n,
            r,
            i,
            a,
            o,
            s,
            l = this.elements.length,
            u = l,
            f = p[0].length,
            h = this.elements[0].length,
            d = []
          do {
            ;(d[(n = u - l)] = []), (r = f)
            do {
              ;(i = f - r), (a = 0), (o = h)
              do {
                ;(s = h - o), (a += this.elements[n][s] * p[s][i])
              } while (--o)
              d[n][i] = a
            } while (--r)
          } while (--l)
          var p = c.create(d)
          return t ? p.col(1) : p
        },
        x: function (e) {
          return this.multiply(e)
        },
        minor: function (e, t, n, r) {
          var i,
            a,
            o,
            s = [],
            l = n,
            u = this.elements.length,
            f = this.elements[0].length
          do {
            ;(s[(i = n - l)] = []), (a = r)
            do {
              ;(o = r - a),
                (s[i][o] = this.elements[(e + i - 1) % u][(t + o - 1) % f])
            } while (--a)
          } while (--l)
          return c.create(s)
        },
        transpose: function () {
          var e,
            t,
            n,
            r = this.elements.length,
            i = this.elements[0].length,
            a = [],
            o = i
          do {
            ;(a[(e = i - o)] = []), (t = r)
            do {
              ;(n = r - t), (a[e][n] = this.elements[n][e])
            } while (--t)
          } while (--o)
          return c.create(a)
        },
        isSquare: function () {
          return this.elements.length == this.elements[0].length
        },
        max: function () {
          var e,
            t,
            n,
            r = 0,
            i = this.elements.length,
            a = i,
            o = this.elements[0].length
          do {
            ;(e = a - i), (t = o)
            do {
              ;(n = o - t),
                Math.abs(this.elements[e][n]) > Math.abs(r) &&
                  (r = this.elements[e][n])
            } while (--t)
          } while (--i)
          return r
        },
        indexOf: function (e) {
          var t,
            n,
            r,
            i = this.elements.length,
            a = i,
            o = this.elements[0].length
          do {
            ;(t = a - i), (n = o)
            do {
              if (((r = o - n), this.elements[t][r] == e))
                return { i: t + 1, j: r + 1 }
            } while (--n)
          } while (--i)
          return null
        },
        diagonal: function () {
          if (!this.isSquare) return null
          var e,
            t = [],
            n = this.elements.length,
            r = n
          do {
            ;(e = r - n), t.push(this.elements[e][e])
          } while (--n)
          return u.create(t)
        },
        toRightTriangular: function () {
          var e,
            t,
            n,
            r,
            i = this.dup(),
            a = this.elements.length,
            o = a,
            s = this.elements[0].length
          do {
            if (((t = o - a), 0 == i.elements[t][t]))
              for (j = t + 1; j < o; j++)
                if (0 != i.elements[j][t]) {
                  ;(e = []), (n = s)
                  do {
                    ;(r = s - n), e.push(i.elements[t][r] + i.elements[j][r])
                  } while (--n)
                  i.elements[t] = e
                  break
                }
            if (0 != i.elements[t][t])
              for (j = t + 1; j < o; j++) {
                var l = i.elements[j][t] / i.elements[t][t]
                ;(e = []), (n = s)
                do {
                  ;(r = s - n),
                    e.push(r <= t ? 0 : i.elements[j][r] - i.elements[t][r] * l)
                } while (--n)
                i.elements[j] = e
              }
          } while (--a)
          return i
        },
        toUpperTriangular: function () {
          return this.toRightTriangular()
        },
        determinant: function () {
          if (!this.isSquare()) return null
          var e,
            t = this.toRightTriangular(),
            n = t.elements[0][0],
            r = t.elements.length - 1,
            i = r
          do {
            ;(e = i - r + 1), (n *= t.elements[e][e])
          } while (--r)
          return n
        },
        det: function () {
          return this.determinant()
        },
        isSingular: function () {
          return this.isSquare() && 0 === this.determinant()
        },
        trace: function () {
          if (!this.isSquare()) return null
          var e,
            t = this.elements[0][0],
            n = this.elements.length - 1,
            r = n
          do {
            ;(e = r - n + 1), (t += this.elements[e][e])
          } while (--n)
          return t
        },
        tr: function () {
          return this.trace()
        },
        rank: function () {
          var e,
            t,
            n,
            r = this.toRightTriangular(),
            i = 0,
            a = this.elements.length,
            o = a,
            s = this.elements[0].length
          do {
            ;(e = o - a), (t = s)
            do {
              if (((n = s - t), Math.abs(r.elements[e][n]) > l)) {
                i++
                break
              }
            } while (--t)
          } while (--a)
          return i
        },
        rk: function () {
          return this.rank()
        },
        augment: function (e) {
          var t = e.elements || e
          'undefined' == typeof t[0][0] && (t = c.create(t).elements)
          var n,
            r,
            i,
            a = this.dup(),
            o = a.elements[0].length,
            s = a.elements.length,
            l = s,
            u = t[0].length
          if (s != t.length) return null
          do {
            ;(n = l - s), (r = u)
            do {
              ;(i = u - r), (a.elements[n][o + i] = t[n][i])
            } while (--r)
          } while (--s)
          return a
        },
        inverse: function () {
          if (!this.isSquare() || this.isSingular()) return null
          var e,
            t,
            n,
            r,
            i,
            a,
            o,
            s = this.elements.length,
            l = s,
            u = this.augment(c.I(s)).toRightTriangular(),
            f = u.elements[0].length,
            h = []
          do {
            ;(i = []), (n = f), (h[(e = s - 1)] = []), (a = u.elements[e][e])
            do {
              ;(r = f - n),
                (o = u.elements[e][r] / a),
                i.push(o),
                r >= l && h[e].push(o)
            } while (--n)
            for (u.elements[e] = i, t = 0; t < e; t++) {
              ;(i = []), (n = f)
              do {
                ;(r = f - n),
                  i.push(u.elements[t][r] - u.elements[e][r] * u.elements[t][e])
              } while (--n)
              u.elements[t] = i
            }
          } while (--s)
          return c.create(h)
        },
        inv: function () {
          return this.inverse()
        },
        round: function () {
          return this.map(function (e) {
            return Math.round(e)
          })
        },
        snapTo: function (e) {
          return this.map(function (t) {
            return Math.abs(t - e) <= l ? e : t
          })
        },
        inspect: function () {
          var e,
            t = [],
            n = this.elements.length,
            r = n
          do {
            ;(e = r - n), t.push(u.create(this.elements[e]).inspect())
          } while (--n)
          return t.join('\n')
        },
        setElements: function (e) {
          var t,
            n = e.elements || e
          if ('undefined' != typeof n[0][0]) {
            var r,
              i,
              a,
              o = n.length,
              s = o
            this.elements = []
            do {
              ;(i = r = n[(t = s - o)].length), (this.elements[t] = [])
              do {
                ;(a = i - r), (this.elements[t][a] = n[t][a])
              } while (--r)
            } while (--o)
            return this
          }
          var l = n.length,
            u = l
          this.elements = []
          do {
            ;(t = u - l), this.elements.push([n[t]])
          } while (--l)
          return this
        }
      }),
      (c.create = function (e) {
        return new c().setElements(e)
      }),
      (c.I = function (e) {
        var t,
          n,
          r,
          i = [],
          a = e
        do {
          ;(i[(t = a - e)] = []), (n = a)
          do {
            ;(r = a - n), (i[t][r] = t == r ? 1 : 0)
          } while (--n)
        } while (--e)
        return c.create(i)
      }),
      (c.Diagonal = function (e) {
        var t,
          n = e.length,
          r = n,
          i = c.I(n)
        do {
          ;(t = r - n), (i.elements[t][t] = e[t])
        } while (--n)
        return i
      }),
      (c.Rotation = function (e, t) {
        if (!t)
          return c.create([
            [Math.cos(e), -Math.sin(e)],
            [Math.sin(e), Math.cos(e)]
          ])
        var n = t.dup()
        if (3 != n.elements.length) return null
        var r = n.modulus(),
          i = n.elements[0] / r,
          a = n.elements[1] / r,
          o = n.elements[2] / r,
          s = Math.sin(e),
          l = Math.cos(e),
          u = 1 - l
        return c.create([
          [u * i * i + l, u * i * a - s * o, u * i * o + s * a],
          [u * i * a + s * o, u * a * a + l, u * a * o - s * i],
          [u * i * o - s * a, u * a * o + s * i, u * o * o + l]
        ])
      }),
      (c.RotationX = function (e) {
        var t = Math.cos(e),
          n = Math.sin(e)
        return c.create([
          [1, 0, 0],
          [0, t, -n],
          [0, n, t]
        ])
      }),
      (c.RotationY = function (e) {
        var t = Math.cos(e),
          n = Math.sin(e)
        return c.create([
          [t, 0, n],
          [0, 1, 0],
          [-n, 0, t]
        ])
      }),
      (c.RotationZ = function (e) {
        var t = Math.cos(e),
          n = Math.sin(e)
        return c.create([
          [t, -n, 0],
          [n, t, 0],
          [0, 0, 1]
        ])
      }),
      (c.Random = function (e, t) {
        return c.Zero(e, t).map(function () {
          return Math.random()
        })
      }),
      (c.Zero = function (e, t) {
        var n,
          r,
          i,
          a = [],
          o = e
        do {
          ;(a[(n = e - o)] = []), (r = t)
          do {
            ;(i = t - r), (a[n][i] = 0)
          } while (--r)
        } while (--o)
        return c.create(a)
      }),
      (f.prototype = {
        eql: function (e) {
          return this.isParallelTo(e) && this.contains(e.anchor)
        },
        dup: function () {
          return f.create(this.anchor, this.direction)
        },
        translate: function (e) {
          var t = e.elements || e
          return f.create(
            [
              this.anchor.elements[0] + t[0],
              this.anchor.elements[1] + t[1],
              this.anchor.elements[2] + (t[2] || 0)
            ],
            this.direction
          )
        },
        isParallelTo: function (e) {
          if (e.normal) return e.isParallelTo(this)
          var t = this.direction.angleFrom(e.direction)
          return Math.abs(t) <= l || Math.abs(t - Math.PI) <= l
        },
        distanceFrom: function (e) {
          if (e.normal) return e.distanceFrom(this)
          if (e.direction) {
            if (this.isParallelTo(e)) return this.distanceFrom(e.anchor)
            var t = this.direction.cross(e.direction).toUnitVector().elements,
              n = this.anchor.elements,
              r = e.anchor.elements
            return Math.abs(
              (n[0] - r[0]) * t[0] + (n[1] - r[1]) * t[1] + (n[2] - r[2]) * t[2]
            )
          }
          var i = e.elements || e,
            a = ((n = this.anchor.elements), this.direction.elements),
            o = i[0] - n[0],
            s = i[1] - n[1],
            l = (i[2] || 0) - n[2],
            u = Math.sqrt(o * o + s * s + l * l)
          if (0 === u) return 0
          var c = (o * a[0] + s * a[1] + l * a[2]) / u,
            f = 1 - c * c
          return Math.abs(u * Math.sqrt(f < 0 ? 0 : f))
        },
        contains: function (e) {
          var t = this.distanceFrom(e)
          return null !== t && t <= l
        },
        liesIn: function (e) {
          return e.contains(this)
        },
        intersects: function (e) {
          return e.normal
            ? e.intersects(this)
            : !this.isParallelTo(e) && this.distanceFrom(e) <= l
        },
        intersectionWith: function (e) {
          if (e.normal) return e.intersectionWith(this)
          if (!this.intersects(e)) return null
          var t = this.anchor.elements,
            n = this.direction.elements,
            r = e.anchor.elements,
            i = e.direction.elements,
            a = n[0],
            o = n[1],
            s = n[2],
            l = i[0],
            c = i[1],
            f = i[2],
            h = t[0] - r[0],
            d = t[1] - r[1],
            p = t[2] - r[2],
            m = l * l + c * c + f * f,
            g = a * l + o * c + s * f,
            y =
              (((-a * h - o * d - s * p) * m) / (a * a + o * o + s * s) +
                g * (l * h + c * d + f * p)) /
              (m - g * g)
          return u.create([t[0] + y * a, t[1] + y * o, t[2] + y * s])
        },
        pointClosestTo: function (e) {
          if (e.direction) {
            if (this.intersects(e)) return this.intersectionWith(e)
            if (this.isParallelTo(e)) return null
            var t = this.direction.elements,
              n = e.direction.elements,
              r = t[0],
              i = t[1],
              a = t[2],
              o = n[0],
              s = n[1],
              l = n[2],
              c = a * o - r * l,
              f = r * s - i * o,
              d = i * l - a * s,
              p = u.create([c * l - f * s, f * o - d * l, d * s - c * o])
            return (m = h.create(e.anchor, p)).intersectionWith(this)
          }
          var m = e.elements || e
          if (this.contains(m)) return u.create(m)
          var g = this.anchor.elements,
            y =
              ((r = (t = this.direction.elements)[0]),
              (i = t[1]),
              (a = t[2]),
              g[0]),
            v = g[1],
            w = g[2],
            S =
              ((c = r * (m[1] - v) - i * (m[0] - y)),
              (f = i * ((m[2] || 0) - w) - a * (m[1] - v)),
              (d = a * (m[0] - y) - r * ((m[2] || 0) - w)),
              u.create([i * c - a * d, a * f - r * c, r * d - i * f])),
            _ = this.distanceFrom(m) / S.modulus()
          return u.create([
            m[0] + S.elements[0] * _,
            m[1] + S.elements[1] * _,
            (m[2] || 0) + S.elements[2] * _
          ])
        },
        rotate: function (e, t) {
          'undefined' == typeof t.direction && (t = f.create(t.to3D(), u.k))
          var n = c.Rotation(e, t.direction).elements,
            r = t.pointClosestTo(this.anchor).elements,
            i = this.anchor.elements,
            a = this.direction.elements,
            o = r[0],
            s = r[1],
            l = r[2],
            h = i[0] - o,
            d = i[1] - s,
            p = i[2] - l
          return f.create(
            [
              o + n[0][0] * h + n[0][1] * d + n[0][2] * p,
              s + n[1][0] * h + n[1][1] * d + n[1][2] * p,
              l + n[2][0] * h + n[2][1] * d + n[2][2] * p
            ],
            [
              n[0][0] * a[0] + n[0][1] * a[1] + n[0][2] * a[2],
              n[1][0] * a[0] + n[1][1] * a[1] + n[1][2] * a[2],
              n[2][0] * a[0] + n[2][1] * a[1] + n[2][2] * a[2]
            ]
          )
        },
        reflectionIn: function (e) {
          if (e.normal) {
            var t = this.anchor.elements,
              n = this.direction.elements,
              r = t[0],
              i = t[1],
              a = t[2],
              o = n[0],
              s = n[1],
              l = n[2],
              u = this.anchor.reflectionIn(e).elements,
              c = r + o,
              h = i + s,
              d = a + l,
              p = e.pointClosestTo([c, h, d]).elements,
              m = [
                p[0] + (p[0] - c) - u[0],
                p[1] + (p[1] - h) - u[1],
                p[2] + (p[2] - d) - u[2]
              ]
            return f.create(u, m)
          }
          if (e.direction) return this.rotate(Math.PI, e)
          var g = e.elements || e
          return f.create(
            this.anchor.reflectionIn([g[0], g[1], g[2] || 0]),
            this.direction
          )
        },
        setVectors: function (e, t) {
          if (
            ((e = u.create(e)),
            (t = u.create(t)),
            2 == e.elements.length && e.elements.push(0),
            2 == t.elements.length && t.elements.push(0),
            e.elements.length > 3 || t.elements.length > 3)
          )
            return null
          var n = t.modulus()
          return 0 === n
            ? null
            : ((this.anchor = e),
              (this.direction = u.create([
                t.elements[0] / n,
                t.elements[1] / n,
                t.elements[2] / n
              ])),
              this)
        }
      }),
      (f.create = function (e, t) {
        return new f().setVectors(e, t)
      }),
      (f.X = f.create(u.Zero(3), u.i)),
      (f.Y = f.create(u.Zero(3), u.j)),
      (f.Z = f.create(u.Zero(3), u.k)),
      (h.prototype = {
        eql: function (e) {
          return this.contains(e.anchor) && this.isParallelTo(e)
        },
        dup: function () {
          return h.create(this.anchor, this.normal)
        },
        translate: function (e) {
          var t = e.elements || e
          return h.create(
            [
              this.anchor.elements[0] + t[0],
              this.anchor.elements[1] + t[1],
              this.anchor.elements[2] + (t[2] || 0)
            ],
            this.normal
          )
        },
        isParallelTo: function (e) {
          var t
          return e.normal
            ? ((t = this.normal.angleFrom(e.normal)),
              Math.abs(t) <= l || Math.abs(Math.PI - t) <= l)
            : e.direction
            ? this.normal.isPerpendicularTo(e.direction)
            : null
        },
        isPerpendicularTo: function (e) {
          var t = this.normal.angleFrom(e.normal)
          return Math.abs(Math.PI / 2 - t) <= l
        },
        distanceFrom: function (e) {
          if (this.intersects(e) || this.contains(e)) return 0
          if (e.anchor) {
            var t = this.anchor.elements,
              n = e.anchor.elements,
              r = this.normal.elements
            return Math.abs(
              (t[0] - n[0]) * r[0] + (t[1] - n[1]) * r[1] + (t[2] - n[2]) * r[2]
            )
          }
          var i = e.elements || e
          ;(t = this.anchor.elements), (r = this.normal.elements)
          return Math.abs(
            (t[0] - i[0]) * r[0] +
              (t[1] - i[1]) * r[1] +
              (t[2] - (i[2] || 0)) * r[2]
          )
        },
        contains: function (e) {
          if (e.normal) return null
          if (e.direction)
            return (
              this.contains(e.anchor) &&
              this.contains(e.anchor.add(e.direction))
            )
          var t = e.elements || e,
            n = this.anchor.elements,
            r = this.normal.elements
          return (
            Math.abs(
              r[0] * (n[0] - t[0]) +
                r[1] * (n[1] - t[1]) +
                r[2] * (n[2] - (t[2] || 0))
            ) <= l
          )
        },
        intersects: function (e) {
          return 'undefined' == typeof e.direction &&
            'undefined' == typeof e.normal
            ? null
            : !this.isParallelTo(e)
        },
        intersectionWith: function (e) {
          if (!this.intersects(e)) return null
          if (e.direction) {
            var t = e.anchor.elements,
              n = e.direction.elements,
              r = this.anchor.elements,
              i =
                ((o = this.normal.elements)[0] * (r[0] - t[0]) +
                  o[1] * (r[1] - t[1]) +
                  o[2] * (r[2] - t[2])) /
                (o[0] * n[0] + o[1] * n[1] + o[2] * n[2])
            return u.create([t[0] + n[0] * i, t[1] + n[1] * i, t[2] + n[2] * i])
          }
          if (e.normal) {
            for (
              var a = this.normal.cross(e.normal).toUnitVector(),
                o = this.normal.elements,
                s = ((t = this.anchor.elements), e.normal.elements),
                l = e.anchor.elements,
                h = c.Zero(2, 2),
                d = 0;
              h.isSingular();

            )
              d++,
                (h = c.create([
                  [o[d % 3], o[(d + 1) % 3]],
                  [s[d % 3], s[(d + 1) % 3]]
                ]))
            for (
              var p = h.inverse().elements,
                m = o[0] * t[0] + o[1] * t[1] + o[2] * t[2],
                g = s[0] * l[0] + s[1] * l[1] + s[2] * l[2],
                y = [p[0][0] * m + p[0][1] * g, p[1][0] * m + p[1][1] * g],
                v = [],
                w = 1;
              w <= 3;
              w++
            )
              v.push(d == w ? 0 : y[(w + ((5 - d) % 3)) % 3])
            return f.create(v, a)
          }
        },
        pointClosestTo: function (e) {
          var t = e.elements || e,
            n = this.anchor.elements,
            r = this.normal.elements,
            i =
              (n[0] - t[0]) * r[0] +
              (n[1] - t[1]) * r[1] +
              (n[2] - (t[2] || 0)) * r[2]
          return u.create([
            t[0] + r[0] * i,
            t[1] + r[1] * i,
            (t[2] || 0) + r[2] * i
          ])
        },
        rotate: function (e, t) {
          var n = c.Rotation(e, t.direction).elements,
            r = t.pointClosestTo(this.anchor).elements,
            i = this.anchor.elements,
            a = this.normal.elements,
            o = r[0],
            s = r[1],
            l = r[2],
            u = i[0] - o,
            f = i[1] - s,
            d = i[2] - l
          return h.create(
            [
              o + n[0][0] * u + n[0][1] * f + n[0][2] * d,
              s + n[1][0] * u + n[1][1] * f + n[1][2] * d,
              l + n[2][0] * u + n[2][1] * f + n[2][2] * d
            ],
            [
              n[0][0] * a[0] + n[0][1] * a[1] + n[0][2] * a[2],
              n[1][0] * a[0] + n[1][1] * a[1] + n[1][2] * a[2],
              n[2][0] * a[0] + n[2][1] * a[1] + n[2][2] * a[2]
            ]
          )
        },
        reflectionIn: function (e) {
          if (e.normal) {
            var t = this.anchor.elements,
              n = this.normal.elements,
              r = t[0],
              i = t[1],
              a = t[2],
              o = n[0],
              s = n[1],
              l = n[2],
              u = this.anchor.reflectionIn(e).elements,
              c = r + o,
              f = i + s,
              d = a + l,
              p = e.pointClosestTo([c, f, d]).elements,
              m = [
                p[0] + (p[0] - c) - u[0],
                p[1] + (p[1] - f) - u[1],
                p[2] + (p[2] - d) - u[2]
              ]
            return h.create(u, m)
          }
          if (e.direction) return this.rotate(Math.PI, e)
          var g = e.elements || e
          return h.create(
            this.anchor.reflectionIn([g[0], g[1], g[2] || 0]),
            this.normal
          )
        },
        setVectors: function (e, t, n) {
          if (null === (e = (e = u.create(e)).to3D())) return null
          if (null === (t = (t = u.create(t)).to3D())) return null
          if ('undefined' == typeof n) n = null
          else if (null === (n = (n = u.create(n)).to3D())) return null
          var r,
            i,
            a = e.elements[0],
            o = e.elements[1],
            s = e.elements[2],
            l = t.elements[0],
            c = t.elements[1],
            f = t.elements[2]
          if (null !== n) {
            var h = n.elements[0],
              d = n.elements[1],
              p = n.elements[2]
            if (
              0 ===
              (i = (r = u.create([
                (c - o) * (p - s) - (f - s) * (d - o),
                (f - s) * (h - a) - (l - a) * (p - s),
                (l - a) * (d - o) - (c - o) * (h - a)
              ])).modulus())
            )
              return null
            r = u.create([
              r.elements[0] / i,
              r.elements[1] / i,
              r.elements[2] / i
            ])
          } else {
            if (0 === (i = Math.sqrt(l * l + c * c + f * f))) return null
            r = u.create([
              t.elements[0] / i,
              t.elements[1] / i,
              t.elements[2] / i
            ])
          }
          return (this.anchor = e), (this.normal = r), this
        }
      }),
      (c.Translation = function (e) {
        var t
        if (2 === e.elements.length)
          return (
            ((t = c.I(3)).elements[2][0] = e.elements[0]),
            (t.elements[2][1] = e.elements[1]),
            t
          )
        if (3 === e.elements.length)
          return (
            ((t = c.I(4)).elements[0][3] = e.elements[0]),
            (t.elements[1][3] = e.elements[1]),
            (t.elements[2][3] = e.elements[2]),
            t
          )
        throw 'Invalid length for Translation'
      }),
      (c.prototype.flatten = function () {
        var e = []
        if (0 === this.elements.length) return []
        for (var t = 0; t < this.elements[0].length; t++)
          for (var n = 0; n < this.elements.length; n++)
            e.push(this.elements[n][t])
        return e
      }),
      (c.prototype.ensure4x4 = function () {
        var e
        if (4 === this.elements.length && 4 === this.elements[0].length)
          return this
        if (this.elements.length > 4 || this.elements[0].length > 4) return null
        for (e = 0; e < this.elements.length; e++)
          for (var t = this.elements[e].length; t < 4; t++)
            e === t ? this.elements[e].push(1) : this.elements[e].push(0)
        for (e = this.elements.length; e < 4; e++)
          0 === e
            ? this.elements.push([1, 0, 0, 0])
            : 1 === e
            ? this.elements.push([0, 1, 0, 0])
            : 2 === e
            ? this.elements.push([0, 0, 1, 0])
            : 3 === e && this.elements.push([0, 0, 0, 1])
        return this
      }),
      (c.prototype.make3x3 = function () {
        return 4 !== this.elements.length || 4 !== this.elements[0].length
          ? null
          : c.create([
              [this.elements[0][0], this.elements[0][1], this.elements[0][2]],
              [this.elements[1][0], this.elements[1][1], this.elements[1][2]],
              [this.elements[2][0], this.elements[2][1], this.elements[2][2]]
            ])
      }),
      (h.create = function (e, t, n) {
        return new h().setVectors(e, t, n)
      }),
      (h.XY = h.create(u.Zero(3), u.k)),
      (h.YZ = h.create(u.Zero(3), u.i)),
      (h.ZX = h.create(u.Zero(3), u.j)),
      (h.YX = h.XY),
      (h.ZY = h.YZ),
      (h.XZ = h.ZX)
    var d = u.create,
      p = c.create,
      m =
        (f.create,
        h.create,
        (function () {
          function e(e, t, n) {
            s.e.call(this, e, t, n)
          }
          return (
            (e.prototype = v(s.e, {
              fill: function (e, t) {
                var n = this.gl
                n.bindTexture(n.TEXTURE_2D, this.texture),
                  t
                    ? n.texSubImage2D(
                        n.TEXTURE_2D,
                        0,
                        0,
                        0,
                        this.size.w,
                        this.size.h,
                        this.format,
                        n.UNSIGNED_BYTE,
                        e
                      )
                    : n.texImage2D(
                        n.TEXTURE_2D,
                        0,
                        this.format,
                        this.format,
                        n.UNSIGNED_BYTE,
                        e
                      )
              }
            })),
            e
          )
        })()),
      g = (function () {
        var e = s.c.createFromSource(
            'x-shader/x-vertex',
            w([
              'attribute vec3 aVertexPosition;',
              'attribute vec2 aTextureCoord;',
              'uniform mat4 uMVMatrix;',
              'uniform mat4 uPMatrix;',
              'varying highp vec2 vTextureCoord;',
              'void main(void) {',
              '  gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);',
              '  vTextureCoord = aTextureCoord;',
              '}'
            ])
          ),
          t = s.c.createFromSource(
            'x-shader/x-fragment',
            w([
              'precision highp float;',
              'varying highp vec2 vTextureCoord;',
              'uniform sampler2D texture;',
              'void main(void) {',
              '  gl_FragColor = texture2D(texture, vTextureCoord);',
              '}'
            ])
          )
        function n(e, t, n) {
          ;(this.canvas = e),
            (this.size = t),
            (this.canvas.width = t.w),
            (this.canvas.height = t.h),
            this.onInitWebGL(),
            this.onInitShaders(),
            function () {
              var e = [1, 1, 0, -1, 1, 0, 1, -1, 0, -1, -1, 0],
                t = this.gl
              ;(this.quadVPBuffer = t.createBuffer()),
                t.bindBuffer(t.ARRAY_BUFFER, this.quadVPBuffer),
                t.bufferData(
                  t.ARRAY_BUFFER,
                  new Float32Array(e),
                  t.STATIC_DRAW
                ),
                (this.quadVPBuffer.itemSize = 3),
                (this.quadVPBuffer.numItems = 4)
              ;(this.quadVTCBuffer = t.createBuffer()),
                t.bindBuffer(t.ARRAY_BUFFER, this.quadVTCBuffer),
                (e = [1, 0, 0, 0, 1, 1, 0, 1]),
                t.bufferData(t.ARRAY_BUFFER, new Float32Array(e), t.STATIC_DRAW)
            }.call(this),
            n &&
              function () {
                var e = this.gl
                ;(this.framebuffer = e.createFramebuffer()),
                  e.bindFramebuffer(e.FRAMEBUFFER, this.framebuffer),
                  (this.framebufferTexture = new s.e(
                    this.gl,
                    this.size,
                    e.RGBA
                  ))
                var t = e.createRenderbuffer()
                e.bindRenderbuffer(e.RENDERBUFFER, t),
                  e.renderbufferStorage(
                    e.RENDERBUFFER,
                    e.DEPTH_COMPONENT16,
                    this.size.w,
                    this.size.h
                  ),
                  e.framebufferTexture2D(
                    e.FRAMEBUFFER,
                    e.COLOR_ATTACHMENT0,
                    e.TEXTURE_2D,
                    this.framebufferTexture.texture,
                    0
                  ),
                  e.framebufferRenderbuffer(
                    e.FRAMEBUFFER,
                    e.DEPTH_ATTACHMENT,
                    e.RENDERBUFFER,
                    t
                  )
              }.call(this),
            this.onInitTextures(),
            function () {
              var e = this.gl
              ;(this.perspectiveMatrix = (function (e, t, n, r) {
                var i = n * Math.tan((e * Math.PI) / 360),
                  a = -i
                return (function (e, t, n, r, i, a) {
                  return p([
                    [(2 * i) / (t - e), 0, (t + e) / (t - e), 0],
                    [0, (2 * i) / (r - n), (r + n) / (r - n), 0],
                    [0, 0, -(a + i) / (a - i), (-2 * a * i) / (a - i)],
                    [0, 0, -1, 0]
                  ])
                })(a * t, i * t, a, i, n, r)
              })(45, 1, 0.1, 100)),
                r.call(this),
                i.call(this, [0, 0, -2.415]),
                e.bindBuffer(e.ARRAY_BUFFER, this.quadVPBuffer),
                e.vertexAttribPointer(
                  this.vertexPositionAttribute,
                  3,
                  e.FLOAT,
                  !1,
                  0,
                  0
                ),
                e.bindBuffer(e.ARRAY_BUFFER, this.quadVTCBuffer),
                e.vertexAttribPointer(
                  this.textureCoordAttribute,
                  2,
                  e.FLOAT,
                  !1,
                  0,
                  0
                ),
                this.onInitSceneTextures(),
                a.call(this),
                this.framebuffer &&
                  e.bindFramebuffer(e.FRAMEBUFFER, this.framebuffer)
            }.call(this)
        }
        function r() {
          this.mvMatrix = c.I(4)
        }
        function i(e) {
          ;(function (e) {
            this.mvMatrix = this.mvMatrix.x(e)
          }.call(this, c.Translation(d([e[0], e[1], e[2]])).ensure4x4()))
        }
        function a() {
          this.program.setMatrixUniform(
            'uPMatrix',
            new Float32Array(this.perspectiveMatrix.flatten())
          ),
            this.program.setMatrixUniform(
              'uMVMatrix',
              new Float32Array(this.mvMatrix.flatten())
            )
        }
        return (
          (n.prototype = {
            toString: function () {
              return 'WebGLCanvas Size: ' + this.size
            },
            checkLastError: function (e) {
              var t = this.gl.getError()
              if (t !== this.gl.NO_ERROR) {
                var n = this.glNames[t]
                ;(n =
                  'undefined' !== typeof n
                    ? n + '(' + t + ')'
                    : 'Unknown WebGL ENUM (0x' + value.toString(16) + ')'),
                  e
                    ? s.h.log('WebGL Error: %s, %s', e, n)
                    : s.h.log('WebGL Error: %s', n),
                  s.h.trace()
              }
            },
            onInitWebGL: function () {
              try {
                this.gl = this.canvas.getContext('webgl')
              } catch (e) {
                s.h.log('inInitWebGL error = ' + e)
              }
              if (
                (this.gl ||
                  s.h.error(
                    'Unable to initialize WebGL. Your browser may not support it.'
                  ),
                !this.glNames)
              )
                for (var e in ((this.glNames = {}), this.gl))
                  'number' === typeof this.gl[e] &&
                    (this.glNames[this.gl[e]] = e)
            },
            onInitShaders: function () {
              ;(this.program = new s.b(this.gl)),
                this.program.attach(new s.d(this.gl, e)),
                this.program.attach(new s.d(this.gl, t)),
                this.program.link(),
                this.program.use(),
                (this.vertexPositionAttribute =
                  this.program.getAttributeLocation('aVertexPosition')),
                this.gl.enableVertexAttribArray(this.vertexPositionAttribute),
                (this.textureCoordAttribute =
                  this.program.getAttributeLocation('aTextureCoord')),
                this.gl.enableVertexAttribArray(this.textureCoordAttribute)
            },
            onInitTextures: function () {
              var e = this.gl
              e.viewport(0, 0, this.canvas.width, this.canvas.height),
                (this.texture = new s.e(e, this.size, e.RGBA))
            },
            onInitSceneTextures: function () {
              this.texture.bind(0, this.program, 'texture')
            },
            drawScene: function () {
              this.gl.drawArrays(this.gl.TRIANGLE_STRIP, 0, 4)
            },
            updateVertexArray: function (e) {
              this.zoomScene(e)
            },
            readPixels: function (e) {
              var t = this.gl
              t.readPixels(
                0,
                0,
                this.size.w,
                this.size.h,
                t.RGBA,
                t.UNSIGNED_BYTE,
                e
              )
            },
            zoomScene: function (e) {
              r.call(this),
                i.call(this, [e[0], e[1], e[2]]),
                a.call(this),
                this.drawScene()
            },
            setViewport: function (e, t) {
              var n, r
              s.h.log('toWidth=' + e + ',toHeight=' + t),
                this.gl.drawingBufferWidth < e ||
                this.gl.drawingBufferHeight < t
                  ? ((n = this.gl.drawingBufferWidth),
                    (r = this.gl.drawingBufferHeight),
                    (this.canvas.width = n),
                    (this.canvas.height = r))
                  : ((n = e), (r = t)),
                this.gl.viewport(0, 0, n, r)
            },
            clearCanvas: function () {
              this.gl.clearColor(0, 0, 0, 1),
                this.gl.clear(
                  this.gl.DEPTH_BUFFER_BIT | this.gl.COLOR_BUFFER_BIT
                )
            }
          }),
          n
        )
      })(),
      y =
        ((function () {
          function e(e, t) {
            g.call(this, e, t)
          }
          e.prototype = v(g, {
            drawCanvas: function (e) {
              this.texture.fill(e), this.drawScene()
            },
            onInitTextures: function () {
              var e = this.gl
              this.setViewport(this.canvas.width, this.canvas.height),
                (this.texture = new m(e, this.size, e.RGBA))
            },
            initCanvas: function () {
              this.gl.clear(this.gl.DEPTH_BUFFER_BIT | this.gl.COLOR_BUFFER_BIT)
            }
          })
        })(),
        (function () {
          var e = s.c.createFromSource(
              'x-shader/x-vertex',
              w([
                'attribute vec3 aVertexPosition;',
                'attribute vec2 aTextureCoord;',
                'uniform mat4 uMVMatrix;',
                'uniform mat4 uPMatrix;',
                'varying highp vec2 vTextureCoord;',
                'void main(void) {',
                '  gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);',
                '  vTextureCoord = aTextureCoord;',
                '}'
              ])
            ),
            t = s.c.createFromSource(
              'x-shader/x-fragment',
              w([
                'precision highp float;',
                'varying highp vec2 vTextureCoord;',
                'uniform sampler2D YTexture;',
                'uniform sampler2D UTexture;',
                'uniform sampler2D VTexture;',
                'const mat4 YUV2RGB = mat4',
                '(',
                ' 1.16438, 0.00000, 1.59603, -.87079,',
                ' 1.16438, -.39176, -.81297, .52959,',
                ' 1.16438, 2.01723, 0, -1.08139,',
                ' 0, 0, 0, 1',
                ');',
                'void main(void) {',
                ' gl_FragColor = vec4( texture2D(YTexture,  vTextureCoord).x, texture2D(UTexture, vTextureCoord).x, texture2D(VTexture, vTextureCoord).x, 1) * YUV2RGB;',
                '}'
              ])
            )
          function n(e, t) {
            ;(this.isPlayStart = !0), g.call(this, e, t)
          }
          return (
            (n.prototype = v(g, {
              onInitShaders: function () {
                ;(this.program = new s.b(this.gl)),
                  this.program.attach(new s.d(this.gl, e)),
                  this.program.attach(new s.d(this.gl, t)),
                  this.program.link(),
                  this.program.use(),
                  (this.vertexPositionAttribute =
                    this.program.getAttributeLocation('aVertexPosition')),
                  this.gl.enableVertexAttribArray(this.vertexPositionAttribute),
                  (this.textureCoordAttribute =
                    this.program.getAttributeLocation('aTextureCoord')),
                  this.gl.enableVertexAttribArray(this.textureCoordAttribute)
              },
              onInitTextures: function () {
                this.setViewport(this.size.w, this.size.h),
                  (this.YTexture = new s.e(this.gl, this.size)),
                  (this.UTexture = new s.e(this.gl, this.size.getHalfSize())),
                  (this.VTexture = new s.e(this.gl, this.size.getHalfSize()))
              },
              onInitSceneTextures: function () {
                this.YTexture.bind(0, this.program, 'YTexture'),
                  this.UTexture.bind(1, this.program, 'UTexture'),
                  this.VTexture.bind(2, this.program, 'VTexture')
              },
              fillYUVTextures: function (e, t, n) {
                this.YTexture.fill(e),
                  this.UTexture.fill(t),
                  this.VTexture.fill(n),
                  this.drawScene()
              },
              drawCanvas: function (e, t, n) {
                this.isPlayStart &&
                  this.playStartCallback &&
                  (this.playStartCallback(), (this.isPlayStart = !1)),
                  this.YTexture.fill(e),
                  this.UTexture.fill(t),
                  this.VTexture.fill(n),
                  this.drawScene()
              },
              updateVertexArray: function (e) {
                this.zoomScene(e)
              },
              toString: function () {
                return 'YUVCanvas Size: ' + this.size
              },
              initCanvas: function () {
                this.gl.clear(
                  this.gl.DEPTH_BUFFER_BIT | this.gl.COLOR_BUFFER_BIT
                )
              },
              setPlayStartCallback: function (e) {
                this.playStartCallback = e
              }
            })),
            n
          )
        })())
    function v(e, t) {
      for (
        var n = Object.create(e.prototype), r = Object.keys(t), i = 0;
        i < r.length;
        i++
      )
        n[r[i]] = t[r[i]]
      return n
    }
    function w(e) {
      return e.join('\n')
    }
    var S = function (e, t, n) {
      var r = t,
        i = e,
        a = n,
        o = null,
        s = 0,
        l = 0,
        u = !1,
        c = null,
        f = 0,
        h = 0,
        d = !1,
        p = !1,
        m = 1,
        g = function (e) {
          ;(function (e) {
            ;(this.buffer = e), (this.previous = null), (this.next = null)
          }.call(this, e))
        }
      function v() {
        var e = r || 25
        function t() {
          ;(this.first = null), (this.size = 0)
        }
        return (
          (t.prototype = {
            enqueue: function (t) {
              this.size >= e && this.clear()
              var n = new g(t)
              if (null === this.first) this.first = n
              else {
                for (var r = this.first; null !== r.next; ) r = r.next
                r.next = n
              }
              return (this.size += 1), n
            },
            dequeue: function () {
              var e = null
              return (
                null !== this.first &&
                  ((e = this.first),
                  (this.first = this.first.next),
                  (this.size -= 1)),
                e
              )
            },
            clear: function () {
              for (var e = null; null !== this.first; )
                (e = this.first),
                  (this.first = this.first.next),
                  (this.size -= 1),
                  (e.buffer = null),
                  (e = null)
              ;(this.size = 0), (this.first = null)
            }
          }),
          new t()
        )
      }
      function w() {
        ;(c = new v()), (u = !1)
      }
      var S = function (e) {
          return (
            'undefined' !== typeof o &&
            (o.drawCanvas(e.buffer.dataY, e.buffer.dataU, e.buffer.dataV),
            delete e.buffer,
            (e.buffer = null),
            (e.previous = null),
            (e.next = null),
            (e = null),
            !0)
          )
        },
        _ = function e(t) {
          if (!0 === u) {
            if (0 === s || t - s < 200)
              return (
                0 === s && (s = t),
                void (
                  null !== c &&
                  (d ||
                    (null !== (n = c.dequeue()) &&
                      null !== n.buffer &&
                      null !== n.buffer.dataY &&
                      ((d = !0), S(n))),
                  window.requestAnimationFrame(e))
                )
              )
            if (a)
              return (
                null !== (n = c.dequeue()) &&
                  null !== n.buffer &&
                  null !== n.buffer.dataY &&
                  S(n),
                void window.requestAnimationFrame(e)
              )
            0 === l && (l = t)
            var n,
              r = t - l
            r > h &&
              null !== (n = c.dequeue()) &&
              null !== n.buffer &&
              null !== n.buffer.dataY &&
              (p && (f = r - h),
              (h = n.buffer.nCostTime),
              (h -= f),
              S(n),
              (l = t),
              (p = !0)),
              window.requestAnimationFrame(e)
          }
        }
      function b(e, t) {
        function n(e, t) {
          ;(n.prototype.w = e), (n.prototype.h = t)
        }
        return (
          (n.prototype = {
            toString: function () {
              return '(' + n.prototype.w + ', ' + n.prototype.h + ')'
            },
            getHalfSize: function () {
              return new b(n.prototype.w >>> 1, n.prototype.h >>> 1)
            },
            length: function () {
              return n.prototype.w * n.prototype.h
            }
          }),
          new n(e, t)
        )
      }
      return (
        (w.prototype = {
          draw: function (e, t, n, r) {
            if (null !== c && !0 === u)
              if (document.hidden && c.size >= 25) c.clear()
              else {
                var i = {}
                ;(i.dataY = e), (i.dataU = t), (i.dataV = n), 0 == r && (r = 25)
                var o = 1e3 / r,
                  s = c.size * o
                a || (m = s > 500 ? 1.2 : s < 200 ? 0.8 : 1),
                  (i.nCostTime = 1e3 / r / m),
                  i.nCostTime < 20 && (i.nCostTime = 20),
                  c.enqueue(i)
              }
          },
          resize: function (e, t) {
            this.stopRendering(), null !== c && c.clear(), o && (o = null)
            var n = new b(e, t)
            ;(o = new y(i, n)).setPlayStartCallback(this.playStartCallback),
              (n = null),
              this.startRendering()
          },
          initStartTime: function () {
            0 === s && this.startRendering()
          },
          startRendering: function () {
            0 === s && ((u = !0), window.requestAnimationFrame(_))
          },
          pause: function () {
            u = !1
          },
          play: function () {
            u = !0
          },
          stopRendering: function () {
            ;(u = !1), (s = 0)
          },
          setPlaySpeed: function (e) {
            m = e
          },
          terminate: function () {
            ;(u = !1),
              (s = 0),
              null !== c && (c.clear(), (c = null)),
              o && o.clearCanvas(),
              (o = null)
          },
          getVideoBufferQueueSize: function () {
            return c.size
          },
          setPlayStartCallback: function (e) {
            this.playStartCallback = e
          }
        }),
        new w()
      )
    }
    var _ = function () {
        var e = null,
          t = '',
          n = null,
          r = null,
          i = null,
          a = null,
          o = null,
          l = null,
          u = null,
          c = 1,
          f = { timestamp: 0, timestamp_usec: 0, timezone: 0 },
          h = { timestamp: 0, timestamp_usec: 0, timezone: 0 },
          d = null,
          p = !1,
          m = null,
          g = null,
          y = null,
          v = !1,
          w = !0,
          S = 0,
          _ = !1,
          b = [],
          x = 0.5,
          A = null,
          P = null,
          C = null,
          T = 0,
          R = 0,
          M = !1,
          U = null,
          I = 'png',
          D = 1,
          E = Object(s.a)(),
          k = null,
          L = 0,
          O = 0,
          F = 0,
          V = 8,
          B = null,
          N = !1,
          z = !1,
          H = [],
          Y = {},
          j = 25,
          q = 0.5,
          G = !1,
          W = !1
        function X() {}
        function Z() {
          Q(), (W = !0)
        }
        function K() {
          var e = 0
          if (null !== m)
            for (e = 0; e < m.length; e++)
              C.removeEventListener(m[e].type, m[e].function)
          if (null !== y)
            for (e = 0; e < y.length; e++)
              P.removeEventListener(y[e].type, y[e].function)
          if (null !== g)
            for (e = 0; e < g.length; e++)
              A.removeEventListener(g[e].type, g[e].function)
        }
        function Q() {
          if (null === P || 'ended' === P.readyState)
            return (
              (function (e) {
                ;(y = []).push({ type: 'sourceopen', function: Z }),
                  y.push({ type: 'error', function: ie })
                for (var t = 0; t < y.length; t++)
                  e.addEventListener(y[t].type, y[t].function)
              })((P = new MediaSource())),
              (A.src = window.URL.createObjectURL(P)),
              void s.h.log(
                'videoMediaSource::appendInitSegment new MediaSource()'
              )
            )
          if (
            (s.h.log('videoMediaSource::appendInitSegment start'),
            0 === P.sourceBuffers.length)
          ) {
            P.duration = 0
            var r = null
            if (
              (1 == n
                ? (r = 'video/mp4;codecs="avc1.' + t + '"')
                : 2 == n && (r = 'video/mp4; codecs="hvc1.1.6.L30.B0"'),
              null == r)
            )
              return
            if (!MediaSource.isTypeSupported(r))
              return (
                s.h.log('not support' + r),
                B && B({ errorCode: 101 }),
                void (l && l('InitError'))
              )
            !(function (e) {
              ;(m = []).push({ type: 'error', function: ae }),
                m.push({ type: 'updateend', function: ne }),
                m.push({ type: 'update', function: re })
              for (var t = 0; t < m.length; t++)
                e.addEventListener(m[t].type, m[t].function)
            })((C = P.addSourceBuffer(r)))
          }
          var i = e()
          null !== i
            ? (C.appendBuffer(i),
              s.h.log(
                'videoMediaSource::appendInitSegment end, codecInfo = ' + t
              ))
            : P.endOfStream('network')
        }
        function J() {
          A.paused && (i(), v || N || A.play())
        }
        function $() {
          A.paused || w || (s.h.log('pause'), A.pause())
        }
        function ee() {
          H.length &&
            (function (e) {
              if (
                (!G && W && ((G = !0), Q()),
                null !== C &&
                  'closed' !== P.readyState &&
                  'ended' !== P.readyState)
              )
                try {
                  if (b.length > 0)
                    return (
                      s.h.count('1.segmentWaitDecode.length: ' + b.length),
                      b.push(e),
                      void s.h.count('2.segmentWaitDecode.length: ' + b.length)
                    )
                  C.updating
                    ? (s.h.log('updating..........'), b.push(e))
                    : (C.appendBuffer(e), N && (Y.buffer = e))
                } catch (e) {
                  s.h.log(
                    'videoMediaSource::appendNextMediaSegment error >> initVideo'
                  ),
                    (b.length = 0),
                    B && B({ errorCode: 101 })
                }
            })(H.shift())
        }
        function te() {
          if (null !== P)
            try {
              if (
                C &&
                C.buffered.length > 0 &&
                ((function () {
                  var e = 1 * C.buffered.start(C.buffered.length - 1),
                    t = 1 * C.buffered.end(C.buffered.length - 1)
                  t - e > 60 && C.remove(e, t - 10)
                })(),
                (z && !N) ||
                  (A.duration > q &&
                    ((A.currentTime = (A.duration - q).toFixed(3)),
                    (q += j < 10 ? 0.5 : 0.1))),
                A &&
                  A.duration - A.currentTime > V &&
                  B &&
                  B({ errorCode: 101 }),
                _ && !p)
              ) {
                var e = 1 * C.buffered.start(C.buffered.length - 1),
                  t = 1 * C.buffered.end(C.buffered.length - 1)
                if (
                  (0 === A.currentTime ? t - e : t - A.currentTime) >=
                  x + 0.1
                ) {
                  if ((s.h.log('\u8df3\u79d2'), C.updating)) return
                  var n = t - 0.1
                  A.currentTime = n.toFixed(3)
                }
              }
            } catch (e) {
              s.h.log('sourceBuffer has been removed')
            }
        }
        function ne() {}
        function re() {
          b.length > 0 &&
            (s.h.count(
              '1. onSourceUpdate .segmentWaitDecode.length: ' + b.length
            ),
            C.updating ||
              (s.h.count(
                '2. onSourceUpdate .appendBuffer: ' +
                  b.length +
                  '  ' +
                  b[0].length
              ),
              C.appendBuffer(b[0]),
              b.shift()))
        }
        function ie() {
          l && l()
        }
        function ae() {
          l && l()
        }
        function oe() {
          $(), B && B({ errorCode: 101 }), l && l()
        }
        function se() {
          ;(v = !0), (w = !1), (z = !0), M || ((M = !0), o('PlayStart'))
        }
        function le() {
          ;(v = !1),
            (w = !0),
            s.h.log(
              '\u6682\u505c\u64ad\u653e----------------------------------------------'
            )
        }
        function ue() {
          var e = parseInt(P.duration, 10),
            t = parseInt(A.currentTime, 10),
            n = {
              timestamp: f.timestamp - c * (e - t + (1 !== c ? 1 : 0)),
              timestamp_usec: 0,
              timezone: f.timezone
            }
          0 === t ||
            isNaN(e) ||
            (!p && Math.abs(e - t) > 4 && 1 === c) ||
            A.paused ||
            (null === d
              ? ((d = n), a(0, 'currentTime'))
              : ((d.timestamp <= n.timestamp && c >= 1) ||
                  (d.timestamp > n.timestamp && c < 1)) &&
                ((d = n), ++S > 4 && a(n.timestamp, 'currentTime')))
        }
        function ce() {
          null != C && (J(), te())
        }
        function fe() {
          i()
        }
        function he() {
          J()
        }
        function de() {
          if (
            (s.h.log('\u9700\u8981\u7f13\u51b2\u4e0b\u4e00\u5e27'),
            (_ = !1),
            0 == R)
          )
            (T = Date.now()), R++
          else {
            R++
            var e = Date.now() - T
            s.h.log('diffTime: ' + e + '  Count: ' + R),
              R >= 5 &&
                e < 6e4 &&
                x <= 1 &&
                ((x += 0.1), (R = 0), (T = 0), s.h.log('delay + 0.1 = ' + x))
          }
        }
        function pe() {
          s.h.log('Can play !')
        }
        function me() {
          s.h.log('Can play without waiting'), (_ = !0)
        }
        function ge() {
          s.h.log('loadedmetadata')
        }
        function ye(e, t) {
          for (
            var n = atob(e.substring('data:image/png;base64,'.length)),
              r = new Uint8Array(n.length),
              i = 0,
              a = n.length;
            i < a;
            ++i
          )
            r[i] = n.charCodeAt(i)
          var o = new Blob([r.buffer], { type: 'image/png' })
          ve(o, t + '.png')
        }
        X.prototype = {
          init: function (e) {
            ;(u = Object(s.a)()),
              s.h.log('videoMediaSource::init browserType = ' + u),
              ((A = e).autoplay = 'safari' !== u),
              (A.controls = !1),
              (A.preload = 'auto'),
              (function (e) {
                ;(g = []).push({ type: 'durationchange', function: ce }),
                  g.push({ type: 'playing', function: se }),
                  g.push({ type: 'error', function: oe }),
                  g.push({ type: 'pause', function: le }),
                  g.push({ type: 'timeupdate', function: ue }),
                  g.push({ type: 'resize', function: fe }),
                  g.push({ type: 'seeked', function: he }),
                  g.push({ type: 'waiting', function: de }),
                  g.push({ type: 'canplaythrough', function: me }),
                  g.push({ type: 'canplay', function: pe }),
                  g.push({ type: 'loadedmetadata', function: ge })
                for (var t = 0; t < g.length; t++)
                  e.addEventListener(g[t].type, g[t].function)
              })(A),
              Q()
          },
          setInitSegmentFunc: function (t) {
            e = t
          },
          getVideoElement: function () {
            return A
          },
          setCodecInfo: function (e) {
            t = e
          },
          setMediaSegment: function (e) {
            H.push(e), N || ee()
          },
          capture: function (e, t) {
            U && clearInterval(U)
            var n = document.createElement('canvas')
            ;(n.width = A.videoWidth), (n.height = A.videoHeight)
            var r = n.getContext('2d')
            _ || 'edge' === E
              ? (r.drawImage(A, 0, 0, n.width, n.height),
                t && r.drawImage(t, 0, 0, n.width, n.height),
                ye(n.toDataURL(), e))
              : (U = setInterval(function () {
                  _ &&
                    (r.drawImage(A, 0, 0, n.width, n.height),
                    t && r.drawImage(t, 0, 0, n.width, n.height),
                    ye(n.toDataURL(), e),
                    clearInterval(U))
                }, 200))
          },
          getCapture: function (e, t, n) {
            U && clearInterval(U),
              (D = n || 1),
              (I = 'png'),
              ('jpg' !== t && 'jpeg' !== t) || (I = 'jpeg')
            var r = document.createElement('canvas'),
              i = null
            return (
              (r.width = A.videoWidth),
              (r.height = A.videoHeight),
              _ || 'edge' === E
                ? (r.getContext('2d').drawImage(A, 0, 0, r.width, r.height),
                  (i = r.toDataURL('image/' + I, D)))
                : _ &&
                  (r.getContext('2d').drawImage(A, 0, 0, r.width, r.height),
                  (i = r.toDataURL('image/' + I, D))),
              i
            )
          },
          setInitSegment: function () {
            Q()
          },
          setTimeStamp: function (e, t) {
            r = e
          },
          setVideoSizeCallback: function (e) {
            i = e
          },
          setAudioStartCallback: function (e) {
            a = e
          },
          setMseErrorCallback: function (e) {
            l = e
          },
          getPlaybackTimeStamp: function () {
            return r
          },
          setSpeedPlay: function (e) {
            c = e
          },
          setvideoTimeStamp: function (e) {
            var t = Math.abs(f.timestamp - e.timestamp) > 3
            h.timestamp,
              !0 === t &&
                ((S = 0),
                a((h = e).timestamp, 'init'),
                0 !== f.timestamp && p && (A.currentTime = P.duration - 0.1),
                (d = null)),
              (f = e)
          },
          pause: function () {
            ;(N = !0), $()
          },
          play: function () {
            N = !1
          },
          setPlaybackFlag: function (e) {
            p = e
          },
          setTimeStampInit: function () {
            ;(d = null), (h = { timestamp: 0, timestamp_usec: 0, timezone: 0 })
          },
          close: function () {
            K(), $()
          },
          setBeginDrawCallback: function (e) {
            o = e
          },
          setErrorCallback: function (e) {
            B = e
          },
          terminate: function () {
            null !== A &&
              (K(),
              'open' === P.readyState &&
                (C && P.removeSourceBuffer(C), P.endOfStream()),
              (C = null),
              (P = null),
              (A = null),
              U && (clearInterval(U), (U = null)),
              k && (clearInterval(k), (k = null)),
              (F = 0),
              (O = 0),
              (L = 0),
              (G = !1),
              (W = !1))
          },
          getDuration: function () {
            return A.duration - A.currentTime
          },
          setFPS: function (e) {
            e && (j = e)
          },
          setRtspOver: function () {
            A.duration.toFixed(4) - 0 === A.currentTime.toFixed(4) - 0 ||
              ((L = parseInt(A.currentTime)),
              (O = parseInt(A.duration)),
              (k = setInterval(function () {
                L === parseInt(A.currentTime) && O === parseInt(A.duration)
                  ? F++ > 10 && (k && clearInterval(k), (k = null))
                  : parseInt(A.currentTime) >= parseInt(A.duration)
                  ? (k && clearInterval(k), (k = null))
                  : ((L = parseInt(A.currentTime)),
                    (O = parseInt(A.duration)),
                    (F = 0))
              }, 150)))
          },
          getVideoBufferQueueSize: function () {
            return H.length
          },
          playNextFrame: function () {
            ee()
          },
          getCurFrameInfo: function () {
            return (
              (Y.src = (function () {
                var e = document.createElement('canvas')
                return (
                  (e.width = A.videoWidth),
                  (e.height = A.videoHeight),
                  e.getContext('2d').drawImage(A, 0, 0, e.width, e.height),
                  e.toDataURL()
                )
              })()),
              Y
            )
          },
          setDecodeType: function (e) {
            n = e
          }
        }
        var ve = (function (e) {
          var t = e.document,
            n = function () {
              return e.URL || e.webkitURL || e
            },
            r = t.createElementNS('http://www.w3.org/1999/xhtml', 'a'),
            i = 'download' in r,
            a = /constructor/i.test(e.HTMLElement),
            o = /CriOS\/[\d]+/.test(navigator.userAgent),
            s = function (t) {
              ;(e.setImmediate || e.setTimeout)(function () {
                throw t
              }, 0)
            },
            l = function (e) {
              setTimeout(function () {
                'string' === typeof e ? n().revokeObjectURL(e) : e.remove()
              }, 4e4)
            },
            u = function (e) {
              return /^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(
                e.type
              )
                ? new Blob([String.fromCharCode(65279), e], { type: e.type })
                : e
            },
            c = function (t, c, f) {
              f || (t = u(t))
              var h,
                d = this,
                p = 'application/octet-stream' === t.type,
                m = function () {
                  !(function (e, t, n) {
                    for (var r = (t = [].concat(t)).length; r--; ) {
                      var i = e['on' + t[r]]
                      if ('function' === typeof i)
                        try {
                          i.call(e, n || e)
                        } catch (e) {
                          s(e)
                        }
                    }
                  })(d, 'writestart progress write writeend'.split(' '))
                }
              if (((d.readyState = d.INIT), i))
                return (
                  (h = n().createObjectURL(t)),
                  void setTimeout(function () {
                    ;(r.href = h),
                      (r.download = c),
                      (function (e) {
                        var t = new MouseEvent('click')
                        e.dispatchEvent(t)
                      })(r),
                      m(),
                      l(h),
                      (d.readyState = d.DONE)
                  })
                )
              !(function () {
                if ((o || (p && a)) && e.FileReader) {
                  var r = new FileReader()
                  return (
                    (r.onloadend = function () {
                      var t = o
                        ? r.result
                        : r.result.replace(
                            /^data:[^;]*;/,
                            'data:attachment/file;'
                          )
                      e.open(t, '_blank') || (e.location.href = t),
                        (t = void 0),
                        (d.readyState = d.DONE),
                        m()
                    }),
                    r.readAsDataURL(t),
                    void (d.readyState = d.INIT)
                  )
                }
                h || (h = n().createObjectURL(t)),
                  p
                    ? (e.location.href = h)
                    : e.open(h, '_blank') || (e.location.href = h),
                  (d.readyState = d.DONE),
                  m(),
                  l(h)
              })()
            },
            f = c.prototype
          return 'undefined' !== typeof navigator && navigator.msSaveOrOpenBlob
            ? function (e, t, n) {
                return (
                  (t = t || e.name || 'download'),
                  n || (e = u(e)),
                  navigator.msSaveOrOpenBlob(e, t)
                )
              }
            : ((f.readyState = f.INIT = 0),
              (f.WRITING = 1),
              (f.DONE = 2),
              (f.error =
                f.onwritestart =
                f.onprogress =
                f.onwrite =
                f.onabort =
                f.onerror =
                f.onwriteend =
                  null),
              function (e, t, n) {
                return new c(e, t || e.name || 'download', n)
              })
        })(window)
        return new X()
      },
      b = function () {
        var e = null,
          t = null,
          n = null,
          r = null,
          i = !1,
          a = null,
          o = {
            audio: {
              noiseSuppression: !1,
              echoCancellation: !1,
              sampleRate: 16e3
            }
          },
          l = null
        function u() {}
        return (
          (u.prototype = {
            init: function () {
              if (void 0 === e || null === e)
                try {
                  ;(window.AudioContext =
                    window.AudioContext ||
                    window.webkitAudioContext ||
                    window.mozAudioContext ||
                    window.oAudioContext ||
                    window.msAudioContext),
                    ((e = new AudioContext()).onstatechange = function () {
                      s.h.info('Audio Context State changed :: ' + e.state)
                    })
                } catch (e) {
                  return void console.error(
                    'Web Audio API is not supported in this web browser! : ' + e
                  )
                }
            },
            initAudioOut: function () {
              if (
                ((null !== t && null !== n) ||
                  ((t = e.createGain()),
                  ((n = e.createScriptProcessor(4096, 1, 1)).onaudioprocess =
                    function (e) {
                      if (null !== a) {
                        var t = e.inputBuffer.getChannelData(0)
                        null !== l && !0 === i && l(t)
                      }
                    }),
                  t.connect(n),
                  n.connect(e.destination),
                  (r = e.sampleRate),
                  (t.gain.value = 1)),
                void 0 === navigator.mediaDevices &&
                  (navigator.mediaDevices = {}),
                void 0 === navigator.mediaDevices.getUserMedia &&
                  (navigator.mediaDevices.getUserMedia = function (e, t, n) {
                    var r =
                      navigator.getUserMedia ||
                      navigator.webkitGetUserMedia ||
                      navigator.mozGetUserMedia ||
                      navigator.msGetUserMedia
                    return r
                      ? new Promise(function (t, n) {
                          r.call(navigator, e, t, n)
                        })
                      : (n(),
                        Promise.reject(
                          new Error(
                            'getUserMedia is not implemented in this browser'
                          )
                        ))
                  }),
                navigator.mediaDevices.getUserMedia)
              )
                return (
                  navigator.mediaDevices
                    .getUserMedia(o)
                    .then(function (n) {
                      setTimeout(function () {
                        n._call = {}
                        var r = a
                        r && (n._call = r._call),
                          (a = n),
                          e.createMediaStreamSource(a).connect(t)
                      }, 100)
                    })
                    .catch(function (e) {
                      e.name, e.message, e.code
                    }),
                  (i = !0),
                  r
                )
              s.h.error(
                'Cannot open local media stream! :: navigator.mediaDevices.getUserMedia is not defined!'
              )
            },
            controlVolumnOut: function (e) {
              var n = (e / 20) * 2
              t.gain.value = n <= 0 ? 0 : n >= 10 ? 10 : n
            },
            stopAudioOut: function () {
              if (null !== a && i)
                try {
                  for (
                    var e = a.getAudioTracks(), t = 0, n = e.length;
                    t < n;
                    t++
                  )
                    e[t].stop()
                  ;(i = !1), (a = null)
                } catch (e) {
                  s.h.log(e)
                }
            },
            terminate: function () {
              this.stopAudioOut(), e.close(), (t = null), (n = null)
            },
            setSendAudioTalkBufferCallback: function (e) {
              l = e
            }
          }),
          new u()
        )
      },
      x = n(2),
      A = n.n(x)
    var P = function (e, t) {
      var n = null,
        r = null,
        i = null
      function a() {}
      function o(e) {
        var t = { type: 'getRtpData', data: e }
        n.postMessage(t)
      }
      function s(e) {
        var t = e.data
        switch (t.type) {
          case 'rtpData':
            i(t.data)
        }
      }
      return (
        (a.prototype = {
          setSendAudioTalkCallback: function (e) {
            i = e
          },
          talkInit: function (e, t) {
            var i = {
              type: 'sdpInfo',
              data: {
                sdpInfo: e,
                aacCodecInfo: t,
                decodeMode: 'canvas',
                mp4Codec:
                  arguments.length > 2 && void 0 !== arguments[2]
                    ? arguments[2]
                    : null
              }
            }
            try {
              ;(window.AudioContext =
                window.AudioContext ||
                window.webkitAudioContext ||
                window.mozAudioContext ||
                window.oAudioContext ||
                window.msAudioContext),
                ((n = new A.a()).onmessage = s),
                null === r &&
                  ((r = new b()).init(), r.setSendAudioTalkBufferCallback(o)),
                n.postMessage(i),
                (i = { type: 'sampleRate', data: r.initAudioOut() }),
                n.postMessage(i)
            } catch (e) {
              return void console.error(
                'Web Audio API is not supported in this web browser! : ' + e
              )
            }
          },
          stop: function () {
            r && (r.terminate(), (r = null)), n && (n.terminate(), (n = null))
          }
        }),
        new a()
      )
    }
    var C = function () {
      var e = null,
        t = null,
        n = -100,
        r = '#0000FF'
      function i() {}
      function a(e, t, n) {
        return (t.x - e.x) * (n.y - e.y) - (n.x - e.x) * (t.y - e.y)
      }
      function o(e, t) {
        for (var n = 0, r = 0; r < e.length - 1; r++)
          e[r].y <= t.y
            ? e[r + 1].y > t.y && a(e[r], e[r + 1], t) > 0 && ++n
            : e[r + 1].y <= t.y && a(e[r], e[r + 1], t) < 0 && --n
        return 0 != n
      }
      return (
        (i.prototype = {
          Init: function (n) {
            t = (e = n).getContext('2d')
          },
          SetCurrentColor: function (e) {
            r = e
          },
          drawLine: function (e, n) {
            ;(e.x == n.x && e.y == n.y) ||
              (t.beginPath(),
              (t.lineWidth = 2),
              (t.strokeStyle = r),
              t.moveTo(e.x, e.y),
              t.lineTo(n.x, n.y),
              t.stroke(),
              t.setLineDash([]),
              t.closePath())
          },
          drawPolyLine: function (e, n) {
            if (!(n < 2)) {
              t.beginPath(), (t.lineWidth = 2), (t.strokeStyle = r)
              for (var i = 0; i < n; i++)
                0 === i ? t.moveTo(e[i].x, e[i].y) : t.lineTo(e[i].x, e[i].y)
              t.stroke(), t.setLineDash([0, 0]), t.closePath()
            }
          },
          drawArrow: function (e, t) {
            var n,
              r = {},
              i = {}
            ;(e.x == t.x && e.y == t.y) ||
              (t.x < e.x
                ? ((n = Math.atan((e.y - t.y) / (e.x - t.x))),
                  (r.x = t.x + 20 * Math.cos(n - Math.PI / 6)),
                  (r.y = t.y + 20 * Math.sin(n - Math.PI / 6)),
                  (i.x = t.x + 20 * Math.cos(n + Math.PI / 6)),
                  (i.y = t.y + 20 * Math.sin(n + Math.PI / 6)))
                : t.x > e.x
                ? ((n = Math.atan((e.y - t.y) / (e.x - t.x))),
                  (r.x = t.x - 20 * Math.cos(n - Math.PI / 6)),
                  (r.y = t.y - 20 * Math.sin(n - Math.PI / 6)),
                  (i.x = t.x - 20 * Math.cos(n + Math.PI / 6)),
                  (i.y = t.y - 20 * Math.sin(n + Math.PI / 6)))
                : ((n = Math.atan((e.y - t.y) / (e.x - t.x))),
                  (r.x = t.x + 20 * Math.cos(n - Math.PI / 6)),
                  (r.y = t.y + 20 * Math.sin(n - Math.PI / 6)),
                  (i.x = t.x + 20 * Math.cos(n + Math.PI / 6)),
                  (i.y = t.y + 20 * Math.sin(n + Math.PI / 6))),
              this.drawLine(t, r),
              this.drawLine(t, i))
          },
          drawTrackLine: function (e, t) {
            if (1 === t || 3 === t) {
              var n = e.x,
                r = e.y,
                i = e.xSize,
                a = e.ySize,
                o = new Array(4),
                s = new Array(8)
              ;(o[0].x = n - i),
                (o[0].y = r - a),
                (o[1].x = n + i),
                (o[1].y = r - a),
                (o[2].x = n + i),
                (o[2].y = r + a),
                (o[3].x = n - i),
                (o[3].y = r + a),
                (s[0].x = o[0].x + i / 2),
                (s[0].y = o[0].y),
                (s[1].x = o[1].x - i / 2),
                (s[1].y = o[1].y),
                (s[2].x = o[2].x - i / 2),
                (s[2].y = o[2].y),
                (s[3].x = o[3].x + i / 2),
                (s[3].y = o[3].y),
                (s[4].x = o[0].x),
                (s[4].y = o[0].y + a / 2),
                (s[5].x = o[1].x),
                (s[5].y = o[1].y + a / 2),
                (s[6].x = o[2].x),
                (s[6].y = o[2].y - a / 2),
                (s[7].x = o[3].x),
                (s[7].y = o[3].y - a / 2)
              for (var l = 0; l < 4; l++)
                this.drawLine(o[l], s[l]), this.drawLine(o[l], s[l + 4])
              ;(o = null), (s = null)
            } else {
              var u = new Array(5)
              for (l = 0; l < 5; l++) u[l] = {}
              ;(u[0].x = e.x - e.xSize),
                (u[0].y = e.y - e.ySize),
                (u[1].x = e.x + e.xSize),
                (u[1].y = e.y - e.ySize),
                (u[2].x = e.x + e.xSize),
                (u[2].y = e.y + e.ySize),
                (u[3].x = e.x - e.xSize),
                (u[3].y = e.y + e.ySize),
                (u[4].x = e.x - e.xSize),
                (u[4].y = e.y - e.ySize),
                this.drawPolyLine(u, 5),
                (u = null)
            }
            if (3 === t) {
              ;(n = e.x), (r = e.y)
              var c = 0
              ;(c = (i = e.xSize) > (a = e.ySize) ? a : i),
                ((u = new Array(8))[0].x = n - i),
                (u[0].y = r),
                (u[1].x = n - i - c),
                (u[1].y = r),
                (u[2].x = n),
                (u[2].y = r + a),
                (u[3].x = n),
                (u[3].y = r + a + c),
                (u[4].x = n + i),
                (u[4].y = r),
                (u[5].x = n + i + c),
                (u[5].y = r),
                (u[6].x = n),
                (u[6].y = r - a),
                (u[7].x = n),
                (u[7].y = r - a - c),
                this.drawPolyLine(u, 2),
                this.drawPolyLine(u + 2, 2),
                this.drawPolyLine(u + 4, 2),
                this.drawPolyLine(u + 6, 2),
                (u = null)
            }
          },
          drawDirection: function (e, t, n, r) {
            var i,
              a = {},
              o = {},
              s = (e.x + t.x) / 2,
              l = (e.y + t.y) / 2
            if (e.x != t.x)
              if ((i = (e.y - t.y) / (e.x - t.x)) > 0) {
                var u = Math.atan(i)
                ;(a.x = s + r * Math.sin(u)),
                  (a.y = l - r * Math.cos(u)),
                  (o.x = s - r * Math.sin(u)),
                  (o.y = l + r * Math.cos(u))
              } else
                i < 0
                  ? ((u = Math.atan(-i)),
                    (a.x = s - r * Math.sin(u)),
                    (a.y = l - r * Math.cos(u)),
                    (o.x = s + r * Math.sin(u)),
                    (o.y = l + r * Math.cos(u)))
                  : ((a.x = s), (o.x = a.x), (a.y = l - r), (o.y = a.y + 2 * r))
            else (a.x = e.x - r), (o.x = e.x + r), (a.y = l), (o.y = a.y)
            this.drawLine(a, o),
              e.x == t.x
                ? t.y < e.y
                  ? (1 != n && this.drawArrow(a, o),
                    0 != n && this.drawArrow(o, a))
                  : (1 != n && this.drawArrow(o, a),
                    0 != n && this.drawArrow(a, o))
                : e.x < t.x
                ? (1 != n && this.drawArrow(a, o),
                  0 != n && this.drawArrow(o, a))
                : (1 != n && this.drawArrow(o, a),
                  0 != n && this.drawArrow(a, o))
          },
          drawRegionDirection: function (e, t, n, r) {
            var i = {},
              a = {},
              s = 0,
              l = {},
              u = {}
            if (null !== e && 0 !== t) {
              if (
                ((i.x = e[0].x),
                (i.y = e[0].y),
                (a.x = e[1].x),
                (a.y = e[1].y),
                i.x != a.x
                  ? (s = (i.y - a.y) / (i.x - a.x)) > 0
                    ? ((l.x = (i.x + a.x) / 2 + r * Math.sin(Math.atan(s))),
                      (l.y = (i.y + a.y) / 2 - r * Math.cos(Math.atan(s))),
                      (u.x = (i.x + a.x) / 2 - r * Math.sin(Math.atan(s))),
                      (u.y = (i.y + a.y) / 2 + r * Math.cos(Math.atan(s))))
                    : s < 0
                    ? ((l.x = (i.x + a.x) / 2 - r * Math.sin(Math.atan(-s))),
                      (l.y = (i.y + a.y) / 2 - r * Math.cos(Math.atan(-s))),
                      (u.x = (i.x + a.x) / 2 + r * Math.sin(Math.atan(-s))),
                      (u.y = (i.y + a.y) / 2 + r * Math.cos(Math.atan(-s))))
                    : ((l.x = (i.x + a.x) / 2),
                      (u.x = l.x),
                      (l.y = (i.y + a.y) / 2 - r),
                      (u.y = l.y + 2 * r))
                  : ((l.x = i.x - r),
                    (u.x = i.x + r),
                    (l.y = (i.y + a.y) / 2),
                    (u.y = l.y)),
                this.drawLine(l, u),
                2 == n)
              )
                return this.drawArrow(l, u), void this.drawArrow(u, l)
              e[e.length] = e[0]
              var c = o(e, l),
                f = o(e, u)
              ;(0 == n && c) || (1 == n && f)
                ? this.drawArrow(u, l)
                : this.drawArrow(l, u)
            }
          },
          drawText: function (e, n, i) {
            n[0] &&
              void 0 !== n[0].x &&
              void 0 !== n[0].y &&
              (t.beginPath(),
              (t.font = '25px Tahoma'),
              (t.fillStyle = r),
              (t.textAlign = 'left'),
              (t.textBaseline = 'middle'),
              t.fillText(e, n[0].x, n[0].y),
              t.closePath())
          },
          getTextAngleCoordinates: function (e, t, n) {
            for (var r = {}, i = new Array(t), a = 0; a < t; a++)
              (i[a] = {}), (i[a].x = e[a].x), (i[a].y = -e[a].y)
            var o,
              s,
              l,
              u = 0,
              c = -1,
              f = 0,
              h = 0
            if (0 == n) {
              for (u = 0; u < t - 1; u++)
                (o = i[u].x - i[u + 1].x),
                  (s = i[u].y - i[u + 1].y),
                  (l = Math.sqrt(o * o + s * s)) - h > 1e-4 &&
                    ((c = u), (h = l), (f = Math.atan2(s, o)))
              if (-1 == c || h < 0) return void (i = null)
            } else
              2 == nSideConfig &&
                ((o = i[0].x - i[1].x),
                (s = i[0].y - i[1].y),
                (l = Math.sqrt(o * o + s * s)),
                (c = 0),
                (f = Math.atan2(s, o)))
            var d = (180 * f) / Math.PI
            return (
              (r =
                90 == d || -90 == d
                  ? i[c].y > i[c + 1].y
                    ? i[c]
                    : i[c + 1]
                  : i[c].x < i[c + 1].x
                  ? i[c]
                  : i[c + 1]),
              d >= -180 && d < -90
                ? (d += 180)
                : d >= 90 && d <= 180 && (d -= 180),
              (i = null),
              { pPointsDraw: r, nAngleDraw: d }
            )
          },
          drawHalfline: function (e, t) {
            var n = new Array(2)
            ;(n[0] = {}),
              (n[1] = {}),
              (n[0].x = e.x),
              (n[0].y = e.y),
              (n[1].x = (3 * e.x + t.x) / 4),
              (n[1].y = (3 * e.y + t.y) / 4),
              this.drawLine(n[0], n[1]),
              (n[0].x = (e.x + 3 * t.x) / 4),
              (n[0].y = (e.y + 3 * t.y) / 4),
              (n[1].x = t.x),
              (n[1].y = t.y),
              this.drawLine(n[0], n[1])
          },
          drawBlock: function (e, t) {
            var n = new Array(5),
              r = 0
            0 == t &&
              ((n[0] = {}),
              (n[1] = {}),
              (n[2] = {}),
              (n[3] = {}),
              (n[4] = {}),
              (n[0].x = e.left),
              (n[0].y = e.top),
              (n[1].x = e.right),
              (n[1].y = e.top),
              (n[2].x = e.right),
              (n[2].y = e.bottom),
              (n[3].x = e.left),
              (n[3].y = e.bottom),
              (n[4].x = e.left),
              (n[4].y = e.top),
              (r = 5)),
              this.drawPolyLine(n, r)
          },
          clearCanvasLayer: function () {
            t.clearRect(0, 0, e.width + 1, e.height + 1)
          },
          TestDraw: function () {
            n++
            var e = t.createLinearGradient(n + 20, n + 20, n + 150, n + 150)
            e.addColorStop(0, 'yellow'),
              e.addColorStop(1, 'red'),
              (t.fillStyle = e),
              t.fillRect(n, n, 300, 300),
              t.stroke(),
              n > 1100 && (n = 0)
          },
          Stop: function () {}
        }),
        new i()
      )
    }
    function T(e) {
      var t, n, r, i, a, o
      for (t = '', r = e.length, n = 0; n < r; )
        switch ((i = e[n++]) >> 4) {
          case 0:
          case 1:
          case 2:
          case 3:
          case 4:
          case 5:
          case 6:
          case 7:
            t += String.fromCharCode(i)
            break
          case 12:
          case 13:
            ;(a = e[n++]),
              (t += String.fromCharCode(((31 & i) << 6) | (63 & a)))
            break
          case 14:
            ;(a = e[n++]),
              (o = e[n++]),
              (t += String.fromCharCode(
                ((15 & i) << 12) | ((63 & a) << 6) | ((63 & o) << 0)
              ))
        }
      return t
    }
    var R = function () {
      var e = '#0000FF',
        t = '#FF0000',
        n = '#00CCFF',
        r = '#E1D800',
        i = '#24FF00',
        a = '#FF8000',
        o = '#FF80FF',
        s = '#8000FF',
        l = '#FF5700',
        u = '#FFFFFF',
        c = 287,
        f = 294,
        h = 601,
        d = 769,
        p = 770,
        m = 804,
        g = 16384,
        y = 573,
        v = 556,
        w = 299,
        S = 300,
        _ = null,
        b = null,
        x = null,
        A = null,
        P = null,
        R = null,
        M = null,
        U = null,
        I = null,
        D = null,
        E = 60,
        k = 50,
        L = new Array(32),
        O = 0,
        F = new Array(32),
        V = 0,
        B = {}
      function N() {}
      function z(e) {
        var t = '#00FF00'
        switch (e) {
          case 1:
            t = n
            break
          case 2:
          case 16:
            t = r
            break
          case 17:
            t = i
            break
          case 22:
            t = a
            break
          case 23:
            t = o
            break
          case 63:
            t = s
        }
        return t
      }
      return (
        (N.prototype = {
          Init: function (e) {
            ;(_ = new C()).Init(e)
          },
          setIVSData: function (e, t, n, r) {
            switch (t) {
              case 4:
                !(function (e, t) {
                  Date.now()
                  x ||
                    ((b = new ArrayBuffer(t)),
                    (x = new Uint8Array(b)),
                    (A = new DataView(b))),
                    x.set(Module.HEAPU8.subarray(e, e + t))
                  var n = 0
                  ;(L[O] = {}),
                    (L[O].nRuleID = A.getUint32(0, !0)),
                    (L[O].nRuleType = A.getUint32(4, !0)),
                    (L[O].nRuleSubType = A.getUint32(8, !0)),
                    (L[O].nRuleNameLength = A.getUint32(12, !0))
                  var r = x.slice(16, 16 + L[O].nRuleNameLength)
                  ;(L[O].strRuleName = T(r)),
                    (L[O].nExcludeRegionNum = A.getUint32(144, !0)),
                    (L[O].nDirection = A.getInt32(148, !0)),
                    (L[O].nAlarmNum = A.getUint32(152)),
                    (L[O].bAlarm = A.getUint8(154)),
                    (n = 156)
                  for (
                    var i = A.getUint32(n, !0), a = new Array(i), o = 0;
                    o < i;
                    o++
                  )
                    (a[o] = {}),
                      (a[o].x = A.getUint32(n + 4 + 8 * o, !0)),
                      (a[o].y = A.getUint32(n + 8 + 8 * o, !0))
                  ;(L[O].DetectLinePoints = a), (n = n + 4 + 256)
                  for (
                    var s = A.getUint32(n, !0), l = new Array(s), o = 0;
                    o < s;
                    o++
                  )
                    (l[o] = {}),
                      (l[o].x = A.getUint32(n + 4 + 8 * o, !0)),
                      (l[o].y = A.getUint32(n + 8 + 8 * o, !0))
                  ;(L[O].RuleRegionPoints = l), (n = n + 4 + 256)
                  for (
                    var u = A.getUint32(n, !0), c = new Array(u), o = 0;
                    o < u;
                    o++
                  )
                    (c[o] = {}),
                      (c[o].x = A.getUint32(n + 4 + 8 * o, !0)),
                      (c[o].y = A.getUint32(n + 8 + 8 * o, !0))
                  L[O].DetectRegionPoints = c
                  for (
                    var f = (n = n + 4 + 256),
                      h = new Array(L[O].nExcludeRegionNum),
                      o = 0;
                    o < L[O].nExcludeRegionNum;
                    o++
                  ) {
                    var d = A.getUint32(f, !0)
                    h[o] = new Array(d)
                    for (var p = 0; p < d; p++)
                      (h[o][p] = {}),
                        (h[o][p].x = A.getUint32(f + 4 + 8 * p, !0)),
                        (h[o][p].y = A.getUint32(f + 8 + 8 * p, !0))
                    f = f + 4 + 256
                  }
                  ;(L[O].ExcludeRegionPoints = h), (n += 2600)
                  for (var m = new Array(2), o = 0; o < 2; o++)
                    (m[o] = {}),
                      (m[o].x = A.getUint32(n + 8 * o, !0)),
                      (m[o].y = A.getUint32(n + 4 + 8 * o, !0))
                  ;(L[O].DirectionPoints = m),
                    (n += 16),
                    (L[O].nIntelFlowLength = A.getUint32(n, !0))
                  var g = x.slice(n + 4, n + 4 + L[O].nIntelFlowLength)
                  ;(L[O].strIntelFlow = T(g)), (n = n + 4 + 256)
                  for (
                    var y = A.getUint32(n, !0), v = new Array(y), o = 0;
                    o < y;
                    o++
                  )
                    (v[o] = {}),
                      (v[o].x = A.getUint32(n + 4 + 8 * o, !0)),
                      (v[o].y = A.getUint32(n + 8 + 8 * o, !0))
                  ;(L[O].EscalatorLeftPoints = v), (n = n + 4 + 256)
                  for (
                    var w = A.getUint32(n, !0), S = new Array(w), o = 0;
                    o < w;
                    o++
                  )
                    (S[o] = {}),
                      (S[o].x = A.getUint32(n + 4 + 8 * o, !0)),
                      (S[o].y = A.getUint32(n + 8 + 8 * o, !0))
                  ;(L[O].EscalatorRightPoints = S),
                    (n = n + 4 + 256),
                    Date.now(),
                    O++
                })(n, r)
                break
              case 5:
                !(function (e, t) {
                  ;(F[V] = {}),
                    R ||
                      ((P = new ArrayBuffer(t)),
                      (R = new Uint8Array(P)),
                      (M = new DataView(P))),
                    R.set(Module.HEAPU8.subarray(e, e + t)),
                    (F[V].bAlarm = M.getUint8(0)),
                    (F[V].nObjType = M.getUint32(4, !0))
                  var n = {}
                  ;(n.x = M.getUint16(8, !0)),
                    (n.y = M.getUint16(10, !0)),
                    (n.xSize = M.getUint16(12, !0)),
                    (n.ySize = M.getUint16(14, !0)),
                    (F[V].ptIvsTrackPoint = n)
                  var r = {}
                  ;(r.x = M.getUint16(16, !0)),
                    (r.y = M.getUint16(18, !0)),
                    (r.xSize = M.getUint16(20, !0)),
                    (r.ySize = M.getUint16(22, !0)),
                    (F[V].ptSpecialShapePoint = r)
                  for (var i = new Array(2), a = 0; a < 2; a++)
                    (i[a] = {}),
                      (i[a].x = M.getUint32(24 + 8 * a, !0)),
                      (i[a].y = M.getUint32(28 + 8 * a, !0))
                  ;(F[V].ptTrackTextPoints = i),
                    (F[V].nTrackTextLength = M.getUint32(40, !0))
                  var o = R.slice(44, 44 + F[V].nTrackTextLength)
                  F[V].strTrackTextInfo = T(o)
                  var s = 300
                  F[V].struAttribute80 = {}
                  var l = {}
                  ;(l.x = M.getUint16(s, !0)),
                    (l.y = M.getUint16(s + 2, !0)),
                    (l.xSize = M.getUint16(s + 4, !0)),
                    (l.ySize = M.getUint16(s + 6, !0)),
                    (F[V].struAttribute80.ptCarWindowPoint = l),
                    (s += 8),
                    (F[V].struAttribute84 = {}),
                    (F[V].struAttribute84.nPointsNum = M.getUint32(s, !0)),
                    (s += 4)
                  for (
                    var u = new Array(F[V].struAttribute84.nPointsNum), a = 0;
                    a < F[V].struAttribute84.nPointsNum;
                    a++
                  )
                    (u[a] = {}),
                      (u[a].x = M.getUint16(s + 8 * a, !0)),
                      (u[a].y = M.getUint16(s + 2 + 8 * a, !0)),
                      (u[a].xSize = M.getUint16(s + 4 + 8 * a, !0)),
                      (u[a].ySize = M.getUint16(s + 6 + 8 * a, !0))
                  ;(F[V].struAttribute84.ptIvsTrackPoints = u), (s += 256)
                  for (
                    var c = new Array(F[V].struAttribute84.nPointsNum), a = 0;
                    a < F[V].struAttribute84.nPointsNum;
                    a++
                  )
                    (c[a] = {}),
                      (c[a].x = M.getUint32(s + 8 * a, !0)),
                      (c[a].y = M.getUint32(s + 4 + 8 * a, !0))
                  ;(F[V].struAttribute84.ptTrackPoints0 = c), (s += 256)
                  for (
                    var f = new Array(F[V].struAttribute84.nPointsNum), a = 0;
                    a < F[V].struAttribute84.nPointsNum;
                    a++
                  )
                    (f[a] = {}),
                      (f[a].x = M.getUint32(s + 8 * a, !0)),
                      (f[a].y = M.getUint32(s + 4 + 8 * a, !0))
                  ;(F[V].struAttribute84.ptTrackPoints1 = f),
                    (s += 256),
                    (F[V].struAttribute8C = {}),
                    (F[V].struAttribute8C.nAccessoryNum = M.getUint8(s)),
                    (F[V].struAttribute8C.nTissueBoxNum = M.getUint8(s + 1)),
                    (F[V].struAttribute8C.nSunVisorCount = M.getUint8(s + 2)),
                    (F[V].struAttribute8C.nStandardCount = M.getUint8(s + 3)),
                    (s += 4)
                  for (
                    var h = new Array(F[V].struAttribute8C.nAccessoryNum),
                      a = 0;
                    a < F[V].struAttribute8C.nAccessoryNum;
                    a++
                  )
                    (h[a] = {}),
                      (h[a].x = M.getUint16(s + 8 * a, !0)),
                      (h[a].y = M.getUint16(s + 2 + 8 * a, !0)),
                      (h[a].xSize = M.getUint16(s + 4 + 8 * a, !0)),
                      (h[a].ySize = M.getUint16(s + 6 + 8 * a, !0))
                  ;(F[V].struAttribute8C.ptAccessoryPoints = h), (s += 256)
                  for (
                    var d = new Array(F[V].struAttribute8C.nTissueBoxNum),
                      a = 0;
                    a < F[V].struAttribute8C.nTissueBoxNum;
                    a++
                  )
                    (d[a] = {}),
                      (d[a].x = M.getUint16(s + 8 * a, !0)),
                      (d[a].y = M.getUint16(s + 2 + 8 * a, !0)),
                      (d[a].xSize = M.getUint16(s + 4 + 8 * a, !0)),
                      (d[a].ySize = M.getUint16(s + 6 + 8 * a, !0))
                  ;(F[V].struAttribute8C.ptTissueBoxPoints = d), (s += 256)
                  for (
                    var p = new Array(F[V].struAttribute8C.nSunVisorCount),
                      a = 0;
                    a < F[V].struAttribute8C.nSunVisorCount;
                    a++
                  )
                    (p[a] = {}),
                      (p[a].x = M.getUint16(s + 8 * a, !0)),
                      (p[a].y = M.getUint16(s + 2 + 8 * a, !0)),
                      (p[a].xSize = M.getUint16(s + 4 + 8 * a, !0)),
                      (p[a].ySize = M.getUint16(s + 6 + 8 * a, !0))
                  ;(F[V].struAttribute8C.ptSunVisorPoints = p), (s += 256)
                  for (
                    var m = new Array(F[V].struAttribute8C.nStandardCount),
                      a = 0;
                    a < F[V].struAttribute8C.nStandardCount;
                    a++
                  )
                    (m[a] = {}),
                      (m[a].x = M.getUint16(s + 8 * a, !0)),
                      (m[a].y = M.getUint16(s + 2 + 8 * a, !0)),
                      (m[a].xSize = M.getUint16(s + 4 + 8 * a, !0)),
                      (m[a].ySize = M.getUint16(s + 6 + 8 * a, !0))
                  ;(F[V].struAttribute8C.ptStandardPoints = m),
                    (s += 256),
                    (F[V].struAttribute8D = {}),
                    (F[V].struAttribute8D.nVirtualCoilNum = M.getUint32(s, !0)),
                    (s += 4),
                    (F[V].struAttribute8D.struVirtualCoil = new Array(
                      F[V].struAttribute8D.nVirtualCoilNum
                    ))
                  for (
                    var a = 0;
                    a < F[V].struAttribute8D.nVirtualCoilNum;
                    a++
                  ) {
                    ;(F[V].struAttribute8D.struVirtualCoil[a] = {}),
                      (F[V].struAttribute8D.struVirtualCoil[a].nFirstCoilNum =
                        M.getUint32(s, !0)),
                      (s += 4)
                    for (
                      var g = new Array(
                          F[V].struAttribute8D.struVirtualCoil[a].nFirstCoilNum
                        ),
                        y = 0;
                      y < F[V].struAttribute8D.struVirtualCoil[a].nFirstCoilNum;
                      y++
                    )
                      (g[y] = {}),
                        (g[y].x = M.getUint32(s + 8 * y, !0)),
                        (g[y].y = M.getUint32(s + 4 + 8 * y, !0))
                    ;(F[V].struAttribute8D.struVirtualCoil[
                      a
                    ].ptFirstCoilPoints = g),
                      (s += 64),
                      (F[V].struAttribute8D.struVirtualCoil[a].nSecondCoilNum =
                        M.getUint32(s, !0)),
                      (s += 4)
                    for (
                      var v = new Array(
                          F[V].struAttribute8D.struVirtualCoil[a].nSecondCoilNum
                        ),
                        y = 0;
                      y <
                      F[V].struAttribute8D.struVirtualCoil[a].nSecondCoilNum;
                      y++
                    )
                      (v[y] = {}),
                        (v[y].x = M.getUint32(s + 8 * y, !0)),
                        (v[y].y = M.getUint32(s + 4 + 8 * y, !0))
                    ;(F[V].struAttribute8D.struVirtualCoil[
                      a
                    ].ptSecondCoilPoints = v),
                      (s += 64)
                    for (var w = new Array(2), y = 0; y < 2; y++)
                      (w[y] = {}),
                        (w[y].x = M.getUint32(s + 8 * y, !0)),
                        (w[y].y = M.getUint32(s + 4 + 8 * y, !0))
                    ;(F[V].struAttribute8D.struVirtualCoil[
                      a
                    ].ptRtailCoilPoints = w),
                      (s += 16)
                    for (var S = new Array(2), y = 0; y < 2; y++)
                      (S[y] = {}),
                        (S[y].x = M.getUint32(s + 8 * y, !0)),
                        (S[y].y = M.getUint32(s + 4 + 8 * y, !0))
                    ;(F[V].struAttribute8D.struVirtualCoil[a].ptStrInfoPoints =
                      S),
                      (s += 16),
                      (F[V].struAttribute8D.struVirtualCoil[a].nStrInfoLength =
                        M.getUint32(s, !0))
                    var _ = R.slice(
                      s + 4,
                      s +
                        4 +
                        F[V].struAttribute8D.struVirtualCoil[a].nStrInfoLength
                    )
                    ;(F[V].struAttribute8D.struVirtualCoil[a].strInfo = T(_)),
                      (s += 260)
                  }
                  F[V].struAttribute8D.nVirtualCoilNum < 5 &&
                    (s += 428 * (5 - F[V].struAttribute8D.nVirtualCoilNum)),
                    (F[V].struAttribute90 = {})
                  for (var b = new Array(2), a = 0; a < 2; a++)
                    (b[a] = {}),
                      (b[a].x = M.getUint32(s + 8 * a, !0)),
                      (b[a].y = M.getUint32(s + 4 + 8 * a, !0))
                  ;(F[V].struAttribute90.ptTimePoints = b),
                    (s += 16),
                    (F[V].struAttribute90.nTimeInfoLength = M.getUint32(s, !0))
                  var x = R.slice(
                    s + 4,
                    s + 4 + F[V].struAttribute90.nTimeInfoLength
                  )
                  ;(F[V].struAttribute90.strTimeInfo = T(x)), (s += 260), V++
                })(n, r)
                break
              case 6:
                !(function (e, t) {
                  I ||
                    ((U = new ArrayBuffer(t)),
                    (I = new Uint8Array(U)),
                    (D = new DataView(U))),
                    I.set(Module.HEAPU8.subarray(e, e + t)),
                    (B.nBlockNum = D.getUint32(0, !0))
                  for (
                    var n = new Array(B.nBlockNum), r = 0;
                    r < B.nBlockNum;
                    r++
                  )
                    (n[r] = {}),
                      (n[r].left = D.getUint32(4 + 16 * r, !0)),
                      (n[r].top = D.getUint32(8 + 16 * r, !0)),
                      (n[r].right = D.getUint32(12 + 16 * r, !0)),
                      (n[r].bottom = D.getUint32(16 + 16 * r, !0))
                  B.arrBlockRect = n
                })(n, r)
            }
          },
          Stop: function () {
            ;(b = null),
              (x = null),
              (A = null),
              (P = null),
              (R = null),
              (M = null),
              (U = null),
              (I = null),
              (D = null),
              (L = null),
              (O = 0),
              (F = null),
              (V = 0),
              _.clearCanvasLayer()
          },
          drawIVSData: function () {
            var n =
              arguments.length > 0 && void 0 !== arguments[0]
                ? arguments[0]
                : []
            _.clearCanvasLayer(),
              n.includes(1) &&
                (function () {
                  var n = e
                  _.SetCurrentColor(n)
                  for (var r = 0; r < O; r++) {
                    L[r].bAlarm && ((n = t), _.SetCurrentColor(n))
                    var i = L[r].DetectLinePoints.length,
                      a = L[r].RuleRegionPoints.length,
                      o = L[r].DetectRegionPoints.length,
                      s = L[r].nRuleType
                    switch (s) {
                      case c:
                        _.drawPolyLine(L[r].DetectLinePoints, i)
                        for (var b = 1; b < i; b++)
                          _.drawDirection(
                            L[r].DetectLinePoints[b - 1],
                            L[r].DetectLinePoints[b],
                            L[r].nDirection,
                            E
                          )
                        _.drawPolyLine(L[r].RuleRegionPoints, a)
                        break
                      case f:
                        0 != L[r].nAlarmNum &&
                          _.drawPolyLine(L[r].RuleRegionPoints, a)
                        break
                      case h:
                        if (
                          (2 == i &&
                            (_.drawLine(
                              L[r].DetectLinePoints[0],
                              L[r].DetectLinePoints[1]
                            ),
                            _.drawArrow(
                              L[r].DetectLinePoints[0],
                              L[r].DetectLinePoints[1]
                            )),
                          L[r].nRuleRegionNum > 0)
                        )
                          for (var b = 0; b < a / 2; b++)
                            _.drawLine(
                              L[r].RuleRegionPoints[2 * b],
                              L[r].RuleRegionPoints[2 * b + 1]
                            )
                        break
                      case d:
                      case p:
                      case m:
                        2 == i && _.drawPolyLine(L[r].DetectLinePoints, i),
                          _.drawPolyLine(L[r].RuleRegionPoints, a)
                        break
                      case g:
                        break
                      case y:
                        _.drawPolyLine(
                          L[r].EscalatorLeftPoints,
                          L[r].EscalatorLeftPoints.length
                        ),
                          _.drawPolyLine(
                            L[r].EscalatorRightPoints,
                            L[r].EscalatorRightPoints.length
                          )
                        break
                      default:
                        _.SetCurrentColor(n)
                        var x = !1
                        i > 0 &&
                          (_.drawPolyLine(L[r].DetectLinePoints, i),
                          L[r].nDirection >= 0 &&
                            i > 1 &&
                            (_.drawDirection(
                              L[r].DetectLinePoints[0],
                              L[r].DetectLinePoints[1],
                              L[r].nDirection,
                              E
                            ),
                            (x = !0))),
                          a > 0 &&
                            ((L[r].RuleRegionPoints[a] =
                              L[r].RuleRegionPoints[0]),
                            _.drawPolyLine(L[r].RuleRegionPoints, a + 1),
                            L[r].nDirection >= 0 &&
                              a > 1 &&
                              (_.drawRegionDirection(
                                L[r].RuleRegionPoints,
                                a,
                                L[r].nDirection,
                                k
                              ),
                              (x = !0))),
                          x ||
                            (L[r].DirectionPoints[0].x ==
                              L[r].DirectionPoints[1].x &&
                              L[r].DirectionPoints[0].y ==
                                L[r].DirectionPoints[1].y) ||
                            (_.drawLine(
                              L[r].DirectionPoints[0],
                              L[r].DirectionPoints[1]
                            ),
                            _.drawArrow(
                              L[r].DirectionPoints[0],
                              L[r].DirectionPoints[1]
                            ))
                    }
                    o > 0 &&
                      (_.SetCurrentColor(l),
                      (L[r].DetectRegionPoints[o] = L[r].DetectRegionPoints[0]),
                      _.drawPolyLine(L[r].DetectRegionPoints, o + 1)),
                      _.SetCurrentColor(u)
                    for (var b = 0; b < L[r].nExcludeRegionNum; b++) {
                      var A = L[r].ExcludeRegionPoints[b].length
                      ;(L[r].ExcludeRegionPoints[b][A] =
                        L[r].ExcludeRegionPoints[b][0]),
                        _.drawPolyLine(L[r].ExcludeRegionPoints[b], A + 1)
                    }
                    _.SetCurrentColor(n)
                    var P = {}
                    i > 0
                      ? (P = L[r].DetectLinePoints)
                      : a > 0 && (P = L[r].RuleRegionPoints),
                      L[r].nIntelFlowLength > 0 &&
                        _.drawText(L[r].strIntelFlow, P, P.length),
                      s != v &&
                        (s == h
                          ? _.drawText(
                              L[r].strRuleName,
                              L[r].RuleRegionPoints,
                              L[r].RuleRegionPoints.length
                            )
                          : s == w || s == S
                          ? _.drawText(
                              L[r].strRuleName,
                              L[r].RuleRegionPoints,
                              L[r].RuleRegionPoints.length
                            )
                          : s == d || s == p
                          ? ptRuleRegionCnt > 0 &&
                            _.drawText(
                              L[r].strRuleName,
                              L[r].RuleRegionPoints,
                              L[r].RuleRegionPoints.length
                            )
                          : _.drawText(L[r].strRuleName, P, P.length))
                  }
                  O = 0
                })(),
              n.includes(2) &&
                (function () {
                  for (var e = 0; e < V; e++) {
                    var n = z(F[e].nObjType)
                    _.SetCurrentColor(n),
                      F[e].bAlarm && _.SetCurrentColor(t),
                      _.drawTrackLine(F[e].ptIvsTrackPoint, 0),
                      _.drawTrackLine(F[e].ptSpecialShapePoint, 0),
                      _.drawText(
                        F[e].strTrackTextInfo,
                        F[e].ptTrackTextPoints,
                        F[e].ptTrackTextPoints.length
                      ),
                      _.drawTrackLine(F[e].struAttribute80.ptCarWindowPoint, 0)
                    for (var r = 0; r < F[e].struAttribute84.nPointsNum; r++)
                      _.drawTrackLine(
                        F[e].struAttribute84.ptIvsTrackPoints[r],
                        0
                      )
                    for (var r = 0; r < F[e].struAttribute8C.nAccessoryNum; r++)
                      _.drawTrackLine(
                        F[e].struAttribute8C.ptAccessoryPoints[r],
                        0
                      )
                    for (var r = 0; r < F[e].struAttribute8C.nTissueBoxNum; r++)
                      _.drawTrackLine(
                        F[e].struAttribute8C.ptTissueBoxPoints[r],
                        0
                      )
                    for (
                      var r = 0;
                      r < F[e].struAttribute8C.nSunVisorCount;
                      r++
                    )
                      _.drawTrackLine(
                        F[e].struAttribute8C.ptSunVisorPoints[r],
                        0
                      )
                    for (
                      var r = 0;
                      r < F[e].struAttribute8C.nStandardCount;
                      r++
                    )
                      _.drawTrackLine(
                        F[e].struAttribute8C.ptStandardPoints[r],
                        0
                      )
                    for (
                      var r = 0;
                      r < F[e].struAttribute8D.nVirtualCoilNum;
                      r++
                    ) {
                      _.drawPolyLine(
                        F[e].struAttribute8D.struVirtualCoil[r]
                          .ptFirstCoilPoints,
                        F[e].struAttribute8D.struVirtualCoil[r].nFirstCoilNum
                      ),
                        _.drawPolyLine(
                          F[e].struAttribute8D.struVirtualCoil[r]
                            .ptSecondCoilPoints,
                          F[e].struAttribute8D.struVirtualCoil[r].nSecondCoilNum
                        ),
                        _.drawLine(
                          F[e].struAttribute8D.struVirtualCoil[r]
                            .ptRtailCoilPoints[0],
                          F[e].struAttribute8D.struVirtualCoil[r]
                            .ptRtailCoilPoints[1]
                        )
                      var i =
                        F[e].struAttribute8D.struVirtualCoil[r].strInfo.length
                      _.drawText(
                        F[e].struAttribute8D.struVirtualCoil[r].strInfo,
                        F[e].struAttribute8D.struVirtualCoil[r].ptStrInfoPoints,
                        i
                      )
                    }
                    _.drawText(
                      F[e].struAttribute90.strTimeInfo,
                      F[e].struAttribute90.ptTimePoints,
                      F[e].struAttribute90.strTimeInfo.length
                    )
                  }
                  V = 0
                })(),
              n.includes(2) &&
                (function () {
                  B.nBlockNum
                  for (var e = 0; e < B.nBlockNum; e++)
                    _.drawBlock(B.arrBlockRect[e], 0)
                })()
          }
        }),
        new N()
      )
    }
    function M(e, t) {
      var n = Object.keys(e)
      if (Object.getOwnPropertySymbols) {
        var r = Object.getOwnPropertySymbols(e)
        t &&
          (r = r.filter(function (t) {
            return Object.getOwnPropertyDescriptor(e, t).enumerable
          })),
          n.push.apply(n, r)
      }
      return n
    }
    function U(e) {
      for (var t = 1; t < arguments.length; t++) {
        var n = null != arguments[t] ? arguments[t] : {}
        t % 2
          ? M(Object(n), !0).forEach(function (t) {
              I(e, t, n[t])
            })
          : Object.getOwnPropertyDescriptors
          ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
          : M(Object(n)).forEach(function (t) {
              Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t))
            })
      }
      return e
    }
    function I(e, t, n) {
      return (
        t in e
          ? Object.defineProperty(e, t, {
              value: n,
              enumerable: !0,
              configurable: !0,
              writable: !0
            })
          : (e[t] = n),
        e
      )
    }
    function D(e, t) {
      return (
        (t = (t = t.toLowerCase())[0].toUpperCase() + t.substr(1)),
        Object.prototype.toString.call(e) === '[object ' + t + ']'
      )
    }
    function E(e, t, n) {
      if (
        (void 0 === n && (n = 2),
        void 0 === t && (t = 0),
        (e = e.toString()).length >= n)
      )
        return e
      var r = n - e.length
      return new Array(r).fill(String(t)).join('') + e
    }
    function k(e, t) {
      return void 0 !== e && e
        ? ((t = t || new Date()),
          (e = (e = (e = (e = (e = (e = e.replace(
            /y/gi,
            E(t.getFullYear()),
            0
          )).replace(/m/gi, E(t.getMonth() + 1), 0)).replace(
            /d/gi,
            E(t.getDate()),
            0
          )).replace(/h/gi, E(t.getHours()), 0)).replace(
            /i/gi,
            E(t.getMinutes()),
            0
          )).replace(/s/gi, E(t.getSeconds()), 0)))
        : ''
    }
    function L(e, t) {
      var n = (e = e || {}).nameFormat || ['ymd_his']
      t = t || new Date()
      var r = ''
      if (D(n, 'string')) n = [n, {}]
      else {
        if (!D(n, 'array'))
          return void (function (e) {
            throw new Error(e)
          })('name format must be string or array')
        D(n[0], 'string') || (n[0] = 'ymd_his'),
          D(n[1], 'object') || (n[1] = {})
      }
      var i = n[0].split(/\{(?:[^{}]+)\}/),
        a = n[1]
      n[0].replace(/\{([^{}]*)\}/g, function (e, t, n) {
        i.shift()
        ;(r += k()), (r += t in a ? a[t] : e)
      })
      var o = i.shift()
      return (r += k(o, t))
    }
    function O(e, t) {
      ;(this.name = e),
        (this.allowUpDateName = !0),
        (this.byteLength = 0),
        (this.options = t),
        (this.startTime = new Date().toLocaleString())
    }
    ;(O.prototype.setEndTime = function () {
      this.endTime = new Date().toLocaleString()
    }),
      (O.prototype.updateNameByStream = function (e, t) {
        if (this.allowUpDateName) {
          var n = new Uint8Array(t),
            r = ((n[19] << 24) + (n[18] << 16) + (n[17] << 8) + n[16]) >>> 0,
            i =
              '20' +
              (r >> 26) +
              '/' +
              ((r >> 22) & 15) +
              '/' +
              ((r >> 17) & 31) +
              ' ' +
              ((r >> 12) & 31) +
              ':' +
              ((r >> 6) & 63) +
              ':' +
              (63 & r)
          ;(this.name = L(e, new Date(i))),
            (this.allowUpDateName = !1),
            (n = null)
        }
        t = null
      })
    var F = new (function () {
      var e = { count: 0, total: 0, group: [] },
        t = function () {}
      return (
        (t.prototype.add = function (t) {
          e.count++, (e.total += t.byteLength), e.group.push(t)
        }),
        (t.prototype.get = function (t) {
          return t in e ? e[t] : e
        }),
        new t()
      )
    })()
    var V = function () {
        var e = 1048576,
          t = null,
          n = null,
          r = 0,
          i = void 0,
          a = null,
          o = 0,
          s = null
        function l() {
          ;(this.onMessage = function () {}),
            (this.postMessage = function (e) {
              this.__onMessage(e)
            }),
            (this.__postMessage = function (e) {
              this.onMessage(e)
            })
        }
        return (
          (l.prototype.__onMessage = function (e) {
            var t = e
            switch (t.type) {
              case 'init':
                this.init(t.options)
                break
              case 'addBuffer':
                this.addBuffer(t)
                break
              case 'close':
                this.close()
                break
              case 'download':
                this.inNodePlace()
            }
          }),
          (l.prototype.init = function (t) {
            ;(this.fullSize = t.fullSize || 1 / 0),
              (this.singleSize = t.singleSize + 20 * e || 520 * e),
              (i = 'init'),
              (s = t.recordName),
              (this.limitOptions = Object.assign(
                { limitBy: 'fullSize' },
                t.limitOptions
              )),
              (this.nameOptions = Object.assign(
                { namedBy: 'date', nameFormat: ['ymd_his', {}] },
                t.nameOptions
              ))
          }),
          (l.prototype._malloc = function (e) {
            t && n && ((n = null), (t = null)),
              (t = new ArrayBuffer(e)),
              (n = new DataView(t))
            var r = this.nameOptions,
              i = ''
            if (null != s) i = s
            else
              switch (this.nameOptions.namedBy.toLowerCase()) {
                case 'date':
                  i = L(r)
                  break
                default:
                  i = L()
              }
            a = new O(i)
          }),
          (l.prototype._initVideoMem = function () {
            !t && this.singleSize && this._malloc(this.singleSize)
          }),
          (l.prototype.appendVideoBuf = function (t, i, a) {
            var s = t.byteLength,
              l = 0
            if (5 == o) {
              l = i + s
              for (var u = i; u < l; u++) n.setUint8(u, t[u - i])
              l > r && (r = l),
                l > this.singleSize - 20 * e
                  ? this.__postMessage({ type: 'downloadMP4' })
                  : this.__postMessage({
                      type: 'pendding',
                      size: r,
                      total: this.singleSize
                    })
            } else if ((l = r + s) > this.singleSize - 20 * e)
              this.inNodePlace(), this.addBuffer({ buffer: t })
            else {
              for (u = r; u < l; u++) n.setUint8(u, t[u - r])
              ;(r = l),
                this.__postMessage({
                  type: 'pendding',
                  size: r,
                  total: this.singleSize
                })
            }
          }),
          (l.prototype.addBuffer = function (e) {
            if ('closed' !== i) {
              var t = e.buffer,
                n = e.offset
              ;(o = e.recordType), this._initVideoMem(), (i = 'addBuffer')
              var a = t.length,
                s = 0
              ;(s = 5 == o ? n + a : r + a),
                F.get('total') + s > this.fullSize
                  ? this.close()
                  : this.appendVideoBuf(t, n)
            }
          }),
          (l.prototype.inNodePlace = function () {
            if ('addBuffer' === i) {
              ;(i = 'download'),
                a.updateNameByStream(this.nameOptions, t.slice(0, 20)),
                (a.byteLength = r),
                a.setEndTime(),
                F.add(a)
              var e = t.slice(0, r)
              if ((this.reset(), e.byteLength < 500)) return void (e = null)
              if (
                (this.__postMessage({
                  type: 'download',
                  data: U(U({}, a), {}, { buffer: e })
                }),
                (e = null),
                'count' === this.limitOptions.limitBy)
              ) {
                var n = this.limitOptions.count
                n && n === F.get('count') && this.close()
              }
            }
          }),
          (l.prototype.reset = function () {
            ;(r = 0), this._malloc(this.singleSize)
          }),
          (l.prototype.close = function () {
            this.inNodePlace(),
              'closed' !== i &&
                void 0 !== i &&
                ((i = 'closed'),
                this.__postMessage({
                  type: 'closed',
                  message: 'record was closed'
                }),
                (t = null),
                (n = null))
          }),
          new l()
        )
      },
      B = function () {
        var e = 0,
          t = { timestamp: 0, timestamp_usec: 0 },
          n = null,
          a = null,
          l = null,
          u = !1,
          c = null,
          f = null,
          h = null,
          d = null,
          p = null,
          m = null,
          g = null,
          v = 1,
          w = '',
          b = !1,
          x = null,
          A = 0,
          C = { id: 1, samples: null, baseMediaDecodeTime: 0 },
          T = 0,
          M = null,
          U = null,
          I = 1,
          D = 0,
          E = 0,
          k = 0,
          L = 1,
          O = null,
          F = 0,
          B = null,
          N = null,
          z = null,
          H = null,
          Y = null,
          j = null,
          q = null,
          G = null,
          W = 0,
          X = null,
          Z = null,
          K = null,
          Q = null,
          J = 0,
          $ = 0,
          ee = 0,
          te = 0,
          ne = '',
          re = !1,
          ie = null,
          ae = !1,
          oe = !1,
          se = null,
          le = null,
          ue = null,
          ce = null,
          fe = null,
          he = null,
          de = null,
          pe = null,
          me = null,
          ge = null,
          ye = null,
          ve = null,
          we = null,
          Se = null,
          _e = 0,
          be = 0,
          xe = null,
          Ae = null,
          Pe = 0,
          Ce = 0,
          Te = 0,
          Re = 0,
          Me = !0,
          Ue = !1,
          Ie = !1,
          De = !1,
          Ee = 0,
          ke = 0,
          Le = !1,
          Oe = null,
          Fe = null,
          Ve = null,
          Be = null,
          Ne = 0,
          ze = 18,
          He = 20,
          Ye = null,
          je = [],
          qe = -1
        function Ge() {}
        function We() {
          f.setDecodeType(Re),
            f.setCodecInfo(w),
            f.setInitSegmentFunc(Ke),
            f.setSpeedPlay(v),
            f.setFPS(A)
        }
        function Xe() {
          f.setVideoSizeCallback(Qe),
            f.setBeginDrawCallback(N),
            f.setErrorCallback(Y),
            f.setAudioStartCallback(Ze),
            f.setMseErrorCallback(Je)
        }
        function Ze(e, t) {}
        function Ke() {
          return x
        }
        function Qe() {
          null !== H && H(!1)
        }
        function Je(t) {
          switch (t) {
            case 'InitError':
              1 == Re ? (Me = !1) : (Ue = !1),
                Module._PLAY_SetSupportWebMSE(e, Me, Ue)
              break
            case 'Error':
            case 'SourceError':
            case 'SourceBufferError':
              De = !0
          }
        }
        function $e() {
          f && (f.close(), f.terminate(), (f = null)),
            (x = null),
            (h = null),
            (d = null),
            (b = !1),
            (Le = !1),
            (D = 0),
            (C = { id: 1, samples: null, baseMediaDecodeTime: 0 }),
            (T = 0),
            (L = 1),
            (k = 0),
            (F = 0),
            (E = 0)
        }
        function et(e, t) {
          function n(e, t) {
            ;(n.prototype.w = e), (n.prototype.h = t)
          }
          return (
            (n.prototype = {
              toString: function () {
                return '(' + n.prototype.w + ', ' + n.prototype.h + ')'
              },
              getHalfSize: function () {
                return new et(n.prototype.w >>> 1, n.prototype.h >>> 1)
              },
              length: function () {
                return n.prototype.w * n.prototype.h
              }
            }),
            new n(e, t)
          )
        }
        Ge.prototype = {
          Init: function () {
            var t =
              arguments.length > 0 && void 0 !== arguments[0]
                ? arguments[0]
                : {}
            ;(u = t.isTalkService),
              (oe = t.isTalkService),
              (n = t.canvasElem),
              (a = t.videoElem),
              (l = t.ivsCanvasElem)
            var r = t.isPlayback,
              i = t.useH265MSE,
              o = t.useH264MSE,
              c = Object(s.f)(),
              h = c.bSupportMultiThread
            c.browserType, c.errorCode, (Ie = h)
            var d = Module._malloc(1)
            ;(X = new Uint8Array(Module.HEAPU8.buffer, d, 1)),
              Module._PLAY_GetFreePort(X.byteOffset),
              (e = X[0]),
              (X = null),
              Module._free(d),
              n && this.setIVSCanvasSize(parseInt(n.width), parseInt(n.height))
            var p = Module._PLAY_SetStreamOpenMode(e, r ? 1 : 0)
            Module._PLAY_OpenStream(e, 0, 0, 10485760)
            var m = Object(s.g)(),
              g = m.bSupportH265MSE,
              y = m.bSupportH264MSE
            return (
              (Ue = i && g),
              (Me = o && y),
              Module._PLAY_SetSupportWebMSE(e, Me, Ue),
              (p = Module._PLAY_Play(e, 1)) &&
                ((Z = Module._malloc(5242880)),
                (K = new Uint8Array(Module.HEAPU8.buffer, Z, 5242880)),
                (n || a) &&
                  ((xe = new S(n, r ? 100 : 25, r)),
                  (Ue || Me) && ((f = _()).init(a), Xe()))),
              p
            )
          },
          setIVSCanvasSize: function (t, n) {
            Module._PLAY_ViewResolutionChanged(e, t, n, 0)
          },
          GetPlayPort: function () {
            return e
          },
          InputData: function (t, n) {
            var r = 0
            return (
              K &&
                (K.set(n),
                (r = Module._PLAY_InputData(e, K.byteOffset, n.length))),
              r
            )
          },
          GetSourceBufferRemain: function () {
            return Module._PLAY_GetSourceBufferRemain(e)
          },
          Pause: function (e) {
            return Module._PLAY_Pause(e)
          },
          setSpeed: function (t) {
            var n = Module._PLAY_SetPlaySpeed(e, t)
            return xe.setPlaySpeed(t), (v = t), n
          },
          SetSecurityKey: function (t, n, r, i, a) {
            var o = Module._malloc(49),
              s = new Uint8Array(Module.HEAPU8.buffer),
              l = 0
            if (1 == t)
              n.forEach(function (e, t) {
                ;(s[(o + l) >> 0] = e), l++
              })
            else if (2 == t) {
              var u = new Uint8Array(16)
              if (((s[(o + l) >> 0] = 1), l++, 0 == a)) {
                for (var c = 0; c < 16; c++) u[c] = 0
                ;(a = 16), (i = u)
              }
              i.forEach(function (e, t) {
                ;(s[(o + l) >> 0] = e), l++
              }),
                n.forEach(function (e, t) {
                  ;(s[o + l] = e), l++
                }),
                (r = 1 + r + a),
                (u = null)
            } else
              3 == t &&
                n.split('').forEach(function (e, t) {
                  ;(s[(o + l) >> 0] = e.charCodeAt(0)), l++
                })
            var f = Module._PLAY_SetSecurityKey(e, o, r)
            return Module._free(o), f
          },
          StartRecord: function (t, n) {
            return (
              (Oe = new V()),
              Object(s.i)(Oe, t, n, {
                downloadMP4: function () {
                  setTimeout(function () {
                    Module._PLAY_StopDataRecord(e),
                      Oe.postMessage({ type: 'download' }),
                      Module._PLAY_StartDataRecord(e, 0, U)
                  })
                }
              }),
              (U = 5),
              Module._PLAY_StartDataRecord(e, 0, U)
            )
          },
          StopRecord: function () {
            var t = Module._PLAY_StopDataRecord(e)
            return Oe.postMessage({ type: 'close' }), (Oe = null), t
          },
          OpenIVSDraw: function () {
            return (
              (Ye = new R()).Init(l), Module._PLAY_RenderPrivateData(e, 1, 0)
            )
          },
          CloseIVSDraw: function () {
            var t = Module._PLAY_RenderPrivateData(e, 0, 0)
            return Ye.Stop(), (Ye = null), t
          },
          SetIVSType: function (e) {
            je = e
          },
          Stop: function () {
            var t = Module._PLAY_Stop(e)
            return 0 == t
              ? t
              : ((t = Module._PLAY_CloseStream(e)),
                c && (c.stop(), (c = null)),
                (h = null),
                (d = null),
                f && (f.close(), f.terminate(), (f = null)),
                (K = null),
                Module._free(Z),
                (se = null),
                (le = null),
                (ue = null),
                (fe = null),
                (he = null),
                (de = null),
                (pe = null),
                (me = null),
                (ge = null),
                (ve = null),
                (we = null),
                (Se = 0),
                (Fe = null),
                (Ve = null),
                (Be = null),
                ye && (ye.stop(), (ye = null), (window.wsAudioPlayer = null)),
                Ie
                  ? (Ae = null)
                  : xe && (xe.stopRendering(), xe.terminate(), (xe = null)),
                (Pe = 0),
                (Ce = 0),
                (Te = 0),
                (x = null),
                (w = null),
                (De = !1),
                (b = !1),
                Ye && (Ye.Stop(), (Ye = null)),
                (ke = 0),
                (Le = !1),
                (Ee = 0),
                t)
          },
          FrameDataCallBack: function (e, s, l, c, y, S) {
            le ||
              ((se = new ArrayBuffer(292)),
              (le = new Uint8Array(se)),
              (ue = new DataView(se))),
              le.set(Module.HEAPU8.subarray(S, S + 292))
            var P = ue.getInt32(0, !0),
              R = ue.getInt32(4, !0),
              U = ue.getInt32(56, !0),
              V = ue.getUint16(40, !0),
              N = ue.getUint16(42, !0),
              z = ue.getUint16(46, !0),
              H = ue.getUint16(48, !0),
              Y = ue.getUint16(50, !0),
              X = ue.getUint16(52, !0),
              Z = Date.UTC(V, N, z, H, Y, X) / 1e3
            if (1 == P) {
              var K = ue.getInt32(68, !0),
                Oe = ue.getInt32(72, !0),
                Fe = ue.getUint32(8, !0)
              if (
                ((t.timestamp = 8 == Oe ? Z : Fe / 1e3),
                (t.timestamp_usec = 0),
                2 == K || 4 == K || 8 == K ? (Re = 1) : 12 == K && (Re = 2),
                (te = ue.getInt32(36, !0)),
                (J = ue.getInt32(12, !0)),
                ($ = ue.getInt32(16, !0)),
                0 == J || 0 == $)
              )
                return
              if (
                ((A = ue.getInt32(20, !0)),
                ke <= 5 && ke++,
                ze == U || He == U ? (ee = 1) : 0 == U && (ee = 0),
                ((1 == Re && 1 == Me) || (2 == Re && 1 == Ue)) &&
                  !ee &&
                  13 != Oe)
              ) {
                if (
                  !(function (e, t) {
                    return (
                      Ne == t || ze == t || He == t || -1 == qe || e == qe + 1
                    )
                  })(R, U)
                )
                  return
                if (
                  ((qe = R),
                  (J == Pe && $ == Ce && K == Te) ||
                    (0 != Pe && (De = !0), (Pe = J), (Ce = $), (Te = K)),
                  De && ($e(), (De = !1)),
                  0 == Le && 0 != U)
                )
                  return
                if (
                  ((ce = new ArrayBuffer(y)),
                  (Q = new Uint8Array(ce)).set(
                    Module.HEAPU8.subarray(s, s + y)
                  ),
                  null == h && (h = new i(Re)),
                  null == d && (d = new r(Re)),
                  (function (e, t, n) {
                    for (var r = null, i = e.length, a = [], o = 0; o <= i; )
                      if (0 == e[o])
                        if (0 == e[o + 1])
                          if (1 == e[o + 2]) {
                            if ((a.push(o), (o += 3), 1 == Re)) {
                              if (5 == (31 & e[o]) || 1 == (31 & e[o])) break
                            } else if (
                              2 == Re &&
                              (38 == (255 & e[o]) || 2 == (255 & e[o]))
                            )
                              break
                          } else 0 == e[o + 2] ? o++ : (o += 3)
                        else o += 2
                      else o += 1
                    var s = 0
                    if (1 == Re) {
                      for (var o = 0; o < a.length; o++)
                        switch (
                          ((r = e.subarray(a[o] + 3, a[o + 1])),
                          31 & e[a[o] + 3])
                        ) {
                          case 1:
                          case 5:
                            ;(s = a[o] - 1), (B = e.subarray(s, e.length))
                            break
                          case 7:
                            h.parse(r), (m = r)
                            break
                          case 8:
                            g = r
                        }
                      if (!b) {
                        b = !0
                        var l = {
                          id: 1,
                          width: J,
                          height: $,
                          type: 'video',
                          profileIdc: h.getSpsValue('profile_idc'),
                          profileCompatibility: 0,
                          levelIdc: h.getSpsValue('level_idc'),
                          sps: [m],
                          pps: [g],
                          timescale: 1e3,
                          fps: A
                        }
                        ;(x = d.initSegment(l)), (w = h.getCodecInfo())
                      }
                    } else if (2 == Re) {
                      for (var o = 0; o < a.length; o++)
                        switch (
                          ((r = e.subarray(a[o] + 3, a[o + 1] - 1)),
                          255 & e[a[o] + 3])
                        ) {
                          case 2:
                          case 38:
                            ;(s = a[o] - 1), (B = e.subarray(s, e.length))
                            break
                          case 64:
                            p = r
                            break
                          case 66:
                            var u = e.subarray(a[o] + 5, a[o + 1] - 1)
                            h.parse(u), (m = r)
                            break
                          case 68:
                            g = r
                        }
                      if (!b) {
                        b = !0
                        var c = h.getSpsValue('general_profile_space'),
                          f = h.getSpsValue('general_tier_flag'),
                          y = h.getSpsValue('general_profile_idc'),
                          v = h.getSpsValue('temporalIdNested'),
                          l =
                            (h.getSpsValue(
                              'general_profile_compatibility_flags'
                            ),
                            h.getSpsValue('general_constraint_indicator_flags'),
                            {
                              id: 1,
                              width: J,
                              height: $,
                              type: 'video',
                              general_profile_flag: (c << 6) | (f << 5) | y,
                              general_profile_compatibility_flags:
                                h.getSpsValue(
                                  'general_profile_compatibility_flags'
                                ),
                              general_constraint_indicator_flags: h.getSpsValue(
                                'general_constraint_indicator_flags'
                              ),
                              general_level_idc:
                                h.getSpsValue('general_level_idc'),
                              chroma_format_idc:
                                h.getSpsValue('chroma_format_idc'),
                              bitDepthLumaMinus8:
                                h.getSpsValue('bitDepthLumaMinus8'),
                              bitDepthChromaMinus8: h.getSpsValue(
                                'bitDepthChromaMinus8'
                              ),
                              rate_layers_nested_length: 11 | ((1 & v) << 2),
                              vps: [p],
                              sps: [m],
                              pps: [g],
                              timescale: 1e3,
                              fps: A
                            })
                        x = d.initSegment(l)
                      }
                    }
                  })(Q),
                  0 == Le)
                ) {
                  var Ve = { decodeMode: 'video', width: J, height: $ }
                  ;[2, 4, 8].includes(K)
                    ? (Ve.encodeMode = 'H264')
                    : 12 === K && (Ve.encodeMode = 'H265'),
                    j(Ve),
                    (Ee = 1),
                    null == f && (f = _()).init(a),
                    Xe(),
                    We(),
                    (Le = !0)
                }
                re && ((re = !1), f.capture(ne, ie)),
                  f.setvideoTimeStamp(t),
                  (function () {
                    if (null != B) {
                      var e = {
                        duration: Math.round((1 / A) * 1e3),
                        size: B.length,
                        frame_time_stamp: null,
                        frameDuration: null
                      }
                      ;(e.frameDuration = e.duration),
                        null == C.samples && (C.samples = new Array(I)),
                        (C.samples[D++] = e),
                        (E += e.frameDuration),
                        (k += e.frameDuration)
                      var t = B.length - 4
                      ;(B[0] = (4278190080 & t) >>> 24),
                        (B[1] = (16711680 & t) >>> 16),
                        (B[2] = (65280 & t) >>> 8),
                        (B[3] = 255 & t)
                      var n = new Uint8Array(B.length + T)
                      if (
                        (0 !== T && n.set(M),
                        n.set(B, T),
                        (T = (M = n).length),
                        D % I === 0 && 0 !== D)
                      ) {
                        if (
                          (null !== C.samples[0].frameDuration &&
                            ((C.baseMediaDecodeTime = 1 === L ? 0 : F),
                            (F = E)),
                          1 == v)
                        )
                          for (
                            var r = C.samples.length, i = k / I, a = 0;
                            a < r;
                            a++
                          )
                            C.samples[a].frameDuration = i
                        ;(k = 0),
                          (O = d.mediaSegment(L, C, M, C.baseMediaDecodeTime)),
                          L++,
                          (D = 0),
                          (M = null),
                          (T = 0),
                          null !== f
                            ? f.setMediaSegment(O)
                            : !1 === b &&
                              (debug.log(
                                'workerManager::videoMS error!! recreate videoMS'
                              ),
                              We())
                      }
                    }
                  })(),
                  (ce = null),
                  (Q = null)
              } else {
                if (0 == s || 0 == l || 0 == c) return
                0 != Ee && ($e(), (De = !0), (Pe = 0), (Ce = 0))
                var Be = ue.getInt32(76, !0)
                ;(J == Pe && $ == Ce) ||
                  ((Ee = 0),
                  (Pe = J),
                  (Ce = $),
                  Ie ? this.resize(J, $) : xe.resize(J, $),
                  (Ve = { decodeMode: 'canvas', width: J, height: $ }),
                  [2, 4, 8].includes(K)
                    ? (Ve.encodeMode = 'H264')
                    : 12 === K && (Ve.encodeMode = 'H265'),
                  j(Ve),
                  (fe = null),
                  (he = null),
                  (de = null),
                  (pe = null),
                  (me = null),
                  (ge = null),
                  (fe = new ArrayBuffer(J * $)),
                  (pe = new Uint8Array(fe)),
                  (he = new ArrayBuffer((J * $) / 4)),
                  (me = new Uint8Array(he)),
                  (de = new ArrayBuffer((J * $) / 4)),
                  (ge = new Uint8Array(de))),
                  re &&
                    ((re = !1),
                    (function (e, t) {
                      var r = n.width,
                        i = n.height,
                        a = document.createElement('canvas')
                      ;(a.width = r), (a.height = i)
                      for (var o = a.getContext('2d'), s = 0; s < e.length; s++)
                        e[s] && o.drawImage(e[s], 0, 0, r, i)
                      for (
                        var l = a.toDataURL(),
                          u = atob(
                            l.substring('data:image/png;base64,'.length)
                          ),
                          c = new Uint8Array(u.length),
                          f = 0,
                          h = u.length;
                        f < h;
                        ++f
                      )
                        c[f] = u.charCodeAt(f)
                      var d = new Blob([c.buffer], { type: 'image/png' })
                      ;(c = null), tt(d, t + '.png'), (d = null)
                    })([n, ie], ne))
                var Ye = 0
                for (Ye = 0; Ye < $; Ye++)
                  pe.set(
                    Module.HEAPU8.subarray(s + Ye * Be, s + Ye * Be + J),
                    Ye * J
                  )
                for (Ye = 0; Ye < $ / 2; Ye++)
                  me.set(
                    Module.HEAPU8.subarray(
                      l + (Ye * Be) / 2,
                      l + (Ye * Be) / 2 + J / 2
                    ),
                    (Ye * J) / 2
                  )
                for (Ye = 0; Ye < $ / 2; Ye++)
                  ge.set(
                    Module.HEAPU8.subarray(
                      c + (Ye * Be) / 2,
                      c + (Ye * Be) / 2 + J / 2
                    ),
                    (Ye * J) / 2
                  )
                Ie
                  ? Ae && Ae.drawCanvas(pe, me, ge)
                  : xe && xe.draw(pe, me, ge, A)
              }
              if ((W !== Z && ((W = Z), G && G(V, N, z, H, Y, X)), !te && ae))
                return void setTimeout(function () {
                  q()
                }, 16)
            } else if (2 == P && oe) {
              if (!u && ke < 5) {
                if (A > 5 || 0 == A) return
                if (ke < 2) return
              }
              if ((ue.getInt32(24, !0), ue.getInt32(80, !0) > 0)) return
              var je = ue.getInt32(28, !0),
                Ge = ue.getInt32(32, !0)
              ue.getInt32(84, !0),
                Se != y &&
                  ((Se = y),
                  (ve = null),
                  (we = null),
                  (ve = new ArrayBuffer(y)),
                  (we = new Uint8Array(ve))),
                we.set(Module.HEAPU8.subarray(s, s + y))
              for (
                var Ze = new Int16Array(
                    we.buffer,
                    we.byteOffset,
                    we.byteLength / Int16Array.BYTES_PER_ELEMENT
                  ),
                  Ke = new Float32Array(Ze.length),
                  Qe = 0;
                Qe < Ze.length;
                Qe++
              )
                Ke[Qe] = Ze[Qe] / Math.pow(2, 15)
              ;(Ge == _e && je == be) ||
                ((_e = Ge),
                (be = je),
                ye && (ye.stop(), (ye = null)),
                (ye = new o()),
                (window.wsAudioPlayer = ye),
                ye.setSamplingRate(Ge),
                null !== ye &&
                  (ye.setInitVideoTimeStamp(0),
                  ye.audioInit(1, Ge) ||
                    (ye.stop(), (ye = null), (window.wsAudioPlayer = null)))),
                ye && ye.bufferAudio(Ke, 0),
                (Ze = null),
                (Ke = null)
            }
            Z = null
          },
          setCallback: function (e, t) {
            switch (e) {
              case 'timeStamp':
              case 'ResolutionChanged':
                break
              case 'audioTalk':
                z = t
                break
              case 'stepRequest':
              case 'metaEvent':
              case 'videoMode':
                break
              case 'loadingBar':
                H = t
                break
              case 'Error':
                Y = t
                break
              case 'PlayStart':
                ;(N = t), xe && xe.setPlayStartCallback(N)
                break
              case 'DecodeStart':
                j = t
                break
              case 'UpdateCanvas':
              case 'FrameTypeChange':
              case 'MSEResolutionChanged':
              case 'audioChange':
              case 'WorkerReady':
                break
              case 'FileOver':
                q = t
                break
              case 'UpdatePlayingTime':
                G = t
            }
          },
          capture: function (e, t) {
            ;(ne = e), (re = !0), (ie = t)
          },
          setFileOver: function (e) {
            ;(ae = e), !te && ae && q()
          },
          mute: function (e) {
            ye && ye.Mute(e)
          },
          setPlayAudio: function (e) {
            oe = e
          },
          setVolume: function (e) {
            ye && ye.setVolume(e)
          },
          talkInit: function (e, t) {
            c || (c = new P()), c.talkInit(e, t), c.setSendAudioTalkCallback(z)
          },
          IVSDataCallBack: function (e, t, n, r) {
            Ye.setIVSData(e, t, n, r)
          },
          DrawIVSDataCallBack: function (e) {
            Ye.drawIVSData(je)
          },
          RecordDataCallBack: function (e, t, n, r, i) {
            Ve ||
              ((Fe = new ArrayBuffer(292)),
              (Ve = new Uint8Array(Fe)),
              (Be = new DataView(Fe))),
              Ve.set(Module.HEAPU8.subarray(i, i + 292))
            var a = Be.getInt32(0, !0)
            Be.getInt32(4, !0),
              Be.getInt32(56, !0),
              1 == a &&
                (Be.getInt32(68, !0),
                Be.getInt32(72, !0),
                Be.getUint32(8, !0),
                Be.getUint16(40, !0),
                Be.getUint16(42, !0),
                Be.getUint16(46, !0),
                Be.getUint16(48, !0),
                Be.getUint16(50, !0),
                Be.getUint16(52, !0))
            var o = new ArrayBuffer(n),
              s = new Uint8Array(o)
            s.set(Module.HEAPU8.subarray(t, t + n)),
              Oe.postMessage({
                type: 'addBuffer',
                buffer: s,
                offset: r,
                recordType: U
              }),
              (o = null),
              (s = null)
          },
          resize: function (e, t) {
            Ae && (Ae = null)
            var r = new et(e, t)
            ;(Ae = new y(n, r)).setPlayStartCallback(N), (r = null)
          }
        }
        var tt = (function (e) {
          var t = e.document,
            n = function () {
              return e.URL || e.webkitURL || e
            },
            r = t.createElementNS('http://www.w3.org/1999/xhtml', 'a'),
            i = 'download' in r,
            a = /constructor/i.test(e.HTMLElement),
            o = /CriOS\/[\d]+/.test(navigator.userAgent),
            s = function (t) {
              ;(e.setImmediate || e.setTimeout)(function () {
                throw t
              }, 0)
            },
            l = function (e) {
              setTimeout(function () {
                'string' === typeof e ? n().revokeObjectURL(e) : e.remove()
              }, 4e4)
            },
            u = function (e) {
              return /^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(
                e.type
              )
                ? new Blob([String.fromCharCode(65279), e], { type: e.type })
                : e
            },
            c = function (t, c, f) {
              f || (t = u(t))
              var h,
                d = this,
                p = 'application/octet-stream' === t.type,
                m = function () {
                  !(function (e, t, n) {
                    for (var r = (t = [].concat(t)).length; r--; ) {
                      var i = e['on' + t[r]]
                      if ('function' === typeof i)
                        try {
                          i.call(e, n || e)
                        } catch (e) {
                          s(e)
                        }
                    }
                  })(d, 'writestart progress write writeend'.split(' '))
                }
              if (((d.readyState = d.INIT), i))
                return (
                  (h = n().createObjectURL(t)),
                  void setTimeout(function () {
                    ;(r.href = h),
                      (r.download = c),
                      r.dispatchEvent(new MouseEvent('click')),
                      m(),
                      l(h),
                      (d.readyState = d.DONE)
                  })
                )
              !(function () {
                if ((o || (p && a)) && e.FileReader) {
                  var r = new FileReader()
                  return (
                    (r.onloadend = function () {
                      var t = o
                        ? r.result
                        : r.result.replace(
                            /^data:[^;]*;/,
                            'data:attachment/file;'
                          )
                      e.open(t, '_blank') || (e.location.href = t),
                        (t = void 0),
                        (d.readyState = d.DONE),
                        m()
                    }),
                    r.readAsDataURL(t),
                    void (d.readyState = d.INIT)
                  )
                }
                h || (h = n().createObjectURL(t)),
                  p
                    ? (e.location.href = h)
                    : e.open(h, '_blank') || (e.location.href = h),
                  (d.readyState = d.DONE),
                  m(),
                  l(h)
              })()
            },
            f = c.prototype
          return 'undefined' !== typeof navigator && navigator.msSaveOrOpenBlob
            ? function (e, t, n) {
                return (
                  (t = t || e.name || 'download'),
                  n || (e = u(e)),
                  navigator.msSaveOrOpenBlob(e, t)
                )
              }
            : ((f.readyState = f.INIT = 0),
              (f.WRITING = 1),
              (f.DONE = 2),
              (f.error =
                f.onwritestart =
                f.onprogress =
                f.onwrite =
                f.onabort =
                f.onerror =
                f.onwriteend =
                  null),
              function (e, t, n) {
                return new c(e, t || e.name || 'download', n)
              })
        })(window)
        return new Ge()
      },
      N = function (e, t) {
        var n =
          arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {}
        return (function (e) {
          e = e
          var r = null,
            i = n.isTalkService,
            a = 6,
            o = null,
            l = null,
            u = 0,
            c = 0,
            f = !1,
            h = !1,
            d = !1,
            p = {
              OK: 200,
              UNAUTHORIZED: 401,
              NOTFOUND: 404,
              INVALID_RANGE: 457,
              NOTSERVICE: 503,
              DISCONNECT: 999
            },
            m = 4e4,
            g = '',
            y = [],
            v = 1,
            w = null,
            S = {},
            _ = 'Options',
            b = null,
            x = null,
            A = '',
            P = null,
            C = {},
            T = t + '&trackID=701',
            R = null,
            M = {},
            U = null,
            I = 0,
            D = 0,
            E = null,
            k = !1,
            L = Symbol(),
            O = [],
            F = 0,
            N = 0,
            z = !1,
            H = 1,
            Y = null
          function j() {}
          function q(e, t, n, r, i) {
            var a = ''
            switch (e) {
              case 'OPTIONS':
              case 'TEARDOWN':
              case 'GET_PARAMETER':
              case 'SET_PARAMETERS':
                a =
                  e + ' ' + T + ' RTSP/1.0\r\nCSeq: ' + v + '\r\n' + g + '\r\n'
                break
              case 'DESCRIBE':
                ;(a = e + ' ' + T + ' RTSP/1.0\r\nCSeq: ' + v + '\r\n' + g),
                  (a += 'User-Agent: Dahua Rtsp Client/2.0\r\n'),
                  (a += '\r\n'),
                  J(),
                  $()
                break
              case 'SETUP':
                ;(a =
                  e +
                  ' ' +
                  T +
                  '/trackID=' +
                  t +
                  ' RTSP/1.0\r\nCSeq: ' +
                  v +
                  '\r\nUser-Agent: Dahua Rtsp Client/2.0\r\n' +
                  g +
                  'Transport: DH/AVP/TCP;unicast;interleaved=' +
                  2 * t +
                  '-' +
                  (2 * t + 1) +
                  '\r\n'),
                  (a += x ? 'Session: ' + x + '\r\n\r\n' : '\r\n'),
                  J(),
                  $()
                break
              case 'PLAY':
                ;(a =
                  e +
                  ' ' +
                  T +
                  ' RTSP/1.0\r\nCSeq: ' +
                  v +
                  '\r\nSession: ' +
                  x +
                  ';timeout=60\r\n'),
                  void 0 != r && 0 != r
                    ? ((a += 'Range: npt=' + r + '-\r\n'), (a += g))
                    : (a += g),
                  i
                    ? ((H = i), (a += 'Speed: ' + i + '\r\n\r\n'))
                    : (a += '\r\n'),
                  J(),
                  $()
                break
              case 'PAUSE':
                a =
                  e +
                  ' ' +
                  T +
                  ' RTSP/1.0\r\nCSeq: ' +
                  v +
                  '\r\nSession: ' +
                  x +
                  '\r\n\r\n'
                break
              case 'SCALE':
                ;(a =
                  'PLAY ' +
                  T +
                  ' RTSP/1.0\r\nCSeq: ' +
                  v +
                  '\r\nSession: ' +
                  x +
                  '\r\n'),
                  (a += 'Scale: ' + r + '\r\n'),
                  (a += g + '\r\n')
            }
            return s.h.log(a), a
          }
          function G(e) {
            !0 === i &&
              (function (e) {
                null !== r && r.readyState === WebSocket.OPEN
                  ? r.send(e)
                  : w({
                      symbol: L,
                      errorCode: '504',
                      description: 'Talking Failed',
                      place: 'SendRtpData'
                    })
              })(e)
          }
          function W(e) {
            s.h.log(e)
            var t,
              n = e.search('CSeq: ') + 5
            if (
              ((v = parseInt(e.slice(n, n + 10)) + 1),
              (t = (function (e) {
                var t = {},
                  n = 0,
                  r = 0,
                  i = null,
                  a = null
                if (-1 !== e.search('Content-Type: application/sdp')) {
                  var o = e.split('\r\n\r\n')
                  a = o[0]
                } else a = e
                var s = a.split('\r\n'),
                  l = s[0].split(' ')
                if (
                  (l.length > 2 &&
                    ((t.ResponseCode = parseInt(l[1])),
                    (t.ResponseMessage = l[2])),
                  t.ResponseCode === p.OK)
                ) {
                  for (n = 1; n < s.length; n++)
                    if ('Public' === (i = s[n].split(':'))[0])
                      t.MethodsSupported = i[1].split(',')
                    else if ('CSeq' === i[0]) t.CSeq = parseInt(i[1])
                    else if ('Content-Type' === i[0])
                      (t.ContentType = i[1]),
                        -1 !== t.ContentType.search('application/sdp') &&
                          (t.SDPData = te(e))
                    else if ('Content-Length' === i[0])
                      t.ContentLength = parseInt(i[1])
                    else if ('Content-Base' === i[0]) {
                      var u = s[n].search('Content-Base:')
                      ;-1 !== u && (t.ContentBase = s[n].substr(u + 13))
                    } else if ('Session' === i[0]) {
                      var c = i[1].split(';')
                      t.SessionID = parseInt(c[0])
                    } else if ('Transport' === i[0]) {
                      var f = i[1].split(';')
                      for (r = 0; r < f.length; r++) {
                        var h = f[r].search('interleaved=')
                        if (-1 !== h) {
                          var d = f[r].substr(h + 12),
                            m = d.split('-')
                          m.length > 1 &&
                            ((t.RtpInterlevedID = parseInt(m[0])),
                            (t.RtcpInterlevedID = parseInt(m[1])))
                        }
                      }
                    } else if ('RTP-Info' === i[0]) {
                      i[1] = s[n].substr(9)
                      var g = i[1].split(',')
                      for (t.RTPInfoList = [], r = 0; r < g.length; r++) {
                        var y = g[r].split(';'),
                          v = {},
                          w = 0
                        for (w = 0; w < y.length; w++) {
                          var S = y[w].search('url=')
                          ;-1 !== S && (v.URL = y[w].substr(S + 4)),
                            -1 !== (S = y[w].search('seq=')) &&
                              (v.Seq = parseInt(y[w].substr(S + 4)))
                        }
                        t.RTPInfoList.push(v)
                      }
                    }
                } else if (t.ResponseCode === p.UNAUTHORIZED)
                  for (n = 1; n < s.length; n++)
                    if ('CSeq' === (i = s[n].split(':'))[0])
                      t.CSeq = parseInt(i[1])
                    else if ('WWW-Authenticate' === i[0]) {
                      var _ = i[1].split(',')
                      for (r = 0; r < _.length; r++) {
                        var b = _[r].search('Digest realm=')
                        if (-1 !== b) {
                          var x = _[r].substr(b + 13).split('"')
                          t.Realm = x[1]
                        }
                        if (-1 !== (b = _[r].search('nonce='))) {
                          var A = _[r].substr(b + 6).split('"')
                          t.Nonce = A[1]
                        }
                      }
                    }
                return t
              })(e)).ResponseCode === p.UNAUTHORIZED && '' === g)
            )
              !(function (e) {
                var t = M.username,
                  n = M.passWord,
                  r = { Method: null, Realm: null, Nonce: null, Uri: null },
                  i = null
                ;(r = {
                  Method: _.toUpperCase(),
                  Realm: e.Realm,
                  Nonce: e.Nonce,
                  Uri: T
                }),
                  (i = (function (e, t, n, r, i, a) {
                    var o = null,
                      s = null
                    return (
                      (o = hex_md5(e + ':' + r + ':' + t).toLowerCase()),
                      (s = hex_md5(a + ':' + n).toLowerCase()),
                      hex_md5(o + ':' + i + ':' + s).toLowerCase()
                    )
                  })(t, n, r.Uri, r.Realm, r.Nonce, r.Method)),
                  (g =
                    'Authorization: Digest username="' +
                    t +
                    '", realm="' +
                    r.Realm +
                    '",'),
                  (g +=
                    ' nonce="' +
                    r.Nonce +
                    '", uri="' +
                    r.Uri +
                    '", response="' +
                    i +
                    '"'),
                  (g += '\r\n'),
                  X(q('OPTIONS', null))
              })(t)
            else if (t.ResponseCode === p.OK) {
              if ('Options' === _) return (_ = 'Describe'), q('DESCRIBE', null)
              if ('Describe' === _) {
                ;(S = te(e)),
                  'undefined' !== typeof t.ContentBase &&
                    (S.ContentBase = t.ContentBase)
                var r = 0
                for (r = 0; r < S.Sessions.length; r += 1) {
                  var a = {}
                  'JPEG' === S.Sessions[r].CodecMime ||
                  'H264' === S.Sessions[r].CodecMime ||
                  'H265' === S.Sessions[r].CodecMime ||
                  'H264-SVC' == S.Sessions[r].CodecMime
                    ? ((a.codecName = S.Sessions[r].CodecMime),
                      'H264-SVC' == S.Sessions[r].CodecMime &&
                        (a.codecName = 'H264'),
                      'H265' == S.Sessions[r].CodecMime &&
                        j.prototype.setLiveMode('canvas'),
                      (a.trackID = S.Sessions[r].ControlURL),
                      (a.ClockFreq = S.Sessions[r].ClockFreq),
                      (a.Port = parseInt(S.Sessions[r].Port)),
                      'undefined' !== typeof S.Sessions[r].Framerate &&
                        ((a.Framerate = parseInt(S.Sessions[r].Framerate)),
                        R(a.Framerate)),
                      y.push(a))
                    : 'PCMU' === S.Sessions[r].CodecMime ||
                      -1 !== S.Sessions[r].CodecMime.search('G726-16') ||
                      -1 !== S.Sessions[r].CodecMime.search('G726-24') ||
                      -1 !== S.Sessions[r].CodecMime.search('G726-32') ||
                      -1 !== S.Sessions[r].CodecMime.search('G726-40') ||
                      'PCMA' === S.Sessions[r].CodecMime
                    ? ('PCMU' === S.Sessions[r].CodecMime
                        ? (a.codecName = 'G.711Mu')
                        : 'G726-16' === S.Sessions[r].CodecMime
                        ? (a.codecName = 'G.726-16')
                        : 'G726-24' === S.Sessions[r].CodecMime
                        ? (a.codecName = 'G.726-24')
                        : 'G726-32' === S.Sessions[r].CodecMime
                        ? (a.codecName = 'G.726-32')
                        : 'G726-40' === S.Sessions[r].CodecMime
                        ? (a.codecName = 'G.726-40')
                        : 'PCMA' === S.Sessions[r].CodecMime &&
                          (a.codecName = 'G.711A'),
                      (a.trackID = S.Sessions[r].ControlURL),
                      (a.ClockFreq = S.Sessions[r].ClockFreq),
                      (a.Port = parseInt(S.Sessions[r].Port)),
                      (a.Bitrate = parseInt(S.Sessions[r].Bitrate)),
                      (a.TalkTransType = S.Sessions[r].TalkTransType),
                      y.push(a))
                    : 'mpeg4-generic' === S.Sessions[r].CodecMime ||
                      'MPEG4-GENERIC' === S.Sessions[r].CodecMime
                    ? ((a.codecName = 'mpeg4-generic'),
                      (a.trackID = S.Sessions[r].ControlURL),
                      (a.ClockFreq = S.Sessions[r].ClockFreq),
                      (a.Port = parseInt(S.Sessions[r].Port)),
                      (a.Bitrate = parseInt(S.Sessions[r].Bitrate)),
                      y.push(a))
                    : 'vnd.onvif.metadata' === S.Sessions[r].CodecMime
                    ? ((a.codecName = 'MetaData'),
                      (a.trackID = S.Sessions[r].ControlURL),
                      (a.ClockFreq = S.Sessions[r].ClockFreq),
                      (a.Port = parseInt(S.Sessions[r].Port)),
                      y.push(a))
                    : 'stream-assist-frame' === S.Sessions[r].CodecMime
                    ? ((a.codecName = 'stream-assist-frame'),
                      (a.trackID = S.Sessions[r].ControlURL),
                      (a.ClockFreq = S.Sessions[r].ClockFreq),
                      (a.Port = parseInt(S.Sessions[r].Port)),
                      y.push(a))
                    : s.h.log(
                        'Unknown codec type:',
                        S.Sessions[r].CodecMime,
                        S.Sessions[r].ControlURL
                      )
                }
                return (
                  (b = 0),
                  (_ = 'Setup'),
                  O.length
                    ? q('SETUP', O[(F = 0)].split('=')[1] - 0)
                    : q('SETUP', 0)
                )
              }
              if ('Setup' === _)
                return (
                  (x = t.SessionID),
                  O.length
                    ? x
                      ? O[(F += 1)]
                        ? (i &&
                            (U.setCallback('audioTalk', G), U.talkInit(y, C)),
                          q('SETUP', O[F].split('=')[1]))
                        : ((_ = 'Play'), q('PLAY', null))
                      : ((b += 1), q('SETUP', O[F].split('=')[1]))
                    : x
                    ? (i && (U.setCallback('audioTalk', G), U.talkInit(y, C)),
                      (_ = 'Play'),
                      q('PLAY', null))
                    : ((b += 1), q('SETUP', 0))
                )
              'Play' === _
                ? ((x = t.SessionID),
                  i ||
                    (clearInterval(P),
                    (P = setInterval(function () {
                      return X(q('GET_PARAMETER', null))
                    }, m))),
                  (_ = 'Playing'))
                : 'Playing' === _ || s.h.log('unknown rtsp state:' + _)
            } else if (t.ResponseCode === p.NOTSERVICE) {
              if ('Setup' === _ && -1 !== y[b].trackID.search('trackID=t'))
                return (
                  (y[b].RtpInterlevedID = -1),
                  (y[b].RtcpInterlevedID = -1),
                  (b += 1),
                  w({
                    symbol: L,
                    errorCode: '504',
                    description: 'Talking Failed',
                    place: 'RtspResponseHandler'
                  }),
                  b < y.length
                    ? q('SETUP', y[b].trackID)
                    : ((_ = 'Play'), q('PLAY', null))
                )
              w({
                symbol: L,
                errorCode: '503',
                description: 'Service Unavilable'
              })
            } else if (t.ResponseCode === p.NOTFOUND) {
              if ('Describe' === _ || 'Options' === _)
                return void w({
                  symbol: L,
                  errorCode: '404',
                  description: 'rtsp not found'
                })
            } else if (t.ResponseCode === p.INVALID_RANGE)
              return (
                ('backup' !== A && 'playback' !== A) ||
                  w({
                    symbol: L,
                    errorCode: '457',
                    description: 'Invalid range'
                  }),
                void s.h.log('RTP disconnection detect!!!')
              )
          }
          function X(e) {
            void 0 != e &&
              null != e &&
              '' != e &&
              (null !== r && r.readyState === WebSocket.OPEN
                ? (!1 === h &&
                    -1 !== e.search('DESCRIBE') &&
                    ((f = !0), (h = !0)),
                  void 0 != e && r.send(Z(e)))
                : s.h.log('ws\u672a\u8fde\u63a5'))
          }
          function Z(e) {
            for (
              var t = e.length, n = new Uint8Array(new ArrayBuffer(t)), r = 0;
              r < t;
              r++
            )
              n[r] = e.charCodeAt(r)
            return n
          }
          function K(t) {
            if (!e.includes('?serverIp=')) {
              var n = 'https:' === location.protocol
              return t.replace('rtsp', n ? 'wss' : 'ws')
            }
            var r = t.split('//')[1].split('/')[0]
            e = e.slice(0, e.indexOf('serverIp=')) + 'serverIp=' + r
          }
          function Q(e) {
            var t = new Uint8Array(),
              n = new Uint8Array(e.data)
            for (
              (t = new Uint8Array(n.length)).set(n, 0),
                u = t.length,
                I && (clearTimeout(I), (I = 0)),
                D && (clearTimeout(D), (D = 0));
              u > 0;

            )
              if (36 !== t[0]) {
                var r = String.fromCharCode.apply(null, t),
                  i = null
                if (r.includes('302 Moved'))
                  return (
                    K(
                      (T = r.slice(r.indexOf('rtsp://'), r.indexOf('\r\n\r\n')))
                    ),
                    j.prototype.disconnect(!1),
                    void j.prototype.connect()
                  )
                if (
                  ((-1 !== r.indexOf('OffLine:File Over') ||
                    -1 !== r.indexOf('OffLine:Internal Error') ||
                    r.includes('is_session_end: true')) &&
                    U.setFileOver(!0),
                  -1 !== r.indexOf('OffLine:KmsUnavailable') &&
                    w({ symbol: L, errorCode: '203' }),
                  'Describe' === _ &&
                    ((O = []),
                    -1 !== r.indexOf('a=control:trackID=') &&
                      (O =
                        r
                          .split('a=control:')
                          .filter(function (e) {
                            return e.startsWith('trackID=')
                          })
                          .map(function (e) {
                            return e.split('\r\n')[0]
                          }) || [])),
                  'Play' === _ && r.indexOf('Range: npt='))
                ) {
                  var s =
                    r.split('Range: npt=')[1] &&
                    r.split('Range: npt=')[1].split('\r\n')[0]
                  Y && Y(s)
                }
                !0 === f
                  ? ((i = r.lastIndexOf('\r\n')), (f = !1))
                  : (i = r.search('\r\n\r\n'))
                var h = r.search('RTSP')
                if (-1 === h) return void (t = new Uint8Array())
                if (-1 === i) return void (u = t.length)
                ;(o = t.subarray(h, i + a)),
                  (t = t.subarray(i + a)),
                  X(W(String.fromCharCode.apply(null, o))),
                  (u = t.length)
              } else {
                if (
                  ((l = t.subarray(0, a)),
                  !(
                    (c = (l[2] << 24) | (l[3] << 16) | (l[4] << 8) | l[5]) +
                      a <=
                    t.length
                  ))
                )
                  return void (u = t.length)
                var d = t.subarray(a, c + a)
                k && E.postMessage({ type: 'addBuffer', buffer: d }),
                  ee(l, d),
                  (t = t.subarray(c + a)),
                  (u = t.length)
              }
          }
          function J() {
            I && clearTimeout(I),
              (I = setTimeout(function () {
                w({
                  symbol: L,
                  errorCode: '407',
                  description: 'Request Timeout'
                })
              }, 3e4))
          }
          function $() {
            D && clearTimeout(D),
              (D = setTimeout(function () {
                w({
                  symbol: L,
                  errorCode: '408',
                  description: 'Short Request Timeout'
                })
              }, 3e3))
          }
          function ee(e, t) {
            U && U.InputData(e, t)
          }
          function te(e) {
            var t = { Sessions: [] },
              n = (
                -1 !== e.search('Content-Type: application/sdp')
                  ? e.split('\r\n\r\n')[1]
                  : e
              ).split('\r\n'),
              r = 0,
              i = !1
            for (r = 0; r < n.length; r++) {
              var a = n[r].split('=')
              if (a.length > 0)
                switch (a[0]) {
                  case 'a':
                    var o = a[1].split(':')
                    if (o.length > 1) {
                      if ('control' === o[0]) {
                        var s = n[r].search('control:')
                        !0 === i
                          ? -1 !== s &&
                            (t.Sessions[t.Sessions.length - 1].ControlURL = n[
                              r
                            ].substr(s + 8))
                          : -1 !== s && (t.BaseURL = n[r].substr(s + 8))
                      } else if ('rtpmap' === o[0]) {
                        var l = o[1].split(' ')
                        t.Sessions[t.Sessions.length - 1].PayloadType = l[0]
                        var u = l[1].split('/')
                        ;(t.Sessions[t.Sessions.length - 1].CodecMime = u[0]),
                          u.length > 1 &&
                            (t.Sessions[t.Sessions.length - 1].ClockFreq = u[1])
                      } else if ('framesize' === o[0]) {
                        var c = o[1].split(' ')
                        if (c.length > 1) {
                          var f = c[1].split('-')
                          ;(t.Sessions[t.Sessions.length - 1].Width = f[0]),
                            (t.Sessions[t.Sessions.length - 1].Height = f[1])
                        }
                      } else if ('framerate' === o[0])
                        t.Sessions[t.Sessions.length - 1].Framerate = o[1]
                      else if ('fmtp' === o[0]) {
                        var h = n[r].split(' ')
                        if (h.length < 2) continue
                        for (var d = 1; d < h.length; d++) {
                          var p = h[d].split(';'),
                            m = 0
                          for (m = 0; m < p.length; m++) {
                            var g = p[m].search('mode=')
                            if (
                              (-1 !== g &&
                                (t.Sessions[t.Sessions.length - 1].mode = p[
                                  m
                                ].substr(g + 5)),
                              -1 !== (g = p[m].search('config=')) &&
                                ((t.Sessions[t.Sessions.length - 1].config = p[
                                  m
                                ].substr(g + 7)),
                                (C.config =
                                  t.Sessions[t.Sessions.length - 1].config),
                                (C.clockFreq =
                                  t.Sessions[t.Sessions.length - 1].ClockFreq),
                                (C.bitrate =
                                  t.Sessions[t.Sessions.length - 1].Bitrate)),
                              -1 !== (g = p[m].search('sprop-vps=')) &&
                                (t.Sessions[t.Sessions.length - 1].VPS = p[
                                  m
                                ].substr(g + 10)),
                              -1 !== (g = p[m].search('sprop-sps=')) &&
                                (t.Sessions[t.Sessions.length - 1].SPS = p[
                                  m
                                ].substr(g + 10)),
                              -1 !== (g = p[m].search('sprop-pps=')) &&
                                (t.Sessions[t.Sessions.length - 1].PPS = p[
                                  m
                                ].substr(g + 10)),
                              -1 !== (g = p[m].search('sprop-parameter-sets=')))
                            ) {
                              var y = p[m].substr(g + 21).split(',')
                              y.length > 1 &&
                                ((t.Sessions[t.Sessions.length - 1].SPS = y[0]),
                                (t.Sessions[t.Sessions.length - 1].PPS = y[1]))
                            }
                          }
                        }
                      }
                    } else
                      1 === o.length &&
                        ('recvonly' === o[0]
                          ? (t.Sessions[t.Sessions.length - 1].TalkTransType =
                              'recvonly')
                          : 'sendonly' === o[0] &&
                            (t.Sessions[t.Sessions.length - 1].TalkTransType =
                              'sendonly'))
                    break
                  case 'm':
                    var v = a[1].split(' '),
                      w = {}
                    ;(w.Type = v[0]),
                      (w.Port = v[1]),
                      (w.Payload = v[3]),
                      t.Sessions.push(w),
                      (i = !0)
                    break
                  case 'b':
                    if (!0 === i) {
                      var S = a[1].split(':')
                      t.Sessions[t.Sessions.length - 1].Bitrate = S[1]
                    }
                }
            }
            return t
          }
          return (
            (j.prototype = {
              init: function () {
                var e =
                  arguments.length > 0 && void 0 !== arguments[0]
                    ? arguments[0]
                    : {}
                U || (U = new B()),
                  (this.symbol = L),
                  e.isPlayback,
                  (e.isTalkService = i),
                  U.Init(e) > 0 && (this.nPlayPort = U.GetPlayPort())
              },
              connect: function () {
                r ||
                  (((r = new WebSocket(e)).binaryType = 'arraybuffer'),
                  (_ = 'Options'),
                  r.addEventListener('message', Q, !1),
                  (r.onopen = function () {
                    var e = 'OPTIONS ' + T + ' RTSP/1.0\r\nCSeq: ' + v + '\r\n'
                    e += 'User-Agent: Dahua Rtsp Client/2.0\r\n'
                    var t = Z((e += '\r\n'))
                    r.send(t)
                  }),
                  (r.onerror = function (e) {
                    w({
                      symbol: L,
                      errorCode: '202',
                      description: 'Open WebSocket Error'
                    })
                  }))
              },
              disconnect: function () {
                var e =
                  !(arguments.length > 0 && void 0 !== arguments[0]) ||
                  arguments[0]
                U && e && (U.Stop(), (U = null)),
                  E && (E = null),
                  X(q('TEARDOWN', null)),
                  clearInterval(P),
                  (P = null),
                  null !== r && (r.onerror = null),
                  null !== r &&
                    r.readyState === WebSocket.OPEN &&
                    (r.close(), (r = null), (x = null)),
                  E && (E = null)
              },
              controlPlayer: function (e) {
                var t = ''
                switch ((e.command, e.command)) {
                  case 'PLAY':
                    if (((_ = 'Play'), null != e.range)) {
                      ;(t = q('PLAY', null, 0, e.range)), U.Pause(0)
                      break
                    }
                    ;(t = q('PLAY', null)), U.Pause(0)
                    break
                  case 'PAUSE':
                    if ('PAUSE' === _) break
                    ;(_ = 'PAUSE'), (t = q('PAUSE', null)), U.Pause(1)
                    break
                  case 'PLAY_SPEED':
                    'PAUSE' === _ && U.Pause(0),
                      (_ = 'Play'),
                      (t = q('PLAY', null, 0, null, e.speed)),
                      U.setSpeed(e.speed)
                    break
                  case 'PLAY_RANGE':
                    ;(t = q('PLAY', null, 0, e.range, null)), U.Pause(0)
                    break
                  case 'SCALE':
                    t = q('SCALE', null, 0, e.data)
                    break
                  case 'TEARDOWN':
                    t = q('TEARDOWN', null)
                    break
                  case 'GET_PARAMETER':
                    t = q('GET_PARAMETER', null)
                    break
                  case 'audioPlay':
                    U && U.setPlayAudio(!!e.data)
                    break
                  case 'volume':
                    U && U.setVolume(e.data)
                    break
                  case 'audioSamplingRate':
                    break
                  case 'startLocalRecord':
                    var n = e.data,
                      r = n.name,
                      i = n.size,
                      a = n.isConvertToMP4,
                      o = r
                    ;(d = !!a)
                      ? (o.endsWith('.mp4') || (o += '.mp4'),
                        U.StartRecord(o, i))
                      : (o.endsWith('.dav') || (o += '.dav'),
                        (E = new V()),
                        Object(s.i)(E, o, i),
                        (k = !0))
                    break
                  case 'stopLocalRecord':
                    d
                      ? U.StopRecord()
                      : ((k = !1), E.postMessage({ type: 'close' }), (E = null))
                    break
                  default:
                    s.h.log('\u672a\u77e5\u6307\u4ee4: ' + e.command)
                }
                '' != t && X(t)
              },
              setLiveMode: function (e) {},
              setPlayMode: function (e) {},
              setRTSPURL: function (e) {
                T = e
              },
              setCallback: function (e, t) {
                switch (e) {
                  case 'GetFrameRate':
                    R = t
                    break
                  case 'GetRtspRange':
                    Y = t
                    break
                  default:
                    U.setCallback(e, t)
                }
                'Error' === e && (w = t)
              },
              setUserInfo: function (e, t) {
                ;(M.username = e), (M.passWord = t)
              },
              capture: function (e, t) {
                U.capture(e, t)
              },
              setLessRate: function (e) {},
              FrameDataCallBack: function (e, t, n, r, i, a) {
                !(function () {
                  if ((N = U.GetSourceBufferRemain()) > 7340032) {
                    z = !0
                    var e = q('PAUSE', null)
                    '' != e && X(e)
                  } else if (z && N < 2097152) {
                    z = !1
                    var e = q('PLAY', null, 0, null, H)
                    '' != e && X(e)
                  }
                })(),
                  U && U.FrameDataCallBack(e, t, n, r, i, a)
              },
              setDecryptionResult: function (e, t, n) {
                U && U.DecryptionResultCallBack(e, t, n)
              },
              openIVS: function () {
                U.OpenIVSDraw()
              },
              closeIVS: function () {
                U.CloseIVSDraw()
              },
              setIvsType: function (e) {
                U.SetIVSType(e)
              },
              setIVSData: function (e, t, n, r) {
                U.IVSDataCallBack(e, t, n, r)
              },
              drawIVSData: function (e) {
                U.DrawIVSDataCallBack(e)
              },
              setIVSCanvasSize: function (e, t) {
                U.setIVSCanvasSize(e, t)
              },
              setRecordData: function (e, t, n, r, i) {
                U.RecordDataCallBack(e, t, n, r, i)
              }
            }),
            new j()
          )
        })(e)
      }
    function z(e, t) {
      var n = Object.keys(e)
      if (Object.getOwnPropertySymbols) {
        var r = Object.getOwnPropertySymbols(e)
        t &&
          (r = r.filter(function (t) {
            return Object.getOwnPropertyDescriptor(e, t).enumerable
          })),
          n.push.apply(n, r)
      }
      return n
    }
    function H(e, t, n) {
      return (
        t in e
          ? Object.defineProperty(e, t, {
              value: n,
              enumerable: !0,
              configurable: !0,
              writable: !0
            })
          : (e[t] = n),
        e
      )
    }
    var Y = function (e) {
      ;(this.wsURL = e.wsURL),
        (this.rtspURL = e.rtspURL),
        (this.isTalkService = e.isTalkService),
        (this.isPlayback = !!e.isPlayback),
        (this.ws = null),
        (this.decodeMode = e.decodeMode),
        (this.config = e.config || {}),
        (this.ivsTypeArr = this.config.ivsTypeArr || [1, 2]),
        (this.useH265MSE =
          !this.config.hasOwnProperty('useH265MSE') ||
          !!this.config.useH265MSE),
        (this.useH264MSE =
          !this.config.hasOwnProperty('useH264MSE') ||
          !!this.config.useH264MSE),
        (this.lessRateCanvas = e.lessRateCanvas || !1),
        (this.nPlayPort = ''),
        (this.events = (function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = null != arguments[t] ? arguments[t] : {}
            t % 2
              ? z(Object(n), !0).forEach(function (t) {
                  H(e, t, n[t])
                })
              : Object.getOwnPropertyDescriptors
              ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
              : z(Object(n)).forEach(function (t) {
                  Object.defineProperty(
                    e,
                    t,
                    Object.getOwnPropertyDescriptor(n, t)
                  )
                })
          }
          return e
        })(
          {
            ResolutionChanged: function () {},
            PlayStart: function () {},
            DecodeStart: function () {},
            UpdateCanvas: function () {},
            GetFrameRate: function () {},
            FrameTypeChange: function () {},
            Error: function () {},
            MSEResolutionChanged: function () {},
            audioChange: function () {},
            WorkerReady: function () {},
            IvsDraw: function () {},
            FileOver: function () {},
            Waiting: function () {},
            UpdatePlayingTime: function () {}
          },
          e.events
        )),
        (this.username = e.username),
        (this.password = e.password)
    }
    Y.prototype = {
      init: function (e, t, n) {
        for (var r in ((this.ws = new N(this.wsURL, this.rtspURL, {})),
        this.ws.init({
          canvasElem: e,
          videoElem: t,
          ivsCanvasElem: n,
          isPlayback: this.isPlayback,
          useH265MSE: this.useH265MSE,
          useH264MSE: this.useH264MSE
        }),
        (this.nPlayPort = this.ws.nPlayPort),
        this.ws.setLiveMode(this.decodeMode),
        this.ws.setUserInfo(this.username, this.password),
        this.ws.setPlayMode(this.isPlayback),
        this.ws.setLessRate(this.lessRateCanvas),
        this.events))
          this.ws.setCallback(r, this.events[r])
        this.ws.setIvsType(this.ivsTypeArr), (this.events = null)
      },
      connect: function () {
        this.ws && this.ws.connect()
      },
      play: function () {
        this.controlPlayer('PLAY')
      },
      pause: function () {
        this.controlPlayer('PAUSE')
      },
      stop: function () {
        this.controlPlayer('TEARDOWN')
      },
      close: function () {
        this.ws && (this.ws.disconnect(), (this.ws = null))
      },
      playByTime: function (e) {
        this.controlPlayer('PLAY_RANGE', e)
      },
      playSpeed: function (e) {
        this.controlPlayer('PAUSE'),
          this.controlPlayer('PLAY_SPEED', e),
          this.controlPlayer('GET_PARAMETER')
      },
      playRewind: function () {},
      audioPlay: function () {
        this.controlPlayer('audioPlay', 'start')
      },
      audioStop: function () {
        this.controlPlayer('audioPlay', 'stop')
      },
      setAudioSamplingRate: function (e) {
        this.controlPlayer('audioSamplingRate', e)
      },
      setAudioVolume: function (e) {
        var t = this
        this.controlPlayer('audioPlay', e),
          setTimeout(function () {
            t.controlPlayer('volume', e)
          }, 100)
      },
      startLocalRecord: function (e, t, n) {
        this.controlPlayer('startLocalRecord', {
          name: e,
          size: void 0 === t ? this.config.localRecordSize || 100 : t,
          isConvertToMP4: void 0 === n ? !!this.config.downloadMp4Record : !!n
        })
      },
      stopLocalRecord: function () {
        this.controlPlayer('stopLocalRecord')
      },
      openIVS: function () {
        this.ws && this.ws.openIVS()
      },
      closeIVS: function () {
        this.ws && this.ws.closeIVS()
      },
      setIVSData: function (e, t, n, r) {
        this.ws && this.ws.setIVSData(e, t, n, r)
      },
      drawIVSData: function (e) {
        this.ws && this.ws.drawIVSData(e)
      },
      setIVSCanvasSize: function (e, t) {
        this.ws && this.ws.setIVSCanvasSize(e, t)
      },
      controlPlayer: function (e, t) {
        var n
        switch (e) {
          case 'PLAY_SPEED':
            n = { command: e, speed: t }
            break
          case 'PLAY_RANGE':
            n = { command: e, range: t }
            break
          default:
            n = { command: e, data: t }
        }
        this.ws && this.ws.controlPlayer(n)
      },
      setPlayMode: function (e) {
        this.ws && this.ws.setLiveMode(e)
      },
      setPlayPath: function (e) {
        this.ws && this.ws.setRTSPURL(e)
      },
      capture: function (e, t) {
        this.ws && this.ws.capture(e, t)
      },
      setFrameData: function (e, t, n, r, i, a) {
        this.ws && this.ws.FrameDataCallBack(e, t, n, r, i, a)
      },
      setDecryptionResult: function (e, t, n) {
        this.ws && this.ws.setDecryptionResult(e, t, n)
      },
      setRecordData: function (e, t, n, r) {
        this.ws && this.ws.setRecordData(e, t, n, r)
      },
      talk: function (e) {
        if ('on' === e) {
          for (var t in ((this.ws = new N(this.wsURL, this.rtspURL, {
            isTalkService: this.isTalkService
          })),
          this.ws.init({
            useH265MSE: this.useH265MSE,
            useH264MSE: this.useH264MSE
          }),
          (this.nPlayPort = this.ws.nPlayPort),
          this.events))
            this.ws.setCallback(t, this.events[t])
          ;(this.events = null), this.connect()
        } else this.close()
      },
      on: function (e, t) {
        this.events[e] = t
      }
    }
    t.default = Y
  }
]).default
