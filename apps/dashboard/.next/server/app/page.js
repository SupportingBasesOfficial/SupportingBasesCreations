(() => {
  var e = {};
  ((e.id = 931),
    (e.ids = [931]),
    (e.modules = {
      2642: (e) => {
        function t(e) {
          return Promise.resolve().then(() => {
            var t = Error("Cannot find module '" + e + "'");
            throw ((t.code = "MODULE_NOT_FOUND"), t);
          });
        }
        ((t.keys = () => []), (t.resolve = t), (t.id = 2642), (e.exports = t));
      },
      7849: (e) => {
        "use strict";
        e.exports = require("next/dist/client/components/action-async-storage.external");
      },
      2934: (e) => {
        "use strict";
        e.exports = require("next/dist/client/components/action-async-storage.external.js");
      },
      5403: (e) => {
        "use strict";
        e.exports = require("next/dist/client/components/request-async-storage.external");
      },
      4580: (e) => {
        "use strict";
        e.exports = require("next/dist/client/components/request-async-storage.external.js");
      },
      4749: (e) => {
        "use strict";
        e.exports = require("next/dist/client/components/static-generation-async-storage.external");
      },
      5869: (e) => {
        "use strict";
        e.exports = require("next/dist/client/components/static-generation-async-storage.external.js");
      },
      399: (e) => {
        "use strict";
        e.exports = require("next/dist/compiled/next-server/app-page.runtime.prod.js");
      },
      1017: (e) => {
        "use strict";
        e.exports = require("path");
      },
      6528: (e, t, n) => {
        "use strict";
        (n.r(t),
          n.d(t, {
            GlobalError: () => s.a,
            __next_app__: () => h,
            originalPathname: () => c,
            pages: () => u,
            routeModule: () => p,
            tree: () => d,
          }),
          n(8077),
          n(914),
          n(4872));
        var r = n(1218),
          i = n(8345),
          a = n(4380),
          s = n.n(a),
          o = n(306),
          l = {};
        for (let e in o)
          0 >
            [
              "default",
              "tree",
              "pages",
              "GlobalError",
              "originalPathname",
              "__next_app__",
              "routeModule",
            ].indexOf(e) && (l[e] = () => o[e]);
        n.d(t, l);
        let d = [
            "",
            {
              children: [
                "__PAGE__",
                {},
                {
                  page: [
                    () => Promise.resolve().then(n.bind(n, 8077)),
                    "C:\\Users\\Tay\\CascadeProjects\\SupportingBasesCreations\\apps\\dashboard\\src\\app\\page.tsx",
                  ],
                },
              ],
            },
            {
              layout: [
                () => Promise.resolve().then(n.bind(n, 914)),
                "C:\\Users\\Tay\\CascadeProjects\\SupportingBasesCreations\\apps\\dashboard\\src\\app\\layout.tsx",
              ],
              "not-found": [
                () => Promise.resolve().then(n.t.bind(n, 4872, 23)),
                "next/dist/client/components/not-found-error",
              ],
            },
          ],
          u = [
            "C:\\Users\\Tay\\CascadeProjects\\SupportingBasesCreations\\apps\\dashboard\\src\\app\\page.tsx",
          ],
          c = "/page",
          h = { require: n, loadChunk: () => Promise.resolve() },
          p = new r.AppPageRouteModule({
            definition: {
              kind: i.x.APP_PAGE,
              page: "/page",
              pathname: "/",
              bundlePath: "",
              filename: "",
              appPaths: [],
            },
            userland: { loaderTree: d },
          });
      },
      2080: () => {},
      2238: (e, t, n) => {
        Promise.resolve().then(n.bind(n, 3354));
      },
      707: (e, t, n) => {
        (Promise.resolve().then(n.t.bind(n, 6249, 23)),
          Promise.resolve().then(n.t.bind(n, 7445, 23)),
          Promise.resolve().then(n.t.bind(n, 5562, 23)),
          Promise.resolve().then(n.t.bind(n, 8178, 23)),
          Promise.resolve().then(n.t.bind(n, 6322, 23)),
          Promise.resolve().then(n.t.bind(n, 1851, 23)));
      },
      3354: (e, t, n) => {
        "use strict";
        let r, i, a;
        (n.r(t), n.d(t, { default: () => lm }));
        var s,
          o,
          l,
          d,
          u,
          c,
          h,
          p,
          f,
          m,
          g,
          y,
          v,
          x,
          b,
          _,
          w,
          E,
          N,
          S,
          C,
          k,
          A,
          T,
          O,
          j,
          I,
          M,
          R,
          D,
          P,
          $,
          L,
          B = n(4470),
          F = n(1664);
        function z(e) {
          if ("string" == typeof e || "number" == typeof e) return "" + e;
          let t = "";
          if (Array.isArray(e))
            for (let n = 0, r; n < e.length; n++)
              "" !== (r = z(e[n])) && (t += (t && " ") + r);
          else for (let n in e) e[n] && (t += (t && " ") + n);
          return t;
        }
        function V() {}
        function H(e) {
          return null == e
            ? V
            : function () {
                return this.querySelector(e);
              };
        }
        function Z() {
          return [];
        }
        function U(e) {
          return null == e
            ? Z
            : function () {
                return this.querySelectorAll(e);
              };
        }
        function G(e) {
          return function () {
            return this.matches(e);
          };
        }
        function q(e) {
          return function (t) {
            return t.matches(e);
          };
        }
        var W = Array.prototype.find;
        function Y() {
          return this.firstElementChild;
        }
        var K = Array.prototype.filter;
        function X() {
          return Array.from(this.children);
        }
        function Q(e) {
          return Array(e.length);
        }
        function J(e, t) {
          ((this.ownerDocument = e.ownerDocument),
            (this.namespaceURI = e.namespaceURI),
            (this._next = null),
            (this._parent = e),
            (this.__data__ = t));
        }
        function ee(e, t, n, r, i, a) {
          for (var s, o = 0, l = t.length, d = a.length; o < d; ++o)
            (s = t[o])
              ? ((s.__data__ = a[o]), (r[o] = s))
              : (n[o] = new J(e, a[o]));
          for (; o < l; ++o) (s = t[o]) && (i[o] = s);
        }
        function et(e, t, n, r, i, a, s) {
          var o,
            l,
            d,
            u = new Map(),
            c = t.length,
            h = a.length,
            p = Array(c);
          for (o = 0; o < c; ++o)
            (l = t[o]) &&
              ((p[o] = d = s.call(l, l.__data__, o, t) + ""),
              u.has(d) ? (i[o] = l) : u.set(d, l));
          for (o = 0; o < h; ++o)
            ((d = s.call(e, a[o], o, a) + ""),
              (l = u.get(d))
                ? ((r[o] = l), (l.__data__ = a[o]), u.delete(d))
                : (n[o] = new J(e, a[o])));
          for (o = 0; o < c; ++o) (l = t[o]) && u.get(p[o]) === l && (i[o] = l);
        }
        function en(e) {
          return e.__data__;
        }
        function er(e, t) {
          return e < t ? -1 : e > t ? 1 : e >= t ? 0 : NaN;
        }
        J.prototype = {
          constructor: J,
          appendChild: function (e) {
            return this._parent.insertBefore(e, this._next);
          },
          insertBefore: function (e, t) {
            return this._parent.insertBefore(e, t);
          },
          querySelector: function (e) {
            return this._parent.querySelector(e);
          },
          querySelectorAll: function (e) {
            return this._parent.querySelectorAll(e);
          },
        };
        var ei = "http://www.w3.org/1999/xhtml";
        let ea = {
          svg: "http://www.w3.org/2000/svg",
          xhtml: ei,
          xlink: "http://www.w3.org/1999/xlink",
          xml: "http://www.w3.org/XML/1998/namespace",
          xmlns: "http://www.w3.org/2000/xmlns/",
        };
        function es(e) {
          var t = (e += ""),
            n = t.indexOf(":");
          return (
            n >= 0 && "xmlns" !== (t = e.slice(0, n)) && (e = e.slice(n + 1)),
            ea.hasOwnProperty(t) ? { space: ea[t], local: e } : e
          );
        }
        function eo(e) {
          return (
            (e.ownerDocument && e.ownerDocument.defaultView) ||
            (e.document && e) ||
            e.defaultView
          );
        }
        function el(e, t) {
          return (
            e.style.getPropertyValue(t) ||
            eo(e).getComputedStyle(e, null).getPropertyValue(t)
          );
        }
        function ed(e) {
          return e.trim().split(/^|\s+/);
        }
        function eu(e) {
          return e.classList || new ec(e);
        }
        function ec(e) {
          ((this._node = e), (this._names = ed(e.getAttribute("class") || "")));
        }
        function eh(e, t) {
          for (var n = eu(e), r = -1, i = t.length; ++r < i;) n.add(t[r]);
        }
        function ep(e, t) {
          for (var n = eu(e), r = -1, i = t.length; ++r < i;) n.remove(t[r]);
        }
        function ef() {
          this.textContent = "";
        }
        function em() {
          this.innerHTML = "";
        }
        function eg() {
          this.nextSibling && this.parentNode.appendChild(this);
        }
        function ey() {
          this.previousSibling &&
            this.parentNode.insertBefore(this, this.parentNode.firstChild);
        }
        function ev(e) {
          var t = es(e);
          return (
            t.local
              ? function (e) {
                  return function () {
                    return this.ownerDocument.createElementNS(e.space, e.local);
                  };
                }
              : function (e) {
                  return function () {
                    var t = this.ownerDocument,
                      n = this.namespaceURI;
                    return n === ei && t.documentElement.namespaceURI === ei
                      ? t.createElement(e)
                      : t.createElementNS(n, e);
                  };
                }
          )(t);
        }
        function ex() {
          return null;
        }
        function eb() {
          var e = this.parentNode;
          e && e.removeChild(this);
        }
        function e_() {
          var e = this.cloneNode(!1),
            t = this.parentNode;
          return t ? t.insertBefore(e, this.nextSibling) : e;
        }
        function ew() {
          var e = this.cloneNode(!0),
            t = this.parentNode;
          return t ? t.insertBefore(e, this.nextSibling) : e;
        }
        function eE(e) {
          return function () {
            var t = this.__on;
            if (t) {
              for (var n, r = 0, i = -1, a = t.length; r < a; ++r)
                ((n = t[r]), (e.type && n.type !== e.type) || n.name !== e.name)
                  ? (t[++i] = n)
                  : this.removeEventListener(n.type, n.listener, n.options);
              ++i ? (t.length = i) : delete this.__on;
            }
          };
        }
        function eN(e, t, n) {
          return function () {
            var r,
              i = this.__on,
              a = function (e) {
                t.call(this, e, this.__data__);
              };
            if (i) {
              for (var s = 0, o = i.length; s < o; ++s)
                if ((r = i[s]).type === e.type && r.name === e.name) {
                  (this.removeEventListener(r.type, r.listener, r.options),
                    this.addEventListener(
                      r.type,
                      (r.listener = a),
                      (r.options = n),
                    ),
                    (r.value = t));
                  return;
                }
            }
            (this.addEventListener(e.type, a, n),
              (r = {
                type: e.type,
                name: e.name,
                value: t,
                listener: a,
                options: n,
              }),
              i ? i.push(r) : (this.__on = [r]));
          };
        }
        function eS(e, t, n) {
          var r = eo(e),
            i = r.CustomEvent;
          ("function" == typeof i
            ? (i = new i(t, n))
            : ((i = r.document.createEvent("Event")),
              n
                ? (i.initEvent(t, n.bubbles, n.cancelable),
                  (i.detail = n.detail))
                : i.initEvent(t, !1, !1)),
            e.dispatchEvent(i));
        }
        ec.prototype = {
          add: function (e) {
            0 > this._names.indexOf(e) &&
              (this._names.push(e),
              this._node.setAttribute("class", this._names.join(" ")));
          },
          remove: function (e) {
            var t = this._names.indexOf(e);
            t >= 0 &&
              (this._names.splice(t, 1),
              this._node.setAttribute("class", this._names.join(" ")));
          },
          contains: function (e) {
            return this._names.indexOf(e) >= 0;
          },
        };
        var eC = [null];
        function ek(e, t) {
          ((this._groups = e), (this._parents = t));
        }
        function eA() {
          return new ek([[document.documentElement]], eC);
        }
        ek.prototype = eA.prototype = {
          constructor: ek,
          select: function (e) {
            "function" != typeof e && (e = H(e));
            for (
              var t = this._groups, n = t.length, r = Array(n), i = 0;
              i < n;
              ++i
            )
              for (
                var a, s, o = t[i], l = o.length, d = (r[i] = Array(l)), u = 0;
                u < l;
                ++u
              )
                (a = o[u]) &&
                  (s = e.call(a, a.__data__, u, o)) &&
                  ("__data__" in a && (s.__data__ = a.__data__), (d[u] = s));
            return new ek(r, this._parents);
          },
          selectAll: function (e) {
            if ("function" == typeof e) {
              var t;
              ((t = e),
                (e = function () {
                  var e;
                  return (
                    (e = t.apply(this, arguments)),
                    null == e ? [] : Array.isArray(e) ? e : Array.from(e)
                  );
                }));
            } else e = U(e);
            for (
              var n = this._groups, r = n.length, i = [], a = [], s = 0;
              s < r;
              ++s
            )
              for (var o, l = n[s], d = l.length, u = 0; u < d; ++u)
                (o = l[u]) && (i.push(e.call(o, o.__data__, u, l)), a.push(o));
            return new ek(i, a);
          },
          selectChild: function (e) {
            var t;
            return this.select(
              null == e
                ? Y
                : ((t = "function" == typeof e ? e : q(e)),
                  function () {
                    return W.call(this.children, t);
                  }),
            );
          },
          selectChildren: function (e) {
            var t;
            return this.selectAll(
              null == e
                ? X
                : ((t = "function" == typeof e ? e : q(e)),
                  function () {
                    return K.call(this.children, t);
                  }),
            );
          },
          filter: function (e) {
            "function" != typeof e && (e = G(e));
            for (
              var t = this._groups, n = t.length, r = Array(n), i = 0;
              i < n;
              ++i
            )
              for (
                var a, s = t[i], o = s.length, l = (r[i] = []), d = 0;
                d < o;
                ++d
              )
                (a = s[d]) && e.call(a, a.__data__, d, s) && l.push(a);
            return new ek(r, this._parents);
          },
          data: function (e, t) {
            if (!arguments.length) return Array.from(this, en);
            var n = t ? et : ee,
              r = this._parents,
              i = this._groups;
            "function" != typeof e &&
              ((v = e),
              (e = function () {
                return v;
              }));
            for (
              var a = i.length, s = Array(a), o = Array(a), l = Array(a), d = 0;
              d < a;
              ++d
            ) {
              var u = r[d],
                c = i[d],
                h = c.length,
                p =
                  "object" == typeof (y = e.call(u, u && u.__data__, d, r)) &&
                  "length" in y
                    ? y
                    : Array.from(y),
                f = p.length,
                m = (o[d] = Array(f)),
                g = (s[d] = Array(f));
              n(u, c, m, g, (l[d] = Array(h)), p, t);
              for (var y, v, x, b, _ = 0, w = 0; _ < f; ++_)
                if ((x = m[_])) {
                  for (_ >= w && (w = _ + 1); !(b = g[w]) && ++w < f;);
                  x._next = b || null;
                }
            }
            return (((s = new ek(s, r))._enter = o), (s._exit = l), s);
          },
          enter: function () {
            return new ek(this._enter || this._groups.map(Q), this._parents);
          },
          exit: function () {
            return new ek(this._exit || this._groups.map(Q), this._parents);
          },
          join: function (e, t, n) {
            var r = this.enter(),
              i = this,
              a = this.exit();
            return (
              "function" == typeof e
                ? (r = e(r)) && (r = r.selection())
                : (r = r.append(e + "")),
              null != t && (i = t(i)) && (i = i.selection()),
              null == n ? a.remove() : n(a),
              r && i ? r.merge(i).order() : i
            );
          },
          merge: function (e) {
            for (
              var t = e.selection ? e.selection() : e,
                n = this._groups,
                r = t._groups,
                i = n.length,
                a = r.length,
                s = Math.min(i, a),
                o = Array(i),
                l = 0;
              l < s;
              ++l
            )
              for (
                var d,
                  u = n[l],
                  c = r[l],
                  h = u.length,
                  p = (o[l] = Array(h)),
                  f = 0;
                f < h;
                ++f
              )
                (d = u[f] || c[f]) && (p[f] = d);
            for (; l < i; ++l) o[l] = n[l];
            return new ek(o, this._parents);
          },
          selection: function () {
            return this;
          },
          order: function () {
            for (var e = this._groups, t = -1, n = e.length; ++t < n;)
              for (var r, i = e[t], a = i.length - 1, s = i[a]; --a >= 0;)
                (r = i[a]) &&
                  (s &&
                    4 ^ r.compareDocumentPosition(s) &&
                    s.parentNode.insertBefore(r, s),
                  (s = r));
            return this;
          },
          sort: function (e) {
            function t(t, n) {
              return t && n ? e(t.__data__, n.__data__) : !t - !n;
            }
            e || (e = er);
            for (
              var n = this._groups, r = n.length, i = Array(r), a = 0;
              a < r;
              ++a
            ) {
              for (
                var s, o = n[a], l = o.length, d = (i[a] = Array(l)), u = 0;
                u < l;
                ++u
              )
                (s = o[u]) && (d[u] = s);
              d.sort(t);
            }
            return new ek(i, this._parents).order();
          },
          call: function () {
            var e = arguments[0];
            return ((arguments[0] = this), e.apply(null, arguments), this);
          },
          nodes: function () {
            return Array.from(this);
          },
          node: function () {
            for (var e = this._groups, t = 0, n = e.length; t < n; ++t)
              for (var r = e[t], i = 0, a = r.length; i < a; ++i) {
                var s = r[i];
                if (s) return s;
              }
            return null;
          },
          size: function () {
            let e = 0;
            for (let t of this) ++e;
            return e;
          },
          empty: function () {
            return !this.node();
          },
          each: function (e) {
            for (var t = this._groups, n = 0, r = t.length; n < r; ++n)
              for (var i, a = t[n], s = 0, o = a.length; s < o; ++s)
                (i = a[s]) && e.call(i, i.__data__, s, a);
            return this;
          },
          attr: function (e, t) {
            var n = es(e);
            if (arguments.length < 2) {
              var r = this.node();
              return n.local
                ? r.getAttributeNS(n.space, n.local)
                : r.getAttribute(n);
            }
            return this.each(
              (null == t
                ? n.local
                  ? function (e) {
                      return function () {
                        this.removeAttributeNS(e.space, e.local);
                      };
                    }
                  : function (e) {
                      return function () {
                        this.removeAttribute(e);
                      };
                    }
                : "function" == typeof t
                  ? n.local
                    ? function (e, t) {
                        return function () {
                          var n = t.apply(this, arguments);
                          null == n
                            ? this.removeAttributeNS(e.space, e.local)
                            : this.setAttributeNS(e.space, e.local, n);
                        };
                      }
                    : function (e, t) {
                        return function () {
                          var n = t.apply(this, arguments);
                          null == n
                            ? this.removeAttribute(e)
                            : this.setAttribute(e, n);
                        };
                      }
                  : n.local
                    ? function (e, t) {
                        return function () {
                          this.setAttributeNS(e.space, e.local, t);
                        };
                      }
                    : function (e, t) {
                        return function () {
                          this.setAttribute(e, t);
                        };
                      })(n, t),
            );
          },
          style: function (e, t, n) {
            return arguments.length > 1
              ? this.each(
                  (null == t
                    ? function (e) {
                        return function () {
                          this.style.removeProperty(e);
                        };
                      }
                    : "function" == typeof t
                      ? function (e, t, n) {
                          return function () {
                            var r = t.apply(this, arguments);
                            null == r
                              ? this.style.removeProperty(e)
                              : this.style.setProperty(e, r, n);
                          };
                        }
                      : function (e, t, n) {
                          return function () {
                            this.style.setProperty(e, t, n);
                          };
                        })(e, t, null == n ? "" : n),
                )
              : el(this.node(), e);
          },
          property: function (e, t) {
            return arguments.length > 1
              ? this.each(
                  (null == t
                    ? function (e) {
                        return function () {
                          delete this[e];
                        };
                      }
                    : "function" == typeof t
                      ? function (e, t) {
                          return function () {
                            var n = t.apply(this, arguments);
                            null == n ? delete this[e] : (this[e] = n);
                          };
                        }
                      : function (e, t) {
                          return function () {
                            this[e] = t;
                          };
                        })(e, t),
                )
              : this.node()[e];
          },
          classed: function (e, t) {
            var n = ed(e + "");
            if (arguments.length < 2) {
              for (var r = eu(this.node()), i = -1, a = n.length; ++i < a;)
                if (!r.contains(n[i])) return !1;
              return !0;
            }
            return this.each(
              ("function" == typeof t
                ? function (e, t) {
                    return function () {
                      (t.apply(this, arguments) ? eh : ep)(this, e);
                    };
                  }
                : t
                  ? function (e) {
                      return function () {
                        eh(this, e);
                      };
                    }
                  : function (e) {
                      return function () {
                        ep(this, e);
                      };
                    })(n, t),
            );
          },
          text: function (e) {
            return arguments.length
              ? this.each(
                  null == e
                    ? ef
                    : ("function" == typeof e
                        ? function (e) {
                            return function () {
                              var t = e.apply(this, arguments);
                              this.textContent = null == t ? "" : t;
                            };
                          }
                        : function (e) {
                            return function () {
                              this.textContent = e;
                            };
                          })(e),
                )
              : this.node().textContent;
          },
          html: function (e) {
            return arguments.length
              ? this.each(
                  null == e
                    ? em
                    : ("function" == typeof e
                        ? function (e) {
                            return function () {
                              var t = e.apply(this, arguments);
                              this.innerHTML = null == t ? "" : t;
                            };
                          }
                        : function (e) {
                            return function () {
                              this.innerHTML = e;
                            };
                          })(e),
                )
              : this.node().innerHTML;
          },
          raise: function () {
            return this.each(eg);
          },
          lower: function () {
            return this.each(ey);
          },
          append: function (e) {
            var t = "function" == typeof e ? e : ev(e);
            return this.select(function () {
              return this.appendChild(t.apply(this, arguments));
            });
          },
          insert: function (e, t) {
            var n = "function" == typeof e ? e : ev(e),
              r = null == t ? ex : "function" == typeof t ? t : H(t);
            return this.select(function () {
              return this.insertBefore(
                n.apply(this, arguments),
                r.apply(this, arguments) || null,
              );
            });
          },
          remove: function () {
            return this.each(eb);
          },
          clone: function (e) {
            return this.select(e ? ew : e_);
          },
          datum: function (e) {
            return arguments.length
              ? this.property("__data__", e)
              : this.node().__data__;
          },
          on: function (e, t, n) {
            var r,
              i,
              a = (e + "")
                .trim()
                .split(/^|\s+/)
                .map(function (e) {
                  var t = "",
                    n = e.indexOf(".");
                  return (
                    n >= 0 && ((t = e.slice(n + 1)), (e = e.slice(0, n))),
                    { type: e, name: t }
                  );
                }),
              s = a.length;
            if (arguments.length < 2) {
              var o = this.node().__on;
              if (o) {
                for (var l, d = 0, u = o.length; d < u; ++d)
                  for (r = 0, l = o[d]; r < s; ++r)
                    if ((i = a[r]).type === l.type && i.name === l.name)
                      return l.value;
              }
              return;
            }
            for (r = 0, o = t ? eN : eE; r < s; ++r) this.each(o(a[r], t, n));
            return this;
          },
          dispatch: function (e, t) {
            return this.each(
              ("function" == typeof t
                ? function (e, t) {
                    return function () {
                      return eS(this, e, t.apply(this, arguments));
                    };
                  }
                : function (e, t) {
                    return function () {
                      return eS(this, e, t);
                    };
                  })(e, t),
            );
          },
          [Symbol.iterator]: function* () {
            for (var e = this._groups, t = 0, n = e.length; t < n; ++t)
              for (var r, i = e[t], a = 0, s = i.length; a < s; ++a)
                (r = i[a]) && (yield r);
          },
        };
        var eT = { value: () => {} };
        function eO() {
          for (var e, t = 0, n = arguments.length, r = {}; t < n; ++t) {
            if (!(e = arguments[t] + "") || e in r || /[\s.]/.test(e))
              throw Error("illegal type: " + e);
            r[e] = [];
          }
          return new ej(r);
        }
        function ej(e) {
          this._ = e;
        }
        function eI(e, t, n) {
          for (var r = 0, i = e.length; r < i; ++r)
            if (e[r].name === t) {
              ((e[r] = eT), (e = e.slice(0, r).concat(e.slice(r + 1))));
              break;
            }
          return (null != n && e.push({ name: t, value: n }), e);
        }
        ej.prototype = eO.prototype = {
          constructor: ej,
          on: function (e, t) {
            var n,
              r = this._,
              i = (e + "")
                .trim()
                .split(/^|\s+/)
                .map(function (e) {
                  var t = "",
                    n = e.indexOf(".");
                  if (
                    (n >= 0 && ((t = e.slice(n + 1)), (e = e.slice(0, n))),
                    e && !r.hasOwnProperty(e))
                  )
                    throw Error("unknown type: " + e);
                  return { type: e, name: t };
                }),
              a = -1,
              s = i.length;
            if (arguments.length < 2) {
              for (; ++a < s;)
                if (
                  (n = (e = i[a]).type) &&
                  (n = (function (e, t) {
                    for (var n, r = 0, i = e.length; r < i; ++r)
                      if ((n = e[r]).name === t) return n.value;
                  })(r[n], e.name))
                )
                  return n;
              return;
            }
            if (null != t && "function" != typeof t)
              throw Error("invalid callback: " + t);
            for (; ++a < s;)
              if ((n = (e = i[a]).type)) r[n] = eI(r[n], e.name, t);
              else if (null == t) for (n in r) r[n] = eI(r[n], e.name, null);
            return this;
          },
          copy: function () {
            var e = {},
              t = this._;
            for (var n in t) e[n] = t[n].slice();
            return new ej(e);
          },
          call: function (e, t) {
            if ((n = arguments.length - 2) > 0)
              for (var n, r, i = Array(n), a = 0; a < n; ++a)
                i[a] = arguments[a + 2];
            if (!this._.hasOwnProperty(e)) throw Error("unknown type: " + e);
            for (r = this._[e], a = 0, n = r.length; a < n; ++a)
              r[a].value.apply(t, i);
          },
          apply: function (e, t, n) {
            if (!this._.hasOwnProperty(e)) throw Error("unknown type: " + e);
            for (var r = this._[e], i = 0, a = r.length; i < a; ++i)
              r[i].value.apply(t, n);
          },
        };
        var eM,
          eR,
          eD = 0,
          eP = 0,
          e$ = 0,
          eL = 0,
          eB = 0,
          eF = 0,
          ez =
            "object" == typeof performance && performance.now
              ? performance
              : Date,
          eV =
            "object" == typeof window && window.requestAnimationFrame
              ? window.requestAnimationFrame.bind(window)
              : function (e) {
                  setTimeout(e, 17);
                };
        function eH() {
          return eB || (eV(eZ), (eB = ez.now() + eF));
        }
        function eZ() {
          eB = 0;
        }
        function eU() {
          this._call = this._time = this._next = null;
        }
        function eG(e, t, n) {
          var r = new eU();
          return (r.restart(e, t, n), r);
        }
        function eq() {
          ((eB = (eL = ez.now()) + eF), (eD = eP = 0));
          try {
            !(function () {
              (eH(), ++eD);
              for (var e, t = eM; t;)
                ((e = eB - t._time) >= 0 && t._call.call(void 0, e),
                  (t = t._next));
              --eD;
            })();
          } finally {
            ((eD = 0),
              (function () {
                for (var e, t, n = eM, r = 1 / 0; n;)
                  n._call
                    ? (r > n._time && (r = n._time), (e = n), (n = n._next))
                    : ((t = n._next),
                      (n._next = null),
                      (n = e ? (e._next = t) : (eM = t)));
                ((eR = e), eY(r));
              })(),
              (eB = 0));
          }
        }
        function eW() {
          var e = ez.now(),
            t = e - eL;
          t > 1e3 && ((eF -= t), (eL = e));
        }
        function eY(e) {
          !eD &&
            (eP && (eP = clearTimeout(eP)),
            e - eB > 24
              ? (e < 1 / 0 && (eP = setTimeout(eq, e - ez.now() - eF)),
                e$ && (e$ = clearInterval(e$)))
              : (e$ || ((eL = ez.now()), (e$ = setInterval(eW, 1e3))),
                (eD = 1),
                eV(eq)));
        }
        function eK(e, t, n) {
          var r = new eU();
          return (
            (t = null == t ? 0 : +t),
            r.restart(
              (n) => {
                (r.stop(), e(n + t));
              },
              t,
              n,
            ),
            r
          );
        }
        eU.prototype = eG.prototype = {
          constructor: eU,
          restart: function (e, t, n) {
            if ("function" != typeof e)
              throw TypeError("callback is not a function");
            ((n = (null == n ? eH() : +n) + (null == t ? 0 : +t)),
              this._next ||
                eR === this ||
                (eR ? (eR._next = this) : (eM = this), (eR = this)),
              (this._call = e),
              (this._time = n),
              eY());
          },
          stop: function () {
            this._call && ((this._call = null), (this._time = 1 / 0), eY());
          },
        };
        var eX = eO("start", "end", "cancel", "interrupt"),
          eQ = [];
        function eJ(e, t, n, r, i, a) {
          var s = e.__transition;
          if (s) {
            if (n in s) return;
          } else e.__transition = {};
          (function (e, t, n) {
            var r,
              i = e.__transition;
            function a(l) {
              var d, u, c, h;
              if (1 !== n.state) return o();
              for (d in i)
                if ((h = i[d]).name === n.name) {
                  if (3 === h.state) return eK(a);
                  4 === h.state
                    ? ((h.state = 6),
                      h.timer.stop(),
                      h.on.call("interrupt", e, e.__data__, h.index, h.group),
                      delete i[d])
                    : +d < t &&
                      ((h.state = 6),
                      h.timer.stop(),
                      h.on.call("cancel", e, e.__data__, h.index, h.group),
                      delete i[d]);
                }
              if (
                (eK(function () {
                  3 === n.state &&
                    ((n.state = 4), n.timer.restart(s, n.delay, n.time), s(l));
                }),
                (n.state = 2),
                n.on.call("start", e, e.__data__, n.index, n.group),
                2 === n.state)
              ) {
                for (
                  d = 0, n.state = 3, r = Array((c = n.tween.length)), u = -1;
                  d < c;
                  ++d
                )
                  (h = n.tween[d].value.call(
                    e,
                    e.__data__,
                    n.index,
                    n.group,
                  )) && (r[++u] = h);
                r.length = u + 1;
              }
            }
            function s(t) {
              for (
                var i =
                    t < n.duration
                      ? n.ease.call(null, t / n.duration)
                      : (n.timer.restart(o), (n.state = 5), 1),
                  a = -1,
                  s = r.length;
                ++a < s;
              )
                r[a].call(e, i);
              5 === n.state &&
                (n.on.call("end", e, e.__data__, n.index, n.group), o());
            }
            function o() {
              for (var r in ((n.state = 6), n.timer.stop(), delete i[t], i))
                return;
              delete e.__transition;
            }
            ((i[t] = n),
              (n.timer = eG(
                function (e) {
                  ((n.state = 1),
                    n.timer.restart(a, n.delay, n.time),
                    n.delay <= e && a(e - n.delay));
                },
                0,
                n.time,
              )));
          })(e, n, {
            name: t,
            index: r,
            group: i,
            on: eX,
            tween: eQ,
            time: a.time,
            delay: a.delay,
            duration: a.duration,
            ease: a.ease,
            timer: null,
            state: 0,
          });
        }
        function e0(e, t) {
          var n = e2(e, t);
          if (n.state > 0) throw Error("too late; already scheduled");
          return n;
        }
        function e1(e, t) {
          var n = e2(e, t);
          if (n.state > 3) throw Error("too late; already running");
          return n;
        }
        function e2(e, t) {
          var n = e.__transition;
          if (!n || !(n = n[t])) throw Error("transition not found");
          return n;
        }
        function e5(e, t) {
          return (
            (e = +e),
            (t = +t),
            function (n) {
              return e * (1 - n) + t * n;
            }
          );
        }
        var e4 = 180 / Math.PI,
          e3 = {
            translateX: 0,
            translateY: 0,
            rotate: 0,
            skewX: 0,
            scaleX: 1,
            scaleY: 1,
          };
        function e6(e, t, n, r, i, a) {
          var s, o, l;
          return (
            (s = Math.sqrt(e * e + t * t)) && ((e /= s), (t /= s)),
            (l = e * n + t * r) && ((n -= e * l), (r -= t * l)),
            (o = Math.sqrt(n * n + r * r)) && ((n /= o), (r /= o), (l /= o)),
            e * r < t * n && ((e = -e), (t = -t), (l = -l), (s = -s)),
            {
              translateX: i,
              translateY: a,
              rotate: Math.atan2(t, e) * e4,
              skewX: Math.atan(l) * e4,
              scaleX: s,
              scaleY: o,
            }
          );
        }
        function e9(e, t, n, r) {
          function i(e) {
            return e.length ? e.pop() + " " : "";
          }
          return function (a, s) {
            var o,
              l,
              d,
              u,
              c = [],
              h = [];
            return (
              (a = e(a)),
              (s = e(s)),
              (function (e, r, i, a, s, o) {
                if (e !== i || r !== a) {
                  var l = s.push("translate(", null, t, null, n);
                  o.push({ i: l - 4, x: e5(e, i) }, { i: l - 2, x: e5(r, a) });
                } else (i || a) && s.push("translate(" + i + t + a + n);
              })(a.translateX, a.translateY, s.translateX, s.translateY, c, h),
              (o = a.rotate) !== (l = s.rotate)
                ? (o - l > 180 ? (l += 360) : l - o > 180 && (o += 360),
                  h.push({
                    i: c.push(i(c) + "rotate(", null, r) - 2,
                    x: e5(o, l),
                  }))
                : l && c.push(i(c) + "rotate(" + l + r),
              (d = a.skewX) !== (u = s.skewX)
                ? h.push({
                    i: c.push(i(c) + "skewX(", null, r) - 2,
                    x: e5(d, u),
                  })
                : u && c.push(i(c) + "skewX(" + u + r),
              (function (e, t, n, r, a, s) {
                if (e !== n || t !== r) {
                  var o = a.push(i(a) + "scale(", null, ",", null, ")");
                  s.push({ i: o - 4, x: e5(e, n) }, { i: o - 2, x: e5(t, r) });
                } else
                  (1 !== n || 1 !== r) &&
                    a.push(i(a) + "scale(" + n + "," + r + ")");
              })(a.scaleX, a.scaleY, s.scaleX, s.scaleY, c, h),
              (a = s = null),
              function (e) {
                for (var t, n = -1, r = h.length; ++n < r;)
                  c[(t = h[n]).i] = t.x(e);
                return c.join("");
              }
            );
          };
        }
        var e7 = e9(
            function (e) {
              let t = new (
                "function" == typeof DOMMatrix ? DOMMatrix : WebKitCSSMatrix
              )(e + "");
              return t.isIdentity ? e3 : e6(t.a, t.b, t.c, t.d, t.e, t.f);
            },
            "px, ",
            "px)",
            "deg)",
          ),
          e8 = e9(
            function (e) {
              return null == e
                ? e3
                : (s ||
                      (s = document.createElementNS(
                        "http://www.w3.org/2000/svg",
                        "g",
                      )),
                    s.setAttribute("transform", e),
                    (e = s.transform.baseVal.consolidate()))
                  ? e6((e = e.matrix).a, e.b, e.c, e.d, e.e, e.f)
                  : e3;
            },
            ", ",
            ")",
            ")",
          );
        function te(e, t, n) {
          var r = e._id;
          return (
            e.each(function () {
              var e = e1(this, r);
              (e.value || (e.value = {}))[t] = n.apply(this, arguments);
            }),
            function (e) {
              return e2(e, r).value[t];
            }
          );
        }
        function tt(e, t, n) {
          ((e.prototype = t.prototype = n), (n.constructor = e));
        }
        function tn(e, t) {
          var n = Object.create(e.prototype);
          for (var r in t) n[r] = t[r];
          return n;
        }
        function tr() {}
        var ti = "\\s*([+-]?\\d+)\\s*",
          ta = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*",
          ts = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*",
          to = /^#([0-9a-f]{3,8})$/,
          tl = RegExp(`^rgb\\(${ti},${ti},${ti}\\)$`),
          td = RegExp(`^rgb\\(${ts},${ts},${ts}\\)$`),
          tu = RegExp(`^rgba\\(${ti},${ti},${ti},${ta}\\)$`),
          tc = RegExp(`^rgba\\(${ts},${ts},${ts},${ta}\\)$`),
          th = RegExp(`^hsl\\(${ta},${ts},${ts}\\)$`),
          tp = RegExp(`^hsla\\(${ta},${ts},${ts},${ta}\\)$`),
          tf = {
            aliceblue: 15792383,
            antiquewhite: 16444375,
            aqua: 65535,
            aquamarine: 8388564,
            azure: 15794175,
            beige: 16119260,
            bisque: 16770244,
            black: 0,
            blanchedalmond: 16772045,
            blue: 255,
            blueviolet: 9055202,
            brown: 10824234,
            burlywood: 14596231,
            cadetblue: 6266528,
            chartreuse: 8388352,
            chocolate: 13789470,
            coral: 16744272,
            cornflowerblue: 6591981,
            cornsilk: 16775388,
            crimson: 14423100,
            cyan: 65535,
            darkblue: 139,
            darkcyan: 35723,
            darkgoldenrod: 12092939,
            darkgray: 11119017,
            darkgreen: 25600,
            darkgrey: 11119017,
            darkkhaki: 12433259,
            darkmagenta: 9109643,
            darkolivegreen: 5597999,
            darkorange: 16747520,
            darkorchid: 10040012,
            darkred: 9109504,
            darksalmon: 15308410,
            darkseagreen: 9419919,
            darkslateblue: 4734347,
            darkslategray: 3100495,
            darkslategrey: 3100495,
            darkturquoise: 52945,
            darkviolet: 9699539,
            deeppink: 16716947,
            deepskyblue: 49151,
            dimgray: 6908265,
            dimgrey: 6908265,
            dodgerblue: 2003199,
            firebrick: 11674146,
            floralwhite: 16775920,
            forestgreen: 2263842,
            fuchsia: 16711935,
            gainsboro: 14474460,
            ghostwhite: 16316671,
            gold: 16766720,
            goldenrod: 14329120,
            gray: 8421504,
            green: 32768,
            greenyellow: 11403055,
            grey: 8421504,
            honeydew: 15794160,
            hotpink: 16738740,
            indianred: 13458524,
            indigo: 4915330,
            ivory: 16777200,
            khaki: 15787660,
            lavender: 15132410,
            lavenderblush: 16773365,
            lawngreen: 8190976,
            lemonchiffon: 16775885,
            lightblue: 11393254,
            lightcoral: 15761536,
            lightcyan: 14745599,
            lightgoldenrodyellow: 16448210,
            lightgray: 13882323,
            lightgreen: 9498256,
            lightgrey: 13882323,
            lightpink: 16758465,
            lightsalmon: 16752762,
            lightseagreen: 2142890,
            lightskyblue: 8900346,
            lightslategray: 7833753,
            lightslategrey: 7833753,
            lightsteelblue: 11584734,
            lightyellow: 16777184,
            lime: 65280,
            limegreen: 3329330,
            linen: 16445670,
            magenta: 16711935,
            maroon: 8388608,
            mediumaquamarine: 6737322,
            mediumblue: 205,
            mediumorchid: 12211667,
            mediumpurple: 9662683,
            mediumseagreen: 3978097,
            mediumslateblue: 8087790,
            mediumspringgreen: 64154,
            mediumturquoise: 4772300,
            mediumvioletred: 13047173,
            midnightblue: 1644912,
            mintcream: 16121850,
            mistyrose: 16770273,
            moccasin: 16770229,
            navajowhite: 16768685,
            navy: 128,
            oldlace: 16643558,
            olive: 8421376,
            olivedrab: 7048739,
            orange: 16753920,
            orangered: 16729344,
            orchid: 14315734,
            palegoldenrod: 15657130,
            palegreen: 10025880,
            paleturquoise: 11529966,
            palevioletred: 14381203,
            papayawhip: 16773077,
            peachpuff: 16767673,
            peru: 13468991,
            pink: 16761035,
            plum: 14524637,
            powderblue: 11591910,
            purple: 8388736,
            rebeccapurple: 6697881,
            red: 16711680,
            rosybrown: 12357519,
            royalblue: 4286945,
            saddlebrown: 9127187,
            salmon: 16416882,
            sandybrown: 16032864,
            seagreen: 3050327,
            seashell: 16774638,
            sienna: 10506797,
            silver: 12632256,
            skyblue: 8900331,
            slateblue: 6970061,
            slategray: 7372944,
            slategrey: 7372944,
            snow: 16775930,
            springgreen: 65407,
            steelblue: 4620980,
            tan: 13808780,
            teal: 32896,
            thistle: 14204888,
            tomato: 16737095,
            turquoise: 4251856,
            violet: 15631086,
            wheat: 16113331,
            white: 16777215,
            whitesmoke: 16119285,
            yellow: 16776960,
            yellowgreen: 10145074,
          };
        function tm() {
          return this.rgb().formatHex();
        }
        function tg() {
          return this.rgb().formatRgb();
        }
        function ty(e) {
          var t, n;
          return (
            (e = (e + "").trim().toLowerCase()),
            (t = to.exec(e))
              ? ((n = t[1].length),
                (t = parseInt(t[1], 16)),
                6 === n
                  ? tv(t)
                  : 3 === n
                    ? new t_(
                        ((t >> 8) & 15) | ((t >> 4) & 240),
                        ((t >> 4) & 15) | (240 & t),
                        ((15 & t) << 4) | (15 & t),
                        1,
                      )
                    : 8 === n
                      ? tx(
                          (t >> 24) & 255,
                          (t >> 16) & 255,
                          (t >> 8) & 255,
                          (255 & t) / 255,
                        )
                      : 4 === n
                        ? tx(
                            ((t >> 12) & 15) | ((t >> 8) & 240),
                            ((t >> 8) & 15) | ((t >> 4) & 240),
                            ((t >> 4) & 15) | (240 & t),
                            (((15 & t) << 4) | (15 & t)) / 255,
                          )
                        : null)
              : (t = tl.exec(e))
                ? new t_(t[1], t[2], t[3], 1)
                : (t = td.exec(e))
                  ? new t_(
                      (255 * t[1]) / 100,
                      (255 * t[2]) / 100,
                      (255 * t[3]) / 100,
                      1,
                    )
                  : (t = tu.exec(e))
                    ? tx(t[1], t[2], t[3], t[4])
                    : (t = tc.exec(e))
                      ? tx(
                          (255 * t[1]) / 100,
                          (255 * t[2]) / 100,
                          (255 * t[3]) / 100,
                          t[4],
                        )
                      : (t = th.exec(e))
                        ? tk(t[1], t[2] / 100, t[3] / 100, 1)
                        : (t = tp.exec(e))
                          ? tk(t[1], t[2] / 100, t[3] / 100, t[4])
                          : tf.hasOwnProperty(e)
                            ? tv(tf[e])
                            : "transparent" === e
                              ? new t_(NaN, NaN, NaN, 0)
                              : null
          );
        }
        function tv(e) {
          return new t_((e >> 16) & 255, (e >> 8) & 255, 255 & e, 1);
        }
        function tx(e, t, n, r) {
          return (r <= 0 && (e = t = n = NaN), new t_(e, t, n, r));
        }
        function tb(e, t, n, r) {
          var i;
          return 1 == arguments.length
            ? ((i = e) instanceof tr || (i = ty(i)), i)
              ? new t_((i = i.rgb()).r, i.g, i.b, i.opacity)
              : new t_()
            : new t_(e, t, n, null == r ? 1 : r);
        }
        function t_(e, t, n, r) {
          ((this.r = +e), (this.g = +t), (this.b = +n), (this.opacity = +r));
        }
        function tw() {
          return `#${tC(this.r)}${tC(this.g)}${tC(this.b)}`;
        }
        function tE() {
          let e = tN(this.opacity);
          return `${1 === e ? "rgb(" : "rgba("}${tS(this.r)}, ${tS(this.g)}, ${tS(this.b)}${1 === e ? ")" : `, ${e})`}`;
        }
        function tN(e) {
          return isNaN(e) ? 1 : Math.max(0, Math.min(1, e));
        }
        function tS(e) {
          return Math.max(0, Math.min(255, Math.round(e) || 0));
        }
        function tC(e) {
          return ((e = tS(e)) < 16 ? "0" : "") + e.toString(16);
        }
        function tk(e, t, n, r) {
          return (
            r <= 0
              ? (e = t = n = NaN)
              : n <= 0 || n >= 1
                ? (e = t = NaN)
                : t <= 0 && (e = NaN),
            new tT(e, t, n, r)
          );
        }
        function tA(e) {
          if (e instanceof tT) return new tT(e.h, e.s, e.l, e.opacity);
          if ((e instanceof tr || (e = ty(e)), !e)) return new tT();
          if (e instanceof tT) return e;
          var t = (e = e.rgb()).r / 255,
            n = e.g / 255,
            r = e.b / 255,
            i = Math.min(t, n, r),
            a = Math.max(t, n, r),
            s = NaN,
            o = a - i,
            l = (a + i) / 2;
          return (
            o
              ? ((s =
                  t === a
                    ? (n - r) / o + (n < r) * 6
                    : n === a
                      ? (r - t) / o + 2
                      : (t - n) / o + 4),
                (o /= l < 0.5 ? a + i : 2 - a - i),
                (s *= 60))
              : (o = l > 0 && l < 1 ? 0 : s),
            new tT(s, o, l, e.opacity)
          );
        }
        function tT(e, t, n, r) {
          ((this.h = +e), (this.s = +t), (this.l = +n), (this.opacity = +r));
        }
        function tO(e) {
          return (e = (e || 0) % 360) < 0 ? e + 360 : e;
        }
        function tj(e) {
          return Math.max(0, Math.min(1, e || 0));
        }
        function tI(e, t, n) {
          return (
            (e < 60
              ? t + ((n - t) * e) / 60
              : e < 180
                ? n
                : e < 240
                  ? t + ((n - t) * (240 - e)) / 60
                  : t) * 255
          );
        }
        function tM(e, t, n, r, i) {
          var a = e * e,
            s = a * e;
          return (
            ((1 - 3 * e + 3 * a - s) * t +
              (4 - 6 * a + 3 * s) * n +
              (1 + 3 * e + 3 * a - 3 * s) * r +
              s * i) /
            6
          );
        }
        (tt(tr, ty, {
          copy(e) {
            return Object.assign(new this.constructor(), this, e);
          },
          displayable() {
            return this.rgb().displayable();
          },
          hex: tm,
          formatHex: tm,
          formatHex8: function () {
            return this.rgb().formatHex8();
          },
          formatHsl: function () {
            return tA(this).formatHsl();
          },
          formatRgb: tg,
          toString: tg,
        }),
          tt(
            t_,
            tb,
            tn(tr, {
              brighter(e) {
                return (
                  (e =
                    null == e
                      ? 1.4285714285714286
                      : Math.pow(1.4285714285714286, e)),
                  new t_(this.r * e, this.g * e, this.b * e, this.opacity)
                );
              },
              darker(e) {
                return (
                  (e = null == e ? 0.7 : Math.pow(0.7, e)),
                  new t_(this.r * e, this.g * e, this.b * e, this.opacity)
                );
              },
              rgb() {
                return this;
              },
              clamp() {
                return new t_(
                  tS(this.r),
                  tS(this.g),
                  tS(this.b),
                  tN(this.opacity),
                );
              },
              displayable() {
                return (
                  -0.5 <= this.r &&
                  this.r < 255.5 &&
                  -0.5 <= this.g &&
                  this.g < 255.5 &&
                  -0.5 <= this.b &&
                  this.b < 255.5 &&
                  0 <= this.opacity &&
                  this.opacity <= 1
                );
              },
              hex: tw,
              formatHex: tw,
              formatHex8: function () {
                return `#${tC(this.r)}${tC(this.g)}${tC(this.b)}${tC((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
              },
              formatRgb: tE,
              toString: tE,
            }),
          ),
          tt(
            tT,
            function (e, t, n, r) {
              return 1 == arguments.length
                ? tA(e)
                : new tT(e, t, n, null == r ? 1 : r);
            },
            tn(tr, {
              brighter(e) {
                return (
                  (e =
                    null == e
                      ? 1.4285714285714286
                      : Math.pow(1.4285714285714286, e)),
                  new tT(this.h, this.s, this.l * e, this.opacity)
                );
              },
              darker(e) {
                return (
                  (e = null == e ? 0.7 : Math.pow(0.7, e)),
                  new tT(this.h, this.s, this.l * e, this.opacity)
                );
              },
              rgb() {
                var e = (this.h % 360) + (this.h < 0) * 360,
                  t = isNaN(e) || isNaN(this.s) ? 0 : this.s,
                  n = this.l,
                  r = n + (n < 0.5 ? n : 1 - n) * t,
                  i = 2 * n - r;
                return new t_(
                  tI(e >= 240 ? e - 240 : e + 120, i, r),
                  tI(e, i, r),
                  tI(e < 120 ? e + 240 : e - 120, i, r),
                  this.opacity,
                );
              },
              clamp() {
                return new tT(
                  tO(this.h),
                  tj(this.s),
                  tj(this.l),
                  tN(this.opacity),
                );
              },
              displayable() {
                return (
                  ((0 <= this.s && this.s <= 1) || isNaN(this.s)) &&
                  0 <= this.l &&
                  this.l <= 1 &&
                  0 <= this.opacity &&
                  this.opacity <= 1
                );
              },
              formatHsl() {
                let e = tN(this.opacity);
                return `${1 === e ? "hsl(" : "hsla("}${tO(this.h)}, ${100 * tj(this.s)}%, ${100 * tj(this.l)}%${1 === e ? ")" : `, ${e})`}`;
              },
            }),
          ));
        let tR = (e) => () => e;
        function tD(e, t) {
          var n = t - e;
          return n
            ? function (t) {
                return e + t * n;
              }
            : tR(isNaN(e) ? t : e);
        }
        let tP = (function e(t) {
          var n,
            r =
              1 == (n = +(n = t))
                ? tD
                : function (e, t) {
                    var r, i, a;
                    return t - e
                      ? ((r = e),
                        (i = t),
                        (r = Math.pow(r, (a = n))),
                        (i = Math.pow(i, a) - r),
                        (a = 1 / a),
                        function (e) {
                          return Math.pow(r + e * i, a);
                        })
                      : tR(isNaN(e) ? t : e);
                  };
          function i(e, t) {
            var n = r((e = tb(e)).r, (t = tb(t)).r),
              i = r(e.g, t.g),
              a = r(e.b, t.b),
              s = tD(e.opacity, t.opacity);
            return function (t) {
              return (
                (e.r = n(t)),
                (e.g = i(t)),
                (e.b = a(t)),
                (e.opacity = s(t)),
                e + ""
              );
            };
          }
          return ((i.gamma = e), i);
        })(1);
        function t$(e) {
          return function (t) {
            var n,
              r,
              i = t.length,
              a = Array(i),
              s = Array(i),
              o = Array(i);
            for (n = 0; n < i; ++n)
              ((r = tb(t[n])),
                (a[n] = r.r || 0),
                (s[n] = r.g || 0),
                (o[n] = r.b || 0));
            return (
              (a = e(a)),
              (s = e(s)),
              (o = e(o)),
              (r.opacity = 1),
              function (e) {
                return ((r.r = a(e)), (r.g = s(e)), (r.b = o(e)), r + "");
              }
            );
          };
        }
        (t$(function (e) {
          var t = e.length - 1;
          return function (n) {
            var r =
                n <= 0
                  ? (n = 0)
                  : n >= 1
                    ? ((n = 1), t - 1)
                    : Math.floor(n * t),
              i = e[r],
              a = e[r + 1],
              s = r > 0 ? e[r - 1] : 2 * i - a,
              o = r < t - 1 ? e[r + 2] : 2 * a - i;
            return tM((n - r / t) * t, s, i, a, o);
          };
        }),
          t$(function (e) {
            var t = e.length;
            return function (n) {
              var r = Math.floor(((n %= 1) < 0 ? ++n : n) * t),
                i = e[(r + t - 1) % t],
                a = e[r % t],
                s = e[(r + 1) % t],
                o = e[(r + 2) % t];
              return tM((n - r / t) * t, i, a, s, o);
            };
          }));
        var tL = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g,
          tB = RegExp(tL.source, "g");
        function tF(e, t) {
          var n;
          return (
            "number" == typeof t
              ? e5
              : t instanceof ty
                ? tP
                : (n = ty(t))
                  ? ((t = n), tP)
                  : function (e, t) {
                      var n,
                        r,
                        i,
                        a,
                        s,
                        o = (tL.lastIndex = tB.lastIndex = 0),
                        l = -1,
                        d = [],
                        u = [];
                      for (
                        e += "", t += "";
                        (i = tL.exec(e)) && (a = tB.exec(t));
                      )
                        ((s = a.index) > o &&
                          ((s = t.slice(o, s)),
                          d[l] ? (d[l] += s) : (d[++l] = s)),
                          (i = i[0]) === (a = a[0])
                            ? d[l]
                              ? (d[l] += a)
                              : (d[++l] = a)
                            : ((d[++l] = null), u.push({ i: l, x: e5(i, a) })),
                          (o = tB.lastIndex));
                      return (
                        o < t.length &&
                          ((s = t.slice(o)), d[l] ? (d[l] += s) : (d[++l] = s)),
                        d.length < 2
                          ? u[0]
                            ? ((n = u[0].x),
                              function (e) {
                                return n(e) + "";
                              })
                            : ((r = t),
                              function () {
                                return r;
                              })
                          : ((t = u.length),
                            function (e) {
                              for (var n, r = 0; r < t; ++r)
                                d[(n = u[r]).i] = n.x(e);
                              return d.join("");
                            })
                      );
                    }
          )(e, t);
        }
        var tz = eA.prototype.constructor;
        function tV(e) {
          return function () {
            this.style.removeProperty(e);
          };
        }
        var tH = 0;
        function tZ(e, t, n, r) {
          ((this._groups = e),
            (this._parents = t),
            (this._name = n),
            (this._id = r));
        }
        var tU = eA.prototype;
        tZ.prototype = function (e) {
          return eA().transition(e);
        }.prototype = {
          constructor: tZ,
          select: function (e) {
            var t = this._name,
              n = this._id;
            "function" != typeof e && (e = H(e));
            for (
              var r = this._groups, i = r.length, a = Array(i), s = 0;
              s < i;
              ++s
            )
              for (
                var o, l, d = r[s], u = d.length, c = (a[s] = Array(u)), h = 0;
                h < u;
                ++h
              )
                (o = d[h]) &&
                  (l = e.call(o, o.__data__, h, d)) &&
                  ("__data__" in o && (l.__data__ = o.__data__),
                  (c[h] = l),
                  eJ(c[h], t, n, h, c, e2(o, n)));
            return new tZ(a, this._parents, t, n);
          },
          selectAll: function (e) {
            var t = this._name,
              n = this._id;
            "function" != typeof e && (e = U(e));
            for (
              var r = this._groups, i = r.length, a = [], s = [], o = 0;
              o < i;
              ++o
            )
              for (var l, d = r[o], u = d.length, c = 0; c < u; ++c)
                if ((l = d[c])) {
                  for (
                    var h,
                      p = e.call(l, l.__data__, c, d),
                      f = e2(l, n),
                      m = 0,
                      g = p.length;
                    m < g;
                    ++m
                  )
                    (h = p[m]) && eJ(h, t, n, m, p, f);
                  (a.push(p), s.push(l));
                }
            return new tZ(a, s, t, n);
          },
          selectChild: tU.selectChild,
          selectChildren: tU.selectChildren,
          filter: function (e) {
            "function" != typeof e && (e = G(e));
            for (
              var t = this._groups, n = t.length, r = Array(n), i = 0;
              i < n;
              ++i
            )
              for (
                var a, s = t[i], o = s.length, l = (r[i] = []), d = 0;
                d < o;
                ++d
              )
                (a = s[d]) && e.call(a, a.__data__, d, s) && l.push(a);
            return new tZ(r, this._parents, this._name, this._id);
          },
          merge: function (e) {
            if (e._id !== this._id) throw Error();
            for (
              var t = this._groups,
                n = e._groups,
                r = t.length,
                i = n.length,
                a = Math.min(r, i),
                s = Array(r),
                o = 0;
              o < a;
              ++o
            )
              for (
                var l,
                  d = t[o],
                  u = n[o],
                  c = d.length,
                  h = (s[o] = Array(c)),
                  p = 0;
                p < c;
                ++p
              )
                (l = d[p] || u[p]) && (h[p] = l);
            for (; o < r; ++o) s[o] = t[o];
            return new tZ(s, this._parents, this._name, this._id);
          },
          selection: function () {
            return new tz(this._groups, this._parents);
          },
          transition: function () {
            for (
              var e = this._name,
                t = this._id,
                n = ++tH,
                r = this._groups,
                i = r.length,
                a = 0;
              a < i;
              ++a
            )
              for (var s, o = r[a], l = o.length, d = 0; d < l; ++d)
                if ((s = o[d])) {
                  var u = e2(s, t);
                  eJ(s, e, n, d, o, {
                    time: u.time + u.delay + u.duration,
                    delay: 0,
                    duration: u.duration,
                    ease: u.ease,
                  });
                }
            return new tZ(r, this._parents, e, n);
          },
          call: tU.call,
          nodes: tU.nodes,
          node: tU.node,
          size: tU.size,
          empty: tU.empty,
          each: tU.each,
          on: function (e, t) {
            var n,
              r,
              i,
              a = this._id;
            return arguments.length < 2
              ? e2(this.node(), a).on.on(e)
              : this.each(
                  ((i = (e + "")
                    .trim()
                    .split(/^|\s+/)
                    .every(function (e) {
                      var t = e.indexOf(".");
                      return (
                        t >= 0 && (e = e.slice(0, t)),
                        !e || "start" === e
                      );
                    })
                    ? e0
                    : e1),
                  function () {
                    var s = i(this, a),
                      o = s.on;
                    (o !== n && (r = (n = o).copy()).on(e, t), (s.on = r));
                  }),
                );
          },
          attr: function (e, t) {
            var n = es(e),
              r = "transform" === n ? e8 : tF;
            return this.attrTween(
              e,
              "function" == typeof t
                ? (n.local
                    ? function (e, t, n) {
                        var r, i, a;
                        return function () {
                          var s,
                            o,
                            l = n(this);
                          return null == l
                            ? void this.removeAttributeNS(e.space, e.local)
                            : (s = this.getAttributeNS(e.space, e.local)) ===
                                (o = l + "")
                              ? null
                              : s === r && o === i
                                ? a
                                : ((i = o), (a = t((r = s), l)));
                        };
                      }
                    : function (e, t, n) {
                        var r, i, a;
                        return function () {
                          var s,
                            o,
                            l = n(this);
                          return null == l
                            ? void this.removeAttribute(e)
                            : (s = this.getAttribute(e)) === (o = l + "")
                              ? null
                              : s === r && o === i
                                ? a
                                : ((i = o), (a = t((r = s), l)));
                        };
                      })(n, r, te(this, "attr." + e, t))
                : null == t
                  ? (n.local
                      ? function (e) {
                          return function () {
                            this.removeAttributeNS(e.space, e.local);
                          };
                        }
                      : function (e) {
                          return function () {
                            this.removeAttribute(e);
                          };
                        })(n)
                  : (n.local
                      ? function (e, t, n) {
                          var r,
                            i,
                            a = n + "";
                          return function () {
                            var s = this.getAttributeNS(e.space, e.local);
                            return s === a
                              ? null
                              : s === r
                                ? i
                                : (i = t((r = s), n));
                          };
                        }
                      : function (e, t, n) {
                          var r,
                            i,
                            a = n + "";
                          return function () {
                            var s = this.getAttribute(e);
                            return s === a
                              ? null
                              : s === r
                                ? i
                                : (i = t((r = s), n));
                          };
                        })(n, r, t),
            );
          },
          attrTween: function (e, t) {
            var n = "attr." + e;
            if (arguments.length < 2) return (n = this.tween(n)) && n._value;
            if (null == t) return this.tween(n, null);
            if ("function" != typeof t) throw Error();
            var r = es(e);
            return this.tween(
              n,
              (r.local
                ? function (e, t) {
                    var n, r;
                    function i() {
                      var i = t.apply(this, arguments);
                      return (
                        i !== r &&
                          (n =
                            (r = i) &&
                            function (t) {
                              this.setAttributeNS(
                                e.space,
                                e.local,
                                i.call(this, t),
                              );
                            }),
                        n
                      );
                    }
                    return ((i._value = t), i);
                  }
                : function (e, t) {
                    var n, r;
                    function i() {
                      var i = t.apply(this, arguments);
                      return (
                        i !== r &&
                          (n =
                            (r = i) &&
                            function (t) {
                              this.setAttribute(e, i.call(this, t));
                            }),
                        n
                      );
                    }
                    return ((i._value = t), i);
                  })(r, t),
            );
          },
          style: function (e, t, n) {
            var r,
              i,
              a,
              s,
              o,
              l,
              d,
              u,
              c,
              h,
              p,
              f,
              m,
              g,
              y,
              v,
              x,
              b,
              _,
              w,
              E,
              N = "transform" == (e += "") ? e7 : tF;
            return null == t
              ? this.styleTween(
                  e,
                  ((r = e),
                  function () {
                    var e = el(this, r),
                      t = (this.style.removeProperty(r), el(this, r));
                    return e === t
                      ? null
                      : e === i && t === a
                        ? s
                        : (s = N((i = e), (a = t)));
                  }),
                ).on("end.style." + e, tV(e))
              : "function" == typeof t
                ? this.styleTween(
                    e,
                    ((o = e),
                    (l = te(this, "style." + e, t)),
                    function () {
                      var e = el(this, o),
                        t = l(this),
                        n = t + "";
                      return (
                        null == t &&
                          (this.style.removeProperty(o), (n = t = el(this, o))),
                        e === n
                          ? null
                          : e === d && n === u
                            ? c
                            : ((u = n), (c = N((d = e), t)))
                      );
                    }),
                  ).each(
                    ((h = this._id),
                    (x = "end." + (v = "style." + (p = e))),
                    function () {
                      var e = e1(this, h),
                        t = e.on,
                        n = null == e.value[v] ? y || (y = tV(p)) : void 0;
                      ((t !== f || g !== n) &&
                        (m = (f = t).copy()).on(x, (g = n)),
                        (e.on = m));
                    }),
                  )
                : this.styleTween(
                    e,
                    ((b = e),
                    (E = t + ""),
                    function () {
                      var e = el(this, b);
                      return e === E ? null : e === _ ? w : (w = N((_ = e), t));
                    }),
                    n,
                  ).on("end.style." + e, null);
          },
          styleTween: function (e, t, n) {
            var r = "style." + (e += "");
            if (arguments.length < 2) return (r = this.tween(r)) && r._value;
            if (null == t) return this.tween(r, null);
            if ("function" != typeof t) throw Error();
            return this.tween(
              r,
              (function (e, t, n) {
                var r, i;
                function a() {
                  var a = t.apply(this, arguments);
                  return (
                    a !== i &&
                      (r =
                        (i = a) &&
                        function (t) {
                          this.style.setProperty(e, a.call(this, t), n);
                        }),
                    r
                  );
                }
                return ((a._value = t), a);
              })(e, t, null == n ? "" : n),
            );
          },
          text: function (e) {
            var t, n;
            return this.tween(
              "text",
              "function" == typeof e
                ? ((t = te(this, "text", e)),
                  function () {
                    var e = t(this);
                    this.textContent = null == e ? "" : e;
                  })
                : ((n = null == e ? "" : e + ""),
                  function () {
                    this.textContent = n;
                  }),
            );
          },
          textTween: function (e) {
            var t = "text";
            if (arguments.length < 1) return (t = this.tween(t)) && t._value;
            if (null == e) return this.tween(t, null);
            if ("function" != typeof e) throw Error();
            return this.tween(
              t,
              (function (e) {
                var t, n;
                function r() {
                  var r = e.apply(this, arguments);
                  return (
                    r !== n &&
                      (t =
                        (n = r) &&
                        function (e) {
                          this.textContent = r.call(this, e);
                        }),
                    t
                  );
                }
                return ((r._value = e), r);
              })(e),
            );
          },
          remove: function () {
            var e;
            return this.on(
              "end.remove",
              ((e = this._id),
              function () {
                var t = this.parentNode;
                for (var n in this.__transition) if (+n !== e) return;
                t && t.removeChild(this);
              }),
            );
          },
          tween: function (e, t) {
            var n = this._id;
            if (((e += ""), arguments.length < 2)) {
              for (
                var r, i = e2(this.node(), n).tween, a = 0, s = i.length;
                a < s;
                ++a
              )
                if ((r = i[a]).name === e) return r.value;
              return null;
            }
            return this.each(
              (null == t
                ? function (e, t) {
                    var n, r;
                    return function () {
                      var i = e1(this, e),
                        a = i.tween;
                      if (a !== n) {
                        r = n = a;
                        for (var s = 0, o = r.length; s < o; ++s)
                          if (r[s].name === t) {
                            (r = r.slice()).splice(s, 1);
                            break;
                          }
                      }
                      i.tween = r;
                    };
                  }
                : function (e, t, n) {
                    var r, i;
                    if ("function" != typeof n) throw Error();
                    return function () {
                      var a = e1(this, e),
                        s = a.tween;
                      if (s !== r) {
                        i = (r = s).slice();
                        for (
                          var o = { name: t, value: n }, l = 0, d = i.length;
                          l < d;
                          ++l
                        )
                          if (i[l].name === t) {
                            i[l] = o;
                            break;
                          }
                        l === d && i.push(o);
                      }
                      a.tween = i;
                    };
                  })(n, e, t),
            );
          },
          delay: function (e) {
            var t = this._id;
            return arguments.length
              ? this.each(
                  ("function" == typeof e
                    ? function (e, t) {
                        return function () {
                          e0(this, e).delay = +t.apply(this, arguments);
                        };
                      }
                    : function (e, t) {
                        return (
                          (t = +t),
                          function () {
                            e0(this, e).delay = t;
                          }
                        );
                      })(t, e),
                )
              : e2(this.node(), t).delay;
          },
          duration: function (e) {
            var t = this._id;
            return arguments.length
              ? this.each(
                  ("function" == typeof e
                    ? function (e, t) {
                        return function () {
                          e1(this, e).duration = +t.apply(this, arguments);
                        };
                      }
                    : function (e, t) {
                        return (
                          (t = +t),
                          function () {
                            e1(this, e).duration = t;
                          }
                        );
                      })(t, e),
                )
              : e2(this.node(), t).duration;
          },
          ease: function (e) {
            var t = this._id;
            return arguments.length
              ? this.each(
                  (function (e, t) {
                    if ("function" != typeof t) throw Error();
                    return function () {
                      e1(this, e).ease = t;
                    };
                  })(t, e),
                )
              : e2(this.node(), t).ease;
          },
          easeVarying: function (e) {
            var t;
            if ("function" != typeof e) throw Error();
            return this.each(
              ((t = this._id),
              function () {
                var n = e.apply(this, arguments);
                if ("function" != typeof n) throw Error();
                e1(this, t).ease = n;
              }),
            );
          },
          end: function () {
            var e,
              t,
              n = this,
              r = n._id,
              i = n.size();
            return new Promise(function (a, s) {
              var o = { value: s },
                l = {
                  value: function () {
                    0 == --i && a();
                  },
                };
              (n.each(function () {
                var n = e1(this, r),
                  i = n.on;
                (i !== e &&
                  ((t = (e = i).copy())._.cancel.push(o),
                  t._.interrupt.push(o),
                  t._.end.push(l)),
                  (n.on = t));
              }),
                0 === i && a());
            });
          },
          [Symbol.iterator]: tU[Symbol.iterator],
        };
        var tG = {
          time: null,
          delay: 0,
          duration: 250,
          ease: function (e) {
            return ((e *= 2) <= 1 ? e * e * e : (e -= 2) * e * e + 2) / 2;
          },
        };
        function tq(e, t, n) {
          ((this.k = e), (this.x = t), (this.y = n));
        }
        ((eA.prototype.interrupt = function (e) {
          return this.each(function () {
            !(function (e, t) {
              var n,
                r,
                i,
                a = e.__transition,
                s = !0;
              if (a) {
                for (i in ((t = null == t ? null : t + ""), a)) {
                  if ((n = a[i]).name !== t) {
                    s = !1;
                    continue;
                  }
                  ((r = n.state > 2 && n.state < 5),
                    (n.state = 6),
                    n.timer.stop(),
                    n.on.call(
                      r ? "interrupt" : "cancel",
                      e,
                      e.__data__,
                      n.index,
                      n.group,
                    ),
                    delete a[i]);
                }
                s && delete e.__transition;
              }
            })(this, e);
          });
        }),
          (eA.prototype.transition = function (e) {
            var t, n;
            e instanceof tZ
              ? ((t = e._id), (e = e._name))
              : ((t = ++tH),
                ((n = tG).time = eH()),
                (e = null == e ? null : e + ""));
            for (var r = this._groups, i = r.length, a = 0; a < i; ++a)
              for (var s, o = r[a], l = o.length, d = 0; d < l; ++d)
                (s = o[d]) &&
                  eJ(
                    s,
                    e,
                    t,
                    d,
                    o,
                    n ||
                      (function (e, t) {
                        for (var n; !(n = e.__transition) || !(n = n[t]);)
                          if (!(e = e.parentNode))
                            throw Error(`transition ${t} not found`);
                        return n;
                      })(s, t),
                  );
            return new tZ(r, this._parents, e, t);
          }),
          (tq.prototype = {
            constructor: tq,
            scale: function (e) {
              return 1 === e ? this : new tq(this.k * e, this.x, this.y);
            },
            translate: function (e, t) {
              return (0 === e) & (0 === t)
                ? this
                : new tq(this.k, this.x + this.k * e, this.y + this.k * t);
            },
            apply: function (e) {
              return [e[0] * this.k + this.x, e[1] * this.k + this.y];
            },
            applyX: function (e) {
              return e * this.k + this.x;
            },
            applyY: function (e) {
              return e * this.k + this.y;
            },
            invert: function (e) {
              return [(e[0] - this.x) / this.k, (e[1] - this.y) / this.k];
            },
            invertX: function (e) {
              return (e - this.x) / this.k;
            },
            invertY: function (e) {
              return (e - this.y) / this.k;
            },
            rescaleX: function (e) {
              return e
                .copy()
                .domain(e.range().map(this.invertX, this).map(e.invert, e));
            },
            rescaleY: function (e) {
              return e
                .copy()
                .domain(e.range().map(this.invertY, this).map(e.invert, e));
            },
            toString: function () {
              return (
                "translate(" + this.x + "," + this.y + ") scale(" + this.k + ")"
              );
            },
          }),
          new tq(1, 0, 0),
          tq.prototype);
        let tW = {
            error001: (e = "react") =>
              `Seems like you have not used ${"svelte" === e ? "SvelteFlowProvider" : "ReactFlowProvider"} as an ancestor. Help: https://${e}flow.dev/error#001`,
            error003: (e) =>
              `Node type "${e}" not found. Using fallback type "default".`,
            error005: () => "Only child nodes can use a parent extent.",
            error006: () =>
              "Can't create edge. An edge needs a source and a target.",
            error009: (e) => `Marker type "${e}" doesn't exist.`,
            error008: (e, { id: t, sourceHandle: n, targetHandle: r }) =>
              `Couldn't create edge for ${e} handle id: "${"source" === e ? n : r}", edge id: ${t}.`,
            error010: () =>
              "Handle: No node id found. Make sure to only use a Handle inside a custom Node.",
            error011: (e) =>
              `Edge type "${e}" not found. Using fallback type "default".`,
            error012: (e) =>
              `Node with id "${e}" does not exist, it may have been removed. This can happen when a node is deleted before the "onNodeClick" handler is called.`,
            error014: () =>
              "useNodeConnections: No node ID found. Call useNodeConnections inside a custom Node or provide a node ID.",
            error015: () =>
              "It seems that you are trying to drag a node that is not initialized. Please use onNodesChange as explained in the docs.",
          },
          tY = [
            [Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY],
            [Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY],
          ],
          tK = ["Enter", " ", "Escape"],
          tX = {
            "node.a11yDescription.default":
              "Press enter or space to select a node. Press delete to remove it and escape to cancel.",
            "node.a11yDescription.keyboardDisabled":
              "Press enter or space to select a node. You can then use the arrow keys to move the node around. Press delete to remove it and escape to cancel.",
            "node.a11yDescription.ariaLiveMessage": ({
              direction: e,
              x: t,
              y: n,
            }) => `Moved selected node ${e}. New position, x: ${t}, y: ${n}`,
            "edge.a11yDescription.default":
              "Press enter or space to select an edge. You can then press delete to remove it or escape to cancel.",
            "controls.ariaLabel": "Control Panel",
            "controls.zoomIn.ariaLabel": "Zoom In",
            "controls.zoomOut.ariaLabel": "Zoom Out",
            "controls.fitView.ariaLabel": "Fit View",
            "controls.interactive.ariaLabel": "Toggle Interactivity",
            "minimap.ariaLabel": "Mini Map",
            "handle.ariaLabel": "Handle",
          };
        ((function (e) {
          ((e.Strict = "strict"), (e.Loose = "loose"));
        })(o || (o = {})),
          (function (e) {
            ((e.Free = "free"),
              (e.Vertical = "vertical"),
              (e.Horizontal = "horizontal"));
          })(l || (l = {})),
          (function (e) {
            ((e.Partial = "partial"), (e.Full = "full"));
          })(d || (d = {})));
        let tQ = {
          inProgress: !1,
          isValid: null,
          from: null,
          fromHandle: null,
          fromPosition: null,
          fromNode: null,
          to: null,
          toHandle: null,
          toPosition: null,
          toNode: null,
          pointer: null,
        };
        ((function (e) {
          ((e.Bezier = "default"),
            (e.Straight = "straight"),
            (e.Step = "step"),
            (e.SmoothStep = "smoothstep"),
            (e.SimpleBezier = "simplebezier"));
        })(u || (u = {})),
          (function (e) {
            ((e.Arrow = "arrow"), (e.ArrowClosed = "arrowclosed"));
          })(c || (c = {})),
          (function (e) {
            ((e.Left = "left"),
              (e.Top = "top"),
              (e.Right = "right"),
              (e.Bottom = "bottom"));
          })(h || (h = {})));
        let tJ = {
          [h.Left]: h.Right,
          [h.Right]: h.Left,
          [h.Top]: h.Bottom,
          [h.Bottom]: h.Top,
        };
        function t0(e) {
          return null === e ? null : e ? "valid" : "invalid";
        }
        let t1 = (e) => "id" in e && "source" in e && "target" in e,
          t2 = (e) =>
            "id" in e &&
            "position" in e &&
            !("source" in e) &&
            !("target" in e),
          t5 = (e) =>
            "id" in e &&
            "internals" in e &&
            !("source" in e) &&
            !("target" in e),
          t4 = (e, t = [0, 0]) => {
            let { width: n, height: r } = nN(e),
              i = e.origin ?? t,
              a = n * i[0],
              s = r * i[1];
            return { x: e.position.x - a, y: e.position.y - s };
          },
          t3 = (e, t = { nodeOrigin: [0, 0] }) =>
            0 === e.length
              ? { x: 0, y: 0, width: 0, height: 0 }
              : nl(
                  e.reduce(
                    (e, n) => {
                      let r = "string" == typeof n,
                        i = t.nodeLookup || r ? void 0 : n;
                      return (
                        t.nodeLookup &&
                          (i = r
                            ? t.nodeLookup.get(n)
                            : t5(n)
                              ? n
                              : t.nodeLookup.get(n.id)),
                        ns(
                          e,
                          i
                            ? nu(i, t.nodeOrigin)
                            : { x: 0, y: 0, x2: 0, y2: 0 },
                        )
                      );
                    },
                    { x: 1 / 0, y: 1 / 0, x2: -1 / 0, y2: -1 / 0 },
                  ),
                ),
          t6 = (e, t = {}) => {
            let n = { x: 1 / 0, y: 1 / 0, x2: -1 / 0, y2: -1 / 0 },
              r = !1;
            return (
              e.forEach((e) => {
                (void 0 === t.filter || t.filter(e)) &&
                  ((n = ns(n, nu(e))), (r = !0));
              }),
              r ? nl(n) : { x: 0, y: 0, width: 0, height: 0 }
            );
          },
          t9 = (e, t, [n, r, i] = [0, 0, 1], a = !1, s = !1) => {
            let o = (t.x - n) / i,
              l = (t.y - r) / i,
              d = t.width / i,
              u = t.height / i,
              c = [];
            for (let t of e.values()) {
              let { measured: e, selectable: n = !0, hidden: r = !1 } = t;
              if ((s && !n) || r) continue;
              let i = e.width ?? t.width ?? t.initialWidth ?? 0,
                h = e.height ?? t.height ?? t.initialHeight ?? 0,
                { x: p, y: f } = t.internals.positionAbsolute,
                m = nh(o, l, d, u, p, f, i, h),
                g = i * h,
                y = a && m > 0;
              (!t.internals.handleBounds || y || m >= g || t.dragging) &&
                c.push(t);
            }
            return c;
          },
          t7 = (e, t) => {
            let n = new Set();
            return (
              e.forEach((e) => {
                n.add(e.id);
              }),
              t.filter((e) => n.has(e.source) || n.has(e.target))
            );
          };
        async function t8(
          { nodes: e, width: t, height: n, panZoom: r, minZoom: i, maxZoom: a },
          s,
        ) {
          if (0 === e.size) return !0;
          let o = n_(
            t6(
              (function (e, t) {
                let n = new Map(),
                  r = t?.nodes ? new Set(t.nodes.map((e) => e.id)) : null;
                return (
                  e.forEach((e) => {
                    e.measured.width &&
                      e.measured.height &&
                      (t?.includeHiddenNodes || !e.hidden) &&
                      (!r || r.has(e.id)) &&
                      n.set(e.id, e);
                  }),
                  n
                );
              })(e, s),
            ),
            t,
            n,
            s?.minZoom ?? i,
            s?.maxZoom ?? a,
            s?.padding ?? 0.1,
          );
          return (
            await r.setViewport(o, {
              duration: s?.duration,
              ease: s?.ease,
              interpolate: s?.interpolate,
            }),
            !0
          );
        }
        async function ne({
          nodesToRemove: e = [],
          edgesToRemove: t = [],
          nodes: n,
          edges: r,
          onBeforeDelete: i,
        }) {
          let a = new Set(e.map((e) => e.id)),
            s = [];
          for (let e of n) {
            if (!1 === e.deletable) continue;
            let t = a.has(e.id),
              n = !t && e.parentId && s.find((t) => t.id === e.parentId);
            (t || n) && s.push(e);
          }
          let o = new Set(t.map((e) => e.id)),
            l = r.filter((e) => !1 !== e.deletable),
            d = t7(s, l);
          for (let e of l)
            o.has(e.id) && !d.find((t) => t.id === e.id) && d.push(e);
          if (!i) return { edges: d, nodes: s };
          let u = await i({ nodes: s, edges: d });
          return "boolean" == typeof u
            ? u
              ? { edges: d, nodes: s }
              : { edges: [], nodes: [] }
            : u;
        }
        let nt = (e, t = 0, n = 1) => Math.min(Math.max(e, t), n),
          nn = (e = { x: 0, y: 0 }, t, n) => ({
            x: nt(e.x, t[0][0], t[1][0] - (n?.width ?? 0)),
            y: nt(e.y, t[0][1], t[1][1] - (n?.height ?? 0)),
          });
        function nr(e, t, n) {
          let { width: r, height: i } = nN(n),
            { x: a, y: s } = n.internals.positionAbsolute;
          return nn(
            e,
            [
              [a, s],
              [a + r, s + i],
            ],
            t,
          );
        }
        let ni = (e, t, n) =>
            e < t
              ? nt(Math.abs(e - t), 1, t) / t
              : e > n
                ? -nt(Math.abs(e - n), 1, t) / t
                : 0,
          na = (e, t, n = 15, r = 40) => [
            ni(e.x, r, t.width - r) * n,
            ni(e.y, r, t.height - r) * n,
          ],
          ns = (e, t) => ({
            x: Math.min(e.x, t.x),
            y: Math.min(e.y, t.y),
            x2: Math.max(e.x2, t.x2),
            y2: Math.max(e.y2, t.y2),
          }),
          no = ({ x: e, y: t, width: n, height: r }) => ({
            x: e,
            y: t,
            x2: e + n,
            y2: t + r,
          }),
          nl = ({ x: e, y: t, x2: n, y2: r }) => ({
            x: e,
            y: t,
            width: n - e,
            height: r - t,
          }),
          nd = (e, t = [0, 0]) => {
            let { x: n, y: r } = t5(e)
              ? e.internals.positionAbsolute
              : t4(e, t);
            return {
              x: n,
              y: r,
              width: e.measured?.width ?? e.width ?? e.initialWidth ?? 0,
              height: e.measured?.height ?? e.height ?? e.initialHeight ?? 0,
            };
          },
          nu = (e, t = [0, 0]) => {
            let { x: n, y: r } = t5(e)
              ? e.internals.positionAbsolute
              : t4(e, t);
            return {
              x: n,
              y: r,
              x2: n + (e.measured?.width ?? e.width ?? e.initialWidth ?? 0),
              y2: r + (e.measured?.height ?? e.height ?? e.initialHeight ?? 0),
            };
          },
          nc = (e, t) => nl(ns(no(e), no(t))),
          nh = (e, t, n, r, i, a, s, o) =>
            Math.ceil(
              Math.max(0, Math.min(e + n, i + s) - Math.max(e, i)) *
                Math.max(0, Math.min(t + r, a + o) - Math.max(t, a)),
            ),
          np = (e, t) =>
            nh(e.x, e.y, e.width, e.height, t.x, t.y, t.width, t.height),
          nf = (e) => nm(e.width) && nm(e.height) && nm(e.x) && nm(e.y),
          nm = (e) => !isNaN(e) && isFinite(e),
          ng = (e, t) => (e, t) => {},
          ny = (e, t = [1, 1]) => ({
            x: t[0] * Math.round(e.x / t[0]),
            y: t[1] * Math.round(e.y / t[1]),
          }),
          nv = ({ x: e, y: t }, [n, r, i], a = !1, s = [1, 1]) => {
            let o = { x: (e - n) / i, y: (t - r) / i };
            return a ? ny(o, s) : o;
          },
          nx = ({ x: e, y: t }, [n, r, i]) => ({ x: e * i + n, y: t * i + r });
        function nb(e, t) {
          if ("number" == typeof e) return Math.floor((t - t / (1 + e)) * 0.5);
          if ("string" == typeof e && e.endsWith("px")) {
            let t = parseFloat(e);
            if (!Number.isNaN(t)) return Math.floor(t);
          }
          if ("string" == typeof e && e.endsWith("%")) {
            let n = parseFloat(e);
            if (!Number.isNaN(n)) return Math.floor(t * n * 0.01);
          }
          return (
            console.error(
              `The padding value "${e}" is invalid. Please provide a number or a string with a valid unit (px or %).`,
            ),
            0
          );
        }
        let n_ = (e, t, n, r, i, a) => {
            let s = (function (e, t, n) {
                if ("string" == typeof e || "number" == typeof e) {
                  let r = nb(e, n),
                    i = nb(e, t);
                  return {
                    top: r,
                    right: i,
                    bottom: r,
                    left: i,
                    x: 2 * i,
                    y: 2 * r,
                  };
                }
                if ("object" == typeof e) {
                  let r = nb(e.top ?? e.y ?? 0, n),
                    i = nb(e.bottom ?? e.y ?? 0, n),
                    a = nb(e.left ?? e.x ?? 0, t),
                    s = nb(e.right ?? e.x ?? 0, t);
                  return {
                    top: r,
                    right: s,
                    bottom: i,
                    left: a,
                    x: a + s,
                    y: r + i,
                  };
                }
                return { top: 0, right: 0, bottom: 0, left: 0, x: 0, y: 0 };
              })(a, t, n),
              o = nt(Math.min((t - s.x) / e.width, (n - s.y) / e.height), r, i),
              l = e.x + e.width / 2,
              d = e.y + e.height / 2,
              u = t / 2 - l * o,
              c = n / 2 - d * o,
              h = (function (e, t, n, r, i, a) {
                let { x: s, y: o } = nx(e, [t, n, r]),
                  { x: l, y: d } = nx({ x: e.x + e.width, y: e.y + e.height }, [
                    t,
                    n,
                    r,
                  ]);
                return {
                  left: Math.floor(s),
                  top: Math.floor(o),
                  right: Math.floor(i - l),
                  bottom: Math.floor(a - d),
                };
              })(e, u, c, o, t, n),
              p = {
                left: Math.min(h.left - s.left, 0),
                top: Math.min(h.top - s.top, 0),
                right: Math.min(h.right - s.right, 0),
                bottom: Math.min(h.bottom - s.bottom, 0),
              };
            return {
              x: u - p.left + p.right,
              y: c - p.top + p.bottom,
              zoom: o,
            };
          },
          nw = () =>
            "undefined" != typeof navigator &&
            navigator?.userAgent?.indexOf("Mac") >= 0;
        function nE(e) {
          return null != e && "parent" !== e;
        }
        function nN(e) {
          return {
            width: e.measured?.width ?? e.width ?? e.initialWidth ?? 0,
            height: e.measured?.height ?? e.height ?? e.initialHeight ?? 0,
          };
        }
        function nS(e) {
          return (
            (e.measured?.width ?? e.width ?? e.initialWidth) !== void 0 &&
            (e.measured?.height ?? e.height ?? e.initialHeight) !== void 0
          );
        }
        function nC(e, t) {
          if (e.size !== t.size) return !1;
          for (let n of e) if (!t.has(n)) return !1;
          return !0;
        }
        let nk = (e) => ({ width: e.offsetWidth, height: e.offsetHeight }),
          nA = (e) => e?.getRootNode?.() || window?.document,
          nT = ["INPUT", "SELECT", "TEXTAREA"],
          nO = (e) => "clientX" in e,
          nj = (e, t) => {
            let n = nO(e),
              r = n ? e.clientX : e.touches?.[0].clientX,
              i = n ? e.clientY : e.touches?.[0].clientY;
            return { x: r - (t?.left ?? 0), y: i - (t?.top ?? 0) };
          },
          nI = (e, t, n, r, i) => {
            let a = t.querySelectorAll(`.${e}`);
            return a && a.length
              ? Array.from(a).map((t) => {
                  let a = t.getBoundingClientRect();
                  return {
                    id: t.getAttribute("data-handleid"),
                    type: e,
                    nodeId: i,
                    position: t.getAttribute("data-handlepos"),
                    x: (a.left - n.left) / r,
                    y: (a.top - n.top) / r,
                    ...nk(t),
                  };
                })
              : null;
          };
        function nM({
          sourceX: e,
          sourceY: t,
          targetX: n,
          targetY: r,
          sourceControlX: i,
          sourceControlY: a,
          targetControlX: s,
          targetControlY: o,
        }) {
          let l = 0.125 * e + 0.375 * i + 0.375 * s + 0.125 * n,
            d = 0.125 * t + 0.375 * a + 0.375 * o + 0.125 * r;
          return [l, d, Math.abs(l - e), Math.abs(d - t)];
        }
        function nR(e, t) {
          return e >= 0 ? 0.5 * e : 25 * t * Math.sqrt(-e);
        }
        function nD({ pos: e, x1: t, y1: n, x2: r, y2: i, c: a }) {
          switch (e) {
            case h.Left:
              return [t - nR(t - r, a), n];
            case h.Right:
              return [t + nR(r - t, a), n];
            case h.Top:
              return [t, n - nR(n - i, a)];
            case h.Bottom:
              return [t, n + nR(i - n, a)];
          }
        }
        function nP({
          sourceX: e,
          sourceY: t,
          sourcePosition: n = h.Bottom,
          targetX: r,
          targetY: i,
          targetPosition: a = h.Top,
          curvature: s = 0.25,
        }) {
          let [o, l] = nD({ pos: n, x1: e, y1: t, x2: r, y2: i, c: s }),
            [d, u] = nD({ pos: a, x1: r, y1: i, x2: e, y2: t, c: s }),
            [c, p, f, m] = nM({
              sourceX: e,
              sourceY: t,
              targetX: r,
              targetY: i,
              sourceControlX: o,
              sourceControlY: l,
              targetControlX: d,
              targetControlY: u,
            });
          return [`M${e},${t} C${o},${l} ${d},${u} ${r},${i}`, c, p, f, m];
        }
        function n$({ sourceX: e, sourceY: t, targetX: n, targetY: r }) {
          let i = Math.abs(n - e) / 2,
            a = Math.abs(r - t) / 2;
          return [n < e ? n + i : n - i, r < t ? r + a : r - a, i, a];
        }
        let nL = ({ source: e, sourceHandle: t, target: n, targetHandle: r }) =>
            `xy-edge__${e}${t || ""}-${n}${r || ""}`,
          nB = (e, t) =>
            t.some(
              (t) =>
                t.source === e.source &&
                t.target === e.target &&
                (t.sourceHandle === e.sourceHandle ||
                  (!t.sourceHandle && !e.sourceHandle)) &&
                (t.targetHandle === e.targetHandle ||
                  (!t.targetHandle && !e.targetHandle)),
            ),
          nF = (e, t, n = {}) => {
            let r;
            if (!e.source || !e.target)
              return (n.onError?.("006", tW.error006()), t);
            let i = n.getEdgeId || nL;
            return nB((r = t1(e) ? { ...e } : { ...e, id: i(e) }), t)
              ? t
              : (null === r.sourceHandle && delete r.sourceHandle,
                null === r.targetHandle && delete r.targetHandle,
                t.concat(r));
          };
        function nz({ sourceX: e, sourceY: t, targetX: n, targetY: r }) {
          let [i, a, s, o] = n$({
            sourceX: e,
            sourceY: t,
            targetX: n,
            targetY: r,
          });
          return [`M ${e},${t}L ${n},${r}`, i, a, s, o];
        }
        let nV = {
            [h.Left]: { x: -1, y: 0 },
            [h.Right]: { x: 1, y: 0 },
            [h.Top]: { x: 0, y: -1 },
            [h.Bottom]: { x: 0, y: 1 },
          },
          nH = ({ source: e, sourcePosition: t = h.Bottom, target: n }) =>
            t === h.Left || t === h.Right
              ? e.x < n.x
                ? { x: 1, y: 0 }
                : { x: -1, y: 0 }
              : e.y < n.y
                ? { x: 0, y: 1 }
                : { x: 0, y: -1 },
          nZ = (e, t) =>
            Math.sqrt(Math.pow(t.x - e.x, 2) + Math.pow(t.y - e.y, 2));
        function nU({
          sourceX: e,
          sourceY: t,
          sourcePosition: n = h.Bottom,
          targetX: r,
          targetY: i,
          targetPosition: a = h.Top,
          borderRadius: s = 5,
          centerX: o,
          centerY: l,
          offset: d = 20,
          stepPosition: u = 0.5,
        }) {
          let [c, p, f, m, g] = (function ({
              source: e,
              sourcePosition: t = h.Bottom,
              target: n,
              targetPosition: r = h.Top,
              center: i,
              offset: a,
              stepPosition: s,
            }) {
              let o, l;
              let d = nV[t],
                u = nV[r],
                c = { x: e.x + d.x * a, y: e.y + d.y * a },
                p = { x: n.x + u.x * a, y: n.y + u.y * a },
                f = nH({ source: c, sourcePosition: t, target: p }),
                m = 0 !== f.x ? "x" : "y",
                g = f[m],
                y = [],
                v = { x: 0, y: 0 },
                x = { x: 0, y: 0 },
                [, , b, _] = n$({
                  sourceX: e.x,
                  sourceY: e.y,
                  targetX: n.x,
                  targetY: n.y,
                });
              if (d[m] * u[m] == -1) {
                "x" === m
                  ? ((o = i.x ?? c.x + (p.x - c.x) * s),
                    (l = i.y ?? (c.y + p.y) / 2))
                  : ((o = i.x ?? (c.x + p.x) / 2),
                    (l = i.y ?? c.y + (p.y - c.y) * s));
                let e = [
                    { x: o, y: c.y },
                    { x: o, y: p.y },
                  ],
                  t = [
                    { x: c.x, y: l },
                    { x: p.x, y: l },
                  ];
                y = d[m] === g ? ("x" === m ? e : t) : "x" === m ? t : e;
              } else {
                let i = [{ x: c.x, y: p.y }],
                  s = [{ x: p.x, y: c.y }];
                if (
                  ((y = "x" === m ? (d.x === g ? s : i) : d.y === g ? i : s),
                  t === r)
                ) {
                  let t = Math.abs(e[m] - n[m]);
                  if (t <= a) {
                    let r = Math.min(a - 1, a - t);
                    d[m] === g
                      ? (v[m] = (c[m] > e[m] ? -1 : 1) * r)
                      : (x[m] = (p[m] > n[m] ? -1 : 1) * r);
                  }
                }
                if (t !== r) {
                  let e = "x" === m ? "y" : "x",
                    t = d[m] === u[e],
                    n = c[e] > p[e],
                    r = c[e] < p[e];
                  ((1 === d[m] && ((!t && n) || (t && r))) ||
                    (1 !== d[m] && ((!t && r) || (t && n)))) &&
                    (y = "x" === m ? i : s);
                }
                let h = { x: c.x + v.x, y: c.y + v.y },
                  f = { x: p.x + x.x, y: p.y + x.y };
                Math.max(Math.abs(h.x - y[0].x), Math.abs(f.x - y[0].x)) >=
                Math.max(Math.abs(h.y - y[0].y), Math.abs(f.y - y[0].y))
                  ? ((o = (h.x + f.x) / 2), (l = y[0].y))
                  : ((o = y[0].x), (l = (h.y + f.y) / 2));
              }
              let w = { x: c.x + v.x, y: c.y + v.y },
                E = { x: p.x + x.x, y: p.y + x.y };
              return [
                [
                  e,
                  ...(w.x !== y[0].x || w.y !== y[0].y ? [w] : []),
                  ...y,
                  ...(E.x !== y[y.length - 1].x || E.y !== y[y.length - 1].y
                    ? [E]
                    : []),
                  n,
                ],
                o,
                l,
                b,
                _,
              ];
            })({
              source: { x: e, y: t },
              sourcePosition: n,
              target: { x: r, y: i },
              targetPosition: a,
              center: { x: o, y: l },
              offset: d,
              stepPosition: u,
            }),
            y = `M${c[0].x} ${c[0].y}`;
          for (let e = 1; e < c.length - 1; e++)
            y += (function (e, t, n, r) {
              let i = Math.min(nZ(e, t) / 2, nZ(t, n) / 2, r),
                { x: a, y: s } = t;
              if ((e.x === a && a === n.x) || (e.y === s && s === n.y))
                return `L${a} ${s}`;
              if (e.y === s) {
                let t = e.x < n.x ? -1 : 1,
                  r = e.y < n.y ? 1 : -1;
                return `L ${a + i * t},${s}Q ${a},${s} ${a},${s + i * r}`;
              }
              let o = e.x < n.x ? 1 : -1,
                l = e.y < n.y ? -1 : 1;
              return `L ${a},${s + i * l}Q ${a},${s} ${a + i * o},${s}`;
            })(c[e - 1], c[e], c[e + 1], s);
          return [
            (y += `L${c[c.length - 1].x} ${c[c.length - 1].y}`),
            p,
            f,
            m,
            g,
          ];
        }
        function nG(e) {
          return (
            e &&
            !!(e.internals.handleBounds || e.handles?.length) &&
            !!(e.measured.width || e.width || e.initialWidth)
          );
        }
        function nq(e) {
          if (!e) return null;
          let t = [],
            n = [];
          for (let r of e)
            ((r.width = r.width ?? 1),
              (r.height = r.height ?? 1),
              "source" === r.type
                ? t.push(r)
                : "target" === r.type && n.push(r));
          return { source: t, target: n };
        }
        function nW(e, t, n = h.Left, r = !1) {
          let i = (t?.x ?? 0) + e.internals.positionAbsolute.x,
            a = (t?.y ?? 0) + e.internals.positionAbsolute.y,
            { width: s, height: o } = t ?? nN(e);
          if (r) return { x: i + s / 2, y: a + o / 2 };
          switch (t?.position ?? n) {
            case h.Top:
              return { x: i + s / 2, y: a };
            case h.Right:
              return { x: i + s, y: a + o / 2 };
            case h.Bottom:
              return { x: i + s / 2, y: a + o };
            case h.Left:
              return { x: i, y: a + o / 2 };
          }
        }
        function nY(e, t) {
          return (e && (t ? e.find((e) => e.id === t) : e[0])) || null;
        }
        function nK(e, t) {
          if (!e) return "";
          if ("string" == typeof e) return e;
          let n = t ? `${t}__` : "";
          return `${n}${Object.keys(e)
            .sort()
            .map((t) => `${t}=${e[t]}`)
            .join("&")}`;
        }
        let nX = {
            nodeOrigin: [0, 0],
            nodeExtent: tY,
            elevateNodesOnSelect: !0,
            zIndexMode: "basic",
            defaults: {},
          },
          nQ = { ...nX, checkEquality: !0 };
        function nJ(e, t) {
          let n = { ...e };
          for (let e in t) void 0 !== t[e] && (n[e] = t[e]);
          return n;
        }
        function n0(e) {
          return "manual" === e;
        }
        function n1(e, t, n, r = {}) {
          let i = nJ(nQ, r),
            a = { i: 0 },
            s = new Map(t),
            o = i?.elevateNodesOnSelect && !n0(i.zIndexMode) ? 1e3 : 0,
            l = e.length > 0,
            d = !1;
          for (let u of (t.clear(), n.clear(), e)) {
            let e = s.get(u.id);
            if (i.checkEquality && u === e?.internals.userNode) t.set(u.id, e);
            else {
              let n = nn(
                t4(u, i.nodeOrigin),
                nE(u.extent) ? u.extent : i.nodeExtent,
                nN(u),
              );
              ((e = {
                ...i.defaults,
                ...u,
                measured: {
                  width: u.measured?.width,
                  height: u.measured?.height,
                },
                internals: {
                  positionAbsolute: n,
                  handleBounds: (function (e, t) {
                    if (!e.handles)
                      return e.measured ? t?.internals.handleBounds : void 0;
                    let n = [],
                      r = [];
                    for (let t of e.handles) {
                      let i = {
                        id: t.id,
                        width: t.width ?? 1,
                        height: t.height ?? 1,
                        nodeId: e.id,
                        x: t.x,
                        y: t.y,
                        position: t.position,
                        type: t.type,
                      };
                      "source" === t.type
                        ? n.push(i)
                        : "target" === t.type && r.push(i);
                    }
                    return { source: n, target: r };
                  })(u, e),
                  z: n5(u, o, i.zIndexMode),
                  userNode: u,
                },
              }),
                t.set(u.id, e));
            }
            ((void 0 !== e.measured &&
              void 0 !== e.measured.width &&
              void 0 !== e.measured.height) ||
              e.hidden ||
              (l = !1),
              u.parentId && n2(e, t, n, r, a),
              (d ||= u.selected ?? !1));
          }
          return { nodesInitialized: l, hasSelectedNodes: d };
        }
        function n2(e, t, n, r, i) {
          let {
              elevateNodesOnSelect: a,
              nodeOrigin: s,
              nodeExtent: o,
              zIndexMode: l,
            } = nJ(nX, r),
            d = e.parentId,
            u = t.get(d);
          if (!u) {
            console.warn(
              `Parent node ${d} not found. Please make sure that parent nodes are in front of their child nodes in the nodes array.`,
            );
            return;
          }
          ((function (e, t) {
            if (!e.parentId) return;
            let n = t.get(e.parentId);
            n ? n.set(e.id, e) : t.set(e.parentId, new Map([[e.id, e]]));
          })(e, n),
            i &&
              !u.parentId &&
              void 0 === u.internals.rootParentIndex &&
              "auto" === l &&
              ((u.internals.rootParentIndex = ++i.i),
              (u.internals.z = u.internals.z + 10 * i.i)),
            i &&
              void 0 !== u.internals.rootParentIndex &&
              (i.i = u.internals.rootParentIndex));
          let {
              x: c,
              y: h,
              z: p,
            } = (function (e, t, n, r, i, a) {
              let { x: s, y: o } = t.internals.positionAbsolute,
                l = nN(e),
                d = t4(e, n),
                u = nE(e.extent) ? nn(d, e.extent, l) : d,
                c = nn({ x: s + u.x, y: o + u.y }, r, l);
              "parent" === e.extent && (c = nr(c, l, t));
              let h = n5(e, i, a),
                p = t.internals.z ?? 0;
              return { x: c.x, y: c.y, z: p >= h ? p + 1 : h };
            })(e, u, s, o, a && !n0(l) ? 1e3 : 0, l),
            { positionAbsolute: f } = e.internals,
            m = c !== f.x || h !== f.y;
          (m || p !== e.internals.z) &&
            t.set(e.id, {
              ...e,
              internals: {
                ...e.internals,
                positionAbsolute: m ? { x: c, y: h } : f,
                z: p,
              },
            });
        }
        function n5(e, t, n) {
          let r = nm(e.zIndex) ? e.zIndex : 0;
          return n0(n) ? r : r + (e.selected ? t : 0);
        }
        function n4(e, t, n, r = [0, 0]) {
          let i = [],
            a = new Map();
          for (let n of e) {
            let e = t.get(n.parentId);
            if (!e) continue;
            let r = nc(a.get(n.parentId)?.expandedRect ?? nd(e), n.rect);
            a.set(n.parentId, { expandedRect: r, parent: e });
          }
          return (
            a.size > 0 &&
              a.forEach(({ expandedRect: t, parent: a }, s) => {
                let o = a.internals.positionAbsolute,
                  l = nN(a),
                  d = a.origin ?? r,
                  u = t.x < o.x ? Math.round(Math.abs(o.x - t.x)) : 0,
                  c = t.y < o.y ? Math.round(Math.abs(o.y - t.y)) : 0,
                  h = Math.max(l.width, Math.round(t.width)),
                  p = Math.max(l.height, Math.round(t.height)),
                  f = (h - l.width) * d[0],
                  m = (p - l.height) * d[1];
                ((u > 0 || c > 0 || f || m) &&
                  (i.push({
                    id: s,
                    type: "position",
                    position: {
                      x: a.position.x - u + f,
                      y: a.position.y - c + m,
                    },
                  }),
                  n.get(s)?.forEach((t) => {
                    e.some((e) => e.id === t.id) ||
                      i.push({
                        id: t.id,
                        type: "position",
                        position: { x: t.position.x + u, y: t.position.y + c },
                      });
                  })),
                  (l.width < t.width || l.height < t.height || u || c) &&
                    i.push({
                      id: s,
                      type: "dimensions",
                      setAttributes: !0,
                      dimensions: {
                        width: h + (u ? d[0] * u - f : 0),
                        height: p + (c ? d[1] * c - m : 0),
                      },
                    }));
              }),
            i
          );
        }
        async function n3({
          delta: e,
          panZoom: t,
          transform: n,
          translateExtent: r,
          width: i,
          height: a,
        }) {
          if (!t || (!e.x && !e.y)) return !1;
          let s = await t.setViewportConstrained(
            { x: n[0] + e.x, y: n[1] + e.y, zoom: n[2] },
            [
              [0, 0],
              [i, a],
            ],
            r,
          );
          return !!s && (s.x !== n[0] || s.y !== n[1] || s.k !== n[2]);
        }
        function n6(e, t, n, r, i, a) {
          let s = i,
            o = r.get(s) || new Map();
          (r.set(s, o.set(n, t)), (s = `${i}-${e}`));
          let l = r.get(s) || new Map();
          if ((r.set(s, l.set(n, t)), a)) {
            s = `${i}-${e}-${a}`;
            let o = r.get(s) || new Map();
            r.set(s, o.set(n, t));
          }
        }
        function n9(e, t, n) {
          for (let r of (e.clear(), t.clear(), n)) {
            let {
                source: n,
                target: i,
                sourceHandle: a = null,
                targetHandle: s = null,
              } = r,
              o = {
                edgeId: r.id,
                source: n,
                target: i,
                sourceHandle: a,
                targetHandle: s,
              },
              l = `${n}-${a}--${i}-${s}`;
            (n6("source", o, `${i}-${s}--${n}-${a}`, e, n, a),
              n6("target", o, l, e, i, s),
              t.set(r.id, r));
          }
        }
        function n7(e, t, n, r, i, a = !1) {
          let s = r.get(e);
          if (!s) return null;
          let o =
              "strict" === i
                ? s.internals.handleBounds?.[t]
                : [
                    ...(s.internals.handleBounds?.source ?? []),
                    ...(s.internals.handleBounds?.target ?? []),
                  ],
            l = (n ? o?.find((e) => e.id === n) : o?.[0]) ?? null;
          return l && a ? { ...l, ...nW(s, l, l.position, !0) } : l;
        }
        function n8(e, t) {
          return (
            e ||
            (t?.classList.contains("target")
              ? "target"
              : t?.classList.contains("source")
                ? "source"
                : null)
          );
        }
        let re = () => !0;
        function rt(
          e,
          {
            handle: t,
            connectionMode: n,
            fromNodeId: r,
            fromHandleId: i,
            fromType: a,
            doc: s,
            lib: l,
            flowId: d,
            isValidConnection: u = re,
            nodeLookup: c,
          },
        ) {
          let h = "target" === a,
            p = t
              ? s.querySelector(
                  `.${l}-flow__handle[data-id="${d}-${t?.nodeId}-${t?.id}-${t?.type}"]`,
                )
              : null,
            { x: f, y: m } = nj(e),
            g = s.elementFromPoint(f, m),
            y = g?.classList.contains(`${l}-flow__handle`) ? g : p,
            v = {
              handleDomNode: y,
              isValid: !1,
              connection: null,
              toHandle: null,
            };
          if (y) {
            let e = n8(void 0, y),
              t = y.getAttribute("data-nodeid"),
              a = y.getAttribute("data-handleid"),
              s = y.classList.contains("connectable"),
              l = y.classList.contains("connectableend");
            if (!t || !e) return v;
            let d = {
              source: h ? t : r,
              sourceHandle: h ? a : i,
              target: h ? r : t,
              targetHandle: h ? i : a,
            };
            v.connection = d;
            let p =
              s &&
              l &&
              (n === o.Strict
                ? (h && "source" === e) || (!h && "target" === e)
                : t !== r || a !== i);
            ((v.isValid = p && u(d)), (v.toHandle = n7(t, e, a, c, n, !0)));
          }
          return v;
        }
        let rn = {
          onPointerDown: function (
            e,
            {
              connectionMode: t,
              connectionRadius: n,
              handleId: r,
              nodeId: i,
              edgeUpdaterType: a,
              isTarget: s,
              domNode: o,
              nodeLookup: l,
              lib: d,
              autoPanOnConnect: u,
              flowId: c,
              panBy: p,
              cancelConnection: f,
              onConnectStart: m,
              onConnect: g,
              onConnectEnd: y,
              isValidConnection: v = re,
              onReconnectEnd: x,
              updateConnection: b,
              getTransform: _,
              getFromHandle: w,
              autoPanSpeed: E,
              dragThreshold: N = 1,
              handleDomNode: S,
            },
          ) {
            let C;
            let k = nA(e.target),
              A = 0,
              { x: T, y: O } = nj(e),
              j = n8(a, S),
              I = o?.getBoundingClientRect(),
              M = !1;
            if (!I || !j) return;
            let R = n7(i, j, r, l, t);
            if (!R) return;
            let D = nj(e, I),
              P = !1,
              $ = null,
              L = !1,
              B = null,
              F = { ...R, nodeId: i, type: j, position: R.position },
              z = l.get(i),
              V = {
                inProgress: !0,
                isValid: null,
                from: nW(z, F, h.Left, !0),
                fromHandle: F,
                fromPosition: F.position,
                fromNode: z,
                to: D,
                toHandle: null,
                toPosition: tJ[F.position],
                toNode: null,
                pointer: D,
              };
            function H() {
              ((M = !0),
                b(V),
                m?.(e, { nodeId: i, handleId: r, handleType: j }));
            }
            function Z(e) {
              var a, o;
              let f;
              if (!M) {
                let { x: t, y: n } = nj(e),
                  r = t - T,
                  i = n - O;
                if (!(r * r + i * i > N * N)) return;
                H();
              }
              if (!w() || !F) {
                U(e);
                return;
              }
              let m = _();
              ((C = (function (e, t, n, r) {
                let i = [],
                  a = 1 / 0;
                for (let s of (function (e, t, n) {
                  let r = [],
                    i = { x: e.x - n, y: e.y - n, width: 2 * n, height: 2 * n };
                  for (let e of t.values()) np(i, nd(e)) > 0 && r.push(e);
                  return r;
                })(e, n, t + 250))
                  for (let n of [
                    ...(s.internals.handleBounds?.source ?? []),
                    ...(s.internals.handleBounds?.target ?? []),
                  ]) {
                    if (
                      r.nodeId === n.nodeId &&
                      r.type === n.type &&
                      r.id === n.id
                    )
                      continue;
                    let { x: o, y: l } = nW(s, n, n.position, !0),
                      d = Math.sqrt(
                        Math.pow(o - e.x, 2) + Math.pow(l - e.y, 2),
                      );
                    d > t ||
                      (d < a
                        ? ((i = [{ ...n, x: o, y: l }]), (a = d))
                        : d === a && i.push({ ...n, x: o, y: l }));
                  }
                if (!i.length) return null;
                if (i.length > 1) {
                  let e = "source" === r.type ? "target" : "source";
                  return i.find((t) => t.type === e) ?? i[0];
                }
                return i[0];
              })(nv((D = nj(e, I)), m, !1, [1, 1]), n, l, F)),
                P ||
                  ((function e() {
                    if (!u || !I) return;
                    let [t, n] = na(D, I, E);
                    (p({ x: t, y: n }), (A = requestAnimationFrame(e)));
                  })(),
                  (P = !0)));
              let g = rt(e, {
                handle: C,
                connectionMode: t,
                fromNodeId: i,
                fromHandleId: r,
                fromType: s ? "target" : "source",
                isValidConnection: v,
                doc: k,
                lib: d,
                flowId: c,
                nodeLookup: l,
              });
              ((B = g.handleDomNode),
                ($ = g.connection),
                (a = !!C),
                (o = g.isValid),
                (f = null),
                o ? (f = !0) : a && !o && (f = !1),
                (L = f));
              let y = l.get(i),
                x = y ? nW(y, F, h.Left, !0) : V.from,
                S = {
                  ...V,
                  from: x,
                  isValid: L,
                  to:
                    g.toHandle && L
                      ? nx({ x: g.toHandle.x, y: g.toHandle.y }, m)
                      : D,
                  toHandle: g.toHandle,
                  toPosition:
                    L && g.toHandle ? g.toHandle.position : tJ[F.position],
                  toNode: g.toHandle ? l.get(g.toHandle.nodeId) : null,
                  pointer: D,
                };
              (b(S), (V = S));
            }
            function U(e) {
              if (!("touches" in e) || !(e.touches.length > 0)) {
                if (M) {
                  (C || B) && $ && L && g?.($);
                  let { inProgress: t, ...n } = V,
                    r = { ...n, toPosition: V.toHandle ? V.toPosition : null };
                  (y?.(e, r), a && x?.(e, r));
                }
                (f(),
                  cancelAnimationFrame(A),
                  (P = !1),
                  (L = !1),
                  ($ = null),
                  (B = null),
                  k.removeEventListener("mousemove", Z),
                  k.removeEventListener("mouseup", U),
                  k.removeEventListener("touchmove", Z),
                  k.removeEventListener("touchend", U));
              }
            }
            (0 === N && H(),
              k.addEventListener("mousemove", Z),
              k.addEventListener("mouseup", U),
              k.addEventListener("touchmove", Z),
              k.addEventListener("touchend", U));
          },
          isValid: rt,
        };
        !(function (e) {
          ((e.Line = "line"), (e.Handle = "handle"));
        })(p || (p = {}));
        var rr = n(4732);
        let ri = (e) => {
            let t;
            let n = new Set(),
              r = (e, r) => {
                let i = "function" == typeof e ? e(t) : e;
                if (!Object.is(i, t)) {
                  let e = t;
                  ((t = (null != r ? r : "object" != typeof i || null === i)
                    ? i
                    : Object.assign({}, t, i)),
                    n.forEach((n) => n(t, e)));
                }
              },
              i = () => t,
              a = {
                setState: r,
                getState: i,
                getInitialState: () => s,
                subscribe: (e) => (n.add(e), () => n.delete(e)),
                destroy: () => {
                  (console.warn(
                    "[DEPRECATED] The `destroy` method will be unsupported in a future version. Instead use unsubscribe function returned by subscribe. Everything will be garbage-collected if store is garbage-collected.",
                  ),
                    n.clear());
                },
              },
              s = (t = e(r, i, a));
            return a;
          },
          ra = (e) => (e ? ri(e) : ri),
          { useDebugValue: rs } = F,
          { useSyncExternalStoreWithSelector: ro } = rr,
          rl = (e) => e;
        function rd(e, t = rl, n) {
          let r = ro(
            e.subscribe,
            e.getState,
            e.getServerState || e.getInitialState,
            t,
            n,
          );
          return (rs(r), r);
        }
        let ru = (e, t) => {
            let n = ra(e),
              r = (e, r = t) => rd(n, e, r);
            return (Object.assign(r, n), r);
          },
          rc = (e, t) => (e ? ru(e, t) : ru);
        function rh(e, t) {
          if (Object.is(e, t)) return !0;
          if (
            "object" != typeof e ||
            null === e ||
            "object" != typeof t ||
            null === t
          )
            return !1;
          if (e instanceof Map && t instanceof Map) {
            if (e.size !== t.size) return !1;
            for (let [n, r] of e) if (!Object.is(r, t.get(n))) return !1;
            return !0;
          }
          if (e instanceof Set && t instanceof Set) {
            if (e.size !== t.size) return !1;
            for (let n of e) if (!t.has(n)) return !1;
            return !0;
          }
          let n = Object.keys(e);
          if (n.length !== Object.keys(t).length) return !1;
          for (let r of n)
            if (
              !Object.prototype.hasOwnProperty.call(t, r) ||
              !Object.is(e[r], t[r])
            )
              return !1;
          return !0;
        }
        n(9577);
        let rp = (0, F.createContext)(null),
          rf = rp.Provider,
          rm = tW.error001("react");
        function rg(e, t) {
          let n = (0, F.useContext)(rp);
          if (null === n) throw Error(rm);
          return rd(n, e, t);
        }
        function ry() {
          let e = (0, F.useContext)(rp);
          if (null === e) throw Error(rm);
          return (0, F.useMemo)(
            () => ({
              getState: e.getState,
              setState: e.setState,
              subscribe: e.subscribe,
            }),
            [e],
          );
        }
        let rv = { display: "none" },
          rx = {
            position: "absolute",
            width: 1,
            height: 1,
            margin: -1,
            border: 0,
            padding: 0,
            overflow: "hidden",
            clip: "rect(0px, 0px, 0px, 0px)",
            clipPath: "inset(100%)",
          },
          rb = "react-flow__node-desc",
          r_ = "react-flow__edge-desc",
          rw = (e) => e.ariaLiveMessage,
          rE = (e) => e.ariaLabelConfig;
        function rN({ rfId: e }) {
          let t = rg(rw);
          return (0, B.jsx)("div", {
            id: `react-flow__aria-live-${e}`,
            "aria-live": "assertive",
            "aria-atomic": "true",
            style: rx,
            children: t,
          });
        }
        function rS({ rfId: e, disableKeyboardA11y: t }) {
          let n = rg(rE);
          return (0, B.jsxs)(B.Fragment, {
            children: [
              (0, B.jsx)("div", {
                id: `${rb}-${e}`,
                style: rv,
                children: t
                  ? n["node.a11yDescription.default"]
                  : n["node.a11yDescription.keyboardDisabled"],
              }),
              (0, B.jsx)("div", {
                id: `${r_}-${e}`,
                style: rv,
                children: n["edge.a11yDescription.default"],
              }),
              !t && (0, B.jsx)(rN, { rfId: e }),
            ],
          });
        }
        let rC = (0, F.forwardRef)(
          (
            {
              position: e = "top-left",
              children: t,
              className: n,
              style: r,
              ...i
            },
            a,
          ) => {
            let s = `${e}`.split("-");
            return (0, B.jsx)("div", {
              className: z(["react-flow__panel", n, ...s]),
              style: r,
              ref: a,
              ...i,
              children: t,
            });
          },
        );
        rC.displayName = "Panel";
        let rk = "https://reactflow.dev?utm_source=attribution";
        function rA({ proOptions: e, position: t = "bottom-right" }) {
          return e?.hideAttribution
            ? null
            : (0, B.jsx)(rC, {
                position: t,
                className: "react-flow__attribution",
                "data-message": `Please only hide this attribution when you are subscribed to React Flow Pro: ${rk}`,
                children: (0, B.jsx)("a", {
                  href: rk,
                  target: "_blank",
                  rel: "noopener noreferrer",
                  "aria-label": "React Flow attribution",
                  children: "React Flow",
                }),
              });
        }
        let rT = (e) => {
            let t = [],
              n = [];
            for (let [, n] of e.nodeLookup)
              n.selected && t.push(n.internals.userNode);
            for (let [, t] of e.edgeLookup) t.selected && n.push(t);
            return { selectedNodes: t, selectedEdges: n };
          },
          rO = (e) => e.id;
        function rj(e, t) {
          return (
            rh(e.selectedNodes.map(rO), t.selectedNodes.map(rO)) &&
            rh(e.selectedEdges.map(rO), t.selectedEdges.map(rO))
          );
        }
        function rI({ onSelectionChange: e }) {
          ry();
          let { selectedNodes: t, selectedEdges: n } = rg(rT, rj);
          return null;
        }
        let rM = (e) => !!e.onSelectionChangeHandlers;
        function rR({ onSelectionChange: e }) {
          let t = rg(rM);
          return e || t ? (0, B.jsx)(rI, { onSelectionChange: e }) : null;
        }
        let rD = [0, 0],
          rP = { x: 0, y: 0, zoom: 1 },
          r$ = [
            "nodes",
            "edges",
            "defaultNodes",
            "defaultEdges",
            "onConnect",
            "onConnectStart",
            "onConnectEnd",
            "onClickConnectStart",
            "onClickConnectEnd",
            "nodesDraggable",
            "autoPanOnNodeFocus",
            "nodesConnectable",
            "nodesFocusable",
            "edgesFocusable",
            "edgesReconnectable",
            "elevateNodesOnSelect",
            "elevateEdgesOnSelect",
            "minZoom",
            "maxZoom",
            "nodeExtent",
            "onNodesChange",
            "onEdgesChange",
            "elementsSelectable",
            "connectionMode",
            "snapGrid",
            "snapToGrid",
            "translateExtent",
            "connectOnClick",
            "defaultEdgeOptions",
            "fitView",
            "fitViewOptions",
            "onNodesDelete",
            "onEdgesDelete",
            "onDelete",
            "onNodeDrag",
            "onNodeDragStart",
            "onNodeDragStop",
            "onSelectionDrag",
            "onSelectionDragStart",
            "onSelectionDragStop",
            "onMoveStart",
            "onMove",
            "onMoveEnd",
            "noPanClassName",
            "nodeOrigin",
            "autoPanOnConnect",
            "autoPanOnNodeDrag",
            "onError",
            "connectionRadius",
            "isValidConnection",
            "selectNodesOnDrag",
            "nodeDragThreshold",
            "connectionDragThreshold",
            "onBeforeDelete",
            "debug",
            "autoPanSpeed",
            "ariaLabelConfig",
            "zIndexMode",
            "rfId",
          ],
          rL = (e) => ({
            setNodes: e.setNodes,
            setEdges: e.setEdges,
            setMinZoom: e.setMinZoom,
            setMaxZoom: e.setMaxZoom,
            setTranslateExtent: e.setTranslateExtent,
            setNodeExtent: e.setNodeExtent,
            reset: e.reset,
            setDefaultNodesAndEdges: e.setDefaultNodesAndEdges,
          }),
          rB = {
            translateExtent: tY,
            nodeOrigin: rD,
            minZoom: 0.5,
            maxZoom: 2,
            elementsSelectable: !0,
            noPanClassName: "nopan",
            rfId: "1",
          };
        function rF(e) {
          let {
              setNodes: t,
              setEdges: n,
              setMinZoom: r,
              setMaxZoom: i,
              setTranslateExtent: a,
              setNodeExtent: s,
              reset: o,
              setDefaultNodesAndEdges: l,
            } = rg(rL, rh),
            d = ry(),
            u = (0, F.useRef)(rB);
          return (
            (0, F.useEffect)(
              () => {
                for (let o of r$) {
                  let l = e[o];
                  l !== u.current[o] &&
                    void 0 !== e[o] &&
                    ("nodes" === o
                      ? t(l)
                      : "edges" === o
                        ? n(l)
                        : "minZoom" === o
                          ? r(l)
                          : "maxZoom" === o
                            ? i(l)
                            : "translateExtent" === o
                              ? a(l)
                              : "nodeExtent" === o
                                ? s(l)
                                : "ariaLabelConfig" === o
                                  ? d.setState({
                                      ariaLabelConfig: { ...tX, ...(l || {}) },
                                    })
                                  : "fitView" === o
                                    ? d.setState({ fitViewQueued: l })
                                    : "fitViewOptions" === o
                                      ? d.setState({ fitViewOptions: l })
                                      : d.setState({ [o]: l }));
                }
                u.current = e;
              },
              r$.map((t) => e[t]),
            ),
            null
          );
        }
        let rz = "undefined" != typeof document ? document : null;
        function rV(
          e = null,
          t = { target: rz, actInsideInputWithModifier: !0 },
        ) {
          let [n, r] = (0, F.useState)(!1);
          ((0, F.useRef)(!1), (0, F.useRef)(new Set([])));
          let [i, a] = (0, F.useMemo)(() => {
            if (null !== e) {
              let t = (Array.isArray(e) ? e : [e])
                  .filter((e) => "string" == typeof e)
                  .map((e) =>
                    e.replace("+", "\n").replace("\n\n", "\n+").split("\n"),
                  ),
                n = t.reduce((e, t) => e.concat(...t), []);
              return [t, n];
            }
            return [[], []];
          }, [e]);
          return n;
        }
        let rH = () => {
          let e = ry();
          return (0, F.useMemo)(
            () => ({
              zoomIn: async (t) => {
                let { panZoom: n } = e.getState();
                return !!n && n.scaleBy(1.2, t);
              },
              zoomOut: async (t) => {
                let { panZoom: n } = e.getState();
                return !!n && n.scaleBy(1 / 1.2, t);
              },
              zoomTo: async (t, n) => {
                let { panZoom: r } = e.getState();
                return !!r && r.scaleTo(t, n);
              },
              getZoom: () => e.getState().transform[2],
              setViewport: async (t, n) => {
                let {
                  transform: [r, i, a],
                  panZoom: s,
                } = e.getState();
                return (
                  !!s &&
                  (await s.setViewport(
                    { x: t.x ?? r, y: t.y ?? i, zoom: t.zoom ?? a },
                    n,
                  ),
                  !0)
                );
              },
              getViewport: () => {
                let [t, n, r] = e.getState().transform;
                return { x: t, y: n, zoom: r };
              },
              setCenter: async (t, n, r) => e.getState().setCenter(t, n, r),
              fitBounds: async (t, n) => {
                let {
                    width: r,
                    height: i,
                    minZoom: a,
                    maxZoom: s,
                    panZoom: o,
                  } = e.getState(),
                  l = n_(t, r, i, a, s, n?.padding ?? 0.1);
                return (
                  !!o &&
                  (await o.setViewport(l, {
                    duration: n?.duration,
                    ease: n?.ease,
                    interpolate: n?.interpolate,
                  }),
                  !0)
                );
              },
              screenToFlowPosition: (t, n = {}) => {
                let {
                  transform: r,
                  snapGrid: i,
                  snapToGrid: a,
                  domNode: s,
                } = e.getState();
                if (!s) return t;
                let { x: o, y: l } = s.getBoundingClientRect(),
                  d = { x: t.x - o, y: t.y - l },
                  u = n.snapGrid ?? i;
                return nv(d, r, n.snapToGrid ?? a, u);
              },
              flowToScreenPosition: (t) => {
                let { transform: n, domNode: r } = e.getState();
                if (!r) return t;
                let { x: i, y: a } = r.getBoundingClientRect(),
                  s = nx(t, n);
                return { x: s.x + i, y: s.y + a };
              },
            }),
            [],
          );
        };
        function rZ(e, t) {
          let n = [],
            r = new Map(),
            i = [];
          for (let t of e) {
            if ("add" === t.type) {
              i.push(t);
              continue;
            }
            if ("remove" === t.type || "replace" === t.type) r.set(t.id, [t]);
            else {
              let e = r.get(t.id);
              e ? e.push(t) : r.set(t.id, [t]);
            }
          }
          for (let e of t) {
            let t = r.get(e.id);
            if (!t) {
              n.push(e);
              continue;
            }
            if ("remove" === t[0].type) continue;
            if ("replace" === t[0].type) {
              n.push({ ...t[0].item });
              continue;
            }
            let i = { ...e };
            for (let e of t)
              (function (e, t) {
                switch (e.type) {
                  case "select":
                    t.selected = e.selected;
                    break;
                  case "position":
                    (void 0 !== e.position && (t.position = e.position),
                      void 0 !== e.dragging && (t.dragging = e.dragging));
                    break;
                  case "dimensions":
                    (void 0 !== e.dimensions &&
                      ((t.measured = { ...e.dimensions }),
                      e.setAttributes &&
                        ((!0 === e.setAttributes ||
                          "width" === e.setAttributes) &&
                          (t.width = e.dimensions.width),
                        (!0 === e.setAttributes ||
                          "height" === e.setAttributes) &&
                          (t.height = e.dimensions.height))),
                      "boolean" == typeof e.resizing &&
                        (t.resizing = e.resizing));
                }
              })(e, i);
            n.push(i);
          }
          return (
            i.length &&
              i.forEach((e) => {
                void 0 !== e.index
                  ? n.splice(e.index, 0, { ...e.item })
                  : n.push({ ...e.item });
              }),
            n
          );
        }
        function rU(e, t) {
          return { id: e, type: "select", selected: t };
        }
        function rG(e, t = new Set(), n = !1) {
          let r = [];
          for (let [i, a] of e) {
            let e = t.has(i);
            (void 0 !== a.selected || e) &&
              a.selected !== e &&
              (n && (a.selected = e), r.push(rU(a.id, e)));
          }
          return r;
        }
        function rq({ items: e = [], lookup: t }) {
          let n = [],
            r = new Map(e.map((e) => [e.id, e]));
          for (let [r, i] of e.entries()) {
            let e = t.get(i.id),
              a = e?.internals?.userNode ?? e;
            (void 0 !== a &&
              a !== i &&
              n.push({ id: i.id, item: i, type: "replace" }),
              void 0 === a && n.push({ item: i, type: "add", index: r }));
          }
          for (let [e] of t)
            void 0 === r.get(e) && n.push({ id: e, type: "remove" });
          return n;
        }
        function rW(e) {
          return { id: e.id, type: "remove" };
        }
        let rY = ng("React Flow", "https://reactflow.dev/"),
          rK = (e) => t2(e),
          rX = (e) => t1(e);
        function rQ(e) {
          return (0, F.forwardRef)(e);
        }
        let rJ = F.useEffect;
        function r0(e) {
          let [t, n] = (0, F.useState)(BigInt(0)),
            [r] = (0, F.useState)(() => {
              var e;
              let t;
              return (
                (e = () => n((e) => e + BigInt(1))),
                (t = []),
                {
                  get: () => t,
                  reset: () => {
                    t = [];
                  },
                  push: (n) => {
                    (t.push(n), e());
                  },
                }
              );
            });
          return (
            rJ(() => {
              let t = r.get();
              t.length && (e(t), r.reset());
            }, [t]),
            r
          );
        }
        let r1 = (0, F.createContext)(null);
        function r2({ children: e }) {
          let t = ry(),
            n = r0(
              (0, F.useCallback)((e) => {
                let {
                    nodes: n = [],
                    setNodes: r,
                    hasDefaultNodes: i,
                    onNodesChange: a,
                    nodeLookup: s,
                    fitViewQueued: o,
                    onNodesChangeMiddlewareMap: l,
                  } = t.getState(),
                  d = n;
                for (let t of e) d = "function" == typeof t ? t(d) : t;
                let u = rq({ items: d, lookup: s });
                for (let e of l.values()) u = e(u);
                (i && r(d),
                  u.length > 0
                    ? a?.(u)
                    : o &&
                      window.requestAnimationFrame(() => {
                        let {
                          fitViewQueued: e,
                          nodes: n,
                          setNodes: r,
                        } = t.getState();
                        e && r(n);
                      }));
              }, []),
            ),
            r = r0(
              (0, F.useCallback)((e) => {
                let {
                    edges: n = [],
                    setEdges: r,
                    hasDefaultEdges: i,
                    onEdgesChange: a,
                    edgeLookup: s,
                  } = t.getState(),
                  o = n;
                for (let t of e) o = "function" == typeof t ? t(o) : t;
                i ? r(o) : a && a(rq({ items: o, lookup: s }));
              }, []),
            ),
            i = (0, F.useMemo)(() => ({ nodeQueue: n, edgeQueue: r }), []);
          return (0, B.jsx)(r1.Provider, { value: i, children: e });
        }
        let r5 = (e) => !!e.panZoom;
        function r4() {
          let e = rH(),
            t = ry(),
            n = (function () {
              let e = (0, F.useContext)(r1);
              if (!e)
                throw Error(
                  "useBatchContext must be used within a BatchProvider",
                );
              return e;
            })(),
            r = rg(r5),
            i = (0, F.useMemo)(() => {
              let e = (e) => t.getState().nodeLookup.get(e),
                r = (e) => {
                  n.nodeQueue.push(e);
                },
                i = (e) => {
                  n.edgeQueue.push(e);
                },
                a = (e) => {
                  let { nodeLookup: n, nodeOrigin: r } = t.getState(),
                    i = rK(e) ? e : n.get(e.id),
                    a = i.parentId
                      ? (function (e, t = { width: 0, height: 0 }, n, r, i) {
                          let a = { ...e },
                            s = r.get(n);
                          if (s) {
                            let e = s.origin || i;
                            ((a.x +=
                              s.internals.positionAbsolute.x -
                              (t.width ?? 0) * e[0]),
                              (a.y +=
                                s.internals.positionAbsolute.y -
                                (t.height ?? 0) * e[1]));
                          }
                          return a;
                        })(i.position, i.measured, i.parentId, n, r)
                      : i.position;
                  return nd({
                    ...i,
                    position: a,
                    width: i.measured?.width ?? i.width,
                    height: i.measured?.height ?? i.height,
                  });
                },
                s = (e, t, n = { replace: !1 }) => {
                  r((r) =>
                    r.map((r) => {
                      if (r.id === e) {
                        let e = "function" == typeof t ? t(r) : t;
                        return n.replace && rK(e) ? e : { ...r, ...e };
                      }
                      return r;
                    }),
                  );
                },
                o = (e, t, n = { replace: !1 }) => {
                  i((r) =>
                    r.map((r) => {
                      if (r.id === e) {
                        let e = "function" == typeof t ? t(r) : t;
                        return n.replace && rX(e) ? e : { ...r, ...e };
                      }
                      return r;
                    }),
                  );
                };
              return {
                getNodes: () => t.getState().nodes.map((e) => ({ ...e })),
                getNode: (t) => e(t)?.internals.userNode,
                getInternalNode: e,
                getEdges: () => {
                  let { edges: e = [] } = t.getState();
                  return e.map((e) => ({ ...e }));
                },
                getEdge: (e) => t.getState().edgeLookup.get(e),
                setNodes: r,
                setEdges: i,
                addNodes: (e) => {
                  let t = Array.isArray(e) ? e : [e];
                  n.nodeQueue.push((e) => [...e, ...t]);
                },
                addEdges: (e) => {
                  let t = Array.isArray(e) ? e : [e];
                  n.edgeQueue.push((e) => [...e, ...t]);
                },
                toObject: () => {
                  let {
                      nodes: e = [],
                      edges: n = [],
                      transform: r,
                    } = t.getState(),
                    [i, a, s] = r;
                  return {
                    nodes: e.map((e) => ({ ...e })),
                    edges: n.map((e) => ({ ...e })),
                    viewport: { x: i, y: a, zoom: s },
                  };
                },
                deleteElements: async ({ nodes: e = [], edges: n = [] }) => {
                  let {
                      nodes: r,
                      edges: i,
                      onNodesDelete: a,
                      onEdgesDelete: s,
                      triggerNodeChanges: o,
                      triggerEdgeChanges: l,
                      onDelete: d,
                      onBeforeDelete: u,
                    } = t.getState(),
                    { nodes: c, edges: h } = await ne({
                      nodesToRemove: e,
                      edgesToRemove: n,
                      nodes: r,
                      edges: i,
                      onBeforeDelete: u,
                    }),
                    p = h.length > 0,
                    f = c.length > 0;
                  if (p) {
                    let e = h.map(rW);
                    (s?.(h), l(e));
                  }
                  if (f) {
                    let e = c.map(rW);
                    (a?.(c), o(e));
                  }
                  return (
                    (f || p) && d?.({ nodes: c, edges: h }),
                    { deletedNodes: c, deletedEdges: h }
                  );
                },
                getIntersectingNodes: (e, n = !0, r) => {
                  let i = nf(e),
                    s = i ? e : a(e),
                    o = void 0 !== r;
                  return s
                    ? (r || t.getState().nodes).filter((r) => {
                        let a = t.getState().nodeLookup.get(r.id);
                        if (
                          a &&
                          !i &&
                          (r.id === e.id || !a.internals.positionAbsolute)
                        )
                          return !1;
                        let l = nd(o ? r : a),
                          d = np(l, s);
                        return (
                          (n && d > 0) ||
                          d >= l.width * l.height ||
                          d >= s.width * s.height
                        );
                      })
                    : [];
                },
                isNodeIntersecting: (e, t, n = !0) => {
                  let r = nf(e) ? e : a(e);
                  if (!r) return !1;
                  let i = np(r, t);
                  return (
                    (n && i > 0) ||
                    i >= t.width * t.height ||
                    i >= r.width * r.height
                  );
                },
                updateNode: s,
                updateNodeData: (e, t, n = { replace: !1 }) => {
                  s(
                    e,
                    (e) => {
                      let r = "function" == typeof t ? t(e) : t;
                      return n.replace
                        ? { ...e, data: r }
                        : { ...e, data: { ...e.data, ...r } };
                    },
                    n,
                  );
                },
                updateEdge: o,
                updateEdgeData: (e, t, n = { replace: !1 }) => {
                  o(
                    e,
                    (e) => {
                      let r = "function" == typeof t ? t(e) : t;
                      return n.replace
                        ? { ...e, data: r }
                        : { ...e, data: { ...e.data, ...r } };
                    },
                    n,
                  );
                },
                getNodesBounds: (e) => {
                  let { nodeLookup: n, nodeOrigin: r } = t.getState();
                  return t3(e, { nodeLookup: n, nodeOrigin: r });
                },
                getHandleConnections: ({ type: e, id: n, nodeId: r }) =>
                  Array.from(
                    t
                      .getState()
                      .connectionLookup.get(`${r}-${e}${n ? `-${n}` : ""}`)
                      ?.values() ?? [],
                  ),
                getNodeConnections: ({ type: e, handleId: n, nodeId: r }) =>
                  Array.from(
                    t
                      .getState()
                      .connectionLookup.get(
                        `${r}${e ? (n ? `-${e}-${n}` : `-${e}`) : ""}`,
                      )
                      ?.values() ?? [],
                  ),
                fitView: async (e) => {
                  let r, i;
                  let a = t.getState().fitViewResolver ?? {
                    promise: new Promise((e, t) => {
                      ((r = e), (i = t));
                    }),
                    resolve: r,
                    reject: i,
                  };
                  return (
                    t.setState({
                      fitViewQueued: !0,
                      fitViewOptions: e,
                      fitViewResolver: a,
                    }),
                    n.nodeQueue.push((e) => [...e]),
                    a.promise
                  );
                },
              };
            }, []);
          return (0, F.useMemo)(
            () => ({ ...i, ...e, viewportInitialized: r }),
            [r],
          );
        }
        let r3 = void 0,
          r6 = {
            position: "absolute",
            width: "100%",
            height: "100%",
            top: 0,
            left: 0,
          },
          r9 = (e) => ({
            userSelectionActive: e.userSelectionActive,
            lib: e.lib,
            connectionInProgress: e.connection.inProgress,
          });
        function r7({
          onPaneContextMenu: e,
          zoomOnScroll: t = !0,
          zoomOnPinch: n = !0,
          panOnScroll: r = !1,
          panOnScrollSpeed: i = 0.5,
          panOnScrollMode: a = l.Free,
          zoomOnDoubleClick: s = !0,
          panOnDrag: o = !0,
          defaultViewport: d,
          translateExtent: u,
          minZoom: c,
          maxZoom: h,
          zoomActivationKeyCode: p,
          preventScrolling: f = !0,
          children: m,
          noWheelClassName: g,
          noPanClassName: y,
          onViewportChange: v,
          isControlledViewport: x,
          paneClickDistance: b,
          selectionOnDrag: _,
        }) {
          let w = ry(),
            E = (0, F.useRef)(null),
            {
              userSelectionActive: N,
              lib: S,
              connectionInProgress: C,
            } = rg(r9, rh);
          return (
            rV(p),
            (0, F.useRef)(),
            ry(),
            (0, F.useCallback)(
              (e) => {
                (v?.({ x: e[0], y: e[1], zoom: e[2] }),
                  x || w.setState({ transform: e }));
              },
              [v, x],
            ),
            (0, B.jsx)("div", {
              className: "react-flow__renderer",
              ref: E,
              style: r6,
              children: m,
            })
          );
        }
        let r8 = (e) => ({
          userSelectionActive: e.userSelectionActive,
          userSelectionRect: e.userSelectionRect,
        });
        function ie() {
          let { userSelectionActive: e, userSelectionRect: t } = rg(r8, rh);
          return e && t
            ? (0, B.jsx)("div", {
                className: "react-flow__selection react-flow__container",
                style: {
                  width: t.width,
                  height: t.height,
                  transform: `translate(${t.x}px, ${t.y}px)`,
                },
              })
            : null;
        }
        let it = (e, t) => (n) => {
            n.target === t.current && e?.(n);
          },
          ir = (e) => ({
            userSelectionActive: e.userSelectionActive,
            elementsSelectable: e.elementsSelectable,
            dragging: e.paneDragging,
            panBy: e.panBy,
            autoPanSpeed: e.autoPanSpeed,
          });
        function ii({
          isSelecting: e,
          selectionKeyPressed: t,
          selectionMode: n = d.Full,
          panOnDrag: r,
          autoPanOnSelection: i,
          paneClickDistance: a,
          selectionOnDrag: s,
          onSelectionStart: o,
          onSelectionEnd: l,
          onPaneClick: u,
          onPaneContextMenu: c,
          onPaneScroll: h,
          onPaneMouseEnter: p,
          onPaneMouseMove: f,
          onPaneMouseLeave: m,
          children: g,
        }) {
          let y = (0, F.useRef)(0),
            v = ry(),
            {
              userSelectionActive: x,
              elementsSelectable: b,
              dragging: _,
              panBy: w,
              autoPanSpeed: E,
            } = rg(ir, rh),
            N = b && (e || x),
            S = (0, F.useRef)(null),
            C = (0, F.useRef)(),
            k = (0, F.useRef)(new Set()),
            A = (0, F.useRef)(new Set()),
            T = (0, F.useRef)(!1),
            O = (0, F.useRef)(!1),
            j = (0, F.useRef)({ x: 0, y: 0 }),
            I = (0, F.useRef)(!1),
            M = (e) => {
              if (
                O.current ||
                T.current ||
                v.getState().connection.inProgress
              ) {
                ((O.current = !1), (T.current = !1));
                return;
              }
              (u?.(e),
                v.getState().resetSelectedElements(),
                v.setState({ nodesSelectionActive: !1 }));
            };
          function R(e, t) {
            let { userSelectionRect: r } = v.getState();
            if (!r) return;
            let {
                transform: i,
                nodeLookup: a,
                edgeLookup: s,
                connectionLookup: o,
                triggerNodeChanges: l,
                triggerEdgeChanges: u,
                defaultEdgeOptions: c,
              } = v.getState(),
              h = { x: r.startX, y: r.startY },
              { x: p, y: f } = nx(h, i),
              m = {
                startX: h.x,
                startY: h.y,
                x: e < p ? e : p,
                y: t < f ? t : f,
                width: Math.abs(e - p),
                height: Math.abs(t - f),
              },
              g = k.current,
              y = A.current;
            ((k.current = new Set(
              t9(a, m, i, n === d.Partial, !0).map((e) => e.id),
            )),
              (A.current = new Set()));
            let x = c?.selectable ?? !0;
            for (let e of k.current) {
              let t = o.get(e);
              if (t)
                for (let { edgeId: e } of t.values()) {
                  let t = s.get(e);
                  t && (t.selectable ?? x) && A.current.add(e);
                }
            }
            (nC(g, k.current) || l(rG(a, k.current, !0)),
              nC(y, A.current) || u(rG(s, A.current)),
              v.setState({
                userSelectionRect: m,
                userSelectionActive: !0,
                nodesSelectionActive: !1,
              }));
          }
          let D = () => {
              (cancelAnimationFrame(y.current),
                (y.current = 0),
                (I.current = !1));
            },
            P = !0 === r || (Array.isArray(r) && r.includes(0));
          return (0, B.jsxs)("div", {
            className: z([
              "react-flow__pane",
              { draggable: P, dragging: _, selection: e },
            ]),
            onClick: N ? void 0 : it(M, S),
            onContextMenu: it((e) => {
              if (Array.isArray(r) && r?.includes(2)) {
                e.preventDefault();
                return;
              }
              c?.(e);
            }, S),
            onWheel: it(h ? (e) => h(e) : void 0, S),
            onPointerEnter: N ? void 0 : p,
            onPointerMove: N
              ? (e) => {
                  let {
                    userSelectionRect: n,
                    transform: r,
                    resetSelectedElements: s,
                  } = v.getState();
                  if (!C.current || !n) return;
                  let { x: l, y: d } = nj(e.nativeEvent, C.current);
                  j.current = { x: l, y: d };
                  let u = nx({ x: n.startX, y: n.startY }, r);
                  if (!O.current) {
                    if (Math.hypot(l - u.x, d - u.y) <= (t ? 0 : a)) return;
                    (s(), o?.(e));
                  }
                  ((O.current = !0),
                    I.current ||
                      ((function e() {
                        if (!i || !C.current) return;
                        let [t, n] = na(j.current, C.current, E);
                        w({ x: t, y: n }).then((t) => {
                          if (!O.current || !t) {
                            y.current = requestAnimationFrame(e);
                            return;
                          }
                          let { x: n, y: r } = j.current;
                          (R(n, r), (y.current = requestAnimationFrame(e)));
                        });
                      })(),
                      (I.current = !0)),
                    R(l, d));
                }
              : f,
            onPointerUp: (e) => {
              if (!N) {
                e.target === S.current &&
                  v.getState().connection.inProgress &&
                  (T.current = !0);
                return;
              }
              0 === e.button &&
                (e.target?.releasePointerCapture?.(e.pointerId),
                !x &&
                  e.target === S.current &&
                  v.getState().userSelectionRect &&
                  M?.(e),
                v.setState({
                  userSelectionActive: !1,
                  userSelectionRect: null,
                }),
                O.current &&
                  (l?.(e),
                  v.setState({ nodesSelectionActive: k.current.size > 0 })),
                D());
            },
            onPointerCancel: N
              ? (e) => {
                  (e.target?.releasePointerCapture?.(e.pointerId), D());
                }
              : void 0,
            onPointerDownCapture: N
              ? (n) => {
                  let { domNode: r, transform: i } = v.getState();
                  if (((C.current = r?.getBoundingClientRect()), !C.current))
                    return;
                  let a = n.target === S.current;
                  if (
                    (!a && n.target.closest(".nokey")) ||
                    !e ||
                    !((s && a) || t) ||
                    0 !== n.button ||
                    !n.isPrimary
                  )
                    return;
                  (n.target?.setPointerCapture?.(n.pointerId),
                    (O.current = !1));
                  let { x: o, y: l } = nj(n.nativeEvent, C.current),
                    d = nv({ x: o, y: l }, i);
                  (v.setState({
                    userSelectionRect: {
                      width: 0,
                      height: 0,
                      startX: d.x,
                      startY: d.y,
                      x: o,
                      y: l,
                    },
                  }),
                    a || (n.stopPropagation(), n.preventDefault()));
                }
              : void 0,
            onClickCapture: N
              ? (e) => {
                  O.current && (e.stopPropagation(), (O.current = !1));
                }
              : void 0,
            onPointerLeave: m,
            ref: S,
            style: r6,
            children: [g, (0, B.jsx)(ie, {})],
          });
        }
        function ia({ id: e, store: t, unselect: n = !1, nodeRef: r }) {
          let {
              addSelectedNodes: i,
              unselectNodesAndEdges: a,
              multiSelectionActive: s,
              nodeLookup: o,
              onError: l,
            } = t.getState(),
            d = o.get(e);
          if (!d) {
            l?.("012", tW.error012(e));
            return;
          }
          (t.setState({ nodesSelectionActive: !1 }),
            d.selected
              ? (n || (d.selected && s)) &&
                (a({ nodes: [d], edges: [] }),
                requestAnimationFrame(() => r?.current?.blur()))
              : i([e]));
        }
        function is({
          nodeRef: e,
          disabled: t = !1,
          noDragClassName: n,
          handleSelector: r,
          nodeId: i,
          isSelectable: a,
          nodeClickDistance: s,
        }) {
          ry();
          let [o, l] = (0, F.useState)(!1);
          return ((0, F.useRef)(), o);
        }
        let io = (e) => (t) =>
          t.selected && (t.draggable || (e && void 0 === t.draggable));
        function il() {
          let e = ry();
          return (0, F.useCallback)((t) => {
            let {
                nodeExtent: n,
                snapToGrid: r,
                snapGrid: i,
                nodesDraggable: a,
                onError: s,
                updateNodePositions: o,
                nodeLookup: l,
                nodeOrigin: d,
              } = e.getState(),
              u = new Map(),
              c = io(a),
              h = r ? i[0] : 5,
              p = r ? i[1] : 5,
              f = t.direction.x * h * t.factor,
              m = t.direction.y * p * t.factor;
            for (let [, e] of l) {
              if (!c(e)) continue;
              let t = {
                x: e.internals.positionAbsolute.x + f,
                y: e.internals.positionAbsolute.y + m,
              };
              r && (t = ny(t, i));
              let { position: a, positionAbsolute: o } = (function ({
                nodeId: e,
                nextPosition: t,
                nodeLookup: n,
                nodeOrigin: r = [0, 0],
                nodeExtent: i,
                onError: a,
              }) {
                let s = n.get(e),
                  o = s.parentId ? n.get(s.parentId) : void 0,
                  { x: l, y: d } = o
                    ? o.internals.positionAbsolute
                    : { x: 0, y: 0 },
                  u = s.origin ?? r,
                  c = s.extent || i;
                if ("parent" !== s.extent || s.expandParent)
                  o &&
                    nE(s.extent) &&
                    (c = [
                      [s.extent[0][0] + l, s.extent[0][1] + d],
                      [s.extent[1][0] + l, s.extent[1][1] + d],
                    ]);
                else if (o) {
                  let e = o.measured.width,
                    t = o.measured.height;
                  e &&
                    t &&
                    (c = [
                      [l, d],
                      [l + e, d + t],
                    ]);
                } else a?.("005", tW.error005());
                let h = nE(c) ? nn(t, c, s.measured) : t;
                return (
                  (void 0 === s.measured.width ||
                    void 0 === s.measured.height) &&
                    a?.("015", tW.error015()),
                  {
                    position: {
                      x: h.x - l + (s.measured.width ?? 0) * u[0],
                      y: h.y - d + (s.measured.height ?? 0) * u[1],
                    },
                    positionAbsolute: h,
                  }
                );
              })({
                nodeId: e.id,
                nextPosition: t,
                nodeLookup: l,
                nodeExtent: n,
                nodeOrigin: d,
                onError: s,
              });
              ((e.position = a),
                (e.internals.positionAbsolute = o),
                u.set(e.id, e));
            }
            o(u);
          }, []);
        }
        let id = (0, F.createContext)(null),
          iu = id.Provider;
        id.Consumer;
        let ic = () => (0, F.useContext)(id),
          ih = (e) => ({
            connectOnClick: e.connectOnClick,
            noPanClassName: e.noPanClassName,
            rfId: e.rfId,
          }),
          ip = (0, F.createContext)(null);
        function im({ children: e }) {
          let t = rg(ih, rh);
          return (0, B.jsx)(ip.Provider, { value: t, children: e });
        }
        let ig = {
            connectingFrom: !1,
            connectingTo: !1,
            clickConnecting: !1,
            isPossibleEndHandle: !0,
            connectionInProcess: !1,
            clickConnectionInProcess: !1,
            valid: !1,
          },
          iy = (e, t, n) => (r) => {
            let {
                connectionClickStartHandle: i,
                connectionMode: a,
                connection: s,
              } = r,
              { fromHandle: l, toHandle: d, isValid: u } = s;
            if (!l && !i) return ig;
            let c = d?.nodeId === e && d?.id === t && d?.type === n;
            return {
              connectingFrom: l?.nodeId === e && l?.id === t && l?.type === n,
              connectingTo: c,
              clickConnecting: i?.nodeId === e && i?.id === t && i?.type === n,
              isPossibleEndHandle:
                a === o.Strict ? l?.type !== n : e !== l?.nodeId || t !== l?.id,
              connectionInProcess: !!l,
              clickConnectionInProcess: !!i,
              valid: c && u,
            };
          },
          iv = (0, F.memo)(
            rQ(function (
              {
                type: e = "source",
                position: t = h.Top,
                isValidConnection: n,
                isConnectable: r = !0,
                isConnectableStart: i = !0,
                isConnectableEnd: a = !0,
                id: s,
                onConnect: o,
                children: l,
                className: d,
                onMouseDown: u,
                onTouchStart: c,
                ...p
              },
              f,
            ) {
              let m = s || null,
                g = "target" === e,
                y = ry(),
                v = ic(),
                {
                  connectOnClick: x,
                  noPanClassName: b,
                  rfId: _,
                } = (function () {
                  let e = (0, F.useContext)(ip);
                  if (!e)
                    throw Error(
                      "useHandleConfig must be used within a HandleConfigProvider",
                    );
                  return e;
                })(),
                {
                  connectingFrom: w,
                  connectingTo: E,
                  clickConnecting: N,
                  isPossibleEndHandle: S,
                  connectionInProcess: C,
                  clickConnectionInProcess: k,
                  valid: A,
                } = rg(iy(v, m, e), rh);
              v || y.getState().onError?.("010", tW.error010());
              let T = (e) => {
                  let {
                      defaultEdgeOptions: t,
                      onConnect: n,
                      hasDefaultEdges: r,
                    } = y.getState(),
                    i = { ...t, ...e };
                  if (r) {
                    let { edges: e, setEdges: t, onError: n } = y.getState();
                    t(
                      (function (e, t, n = {}) {
                        return nF(e, t, { ...n, onError: n.onError ?? rY });
                      })(i, e, { onError: n }),
                    );
                  }
                  (n?.(i), o?.(i));
                },
                O = (e) => {
                  if (!v) return;
                  let t = nO(e.nativeEvent);
                  if (i && ((t && 0 === e.button) || !t)) {
                    let t = y.getState();
                    rn.onPointerDown(e.nativeEvent, {
                      handleDomNode: e.currentTarget,
                      autoPanOnConnect: t.autoPanOnConnect,
                      connectionMode: t.connectionMode,
                      connectionRadius: t.connectionRadius,
                      domNode: t.domNode,
                      nodeLookup: t.nodeLookup,
                      lib: t.lib,
                      isTarget: g,
                      handleId: m,
                      nodeId: v,
                      flowId: t.rfId,
                      panBy: t.panBy,
                      cancelConnection: t.cancelConnection,
                      onConnectStart: t.onConnectStart,
                      onConnectEnd: (...e) => y.getState().onConnectEnd?.(...e),
                      updateConnection: t.updateConnection,
                      onConnect: T,
                      isValidConnection:
                        n ||
                        ((...e) =>
                          y.getState().isValidConnection?.(...e) ?? !0),
                      getTransform: () => y.getState().transform,
                      getFromHandle: () => y.getState().connection.fromHandle,
                      autoPanSpeed: t.autoPanSpeed,
                      dragThreshold: t.connectionDragThreshold,
                    });
                  }
                  t ? u?.(e) : c?.(e);
                };
              return (0, B.jsx)("div", {
                "data-handleid": m,
                "data-nodeid": v,
                "data-handlepos": t,
                "data-id": `${_}-${v}-${m}-${e}`,
                className: z([
                  "react-flow__handle",
                  `react-flow__handle-${t}`,
                  "nodrag",
                  b,
                  d,
                  {
                    source: !g,
                    target: g,
                    connectable: r,
                    connectablestart: i,
                    connectableend: a,
                    clickconnecting: N,
                    connectingfrom: w,
                    connectingto: E,
                    valid: A,
                    connectionindicator: r && (!C || S) && (C || k ? a : i),
                  },
                ]),
                onMouseDown: O,
                onTouchStart: O,
                onClick: x
                  ? (t) => {
                      let {
                        onClickConnectStart: r,
                        onClickConnectEnd: a,
                        connectionClickStartHandle: s,
                        connectionMode: o,
                        isValidConnection: l,
                        lib: d,
                        rfId: u,
                        nodeLookup: c,
                        connection: h,
                      } = y.getState();
                      if (!v || (!s && !i)) return;
                      if (!s) {
                        (r?.(t.nativeEvent, {
                          nodeId: v,
                          handleId: m,
                          handleType: e,
                        }),
                          y.setState({
                            connectionClickStartHandle: {
                              nodeId: v,
                              type: e,
                              id: m,
                            },
                          }));
                        return;
                      }
                      let p = nA(t.target),
                        f = n || l,
                        { connection: g, isValid: x } = rn.isValid(
                          t.nativeEvent,
                          {
                            handle: { nodeId: v, id: m, type: e },
                            connectionMode: o,
                            fromNodeId: s.nodeId,
                            fromHandleId: s.id || null,
                            fromType: s.type,
                            isValidConnection: f,
                            flowId: u,
                            doc: p,
                            lib: d,
                            nodeLookup: c,
                          },
                        );
                      x && g && T(g);
                      let b = structuredClone(h);
                      (delete b.inProgress,
                        (b.toPosition = b.toHandle
                          ? b.toHandle.position
                          : null),
                        a?.(t, b),
                        y.setState({ connectionClickStartHandle: null }));
                    }
                  : void 0,
                ref: f,
                ...p,
                children: l,
              });
            }),
          ),
          ix = {
            ArrowUp: { x: 0, y: -1 },
            ArrowDown: { x: 0, y: 1 },
            ArrowLeft: { x: -1, y: 0 },
            ArrowRight: { x: 1, y: 0 },
          },
          ib = {
            input: function ({
              data: e,
              isConnectable: t,
              sourcePosition: n = h.Bottom,
            }) {
              return (0, B.jsxs)(B.Fragment, {
                children: [
                  e?.label,
                  (0, B.jsx)(iv, {
                    type: "source",
                    position: n,
                    isConnectable: t,
                  }),
                ],
              });
            },
            default: function ({
              data: e,
              isConnectable: t,
              targetPosition: n = h.Top,
              sourcePosition: r = h.Bottom,
            }) {
              return (0, B.jsxs)(B.Fragment, {
                children: [
                  (0, B.jsx)(iv, {
                    type: "target",
                    position: n,
                    isConnectable: t,
                  }),
                  e?.label,
                  (0, B.jsx)(iv, {
                    type: "source",
                    position: r,
                    isConnectable: t,
                  }),
                ],
              });
            },
            output: function ({
              data: e,
              isConnectable: t,
              targetPosition: n = h.Top,
            }) {
              return (0, B.jsxs)(B.Fragment, {
                children: [
                  (0, B.jsx)(iv, {
                    type: "target",
                    position: n,
                    isConnectable: t,
                  }),
                  e?.label,
                ],
              });
            },
            group: function () {
              return null;
            },
          },
          i_ = (e) => {
            let {
              width: t,
              height: n,
              x: r,
              y: i,
            } = t6(e.nodeLookup, { filter: (e) => !!e.selected });
            return {
              width: nm(t) ? t : null,
              height: nm(n) ? n : null,
              userSelectionActive: e.userSelectionActive,
              transformString: `translate(${e.transform[0]}px,${e.transform[1]}px) scale(${e.transform[2]}) translate(${r}px,${i}px)`,
            };
          };
        function iw({
          onSelectionContextMenu: e,
          noPanClassName: t,
          disableKeyboardA11y: n,
        }) {
          let r = ry(),
            {
              width: i,
              height: a,
              transformString: s,
              userSelectionActive: o,
            } = rg(i_, rh),
            l = il(),
            d = (0, F.useRef)(null),
            u = !o && null !== i && null !== a;
          return (is({ nodeRef: d, disabled: !u }), u)
            ? (0, B.jsx)("div", {
                className: z([
                  "react-flow__nodesselection",
                  "react-flow__container",
                  t,
                ]),
                style: { transform: s },
                children: (0, B.jsx)("div", {
                  ref: d,
                  className: "react-flow__nodesselection-rect",
                  onContextMenu: e
                    ? (t) => {
                        e(
                          t,
                          r.getState().nodes.filter((e) => e.selected),
                        );
                      }
                    : void 0,
                  tabIndex: n ? void 0 : -1,
                  onKeyDown: n
                    ? void 0
                    : (e) => {
                        Object.prototype.hasOwnProperty.call(ix, e.key) &&
                          (e.preventDefault(),
                          l({
                            direction: ix[e.key],
                            factor: e.shiftKey ? 4 : 1,
                          }));
                      },
                  style: { width: i, height: a },
                }),
              })
            : null;
        }
        let iE = void 0,
          iN = (e) => ({
            nodesSelectionActive: e.nodesSelectionActive,
            userSelectionActive: e.userSelectionActive,
          });
        function iS({
          children: e,
          onPaneClick: t,
          onPaneMouseEnter: n,
          onPaneMouseMove: r,
          onPaneMouseLeave: i,
          onPaneContextMenu: a,
          onPaneScroll: s,
          paneClickDistance: o,
          deleteKeyCode: l,
          selectionKeyCode: d,
          selectionOnDrag: u,
          selectionMode: c,
          onSelectionStart: h,
          onSelectionEnd: p,
          multiSelectionKeyCode: f,
          panActivationKeyCode: m,
          zoomActivationKeyCode: g,
          elementsSelectable: y,
          zoomOnScroll: v,
          zoomOnPinch: x,
          panOnScroll: b,
          panOnScrollSpeed: _,
          panOnScrollMode: w,
          zoomOnDoubleClick: E,
          panOnDrag: N,
          autoPanOnSelection: S,
          defaultViewport: C,
          translateExtent: k,
          minZoom: A,
          maxZoom: T,
          preventScrolling: O,
          onSelectionContextMenu: j,
          noWheelClassName: I,
          noPanClassName: M,
          disableKeyboardA11y: R,
          onViewportChange: D,
          isControlledViewport: P,
        }) {
          let { nodesSelectionActive: $, userSelectionActive: L } = rg(iN, rh),
            F = rV(d, { target: iE }),
            z = rV(m, { target: iE }),
            V = z || N,
            H = z || b,
            Z = u && !0 !== V,
            U = F || L || Z;
          return (
            (function ({ deleteKeyCode: e, multiSelectionKeyCode: t }) {
              ry();
              let { deleteElements: n } = r4();
              (rV(e, { actInsideInputWithModifier: !1 }),
                rV(t, { target: r3 }));
            })({ deleteKeyCode: l, multiSelectionKeyCode: f }),
            (0, B.jsx)(r7, {
              onPaneContextMenu: a,
              elementsSelectable: y,
              zoomOnScroll: v,
              zoomOnPinch: x,
              panOnScroll: H,
              panOnScrollSpeed: _,
              panOnScrollMode: w,
              zoomOnDoubleClick: E,
              panOnDrag: !F && V,
              defaultViewport: C,
              translateExtent: k,
              minZoom: A,
              maxZoom: T,
              zoomActivationKeyCode: g,
              preventScrolling: O,
              noWheelClassName: I,
              noPanClassName: M,
              onViewportChange: D,
              isControlledViewport: P,
              paneClickDistance: o,
              selectionOnDrag: Z,
              children: (0, B.jsxs)(ii, {
                onSelectionStart: h,
                onSelectionEnd: p,
                onPaneClick: t,
                onPaneMouseEnter: n,
                onPaneMouseMove: r,
                onPaneMouseLeave: i,
                onPaneContextMenu: a,
                onPaneScroll: s,
                panOnDrag: V,
                autoPanOnSelection: S,
                isSelecting: !!U,
                selectionMode: c,
                selectionKeyPressed: F,
                paneClickDistance: o,
                selectionOnDrag: Z,
                children: [
                  e,
                  $ &&
                    (0, B.jsx)(iw, {
                      onSelectionContextMenu: j,
                      noPanClassName: M,
                      disableKeyboardA11y: R,
                    }),
                ],
              }),
            })
          );
        }
        iS.displayName = "FlowRenderer";
        let iC = (0, F.memo)(iS),
          ik = (e) => (t) =>
            e
              ? t9(
                  t.nodeLookup,
                  { x: 0, y: 0, width: t.width, height: t.height },
                  t.transform,
                  !0,
                ).map((e) => e.id)
              : Array.from(t.nodeLookup.keys()),
          iA = (e) => e.updateNodeInternals;
        var iT = (0, F.memo)(function ({
          id: e,
          onClick: t,
          onMouseEnter: n,
          onMouseMove: r,
          onMouseLeave: i,
          onContextMenu: a,
          onDoubleClick: s,
          nodesDraggable: o,
          elementsSelectable: l,
          nodesConnectable: d,
          nodesFocusable: u,
          resizeObserver: c,
          noDragClassName: h,
          noPanClassName: p,
          disableKeyboardA11y: f,
          rfId: m,
          nodeTypes: g,
          nodeClickDistance: y,
          onError: v,
        }) {
          let {
              node: x,
              internals: b,
              isParent: _,
            } = rg((t) => {
              let n = t.nodeLookup.get(e),
                r = t.parentLookup.has(e);
              return { node: n, internals: n.internals, isParent: r };
            }, rh),
            w = x.type || "default",
            E = g?.[w] || ib[w];
          void 0 === E &&
            (v?.("003", tW.error003(w)),
            (w = "default"),
            (E = g?.default || ib.default));
          let N = !!(x.draggable || (o && void 0 === x.draggable)),
            S = !!(x.selectable || (l && void 0 === x.selectable)),
            C = !!(x.connectable || (d && void 0 === x.connectable)),
            k = !!(x.focusable || (u && void 0 === x.focusable)),
            A = ry(),
            T = nS(x),
            O = (function ({
              node: e,
              nodeType: t,
              hasDimensions: n,
              resizeObserver: r,
            }) {
              ry();
              let i = (0, F.useRef)(null);
              return (
                (0, F.useRef)(null),
                (0, F.useRef)(e.sourcePosition),
                (0, F.useRef)(e.targetPosition),
                (0, F.useRef)(t),
                n && e.internals.handleBounds,
                i
              );
            })({ node: x, nodeType: w, hasDimensions: T, resizeObserver: c }),
            j = is({
              nodeRef: O,
              disabled: x.hidden || !N,
              noDragClassName: h,
              handleSelector: x.dragHandle,
              nodeId: e,
              isSelectable: S,
              nodeClickDistance: y,
            }),
            I = il();
          if (x.hidden) return null;
          let M = nN(x),
            R =
              void 0 === x.internals.handleBounds
                ? {
                    width: x.width ?? x.initialWidth ?? x.style?.width,
                    height: x.height ?? x.initialHeight ?? x.style?.height,
                  }
                : {
                    width: x.width ?? x.style?.width,
                    height: x.height ?? x.style?.height,
                  },
            D = S || N || t || n || r || i;
          return (0, B.jsx)("div", {
            className: z([
              "react-flow__node",
              `react-flow__node-${w}`,
              { [p]: N },
              x.className,
              {
                selected: x.selected,
                selectable: S,
                parent: _,
                draggable: N,
                dragging: j,
              },
            ]),
            ref: O,
            style: {
              zIndex: b.z,
              transform: `translate(${b.positionAbsolute.x}px,${b.positionAbsolute.y}px)`,
              pointerEvents: D ? "all" : "none",
              visibility: T ? "visible" : "hidden",
              ...x.style,
              ...R,
            },
            "data-id": e,
            "data-testid": `rf__node-${e}`,
            onMouseEnter: n ? (e) => n(e, { ...b.userNode }) : void 0,
            onMouseMove: r ? (e) => r(e, { ...b.userNode }) : void 0,
            onMouseLeave: i ? (e) => i(e, { ...b.userNode }) : void 0,
            onContextMenu: a ? (e) => a(e, { ...b.userNode }) : void 0,
            onClick: (n) => {
              let { selectNodesOnDrag: r, nodeDragThreshold: i } = A.getState();
              (S && (!r || !N || i > 0) && ia({ id: e, store: A, nodeRef: O }),
                t && t(n, { ...b.userNode }));
            },
            onDoubleClick: s ? (e) => s(e, { ...b.userNode }) : void 0,
            onKeyDown: k
              ? (t) => {
                  if (
                    !(function (e) {
                      let t = e.composedPath?.()?.[0] || e.target;
                      return (
                        t?.nodeType === 1 &&
                        (nT.includes(t.nodeName) ||
                          t.hasAttribute("contenteditable") ||
                          !!t.closest(".nokey"))
                      );
                    })(t.nativeEvent) &&
                    !f
                  ) {
                    if (tK.includes(t.key) && S)
                      ia({
                        id: e,
                        store: A,
                        unselect: "Escape" === t.key,
                        nodeRef: O,
                      });
                    else if (
                      N &&
                      x.selected &&
                      Object.prototype.hasOwnProperty.call(ix, t.key)
                    ) {
                      t.preventDefault();
                      let { ariaLabelConfig: e } = A.getState();
                      (A.setState({
                        ariaLiveMessage: e[
                          "node.a11yDescription.ariaLiveMessage"
                        ]({
                          direction: t.key.replace("Arrow", "").toLowerCase(),
                          x: ~~b.positionAbsolute.x,
                          y: ~~b.positionAbsolute.y,
                        }),
                      }),
                        I({
                          direction: ix[t.key],
                          factor: t.shiftKey ? 4 : 1,
                        }));
                    }
                  }
                }
              : void 0,
            tabIndex: k ? 0 : void 0,
            onFocus: k
              ? () => {
                  if (f || !O.current?.matches(":focus-visible")) return;
                  let {
                    transform: t,
                    width: n,
                    height: r,
                    autoPanOnNodeFocus: i,
                    setCenter: a,
                  } = A.getState();
                  i &&
                    (t9(
                      new Map([[e, x]]),
                      { x: 0, y: 0, width: n, height: r },
                      t,
                      !0,
                    ).length > 0 ||
                      a(
                        x.position.x + M.width / 2,
                        x.position.y + M.height / 2,
                        { zoom: t[2] },
                      ));
                }
              : void 0,
            role: x.ariaRole ?? (k ? "group" : void 0),
            "aria-roledescription": "node",
            "aria-describedby": f ? void 0 : `${rb}-${m}`,
            "aria-label": x.ariaLabel,
            ...x.domAttributes,
            children: (0, B.jsx)(iu, {
              value: e,
              children: (0, B.jsx)(E, {
                id: e,
                data: x.data,
                type: w,
                positionAbsoluteX: b.positionAbsolute.x,
                positionAbsoluteY: b.positionAbsolute.y,
                selected: x.selected ?? !1,
                selectable: S,
                draggable: N,
                deletable: x.deletable ?? !0,
                isConnectable: C,
                sourcePosition: x.sourcePosition,
                targetPosition: x.targetPosition,
                dragging: j,
                dragHandle: x.dragHandle,
                zIndex: b.z,
                parentId: x.parentId,
                ...M,
              }),
            }),
          });
        });
        let iO = (e) => ({
          nodesDraggable: e.nodesDraggable,
          nodesConnectable: e.nodesConnectable,
          nodesFocusable: e.nodesFocusable,
          elementsSelectable: e.elementsSelectable,
          onError: e.onError,
        });
        function ij(e) {
          var t;
          let {
              nodesDraggable: n,
              nodesConnectable: r,
              nodesFocusable: i,
              elementsSelectable: a,
              onError: s,
            } = rg(iO, rh),
            o =
              ((t = e.onlyRenderVisibleElements),
              rg((0, F.useCallback)(ik(t), [t]), rh)),
            l = (function () {
              let e = rg(iA),
                [t] = (0, F.useState)(() =>
                  "undefined" == typeof ResizeObserver
                    ? null
                    : new ResizeObserver((t) => {
                        let n = new Map();
                        (t.forEach((e) => {
                          let t = e.target.getAttribute("data-id");
                          n.set(t, { id: t, nodeElement: e.target, force: !0 });
                        }),
                          e(n));
                      }),
                );
              return t;
            })();
          return (0, B.jsx)("div", {
            className: "react-flow__nodes",
            style: r6,
            children: o.map((t) =>
              (0, B.jsx)(
                iT,
                {
                  id: t,
                  nodeTypes: e.nodeTypes,
                  nodeExtent: e.nodeExtent,
                  onClick: e.onNodeClick,
                  onMouseEnter: e.onNodeMouseEnter,
                  onMouseMove: e.onNodeMouseMove,
                  onMouseLeave: e.onNodeMouseLeave,
                  onContextMenu: e.onNodeContextMenu,
                  onDoubleClick: e.onNodeDoubleClick,
                  noDragClassName: e.noDragClassName,
                  noPanClassName: e.noPanClassName,
                  rfId: e.rfId,
                  disableKeyboardA11y: e.disableKeyboardA11y,
                  resizeObserver: l,
                  nodesDraggable: n,
                  nodesConnectable: r,
                  nodesFocusable: i,
                  elementsSelectable: a,
                  nodeClickDistance: e.nodeClickDistance,
                  onError: s,
                },
                t,
              ),
            ),
          });
        }
        ij.displayName = "NodeRenderer";
        let iI = (0, F.memo)(ij),
          iM = {
            [c.Arrow]: ({ color: e = "none", strokeWidth: t = 1 }) => {
              let n = { strokeWidth: t, ...(e && { stroke: e }) };
              return (0, B.jsx)("polyline", {
                className: "arrow",
                style: n,
                strokeLinecap: "round",
                fill: "none",
                strokeLinejoin: "round",
                points: "-5,-4 0,0 -5,4",
              });
            },
            [c.ArrowClosed]: ({ color: e = "none", strokeWidth: t = 1 }) => {
              let n = { strokeWidth: t, ...(e && { stroke: e, fill: e }) };
              return (0, B.jsx)("polyline", {
                className: "arrowclosed",
                style: n,
                strokeLinecap: "round",
                strokeLinejoin: "round",
                points: "-5,-4 0,0 -5,4 -5,-4",
              });
            },
          },
          iR = ({
            id: e,
            type: t,
            color: n,
            width: r = 12.5,
            height: i = 12.5,
            markerUnits: a = "strokeWidth",
            strokeWidth: s,
            orient: o = "auto-start-reverse",
          }) => {
            let l = (function (e) {
              let t = ry();
              return (0, F.useMemo)(
                () =>
                  Object.prototype.hasOwnProperty.call(iM, e)
                    ? iM[e]
                    : (t.getState().onError?.("009", tW.error009(e)), null),
                [e],
              );
            })(t);
            return l
              ? (0, B.jsx)("marker", {
                  className: "react-flow__arrowhead",
                  id: e,
                  markerWidth: `${r}`,
                  markerHeight: `${i}`,
                  viewBox: "-10 -10 20 20",
                  markerUnits: a,
                  orient: o,
                  refX: "0",
                  refY: "0",
                  children: (0, B.jsx)(l, { color: n, strokeWidth: s }),
                })
              : null;
          },
          iD = ({ defaultColor: e, rfId: t }) => {
            let n = rg((e) => e.edges),
              r = rg((e) => e.defaultEdgeOptions),
              i = (0, F.useMemo)(
                () =>
                  (function (
                    e,
                    {
                      id: t,
                      defaultColor: n,
                      defaultMarkerStart: r,
                      defaultMarkerEnd: i,
                    },
                  ) {
                    let a = new Set();
                    return e
                      .reduce(
                        (e, s) => (
                          [s.markerStart || r, s.markerEnd || i].forEach(
                            (r) => {
                              if (r && "object" == typeof r) {
                                let i = nK(r, t);
                                a.has(i) ||
                                  (e.push({ id: i, color: r.color || n, ...r }),
                                  a.add(i));
                              }
                            },
                          ),
                          e
                        ),
                        [],
                      )
                      .sort((e, t) => e.id.localeCompare(t.id));
                  })(n, {
                    id: t,
                    defaultColor: e,
                    defaultMarkerStart: r?.markerStart,
                    defaultMarkerEnd: r?.markerEnd,
                  }),
                [n, r, t, e],
              );
            return i.length
              ? (0, B.jsx)("svg", {
                  className: "react-flow__marker",
                  "aria-hidden": "true",
                  children: (0, B.jsx)("defs", {
                    children: i.map((e) =>
                      (0, B.jsx)(
                        iR,
                        {
                          id: e.id,
                          type: e.type,
                          color: e.color,
                          width: e.width,
                          height: e.height,
                          markerUnits: e.markerUnits,
                          strokeWidth: e.strokeWidth,
                          orient: e.orient,
                        },
                        e.id,
                      ),
                    ),
                  }),
                })
              : null;
          };
        iD.displayName = "MarkerDefinitions";
        var iP = (0, F.memo)(iD);
        function i$({
          x: e,
          y: t,
          label: n,
          labelStyle: r,
          labelShowBg: i = !0,
          labelBgStyle: a,
          labelBgPadding: s = [2, 4],
          labelBgBorderRadius: o = 2,
          children: l,
          className: d,
          ...u
        }) {
          let [c, h] = (0, F.useState)({ x: 1, y: 0, width: 0, height: 0 }),
            p = z(["react-flow__edge-textwrapper", d]),
            f = (0, F.useRef)(null);
          return n
            ? (0, B.jsxs)("g", {
                transform: `translate(${e - c.width / 2} ${t - c.height / 2})`,
                className: p,
                visibility: c.width ? "visible" : "hidden",
                ...u,
                children: [
                  i &&
                    (0, B.jsx)("rect", {
                      width: c.width + 2 * s[0],
                      x: -s[0],
                      y: -s[1],
                      height: c.height + 2 * s[1],
                      className: "react-flow__edge-textbg",
                      style: a,
                      rx: o,
                      ry: o,
                    }),
                  (0, B.jsx)("text", {
                    className: "react-flow__edge-text",
                    y: c.height / 2,
                    dy: "0.3em",
                    ref: f,
                    style: r,
                    children: n,
                  }),
                  l,
                ],
              })
            : null;
        }
        i$.displayName = "EdgeText";
        let iL = (0, F.memo)(i$);
        function iB({
          path: e,
          labelX: t,
          labelY: n,
          label: r,
          labelStyle: i,
          labelShowBg: a,
          labelBgStyle: s,
          labelBgPadding: o,
          labelBgBorderRadius: l,
          interactionWidth: d = 20,
          ...u
        }) {
          return (0, B.jsxs)(B.Fragment, {
            children: [
              (0, B.jsx)("path", {
                ...u,
                d: e,
                fill: "none",
                className: z(["react-flow__edge-path", u.className]),
              }),
              d
                ? (0, B.jsx)("path", {
                    d: e,
                    fill: "none",
                    strokeOpacity: 0,
                    strokeWidth: d,
                    className: "react-flow__edge-interaction",
                  })
                : null,
              r && nm(t) && nm(n)
                ? (0, B.jsx)(iL, {
                    x: t,
                    y: n,
                    label: r,
                    labelStyle: i,
                    labelShowBg: a,
                    labelBgStyle: s,
                    labelBgPadding: o,
                    labelBgBorderRadius: l,
                  })
                : null,
            ],
          });
        }
        function iF({ pos: e, x1: t, y1: n, x2: r, y2: i }) {
          return e === h.Left || e === h.Right
            ? [0.5 * (t + r), n]
            : [t, 0.5 * (n + i)];
        }
        function iz({
          sourceX: e,
          sourceY: t,
          sourcePosition: n = h.Bottom,
          targetX: r,
          targetY: i,
          targetPosition: a = h.Top,
        }) {
          let [s, o] = iF({ pos: n, x1: e, y1: t, x2: r, y2: i }),
            [l, d] = iF({ pos: a, x1: r, y1: i, x2: e, y2: t }),
            [u, c, p, f] = nM({
              sourceX: e,
              sourceY: t,
              targetX: r,
              targetY: i,
              sourceControlX: s,
              sourceControlY: o,
              targetControlX: l,
              targetControlY: d,
            });
          return [`M${e},${t} C${s},${o} ${l},${d} ${r},${i}`, u, c, p, f];
        }
        function iV(e) {
          return (0, F.memo)(
            ({
              id: t,
              sourceX: n,
              sourceY: r,
              targetX: i,
              targetY: a,
              sourcePosition: s,
              targetPosition: o,
              label: l,
              labelStyle: d,
              labelShowBg: u,
              labelBgStyle: c,
              labelBgPadding: h,
              labelBgBorderRadius: p,
              style: f,
              markerEnd: m,
              markerStart: g,
              interactionWidth: y,
            }) => {
              let [v, x, b] = iz({
                  sourceX: n,
                  sourceY: r,
                  sourcePosition: s,
                  targetX: i,
                  targetY: a,
                  targetPosition: o,
                }),
                _ = e.isInternal ? void 0 : t;
              return (0, B.jsx)(iB, {
                id: _,
                path: v,
                labelX: x,
                labelY: b,
                label: l,
                labelStyle: d,
                labelShowBg: u,
                labelBgStyle: c,
                labelBgPadding: h,
                labelBgBorderRadius: p,
                style: f,
                markerEnd: m,
                markerStart: g,
                interactionWidth: y,
              });
            },
          );
        }
        let iH = iV({ isInternal: !1 }),
          iZ = iV({ isInternal: !0 });
        function iU(e) {
          return (0, F.memo)(
            ({
              id: t,
              sourceX: n,
              sourceY: r,
              targetX: i,
              targetY: a,
              label: s,
              labelStyle: o,
              labelShowBg: l,
              labelBgStyle: d,
              labelBgPadding: u,
              labelBgBorderRadius: c,
              style: p,
              sourcePosition: f = h.Bottom,
              targetPosition: m = h.Top,
              markerEnd: g,
              markerStart: y,
              pathOptions: v,
              interactionWidth: x,
            }) => {
              let [b, _, w] = nU({
                  sourceX: n,
                  sourceY: r,
                  sourcePosition: f,
                  targetX: i,
                  targetY: a,
                  targetPosition: m,
                  borderRadius: v?.borderRadius,
                  offset: v?.offset,
                  stepPosition: v?.stepPosition,
                }),
                E = e.isInternal ? void 0 : t;
              return (0, B.jsx)(iB, {
                id: E,
                path: b,
                labelX: _,
                labelY: w,
                label: s,
                labelStyle: o,
                labelShowBg: l,
                labelBgStyle: d,
                labelBgPadding: u,
                labelBgBorderRadius: c,
                style: p,
                markerEnd: g,
                markerStart: y,
                interactionWidth: x,
              });
            },
          );
        }
        ((iH.displayName = "SimpleBezierEdge"),
          (iZ.displayName = "SimpleBezierEdgeInternal"));
        let iG = iU({ isInternal: !1 }),
          iq = iU({ isInternal: !0 });
        function iW(e) {
          return (0, F.memo)(({ id: t, ...n }) => {
            let r = e.isInternal ? void 0 : t;
            return (0, B.jsx)(iG, {
              ...n,
              id: r,
              pathOptions: (0, F.useMemo)(
                () => ({ borderRadius: 0, offset: n.pathOptions?.offset }),
                [n.pathOptions?.offset],
              ),
            });
          });
        }
        ((iG.displayName = "SmoothStepEdge"),
          (iq.displayName = "SmoothStepEdgeInternal"));
        let iY = iW({ isInternal: !1 }),
          iK = iW({ isInternal: !0 });
        function iX(e) {
          return (0, F.memo)(
            ({
              id: t,
              sourceX: n,
              sourceY: r,
              targetX: i,
              targetY: a,
              label: s,
              labelStyle: o,
              labelShowBg: l,
              labelBgStyle: d,
              labelBgPadding: u,
              labelBgBorderRadius: c,
              style: h,
              markerEnd: p,
              markerStart: f,
              interactionWidth: m,
            }) => {
              let [g, y, v] = nz({
                  sourceX: n,
                  sourceY: r,
                  targetX: i,
                  targetY: a,
                }),
                x = e.isInternal ? void 0 : t;
              return (0, B.jsx)(iB, {
                id: x,
                path: g,
                labelX: y,
                labelY: v,
                label: s,
                labelStyle: o,
                labelShowBg: l,
                labelBgStyle: d,
                labelBgPadding: u,
                labelBgBorderRadius: c,
                style: h,
                markerEnd: p,
                markerStart: f,
                interactionWidth: m,
              });
            },
          );
        }
        ((iY.displayName = "StepEdge"), (iK.displayName = "StepEdgeInternal"));
        let iQ = iX({ isInternal: !1 }),
          iJ = iX({ isInternal: !0 });
        function i0(e) {
          return (0, F.memo)(
            ({
              id: t,
              sourceX: n,
              sourceY: r,
              targetX: i,
              targetY: a,
              sourcePosition: s = h.Bottom,
              targetPosition: o = h.Top,
              label: l,
              labelStyle: d,
              labelShowBg: u,
              labelBgStyle: c,
              labelBgPadding: p,
              labelBgBorderRadius: f,
              style: m,
              markerEnd: g,
              markerStart: y,
              pathOptions: v,
              interactionWidth: x,
            }) => {
              let [b, _, w] = nP({
                  sourceX: n,
                  sourceY: r,
                  sourcePosition: s,
                  targetX: i,
                  targetY: a,
                  targetPosition: o,
                  curvature: v?.curvature,
                }),
                E = e.isInternal ? void 0 : t;
              return (0, B.jsx)(iB, {
                id: E,
                path: b,
                labelX: _,
                labelY: w,
                label: l,
                labelStyle: d,
                labelShowBg: u,
                labelBgStyle: c,
                labelBgPadding: p,
                labelBgBorderRadius: f,
                style: m,
                markerEnd: g,
                markerStart: y,
                interactionWidth: x,
              });
            },
          );
        }
        ((iQ.displayName = "StraightEdge"),
          (iJ.displayName = "StraightEdgeInternal"));
        let i1 = i0({ isInternal: !1 }),
          i2 = i0({ isInternal: !0 });
        ((i1.displayName = "BezierEdge"),
          (i2.displayName = "BezierEdgeInternal"));
        let i5 = {
            default: i2,
            straight: iJ,
            step: iK,
            smoothstep: iq,
            simplebezier: iZ,
          },
          i4 = {
            sourceX: null,
            sourceY: null,
            targetX: null,
            targetY: null,
            sourcePosition: null,
            targetPosition: null,
            zIndex: void 0,
          },
          i3 = (e, t, n) => (n === h.Left ? e - t : n === h.Right ? e + t : e),
          i6 = (e, t, n) => (n === h.Top ? e - t : n === h.Bottom ? e + t : e),
          i9 = "react-flow__edgeupdater";
        function i7({
          position: e,
          centerX: t,
          centerY: n,
          radius: r = 10,
          onMouseDown: i,
          onMouseEnter: a,
          onMouseOut: s,
          type: o,
        }) {
          return (0, B.jsx)("circle", {
            onMouseDown: i,
            onMouseEnter: a,
            onMouseOut: s,
            className: z([i9, `${i9}-${o}`]),
            cx: i3(t, r, e),
            cy: i6(n, r, e),
            r: r,
            stroke: "transparent",
            fill: "transparent",
          });
        }
        function i8({
          isReconnectable: e,
          reconnectRadius: t,
          edge: n,
          sourceX: r,
          sourceY: i,
          targetX: a,
          targetY: s,
          sourcePosition: o,
          targetPosition: l,
          onReconnect: d,
          onReconnectStart: u,
          onReconnectEnd: c,
          setReconnecting: h,
          setUpdateHover: p,
        }) {
          let f = ry(),
            m = (e, t) => {
              if (0 !== e.button) return;
              let {
                  autoPanOnConnect: r,
                  domNode: i,
                  connectionMode: a,
                  connectionRadius: s,
                  lib: o,
                  onConnectStart: l,
                  cancelConnection: p,
                  nodeLookup: m,
                  rfId: g,
                  panBy: y,
                  updateConnection: v,
                } = f.getState(),
                x = "target" === t.type;
              rn.onPointerDown(e.nativeEvent, {
                autoPanOnConnect: r,
                connectionMode: a,
                connectionRadius: s,
                domNode: i,
                handleId: t.id,
                nodeId: t.nodeId,
                nodeLookup: m,
                isTarget: x,
                edgeUpdaterType: t.type,
                lib: o,
                flowId: g,
                cancelConnection: p,
                panBy: y,
                isValidConnection: (...e) =>
                  f.getState().isValidConnection?.(...e) ?? !0,
                onConnect: (e) => d?.(n, e),
                onConnectStart: (r, i) => {
                  (h(!0), u?.(e, n, t.type), l?.(r, i));
                },
                onConnectEnd: (...e) => f.getState().onConnectEnd?.(...e),
                onReconnectEnd: (e, r) => {
                  (h(!1), c?.(e, n, t.type, r));
                },
                updateConnection: v,
                getTransform: () => f.getState().transform,
                getFromHandle: () => f.getState().connection.fromHandle,
                dragThreshold: f.getState().connectionDragThreshold,
                handleDomNode: e.currentTarget,
              });
            },
            g = () => p(!0),
            y = () => p(!1);
          return (0, B.jsxs)(B.Fragment, {
            children: [
              (!0 === e || "source" === e) &&
                (0, B.jsx)(i7, {
                  position: o,
                  centerX: r,
                  centerY: i,
                  radius: t,
                  onMouseDown: (e) =>
                    m(e, {
                      nodeId: n.target,
                      id: n.targetHandle ?? null,
                      type: "target",
                    }),
                  onMouseEnter: g,
                  onMouseOut: y,
                  type: "source",
                }),
              (!0 === e || "target" === e) &&
                (0, B.jsx)(i7, {
                  position: l,
                  centerX: a,
                  centerY: s,
                  radius: t,
                  onMouseDown: (e) =>
                    m(e, {
                      nodeId: n.source,
                      id: n.sourceHandle ?? null,
                      type: "source",
                    }),
                  onMouseEnter: g,
                  onMouseOut: y,
                  type: "target",
                }),
            ],
          });
        }
        var ae = (0, F.memo)(function ({
          id: e,
          edgesFocusable: t,
          edgesReconnectable: n,
          elementsSelectable: r,
          onClick: i,
          onDoubleClick: a,
          onContextMenu: s,
          onMouseEnter: l,
          onMouseMove: d,
          onMouseLeave: u,
          reconnectRadius: c,
          onReconnect: p,
          onReconnectStart: f,
          onReconnectEnd: m,
          rfId: g,
          edgeTypes: y,
          noPanClassName: v,
          onError: x,
          disableKeyboardA11y: b,
        }) {
          let _ = rg((t) => t.edgeLookup.get(e)),
            w = rg((e) => e.defaultEdgeOptions),
            E = (_ = w ? { ...w, ..._ } : _).type || "default",
            N = y?.[E] || i5[E];
          void 0 === N &&
            (x?.("011", tW.error011(E)),
            (E = "default"),
            (N = y?.default || i5.default));
          let S = !!(_.focusable || (t && void 0 === _.focusable)),
            C =
              void 0 !== p &&
              (_.reconnectable || (n && void 0 === _.reconnectable)),
            k = !!(_.selectable || (r && void 0 === _.selectable)),
            A = (0, F.useRef)(null),
            [T, O] = (0, F.useState)(!1),
            [j, I] = (0, F.useState)(!1),
            M = ry(),
            {
              zIndex: R = _.zIndex,
              sourceX: D,
              sourceY: P,
              targetX: $,
              targetY: L,
              sourcePosition: V,
              targetPosition: H,
            } = rg(
              (0, F.useCallback)(
                (t) => {
                  let n = t.nodeLookup.get(_.source),
                    r = t.nodeLookup.get(_.target);
                  if (!n || !r) return i4;
                  let i = (function (e) {
                      let { sourceNode: t, targetNode: n } = e;
                      if (!nG(t) || !nG(n)) return null;
                      let r = t.internals.handleBounds || nq(t.handles),
                        i = n.internals.handleBounds || nq(n.handles),
                        a = nY(r?.source ?? [], e.sourceHandle),
                        s = nY(
                          e.connectionMode === o.Strict
                            ? (i?.target ?? [])
                            : (i?.target ?? []).concat(i?.source ?? []),
                          e.targetHandle,
                        );
                      if (!a || !s)
                        return (
                          e.onError?.(
                            "008",
                            tW.error008(a ? "target" : "source", {
                              id: e.id,
                              sourceHandle: e.sourceHandle,
                              targetHandle: e.targetHandle,
                            }),
                          ),
                          null
                        );
                      let l = a?.position || h.Bottom,
                        d = s?.position || h.Top,
                        u = nW(t, a, l),
                        c = nW(n, s, d);
                      return {
                        sourceX: u.x,
                        sourceY: u.y,
                        targetX: c.x,
                        targetY: c.y,
                        sourcePosition: l,
                        targetPosition: d,
                      };
                    })({
                      id: e,
                      sourceNode: n,
                      targetNode: r,
                      sourceHandle: _.sourceHandle || null,
                      targetHandle: _.targetHandle || null,
                      connectionMode: t.connectionMode,
                      onError: x,
                    }),
                    a = (function ({
                      sourceNode: e,
                      targetNode: t,
                      selected: n = !1,
                      zIndex: r = 0,
                      elevateOnSelect: i = !1,
                      zIndexMode: a = "basic",
                    }) {
                      if ("manual" === a) return r;
                      let s = Math.max(
                        e.parentId || (i && e.selected) ? e.internals.z : 0,
                        t.parentId || (i && t.selected) ? t.internals.z : 0,
                      );
                      return (i && n ? r + 1e3 : r) + s;
                    })({
                      selected: _.selected,
                      zIndex: _.zIndex,
                      sourceNode: n,
                      targetNode: r,
                      elevateOnSelect: t.elevateEdgesOnSelect,
                      zIndexMode: t.zIndexMode,
                    });
                  return { ...(i || i4), zIndex: a };
                },
                [
                  _.source,
                  _.target,
                  _.sourceHandle,
                  _.targetHandle,
                  _.selected,
                  _.zIndex,
                ],
              ),
              rh,
            ),
            Z = (0, F.useMemo)(
              () =>
                _.markerStart ? `url('#${nK(_.markerStart, g)}')` : void 0,
              [_.markerStart, g],
            ),
            U = (0, F.useMemo)(
              () => (_.markerEnd ? `url('#${nK(_.markerEnd, g)}')` : void 0),
              [_.markerEnd, g],
            );
          if (_.hidden || null === D || null === P || null === $ || null === L)
            return null;
          let G = a
              ? (e) => {
                  a(e, { ..._ });
                }
              : void 0,
            q = s
              ? (e) => {
                  s(e, { ..._ });
                }
              : void 0,
            W = l
              ? (e) => {
                  l(e, { ..._ });
                }
              : void 0,
            Y = d
              ? (e) => {
                  d(e, { ..._ });
                }
              : void 0,
            K = u
              ? (e) => {
                  u(e, { ..._ });
                }
              : void 0;
          return (0, B.jsx)("svg", {
            style: { zIndex: R },
            children: (0, B.jsxs)("g", {
              className: z([
                "react-flow__edge",
                `react-flow__edge-${E}`,
                _.className,
                v,
                {
                  selected: _.selected,
                  animated: _.animated,
                  inactive: !k && !i,
                  updating: T,
                  selectable: k,
                },
              ]),
              onClick: (t) => {
                let {
                  addSelectedEdges: n,
                  unselectNodesAndEdges: r,
                  multiSelectionActive: a,
                } = M.getState();
                (k &&
                  (M.setState({ nodesSelectionActive: !1 }),
                  _.selected && a
                    ? (r({ nodes: [], edges: [_] }), A.current?.blur())
                    : n([e])),
                  i && i(t, _));
              },
              onDoubleClick: G,
              onContextMenu: q,
              onMouseEnter: W,
              onMouseMove: Y,
              onMouseLeave: K,
              onKeyDown: S
                ? (t) => {
                    if (!b && tK.includes(t.key) && k) {
                      let { unselectNodesAndEdges: n, addSelectedEdges: r } =
                        M.getState();
                      "Escape" === t.key
                        ? (A.current?.blur(), n({ edges: [_] }))
                        : r([e]);
                    }
                  }
                : void 0,
              tabIndex: S ? 0 : void 0,
              role: _.ariaRole ?? (S ? "group" : "img"),
              "aria-roledescription": "edge",
              "data-id": e,
              "data-testid": `rf__edge-${e}`,
              "aria-label":
                null === _.ariaLabel
                  ? void 0
                  : _.ariaLabel || `Edge from ${_.source} to ${_.target}`,
              "aria-describedby": S ? `${r_}-${g}` : void 0,
              ref: A,
              ..._.domAttributes,
              children: [
                !j &&
                  (0, B.jsx)(N, {
                    id: e,
                    source: _.source,
                    target: _.target,
                    type: _.type,
                    selected: _.selected,
                    animated: _.animated,
                    selectable: k,
                    deletable: _.deletable ?? !0,
                    label: _.label,
                    labelStyle: _.labelStyle,
                    labelShowBg: _.labelShowBg,
                    labelBgStyle: _.labelBgStyle,
                    labelBgPadding: _.labelBgPadding,
                    labelBgBorderRadius: _.labelBgBorderRadius,
                    sourceX: D,
                    sourceY: P,
                    targetX: $,
                    targetY: L,
                    sourcePosition: V,
                    targetPosition: H,
                    data: _.data,
                    style: _.style,
                    sourceHandleId: _.sourceHandle,
                    targetHandleId: _.targetHandle,
                    markerStart: Z,
                    markerEnd: U,
                    pathOptions: "pathOptions" in _ ? _.pathOptions : void 0,
                    interactionWidth: _.interactionWidth,
                  }),
                C &&
                  (0, B.jsx)(i8, {
                    edge: _,
                    isReconnectable: C,
                    reconnectRadius: c,
                    onReconnect: p,
                    onReconnectStart: f,
                    onReconnectEnd: m,
                    sourceX: D,
                    sourceY: P,
                    targetX: $,
                    targetY: L,
                    sourcePosition: V,
                    targetPosition: H,
                    setUpdateHover: O,
                    setReconnecting: I,
                  }),
              ],
            }),
          });
        });
        let at = (e) => ({
          edgesFocusable: e.edgesFocusable,
          edgesReconnectable: e.edgesReconnectable,
          elementsSelectable: e.elementsSelectable,
          connectionMode: e.connectionMode,
          onError: e.onError,
        });
        function an({
          defaultMarkerColor: e,
          onlyRenderVisibleElements: t,
          rfId: n,
          edgeTypes: r,
          noPanClassName: i,
          onReconnect: a,
          onEdgeContextMenu: s,
          onEdgeMouseEnter: o,
          onEdgeMouseMove: l,
          onEdgeMouseLeave: d,
          onEdgeClick: u,
          reconnectRadius: c,
          onEdgeDoubleClick: h,
          onReconnectStart: p,
          onReconnectEnd: f,
          disableKeyboardA11y: m,
        }) {
          let {
              edgesFocusable: g,
              edgesReconnectable: y,
              elementsSelectable: v,
              onError: x,
            } = rg(at, rh),
            b = rg(
              (0, F.useCallback)(
                (e) => {
                  if (!t) return e.edges.map((e) => e.id);
                  let n = [];
                  if (e.width && e.height)
                    for (let t of e.edges) {
                      let r = e.nodeLookup.get(t.source),
                        i = e.nodeLookup.get(t.target);
                      r &&
                        i &&
                        (function ({
                          sourceNode: e,
                          targetNode: t,
                          width: n,
                          height: r,
                          transform: i,
                        }) {
                          let a = ns(nu(e), nu(t));
                          return (
                            a.x === a.x2 && (a.x2 += 1),
                            a.y === a.y2 && (a.y2 += 1),
                            np(
                              {
                                x: -i[0] / i[2],
                                y: -i[1] / i[2],
                                width: n / i[2],
                                height: r / i[2],
                              },
                              nl(a),
                            ) > 0
                          );
                        })({
                          sourceNode: r,
                          targetNode: i,
                          width: e.width,
                          height: e.height,
                          transform: e.transform,
                        }) &&
                        n.push(t.id);
                    }
                  return n;
                },
                [t],
              ),
              rh,
            );
          return (0, B.jsxs)("div", {
            className: "react-flow__edges",
            children: [
              (0, B.jsx)(iP, { defaultColor: e, rfId: n }),
              b.map((e) =>
                (0, B.jsx)(
                  ae,
                  {
                    id: e,
                    edgesFocusable: g,
                    edgesReconnectable: y,
                    elementsSelectable: v,
                    noPanClassName: i,
                    onReconnect: a,
                    onContextMenu: s,
                    onMouseEnter: o,
                    onMouseMove: l,
                    onMouseLeave: d,
                    onClick: u,
                    reconnectRadius: c,
                    onDoubleClick: h,
                    onReconnectStart: p,
                    onReconnectEnd: f,
                    rfId: n,
                    onError: x,
                    edgeTypes: r,
                    disableKeyboardA11y: m,
                  },
                  e,
                ),
              ),
            ],
          });
        }
        an.displayName = "EdgeRenderer";
        let ar = (0, F.memo)(an),
          ai = (e) =>
            `translate(${e.transform[0]}px,${e.transform[1]}px) scale(${e.transform[2]})`;
        function aa({ children: e }) {
          let t = rg(ai);
          return (0, B.jsx)("div", {
            className:
              "react-flow__viewport xyflow__viewport react-flow__container",
            style: { transform: t },
            children: e,
          });
        }
        let as = (e) => e.panZoom?.syncViewport;
        function ao(e) {
          return e.connection.inProgress
            ? { ...e.connection, to: nv(e.connection.to, e.transform) }
            : { ...e.connection };
        }
        let al = (e) => ({
          nodesConnectable: e.nodesConnectable,
          isValid: e.connection.isValid,
          inProgress: e.connection.inProgress,
          width: e.width,
          height: e.height,
        });
        function ad({ containerStyle: e, style: t, type: n, component: r }) {
          let {
            nodesConnectable: i,
            width: a,
            height: s,
            isValid: o,
            inProgress: l,
          } = rg(al, rh);
          return a && i && l
            ? (0, B.jsx)("svg", {
                style: e,
                width: a,
                height: s,
                className: "react-flow__connectionline react-flow__container",
                children: (0, B.jsx)("g", {
                  className: z(["react-flow__connection", t0(o)]),
                  children: (0, B.jsx)(au, {
                    style: t,
                    type: n,
                    CustomComponent: r,
                    isValid: o,
                  }),
                }),
              })
            : null;
        }
        let au = ({
          style: e,
          type: t = u.Bezier,
          CustomComponent: n,
          isValid: r,
        }) => {
          var i;
          let {
            inProgress: a,
            from: s,
            fromNode: o,
            fromHandle: l,
            fromPosition: d,
            to: c,
            toNode: h,
            toHandle: p,
            toPosition: f,
            pointer: m,
          } = rg(ao, rh);
          if (!a) return;
          if (n)
            return (0, B.jsx)(n, {
              connectionLineType: t,
              connectionLineStyle: e,
              fromNode: o,
              fromHandle: l,
              fromX: s.x,
              fromY: s.y,
              toX: c.x,
              toY: c.y,
              fromPosition: d,
              toPosition: f,
              connectionStatus: t0(r),
              toNode: h,
              toHandle: p,
              pointer: m,
            });
          let g = "",
            y = {
              sourceX: s.x,
              sourceY: s.y,
              sourcePosition: d,
              targetX: c.x,
              targetY: c.y,
              targetPosition: f,
            };
          switch (t) {
            case u.Bezier:
              [g] = nP(y);
              break;
            case u.SimpleBezier:
              [g] = iz(y);
              break;
            case u.Step:
              [g] = nU({ ...y, borderRadius: 0 });
              break;
            case u.SmoothStep:
              [g] = nU(y);
              break;
            default:
              [g] = nz(y);
          }
          return (0, B.jsx)("path", {
            d: g,
            fill: "none",
            className: "react-flow__connection-path",
            style: e,
          });
        };
        au.displayName = "ConnectionLine";
        let ac = {};
        function ah(e = ac) {
          ((0, F.useRef)(e), ry());
        }
        function ap({
          nodeTypes: e,
          edgeTypes: t,
          onInit: n,
          onNodeClick: r,
          onEdgeClick: i,
          onNodeDoubleClick: a,
          onEdgeDoubleClick: s,
          onNodeMouseEnter: o,
          onNodeMouseMove: l,
          onNodeMouseLeave: d,
          onNodeContextMenu: u,
          onSelectionContextMenu: c,
          onSelectionStart: h,
          onSelectionEnd: p,
          connectionLineType: f,
          connectionLineStyle: m,
          connectionLineComponent: g,
          connectionLineContainerStyle: y,
          selectionKeyCode: v,
          selectionOnDrag: x,
          selectionMode: b,
          multiSelectionKeyCode: _,
          panActivationKeyCode: w,
          zoomActivationKeyCode: E,
          deleteKeyCode: N,
          onlyRenderVisibleElements: S,
          elementsSelectable: C,
          defaultViewport: k,
          translateExtent: A,
          minZoom: T,
          maxZoom: O,
          preventScrolling: j,
          defaultMarkerColor: I,
          zoomOnScroll: M,
          zoomOnPinch: R,
          panOnScroll: D,
          panOnScrollSpeed: P,
          panOnScrollMode: $,
          zoomOnDoubleClick: L,
          panOnDrag: z,
          autoPanOnSelection: V,
          onPaneClick: H,
          onPaneMouseEnter: Z,
          onPaneMouseMove: U,
          onPaneMouseLeave: G,
          onPaneScroll: q,
          onPaneContextMenu: W,
          paneClickDistance: Y,
          nodeClickDistance: K,
          onEdgeContextMenu: X,
          onEdgeMouseEnter: Q,
          onEdgeMouseMove: J,
          onEdgeMouseLeave: ee,
          reconnectRadius: et,
          onReconnect: en,
          onReconnectStart: er,
          onReconnectEnd: ei,
          noDragClassName: ea,
          noWheelClassName: es,
          noPanClassName: eo,
          disableKeyboardA11y: el,
          nodeExtent: ed,
          rfId: eu,
          viewport: ec,
          onViewportChange: eh,
        }) {
          return (
            ah(e),
            ah(t),
            ry(),
            (0, F.useRef)(!1),
            r4(),
            (0, F.useRef)(!1),
            rg(as),
            ry(),
            (0, B.jsx)(iC, {
              onPaneClick: H,
              onPaneMouseEnter: Z,
              onPaneMouseMove: U,
              onPaneMouseLeave: G,
              onPaneContextMenu: W,
              onPaneScroll: q,
              paneClickDistance: Y,
              deleteKeyCode: N,
              selectionKeyCode: v,
              selectionOnDrag: x,
              selectionMode: b,
              onSelectionStart: h,
              onSelectionEnd: p,
              multiSelectionKeyCode: _,
              panActivationKeyCode: w,
              zoomActivationKeyCode: E,
              elementsSelectable: C,
              zoomOnScroll: M,
              zoomOnPinch: R,
              zoomOnDoubleClick: L,
              panOnScroll: D,
              panOnScrollSpeed: P,
              panOnScrollMode: $,
              panOnDrag: z,
              autoPanOnSelection: V,
              defaultViewport: k,
              translateExtent: A,
              minZoom: T,
              maxZoom: O,
              onSelectionContextMenu: c,
              preventScrolling: j,
              noDragClassName: ea,
              noWheelClassName: es,
              noPanClassName: eo,
              disableKeyboardA11y: el,
              onViewportChange: eh,
              isControlledViewport: !!ec,
              children: (0, B.jsxs)(aa, {
                children: [
                  (0, B.jsx)(ar, {
                    edgeTypes: t,
                    onEdgeClick: i,
                    onEdgeDoubleClick: s,
                    onReconnect: en,
                    onReconnectStart: er,
                    onReconnectEnd: ei,
                    onlyRenderVisibleElements: S,
                    onEdgeContextMenu: X,
                    onEdgeMouseEnter: Q,
                    onEdgeMouseMove: J,
                    onEdgeMouseLeave: ee,
                    reconnectRadius: et,
                    defaultMarkerColor: I,
                    noPanClassName: eo,
                    disableKeyboardA11y: el,
                    rfId: eu,
                  }),
                  (0, B.jsx)(ad, {
                    style: m,
                    type: f,
                    component: g,
                    containerStyle: y,
                  }),
                  (0, B.jsx)("div", {
                    className: "react-flow__edgelabel-renderer",
                  }),
                  (0, B.jsx)(iI, {
                    nodeTypes: e,
                    onNodeClick: r,
                    onNodeDoubleClick: a,
                    onNodeMouseEnter: o,
                    onNodeMouseMove: l,
                    onNodeMouseLeave: d,
                    onNodeContextMenu: u,
                    nodeClickDistance: K,
                    onlyRenderVisibleElements: S,
                    noPanClassName: eo,
                    noDragClassName: ea,
                    disableKeyboardA11y: el,
                    nodeExtent: ed,
                    rfId: eu,
                  }),
                  (0, B.jsx)("div", {
                    className: "react-flow__viewport-portal",
                  }),
                ],
              }),
            })
          );
        }
        ap.displayName = "GraphView";
        let af = (0, F.memo)(ap),
          am = ng("React Flow", "https://reactflow.dev/"),
          ag = ({
            nodes: e,
            edges: t,
            defaultNodes: n,
            defaultEdges: r,
            width: i,
            height: a,
            fitView: s,
            fitViewOptions: l,
            minZoom: d = 0.5,
            maxZoom: u = 2,
            nodeOrigin: c,
            nodeExtent: h,
            zIndexMode: p = "basic",
          } = {}) => {
            let f = new Map(),
              m = new Map(),
              g = new Map(),
              y = new Map(),
              v = r ?? t ?? [],
              x = n ?? e ?? [],
              b = c ?? [0, 0],
              _ = h ?? tY;
            n9(g, y, v);
            let { nodesInitialized: w } = n1(x, f, m, {
                nodeOrigin: b,
                nodeExtent: _,
                zIndexMode: p,
              }),
              E = [0, 0, 1];
            if (s && i && a) {
              let {
                x: e,
                y: t,
                zoom: n,
              } = n_(
                t6(f, {
                  filter: (e) =>
                    !!(
                      (e.width || e.initialWidth) &&
                      (e.height || e.initialHeight)
                    ),
                }),
                i,
                a,
                d,
                u,
                l?.padding ?? 0.1,
              );
              E = [e, t, n];
            }
            return {
              rfId: "1",
              width: i ?? 0,
              height: a ?? 0,
              transform: E,
              nodes: x,
              nodesInitialized: w,
              nodeLookup: f,
              parentLookup: m,
              edges: v,
              edgeLookup: y,
              connectionLookup: g,
              onNodesChange: null,
              onEdgesChange: null,
              hasDefaultNodes: void 0 !== n,
              hasDefaultEdges: void 0 !== r,
              panZoom: null,
              minZoom: d,
              maxZoom: u,
              translateExtent: tY,
              nodeExtent: _,
              nodesSelectionActive: !1,
              userSelectionActive: !1,
              userSelectionRect: null,
              connectionMode: o.Strict,
              domNode: null,
              paneDragging: !1,
              noPanClassName: "nopan",
              nodeOrigin: b,
              nodeDragThreshold: 1,
              connectionDragThreshold: 1,
              snapGrid: [15, 15],
              snapToGrid: !1,
              nodesDraggable: !0,
              nodesConnectable: !0,
              nodesFocusable: !0,
              edgesFocusable: !0,
              edgesReconnectable: !0,
              elementsSelectable: !0,
              elevateNodesOnSelect: !0,
              elevateEdgesOnSelect: !0,
              selectNodesOnDrag: !0,
              multiSelectionActive: !1,
              fitViewQueued: s ?? !1,
              fitViewOptions: l,
              fitViewResolver: null,
              connection: { ...tQ },
              connectionClickStartHandle: null,
              connectOnClick: !0,
              ariaLiveMessage: "",
              autoPanOnConnect: !0,
              autoPanOnNodeDrag: !0,
              autoPanOnNodeFocus: !0,
              autoPanSpeed: 15,
              connectionRadius: 20,
              onError: am,
              isValidConnection: void 0,
              onSelectionChangeHandlers: [],
              lib: "react",
              debug: !1,
              ariaLabelConfig: tX,
              zIndexMode: p,
              onNodesChangeMiddlewareMap: new Map(),
              onEdgesChangeMiddlewareMap: new Map(),
            };
          },
          ay = ({
            nodes: e,
            edges: t,
            defaultNodes: n,
            defaultEdges: r,
            width: i,
            height: a,
            fitView: s,
            fitViewOptions: o,
            minZoom: l,
            maxZoom: d,
            nodeOrigin: u,
            nodeExtent: c,
            zIndexMode: p,
          }) =>
            rc((f, m) => {
              async function g() {
                let {
                  nodeLookup: e,
                  panZoom: t,
                  fitViewOptions: n,
                  fitViewResolver: r,
                  width: i,
                  height: a,
                  minZoom: s,
                  maxZoom: o,
                } = m();
                t &&
                  (await t8(
                    {
                      nodes: e,
                      width: i,
                      height: a,
                      panZoom: t,
                      minZoom: s,
                      maxZoom: o,
                    },
                    n,
                  ),
                  r?.resolve(!0),
                  f({ fitViewResolver: null }));
              }
              return {
                ...ag({
                  nodes: e,
                  edges: t,
                  width: i,
                  height: a,
                  fitView: s,
                  fitViewOptions: o,
                  minZoom: l,
                  maxZoom: d,
                  nodeOrigin: u,
                  nodeExtent: c,
                  defaultNodes: n,
                  defaultEdges: r,
                  zIndexMode: p,
                }),
                setNodes: (e) => {
                  let {
                      nodeLookup: t,
                      parentLookup: n,
                      nodeOrigin: r,
                      elevateNodesOnSelect: i,
                      fitViewQueued: a,
                      zIndexMode: s,
                      nodesSelectionActive: o,
                    } = m(),
                    { nodesInitialized: l, hasSelectedNodes: d } = n1(e, t, n, {
                      nodeOrigin: r,
                      nodeExtent: c,
                      elevateNodesOnSelect: i,
                      checkEquality: !0,
                      zIndexMode: s,
                    }),
                    u = o && d;
                  a && l
                    ? (g(),
                      f({
                        nodes: e,
                        nodesInitialized: l,
                        fitViewQueued: !1,
                        fitViewOptions: void 0,
                        nodesSelectionActive: u,
                      }))
                    : f({
                        nodes: e,
                        nodesInitialized: l,
                        nodesSelectionActive: u,
                      });
                },
                setEdges: (e) => {
                  let { connectionLookup: t, edgeLookup: n } = m();
                  (n9(t, n, e), f({ edges: e }));
                },
                setDefaultNodesAndEdges: (e, t) => {
                  if (e) {
                    let { setNodes: t } = m();
                    (t(e), f({ hasDefaultNodes: !0 }));
                  }
                  if (t) {
                    let { setEdges: e } = m();
                    (e(t), f({ hasDefaultEdges: !0 }));
                  }
                },
                updateNodeInternals: (e) => {
                  let {
                      triggerNodeChanges: t,
                      nodeLookup: n,
                      parentLookup: r,
                      domNode: i,
                      nodeOrigin: a,
                      nodeExtent: s,
                      debug: o,
                      fitViewQueued: l,
                      zIndexMode: d,
                    } = m(),
                    { changes: u, updatedInternals: c } = (function (
                      e,
                      t,
                      n,
                      r,
                      i,
                      a,
                      s,
                    ) {
                      let o = r?.querySelector(".xyflow__viewport"),
                        l = !1;
                      if (!o) return { changes: [], updatedInternals: l };
                      let d = [],
                        u = window.getComputedStyle(o),
                        { m22: c } = new window.DOMMatrixReadOnly(u.transform),
                        h = [];
                      for (let r of e.values()) {
                        let e = t.get(r.id);
                        if (!e) continue;
                        if (e.hidden) {
                          (t.set(e.id, {
                            ...e,
                            internals: { ...e.internals, handleBounds: void 0 },
                          }),
                            (l = !0));
                          continue;
                        }
                        let o = nk(r.nodeElement),
                          u =
                            e.measured.width !== o.width ||
                            e.measured.height !== o.height;
                        if (
                          o.width &&
                          o.height &&
                          (u || !e.internals.handleBounds || r.force)
                        ) {
                          let p = r.nodeElement.getBoundingClientRect(),
                            f = nE(e.extent) ? e.extent : a,
                            { positionAbsolute: m } = e.internals;
                          e.parentId && "parent" === e.extent
                            ? (m = nr(m, o, t.get(e.parentId)))
                            : f && (m = nn(m, f, o));
                          let g = {
                            ...e,
                            measured: o,
                            internals: {
                              ...e.internals,
                              positionAbsolute: m,
                              handleBounds: {
                                source: nI("source", r.nodeElement, p, c, e.id),
                                target: nI("target", r.nodeElement, p, c, e.id),
                              },
                            },
                          };
                          (t.set(e.id, g),
                            e.parentId &&
                              n2(g, t, n, { nodeOrigin: i, zIndexMode: s }),
                            (l = !0),
                            u &&
                              (d.push({
                                id: e.id,
                                type: "dimensions",
                                dimensions: o,
                              }),
                              e.expandParent &&
                                e.parentId &&
                                h.push({
                                  id: e.id,
                                  parentId: e.parentId,
                                  rect: nd(g, i),
                                })));
                        }
                      }
                      if (h.length > 0) {
                        let e = n4(h, t, n, i);
                        d.push(...e);
                      }
                      return { changes: d, updatedInternals: l };
                    })(e, n, r, i, a, s, d);
                  c &&
                    ((function (e, t, n) {
                      let r = nJ(nX, n);
                      for (let n of e.values())
                        if (n.parentId) n2(n, e, t, r);
                        else {
                          let e = nn(
                            t4(n, r.nodeOrigin),
                            nE(n.extent) ? n.extent : r.nodeExtent,
                            nN(n),
                          );
                          n.internals.positionAbsolute = e;
                        }
                    })(n, r, { nodeOrigin: a, nodeExtent: s, zIndexMode: d }),
                    l
                      ? (g(), f({ fitViewQueued: !1, fitViewOptions: void 0 }))
                      : f({}),
                    u?.length > 0 &&
                      (o && console.log("React Flow: trigger node changes", u),
                      t?.(u)));
                },
                updateNodePositions: (e, t = !1) => {
                  let n = [],
                    r = [],
                    {
                      nodeLookup: i,
                      triggerNodeChanges: a,
                      connection: s,
                      updateConnection: o,
                      onNodesChangeMiddlewareMap: l,
                    } = m();
                  for (let [a, l] of e) {
                    let e = i.get(a),
                      d = !!(e?.expandParent && e?.parentId && l?.position),
                      u = {
                        id: a,
                        type: "position",
                        position: d
                          ? {
                              x: Math.max(0, l.position.x),
                              y: Math.max(0, l.position.y),
                            }
                          : l.position,
                        dragging: t,
                      };
                    if (e && s.inProgress && s.fromNode.id === e.id) {
                      let t = nW(e, s.fromHandle, h.Left, !0);
                      o({ ...s, from: t });
                    }
                    (d &&
                      e.parentId &&
                      n.push({
                        id: a,
                        parentId: e.parentId,
                        rect: {
                          ...l.internals.positionAbsolute,
                          width: l.measured.width ?? 0,
                          height: l.measured.height ?? 0,
                        },
                      }),
                      r.push(u));
                  }
                  if (n.length > 0) {
                    let { parentLookup: e, nodeOrigin: t } = m(),
                      a = n4(n, i, e, t);
                    r.push(...a);
                  }
                  for (let e of l.values()) r = e(r);
                  a(r);
                },
                triggerNodeChanges: (e) => {
                  let {
                    onNodesChange: t,
                    setNodes: n,
                    nodes: r,
                    hasDefaultNodes: i,
                    debug: a,
                  } = m();
                  e?.length &&
                    (i && n(rZ(e, r)),
                    a && console.log("React Flow: trigger node changes", e),
                    t?.(e));
                },
                triggerEdgeChanges: (e) => {
                  let {
                    onEdgesChange: t,
                    setEdges: n,
                    edges: r,
                    hasDefaultEdges: i,
                    debug: a,
                  } = m();
                  e?.length &&
                    (i && n(rZ(e, r)),
                    a && console.log("React Flow: trigger edge changes", e),
                    t?.(e));
                },
                addSelectedNodes: (e) => {
                  let {
                    multiSelectionActive: t,
                    edgeLookup: n,
                    nodeLookup: r,
                    triggerNodeChanges: i,
                    triggerEdgeChanges: a,
                  } = m();
                  if (t) {
                    i(e.map((e) => rU(e, !0)));
                    return;
                  }
                  (i(rG(r, new Set([...e]), !0)), a(rG(n)));
                },
                addSelectedEdges: (e) => {
                  let {
                    multiSelectionActive: t,
                    edgeLookup: n,
                    nodeLookup: r,
                    triggerNodeChanges: i,
                    triggerEdgeChanges: a,
                  } = m();
                  if (t) {
                    a(e.map((e) => rU(e, !0)));
                    return;
                  }
                  (a(rG(n, new Set([...e]))), i(rG(r, new Set(), !0)));
                },
                unselectNodesAndEdges: ({ nodes: e, edges: t } = {}) => {
                  let {
                      edges: n,
                      nodes: r,
                      nodeLookup: i,
                      triggerNodeChanges: a,
                      triggerEdgeChanges: s,
                    } = m(),
                    o = [];
                  for (let t of e || r) {
                    if (!t.selected) continue;
                    let e = i.get(t.id);
                    (e && (e.selected = !1), o.push(rU(t.id, !1)));
                  }
                  let l = [];
                  for (let e of t || n) e.selected && l.push(rU(e.id, !1));
                  (a(o), s(l));
                },
                setMinZoom: (e) => {
                  let { panZoom: t, maxZoom: n } = m();
                  (t?.setScaleExtent([e, n]), f({ minZoom: e }));
                },
                setMaxZoom: (e) => {
                  let { panZoom: t, minZoom: n } = m();
                  (t?.setScaleExtent([n, e]), f({ maxZoom: e }));
                },
                setTranslateExtent: (e) => {
                  (m().panZoom?.setTranslateExtent(e),
                    f({ translateExtent: e }));
                },
                resetSelectedElements: () => {
                  let {
                    edges: e,
                    nodes: t,
                    triggerNodeChanges: n,
                    triggerEdgeChanges: r,
                    elementsSelectable: i,
                  } = m();
                  if (!i) return;
                  let a = t.reduce(
                      (e, t) => (t.selected ? [...e, rU(t.id, !1)] : e),
                      [],
                    ),
                    s = e.reduce(
                      (e, t) => (t.selected ? [...e, rU(t.id, !1)] : e),
                      [],
                    );
                  (n(a), r(s));
                },
                setNodeExtent: (e) => {
                  let {
                    nodes: t,
                    nodeLookup: n,
                    parentLookup: r,
                    nodeOrigin: i,
                    elevateNodesOnSelect: a,
                    nodeExtent: s,
                    zIndexMode: o,
                  } = m();
                  (e[0][0] !== s[0][0] ||
                    e[0][1] !== s[0][1] ||
                    e[1][0] !== s[1][0] ||
                    e[1][1] !== s[1][1]) &&
                    (n1(t, n, r, {
                      nodeOrigin: i,
                      nodeExtent: e,
                      elevateNodesOnSelect: a,
                      checkEquality: !1,
                      zIndexMode: o,
                    }),
                    f({ nodeExtent: e }));
                },
                panBy: (e) => {
                  let {
                    transform: t,
                    width: n,
                    height: r,
                    panZoom: i,
                    translateExtent: a,
                  } = m();
                  return n3({
                    delta: e,
                    panZoom: i,
                    transform: t,
                    translateExtent: a,
                    width: n,
                    height: r,
                  });
                },
                setCenter: async (e, t, n) => {
                  let { width: r, height: i, maxZoom: a, panZoom: s } = m();
                  if (!s) return !1;
                  let o = void 0 !== n?.zoom ? n.zoom : a;
                  return (
                    await s.setViewport(
                      { x: r / 2 - e * o, y: i / 2 - t * o, zoom: o },
                      {
                        duration: n?.duration,
                        ease: n?.ease,
                        interpolate: n?.interpolate,
                      },
                    ),
                    !0
                  );
                },
                cancelConnection: () => {
                  f({ connection: { ...tQ } });
                },
                updateConnection: (e) => {
                  f({ connection: e });
                },
                reset: () => f({ ...ag() }),
              };
            }, Object.is);
        function av({
          initialNodes: e,
          initialEdges: t,
          defaultNodes: n,
          defaultEdges: r,
          initialWidth: i,
          initialHeight: a,
          initialMinZoom: s,
          initialMaxZoom: o,
          initialFitViewOptions: l,
          fitView: d,
          nodeOrigin: u,
          nodeExtent: c,
          zIndexMode: h,
          children: p,
        }) {
          let [f] = (0, F.useState)(() =>
            ay({
              nodes: e,
              edges: t,
              defaultNodes: n,
              defaultEdges: r,
              width: i,
              height: a,
              fitView: d,
              minZoom: s,
              maxZoom: o,
              fitViewOptions: l,
              nodeOrigin: u,
              nodeExtent: c,
              zIndexMode: h,
            }),
          );
          return (0, B.jsx)(rf, {
            value: f,
            children: (0, B.jsx)(r2, {
              children: (0, B.jsx)(im, { children: p }),
            }),
          });
        }
        function ax({
          children: e,
          nodes: t,
          edges: n,
          defaultNodes: r,
          defaultEdges: i,
          width: a,
          height: s,
          fitView: o,
          fitViewOptions: l,
          minZoom: d,
          maxZoom: u,
          nodeOrigin: c,
          nodeExtent: h,
          zIndexMode: p,
        }) {
          return (0, F.useContext)(rp)
            ? (0, B.jsx)(B.Fragment, { children: e })
            : (0, B.jsx)(av, {
                initialNodes: t,
                initialEdges: n,
                defaultNodes: r,
                defaultEdges: i,
                initialWidth: a,
                initialHeight: s,
                fitView: o,
                initialFitViewOptions: l,
                initialMinZoom: d,
                initialMaxZoom: u,
                nodeOrigin: c,
                nodeExtent: h,
                zIndexMode: p,
                children: e,
              });
        }
        let ab = {
          width: "100%",
          height: "100%",
          overflow: "hidden",
          position: "relative",
          zIndex: 0,
        };
        var a_ = rQ(function (
          {
            nodes: e,
            edges: t,
            defaultNodes: n,
            defaultEdges: r,
            className: i,
            nodeTypes: a,
            edgeTypes: s,
            onNodeClick: o,
            onEdgeClick: c,
            onInit: h,
            onMove: p,
            onMoveStart: f,
            onMoveEnd: m,
            onConnect: g,
            onConnectStart: y,
            onConnectEnd: v,
            onClickConnectStart: x,
            onClickConnectEnd: b,
            onNodeMouseEnter: _,
            onNodeMouseMove: w,
            onNodeMouseLeave: E,
            onNodeContextMenu: N,
            onNodeDoubleClick: S,
            onNodeDragStart: C,
            onNodeDrag: k,
            onNodeDragStop: A,
            onNodesDelete: T,
            onEdgesDelete: O,
            onDelete: j,
            onSelectionChange: I,
            onSelectionDragStart: M,
            onSelectionDrag: R,
            onSelectionDragStop: D,
            onSelectionContextMenu: P,
            onSelectionStart: $,
            onSelectionEnd: L,
            onBeforeDelete: V,
            connectionMode: H,
            connectionLineType: Z = u.Bezier,
            connectionLineStyle: U,
            connectionLineComponent: G,
            connectionLineContainerStyle: q,
            deleteKeyCode: W = "Backspace",
            selectionKeyCode: Y = "Shift",
            selectionOnDrag: K = !1,
            selectionMode: X = d.Full,
            panActivationKeyCode: Q = "Space",
            multiSelectionKeyCode: J = nw() ? "Meta" : "Control",
            zoomActivationKeyCode: ee = nw() ? "Meta" : "Control",
            snapToGrid: et,
            snapGrid: en,
            onlyRenderVisibleElements: er = !1,
            selectNodesOnDrag: ei,
            nodesDraggable: ea,
            autoPanOnNodeFocus: es,
            nodesConnectable: eo,
            nodesFocusable: el,
            nodeOrigin: ed = rD,
            edgesFocusable: eu,
            edgesReconnectable: ec,
            elementsSelectable: eh = !0,
            defaultViewport: ep = rP,
            minZoom: ef = 0.5,
            maxZoom: em = 2,
            translateExtent: eg = tY,
            preventScrolling: ey = !0,
            nodeExtent: ev,
            defaultMarkerColor: ex = "#b1b1b7",
            zoomOnScroll: eb = !0,
            zoomOnPinch: e_ = !0,
            panOnScroll: ew = !1,
            panOnScrollSpeed: eE = 0.5,
            panOnScrollMode: eN = l.Free,
            zoomOnDoubleClick: eS = !0,
            panOnDrag: eC = !0,
            onPaneClick: ek,
            onPaneMouseEnter: eA,
            onPaneMouseMove: eT,
            onPaneMouseLeave: eO,
            onPaneScroll: ej,
            onPaneContextMenu: eI,
            paneClickDistance: eM = 1,
            nodeClickDistance: eR = 0,
            children: eD,
            onReconnect: eP,
            onReconnectStart: e$,
            onReconnectEnd: eL,
            onEdgeContextMenu: eB,
            onEdgeDoubleClick: eF,
            onEdgeMouseEnter: ez,
            onEdgeMouseMove: eV,
            onEdgeMouseLeave: eH,
            reconnectRadius: eZ = 10,
            onNodesChange: eU,
            onEdgesChange: eG,
            noDragClassName: eq = "nodrag",
            noWheelClassName: eW = "nowheel",
            noPanClassName: eY = "nopan",
            fitView: eK,
            fitViewOptions: eX,
            connectOnClick: eQ,
            attributionPosition: eJ,
            proOptions: e0,
            defaultEdgeOptions: e1,
            elevateNodesOnSelect: e2 = !0,
            elevateEdgesOnSelect: e5 = !1,
            disableKeyboardA11y: e4 = !1,
            autoPanOnConnect: e3,
            autoPanOnNodeDrag: e6,
            autoPanOnSelection: e9 = !0,
            autoPanSpeed: e7,
            connectionRadius: e8,
            isValidConnection: te,
            onError: tt,
            style: tn,
            id: tr,
            nodeDragThreshold: ti,
            connectionDragThreshold: ta,
            viewport: ts,
            onViewportChange: to,
            width: tl,
            height: td,
            colorMode: tu = "light",
            debug: tc,
            onScroll: th,
            ariaLabelConfig: tp,
            zIndexMode: tf = "basic",
            ...tm
          },
          tg,
        ) {
          let ty = tr || "1",
            tv = (function (e) {
              let [t, n] = (0, F.useState)("system" === e ? null : e);
              return null !== t ? t : "light";
            })(tu),
            tx = (0, F.useCallback)(
              (e) => {
                (e.currentTarget.scrollTo({
                  top: 0,
                  left: 0,
                  behavior: "instant",
                }),
                  th?.(e));
              },
              [th],
            );
          return (0, B.jsx)("div", {
            "data-testid": "rf__wrapper",
            ...tm,
            onScroll: tx,
            style: { ...tn, ...ab },
            ref: tg,
            className: z(["react-flow", i, tv]),
            id: tr,
            role: "application",
            children: (0, B.jsxs)(ax, {
              nodes: e,
              edges: t,
              width: tl,
              height: td,
              fitView: eK,
              fitViewOptions: eX,
              minZoom: ef,
              maxZoom: em,
              nodeOrigin: ed,
              nodeExtent: ev,
              zIndexMode: tf,
              children: [
                (0, B.jsx)(rF, {
                  nodes: e,
                  edges: t,
                  defaultNodes: n,
                  defaultEdges: r,
                  onConnect: g,
                  onConnectStart: y,
                  onConnectEnd: v,
                  onClickConnectStart: x,
                  onClickConnectEnd: b,
                  nodesDraggable: ea,
                  autoPanOnNodeFocus: es,
                  nodesConnectable: eo,
                  nodesFocusable: el,
                  edgesFocusable: eu,
                  edgesReconnectable: ec,
                  elementsSelectable: eh,
                  elevateNodesOnSelect: e2,
                  elevateEdgesOnSelect: e5,
                  minZoom: ef,
                  maxZoom: em,
                  nodeExtent: ev,
                  onNodesChange: eU,
                  onEdgesChange: eG,
                  snapToGrid: et,
                  snapGrid: en,
                  connectionMode: H,
                  translateExtent: eg,
                  connectOnClick: eQ,
                  defaultEdgeOptions: e1,
                  fitView: eK,
                  fitViewOptions: eX,
                  onNodesDelete: T,
                  onEdgesDelete: O,
                  onDelete: j,
                  onNodeDragStart: C,
                  onNodeDrag: k,
                  onNodeDragStop: A,
                  onSelectionDrag: R,
                  onSelectionDragStart: M,
                  onSelectionDragStop: D,
                  onMove: p,
                  onMoveStart: f,
                  onMoveEnd: m,
                  noPanClassName: eY,
                  nodeOrigin: ed,
                  rfId: ty,
                  autoPanOnConnect: e3,
                  autoPanOnNodeDrag: e6,
                  autoPanSpeed: e7,
                  onError: tt,
                  connectionRadius: e8,
                  isValidConnection: te,
                  selectNodesOnDrag: ei,
                  nodeDragThreshold: ti,
                  connectionDragThreshold: ta,
                  onBeforeDelete: V,
                  debug: tc,
                  ariaLabelConfig: tp,
                  zIndexMode: tf,
                }),
                (0, B.jsx)(af, {
                  onInit: h,
                  onNodeClick: o,
                  onEdgeClick: c,
                  onNodeMouseEnter: _,
                  onNodeMouseMove: w,
                  onNodeMouseLeave: E,
                  onNodeContextMenu: N,
                  onNodeDoubleClick: S,
                  nodeTypes: a,
                  edgeTypes: s,
                  connectionLineType: Z,
                  connectionLineStyle: U,
                  connectionLineComponent: G,
                  connectionLineContainerStyle: q,
                  selectionKeyCode: Y,
                  selectionOnDrag: K,
                  selectionMode: X,
                  deleteKeyCode: W,
                  multiSelectionKeyCode: J,
                  panActivationKeyCode: Q,
                  zoomActivationKeyCode: ee,
                  onlyRenderVisibleElements: er,
                  defaultViewport: ep,
                  translateExtent: eg,
                  minZoom: ef,
                  maxZoom: em,
                  preventScrolling: ey,
                  zoomOnScroll: eb,
                  zoomOnPinch: e_,
                  zoomOnDoubleClick: eS,
                  panOnScroll: ew,
                  panOnScrollSpeed: eE,
                  panOnScrollMode: eN,
                  panOnDrag: eC,
                  autoPanOnSelection: e9,
                  onPaneClick: ek,
                  onPaneMouseEnter: eA,
                  onPaneMouseMove: eT,
                  onPaneMouseLeave: eO,
                  onPaneScroll: ej,
                  onPaneContextMenu: eI,
                  paneClickDistance: eM,
                  nodeClickDistance: eR,
                  onSelectionContextMenu: P,
                  onSelectionStart: $,
                  onSelectionEnd: L,
                  onReconnect: eP,
                  onReconnectStart: e$,
                  onReconnectEnd: eL,
                  onEdgeContextMenu: eB,
                  onEdgeDoubleClick: eF,
                  onEdgeMouseEnter: ez,
                  onEdgeMouseMove: eV,
                  onEdgeMouseLeave: eH,
                  reconnectRadius: eZ,
                  defaultMarkerColor: ex,
                  noDragClassName: eq,
                  noWheelClassName: eW,
                  noPanClassName: eY,
                  rfId: ty,
                  disableKeyboardA11y: e4,
                  nodeExtent: ev,
                  viewport: ts,
                  onViewportChange: to,
                }),
                (0, B.jsx)(rR, { onSelectionChange: I }),
                eD,
                (0, B.jsx)(rA, { proOptions: e0, position: eJ }),
                (0, B.jsx)(rS, { rfId: ty, disableKeyboardA11y: e4 }),
              ],
            }),
          });
        });
        function aw({ dimensions: e, lineWidth: t, variant: n, className: r }) {
          return (0, B.jsx)("path", {
            strokeWidth: t,
            d: `M${e[0] / 2} 0 V${e[1]} M0 ${e[1] / 2} H${e[0]}`,
            className: z(["react-flow__background-pattern", n, r]),
          });
        }
        function aE({ radius: e, className: t }) {
          return (0, B.jsx)("circle", {
            cx: e,
            cy: e,
            r: e,
            className: z(["react-flow__background-pattern", "dots", t]),
          });
        }
        (tW.error014(),
          (function (e) {
            ((e.Lines = "lines"), (e.Dots = "dots"), (e.Cross = "cross"));
          })(f || (f = {})));
        let aN = { [f.Dots]: 1, [f.Lines]: 1, [f.Cross]: 6 },
          aS = (e) => ({
            transform: e.transform,
            patternId: `pattern-${e.rfId}`,
          });
        function aC({
          id: e,
          variant: t = f.Dots,
          gap: n = 20,
          size: r,
          lineWidth: i = 1,
          offset: a = 0,
          color: s,
          bgColor: o,
          style: l,
          className: d,
          patternClassName: u,
        }) {
          let c = (0, F.useRef)(null),
            { transform: h, patternId: p } = rg(aS, rh),
            m = r || aN[t],
            g = t === f.Dots,
            y = t === f.Cross,
            v = Array.isArray(n) ? n : [n, n],
            x = [v[0] * h[2] || 1, v[1] * h[2] || 1],
            b = m * h[2],
            _ = Array.isArray(a) ? a : [a, a],
            w = y ? [b, b] : x,
            E = [_[0] * h[2] || 1 + w[0] / 2, _[1] * h[2] || 1 + w[1] / 2],
            N = `${p}${e || ""}`;
          return (0, B.jsxs)("svg", {
            className: z(["react-flow__background", d]),
            style: {
              ...l,
              ...r6,
              "--xy-background-color-props": o,
              "--xy-background-pattern-color-props": s,
            },
            ref: c,
            "data-testid": "rf__background",
            children: [
              (0, B.jsx)("pattern", {
                id: N,
                x: h[0] % x[0],
                y: h[1] % x[1],
                width: x[0],
                height: x[1],
                patternUnits: "userSpaceOnUse",
                patternTransform: `translate(-${E[0]},-${E[1]})`,
                children: g
                  ? (0, B.jsx)(aE, { radius: b / 2, className: u })
                  : (0, B.jsx)(aw, {
                      dimensions: w,
                      lineWidth: i,
                      variant: t,
                      className: u,
                    }),
              }),
              (0, B.jsx)("rect", {
                x: "0",
                y: "0",
                width: "100%",
                height: "100%",
                fill: `url(#${N})`,
              }),
            ],
          });
        }
        aC.displayName = "Background";
        let ak = (0, F.memo)(aC);
        function aA() {
          return (0, B.jsx)("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            viewBox: "0 0 32 32",
            children: (0, B.jsx)("path", {
              d: "M32 18.133H18.133V32h-4.266V18.133H0v-4.266h13.867V0h4.266v13.867H32z",
            }),
          });
        }
        function aT() {
          return (0, B.jsx)("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            viewBox: "0 0 32 5",
            children: (0, B.jsx)("path", { d: "M0 0h32v4.2H0z" }),
          });
        }
        function aO() {
          return (0, B.jsx)("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            viewBox: "0 0 32 30",
            children: (0, B.jsx)("path", {
              d: "M3.692 4.63c0-.53.4-.938.939-.938h5.215V0H4.708C2.13 0 0 2.054 0 4.63v5.216h3.692V4.631zM27.354 0h-5.2v3.692h5.17c.53 0 .984.4.984.939v5.215H32V4.631A4.624 4.624 0 0027.354 0zm.954 24.83c0 .532-.4.94-.939.94h-5.215v3.768h5.215c2.577 0 4.631-2.13 4.631-4.707v-5.139h-3.692v5.139zm-23.677.94c-.531 0-.939-.4-.939-.94v-5.138H0v5.139c0 2.577 2.13 4.707 4.708 4.707h5.138V25.77H4.631z",
            }),
          });
        }
        function aj() {
          return (0, B.jsx)("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            viewBox: "0 0 25 32",
            children: (0, B.jsx)("path", {
              d: "M21.333 10.667H19.81V7.619C19.81 3.429 16.38 0 12.19 0 8 0 4.571 3.429 4.571 7.619v3.048H3.048A3.056 3.056 0 000 13.714v15.238A3.056 3.056 0 003.048 32h18.285a3.056 3.056 0 003.048-3.048V13.714a3.056 3.056 0 00-3.048-3.047zM12.19 24.533a3.056 3.056 0 01-3.047-3.047 3.056 3.056 0 013.047-3.048 3.056 3.056 0 013.048 3.048 3.056 3.056 0 01-3.048 3.047zm4.724-13.866H7.467V7.619c0-2.59 2.133-4.724 4.723-4.724 2.591 0 4.724 2.133 4.724 4.724v3.048z",
            }),
          });
        }
        function aI() {
          return (0, B.jsx)("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            viewBox: "0 0 25 32",
            children: (0, B.jsx)("path", {
              d: "M21.333 10.667H19.81V7.619C19.81 3.429 16.38 0 12.19 0c-4.114 1.828-1.37 2.133.305 2.438 1.676.305 4.42 2.59 4.42 5.181v3.048H3.047A3.056 3.056 0 000 13.714v15.238A3.056 3.056 0 003.048 32h18.285a3.056 3.056 0 003.048-3.048V13.714a3.056 3.056 0 00-3.048-3.047zM12.19 24.533a3.056 3.056 0 01-3.047-3.047 3.056 3.056 0 013.047-3.048 3.056 3.056 0 013.048 3.048 3.056 3.056 0 01-3.048 3.047z",
            }),
          });
        }
        function aM({ children: e, className: t, ...n }) {
          return (0, B.jsx)("button", {
            type: "button",
            className: z(["react-flow__controls-button", t]),
            ...n,
            children: e,
          });
        }
        let aR = (e) => ({
          isInteractive:
            e.nodesDraggable || e.nodesConnectable || e.elementsSelectable,
          minZoomReached: e.transform[2] <= e.minZoom,
          maxZoomReached: e.transform[2] >= e.maxZoom,
          ariaLabelConfig: e.ariaLabelConfig,
        });
        function aD({
          style: e,
          showZoom: t = !0,
          showFitView: n = !0,
          showInteractive: r = !0,
          fitViewOptions: i,
          onZoomIn: a,
          onZoomOut: s,
          onFitView: o,
          onInteractiveChange: l,
          className: d,
          children: u,
          position: c = "bottom-left",
          orientation: h = "vertical",
          "aria-label": p,
        }) {
          let f = ry(),
            {
              isInteractive: m,
              minZoomReached: g,
              maxZoomReached: y,
              ariaLabelConfig: v,
            } = rg(aR, rh),
            { zoomIn: x, zoomOut: b, fitView: _ } = r4();
          return (0, B.jsxs)(rC, {
            className: z([
              "react-flow__controls",
              "horizontal" === h ? "horizontal" : "vertical",
              d,
            ]),
            position: c,
            style: e,
            "data-testid": "rf__controls",
            "aria-label": p ?? v["controls.ariaLabel"],
            children: [
              t &&
                (0, B.jsxs)(B.Fragment, {
                  children: [
                    (0, B.jsx)(aM, {
                      onClick: () => {
                        (x(), a?.());
                      },
                      className: "react-flow__controls-zoomin",
                      title: v["controls.zoomIn.ariaLabel"],
                      "aria-label": v["controls.zoomIn.ariaLabel"],
                      disabled: y,
                      children: (0, B.jsx)(aA, {}),
                    }),
                    (0, B.jsx)(aM, {
                      onClick: () => {
                        (b(), s?.());
                      },
                      className: "react-flow__controls-zoomout",
                      title: v["controls.zoomOut.ariaLabel"],
                      "aria-label": v["controls.zoomOut.ariaLabel"],
                      disabled: g,
                      children: (0, B.jsx)(aT, {}),
                    }),
                  ],
                }),
              n &&
                (0, B.jsx)(aM, {
                  className: "react-flow__controls-fitview",
                  onClick: () => {
                    (_(i), o?.());
                  },
                  title: v["controls.fitView.ariaLabel"],
                  "aria-label": v["controls.fitView.ariaLabel"],
                  children: (0, B.jsx)(aO, {}),
                }),
              r &&
                (0, B.jsx)(aM, {
                  className: "react-flow__controls-interactive",
                  onClick: () => {
                    (f.setState({
                      nodesDraggable: !m,
                      nodesConnectable: !m,
                      elementsSelectable: !m,
                    }),
                      l?.(!m));
                  },
                  title: v["controls.interactive.ariaLabel"],
                  "aria-label": v["controls.interactive.ariaLabel"],
                  children: m ? (0, B.jsx)(aI, {}) : (0, B.jsx)(aj, {}),
                }),
              u,
            ],
          });
        }
        aD.displayName = "Controls";
        let aP = (0, F.memo)(aD),
          a$ = (0, F.memo)(function ({
            id: e,
            x: t,
            y: n,
            width: r,
            height: i,
            style: a,
            color: s,
            strokeColor: o,
            strokeWidth: l,
            className: d,
            borderRadius: u,
            shapeRendering: c,
            selected: h,
            onClick: p,
          }) {
            let { background: f, backgroundColor: m } = a || {};
            return (0, B.jsx)("rect", {
              className: z(["react-flow__minimap-node", { selected: h }, d]),
              x: t,
              y: n,
              rx: u,
              ry: u,
              width: r,
              height: i,
              style: { fill: s || f || m, stroke: o, strokeWidth: l },
              shapeRendering: c,
              onClick: p ? (t) => p(t, e) : void 0,
            });
          }),
          aL = (e) => e.nodes.map((e) => e.id),
          aB = (e) => (e instanceof Function ? e : () => e),
          aF = (0, F.memo)(function ({
            id: e,
            nodeColorFunc: t,
            nodeStrokeColorFunc: n,
            nodeClassNameFunc: r,
            nodeBorderRadius: i,
            nodeStrokeWidth: a,
            shapeRendering: s,
            NodeComponent: o,
            onClick: l,
          }) {
            let {
              node: d,
              x: u,
              y: c,
              width: h,
              height: p,
            } = rg((t) => {
              let n = t.nodeLookup.get(e);
              if (!n) return { node: void 0, x: 0, y: 0, width: 0, height: 0 };
              let r = n.internals.userNode,
                { x: i, y: a } = n.internals.positionAbsolute,
                { width: s, height: o } = nN(r);
              return { node: r, x: i, y: a, width: s, height: o };
            }, rh);
            return d && !d.hidden && nS(d)
              ? (0, B.jsx)(o, {
                  x: u,
                  y: c,
                  width: h,
                  height: p,
                  style: d.style,
                  selected: !!d.selected,
                  className: r(d),
                  color: t(d),
                  borderRadius: i,
                  strokeColor: n(d),
                  strokeWidth: a,
                  shapeRendering: s,
                  onClick: l,
                  id: d.id,
                })
              : null;
          });
        var az = (0, F.memo)(function ({
          nodeStrokeColor: e,
          nodeColor: t,
          nodeClassName: n = "",
          nodeBorderRadius: r = 5,
          nodeStrokeWidth: i,
          nodeComponent: a = a$,
          onClick: s,
        }) {
          let o = rg(aL, rh),
            l = aB(t),
            d = aB(e),
            u = aB(n);
          return (0, B.jsx)(B.Fragment, {
            children: o.map((e) =>
              (0, B.jsx)(
                aF,
                {
                  id: e,
                  nodeColorFunc: l,
                  nodeStrokeColorFunc: d,
                  nodeClassNameFunc: u,
                  nodeBorderRadius: r,
                  nodeStrokeWidth: i,
                  NodeComponent: a,
                  onClick: s,
                  shapeRendering: "crispEdges",
                },
                e,
              ),
            ),
          });
        });
        let aV = (e) => !e.hidden,
          aH = (e) => {
            let t = {
              x: -e.transform[0] / e.transform[2],
              y: -e.transform[1] / e.transform[2],
              width: e.width / e.transform[2],
              height: e.height / e.transform[2],
            };
            return {
              viewBB: t,
              boundingRect:
                e.nodeLookup.size > 0
                  ? nc(t6(e.nodeLookup, { filter: aV }), t)
                  : t,
              rfId: e.rfId,
              panZoom: e.panZoom,
              translateExtent: e.translateExtent,
              flowWidth: e.width,
              flowHeight: e.height,
              ariaLabelConfig: e.ariaLabelConfig,
            };
          };
        function aZ({
          style: e,
          className: t,
          nodeStrokeColor: n,
          nodeColor: r,
          nodeClassName: i = "",
          nodeBorderRadius: a = 5,
          nodeStrokeWidth: s,
          nodeComponent: o,
          bgColor: l,
          maskColor: d,
          maskStrokeColor: u,
          maskStrokeWidth: c,
          position: h = "bottom-right",
          onClick: p,
          onNodeClick: f,
          pannable: m = !1,
          zoomable: g = !1,
          ariaLabel: y,
          inversePan: v,
          zoomStep: x = 1,
          offsetScale: b = 5,
        }) {
          let _ = ry(),
            w = (0, F.useRef)(null),
            {
              boundingRect: E,
              viewBB: N,
              rfId: S,
              panZoom: C,
              translateExtent: k,
              flowWidth: A,
              flowHeight: T,
              ariaLabelConfig: O,
            } = rg(aH, rh),
            j = e?.width ?? 200,
            I = e?.height ?? 150,
            M = Math.max(E.width / j, E.height / I),
            R = M * j,
            D = M * I,
            P = b * M,
            $ = E.x - (R - E.width) / 2 - P,
            L = E.y - (D - E.height) / 2 - P,
            V = R + 2 * P,
            H = D + 2 * P,
            Z = `react-flow__minimap-desc-${S}`,
            U = (0, F.useRef)(0),
            G = (0, F.useRef)();
          U.current = M;
          let q = f
              ? (0, F.useCallback)((e, t) => {
                  f(e, _.getState().nodeLookup.get(t).internals.userNode);
                }, [])
              : void 0,
            W = y ?? O["minimap.ariaLabel"];
          return (0, B.jsx)(rC, {
            position: h,
            style: {
              ...e,
              "--xy-minimap-background-color-props":
                "string" == typeof l ? l : void 0,
              "--xy-minimap-mask-background-color-props":
                "string" == typeof d ? d : void 0,
              "--xy-minimap-mask-stroke-color-props":
                "string" == typeof u ? u : void 0,
              "--xy-minimap-mask-stroke-width-props":
                "number" == typeof c ? c * M : void 0,
              "--xy-minimap-node-background-color-props":
                "string" == typeof r ? r : void 0,
              "--xy-minimap-node-stroke-color-props":
                "string" == typeof n ? n : void 0,
              "--xy-minimap-node-stroke-width-props":
                "number" == typeof s ? s : void 0,
            },
            className: z(["react-flow__minimap", t]),
            "data-testid": "rf__minimap",
            children: (0, B.jsxs)("svg", {
              width: j,
              height: I,
              viewBox: `${$} ${L} ${V} ${H}`,
              className: "react-flow__minimap-svg",
              role: "img",
              "aria-labelledby": Z,
              ref: w,
              onClick: p
                ? (e) => {
                    let [t, n] = G.current?.pointer(e) || [0, 0];
                    p(e, { x: t, y: n });
                  }
                : void 0,
              children: [
                W && (0, B.jsx)("title", { id: Z, children: W }),
                (0, B.jsx)(az, {
                  onClick: q,
                  nodeColor: r,
                  nodeStrokeColor: n,
                  nodeBorderRadius: a,
                  nodeClassName: i,
                  nodeStrokeWidth: s,
                  nodeComponent: o,
                }),
                (0, B.jsx)("path", {
                  className: "react-flow__minimap-mask",
                  d: `M${$ - P},${L - P}h${V + 2 * P}v${H + 2 * P}h${-V - 2 * P}z
        M${N.x},${N.y}h${N.width}v${N.height}h${-N.width}z`,
                  fillRule: "evenodd",
                  pointerEvents: "none",
                }),
              ],
            }),
          });
        }
        aZ.displayName = "MiniMap";
        let aU = (0, F.memo)(aZ);
        (p.Line, p.Handle, n(8730));
        let { useDebugValue: aG } = F,
          { useSyncExternalStoreWithSelector: aq } = rr,
          aW = !1,
          aY = (e) => e,
          aK = (e) => {
            "function" != typeof e &&
              console.warn(
                "[DEPRECATED] Passing a vanilla store will be unsupported in a future version. Instead use `import { useStore } from 'zustand'`.",
              );
            let t = "function" == typeof e ? ra(e) : e,
              n = (e, n) =>
                (function (e, t = aY, n) {
                  n &&
                    !aW &&
                    (console.warn(
                      "[DEPRECATED] Use `createWithEqualityFn` instead of `create` or use `useStoreWithEqualityFn` instead of `useStore`. They can be imported from 'zustand/traditional'. https://github.com/pmndrs/zustand/discussions/1937",
                    ),
                    (aW = !0));
                  let r = aq(
                    e.subscribe,
                    e.getState,
                    e.getServerState || e.getInitialState,
                    t,
                    n,
                  );
                  return (aG(r), r);
                })(t, e, n);
            return (Object.assign(n, t), n);
          },
          aX = (e) => (e ? aK(e) : aK);
        ((function (e) {
          ((e.MONOLITH = "MONOLITH"),
            (e.MICROSERVICES = "MICROSERVICES"),
            (e.SERVERLESS = "SERVERLESS"),
            (e.MODULAR_MONOLITH = "MODULAR_MONOLITH"));
        })(m || (m = {})),
          (function (e) {
            ((e.NEXTJS = "NEXTJS"),
              (e.REACT = "REACT"),
              (e.VUE = "VUE"),
              (e.NUXT = "NUXT"),
              (e.ASTRO = "ASTRO"),
              (e.SVELTE = "SVELTE"),
              (e.SVELTEKIT = "SVELTEKIT"));
          })(g || (g = {})),
          (function (e) {
            ((e.NESTJS = "NESTJS"),
              (e.EXPRESS = "EXPRESS"),
              (e.FASTIFY = "FASTIFY"),
              (e.TRPC = "TRPC"),
              (e.GRAPHQL = "GRAPHQL"),
              (e.GRPC = "GRPC"));
          })(y || (y = {})),
          (function (e) {
            ((e.POSTGRESQL = "POSTGRESQL"),
              (e.MYSQL = "MYSQL"),
              (e.MONGODB = "MONGODB"),
              (e.DYNAMODB = "DYNAMODB"),
              (e.COCKROACHDB = "COCKROACHDB"),
              (e.SQLITE = "SQLITE"));
          })(v || (v = {})),
          (function (e) {
            ((e.REDIS = "REDIS"),
              (e.MEMCACHED = "MEMCACHED"),
              (e.NONE = "NONE"));
          })(x || (x = {})),
          (function (e) {
            ((e.RABBITMQ = "RABBITMQ"),
              (e.KAFKA = "KAFKA"),
              (e.SQS = "SQS"),
              (e.NONE = "NONE"));
          })(b || (b = {})),
          (function (e) {
            ((e.AWS = "AWS"),
              (e.GCP = "GCP"),
              (e.AZURE = "AZURE"),
              (e.DIGITAL_OCEAN = "DIGITAL_OCEAN"),
              (e.VERCEL = "VERCEL"));
          })(_ || (_ = {})),
          (function (e) {
            ((e.DOCKER = "DOCKER"), (e.PODMAN = "PODMAN"), (e.NONE = "NONE"));
          })(w || (w = {})),
          (function (e) {
            ((e.KUBERNETES = "KUBERNETES"),
              (e.DOCKER_SWARM = "DOCKER_SWARM"),
              (e.ECS = "ECS"),
              (e.FARGATE = "FARGATE"),
              (e.NONE = "NONE"));
          })(E || (E = {})),
          (function (e) {
            ((e.TAILWIND = "TAILWIND"),
              (e.CSS_MODULES = "CSS_MODULES"),
              (e.STYLED_COMPONENTS = "STYLED_COMPONENTS"),
              (e.SCSS = "SCSS"),
              (e.VANILLA_EXTRACT = "VANILLA_EXTRACT"));
          })(N || (N = {})),
          (function (e) {
            ((e.SHADCN = "SHADCN"),
              (e.MUI = "MUI"),
              (e.CHAKRA = "CHAKRA"),
              (e.ANTD = "ANTD"),
              (e.HEADLESS = "HEADLESS"));
          })(S || (S = {})),
          (function (e) {
            ((e.UNIT = "UNIT"),
              (e.INTEGRATION = "INTEGRATION"),
              (e.E2E = "E2E"),
              (e.CONTRACT = "CONTRACT"),
              (e.PERFORMANCE = "PERFORMANCE"),
              (e.SECURITY = "SECURITY"));
          })(C || (C = {})),
          (function (e) {
            ((e.ESLINT = "ESLINT"),
              (e.PRETTIER = "PRETTIER"),
              (e.COMMITLINT = "COMMITLINT"),
              (e.STYLELINT = "STYLELINT"));
          })(k || (k = {})),
          (function (e) {
            ((e.DEPENDABOT = "DEPENDABOT"),
              (e.SNYK = "SNYK"),
              (e.SEMGREP = "SEMGREP"),
              (e.SONARQUBE = "SONARQUBE"));
          })(A || (A = {})),
          (function (e) {
            ((e.API = "API"),
              (e.ARCHITECTURE = "ARCHITECTURE"),
              (e.RUNBOOK = "RUNBOOK"),
              (e.ADR = "ADR"),
              (e.README = "README"));
          })(T || (T = {})),
          (function (e) {
            ((e.AUTH = "AUTH"),
              (e.AUTH_SSO = "AUTH_SSO"),
              (e.AUTH_MFA = "AUTH_MFA"),
              (e.BILLING = "BILLING"),
              (e.BILLING_USAGE_BASED = "BILLING_USAGE_BASED"),
              (e.MULTI_TENANT = "MULTI_TENANT"),
              (e.AUDIT_LOG = "AUDIT_LOG"),
              (e.SOFT_DELETE = "SOFT_DELETE"),
              (e.ANALYTICS = "ANALYTICS"),
              (e.NOTIFICATIONS = "NOTIFICATIONS"),
              (e.SEARCH = "SEARCH"),
              (e.CDN = "CDN"),
              (e.RATE_LIMITING = "RATE_LIMITING"),
              (e.WEBHOOKS = "WEBHOOKS"),
              (e.WEBSOCKETS = "WEBSOCKETS"),
              (e.I18N = "I18N"),
              (e.ACCESSIBILITY = "ACCESSIBILITY"));
          })(O || (O = {})),
          (function (e) {
            ((e.UUID = "UUID"),
              (e.STRING = "STRING"),
              (e.TEXT = "TEXT"),
              (e.INTEGER = "INTEGER"),
              (e.BIGINT = "BIGINT"),
              (e.DECIMAL = "DECIMAL"),
              (e.FLOAT = "FLOAT"),
              (e.BOOLEAN = "BOOLEAN"),
              (e.DATE = "DATE"),
              (e.DATETIME = "DATETIME"),
              (e.TIMESTAMP = "TIMESTAMP"),
              (e.JSON = "JSON"),
              (e.JSONB = "JSONB"),
              (e.ENUM = "ENUM"),
              (e.ARRAY = "ARRAY"),
              (e.BLOB = "BLOB"),
              (e.RELATION = "RELATION"));
          })(j || (j = {})),
          (function (e) {
            ((e.ONE_TO_ONE = "ONE_TO_ONE"),
              (e.ONE_TO_MANY = "ONE_TO_MANY"),
              (e.MANY_TO_ONE = "MANY_TO_ONE"),
              (e.MANY_TO_MANY = "MANY_TO_MANY"));
          })(I || (I = {})),
          (function (e) {
            ((e.SYNC = "SYNC"),
              (e.ASYNC = "ASYNC"),
              (e.EVENT_DRIVEN = "EVENT_DRIVEN"),
              (e.BATCH = "BATCH"),
              (e.STREAMING = "STREAMING"));
          })(M || (M = {})));
        class aQ {
          constructor(e, t, n = {}) {
            ((this.name = e),
              (this.type = t),
              (this.options = {
                nullable: !1,
                unique: !1,
                indexed: !1,
                default: void 0,
                validators: [],
                relationType: void 0,
                targetEntity: void 0,
                ...n,
              }));
          }
          static uuid(e) {
            return new aQ(e, j.UUID, { nullable: !1 });
          }
          static string(e) {
            return new aQ(e, j.STRING);
          }
          static text(e) {
            return new aQ(e, j.TEXT);
          }
          static integer(e) {
            return new aQ(e, j.INTEGER);
          }
          static bigint(e) {
            return new aQ(e, j.BIGINT);
          }
          static decimal(e) {
            return new aQ(e, j.DECIMAL);
          }
          static boolean(e) {
            return new aQ(e, j.BOOLEAN);
          }
          static date(e) {
            return new aQ(e, j.DATE);
          }
          static datetime(e) {
            return new aQ(e, j.DATETIME);
          }
          static json(e) {
            return new aQ(e, j.JSON);
          }
          static enum(e, t) {
            let n = new aQ(e, j.ENUM);
            return ((n.options.enumValues = t), n);
          }
          static relation(e, t, n) {
            return new aQ(e, j.RELATION, { targetEntity: t, relationType: n });
          }
          required() {
            return new aQ(this.name, this.type, {
              ...this.options,
              nullable: !1,
            });
          }
          nullable() {
            return new aQ(this.name, this.type, {
              ...this.options,
              nullable: !0,
            });
          }
          unique() {
            return new aQ(this.name, this.type, {
              ...this.options,
              unique: !0,
            });
          }
          primary() {
            return new aQ(this.name, this.type, {
              ...this.options,
              unique: !0,
              nullable: !1,
            });
          }
          indexed() {
            return new aQ(this.name, this.type, {
              ...this.options,
              indexed: !0,
            });
          }
          default(e) {
            return new aQ(this.name, this.type, {
              ...this.options,
              default: e,
            });
          }
          validate() {
            let e = [];
            if (
              ((this.name && 0 !== this.name.trim().length) ||
                e.push({
                  path: "name",
                  message: "Field name is required",
                  code: "FIELD_NAME_REQUIRED",
                }),
              /^[a-zA-Z][a-zA-Z0-9_]*$/.test(this.name) ||
                e.push({
                  path: "name",
                  message: "Field name must be a valid identifier",
                  code: "FIELD_NAME_INVALID",
                }),
              this.type === j.ENUM)
            ) {
              let t = this.options.enumValues;
              (t && 0 !== t.length) ||
                e.push({
                  path: "options.enumValues",
                  message: "Enum field must have values",
                  code: "ENUM_VALUES_REQUIRED",
                });
            }
            for (let t of (this.type !== j.RELATION ||
              (this.options.targetEntity ||
                e.push({
                  path: "options.targetEntity",
                  message: "Relation field must specify target entity",
                  code: "TARGET_ENTITY_REQUIRED",
                }),
              this.options.relationType ||
                e.push({
                  path: "options.relationType",
                  message: "Relation field must specify relation type",
                  code: "RELATION_TYPE_REQUIRED",
                })),
            this.options.validators ?? []))
              t.safeParse(void 0).success ||
                e.push({
                  path: "validators",
                  message: "Custom validator failed",
                  code: "VALIDATOR_FAILED",
                });
            return {
              valid: 0 === e.length,
              errors: e,
              data: 0 === e.length ? this : void 0,
            };
          }
          toConfig() {
            return { name: this.name, type: this.type, options: this.options };
          }
          isRelation() {
            return this.type === j.RELATION;
          }
          isRequired() {
            return !this.options.nullable;
          }
        }
        class aJ {
          constructor(e, t = [], n = {}) {
            ((this.name = e),
              (this.fields = t),
              (this.options = {
                description: n.description,
                tableName: n.tableName ?? e.toLowerCase(),
                features: n.features ?? [],
                audited: n.audited ?? !1,
                softDelete: n.softDelete ?? !1,
              }));
          }
          addField(e) {
            return new aJ(this.name, [...this.fields, e], this.options);
          }
          removeField(e) {
            return new aJ(
              this.name,
              this.fields.filter((t) => t.name !== e),
              this.options,
            );
          }
          getField(e) {
            return this.fields.find((t) => t.name === e);
          }
          hasField(e) {
            return this.fields.some((t) => t.name === e);
          }
          getPrimaryField() {
            return this.fields.find(
              (e) => "UUID" === e.type && "id" === e.name,
            );
          }
          getRelationFields() {
            return this.fields.filter((e) => e.isRelation());
          }
          getRequiredFields() {
            return this.fields.filter((e) => e.isRequired());
          }
          enableFeature(e) {
            return this.options.features.includes(e)
              ? this
              : new aJ(this.name, this.fields, {
                  ...this.options,
                  features: [...this.options.features, e],
                });
          }
          disableFeature(e) {
            return new aJ(this.name, this.fields, {
              ...this.options,
              features: this.options.features.filter((t) => t !== e),
            });
          }
          hasFeature(e) {
            return this.options.features.includes(e);
          }
          validate() {
            let e = [];
            ((this.name && 0 !== this.name.trim().length) ||
              e.push({
                path: "name",
                message: "Entity name is required",
                code: "ENTITY_NAME_REQUIRED",
              }),
              /^[A-Z][a-zA-Z0-9]*$/.test(this.name) ||
                e.push({
                  path: "name",
                  message: "Entity name must be PascalCase",
                  code: "ENTITY_NAME_INVALID",
                }),
              0 === this.fields.length &&
                e.push({
                  path: "fields",
                  message: "Entity must have at least one field",
                  code: "ENTITY_NO_FIELDS",
                }));
            let t = new Set();
            for (let n of this.fields) {
              (t.has(n.name) &&
                e.push({
                  path: `fields.${n.name}`,
                  message: `Duplicate field name: ${n.name}`,
                  code: "ENTITY_DUPLICATE_FIELD",
                }),
                t.add(n.name));
              let r = n.validate();
              r.valid ||
                e.push(
                  ...r.errors.map((e) => ({
                    path: `fields.${n.name}.${e.path}`,
                    message: e.message,
                    code: e.code,
                  })),
                );
            }
            return (
              this.hasFeature(O.AUDIT_LOG) &&
                this.hasFeature(O.SOFT_DELETE) &&
                !this.fields.some((e) => "deletedAt" === e.name) &&
                e.push({
                  path: "features",
                  message: "Soft delete requires a deletedAt field",
                  code: "ENTITY_SOFT_DELETE_MISSING_FIELD",
                }),
              {
                valid: 0 === e.length,
                errors: e,
                data: 0 === e.length ? this : void 0,
              }
            );
          }
          toConfig() {
            return {
              name: this.name,
              fields: this.fields.map((e) => e.toConfig()),
              options: this.options,
            };
          }
        }
        class a0 {
          constructor(e, t = {}) {
            ((this.name = e),
              (this.options = {
                description: t.description ?? "",
                architecture: t.architecture ?? m.MODULAR_MONOLITH,
                regions: t.regions ?? ["us-east-1"],
                entities: t.entities ?? [],
                services: t.services ?? [],
                providers: t.providers ?? [],
                frontend: t.frontend ?? {
                  framework: g.NEXTJS,
                  styling: N.TAILWIND,
                  components: S.SHADCN,
                  features: [],
                  pages: [],
                },
                infrastructure: t.infrastructure ?? {
                  cloud: _.VERCEL,
                  containerization: w.NONE,
                  orchestration: E.NONE,
                  database: v.POSTGRESQL,
                  cache: x.REDIS,
                  queue: b.NONE,
                  cdn: !0,
                  regions: ["us-east-1"],
                },
                quality: t.quality ?? {
                  testing: [C.UNIT, C.INTEGRATION],
                  linting: [k.ESLINT, k.PRETTIER],
                  security: [A.DEPENDABOT],
                  documentation: [T.README, T.API],
                },
                version: t.version ?? "1.0.0",
                author: t.author ?? "",
                license: t.license ?? "MIT",
              }));
          }
          addEntity(e) {
            return new a0(this.name, {
              ...this.options,
              entities: [...this.options.entities, e],
            });
          }
          removeEntity(e) {
            return new a0(this.name, {
              ...this.options,
              entities: this.options.entities.filter((t) => t.name !== e),
            });
          }
          getEntity(e) {
            return this.options.entities.find((t) => t.name === e);
          }
          addService(e) {
            return new a0(this.name, {
              ...this.options,
              services: [...this.options.services, e],
            });
          }
          removeService(e) {
            return new a0(this.name, {
              ...this.options,
              services: this.options.services.filter((t) => t.name !== e),
            });
          }
          getService(e) {
            return this.options.services.find((t) => t.name === e);
          }
          enableFeature(e) {
            let t = this.options.entities.map((t) =>
              t.hasFeature(e) ? t : t.enableFeature(e),
            );
            return new a0(this.name, { ...this.options, entities: t });
          }
          hasFeature(e) {
            return this.options.entities.some((t) => t.hasFeature(e));
          }
          dependencies() {
            let e = [];
            for (let t of (this.options.infrastructure.database ===
              v.POSTGRESQL && e.push("postgresql"),
            this.options.infrastructure.cache === x.REDIS && e.push("redis"),
            this.options.infrastructure.queue === b.RABBITMQ &&
              e.push("rabbitmq"),
            this.options.entities))
              (t.hasFeature(O.AUTH) && e.push("auth-provider"),
                t.hasFeature(O.BILLING) && e.push("payment-provider"),
                t.hasFeature(O.ANALYTICS) && e.push("analytics-provider"));
            return [...new Set(e)];
          }
          validate() {
            let e = [];
            for (let t of ((this.name && 0 !== this.name.trim().length) ||
              e.push({
                path: "name",
                message: "Project name is required",
                code: "PROJECT_NAME_REQUIRED",
              }),
            /^[a-z][a-zA-Z0-9_-]*$/.test(this.name) ||
              e.push({
                path: "name",
                message: "Project name must be kebab-case or camelCase",
                code: "PROJECT_NAME_INVALID",
              }),
            0 === this.options.entities.length &&
              e.push({
                path: "entities",
                message: "Project must have at least one entity",
                code: "PROJECT_NO_ENTITIES",
              }),
            this.options.entities)) {
              let n = t.validate();
              n.valid ||
                e.push(
                  ...n.errors.map((e) => ({
                    path: `entities.${t.name}.${e.path}`,
                    message: e.message,
                    code: e.code,
                  })),
                );
            }
            for (let t of this.options.services) {
              let n = t.validate();
              n.valid ||
                e.push(
                  ...n.errors.map((e) => ({
                    path: `services.${t.name}.${e.path}`,
                    message: e.message,
                    code: e.code,
                  })),
                );
            }
            return (
              this.options.architecture === m.MICROSERVICES &&
                0 === this.options.services.length &&
                e.push({
                  path: "services",
                  message:
                    "Microservices architecture requires at least one service",
                  code: "PROJECT_MICROSERVICES_NO_SERVICES",
                }),
              this.options.infrastructure?.regions?.length ||
                e.push({
                  path: "infrastructure.regions",
                  message: "At least one region must be specified",
                  code: "PROJECT_NO_REGIONS",
                }),
              {
                valid: 0 === e.length,
                errors: e,
                data: 0 === e.length ? this : void 0,
              }
            );
          }
          toConfig() {
            return {
              name: this.name,
              version: this.options.version,
              description: this.options.description,
              architecture: this.options.architecture,
              regions: this.options.regions,
              entities: this.options.entities.map((e) => e.toConfig()),
              services: this.options.services.map((e) => e.toConfig()),
              frontend: this.options.frontend,
              infrastructure: this.options.infrastructure,
              quality: this.options.quality,
              dependencies: this.dependencies(),
            };
          }
        }
        class a1 {
          register(e) {
            this.generators.set(e.name, e);
          }
          unregister(e) {
            this.generators.delete(e);
          }
          get(e) {
            return this.generators.get(e);
          }
          list() {
            return Array.from(this.generators.values());
          }
          resolveGenerators(e) {
            let t = [],
              n = new Set();
            for (let t of e.options.entities)
              for (let e of t.options.features) n.add(e);
            for (let r of this.generators.values()) {
              let i =
                  0 === r.supportedArchitectures.length ||
                  r.supportedArchitectures.includes(e.options.architecture),
                a =
                  0 === r.supportedFeatures.length ||
                  r.supportedFeatures.some((e) => n.has(e));
              i && a && t.push(r);
            }
            return t.sort((e, t) => e.name.localeCompare(t.name));
          }
          resolveByFeature(e) {
            return Array.from(this.generators.values()).filter((t) =>
              t.supportedFeatures.includes(e),
            );
          }
          clear() {
            this.generators.clear();
          }
          constructor() {
            this.generators = new Map();
          }
        }
        let a2 = {
          timeoutMs: 3e4,
          maxRetries: 2,
          retryDelayMs: 500,
          circuitBreakerThreshold: 5,
          circuitBreakerResetMs: 6e4,
          failFast: !1,
        };
        class a5 {
          constructor(e, t = {}) {
            ((this.circuit = { failures: 0, lastFailure: 0, open: !1 }),
              (this.generator = e),
              (this.name = e.name),
              (this.version = e.version),
              (this.supportedFeatures = e.supportedFeatures),
              (this.supportedArchitectures = e.supportedArchitectures),
              (this.config = { ...a2, ...t }));
          }
          async generate(e) {
            let t;
            if (this.isCircuitOpen())
              throw Error(
                `Circuit breaker OPEN for generator "${this.name}". Too many failures.`,
              );
            for (let n = 0; n <= this.config.maxRetries; n++)
              try {
                let t = await this.withTimeout(
                  this.generator.generate(e),
                  this.config.timeoutMs,
                );
                return (this.onSuccess(), t);
              } catch (e) {
                ((t = e instanceof Error ? e : Error(String(e))),
                  this.onFailure(),
                  n < this.config.maxRetries &&
                    (await this.delay(
                      this.config.retryDelayMs * Math.pow(2, n),
                    )));
              }
            if (this.config.failFast) throw t;
            return [];
          }
          isCircuitOpen() {
            return (
              !!this.circuit.open &&
              (!(
                Date.now() - this.circuit.lastFailure >
                this.config.circuitBreakerResetMs
              ) ||
                ((this.circuit = { failures: 0, lastFailure: 0, open: !1 }),
                !1))
            );
          }
          onSuccess() {
            this.circuit = { failures: 0, lastFailure: 0, open: !1 };
          }
          onFailure() {
            (this.circuit.failures++,
              (this.circuit.lastFailure = Date.now()),
              this.circuit.failures >= this.config.circuitBreakerThreshold &&
                (this.circuit.open = !0));
          }
          withTimeout(e, t) {
            return new Promise((n, r) => {
              let i = setTimeout(() => {
                r(Error(`Generator "${this.name}" timed out after ${t}ms`));
              }, t);
              e.then((e) => {
                (clearTimeout(i), n(e));
              }).catch((e) => {
                (clearTimeout(i), r(e));
              });
            });
          }
          delay(e) {
            return new Promise((t) => setTimeout(t, e));
          }
        }
        class a4 {
          recordStart(e) {
            this.generators.get(e) ||
              this.generators.set(e, {
                name: e,
                calls: 0,
                successes: 0,
                failures: 0,
                timeouts: 0,
                totalDurationMs: 0,
                avgDurationMs: 0,
                artifactsGenerated: 0,
              });
          }
          recordSuccess(e, t, n) {
            let r = this.generators.get(e);
            (r.calls++,
              r.successes++,
              (r.totalDurationMs += t),
              (r.artifactsGenerated += n),
              (r.avgDurationMs = Math.round(r.totalDurationMs / r.calls)),
              (r.lastRunAt = Date.now()),
              this.overall.totalRuns++,
              (this.overall.totalArtifacts += n),
              (this.overall.totalDurationMs += t));
          }
          recordFailure(e, t, n) {
            let r = this.generators.get(e);
            (r.calls++,
              "timeout" === n ? r.timeouts++ : r.failures++,
              (r.totalDurationMs += t),
              (r.avgDurationMs = Math.round(r.totalDurationMs / r.calls)),
              (r.lastRunAt = Date.now()),
              this.overall.totalRuns++,
              this.overall.totalFailures++,
              (this.overall.totalDurationMs += t));
          }
          getGeneratorMetrics(e) {
            return this.generators.get(e);
          }
          getAllMetrics() {
            return Array.from(this.generators.values());
          }
          getSummary() {
            return {
              ...this.overall,
              successRate: this.overall.totalRuns
                ? Math.round(
                    ((this.overall.totalRuns - this.overall.totalFailures) /
                      this.overall.totalRuns) *
                      100,
                  )
                : 100,
              avgDurationMs: this.overall.totalRuns
                ? Math.round(
                    this.overall.totalDurationMs / this.overall.totalRuns,
                  )
                : 0,
              generators: this.getAllMetrics(),
            };
          }
          reset() {
            (this.generators.clear(),
              (this.overall.totalRuns = 0),
              (this.overall.totalFailures = 0),
              (this.overall.totalArtifacts = 0),
              (this.overall.totalDurationMs = 0));
          }
          toJSON() {
            return JSON.stringify(
              {
                timestamp: new Date().toISOString(),
                summary: this.getSummary(),
                generators: this.getAllMetrics(),
              },
              null,
              2,
            );
          }
          constructor() {
            ((this.generators = new Map()),
              (this.overall = {
                totalRuns: 0,
                totalFailures: 0,
                totalArtifacts: 0,
                totalDurationMs: 0,
              }));
          }
        }
        class a3 {
          constructor(e, t) {
            ((this.metrics = new a4()),
              (this.registry = e ?? new a1()),
              (this.resilienceConfig = t));
          }
          async generate(e) {
            let t = Date.now(),
              n = [],
              r = [],
              i = [],
              a = [];
            try {
              a.push("validation");
              let s = this.validateProject(e.project);
              if (!s.valid)
                return {
                  success: !1,
                  artifacts: [],
                  errors: s.errors.map((e) => ({
                    phase: "validation",
                    path: e.path,
                    message: e.message,
                    code: e.code,
                  })),
                  warnings: [],
                  metadata: {
                    duration: Date.now() - t,
                    artifactsGenerated: 0,
                    dependencies: [],
                    phases: a,
                  },
                };
              a.push("dependency-resolution");
              let o = e.project.dependencies();
              a.push("generation");
              let l = this.registry.resolveGenerators(e.project),
                d = Number(process.env.SBC_GENERATOR_CONCURRENCY ?? 5);
              for (let t = 0; t < l.length; t += d) {
                let a = l.slice(t, t + d);
                for (let t of await Promise.all(
                  a.map(async (t) => {
                    let i = Date.now();
                    this.metrics.recordStart(t.name);
                    let a = this.resilienceConfig
                      ? new a5(t, this.resilienceConfig)
                      : t;
                    try {
                      let n = await a.generate(e);
                      return (
                        this.metrics.recordSuccess(
                          t.name,
                          Date.now() - i,
                          n.length,
                        ),
                        { artifacts: n, error: void 0 }
                      );
                    } catch (o) {
                      let e = Date.now() - i,
                        a = o instanceof Error ? o : Error(String(o)),
                        s = a.message.includes("timed out");
                      if (
                        (this.metrics.recordFailure(
                          t.name,
                          e,
                          s ? "timeout" : "error",
                        ),
                        n.push({
                          phase: "generation",
                          path: t.name,
                          message: a.message,
                          code: s ? "GENERATOR_TIMEOUT" : "GENERATOR_FAILED",
                          stack: a.stack,
                        }),
                        this.resilienceConfig?.failFast)
                      )
                        return { artifacts: [], error: a };
                      return (
                        r.push({
                          phase: "generation",
                          path: t.name,
                          message: `Generator "${t.name}" failed and was skipped (graceful degradation). Set failFast=true to abort.`,
                          code: "GENERATOR_DEGRADED",
                        }),
                        { artifacts: [], error: void 0 }
                      );
                    }
                  }),
                )) {
                  if (t.error && this.resilienceConfig?.failFast) throw t.error;
                  i.push(...t.artifacts);
                }
              }
              a.push("merge");
              let u = this.mergeArtifacts(i, r);
              a.push("post-process");
              let c = await this.postProcess(u, e);
              return {
                success: 0 === n.length,
                artifacts: c,
                errors: n,
                warnings: r,
                metadata: {
                  duration: Date.now() - t,
                  artifactsGenerated: c.length,
                  dependencies: o,
                  phases: a,
                },
              };
            } catch (s) {
              let e = s instanceof Error ? s : Error(String(s));
              return (
                n.push({
                  phase: "engine",
                  path: "GenerationEngine",
                  message: e.message,
                  code: "ENGINE_FATAL",
                  stack: e.stack,
                }),
                {
                  success: !1,
                  artifacts: i,
                  errors: n,
                  warnings: r,
                  metadata: {
                    duration: Date.now() - t,
                    artifactsGenerated: i.length,
                    dependencies: [],
                    phases: a,
                  },
                }
              );
            }
          }
          validateProject(e) {
            return e.validate();
          }
          mergeArtifacts(e, t) {
            let n = new Map();
            for (let t of e) {
              let e = n.get(t.path) ?? [];
              (e.push(t), n.set(t.path, e));
            }
            let r = [];
            for (let [e, i] of n) {
              if (1 === i.length) {
                r.push(i[0]);
                continue;
              }
              let n = i[0],
                a = n.content,
                s = i.map((e) => e.metadata?.generator ?? "unknown");
              for (let n = 1; n < i.length; n++) {
                let r = i[n],
                  s = this.detectMergeStrategy(a, r.content);
                if ("json" === s)
                  try {
                    let e = JSON.parse(a),
                      t = JSON.parse(r.content);
                    a = JSON.stringify(this.deepMerge(e, t), null, 2);
                  } catch {
                    ((a = r.content),
                      t.push({
                        phase: "merge",
                        path: e,
                        message: `JSON merge failed for ${e}, used last content`,
                        code: "MERGE_JSON_FALLBACK",
                      }));
                  }
                else
                  "append" === s
                    ? (a = a + "\n" + r.content)
                    : ((a = r.content),
                      t.push({
                        phase: "merge",
                        path: e,
                        message: `Path collision: ${e} overwritten by ${r.metadata?.generator ?? "unknown"}`,
                        code: "ARTIFACT_OVERWRITTEN",
                      }));
              }
              r.push({
                path: e,
                content: a,
                language: n.language,
                metadata: { ...n.metadata, mergedFrom: i.length, mergedBy: s },
              });
            }
            return r;
          }
          detectMergeStrategy(e, t) {
            let n = e.trim(),
              r = t.trim();
            return ((n.startsWith("{") && n.endsWith("}")) ||
              (n.startsWith("[") && n.endsWith("]"))) &&
              ((r.startsWith("{") && r.endsWith("}")) ||
                (r.startsWith("[") && r.endsWith("]")))
              ? "json"
              : n.includes("\n") && r.includes("\n") && !n.startsWith("{")
                ? "append"
                : "overwrite";
          }
          deepMerge(e, t) {
            if (
              "object" != typeof e ||
              null === e ||
              "object" != typeof t ||
              null === t
            )
              return t;
            if (Array.isArray(e) && Array.isArray(t))
              return [...new Set([...e, ...t])];
            if (Array.isArray(e) || Array.isArray(t)) return t;
            let n = { ...e };
            for (let [e, r] of Object.entries(t))
              e in n ? (n[e] = this.deepMerge(n[e], r)) : (n[e] = r);
            return n;
          }
          async postProcess(e, t) {
            return e.map((e) => ({
              ...e,
              content: this.applyTemplateOverrides(
                e.content,
                t.templateOverrides,
              ),
            }));
          }
          applyTemplateOverrides(e, t) {
            if (!t) return e;
            let n = e;
            for (let [e, r] of Object.entries(t))
              n = n.replace(RegExp(`{{${e}}}`, "g"), r);
            return n;
          }
        }
        (require("fs/promises"),
          n(1017),
          require("url"),
          (function (e) {
            ((e.assertEqual = (e) => {}),
              (e.assertIs = function (e) {}),
              (e.assertNever = function (e) {
                throw Error();
              }),
              (e.arrayToEnum = (e) => {
                let t = {};
                for (let n of e) t[n] = n;
                return t;
              }),
              (e.getValidEnumValues = (t) => {
                let n = e
                    .objectKeys(t)
                    .filter((e) => "number" != typeof t[t[e]]),
                  r = {};
                for (let e of n) r[e] = t[e];
                return e.objectValues(r);
              }),
              (e.objectValues = (t) =>
                e.objectKeys(t).map(function (e) {
                  return t[e];
                })),
              (e.objectKeys =
                "function" == typeof Object.keys
                  ? (e) => Object.keys(e)
                  : (e) => {
                      let t = [];
                      for (let n in e)
                        Object.prototype.hasOwnProperty.call(e, n) && t.push(n);
                      return t;
                    }),
              (e.find = (e, t) => {
                for (let n of e) if (t(n)) return n;
              }),
              (e.isInteger =
                "function" == typeof Number.isInteger
                  ? (e) => Number.isInteger(e)
                  : (e) =>
                      "number" == typeof e &&
                      Number.isFinite(e) &&
                      Math.floor(e) === e),
              (e.joinValues = function (e, t = " | ") {
                return e
                  .map((e) => ("string" == typeof e ? `'${e}'` : e))
                  .join(t);
              }),
              (e.jsonStringifyReplacer = (e, t) =>
                "bigint" == typeof t ? t.toString() : t));
          })(R || (R = {})),
          ((D || (D = {})).mergeShapes = (e, t) => ({ ...e, ...t })));
        let a6 = R.arrayToEnum([
            "string",
            "nan",
            "number",
            "integer",
            "float",
            "boolean",
            "date",
            "bigint",
            "symbol",
            "function",
            "undefined",
            "null",
            "array",
            "object",
            "unknown",
            "promise",
            "void",
            "never",
            "map",
            "set",
          ]),
          a9 = (e) => {
            switch (typeof e) {
              case "undefined":
                return a6.undefined;
              case "string":
                return a6.string;
              case "number":
                return Number.isNaN(e) ? a6.nan : a6.number;
              case "boolean":
                return a6.boolean;
              case "function":
                return a6.function;
              case "bigint":
                return a6.bigint;
              case "symbol":
                return a6.symbol;
              case "object":
                if (Array.isArray(e)) return a6.array;
                if (null === e) return a6.null;
                if (
                  e.then &&
                  "function" == typeof e.then &&
                  e.catch &&
                  "function" == typeof e.catch
                )
                  return a6.promise;
                if ("undefined" != typeof Map && e instanceof Map)
                  return a6.map;
                if ("undefined" != typeof Set && e instanceof Set)
                  return a6.set;
                if ("undefined" != typeof Date && e instanceof Date)
                  return a6.date;
                return a6.object;
              default:
                return a6.unknown;
            }
          },
          a7 = R.arrayToEnum([
            "invalid_type",
            "invalid_literal",
            "custom",
            "invalid_union",
            "invalid_union_discriminator",
            "invalid_enum_value",
            "unrecognized_keys",
            "invalid_arguments",
            "invalid_return_type",
            "invalid_date",
            "invalid_string",
            "too_small",
            "too_big",
            "invalid_intersection_types",
            "not_multiple_of",
            "not_finite",
          ]);
        class a8 extends Error {
          get errors() {
            return this.issues;
          }
          constructor(e) {
            (super(),
              (this.issues = []),
              (this.addIssue = (e) => {
                this.issues = [...this.issues, e];
              }),
              (this.addIssues = (e = []) => {
                this.issues = [...this.issues, ...e];
              }));
            let t = new.target.prototype;
            (Object.setPrototypeOf
              ? Object.setPrototypeOf(this, t)
              : (this.__proto__ = t),
              (this.name = "ZodError"),
              (this.issues = e));
          }
          format(e) {
            let t =
                e ||
                function (e) {
                  return e.message;
                },
              n = { _errors: [] },
              r = (e) => {
                for (let i of e.issues)
                  if ("invalid_union" === i.code) i.unionErrors.map(r);
                  else if ("invalid_return_type" === i.code)
                    r(i.returnTypeError);
                  else if ("invalid_arguments" === i.code) r(i.argumentsError);
                  else if (0 === i.path.length) n._errors.push(t(i));
                  else {
                    let e = n,
                      r = 0;
                    for (; r < i.path.length;) {
                      let n = i.path[r];
                      (r === i.path.length - 1
                        ? ((e[n] = e[n] || { _errors: [] }),
                          e[n]._errors.push(t(i)))
                        : (e[n] = e[n] || { _errors: [] }),
                        (e = e[n]),
                        r++);
                    }
                  }
              };
            return (r(this), n);
          }
          static assert(e) {
            if (!(e instanceof a8)) throw Error(`Not a ZodError: ${e}`);
          }
          toString() {
            return this.message;
          }
          get message() {
            return JSON.stringify(this.issues, R.jsonStringifyReplacer, 2);
          }
          get isEmpty() {
            return 0 === this.issues.length;
          }
          flatten(e = (e) => e.message) {
            let t = {},
              n = [];
            for (let r of this.issues)
              if (r.path.length > 0) {
                let n = r.path[0];
                ((t[n] = t[n] || []), t[n].push(e(r)));
              } else n.push(e(r));
            return { formErrors: n, fieldErrors: t };
          }
          get formErrors() {
            return this.flatten();
          }
        }
        a8.create = (e) => new a8(e);
        let se = (e, t) => {
          let n;
          switch (e.code) {
            case a7.invalid_type:
              n =
                e.received === a6.undefined
                  ? "Required"
                  : `Expected ${e.expected}, received ${e.received}`;
              break;
            case a7.invalid_literal:
              n = `Invalid literal value, expected ${JSON.stringify(e.expected, R.jsonStringifyReplacer)}`;
              break;
            case a7.unrecognized_keys:
              n = `Unrecognized key(s) in object: ${R.joinValues(e.keys, ", ")}`;
              break;
            case a7.invalid_union:
              n = "Invalid input";
              break;
            case a7.invalid_union_discriminator:
              n = `Invalid discriminator value. Expected ${R.joinValues(e.options)}`;
              break;
            case a7.invalid_enum_value:
              n = `Invalid enum value. Expected ${R.joinValues(e.options)}, received '${e.received}'`;
              break;
            case a7.invalid_arguments:
              n = "Invalid function arguments";
              break;
            case a7.invalid_return_type:
              n = "Invalid function return type";
              break;
            case a7.invalid_date:
              n = "Invalid date";
              break;
            case a7.invalid_string:
              "object" == typeof e.validation
                ? "includes" in e.validation
                  ? ((n = `Invalid input: must include "${e.validation.includes}"`),
                    "number" == typeof e.validation.position &&
                      (n = `${n} at one or more positions greater than or equal to ${e.validation.position}`))
                  : "startsWith" in e.validation
                    ? (n = `Invalid input: must start with "${e.validation.startsWith}"`)
                    : "endsWith" in e.validation
                      ? (n = `Invalid input: must end with "${e.validation.endsWith}"`)
                      : R.assertNever(e.validation)
                : (n =
                    "regex" !== e.validation
                      ? `Invalid ${e.validation}`
                      : "Invalid");
              break;
            case a7.too_small:
              n =
                "array" === e.type
                  ? `Array must contain ${e.exact ? "exactly" : e.inclusive ? "at least" : "more than"} ${e.minimum} element(s)`
                  : "string" === e.type
                    ? `String must contain ${e.exact ? "exactly" : e.inclusive ? "at least" : "over"} ${e.minimum} character(s)`
                    : "number" === e.type
                      ? `Number must be ${e.exact ? "exactly equal to " : e.inclusive ? "greater than or equal to " : "greater than "}${e.minimum}`
                      : "bigint" === e.type
                        ? `Number must be ${e.exact ? "exactly equal to " : e.inclusive ? "greater than or equal to " : "greater than "}${e.minimum}`
                        : "date" === e.type
                          ? `Date must be ${e.exact ? "exactly equal to " : e.inclusive ? "greater than or equal to " : "greater than "}${new Date(Number(e.minimum))}`
                          : "Invalid input";
              break;
            case a7.too_big:
              n =
                "array" === e.type
                  ? `Array must contain ${e.exact ? "exactly" : e.inclusive ? "at most" : "less than"} ${e.maximum} element(s)`
                  : "string" === e.type
                    ? `String must contain ${e.exact ? "exactly" : e.inclusive ? "at most" : "under"} ${e.maximum} character(s)`
                    : "number" === e.type
                      ? `Number must be ${e.exact ? "exactly" : e.inclusive ? "less than or equal to" : "less than"} ${e.maximum}`
                      : "bigint" === e.type
                        ? `BigInt must be ${e.exact ? "exactly" : e.inclusive ? "less than or equal to" : "less than"} ${e.maximum}`
                        : "date" === e.type
                          ? `Date must be ${e.exact ? "exactly" : e.inclusive ? "smaller than or equal to" : "smaller than"} ${new Date(Number(e.maximum))}`
                          : "Invalid input";
              break;
            case a7.custom:
              n = "Invalid input";
              break;
            case a7.invalid_intersection_types:
              n = "Intersection results could not be merged";
              break;
            case a7.not_multiple_of:
              n = `Number must be a multiple of ${e.multipleOf}`;
              break;
            case a7.not_finite:
              n = "Number must be finite";
              break;
            default:
              ((n = t.defaultError), R.assertNever(e));
          }
          return { message: n };
        };
        !(function (e) {
          ((e.errToObj = (e) =>
            "string" == typeof e ? { message: e } : e || {}),
            (e.toString = (e) => ("string" == typeof e ? e : e?.message)));
        })(P || (P = {}));
        let st = (e) => {
          let { data: t, path: n, errorMaps: r, issueData: i } = e,
            a = [...n, ...(i.path || [])],
            s = { ...i, path: a };
          if (void 0 !== i.message)
            return { ...i, path: a, message: i.message };
          let o = "";
          for (let e of r
            .filter((e) => !!e)
            .slice()
            .reverse())
            o = e(s, { data: t, defaultError: o }).message;
          return { ...i, path: a, message: o };
        };
        function sn(e, t) {
          let n = st({
            issueData: t,
            data: e.data,
            path: e.path,
            errorMaps: [
              e.common.contextualErrorMap,
              e.schemaErrorMap,
              se,
              se == se ? void 0 : se,
            ].filter((e) => !!e),
          });
          e.common.issues.push(n);
        }
        class sr {
          constructor() {
            this.value = "valid";
          }
          dirty() {
            "valid" === this.value && (this.value = "dirty");
          }
          abort() {
            "aborted" !== this.value && (this.value = "aborted");
          }
          static mergeArray(e, t) {
            let n = [];
            for (let r of t) {
              if ("aborted" === r.status) return si;
              ("dirty" === r.status && e.dirty(), n.push(r.value));
            }
            return { status: e.value, value: n };
          }
          static async mergeObjectAsync(e, t) {
            let n = [];
            for (let e of t) {
              let t = await e.key,
                r = await e.value;
              n.push({ key: t, value: r });
            }
            return sr.mergeObjectSync(e, n);
          }
          static mergeObjectSync(e, t) {
            let n = {};
            for (let r of t) {
              let { key: t, value: i } = r;
              if ("aborted" === t.status || "aborted" === i.status) return si;
              ("dirty" === t.status && e.dirty(),
                "dirty" === i.status && e.dirty(),
                "__proto__" !== t.value &&
                  (void 0 !== i.value || r.alwaysSet) &&
                  (n[t.value] = i.value));
            }
            return { status: e.value, value: n };
          }
        }
        let si = Object.freeze({ status: "aborted" }),
          sa = (e) => ({ status: "dirty", value: e }),
          ss = (e) => ({ status: "valid", value: e }),
          so = (e) => "aborted" === e.status,
          sl = (e) => "dirty" === e.status,
          sd = (e) => "valid" === e.status,
          su = (e) => "undefined" != typeof Promise && e instanceof Promise;
        class sc {
          constructor(e, t, n, r) {
            ((this._cachedPath = []),
              (this.parent = e),
              (this.data = t),
              (this._path = n),
              (this._key = r));
          }
          get path() {
            return (
              this._cachedPath.length ||
                (Array.isArray(this._key)
                  ? this._cachedPath.push(...this._path, ...this._key)
                  : this._cachedPath.push(...this._path, this._key)),
              this._cachedPath
            );
          }
        }
        let sh = (e, t) => {
          if (sd(t)) return { success: !0, data: t.value };
          if (!e.common.issues.length)
            throw Error("Validation failed but no issues detected.");
          return {
            success: !1,
            get error() {
              if (this._error) return this._error;
              let t = new a8(e.common.issues);
              return ((this._error = t), this._error);
            },
          };
        };
        function sp(e) {
          if (!e) return {};
          let {
            errorMap: t,
            invalid_type_error: n,
            required_error: r,
            description: i,
          } = e;
          if (t && (n || r))
            throw Error(
              'Can\'t use "invalid_type_error" or "required_error" in conjunction with custom error map.',
            );
          return t
            ? { errorMap: t, description: i }
            : {
                errorMap: (t, i) => {
                  let { message: a } = e;
                  return "invalid_enum_value" === t.code
                    ? { message: a ?? i.defaultError }
                    : void 0 === i.data
                      ? { message: a ?? r ?? i.defaultError }
                      : "invalid_type" !== t.code
                        ? { message: i.defaultError }
                        : { message: a ?? n ?? i.defaultError };
                },
                description: i,
              };
        }
        class sf {
          get description() {
            return this._def.description;
          }
          _getType(e) {
            return a9(e.data);
          }
          _getOrReturnCtx(e, t) {
            return (
              t || {
                common: e.parent.common,
                data: e.data,
                parsedType: a9(e.data),
                schemaErrorMap: this._def.errorMap,
                path: e.path,
                parent: e.parent,
              }
            );
          }
          _processInputParams(e) {
            return {
              status: new sr(),
              ctx: {
                common: e.parent.common,
                data: e.data,
                parsedType: a9(e.data),
                schemaErrorMap: this._def.errorMap,
                path: e.path,
                parent: e.parent,
              },
            };
          }
          _parseSync(e) {
            let t = this._parse(e);
            if (su(t)) throw Error("Synchronous parse encountered promise.");
            return t;
          }
          _parseAsync(e) {
            return Promise.resolve(this._parse(e));
          }
          parse(e, t) {
            let n = this.safeParse(e, t);
            if (n.success) return n.data;
            throw n.error;
          }
          safeParse(e, t) {
            let n = {
                common: {
                  issues: [],
                  async: t?.async ?? !1,
                  contextualErrorMap: t?.errorMap,
                },
                path: t?.path || [],
                schemaErrorMap: this._def.errorMap,
                parent: null,
                data: e,
                parsedType: a9(e),
              },
              r = this._parseSync({ data: e, path: n.path, parent: n });
            return sh(n, r);
          }
          "~validate"(e) {
            let t = {
              common: { issues: [], async: !!this["~standard"].async },
              path: [],
              schemaErrorMap: this._def.errorMap,
              parent: null,
              data: e,
              parsedType: a9(e),
            };
            if (!this["~standard"].async)
              try {
                let n = this._parseSync({ data: e, path: [], parent: t });
                return sd(n) ? { value: n.value } : { issues: t.common.issues };
              } catch (e) {
                (e?.message?.toLowerCase()?.includes("encountered") &&
                  (this["~standard"].async = !0),
                  (t.common = { issues: [], async: !0 }));
              }
            return this._parseAsync({ data: e, path: [], parent: t }).then(
              (e) => (sd(e) ? { value: e.value } : { issues: t.common.issues }),
            );
          }
          async parseAsync(e, t) {
            let n = await this.safeParseAsync(e, t);
            if (n.success) return n.data;
            throw n.error;
          }
          async safeParseAsync(e, t) {
            let n = {
                common: {
                  issues: [],
                  contextualErrorMap: t?.errorMap,
                  async: !0,
                },
                path: t?.path || [],
                schemaErrorMap: this._def.errorMap,
                parent: null,
                data: e,
                parsedType: a9(e),
              },
              r = this._parse({ data: e, path: n.path, parent: n });
            return sh(n, await (su(r) ? r : Promise.resolve(r)));
          }
          refine(e, t) {
            let n = (e) =>
              "string" == typeof t || void 0 === t
                ? { message: t }
                : "function" == typeof t
                  ? t(e)
                  : t;
            return this._refinement((t, r) => {
              let i = e(t),
                a = () => r.addIssue({ code: a7.custom, ...n(t) });
              return "undefined" != typeof Promise && i instanceof Promise
                ? i.then((e) => !!e || (a(), !1))
                : !!i || (a(), !1);
            });
          }
          refinement(e, t) {
            return this._refinement(
              (n, r) =>
                !!e(n) ||
                (r.addIssue("function" == typeof t ? t(n, r) : t), !1),
            );
          }
          _refinement(e) {
            return new s9({
              schema: this,
              typeName: $.ZodEffects,
              effect: { type: "refinement", refinement: e },
            });
          }
          superRefine(e) {
            return this._refinement(e);
          }
          constructor(e) {
            ((this.spa = this.safeParseAsync),
              (this._def = e),
              (this.parse = this.parse.bind(this)),
              (this.safeParse = this.safeParse.bind(this)),
              (this.parseAsync = this.parseAsync.bind(this)),
              (this.safeParseAsync = this.safeParseAsync.bind(this)),
              (this.spa = this.spa.bind(this)),
              (this.refine = this.refine.bind(this)),
              (this.refinement = this.refinement.bind(this)),
              (this.superRefine = this.superRefine.bind(this)),
              (this.optional = this.optional.bind(this)),
              (this.nullable = this.nullable.bind(this)),
              (this.nullish = this.nullish.bind(this)),
              (this.array = this.array.bind(this)),
              (this.promise = this.promise.bind(this)),
              (this.or = this.or.bind(this)),
              (this.and = this.and.bind(this)),
              (this.transform = this.transform.bind(this)),
              (this.brand = this.brand.bind(this)),
              (this.default = this.default.bind(this)),
              (this.catch = this.catch.bind(this)),
              (this.describe = this.describe.bind(this)),
              (this.pipe = this.pipe.bind(this)),
              (this.readonly = this.readonly.bind(this)),
              (this.isNullable = this.isNullable.bind(this)),
              (this.isOptional = this.isOptional.bind(this)),
              (this["~standard"] = {
                version: 1,
                vendor: "zod",
                validate: (e) => this["~validate"](e),
              }));
          }
          optional() {
            return s7.create(this, this._def);
          }
          nullable() {
            return s8.create(this, this._def);
          }
          nullish() {
            return this.nullable().optional();
          }
          array() {
            return sZ.create(this);
          }
          promise() {
            return s6.create(this, this._def);
          }
          or(e) {
            return sG.create([this, e], this._def);
          }
          and(e) {
            return sY.create(this, e, this._def);
          }
          transform(e) {
            return new s9({
              ...sp(this._def),
              schema: this,
              typeName: $.ZodEffects,
              effect: { type: "transform", transform: e },
            });
          }
          default(e) {
            return new oe({
              ...sp(this._def),
              innerType: this,
              defaultValue: "function" == typeof e ? e : () => e,
              typeName: $.ZodDefault,
            });
          }
          brand() {
            return new or({
              typeName: $.ZodBranded,
              type: this,
              ...sp(this._def),
            });
          }
          catch(e) {
            return new ot({
              ...sp(this._def),
              innerType: this,
              catchValue: "function" == typeof e ? e : () => e,
              typeName: $.ZodCatch,
            });
          }
          describe(e) {
            return new this.constructor({ ...this._def, description: e });
          }
          pipe(e) {
            return oi.create(this, e);
          }
          readonly() {
            return oa.create(this);
          }
          isOptional() {
            return this.safeParse(void 0).success;
          }
          isNullable() {
            return this.safeParse(null).success;
          }
        }
        let sm = /^c[^\s-]{8,}$/i,
          sg = /^[0-9a-z]+$/,
          sy = /^[0-9A-HJKMNP-TV-Z]{26}$/i,
          sv =
            /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/i,
          sx = /^[a-z0-9_-]{21}$/i,
          sb = /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]*$/,
          s_ =
            /^[-+]?P(?!$)(?:(?:[-+]?\d+Y)|(?:[-+]?\d+[.,]\d+Y$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:(?:[-+]?\d+W)|(?:[-+]?\d+[.,]\d+W$))?(?:(?:[-+]?\d+D)|(?:[-+]?\d+[.,]\d+D$))?(?:T(?=[\d+-])(?:(?:[-+]?\d+H)|(?:[-+]?\d+[.,]\d+H$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:[-+]?\d+(?:[.,]\d+)?S)?)??$/,
          sw =
            /^(?!\.)(?!.*\.\.)([A-Z0-9_'+\-\.]*)[A-Z0-9_+-]@([A-Z0-9][A-Z0-9\-]*\.)+[A-Z]{2,}$/i,
          sE =
            /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/,
          sN =
            /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/(3[0-2]|[12]?[0-9])$/,
          sS =
            /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))$/,
          sC =
            /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/,
          sk =
            /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/,
          sA =
            /^([0-9a-zA-Z-_]{4})*(([0-9a-zA-Z-_]{2}(==)?)|([0-9a-zA-Z-_]{3}(=)?))?$/,
          sT =
            "((\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-((0[13578]|1[02])-(0[1-9]|[12]\\d|3[01])|(0[469]|11)-(0[1-9]|[12]\\d|30)|(02)-(0[1-9]|1\\d|2[0-8])))",
          sO = RegExp(`^${sT}$`);
        function sj(e) {
          let t = "[0-5]\\d";
          e.precision
            ? (t = `${t}\\.\\d{${e.precision}}`)
            : null == e.precision && (t = `${t}(\\.\\d+)?`);
          let n = e.precision ? "+" : "?";
          return `([01]\\d|2[0-3]):[0-5]\\d(:${t})${n}`;
        }
        class sI extends sf {
          _parse(e) {
            var t, n, i, a;
            let s;
            if (
              (this._def.coerce && (e.data = String(e.data)),
              this._getType(e) !== a6.string)
            ) {
              let t = this._getOrReturnCtx(e);
              return (
                sn(t, {
                  code: a7.invalid_type,
                  expected: a6.string,
                  received: t.parsedType,
                }),
                si
              );
            }
            let o = new sr();
            for (let l of this._def.checks)
              if ("min" === l.kind)
                e.data.length < l.value &&
                  (sn((s = this._getOrReturnCtx(e, s)), {
                    code: a7.too_small,
                    minimum: l.value,
                    type: "string",
                    inclusive: !0,
                    exact: !1,
                    message: l.message,
                  }),
                  o.dirty());
              else if ("max" === l.kind)
                e.data.length > l.value &&
                  (sn((s = this._getOrReturnCtx(e, s)), {
                    code: a7.too_big,
                    maximum: l.value,
                    type: "string",
                    inclusive: !0,
                    exact: !1,
                    message: l.message,
                  }),
                  o.dirty());
              else if ("length" === l.kind) {
                let t = e.data.length > l.value,
                  n = e.data.length < l.value;
                (t || n) &&
                  ((s = this._getOrReturnCtx(e, s)),
                  t
                    ? sn(s, {
                        code: a7.too_big,
                        maximum: l.value,
                        type: "string",
                        inclusive: !0,
                        exact: !0,
                        message: l.message,
                      })
                    : n &&
                      sn(s, {
                        code: a7.too_small,
                        minimum: l.value,
                        type: "string",
                        inclusive: !0,
                        exact: !0,
                        message: l.message,
                      }),
                  o.dirty());
              } else if ("email" === l.kind)
                sw.test(e.data) ||
                  (sn((s = this._getOrReturnCtx(e, s)), {
                    validation: "email",
                    code: a7.invalid_string,
                    message: l.message,
                  }),
                  o.dirty());
              else if ("emoji" === l.kind)
                (r ||
                  (r = RegExp(
                    "^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$",
                    "u",
                  )),
                  r.test(e.data) ||
                    (sn((s = this._getOrReturnCtx(e, s)), {
                      validation: "emoji",
                      code: a7.invalid_string,
                      message: l.message,
                    }),
                    o.dirty()));
              else if ("uuid" === l.kind)
                sv.test(e.data) ||
                  (sn((s = this._getOrReturnCtx(e, s)), {
                    validation: "uuid",
                    code: a7.invalid_string,
                    message: l.message,
                  }),
                  o.dirty());
              else if ("nanoid" === l.kind)
                sx.test(e.data) ||
                  (sn((s = this._getOrReturnCtx(e, s)), {
                    validation: "nanoid",
                    code: a7.invalid_string,
                    message: l.message,
                  }),
                  o.dirty());
              else if ("cuid" === l.kind)
                sm.test(e.data) ||
                  (sn((s = this._getOrReturnCtx(e, s)), {
                    validation: "cuid",
                    code: a7.invalid_string,
                    message: l.message,
                  }),
                  o.dirty());
              else if ("cuid2" === l.kind)
                sg.test(e.data) ||
                  (sn((s = this._getOrReturnCtx(e, s)), {
                    validation: "cuid2",
                    code: a7.invalid_string,
                    message: l.message,
                  }),
                  o.dirty());
              else if ("ulid" === l.kind)
                sy.test(e.data) ||
                  (sn((s = this._getOrReturnCtx(e, s)), {
                    validation: "ulid",
                    code: a7.invalid_string,
                    message: l.message,
                  }),
                  o.dirty());
              else if ("url" === l.kind)
                try {
                  new URL(e.data);
                } catch {
                  (sn((s = this._getOrReturnCtx(e, s)), {
                    validation: "url",
                    code: a7.invalid_string,
                    message: l.message,
                  }),
                    o.dirty());
                }
              else
                "regex" === l.kind
                  ? ((l.regex.lastIndex = 0),
                    l.regex.test(e.data) ||
                      (sn((s = this._getOrReturnCtx(e, s)), {
                        validation: "regex",
                        code: a7.invalid_string,
                        message: l.message,
                      }),
                      o.dirty()))
                  : "trim" === l.kind
                    ? (e.data = e.data.trim())
                    : "includes" === l.kind
                      ? e.data.includes(l.value, l.position) ||
                        (sn((s = this._getOrReturnCtx(e, s)), {
                          code: a7.invalid_string,
                          validation: {
                            includes: l.value,
                            position: l.position,
                          },
                          message: l.message,
                        }),
                        o.dirty())
                      : "toLowerCase" === l.kind
                        ? (e.data = e.data.toLowerCase())
                        : "toUpperCase" === l.kind
                          ? (e.data = e.data.toUpperCase())
                          : "startsWith" === l.kind
                            ? e.data.startsWith(l.value) ||
                              (sn((s = this._getOrReturnCtx(e, s)), {
                                code: a7.invalid_string,
                                validation: { startsWith: l.value },
                                message: l.message,
                              }),
                              o.dirty())
                            : "endsWith" === l.kind
                              ? e.data.endsWith(l.value) ||
                                (sn((s = this._getOrReturnCtx(e, s)), {
                                  code: a7.invalid_string,
                                  validation: { endsWith: l.value },
                                  message: l.message,
                                }),
                                o.dirty())
                              : "datetime" === l.kind
                                ? (function (e) {
                                    let t = `${sT}T${sj(e)}`,
                                      n = [];
                                    return (
                                      n.push(e.local ? "Z?" : "Z"),
                                      e.offset &&
                                        n.push("([+-]\\d{2}:?\\d{2})"),
                                      (t = `${t}(${n.join("|")})`),
                                      RegExp(`^${t}$`)
                                    );
                                  })(l).test(e.data) ||
                                  (sn((s = this._getOrReturnCtx(e, s)), {
                                    code: a7.invalid_string,
                                    validation: "datetime",
                                    message: l.message,
                                  }),
                                  o.dirty())
                                : "date" === l.kind
                                  ? sO.test(e.data) ||
                                    (sn((s = this._getOrReturnCtx(e, s)), {
                                      code: a7.invalid_string,
                                      validation: "date",
                                      message: l.message,
                                    }),
                                    o.dirty())
                                  : "time" === l.kind
                                    ? RegExp(`^${sj(l)}$`).test(e.data) ||
                                      (sn((s = this._getOrReturnCtx(e, s)), {
                                        code: a7.invalid_string,
                                        validation: "time",
                                        message: l.message,
                                      }),
                                      o.dirty())
                                    : "duration" === l.kind
                                      ? s_.test(e.data) ||
                                        (sn((s = this._getOrReturnCtx(e, s)), {
                                          validation: "duration",
                                          code: a7.invalid_string,
                                          message: l.message,
                                        }),
                                        o.dirty())
                                      : "ip" === l.kind
                                        ? ((t = e.data),
                                          (("v4" === (n = l.version) || !n) &&
                                            sE.test(t)) ||
                                            (("v6" === n || !n) &&
                                              sS.test(t)) ||
                                            (sn(
                                              (s = this._getOrReturnCtx(e, s)),
                                              {
                                                validation: "ip",
                                                code: a7.invalid_string,
                                                message: l.message,
                                              },
                                            ),
                                            o.dirty()))
                                        : "jwt" === l.kind
                                          ? !(function (e, t) {
                                              if (!sb.test(e)) return !1;
                                              try {
                                                let [n] = e.split(".");
                                                if (!n) return !1;
                                                let r = n
                                                    .replace(/-/g, "+")
                                                    .replace(/_/g, "/")
                                                    .padEnd(
                                                      n.length +
                                                        ((4 - (n.length % 4)) %
                                                          4),
                                                      "=",
                                                    ),
                                                  i = JSON.parse(atob(r));
                                                if (
                                                  "object" != typeof i ||
                                                  null === i ||
                                                  ("typ" in i &&
                                                    i?.typ !== "JWT") ||
                                                  !i.alg ||
                                                  (t && i.alg !== t)
                                                )
                                                  return !1;
                                                return !0;
                                              } catch {
                                                return !1;
                                              }
                                            })(e.data, l.alg) &&
                                            (sn(
                                              (s = this._getOrReturnCtx(e, s)),
                                              {
                                                validation: "jwt",
                                                code: a7.invalid_string,
                                                message: l.message,
                                              },
                                            ),
                                            o.dirty())
                                          : "cidr" === l.kind
                                            ? ((i = e.data),
                                              (("v4" === (a = l.version) ||
                                                !a) &&
                                                sN.test(i)) ||
                                                (("v6" === a || !a) &&
                                                  sC.test(i)) ||
                                                (sn(
                                                  (s = this._getOrReturnCtx(
                                                    e,
                                                    s,
                                                  )),
                                                  {
                                                    validation: "cidr",
                                                    code: a7.invalid_string,
                                                    message: l.message,
                                                  },
                                                ),
                                                o.dirty()))
                                            : "base64" === l.kind
                                              ? sk.test(e.data) ||
                                                (sn(
                                                  (s = this._getOrReturnCtx(
                                                    e,
                                                    s,
                                                  )),
                                                  {
                                                    validation: "base64",
                                                    code: a7.invalid_string,
                                                    message: l.message,
                                                  },
                                                ),
                                                o.dirty())
                                              : "base64url" === l.kind
                                                ? sA.test(e.data) ||
                                                  (sn(
                                                    (s = this._getOrReturnCtx(
                                                      e,
                                                      s,
                                                    )),
                                                    {
                                                      validation: "base64url",
                                                      code: a7.invalid_string,
                                                      message: l.message,
                                                    },
                                                  ),
                                                  o.dirty())
                                                : R.assertNever(l);
            return { status: o.value, value: e.data };
          }
          _regex(e, t, n) {
            return this.refinement((t) => e.test(t), {
              validation: t,
              code: a7.invalid_string,
              ...P.errToObj(n),
            });
          }
          _addCheck(e) {
            return new sI({ ...this._def, checks: [...this._def.checks, e] });
          }
          email(e) {
            return this._addCheck({ kind: "email", ...P.errToObj(e) });
          }
          url(e) {
            return this._addCheck({ kind: "url", ...P.errToObj(e) });
          }
          emoji(e) {
            return this._addCheck({ kind: "emoji", ...P.errToObj(e) });
          }
          uuid(e) {
            return this._addCheck({ kind: "uuid", ...P.errToObj(e) });
          }
          nanoid(e) {
            return this._addCheck({ kind: "nanoid", ...P.errToObj(e) });
          }
          cuid(e) {
            return this._addCheck({ kind: "cuid", ...P.errToObj(e) });
          }
          cuid2(e) {
            return this._addCheck({ kind: "cuid2", ...P.errToObj(e) });
          }
          ulid(e) {
            return this._addCheck({ kind: "ulid", ...P.errToObj(e) });
          }
          base64(e) {
            return this._addCheck({ kind: "base64", ...P.errToObj(e) });
          }
          base64url(e) {
            return this._addCheck({ kind: "base64url", ...P.errToObj(e) });
          }
          jwt(e) {
            return this._addCheck({ kind: "jwt", ...P.errToObj(e) });
          }
          ip(e) {
            return this._addCheck({ kind: "ip", ...P.errToObj(e) });
          }
          cidr(e) {
            return this._addCheck({ kind: "cidr", ...P.errToObj(e) });
          }
          datetime(e) {
            return "string" == typeof e
              ? this._addCheck({
                  kind: "datetime",
                  precision: null,
                  offset: !1,
                  local: !1,
                  message: e,
                })
              : this._addCheck({
                  kind: "datetime",
                  precision: void 0 === e?.precision ? null : e?.precision,
                  offset: e?.offset ?? !1,
                  local: e?.local ?? !1,
                  ...P.errToObj(e?.message),
                });
          }
          date(e) {
            return this._addCheck({ kind: "date", message: e });
          }
          time(e) {
            return "string" == typeof e
              ? this._addCheck({ kind: "time", precision: null, message: e })
              : this._addCheck({
                  kind: "time",
                  precision: void 0 === e?.precision ? null : e?.precision,
                  ...P.errToObj(e?.message),
                });
          }
          duration(e) {
            return this._addCheck({ kind: "duration", ...P.errToObj(e) });
          }
          regex(e, t) {
            return this._addCheck({
              kind: "regex",
              regex: e,
              ...P.errToObj(t),
            });
          }
          includes(e, t) {
            return this._addCheck({
              kind: "includes",
              value: e,
              position: t?.position,
              ...P.errToObj(t?.message),
            });
          }
          startsWith(e, t) {
            return this._addCheck({
              kind: "startsWith",
              value: e,
              ...P.errToObj(t),
            });
          }
          endsWith(e, t) {
            return this._addCheck({
              kind: "endsWith",
              value: e,
              ...P.errToObj(t),
            });
          }
          min(e, t) {
            return this._addCheck({ kind: "min", value: e, ...P.errToObj(t) });
          }
          max(e, t) {
            return this._addCheck({ kind: "max", value: e, ...P.errToObj(t) });
          }
          length(e, t) {
            return this._addCheck({
              kind: "length",
              value: e,
              ...P.errToObj(t),
            });
          }
          nonempty(e) {
            return this.min(1, P.errToObj(e));
          }
          trim() {
            return new sI({
              ...this._def,
              checks: [...this._def.checks, { kind: "trim" }],
            });
          }
          toLowerCase() {
            return new sI({
              ...this._def,
              checks: [...this._def.checks, { kind: "toLowerCase" }],
            });
          }
          toUpperCase() {
            return new sI({
              ...this._def,
              checks: [...this._def.checks, { kind: "toUpperCase" }],
            });
          }
          get isDatetime() {
            return !!this._def.checks.find((e) => "datetime" === e.kind);
          }
          get isDate() {
            return !!this._def.checks.find((e) => "date" === e.kind);
          }
          get isTime() {
            return !!this._def.checks.find((e) => "time" === e.kind);
          }
          get isDuration() {
            return !!this._def.checks.find((e) => "duration" === e.kind);
          }
          get isEmail() {
            return !!this._def.checks.find((e) => "email" === e.kind);
          }
          get isURL() {
            return !!this._def.checks.find((e) => "url" === e.kind);
          }
          get isEmoji() {
            return !!this._def.checks.find((e) => "emoji" === e.kind);
          }
          get isUUID() {
            return !!this._def.checks.find((e) => "uuid" === e.kind);
          }
          get isNANOID() {
            return !!this._def.checks.find((e) => "nanoid" === e.kind);
          }
          get isCUID() {
            return !!this._def.checks.find((e) => "cuid" === e.kind);
          }
          get isCUID2() {
            return !!this._def.checks.find((e) => "cuid2" === e.kind);
          }
          get isULID() {
            return !!this._def.checks.find((e) => "ulid" === e.kind);
          }
          get isIP() {
            return !!this._def.checks.find((e) => "ip" === e.kind);
          }
          get isCIDR() {
            return !!this._def.checks.find((e) => "cidr" === e.kind);
          }
          get isBase64() {
            return !!this._def.checks.find((e) => "base64" === e.kind);
          }
          get isBase64url() {
            return !!this._def.checks.find((e) => "base64url" === e.kind);
          }
          get minLength() {
            let e = null;
            for (let t of this._def.checks)
              "min" === t.kind && (null === e || t.value > e) && (e = t.value);
            return e;
          }
          get maxLength() {
            let e = null;
            for (let t of this._def.checks)
              "max" === t.kind && (null === e || t.value < e) && (e = t.value);
            return e;
          }
        }
        sI.create = (e) =>
          new sI({
            checks: [],
            typeName: $.ZodString,
            coerce: e?.coerce ?? !1,
            ...sp(e),
          });
        class sM extends sf {
          constructor() {
            (super(...arguments),
              (this.min = this.gte),
              (this.max = this.lte),
              (this.step = this.multipleOf));
          }
          _parse(e) {
            let t;
            if (
              (this._def.coerce && (e.data = Number(e.data)),
              this._getType(e) !== a6.number)
            ) {
              let t = this._getOrReturnCtx(e);
              return (
                sn(t, {
                  code: a7.invalid_type,
                  expected: a6.number,
                  received: t.parsedType,
                }),
                si
              );
            }
            let n = new sr();
            for (let r of this._def.checks)
              "int" === r.kind
                ? R.isInteger(e.data) ||
                  (sn((t = this._getOrReturnCtx(e, t)), {
                    code: a7.invalid_type,
                    expected: "integer",
                    received: "float",
                    message: r.message,
                  }),
                  n.dirty())
                : "min" === r.kind
                  ? (r.inclusive ? e.data < r.value : e.data <= r.value) &&
                    (sn((t = this._getOrReturnCtx(e, t)), {
                      code: a7.too_small,
                      minimum: r.value,
                      type: "number",
                      inclusive: r.inclusive,
                      exact: !1,
                      message: r.message,
                    }),
                    n.dirty())
                  : "max" === r.kind
                    ? (r.inclusive ? e.data > r.value : e.data >= r.value) &&
                      (sn((t = this._getOrReturnCtx(e, t)), {
                        code: a7.too_big,
                        maximum: r.value,
                        type: "number",
                        inclusive: r.inclusive,
                        exact: !1,
                        message: r.message,
                      }),
                      n.dirty())
                    : "multipleOf" === r.kind
                      ? 0 !==
                          (function (e, t) {
                            let n = (e.toString().split(".")[1] || "").length,
                              r = (t.toString().split(".")[1] || "").length,
                              i = n > r ? n : r;
                            return (
                              (Number.parseInt(e.toFixed(i).replace(".", "")) %
                                Number.parseInt(
                                  t.toFixed(i).replace(".", ""),
                                )) /
                              10 ** i
                            );
                          })(e.data, r.value) &&
                        (sn((t = this._getOrReturnCtx(e, t)), {
                          code: a7.not_multiple_of,
                          multipleOf: r.value,
                          message: r.message,
                        }),
                        n.dirty())
                      : "finite" === r.kind
                        ? Number.isFinite(e.data) ||
                          (sn((t = this._getOrReturnCtx(e, t)), {
                            code: a7.not_finite,
                            message: r.message,
                          }),
                          n.dirty())
                        : R.assertNever(r);
            return { status: n.value, value: e.data };
          }
          gte(e, t) {
            return this.setLimit("min", e, !0, P.toString(t));
          }
          gt(e, t) {
            return this.setLimit("min", e, !1, P.toString(t));
          }
          lte(e, t) {
            return this.setLimit("max", e, !0, P.toString(t));
          }
          lt(e, t) {
            return this.setLimit("max", e, !1, P.toString(t));
          }
          setLimit(e, t, n, r) {
            return new sM({
              ...this._def,
              checks: [
                ...this._def.checks,
                { kind: e, value: t, inclusive: n, message: P.toString(r) },
              ],
            });
          }
          _addCheck(e) {
            return new sM({ ...this._def, checks: [...this._def.checks, e] });
          }
          int(e) {
            return this._addCheck({ kind: "int", message: P.toString(e) });
          }
          positive(e) {
            return this._addCheck({
              kind: "min",
              value: 0,
              inclusive: !1,
              message: P.toString(e),
            });
          }
          negative(e) {
            return this._addCheck({
              kind: "max",
              value: 0,
              inclusive: !1,
              message: P.toString(e),
            });
          }
          nonpositive(e) {
            return this._addCheck({
              kind: "max",
              value: 0,
              inclusive: !0,
              message: P.toString(e),
            });
          }
          nonnegative(e) {
            return this._addCheck({
              kind: "min",
              value: 0,
              inclusive: !0,
              message: P.toString(e),
            });
          }
          multipleOf(e, t) {
            return this._addCheck({
              kind: "multipleOf",
              value: e,
              message: P.toString(t),
            });
          }
          finite(e) {
            return this._addCheck({ kind: "finite", message: P.toString(e) });
          }
          safe(e) {
            return this._addCheck({
              kind: "min",
              inclusive: !0,
              value: Number.MIN_SAFE_INTEGER,
              message: P.toString(e),
            })._addCheck({
              kind: "max",
              inclusive: !0,
              value: Number.MAX_SAFE_INTEGER,
              message: P.toString(e),
            });
          }
          get minValue() {
            let e = null;
            for (let t of this._def.checks)
              "min" === t.kind && (null === e || t.value > e) && (e = t.value);
            return e;
          }
          get maxValue() {
            let e = null;
            for (let t of this._def.checks)
              "max" === t.kind && (null === e || t.value < e) && (e = t.value);
            return e;
          }
          get isInt() {
            return !!this._def.checks.find(
              (e) =>
                "int" === e.kind ||
                ("multipleOf" === e.kind && R.isInteger(e.value)),
            );
          }
          get isFinite() {
            let e = null,
              t = null;
            for (let n of this._def.checks) {
              if (
                "finite" === n.kind ||
                "int" === n.kind ||
                "multipleOf" === n.kind
              )
                return !0;
              "min" === n.kind
                ? (null === t || n.value > t) && (t = n.value)
                : "max" === n.kind &&
                  (null === e || n.value < e) &&
                  (e = n.value);
            }
            return Number.isFinite(t) && Number.isFinite(e);
          }
        }
        sM.create = (e) =>
          new sM({
            checks: [],
            typeName: $.ZodNumber,
            coerce: e?.coerce || !1,
            ...sp(e),
          });
        class sR extends sf {
          constructor() {
            (super(...arguments), (this.min = this.gte), (this.max = this.lte));
          }
          _parse(e) {
            let t;
            if (this._def.coerce)
              try {
                e.data = BigInt(e.data);
              } catch {
                return this._getInvalidInput(e);
              }
            if (this._getType(e) !== a6.bigint) return this._getInvalidInput(e);
            let n = new sr();
            for (let r of this._def.checks)
              "min" === r.kind
                ? (r.inclusive ? e.data < r.value : e.data <= r.value) &&
                  (sn((t = this._getOrReturnCtx(e, t)), {
                    code: a7.too_small,
                    type: "bigint",
                    minimum: r.value,
                    inclusive: r.inclusive,
                    message: r.message,
                  }),
                  n.dirty())
                : "max" === r.kind
                  ? (r.inclusive ? e.data > r.value : e.data >= r.value) &&
                    (sn((t = this._getOrReturnCtx(e, t)), {
                      code: a7.too_big,
                      type: "bigint",
                      maximum: r.value,
                      inclusive: r.inclusive,
                      message: r.message,
                    }),
                    n.dirty())
                  : "multipleOf" === r.kind
                    ? e.data % r.value !== BigInt(0) &&
                      (sn((t = this._getOrReturnCtx(e, t)), {
                        code: a7.not_multiple_of,
                        multipleOf: r.value,
                        message: r.message,
                      }),
                      n.dirty())
                    : R.assertNever(r);
            return { status: n.value, value: e.data };
          }
          _getInvalidInput(e) {
            let t = this._getOrReturnCtx(e);
            return (
              sn(t, {
                code: a7.invalid_type,
                expected: a6.bigint,
                received: t.parsedType,
              }),
              si
            );
          }
          gte(e, t) {
            return this.setLimit("min", e, !0, P.toString(t));
          }
          gt(e, t) {
            return this.setLimit("min", e, !1, P.toString(t));
          }
          lte(e, t) {
            return this.setLimit("max", e, !0, P.toString(t));
          }
          lt(e, t) {
            return this.setLimit("max", e, !1, P.toString(t));
          }
          setLimit(e, t, n, r) {
            return new sR({
              ...this._def,
              checks: [
                ...this._def.checks,
                { kind: e, value: t, inclusive: n, message: P.toString(r) },
              ],
            });
          }
          _addCheck(e) {
            return new sR({ ...this._def, checks: [...this._def.checks, e] });
          }
          positive(e) {
            return this._addCheck({
              kind: "min",
              value: BigInt(0),
              inclusive: !1,
              message: P.toString(e),
            });
          }
          negative(e) {
            return this._addCheck({
              kind: "max",
              value: BigInt(0),
              inclusive: !1,
              message: P.toString(e),
            });
          }
          nonpositive(e) {
            return this._addCheck({
              kind: "max",
              value: BigInt(0),
              inclusive: !0,
              message: P.toString(e),
            });
          }
          nonnegative(e) {
            return this._addCheck({
              kind: "min",
              value: BigInt(0),
              inclusive: !0,
              message: P.toString(e),
            });
          }
          multipleOf(e, t) {
            return this._addCheck({
              kind: "multipleOf",
              value: e,
              message: P.toString(t),
            });
          }
          get minValue() {
            let e = null;
            for (let t of this._def.checks)
              "min" === t.kind && (null === e || t.value > e) && (e = t.value);
            return e;
          }
          get maxValue() {
            let e = null;
            for (let t of this._def.checks)
              "max" === t.kind && (null === e || t.value < e) && (e = t.value);
            return e;
          }
        }
        sR.create = (e) =>
          new sR({
            checks: [],
            typeName: $.ZodBigInt,
            coerce: e?.coerce ?? !1,
            ...sp(e),
          });
        class sD extends sf {
          _parse(e) {
            if (
              (this._def.coerce && (e.data = !!e.data),
              this._getType(e) !== a6.boolean)
            ) {
              let t = this._getOrReturnCtx(e);
              return (
                sn(t, {
                  code: a7.invalid_type,
                  expected: a6.boolean,
                  received: t.parsedType,
                }),
                si
              );
            }
            return ss(e.data);
          }
        }
        sD.create = (e) =>
          new sD({ typeName: $.ZodBoolean, coerce: e?.coerce || !1, ...sp(e) });
        class sP extends sf {
          _parse(e) {
            let t;
            if (
              (this._def.coerce && (e.data = new Date(e.data)),
              this._getType(e) !== a6.date)
            ) {
              let t = this._getOrReturnCtx(e);
              return (
                sn(t, {
                  code: a7.invalid_type,
                  expected: a6.date,
                  received: t.parsedType,
                }),
                si
              );
            }
            if (Number.isNaN(e.data.getTime()))
              return (
                sn(this._getOrReturnCtx(e), { code: a7.invalid_date }),
                si
              );
            let n = new sr();
            for (let r of this._def.checks)
              "min" === r.kind
                ? e.data.getTime() < r.value &&
                  (sn((t = this._getOrReturnCtx(e, t)), {
                    code: a7.too_small,
                    message: r.message,
                    inclusive: !0,
                    exact: !1,
                    minimum: r.value,
                    type: "date",
                  }),
                  n.dirty())
                : "max" === r.kind
                  ? e.data.getTime() > r.value &&
                    (sn((t = this._getOrReturnCtx(e, t)), {
                      code: a7.too_big,
                      message: r.message,
                      inclusive: !0,
                      exact: !1,
                      maximum: r.value,
                      type: "date",
                    }),
                    n.dirty())
                  : R.assertNever(r);
            return { status: n.value, value: new Date(e.data.getTime()) };
          }
          _addCheck(e) {
            return new sP({ ...this._def, checks: [...this._def.checks, e] });
          }
          min(e, t) {
            return this._addCheck({
              kind: "min",
              value: e.getTime(),
              message: P.toString(t),
            });
          }
          max(e, t) {
            return this._addCheck({
              kind: "max",
              value: e.getTime(),
              message: P.toString(t),
            });
          }
          get minDate() {
            let e = null;
            for (let t of this._def.checks)
              "min" === t.kind && (null === e || t.value > e) && (e = t.value);
            return null != e ? new Date(e) : null;
          }
          get maxDate() {
            let e = null;
            for (let t of this._def.checks)
              "max" === t.kind && (null === e || t.value < e) && (e = t.value);
            return null != e ? new Date(e) : null;
          }
        }
        sP.create = (e) =>
          new sP({
            checks: [],
            coerce: e?.coerce || !1,
            typeName: $.ZodDate,
            ...sp(e),
          });
        class s$ extends sf {
          _parse(e) {
            if (this._getType(e) !== a6.symbol) {
              let t = this._getOrReturnCtx(e);
              return (
                sn(t, {
                  code: a7.invalid_type,
                  expected: a6.symbol,
                  received: t.parsedType,
                }),
                si
              );
            }
            return ss(e.data);
          }
        }
        s$.create = (e) => new s$({ typeName: $.ZodSymbol, ...sp(e) });
        class sL extends sf {
          _parse(e) {
            if (this._getType(e) !== a6.undefined) {
              let t = this._getOrReturnCtx(e);
              return (
                sn(t, {
                  code: a7.invalid_type,
                  expected: a6.undefined,
                  received: t.parsedType,
                }),
                si
              );
            }
            return ss(e.data);
          }
        }
        sL.create = (e) => new sL({ typeName: $.ZodUndefined, ...sp(e) });
        class sB extends sf {
          _parse(e) {
            if (this._getType(e) !== a6.null) {
              let t = this._getOrReturnCtx(e);
              return (
                sn(t, {
                  code: a7.invalid_type,
                  expected: a6.null,
                  received: t.parsedType,
                }),
                si
              );
            }
            return ss(e.data);
          }
        }
        sB.create = (e) => new sB({ typeName: $.ZodNull, ...sp(e) });
        class sF extends sf {
          constructor() {
            (super(...arguments), (this._any = !0));
          }
          _parse(e) {
            return ss(e.data);
          }
        }
        sF.create = (e) => new sF({ typeName: $.ZodAny, ...sp(e) });
        class sz extends sf {
          constructor() {
            (super(...arguments), (this._unknown = !0));
          }
          _parse(e) {
            return ss(e.data);
          }
        }
        sz.create = (e) => new sz({ typeName: $.ZodUnknown, ...sp(e) });
        class sV extends sf {
          _parse(e) {
            let t = this._getOrReturnCtx(e);
            return (
              sn(t, {
                code: a7.invalid_type,
                expected: a6.never,
                received: t.parsedType,
              }),
              si
            );
          }
        }
        sV.create = (e) => new sV({ typeName: $.ZodNever, ...sp(e) });
        class sH extends sf {
          _parse(e) {
            if (this._getType(e) !== a6.undefined) {
              let t = this._getOrReturnCtx(e);
              return (
                sn(t, {
                  code: a7.invalid_type,
                  expected: a6.void,
                  received: t.parsedType,
                }),
                si
              );
            }
            return ss(e.data);
          }
        }
        sH.create = (e) => new sH({ typeName: $.ZodVoid, ...sp(e) });
        class sZ extends sf {
          _parse(e) {
            let { ctx: t, status: n } = this._processInputParams(e),
              r = this._def;
            if (t.parsedType !== a6.array)
              return (
                sn(t, {
                  code: a7.invalid_type,
                  expected: a6.array,
                  received: t.parsedType,
                }),
                si
              );
            if (null !== r.exactLength) {
              let e = t.data.length > r.exactLength.value,
                i = t.data.length < r.exactLength.value;
              (e || i) &&
                (sn(t, {
                  code: e ? a7.too_big : a7.too_small,
                  minimum: i ? r.exactLength.value : void 0,
                  maximum: e ? r.exactLength.value : void 0,
                  type: "array",
                  inclusive: !0,
                  exact: !0,
                  message: r.exactLength.message,
                }),
                n.dirty());
            }
            if (
              (null !== r.minLength &&
                t.data.length < r.minLength.value &&
                (sn(t, {
                  code: a7.too_small,
                  minimum: r.minLength.value,
                  type: "array",
                  inclusive: !0,
                  exact: !1,
                  message: r.minLength.message,
                }),
                n.dirty()),
              null !== r.maxLength &&
                t.data.length > r.maxLength.value &&
                (sn(t, {
                  code: a7.too_big,
                  maximum: r.maxLength.value,
                  type: "array",
                  inclusive: !0,
                  exact: !1,
                  message: r.maxLength.message,
                }),
                n.dirty()),
              t.common.async)
            )
              return Promise.all(
                [...t.data].map((e, n) =>
                  r.type._parseAsync(new sc(t, e, t.path, n)),
                ),
              ).then((e) => sr.mergeArray(n, e));
            let i = [...t.data].map((e, n) =>
              r.type._parseSync(new sc(t, e, t.path, n)),
            );
            return sr.mergeArray(n, i);
          }
          get element() {
            return this._def.type;
          }
          min(e, t) {
            return new sZ({
              ...this._def,
              minLength: { value: e, message: P.toString(t) },
            });
          }
          max(e, t) {
            return new sZ({
              ...this._def,
              maxLength: { value: e, message: P.toString(t) },
            });
          }
          length(e, t) {
            return new sZ({
              ...this._def,
              exactLength: { value: e, message: P.toString(t) },
            });
          }
          nonempty(e) {
            return this.min(1, e);
          }
        }
        sZ.create = (e, t) =>
          new sZ({
            type: e,
            minLength: null,
            maxLength: null,
            exactLength: null,
            typeName: $.ZodArray,
            ...sp(t),
          });
        class sU extends sf {
          constructor() {
            (super(...arguments),
              (this._cached = null),
              (this.nonstrict = this.passthrough),
              (this.augment = this.extend));
          }
          _getCached() {
            if (null !== this._cached) return this._cached;
            let e = this._def.shape(),
              t = R.objectKeys(e);
            return ((this._cached = { shape: e, keys: t }), this._cached);
          }
          _parse(e) {
            if (this._getType(e) !== a6.object) {
              let t = this._getOrReturnCtx(e);
              return (
                sn(t, {
                  code: a7.invalid_type,
                  expected: a6.object,
                  received: t.parsedType,
                }),
                si
              );
            }
            let { status: t, ctx: n } = this._processInputParams(e),
              { shape: r, keys: i } = this._getCached(),
              a = [];
            if (!(
              this._def.catchall instanceof sV &&
              "strip" === this._def.unknownKeys
            ))
              for (let e in n.data) i.includes(e) || a.push(e);
            let s = [];
            for (let e of i) {
              let t = r[e],
                i = n.data[e];
              s.push({
                key: { status: "valid", value: e },
                value: t._parse(new sc(n, i, n.path, e)),
                alwaysSet: e in n.data,
              });
            }
            if (this._def.catchall instanceof sV) {
              let e = this._def.unknownKeys;
              if ("passthrough" === e)
                for (let e of a)
                  s.push({
                    key: { status: "valid", value: e },
                    value: { status: "valid", value: n.data[e] },
                  });
              else if ("strict" === e)
                a.length > 0 &&
                  (sn(n, { code: a7.unrecognized_keys, keys: a }), t.dirty());
              else if ("strip" === e);
              else
                throw Error(
                  "Internal ZodObject error: invalid unknownKeys value.",
                );
            } else {
              let e = this._def.catchall;
              for (let t of a) {
                let r = n.data[t];
                s.push({
                  key: { status: "valid", value: t },
                  value: e._parse(new sc(n, r, n.path, t)),
                  alwaysSet: t in n.data,
                });
              }
            }
            return n.common.async
              ? Promise.resolve()
                  .then(async () => {
                    let e = [];
                    for (let t of s) {
                      let n = await t.key,
                        r = await t.value;
                      e.push({ key: n, value: r, alwaysSet: t.alwaysSet });
                    }
                    return e;
                  })
                  .then((e) => sr.mergeObjectSync(t, e))
              : sr.mergeObjectSync(t, s);
          }
          get shape() {
            return this._def.shape();
          }
          strict(e) {
            return (
              P.errToObj,
              new sU({
                ...this._def,
                unknownKeys: "strict",
                ...(void 0 !== e
                  ? {
                      errorMap: (t, n) => {
                        let r =
                          this._def.errorMap?.(t, n).message ?? n.defaultError;
                        return "unrecognized_keys" === t.code
                          ? { message: P.errToObj(e).message ?? r }
                          : { message: r };
                      },
                    }
                  : {}),
              })
            );
          }
          strip() {
            return new sU({ ...this._def, unknownKeys: "strip" });
          }
          passthrough() {
            return new sU({ ...this._def, unknownKeys: "passthrough" });
          }
          extend(e) {
            return new sU({
              ...this._def,
              shape: () => ({ ...this._def.shape(), ...e }),
            });
          }
          merge(e) {
            return new sU({
              unknownKeys: e._def.unknownKeys,
              catchall: e._def.catchall,
              shape: () => ({ ...this._def.shape(), ...e._def.shape() }),
              typeName: $.ZodObject,
            });
          }
          setKey(e, t) {
            return this.augment({ [e]: t });
          }
          catchall(e) {
            return new sU({ ...this._def, catchall: e });
          }
          pick(e) {
            let t = {};
            for (let n of R.objectKeys(e))
              e[n] && this.shape[n] && (t[n] = this.shape[n]);
            return new sU({ ...this._def, shape: () => t });
          }
          omit(e) {
            let t = {};
            for (let n of R.objectKeys(this.shape))
              e[n] || (t[n] = this.shape[n]);
            return new sU({ ...this._def, shape: () => t });
          }
          deepPartial() {
            return (function e(t) {
              if (t instanceof sU) {
                let n = {};
                for (let r in t.shape) {
                  let i = t.shape[r];
                  n[r] = s7.create(e(i));
                }
                return new sU({ ...t._def, shape: () => n });
              }
              return t instanceof sZ
                ? new sZ({ ...t._def, type: e(t.element) })
                : t instanceof s7
                  ? s7.create(e(t.unwrap()))
                  : t instanceof s8
                    ? s8.create(e(t.unwrap()))
                    : t instanceof sK
                      ? sK.create(t.items.map((t) => e(t)))
                      : t;
            })(this);
          }
          partial(e) {
            let t = {};
            for (let n of R.objectKeys(this.shape)) {
              let r = this.shape[n];
              e && !e[n] ? (t[n] = r) : (t[n] = r.optional());
            }
            return new sU({ ...this._def, shape: () => t });
          }
          required(e) {
            let t = {};
            for (let n of R.objectKeys(this.shape))
              if (e && !e[n]) t[n] = this.shape[n];
              else {
                let e = this.shape[n];
                for (; e instanceof s7;) e = e._def.innerType;
                t[n] = e;
              }
            return new sU({ ...this._def, shape: () => t });
          }
          keyof() {
            return s5(R.objectKeys(this.shape));
          }
        }
        ((sU.create = (e, t) =>
          new sU({
            shape: () => e,
            unknownKeys: "strip",
            catchall: sV.create(),
            typeName: $.ZodObject,
            ...sp(t),
          })),
          (sU.strictCreate = (e, t) =>
            new sU({
              shape: () => e,
              unknownKeys: "strict",
              catchall: sV.create(),
              typeName: $.ZodObject,
              ...sp(t),
            })),
          (sU.lazycreate = (e, t) =>
            new sU({
              shape: e,
              unknownKeys: "strip",
              catchall: sV.create(),
              typeName: $.ZodObject,
              ...sp(t),
            })));
        class sG extends sf {
          _parse(e) {
            let { ctx: t } = this._processInputParams(e),
              n = this._def.options;
            if (t.common.async)
              return Promise.all(
                n.map(async (e) => {
                  let n = {
                    ...t,
                    common: { ...t.common, issues: [] },
                    parent: null,
                  };
                  return {
                    result: await e._parseAsync({
                      data: t.data,
                      path: t.path,
                      parent: n,
                    }),
                    ctx: n,
                  };
                }),
              ).then(function (e) {
                for (let t of e)
                  if ("valid" === t.result.status) return t.result;
                for (let n of e)
                  if ("dirty" === n.result.status)
                    return (
                      t.common.issues.push(...n.ctx.common.issues),
                      n.result
                    );
                let n = e.map((e) => new a8(e.ctx.common.issues));
                return (sn(t, { code: a7.invalid_union, unionErrors: n }), si);
              });
            {
              let e;
              let r = [];
              for (let i of n) {
                let n = {
                    ...t,
                    common: { ...t.common, issues: [] },
                    parent: null,
                  },
                  a = i._parseSync({ data: t.data, path: t.path, parent: n });
                if ("valid" === a.status) return a;
                ("dirty" !== a.status || e || (e = { result: a, ctx: n }),
                  n.common.issues.length && r.push(n.common.issues));
              }
              if (e)
                return (t.common.issues.push(...e.ctx.common.issues), e.result);
              let i = r.map((e) => new a8(e));
              return (sn(t, { code: a7.invalid_union, unionErrors: i }), si);
            }
          }
          get options() {
            return this._def.options;
          }
        }
        sG.create = (e, t) =>
          new sG({ options: e, typeName: $.ZodUnion, ...sp(t) });
        let sq = (e) => {
          if (e instanceof s1) return sq(e.schema);
          if (e instanceof s9) return sq(e.innerType());
          if (e instanceof s2) return [e.value];
          if (e instanceof s4) return e.options;
          if (e instanceof s3) return R.objectValues(e.enum);
          if (e instanceof oe) return sq(e._def.innerType);
          if (e instanceof sL) return [void 0];
          else if (e instanceof sB) return [null];
          else if (e instanceof s7) return [void 0, ...sq(e.unwrap())];
          else if (e instanceof s8) return [null, ...sq(e.unwrap())];
          else if (e instanceof or) return sq(e.unwrap());
          else if (e instanceof oa) return sq(e.unwrap());
          else if (e instanceof ot) return sq(e._def.innerType);
          else return [];
        };
        class sW extends sf {
          _parse(e) {
            let { ctx: t } = this._processInputParams(e);
            if (t.parsedType !== a6.object)
              return (
                sn(t, {
                  code: a7.invalid_type,
                  expected: a6.object,
                  received: t.parsedType,
                }),
                si
              );
            let n = this.discriminator,
              r = t.data[n],
              i = this.optionsMap.get(r);
            return i
              ? t.common.async
                ? i._parseAsync({ data: t.data, path: t.path, parent: t })
                : i._parseSync({ data: t.data, path: t.path, parent: t })
              : (sn(t, {
                  code: a7.invalid_union_discriminator,
                  options: Array.from(this.optionsMap.keys()),
                  path: [n],
                }),
                si);
          }
          get discriminator() {
            return this._def.discriminator;
          }
          get options() {
            return this._def.options;
          }
          get optionsMap() {
            return this._def.optionsMap;
          }
          static create(e, t, n) {
            let r = new Map();
            for (let n of t) {
              let t = sq(n.shape[e]);
              if (!t.length)
                throw Error(
                  `A discriminator value for key \`${e}\` could not be extracted from all schema options`,
                );
              for (let i of t) {
                if (r.has(i))
                  throw Error(
                    `Discriminator property ${String(e)} has duplicate value ${String(i)}`,
                  );
                r.set(i, n);
              }
            }
            return new sW({
              typeName: $.ZodDiscriminatedUnion,
              discriminator: e,
              options: t,
              optionsMap: r,
              ...sp(n),
            });
          }
        }
        class sY extends sf {
          _parse(e) {
            let { status: t, ctx: n } = this._processInputParams(e),
              r = (e, r) => {
                if (so(e) || so(r)) return si;
                let i = (function e(t, n) {
                  let r = a9(t),
                    i = a9(n);
                  if (t === n) return { valid: !0, data: t };
                  if (r === a6.object && i === a6.object) {
                    let r = R.objectKeys(n),
                      i = R.objectKeys(t).filter((e) => -1 !== r.indexOf(e)),
                      a = { ...t, ...n };
                    for (let r of i) {
                      let i = e(t[r], n[r]);
                      if (!i.valid) return { valid: !1 };
                      a[r] = i.data;
                    }
                    return { valid: !0, data: a };
                  }
                  if (r === a6.array && i === a6.array) {
                    if (t.length !== n.length) return { valid: !1 };
                    let r = [];
                    for (let i = 0; i < t.length; i++) {
                      let a = e(t[i], n[i]);
                      if (!a.valid) return { valid: !1 };
                      r.push(a.data);
                    }
                    return { valid: !0, data: r };
                  }
                  return r === a6.date && i === a6.date && +t == +n
                    ? { valid: !0, data: t }
                    : { valid: !1 };
                })(e.value, r.value);
                return i.valid
                  ? ((sl(e) || sl(r)) && t.dirty(),
                    { status: t.value, value: i.data })
                  : (sn(n, { code: a7.invalid_intersection_types }), si);
              };
            return n.common.async
              ? Promise.all([
                  this._def.left._parseAsync({
                    data: n.data,
                    path: n.path,
                    parent: n,
                  }),
                  this._def.right._parseAsync({
                    data: n.data,
                    path: n.path,
                    parent: n,
                  }),
                ]).then(([e, t]) => r(e, t))
              : r(
                  this._def.left._parseSync({
                    data: n.data,
                    path: n.path,
                    parent: n,
                  }),
                  this._def.right._parseSync({
                    data: n.data,
                    path: n.path,
                    parent: n,
                  }),
                );
          }
        }
        sY.create = (e, t, n) =>
          new sY({ left: e, right: t, typeName: $.ZodIntersection, ...sp(n) });
        class sK extends sf {
          _parse(e) {
            let { status: t, ctx: n } = this._processInputParams(e);
            if (n.parsedType !== a6.array)
              return (
                sn(n, {
                  code: a7.invalid_type,
                  expected: a6.array,
                  received: n.parsedType,
                }),
                si
              );
            if (n.data.length < this._def.items.length)
              return (
                sn(n, {
                  code: a7.too_small,
                  minimum: this._def.items.length,
                  inclusive: !0,
                  exact: !1,
                  type: "array",
                }),
                si
              );
            !this._def.rest &&
              n.data.length > this._def.items.length &&
              (sn(n, {
                code: a7.too_big,
                maximum: this._def.items.length,
                inclusive: !0,
                exact: !1,
                type: "array",
              }),
              t.dirty());
            let r = [...n.data]
              .map((e, t) => {
                let r = this._def.items[t] || this._def.rest;
                return r ? r._parse(new sc(n, e, n.path, t)) : null;
              })
              .filter((e) => !!e);
            return n.common.async
              ? Promise.all(r).then((e) => sr.mergeArray(t, e))
              : sr.mergeArray(t, r);
          }
          get items() {
            return this._def.items;
          }
          rest(e) {
            return new sK({ ...this._def, rest: e });
          }
        }
        sK.create = (e, t) => {
          if (!Array.isArray(e))
            throw Error(
              "You must pass an array of schemas to z.tuple([ ... ])",
            );
          return new sK({
            items: e,
            typeName: $.ZodTuple,
            rest: null,
            ...sp(t),
          });
        };
        class sX extends sf {
          get keySchema() {
            return this._def.keyType;
          }
          get valueSchema() {
            return this._def.valueType;
          }
          _parse(e) {
            let { status: t, ctx: n } = this._processInputParams(e);
            if (n.parsedType !== a6.object)
              return (
                sn(n, {
                  code: a7.invalid_type,
                  expected: a6.object,
                  received: n.parsedType,
                }),
                si
              );
            let r = [],
              i = this._def.keyType,
              a = this._def.valueType;
            for (let e in n.data)
              r.push({
                key: i._parse(new sc(n, e, n.path, e)),
                value: a._parse(new sc(n, n.data[e], n.path, e)),
                alwaysSet: e in n.data,
              });
            return n.common.async
              ? sr.mergeObjectAsync(t, r)
              : sr.mergeObjectSync(t, r);
          }
          get element() {
            return this._def.valueType;
          }
          static create(e, t, n) {
            return new sX(
              t instanceof sf
                ? { keyType: e, valueType: t, typeName: $.ZodRecord, ...sp(n) }
                : {
                    keyType: sI.create(),
                    valueType: e,
                    typeName: $.ZodRecord,
                    ...sp(t),
                  },
            );
          }
        }
        class sQ extends sf {
          get keySchema() {
            return this._def.keyType;
          }
          get valueSchema() {
            return this._def.valueType;
          }
          _parse(e) {
            let { status: t, ctx: n } = this._processInputParams(e);
            if (n.parsedType !== a6.map)
              return (
                sn(n, {
                  code: a7.invalid_type,
                  expected: a6.map,
                  received: n.parsedType,
                }),
                si
              );
            let r = this._def.keyType,
              i = this._def.valueType,
              a = [...n.data.entries()].map(([e, t], a) => ({
                key: r._parse(new sc(n, e, n.path, [a, "key"])),
                value: i._parse(new sc(n, t, n.path, [a, "value"])),
              }));
            if (n.common.async) {
              let e = new Map();
              return Promise.resolve().then(async () => {
                for (let n of a) {
                  let r = await n.key,
                    i = await n.value;
                  if ("aborted" === r.status || "aborted" === i.status)
                    return si;
                  (("dirty" === r.status || "dirty" === i.status) && t.dirty(),
                    e.set(r.value, i.value));
                }
                return { status: t.value, value: e };
              });
            }
            {
              let e = new Map();
              for (let n of a) {
                let r = n.key,
                  i = n.value;
                if ("aborted" === r.status || "aborted" === i.status) return si;
                (("dirty" === r.status || "dirty" === i.status) && t.dirty(),
                  e.set(r.value, i.value));
              }
              return { status: t.value, value: e };
            }
          }
        }
        sQ.create = (e, t, n) =>
          new sQ({ valueType: t, keyType: e, typeName: $.ZodMap, ...sp(n) });
        class sJ extends sf {
          _parse(e) {
            let { status: t, ctx: n } = this._processInputParams(e);
            if (n.parsedType !== a6.set)
              return (
                sn(n, {
                  code: a7.invalid_type,
                  expected: a6.set,
                  received: n.parsedType,
                }),
                si
              );
            let r = this._def;
            (null !== r.minSize &&
              n.data.size < r.minSize.value &&
              (sn(n, {
                code: a7.too_small,
                minimum: r.minSize.value,
                type: "set",
                inclusive: !0,
                exact: !1,
                message: r.minSize.message,
              }),
              t.dirty()),
              null !== r.maxSize &&
                n.data.size > r.maxSize.value &&
                (sn(n, {
                  code: a7.too_big,
                  maximum: r.maxSize.value,
                  type: "set",
                  inclusive: !0,
                  exact: !1,
                  message: r.maxSize.message,
                }),
                t.dirty()));
            let i = this._def.valueType;
            function a(e) {
              let n = new Set();
              for (let r of e) {
                if ("aborted" === r.status) return si;
                ("dirty" === r.status && t.dirty(), n.add(r.value));
              }
              return { status: t.value, value: n };
            }
            let s = [...n.data.values()].map((e, t) =>
              i._parse(new sc(n, e, n.path, t)),
            );
            return n.common.async ? Promise.all(s).then((e) => a(e)) : a(s);
          }
          min(e, t) {
            return new sJ({
              ...this._def,
              minSize: { value: e, message: P.toString(t) },
            });
          }
          max(e, t) {
            return new sJ({
              ...this._def,
              maxSize: { value: e, message: P.toString(t) },
            });
          }
          size(e, t) {
            return this.min(e, t).max(e, t);
          }
          nonempty(e) {
            return this.min(1, e);
          }
        }
        sJ.create = (e, t) =>
          new sJ({
            valueType: e,
            minSize: null,
            maxSize: null,
            typeName: $.ZodSet,
            ...sp(t),
          });
        class s0 extends sf {
          constructor() {
            (super(...arguments), (this.validate = this.implement));
          }
          _parse(e) {
            let { ctx: t } = this._processInputParams(e);
            if (t.parsedType !== a6.function)
              return (
                sn(t, {
                  code: a7.invalid_type,
                  expected: a6.function,
                  received: t.parsedType,
                }),
                si
              );
            function n(e, n) {
              return st({
                data: e,
                path: t.path,
                errorMaps: [
                  t.common.contextualErrorMap,
                  t.schemaErrorMap,
                  se,
                  se,
                ].filter((e) => !!e),
                issueData: { code: a7.invalid_arguments, argumentsError: n },
              });
            }
            function r(e, n) {
              return st({
                data: e,
                path: t.path,
                errorMaps: [
                  t.common.contextualErrorMap,
                  t.schemaErrorMap,
                  se,
                  se,
                ].filter((e) => !!e),
                issueData: { code: a7.invalid_return_type, returnTypeError: n },
              });
            }
            let i = { errorMap: t.common.contextualErrorMap },
              a = t.data;
            if (this._def.returns instanceof s6) {
              let e = this;
              return ss(async function (...t) {
                let s = new a8([]),
                  o = await e._def.args.parseAsync(t, i).catch((e) => {
                    throw (s.addIssue(n(t, e)), s);
                  }),
                  l = await Reflect.apply(a, this, o);
                return await e._def.returns._def.type
                  .parseAsync(l, i)
                  .catch((e) => {
                    throw (s.addIssue(r(l, e)), s);
                  });
              });
            }
            {
              let e = this;
              return ss(function (...t) {
                let s = e._def.args.safeParse(t, i);
                if (!s.success) throw new a8([n(t, s.error)]);
                let o = Reflect.apply(a, this, s.data),
                  l = e._def.returns.safeParse(o, i);
                if (!l.success) throw new a8([r(o, l.error)]);
                return l.data;
              });
            }
          }
          parameters() {
            return this._def.args;
          }
          returnType() {
            return this._def.returns;
          }
          args(...e) {
            return new s0({
              ...this._def,
              args: sK.create(e).rest(sz.create()),
            });
          }
          returns(e) {
            return new s0({ ...this._def, returns: e });
          }
          implement(e) {
            return this.parse(e);
          }
          strictImplement(e) {
            return this.parse(e);
          }
          static create(e, t, n) {
            return new s0({
              args: e || sK.create([]).rest(sz.create()),
              returns: t || sz.create(),
              typeName: $.ZodFunction,
              ...sp(n),
            });
          }
        }
        class s1 extends sf {
          get schema() {
            return this._def.getter();
          }
          _parse(e) {
            let { ctx: t } = this._processInputParams(e);
            return this._def
              .getter()
              ._parse({ data: t.data, path: t.path, parent: t });
          }
        }
        s1.create = (e, t) =>
          new s1({ getter: e, typeName: $.ZodLazy, ...sp(t) });
        class s2 extends sf {
          _parse(e) {
            if (e.data !== this._def.value) {
              let t = this._getOrReturnCtx(e);
              return (
                sn(t, {
                  received: t.data,
                  code: a7.invalid_literal,
                  expected: this._def.value,
                }),
                si
              );
            }
            return { status: "valid", value: e.data };
          }
          get value() {
            return this._def.value;
          }
        }
        function s5(e, t) {
          return new s4({ values: e, typeName: $.ZodEnum, ...sp(t) });
        }
        s2.create = (e, t) =>
          new s2({ value: e, typeName: $.ZodLiteral, ...sp(t) });
        class s4 extends sf {
          _parse(e) {
            if ("string" != typeof e.data) {
              let t = this._getOrReturnCtx(e),
                n = this._def.values;
              return (
                sn(t, {
                  expected: R.joinValues(n),
                  received: t.parsedType,
                  code: a7.invalid_type,
                }),
                si
              );
            }
            if (
              (this._cache || (this._cache = new Set(this._def.values)),
              !this._cache.has(e.data))
            ) {
              let t = this._getOrReturnCtx(e),
                n = this._def.values;
              return (
                sn(t, {
                  received: t.data,
                  code: a7.invalid_enum_value,
                  options: n,
                }),
                si
              );
            }
            return ss(e.data);
          }
          get options() {
            return this._def.values;
          }
          get enum() {
            let e = {};
            for (let t of this._def.values) e[t] = t;
            return e;
          }
          get Values() {
            let e = {};
            for (let t of this._def.values) e[t] = t;
            return e;
          }
          get Enum() {
            let e = {};
            for (let t of this._def.values) e[t] = t;
            return e;
          }
          extract(e, t = this._def) {
            return s4.create(e, { ...this._def, ...t });
          }
          exclude(e, t = this._def) {
            return s4.create(
              this.options.filter((t) => !e.includes(t)),
              { ...this._def, ...t },
            );
          }
        }
        s4.create = s5;
        class s3 extends sf {
          _parse(e) {
            let t = R.getValidEnumValues(this._def.values),
              n = this._getOrReturnCtx(e);
            if (n.parsedType !== a6.string && n.parsedType !== a6.number) {
              let e = R.objectValues(t);
              return (
                sn(n, {
                  expected: R.joinValues(e),
                  received: n.parsedType,
                  code: a7.invalid_type,
                }),
                si
              );
            }
            if (
              (this._cache ||
                (this._cache = new Set(R.getValidEnumValues(this._def.values))),
              !this._cache.has(e.data))
            ) {
              let e = R.objectValues(t);
              return (
                sn(n, {
                  received: n.data,
                  code: a7.invalid_enum_value,
                  options: e,
                }),
                si
              );
            }
            return ss(e.data);
          }
          get enum() {
            return this._def.values;
          }
        }
        s3.create = (e, t) =>
          new s3({ values: e, typeName: $.ZodNativeEnum, ...sp(t) });
        class s6 extends sf {
          unwrap() {
            return this._def.type;
          }
          _parse(e) {
            let { ctx: t } = this._processInputParams(e);
            return t.parsedType !== a6.promise && !1 === t.common.async
              ? (sn(t, {
                  code: a7.invalid_type,
                  expected: a6.promise,
                  received: t.parsedType,
                }),
                si)
              : ss(
                  (t.parsedType === a6.promise
                    ? t.data
                    : Promise.resolve(t.data)
                  ).then((e) =>
                    this._def.type.parseAsync(e, {
                      path: t.path,
                      errorMap: t.common.contextualErrorMap,
                    }),
                  ),
                );
          }
        }
        s6.create = (e, t) =>
          new s6({ type: e, typeName: $.ZodPromise, ...sp(t) });
        class s9 extends sf {
          innerType() {
            return this._def.schema;
          }
          sourceType() {
            return this._def.schema._def.typeName === $.ZodEffects
              ? this._def.schema.sourceType()
              : this._def.schema;
          }
          _parse(e) {
            let { status: t, ctx: n } = this._processInputParams(e),
              r = this._def.effect || null,
              i = {
                addIssue: (e) => {
                  (sn(n, e), e.fatal ? t.abort() : t.dirty());
                },
                get path() {
                  return n.path;
                },
              };
            if (((i.addIssue = i.addIssue.bind(i)), "preprocess" === r.type)) {
              let e = r.transform(n.data, i);
              if (n.common.async)
                return Promise.resolve(e).then(async (e) => {
                  if ("aborted" === t.value) return si;
                  let r = await this._def.schema._parseAsync({
                    data: e,
                    path: n.path,
                    parent: n,
                  });
                  return "aborted" === r.status
                    ? si
                    : "dirty" === r.status || "dirty" === t.value
                      ? sa(r.value)
                      : r;
                });
              {
                if ("aborted" === t.value) return si;
                let r = this._def.schema._parseSync({
                  data: e,
                  path: n.path,
                  parent: n,
                });
                return "aborted" === r.status
                  ? si
                  : "dirty" === r.status || "dirty" === t.value
                    ? sa(r.value)
                    : r;
              }
            }
            if ("refinement" === r.type) {
              let e = (e) => {
                let t = r.refinement(e, i);
                if (n.common.async) return Promise.resolve(t);
                if (t instanceof Promise)
                  throw Error(
                    "Async refinement encountered during synchronous parse operation. Use .parseAsync instead.",
                  );
                return e;
              };
              if (!1 !== n.common.async)
                return this._def.schema
                  ._parseAsync({ data: n.data, path: n.path, parent: n })
                  .then((n) =>
                    "aborted" === n.status
                      ? si
                      : ("dirty" === n.status && t.dirty(),
                        e(n.value).then(() => ({
                          status: t.value,
                          value: n.value,
                        }))),
                  );
              {
                let r = this._def.schema._parseSync({
                  data: n.data,
                  path: n.path,
                  parent: n,
                });
                return "aborted" === r.status
                  ? si
                  : ("dirty" === r.status && t.dirty(),
                    e(r.value),
                    { status: t.value, value: r.value });
              }
            }
            if ("transform" === r.type) {
              if (!1 !== n.common.async)
                return this._def.schema
                  ._parseAsync({ data: n.data, path: n.path, parent: n })
                  .then((e) =>
                    sd(e)
                      ? Promise.resolve(r.transform(e.value, i)).then((e) => ({
                          status: t.value,
                          value: e,
                        }))
                      : si,
                  );
              {
                let e = this._def.schema._parseSync({
                  data: n.data,
                  path: n.path,
                  parent: n,
                });
                if (!sd(e)) return si;
                let a = r.transform(e.value, i);
                if (a instanceof Promise)
                  throw Error(
                    "Asynchronous transform encountered during synchronous parse operation. Use .parseAsync instead.",
                  );
                return { status: t.value, value: a };
              }
            }
            R.assertNever(r);
          }
        }
        ((s9.create = (e, t, n) =>
          new s9({ schema: e, typeName: $.ZodEffects, effect: t, ...sp(n) })),
          (s9.createWithPreprocess = (e, t, n) =>
            new s9({
              schema: t,
              effect: { type: "preprocess", transform: e },
              typeName: $.ZodEffects,
              ...sp(n),
            })));
        class s7 extends sf {
          _parse(e) {
            return this._getType(e) === a6.undefined
              ? ss(void 0)
              : this._def.innerType._parse(e);
          }
          unwrap() {
            return this._def.innerType;
          }
        }
        s7.create = (e, t) =>
          new s7({ innerType: e, typeName: $.ZodOptional, ...sp(t) });
        class s8 extends sf {
          _parse(e) {
            return this._getType(e) === a6.null
              ? ss(null)
              : this._def.innerType._parse(e);
          }
          unwrap() {
            return this._def.innerType;
          }
        }
        s8.create = (e, t) =>
          new s8({ innerType: e, typeName: $.ZodNullable, ...sp(t) });
        class oe extends sf {
          _parse(e) {
            let { ctx: t } = this._processInputParams(e),
              n = t.data;
            return (
              t.parsedType === a6.undefined && (n = this._def.defaultValue()),
              this._def.innerType._parse({ data: n, path: t.path, parent: t })
            );
          }
          removeDefault() {
            return this._def.innerType;
          }
        }
        oe.create = (e, t) =>
          new oe({
            innerType: e,
            typeName: $.ZodDefault,
            defaultValue:
              "function" == typeof t.default ? t.default : () => t.default,
            ...sp(t),
          });
        class ot extends sf {
          _parse(e) {
            let { ctx: t } = this._processInputParams(e),
              n = { ...t, common: { ...t.common, issues: [] } },
              r = this._def.innerType._parse({
                data: n.data,
                path: n.path,
                parent: { ...n },
              });
            return su(r)
              ? r.then((e) => ({
                  status: "valid",
                  value:
                    "valid" === e.status
                      ? e.value
                      : this._def.catchValue({
                          get error() {
                            return new a8(n.common.issues);
                          },
                          input: n.data,
                        }),
                }))
              : {
                  status: "valid",
                  value:
                    "valid" === r.status
                      ? r.value
                      : this._def.catchValue({
                          get error() {
                            return new a8(n.common.issues);
                          },
                          input: n.data,
                        }),
                };
          }
          removeCatch() {
            return this._def.innerType;
          }
        }
        ot.create = (e, t) =>
          new ot({
            innerType: e,
            typeName: $.ZodCatch,
            catchValue: "function" == typeof t.catch ? t.catch : () => t.catch,
            ...sp(t),
          });
        class on extends sf {
          _parse(e) {
            if (this._getType(e) !== a6.nan) {
              let t = this._getOrReturnCtx(e);
              return (
                sn(t, {
                  code: a7.invalid_type,
                  expected: a6.nan,
                  received: t.parsedType,
                }),
                si
              );
            }
            return { status: "valid", value: e.data };
          }
        }
        ((on.create = (e) => new on({ typeName: $.ZodNaN, ...sp(e) })),
          Symbol("zod_brand"));
        class or extends sf {
          _parse(e) {
            let { ctx: t } = this._processInputParams(e),
              n = t.data;
            return this._def.type._parse({ data: n, path: t.path, parent: t });
          }
          unwrap() {
            return this._def.type;
          }
        }
        class oi extends sf {
          _parse(e) {
            let { status: t, ctx: n } = this._processInputParams(e);
            if (n.common.async)
              return (async () => {
                let e = await this._def.in._parseAsync({
                  data: n.data,
                  path: n.path,
                  parent: n,
                });
                return "aborted" === e.status
                  ? si
                  : "dirty" === e.status
                    ? (t.dirty(), sa(e.value))
                    : this._def.out._parseAsync({
                        data: e.value,
                        path: n.path,
                        parent: n,
                      });
              })();
            {
              let e = this._def.in._parseSync({
                data: n.data,
                path: n.path,
                parent: n,
              });
              return "aborted" === e.status
                ? si
                : "dirty" === e.status
                  ? (t.dirty(), { status: "dirty", value: e.value })
                  : this._def.out._parseSync({
                      data: e.value,
                      path: n.path,
                      parent: n,
                    });
            }
          }
          static create(e, t) {
            return new oi({ in: e, out: t, typeName: $.ZodPipeline });
          }
        }
        class oa extends sf {
          _parse(e) {
            let t = this._def.innerType._parse(e),
              n = (e) => (sd(e) && (e.value = Object.freeze(e.value)), e);
            return su(t) ? t.then((e) => n(e)) : n(t);
          }
          unwrap() {
            return this._def.innerType;
          }
        }
        ((oa.create = (e, t) =>
          new oa({ innerType: e, typeName: $.ZodReadonly, ...sp(t) })),
          sU.lazycreate,
          (function (e) {
            ((e.ZodString = "ZodString"),
              (e.ZodNumber = "ZodNumber"),
              (e.ZodNaN = "ZodNaN"),
              (e.ZodBigInt = "ZodBigInt"),
              (e.ZodBoolean = "ZodBoolean"),
              (e.ZodDate = "ZodDate"),
              (e.ZodSymbol = "ZodSymbol"),
              (e.ZodUndefined = "ZodUndefined"),
              (e.ZodNull = "ZodNull"),
              (e.ZodAny = "ZodAny"),
              (e.ZodUnknown = "ZodUnknown"),
              (e.ZodNever = "ZodNever"),
              (e.ZodVoid = "ZodVoid"),
              (e.ZodArray = "ZodArray"),
              (e.ZodObject = "ZodObject"),
              (e.ZodUnion = "ZodUnion"),
              (e.ZodDiscriminatedUnion = "ZodDiscriminatedUnion"),
              (e.ZodIntersection = "ZodIntersection"),
              (e.ZodTuple = "ZodTuple"),
              (e.ZodRecord = "ZodRecord"),
              (e.ZodMap = "ZodMap"),
              (e.ZodSet = "ZodSet"),
              (e.ZodFunction = "ZodFunction"),
              (e.ZodLazy = "ZodLazy"),
              (e.ZodLiteral = "ZodLiteral"),
              (e.ZodEnum = "ZodEnum"),
              (e.ZodEffects = "ZodEffects"),
              (e.ZodNativeEnum = "ZodNativeEnum"),
              (e.ZodOptional = "ZodOptional"),
              (e.ZodNullable = "ZodNullable"),
              (e.ZodDefault = "ZodDefault"),
              (e.ZodCatch = "ZodCatch"),
              (e.ZodPromise = "ZodPromise"),
              (e.ZodBranded = "ZodBranded"),
              (e.ZodPipeline = "ZodPipeline"),
              (e.ZodReadonly = "ZodReadonly"));
          })($ || ($ = {})));
        let os = sI.create;
        (sM.create, on.create, sR.create);
        let oo = sD.create;
        (sP.create, s$.create, sL.create, sB.create, sF.create);
        let ol = sz.create;
        (sV.create, sH.create);
        let od = sZ.create,
          ou = sU.create;
        (sU.strictCreate,
          sG.create,
          sW.create,
          sY.create,
          sK.create,
          sX.create,
          sQ.create,
          sJ.create,
          s0.create,
          s1.create,
          s2.create);
        let oc = s4.create;
        (s3.create,
          s6.create,
          s9.create,
          s7.create,
          s8.create,
          s9.createWithPreprocess,
          oi.create);
        let oh = Object.values(m).filter((e) => "string" == typeof e),
          op = Object.values(g).filter((e) => "string" == typeof e),
          of = Object.values(N).filter((e) => "string" == typeof e),
          om = Object.values(S).filter((e) => "string" == typeof e),
          og = Object.values(_).filter((e) => "string" == typeof e),
          oy = Object.values(w).filter((e) => "string" == typeof e),
          ov = Object.values(E).filter((e) => "string" == typeof e),
          ox = Object.values(v).filter((e) => "string" == typeof e),
          ob = Object.values(x).filter((e) => "string" == typeof e),
          o_ = Object.values(b).filter((e) => "string" == typeof e),
          ow = Object.values(C).filter((e) => "string" == typeof e),
          oE = Object.values(k).filter((e) => "string" == typeof e),
          oN = Object.values(A).filter((e) => "string" == typeof e),
          oS = Object.values(T).filter((e) => "string" == typeof e),
          oC = ou({
            name: os().min(1),
            displayName: os().min(1),
            category: oc([
              "auth",
              "payment",
              "email",
              "monitoring",
              "ai",
              "communication",
              "analytics",
              "storage",
            ]),
            envKeys: od(os().min(1)),
            description: os(),
            setupGuide: os(),
          }),
          ok = ou({
            name: os().regex(
              /^[a-zA-Z][a-zA-Z0-9_]*$/,
              "Field name must be a valid identifier",
            ),
            type: oc([
              "UUID",
              "STRING",
              "TEXT",
              "INTEGER",
              "BIGINT",
              "DECIMAL",
              "BOOLEAN",
              "DATE",
              "DATETIME",
              "JSON",
              "ENUM",
              "RELATION",
            ]),
            options: ou({
              nullable: oo().default(!1),
              unique: oo().default(!1),
              indexed: oo().default(!1),
              default: ol().optional(),
              enumValues: od(os()).optional(),
              relationType: oc([
                "ONE_TO_ONE",
                "ONE_TO_MANY",
                "MANY_TO_ONE",
                "MANY_TO_MANY",
              ]).optional(),
              targetEntity: os().optional(),
            })
              .passthrough()
              .default({}),
          }),
          oA = ou({
            name: os().regex(
              /^[A-Z][a-zA-Z0-9]*$/,
              "Entity name must be PascalCase",
            ),
            fields: od(ok).min(1, "Entity must have at least one field"),
            options: ou({
              description: os().optional(),
              tableName: os().optional(),
              features: od(os()).default([]),
              audited: oo().default(!1),
              softDelete: oo().default(!1),
            }).default({}),
          }),
          oT = ou({
            name: os().min(1),
            path: os().min(1),
            template: os().optional(),
            dependencies: od(os()).default([]),
          }),
          oO = ou({
            framework: oc(op).default("NEXTJS"),
            styling: oc(of).default("TAILWIND"),
            components: oc(om).default("SHADCN"),
            features: od(os()).default([]),
            pages: od(os()).default([]),
          }),
          oj = ou({
            cloud: oc(og).default("VERCEL"),
            containerization: oc(oy).default("NONE"),
            orchestration: oc(ov).default("NONE"),
            database: oc(ox).default("POSTGRESQL"),
            cache: oc(ob).default("REDIS"),
            queue: oc(o_).default("NONE"),
            cdn: oo().default(!0),
            regions: od(os()).default(["us-east-1"]),
          }),
          oI = ou({
            testing: od(oc(ow)).default(["UNIT", "INTEGRATION"]),
            linting: od(oc(oE)).default(["ESLINT", "PRETTIER"]),
            security: od(oc(oN)).default(["DEPENDABOT"]),
            documentation: od(oc(oS)).default(["README", "API"]),
          });
        (ou({
          description: os().default(""),
          architecture: oc(oh).default("MODULAR_MONOLITH"),
          regions: od(os()).default(["us-east-1"]),
          entities: od(oA).default([]),
          services: od(oT).default([]),
          providers: od(oC).default([]),
          frontend: oO.default({}),
          infrastructure: oj.default({}),
          quality: oI.default({}),
          version: os().default("1.0.0"),
          author: os().default(""),
          license: os().default("MIT"),
        }),
          ou({
            name: os()
              .min(1, "Project name is required")
              .regex(
                /^[a-z][a-zA-Z0-9_-]*$/,
                "Project name must be kebab-case or camelCase",
              ),
            output: os().min(1).default("./generated"),
            dryRun: oo().default(!1),
            config: os().optional(),
          }),
          ou({
            name: os().min(1).max(64),
            version: os().regex(/^\d+\.\d+\.\d+$/),
            entry: os().min(1),
            hooks: od(
              oc([
                "before:generate",
                "after:generate",
                "before:write",
                "after:write",
              ]),
            ).default([]),
            supportedFeatures: od(os()).default([]),
            supportedArchitectures: od(os()).default([]),
          }),
          require("os"),
          require("crypto"),
          require("fs"),
          !(function (e) {
            ((e.FRONTEND_COMPONENT = "FrontendComponent"),
              (e.API_ROUTE = "ApiRoute"),
              (e.CLOUD_DATABASE = "CloudDatabase"),
              (e.AUTH_SERVICE = "AuthService"),
              (e.CACHE_LAYER = "CacheLayer"),
              (e.QUEUE_SERVICE = "QueueService"),
              (e.CDN_EDGE = "CdnEdge"),
              (e.WEBHOOK_HANDLER = "WebhookHandler"));
          })(L || (L = {})));
        let oM = {
            [L.FRONTEND_COMPONENT]: [
              L.API_ROUTE,
              L.AUTH_SERVICE,
              L.CDN_EDGE,
              L.FRONTEND_COMPONENT,
            ],
            [L.API_ROUTE]: [
              L.CLOUD_DATABASE,
              L.AUTH_SERVICE,
              L.CACHE_LAYER,
              L.QUEUE_SERVICE,
              L.WEBHOOK_HANDLER,
              L.API_ROUTE,
            ],
            [L.CLOUD_DATABASE]: [],
            [L.AUTH_SERVICE]: [L.CLOUD_DATABASE, L.CACHE_LAYER],
            [L.CACHE_LAYER]: [L.CLOUD_DATABASE],
            [L.QUEUE_SERVICE]: [L.WEBHOOK_HANDLER, L.API_ROUTE],
            [L.CDN_EDGE]: [L.FRONTEND_COMPONENT, L.API_ROUTE],
            [L.WEBHOOK_HANDLER]: [L.QUEUE_SERVICE, L.API_ROUTE],
          },
          oR = [
            {
              from: L.FRONTEND_COMPONENT,
              to: L.CLOUD_DATABASE,
              reason:
                "Security breach: Frontend cannot connect directly to Database without an API layer.",
            },
            {
              from: L.FRONTEND_COMPONENT,
              to: L.CACHE_LAYER,
              reason:
                "Security breach: Frontend cannot connect directly to Cache without an API layer.",
            },
            {
              from: L.FRONTEND_COMPONENT,
              to: L.QUEUE_SERVICE,
              reason:
                "Security breach: Frontend cannot connect directly to Queue without an API layer.",
            },
          ];
        class oD {
          constructor(e) {
            this.graph = e;
          }
          validate() {
            let e = [];
            return (
              e.push(...this.detectCycles()),
              e.push(...this.validateConnectionRules()),
              e.push(...this.validateOrphanNodes()),
              e.push(...this.validateDuplicateIds()),
              { valid: 0 === e.length, errors: e }
            );
          }
          validateEdge(e, t) {
            let n = oR.find((n) => n.from === e && n.to === t);
            return n
              ? { code: "BLOCKED_CONNECTION", message: n.reason }
              : (oM[e] ?? []).includes(t)
                ? null
                : {
                    code: "INVALID_CONNECTION",
                    message: `Invalid connection: ${e} cannot connect to ${t}.`,
                  };
          }
          detectCycles() {
            let e = [],
              t = new Map();
            for (let e of this.graph.nodes) t.set(e.id, []);
            for (let e of this.graph.edges) {
              let n = t.get(e.source);
              n && n.push(e.target);
            }
            let n = new Map(),
              r = (i, a) => {
                for (let s of (n.set(i, 1), t.get(i) ?? [])) {
                  let t = n.get(s) ?? 0;
                  if (1 === t)
                    return (
                      e.push({
                        code: "CYCLE_DETECTED",
                        message: `Critical architecture failure: Infinite cycle detected from node ${i} to ${s}.`,
                        nodeId: s,
                      }),
                      !0
                    );
                  if (0 === t && r(s, [...a, s])) return !0;
                }
                return (n.set(i, 2), !1);
              };
            for (let e of this.graph.nodes)
              (n.get(e.id) ?? 0) === 0 && r(e.id, [e.id]);
            return e;
          }
          validateConnectionRules() {
            let e = [],
              t = new Map();
            for (let e of this.graph.nodes) t.set(e.id, e);
            for (let n of this.graph.edges) {
              let r = t.get(n.source),
                i = t.get(n.target);
              if (!r) {
                e.push({
                  code: "MISSING_SOURCE_NODE",
                  message: `Edge ${n.id} references non-existent source node ${n.source}.`,
                  edgeId: n.id,
                });
                continue;
              }
              if (!i) {
                e.push({
                  code: "MISSING_TARGET_NODE",
                  message: `Edge ${n.id} references non-existent target node ${n.target}.`,
                  edgeId: n.id,
                });
                continue;
              }
              let a = this.validateEdge(r.type, i.type);
              a && e.push({ ...a, edgeId: n.id });
            }
            return e;
          }
          validateOrphanNodes() {
            let e = [],
              t = new Set();
            for (let e of this.graph.edges) (t.add(e.source), t.add(e.target));
            for (let n of this.graph.nodes)
              !t.has(n.id) &&
                this.graph.nodes.length > 1 &&
                e.push({
                  code: "ORPHAN_NODE",
                  message: `Node "${n.data.label}" (${n.id}) is not connected to any other node.`,
                  nodeId: n.id,
                });
            return e;
          }
          validateDuplicateIds() {
            let e = [],
              t = new Set();
            for (let n of this.graph.nodes)
              (t.has(n.id) &&
                e.push({
                  code: "DUPLICATE_NODE_ID",
                  message: `Duplicate node ID: ${n.id}.`,
                  nodeId: n.id,
                }),
                t.add(n.id));
            return e;
          }
        }
        class oP {
          constructor(e, t) {
            ((this.graph = e), (this.projectName = t));
          }
          map() {
            let e = this.getNodesByType(L.CLOUD_DATABASE),
              t = this.getNodesByType(L.FRONTEND_COMPONENT),
              n = this.getNodesByType(L.API_ROUTE),
              r = this.getNodesByType(L.AUTH_SERVICE),
              i = this.getNodesByType(L.CACHE_LAYER),
              a = this.getNodesByType(L.QUEUE_SERVICE),
              s = this.getNodesByType(L.CDN_EDGE),
              o = e.map((e) => this.mapEntity(e)),
              l = n.map((e) => this.mapService(e, this.graph.edges)),
              d = this.extractProviders(r),
              u = this.extractAllFeatures(),
              c = this.extractRegions(),
              h = this.mapFrontend(t, u),
              p = this.mapInfrastructure(i, a, s, e, c);
            return {
              name: this.projectName,
              description: this.graph.nodes[0]?.data.description ?? "",
              architecture: this.determineArchitecture(n),
              regions: c.length > 0 ? c : ["us-east-1"],
              entities: o,
              services: l,
              providers: d,
              frontend: h,
              infrastructure: p,
            };
          }
          getNodesByType(e) {
            return this.graph.nodes.filter((t) => t.type === e);
          }
          mapEntity(e) {
            return {
              name: e.data.label,
              fields: (e.data.fields ?? []).map((e) => ({
                name: e.name,
                type: e.type,
                required: e.required ?? !1,
                unique: e.unique ?? !1,
                nullable: e.nullable ?? !1,
              })),
              features: e.data.features ?? [],
              tableName: e.data.tableName ?? e.data.label.toLowerCase(),
            };
          }
          mapService(e, t) {
            let n = t
              .filter((t) => t.source === e.id)
              .map((e) => this.graph.nodes.find((t) => t.id === e.target))
              .filter((e) => e?.type === L.CLOUD_DATABASE)
              .map((e) => e.data.label);
            return {
              name: e.data.label,
              entities: n,
              type: e.data.method ?? "SYNC",
            };
          }
          extractProviders(e) {
            let t = [];
            for (let n of e) n.data.provider && t.push(n.data.provider);
            return [...new Set(t)];
          }
          extractAllFeatures() {
            let e = new Set();
            for (let t of this.graph.nodes)
              if (t.data.features) for (let n of t.data.features) e.add(n);
            return Array.from(e);
          }
          extractRegions() {
            let e = new Set();
            for (let t of this.graph.nodes)
              t.data.region && e.add(t.data.region);
            return Array.from(e);
          }
          mapFrontend(e, t) {
            let n = e[0];
            return {
              framework: n?.data.framework ?? "NEXTJS",
              styling: n?.data.styling ?? "TAILWIND",
              features: t,
              pages: e.map((e) => e.data.route ?? e.data.label).filter(Boolean),
            };
          }
          mapInfrastructure(e, t, n, r, i) {
            let a = e.length > 0,
              s = t.length > 0,
              o = n.length > 0;
            return {
              cloud: "VERCEL",
              database: r[0]?.data.provider ?? "POSTGRESQL",
              cache: a ? "REDIS" : "NONE",
              queue: s ? (t[0]?.data.provider ?? "RABBITMQ") : "NONE",
              cdn: o,
              regions: i.length > 0 ? i : ["us-east-1"],
            };
          }
          determineArchitecture(e) {
            return e.length > 3
              ? "MICROSERVICES"
              : (e.length, "MODULAR_MONOLITH");
          }
        }
        class o$ {
          constructor(e) {
            ((this.committed = !1),
              (this.createdRepo = !1),
              (this.pushedBlobs = []),
              (this.options = e));
          }
          async write(e) {
            let t, n;
            let r = "https://api.github.com",
              i = {
                Authorization: `Bearer ${this.options.token}`,
                Accept: "application/vnd.github+json",
                "X-GitHub-Api-Version": "2022-11-28",
                "Content-Type": "application/json",
              },
              a = this.options.owner,
              s = this.options.repoName,
              o = await fetch(`${r}/user/repos`, {
                method: "POST",
                headers: i,
                body: JSON.stringify({
                  name: s,
                  description: this.options.description ?? "",
                  private: this.options.private ?? !1,
                  auto_init: !0,
                }),
              });
            if (!o.ok && 422 !== o.status) {
              let e = await o.json().catch(() => ({}));
              throw Error(`Failed to create repo: ${JSON.stringify(e)}`);
            }
            this.createdRepo = o.ok;
            let l = await o.json().catch(() => ({}));
            try {
              let e = await fetch(`${r}/repos/${a}/${s}/git/refs/heads/main`, {
                headers: i,
              });
              e.ok && (t = (await e.json()).object.sha);
            } catch {}
            if (t) {
              let e = await fetch(`${r}/repos/${a}/${s}/git/commits/${t}`, {
                headers: i,
              });
              e.ok && (n = (await e.json()).tree.sha);
            }
            let d = e.map(async (e) => {
              let t = await fetch(`${r}/repos/${a}/${s}/git/blobs`, {
                method: "POST",
                headers: i,
                body: JSON.stringify({ content: e.content, encoding: "utf-8" }),
              });
              if (!t.ok)
                throw Error(
                  `Failed to create blob for ${e.path}: ${await t.text()}`,
                );
              let n = await t.json();
              return { path: e.path, sha: n.sha };
            });
            this.pushedBlobs = await Promise.all(d);
            let u = {
              tree: this.pushedBlobs.map((e) => ({
                path: e.path,
                mode: "100644",
                type: "blob",
                sha: e.sha,
              })),
            };
            n && (u.base_tree = n);
            let c = await fetch(`${r}/repos/${a}/${s}/git/trees`, {
              method: "POST",
              headers: i,
              body: JSON.stringify(u),
            });
            if (!c.ok) throw Error(`Failed to create tree: ${await c.text()}`);
            let h = await c.json(),
              p = {
                message:
                  this.options.commitMessage ?? "Initial commit from SBC ASP",
                tree: h.sha,
              };
            (t && (p.parents = [t]),
              this.options.authorName &&
                this.options.authorEmail &&
                (p.author = {
                  name: this.options.authorName,
                  email: this.options.authorEmail,
                }));
            let f = await fetch(`${r}/repos/${a}/${s}/git/commits`, {
              method: "POST",
              headers: i,
              body: JSON.stringify(p),
            });
            if (!f.ok)
              throw Error(`Failed to create commit: ${await f.text()}`);
            let m = await f.json(),
              g = await fetch(`${r}/repos/${a}/${s}/git/refs/heads/main`, {
                method: "PATCH",
                headers: i,
                body: JSON.stringify({ sha: m.sha }),
              });
            if (!g.ok) throw Error(`Failed to update ref: ${await g.text()}`);
            return (
              (this.committed = !0),
              {
                repoUrl: l.html_url ?? `https://github.com/${a}/${s}`,
                commitSha: m.sha,
                filesPushed: this.pushedBlobs.length,
              }
            );
          }
          async rollback() {
            if (!this.committed) {
              if (
                this.createdRepo &&
                this.options.owner &&
                this.options.repoName
              )
                try {
                  await fetch(
                    `https://api.github.com/repos/${this.options.owner}/${this.options.repoName}`,
                    {
                      method: "DELETE",
                      headers: {
                        Authorization: `Bearer ${this.options.token}`,
                        Accept: "application/vnd.github+json",
                      },
                    },
                  );
                } catch {}
              this.pushedBlobs = [];
            }
          }
        }
        class oL {
          constructor(e) {
            ((this.gitWriter = null), (this.options = e));
          }
          async execute() {
            let {
              config: e,
              projectName: t,
              artifacts: n,
              onProgress: r,
            } = this.options;
            try {
              (r?.({
                step: "creating-repo",
                message: "Creating GitHub repository...",
                percentage: 10,
              }),
                (this.gitWriter = new o$({
                  token: e.github.token,
                  owner: e.github.owner,
                  repoName: t,
                  description: this.options.description,
                  commitMessage: "Initial commit from SBC ASP",
                  authorName: this.options.authorName,
                  authorEmail: this.options.authorEmail,
                })),
                r?.({
                  step: "pushing-files",
                  message: `Pushing ${n.length} files to GitHub...`,
                  percentage: 25,
                }));
              let i = await this.gitWriter.write(n);
              r?.({
                step: "linking-vercel",
                message: "Linking repository to Vercel...",
                percentage: 40,
              });
              let a = await this.deployToVercel(e, t, i.repoUrl);
              r?.({
                step: "provisioning-supabase",
                message: "Provisioning Supabase database...",
                percentage: 60,
              });
              let s = await this.provisionSupabase(e, t);
              return (
                r?.({
                  step: "configuring-env",
                  message: "Configuring environment variables...",
                  percentage: 80,
                }),
                await this.configureEnvVars(e, t, a.projectId, s),
                r?.({
                  step: "complete",
                  message: "Deployment complete!",
                  percentage: 100,
                }),
                {
                  success: !0,
                  githubUrl: i.repoUrl,
                  vercelUrl: a.url,
                  supabaseUrl: s.url,
                  supabaseProjectRef: s.projectRef,
                  supabaseAnonKey: s.anonKey,
                }
              );
            } catch (t) {
              let e = t instanceof Error ? t.message : String(t);
              return (
                r?.({ step: "failed", message: e, percentage: 0 }),
                this.gitWriter && (await this.gitWriter.rollback()),
                { success: !1, error: e }
              );
            }
          }
          async rollback() {
            this.gitWriter && (await this.gitWriter.rollback());
          }
          async deployToVercel(e, t, n) {
            let r = {
                Authorization: `Bearer ${e.vercel.token}`,
                "Content-Type": "application/json",
              },
              i = e.vercel.teamId ? `?teamId=${e.vercel.teamId}` : "",
              a = await fetch(`https://api.vercel.com/v9/projects${i}`, {
                method: "POST",
                headers: r,
                body: JSON.stringify({
                  name: t,
                  gitRepository: {
                    type: "github",
                    repo: `${e.github.owner}/${t}`,
                  },
                  framework: "nextjs",
                }),
              });
            if (!a.ok && 409 !== a.status)
              throw Error(`Vercel project creation failed: ${await a.text()}`);
            let s = (await a.json().catch(() => ({ id: "" }))).id ?? "",
              o = await fetch(`https://api.vercel.com/v13/deployments${i}`, {
                method: "POST",
                headers: r,
                body: JSON.stringify({
                  name: t,
                  gitSource: {
                    type: "github",
                    ref: "main",
                    repo: `${e.github.owner}/${t}`,
                  },
                  target: "production",
                }),
              });
            if (!o.ok)
              throw Error(
                `Vercel deployment trigger failed: ${await o.text()}`,
              );
            let l = await o.json();
            return { url: l.url ? `https://${l.url}` : n, projectId: s };
          }
          async provisionSupabase(e, t) {
            let n = {
                Authorization: `Bearer ${e.supabase.token}`,
                "Content-Type": "application/json",
              },
              r = this.generatePassword(),
              i = await fetch("https://api.supabase.com/v1/projects", {
                method: "POST",
                headers: n,
                body: JSON.stringify({
                  name: t,
                  organization_id: e.supabase.organizationId,
                  region: "us-east-1",
                  password: r,
                }),
              });
            if (!i.ok)
              throw Error(
                `Supabase project creation failed: ${await i.text()}`,
              );
            let a = (await i.json()).id;
            for (let e = 0; e < 60; e++) {
              await new Promise((e) => setTimeout(e, 5e3));
              let e = await fetch(
                `https://api.supabase.com/v1/projects/${a}/health`,
                { headers: n },
              );
              if (e.ok) {
                let t = await e.json().catch(() => ({}));
                if ("healthy" === t.status || !0 === t.database) break;
              }
            }
            let s = await fetch(
                `https://api.supabase.com/v1/projects/${a}/api-keys`,
                { headers: n },
              ),
              o = "";
            if (s.ok) {
              let e = await s.json(),
                t = Array.isArray(e) ? e.find((e) => "anon" === e.name) : null;
              o = t?.api_key ?? "";
            }
            return {
              url: `https://${a}.supabase.co`,
              projectRef: a,
              anonKey: o,
            };
          }
          async configureEnvVars(e, t, n, r) {
            let i = {
                Authorization: `Bearer ${e.vercel.token}`,
                "Content-Type": "application/json",
              },
              a = e.vercel.teamId ? `?teamId=${e.vercel.teamId}` : "",
              s = [
                {
                  key: "NEXT_PUBLIC_SUPABASE_URL",
                  value: `https://${r.projectRef}.supabase.co`,
                  target: ["production"],
                },
                {
                  key: "NEXT_PUBLIC_SUPABASE_ANON_KEY",
                  value: r.anonKey,
                  target: ["production"],
                },
              ];
            if (n)
              try {
                (await fetch(
                  `https://api.vercel.com/v9/projects/${n}/env${a}`,
                  { method: "POST", headers: i, body: JSON.stringify(s[0]) },
                ),
                  await fetch(
                    `https://api.vercel.com/v9/projects/${n}/env${a}`,
                    { method: "POST", headers: i, body: JSON.stringify(s[1]) },
                  ));
              } catch {}
          }
          generatePassword() {
            let e =
                "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
              t = "",
              n = new Uint8Array(24);
            crypto.getRandomValues(n);
            for (let r = 0; r < n.length; r++) t += e[n[r] % e.length];
            return t;
          }
        }
        function oB(e) {
          return new oD(e).validate();
        }
        let oF = aX((e, t) => ({
            nodes: [],
            edges: [],
            selectedNodeId: null,
            validationErrors: [],
            isValid: !0,
            addNode: (n) => {
              let r = [...t().nodes, n],
                i = oB({ nodes: r, edges: t().edges });
              e({ nodes: r, validationErrors: i.errors, isValid: i.valid });
            },
            removeNode: (n) => {
              let r = t().nodes.filter((e) => e.id !== n),
                i = t().edges.filter((e) => e.source !== n && e.target !== n),
                a = oB({ nodes: r, edges: i });
              e({
                nodes: r,
                edges: i,
                validationErrors: a.errors,
                isValid: a.valid,
                selectedNodeId:
                  t().selectedNodeId === n ? null : t().selectedNodeId,
              });
            },
            updateNode: (n, r) => {
              let i = t().nodes.map((e) =>
                  e.id === n ? { ...e, data: { ...e.data, ...r } } : e,
                ),
                a = oB({ nodes: i, edges: t().edges });
              e({ nodes: i, validationErrors: a.errors, isValid: a.valid });
            },
            updateNodePosition: (n, r) => {
              e({
                nodes: t().nodes.map((e) =>
                  e.id === n ? { ...e, position: r } : e,
                ),
              });
            },
            addEdge: (n) => {
              let r = t().nodes.find((e) => e.id === n.source),
                i = t().nodes.find((e) => e.id === n.target);
              if (
                !r ||
                !i ||
                new oD({ nodes: t().nodes, edges: t().edges }).validateEdge(
                  r.type,
                  i.type,
                )
              )
                return !1;
              let a = [...t().edges, n],
                s = oB({ nodes: t().nodes, edges: a });
              return (
                e({ edges: a, validationErrors: s.errors, isValid: s.valid }),
                !0
              );
            },
            removeEdge: (n) => {
              let r = t().edges.filter((e) => e.id !== n),
                i = oB({ nodes: t().nodes, edges: r });
              e({ edges: r, validationErrors: i.errors, isValid: i.valid });
            },
            setSelectedNode: (t) => e({ selectedNodeId: t }),
            validate: () => {
              let n = oB(t().getGraph());
              e({ validationErrors: n.errors, isValid: n.valid });
            },
            getGraph: () => ({ nodes: t().nodes, edges: t().edges }),
            toProjectConfig: (e) => new oP(t().getGraph(), e).map(),
            loadGraph: (t) => {
              let n = oB(t);
              e({
                nodes: t.nodes,
                edges: t.edges,
                validationErrors: n.errors,
                isValid: n.valid,
              });
            },
          })),
          oz = (0, F.memo)(({ data: e, selected: t }) =>
            (0, B.jsxs)("div", {
              className: `relative rounded-lg border-2 px-4 py-3 min-w-[180px] shadow-md transition-all ${e.hasError ? "border-red-500 bg-red-50" : t ? "border-blue-500 bg-white shadow-lg ring-2 ring-blue-200" : "border-gray-300 bg-white hover:shadow-lg"}`,
              children: [
                B.jsx(iv, {
                  type: "target",
                  position: h.Top,
                  className: "!h-3 !w-3 !bg-gray-400 !border-2 !border-white",
                }),
                (0, B.jsxs)("div", {
                  className: "flex items-center gap-2",
                  children: [
                    B.jsx("span", {
                      className: "text-lg",
                      style: { color: e.color },
                      children: e.icon,
                    }),
                    (0, B.jsxs)("div", {
                      className: "flex-1",
                      children: [
                        B.jsx("div", {
                          className: "text-sm font-semibold text-gray-800",
                          children: e.label,
                        }),
                        B.jsx("div", {
                          className: "text-xs text-gray-500",
                          children: e.nodeType,
                        }),
                      ],
                    }),
                  ],
                }),
                e.description &&
                  B.jsx("div", {
                    className: "mt-1 text-xs text-gray-400 truncate",
                    children: e.description,
                  }),
                e.hasError &&
                  e.errorMessage &&
                  B.jsx("div", {
                    className:
                      "mt-2 rounded bg-red-100 px-2 py-1 text-xs text-red-600",
                    children: e.errorMessage,
                  }),
                B.jsx(iv, {
                  type: "source",
                  position: h.Bottom,
                  className: "!h-3 !w-3 !bg-gray-400 !border-2 !border-white",
                }),
              ],
            }),
          ),
          oV = [
            {
              type: L.FRONTEND_COMPONENT,
              label: "Frontend",
              icon: "\uD83C\uDF10",
              color: "#3b82f6",
              description: "React/Next.js frontend component",
            },
            {
              type: L.API_ROUTE,
              label: "API Route",
              icon: "⚡",
              color: "#22c55e",
              description: "tRPC/REST API endpoint",
            },
            {
              type: L.CLOUD_DATABASE,
              label: "Database",
              icon: "\uD83D\uDDC4️",
              color: "#8b5cf6",
              description: "PostgreSQL/Supabase table",
            },
            {
              type: L.AUTH_SERVICE,
              label: "Auth Service",
              icon: "\uD83D\uDEE1️",
              color: "#f97316",
              description: "Authentication provider",
            },
            {
              type: L.CACHE_LAYER,
              label: "Cache",
              icon: "⚡",
              color: "#eab308",
              description: "Redis cache layer",
            },
            {
              type: L.QUEUE_SERVICE,
              label: "Queue",
              icon: "\uD83D\uDCEC",
              color: "#ec4899",
              description: "Message queue (RabbitMQ/Kafka)",
            },
            {
              type: L.CDN_EDGE,
              label: "CDN / Edge",
              icon: "\uD83C\uDF0D",
              color: "#06b6d4",
              description: "CDN edge network",
            },
            {
              type: L.WEBHOOK_HANDLER,
              label: "Webhook",
              icon: "\uD83D\uDD17",
              color: "#ef4444",
              description: "Webhook event handler",
            },
          ];
        function oH(e) {
          return oV.find((t) => t.type === e) ?? oV[0];
        }
        let oZ = require("node:crypto");
        function oU(e = 21) {
          (function (e) {
            if (e < 0) throw RangeError("Wrong ID size");
            try {
              !i || i.length < e
                ? ((i = Buffer.allocUnsafe(128 * e)),
                  oZ.webcrypto.getRandomValues(i),
                  (a = 0))
                : a + e > i.length &&
                  (oZ.webcrypto.getRandomValues(i), (a = 0));
            } catch (e) {
              throw ((i = void 0), e);
            }
            a += e;
          })((e |= 0));
          let t = "";
          for (let n = a - e; n < a; n++)
            t +=
              "useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict"[
                63 & i[n]
              ];
          return t;
        }
        let oG = { custom: oz };
        function oq() {
          let e = oF((e) => e.nodes),
            t = oF((e) => e.edges),
            n = oF((e) => e.addNode),
            r = oF((e) => e.removeNode),
            i = oF((e) => e.updateNodePosition),
            a = oF((e) => e.addEdge),
            s = oF((e) => e.removeEdge),
            l = oF((e) => e.setSelectedNode),
            d = oF((e) => e.selectedNodeId),
            { getErrorForNode: u, getErrorForEdge: c } = (function () {
              (oF((e) => e.nodes), oF((e) => e.edges), oF((e) => e.validate));
              let [e, t] = (0, F.useState)([]),
                [n, r] = (0, F.useState)(!0),
                i = (0, F.useCallback)(
                  (t) => e.find((e) => e.nodeId === t),
                  [e],
                ),
                a = (0, F.useCallback)(
                  (t) => e.find((e) => e.edgeId === t),
                  [e],
                );
              return {
                errors: e,
                isValid: n,
                getErrorForNode: i,
                getErrorForEdge: a,
              };
            })(),
            h = e.map((e) => {
              let t = oH(e.type),
                n = u(e.id);
              return {
                id: e.id,
                type: "custom",
                position: e.position,
                data: {
                  label: e.data.label,
                  description: e.data.description,
                  nodeType: t.label,
                  color: t.color,
                  icon: t.icon,
                  hasError: !!n,
                  errorMessage: n?.message,
                },
                selected: e.id === d,
              };
            }),
            p = t.map((e) => {
              let t = c(e.id);
              return {
                id: e.id,
                source: e.source,
                target: e.target,
                animated: !t,
                style: t
                  ? { stroke: "#ef4444", strokeWidth: 2 }
                  : { stroke: "#94a3b8", strokeWidth: 2 },
              };
            }),
            m = (0, F.useCallback)(
              (e) => {
                e.source &&
                  e.target &&
                  a({ id: oU(), source: e.source, target: e.target });
              },
              [a],
            ),
            g = (0, F.useCallback)(
              (e, t) => {
                i(t.id, t.position);
              },
              [i],
            ),
            y = (0, F.useCallback)(
              (e, t) => {
                l(t.id);
              },
              [l],
            ),
            v = (0, F.useCallback)(() => {
              l(null);
            }, [l]),
            x = (0, F.useCallback)((e) => {
              (e.preventDefault(), (e.dataTransfer.dropEffect = "move"));
            }, []),
            b = (0, F.useCallback)(
              (t) => {
                t.preventDefault();
                let r = t.dataTransfer.getData("application/nodeType");
                if (!r) return;
                let i = oH(r),
                  a = { x: t.clientX - 250, y: t.clientY - 100 };
                n({
                  id: oU(),
                  type: r,
                  position: a,
                  data: {
                    label: `${i.label} ${e.length + 1}`,
                    description: i.description,
                  },
                });
              },
              [n, e.length],
            );
          return B.jsx("div", {
            className: "h-full w-full",
            onDrop: b,
            onDragOver: x,
            children: (0, B.jsxs)(a_, {
              nodes: h,
              edges: p,
              nodeTypes: oG,
              onConnect: m,
              onNodeDragStop: g,
              onNodeClick: y,
              onPaneClick: v,
              onNodesDelete: (e) => {
                for (let t of e) r(t.id);
              },
              onEdgesDelete: (e) => {
                for (let t of e) s(t.id);
              },
              connectionMode: o.Loose,
              fitView: !0,
              className: "bg-gray-50",
              children: [
                B.jsx(ak, {
                  variant: f.Dots,
                  gap: 20,
                  size: 1,
                  color: "#e2e8f0",
                }),
                B.jsx(aP, {
                  className:
                    "!bg-white !shadow-md !rounded-lg !border !border-gray-200",
                }),
                B.jsx(aU, {
                  className:
                    "!bg-white !shadow-md !rounded-lg !border !border-gray-200",
                  nodeColor: (e) => {
                    let t = e.data;
                    return t?.color ?? "#94a3b8";
                  },
                }),
              ],
            }),
          });
        }
        function oW() {
          return B.jsx(av, { children: B.jsx(oq, {}) });
        }
        function oY() {
          let e = (e, t) => {
            (e.dataTransfer.setData("application/nodeType", t),
              (e.dataTransfer.effectAllowed = "move"));
          };
          return (0, B.jsxs)("div", {
            className:
              "flex h-full w-56 flex-col border-r border-gray-200 bg-white",
            children: [
              (0, B.jsxs)("div", {
                className: "border-b border-gray-200 px-4 py-3",
                children: [
                  B.jsx("h3", {
                    className: "text-sm font-semibold text-gray-700",
                    children: "Components",
                  }),
                  B.jsx("p", {
                    className: "mt-0.5 text-xs text-gray-400",
                    children: "Drag to canvas",
                  }),
                ],
              }),
              B.jsx("div", {
                className: "flex-1 overflow-y-auto p-3",
                children: B.jsx("div", {
                  className: "space-y-2",
                  children: oV.map((t) =>
                    (0, B.jsxs)(
                      "div",
                      {
                        draggable: !0,
                        onDragStart: (n) => e(n, t.type),
                        className:
                          "flex cursor-grab items-center gap-3 rounded-lg border border-gray-200 px-3 py-2.5 transition-all hover:border-gray-300 hover:shadow-sm active:cursor-grabbing",
                        children: [
                          B.jsx("span", {
                            className: "text-xl",
                            children: t.icon,
                          }),
                          (0, B.jsxs)("div", {
                            className: "flex-1",
                            children: [
                              B.jsx("div", {
                                className: "text-sm font-medium text-gray-700",
                                children: t.label,
                              }),
                              B.jsx("div", {
                                className: "text-xs text-gray-400 truncate",
                                children: t.description,
                              }),
                            ],
                          }),
                          B.jsx("div", {
                            className: "h-2 w-2 rounded-full",
                            style: { backgroundColor: t.color },
                          }),
                        ],
                      },
                      t.type,
                    ),
                  ),
                }),
              }),
            ],
          });
        }
        /**
         * @license lucide-react v0.400.0 - ISC
         *
         * This source code is licensed under the ISC license.
         * See the LICENSE file in the root directory of this source tree.
         */ let oK = (e) =>
            e.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase(),
          oX = (...e) =>
            e.filter((e, t, n) => !!e && n.indexOf(e) === t).join(" ");
        /**
         * @license lucide-react v0.400.0 - ISC
         *
         * This source code is licensed under the ISC license.
         * See the LICENSE file in the root directory of this source tree.
         */ var oQ = {
          xmlns: "http://www.w3.org/2000/svg",
          width: 24,
          height: 24,
          viewBox: "0 0 24 24",
          fill: "none",
          stroke: "currentColor",
          strokeWidth: 2,
          strokeLinecap: "round",
          strokeLinejoin: "round",
        };
        /**
         * @license lucide-react v0.400.0 - ISC
         *
         * This source code is licensed under the ISC license.
         * See the LICENSE file in the root directory of this source tree.
         */ let oJ = (0, F.forwardRef)(
            (
              {
                color: e = "currentColor",
                size: t = 24,
                strokeWidth: n = 2,
                absoluteStrokeWidth: r,
                className: i = "",
                children: a,
                iconNode: s,
                ...o
              },
              l,
            ) =>
              (0, F.createElement)(
                "svg",
                {
                  ref: l,
                  ...oQ,
                  width: t,
                  height: t,
                  stroke: e,
                  strokeWidth: r ? (24 * Number(n)) / Number(t) : n,
                  className: oX("lucide", i),
                  ...o,
                },
                [
                  ...s.map(([e, t]) => (0, F.createElement)(e, t)),
                  ...(Array.isArray(a) ? a : [a]),
                ],
              ),
          ),
          o0 = (e, t) => {
            let n = (0, F.forwardRef)(({ className: n, ...r }, i) =>
              (0, F.createElement)(oJ, {
                ref: i,
                iconNode: t,
                className: oX(`lucide-${oK(e)}`, n),
                ...r,
              }),
            );
            return ((n.displayName = `${e}`), n);
          },
          o1 = o0("X", [
            ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
            ["path", { d: "m6 6 12 12", key: "d8bk6v" }],
          ]),
          o2 = o0("Trash2", [
            ["path", { d: "M3 6h18", key: "d0wm0j" }],
            [
              "path",
              { d: "M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6", key: "4alrt4" },
            ],
            [
              "path",
              { d: "M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2", key: "v07s0e" },
            ],
            ["line", { x1: "10", x2: "10", y1: "11", y2: "17", key: "1uufr5" }],
            ["line", { x1: "14", x2: "14", y1: "11", y2: "17", key: "xtxkd" }],
          ]);
        function o5() {
          let e = oF((e) => e.selectedNodeId),
            t = oF((e) => e.nodes),
            n = oF((e) => e.updateNode),
            r = oF((e) => e.removeNode),
            i = oF((e) => e.setSelectedNode),
            a = t.find((t) => t.id === e);
          if (!a)
            return (0, B.jsxs)("div", {
              className:
                "flex h-full w-72 flex-col border-l border-gray-200 bg-white",
              children: [
                B.jsx("div", {
                  className: "border-b border-gray-200 px-4 py-3",
                  children: B.jsx("h3", {
                    className: "text-sm font-semibold text-gray-700",
                    children: "Inspector",
                  }),
                }),
                B.jsx("div", {
                  className: "flex flex-1 items-center justify-center p-4",
                  children: B.jsx("p", {
                    className: "text-center text-sm text-gray-400",
                    children: "Select a node to edit its properties",
                  }),
                }),
              ],
            });
          let s = oH(a.type),
            o = a.type === L.CLOUD_DATABASE,
            l = a.type === L.API_ROUTE,
            d = a.type === L.FRONTEND_COMPONENT;
          return (0, B.jsxs)("div", {
            className:
              "flex h-full w-72 flex-col border-l border-gray-200 bg-white",
            children: [
              (0, B.jsxs)("div", {
                className:
                  "flex items-center justify-between border-b border-gray-200 px-4 py-3",
                children: [
                  (0, B.jsxs)("div", {
                    className: "flex items-center gap-2",
                    children: [
                      B.jsx("span", { className: "text-lg", children: s.icon }),
                      B.jsx("h3", {
                        className: "text-sm font-semibold text-gray-700",
                        children: s.label,
                      }),
                    ],
                  }),
                  B.jsx("button", {
                    onClick: () => i(null),
                    className:
                      "rounded p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600",
                    children: B.jsx(o1, { size: 16 }),
                  }),
                ],
              }),
              B.jsx("div", {
                className: "flex-1 overflow-y-auto p-4",
                children: (0, B.jsxs)("div", {
                  className: "space-y-4",
                  children: [
                    (0, B.jsxs)("div", {
                      children: [
                        B.jsx("label", {
                          className:
                            "mb-1 block text-xs font-medium text-gray-500",
                          children: "Label",
                        }),
                        B.jsx("input", {
                          type: "text",
                          value: a.data.label,
                          onChange: (e) => n(a.id, { label: e.target.value }),
                          className:
                            "w-full rounded-md border border-gray-300 px-3 py-1.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500",
                        }),
                      ],
                    }),
                    (0, B.jsxs)("div", {
                      children: [
                        B.jsx("label", {
                          className:
                            "mb-1 block text-xs font-medium text-gray-500",
                          children: "Description",
                        }),
                        B.jsx("textarea", {
                          value: a.data.description ?? "",
                          onChange: (e) =>
                            n(a.id, { description: e.target.value }),
                          rows: 2,
                          className:
                            "w-full rounded-md border border-gray-300 px-3 py-1.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500",
                        }),
                      ],
                    }),
                    o &&
                      (0, B.jsxs)("div", {
                        children: [
                          B.jsx("label", {
                            className:
                              "mb-1 block text-xs font-medium text-gray-500",
                            children: "Table Name",
                          }),
                          B.jsx("input", {
                            type: "text",
                            value: a.data.tableName ?? "",
                            onChange: (e) =>
                              n(a.id, { tableName: e.target.value }),
                            className:
                              "w-full rounded-md border border-gray-300 px-3 py-1.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500",
                          }),
                        ],
                      }),
                    l &&
                      (0, B.jsxs)(B.Fragment, {
                        children: [
                          (0, B.jsxs)("div", {
                            children: [
                              B.jsx("label", {
                                className:
                                  "mb-1 block text-xs font-medium text-gray-500",
                                children: "Route Path",
                              }),
                              B.jsx("input", {
                                type: "text",
                                value: a.data.route ?? "",
                                onChange: (e) =>
                                  n(a.id, { route: e.target.value }),
                                placeholder: "/api/users",
                                className:
                                  "w-full rounded-md border border-gray-300 px-3 py-1.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500",
                              }),
                            ],
                          }),
                          (0, B.jsxs)("div", {
                            children: [
                              B.jsx("label", {
                                className:
                                  "mb-1 block text-xs font-medium text-gray-500",
                                children: "Method",
                              }),
                              (0, B.jsxs)("select", {
                                value: a.data.method ?? "GET",
                                onChange: (e) =>
                                  n(a.id, { method: e.target.value }),
                                className:
                                  "w-full rounded-md border border-gray-300 px-3 py-1.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500",
                                children: [
                                  B.jsx("option", {
                                    value: "GET",
                                    children: "GET",
                                  }),
                                  B.jsx("option", {
                                    value: "POST",
                                    children: "POST",
                                  }),
                                  B.jsx("option", {
                                    value: "PUT",
                                    children: "PUT",
                                  }),
                                  B.jsx("option", {
                                    value: "PATCH",
                                    children: "PATCH",
                                  }),
                                  B.jsx("option", {
                                    value: "DELETE",
                                    children: "DELETE",
                                  }),
                                ],
                              }),
                            ],
                          }),
                        ],
                      }),
                    d &&
                      (0, B.jsxs)(B.Fragment, {
                        children: [
                          (0, B.jsxs)("div", {
                            children: [
                              B.jsx("label", {
                                className:
                                  "mb-1 block text-xs font-medium text-gray-500",
                                children: "Framework",
                              }),
                              B.jsx("input", {
                                type: "text",
                                value: a.data.framework ?? "NEXTJS",
                                onChange: (e) =>
                                  n(a.id, { framework: e.target.value }),
                                className:
                                  "w-full rounded-md border border-gray-300 px-3 py-1.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500",
                              }),
                            ],
                          }),
                          (0, B.jsxs)("div", {
                            children: [
                              B.jsx("label", {
                                className:
                                  "mb-1 block text-xs font-medium text-gray-500",
                                children: "Styling",
                              }),
                              B.jsx("input", {
                                type: "text",
                                value: a.data.styling ?? "TAILWIND",
                                onChange: (e) =>
                                  n(a.id, { styling: e.target.value }),
                                className:
                                  "w-full rounded-md border border-gray-300 px-3 py-1.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500",
                              }),
                            ],
                          }),
                        ],
                      }),
                    (0, B.jsxs)("div", {
                      children: [
                        B.jsx("label", {
                          className:
                            "mb-1 block text-xs font-medium text-gray-500",
                          children: "Region",
                        }),
                        B.jsx("input", {
                          type: "text",
                          value: a.data.region ?? "us-east-1",
                          onChange: (e) => n(a.id, { region: e.target.value }),
                          className:
                            "w-full rounded-md border border-gray-300 px-3 py-1.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500",
                        }),
                      ],
                    }),
                  ],
                }),
              }),
              B.jsx("div", {
                className: "border-t border-gray-200 p-3",
                children: (0, B.jsxs)("button", {
                  onClick: () => r(a.id),
                  className:
                    "flex w-full items-center justify-center gap-2 rounded-md border border-red-300 px-3 py-1.5 text-sm font-medium text-red-600 hover:bg-red-50",
                  children: [B.jsx(o2, { size: 14 }), "Delete Node"],
                }),
              }),
            ],
          });
        }
        /**
         * @license lucide-react v0.400.0 - ISC
         *
         * This source code is licensed under the ISC license.
         * See the LICENSE file in the root directory of this source tree.
         */ let o4 = o0("CircleCheck", [
            ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
            ["path", { d: "m9 12 2 2 4-4", key: "dzmm74" }],
          ]),
          o3 = o0("CircleAlert", [
            ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
            ["line", { x1: "12", x2: "12", y1: "8", y2: "12", key: "1pkeuh" }],
            [
              "line",
              { x1: "12", x2: "12.01", y1: "16", y2: "16", key: "4dfq90" },
            ],
          ]),
          o6 = o0("ChevronDown", [
            ["path", { d: "m6 9 6 6 6-6", key: "qrunsl" }],
          ]),
          o9 = o0("ChevronUp", [
            ["path", { d: "m18 15-6-6-6 6", key: "153udz" }],
          ]);
        function o7() {
          let e = oF((e) => e.validationErrors),
            t = oF((e) => e.isValid),
            n = oF((e) => e.setSelectedNode),
            [r, i] = (0, F.useState)(!1),
            a = e.length;
          return (0, B.jsxs)("div", {
            className:
              "absolute bottom-4 left-4 z-10 w-80 rounded-lg border border-gray-200 bg-white shadow-lg",
            children: [
              (0, B.jsxs)("button", {
                onClick: () => i(!r),
                className:
                  "flex w-full items-center justify-between px-4 py-2.5",
                children: [
                  (0, B.jsxs)("div", {
                    className: "flex items-center gap-2",
                    children: [
                      t
                        ? B.jsx(o4, { size: 16, className: "text-green-500" })
                        : B.jsx(o3, { size: 16, className: "text-red-500" }),
                      B.jsx("span", {
                        className: "text-sm font-medium text-gray-700",
                        children: t
                          ? "Architecture Valid"
                          : `${a} Error${a > 1 ? "s" : ""}`,
                      }),
                    ],
                  }),
                  a > 0 &&
                    (r
                      ? B.jsx(o6, { size: 16, className: "text-gray-400" })
                      : B.jsx(o9, { size: 16, className: "text-gray-400" })),
                ],
              }),
              r &&
                a > 0 &&
                B.jsx("div", {
                  className:
                    "max-h-60 overflow-y-auto border-t border-gray-200 px-4 py-2",
                  children: B.jsx("ul", {
                    className: "space-y-2",
                    children: e.map((e, t) =>
                      (0, B.jsxs)(
                        "li",
                        {
                          onClick: () => e.nodeId && n(e.nodeId),
                          className:
                            "cursor-pointer rounded-md bg-red-50 px-3 py-2 text-xs text-red-600 hover:bg-red-100",
                          children: [
                            B.jsx("div", {
                              className: "font-medium",
                              children: e.code,
                            }),
                            B.jsx("div", {
                              className: "mt-0.5 text-red-500",
                              children: e.message,
                            }),
                          ],
                        },
                        `${e.code}-${t}`,
                      ),
                    ),
                  }),
                }),
            ],
          });
        }
        let o8 = aX((e) => ({
            isDeploying: !1,
            progress: null,
            result: null,
            cloudConfig: null,
            setCloudConfig: (t) => e({ cloudConfig: t }),
            startDeploy: () =>
              e({ isDeploying: !0, progress: null, result: null }),
            updateProgress: (t) => e({ progress: t }),
            setResult: (t) => e({ isDeploying: !1, result: t }),
            reset: () => e({ isDeploying: !1, progress: null, result: null }),
          })),
          le = o0("LoaderCircle", [
            ["path", { d: "M21 12a9 9 0 1 1-6.219-8.56", key: "13zald" }],
          ]),
          lt = o0("Rocket", [
            [
              "path",
              {
                d: "M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z",
                key: "m3kijz",
              },
            ],
            [
              "path",
              {
                d: "m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z",
                key: "1fmvmk",
              },
            ],
            [
              "path",
              { d: "M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0", key: "1f8sc4" },
            ],
            [
              "path",
              { d: "M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5", key: "qeys4" },
            ],
          ]),
          ln = o0("ExternalLink", [
            ["path", { d: "M15 3h6v6", key: "1q9fwt" }],
            ["path", { d: "M10 14 21 3", key: "gplh6r" }],
            [
              "path",
              {
                d: "M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6",
                key: "a6xqqp",
              },
            ],
          ]),
          lr = {
            idle: "Idle",
            generating: "Generating Artifacts",
            "creating-repo": "Creating GitHub Repository",
            "pushing-files": "Pushing Files to GitHub",
            "linking-vercel": "Linking to Vercel",
            "deploying-vercel": "Deploying to Vercel",
            "provisioning-supabase": "Provisioning Supabase Database",
            "configuring-env": "Configuring Environment Variables",
            complete: "Deployment Complete",
            failed: "Deployment Failed",
          };
        function li() {
          let [e, t] = (0, F.useState)(!1),
            [n, r] = (0, F.useState)("my-project"),
            i = oF((e) => e.isValid),
            a = oF((e) => e.nodes.length),
            s = o8((e) => e.cloudConfig),
            {
              deploy: o,
              isDeploying: l,
              progress: d,
              result: u,
            } = (function () {
              let e = o8((e) => e.isDeploying),
                t = o8((e) => e.progress),
                n = o8((e) => e.result),
                r = o8((e) => e.cloudConfig),
                i = o8((e) => e.startDeploy),
                a = o8((e) => e.updateProgress),
                s = o8((e) => e.setResult),
                o = o8((e) => e.reset),
                l = oF((e) => e.toProjectConfig);
              return {
                deploy: (0, F.useCallback)(
                  async (e) => {
                    if (!r)
                      return {
                        success: !1,
                        error:
                          "Cloud config not set. Configure GitHub, Vercel, and Supabase tokens first.",
                      };
                    i();
                    try {
                      a({
                        step: "generating",
                        message: "Generating project artifacts...",
                        percentage: 5,
                      });
                      let t = l(e),
                        n = new a1(),
                        i = new a3(n),
                        o = ((e) => {
                          let t = e.entities?.map((e) => {
                            let t = e.fields?.map(
                              (e) => new aQ(e.name, e.type, {}),
                            );
                            return new aJ(e.name, t ?? [], {
                              features: e.features ?? [],
                            });
                          });
                          return new a0(e.name, {
                            entities: t ?? [],
                            architecture: e.architecture,
                            frontend: e.frontend,
                            infrastructure: e.infrastructure,
                          });
                        })(t),
                        d = o.validate();
                      if (!d.valid)
                        throw Error(
                          `Project validation failed: ${d.errors.map((e) => e.message).join(", ")}`,
                        );
                      let u = await i.generate({
                        project: o,
                        outputDir: "./generated",
                      });
                      if (!u.success && u.errors.length > 0)
                        throw Error(
                          `Generation failed: ${u.errors.map((e) => e.message).join(", ")}`,
                        );
                      let c = u.artifacts,
                        h = new oL({
                          projectName: e,
                          config: r,
                          artifacts: c,
                          description: t.description,
                          onProgress: (e) => a(e),
                        }),
                        p = await h.execute();
                      return (s(p), p);
                    } catch (t) {
                      let e = {
                        success: !1,
                        error: t instanceof Error ? t.message : String(t),
                      };
                      return (s(e), e);
                    }
                  },
                  [r, i, a, s, l],
                ),
                isDeploying: e,
                progress: t,
                result: n,
                reset: o,
                cloudConfig: r,
              };
            })(),
            c = async () => {
              (t(!0), await o(n));
            },
            h = d?.step ?? "idle",
            p = d?.percentage ?? 0;
          return (0, B.jsxs)(B.Fragment, {
            children: [
              (0, B.jsxs)("button", {
                onClick: c,
                disabled: !i || 0 === a || l,
                className:
                  "flex items-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-md transition-all hover:from-blue-700 hover:to-indigo-700 disabled:cursor-not-allowed disabled:from-gray-300 disabled:to-gray-300",
                children: [
                  l
                    ? B.jsx(le, { size: 16, className: "animate-spin" })
                    : B.jsx(lt, { size: 16 }),
                  "Deploy to Cloud",
                ],
              }),
              e &&
                B.jsx("div", {
                  className:
                    "fixed inset-0 z-50 flex items-center justify-center bg-black/50",
                  children: (0, B.jsxs)("div", {
                    className:
                      "w-full max-w-lg rounded-xl bg-white p-6 shadow-2xl",
                    children: [
                      (0, B.jsxs)("div", {
                        className: "mb-4 flex items-center justify-between",
                        children: [
                          B.jsx("h2", {
                            className: "text-lg font-semibold text-gray-800",
                            children: "Cloud Deployment",
                          }),
                          B.jsx("button", {
                            onClick: () => !l && t(!1),
                            className:
                              "rounded p-1 text-gray-400 hover:bg-gray-100",
                            disabled: l,
                            children: B.jsx(o1, { size: 20 }),
                          }),
                        ],
                      }),
                      !l &&
                        !u &&
                        (0, B.jsxs)("div", {
                          className: "space-y-4",
                          children: [
                            (0, B.jsxs)("div", {
                              children: [
                                B.jsx("label", {
                                  className:
                                    "mb-1 block text-sm font-medium text-gray-600",
                                  children: "Project Name",
                                }),
                                B.jsx("input", {
                                  type: "text",
                                  value: n,
                                  onChange: (e) => r(e.target.value),
                                  className:
                                    "w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500",
                                }),
                              ],
                            }),
                            !s &&
                              (0, B.jsxs)("div", {
                                className:
                                  "flex items-center gap-2 rounded-md bg-amber-50 px-3 py-2 text-sm text-amber-600",
                                children: [
                                  B.jsx(o3, { size: 16 }),
                                  "Cloud tokens not configured. Set GitHub, Vercel, and Supabase tokens first.",
                                ],
                              }),
                            B.jsx("button", {
                              onClick: c,
                              disabled: !s,
                              className:
                                "w-full rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-300",
                              children: "Start Deployment",
                            }),
                          ],
                        }),
                      l &&
                        (0, B.jsxs)("div", {
                          className: "space-y-4",
                          children: [
                            B.jsx("div", {
                              className: "space-y-2",
                              children: Object.keys(lr)
                                .filter((e) => "idle" !== e && "failed" !== e)
                                .map((e) => {
                                  let t = h === e,
                                    n =
                                      d &&
                                      p >
                                        ({
                                          idle: 0,
                                          generating: 5,
                                          "creating-repo": 10,
                                          "pushing-files": 25,
                                          "linking-vercel": 40,
                                          "deploying-vercel": 55,
                                          "provisioning-supabase": 60,
                                          "configuring-env": 80,
                                          complete: 100,
                                          failed: 0,
                                        }[e] ?? 0);
                                  return (0, B.jsxs)(
                                    "div",
                                    {
                                      className: "flex items-center gap-3",
                                      children: [
                                        B.jsx("div", {
                                          className: `flex h-6 w-6 items-center justify-center rounded-full text-xs ${t ? "bg-blue-600 text-white" : n ? "bg-green-500 text-white" : "bg-gray-200 text-gray-400"}`,
                                          children: t
                                            ? B.jsx(le, {
                                                size: 12,
                                                className: "animate-spin",
                                              })
                                            : n
                                              ? B.jsx(o4, { size: 12 })
                                              : "",
                                        }),
                                        B.jsx("span", {
                                          className: `text-sm ${t ? "font-medium text-gray-800" : n ? "text-gray-600" : "text-gray-400"}`,
                                          children: lr[e],
                                        }),
                                      ],
                                    },
                                    e,
                                  );
                                }),
                            }),
                            B.jsx("div", {
                              className:
                                "h-2 overflow-hidden rounded-full bg-gray-200",
                              children: B.jsx("div", {
                                className:
                                  "h-full rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 transition-all duration-500",
                                style: { width: `${p}%` },
                              }),
                            }),
                            B.jsx("p", {
                              className: "text-center text-sm text-gray-500",
                              children: d?.message,
                            }),
                          ],
                        }),
                      !l &&
                        u &&
                        (0, B.jsxs)("div", {
                          className: "space-y-4",
                          children: [
                            u.success
                              ? (0, B.jsxs)(B.Fragment, {
                                  children: [
                                    (0, B.jsxs)("div", {
                                      className:
                                        "flex items-center gap-2 rounded-md bg-green-50 px-4 py-3 text-sm text-green-700",
                                      children: [
                                        B.jsx(o4, { size: 20 }),
                                        B.jsx("span", {
                                          className: "font-medium",
                                          children: "Deployment Successful!",
                                        }),
                                      ],
                                    }),
                                    (0, B.jsxs)("div", {
                                      className: "space-y-2",
                                      children: [
                                        u.githubUrl &&
                                          B.jsx(la, {
                                            label: "GitHub",
                                            url: u.githubUrl,
                                          }),
                                        u.vercelUrl &&
                                          B.jsx(la, {
                                            label: "Vercel",
                                            url: u.vercelUrl,
                                          }),
                                        u.supabaseUrl &&
                                          B.jsx(la, {
                                            label: "Supabase",
                                            url: u.supabaseUrl,
                                          }),
                                      ],
                                    }),
                                  ],
                                })
                              : (0, B.jsxs)("div", {
                                  className:
                                    "flex items-center gap-2 rounded-md bg-red-50 px-4 py-3 text-sm text-red-600",
                                  children: [
                                    B.jsx(o3, { size: 20 }),
                                    B.jsx("span", { children: u.error }),
                                  ],
                                }),
                            B.jsx("button", {
                              onClick: () => t(!1),
                              className:
                                "w-full rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50",
                              children: "Close",
                            }),
                          ],
                        }),
                    ],
                  }),
                }),
            ],
          });
        }
        function la({ label: e, url: t }) {
          return (0, B.jsxs)("a", {
            href: t,
            target: "_blank",
            rel: "noopener noreferrer",
            className:
              "flex items-center justify-between rounded-md border border-gray-200 px-4 py-2.5 text-sm hover:bg-gray-50",
            children: [
              B.jsx("span", {
                className: "font-medium text-gray-700",
                children: e,
              }),
              (0, B.jsxs)("div", {
                className: "flex items-center gap-2 text-blue-600",
                children: [
                  B.jsx("span", { className: "truncate", children: t }),
                  B.jsx(ln, { size: 14 }),
                ],
              }),
            ],
          });
        }
        /**
         * @license lucide-react v0.400.0 - ISC
         *
         * This source code is licensed under the ISC license.
         * See the LICENSE file in the root directory of this source tree.
         */ let ls = o0("Wifi", [
            ["path", { d: "M12 20h.01", key: "zekei9" }],
            ["path", { d: "M2 8.82a15 15 0 0 1 20 0", key: "dnpr2z" }],
            ["path", { d: "M5 12.859a10 10 0 0 1 14 0", key: "1x1e6c" }],
            ["path", { d: "M8.5 16.429a5 5 0 0 1 7 0", key: "1bycff" }],
          ]),
          lo = o0("WifiOff", [
            ["path", { d: "M12 20h.01", key: "zekei9" }],
            ["path", { d: "M8.5 16.429a5 5 0 0 1 7 0", key: "1bycff" }],
            ["path", { d: "M5 12.859a10 10 0 0 1 5.17-2.69", key: "1dl1wf" }],
            [
              "path",
              { d: "M19 12.859a10 10 0 0 0-2.007-1.523", key: "4k23kn" },
            ],
            ["path", { d: "M2 8.82a15 15 0 0 1 4.177-2.643", key: "1grhjp" }],
            ["path", { d: "M22 8.82a15 15 0 0 0-11.288-3.764", key: "z3jwby" }],
            ["path", { d: "m2 2 20 20", key: "1ooewy" }],
          ]),
          ll = o0("Users", [
            [
              "path",
              { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2", key: "1yyitq" },
            ],
            ["circle", { cx: "9", cy: "7", r: "4", key: "nufk8" }],
            ["path", { d: "M22 21v-2a4 4 0 0 0-3-3.87", key: "kshegd" }],
            ["path", { d: "M16 3.13a4 4 0 0 1 0 7.75", key: "1da9ce" }],
          ]);
        function ld({ roomId: e }) {
          let { peers: t, isConnected: n } = (function (e, t) {
            let [n, r] = (0, F.useState)(null),
              [i, a] = (0, F.useState)([]),
              [s, o] = (0, F.useState)(!1),
              l = (0, F.useCallback)(
                (e) => {
                  n?.updateCursor(e);
                },
                [n],
              ),
              d = (0, F.useCallback)(
                (e) => {
                  n?.setSelectedNode(e);
                },
                [n],
              );
            return {
              provider: n,
              peers: i,
              isConnected: s,
              updateCursor: l,
              setSelectedNode: d,
            };
          })(0);
          return (0, B.jsxs)("div", {
            className: "flex items-center gap-2",
            children: [
              (0, B.jsxs)("div", {
                className: `flex items-center gap-1 text-xs ${n ? "text-green-600" : "text-gray-400"}`,
                children: [
                  n ? B.jsx(ls, { size: 14 }) : B.jsx(lo, { size: 14 }),
                  B.jsx("span", { children: n ? "Connected" : "Offline" }),
                ],
              }),
              t.length > 0 &&
                (0, B.jsxs)("div", {
                  className: "flex items-center gap-1",
                  children: [
                    B.jsx(ll, { size: 14, className: "text-gray-400" }),
                    (0, B.jsxs)("div", {
                      className: "flex -space-x-2",
                      children: [
                        t
                          .slice(0, 5)
                          .map((e) =>
                            B.jsx(
                              "div",
                              {
                                className:
                                  "flex h-7 w-7 items-center justify-center rounded-full border-2 border-white text-xs font-medium text-white shadow-sm",
                                style: { backgroundColor: e.color },
                                title: e.name,
                                children: e.name.slice(-2).toUpperCase(),
                              },
                              e.id,
                            ),
                          ),
                        t.length > 5 &&
                          (0, B.jsxs)("div", {
                            className:
                              "flex h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-gray-400 text-xs font-medium text-white",
                            children: ["+", t.length - 5],
                          }),
                      ],
                    }),
                  ],
                }),
            ],
          });
        }
        /**
         * @license lucide-react v0.400.0 - ISC
         *
         * This source code is licensed under the ISC license.
         * See the LICENSE file in the root directory of this source tree.
         */ let lu = o0("Share2", [
            ["circle", { cx: "18", cy: "5", r: "3", key: "gq8acd" }],
            ["circle", { cx: "6", cy: "12", r: "3", key: "w7nqdw" }],
            ["circle", { cx: "18", cy: "19", r: "3", key: "1xt0gg" }],
            [
              "line",
              {
                x1: "8.59",
                x2: "15.42",
                y1: "13.51",
                y2: "17.49",
                key: "47mynk",
              },
            ],
            [
              "line",
              {
                x1: "15.41",
                x2: "8.59",
                y1: "6.51",
                y2: "10.49",
                key: "1n3mei",
              },
            ],
          ]),
          lc = o0("Lock", [
            [
              "rect",
              {
                width: "18",
                height: "11",
                x: "3",
                y: "11",
                rx: "2",
                ry: "2",
                key: "1w4ew1",
              },
            ],
            ["path", { d: "M7 11V7a5 5 0 0 1 10 0v4", key: "fwvmzm" }],
          ]),
          lh = o0("Check", [["path", { d: "M20 6 9 17l-5-5", key: "1gmf2c" }]]),
          lp = o0("Copy", [
            [
              "rect",
              {
                width: "14",
                height: "14",
                x: "8",
                y: "8",
                rx: "2",
                ry: "2",
                key: "17jyea",
              },
            ],
            [
              "path",
              {
                d: "M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2",
                key: "zix9uf",
              },
            ],
          ]);
        function lf() {
          let [e, t] = (0, F.useState)(!1),
            [n] = (0, F.useState)(() => oU(10)),
            [r, i] = (0, F.useState)(""),
            [a, s] = (0, F.useState)(!1);
          return (0, B.jsxs)(B.Fragment, {
            children: [
              (0, B.jsxs)("button", {
                onClick: () => t(!0),
                className:
                  "flex items-center gap-2 rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50",
                children: [B.jsx(lu, { size: 16 }), "Share"],
              }),
              e &&
                B.jsx("div", {
                  className:
                    "fixed inset-0 z-50 flex items-center justify-center bg-black/50",
                  children: (0, B.jsxs)("div", {
                    className:
                      "w-full max-w-md rounded-xl bg-white p-6 shadow-2xl",
                    children: [
                      B.jsx("h2", {
                        className: "mb-4 text-lg font-semibold text-gray-800",
                        children: "Share Architecture",
                      }),
                      (0, B.jsxs)("div", {
                        className: "space-y-4",
                        children: [
                          (0, B.jsxs)("div", {
                            children: [
                              (0, B.jsxs)("label", {
                                className:
                                  "mb-1 block text-sm font-medium text-gray-600",
                                children: [
                                  B.jsx(lc, {
                                    size: 14,
                                    className: "mr-1 inline",
                                  }),
                                  "E2EE Password (optional)",
                                ],
                              }),
                              B.jsx("input", {
                                type: "password",
                                value: r,
                                onChange: (e) => i(e.target.value),
                                placeholder: "Shared secret for encryption",
                                className:
                                  "w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500",
                              }),
                            ],
                          }),
                          (0, B.jsxs)("div", {
                            children: [
                              B.jsx("label", {
                                className:
                                  "mb-1 block text-sm font-medium text-gray-600",
                                children: "Share Link",
                              }),
                              (0, B.jsxs)("div", {
                                className: "flex gap-2",
                                children: [
                                  B.jsx("input", {
                                    type: "text",
                                    readOnly: !0,
                                    value: "",
                                    className:
                                      "flex-1 rounded-md border border-gray-300 bg-gray-50 px-3 py-2 text-sm text-gray-600",
                                  }),
                                  (0, B.jsxs)("button", {
                                    onClick: () => {
                                      (navigator.clipboard.writeText(""),
                                        s(!0),
                                        setTimeout(() => s(!1), 2e3));
                                    },
                                    className:
                                      "flex items-center gap-1 rounded-md bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700",
                                    children: [
                                      a
                                        ? B.jsx(lh, { size: 16 })
                                        : B.jsx(lp, { size: 16 }),
                                      a ? "Copied" : "Copy",
                                    ],
                                  }),
                                ],
                              }),
                            ],
                          }),
                          (0, B.jsxs)("div", {
                            className:
                              "rounded-md bg-blue-50 px-4 py-3 text-xs text-blue-600",
                            children: [
                              "Collaborators with this link can edit the architecture in real-time.",
                              r &&
                                " All communication is end-to-end encrypted.",
                            ],
                          }),
                          B.jsx("button", {
                            onClick: () => t(!1),
                            className:
                              "w-full rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50",
                            children: "Close",
                          }),
                        ],
                      }),
                    ],
                  }),
                }),
            ],
          });
        }
        function lm() {
          let [e] = (0, F.useState)(
            () => `sbc-${Math.random().toString(36).slice(2, 10)}`,
          );
          return (0, B.jsxs)("div", {
            className: "flex h-screen flex-col overflow-hidden bg-gray-50",
            children: [
              (0, B.jsxs)("header", {
                className:
                  "flex items-center justify-between border-b border-gray-200 bg-white px-4 py-2.5 shadow-sm",
                children: [
                  (0, B.jsxs)("div", {
                    className: "flex items-center gap-3",
                    children: [
                      (0, B.jsxs)("h1", {
                        className: "text-lg font-bold text-gray-800",
                        children: [
                          "SBC ",
                          B.jsx("span", {
                            className: "text-blue-600",
                            children: "ASP",
                          }),
                        ],
                      }),
                      B.jsx("span", {
                        className:
                          "rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-500",
                        children: "Architecture Design Platform",
                      }),
                    ],
                  }),
                  (0, B.jsxs)("div", {
                    className: "flex items-center gap-3",
                    children: [
                      B.jsx(F.Suspense, {
                        fallback: B.jsx("div", {
                          className: "text-xs text-gray-400",
                          children: "Loading...",
                        }),
                        children: B.jsx(ld, { roomId: e }),
                      }),
                      B.jsx("div", { className: "h-6 w-px bg-gray-200" }),
                      B.jsx(lf, {}),
                      B.jsx(li, {}),
                    ],
                  }),
                ],
              }),
              (0, B.jsxs)("div", {
                className: "flex flex-1 overflow-hidden",
                children: [
                  B.jsx(oY, {}),
                  (0, B.jsxs)("div", {
                    className: "relative flex-1",
                    children: [B.jsx(oW, {}), B.jsx(o7, {})],
                  }),
                  B.jsx(o5, {}),
                ],
              }),
            ],
          });
        }
      },
      2550: (e, t, n) => {
        "use strict";
        /**
         * @license React
         * use-sync-external-store-shim.production.js
         *
         * Copyright (c) Meta Platforms, Inc. and affiliates.
         *
         * This source code is licensed under the MIT license found in the
         * LICENSE file in the root directory of this source tree.
         */ var r = n(1664),
          i =
            "function" == typeof Object.is
              ? Object.is
              : function (e, t) {
                  return (
                    (e === t && (0 !== e || 1 / e == 1 / t)) ||
                    (e != e && t != t)
                  );
                },
          a = r.useState,
          s = r.useEffect,
          o = r.useLayoutEffect,
          l = r.useDebugValue;
        function d(e) {
          var t = e.getSnapshot;
          e = e.value;
          try {
            var n = t();
            return !i(e, n);
          } catch (e) {
            return !0;
          }
        }
        var u =
          "undefined" == typeof window ||
          void 0 === window.document ||
          void 0 === window.document.createElement
            ? function (e, t) {
                return t();
              }
            : function (e, t) {
                var n = t(),
                  r = a({ inst: { value: n, getSnapshot: t } }),
                  i = r[0].inst,
                  u = r[1];
                return (
                  o(
                    function () {
                      ((i.value = n),
                        (i.getSnapshot = t),
                        d(i) && u({ inst: i }));
                    },
                    [e, n, t],
                  ),
                  s(
                    function () {
                      return (
                        d(i) && u({ inst: i }),
                        e(function () {
                          d(i) && u({ inst: i });
                        })
                      );
                    },
                    [e],
                  ),
                  l(n),
                  n
                );
              };
        t.useSyncExternalStore =
          void 0 !== r.useSyncExternalStore ? r.useSyncExternalStore : u;
      },
      8332: (e, t, n) => {
        "use strict";
        /**
         * @license React
         * use-sync-external-store-shim/with-selector.production.js
         *
         * Copyright (c) Meta Platforms, Inc. and affiliates.
         *
         * This source code is licensed under the MIT license found in the
         * LICENSE file in the root directory of this source tree.
         */ var r = n(1664),
          i = n(1480),
          a =
            "function" == typeof Object.is
              ? Object.is
              : function (e, t) {
                  return (
                    (e === t && (0 !== e || 1 / e == 1 / t)) ||
                    (e != e && t != t)
                  );
                },
          s = i.useSyncExternalStore,
          o = r.useRef,
          l = r.useEffect,
          d = r.useMemo,
          u = r.useDebugValue;
        t.useSyncExternalStoreWithSelector = function (e, t, n, r, i) {
          var c = o(null);
          if (null === c.current) {
            var h = { hasValue: !1, value: null };
            c.current = h;
          } else h = c.current;
          var p = s(
            e,
            (c = d(
              function () {
                function e(e) {
                  if (!l) {
                    if (
                      ((l = !0),
                      (s = e),
                      (e = r(e)),
                      void 0 !== i && h.hasValue)
                    ) {
                      var t = h.value;
                      if (i(t, e)) return (o = t);
                    }
                    return (o = e);
                  }
                  if (((t = o), a(s, e))) return t;
                  var n = r(e);
                  return void 0 !== i && i(t, n)
                    ? ((s = e), t)
                    : ((s = e), (o = n));
                }
                var s,
                  o,
                  l = !1,
                  d = void 0 === n ? null : n;
                return [
                  function () {
                    return e(t());
                  },
                  null === d
                    ? void 0
                    : function () {
                        return e(d());
                      },
                ];
              },
              [t, n, r, i],
            ))[0],
            c[1],
          );
          return (
            l(
              function () {
                ((h.hasValue = !0), (h.value = p));
              },
              [p],
            ),
            u(p),
            p
          );
        };
      },
      1480: (e, t, n) => {
        "use strict";
        e.exports = n(2550);
      },
      4732: (e, t, n) => {
        "use strict";
        e.exports = n(8332);
      },
      914: (e, t, n) => {
        "use strict";
        (n.r(t), n.d(t, { default: () => a, metadata: () => i }));
        var r = n(8529);
        n(1835);
        let i = {
          title: "SBC Dashboard",
          description: "SupportingBasesCreations - Mega-Tech Project Generator",
        };
        function a({ children: e }) {
          return r.jsx("html", {
            lang: "en",
            children: r.jsx("body", { className: "min-h-screen", children: e }),
          });
        }
      },
      8077: (e, t, n) => {
        "use strict";
        (n.r(t),
          n.d(t, { $$typeof: () => s, __esModule: () => a, default: () => o }));
        var r = n(4259);
        let i = (0, r.createProxy)(
            String.raw`C:\Users\Tay\CascadeProjects\SupportingBasesCreations\apps\dashboard\src\app\page.tsx`,
          ),
          { __esModule: a, $$typeof: s } = i;
        i.default;
        let o = (0, r.createProxy)(
          String.raw`C:\Users\Tay\CascadeProjects\SupportingBasesCreations\apps\dashboard\src\app\page.tsx#default`,
        );
      },
      1835: () => {},
      8730: () => {},
    }));
  var t = require("../webpack-runtime.js");
  t.C(e);
  var n = (e) => t((t.s = e)),
    r = t.X(0, [405], () => n(6528));
  module.exports = r;
})();
