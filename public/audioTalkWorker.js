!(function (t) {
  var e = {}
  function r(n) {
    if (e[n]) return e[n].exports
    var a = (e[n] = { i: n, l: !1, exports: {} })
    return t[n].call(a.exports, a, a.exports, r), (a.l = !0), a.exports
  }
  ;(r.m = t),
    (r.c = e),
    (r.d = function (t, e, n) {
      r.o(t, e) || Object.defineProperty(t, e, { enumerable: !0, get: n })
    }),
    (r.r = function (t) {
      'undefined' !== typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(t, Symbol.toStringTag, { value: 'Module' }),
        Object.defineProperty(t, '__esModule', { value: !0 })
    }),
    (r.t = function (t, e) {
      if ((1 & e && (t = r(t)), 8 & e)) return t
      if (4 & e && 'object' === typeof t && t && t.__esModule) return t
      var n = Object.create(null)
      if (
        (r.r(n),
        Object.defineProperty(n, 'default', { enumerable: !0, value: t }),
        2 & e && 'string' != typeof t)
      )
        for (var a in t)
          r.d(
            n,
            a,
            function (e) {
              return t[e]
            }.bind(null, a)
          )
      return n
    }),
    (r.n = function (t) {
      var e =
        t && t.__esModule
          ? function () {
              return t.default
            }
          : function () {
              return t
            }
      return r.d(e, 'a', e), e
    }),
    (r.o = function (t, e) {
      return Object.prototype.hasOwnProperty.call(t, e)
    }),
    (r.p = ''),
    r((r.s = 0))
})([
  function (t, e, r) {
    'use strict'
    r.r(e)
    var n = {
      log: function () {},
      error: function () {},
      count: function () {},
      info: function () {}
    }
    ;(function () {
      function t() {}
      ;(t.createFromElementId = function (e) {
        for (var r = document.getElementById(e), n = '', a = r.firstChild; a; )
          3 === a.nodeType && (n += a.textContent), (a = a.nextSibling)
        var o = new t()
        return (o.type = r.type), (o.source = n), o
      }),
        (t.createFromSource = function (e, r) {
          var n = new t()
          return (n.type = e), (n.source = r), n
        })
    })(),
      (function () {
        function t(t) {
          ;(this.gl = t), (this.program = this.gl.createProgram())
        }
        t.prototype = {
          attach: function (t) {
            this.gl.attachShader(this.program, t.shader)
          },
          link: function () {
            this.gl.linkProgram(this.program)
          },
          use: function () {
            this.gl.useProgram(this.program)
          },
          getAttributeLocation: function (t) {
            return this.gl.getAttribLocation(this.program, t)
          },
          setMatrixUniform: function (t, e) {
            var r = this.gl.getUniformLocation(this.program, t)
            this.gl.uniformMatrix4fv(r, !1, e)
          }
        }
      })(),
      (function () {
        var t = null
        function e(t, e, r) {
          ;(this.gl = t),
            (this.size = e),
            (this.texture = t.createTexture()),
            t.bindTexture(t.TEXTURE_2D, this.texture),
            (this.format = r || t.LUMINANCE),
            t.texImage2D(
              t.TEXTURE_2D,
              0,
              this.format,
              e.w,
              e.h,
              0,
              this.format,
              t.UNSIGNED_BYTE,
              null
            ),
            t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MAG_FILTER, t.NEAREST),
            t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MIN_FILTER, t.NEAREST),
            t.texParameteri(t.TEXTURE_2D, t.TEXTURE_WRAP_S, t.CLAMP_TO_EDGE),
            t.texParameteri(t.TEXTURE_2D, t.TEXTURE_WRAP_T, t.CLAMP_TO_EDGE)
        }
        e.prototype = {
          fill: function (t, e) {
            var r = this.gl
            r.bindTexture(r.TEXTURE_2D, this.texture),
              e
                ? r.texSubImage2D(
                    r.TEXTURE_2D,
                    0,
                    0,
                    0,
                    this.size.w,
                    this.size.h,
                    this.format,
                    r.UNSIGNED_BYTE,
                    t
                  )
                : r.texImage2D(
                    r.TEXTURE_2D,
                    0,
                    this.format,
                    this.size.w,
                    this.size.h,
                    0,
                    this.format,
                    r.UNSIGNED_BYTE,
                    t
                  )
          },
          bind: function (e, r, n) {
            var a = this.gl
            t || (t = [a.TEXTURE0, a.TEXTURE1, a.TEXTURE2]),
              a.activeTexture(t[e]),
              a.bindTexture(a.TEXTURE_2D, this.texture),
              a.uniform1i(a.getUniformLocation(r.program, n), e)
          }
        }
      })()
    var a = function () {
        var t = 48e3,
          e = 4,
          r = 15,
          a = [255, 511, 1023, 2047, 4095, 8191, 16383, 32767],
          o = 8e3,
          i = null
        function u(t) {
          var n, o, i
          return (
            t >= 0 ? (n = 213) : ((n = 85), (t = -t - 8)),
            (o = (function (t, e) {
              for (var r = 0, n = e.length; r < n; r++) if (t <= e[r]) return r
              return e.length
            })(t, a)) >= 8
              ? 127 ^ n
              : ((i = o << e),
                (i |= o < 2 ? (t >> 4) & r : (t >> (o + 3)) & r) ^ n)
          )
        }
        function l() {}
        return (
          (l.prototype = {
            setSampleRate: function (e) {
              t = e
            },
            encode: function (e) {
              var r = null
              null !== i
                ? ((r = new Float32Array(e.length + i.length)).set(i, 0),
                  r.set(e, i.length))
                : (r = e),
                (r = (function (e, r) {
                  if (r === t) return e
                  r > t &&
                    n.log(
                      'The rate of device show be smaller than local sample rate'
                    )
                  for (
                    var a = t / r,
                      o = Math.floor(e.length / a),
                      u = new Float32Array(o),
                      l = 0,
                      s = 0;
                    l < u.length;

                  ) {
                    for (
                      var f = Math.round((l + 1) * a),
                        c = 0,
                        h = 0,
                        g = s,
                        T = e.length;
                      g < f && g < T;
                      g++
                    )
                      (c += e[g]), h++
                    ;(u[l] = c / h), l++, (s = f)
                  }
                  if (((i = null), Math.round(l * a) !== e.length)) {
                    var E = Math.round(l * a)
                    i = new Float32Array(e.subarray(E, e.length))
                  }
                  return u
                })(r, o))
              for (
                var a = new Int16Array(r.length),
                  l = new Uint8Array(a.length),
                  s = 0,
                  f = r.length;
                s < f;
                s++
              )
                (a[s] = r[s] * Math.pow(2, 15)), (l[s] = u(a[s]))
              return l
            }
          }),
          new l()
        )
      },
      o = function (t) {
        var e = null,
          r = null,
          n = [36, t, 0, 0, 0, 0],
          o = [68, 72, 65, 86],
          i = [100, 104, 97, 118],
          u = 245,
          l = 0,
          s = null
        function f(t, e, r) {
          var n = [],
            a = e || 4
          if (!0 === r)
            for (var o = 0; o < a; o++) n[o] = (t >>> (8 * (a - 1 - o))) & 255
          else for (var i = 0; i < a; i++) n[i] = (t >>> (8 * i)) & 255
          return n
        }
        function c() {
          r = new a()
        }
        return (
          (c.prototype = {
            setSampleRate: function (t) {
              r.setSampleRate(t)
            },
            getRTPPacket: function (a) {
              var c = r.encode(a),
                h = 0
              ;(e = new Uint8Array(n.length + 40 + c.length + 8)).set(
                [36, t],
                h
              ),
                (h += 2),
                e.set(f(40 + c.length + 8, 4, !0), h),
                (h += 4),
                e.set(o, h),
                (h += 4),
                e.set([240], h),
                (h += 1),
                e.set([0], h),
                (h += 1),
                e.set([1], h),
                (h += 1),
                e.set([0], h),
                (h += 1),
                u > 65535 && (u = 240),
                e.set(f(u), h),
                (h += 4),
                u++
              var g = f(40 + c.length + 8)
              e.set(g, h), (h += 4)
              var T = new Date(),
                E =
                  ((T.getFullYear() - 2e3) << 26) +
                  ((T.getMonth() + 1) << 22) +
                  (T.getDate() << 17) +
                  (T.getHours() << 12) +
                  (T.getMinutes() << 6) +
                  T.getSeconds(),
                p = T.getTime(),
                m = null === s ? 0 : p - s
              ;(s = p),
                (l += m) > 65535 && (l = 65535 - l),
                e.set(f(E), h),
                (h += 4),
                e.set(f(l, 2), h),
                (h += 2),
                e.set([16], h),
                (h += 1)
              var d = (function (t, e) {
                for (var r = 0, n = e; n < t.length; n++) r += t[n]
                return r
              })(e, 6)
              e.set([d], h),
                (h += 1),
                e.set([131, 1, 14, 2], h),
                (h += 4),
                e.set([150, 1, 0, 0], h),
                (h += 4)
              var v = (function (t, e) {
                for (var r = 0, n = 0; n < e; n++) r += t[n] << ((n % 4) * 8)
                return r
              })(c, c.length)
              return (
                e.set([136], h),
                (h += 1),
                e.set(f(v), h),
                (h += 4),
                e.set([0, 0, 0], h),
                (h += 3),
                e.set(c, h),
                (h += c.length),
                e.set(i, h),
                (h += 4),
                e.set(g, h),
                e
              )
            }
          }),
          new c(t)
        )
      },
      i = null
    addEventListener(
      'message',
      function (t) {
        var e,
          r = t.data
        switch (r.type) {
          case 'sdpInfo':
            r.data.sdpInfo, (i = new o(0))
            break
          case 'getRtpData':
            var n = i.getRTPPacket(r.data)
            ;(e = n), postMessage({ type: 'rtpData', data: e }, [e.buffer])
            break
          case 'sampleRate':
            null !== i && i.setSampleRate(r.data)
        }
      },
      !1
    )
  }
])
