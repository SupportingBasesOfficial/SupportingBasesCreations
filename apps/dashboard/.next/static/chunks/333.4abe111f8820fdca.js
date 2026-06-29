(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [333],
  {
    8806: function (e, t, r) {
      var n;
      ((n = function () {
        var e = Math.floor,
          t = Math.abs,
          n = Math.pow;
        return (function e(t, r, n) {
          function i(o, a) {
            if (!r[o]) {
              if (!t[o]) {
                if (s) return s(o, !0);
                var l = Error("Cannot find module '" + o + "'");
                throw ((l.code = "MODULE_NOT_FOUND"), l);
              }
              var h = (r[o] = { exports: {} });
              t[o][0].call(
                h.exports,
                function (e) {
                  return i(t[o][1][e] || e);
                },
                h,
                h.exports,
                e,
                t,
                r,
                n,
              );
            }
            return r[o].exports;
          }
          for (var s = void 0, o = 0; o < n.length; o++) i(n[o]);
          return i;
        })(
          {
            1: [
              function (e, t, r) {
                "use strict";
                function n(e) {
                  var t = e.length;
                  if (0 < t % 4)
                    throw Error(
                      "Invalid string. Length must be a multiple of 4",
                    );
                  var r = e.indexOf("=");
                  -1 === r && (r = t);
                  var n = r === t ? 0 : 4 - (r % 4);
                  return [r, n];
                }
                ((r.byteLength = function (e) {
                  var t = n(e),
                    r = t[0],
                    i = t[1];
                  return (3 * (r + i)) / 4 - i;
                }),
                  (r.toByteArray = function (e) {
                    var t,
                      r,
                      i = n(e),
                      a = i[0],
                      l = i[1],
                      h = new o((3 * (a + l)) / 4 - l),
                      c = 0,
                      u = 0 < l ? a - 4 : a;
                    for (r = 0; r < u; r += 4)
                      ((t =
                        (s[e.charCodeAt(r)] << 18) |
                        (s[e.charCodeAt(r + 1)] << 12) |
                        (s[e.charCodeAt(r + 2)] << 6) |
                        s[e.charCodeAt(r + 3)]),
                        (h[c++] = 255 & (t >> 16)),
                        (h[c++] = 255 & (t >> 8)),
                        (h[c++] = 255 & t));
                    return (
                      2 === l &&
                        ((t =
                          (s[e.charCodeAt(r)] << 2) |
                          (s[e.charCodeAt(r + 1)] >> 4)),
                        (h[c++] = 255 & t)),
                      1 === l &&
                        ((t =
                          (s[e.charCodeAt(r)] << 10) |
                          (s[e.charCodeAt(r + 1)] << 4) |
                          (s[e.charCodeAt(r + 2)] >> 2)),
                        (h[c++] = 255 & (t >> 8)),
                        (h[c++] = 255 & t)),
                      h
                    );
                  }),
                  (r.fromByteArray = function (e) {
                    for (
                      var t, r = e.length, n = r % 3, s = [], o = 0, a = r - n;
                      o < a;
                      o += 16383
                    )
                      s.push(
                        (function (e, t, r) {
                          for (var n, s = [], o = t; o < r; o += 3)
                            s.push(
                              i[
                                63 &
                                  ((n =
                                    (16711680 & (e[o] << 16)) +
                                    (65280 & (e[o + 1] << 8)) +
                                    (255 & e[o + 2])) >>
                                    18)
                              ] +
                                i[63 & (n >> 12)] +
                                i[63 & (n >> 6)] +
                                i[63 & n],
                            );
                          return s.join("");
                        })(e, o, o + 16383 > a ? a : o + 16383),
                      );
                    return (
                      1 === n
                        ? s.push(
                            i[(t = e[r - 1]) >> 2] + i[63 & (t << 4)] + "==",
                          )
                        : 2 === n &&
                          s.push(
                            i[(t = (e[r - 2] << 8) + e[r - 1]) >> 10] +
                              i[63 & (t >> 4)] +
                              i[63 & (t << 2)] +
                              "=",
                          ),
                      s.join("")
                    );
                  }));
                for (
                  var i = [],
                    s = [],
                    o = "undefined" == typeof Uint8Array ? Array : Uint8Array,
                    a =
                      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
                    l = 0,
                    h = a.length;
                  l < h;
                  ++l
                )
                  ((i[l] = a[l]), (s[a.charCodeAt(l)] = l));
                ((s[45] = 62), (s[95] = 63));
              },
              {},
            ],
            2: [function () {}, {}],
            3: [
              function (e, t, r) {
                (function () {
                  (function () {
                    "use strict";
                    var t = String.fromCharCode,
                      i = Math.min;
                    function s(e) {
                      if (2147483647 < e)
                        throw RangeError(
                          'The value "' + e + '" is invalid for option "size"',
                        );
                      var t = new Uint8Array(e);
                      return ((t.__proto__ = o.prototype), t);
                    }
                    function o(e, t, r) {
                      if ("number" == typeof e) {
                        if ("string" == typeof t)
                          throw TypeError(
                            'The "string" argument must be of type string. Received type number',
                          );
                        return h(e);
                      }
                      return a(e, t, r);
                    }
                    function a(e, t, r) {
                      if ("string" == typeof e)
                        return (function (e, t) {
                          if (
                            (("string" != typeof t || "" === t) && (t = "utf8"),
                            !o.isEncoding(t))
                          )
                            throw TypeError("Unknown encoding: " + t);
                          var r = 0 | d(e, t),
                            n = s(r),
                            i = n.write(e, t);
                          return (i !== r && (n = n.slice(0, i)), n);
                        })(e, t);
                      if (ArrayBuffer.isView(e)) return c(e);
                      if (null == e)
                        throw TypeError(
                          "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " +
                            typeof e,
                        );
                      if (k(e, ArrayBuffer) || (e && k(e.buffer, ArrayBuffer)))
                        return (function (e, t, r) {
                          var n;
                          if (0 > t || e.byteLength < t)
                            throw RangeError(
                              '"offset" is outside of buffer bounds',
                            );
                          if (e.byteLength < t + (r || 0))
                            throw RangeError(
                              '"length" is outside of buffer bounds',
                            );
                          return (
                            ((n =
                              void 0 === t && void 0 === r
                                ? new Uint8Array(e)
                                : void 0 === r
                                  ? new Uint8Array(e, t)
                                  : new Uint8Array(e, t, r)).__proto__ =
                              o.prototype),
                            n
                          );
                        })(e, t, r);
                      if ("number" == typeof e)
                        throw TypeError(
                          'The "value" argument must not be of type number. Received type number',
                        );
                      var n = e.valueOf && e.valueOf();
                      if (null != n && n !== e) return o.from(n, t, r);
                      var i = (function (e) {
                        if (o.isBuffer(e)) {
                          var t,
                            r = 0 | u(e.length),
                            n = s(r);
                          return (0 === n.length || e.copy(n, 0, 0, r), n);
                        }
                        return void 0 === e.length
                          ? "Buffer" === e.type && Array.isArray(e.data)
                            ? c(e.data)
                            : void 0
                          : "number" != typeof e.length || (t = e.length) != t
                            ? s(0)
                            : c(e);
                      })(e);
                      if (i) return i;
                      if (
                        "undefined" != typeof Symbol &&
                        null != Symbol.toPrimitive &&
                        "function" == typeof e[Symbol.toPrimitive]
                      )
                        return o.from(e[Symbol.toPrimitive]("string"), t, r);
                      throw TypeError(
                        "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " +
                          typeof e,
                      );
                    }
                    function l(e) {
                      if ("number" != typeof e)
                        throw TypeError(
                          '"size" argument must be of type number',
                        );
                      if (0 > e)
                        throw RangeError(
                          'The value "' + e + '" is invalid for option "size"',
                        );
                    }
                    function h(e) {
                      return (l(e), s(0 > e ? 0 : 0 | u(e)));
                    }
                    function c(e) {
                      for (
                        var t = 0 > e.length ? 0 : 0 | u(e.length),
                          r = s(t),
                          n = 0;
                        n < t;
                        n += 1
                      )
                        r[n] = 255 & e[n];
                      return r;
                    }
                    function u(e) {
                      if (e >= 2147483647)
                        throw RangeError(
                          "Attempt to allocate Buffer larger than maximum size: 0x7fffffff bytes",
                        );
                      return 0 | e;
                    }
                    function d(e, t) {
                      if (o.isBuffer(e)) return e.length;
                      if (ArrayBuffer.isView(e) || k(e, ArrayBuffer))
                        return e.byteLength;
                      if ("string" != typeof e)
                        throw TypeError(
                          'The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type ' +
                            typeof e,
                        );
                      var r = e.length,
                        n = 2 < arguments.length && !0 === arguments[2];
                      if (!n && 0 === r) return 0;
                      for (var i = !1; ;)
                        switch (t) {
                          case "ascii":
                          case "latin1":
                          case "binary":
                            return r;
                          case "utf8":
                          case "utf-8":
                            return C(e).length;
                          case "ucs2":
                          case "ucs-2":
                          case "utf16le":
                          case "utf-16le":
                            return 2 * r;
                          case "hex":
                            return r >>> 1;
                          case "base64":
                            return S(e).length;
                          default:
                            if (i) return n ? -1 : C(e).length;
                            ((t = ("" + t).toLowerCase()), (i = !0));
                        }
                    }
                    function f(e, r, n) {
                      var s,
                        o,
                        a = !1;
                      if (
                        ((void 0 === r || 0 > r) && (r = 0),
                        r > this.length ||
                          ((void 0 === n || n > this.length) &&
                            (n = this.length),
                          0 >= n) ||
                          (n >>>= 0) <= (r >>>= 0))
                      )
                        return "";
                      for (e || (e = "utf8"); ;)
                        switch (e) {
                          case "hex":
                            return (function (e, t, r) {
                              var n,
                                i = e.length;
                              ((!t || 0 > t) && (t = 0),
                                (!r || 0 > r || r > i) && (r = i));
                              for (var s = "", o = t; o < r; ++o)
                                s +=
                                  16 > (n = e[o])
                                    ? "0" + n.toString(16)
                                    : n.toString(16);
                              return s;
                            })(this, r, n);
                          case "utf8":
                          case "utf-8":
                            return b(this, r, n);
                          case "ascii":
                            return (function (e, r, n) {
                              var s = "";
                              n = i(e.length, n);
                              for (var o = r; o < n; ++o) s += t(127 & e[o]);
                              return s;
                            })(this, r, n);
                          case "latin1":
                          case "binary":
                            return (function (e, r, n) {
                              var s = "";
                              n = i(e.length, n);
                              for (var o = r; o < n; ++o) s += t(e[o]);
                              return s;
                            })(this, r, n);
                          case "base64":
                            return (
                              (s = r),
                              (o = n),
                              0 === s && o === this.length
                                ? A.fromByteArray(this)
                                : A.fromByteArray(this.slice(s, o))
                            );
                          case "ucs2":
                          case "ucs-2":
                          case "utf16le":
                          case "utf-16le":
                            return (function (e, r, n) {
                              for (
                                var i = e.slice(r, n), s = "", o = 0;
                                o < i.length;
                                o += 2
                              )
                                s += t(i[o] + 256 * i[o + 1]);
                              return s;
                            })(this, r, n);
                          default:
                            if (a) throw TypeError("Unknown encoding: " + e);
                            ((e = (e + "").toLowerCase()), (a = !0));
                        }
                    }
                    function p(e, t, r) {
                      var n = e[t];
                      ((e[t] = e[r]), (e[r] = n));
                    }
                    function g(e, t, r, n, i) {
                      var s;
                      if (0 === e.length) return -1;
                      if (
                        ("string" == typeof r
                          ? ((n = r), (r = 0))
                          : 2147483647 < r
                            ? (r = 2147483647)
                            : -2147483648 > r && (r = -2147483648),
                        (s = r = +r) != s && (r = i ? 0 : e.length - 1),
                        0 > r && (r = e.length + r),
                        r >= e.length)
                      ) {
                        if (i) return -1;
                        r = e.length - 1;
                      } else if (0 > r) {
                        if (!i) return -1;
                        r = 0;
                      }
                      if (
                        ("string" == typeof t && (t = o.from(t, n)),
                        o.isBuffer(t))
                      )
                        return 0 === t.length ? -1 : y(e, t, r, n, i);
                      if ("number" == typeof t)
                        return (
                          (t &= 255),
                          "function" == typeof Uint8Array.prototype.indexOf
                            ? i
                              ? Uint8Array.prototype.indexOf.call(e, t, r)
                              : Uint8Array.prototype.lastIndexOf.call(e, t, r)
                            : y(e, [t], r, n, i)
                        );
                      throw TypeError("val must be string, number or Buffer");
                    }
                    function y(e, t, r, n, i) {
                      function s(e, t) {
                        return 1 === a ? e[t] : e.readUInt16BE(t * a);
                      }
                      var o,
                        a = 1,
                        l = e.length,
                        h = t.length;
                      if (
                        void 0 !== n &&
                        ("ucs2" === (n = (n + "").toLowerCase()) ||
                          "ucs-2" === n ||
                          "utf16le" === n ||
                          "utf-16le" === n)
                      ) {
                        if (2 > e.length || 2 > t.length) return -1;
                        ((a = 2), (l /= 2), (h /= 2), (r /= 2));
                      }
                      if (i) {
                        var c = -1;
                        for (o = r; o < l; o++)
                          if (s(e, o) !== s(t, -1 === c ? 0 : o - c))
                            (-1 !== c && (o -= o - c), (c = -1));
                          else if ((-1 === c && (c = o), o - c + 1 === h))
                            return c * a;
                      } else
                        for (r + h > l && (r = l - h), o = r; 0 <= o; o--) {
                          for (var u = !0, d = 0; d < h; d++)
                            if (s(e, o + d) !== s(t, d)) {
                              u = !1;
                              break;
                            }
                          if (u) return o;
                        }
                      return -1;
                    }
                    function b(e, r, n) {
                      n = i(e.length, n);
                      for (var s = [], o = r; o < n;) {
                        var a,
                          l,
                          h,
                          c,
                          u = e[o],
                          d = null,
                          f = 239 < u ? 4 : 223 < u ? 3 : 191 < u ? 2 : 1;
                        (o + f <= n &&
                          (1 === f
                            ? 128 > u && (d = u)
                            : 2 === f
                              ? 128 == (192 & (a = e[o + 1])) &&
                                127 < (c = ((31 & u) << 6) | (63 & a)) &&
                                (d = c)
                              : 3 === f
                                ? ((a = e[o + 1]),
                                  (l = e[o + 2]),
                                  128 == (192 & a) &&
                                    128 == (192 & l) &&
                                    2047 <
                                      (c =
                                        ((15 & u) << 12) |
                                        ((63 & a) << 6) |
                                        (63 & l)) &&
                                    (55296 > c || 57343 < c) &&
                                    (d = c))
                                : 4 === f &&
                                  ((a = e[o + 1]),
                                  (l = e[o + 2]),
                                  (h = e[o + 3]),
                                  128 == (192 & a) &&
                                    128 == (192 & l) &&
                                    128 == (192 & h) &&
                                    65535 <
                                      (c =
                                        ((15 & u) << 18) |
                                        ((63 & a) << 12) |
                                        ((63 & l) << 6) |
                                        (63 & h)) &&
                                    1114112 > c &&
                                    (d = c))),
                          null === d
                            ? ((d = 65533), (f = 1))
                            : 65535 < d &&
                              ((d -= 65536),
                              s.push(55296 | (1023 & (d >>> 10))),
                              (d = 56320 | (1023 & d))),
                          s.push(d),
                          (o += f));
                      }
                      return (function (e) {
                        var r = e.length;
                        if (r <= 4096) return t.apply(String, e);
                        for (var n = "", i = 0; i < r;)
                          n += t.apply(String, e.slice(i, (i += 4096)));
                        return n;
                      })(s);
                    }
                    function m(e, t, r) {
                      if (0 != e % 1 || 0 > e)
                        throw RangeError("offset is not uint");
                      if (e + t > r)
                        throw RangeError(
                          "Trying to access beyond buffer length",
                        );
                    }
                    function _(e, t, r, n, i, s) {
                      if (!o.isBuffer(e))
                        throw TypeError(
                          '"buffer" argument must be a Buffer instance',
                        );
                      if (t > i || t < s)
                        throw RangeError('"value" argument is out of bounds');
                      if (r + n > e.length)
                        throw RangeError("Index out of range");
                    }
                    function v(e, t, r, n) {
                      if (r + n > e.length || 0 > r)
                        throw RangeError("Index out of range");
                    }
                    function w(e, t, r, n, i) {
                      return (
                        (t = +t),
                        (r >>>= 0),
                        i ||
                          v(
                            e,
                            t,
                            r,
                            4,
                            34028234663852886e22,
                            -34028234663852886e22,
                          ),
                        L.write(e, t, r, n, 23, 4),
                        r + 4
                      );
                    }
                    function E(e, t, r, n, i) {
                      return (
                        (t = +t),
                        (r >>>= 0),
                        i ||
                          v(
                            e,
                            t,
                            r,
                            8,
                            17976931348623157e292,
                            -17976931348623157e292,
                          ),
                        L.write(e, t, r, n, 52, 8),
                        r + 8
                      );
                    }
                    function C(e, t) {
                      t = t || 1 / 0;
                      for (
                        var r, n = e.length, i = null, s = [], o = 0;
                        o < n;
                        ++o
                      ) {
                        if (55295 < (r = e.charCodeAt(o)) && 57344 > r) {
                          if (!i) {
                            if (56319 < r || o + 1 === n) {
                              -1 < (t -= 3) && s.push(239, 191, 189);
                              continue;
                            }
                            i = r;
                            continue;
                          }
                          if (56320 > r) {
                            (-1 < (t -= 3) && s.push(239, 191, 189), (i = r));
                            continue;
                          }
                          r = (((i - 55296) << 10) | (r - 56320)) + 65536;
                        } else i && -1 < (t -= 3) && s.push(239, 191, 189);
                        if (((i = null), 128 > r)) {
                          if (0 > (t -= 1)) break;
                          s.push(r);
                        } else if (2048 > r) {
                          if (0 > (t -= 2)) break;
                          s.push(192 | (r >> 6), 128 | (63 & r));
                        } else if (65536 > r) {
                          if (0 > (t -= 3)) break;
                          s.push(
                            224 | (r >> 12),
                            128 | (63 & (r >> 6)),
                            128 | (63 & r),
                          );
                        } else if (1114112 > r) {
                          if (0 > (t -= 4)) break;
                          s.push(
                            240 | (r >> 18),
                            128 | (63 & (r >> 12)),
                            128 | (63 & (r >> 6)),
                            128 | (63 & r),
                          );
                        } else throw Error("Invalid code point");
                      }
                      return s;
                    }
                    function R(e) {
                      for (var t = [], r = 0; r < e.length; ++r)
                        t.push(255 & e.charCodeAt(r));
                      return t;
                    }
                    function S(e) {
                      return A.toByteArray(
                        (function (e) {
                          if (
                            2 >
                            (e = (e = e.split("=")[0]).trim().replace(O, ""))
                              .length
                          )
                            return "";
                          for (; 0 != e.length % 4;) e += "=";
                          return e;
                        })(e),
                      );
                    }
                    function T(e, t, r, n) {
                      for (
                        var i = 0;
                        i < n && !(i + r >= t.length || i >= e.length);
                        ++i
                      )
                        t[i + r] = e[i];
                      return i;
                    }
                    function k(e, t) {
                      return (
                        e instanceof t ||
                        (null != e &&
                          null != e.constructor &&
                          null != e.constructor.name &&
                          e.constructor.name === t.name)
                      );
                    }
                    var A = e("base64-js"),
                      L = e("ieee754");
                    ((r.Buffer = o),
                      (r.SlowBuffer = function (e) {
                        return (+e != e && (e = 0), o.alloc(+e));
                      }),
                      (r.INSPECT_MAX_BYTES = 50),
                      (r.kMaxLength = 2147483647),
                      (o.TYPED_ARRAY_SUPPORT = (function () {
                        try {
                          var e = new Uint8Array(1);
                          return (
                            (e.__proto__ = {
                              __proto__: Uint8Array.prototype,
                              foo: function () {
                                return 42;
                              },
                            }),
                            42 === e.foo()
                          );
                        } catch (e) {
                          return !1;
                        }
                      })()),
                      o.TYPED_ARRAY_SUPPORT ||
                        "undefined" == typeof console ||
                        "function" != typeof console.error ||
                        console.error(
                          "This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support.",
                        ),
                      Object.defineProperty(o.prototype, "parent", {
                        enumerable: !0,
                        get: function () {
                          return o.isBuffer(this) ? this.buffer : void 0;
                        },
                      }),
                      Object.defineProperty(o.prototype, "offset", {
                        enumerable: !0,
                        get: function () {
                          return o.isBuffer(this) ? this.byteOffset : void 0;
                        },
                      }),
                      "undefined" != typeof Symbol &&
                        null != Symbol.species &&
                        o[Symbol.species] === o &&
                        Object.defineProperty(o, Symbol.species, {
                          value: null,
                          configurable: !0,
                          enumerable: !1,
                          writable: !1,
                        }),
                      (o.poolSize = 8192),
                      (o.from = function (e, t, r) {
                        return a(e, t, r);
                      }),
                      (o.prototype.__proto__ = Uint8Array.prototype),
                      (o.__proto__ = Uint8Array),
                      (o.alloc = function (e, t, r) {
                        return (
                          l(e),
                          0 >= e
                            ? s(e)
                            : void 0 === t
                              ? s(e)
                              : "string" == typeof r
                                ? s(e).fill(t, r)
                                : s(e).fill(t)
                        );
                      }),
                      (o.allocUnsafe = function (e) {
                        return h(e);
                      }),
                      (o.allocUnsafeSlow = function (e) {
                        return h(e);
                      }),
                      (o.isBuffer = function (e) {
                        return (
                          null != e && !0 === e._isBuffer && e !== o.prototype
                        );
                      }),
                      (o.compare = function (e, t) {
                        if (
                          (k(e, Uint8Array) &&
                            (e = o.from(e, e.offset, e.byteLength)),
                          k(t, Uint8Array) &&
                            (t = o.from(t, t.offset, t.byteLength)),
                          !o.isBuffer(e) || !o.isBuffer(t))
                        )
                          throw TypeError(
                            'The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array',
                          );
                        if (e === t) return 0;
                        for (
                          var r = e.length, n = t.length, s = 0, a = i(r, n);
                          s < a;
                          ++s
                        )
                          if (e[s] !== t[s]) {
                            ((r = e[s]), (n = t[s]));
                            break;
                          }
                        return r < n ? -1 : n < r ? 1 : 0;
                      }),
                      (o.isEncoding = function (e) {
                        switch ((e + "").toLowerCase()) {
                          case "hex":
                          case "utf8":
                          case "utf-8":
                          case "ascii":
                          case "latin1":
                          case "binary":
                          case "base64":
                          case "ucs2":
                          case "ucs-2":
                          case "utf16le":
                          case "utf-16le":
                            return !0;
                          default:
                            return !1;
                        }
                      }),
                      (o.concat = function (e, t) {
                        if (!Array.isArray(e))
                          throw TypeError(
                            '"list" argument must be an Array of Buffers',
                          );
                        if (0 === e.length) return o.alloc(0);
                        if (void 0 === t)
                          for (t = 0, r = 0; r < e.length; ++r)
                            t += e[r].length;
                        var r,
                          n = o.allocUnsafe(t),
                          i = 0;
                        for (r = 0; r < e.length; ++r) {
                          var s = e[r];
                          if (
                            (k(s, Uint8Array) && (s = o.from(s)),
                            !o.isBuffer(s))
                          )
                            throw TypeError(
                              '"list" argument must be an Array of Buffers',
                            );
                          (s.copy(n, i), (i += s.length));
                        }
                        return n;
                      }),
                      (o.byteLength = d),
                      (o.prototype._isBuffer = !0),
                      (o.prototype.swap16 = function () {
                        var e = this.length;
                        if (0 != e % 2)
                          throw RangeError(
                            "Buffer size must be a multiple of 16-bits",
                          );
                        for (var t = 0; t < e; t += 2) p(this, t, t + 1);
                        return this;
                      }),
                      (o.prototype.swap32 = function () {
                        var e = this.length;
                        if (0 != e % 4)
                          throw RangeError(
                            "Buffer size must be a multiple of 32-bits",
                          );
                        for (var t = 0; t < e; t += 4)
                          (p(this, t, t + 3), p(this, t + 1, t + 2));
                        return this;
                      }),
                      (o.prototype.swap64 = function () {
                        var e = this.length;
                        if (0 != e % 8)
                          throw RangeError(
                            "Buffer size must be a multiple of 64-bits",
                          );
                        for (var t = 0; t < e; t += 8)
                          (p(this, t, t + 7),
                            p(this, t + 1, t + 6),
                            p(this, t + 2, t + 5),
                            p(this, t + 3, t + 4));
                        return this;
                      }),
                      (o.prototype.toString = function () {
                        var e = this.length;
                        return 0 === e
                          ? ""
                          : 0 == arguments.length
                            ? b(this, 0, e)
                            : f.apply(this, arguments);
                      }),
                      (o.prototype.toLocaleString = o.prototype.toString),
                      (o.prototype.equals = function (e) {
                        if (!o.isBuffer(e))
                          throw TypeError("Argument must be a Buffer");
                        return this === e || 0 === o.compare(this, e);
                      }),
                      (o.prototype.inspect = function () {
                        var e = "",
                          t = r.INSPECT_MAX_BYTES;
                        return (
                          (e = this.toString("hex", 0, t)
                            .replace(/(.{2})/g, "$1 ")
                            .trim()),
                          this.length > t && (e += " ... "),
                          "<Buffer " + e + ">"
                        );
                      }),
                      (o.prototype.compare = function (e, t, r, n, s) {
                        if (
                          (k(e, Uint8Array) &&
                            (e = o.from(e, e.offset, e.byteLength)),
                          !o.isBuffer(e))
                        )
                          throw TypeError(
                            'The "target" argument must be one of type Buffer or Uint8Array. Received type ' +
                              typeof e,
                          );
                        if (
                          (void 0 === t && (t = 0),
                          void 0 === r && (r = e ? e.length : 0),
                          void 0 === n && (n = 0),
                          void 0 === s && (s = this.length),
                          0 > t || r > e.length || 0 > n || s > this.length)
                        )
                          throw RangeError("out of range index");
                        if (n >= s && t >= r) return 0;
                        if (n >= s) return -1;
                        if (t >= r) return 1;
                        if (
                          ((t >>>= 0),
                          (r >>>= 0),
                          (n >>>= 0),
                          (s >>>= 0),
                          this === e)
                        )
                          return 0;
                        for (
                          var a = s - n,
                            l = r - t,
                            h = i(a, l),
                            c = this.slice(n, s),
                            u = e.slice(t, r),
                            d = 0;
                          d < h;
                          ++d
                        )
                          if (c[d] !== u[d]) {
                            ((a = c[d]), (l = u[d]));
                            break;
                          }
                        return a < l ? -1 : l < a ? 1 : 0;
                      }),
                      (o.prototype.includes = function (e, t, r) {
                        return -1 !== this.indexOf(e, t, r);
                      }),
                      (o.prototype.indexOf = function (e, t, r) {
                        return g(this, e, t, r, !0);
                      }),
                      (o.prototype.lastIndexOf = function (e, t, r) {
                        return g(this, e, t, r, !1);
                      }),
                      (o.prototype.write = function (e, t, r, n) {
                        if (void 0 === t)
                          ((n = "utf8"), (r = this.length), (t = 0));
                        else if (void 0 === r && "string" == typeof t)
                          ((n = t), (r = this.length), (t = 0));
                        else if (isFinite(t))
                          ((t >>>= 0),
                            isFinite(r)
                              ? ((r >>>= 0), void 0 === n && (n = "utf8"))
                              : ((n = r), (r = void 0)));
                        else
                          throw Error(
                            "Buffer.write(string, encoding, offset[, length]) is no longer supported",
                          );
                        var i,
                          s,
                          o,
                          a,
                          l,
                          h,
                          c,
                          u,
                          d,
                          f,
                          p,
                          g,
                          y = this.length - t;
                        if (
                          ((void 0 === r || r > y) && (r = y),
                          (0 < e.length && (0 > r || 0 > t)) || t > this.length)
                        )
                          throw RangeError(
                            "Attempt to write outside buffer bounds",
                          );
                        n || (n = "utf8");
                        for (var b = !1; ;)
                          switch (n) {
                            case "hex":
                              return (function (e, t, r, n) {
                                r = +r || 0;
                                var i = e.length - r;
                                n ? (n = +n) > i && (n = i) : (n = i);
                                var s = t.length;
                                n > s / 2 && (n = s / 2);
                                for (
                                  var o, a, l = 0;
                                  l < n &&
                                  !(
                                    (o = a =
                                      parseInt(t.substr(2 * l, 2), 16)) != o
                                  );
                                  ++l
                                )
                                  e[r + l] = a;
                                return l;
                              })(this, e, t, r);
                            case "utf8":
                            case "utf-8":
                              return (
                                (l = t),
                                (h = r),
                                T(C(e, this.length - l), this, l, h)
                              );
                            case "ascii":
                              return ((c = t), (u = r), T(R(e), this, c, u));
                            case "latin1":
                            case "binary":
                              return (
                                (i = this),
                                (s = e),
                                (o = t),
                                (a = r),
                                T(R(s), i, o, a)
                              );
                            case "base64":
                              return ((d = t), (f = r), T(S(e), this, d, f));
                            case "ucs2":
                            case "ucs-2":
                            case "utf16le":
                            case "utf-16le":
                              return (
                                (p = t),
                                (g = r),
                                T(
                                  (function (e, t) {
                                    for (
                                      var r, n, i = [], s = 0;
                                      s < e.length && !(0 > (t -= 2));
                                      ++s
                                    )
                                      ((n = (r = e.charCodeAt(s)) >> 8),
                                        i.push(r % 256),
                                        i.push(n));
                                    return i;
                                  })(e, this.length - p),
                                  this,
                                  p,
                                  g,
                                )
                              );
                            default:
                              if (b) throw TypeError("Unknown encoding: " + n);
                              ((n = ("" + n).toLowerCase()), (b = !0));
                          }
                      }),
                      (o.prototype.toJSON = function () {
                        return {
                          type: "Buffer",
                          data: Array.prototype.slice.call(
                            this._arr || this,
                            0,
                          ),
                        };
                      }),
                      (o.prototype.slice = function (e, t) {
                        var r = this.length;
                        ((e = ~~e),
                          (t = void 0 === t ? r : ~~t),
                          0 > e ? 0 > (e += r) && (e = 0) : e > r && (e = r),
                          0 > t ? 0 > (t += r) && (t = 0) : t > r && (t = r),
                          t < e && (t = e));
                        var n = this.subarray(e, t);
                        return ((n.__proto__ = o.prototype), n);
                      }),
                      (o.prototype.readUIntLE = function (e, t, r) {
                        ((e >>>= 0), (t >>>= 0), r || m(e, t, this.length));
                        for (
                          var n = this[e], i = 1, s = 0;
                          ++s < t && (i *= 256);
                        )
                          n += this[e + s] * i;
                        return n;
                      }),
                      (o.prototype.readUIntBE = function (e, t, r) {
                        ((e >>>= 0), (t >>>= 0), r || m(e, t, this.length));
                        for (var n = this[e + --t], i = 1; 0 < t && (i *= 256);)
                          n += this[e + --t] * i;
                        return n;
                      }),
                      (o.prototype.readUInt8 = function (e, t) {
                        return ((e >>>= 0), t || m(e, 1, this.length), this[e]);
                      }),
                      (o.prototype.readUInt16LE = function (e, t) {
                        return (
                          (e >>>= 0),
                          t || m(e, 2, this.length),
                          this[e] | (this[e + 1] << 8)
                        );
                      }),
                      (o.prototype.readUInt16BE = function (e, t) {
                        return (
                          (e >>>= 0),
                          t || m(e, 2, this.length),
                          (this[e] << 8) | this[e + 1]
                        );
                      }),
                      (o.prototype.readUInt32LE = function (e, t) {
                        return (
                          (e >>>= 0),
                          t || m(e, 4, this.length),
                          (this[e] | (this[e + 1] << 8) | (this[e + 2] << 16)) +
                            16777216 * this[e + 3]
                        );
                      }),
                      (o.prototype.readUInt32BE = function (e, t) {
                        return (
                          (e >>>= 0),
                          t || m(e, 4, this.length),
                          16777216 * this[e] +
                            ((this[e + 1] << 16) |
                              (this[e + 2] << 8) |
                              this[e + 3])
                        );
                      }),
                      (o.prototype.readIntLE = function (e, t, r) {
                        ((e >>>= 0), (t >>>= 0), r || m(e, t, this.length));
                        for (
                          var i = this[e], s = 1, o = 0;
                          ++o < t && (s *= 256);
                        )
                          i += this[e + o] * s;
                        return (i >= (s *= 128) && (i -= n(2, 8 * t)), i);
                      }),
                      (o.prototype.readIntBE = function (e, t, r) {
                        ((e >>>= 0), (t >>>= 0), r || m(e, t, this.length));
                        for (
                          var i = t, s = 1, o = this[e + --i];
                          0 < i && (s *= 256);
                        )
                          o += this[e + --i] * s;
                        return (o >= (s *= 128) && (o -= n(2, 8 * t)), o);
                      }),
                      (o.prototype.readInt8 = function (e, t) {
                        return (
                          (e >>>= 0),
                          t || m(e, 1, this.length),
                          128 & this[e] ? -1 * (255 - this[e] + 1) : this[e]
                        );
                      }),
                      (o.prototype.readInt16LE = function (e, t) {
                        ((e >>>= 0), t || m(e, 2, this.length));
                        var r = this[e] | (this[e + 1] << 8);
                        return 32768 & r ? 4294901760 | r : r;
                      }),
                      (o.prototype.readInt16BE = function (e, t) {
                        ((e >>>= 0), t || m(e, 2, this.length));
                        var r = this[e + 1] | (this[e] << 8);
                        return 32768 & r ? 4294901760 | r : r;
                      }),
                      (o.prototype.readInt32LE = function (e, t) {
                        return (
                          (e >>>= 0),
                          t || m(e, 4, this.length),
                          this[e] |
                            (this[e + 1] << 8) |
                            (this[e + 2] << 16) |
                            (this[e + 3] << 24)
                        );
                      }),
                      (o.prototype.readInt32BE = function (e, t) {
                        return (
                          (e >>>= 0),
                          t || m(e, 4, this.length),
                          (this[e] << 24) |
                            (this[e + 1] << 16) |
                            (this[e + 2] << 8) |
                            this[e + 3]
                        );
                      }),
                      (o.prototype.readFloatLE = function (e, t) {
                        return (
                          (e >>>= 0),
                          t || m(e, 4, this.length),
                          L.read(this, e, !0, 23, 4)
                        );
                      }),
                      (o.prototype.readFloatBE = function (e, t) {
                        return (
                          (e >>>= 0),
                          t || m(e, 4, this.length),
                          L.read(this, e, !1, 23, 4)
                        );
                      }),
                      (o.prototype.readDoubleLE = function (e, t) {
                        return (
                          (e >>>= 0),
                          t || m(e, 8, this.length),
                          L.read(this, e, !0, 52, 8)
                        );
                      }),
                      (o.prototype.readDoubleBE = function (e, t) {
                        return (
                          (e >>>= 0),
                          t || m(e, 8, this.length),
                          L.read(this, e, !1, 52, 8)
                        );
                      }),
                      (o.prototype.writeUIntLE = function (e, t, r, i) {
                        if (((e = +e), (t >>>= 0), (r >>>= 0), !i)) {
                          var s = n(2, 8 * r) - 1;
                          _(this, e, t, r, s, 0);
                        }
                        var o = 1,
                          a = 0;
                        for (this[t] = 255 & e; ++a < r && (o *= 256);)
                          this[t + a] = 255 & (e / o);
                        return t + r;
                      }),
                      (o.prototype.writeUIntBE = function (e, t, r, i) {
                        if (((e = +e), (t >>>= 0), (r >>>= 0), !i)) {
                          var s = n(2, 8 * r) - 1;
                          _(this, e, t, r, s, 0);
                        }
                        var o = r - 1,
                          a = 1;
                        for (this[t + o] = 255 & e; 0 <= --o && (a *= 256);)
                          this[t + o] = 255 & (e / a);
                        return t + r;
                      }),
                      (o.prototype.writeUInt8 = function (e, t, r) {
                        return (
                          (e = +e),
                          (t >>>= 0),
                          r || _(this, e, t, 1, 255, 0),
                          (this[t] = 255 & e),
                          t + 1
                        );
                      }),
                      (o.prototype.writeUInt16LE = function (e, t, r) {
                        return (
                          (e = +e),
                          (t >>>= 0),
                          r || _(this, e, t, 2, 65535, 0),
                          (this[t] = 255 & e),
                          (this[t + 1] = e >>> 8),
                          t + 2
                        );
                      }),
                      (o.prototype.writeUInt16BE = function (e, t, r) {
                        return (
                          (e = +e),
                          (t >>>= 0),
                          r || _(this, e, t, 2, 65535, 0),
                          (this[t] = e >>> 8),
                          (this[t + 1] = 255 & e),
                          t + 2
                        );
                      }),
                      (o.prototype.writeUInt32LE = function (e, t, r) {
                        return (
                          (e = +e),
                          (t >>>= 0),
                          r || _(this, e, t, 4, 4294967295, 0),
                          (this[t + 3] = e >>> 24),
                          (this[t + 2] = e >>> 16),
                          (this[t + 1] = e >>> 8),
                          (this[t] = 255 & e),
                          t + 4
                        );
                      }),
                      (o.prototype.writeUInt32BE = function (e, t, r) {
                        return (
                          (e = +e),
                          (t >>>= 0),
                          r || _(this, e, t, 4, 4294967295, 0),
                          (this[t] = e >>> 24),
                          (this[t + 1] = e >>> 16),
                          (this[t + 2] = e >>> 8),
                          (this[t + 3] = 255 & e),
                          t + 4
                        );
                      }),
                      (o.prototype.writeIntLE = function (e, t, r, i) {
                        if (((e = +e), (t >>>= 0), !i)) {
                          var s = n(2, 8 * r - 1);
                          _(this, e, t, r, s - 1, -s);
                        }
                        var o = 0,
                          a = 1,
                          l = 0;
                        for (this[t] = 255 & e; ++o < r && (a *= 256);)
                          (0 > e && 0 === l && 0 !== this[t + o - 1] && (l = 1),
                            (this[t + o] = 255 & (((e / a) >> 0) - l)));
                        return t + r;
                      }),
                      (o.prototype.writeIntBE = function (e, t, r, i) {
                        if (((e = +e), (t >>>= 0), !i)) {
                          var s = n(2, 8 * r - 1);
                          _(this, e, t, r, s - 1, -s);
                        }
                        var o = r - 1,
                          a = 1,
                          l = 0;
                        for (this[t + o] = 255 & e; 0 <= --o && (a *= 256);)
                          (0 > e && 0 === l && 0 !== this[t + o + 1] && (l = 1),
                            (this[t + o] = 255 & (((e / a) >> 0) - l)));
                        return t + r;
                      }),
                      (o.prototype.writeInt8 = function (e, t, r) {
                        return (
                          (e = +e),
                          (t >>>= 0),
                          r || _(this, e, t, 1, 127, -128),
                          0 > e && (e = 255 + e + 1),
                          (this[t] = 255 & e),
                          t + 1
                        );
                      }),
                      (o.prototype.writeInt16LE = function (e, t, r) {
                        return (
                          (e = +e),
                          (t >>>= 0),
                          r || _(this, e, t, 2, 32767, -32768),
                          (this[t] = 255 & e),
                          (this[t + 1] = e >>> 8),
                          t + 2
                        );
                      }),
                      (o.prototype.writeInt16BE = function (e, t, r) {
                        return (
                          (e = +e),
                          (t >>>= 0),
                          r || _(this, e, t, 2, 32767, -32768),
                          (this[t] = e >>> 8),
                          (this[t + 1] = 255 & e),
                          t + 2
                        );
                      }),
                      (o.prototype.writeInt32LE = function (e, t, r) {
                        return (
                          (e = +e),
                          (t >>>= 0),
                          r || _(this, e, t, 4, 2147483647, -2147483648),
                          (this[t] = 255 & e),
                          (this[t + 1] = e >>> 8),
                          (this[t + 2] = e >>> 16),
                          (this[t + 3] = e >>> 24),
                          t + 4
                        );
                      }),
                      (o.prototype.writeInt32BE = function (e, t, r) {
                        return (
                          (e = +e),
                          (t >>>= 0),
                          r || _(this, e, t, 4, 2147483647, -2147483648),
                          0 > e && (e = 4294967295 + e + 1),
                          (this[t] = e >>> 24),
                          (this[t + 1] = e >>> 16),
                          (this[t + 2] = e >>> 8),
                          (this[t + 3] = 255 & e),
                          t + 4
                        );
                      }),
                      (o.prototype.writeFloatLE = function (e, t, r) {
                        return w(this, e, t, !0, r);
                      }),
                      (o.prototype.writeFloatBE = function (e, t, r) {
                        return w(this, e, t, !1, r);
                      }),
                      (o.prototype.writeDoubleLE = function (e, t, r) {
                        return E(this, e, t, !0, r);
                      }),
                      (o.prototype.writeDoubleBE = function (e, t, r) {
                        return E(this, e, t, !1, r);
                      }),
                      (o.prototype.copy = function (e, t, r, n) {
                        if (!o.isBuffer(e))
                          throw TypeError("argument should be a Buffer");
                        if (
                          (r || (r = 0),
                          n || 0 === n || (n = this.length),
                          t >= e.length && (t = e.length),
                          t || (t = 0),
                          0 < n && n < r && (n = r),
                          n === r || 0 === e.length || 0 === this.length)
                        )
                          return 0;
                        if (0 > t)
                          throw RangeError("targetStart out of bounds");
                        if (0 > r || r >= this.length)
                          throw RangeError("Index out of range");
                        if (0 > n) throw RangeError("sourceEnd out of bounds");
                        (n > this.length && (n = this.length),
                          e.length - t < n - r && (n = e.length - t + r));
                        var i = n - r;
                        if (
                          this === e &&
                          "function" == typeof Uint8Array.prototype.copyWithin
                        )
                          this.copyWithin(t, r, n);
                        else if (this === e && r < t && t < n)
                          for (var s = i - 1; 0 <= s; --s)
                            e[s + t] = this[s + r];
                        else
                          Uint8Array.prototype.set.call(
                            e,
                            this.subarray(r, n),
                            t,
                          );
                        return i;
                      }),
                      (o.prototype.fill = function (e, t, r, n) {
                        if ("string" == typeof e) {
                          if (
                            ("string" == typeof t
                              ? ((n = t), (t = 0), (r = this.length))
                              : "string" == typeof r &&
                                ((n = r), (r = this.length)),
                            void 0 !== n && "string" != typeof n)
                          )
                            throw TypeError("encoding must be a string");
                          if ("string" == typeof n && !o.isEncoding(n))
                            throw TypeError("Unknown encoding: " + n);
                          if (1 === e.length) {
                            var i,
                              s = e.charCodeAt(0);
                            (("utf8" === n && 128 > s) || "latin1" === n) &&
                              (e = s);
                          }
                        } else "number" == typeof e && (e &= 255);
                        if (0 > t || this.length < t || this.length < r)
                          throw RangeError("Out of range index");
                        if (r <= t) return this;
                        if (
                          ((t >>>= 0),
                          (r = void 0 === r ? this.length : r >>> 0),
                          e || (e = 0),
                          "number" == typeof e)
                        )
                          for (i = t; i < r; ++i) this[i] = e;
                        else {
                          var a = o.isBuffer(e) ? e : o.from(e, n),
                            l = a.length;
                          if (0 === l)
                            throw TypeError(
                              'The value "' +
                                e +
                                '" is invalid for argument "value"',
                            );
                          for (i = 0; i < r - t; ++i) this[i + t] = a[i % l];
                        }
                        return this;
                      }));
                    var O = /[^+/0-9A-Za-z-_]/g;
                  }).call(this);
                }).call(this, e("buffer").Buffer);
              },
              { "base64-js": 1, buffer: 3, ieee754: 9 },
            ],
            4: [
              function (e, t, r) {
                (function (n) {
                  (function () {
                    let i;
                    ((r.formatArgs = function (e) {
                      if (
                        ((e[0] =
                          (this.useColors ? "%c" : "") +
                          this.namespace +
                          (this.useColors ? " %c" : " ") +
                          e[0] +
                          (this.useColors ? "%c " : " ") +
                          "+" +
                          t.exports.humanize(this.diff)),
                        !this.useColors)
                      )
                        return;
                      let r = "color: " + this.color;
                      e.splice(1, 0, r, "color: inherit");
                      let n = 0,
                        i = 0;
                      (e[0].replace(/%[a-zA-Z%]/g, (e) => {
                        "%%" === e || (n++, "%c" === e && (i = n));
                      }),
                        e.splice(i, 0, r));
                    }),
                      (r.save = function (e) {
                        try {
                          e
                            ? r.storage.setItem("debug", e)
                            : r.storage.removeItem("debug");
                        } catch (e) {}
                      }),
                      (r.load = function () {
                        let e;
                        try {
                          e = r.storage.getItem("debug");
                        } catch (e) {}
                        return (
                          !e && void 0 !== n && "env" in n && (e = n.env.DEBUG),
                          e
                        );
                      }),
                      (r.useColors = function () {
                        return (
                          !!(
                            "undefined" != typeof window &&
                            window.process &&
                            ("renderer" === window.process.type ||
                              window.process.__nwjs)
                          ) ||
                          (!(
                            "undefined" != typeof navigator &&
                            navigator.userAgent &&
                            navigator.userAgent
                              .toLowerCase()
                              .match(/(edge|trident)\/(\d+)/)
                          ) &&
                            (("undefined" != typeof document &&
                              document.documentElement &&
                              document.documentElement.style &&
                              document.documentElement.style
                                .WebkitAppearance) ||
                              ("undefined" != typeof window &&
                                window.console &&
                                (window.console.firebug ||
                                  (window.console.exception &&
                                    window.console.table))) ||
                              ("undefined" != typeof navigator &&
                                navigator.userAgent &&
                                navigator.userAgent
                                  .toLowerCase()
                                  .match(/firefox\/(\d+)/) &&
                                31 <= parseInt(RegExp.$1, 10)) ||
                              ("undefined" != typeof navigator &&
                                navigator.userAgent &&
                                navigator.userAgent
                                  .toLowerCase()
                                  .match(/applewebkit\/(\d+)/))))
                        );
                      }),
                      (r.storage = (function () {
                        try {
                          return localStorage;
                        } catch (e) {}
                      })()),
                      (r.destroy =
                        ((i = !1),
                        () => {
                          i ||
                            ((i = !0),
                            console.warn(
                              "Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.",
                            ));
                        })),
                      (r.colors = [
                        "#0000CC",
                        "#0000FF",
                        "#0033CC",
                        "#0033FF",
                        "#0066CC",
                        "#0066FF",
                        "#0099CC",
                        "#0099FF",
                        "#00CC00",
                        "#00CC33",
                        "#00CC66",
                        "#00CC99",
                        "#00CCCC",
                        "#00CCFF",
                        "#3300CC",
                        "#3300FF",
                        "#3333CC",
                        "#3333FF",
                        "#3366CC",
                        "#3366FF",
                        "#3399CC",
                        "#3399FF",
                        "#33CC00",
                        "#33CC33",
                        "#33CC66",
                        "#33CC99",
                        "#33CCCC",
                        "#33CCFF",
                        "#6600CC",
                        "#6600FF",
                        "#6633CC",
                        "#6633FF",
                        "#66CC00",
                        "#66CC33",
                        "#9900CC",
                        "#9900FF",
                        "#9933CC",
                        "#9933FF",
                        "#99CC00",
                        "#99CC33",
                        "#CC0000",
                        "#CC0033",
                        "#CC0066",
                        "#CC0099",
                        "#CC00CC",
                        "#CC00FF",
                        "#CC3300",
                        "#CC3333",
                        "#CC3366",
                        "#CC3399",
                        "#CC33CC",
                        "#CC33FF",
                        "#CC6600",
                        "#CC6633",
                        "#CC9900",
                        "#CC9933",
                        "#CCCC00",
                        "#CCCC33",
                        "#FF0000",
                        "#FF0033",
                        "#FF0066",
                        "#FF0099",
                        "#FF00CC",
                        "#FF00FF",
                        "#FF3300",
                        "#FF3333",
                        "#FF3366",
                        "#FF3399",
                        "#FF33CC",
                        "#FF33FF",
                        "#FF6600",
                        "#FF6633",
                        "#FF9900",
                        "#FF9933",
                        "#FFCC00",
                        "#FFCC33",
                      ]),
                      (r.log = console.debug || console.log || (() => {})),
                      (t.exports = e("./common")(r)));
                    let { formatters: s } = t.exports;
                    s.j = function (e) {
                      try {
                        return JSON.stringify(e);
                      } catch (e) {
                        return "[UnexpectedJSONParseError]: " + e.message;
                      }
                    };
                  }).call(this);
                }).call(this, e("_process"));
              },
              { "./common": 5, _process: 12 },
            ],
            5: [
              function (e, r) {
                r.exports = function (r) {
                  function n(e) {
                    function t(...e) {
                      if (!t.enabled) return;
                      let i = +new Date(),
                        s = i - (r || i);
                      ((t.diff = s),
                        (t.prev = r),
                        (t.curr = i),
                        (r = i),
                        (e[0] = n.coerce(e[0])),
                        "string" != typeof e[0] && e.unshift("%O"));
                      let o = 0;
                      ((e[0] = e[0].replace(/%([a-zA-Z%])/g, (r, i) => {
                        if ("%%" === r) return "%";
                        o++;
                        let s = n.formatters[i];
                        if ("function" == typeof s) {
                          let n = e[o];
                          ((r = s.call(t, n)), e.splice(o, 1), o--);
                        }
                        return r;
                      })),
                        n.formatArgs.call(t, e),
                        (t.log || n.log).apply(t, e));
                    }
                    let r,
                      s = null;
                    return (
                      (t.namespace = e),
                      (t.useColors = n.useColors()),
                      (t.color = n.selectColor(e)),
                      (t.extend = i),
                      (t.destroy = n.destroy),
                      Object.defineProperty(t, "enabled", {
                        enumerable: !0,
                        configurable: !1,
                        get: () => (null === s ? n.enabled(e) : s),
                        set: (e) => {
                          s = e;
                        },
                      }),
                      "function" == typeof n.init && n.init(t),
                      t
                    );
                  }
                  function i(e, t) {
                    let r = n(this.namespace + (void 0 === t ? ":" : t) + e);
                    return ((r.log = this.log), r);
                  }
                  function s(e) {
                    return e
                      .toString()
                      .substring(2, e.toString().length - 2)
                      .replace(/\.\*\?$/, "*");
                  }
                  return (
                    (n.debug = n),
                    (n.default = n),
                    (n.coerce = function (e) {
                      return e instanceof Error ? e.stack || e.message : e;
                    }),
                    (n.disable = function () {
                      let e = [
                        ...n.names.map(s),
                        ...n.skips.map(s).map((e) => "-" + e),
                      ].join(",");
                      return (n.enable(""), e);
                    }),
                    (n.enable = function (e) {
                      let t;
                      (n.save(e), (n.names = []), (n.skips = []));
                      let r = ("string" == typeof e ? e : "").split(/[\s,]+/),
                        i = r.length;
                      for (t = 0; t < i; t++)
                        r[t] &&
                          ("-" === (e = r[t].replace(/\*/g, ".*?"))[0]
                            ? n.skips.push(RegExp("^" + e.substr(1) + "$"))
                            : n.names.push(RegExp("^" + e + "$")));
                    }),
                    (n.enabled = function (e) {
                      let t, r;
                      if ("*" === e[e.length - 1]) return !0;
                      for (t = 0, r = n.skips.length; t < r; t++)
                        if (n.skips[t].test(e)) return !1;
                      for (t = 0, r = n.names.length; t < r; t++)
                        if (n.names[t].test(e)) return !0;
                      return !1;
                    }),
                    (n.humanize = e("ms")),
                    (n.destroy = function () {
                      console.warn(
                        "Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.",
                      );
                    }),
                    Object.keys(r).forEach((e) => {
                      n[e] = r[e];
                    }),
                    (n.names = []),
                    (n.skips = []),
                    (n.formatters = {}),
                    (n.selectColor = function (e) {
                      let r = 0;
                      for (let t = 0; t < e.length; t++)
                        r = ((r << 5) - r + e.charCodeAt(t)) | 0;
                      return n.colors[t(r) % n.colors.length];
                    }),
                    n.enable(n.load()),
                    n
                  );
                };
              },
              { ms: 11 },
            ],
            6: [
              function (e, t) {
                "use strict";
                function r(e, t) {
                  for (let r in t)
                    Object.defineProperty(e, r, {
                      value: t[r],
                      enumerable: !0,
                      configurable: !0,
                    });
                  return e;
                }
                t.exports = function (e, t, n) {
                  if (!e || "string" == typeof e)
                    throw TypeError("Please pass an Error to err-code");
                  (n || (n = {}),
                    "object" == typeof t && ((n = t), (t = "")),
                    t && (n.code = t));
                  try {
                    return r(e, n);
                  } catch (i) {
                    ((n.message = e.message), (n.stack = e.stack));
                    let t = function () {};
                    return (
                      (t.prototype = Object.create(Object.getPrototypeOf(e))),
                      r(new t(), n)
                    );
                  }
                };
              },
              {},
            ],
            7: [
              function (e, t) {
                "use strict";
                function r() {
                  r.init.call(this);
                }
                function n(e) {
                  if ("function" != typeof e)
                    throw TypeError(
                      'The "listener" argument must be of type Function. Received type ' +
                        typeof e,
                    );
                }
                function i(e) {
                  return void 0 === e._maxListeners
                    ? r.defaultMaxListeners
                    : e._maxListeners;
                }
                function s(e, t, r, s) {
                  var o, a, l;
                  if (
                    (n(r),
                    void 0 === (a = e._events)
                      ? ((a = e._events = Object.create(null)),
                        (e._eventsCount = 0))
                      : (void 0 !== a.newListener &&
                          (e.emit(
                            "newListener",
                            t,
                            r.listener ? r.listener : r,
                          ),
                          (a = e._events)),
                        (l = a[t])),
                    void 0 === l)
                  )
                    ((l = a[t] = r), ++e._eventsCount);
                  else if (
                    ("function" == typeof l
                      ? (l = a[t] = s ? [r, l] : [l, r])
                      : s
                        ? l.unshift(r)
                        : l.push(r),
                    0 < (o = i(e)) && l.length > o && !l.warned)
                  ) {
                    l.warned = !0;
                    var h = Error(
                      "Possible EventEmitter memory leak detected. " +
                        l.length +
                        " " +
                        t +
                        " listeners added. Use emitter.setMaxListeners() to increase limit",
                    );
                    ((h.name = "MaxListenersExceededWarning"),
                      (h.emitter = e),
                      (h.type = t),
                      (h.count = l.length),
                      console && console.warn && console.warn(h));
                  }
                  return e;
                }
                function o() {
                  if (!this.fired)
                    return (
                      this.target.removeListener(this.type, this.wrapFn),
                      (this.fired = !0),
                      0 == arguments.length
                        ? this.listener.call(this.target)
                        : this.listener.apply(this.target, arguments)
                    );
                }
                function a(e, t, r) {
                  var n = {
                      fired: !1,
                      wrapFn: void 0,
                      target: e,
                      type: t,
                      listener: r,
                    },
                    i = o.bind(n);
                  return ((i.listener = r), (n.wrapFn = i), i);
                }
                function l(e, t, r) {
                  var n = e._events;
                  if (void 0 === n) return [];
                  var i = n[t];
                  return void 0 === i
                    ? []
                    : "function" == typeof i
                      ? r
                        ? [i.listener || i]
                        : [i]
                      : r
                        ? (function (e) {
                            for (
                              var t = Array(e.length), r = 0;
                              r < t.length;
                              ++r
                            )
                              t[r] = e[r].listener || e[r];
                            return t;
                          })(i)
                        : c(i, i.length);
                }
                function h(e) {
                  var t = this._events;
                  if (void 0 !== t) {
                    var r = t[e];
                    if ("function" == typeof r) return 1;
                    if (void 0 !== r) return r.length;
                  }
                  return 0;
                }
                function c(e, t) {
                  for (var r = Array(t), n = 0; n < t; ++n) r[n] = e[n];
                  return r;
                }
                function u(e, t, r, n) {
                  if ("function" == typeof e.on)
                    n.once ? e.once(t, r) : e.on(t, r);
                  else if ("function" == typeof e.addEventListener)
                    e.addEventListener(t, function i(s) {
                      (n.once && e.removeEventListener(t, i), r(s));
                    });
                  else
                    throw TypeError(
                      'The "emitter" argument must be of type EventEmitter. Received type ' +
                        typeof e,
                    );
                }
                var d,
                  f = "object" == typeof Reflect ? Reflect : null,
                  p =
                    f && "function" == typeof f.apply
                      ? f.apply
                      : function (e, t, r) {
                          return Function.prototype.apply.call(e, t, r);
                        };
                d =
                  f && "function" == typeof f.ownKeys
                    ? f.ownKeys
                    : Object.getOwnPropertySymbols
                      ? function (e) {
                          return Object.getOwnPropertyNames(e).concat(
                            Object.getOwnPropertySymbols(e),
                          );
                        }
                      : function (e) {
                          return Object.getOwnPropertyNames(e);
                        };
                var g =
                  Number.isNaN ||
                  function (e) {
                    return e != e;
                  };
                ((t.exports = r),
                  (t.exports.once = function (e, t) {
                    return new Promise(function (r, n) {
                      var i;
                      function s(r) {
                        (e.removeListener(t, o), n(r));
                      }
                      function o() {
                        ("function" == typeof e.removeListener &&
                          e.removeListener("error", s),
                          r([].slice.call(arguments)));
                      }
                      (u(e, t, o, { once: !0 }),
                        "error" !== t &&
                          ((i = { once: !0 }),
                          "function" == typeof e.on && u(e, "error", s, i)));
                    });
                  }),
                  (r.EventEmitter = r),
                  (r.prototype._events = void 0),
                  (r.prototype._eventsCount = 0),
                  (r.prototype._maxListeners = void 0));
                var y = 10;
                (Object.defineProperty(r, "defaultMaxListeners", {
                  enumerable: !0,
                  get: function () {
                    return y;
                  },
                  set: function (e) {
                    if ("number" != typeof e || 0 > e || g(e))
                      throw RangeError(
                        'The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' +
                          e +
                          ".",
                      );
                    y = e;
                  },
                }),
                  (r.init = function () {
                    ((void 0 === this._events ||
                      this._events === Object.getPrototypeOf(this)._events) &&
                      ((this._events = Object.create(null)),
                      (this._eventsCount = 0)),
                      (this._maxListeners = this._maxListeners || void 0));
                  }),
                  (r.prototype.setMaxListeners = function (e) {
                    if ("number" != typeof e || 0 > e || g(e))
                      throw RangeError(
                        'The value of "n" is out of range. It must be a non-negative number. Received ' +
                          e +
                          ".",
                      );
                    return ((this._maxListeners = e), this);
                  }),
                  (r.prototype.getMaxListeners = function () {
                    return i(this);
                  }),
                  (r.prototype.emit = function (e) {
                    for (var t = [], r = 1; r < arguments.length; r++)
                      t.push(arguments[r]);
                    var n = "error" === e,
                      i = this._events;
                    if (void 0 !== i) n = n && void 0 === i.error;
                    else if (!n) return !1;
                    if (n) {
                      if ((0 < t.length && (s = t[0]), s instanceof Error))
                        throw s;
                      var s,
                        o = Error(
                          "Unhandled error." +
                            (s ? " (" + s.message + ")" : ""),
                        );
                      throw ((o.context = s), o);
                    }
                    var a = i[e];
                    if (void 0 === a) return !1;
                    if ("function" == typeof a) p(a, this, t);
                    else
                      for (var l = a.length, h = c(a, l), r = 0; r < l; ++r)
                        p(h[r], this, t);
                    return !0;
                  }),
                  (r.prototype.addListener = function (e, t) {
                    return s(this, e, t, !1);
                  }),
                  (r.prototype.on = r.prototype.addListener),
                  (r.prototype.prependListener = function (e, t) {
                    return s(this, e, t, !0);
                  }),
                  (r.prototype.once = function (e, t) {
                    return (n(t), this.on(e, a(this, e, t)), this);
                  }),
                  (r.prototype.prependOnceListener = function (e, t) {
                    return (n(t), this.prependListener(e, a(this, e, t)), this);
                  }),
                  (r.prototype.removeListener = function (e, t) {
                    var r, i, s, o, a;
                    if (
                      (n(t),
                      void 0 === (i = this._events) || void 0 === (r = i[e]))
                    )
                      return this;
                    if (r === t || r.listener === t)
                      0 == --this._eventsCount
                        ? (this._events = Object.create(null))
                        : (delete i[e],
                          i.removeListener &&
                            this.emit("removeListener", e, r.listener || t));
                    else if ("function" != typeof r) {
                      for (s = -1, o = r.length - 1; 0 <= o; o--)
                        if (r[o] === t || r[o].listener === t) {
                          ((a = r[o].listener), (s = o));
                          break;
                        }
                      if (0 > s) return this;
                      (0 === s
                        ? r.shift()
                        : (function (e, t) {
                            for (; t + 1 < e.length; t++) e[t] = e[t + 1];
                            e.pop();
                          })(r, s),
                        1 === r.length && (i[e] = r[0]),
                        void 0 !== i.removeListener &&
                          this.emit("removeListener", e, a || t));
                    }
                    return this;
                  }),
                  (r.prototype.off = r.prototype.removeListener),
                  (r.prototype.removeAllListeners = function (e) {
                    var t, r, n;
                    if (void 0 === (r = this._events)) return this;
                    if (void 0 === r.removeListener)
                      return (
                        0 == arguments.length
                          ? ((this._events = Object.create(null)),
                            (this._eventsCount = 0))
                          : void 0 !== r[e] &&
                            (0 == --this._eventsCount
                              ? (this._events = Object.create(null))
                              : delete r[e]),
                        this
                      );
                    if (0 == arguments.length) {
                      var i,
                        s = Object.keys(r);
                      for (n = 0; n < s.length; ++n)
                        "removeListener" !== (i = s[n]) &&
                          this.removeAllListeners(i);
                      return (
                        this.removeAllListeners("removeListener"),
                        (this._events = Object.create(null)),
                        (this._eventsCount = 0),
                        this
                      );
                    }
                    if ("function" == typeof (t = r[e]))
                      this.removeListener(e, t);
                    else if (void 0 !== t)
                      for (n = t.length - 1; 0 <= n; n--)
                        this.removeListener(e, t[n]);
                    return this;
                  }),
                  (r.prototype.listeners = function (e) {
                    return l(this, e, !0);
                  }),
                  (r.prototype.rawListeners = function (e) {
                    return l(this, e, !1);
                  }),
                  (r.listenerCount = function (e, t) {
                    return "function" == typeof e.listenerCount
                      ? e.listenerCount(t)
                      : h.call(e, t);
                  }),
                  (r.prototype.listenerCount = h),
                  (r.prototype.eventNames = function () {
                    return 0 < this._eventsCount ? d(this._events) : [];
                  }));
              },
              {},
            ],
            8: [
              function (e, t) {
                t.exports = function () {
                  if ("undefined" == typeof globalThis) return null;
                  var e = {
                    RTCPeerConnection:
                      globalThis.RTCPeerConnection ||
                      globalThis.mozRTCPeerConnection ||
                      globalThis.webkitRTCPeerConnection,
                    RTCSessionDescription:
                      globalThis.RTCSessionDescription ||
                      globalThis.mozRTCSessionDescription ||
                      globalThis.webkitRTCSessionDescription,
                    RTCIceCandidate:
                      globalThis.RTCIceCandidate ||
                      globalThis.mozRTCIceCandidate ||
                      globalThis.webkitRTCIceCandidate,
                  };
                  return e.RTCPeerConnection ? e : null;
                };
              },
              {},
            ],
            9: [
              function (r, i, s) {
                ((s.read = function (e, t, r, i, s) {
                  var o,
                    a,
                    l = 8 * s - i - 1,
                    h = (1 << l) - 1,
                    c = h >> 1,
                    u = -7,
                    d = r ? s - 1 : 0,
                    f = r ? -1 : 1,
                    p = e[t + d];
                  for (
                    d += f, o = p & ((1 << -u) - 1), p >>= -u, u += l;
                    0 < u;
                    o = 256 * o + e[t + d], d += f, u -= 8
                  );
                  for (
                    a = o & ((1 << -u) - 1), o >>= -u, u += i;
                    0 < u;
                    a = 256 * a + e[t + d], d += f, u -= 8
                  );
                  if (0 === o) o = 1 - c;
                  else {
                    if (o === h) return a ? NaN : (1 / 0) * (p ? -1 : 1);
                    ((a += n(2, i)), (o -= c));
                  }
                  return (p ? -1 : 1) * a * n(2, o - i);
                }),
                  (s.write = function (r, i, s, o, a, l) {
                    var h,
                      c,
                      u,
                      d = Math.log,
                      f = 8 * l - a - 1,
                      p = (1 << f) - 1,
                      g = p >> 1,
                      y = 23 === a ? n(2, -24) - n(2, -77) : 0,
                      b = o ? 0 : l - 1,
                      m = o ? 1 : -1,
                      _ = 0 > i || (0 === i && 0 > 1 / i) ? 1 : 0;
                    for (
                      isNaN((i = t(i))) || i === 1 / 0
                        ? ((c = isNaN(i) ? 1 : 0), (h = p))
                        : ((h = e(d(i) / Math.LN2)),
                          1 > i * (u = n(2, -h)) && (h--, (u *= 2)),
                          2 <=
                            (i += 1 <= h + g ? y / u : y * n(2, 1 - g)) * u &&
                            (h++, (u /= 2)),
                          h + g >= p
                            ? ((c = 0), (h = p))
                            : 1 <= h + g
                              ? ((c = (i * u - 1) * n(2, a)), (h += g))
                              : ((c = i * n(2, g - 1) * n(2, a)), (h = 0)));
                      8 <= a;
                      r[s + b] = 255 & c, b += m, c /= 256, a -= 8
                    );
                    for (
                      h = (h << a) | c, f += a;
                      0 < f;
                      r[s + b] = 255 & h, b += m, h /= 256, f -= 8
                    );
                    r[s + b - m] |= 128 * _;
                  }));
              },
              {},
            ],
            10: [
              function (e, t) {
                t.exports =
                  "function" == typeof Object.create
                    ? function (e, t) {
                        t &&
                          ((e.super_ = t),
                          (e.prototype = Object.create(t.prototype, {
                            constructor: {
                              value: e,
                              enumerable: !1,
                              writable: !0,
                              configurable: !0,
                            },
                          })));
                      }
                    : function (e, t) {
                        if (t) {
                          e.super_ = t;
                          var r = function () {};
                          ((r.prototype = t.prototype),
                            (e.prototype = new r()),
                            (e.prototype.constructor = e));
                        }
                      };
              },
              {},
            ],
            11: [
              function (e, r) {
                var n = Math.round;
                function i(e, t, r, i) {
                  return n(e / r) + " " + i + (t >= 1.5 * r ? "s" : "");
                }
                r.exports = function (e, r) {
                  r = r || {};
                  var s,
                    o,
                    a = typeof e;
                  if ("string" == a && 0 < e.length)
                    return (function (e) {
                      if (!(100 < (e += "").length)) {
                        var t =
                          /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
                            e,
                          );
                        if (t) {
                          var r = parseFloat(t[1]),
                            n = (t[2] || "ms").toLowerCase();
                          return "years" === n ||
                            "year" === n ||
                            "yrs" === n ||
                            "yr" === n ||
                            "y" === n
                            ? 315576e5 * r
                            : "weeks" === n || "week" === n || "w" === n
                              ? 6048e5 * r
                              : "days" === n || "day" === n || "d" === n
                                ? 864e5 * r
                                : "hours" === n ||
                                    "hour" === n ||
                                    "hrs" === n ||
                                    "hr" === n ||
                                    "h" === n
                                  ? 36e5 * r
                                  : "minutes" === n ||
                                      "minute" === n ||
                                      "mins" === n ||
                                      "min" === n ||
                                      "m" === n
                                    ? 6e4 * r
                                    : "seconds" === n ||
                                        "second" === n ||
                                        "secs" === n ||
                                        "sec" === n ||
                                        "s" === n
                                      ? 1e3 * r
                                      : "milliseconds" === n ||
                                          "millisecond" === n ||
                                          "msecs" === n ||
                                          "msec" === n ||
                                          "ms" === n
                                        ? r
                                        : void 0;
                        }
                      }
                    })(e);
                  if ("number" === a && isFinite(e))
                    return r.long
                      ? 864e5 <= (s = t(e))
                        ? i(e, s, 864e5, "day")
                        : 36e5 <= s
                          ? i(e, s, 36e5, "hour")
                          : 6e4 <= s
                            ? i(e, s, 6e4, "minute")
                            : 1e3 <= s
                              ? i(e, s, 1e3, "second")
                              : e + " ms"
                      : 864e5 <= (o = t(e))
                        ? n(e / 864e5) + "d"
                        : 36e5 <= o
                          ? n(e / 36e5) + "h"
                          : 6e4 <= o
                            ? n(e / 6e4) + "m"
                            : 1e3 <= o
                              ? n(e / 1e3) + "s"
                              : e + "ms";
                  throw Error(
                    "val is not a non-empty string or a valid number. val=" +
                      JSON.stringify(e),
                  );
                };
              },
              {},
            ],
            12: [
              function (e, t) {
                function r() {
                  throw Error("setTimeout has not been defined");
                }
                function n() {
                  throw Error("clearTimeout has not been defined");
                }
                function i(e) {
                  if (h === setTimeout) return setTimeout(e, 0);
                  if ((h === r || !h) && setTimeout)
                    return ((h = setTimeout), setTimeout(e, 0));
                  try {
                    return h(e, 0);
                  } catch (t) {
                    try {
                      return h.call(null, e, 0);
                    } catch (t) {
                      return h.call(this, e, 0);
                    }
                  }
                }
                function s() {
                  p &&
                    d &&
                    ((p = !1),
                    d.length ? (f = d.concat(f)) : (g = -1),
                    f.length && o());
                }
                function o() {
                  if (!p) {
                    var e = i(s);
                    p = !0;
                    for (var t = f.length; t;) {
                      for (d = f, f = []; ++g < t;) d && d[g].run();
                      ((g = -1), (t = f.length));
                    }
                    ((d = null),
                      (p = !1),
                      (function (e) {
                        if (c === clearTimeout) return clearTimeout(e);
                        if ((c === n || !c) && clearTimeout)
                          return ((c = clearTimeout), clearTimeout(e));
                        try {
                          c(e);
                        } catch (t) {
                          try {
                            return c.call(null, e);
                          } catch (t) {
                            return c.call(this, e);
                          }
                        }
                      })(e));
                  }
                }
                function a(e, t) {
                  ((this.fun = e), (this.array = t));
                }
                function l() {}
                var h,
                  c,
                  u = (t.exports = {});
                !(function () {
                  try {
                    h = "function" == typeof setTimeout ? setTimeout : r;
                  } catch (e) {
                    h = r;
                  }
                  try {
                    c = "function" == typeof clearTimeout ? clearTimeout : n;
                  } catch (e) {
                    c = n;
                  }
                })();
                var d,
                  f = [],
                  p = !1,
                  g = -1;
                ((u.nextTick = function (e) {
                  var t = Array(arguments.length - 1);
                  if (1 < arguments.length)
                    for (var r = 1; r < arguments.length; r++)
                      t[r - 1] = arguments[r];
                  (f.push(new a(e, t)), 1 !== f.length || p || i(o));
                }),
                  (a.prototype.run = function () {
                    this.fun.apply(null, this.array);
                  }),
                  (u.title = "browser"),
                  (u.browser = !0),
                  (u.env = {}),
                  (u.argv = []),
                  (u.version = ""),
                  (u.versions = {}),
                  (u.on = l),
                  (u.addListener = l),
                  (u.once = l),
                  (u.off = l),
                  (u.removeListener = l),
                  (u.removeAllListeners = l),
                  (u.emit = l),
                  (u.prependListener = l),
                  (u.prependOnceListener = l),
                  (u.listeners = function () {
                    return [];
                  }),
                  (u.binding = function () {
                    throw Error("process.binding is not supported");
                  }),
                  (u.cwd = function () {
                    return "/";
                  }),
                  (u.chdir = function () {
                    throw Error("process.chdir is not supported");
                  }),
                  (u.umask = function () {
                    return 0;
                  }));
              },
              {},
            ],
            13: [
              function (e, t) {
                (function (e) {
                  (function () {
                    let r;
                    t.exports =
                      "function" == typeof queueMicrotask
                        ? queueMicrotask.bind(
                            "undefined" == typeof window ? e : window,
                          )
                        : (e) =>
                            (r || (r = Promise.resolve())).then(e).catch((e) =>
                              setTimeout(() => {
                                throw e;
                              }, 0),
                            );
                  }).call(this);
                }).call(
                  this,
                  void 0 === r.g
                    ? "undefined" == typeof self
                      ? "undefined" == typeof window
                        ? {}
                        : window
                      : self
                    : r.g,
                );
              },
              {},
            ],
            14: [
              function (e, t) {
                (function (r, n) {
                  (function () {
                    "use strict";
                    var i = e("safe-buffer").Buffer,
                      s = n.crypto || n.msCrypto;
                    t.exports =
                      s && s.getRandomValues
                        ? function (e, t) {
                            if (e > 4294967295)
                              throw RangeError(
                                "requested too many random bytes",
                              );
                            var n = i.allocUnsafe(e);
                            if (0 < e) {
                              if (65536 < e)
                                for (var o = 0; o < e; o += 65536)
                                  s.getRandomValues(n.slice(o, o + 65536));
                              else s.getRandomValues(n);
                            }
                            return "function" == typeof t
                              ? r.nextTick(function () {
                                  t(null, n);
                                })
                              : n;
                          }
                        : function () {
                            throw Error(
                              "Secure random number generation is not supported by this browser.\nUse Chrome, Firefox or Internet Explorer 11",
                            );
                          };
                  }).call(this);
                }).call(
                  this,
                  e("_process"),
                  void 0 === r.g
                    ? "undefined" == typeof self
                      ? "undefined" == typeof window
                        ? {}
                        : window
                      : self
                    : r.g,
                );
              },
              { _process: 12, "safe-buffer": 30 },
            ],
            15: [
              function (e, t) {
                "use strict";
                function r(e, t, r) {
                  r || (r = Error);
                  var n = (function (e) {
                    function r(r, n, i) {
                      return (
                        e.call(this, "string" == typeof t ? t : t(r, n, i)) ||
                        this
                      );
                    }
                    return (
                      (r.prototype = Object.create(e.prototype)),
                      (r.prototype.constructor = r),
                      (r.__proto__ = e),
                      r
                    );
                  })(r);
                  ((n.prototype.name = r.name),
                    (n.prototype.code = e),
                    (i[e] = n));
                }
                function n(e, t) {
                  if (Array.isArray(e)) {
                    var r = e.length;
                    return (
                      (e = e.map(function (e) {
                        return e + "";
                      })),
                      2 < r
                        ? "one of "
                            .concat(t, " ")
                            .concat(e.slice(0, r - 1).join(", "), ", or ") +
                          e[r - 1]
                        : 2 === r
                          ? "one of "
                              .concat(t, " ")
                              .concat(e[0], " or ")
                              .concat(e[1])
                          : "of ".concat(t, " ").concat(e[0])
                    );
                  }
                  return "of ".concat(t, " ").concat(e + "");
                }
                var i = {};
                (r(
                  "ERR_INVALID_OPT_VALUE",
                  function (e, t) {
                    return (
                      'The value "' + t + '" is invalid for option "' + e + '"'
                    );
                  },
                  TypeError,
                ),
                  r(
                    "ERR_INVALID_ARG_TYPE",
                    function (e, t, r) {
                      if (
                        ("string" == typeof t &&
                        ((i = "not "), t.substr(0, i.length) === i)
                          ? ((l = "must not be"), (t = t.replace(/^not /, "")))
                          : (l = "must be"),
                        (s = " argument"),
                        (void 0 === o || o > e.length) && (o = e.length),
                        e.substring(o - s.length, o) === s)
                      )
                        h = "The "
                          .concat(e, " ")
                          .concat(l, " ")
                          .concat(n(t, "type"));
                      else {
                        var i,
                          s,
                          o,
                          a,
                          l,
                          h,
                          c = ("number" != typeof a && (a = 0),
                          a + 1 > e.length || -1 === e.indexOf(".", a))
                            ? "argument"
                            : "property";
                        h = 'The "'
                          .concat(e, '" ')
                          .concat(c, " ")
                          .concat(l, " ")
                          .concat(n(t, "type"));
                      }
                      return h + ". Received type ".concat(typeof r);
                    },
                    TypeError,
                  ),
                  r("ERR_STREAM_PUSH_AFTER_EOF", "stream.push() after EOF"),
                  r("ERR_METHOD_NOT_IMPLEMENTED", function (e) {
                    return "The " + e + " method is not implemented";
                  }),
                  r("ERR_STREAM_PREMATURE_CLOSE", "Premature close"),
                  r("ERR_STREAM_DESTROYED", function (e) {
                    return "Cannot call " + e + " after a stream was destroyed";
                  }),
                  r("ERR_MULTIPLE_CALLBACK", "Callback called multiple times"),
                  r("ERR_STREAM_CANNOT_PIPE", "Cannot pipe, not readable"),
                  r("ERR_STREAM_WRITE_AFTER_END", "write after end"),
                  r(
                    "ERR_STREAM_NULL_VALUES",
                    "May not write null values to stream",
                    TypeError,
                  ),
                  r(
                    "ERR_UNKNOWN_ENCODING",
                    function (e) {
                      return "Unknown encoding: " + e;
                    },
                    TypeError,
                  ),
                  r(
                    "ERR_STREAM_UNSHIFT_AFTER_END_EVENT",
                    "stream.unshift() after end event",
                  ),
                  (t.exports.codes = i));
              },
              {},
            ],
            16: [
              function (e, t) {
                (function (r) {
                  (function () {
                    "use strict";
                    function n(e) {
                      return this instanceof n
                        ? void (a.call(this, e),
                          l.call(this, e),
                          (this.allowHalfOpen = !0),
                          e &&
                            (!1 === e.readable && (this.readable = !1),
                            !1 === e.writable && (this.writable = !1),
                            !1 === e.allowHalfOpen &&
                              ((this.allowHalfOpen = !1), this.once("end", i))))
                        : new n(e);
                    }
                    function i() {
                      this._writableState.ended || r.nextTick(s, this);
                    }
                    function s(e) {
                      e.end();
                    }
                    var o =
                      Object.keys ||
                      function (e) {
                        var t = [];
                        for (var r in e) t.push(r);
                        return t;
                      };
                    t.exports = n;
                    var a = e("./_stream_readable"),
                      l = e("./_stream_writable");
                    e("inherits")(n, a);
                    for (var h, c = o(l.prototype), u = 0; u < c.length; u++)
                      ((h = c[u]),
                        n.prototype[h] || (n.prototype[h] = l.prototype[h]));
                    (Object.defineProperty(
                      n.prototype,
                      "writableHighWaterMark",
                      {
                        enumerable: !1,
                        get: function () {
                          return this._writableState.highWaterMark;
                        },
                      },
                    ),
                      Object.defineProperty(n.prototype, "writableBuffer", {
                        enumerable: !1,
                        get: function () {
                          return (
                            this._writableState &&
                            this._writableState.getBuffer()
                          );
                        },
                      }),
                      Object.defineProperty(n.prototype, "writableLength", {
                        enumerable: !1,
                        get: function () {
                          return this._writableState.length;
                        },
                      }),
                      Object.defineProperty(n.prototype, "destroyed", {
                        enumerable: !1,
                        get: function () {
                          return (
                            void 0 !== this._readableState &&
                            void 0 !== this._writableState &&
                            this._readableState.destroyed &&
                            this._writableState.destroyed
                          );
                        },
                        set: function (e) {
                          void 0 === this._readableState ||
                            void 0 === this._writableState ||
                            ((this._readableState.destroyed = e),
                            (this._writableState.destroyed = e));
                        },
                      }));
                  }).call(this);
                }).call(this, e("_process"));
              },
              {
                "./_stream_readable": 18,
                "./_stream_writable": 20,
                _process: 12,
                inherits: 10,
              },
            ],
            17: [
              function (e, t) {
                "use strict";
                function r(e) {
                  return this instanceof r ? void n.call(this, e) : new r(e);
                }
                t.exports = r;
                var n = e("./_stream_transform");
                (e("inherits")(r, n),
                  (r.prototype._transform = function (e, t, r) {
                    r(null, e);
                  }));
              },
              { "./_stream_transform": 19, inherits: 10 },
            ],
            18: [
              function (e, t) {
                (function (r, n) {
                  (function () {
                    "use strict";
                    function i(t, r, n) {
                      ((w = w || e("./_stream_duplex")),
                        (t = t || {}),
                        "boolean" != typeof n && (n = r instanceof w),
                        (this.objectMode = !!t.objectMode),
                        n &&
                          (this.objectMode =
                            this.objectMode || !!t.readableObjectMode),
                        (this.highWaterMark = x(
                          this,
                          t,
                          "readableHighWaterMark",
                          n,
                        )),
                        (this.buffer = new N()),
                        (this.length = 0),
                        (this.pipes = null),
                        (this.pipesCount = 0),
                        (this.flowing = null),
                        (this.ended = !1),
                        (this.endEmitted = !1),
                        (this.reading = !1),
                        (this.sync = !0),
                        (this.needReadable = !1),
                        (this.emittedReadable = !1),
                        (this.readableListening = !1),
                        (this.resumeScheduled = !1),
                        (this.paused = !0),
                        (this.emitClose = !1 !== t.emitClose),
                        (this.autoDestroy = !!t.autoDestroy),
                        (this.destroyed = !1),
                        (this.defaultEncoding = t.defaultEncoding || "utf8"),
                        (this.awaitDrain = 0),
                        (this.readingMore = !1),
                        (this.decoder = null),
                        (this.encoding = null),
                        t.encoding &&
                          (A || (A = e("string_decoder/").StringDecoder),
                          (this.decoder = new A(t.encoding)),
                          (this.encoding = t.encoding)));
                    }
                    function s(t) {
                      if (
                        ((w = w || e("./_stream_duplex")), !(this instanceof s))
                      )
                        return new s(t);
                      var r = this instanceof w;
                      ((this._readableState = new i(t, this, r)),
                        (this.readable = !0),
                        t &&
                          ("function" == typeof t.read && (this._read = t.read),
                          "function" == typeof t.destroy &&
                            (this._destroy = t.destroy)),
                        R.call(this));
                    }
                    function o(e, t, r, n, i) {
                      E("readableAddChunk", t);
                      var s,
                        o,
                        l,
                        d,
                        f,
                        p = e._readableState;
                      if (null === t)
                        ((p.reading = !1),
                          (function (e, t) {
                            if ((E("onEofChunk"), !t.ended)) {
                              if (t.decoder) {
                                var r = t.decoder.end();
                                r &&
                                  r.length &&
                                  (t.buffer.push(r),
                                  (t.length += t.objectMode ? 1 : r.length));
                              }
                              ((t.ended = !0),
                                t.sync
                                  ? h(e)
                                  : ((t.needReadable = !1),
                                    t.emittedReadable ||
                                      ((t.emittedReadable = !0), c(e))));
                            }
                          })(e, p));
                      else {
                        if (
                          (i ||
                            ((s = p),
                            (o = t),
                            S.isBuffer(o) ||
                              o instanceof T ||
                              "string" == typeof o ||
                              void 0 === o ||
                              s.objectMode ||
                              (l = new P(
                                "chunk",
                                ["string", "Buffer", "Uint8Array"],
                                o,
                              )),
                            (f = l)),
                          f)
                        )
                          U(e, f);
                        else if (p.objectMode || (t && 0 < t.length)) {
                          if (
                            ("string" == typeof t ||
                              p.objectMode ||
                              Object.getPrototypeOf(t) === S.prototype ||
                              ((d = t), (t = S.from(d))),
                            n)
                          )
                            p.endEmitted ? U(e, new F()) : a(e, p, t, !0);
                          else if (p.ended) U(e, new D());
                          else {
                            if (p.destroyed) return !1;
                            ((p.reading = !1),
                              p.decoder && !r
                                ? ((t = p.decoder.write(t)),
                                  p.objectMode || 0 !== t.length
                                    ? a(e, p, t, !1)
                                    : u(e, p))
                                : a(e, p, t, !1));
                          }
                        } else n || ((p.reading = !1), u(e, p));
                      }
                      return (
                        !p.ended &&
                        (p.length < p.highWaterMark || 0 === p.length)
                      );
                    }
                    function a(e, t, r, n) {
                      (t.flowing && 0 === t.length && !t.sync
                        ? ((t.awaitDrain = 0), e.emit("data", r))
                        : ((t.length += t.objectMode ? 1 : r.length),
                          n ? t.buffer.unshift(r) : t.buffer.push(r),
                          t.needReadable && h(e)),
                        u(e, t));
                    }
                    function l(e, t) {
                      var r;
                      return 0 >= e || (0 === t.length && t.ended)
                        ? 0
                        : t.objectMode
                          ? 1
                          : e == e
                            ? (e > t.highWaterMark &&
                                (t.highWaterMark =
                                  (1073741824 <= (r = e)
                                    ? (r = 1073741824)
                                    : (r--,
                                      (r |= r >>> 1),
                                      (r |= r >>> 2),
                                      (r |= r >>> 4),
                                      (r |= r >>> 8),
                                      (r |= r >>> 16),
                                      r++),
                                  r)),
                              e <= t.length
                                ? e
                                : t.ended
                                  ? t.length
                                  : ((t.needReadable = !0), 0))
                            : t.flowing && t.length
                              ? t.buffer.head.data.length
                              : t.length;
                    }
                    function h(e) {
                      var t = e._readableState;
                      (E("emitReadable", t.needReadable, t.emittedReadable),
                        (t.needReadable = !1),
                        t.emittedReadable ||
                          (E("emitReadable", t.flowing),
                          (t.emittedReadable = !0),
                          r.nextTick(c, e)));
                    }
                    function c(e) {
                      var t = e._readableState;
                      (E("emitReadable_", t.destroyed, t.length, t.ended),
                        !t.destroyed &&
                          (t.length || t.ended) &&
                          (e.emit("readable"), (t.emittedReadable = !1)),
                        (t.needReadable =
                          !t.flowing &&
                          !t.ended &&
                          t.length <= t.highWaterMark),
                        y(e));
                    }
                    function u(e, t) {
                      t.readingMore ||
                        ((t.readingMore = !0), r.nextTick(d, e, t));
                    }
                    function d(e, t) {
                      for (
                        ;
                        !t.reading &&
                        !t.ended &&
                        (t.length < t.highWaterMark ||
                          (t.flowing && 0 === t.length));
                      ) {
                        var r = t.length;
                        if (
                          (E("maybeReadMore read 0"), e.read(0), r === t.length)
                        )
                          break;
                      }
                      t.readingMore = !1;
                    }
                    function f(e) {
                      var t = e._readableState;
                      ((t.readableListening = 0 < e.listenerCount("readable")),
                        t.resumeScheduled && !t.paused
                          ? (t.flowing = !0)
                          : 0 < e.listenerCount("data") && e.resume());
                    }
                    function p(e) {
                      (E("readable nexttick read 0"), e.read(0));
                    }
                    function g(e, t) {
                      (E("resume", t.reading),
                        t.reading || e.read(0),
                        (t.resumeScheduled = !1),
                        e.emit("resume"),
                        y(e),
                        t.flowing && !t.reading && e.read(0));
                    }
                    function y(e) {
                      var t = e._readableState;
                      for (
                        E("flow", t.flowing);
                        t.flowing && null !== e.read();
                      );
                    }
                    function b(e, t) {
                      var r;
                      return 0 === t.length
                        ? null
                        : (t.objectMode
                            ? (r = t.buffer.shift())
                            : !e || e >= t.length
                              ? ((r = t.decoder
                                  ? t.buffer.join("")
                                  : 1 === t.buffer.length
                                    ? t.buffer.first()
                                    : t.buffer.concat(t.length)),
                                t.buffer.clear())
                              : (r = t.buffer.consume(e, t.decoder)),
                          r);
                    }
                    function m(e) {
                      var t = e._readableState;
                      (E("endReadable", t.endEmitted),
                        t.endEmitted || ((t.ended = !0), r.nextTick(_, t, e)));
                    }
                    function _(e, t) {
                      if (
                        (E("endReadableNT", e.endEmitted, e.length),
                        !e.endEmitted &&
                          0 === e.length &&
                          ((e.endEmitted = !0),
                          (t.readable = !1),
                          t.emit("end"),
                          e.autoDestroy))
                      ) {
                        var r = t._writableState;
                        (!r || (r.autoDestroy && r.finished)) && t.destroy();
                      }
                    }
                    function v(e, t) {
                      for (var r = 0, n = e.length; r < n; r++)
                        if (e[r] === t) return r;
                      return -1;
                    }
                    ((t.exports = s),
                      (s.ReadableState = i),
                      e("events").EventEmitter);
                    var w,
                      E,
                      C = function (e, t) {
                        return e.listeners(t).length;
                      },
                      R = e("./internal/streams/stream"),
                      S = e("buffer").Buffer,
                      T = n.Uint8Array || function () {},
                      k = e("util");
                    E = k && k.debuglog ? k.debuglog("stream") : function () {};
                    var A,
                      L,
                      O,
                      N = e("./internal/streams/buffer_list"),
                      I = e("./internal/streams/destroy"),
                      x = e("./internal/streams/state").getHighWaterMark,
                      M = e("../errors").codes,
                      P = M.ERR_INVALID_ARG_TYPE,
                      D = M.ERR_STREAM_PUSH_AFTER_EOF,
                      j = M.ERR_METHOD_NOT_IMPLEMENTED,
                      F = M.ERR_STREAM_UNSHIFT_AFTER_END_EVENT;
                    e("inherits")(s, R);
                    var U = I.errorOrDestroy,
                      B = ["error", "close", "destroy", "pause", "resume"];
                    (Object.defineProperty(s.prototype, "destroyed", {
                      enumerable: !1,
                      get: function () {
                        return (
                          void 0 !== this._readableState &&
                          this._readableState.destroyed
                        );
                      },
                      set: function (e) {
                        this._readableState &&
                          (this._readableState.destroyed = e);
                      },
                    }),
                      (s.prototype.destroy = I.destroy),
                      (s.prototype._undestroy = I.undestroy),
                      (s.prototype._destroy = function (e, t) {
                        t(e);
                      }),
                      (s.prototype.push = function (e, t) {
                        var r,
                          n = this._readableState;
                        return (
                          n.objectMode
                            ? (r = !0)
                            : "string" == typeof e &&
                              ((t = t || n.defaultEncoding) !== n.encoding &&
                                ((e = S.from(e, t)), (t = "")),
                              (r = !0)),
                          o(this, e, t, !1, r)
                        );
                      }),
                      (s.prototype.unshift = function (e) {
                        return o(this, e, null, !0, !1);
                      }),
                      (s.prototype.isPaused = function () {
                        return !1 === this._readableState.flowing;
                      }),
                      (s.prototype.setEncoding = function (t) {
                        A || (A = e("string_decoder/").StringDecoder);
                        var r = new A(t);
                        ((this._readableState.decoder = r),
                          (this._readableState.encoding =
                            this._readableState.decoder.encoding));
                        for (
                          var n = this._readableState.buffer.head, i = "";
                          null !== n;
                        )
                          ((i += r.write(n.data)), (n = n.next));
                        return (
                          this._readableState.buffer.clear(),
                          "" !== i && this._readableState.buffer.push(i),
                          (this._readableState.length = i.length),
                          this
                        );
                      }),
                      (s.prototype.read = function (e) {
                        (E("read", e), (e = parseInt(e, 10)));
                        var t,
                          r = this._readableState,
                          n = e;
                        if (
                          (0 !== e && (r.emittedReadable = !1),
                          0 === e &&
                            r.needReadable &&
                            ((0 === r.highWaterMark
                              ? 0 < r.length
                              : r.length >= r.highWaterMark) ||
                              r.ended))
                        )
                          return (
                            E("read: emitReadable", r.length, r.ended),
                            0 === r.length && r.ended ? m(this) : h(this),
                            null
                          );
                        if (0 === (e = l(e, r)) && r.ended)
                          return (0 === r.length && m(this), null);
                        var i = r.needReadable;
                        return (
                          E("need readable", i),
                          (0 === r.length || r.length - e < r.highWaterMark) &&
                            E("length less than watermark", (i = !0)),
                          r.ended || r.reading
                            ? E("reading or ended", (i = !1))
                            : i &&
                              (E("do read"),
                              (r.reading = !0),
                              (r.sync = !0),
                              0 === r.length && (r.needReadable = !0),
                              this._read(r.highWaterMark),
                              (r.sync = !1),
                              r.reading || (e = l(n, r))),
                          null === (t = 0 < e ? b(e, r) : null)
                            ? ((r.needReadable = r.length <= r.highWaterMark),
                              (e = 0))
                            : ((r.length -= e), (r.awaitDrain = 0)),
                          0 === r.length &&
                            (r.ended || (r.needReadable = !0),
                            n !== e && r.ended && m(this)),
                          null !== t && this.emit("data", t),
                          t
                        );
                      }),
                      (s.prototype._read = function () {
                        U(this, new j("_read()"));
                      }),
                      (s.prototype.pipe = function (e, t) {
                        function n() {
                          (E("onend"), e.end());
                        }
                        function i(t) {
                          E("ondata");
                          var r = e.write(t);
                          (E("dest.write", r),
                            !1 === r &&
                              (((1 === u.pipesCount && u.pipes === e) ||
                                (1 < u.pipesCount && -1 !== v(u.pipes, e))) &&
                                !p &&
                                (E("false write response, pause", u.awaitDrain),
                                u.awaitDrain++),
                              c.pause()));
                        }
                        function s(t) {
                          (E("onerror", t),
                            l(),
                            e.removeListener("error", s),
                            0 === C(e, "error") && U(e, t));
                        }
                        function o() {
                          (e.removeListener("finish", a), l());
                        }
                        function a() {
                          (E("onfinish"), e.removeListener("close", o), l());
                        }
                        function l() {
                          (E("unpipe"), c.unpipe(e));
                        }
                        var h,
                          c = this,
                          u = this._readableState;
                        switch (u.pipesCount) {
                          case 0:
                            u.pipes = e;
                            break;
                          case 1:
                            u.pipes = [u.pipes, e];
                            break;
                          default:
                            u.pipes.push(e);
                        }
                        ((u.pipesCount += 1),
                          E("pipe count=%d opts=%j", u.pipesCount, t));
                        var d =
                          (t && !1 === t.end) ||
                          e === r.stdout ||
                          e === r.stderr
                            ? l
                            : n;
                        (u.endEmitted ? r.nextTick(d) : c.once("end", d),
                          e.on("unpipe", function t(r, h) {
                            (E("onunpipe"),
                              r === c &&
                                h &&
                                !1 === h.hasUnpiped &&
                                ((h.hasUnpiped = !0),
                                E("cleanup"),
                                e.removeListener("close", o),
                                e.removeListener("finish", a),
                                e.removeListener("drain", f),
                                e.removeListener("error", s),
                                e.removeListener("unpipe", t),
                                c.removeListener("end", n),
                                c.removeListener("end", l),
                                c.removeListener("data", i),
                                (p = !0),
                                u.awaitDrain &&
                                  (!e._writableState ||
                                    e._writableState.needDrain) &&
                                  f()));
                          }));
                        var f = function () {
                          var e = c._readableState;
                          (E("pipeOnDrain", e.awaitDrain),
                            e.awaitDrain && e.awaitDrain--,
                            0 === e.awaitDrain &&
                              C(c, "data") &&
                              ((e.flowing = !0), y(c)));
                        };
                        e.on("drain", f);
                        var p = !1;
                        return (
                          c.on("data", i),
                          (h = "error"),
                          "function" == typeof e.prependListener
                            ? e.prependListener(h, s)
                            : e._events && e._events[h]
                              ? Array.isArray(e._events[h])
                                ? e._events[h].unshift(s)
                                : (e._events[h] = [s, e._events[h]])
                              : e.on(h, s),
                          e.once("close", o),
                          e.once("finish", a),
                          e.emit("pipe", c),
                          u.flowing || (E("pipe resume"), c.resume()),
                          e
                        );
                      }),
                      (s.prototype.unpipe = function (e) {
                        var t = this._readableState,
                          r = { hasUnpiped: !1 };
                        if (0 === t.pipesCount) return this;
                        if (1 === t.pipesCount)
                          return (
                            (e && e !== t.pipes) ||
                              (e || (e = t.pipes),
                              (t.pipes = null),
                              (t.pipesCount = 0),
                              (t.flowing = !1),
                              e && e.emit("unpipe", this, r)),
                            this
                          );
                        if (!e) {
                          var n = t.pipes,
                            i = t.pipesCount;
                          ((t.pipes = null),
                            (t.pipesCount = 0),
                            (t.flowing = !1));
                          for (var s = 0; s < i; s++)
                            n[s].emit("unpipe", this, { hasUnpiped: !1 });
                          return this;
                        }
                        var o = v(t.pipes, e);
                        return (
                          -1 === o ||
                            (t.pipes.splice(o, 1),
                            (t.pipesCount -= 1),
                            1 === t.pipesCount && (t.pipes = t.pipes[0]),
                            e.emit("unpipe", this, r)),
                          this
                        );
                      }),
                      (s.prototype.on = function (e, t) {
                        var n = R.prototype.on.call(this, e, t),
                          i = this._readableState;
                        return (
                          "data" === e
                            ? ((i.readableListening =
                                0 < this.listenerCount("readable")),
                              !1 !== i.flowing && this.resume())
                            : "readable" != e ||
                              i.endEmitted ||
                              i.readableListening ||
                              ((i.readableListening = i.needReadable = !0),
                              (i.flowing = !1),
                              (i.emittedReadable = !1),
                              E("on readable", i.length, i.reading),
                              i.length
                                ? h(this)
                                : i.reading || r.nextTick(p, this)),
                          n
                        );
                      }),
                      (s.prototype.addListener = s.prototype.on),
                      (s.prototype.removeListener = function (e, t) {
                        var n = R.prototype.removeListener.call(this, e, t);
                        return ("readable" === e && r.nextTick(f, this), n);
                      }),
                      (s.prototype.removeAllListeners = function (e) {
                        var t = R.prototype.removeAllListeners.apply(
                          this,
                          arguments,
                        );
                        return (
                          ("readable" === e || void 0 === e) &&
                            r.nextTick(f, this),
                          t
                        );
                      }),
                      (s.prototype.resume = function () {
                        var e = this._readableState;
                        return (
                          e.flowing ||
                            (E("resume"),
                            (e.flowing = !e.readableListening),
                            e.resumeScheduled ||
                              ((e.resumeScheduled = !0),
                              r.nextTick(g, this, e))),
                          (e.paused = !1),
                          this
                        );
                      }),
                      (s.prototype.pause = function () {
                        return (
                          E(
                            "call pause flowing=%j",
                            this._readableState.flowing,
                          ),
                          !1 !== this._readableState.flowing &&
                            (E("pause"),
                            (this._readableState.flowing = !1),
                            this.emit("pause")),
                          (this._readableState.paused = !0),
                          this
                        );
                      }),
                      (s.prototype.wrap = function (e) {
                        var t = this,
                          r = this._readableState,
                          n = !1;
                        for (var i in (e.on("end", function () {
                          if ((E("wrapped end"), r.decoder && !r.ended)) {
                            var e = r.decoder.end();
                            e && e.length && t.push(e);
                          }
                          t.push(null);
                        }),
                        e.on("data", function (i) {
                          if (
                            (E("wrapped data"),
                            r.decoder && (i = r.decoder.write(i)),
                            !(r.objectMode && null == i) &&
                              (r.objectMode || (i && i.length)))
                          ) {
                            var s = t.push(i);
                            s || ((n = !0), e.pause());
                          }
                        }),
                        e))
                          void 0 === this[i] &&
                            "function" == typeof e[i] &&
                            (this[i] = (function (t) {
                              return function () {
                                return e[t].apply(e, arguments);
                              };
                            })(i));
                        for (var s = 0; s < B.length; s++)
                          e.on(B[s], this.emit.bind(this, B[s]));
                        return (
                          (this._read = function (t) {
                            (E("wrapped _read", t),
                              n && ((n = !1), e.resume()));
                          }),
                          this
                        );
                      }),
                      "function" == typeof Symbol &&
                        (s.prototype[Symbol.asyncIterator] = function () {
                          return (
                            void 0 === L &&
                              (L = e("./internal/streams/async_iterator")),
                            L(this)
                          );
                        }),
                      Object.defineProperty(
                        s.prototype,
                        "readableHighWaterMark",
                        {
                          enumerable: !1,
                          get: function () {
                            return this._readableState.highWaterMark;
                          },
                        },
                      ),
                      Object.defineProperty(s.prototype, "readableBuffer", {
                        enumerable: !1,
                        get: function () {
                          return (
                            this._readableState && this._readableState.buffer
                          );
                        },
                      }),
                      Object.defineProperty(s.prototype, "readableFlowing", {
                        enumerable: !1,
                        get: function () {
                          return this._readableState.flowing;
                        },
                        set: function (e) {
                          this._readableState &&
                            (this._readableState.flowing = e);
                        },
                      }),
                      (s._fromList = b),
                      Object.defineProperty(s.prototype, "readableLength", {
                        enumerable: !1,
                        get: function () {
                          return this._readableState.length;
                        },
                      }),
                      "function" == typeof Symbol &&
                        (s.from = function (t, r) {
                          return (
                            void 0 === O && (O = e("./internal/streams/from")),
                            O(s, t, r)
                          );
                        }));
                  }).call(this);
                }).call(
                  this,
                  e("_process"),
                  void 0 === r.g
                    ? "undefined" == typeof self
                      ? "undefined" == typeof window
                        ? {}
                        : window
                      : self
                    : r.g,
                );
              },
              {
                "../errors": 15,
                "./_stream_duplex": 16,
                "./internal/streams/async_iterator": 21,
                "./internal/streams/buffer_list": 22,
                "./internal/streams/destroy": 23,
                "./internal/streams/from": 25,
                "./internal/streams/state": 27,
                "./internal/streams/stream": 28,
                _process: 12,
                buffer: 3,
                events: 7,
                inherits: 10,
                "string_decoder/": 31,
                util: 2,
              },
            ],
            19: [
              function (e, t) {
                "use strict";
                function r(e, t) {
                  var r = this._transformState;
                  r.transforming = !1;
                  var n = r.writecb;
                  if (null === n) return this.emit("error", new l());
                  ((r.writechunk = null),
                    (r.writecb = null),
                    null != t && this.push(t),
                    n(e));
                  var i = this._readableState;
                  ((i.reading = !1),
                    (i.needReadable || i.length < i.highWaterMark) &&
                      this._read(i.highWaterMark));
                }
                function n(e) {
                  return this instanceof n
                    ? void (u.call(this, e),
                      (this._transformState = {
                        afterTransform: r.bind(this),
                        needTransform: !1,
                        transforming: !1,
                        writecb: null,
                        writechunk: null,
                        writeencoding: null,
                      }),
                      (this._readableState.needReadable = !0),
                      (this._readableState.sync = !1),
                      e &&
                        ("function" == typeof e.transform &&
                          (this._transform = e.transform),
                        "function" == typeof e.flush &&
                          (this._flush = e.flush)),
                      this.on("prefinish", i))
                    : new n(e);
                }
                function i() {
                  var e = this;
                  "function" != typeof this._flush ||
                  this._readableState.destroyed
                    ? s(this, null, null)
                    : this._flush(function (t, r) {
                        s(e, t, r);
                      });
                }
                function s(e, t, r) {
                  if (t) return e.emit("error", t);
                  if ((null != r && e.push(r), e._writableState.length))
                    throw new c();
                  if (e._transformState.transforming) throw new h();
                  return e.push(null);
                }
                t.exports = n;
                var o = e("../errors").codes,
                  a = o.ERR_METHOD_NOT_IMPLEMENTED,
                  l = o.ERR_MULTIPLE_CALLBACK,
                  h = o.ERR_TRANSFORM_ALREADY_TRANSFORMING,
                  c = o.ERR_TRANSFORM_WITH_LENGTH_0,
                  u = e("./_stream_duplex");
                (e("inherits")(n, u),
                  (n.prototype.push = function (e, t) {
                    return (
                      (this._transformState.needTransform = !1),
                      u.prototype.push.call(this, e, t)
                    );
                  }),
                  (n.prototype._transform = function (e, t, r) {
                    r(new a("_transform()"));
                  }),
                  (n.prototype._write = function (e, t, r) {
                    var n = this._transformState;
                    if (
                      ((n.writecb = r),
                      (n.writechunk = e),
                      (n.writeencoding = t),
                      !n.transforming)
                    ) {
                      var i = this._readableState;
                      (n.needTransform ||
                        i.needReadable ||
                        i.length < i.highWaterMark) &&
                        this._read(i.highWaterMark);
                    }
                  }),
                  (n.prototype._read = function () {
                    var e = this._transformState;
                    null === e.writechunk || e.transforming
                      ? (e.needTransform = !0)
                      : ((e.transforming = !0),
                        this._transform(
                          e.writechunk,
                          e.writeencoding,
                          e.afterTransform,
                        ));
                  }),
                  (n.prototype._destroy = function (e, t) {
                    u.prototype._destroy.call(this, e, function (e) {
                      t(e);
                    });
                  }));
              },
              { "../errors": 15, "./_stream_duplex": 16, inherits: 10 },
            ],
            20: [
              function (e, t) {
                (function (r, n) {
                  (function () {
                    "use strict";
                    function i(e) {
                      var t = this;
                      ((this.next = null),
                        (this.entry = null),
                        (this.finish = function () {
                          (function (e, t, r) {
                            var n = e.entry;
                            for (e.entry = null; n;) {
                              var i = n.callback;
                              (t.pendingcb--, i(void 0), (n = n.next));
                            }
                            t.corkedRequestsFree.next = e;
                          })(t, e);
                        }));
                    }
                    function s() {}
                    function o(t, n, s) {
                      ((p = p || e("./_stream_duplex")),
                        (t = t || {}),
                        "boolean" != typeof s && (s = n instanceof p),
                        (this.objectMode = !!t.objectMode),
                        s &&
                          (this.objectMode =
                            this.objectMode || !!t.writableObjectMode),
                        (this.highWaterMark = w(
                          this,
                          t,
                          "writableHighWaterMark",
                          s,
                        )),
                        (this.finalCalled = !1),
                        (this.needDrain = !1),
                        (this.ending = !1),
                        (this.ended = !1),
                        (this.finished = !1),
                        (this.destroyed = !1));
                      var o = !1 === t.decodeStrings;
                      ((this.decodeStrings = !o),
                        (this.defaultEncoding = t.defaultEncoding || "utf8"),
                        (this.length = 0),
                        (this.writing = !1),
                        (this.corked = 0),
                        (this.sync = !0),
                        (this.bufferProcessing = !1),
                        (this.onwrite = function (e) {
                          (function (e, t) {
                            var n = e._writableState,
                              i = n.sync,
                              s = n.writecb;
                            if ("function" != typeof s) throw new S();
                            if (
                              ((n.writing = !1),
                              (n.writecb = null),
                              (n.length -= n.writelen),
                              (n.writelen = 0),
                              t)
                            )
                              (--n.pendingcb,
                                i
                                  ? (r.nextTick(s, t),
                                    r.nextTick(f, e, n),
                                    (e._writableState.errorEmitted = !0),
                                    N(e, t))
                                  : (s(t),
                                    (e._writableState.errorEmitted = !0),
                                    N(e, t),
                                    f(e, n)));
                            else {
                              var o = u(n) || e.destroyed;
                              (o ||
                                n.corked ||
                                n.bufferProcessing ||
                                !n.bufferedRequest ||
                                c(e, n),
                                i ? r.nextTick(h, e, n, o, s) : h(e, n, o, s));
                            }
                          })(n, e);
                        }),
                        (this.writecb = null),
                        (this.writelen = 0),
                        (this.bufferedRequest = null),
                        (this.lastBufferedRequest = null),
                        (this.pendingcb = 0),
                        (this.prefinished = !1),
                        (this.errorEmitted = !1),
                        (this.emitClose = !1 !== t.emitClose),
                        (this.autoDestroy = !!t.autoDestroy),
                        (this.bufferedRequestCount = 0),
                        (this.corkedRequestsFree = new i(this)));
                    }
                    function a(t) {
                      var r = this instanceof (p = p || e("./_stream_duplex"));
                      return r || g.call(a, this)
                        ? void ((this._writableState = new o(t, this, r)),
                          (this.writable = !0),
                          t &&
                            ("function" == typeof t.write &&
                              (this._write = t.write),
                            "function" == typeof t.writev &&
                              (this._writev = t.writev),
                            "function" == typeof t.destroy &&
                              (this._destroy = t.destroy),
                            "function" == typeof t.final &&
                              (this._final = t.final)),
                          b.call(this))
                        : new a(t);
                    }
                    function l(e, t, r, n, i, s, o) {
                      ((t.writelen = n),
                        (t.writecb = o),
                        (t.writing = !0),
                        (t.sync = !0),
                        t.destroyed
                          ? t.onwrite(new k("write"))
                          : r
                            ? e._writev(i, t.onwrite)
                            : e._write(i, s, t.onwrite),
                        (t.sync = !1));
                    }
                    function h(e, t, r, n) {
                      (r ||
                        (0 === t.length &&
                          t.needDrain &&
                          ((t.needDrain = !1), e.emit("drain"))),
                        t.pendingcb--,
                        n(),
                        f(e, t));
                    }
                    function c(e, t) {
                      t.bufferProcessing = !0;
                      var r = t.bufferedRequest;
                      if (e._writev && r && r.next) {
                        var n = Array(t.bufferedRequestCount),
                          s = t.corkedRequestsFree;
                        s.entry = r;
                        for (var o = 0, a = !0; r;)
                          ((n[o] = r),
                            r.isBuf || (a = !1),
                            (r = r.next),
                            (o += 1));
                        ((n.allBuffers = a),
                          l(e, t, !0, t.length, n, "", s.finish),
                          t.pendingcb++,
                          (t.lastBufferedRequest = null),
                          s.next
                            ? ((t.corkedRequestsFree = s.next), (s.next = null))
                            : (t.corkedRequestsFree = new i(t)),
                          (t.bufferedRequestCount = 0));
                      } else {
                        for (; r;) {
                          var h = r.chunk,
                            c = r.encoding,
                            u = r.callback,
                            d = t.objectMode ? 1 : h.length;
                          if (
                            (l(e, t, !1, d, h, c, u),
                            (r = r.next),
                            t.bufferedRequestCount--,
                            t.writing)
                          )
                            break;
                        }
                        null === r && (t.lastBufferedRequest = null);
                      }
                      ((t.bufferedRequest = r), (t.bufferProcessing = !1));
                    }
                    function u(e) {
                      return (
                        e.ending &&
                        0 === e.length &&
                        null === e.bufferedRequest &&
                        !e.finished &&
                        !e.writing
                      );
                    }
                    function d(e, t) {
                      e._final(function (r) {
                        (t.pendingcb--,
                          r && N(e, r),
                          (t.prefinished = !0),
                          e.emit("prefinish"),
                          f(e, t));
                      });
                    }
                    function f(e, t) {
                      var n = u(t);
                      if (
                        n &&
                        (t.prefinished ||
                          t.finalCalled ||
                          ("function" != typeof e._final || t.destroyed
                            ? ((t.prefinished = !0), e.emit("prefinish"))
                            : (t.pendingcb++,
                              (t.finalCalled = !0),
                              r.nextTick(d, e, t))),
                        0 === t.pendingcb &&
                          ((t.finished = !0), e.emit("finish"), t.autoDestroy))
                      ) {
                        var i = e._readableState;
                        (!i || (i.autoDestroy && i.endEmitted)) && e.destroy();
                      }
                      return n;
                    }
                    ((t.exports = a), (a.WritableState = o));
                    var p,
                      g,
                      y = { deprecate: e("util-deprecate") },
                      b = e("./internal/streams/stream"),
                      m = e("buffer").Buffer,
                      _ = n.Uint8Array || function () {},
                      v = e("./internal/streams/destroy"),
                      w = e("./internal/streams/state").getHighWaterMark,
                      E = e("../errors").codes,
                      C = E.ERR_INVALID_ARG_TYPE,
                      R = E.ERR_METHOD_NOT_IMPLEMENTED,
                      S = E.ERR_MULTIPLE_CALLBACK,
                      T = E.ERR_STREAM_CANNOT_PIPE,
                      k = E.ERR_STREAM_DESTROYED,
                      A = E.ERR_STREAM_NULL_VALUES,
                      L = E.ERR_STREAM_WRITE_AFTER_END,
                      O = E.ERR_UNKNOWN_ENCODING,
                      N = v.errorOrDestroy;
                    (e("inherits")(a, b),
                      (o.prototype.getBuffer = function () {
                        for (var e = this.bufferedRequest, t = []; e;)
                          (t.push(e), (e = e.next));
                        return t;
                      }),
                      (function () {
                        try {
                          Object.defineProperty(o.prototype, "buffer", {
                            get: y.deprecate(
                              function () {
                                return this.getBuffer();
                              },
                              "_writableState.buffer is deprecated. Use _writableState.getBuffer instead.",
                              "DEP0003",
                            ),
                          });
                        } catch (e) {}
                      })(),
                      "function" == typeof Symbol &&
                      Symbol.hasInstance &&
                      "function" ==
                        typeof Function.prototype[Symbol.hasInstance]
                        ? ((g = Function.prototype[Symbol.hasInstance]),
                          Object.defineProperty(a, Symbol.hasInstance, {
                            value: function (e) {
                              return (
                                !!g.call(this, e) ||
                                (!(this !== a) &&
                                  e &&
                                  e._writableState instanceof o)
                              );
                            },
                          }))
                        : (g = function (e) {
                            return e instanceof this;
                          }),
                      (a.prototype.pipe = function () {
                        N(this, new T());
                      }),
                      (a.prototype.write = function (e, t, n) {
                        var i,
                          o,
                          a,
                          h,
                          c,
                          u,
                          d,
                          f = this._writableState,
                          p = !1,
                          g =
                            !f.objectMode &&
                            ((i = e), m.isBuffer(i) || i instanceof _);
                        return (
                          g && !m.isBuffer(e) && ((o = e), (e = m.from(o))),
                          "function" == typeof t && ((n = t), (t = null)),
                          g ? (t = "buffer") : t || (t = f.defaultEncoding),
                          "function" != typeof n && (n = s),
                          f.ending
                            ? ((a = n),
                              N(this, (h = new L())),
                              r.nextTick(a, h))
                            : (!g &&
                                ((c = e),
                                (u = n),
                                null === c
                                  ? (d = new A())
                                  : "string" == typeof c ||
                                    f.objectMode ||
                                    (d = new C(
                                      "chunk",
                                      ["string", "Buffer"],
                                      c,
                                    )),
                                d && (N(this, d), r.nextTick(u, d), 1))) ||
                              (f.pendingcb++,
                              (p = (function (e, t, r, n, i, s) {
                                if (!r) {
                                  var o,
                                    a,
                                    h =
                                      ((o = n),
                                      (a = i),
                                      t.objectMode ||
                                        !1 === t.decodeStrings ||
                                        "string" != typeof o ||
                                        (o = m.from(o, a)),
                                      o);
                                  n !== h &&
                                    ((r = !0), (i = "buffer"), (n = h));
                                }
                                var c = t.objectMode ? 1 : n.length;
                                t.length += c;
                                var u = t.length < t.highWaterMark;
                                if (
                                  (u || (t.needDrain = !0),
                                  t.writing || t.corked)
                                ) {
                                  var d = t.lastBufferedRequest;
                                  ((t.lastBufferedRequest = {
                                    chunk: n,
                                    encoding: i,
                                    isBuf: r,
                                    callback: s,
                                    next: null,
                                  }),
                                    d
                                      ? (d.next = t.lastBufferedRequest)
                                      : (t.bufferedRequest =
                                          t.lastBufferedRequest),
                                    (t.bufferedRequestCount += 1));
                                } else l(e, t, !1, c, n, i, s);
                                return u;
                              })(this, f, g, e, t, n))),
                          p
                        );
                      }),
                      (a.prototype.cork = function () {
                        this._writableState.corked++;
                      }),
                      (a.prototype.uncork = function () {
                        var e = this._writableState;
                        !e.corked ||
                          (e.corked--,
                          e.writing ||
                            e.corked ||
                            e.bufferProcessing ||
                            !e.bufferedRequest ||
                            c(this, e));
                      }),
                      (a.prototype.setDefaultEncoding = function (e) {
                        if (
                          ("string" == typeof e && (e = e.toLowerCase()),
                          !(
                            -1 <
                            [
                              "hex",
                              "utf8",
                              "utf-8",
                              "ascii",
                              "binary",
                              "base64",
                              "ucs2",
                              "ucs-2",
                              "utf16le",
                              "utf-16le",
                              "raw",
                            ].indexOf((e + "").toLowerCase())
                          ))
                        )
                          throw new O(e);
                        return (
                          (this._writableState.defaultEncoding = e),
                          this
                        );
                      }),
                      Object.defineProperty(a.prototype, "writableBuffer", {
                        enumerable: !1,
                        get: function () {
                          return (
                            this._writableState &&
                            this._writableState.getBuffer()
                          );
                        },
                      }),
                      Object.defineProperty(
                        a.prototype,
                        "writableHighWaterMark",
                        {
                          enumerable: !1,
                          get: function () {
                            return this._writableState.highWaterMark;
                          },
                        },
                      ),
                      (a.prototype._write = function (e, t, r) {
                        r(new R("_write()"));
                      }),
                      (a.prototype._writev = null),
                      (a.prototype.end = function (e, t, n) {
                        var i,
                          s = this._writableState;
                        return (
                          "function" == typeof e
                            ? ((n = e), (e = null), (t = null))
                            : "function" == typeof t && ((n = t), (t = null)),
                          null != e && this.write(e, t),
                          s.corked && ((s.corked = 1), this.uncork()),
                          s.ending ||
                            ((i = n),
                            (s.ending = !0),
                            f(this, s),
                            i &&
                              (s.finished
                                ? r.nextTick(i)
                                : this.once("finish", i)),
                            (s.ended = !0),
                            (this.writable = !1)),
                          this
                        );
                      }),
                      Object.defineProperty(a.prototype, "writableLength", {
                        enumerable: !1,
                        get: function () {
                          return this._writableState.length;
                        },
                      }),
                      Object.defineProperty(a.prototype, "destroyed", {
                        enumerable: !1,
                        get: function () {
                          return (
                            void 0 !== this._writableState &&
                            this._writableState.destroyed
                          );
                        },
                        set: function (e) {
                          this._writableState &&
                            (this._writableState.destroyed = e);
                        },
                      }),
                      (a.prototype.destroy = v.destroy),
                      (a.prototype._undestroy = v.undestroy),
                      (a.prototype._destroy = function (e, t) {
                        t(e);
                      }));
                  }).call(this);
                }).call(
                  this,
                  e("_process"),
                  void 0 === r.g
                    ? "undefined" == typeof self
                      ? "undefined" == typeof window
                        ? {}
                        : window
                      : self
                    : r.g,
                );
              },
              {
                "../errors": 15,
                "./_stream_duplex": 16,
                "./internal/streams/destroy": 23,
                "./internal/streams/state": 27,
                "./internal/streams/stream": 28,
                _process: 12,
                buffer: 3,
                inherits: 10,
                "util-deprecate": 32,
              },
            ],
            21: [
              function (e, t) {
                (function (r) {
                  (function () {
                    "use strict";
                    function n(e, t, r) {
                      return (
                        t in e
                          ? Object.defineProperty(e, t, {
                              value: r,
                              enumerable: !0,
                              configurable: !0,
                              writable: !0,
                            })
                          : (e[t] = r),
                        e
                      );
                    }
                    function i(e, t) {
                      return { value: e, done: t };
                    }
                    function s(e) {
                      var t = e[h];
                      if (null !== t) {
                        var r = e[g].read();
                        null !== r &&
                          ((e[f] = null),
                          (e[h] = null),
                          (e[c] = null),
                          t(i(r, !1)));
                      }
                    }
                    function o(e) {
                      r.nextTick(s, e);
                    }
                    var a,
                      l = e("./end-of-stream"),
                      h = Symbol("lastResolve"),
                      c = Symbol("lastReject"),
                      u = Symbol("error"),
                      d = Symbol("ended"),
                      f = Symbol("lastPromise"),
                      p = Symbol("handlePromise"),
                      g = Symbol("stream"),
                      y = Object.getPrototypeOf(function () {}),
                      b = Object.setPrototypeOf(
                        (n(
                          (a = {
                            get stream() {
                              return this[g];
                            },
                            next: function () {
                              var e,
                                t = this,
                                n = this[u];
                              if (null !== n) return Promise.reject(n);
                              if (this[d])
                                return Promise.resolve(i(void 0, !0));
                              if (this[g].destroyed)
                                return new Promise(function (e, n) {
                                  r.nextTick(function () {
                                    t[u] ? n(t[u]) : e(i(void 0, !0));
                                  });
                                });
                              var s,
                                o = this[f];
                              if (o)
                                s = new Promise(
                                  ((e = this),
                                  function (t, r) {
                                    o.then(function () {
                                      return e[d]
                                        ? void t(i(void 0, !0))
                                        : void e[p](t, r);
                                    }, r);
                                  }),
                                );
                              else {
                                var a = this[g].read();
                                if (null !== a)
                                  return Promise.resolve(i(a, !1));
                                s = new Promise(this[p]);
                              }
                              return ((this[f] = s), s);
                            },
                          }),
                          Symbol.asyncIterator,
                          function () {
                            return this;
                          },
                        ),
                        n(a, "return", function () {
                          var e = this;
                          return new Promise(function (t, r) {
                            e[g].destroy(null, function (e) {
                              return e ? void r(e) : void t(i(void 0, !0));
                            });
                          });
                        }),
                        a),
                        y,
                      );
                    t.exports = function (e) {
                      var t,
                        r = Object.create(
                          b,
                          (n((t = {}), g, { value: e, writable: !0 }),
                          n(t, h, { value: null, writable: !0 }),
                          n(t, c, { value: null, writable: !0 }),
                          n(t, u, { value: null, writable: !0 }),
                          n(t, d, {
                            value: e._readableState.endEmitted,
                            writable: !0,
                          }),
                          n(t, p, {
                            value: function (e, t) {
                              var n = r[g].read();
                              n
                                ? ((r[f] = null),
                                  (r[h] = null),
                                  (r[c] = null),
                                  e(i(n, !1)))
                                : ((r[h] = e), (r[c] = t));
                            },
                            writable: !0,
                          }),
                          t),
                        );
                      return (
                        (r[f] = null),
                        l(e, function (e) {
                          if (e && "ERR_STREAM_PREMATURE_CLOSE" !== e.code) {
                            var t = r[c];
                            return (
                              null !== t &&
                                ((r[f] = null),
                                (r[h] = null),
                                (r[c] = null),
                                t(e)),
                              void (r[u] = e)
                            );
                          }
                          var n = r[h];
                          (null !== n &&
                            ((r[f] = null),
                            (r[h] = null),
                            (r[c] = null),
                            n(i(void 0, !0))),
                            (r[d] = !0));
                        }),
                        e.on("readable", o.bind(null, r)),
                        r
                      );
                    };
                  }).call(this);
                }).call(this, e("_process"));
              },
              { "./end-of-stream": 24, _process: 12 },
            ],
            22: [
              function (e, t) {
                "use strict";
                function r(e, t) {
                  var r = Object.keys(e);
                  if (Object.getOwnPropertySymbols) {
                    var n = Object.getOwnPropertySymbols(e);
                    (t &&
                      (n = n.filter(function (t) {
                        return Object.getOwnPropertyDescriptor(e, t).enumerable;
                      })),
                      r.push.apply(r, n));
                  }
                  return r;
                }
                var n = e("buffer").Buffer,
                  i = e("util").inspect,
                  s = (i && i.custom) || "inspect";
                t.exports = (function () {
                  var e;
                  function t() {
                    ((function (e, t) {
                      if (!(e instanceof t))
                        throw TypeError("Cannot call a class as a function");
                    })(this, t),
                      (this.head = null),
                      (this.tail = null),
                      (this.length = 0));
                  }
                  return (
                    (e = [
                      {
                        key: "push",
                        value: function (e) {
                          var t = { data: e, next: null };
                          (0 < this.length
                            ? (this.tail.next = t)
                            : (this.head = t),
                            (this.tail = t),
                            ++this.length);
                        },
                      },
                      {
                        key: "unshift",
                        value: function (e) {
                          var t = { data: e, next: this.head };
                          (0 === this.length && (this.tail = t),
                            (this.head = t),
                            ++this.length);
                        },
                      },
                      {
                        key: "shift",
                        value: function () {
                          if (0 !== this.length) {
                            var e = this.head.data;
                            return (
                              (this.head =
                                1 === this.length
                                  ? (this.tail = null)
                                  : this.head.next),
                              --this.length,
                              e
                            );
                          }
                        },
                      },
                      {
                        key: "clear",
                        value: function () {
                          ((this.head = this.tail = null), (this.length = 0));
                        },
                      },
                      {
                        key: "join",
                        value: function (e) {
                          if (0 === this.length) return "";
                          for (
                            var t = this.head, r = "" + t.data;
                            (t = t.next);
                          )
                            r += e + t.data;
                          return r;
                        },
                      },
                      {
                        key: "concat",
                        value: function (e) {
                          if (0 === this.length) return n.alloc(0);
                          for (
                            var t,
                              r,
                              i = n.allocUnsafe(e >>> 0),
                              s = this.head,
                              o = 0;
                            s;
                          )
                            ((t = s.data),
                              (r = o),
                              n.prototype.copy.call(t, i, r),
                              (o += s.data.length),
                              (s = s.next));
                          return i;
                        },
                      },
                      {
                        key: "consume",
                        value: function (e, t) {
                          var r;
                          return (
                            e < this.head.data.length
                              ? ((r = this.head.data.slice(0, e)),
                                (this.head.data = this.head.data.slice(e)))
                              : (r =
                                  e === this.head.data.length
                                    ? this.shift()
                                    : t
                                      ? this._getString(e)
                                      : this._getBuffer(e)),
                            r
                          );
                        },
                      },
                      {
                        key: "first",
                        value: function () {
                          return this.head.data;
                        },
                      },
                      {
                        key: "_getString",
                        value: function (e) {
                          var t = this.head,
                            r = 1,
                            n = t.data;
                          for (e -= n.length; (t = t.next);) {
                            var i = t.data,
                              s = e > i.length ? i.length : e;
                            if (
                              ((n += s === i.length ? i : i.slice(0, e)),
                              0 == (e -= s))
                            ) {
                              s === i.length
                                ? (++r,
                                  (this.head = t.next
                                    ? t.next
                                    : (this.tail = null)))
                                : ((this.head = t), (t.data = i.slice(s)));
                              break;
                            }
                            ++r;
                          }
                          return ((this.length -= r), n);
                        },
                      },
                      {
                        key: "_getBuffer",
                        value: function (e) {
                          var t = n.allocUnsafe(e),
                            r = this.head,
                            i = 1;
                          for (
                            r.data.copy(t), e -= r.data.length;
                            (r = r.next);
                          ) {
                            var s = r.data,
                              o = e > s.length ? s.length : e;
                            if (
                              (s.copy(t, t.length - e, 0, o), 0 == (e -= o))
                            ) {
                              o === s.length
                                ? (++i,
                                  (this.head = r.next
                                    ? r.next
                                    : (this.tail = null)))
                                : ((this.head = r), (r.data = s.slice(o)));
                              break;
                            }
                            ++i;
                          }
                          return ((this.length -= i), t);
                        },
                      },
                      {
                        key: s,
                        value: function (e, t) {
                          return i(
                            this,
                            (function (e) {
                              for (var t, n = 1; n < arguments.length; n++)
                                ((t = null == arguments[n] ? {} : arguments[n]),
                                  n % 2
                                    ? r(Object(t), !0).forEach(function (r) {
                                        var n;
                                        ((n = t[r]),
                                          r in e
                                            ? Object.defineProperty(e, r, {
                                                value: n,
                                                enumerable: !0,
                                                configurable: !0,
                                                writable: !0,
                                              })
                                            : (e[r] = n));
                                      })
                                    : Object.getOwnPropertyDescriptors
                                      ? Object.defineProperties(
                                          e,
                                          Object.getOwnPropertyDescriptors(t),
                                        )
                                      : r(Object(t)).forEach(function (r) {
                                          Object.defineProperty(
                                            e,
                                            r,
                                            Object.getOwnPropertyDescriptor(
                                              t,
                                              r,
                                            ),
                                          );
                                        }));
                              return e;
                            })({}, t, { depth: 0, customInspect: !1 }),
                          );
                        },
                      },
                    ]),
                    (function (e, t) {
                      for (var r, n = 0; n < t.length; n++)
                        (((r = t[n]).enumerable = r.enumerable || !1),
                          (r.configurable = !0),
                          "value" in r && (r.writable = !0),
                          Object.defineProperty(e, r.key, r));
                    })(t.prototype, e),
                    t
                  );
                })();
              },
              { buffer: 3, util: 2 },
            ],
            23: [
              function (e, t) {
                (function (e) {
                  (function () {
                    "use strict";
                    function r(e, t) {
                      (i(e, t), n(e));
                    }
                    function n(e) {
                      (e._writableState && !e._writableState.emitClose) ||
                        (e._readableState && !e._readableState.emitClose) ||
                        e.emit("close");
                    }
                    function i(e, t) {
                      e.emit("error", t);
                    }
                    t.exports = {
                      destroy: function (t, s) {
                        var o = this,
                          a =
                            this._readableState &&
                            this._readableState.destroyed,
                          l =
                            this._writableState &&
                            this._writableState.destroyed;
                        return (
                          a || l
                            ? s
                              ? s(t)
                              : t &&
                                (this._writableState
                                  ? this._writableState.errorEmitted ||
                                    ((this._writableState.errorEmitted = !0),
                                    e.nextTick(i, this, t))
                                  : e.nextTick(i, this, t))
                            : (this._readableState &&
                                (this._readableState.destroyed = !0),
                              this._writableState &&
                                (this._writableState.destroyed = !0),
                              this._destroy(t || null, function (t) {
                                !s && t
                                  ? o._writableState
                                    ? o._writableState.errorEmitted
                                      ? e.nextTick(n, o)
                                      : ((o._writableState.errorEmitted = !0),
                                        e.nextTick(r, o, t))
                                    : e.nextTick(r, o, t)
                                  : s
                                    ? (e.nextTick(n, o), s(t))
                                    : e.nextTick(n, o);
                              })),
                          this
                        );
                      },
                      undestroy: function () {
                        (this._readableState &&
                          ((this._readableState.destroyed = !1),
                          (this._readableState.reading = !1),
                          (this._readableState.ended = !1),
                          (this._readableState.endEmitted = !1)),
                          this._writableState &&
                            ((this._writableState.destroyed = !1),
                            (this._writableState.ended = !1),
                            (this._writableState.ending = !1),
                            (this._writableState.finalCalled = !1),
                            (this._writableState.prefinished = !1),
                            (this._writableState.finished = !1),
                            (this._writableState.errorEmitted = !1)));
                      },
                      errorOrDestroy: function (e, t) {
                        var r = e._readableState,
                          n = e._writableState;
                        (r && r.autoDestroy) || (n && n.autoDestroy)
                          ? e.destroy(t)
                          : e.emit("error", t);
                      },
                    };
                  }).call(this);
                }).call(this, e("_process"));
              },
              { _process: 12 },
            ],
            24: [
              function (e, t) {
                "use strict";
                function r() {}
                var n = e("../../../errors").codes.ERR_STREAM_PREMATURE_CLOSE;
                t.exports = function e(t, i, s) {
                  if ("function" == typeof i) return e(t, null, i);
                  (i || (i = {}),
                    (o = s || r),
                    (a = !1),
                    (s = function () {
                      if (!a) {
                        a = !0;
                        for (
                          var e = arguments.length, t = Array(e), r = 0;
                          r < e;
                          r++
                        )
                          t[r] = arguments[r];
                        o.apply(this, t);
                      }
                    }));
                  var o,
                    a,
                    l = i.readable || (!1 !== i.readable && t.readable),
                    h = i.writable || (!1 !== i.writable && t.writable),
                    c = function () {
                      t.writable || d();
                    },
                    u = t._writableState && t._writableState.finished,
                    d = function () {
                      ((h = !1), (u = !0), l || s.call(t));
                    },
                    f = t._readableState && t._readableState.endEmitted,
                    p = function () {
                      ((l = !1), (f = !0), h || s.call(t));
                    },
                    g = function (e) {
                      s.call(t, e);
                    },
                    y = function () {
                      var e;
                      return l && !f
                        ? ((t._readableState && t._readableState.ended) ||
                            (e = new n()),
                          s.call(t, e))
                        : h && !u
                          ? ((t._writableState && t._writableState.ended) ||
                              (e = new n()),
                            s.call(t, e))
                          : void 0;
                    },
                    b = function () {
                      t.req.on("finish", d);
                    };
                  return (
                    t.setHeader && "function" == typeof t.abort
                      ? (t.on("complete", d),
                        t.on("abort", y),
                        t.req ? b() : t.on("request", b))
                      : h &&
                        !t._writableState &&
                        (t.on("end", c), t.on("close", c)),
                    t.on("end", p),
                    t.on("finish", d),
                    !1 !== i.error && t.on("error", g),
                    t.on("close", y),
                    function () {
                      (t.removeListener("complete", d),
                        t.removeListener("abort", y),
                        t.removeListener("request", b),
                        t.req && t.req.removeListener("finish", d),
                        t.removeListener("end", c),
                        t.removeListener("close", c),
                        t.removeListener("finish", d),
                        t.removeListener("end", p),
                        t.removeListener("error", g),
                        t.removeListener("close", y));
                    }
                  );
                };
              },
              { "../../../errors": 15 },
            ],
            25: [
              function (e, t) {
                t.exports = function () {
                  throw Error("Readable.from is not available in the browser");
                };
              },
              {},
            ],
            26: [
              function (e, t) {
                "use strict";
                function r(e) {
                  if (e) throw e;
                }
                function n(e) {
                  e();
                }
                function i(e, t) {
                  return e.pipe(t);
                }
                var s,
                  o = e("../../../errors").codes,
                  a = o.ERR_MISSING_ARGS,
                  l = o.ERR_STREAM_DESTROYED;
                t.exports = function () {
                  for (
                    var t = arguments.length, o = Array(t), h = 0;
                    h < t;
                    h++
                  )
                    o[h] = arguments[h];
                  var c =
                    (u = o).length && "function" == typeof u[u.length - 1]
                      ? u.pop()
                      : r;
                  if ((Array.isArray(o[0]) && (o = o[0]), 2 > o.length))
                    throw new a("streams");
                  var u,
                    d,
                    f = o.map(function (t, r) {
                      var i,
                        a,
                        h,
                        u,
                        p,
                        g,
                        y = r < o.length - 1;
                      return (
                        (i = 0 < r),
                        (h = a =
                          function (e) {
                            (d || (d = e),
                              e && f.forEach(n),
                              y || (f.forEach(n), c(d)));
                          }),
                        (u = !1),
                        (a = function () {
                          u || ((u = !0), h.apply(void 0, arguments));
                        }),
                        (p = !1),
                        t.on("close", function () {
                          p = !0;
                        }),
                        void 0 === s && (s = e("./end-of-stream")),
                        s(t, { readable: y, writable: i }, function (e) {
                          return e ? a(e) : void ((p = !0), a());
                        }),
                        (g = !1),
                        function (e) {
                          if (!p)
                            return g
                              ? void 0
                              : ((g = !0),
                                t.setHeader && "function" == typeof t.abort
                                  ? t.abort()
                                  : "function" == typeof t.destroy
                                    ? t.destroy()
                                    : void a(e || new l("pipe")));
                        }
                      );
                    });
                  return o.reduce(i);
                };
              },
              { "../../../errors": 15, "./end-of-stream": 24 },
            ],
            27: [
              function (t, r) {
                "use strict";
                var n = t("../../../errors").codes.ERR_INVALID_OPT_VALUE;
                r.exports = {
                  getHighWaterMark: function (t, r, i, s) {
                    var o =
                      null == r.highWaterMark
                        ? s
                          ? r[i]
                          : null
                        : r.highWaterMark;
                    if (null != o) {
                      if (!(isFinite(o) && e(o) === o) || 0 > o)
                        throw new n(s ? i : "highWaterMark", o);
                      return e(o);
                    }
                    return t.objectMode ? 16 : 16384;
                  },
                };
              },
              { "../../../errors": 15 },
            ],
            28: [
              function (e, t) {
                t.exports = e("events").EventEmitter;
              },
              { events: 7 },
            ],
            29: [
              function (e, t, r) {
                (((r = t.exports = e("./lib/_stream_readable.js")).Stream = r),
                  (r.Readable = r),
                  (r.Writable = e("./lib/_stream_writable.js")),
                  (r.Duplex = e("./lib/_stream_duplex.js")),
                  (r.Transform = e("./lib/_stream_transform.js")),
                  (r.PassThrough = e("./lib/_stream_passthrough.js")),
                  (r.finished = e("./lib/internal/streams/end-of-stream.js")),
                  (r.pipeline = e("./lib/internal/streams/pipeline.js")));
              },
              {
                "./lib/_stream_duplex.js": 16,
                "./lib/_stream_passthrough.js": 17,
                "./lib/_stream_readable.js": 18,
                "./lib/_stream_transform.js": 19,
                "./lib/_stream_writable.js": 20,
                "./lib/internal/streams/end-of-stream.js": 24,
                "./lib/internal/streams/pipeline.js": 26,
              },
            ],
            30: [
              function (e, t, r) {
                function n(e, t) {
                  for (var r in e) t[r] = e[r];
                }
                function i(e, t, r) {
                  return o(e, t, r);
                }
                /*! safe-buffer. MIT License. Feross Aboukhadijeh <https://feross.org/opensource> */ var s =
                    e("buffer"),
                  o = s.Buffer;
                (o.from && o.alloc && o.allocUnsafe && o.allocUnsafeSlow
                  ? (t.exports = s)
                  : (n(s, r), (r.Buffer = i)),
                  (i.prototype = Object.create(o.prototype)),
                  n(o, i),
                  (i.from = function (e, t, r) {
                    if ("number" == typeof e)
                      throw TypeError("Argument must not be a number");
                    return o(e, t, r);
                  }),
                  (i.alloc = function (e, t, r) {
                    if ("number" != typeof e)
                      throw TypeError("Argument must be a number");
                    var n = o(e);
                    return (
                      void 0 === t
                        ? n.fill(0)
                        : "string" == typeof r
                          ? n.fill(t, r)
                          : n.fill(t),
                      n
                    );
                  }),
                  (i.allocUnsafe = function (e) {
                    if ("number" != typeof e)
                      throw TypeError("Argument must be a number");
                    return o(e);
                  }),
                  (i.allocUnsafeSlow = function (e) {
                    if ("number" != typeof e)
                      throw TypeError("Argument must be a number");
                    return s.SlowBuffer(e);
                  }));
              },
              { buffer: 3 },
            ],
            31: [
              function (e, t, r) {
                "use strict";
                function n(e) {
                  var t;
                  switch (
                    ((this.encoding = (function (e) {
                      var t = (function (e) {
                        if (!e) return "utf8";
                        for (var t; ;)
                          switch (e) {
                            case "utf8":
                            case "utf-8":
                              return "utf8";
                            case "ucs2":
                            case "ucs-2":
                            case "utf16le":
                            case "utf-16le":
                              return "utf16le";
                            case "latin1":
                            case "binary":
                              return "latin1";
                            case "base64":
                            case "ascii":
                            case "hex":
                              return e;
                            default:
                              if (t) return;
                              ((e = ("" + e).toLowerCase()), (t = !0));
                          }
                      })(e);
                      if ("string" != typeof t && (d.isEncoding === f || !f(e)))
                        throw Error("Unknown encoding: " + e);
                      return t || e;
                    })(e)),
                    this.encoding)
                  ) {
                    case "utf16le":
                      ((this.text = o), (this.end = a), (t = 4));
                      break;
                    case "utf8":
                      ((this.fillLast = s), (t = 4));
                      break;
                    case "base64":
                      ((this.text = l), (this.end = h), (t = 3));
                      break;
                    default:
                      return ((this.write = c), void (this.end = u));
                  }
                  ((this.lastNeed = 0),
                    (this.lastTotal = 0),
                    (this.lastChar = d.allocUnsafe(t)));
                }
                function i(e) {
                  return 127 >= e
                    ? 0
                    : 6 == e >> 5
                      ? 2
                      : 14 == e >> 4
                        ? 3
                        : 30 == e >> 3
                          ? 4
                          : 2 == e >> 6
                            ? -1
                            : -2;
                }
                function s(e) {
                  var t = this.lastTotal - this.lastNeed,
                    r = (function (e, t) {
                      if (128 != (192 & t[0])) return ((e.lastNeed = 0), "�");
                      if (1 < e.lastNeed && 1 < t.length) {
                        if (128 != (192 & t[1])) return ((e.lastNeed = 1), "�");
                        if (
                          2 < e.lastNeed &&
                          2 < t.length &&
                          128 != (192 & t[2])
                        )
                          return ((e.lastNeed = 2), "�");
                      }
                    })(this, e, t);
                  return void 0 === r
                    ? this.lastNeed <= e.length
                      ? (e.copy(this.lastChar, t, 0, this.lastNeed),
                        this.lastChar.toString(
                          this.encoding,
                          0,
                          this.lastTotal,
                        ))
                      : void (e.copy(this.lastChar, t, 0, e.length),
                        (this.lastNeed -= e.length))
                    : r;
                }
                function o(e, t) {
                  if (0 == (e.length - t) % 2) {
                    var r = e.toString("utf16le", t);
                    if (r) {
                      var n = r.charCodeAt(r.length - 1);
                      if (55296 <= n && 56319 >= n)
                        return (
                          (this.lastNeed = 2),
                          (this.lastTotal = 4),
                          (this.lastChar[0] = e[e.length - 2]),
                          (this.lastChar[1] = e[e.length - 1]),
                          r.slice(0, -1)
                        );
                    }
                    return r;
                  }
                  return (
                    (this.lastNeed = 1),
                    (this.lastTotal = 2),
                    (this.lastChar[0] = e[e.length - 1]),
                    e.toString("utf16le", t, e.length - 1)
                  );
                }
                function a(e) {
                  var t = e && e.length ? this.write(e) : "";
                  if (this.lastNeed) {
                    var r = this.lastTotal - this.lastNeed;
                    return t + this.lastChar.toString("utf16le", 0, r);
                  }
                  return t;
                }
                function l(e, t) {
                  var r = (e.length - t) % 3;
                  return 0 == r
                    ? e.toString("base64", t)
                    : ((this.lastNeed = 3 - r),
                      (this.lastTotal = 3),
                      1 == r
                        ? (this.lastChar[0] = e[e.length - 1])
                        : ((this.lastChar[0] = e[e.length - 2]),
                          (this.lastChar[1] = e[e.length - 1])),
                      e.toString("base64", t, e.length - r));
                }
                function h(e) {
                  var t = e && e.length ? this.write(e) : "";
                  return this.lastNeed
                    ? t + this.lastChar.toString("base64", 0, 3 - this.lastNeed)
                    : t;
                }
                function c(e) {
                  return e.toString(this.encoding);
                }
                function u(e) {
                  return e && e.length ? this.write(e) : "";
                }
                var d = e("safe-buffer").Buffer,
                  f =
                    d.isEncoding ||
                    function (e) {
                      switch ((e = "" + e) && e.toLowerCase()) {
                        case "hex":
                        case "utf8":
                        case "utf-8":
                        case "ascii":
                        case "binary":
                        case "base64":
                        case "ucs2":
                        case "ucs-2":
                        case "utf16le":
                        case "utf-16le":
                        case "raw":
                          return !0;
                        default:
                          return !1;
                      }
                    };
                ((r.StringDecoder = n),
                  (n.prototype.write = function (e) {
                    var t, r;
                    if (0 === e.length) return "";
                    if (this.lastNeed) {
                      if (void 0 === (t = this.fillLast(e))) return "";
                      ((r = this.lastNeed), (this.lastNeed = 0));
                    } else r = 0;
                    return r < e.length
                      ? t
                        ? t + this.text(e, r)
                        : this.text(e, r)
                      : t || "";
                  }),
                  (n.prototype.end = function (e) {
                    var t = e && e.length ? this.write(e) : "";
                    return this.lastNeed ? t + "�" : t;
                  }),
                  (n.prototype.text = function (e, t) {
                    var r = (function (e, t, r) {
                      var n = t.length - 1;
                      if (n < r) return 0;
                      var s = i(t[n]);
                      return 0 <= s
                        ? (0 < s && (e.lastNeed = s - 1), s)
                        : --n < r || -2 === s
                          ? 0
                          : 0 <= (s = i(t[n]))
                            ? (0 < s && (e.lastNeed = s - 2), s)
                            : --n < r || -2 === s
                              ? 0
                              : 0 <= (s = i(t[n]))
                                ? (0 < s &&
                                    (2 === s ? (s = 0) : (e.lastNeed = s - 3)),
                                  s)
                                : 0;
                    })(this, e, t);
                    if (!this.lastNeed) return e.toString("utf8", t);
                    this.lastTotal = r;
                    var n = e.length - (r - this.lastNeed);
                    return (
                      e.copy(this.lastChar, 0, n),
                      e.toString("utf8", t, n)
                    );
                  }),
                  (n.prototype.fillLast = function (e) {
                    return this.lastNeed <= e.length
                      ? (e.copy(
                          this.lastChar,
                          this.lastTotal - this.lastNeed,
                          0,
                          this.lastNeed,
                        ),
                        this.lastChar.toString(
                          this.encoding,
                          0,
                          this.lastTotal,
                        ))
                      : void (e.copy(
                          this.lastChar,
                          this.lastTotal - this.lastNeed,
                          0,
                          e.length,
                        ),
                        (this.lastNeed -= e.length));
                  }));
              },
              { "safe-buffer": 30 },
            ],
            32: [
              function (e, t) {
                (function (e) {
                  (function () {
                    function r(t) {
                      try {
                        if (!e.localStorage) return !1;
                      } catch (e) {
                        return !1;
                      }
                      var r = e.localStorage[t];
                      return null != r && "true" === (r + "").toLowerCase();
                    }
                    t.exports = function (e, t) {
                      if (r("noDeprecation")) return e;
                      var n = !1;
                      return function () {
                        if (!n) {
                          if (r("throwDeprecation")) throw Error(t);
                          (r("traceDeprecation")
                            ? console.trace(t)
                            : console.warn(t),
                            (n = !0));
                        }
                        return e.apply(this, arguments);
                      };
                    };
                  }).call(this);
                }).call(
                  this,
                  void 0 === r.g
                    ? "undefined" == typeof self
                      ? "undefined" == typeof window
                        ? {}
                        : window
                      : self
                    : r.g,
                );
              },
              {},
            ],
            "/": [
              function (e, t) {
                function r(e) {
                  return e.replace(/a=ice-options:trickle\s\n/g, "");
                }
                let n = e("debug")("simple-peer"),
                  i = e("get-browser-rtc"),
                  s = e("randombytes"),
                  o = e("readable-stream"),
                  a = e("queue-microtask"),
                  l = e("err-code"),
                  { Buffer: h } = e("buffer");
                class c extends o.Duplex {
                  constructor(e) {
                    if (
                      (super((e = Object.assign({ allowHalfOpen: !1 }, e))),
                      (this._id = s(4).toString("hex").slice(0, 7)),
                      this._debug("new peer %o", e),
                      (this.channelName = e.initiator
                        ? e.channelName || s(20).toString("hex")
                        : null),
                      (this.initiator = e.initiator || !1),
                      (this.channelConfig = e.channelConfig || c.channelConfig),
                      (this.channelNegotiated = this.channelConfig.negotiated),
                      (this.config = Object.assign({}, c.config, e.config)),
                      (this.offerOptions = e.offerOptions || {}),
                      (this.answerOptions = e.answerOptions || {}),
                      (this.sdpTransform = e.sdpTransform || ((e) => e)),
                      (this.streams =
                        e.streams || (e.stream ? [e.stream] : [])),
                      (this.trickle = void 0 === e.trickle || e.trickle),
                      (this.allowHalfTrickle =
                        void 0 !== e.allowHalfTrickle && e.allowHalfTrickle),
                      (this.iceCompleteTimeout = e.iceCompleteTimeout || 5e3),
                      (this.destroyed = !1),
                      (this.destroying = !1),
                      (this._connected = !1),
                      (this.remoteAddress = void 0),
                      (this.remoteFamily = void 0),
                      (this.remotePort = void 0),
                      (this.localAddress = void 0),
                      (this.localFamily = void 0),
                      (this.localPort = void 0),
                      (this._wrtc =
                        e.wrtc && "object" == typeof e.wrtc ? e.wrtc : i()),
                      !this._wrtc)
                    ) {
                      if ("undefined" == typeof window)
                        throw l(
                          Error(
                            "No WebRTC support: Specify `opts.wrtc` option in this environment",
                          ),
                          "ERR_WEBRTC_SUPPORT",
                        );
                      throw l(
                        Error("No WebRTC support: Not a supported browser"),
                        "ERR_WEBRTC_SUPPORT",
                      );
                    }
                    ((this._pcReady = !1),
                      (this._channelReady = !1),
                      (this._iceComplete = !1),
                      (this._iceCompleteTimer = null),
                      (this._channel = null),
                      (this._pendingCandidates = []),
                      (this._isNegotiating = !1),
                      (this._firstNegotiation = !0),
                      (this._batchedNegotiation = !1),
                      (this._queuedNegotiation = !1),
                      (this._sendersAwaitingStable = []),
                      (this._senderMap = new Map()),
                      (this._closingInterval = null),
                      (this._remoteTracks = []),
                      (this._remoteStreams = []),
                      (this._chunk = null),
                      (this._cb = null),
                      (this._interval = null));
                    try {
                      this._pc = new this._wrtc.RTCPeerConnection(this.config);
                    } catch (e) {
                      return void this.destroy(l(e, "ERR_PC_CONSTRUCTOR"));
                    }
                    ((this._isReactNativeWebrtc =
                      "number" == typeof this._pc._peerConnectionId),
                      (this._pc.oniceconnectionstatechange = () => {
                        this._onIceStateChange();
                      }),
                      (this._pc.onicegatheringstatechange = () => {
                        this._onIceStateChange();
                      }),
                      (this._pc.onconnectionstatechange = () => {
                        this._onConnectionStateChange();
                      }),
                      (this._pc.onsignalingstatechange = () => {
                        this._onSignalingStateChange();
                      }),
                      (this._pc.onicecandidate = (e) => {
                        this._onIceCandidate(e);
                      }),
                      "object" == typeof this._pc.peerIdentity &&
                        this._pc.peerIdentity.catch((e) => {
                          this.destroy(l(e, "ERR_PC_PEER_IDENTITY"));
                        }),
                      this.initiator || this.channelNegotiated
                        ? this._setupData({
                            channel: this._pc.createDataChannel(
                              this.channelName,
                              this.channelConfig,
                            ),
                          })
                        : (this._pc.ondatachannel = (e) => {
                            this._setupData(e);
                          }),
                      this.streams &&
                        this.streams.forEach((e) => {
                          this.addStream(e);
                        }),
                      (this._pc.ontrack = (e) => {
                        this._onTrack(e);
                      }),
                      this._debug("initial negotiation"),
                      this._needsNegotiation(),
                      (this._onFinishBound = () => {
                        this._onFinish();
                      }),
                      this.once("finish", this._onFinishBound));
                  }
                  get bufferSize() {
                    return (this._channel && this._channel.bufferedAmount) || 0;
                  }
                  get connected() {
                    return (
                      this._connected && "open" === this._channel.readyState
                    );
                  }
                  address() {
                    return {
                      port: this.localPort,
                      family: this.localFamily,
                      address: this.localAddress,
                    };
                  }
                  signal(e) {
                    if (!this.destroying) {
                      if (this.destroyed)
                        throw l(
                          Error("cannot signal after peer is destroyed"),
                          "ERR_DESTROYED",
                        );
                      if ("string" == typeof e)
                        try {
                          e = JSON.parse(e);
                        } catch (t) {
                          e = {};
                        }
                      (this._debug("signal()"),
                        e.renegotiate &&
                          this.initiator &&
                          (this._debug("got request to renegotiate"),
                          this._needsNegotiation()),
                        e.transceiverRequest &&
                          this.initiator &&
                          (this._debug("got request for transceiver"),
                          this.addTransceiver(
                            e.transceiverRequest.kind,
                            e.transceiverRequest.init,
                          )),
                        e.candidate &&
                          (this._pc.remoteDescription &&
                          this._pc.remoteDescription.type
                            ? this._addIceCandidate(e.candidate)
                            : this._pendingCandidates.push(e.candidate)),
                        e.sdp &&
                          this._pc
                            .setRemoteDescription(
                              new this._wrtc.RTCSessionDescription(e),
                            )
                            .then(() => {
                              this.destroyed ||
                                (this._pendingCandidates.forEach((e) => {
                                  this._addIceCandidate(e);
                                }),
                                (this._pendingCandidates = []),
                                "offer" === this._pc.remoteDescription.type &&
                                  this._createAnswer());
                            })
                            .catch((e) => {
                              this.destroy(l(e, "ERR_SET_REMOTE_DESCRIPTION"));
                            }),
                        e.sdp ||
                          e.candidate ||
                          e.renegotiate ||
                          e.transceiverRequest ||
                          this.destroy(
                            l(
                              Error("signal() called with invalid signal data"),
                              "ERR_SIGNALING",
                            ),
                          ));
                    }
                  }
                  _addIceCandidate(e) {
                    let t = new this._wrtc.RTCIceCandidate(e);
                    this._pc.addIceCandidate(t).catch((e) => {
                      !t.address || t.address.endsWith(".local")
                        ? console.warn("Ignoring unsupported ICE candidate.")
                        : this.destroy(l(e, "ERR_ADD_ICE_CANDIDATE"));
                    });
                  }
                  send(e) {
                    if (!this.destroying) {
                      if (this.destroyed)
                        throw l(
                          Error("cannot send after peer is destroyed"),
                          "ERR_DESTROYED",
                        );
                      this._channel.send(e);
                    }
                  }
                  addTransceiver(e, t) {
                    if (!this.destroying) {
                      if (this.destroyed)
                        throw l(
                          Error(
                            "cannot addTransceiver after peer is destroyed",
                          ),
                          "ERR_DESTROYED",
                        );
                      if ((this._debug("addTransceiver()"), this.initiator))
                        try {
                          (this._pc.addTransceiver(e, t),
                            this._needsNegotiation());
                        } catch (e) {
                          this.destroy(l(e, "ERR_ADD_TRANSCEIVER"));
                        }
                      else
                        this.emit("signal", {
                          type: "transceiverRequest",
                          transceiverRequest: { kind: e, init: t },
                        });
                    }
                  }
                  addStream(e) {
                    if (!this.destroying) {
                      if (this.destroyed)
                        throw l(
                          Error("cannot addStream after peer is destroyed"),
                          "ERR_DESTROYED",
                        );
                      (this._debug("addStream()"),
                        e.getTracks().forEach((t) => {
                          this.addTrack(t, e);
                        }));
                    }
                  }
                  addTrack(e, t) {
                    if (this.destroying) return;
                    if (this.destroyed)
                      throw l(
                        Error("cannot addTrack after peer is destroyed"),
                        "ERR_DESTROYED",
                      );
                    this._debug("addTrack()");
                    let r = this._senderMap.get(e) || new Map(),
                      n = r.get(t);
                    if (n) {
                      if (n.removed)
                        throw l(
                          Error(
                            "Track has been removed. You should enable/disable tracks that you want to re-add.",
                          ),
                          "ERR_SENDER_REMOVED",
                        );
                      throw l(
                        Error("Track has already been added to that stream."),
                        "ERR_SENDER_ALREADY_ADDED",
                      );
                    }
                    ((n = this._pc.addTrack(e, t)),
                      r.set(t, n),
                      this._senderMap.set(e, r),
                      this._needsNegotiation());
                  }
                  replaceTrack(e, t, r) {
                    if (this.destroying) return;
                    if (this.destroyed)
                      throw l(
                        Error("cannot replaceTrack after peer is destroyed"),
                        "ERR_DESTROYED",
                      );
                    this._debug("replaceTrack()");
                    let n = this._senderMap.get(e),
                      i = n ? n.get(r) : null;
                    if (!i)
                      throw l(
                        Error("Cannot replace track that was never added."),
                        "ERR_TRACK_NOT_ADDED",
                      );
                    (t && this._senderMap.set(t, n),
                      null == i.replaceTrack
                        ? this.destroy(
                            l(
                              Error(
                                "replaceTrack is not supported in this browser",
                              ),
                              "ERR_UNSUPPORTED_REPLACETRACK",
                            ),
                          )
                        : i.replaceTrack(t));
                  }
                  removeTrack(e, t) {
                    if (this.destroying) return;
                    if (this.destroyed)
                      throw l(
                        Error("cannot removeTrack after peer is destroyed"),
                        "ERR_DESTROYED",
                      );
                    this._debug("removeSender()");
                    let r = this._senderMap.get(e),
                      n = r ? r.get(t) : null;
                    if (!n)
                      throw l(
                        Error("Cannot remove track that was never added."),
                        "ERR_TRACK_NOT_ADDED",
                      );
                    try {
                      ((n.removed = !0), this._pc.removeTrack(n));
                    } catch (e) {
                      "NS_ERROR_UNEXPECTED" === e.name
                        ? this._sendersAwaitingStable.push(n)
                        : this.destroy(l(e, "ERR_REMOVE_TRACK"));
                    }
                    this._needsNegotiation();
                  }
                  removeStream(e) {
                    if (!this.destroying) {
                      if (this.destroyed)
                        throw l(
                          Error("cannot removeStream after peer is destroyed"),
                          "ERR_DESTROYED",
                        );
                      (this._debug("removeSenders()"),
                        e.getTracks().forEach((t) => {
                          this.removeTrack(t, e);
                        }));
                    }
                  }
                  _needsNegotiation() {
                    (this._debug("_needsNegotiation"),
                      this._batchedNegotiation ||
                        ((this._batchedNegotiation = !0),
                        a(() => {
                          ((this._batchedNegotiation = !1),
                            this.initiator || !this._firstNegotiation
                              ? (this._debug("starting batched negotiation"),
                                this.negotiate())
                              : this._debug(
                                  "non-initiator initial negotiation request discarded",
                                ),
                            (this._firstNegotiation = !1));
                        })));
                  }
                  negotiate() {
                    if (!this.destroying) {
                      if (this.destroyed)
                        throw l(
                          Error("cannot negotiate after peer is destroyed"),
                          "ERR_DESTROYED",
                        );
                      (this.initiator
                        ? this._isNegotiating
                          ? ((this._queuedNegotiation = !0),
                            this._debug("already negotiating, queueing"))
                          : (this._debug("start negotiation"),
                            setTimeout(() => {
                              this._createOffer();
                            }, 0))
                        : this._isNegotiating
                          ? ((this._queuedNegotiation = !0),
                            this._debug("already negotiating, queueing"))
                          : (this._debug(
                              "requesting negotiation from initiator",
                            ),
                            this.emit("signal", {
                              type: "renegotiate",
                              renegotiate: !0,
                            })),
                        (this._isNegotiating = !0));
                    }
                  }
                  destroy(e) {
                    this._destroy(e, () => {});
                  }
                  _destroy(e, t) {
                    this.destroyed ||
                      this.destroying ||
                      ((this.destroying = !0),
                      this._debug(
                        "destroying (error: %s)",
                        e && (e.message || e),
                      ),
                      a(() => {
                        if (
                          ((this.destroyed = !0),
                          (this.destroying = !1),
                          this._debug(
                            "destroy (error: %s)",
                            e && (e.message || e),
                          ),
                          (this.readable = this.writable = !1),
                          this._readableState.ended || this.push(null),
                          this._writableState.finished || this.end(),
                          (this._connected = !1),
                          (this._pcReady = !1),
                          (this._channelReady = !1),
                          (this._remoteTracks = null),
                          (this._remoteStreams = null),
                          (this._senderMap = null),
                          clearInterval(this._closingInterval),
                          (this._closingInterval = null),
                          clearInterval(this._interval),
                          (this._interval = null),
                          (this._chunk = null),
                          (this._cb = null),
                          this._onFinishBound &&
                            this.removeListener("finish", this._onFinishBound),
                          (this._onFinishBound = null),
                          this._channel)
                        ) {
                          try {
                            this._channel.close();
                          } catch (e) {}
                          ((this._channel.onmessage = null),
                            (this._channel.onopen = null),
                            (this._channel.onclose = null),
                            (this._channel.onerror = null));
                        }
                        if (this._pc) {
                          try {
                            this._pc.close();
                          } catch (e) {}
                          ((this._pc.oniceconnectionstatechange = null),
                            (this._pc.onicegatheringstatechange = null),
                            (this._pc.onsignalingstatechange = null),
                            (this._pc.onicecandidate = null),
                            (this._pc.ontrack = null),
                            (this._pc.ondatachannel = null));
                        }
                        ((this._pc = null),
                          (this._channel = null),
                          e && this.emit("error", e),
                          this.emit("close"),
                          t());
                      }));
                  }
                  _setupData(e) {
                    if (!e.channel)
                      return this.destroy(
                        l(
                          Error(
                            "Data channel event is missing `channel` property",
                          ),
                          "ERR_DATA_CHANNEL",
                        ),
                      );
                    ((this._channel = e.channel),
                      (this._channel.binaryType = "arraybuffer"),
                      "number" ==
                        typeof this._channel.bufferedAmountLowThreshold &&
                        (this._channel.bufferedAmountLowThreshold = 65536),
                      (this.channelName = this._channel.label),
                      (this._channel.onmessage = (e) => {
                        this._onChannelMessage(e);
                      }),
                      (this._channel.onbufferedamountlow = () => {
                        this._onChannelBufferedAmountLow();
                      }),
                      (this._channel.onopen = () => {
                        this._onChannelOpen();
                      }),
                      (this._channel.onclose = () => {
                        this._onChannelClose();
                      }),
                      (this._channel.onerror = (e) => {
                        let t =
                          e.error instanceof Error
                            ? e.error
                            : Error(
                                `Datachannel error: ${e.message} ${e.filename}:${e.lineno}:${e.colno}`,
                              );
                        this.destroy(l(t, "ERR_DATA_CHANNEL"));
                      }));
                    let t = !1;
                    this._closingInterval = setInterval(() => {
                      this._channel && "closing" === this._channel.readyState
                        ? (t && this._onChannelClose(), (t = !0))
                        : (t = !1);
                    }, 5e3);
                  }
                  _read() {}
                  _write(e, t, r) {
                    if (this.destroyed)
                      return r(
                        l(
                          Error("cannot write after peer is destroyed"),
                          "ERR_DATA_CHANNEL",
                        ),
                      );
                    if (this._connected) {
                      try {
                        this.send(e);
                      } catch (e) {
                        return this.destroy(l(e, "ERR_DATA_CHANNEL"));
                      }
                      this._channel.bufferedAmount > 65536
                        ? (this._debug(
                            "start backpressure: bufferedAmount %d",
                            this._channel.bufferedAmount,
                          ),
                          (this._cb = r))
                        : r(null);
                    } else
                      (this._debug("write before connect"),
                        (this._chunk = e),
                        (this._cb = r));
                  }
                  _onFinish() {
                    if (!this.destroyed) {
                      let e = () => {
                        setTimeout(() => this.destroy(), 1e3);
                      };
                      this._connected ? e() : this.once("connect", e);
                    }
                  }
                  _startIceCompleteTimeout() {
                    this.destroyed ||
                      this._iceCompleteTimer ||
                      (this._debug("started iceComplete timeout"),
                      (this._iceCompleteTimer = setTimeout(() => {
                        this._iceComplete ||
                          ((this._iceComplete = !0),
                          this._debug("iceComplete timeout completed"),
                          this.emit("iceTimeout"),
                          this.emit("_iceComplete"));
                      }, this.iceCompleteTimeout)));
                  }
                  _createOffer() {
                    this.destroyed ||
                      this._pc
                        .createOffer(this.offerOptions)
                        .then((e) => {
                          if (this.destroyed) return;
                          (this.trickle ||
                            this.allowHalfTrickle ||
                            (e.sdp = r(e.sdp)),
                            (e.sdp = this.sdpTransform(e.sdp)));
                          let t = () => {
                            if (!this.destroyed) {
                              let t = this._pc.localDescription || e;
                              (this._debug("signal"),
                                this.emit("signal", {
                                  type: t.type,
                                  sdp: t.sdp,
                                }));
                            }
                          };
                          this._pc
                            .setLocalDescription(e)
                            .then(() => {
                              (this._debug("createOffer success"),
                                this.destroyed ||
                                  (this.trickle || this._iceComplete
                                    ? t()
                                    : this.once("_iceComplete", t)));
                            })
                            .catch((e) => {
                              this.destroy(l(e, "ERR_SET_LOCAL_DESCRIPTION"));
                            });
                        })
                        .catch((e) => {
                          this.destroy(l(e, "ERR_CREATE_OFFER"));
                        });
                  }
                  _requestMissingTransceivers() {
                    this._pc.getTransceivers &&
                      this._pc.getTransceivers().forEach((e) => {
                        e.mid ||
                          !e.sender.track ||
                          e.requested ||
                          ((e.requested = !0),
                          this.addTransceiver(e.sender.track.kind));
                      });
                  }
                  _createAnswer() {
                    this.destroyed ||
                      this._pc
                        .createAnswer(this.answerOptions)
                        .then((e) => {
                          if (this.destroyed) return;
                          (this.trickle ||
                            this.allowHalfTrickle ||
                            (e.sdp = r(e.sdp)),
                            (e.sdp = this.sdpTransform(e.sdp)));
                          let t = () => {
                            if (!this.destroyed) {
                              let t = this._pc.localDescription || e;
                              (this._debug("signal"),
                                this.emit("signal", {
                                  type: t.type,
                                  sdp: t.sdp,
                                }),
                                this.initiator ||
                                  this._requestMissingTransceivers());
                            }
                          };
                          this._pc
                            .setLocalDescription(e)
                            .then(() => {
                              this.destroyed ||
                                (this.trickle || this._iceComplete
                                  ? t()
                                  : this.once("_iceComplete", t));
                            })
                            .catch((e) => {
                              this.destroy(l(e, "ERR_SET_LOCAL_DESCRIPTION"));
                            });
                        })
                        .catch((e) => {
                          this.destroy(l(e, "ERR_CREATE_ANSWER"));
                        });
                  }
                  _onConnectionStateChange() {
                    this.destroyed ||
                      ("failed" === this._pc.connectionState &&
                        this.destroy(
                          l(
                            Error("Connection failed."),
                            "ERR_CONNECTION_FAILURE",
                          ),
                        ));
                  }
                  _onIceStateChange() {
                    if (this.destroyed) return;
                    let e = this._pc.iceConnectionState,
                      t = this._pc.iceGatheringState;
                    (this._debug(
                      "iceStateChange (connection: %s) (gathering: %s)",
                      e,
                      t,
                    ),
                      this.emit("iceStateChange", e, t),
                      ("connected" === e || "completed" === e) &&
                        ((this._pcReady = !0), this._maybeReady()),
                      "failed" === e &&
                        this.destroy(
                          l(
                            Error("Ice connection failed."),
                            "ERR_ICE_CONNECTION_FAILURE",
                          ),
                        ),
                      "closed" === e &&
                        this.destroy(
                          l(
                            Error("Ice connection closed."),
                            "ERR_ICE_CONNECTION_CLOSED",
                          ),
                        ));
                  }
                  getStats(e) {
                    let t = (e) => (
                      "[object Array]" ===
                        Object.prototype.toString.call(e.values) &&
                        e.values.forEach((t) => {
                          Object.assign(e, t);
                        }),
                      e
                    );
                    0 === this._pc.getStats.length || this._isReactNativeWebrtc
                      ? this._pc.getStats().then(
                          (r) => {
                            let n = [];
                            (r.forEach((e) => {
                              n.push(t(e));
                            }),
                              e(null, n));
                          },
                          (t) => e(t),
                        )
                      : 0 < this._pc.getStats.length
                        ? this._pc.getStats(
                            (r) => {
                              if (this.destroyed) return;
                              let n = [];
                              (r.result().forEach((e) => {
                                let r = {};
                                (e.names().forEach((t) => {
                                  r[t] = e.stat(t);
                                }),
                                  (r.id = e.id),
                                  (r.type = e.type),
                                  (r.timestamp = e.timestamp),
                                  n.push(t(r)));
                              }),
                                e(null, n));
                            },
                            (t) => e(t),
                          )
                        : e(null, []);
                  }
                  _maybeReady() {
                    if (
                      (this._debug(
                        "maybeReady pc %s channel %s",
                        this._pcReady,
                        this._channelReady,
                      ),
                      this._connected ||
                        this._connecting ||
                        !this._pcReady ||
                        !this._channelReady)
                    )
                      return;
                    this._connecting = !0;
                    let e = () => {
                      this.destroyed ||
                        this.getStats((t, r) => {
                          if (this.destroyed) return;
                          t && (r = []);
                          let n = {},
                            i = {},
                            s = {},
                            o = !1;
                          r.forEach((e) => {
                            (("remotecandidate" === e.type ||
                              "remote-candidate" === e.type) &&
                              (n[e.id] = e),
                              ("localcandidate" === e.type ||
                                "local-candidate" === e.type) &&
                                (i[e.id] = e),
                              ("candidatepair" === e.type ||
                                "candidate-pair" === e.type) &&
                                (s[e.id] = e));
                          });
                          let a = (e) => {
                            o = !0;
                            let t = i[e.localCandidateId];
                            (t && (t.ip || t.address)
                              ? ((this.localAddress = t.ip || t.address),
                                (this.localPort = +t.port))
                              : t && t.ipAddress
                                ? ((this.localAddress = t.ipAddress),
                                  (this.localPort = +t.portNumber))
                                : "string" == typeof e.googLocalAddress &&
                                  ((t = e.googLocalAddress.split(":")),
                                  (this.localAddress = t[0]),
                                  (this.localPort = +t[1])),
                              this.localAddress &&
                                (this.localFamily = this.localAddress.includes(
                                  ":",
                                )
                                  ? "IPv6"
                                  : "IPv4"));
                            let r = n[e.remoteCandidateId];
                            (r && (r.ip || r.address)
                              ? ((this.remoteAddress = r.ip || r.address),
                                (this.remotePort = +r.port))
                              : r && r.ipAddress
                                ? ((this.remoteAddress = r.ipAddress),
                                  (this.remotePort = +r.portNumber))
                                : "string" == typeof e.googRemoteAddress &&
                                  ((r = e.googRemoteAddress.split(":")),
                                  (this.remoteAddress = r[0]),
                                  (this.remotePort = +r[1])),
                              this.remoteAddress &&
                                (this.remoteFamily =
                                  this.remoteAddress.includes(":")
                                    ? "IPv6"
                                    : "IPv4"),
                              this._debug(
                                "connect local: %s:%s remote: %s:%s",
                                this.localAddress,
                                this.localPort,
                                this.remoteAddress,
                                this.remotePort,
                              ));
                          };
                          if (
                            (r.forEach((e) => {
                              ("transport" === e.type &&
                                e.selectedCandidatePairId &&
                                a(s[e.selectedCandidatePairId]),
                                (("googCandidatePair" === e.type &&
                                  "true" === e.googActiveConnection) ||
                                  (("candidatepair" === e.type ||
                                    "candidate-pair" === e.type) &&
                                    e.selected)) &&
                                  a(e));
                            }),
                            !o &&
                              (!Object.keys(s).length || Object.keys(i).length))
                          )
                            return void setTimeout(e, 100);
                          if (
                            ((this._connecting = !1),
                            (this._connected = !0),
                            this._chunk)
                          ) {
                            try {
                              this.send(this._chunk);
                            } catch (e) {
                              return this.destroy(l(e, "ERR_DATA_CHANNEL"));
                            }
                            ((this._chunk = null),
                              this._debug(
                                'sent chunk from "write before connect"',
                              ));
                            let e = this._cb;
                            ((this._cb = null), e(null));
                          }
                          ("number" !=
                            typeof this._channel.bufferedAmountLowThreshold &&
                            ((this._interval = setInterval(
                              () => this._onInterval(),
                              150,
                            )),
                            this._interval.unref && this._interval.unref()),
                            this._debug("connect"),
                            this.emit("connect"));
                        });
                    };
                    e();
                  }
                  _onInterval() {
                    this._cb &&
                      this._channel &&
                      !(this._channel.bufferedAmount > 65536) &&
                      this._onChannelBufferedAmountLow();
                  }
                  _onSignalingStateChange() {
                    this.destroyed ||
                      ("stable" === this._pc.signalingState &&
                        ((this._isNegotiating = !1),
                        this._debug(
                          "flushing sender queue",
                          this._sendersAwaitingStable,
                        ),
                        this._sendersAwaitingStable.forEach((e) => {
                          (this._pc.removeTrack(e),
                            (this._queuedNegotiation = !0));
                        }),
                        (this._sendersAwaitingStable = []),
                        this._queuedNegotiation
                          ? (this._debug("flushing negotiation queue"),
                            (this._queuedNegotiation = !1),
                            this._needsNegotiation())
                          : (this._debug("negotiated"),
                            this.emit("negotiated"))),
                      this._debug(
                        "signalingStateChange %s",
                        this._pc.signalingState,
                      ),
                      this.emit(
                        "signalingStateChange",
                        this._pc.signalingState,
                      ));
                  }
                  _onIceCandidate(e) {
                    this.destroyed ||
                      (e.candidate && this.trickle
                        ? this.emit("signal", {
                            type: "candidate",
                            candidate: {
                              candidate: e.candidate.candidate,
                              sdpMLineIndex: e.candidate.sdpMLineIndex,
                              sdpMid: e.candidate.sdpMid,
                            },
                          })
                        : e.candidate ||
                          this._iceComplete ||
                          ((this._iceComplete = !0), this.emit("_iceComplete")),
                      e.candidate && this._startIceCompleteTimeout());
                  }
                  _onChannelMessage(e) {
                    if (this.destroyed) return;
                    let t = e.data;
                    (t instanceof ArrayBuffer && (t = h.from(t)), this.push(t));
                  }
                  _onChannelBufferedAmountLow() {
                    if (!this.destroyed && this._cb) {
                      this._debug(
                        "ending backpressure: bufferedAmount %d",
                        this._channel.bufferedAmount,
                      );
                      let e = this._cb;
                      ((this._cb = null), e(null));
                    }
                  }
                  _onChannelOpen() {
                    this._connected ||
                      this.destroyed ||
                      (this._debug("on channel open"),
                      (this._channelReady = !0),
                      this._maybeReady());
                  }
                  _onChannelClose() {
                    this.destroyed ||
                      (this._debug("on channel close"), this.destroy());
                  }
                  _onTrack(e) {
                    this.destroyed ||
                      e.streams.forEach((t) => {
                        (this._debug("on track"),
                          this.emit("track", e.track, t),
                          this._remoteTracks.push({
                            track: e.track,
                            stream: t,
                          }),
                          this._remoteStreams.some((e) => e.id === t.id) ||
                            (this._remoteStreams.push(t),
                            a(() => {
                              (this._debug("on stream"),
                                this.emit("stream", t));
                            })));
                      });
                  }
                  _debug() {
                    let e = [].slice.call(arguments);
                    ((e[0] = "[" + this._id + "] " + e[0]), n.apply(null, e));
                  }
                }
                ((c.WEBRTC_SUPPORT = !!i()),
                  (c.config = {
                    iceServers: [
                      {
                        urls: [
                          "stun:stun.l.google.com:19302",
                          "stun:global.stun.twilio.com:3478",
                        ],
                      },
                    ],
                    sdpSemantics: "unified-plan",
                  }),
                  (c.channelConfig = {}),
                  (t.exports = c));
              },
              {
                buffer: 3,
                debug: 4,
                "err-code": 6,
                "get-browser-rtc": 8,
                "queue-microtask": 13,
                randombytes: 14,
                "readable-stream": 29,
              },
            ],
          },
          {},
          [],
        )("/");
      }),
        (e.exports = n()));
    },
    8333: function (e, t, r) {
      "use strict";
      r.d(t, {
        WebrtcProvider: function () {
          return eu;
        },
      });
      var n = r(9267),
        i = r(4587),
        s = r(626);
      let o = (e) => {
        if (e.shouldConnect && null === e.ws) {
          let t = new WebSocket(e.url),
            r = e.binaryType,
            n = null;
          (r && (t.binaryType = r),
            (e.ws = t),
            (e.connecting = !0),
            (e.connected = !1),
            (t.onmessage = (t) => {
              e.lastMessageReceived = i.ZG();
              let r = t.data,
                s = "string" == typeof r ? JSON.parse(r) : r;
              (s &&
                "pong" === s.type &&
                (clearTimeout(n), (n = setTimeout(l, 15e3))),
                e.emit("message", [s, e]));
            }));
          let a = (t) => {
              (null !== e.ws &&
                ((e.ws = null),
                (e.connecting = !1),
                e.connected
                  ? ((e.connected = !1),
                    e.emit("disconnect", [{ type: "disconnect", error: t }, e]))
                  : e.unsuccessfulReconnects++,
                setTimeout(
                  o,
                  s.VV(1200 * s.mv(e.unsuccessfulReconnects + 1), 2500),
                  e,
                )),
                clearTimeout(n));
            },
            l = () => {
              e.ws === t && e.send({ type: "ping" });
            };
          ((t.onclose = () => a(null)),
            (t.onerror = (e) => a(e)),
            (t.onopen = () => {
              ((e.lastMessageReceived = i.ZG()),
                (e.connecting = !1),
                (e.connected = !0),
                (e.unsuccessfulReconnects = 0),
                e.emit("connect", [{ type: "connect" }, e]),
                (n = setTimeout(l, 15e3)));
            }));
        }
      };
      class a extends n.y {
        constructor(e, { binaryType: t } = {}) {
          (super(),
            (this.url = e),
            (this.ws = null),
            (this.binaryType = t || null),
            (this.connected = !1),
            (this.connecting = !1),
            (this.unsuccessfulReconnects = 0),
            (this.lastMessageReceived = 0),
            (this.shouldConnect = !0),
            (this._checkInterval = setInterval(() => {
              this.connected &&
                3e4 < i.ZG() - this.lastMessageReceived &&
                this.ws.close();
            }, 15e3)),
            o(this));
        }
        send(e) {
          this.ws && this.ws.send(JSON.stringify(e));
        }
        destroy() {
          (clearInterval(this._checkInterval),
            this.disconnect(),
            super.destroy());
        }
        disconnect() {
          ((this.shouldConnect = !1), null !== this.ws && this.ws.close());
        }
        connect() {
          ((this.shouldConnect = !0),
            this.connected || null !== this.ws || o(this));
        }
      }
      var l = r(746),
        h = r(2285),
        c = r(972),
        u = r(9077),
        d = r(6353),
        f = r(2223),
        p = r(5273),
        g = r(22),
        y = r(7485),
        b = r(8759),
        m = r(1034);
      let _ = new Map();
      class v {
        constructor(e) {
          ((this.room = e),
            (this.onmessage = null),
            (this._onChange = (t) =>
              t.key === e &&
              null !== this.onmessage &&
              this.onmessage({ data: b.Gh(t.newValue || "") })),
            m.z2(this._onChange));
        }
        postMessage(e) {
          m.XN.setItem(this.room, b.s3(b.eh(e)));
        }
        close() {
          m.F(this._onChange);
        }
      }
      let w = "undefined" == typeof BroadcastChannel ? v : BroadcastChannel,
        E = (e) =>
          l.Yu(_, e, () => {
            let t = y.Ue(),
              r = new w(e);
            return (
              (r.onmessage = (e) =>
                t.forEach((t) => t(e.data, "broadcastchannel"))),
              { bc: r, subs: t }
            );
          }),
        C = (e, t) => (E(e).subs.add(t), t),
        R = (e, t) => {
          let r = E(e),
            n = r.subs.delete(t);
          return (n && 0 === r.subs.size && (r.bc.close(), _.delete(e)), n);
        },
        S = (e, t, r = null) => {
          let n = E(e);
          (n.bc.postMessage(t), n.subs.forEach((e) => e(t, r)));
        },
        T = () => {
          let e = !0;
          return (t, r) => {
            if (e) {
              e = !1;
              try {
                t();
              } finally {
                e = !0;
              }
            } else void 0 !== r && r();
          };
        };
      var k = r(8806),
        A = r(5556);
      let L = (e, t) => {
          u.uE(e, 0);
          let r = A.encodeStateVector(t);
          u.mP(e, r);
        },
        O = (e, t, r) => {
          (u.uE(e, 1), u.mP(e, A.encodeStateAsUpdate(t, r)));
        },
        N = (e, t, r) => O(t, r, d.HN(e)),
        I = (e, t, r, n) => {
          try {
            A.applyUpdate(t, d.HN(e), r);
          } catch (e) {
            (null != n && n(e),
              console.error("Caught error while handling a Yjs update", e));
          }
        },
        x = (e, t) => {
          (u.uE(e, 2), u.mP(e, t));
        },
        M = (e, t, r, n, i) => {
          let s = d.yg(e);
          switch (s) {
            case 0:
              N(e, t, r);
              break;
            case 1:
            case 2:
              I(e, r, n, i);
              break;
            default:
              throw Error("Unknown message type");
          }
          return s;
        };
      var P = r(4389);
      class D extends n.y {
        constructor(e) {
          (super(),
            (this.doc = e),
            (this.clientID = e.clientID),
            (this.states = new Map()),
            (this.meta = new Map()),
            (this._checkInterval = setInterval(() => {
              let e = i.ZG();
              null !== this.getLocalState() &&
                15e3 <= e - this.meta.get(this.clientID).lastUpdated &&
                this.setLocalState(this.getLocalState());
              let t = [];
              (this.meta.forEach((r, n) => {
                n !== this.clientID &&
                  3e4 <= e - r.lastUpdated &&
                  this.states.has(n) &&
                  t.push(n);
              }),
                t.length > 0 && j(this, t, "timeout"));
            }, s.GW(3e3))),
            e.on("destroy", () => {
              this.destroy();
            }),
            this.setLocalState({}));
        }
        destroy() {
          (this.emit("destroy", [this]),
            this.setLocalState(null),
            super.destroy(),
            clearInterval(this._checkInterval));
        }
        getLocalState() {
          return this.states.get(this.clientID) || null;
        }
        setLocalState(e) {
          let t = this.clientID,
            r = this.meta.get(t),
            n = void 0 === r ? 0 : r.clock + 1,
            s = this.states.get(t);
          (null === e ? this.states.delete(t) : this.states.set(t, e),
            this.meta.set(t, { clock: n, lastUpdated: i.ZG() }));
          let o = [],
            a = [],
            l = [],
            h = [];
          (null === e
            ? h.push(t)
            : null == s
              ? null != e && o.push(t)
              : (a.push(t), P.Hi(s, e) || l.push(t)),
            (o.length > 0 || l.length > 0 || h.length > 0) &&
              this.emit("change", [
                { added: o, updated: l, removed: h },
                "local",
              ]),
            this.emit("update", [
              { added: o, updated: a, removed: h },
              "local",
            ]));
        }
        setLocalStateField(e, t) {
          let r = this.getLocalState();
          null !== r && this.setLocalState({ ...r, [e]: t });
        }
        getStates() {
          return this.states;
        }
      }
      let j = (e, t, r) => {
          let n = [];
          for (let r = 0; r < t.length; r++) {
            let s = t[r];
            if (e.states.has(s)) {
              if ((e.states.delete(s), s === e.clientID)) {
                let t = e.meta.get(s);
                e.meta.set(s, { clock: t.clock + 1, lastUpdated: i.ZG() });
              }
              n.push(s);
            }
          }
          n.length > 0 &&
            (e.emit("change", [{ added: [], updated: [], removed: n }, r]),
            e.emit("update", [{ added: [], updated: [], removed: n }, r]));
        },
        F = (e, t, r = e.states) => {
          let n = t.length,
            i = u.Mf();
          u.uE(i, n);
          for (let s = 0; s < n; s++) {
            let n = t[s],
              o = r.get(n) || null,
              a = e.meta.get(n).clock;
            (u.uE(i, n), u.uE(i, a), u.uw(i, JSON.stringify(o)));
          }
          return u._f(i);
        },
        U = (e, t, r) => {
          let n = d.l1(t),
            s = i.ZG(),
            o = [],
            a = [],
            l = [],
            h = [],
            c = d.yg(n);
          for (let t = 0; t < c; t++) {
            let t = d.yg(n),
              r = d.yg(n),
              i = JSON.parse(d.kf(n)),
              c = e.meta.get(t),
              u = e.states.get(t),
              f = void 0 === c ? 0 : c.clock;
            (f < r || (f === r && null === i && e.states.has(t))) &&
              (null === i
                ? t === e.clientID && null != e.getLocalState()
                  ? r++
                  : e.states.delete(t)
                : e.states.set(t, i),
              e.meta.set(t, { clock: r, lastUpdated: s }),
              void 0 === c && null !== i
                ? o.push(t)
                : void 0 !== c && null === i
                  ? h.push(t)
                  : null !== i && (P.Hi(i, u) || l.push(t), a.push(t)));
          }
          ((o.length > 0 || l.length > 0 || h.length > 0) &&
            e.emit("change", [{ added: o, updated: l, removed: h }, r]),
            (o.length > 0 || a.length > 0 || h.length > 0) &&
              e.emit("update", [{ added: o, updated: a, removed: h }, r]));
        };
      var B = r(5020);
      let q = (e, t) => {
          let r = B.lz(e).buffer,
            n = B.lz(t).buffer;
          return crypto.subtle
            .importKey("raw", r, "PBKDF2", !1, ["deriveKey"])
            .then((e) =>
              crypto.subtle.deriveKey(
                { name: "PBKDF2", salt: n, iterations: 1e5, hash: "SHA-256" },
                e,
                { name: "AES-GCM", length: 256 },
                !0,
                ["encrypt", "decrypt"],
              ),
            );
        },
        W = (e, t) => {
          if (!t) return g.DB(e);
          let r = crypto.getRandomValues(new Uint8Array(12));
          return crypto.subtle
            .encrypt({ name: "AES-GCM", iv: r }, t, e)
            .then((e) => {
              let t = u.Mf();
              return (
                u.uw(t, "AES-GCM"),
                u.mP(t, r),
                u.mP(t, new Uint8Array(e)),
                u._f(t)
              );
            });
        },
        H = (e, t) => {
          let r = u.Mf();
          return (u.EM(r, e), W(u._f(r), t));
        },
        Y = (e, t) => {
          if (!t) return g.DB(e);
          let r = d.l1(e);
          "AES-GCM" !== d.kf(r) && g.d1(h.Ue("Unknown encryption algorithm"));
          let n = d.HN(r),
            i = d.HN(r);
          return crypto.subtle
            .decrypt({ name: "AES-GCM", iv: n }, t, i)
            .then((e) => new Uint8Array(e));
        },
        G = (e, t) => Y(e, t).then((e) => d.v_(d.l1(new Uint8Array(e))));
      var z = r(3069);
      let V = f.YX("y-webrtc"),
        K = new Map(),
        $ = new Map(),
        Z = (e) => {
          let t = !0;
          (e.webrtcConns.forEach((e) => {
            e.synced || (t = !1);
          }),
            ((!t && e.synced) || (t && !e.synced)) &&
              ((e.synced = t),
              e.provider.emit("synced", [{ synced: t }]),
              V("synced ", p.Pl, e.name, p.YW, " with all peers")));
        },
        J = (e, t, r) => {
          let n = d.l1(t),
            i = u.Mf(),
            s = d.yg(n);
          if (void 0 === e) return null;
          let o = e.awareness,
            a = e.doc,
            l = !1;
          switch (s) {
            case 0: {
              u.uE(i, 0);
              let t = M(n, i, a, e);
              (1 !== t || e.synced || r(), 0 === t && (l = !0));
              break;
            }
            case 3:
              (u.uE(i, 1),
                u.mP(i, F(o, Array.from(o.getStates().keys()))),
                (l = !0));
              break;
            case 1:
              U(o, d.HN(n), e);
              break;
            case 4: {
              let t = 1 === d.kj(n),
                r = d.kf(n);
              if (
                r !== e.peerId &&
                ((e.bcConns.has(r) && !t) || (!e.bcConns.has(r) && t))
              ) {
                let n = [],
                  i = [];
                (t
                  ? (e.bcConns.add(r), i.push(r))
                  : (e.bcConns.delete(r), n.push(r)),
                  e.provider.emit("peers", [
                    {
                      added: i,
                      removed: n,
                      webrtcPeers: Array.from(e.webrtcConns.keys()),
                      bcPeers: Array.from(e.bcConns),
                    },
                  ]),
                  es(e));
              }
              break;
            }
            default:
              return (console.error("Unable to compute message"), i);
          }
          return l ? i : null;
        },
        X = (e, t) => {
          let r = e.room;
          return (
            V(
              "received message from ",
              p.Pl,
              e.remotePeerId,
              p.s7,
              " (",
              r.name,
              ")",
              p.YW,
              p.WO,
            ),
            J(r, t, () => {
              ((e.synced = !0),
                V(
                  "synced ",
                  p.Pl,
                  r.name,
                  p.YW,
                  " with ",
                  p.Pl,
                  e.remotePeerId,
                ),
                Z(r));
            })
          );
        },
        Q = (e, t) => {
          V(
            "send message to ",
            p.Pl,
            e.remotePeerId,
            p.YW,
            p.s7,
            " (",
            e.room.name,
            ")",
            p.WO,
          );
          try {
            e.peer.send(u._f(t));
          } catch (e) {}
        },
        ee = (e, t) => {
          (V("broadcast message in ", p.Pl, e.name, p.YW),
            e.webrtcConns.forEach((e) => {
              try {
                e.peer.send(t);
              } catch (e) {}
            }));
        };
      class et {
        constructor(e, t, r, n) {
          (V("establishing connection to ", p.Pl, r),
            (this.room = n),
            (this.remotePeerId = r),
            (this.glareToken = void 0),
            (this.closed = !1),
            (this.connected = !1),
            (this.synced = !1),
            (this.peer = new k({ initiator: t, ...n.provider.peerOpts })),
            this.peer.on("signal", (t) => {
              (void 0 === this.glareToken &&
                (this.glareToken = Date.now() + Math.random()),
                el(e, n, {
                  to: r,
                  from: n.peerId,
                  type: "signal",
                  token: this.glareToken,
                  signal: t,
                }));
            }),
            this.peer.on("connect", () => {
              (V("connected to ", p.Pl, r), (this.connected = !0));
              let e = n.provider.doc,
                t = n.awareness,
                i = u.Mf();
              (u.uE(i, 0), L(i, e), Q(this, i));
              let s = t.getStates();
              if (s.size > 0) {
                let e = u.Mf();
                (u.uE(e, 1), u.mP(e, F(t, Array.from(s.keys()))), Q(this, e));
              }
            }),
            this.peer.on("close", () => {
              ((this.connected = !1),
                (this.closed = !0),
                n.webrtcConns.has(this.remotePeerId) &&
                  (n.webrtcConns.delete(this.remotePeerId),
                  n.provider.emit("peers", [
                    {
                      removed: [this.remotePeerId],
                      added: [],
                      webrtcPeers: Array.from(n.webrtcConns.keys()),
                      bcPeers: Array.from(n.bcConns),
                    },
                  ])),
                Z(n),
                this.peer.destroy(),
                V("closed connection to ", p.Pl, r),
                ei(n));
            }),
            this.peer.on("error", (e) => {
              (V("Error in connection to ", p.Pl, r, ": ", e), ei(n));
            }),
            this.peer.on("data", (e) => {
              let t = X(this, e);
              null !== t && Q(this, t);
            }));
        }
        destroy() {
          this.peer.destroy();
        }
      }
      let er = (e, t) => W(t, e.key).then((t) => e.mux(() => S(e.name, t))),
        en = (e, t) => {
          (e.bcconnected && er(e, t), ee(e, t));
        },
        ei = (e) => {
          K.forEach((t) => {
            t.connected &&
              (t.send({ type: "subscribe", topics: [e.name] }),
              e.webrtcConns.size < e.provider.maxConns &&
                el(t, e, { type: "announce", from: e.peerId }));
          });
        },
        es = (e) => {
          if (e.provider.filterBcConns) {
            let t = u.Mf();
            (u.uE(t, 4), u.$F(t, 1), u.uw(t, e.peerId), er(e, u._f(t)));
          }
        };
      class eo {
        constructor(e, t, r, n) {
          ((this.peerId = c.k$()),
            (this.doc = e),
            (this.awareness = t.awareness),
            (this.provider = t),
            (this.synced = !1),
            (this.name = r),
            (this.key = n),
            (this.webrtcConns = new Map()),
            (this.bcConns = new Set()),
            (this.mux = T()),
            (this.bcconnected = !1),
            (this._bcSubscriber = (e) =>
              Y(new Uint8Array(e), n).then((e) =>
                this.mux(() => {
                  let t = J(this, e, () => {});
                  t && er(this, u._f(t));
                }),
              )),
            (this._docUpdateHandler = (e, t) => {
              let r = u.Mf();
              (u.uE(r, 0), x(r, e), en(this, u._f(r)));
            }),
            (this._awarenessUpdateHandler = (
              { added: e, updated: t, removed: r },
              n,
            ) => {
              let i = e.concat(t).concat(r),
                s = u.Mf();
              (u.uE(s, 1), u.mP(s, F(this.awareness, i)), en(this, u._f(s)));
            }),
            (this._beforeUnloadHandler = () => {
              (j(this.awareness, [e.clientID], "window unload"),
                $.forEach((e) => {
                  e.disconnect();
                }));
            }),
            "undefined" != typeof window
              ? window.addEventListener(
                  "beforeunload",
                  this._beforeUnloadHandler,
                )
              : void 0 !== z && z.on("exit", this._beforeUnloadHandler));
        }
        connect() {
          (this.doc.on("update", this._docUpdateHandler),
            this.awareness.on("update", this._awarenessUpdateHandler),
            ei(this),
            C(this.name, this._bcSubscriber),
            (this.bcconnected = !0),
            es(this));
          let e = u.Mf();
          (u.uE(e, 0), L(e, this.doc), er(this, u._f(e)));
          let t = u.Mf();
          (u.uE(t, 0), O(t, this.doc), er(this, u._f(t)));
          let r = u.Mf();
          (u.uE(r, 3), er(this, u._f(r)));
          let n = u.Mf();
          (u.uE(n, 1),
            u.mP(n, F(this.awareness, [this.doc.clientID])),
            er(this, u._f(n)));
        }
        disconnect() {
          (K.forEach((e) => {
            e.connected && e.send({ type: "unsubscribe", topics: [this.name] });
          }),
            j(this.awareness, [this.doc.clientID], "disconnect"));
          let e = u.Mf();
          (u.uE(e, 4),
            u.$F(e, 0),
            u.uw(e, this.peerId),
            er(this, u._f(e)),
            R(this.name, this._bcSubscriber),
            (this.bcconnected = !1),
            this.doc.off("update", this._docUpdateHandler),
            this.awareness.off("update", this._awarenessUpdateHandler),
            this.webrtcConns.forEach((e) => e.destroy()));
        }
        destroy() {
          (this.disconnect(),
            "undefined" != typeof window
              ? window.removeEventListener(
                  "beforeunload",
                  this._beforeUnloadHandler,
                )
              : void 0 !== z && z.off("exit", this._beforeUnloadHandler));
        }
      }
      let ea = (e, t, r, n) => {
          if ($.has(r))
            throw h.Ue(`A Yjs Doc connected to room "${r}" already exists!`);
          let i = new eo(e, t, r, n);
          return ($.set(r, i), i);
        },
        el = (e, t, r) => {
          t.key
            ? H(r, t.key).then((r) => {
                e.send({ type: "publish", topic: t.name, data: b.s3(r) });
              })
            : e.send({ type: "publish", topic: t.name, data: r });
        };
      class eh extends a {
        constructor(e) {
          (super(e),
            (this.providers = new Set()),
            this.on("connect", () => {
              V(`connected (${e})`);
              let t = Array.from($.keys());
              (this.send({ type: "subscribe", topics: t }),
                $.forEach((e) =>
                  el(this, e, { type: "announce", from: e.peerId }),
                ));
            }),
            this.on("message", (e) => {
              if ("publish" === e.type) {
                let t = e.topic,
                  r = $.get(t);
                if (null == r || "string" != typeof t) return;
                let n = (e) => {
                  let t = r.webrtcConns,
                    n = r.peerId;
                  if (
                    null == e ||
                    e.from === n ||
                    (void 0 !== e.to && e.to !== n) ||
                    r.bcConns.has(e.from)
                  )
                    return;
                  let i = t.has(e.from)
                    ? () => {}
                    : () =>
                        r.provider.emit("peers", [
                          {
                            removed: [],
                            added: [e.from],
                            webrtcPeers: Array.from(r.webrtcConns.keys()),
                            bcPeers: Array.from(r.bcConns),
                          },
                        ]);
                  switch (e.type) {
                    case "announce":
                      t.size < r.provider.maxConns &&
                        (l.Yu(t, e.from, () => new et(this, !0, e.from, r)),
                        i());
                      break;
                    case "signal":
                      if ("offer" === e.signal.type) {
                        let r = t.get(e.from);
                        if (r) {
                          let t = e.token,
                            n = r.glareToken;
                          if (n && n > t) {
                            V("offer rejected: ", e.from);
                            return;
                          }
                          r.glareToken = void 0;
                        }
                      }
                      ("answer" === e.signal.type &&
                        (V("offer answered by: ", e.from),
                        (t.get(e.from).glareToken = void 0)),
                        e.to === n &&
                          (l
                            .Yu(t, e.from, () => new et(this, !1, e.from, r))
                            .peer.signal(e.signal),
                          i()));
                  }
                };
                r.key
                  ? "string" == typeof e.data && G(b.Gh(e.data), r.key).then(n)
                  : n(e.data);
              }
            }),
            this.on("disconnect", () => V(`disconnect (${e})`)));
        }
      }
      let ec = (e) => {
        e.emit("status", [{ connected: e.connected }]);
      };
      class eu extends n.g {
        constructor(
          e,
          t,
          {
            signaling: r = ["wss://y-webrtc-eu.fly.dev"],
            password: n = null,
            awareness: i = new D(t),
            maxConns: o = 20 + s.GW(15 * c.TN()),
            filterBcConns: a = !0,
            peerOpts: l = {},
          } = {},
        ) {
          (super(),
            (this.roomName = e),
            (this.doc = t),
            (this.filterBcConns = a),
            (this.awareness = i),
            (this.shouldConnect = !1),
            (this.signalingUrls = r),
            (this.signalingConns = []),
            (this.maxConns = o),
            (this.peerOpts = l),
            (this.key = n ? q(n, e) : g.DB(null)),
            (this.room = null),
            this.key.then((r) => {
              ((this.room = ea(t, this, e, r)),
                this.shouldConnect
                  ? this.room.connect()
                  : this.room.disconnect(),
                ec(this));
            }),
            this.connect(),
            (this.destroy = this.destroy.bind(this)),
            t.on("destroy", this.destroy));
        }
        get connected() {
          return null !== this.room && this.shouldConnect;
        }
        connect() {
          ((this.shouldConnect = !0),
            this.signalingUrls.forEach((e) => {
              let t = l.Yu(K, e, () => new eh(e));
              (this.signalingConns.push(t), t.providers.add(this));
            }),
            this.room && (this.room.connect(), ec(this)));
        }
        disconnect() {
          ((this.shouldConnect = !1),
            this.signalingConns.forEach((e) => {
              (e.providers.delete(this),
                0 === e.providers.size && (e.destroy(), K.delete(e.url)));
            }),
            this.room && (this.room.disconnect(), ec(this)));
        }
        destroy() {
          (this.doc.off("destroy", this.destroy),
            this.key.then(() => {
              (this.room.destroy(), $.delete(this.roomName));
            }),
            super.destroy());
        }
      }
    },
  },
]);
