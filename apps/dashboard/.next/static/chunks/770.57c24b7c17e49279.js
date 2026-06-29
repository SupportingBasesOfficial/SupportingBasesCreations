"use strict";
(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [770],
  {
    9770: function (e, t, s) {
      s.d(t, {
        IndexeddbPersistence: function () {
          return E;
        },
      });
      var r = s(5556),
        n = s(22),
        d = s(2285);
      let o = (e) =>
          n.Ue((t, s) => {
            ((e.onerror = (e) => s(Error(e.target.error))),
              (e.onsuccess = (e) => t(e.target.result)));
          }),
        i = (e, t) =>
          n.Ue((s, r) => {
            let n = indexedDB.open(e);
            ((n.onupgradeneeded = (e) => t(e.target.result)),
              (n.onerror = (e) => r(d.Ue(e.target.error))),
              (n.onsuccess = (e) => {
                let t = e.target.result;
                ((t.onversionchange = () => {
                  t.close();
                }),
                  s(t));
              }));
          }),
        h = (e) => o(indexedDB.deleteDatabase(e)),
        u = (e, t) => t.forEach((t) => e.createObjectStore.apply(e, t)),
        a = (e, t, s = "readwrite") => {
          let r = e.transaction(t, s);
          return t.map((e) => I(r, e));
        },
        c = (e, t) => o(e.count(t)),
        l = (e, t) => o(e.get(t)),
        _ = (e, t) => o(e.delete(t)),
        b = (e, t, s) => o(e.put(t, s)),
        p = (e, t) => o(e.add(t)),
        y = (e, t, s) => o(e.getAll(t, s)),
        m = (e, t, s) => {
          let r = null;
          return T(e, t, (e) => ((r = e), !1), s).then(() => r);
        },
        f = (e, t = null) => m(e, t, "prev"),
        g = (e, t) =>
          n.Ue((s, r) => {
            ((e.onerror = r),
              (e.onsuccess = async (e) => {
                let r = e.target.result;
                if (null === r || (await t(r)) === !1) return s();
                r.continue();
              }));
          }),
        T = (e, t, s, r = "next") => g(e.openKeyCursor(t, r), (e) => s(e.key)),
        I = (e, t) => e.objectStore(t),
        U = (e, t) => IDBKeyRange.upperBound(e, t),
        w = (e, t) => IDBKeyRange.lowerBound(e, t);
      var B = s(9267);
      let D = "custom",
        k = "updates",
        x = (e, t = () => {}, s = () => {}) => {
          let [n] = a(e.db, [k]);
          return y(n, w(e._dbref, !1))
            .then((d) => {
              e._destroyed ||
                (t(n),
                r.transact(
                  e.doc,
                  () => {
                    d.forEach((t) => r.applyUpdate(e.doc, t));
                  },
                  e,
                  !1,
                ),
                s(n));
            })
            .then(() =>
              f(n).then((t) => {
                e._dbref = t + 1;
              }),
            )
            .then(() =>
              c(n).then((t) => {
                e._dbsize = t;
              }),
            )
            .then(() => n);
        },
        z = (e, t = !0) =>
          x(e).then((s) => {
            (t || e._dbsize >= 500) &&
              p(s, r.encodeStateAsUpdate(e.doc))
                .then(() => _(s, U(e._dbref, !0)))
                .then(() =>
                  c(s).then((t) => {
                    e._dbsize = t;
                  }),
                );
          });
      class E extends B.y {
        constructor(e, t) {
          (super(),
            (this.doc = t),
            (this.name = e),
            (this._dbref = 0),
            (this._dbsize = 0),
            (this._destroyed = !1),
            (this.db = null),
            (this.synced = !1),
            (this._db = i(e, (e) =>
              u(e, [["updates", { autoIncrement: !0 }], ["custom"]]),
            )),
            (this.whenSynced = n.Ue((e) => this.on("synced", () => e(this)))),
            this._db.then((e) => {
              ((this.db = e),
                x(
                  this,
                  (e) => p(e, r.encodeStateAsUpdate(t)),
                  () => {
                    if (this._destroyed) return this;
                    ((this.synced = !0), this.emit("synced", [this]));
                  },
                ));
            }),
            (this._storeTimeout = 1e3),
            (this._storeTimeoutId = null),
            (this._storeUpdate = (e, t) => {
              if (this.db && t !== this) {
                let [t] = a(this.db, [k]);
                (p(t, e),
                  ++this._dbsize >= 500 &&
                    (null !== this._storeTimeoutId &&
                      clearTimeout(this._storeTimeoutId),
                    (this._storeTimeoutId = setTimeout(() => {
                      (z(this, !1), (this._storeTimeoutId = null));
                    }, this._storeTimeout))));
              }
            }),
            t.on("update", this._storeUpdate),
            (this.destroy = this.destroy.bind(this)),
            t.on("destroy", this.destroy));
        }
        destroy() {
          return (
            this._storeTimeoutId && clearTimeout(this._storeTimeoutId),
            this.doc.off("update", this._storeUpdate),
            this.doc.off("destroy", this.destroy),
            (this._destroyed = !0),
            this._db.then((e) => {
              e.close();
            })
          );
        }
        clearData() {
          return this.destroy().then(() => {
            h(this.name);
          });
        }
        get(e) {
          return this._db.then((t) => {
            let [s] = a(t, [D], "readonly");
            return l(s, e);
          });
        }
        set(e, t) {
          return this._db.then((s) => {
            let [r] = a(s, [D]);
            return b(r, t, e);
          });
        }
        del(e) {
          return this._db.then((t) => {
            let [s] = a(t, [D]);
            return _(s, e);
          });
        }
      }
    },
  },
]);
