"use strict";
(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [970],
  {
    5556: function (t, e, r) {
      (r.r(e),
        r.d(e, {
          AbsolutePosition: function () {
            return tU;
          },
          AbstractConnector: function () {
            return E;
          },
          AbstractStruct: function () {
            return rT;
          },
          AbstractType: function () {
            return eq;
          },
          Array: function () {
            return rh;
          },
          ContentAny: function () {
            return r$;
          },
          ContentBinary: function () {
            return rV;
          },
          ContentDeleted: function () {
            return rP;
          },
          ContentDoc: function () {
            return rz;
          },
          ContentEmbed: function () {
            return rJ;
          },
          ContentFormat: function () {
            return rY;
          },
          ContentJSON: function () {
            return rH;
          },
          ContentString: function () {
            return rj;
          },
          ContentType: function () {
            return r1;
          },
          Doc: function () {
            return F;
          },
          GC: function () {
            return rR;
          },
          ID: function () {
            return tm;
          },
          Item: function () {
            return r9;
          },
          Map: function () {
            return ra;
          },
          PermanentUserData: function () {
            return tD;
          },
          RelativePosition: function () {
            return tv;
          },
          Skip: function () {
            return nt;
          },
          Snapshot: function () {
            return tz;
          },
          Text: function () {
            return rx;
          },
          Transaction: function () {
            return ee;
          },
          UndoManager: function () {
            return eg;
          },
          UpdateDecoderV1: function () {
            return J;
          },
          UpdateDecoderV2: function () {
            return H;
          },
          UpdateEncoderV1: function () {
            return $;
          },
          UpdateEncoderV2: function () {
            return K;
          },
          XmlElement: function () {
            return rM;
          },
          XmlFragment: function () {
            return rI;
          },
          XmlHook: function () {
            return rL;
          },
          XmlText: function () {
            return rO;
          },
          YArrayEvent: function () {
            return rc;
          },
          YEvent: function () {
            return eF;
          },
          YMapEvent: function () {
            return ru;
          },
          YTextEvent: function () {
            return rA;
          },
          YXmlEvent: function () {
            return rN;
          },
          applyUpdate: function () {
            return tr;
          },
          applyUpdateV2: function () {
            return te;
          },
          cleanupYTextFormatting: function () {
            return rC;
          },
          compareIDs: function () {
            return tk;
          },
          compareRelativePositions: function () {
            return tF;
          },
          convertUpdateFormatV1ToV2: function () {
            return eR;
          },
          convertUpdateFormatV2ToV1: function () {
            return eV;
          },
          createAbsolutePositionFromRelativePosition: function () {
            return tP;
          },
          createDeleteSet: function () {
            return N;
          },
          createDeleteSetFromStructStore: function () {
            return L;
          },
          createDocFromSnapshot: function () {
            return tq;
          },
          createID: function () {
            return t_;
          },
          createRelativePositionFromJSON: function () {
            return tx;
          },
          createRelativePositionFromTypeIndex: function () {
            return tN;
          },
          createSnapshot: function () {
            return tj;
          },
          decodeRelativePosition: function () {
            return tR;
          },
          decodeSnapshot: function () {
            return t$;
          },
          decodeSnapshotV2: function () {
            return tW;
          },
          decodeStateVector: function () {
            return to;
          },
          decodeUpdate: function () {
            return em;
          },
          decodeUpdateV2: function () {
            return ek;
          },
          diffUpdate: function () {
            return ex;
          },
          diffUpdateV2: function () {
            return eA;
          },
          emptySnapshot: function () {
            return tK;
          },
          encodeRelativePosition: function () {
            return tO;
          },
          encodeSnapshot: function () {
            return tH;
          },
          encodeSnapshotV2: function () {
            return tY;
          },
          encodeStateAsUpdate: function () {
            return ts;
          },
          encodeStateAsUpdateV2: function () {
            return ti;
          },
          encodeStateVector: function () {
            return ta;
          },
          encodeStateVectorFromUpdate: function () {
            return eS;
          },
          encodeStateVectorFromUpdateV2: function () {
            return eb;
          },
          equalDeleteSets: function () {
            return V;
          },
          equalSnapshots: function () {
            return tJ;
          },
          findIndexSS: function () {
            return t5;
          },
          findRootTypeKey: function () {
            return tS;
          },
          getItem: function () {
            return t7;
          },
          getItemCleanEnd: function () {
            return t3;
          },
          getItemCleanStart: function () {
            return t9;
          },
          getState: function () {
            return t8;
          },
          getTypeChildren: function () {
            return eB;
          },
          isDeleted: function () {
            return x;
          },
          isParentOf: function () {
            return tE;
          },
          iterateDeletedStructs: function () {
            return v;
          },
          logType: function () {
            return tC;
          },
          logUpdate: function () {
            return ep;
          },
          logUpdateV2: function () {
            return ew;
          },
          mergeDeleteSets: function () {
            return I;
          },
          mergeUpdates: function () {
            return ey;
          },
          mergeUpdatesV2: function () {
            return ev;
          },
          obfuscateUpdate: function () {
            return eO;
          },
          obfuscateUpdateV2: function () {
            return eT;
          },
          parseUpdateMeta: function () {
            return eC;
          },
          parseUpdateMetaV2: function () {
            return eE;
          },
          readUpdate: function () {
            return tt;
          },
          readUpdateV2: function () {
            return Q;
          },
          relativePositionToJSON: function () {
            return tA;
          },
          snapshot: function () {
            return tG;
          },
          snapshotContainsUpdate: function () {
            return tQ;
          },
          transact: function () {
            return eh;
          },
          tryGc: function () {
            return eo;
          },
          typeListToArraySnapshot: function () {
            return e0;
          },
          typeMapGetAllSnapshot: function () {
            return rl;
          },
          typeMapGetSnapshot: function () {
            return rs;
          },
        }));
      var n = r(9267),
        i = r(6366),
        s = r(626),
        l = r(746),
        o = r(9077),
        c = r(6353),
        h = r(972),
        u = r(22),
        a = r(8759),
        d = r(2285),
        g = r(6379),
        f = r(4389),
        p = r(7485),
        w = r(2223),
        m = r(5273),
        k = r(4587),
        _ = r(5020),
        y = r(675),
        b = r(310),
        S = r(2099);
      class E extends n.g {
        constructor(t, e) {
          (super(), (this.doc = t), (this.awareness = e));
        }
      }
      class C {
        constructor(t, e) {
          ((this.clock = t), (this.len = e));
        }
      }
      class D {
        constructor() {
          this.clients = new Map();
        }
      }
      let v = (t, e, r) =>
          e.clients.forEach((e, n) => {
            let i = t.doc.store.clients.get(n);
            if (null != i) {
              let n = i[i.length - 1],
                s = n.id.clock + n.length;
              for (let n = 0, l = e[n]; n < e.length && l.clock < s; l = e[++n])
                et(t, i, l.clock, l.len, r);
            }
          }),
        A = (t, e) => {
          let r = 0,
            n = t.length - 1;
          for (; r <= n;) {
            let i = s.GW((r + n) / 2),
              l = t[i],
              o = l.clock;
            if (o <= e) {
              if (e < o + l.len) return i;
              r = i + 1;
            } else n = i - 1;
          }
          return null;
        },
        x = (t, e) => {
          let r = t.clients.get(e.client);
          return void 0 !== r && null !== A(r, e.clock);
        },
        U = (t) => {
          t.clients.forEach((t) => {
            let e, r;
            for (
              t.sort((t, e) => t.clock - e.clock), e = 1, r = 1;
              e < t.length;
              e++
            ) {
              let n = t[r - 1],
                i = t[e];
              n.clock + n.len >= i.clock
                ? (t[r - 1] = new C(
                    n.clock,
                    s.Fp(n.len, i.clock + i.len - n.clock),
                  ))
                : (r < e && (t[r] = i), r++);
            }
            t.length = r;
          });
        },
        I = (t) => {
          let e = new D();
          for (let r = 0; r < t.length; r++)
            t[r].clients.forEach((n, s) => {
              if (!e.clients.has(s)) {
                let l = n.slice();
                for (let e = r + 1; e < t.length; e++)
                  i.s7(l, t[e].clients.get(s) || []);
                e.clients.set(s, l);
              }
            });
          return (U(e), e);
        },
        M = (t, e, r, n) => {
          l.Yu(t.clients, e, () => []).push(new C(r, n));
        },
        N = () => new D(),
        L = (t) => {
          let e = N();
          return (
            t.clients.forEach((t, r) => {
              let n = [];
              for (let e = 0; e < t.length; e++) {
                let r = t[e];
                if (r.deleted) {
                  let i = r.id.clock,
                    s = r.length;
                  if (e + 1 < t.length)
                    for (
                      let r = t[e + 1];
                      e + 1 < t.length && r.deleted;
                      r = t[++e + 1]
                    )
                      s += r.length;
                  n.push(new C(i, s));
                }
              }
              n.length > 0 && e.clients.set(r, n);
            }),
            e
          );
        },
        O = (t, e) => {
          (o.uE(t.restEncoder, e.clients.size),
            i
              .Dp(e.clients.entries())
              .sort((t, e) => e[0] - t[0])
              .forEach(([e, r]) => {
                (t.resetDsCurVal(), o.uE(t.restEncoder, e));
                let n = r.length;
                o.uE(t.restEncoder, n);
                for (let e = 0; e < n; e++) {
                  let n = r[e];
                  (t.writeDsClock(n.clock), t.writeDsLen(n.len));
                }
              }));
        },
        T = (t) => {
          let e = new D(),
            r = c.yg(t.restDecoder);
          for (let n = 0; n < r; n++) {
            t.resetDsCurVal();
            let r = c.yg(t.restDecoder),
              n = c.yg(t.restDecoder);
            if (n > 0) {
              let i = l.Yu(e.clients, r, () => []);
              for (let e = 0; e < n; e++)
                i.push(new C(t.readDsClock(), t.readDsLen()));
            }
          }
          return e;
        },
        R = (t, e, r) => {
          let n = new D(),
            i = c.yg(t.restDecoder);
          for (let s = 0; s < i; s++) {
            t.resetDsCurVal();
            let i = c.yg(t.restDecoder),
              s = c.yg(t.restDecoder),
              l = r.clients.get(i) || [],
              o = t8(r, i);
            for (let r = 0; r < s; r++) {
              let r = t.readDsClock(),
                s = r + t.readDsLen();
              if (r < o) {
                o < s && M(n, i, o, s - o);
                let t = t5(l, r),
                  c = l[t];
                for (
                  !c.deleted &&
                  c.id.clock < r &&
                  (l.splice(t + 1, 0, r5(e, c, r - c.id.clock)), t++);
                  t < l.length;
                )
                  if ((c = l[t++]).id.clock < s)
                    c.deleted ||
                      (s < c.id.clock + c.length &&
                        l.splice(t, 0, r5(e, c, s - c.id.clock)),
                      c.delete(e));
                  else break;
              } else M(n, i, r, s - r);
            }
          }
          if (n.clients.size > 0) {
            let t = new K();
            return (o.uE(t.restEncoder, 0), O(t, n), t.toUint8Array());
          }
          return null;
        },
        V = (t, e) => {
          if (t.clients.size !== e.clients.size) return !1;
          for (let [r, n] of t.clients.entries()) {
            let t = e.clients.get(r);
            if (void 0 === t || n.length !== t.length) return !1;
            for (let e = 0; e < n.length; e++) {
              let r = n[e],
                i = t[e];
              if (r.clock !== i.clock || r.len !== i.len) return !1;
            }
          }
          return !0;
        },
        P = h.U7;
      class F extends n.g {
        constructor({
          guid: t = h.k$(),
          collectionid: e = null,
          gc: r = !0,
          gcFilter: n = () => !0,
          meta: i = null,
          autoLoad: s = !1,
          shouldLoad: l = !0,
        } = {}) {
          (super(),
            (this.gc = r),
            (this.gcFilter = n),
            (this.clientID = P()),
            (this.guid = t),
            (this.collectionid = e),
            (this.share = new Map()),
            (this.store = new t0()),
            (this._transaction = null),
            (this._transactionCleanups = []),
            (this.subdocs = new Set()),
            (this._item = null),
            (this.shouldLoad = l),
            (this.autoLoad = s),
            (this.meta = i),
            (this.isLoaded = !1),
            (this.isSynced = !1),
            (this.isDestroyed = !1),
            (this.whenLoaded = u.Ue((t) => {
              this.on("load", () => {
                ((this.isLoaded = !0), t(this));
              });
            })));
          let o = () =>
            u.Ue((t) => {
              let e = (r) => {
                (void 0 === r || !0 === r) && (this.off("sync", e), t());
              };
              this.on("sync", e);
            });
          (this.on("sync", (t) => {
            (!1 === t && this.isSynced && (this.whenSynced = o()),
              (this.isSynced = void 0 === t || !0 === t),
              this.isSynced && !this.isLoaded && this.emit("load", [this]));
          }),
            (this.whenSynced = o()));
        }
        load() {
          let t = this._item;
          (null === t ||
            this.shouldLoad ||
            eh(
              t.parent.doc,
              (t) => {
                t.subdocsLoaded.add(this);
              },
              null,
              !0,
            ),
            (this.shouldLoad = !0));
        }
        getSubdocs() {
          return this.subdocs;
        }
        getSubdocGuids() {
          return new Set(i.Dp(this.subdocs).map((t) => t.guid));
        }
        transact(t, e = null) {
          return eh(this, t, e);
        }
        get(t, e = eq) {
          let r = l.Yu(this.share, t, () => {
              let t = new e();
              return (t._integrate(this, null), t);
            }),
            n = r.constructor;
          if (e !== eq && n !== e) {
            if (n === eq) {
              let n = new e();
              ((n._map = r._map),
                r._map.forEach((t) => {
                  for (; null !== t; t = t.left) t.parent = n;
                }),
                (n._start = r._start));
              for (let t = n._start; null !== t; t = t.right) t.parent = n;
              return (
                (n._length = r._length),
                this.share.set(t, n),
                n._integrate(this, null),
                n
              );
            }
            throw Error(
              `Type with the name ${t} has already been defined with a different constructor`,
            );
          }
          return r;
        }
        getArray(t = "") {
          return this.get(t, rh);
        }
        getText(t = "") {
          return this.get(t, rx);
        }
        getMap(t = "") {
          return this.get(t, ra);
        }
        getXmlElement(t = "") {
          return this.get(t, rM);
        }
        getXmlFragment(t = "") {
          return this.get(t, rI);
        }
        toJSON() {
          let t = {};
          return (
            this.share.forEach((e, r) => {
              t[r] = e.toJSON();
            }),
            t
          );
        }
        destroy() {
          ((this.isDestroyed = !0),
            i.Dp(this.subdocs).forEach((t) => t.destroy()));
          let t = this._item;
          if (null !== t) {
            this._item = null;
            let e = t.content;
            ((e.doc = new F({ guid: this.guid, ...e.opts, shouldLoad: !1 })),
              (e.doc._item = t),
              eh(
                t.parent.doc,
                (r) => {
                  let n = e.doc;
                  (t.deleted || r.subdocsAdded.add(n),
                    r.subdocsRemoved.add(this));
                },
                null,
                !0,
              ));
          }
          (this.emit("destroyed", [!0]),
            this.emit("destroy", [this]),
            super.destroy());
        }
      }
      class z {
        constructor(t) {
          this.restDecoder = t;
        }
        resetDsCurVal() {}
        readDsClock() {
          return c.yg(this.restDecoder);
        }
        readDsLen() {
          return c.yg(this.restDecoder);
        }
      }
      class J extends z {
        readLeftID() {
          return t_(c.yg(this.restDecoder), c.yg(this.restDecoder));
        }
        readRightID() {
          return t_(c.yg(this.restDecoder), c.yg(this.restDecoder));
        }
        readClient() {
          return c.yg(this.restDecoder);
        }
        readInfo() {
          return c.kj(this.restDecoder);
        }
        readString() {
          return c.kf(this.restDecoder);
        }
        readParentInfo() {
          return 1 === c.yg(this.restDecoder);
        }
        readTypeRef() {
          return c.yg(this.restDecoder);
        }
        readLen() {
          return c.yg(this.restDecoder);
        }
        readAny() {
          return c.v_(this.restDecoder);
        }
        readBuf() {
          return a.f9(c.HN(this.restDecoder));
        }
        readJSON() {
          return JSON.parse(c.kf(this.restDecoder));
        }
        readKey() {
          return c.kf(this.restDecoder);
        }
      }
      class Y {
        constructor(t) {
          ((this.dsCurrVal = 0), (this.restDecoder = t));
        }
        resetDsCurVal() {
          this.dsCurrVal = 0;
        }
        readDsClock() {
          return ((this.dsCurrVal += c.yg(this.restDecoder)), this.dsCurrVal);
        }
        readDsLen() {
          let t = c.yg(this.restDecoder) + 1;
          return ((this.dsCurrVal += t), t);
        }
      }
      class H extends Y {
        constructor(t) {
          (super(t),
            (this.keys = []),
            c.yg(t),
            (this.keyClockDecoder = new c.dD(c.HN(t))),
            (this.clientDecoder = new c.UF(c.HN(t))),
            (this.leftClockDecoder = new c.dD(c.HN(t))),
            (this.rightClockDecoder = new c.dD(c.HN(t))),
            (this.infoDecoder = new c.XW(c.HN(t), c.kj)),
            (this.stringDecoder = new c.sO(c.HN(t))),
            (this.parentInfoDecoder = new c.XW(c.HN(t), c.kj)),
            (this.typeRefDecoder = new c.UF(c.HN(t))),
            (this.lenDecoder = new c.UF(c.HN(t))));
        }
        readLeftID() {
          return new tm(
            this.clientDecoder.read(),
            this.leftClockDecoder.read(),
          );
        }
        readRightID() {
          return new tm(
            this.clientDecoder.read(),
            this.rightClockDecoder.read(),
          );
        }
        readClient() {
          return this.clientDecoder.read();
        }
        readInfo() {
          return this.infoDecoder.read();
        }
        readString() {
          return this.stringDecoder.read();
        }
        readParentInfo() {
          return 1 === this.parentInfoDecoder.read();
        }
        readTypeRef() {
          return this.typeRefDecoder.read();
        }
        readLen() {
          return this.lenDecoder.read();
        }
        readAny() {
          return c.v_(this.restDecoder);
        }
        readBuf() {
          return c.HN(this.restDecoder);
        }
        readJSON() {
          return c.v_(this.restDecoder);
        }
        readKey() {
          let t = this.keyClockDecoder.read();
          if (t < this.keys.length) return this.keys[t];
          {
            let t = this.stringDecoder.read();
            return (this.keys.push(t), t);
          }
        }
      }
      class W {
        constructor() {
          this.restEncoder = o.Mf();
        }
        toUint8Array() {
          return o._f(this.restEncoder);
        }
        resetDsCurVal() {}
        writeDsClock(t) {
          o.uE(this.restEncoder, t);
        }
        writeDsLen(t) {
          o.uE(this.restEncoder, t);
        }
      }
      class $ extends W {
        writeLeftID(t) {
          (o.uE(this.restEncoder, t.client), o.uE(this.restEncoder, t.clock));
        }
        writeRightID(t) {
          (o.uE(this.restEncoder, t.client), o.uE(this.restEncoder, t.clock));
        }
        writeClient(t) {
          o.uE(this.restEncoder, t);
        }
        writeInfo(t) {
          o.$F(this.restEncoder, t);
        }
        writeString(t) {
          o.uw(this.restEncoder, t);
        }
        writeParentInfo(t) {
          o.uE(this.restEncoder, t ? 1 : 0);
        }
        writeTypeRef(t) {
          o.uE(this.restEncoder, t);
        }
        writeLen(t) {
          o.uE(this.restEncoder, t);
        }
        writeAny(t) {
          o.EM(this.restEncoder, t);
        }
        writeBuf(t) {
          o.mP(this.restEncoder, t);
        }
        writeJSON(t) {
          o.uw(this.restEncoder, JSON.stringify(t));
        }
        writeKey(t) {
          o.uw(this.restEncoder, t);
        }
      }
      class j {
        constructor() {
          ((this.restEncoder = o.Mf()), (this.dsCurrVal = 0));
        }
        toUint8Array() {
          return o._f(this.restEncoder);
        }
        resetDsCurVal() {
          this.dsCurrVal = 0;
        }
        writeDsClock(t) {
          let e = t - this.dsCurrVal;
          ((this.dsCurrVal = t), o.uE(this.restEncoder, e));
        }
        writeDsLen(t) {
          (0 === t && d.zR(),
            o.uE(this.restEncoder, t - 1),
            (this.dsCurrVal += t));
        }
      }
      class K extends j {
        constructor() {
          (super(),
            (this.keyMap = new Map()),
            (this.keyClock = 0),
            (this.keyClockEncoder = new o.sX()),
            (this.clientEncoder = new o.HE()),
            (this.leftClockEncoder = new o.sX()),
            (this.rightClockEncoder = new o.sX()),
            (this.infoEncoder = new o.GF(o.$F)),
            (this.stringEncoder = new o.TS()),
            (this.parentInfoEncoder = new o.GF(o.$F)),
            (this.typeRefEncoder = new o.HE()),
            (this.lenEncoder = new o.HE()));
        }
        toUint8Array() {
          let t = o.Mf();
          return (
            o.uE(t, 0),
            o.mP(t, this.keyClockEncoder.toUint8Array()),
            o.mP(t, this.clientEncoder.toUint8Array()),
            o.mP(t, this.leftClockEncoder.toUint8Array()),
            o.mP(t, this.rightClockEncoder.toUint8Array()),
            o.mP(t, o._f(this.infoEncoder)),
            o.mP(t, this.stringEncoder.toUint8Array()),
            o.mP(t, o._f(this.parentInfoEncoder)),
            o.mP(t, this.typeRefEncoder.toUint8Array()),
            o.mP(t, this.lenEncoder.toUint8Array()),
            o.HK(t, o._f(this.restEncoder)),
            o._f(t)
          );
        }
        writeLeftID(t) {
          (this.clientEncoder.write(t.client),
            this.leftClockEncoder.write(t.clock));
        }
        writeRightID(t) {
          (this.clientEncoder.write(t.client),
            this.rightClockEncoder.write(t.clock));
        }
        writeClient(t) {
          this.clientEncoder.write(t);
        }
        writeInfo(t) {
          this.infoEncoder.write(t);
        }
        writeString(t) {
          this.stringEncoder.write(t);
        }
        writeParentInfo(t) {
          this.parentInfoEncoder.write(t ? 1 : 0);
        }
        writeTypeRef(t) {
          this.typeRefEncoder.write(t);
        }
        writeLen(t) {
          this.lenEncoder.write(t);
        }
        writeAny(t) {
          o.EM(this.restEncoder, t);
        }
        writeBuf(t) {
          o.mP(this.restEncoder, t);
        }
        writeJSON(t) {
          o.EM(this.restEncoder, t);
        }
        writeKey(t) {
          let e = this.keyMap.get(t);
          void 0 === e
            ? (this.keyClockEncoder.write(this.keyClock++),
              this.stringEncoder.write(t))
            : this.keyClockEncoder.write(e);
        }
      }
      let G = (t, e, r, n) => {
          n = s.Fp(n, e[0].id.clock);
          let i = t5(e, n);
          (o.uE(t.restEncoder, e.length - i),
            t.writeClient(r),
            o.uE(t.restEncoder, n));
          let l = e[i];
          l.write(t, n - l.id.clock);
          for (let r = i + 1; r < e.length; r++) e[r].write(t, 0);
        },
        B = (t, e, r) => {
          let n = new Map();
          (r.forEach((t, r) => {
            t8(e, r) > t && n.set(r, t);
          }),
            t1(e).forEach((t, e) => {
              r.has(e) || n.set(e, 0);
            }),
            o.uE(t.restEncoder, n.size),
            i
              .Dp(n.entries())
              .sort((t, e) => e[0] - t[0])
              .forEach(([r, n]) => {
                G(t, e.clients.get(r), r, n);
              }));
        },
        X = (t, e) => {
          let r = l.Ue(),
            n = c.yg(t.restDecoder);
          for (let i = 0; i < n; i++) {
            let n = c.yg(t.restDecoder),
              i = Array(n),
              s = t.readClient(),
              l = c.yg(t.restDecoder);
            r.set(s, { i: 0, refs: i });
            for (let r = 0; r < n; r++) {
              let n = t.readInfo();
              switch (g.kr & n) {
                case 0: {
                  let e = t.readLen();
                  ((i[r] = new rR(t_(s, l), e)), (l += e));
                  break;
                }
                case 10: {
                  let e = c.yg(t.restDecoder);
                  ((i[r] = new nt(t_(s, l), e)), (l += e));
                  break;
                }
                default: {
                  let o = (n & (g.rc | g.x1)) == 0,
                    c = new r9(
                      t_(s, l),
                      null,
                      (n & g.x1) === g.x1 ? t.readLeftID() : null,
                      null,
                      (n & g.rc) === g.rc ? t.readRightID() : null,
                      o
                        ? t.readParentInfo()
                          ? e.get(t.readString())
                          : t.readLeftID()
                        : null,
                      o && (n & g.cq) === g.cq ? t.readString() : null,
                      r3(t, n),
                    );
                  ((i[r] = c), (l += c.length));
                }
              }
            }
          }
          return r;
        },
        q = (t, e, r) => {
          let n = [],
            s = i.Dp(r.keys()).sort((t, e) => t - e);
          if (0 === s.length) return null;
          let c = () => {
              if (0 === s.length) return null;
              let t = r.get(s[s.length - 1]);
              for (; t.refs.length === t.i;) {
                if ((s.pop(), !(s.length > 0))) return null;
                t = r.get(s[s.length - 1]);
              }
              return t;
            },
            h = c();
          if (null === h) return null;
          let u = new t0(),
            a = new Map(),
            d = (t, e) => {
              let r = a.get(t);
              (null == r || r > e) && a.set(t, e);
            },
            g = h.refs[h.i++],
            f = new Map(),
            p = () => {
              for (let t of n) {
                let e = t.id.client,
                  n = r.get(e);
                (n
                  ? (n.i--,
                    u.clients.set(e, n.refs.slice(n.i)),
                    r.delete(e),
                    (n.i = 0),
                    (n.refs = []))
                  : u.clients.set(e, [t]),
                  (s = s.filter((t) => t !== e)));
              }
              n.length = 0;
            };
          for (;;) {
            if (g.constructor !== nt) {
              let i =
                l.Yu(f, g.id.client, () => t8(e, g.id.client)) - g.id.clock;
              if (i < 0) (n.push(g), d(g.id.client, g.id.clock - 1), p());
              else {
                let s = g.getMissing(t, e);
                if (null !== s) {
                  n.push(g);
                  let t = r.get(s) || { refs: [], i: 0 };
                  if (t.refs.length === t.i) (d(s, t8(e, s)), p());
                  else {
                    g = t.refs[t.i++];
                    continue;
                  }
                } else
                  (0 === i || i < g.length) &&
                    (g.integrate(t, i),
                    f.set(g.id.client, g.id.clock + g.length));
              }
            }
            if (n.length > 0) g = n.pop();
            else if (null !== h && h.i < h.refs.length) g = h.refs[h.i++];
            else {
              if (null === (h = c())) break;
              g = h.refs[h.i++];
            }
          }
          if (u.clients.size > 0) {
            let t = new K();
            return (
              B(t, u, new Map()),
              o.uE(t.restEncoder, 0),
              { missing: a, update: t.toUint8Array() }
            );
          }
          return null;
        },
        Z = (t, e) => B(t, e.doc.store, e.beforeState),
        Q = (t, e, r, n = new H(t)) =>
          eh(
            e,
            (t) => {
              t.local = !1;
              let e = !1,
                r = t.doc,
                i = r.store,
                s = q(t, i, X(n, r)),
                l = i.pendingStructs;
              if (l) {
                for (let [t, r] of l.missing)
                  if (r < t8(i, t)) {
                    e = !0;
                    break;
                  }
                if (s) {
                  for (let [t, e] of s.missing) {
                    let r = l.missing.get(t);
                    (null == r || r > e) && l.missing.set(t, e);
                  }
                  l.update = ev([l.update, s.update]);
                }
              } else i.pendingStructs = s;
              let o = R(n, t, i);
              if (i.pendingDs) {
                let e = new H(c.l1(i.pendingDs));
                c.yg(e.restDecoder);
                let r = R(e, t, i);
                o && r ? (i.pendingDs = ev([o, r])) : (i.pendingDs = o || r);
              } else i.pendingDs = o;
              if (e) {
                let e = i.pendingStructs.update;
                ((i.pendingStructs = null), te(t.doc, e));
              }
            },
            r,
            !1,
          ),
        tt = (t, e, r) => Q(t, e, r, new J(t)),
        te = (t, e, r, n = H) => {
          let i = c.l1(e);
          Q(i, t, r, new n(i));
        },
        tr = (t, e, r) => te(t, e, r, J),
        tn = (t, e, r = new Map()) => {
          (B(t, e.store, r), O(t, L(e.store)));
        },
        ti = (t, e = new Uint8Array([0]), r = new K()) => {
          tn(r, t, to(e));
          let n = [r.toUint8Array()];
          if (
            (t.store.pendingDs && n.push(t.store.pendingDs),
            t.store.pendingStructs &&
              n.push(eA(t.store.pendingStructs.update, e)),
            n.length > 1)
          ) {
            if (r.constructor === $)
              return ey(n.map((t, e) => (0 === e ? t : eV(t))));
            if (r.constructor === K) return ev(n);
          }
          return n[0];
        },
        ts = (t, e) => ti(t, e, new $()),
        tl = (t) => {
          let e = new Map(),
            r = c.yg(t.restDecoder);
          for (let n = 0; n < r; n++) {
            let r = c.yg(t.restDecoder),
              n = c.yg(t.restDecoder);
            e.set(r, n);
          }
          return e;
        },
        to = (t) => tl(new z(c.l1(t))),
        tc = (t, e) => (
          o.uE(t.restEncoder, e.size),
          i
            .Dp(e.entries())
            .sort((t, e) => e[0] - t[0])
            .forEach(([e, r]) => {
              (o.uE(t.restEncoder, e), o.uE(t.restEncoder, r));
            }),
          t
        ),
        th = (t, e) => tc(t, t1(e.store)),
        tu = (t, e = new j()) => (
          t instanceof Map ? tc(e, t) : th(e, t),
          e.toUint8Array()
        ),
        ta = (t) => tu(t, new W());
      class td {
        constructor() {
          this.l = [];
        }
      }
      let tg = () => new td(),
        tf = (t, e) => t.l.push(e),
        tp = (t, e) => {
          let r = t.l,
            n = r.length;
          ((t.l = r.filter((t) => e !== t)),
            n === t.l.length &&
              console.error(
                "[yjs] Tried to remove event handler that doesn't exist.",
              ));
        },
        tw = (t, e, r) => f.PP(t.l, [e, r]);
      class tm {
        constructor(t, e) {
          ((this.client = t), (this.clock = e));
        }
      }
      let tk = (t, e) =>
          t === e ||
          (null !== t &&
            null !== e &&
            t.client === e.client &&
            t.clock === e.clock),
        t_ = (t, e) => new tm(t, e),
        ty = (t, e) => {
          (o.uE(t, e.client), o.uE(t, e.clock));
        },
        tb = (t) => t_(c.yg(t), c.yg(t)),
        tS = (t) => {
          for (let [e, r] of t.doc.share.entries()) if (r === t) return e;
          throw d.zR();
        },
        tE = (t, e) => {
          for (; null !== e;) {
            if (e.parent === t) return !0;
            e = e.parent._item;
          }
          return !1;
        },
        tC = (t) => {
          let e = [],
            r = t._start;
          for (; r;) (e.push(r), (r = r.right));
          (console.log("Children: ", e),
            console.log(
              "Children content: ",
              e.filter((t) => !t.deleted).map((t) => t.content),
            ));
        };
      class tD {
        constructor(t, e = t.getMap("users")) {
          let r = new Map();
          ((this.yusers = e),
            (this.doc = t),
            (this.clients = new Map()),
            (this.dss = r));
          let n = (t, e) => {
            let r = t.get("ds"),
              n = t.get("ids"),
              i = (t) => this.clients.set(t, e);
            (r.observe((t) => {
              t.changes.added.forEach((t) => {
                t.content.getContent().forEach((t) => {
                  t instanceof Uint8Array &&
                    this.dss.set(
                      e,
                      I([this.dss.get(e) || N(), T(new z(c.l1(t)))]),
                    );
                });
              });
            }),
              this.dss.set(e, I(r.map((t) => T(new z(c.l1(t)))))),
              n.observe((t) =>
                t.changes.added.forEach((t) =>
                  t.content.getContent().forEach(i),
                ),
              ),
              n.forEach(i));
          };
          (e.observe((t) => {
            t.keysChanged.forEach((t) => n(e.get(t), t));
          }),
            e.forEach(n));
        }
        setUserMapping(t, e, r, { filter: n = () => !0 } = {}) {
          let i = this.yusers,
            s = i.get(r);
          (s ||
            ((s = new ra()).set("ids", new rh()),
            s.set("ds", new rh()),
            i.set(r, s)),
            s.get("ids").push([e]),
            i.observe((t) => {
              setTimeout(() => {
                let t = i.get(r);
                if (t !== s) {
                  ((s = t),
                    this.clients.forEach((t, e) => {
                      r === t && s.get("ids").push([e]);
                    }));
                  let e = new W(),
                    n = this.dss.get(r);
                  n && (O(e, n), s.get("ds").push([e.toUint8Array()]));
                }
              }, 0);
            }),
            t.on("afterTransaction", (t) => {
              setTimeout(() => {
                let e = s.get("ds"),
                  r = t.deleteSet;
                if (t.local && r.clients.size > 0 && n(t, r)) {
                  let t = new W();
                  (O(t, r), e.push([t.toUint8Array()]));
                }
              });
            }));
        }
        getUserByClientId(t) {
          return this.clients.get(t) || null;
        }
        getUserByDeletedId(t) {
          for (let [e, r] of this.dss.entries()) if (x(r, t)) return e;
          return null;
        }
      }
      class tv {
        constructor(t, e, r, n = 0) {
          ((this.type = t),
            (this.tname = e),
            (this.item = r),
            (this.assoc = n));
        }
      }
      let tA = (t) => {
          let e = {};
          return (
            t.type && (e.type = t.type),
            t.tname && (e.tname = t.tname),
            t.item && (e.item = t.item),
            null != t.assoc && (e.assoc = t.assoc),
            e
          );
        },
        tx = (t) =>
          new tv(
            null == t.type ? null : t_(t.type.client, t.type.clock),
            t.tname ?? null,
            null == t.item ? null : t_(t.item.client, t.item.clock),
            null == t.assoc ? 0 : t.assoc,
          );
      class tU {
        constructor(t, e, r = 0) {
          ((this.type = t), (this.index = e), (this.assoc = r));
        }
      }
      let tI = (t, e, r = 0) => new tU(t, e, r),
        tM = (t, e, r) => {
          let n = null,
            i = null;
          return (
            null === t._item
              ? (i = tS(t))
              : (n = t_(t._item.id.client, t._item.id.clock)),
            new tv(n, i, e, r)
          );
        },
        tN = (t, e, r = 0) => {
          let n = t._start;
          if (r < 0) {
            if (0 === e) return tM(t, null, r);
            e--;
          }
          for (; null !== n;) {
            if (!n.deleted && n.countable) {
              if (n.length > e)
                return tM(t, t_(n.id.client, n.id.clock + e), r);
              e -= n.length;
            }
            if (null === n.right && r < 0) return tM(t, n.lastId, r);
            n = n.right;
          }
          return tM(t, null, r);
        },
        tL = (t, e) => {
          let { type: r, tname: n, item: i, assoc: s } = e;
          if (null !== i) (o.uE(t, 0), ty(t, i));
          else if (null !== n) (o.$F(t, 1), o.uw(t, n));
          else if (null !== r) (o.$F(t, 2), ty(t, r));
          else throw d.zR();
          return (o.pY(t, s), t);
        },
        tO = (t) => {
          let e = o.Mf();
          return (tL(e, t), o._f(e));
        },
        tT = (t) => {
          let e = null,
            r = null,
            n = null;
          switch (c.yg(t)) {
            case 0:
              n = tb(t);
              break;
            case 1:
              r = c.kf(t);
              break;
            case 2:
              e = tb(t);
          }
          return new tv(e, r, n, c.v3(t) ? c.F7(t) : 0);
        },
        tR = (t) => tT(c.l1(t)),
        tV = (t, e) => {
          let r = t7(t, e),
            n = e.clock - r.id.clock;
          return { item: r, diff: n };
        },
        tP = (t, e, r = !0) => {
          let n = e.store,
            i = t.item,
            s = t.type,
            l = t.tname,
            o = t.assoc,
            c = null,
            h = 0;
          if (null !== i) {
            if (t8(n, i.client) <= i.clock) return null;
            let t = r ? r8(n, i) : tV(n, i),
              e = t.item;
            if (!(e instanceof r9)) return null;
            if (null === (c = e.parent)._item || !c._item.deleted) {
              h = e.deleted || !e.countable ? 0 : t.diff + (o >= 0 ? 0 : 1);
              let r = e.left;
              for (; null !== r;)
                (!r.deleted && r.countable && (h += r.length), (r = r.left));
            }
          } else {
            if (null !== l) c = e.get(l);
            else if (null !== s) {
              if (t8(n, s.client) <= s.clock) return null;
              let { item: t } = r ? r8(n, s) : { item: t7(n, s) };
              if (!(t instanceof r9) || !(t.content instanceof r1)) return null;
              c = t.content.type;
            } else throw d.zR();
            h = o >= 0 ? c._length : 0;
          }
          return tI(c, h, t.assoc);
        },
        tF = (t, e) =>
          t === e ||
          (null !== t &&
            null !== e &&
            t.tname === e.tname &&
            tk(t.item, e.item) &&
            tk(t.type, e.type) &&
            t.assoc === e.assoc);
      class tz {
        constructor(t, e) {
          ((this.ds = t), (this.sv = e));
        }
      }
      let tJ = (t, e) => {
          let r = t.ds.clients,
            n = e.ds.clients,
            i = t.sv,
            s = e.sv;
          if (i.size !== s.size || r.size !== n.size) return !1;
          for (let [t, e] of i.entries()) if (s.get(t) !== e) return !1;
          for (let [t, e] of r.entries()) {
            let r = n.get(t) || [];
            if (e.length !== r.length) return !1;
            for (let t = 0; t < e.length; t++) {
              let n = e[t],
                i = r[t];
              if (n.clock !== i.clock || n.len !== i.len) return !1;
            }
          }
          return !0;
        },
        tY = (t, e = new j()) => (O(e, t.ds), tc(e, t.sv), e.toUint8Array()),
        tH = (t) => tY(t, new W()),
        tW = (t, e = new Y(c.l1(t))) => new tz(T(e), tl(e)),
        t$ = (t) => tW(t, new z(c.l1(t))),
        tj = (t, e) => new tz(t, e),
        tK = tj(N(), new Map()),
        tG = (t) => tj(L(t.store), t1(t.store)),
        tB = (t, e) =>
          void 0 === e
            ? !t.deleted
            : e.sv.has(t.id.client) &&
              (e.sv.get(t.id.client) || 0) > t.id.clock &&
              !x(e.ds, t.id),
        tX = (t, e) => {
          let r = l.Yu(t.meta, tX, p.Ue),
            n = t.doc.store;
          r.has(e) ||
            (e.sv.forEach((e, r) => {
              e < t8(n, r) && t9(t, t_(r, e));
            }),
            v(t, e.ds, (t) => {}),
            r.add(e));
        },
        tq = (t, e, r = new F()) => {
          if (t.gc)
            throw Error("Garbage-collection must be disabled in `originDoc`!");
          let { sv: n, ds: i } = e,
            s = new K();
          return (
            t.transact((e) => {
              let r = 0;
              for (let [i, l] of (n.forEach((t) => {
                t > 0 && r++;
              }),
              o.uE(s.restEncoder, r),
              n)) {
                if (0 === l) continue;
                l < t8(t.store, i) && t9(e, t_(i, l));
                let r = t.store.clients.get(i) || [],
                  n = t5(r, l - 1);
                (o.uE(s.restEncoder, n + 1),
                  s.writeClient(i),
                  o.uE(s.restEncoder, 0));
                for (let t = 0; t <= n; t++) r[t].write(s, 0);
              }
              O(s, i);
            }),
            te(r, s.toUint8Array(), "snapshot"),
            r
          );
        },
        tZ = (t, e, r = H) => {
          let n = new r(c.l1(e)),
            i = new ef(n, !1);
          for (let e = i.curr; null !== e; e = i.next())
            if ((t.sv.get(e.id.client) || 0) < e.id.clock + e.length) return !1;
          let s = I([t.ds, T(n)]);
          return V(t.ds, s);
        },
        tQ = (t, e) => tZ(t, e, J);
      class t0 {
        constructor() {
          ((this.clients = new Map()),
            (this.pendingStructs = null),
            (this.pendingDs = null));
        }
      }
      let t1 = (t) => {
          let e = new Map();
          return (
            t.clients.forEach((t, r) => {
              let n = t[t.length - 1];
              e.set(r, n.id.clock + n.length);
            }),
            e
          );
        },
        t8 = (t, e) => {
          let r = t.clients.get(e);
          if (void 0 === r) return 0;
          let n = r[r.length - 1];
          return n.id.clock + n.length;
        },
        t2 = (t, e) => {
          let r = t.clients.get(e.id.client);
          if (void 0 === r) ((r = []), t.clients.set(e.id.client, r));
          else {
            let t = r[r.length - 1];
            if (t.id.clock + t.length !== e.id.clock) throw d.zR();
          }
          r.push(e);
        },
        t5 = (t, e) => {
          let r = 0,
            n = t.length - 1,
            i = t[n],
            l = i.id.clock;
          if (l === e) return n;
          let o = s.GW((e / (l + i.length - 1)) * n);
          for (; r <= n;) {
            if ((l = (i = t[o]).id.clock) <= e) {
              if (e < l + i.length) return o;
              r = o + 1;
            } else n = o - 1;
            o = s.GW((r + n) / 2);
          }
          throw d.zR();
        },
        t7 = (t, e) => {
          let r = t.clients.get(e.client);
          return r[t5(r, e.clock)];
        },
        t6 = (t, e, r) => {
          let n = t5(e, r),
            i = e[n];
          return i.id.clock < r && i instanceof r9
            ? (e.splice(n + 1, 0, r5(t, i, r - i.id.clock)), n + 1)
            : n;
        },
        t9 = (t, e) => {
          let r = t.doc.store.clients.get(e.client);
          return r[t6(t, r, e.clock)];
        },
        t3 = (t, e, r) => {
          let n = e.clients.get(r.client),
            i = t5(n, r.clock),
            s = n[i];
          return (
            r.clock !== s.id.clock + s.length - 1 &&
              s.constructor !== rR &&
              n.splice(i + 1, 0, r5(t, s, r.clock - s.id.clock + 1)),
            s
          );
        },
        t4 = (t, e, r) => {
          let n = t.clients.get(e.id.client);
          n[t5(n, e.id.clock)] = r;
        },
        et = (t, e, r, n, i) => {
          let s;
          if (0 === n) return;
          let l = r + n,
            o = t6(t, e, r);
          do (l < (s = e[o++]).id.clock + s.length && t6(t, e, l), i(s));
          while (o < e.length && e[o].id.clock < l);
        };
      class ee {
        constructor(t, e, r) {
          ((this.doc = t),
            (this.deleteSet = new D()),
            (this.beforeState = t1(t.store)),
            (this.afterState = new Map()),
            (this.changed = new Map()),
            (this.changedParentTypes = new Map()),
            (this._mergeStructs = []),
            (this.origin = e),
            (this.meta = new Map()),
            (this.local = r),
            (this.subdocsAdded = new Set()),
            (this.subdocsRemoved = new Set()),
            (this.subdocsLoaded = new Set()),
            (this._needFormattingCleanup = !1));
        }
      }
      let er = (t, e) =>
          !!(
            0 !== e.deleteSet.clients.size ||
            l.Yj(e.afterState, (t, r) => e.beforeState.get(r) !== t)
          ) && (U(e.deleteSet), Z(t, e), O(t, e.deleteSet), !0),
        en = (t, e, r) => {
          let n = e._item;
          (null === n ||
            (n.id.clock < (t.beforeState.get(n.id.client) || 0) &&
              !n.deleted)) &&
            l.Yu(t.changed, e, p.Ue).add(r);
        },
        ei = (t, e) => {
          let r = t[e],
            n = t[e - 1],
            i = e;
          for (; i > 0; r = n, n = t[--i - 1]) {
            if (
              n.deleted === r.deleted &&
              n.constructor === r.constructor &&
              n.mergeWith(r)
            ) {
              r instanceof r9 &&
                null !== r.parentSub &&
                r.parent._map.get(r.parentSub) === r &&
                r.parent._map.set(r.parentSub, n);
              continue;
            }
            break;
          }
          let s = e - i;
          return (s && t.splice(e + 1 - s, s), s);
        },
        es = (t, e, r) => {
          for (let [n, i] of t.clients.entries()) {
            let t = e.clients.get(n);
            for (let n = i.length - 1; n >= 0; n--) {
              let s = i[n],
                l = s.clock + s.len;
              for (
                let n = t5(t, s.clock), i = t[n];
                n < t.length && i.id.clock < l;
                i = t[++n]
              ) {
                let i = t[n];
                if (s.clock + s.len <= i.id.clock) break;
                i instanceof r9 && i.deleted && !i.keep && r(i) && i.gc(e, !1);
              }
            }
          }
        },
        el = (t, e) => {
          t.clients.forEach((t, r) => {
            let n = e.clients.get(r);
            for (let e = t.length - 1; e >= 0; e--) {
              let r = t[e],
                i = s.VV(n.length - 1, 1 + t5(n, r.clock + r.len - 1));
              for (
                let t = i, e = n[t];
                t > 0 && e.id.clock >= r.clock;
                e = n[t]
              )
                t -= 1 + ei(n, t);
            }
          });
        },
        eo = (t, e, r) => {
          (es(t, e, r), el(t, e));
        },
        ec = (t, e) => {
          if (e < t.length) {
            let r = t[e],
              n = r.doc,
              i = n.store,
              l = r.deleteSet,
              o = r._mergeStructs;
            try {
              (U(l),
                (r.afterState = t1(r.doc.store)),
                n.emit("beforeObserverCalls", [r, n]));
              let t = [];
              (r.changed.forEach((e, n) =>
                t.push(() => {
                  (null !== n._item && n._item.deleted) ||
                    n._callObserver(r, e);
                }),
              ),
                t.push(() => {
                  (r.changedParentTypes.forEach((e, n) => {
                    n._dEH.l.length > 0 &&
                      (null === n._item || !n._item.deleted) &&
                      ((e = e.filter(
                        (t) =>
                          null === t.target._item || !t.target._item.deleted,
                      )).forEach((t) => {
                        ((t.currentTarget = n), (t._path = null));
                      }),
                      e.sort((t, e) => t.path.length - e.path.length),
                      t.push(() => {
                        tw(n._dEH, e, r);
                      }));
                  }),
                    t.push(() => n.emit("afterTransaction", [r, n])),
                    t.push(() => {
                      r._needFormattingCleanup && rD(r);
                    }));
                }),
                (0, f.PP)(t, []));
            } finally {
              (n.gc && es(l, i, n.gcFilter),
                el(l, i),
                r.afterState.forEach((t, e) => {
                  let n = r.beforeState.get(e) || 0;
                  if (n !== t) {
                    let t = i.clients.get(e),
                      r = s.Fp(t5(t, n), 1);
                    for (let e = t.length - 1; e >= r;) e -= 1 + ei(t, e);
                  }
                }));
              for (let t = o.length - 1; t >= 0; t--) {
                let { client: e, clock: r } = o[t].id,
                  n = i.clients.get(e),
                  s = t5(n, r);
                !(s + 1 < n.length && ei(n, s + 1) > 1) && s > 0 && ei(n, s);
              }
              if (
                (r.local ||
                  r.afterState.get(n.clientID) ===
                    r.beforeState.get(n.clientID) ||
                  (w.S0(
                    m.ud,
                    m.Pl,
                    "[yjs] ",
                    m.YW,
                    m.hM,
                    "Changed the client-id because another client seems to be using it.",
                  ),
                  (n.clientID = P())),
                n.emit("afterTransactionCleanup", [r, n]),
                n._observers.has("update"))
              ) {
                let t = new $();
                er(t, r) &&
                  n.emit("update", [t.toUint8Array(), r.origin, n, r]);
              }
              if (n._observers.has("updateV2")) {
                let t = new K();
                er(t, r) &&
                  n.emit("updateV2", [t.toUint8Array(), r.origin, n, r]);
              }
              let { subdocsAdded: c, subdocsLoaded: h, subdocsRemoved: u } = r;
              ((c.size > 0 || u.size > 0 || h.size > 0) &&
                (c.forEach((t) => {
                  ((t.clientID = n.clientID),
                    null == t.collectionid && (t.collectionid = n.collectionid),
                    n.subdocs.add(t));
                }),
                u.forEach((t) => n.subdocs.delete(t)),
                n.emit("subdocs", [{ loaded: h, added: c, removed: u }, n, r]),
                u.forEach((t) => t.destroy())),
                t.length <= e + 1
                  ? ((n._transactionCleanups = []),
                    n.emit("afterAllTransactions", [n, t]))
                  : ec(t, e + 1));
            }
          }
        },
        eh = (t, e, r = null, n = !0) => {
          let i = t._transactionCleanups,
            s = !1,
            l = null;
          null === t._transaction &&
            ((s = !0),
            (t._transaction = new ee(t, r, n)),
            i.push(t._transaction),
            1 === i.length && t.emit("beforeAllTransactions", [t]),
            t.emit("beforeTransaction", [t._transaction, t]));
          try {
            l = e(t._transaction);
          } finally {
            if (s) {
              let e = t._transaction === i[0];
              ((t._transaction = null), e && ec(i, 0));
            }
          }
          return l;
        };
      class eu {
        constructor(t, e) {
          ((this.insertions = e),
            (this.deletions = t),
            (this.meta = new Map()));
        }
      }
      let ea = (t, e, r) => {
          v(t, r.deletions, (r) => {
            r instanceof r9 &&
              e.scope.some((e) => e === t.doc || tE(e, r)) &&
              r2(r, !1);
          });
        },
        ed = (t, e, r) => {
          let n = null,
            i = t.doc,
            s = t.scope;
          eh(
            i,
            (r) => {
              for (; e.length > 0 && null === t.currStackItem;) {
                let n = i.store,
                  l = e.pop(),
                  o = new Set(),
                  c = [],
                  h = !1;
                (v(r, l.insertions, (t) => {
                  if (t instanceof r9) {
                    if (null !== t.redone) {
                      let { item: e, diff: i } = r8(n, t.id);
                      (i > 0 && (e = t9(r, t_(e.id.client, e.id.clock + i))),
                        (t = e));
                    }
                    !t.deleted &&
                      s.some((e) => e === r.doc || tE(e, t)) &&
                      c.push(t);
                  }
                }),
                  v(r, l.deletions, (t) => {
                    t instanceof r9 &&
                      s.some((e) => e === r.doc || tE(e, t)) &&
                      !x(l.insertions, t.id) &&
                      o.add(t);
                  }),
                  o.forEach((e) => {
                    h =
                      null !==
                        r6(
                          r,
                          e,
                          o,
                          l.insertions,
                          t.ignoreRemoteMapChanges,
                          t,
                        ) || h;
                  }));
                for (let e = c.length - 1; e >= 0; e--) {
                  let n = c[e];
                  t.deleteFilter(n) && (n.delete(r), (h = !0));
                }
                t.currStackItem = h ? l : null;
              }
              (r.changed.forEach((t, e) => {
                t.has(null) && e._searchMarker && (e._searchMarker.length = 0);
              }),
                (n = r));
            },
            t,
          );
          let l = t.currStackItem;
          if (null != l) {
            let e = n.changedParentTypes;
            (t.emit("stack-item-popped", [
              { stackItem: l, type: r, changedParentTypes: e, origin: t },
              t,
            ]),
              (t.currStackItem = null));
          }
          return l;
        };
      class eg extends n.g {
        constructor(
          t,
          {
            captureTimeout: e = 500,
            captureTransaction: r = (t) => !0,
            deleteFilter: n = () => !0,
            trackedOrigins: s = new Set([null]),
            ignoreRemoteMapChanges: l = !1,
            doc: o = i.kJ(t) ? t[0].doc : t instanceof F ? t : t.doc,
          } = {},
        ) {
          (super(),
            (this.scope = []),
            (this.doc = o),
            this.addToScope(t),
            (this.deleteFilter = n),
            s.add(this),
            (this.trackedOrigins = s),
            (this.captureTransaction = r),
            (this.undoStack = []),
            (this.redoStack = []),
            (this.undoing = !1),
            (this.redoing = !1),
            (this.currStackItem = null),
            (this.lastChange = 0),
            (this.ignoreRemoteMapChanges = l),
            (this.captureTimeout = e),
            (this.afterTransactionHandler = (t) => {
              if (
                !this.captureTransaction(t) ||
                !this.scope.some(
                  (e) => t.changedParentTypes.has(e) || e === this.doc,
                ) ||
                (!this.trackedOrigins.has(t.origin) &&
                  (!t.origin || !this.trackedOrigins.has(t.origin.constructor)))
              )
                return;
              let e = this.undoing,
                r = this.redoing,
                n = e ? this.redoStack : this.undoStack;
              e ? this.stopCapturing() : r || this.clear(!1, !0);
              let i = new D();
              t.afterState.forEach((e, r) => {
                let n = t.beforeState.get(r) || 0,
                  s = e - n;
                s > 0 && M(i, r, n, s);
              });
              let s = k.ZG(),
                l = !1;
              if (
                this.lastChange > 0 &&
                s - this.lastChange < this.captureTimeout &&
                n.length > 0 &&
                !e &&
                !r
              ) {
                let e = n[n.length - 1];
                ((e.deletions = I([e.deletions, t.deleteSet])),
                  (e.insertions = I([e.insertions, i])));
              } else (n.push(new eu(t.deleteSet, i)), (l = !0));
              (e || r || (this.lastChange = s),
                v(t, t.deleteSet, (e) => {
                  e instanceof r9 &&
                    this.scope.some((r) => r === t.doc || tE(r, e)) &&
                    r2(e, !0);
                }));
              let o = [
                {
                  stackItem: n[n.length - 1],
                  origin: t.origin,
                  type: e ? "redo" : "undo",
                  changedParentTypes: t.changedParentTypes,
                },
                this,
              ];
              l
                ? this.emit("stack-item-added", o)
                : this.emit("stack-item-updated", o);
            }),
            this.doc.on("afterTransaction", this.afterTransactionHandler),
            this.doc.on("destroy", () => {
              this.destroy();
            }));
        }
        addToScope(t) {
          let e = new Set(this.scope);
          (t = i.kJ(t) ? t : [t]).forEach((t) => {
            e.has(t) ||
              (e.add(t),
              (t instanceof eq ? t.doc !== this.doc : t !== this.doc) &&
                w.ZK("[yjs#509] Not same Y.Doc"),
              this.scope.push(t));
          });
        }
        addTrackedOrigin(t) {
          this.trackedOrigins.add(t);
        }
        removeTrackedOrigin(t) {
          this.trackedOrigins.delete(t);
        }
        clear(t = !0, e = !0) {
          ((t && this.canUndo()) || (e && this.canRedo())) &&
            this.doc.transact((r) => {
              (t &&
                (this.undoStack.forEach((t) => ea(r, this, t)),
                (this.undoStack = [])),
                e &&
                  (this.redoStack.forEach((t) => ea(r, this, t)),
                  (this.redoStack = [])),
                this.emit("stack-cleared", [
                  { undoStackCleared: t, redoStackCleared: e },
                ]));
            });
        }
        stopCapturing() {
          this.lastChange = 0;
        }
        undo() {
          let t;
          this.undoing = !0;
          try {
            t = ed(this, this.undoStack, "undo");
          } finally {
            this.undoing = !1;
          }
          return t;
        }
        redo() {
          let t;
          this.redoing = !0;
          try {
            t = ed(this, this.redoStack, "redo");
          } finally {
            this.redoing = !1;
          }
          return t;
        }
        canUndo() {
          return this.undoStack.length > 0;
        }
        canRedo() {
          return this.redoStack.length > 0;
        }
        destroy() {
          (this.trackedOrigins.delete(this),
            this.doc.off("afterTransaction", this.afterTransactionHandler),
            super.destroy());
        }
      }
      class ef {
        constructor(t, e) {
          ((this.gen = (function* (t) {
            let e = c.yg(t.restDecoder);
            for (let r = 0; r < e; r++) {
              let e = c.yg(t.restDecoder),
                r = t.readClient(),
                n = c.yg(t.restDecoder);
              for (let i = 0; i < e; i++) {
                let e = t.readInfo();
                if (10 === e) {
                  let e = c.yg(t.restDecoder);
                  (yield new nt(t_(r, n), e), (n += e));
                } else if ((g.kr & e) != 0) {
                  let i = (e & (g.rc | g.x1)) == 0,
                    s = new r9(
                      t_(r, n),
                      null,
                      (e & g.x1) === g.x1 ? t.readLeftID() : null,
                      null,
                      (e & g.rc) === g.rc ? t.readRightID() : null,
                      i
                        ? t.readParentInfo()
                          ? t.readString()
                          : t.readLeftID()
                        : null,
                      i && (e & g.cq) === g.cq ? t.readString() : null,
                      r3(t, e),
                    );
                  (yield s, (n += s.length));
                } else {
                  let e = t.readLen();
                  (yield new rR(t_(r, n), e), (n += e));
                }
              }
            }
          })(t)),
            (this.curr = null),
            (this.done = !1),
            (this.filterSkips = e),
            this.next());
        }
        next() {
          do this.curr = this.gen.next().value || null;
          while (
            this.filterSkips &&
            null !== this.curr &&
            this.curr.constructor === nt
          );
          return this.curr;
        }
      }
      let ep = (t) => ew(t, J),
        ew = (t, e = H) => {
          let r = [],
            n = new e(c.l1(t)),
            i = new ef(n, !1);
          for (let t = i.curr; null !== t; t = i.next()) r.push(t);
          w.S0("Structs: ", r);
          let s = T(n);
          w.S0("DeleteSet: ", s);
        },
        em = (t) => ek(t, J),
        ek = (t, e = H) => {
          let r = [],
            n = new e(c.l1(t)),
            i = new ef(n, !1);
          for (let t = i.curr; null !== t; t = i.next()) r.push(t);
          return { structs: r, ds: T(n) };
        };
      class e_ {
        constructor(t) {
          ((this.currClient = 0),
            (this.startClock = 0),
            (this.written = 0),
            (this.encoder = t),
            (this.clientStructs = []));
        }
      }
      let ey = (t) => ev(t, J, $),
        eb = (t, e = j, r = H) => {
          let n = new e(),
            i = new ef(new r(c.l1(t)), !1),
            s = i.curr;
          if (null === s) return (o.uE(n.restEncoder, 0), n.toUint8Array());
          {
            let t = 0,
              e = s.id.client,
              r = 0 !== s.id.clock,
              l = r ? 0 : s.id.clock + s.length;
            for (; null !== s; s = i.next())
              (e !== s.id.client &&
                (0 !== l &&
                  (t++, o.uE(n.restEncoder, e), o.uE(n.restEncoder, l)),
                (e = s.id.client),
                (l = 0),
                (r = 0 !== s.id.clock)),
                s.constructor === nt && (r = !0),
                r || (l = s.id.clock + s.length));
            0 !== l && (t++, o.uE(n.restEncoder, e), o.uE(n.restEncoder, l));
            let c = o.Mf();
            return (
              o.uE(c, t),
              o.mK(c, n.restEncoder),
              (n.restEncoder = c),
              n.toUint8Array()
            );
          }
        },
        eS = (t) => eb(t, W, J),
        eE = (t, e = H) => {
          let r = new Map(),
            n = new Map(),
            i = new ef(new e(c.l1(t)), !1),
            s = i.curr;
          if (null !== s) {
            let t = s.id.client,
              e = s.id.clock;
            for (r.set(t, e); null !== s; s = i.next())
              (t !== s.id.client &&
                (n.set(t, e),
                r.set(s.id.client, s.id.clock),
                (t = s.id.client)),
                (e = s.id.clock + s.length));
            n.set(t, e);
          }
          return { from: r, to: n };
        },
        eC = (t) => eE(t, J),
        eD = (t, e) => {
          if (t.constructor === rR) {
            let { client: r, clock: n } = t.id;
            return new rR(t_(r, n + e), t.length - e);
          }
          if (t.constructor === nt) {
            let { client: r, clock: n } = t.id;
            return new nt(t_(r, n + e), t.length - e);
          }
          {
            let { client: r, clock: n } = t.id;
            return new r9(
              t_(r, n + e),
              null,
              t_(r, n + e - 1),
              null,
              t.rightOrigin,
              t.parent,
              t.parentSub,
              t.content.splice(e),
            );
          }
        },
        ev = (t, e = H, r = K) => {
          if (1 === t.length) return t[0];
          let n = t.map((t) => new e(c.l1(t))),
            i = n.map((t) => new ef(t, !0)),
            s = null,
            l = new r(),
            o = new e_(l);
          for (
            ;
            (i = i.filter((t) => null !== t.curr)).sort((t, e) => {
              if (t.curr.id.client !== e.curr.id.client)
                return e.curr.id.client - t.curr.id.client;
              {
                let r = t.curr.id.clock - e.curr.id.clock;
                return 0 === r
                  ? t.curr.constructor === e.curr.constructor
                    ? 0
                    : t.curr.constructor === nt
                      ? 1
                      : -1
                  : r;
              }
            }),
              0 !== i.length;
          ) {
            let t = i[0],
              e = t.curr.id.client;
            if (null !== s) {
              let r = t.curr,
                n = !1;
              for (
                ;
                null !== r &&
                r.id.clock + r.length <= s.struct.id.clock + s.struct.length &&
                r.id.client >= s.struct.id.client;
              )
                ((r = t.next()), (n = !0));
              if (
                null === r ||
                r.id.client !== e ||
                (n && r.id.clock > s.struct.id.clock + s.struct.length)
              )
                continue;
              if (e !== s.struct.id.client)
                (eI(o, s.struct, s.offset),
                  (s = { struct: r, offset: 0 }),
                  t.next());
              else if (s.struct.id.clock + s.struct.length < r.id.clock) {
                if (s.struct.constructor === nt)
                  s.struct.length = r.id.clock + r.length - s.struct.id.clock;
                else {
                  eI(o, s.struct, s.offset);
                  let t = r.id.clock - s.struct.id.clock - s.struct.length;
                  s = {
                    struct: new nt(
                      t_(e, s.struct.id.clock + s.struct.length),
                      t,
                    ),
                    offset: 0,
                  };
                }
              } else {
                let e = s.struct.id.clock + s.struct.length - r.id.clock;
                (e > 0 &&
                  (s.struct.constructor === nt
                    ? (s.struct.length -= e)
                    : (r = eD(r, e))),
                  s.struct.mergeWith(r) ||
                    (eI(o, s.struct, s.offset),
                    (s = { struct: r, offset: 0 }),
                    t.next()));
              }
            } else ((s = { struct: t.curr, offset: 0 }), t.next());
            for (
              let r = t.curr;
              null !== r &&
              r.id.client === e &&
              r.id.clock === s.struct.id.clock + s.struct.length &&
              r.constructor !== nt;
              r = t.next()
            )
              (eI(o, s.struct, s.offset), (s = { struct: r, offset: 0 }));
          }
          return (
            null !== s && (eI(o, s.struct, s.offset), (s = null)),
            eM(o),
            O(l, I(n.map((t) => T(t)))),
            l.toUint8Array()
          );
        },
        eA = (t, e, r = H, n = K) => {
          let i = to(e),
            l = new n(),
            o = new e_(l),
            h = new r(c.l1(t)),
            u = new ef(h, !1);
          for (; u.curr;) {
            let t = u.curr,
              e = t.id.client,
              r = i.get(e) || 0;
            if (u.curr.constructor === nt) {
              u.next();
              continue;
            }
            if (t.id.clock + t.length > r)
              for (
                eI(o, t, s.Fp(r - t.id.clock, 0)), u.next();
                u.curr && u.curr.id.client === e;
              )
                (eI(o, u.curr, 0), u.next());
            else
              for (
                ;
                u.curr &&
                u.curr.id.client === e &&
                u.curr.id.clock + u.curr.length <= r;
              )
                u.next();
          }
          return (eM(o), O(l, T(h)), l.toUint8Array());
        },
        ex = (t, e) => eA(t, e, J, $),
        eU = (t) => {
          t.written > 0 &&
            (t.clientStructs.push({
              written: t.written,
              restEncoder: o._f(t.encoder.restEncoder),
            }),
            (t.encoder.restEncoder = o.Mf()),
            (t.written = 0));
        },
        eI = (t, e, r) => {
          (t.written > 0 && t.currClient !== e.id.client && eU(t),
            0 === t.written &&
              ((t.currClient = e.id.client),
              t.encoder.writeClient(e.id.client),
              o.uE(t.encoder.restEncoder, e.id.clock + r)),
            e.write(t.encoder, r),
            t.written++);
        },
        eM = (t) => {
          eU(t);
          let e = t.encoder.restEncoder;
          o.uE(e, t.clientStructs.length);
          for (let r = 0; r < t.clientStructs.length; r++) {
            let n = t.clientStructs[r];
            (o.uE(e, n.written), o.HK(e, n.restEncoder));
          }
        },
        eN = (t, e, r, n) => {
          let i = new r(c.l1(t)),
            s = new ef(i, !1),
            l = new n(),
            o = new e_(l);
          for (let t = s.curr; null !== t; t = s.next()) eI(o, e(t), 0);
          return (eM(o), O(l, T(i)), l.toUint8Array());
        },
        eL = ({ formatting: t = !0, subdocs: e = !0, yxml: r = !0 } = {}) => {
          let n = 0,
            i = l.Ue(),
            s = l.Ue(),
            o = l.Ue(),
            c = l.Ue();
          return (
            c.set(null, null),
            (h) => {
              switch (h.constructor) {
                case rR:
                case nt:
                  return h;
                case r9: {
                  let u = h.content;
                  switch (u.constructor) {
                    case rP:
                      break;
                    case r1:
                      if (r) {
                        let t = u.type;
                        (t instanceof rM &&
                          (t.nodeName = l.Yu(s, t.nodeName, () => "node-" + n)),
                          t instanceof rL &&
                            (t.hookName = l.Yu(
                              s,
                              t.hookName,
                              () => "hook-" + n,
                            )));
                      }
                      break;
                    case r$:
                      u.arr = u.arr.map(() => n);
                      break;
                    case rV:
                      u.content = new Uint8Array([n]);
                      break;
                    case rz:
                      e && ((u.opts = {}), (u.doc.guid = n + ""));
                      break;
                    case rJ:
                      u.embed = {};
                      break;
                    case rY:
                      t &&
                        ((u.key = l.Yu(o, u.key, () => n + "")),
                        (u.value = l.Yu(c, u.value, () => ({ i: n }))));
                      break;
                    case rH:
                      u.arr = u.arr.map(() => n);
                      break;
                    case rj:
                      u.str = _.rx((n % 10) + "", u.str.length);
                      break;
                    default:
                      d.zR();
                  }
                  return (
                    h.parentSub &&
                      (h.parentSub = l.Yu(i, h.parentSub, () => n + "")),
                    n++,
                    h
                  );
                }
                default:
                  d.zR();
              }
            }
          );
        },
        eO = (t, e) => eN(t, eL(e), J, $),
        eT = (t, e) => eN(t, eL(e), H, K),
        eR = (t) => eN(t, f.id, J, K),
        eV = (t) => eN(t, f.id, H, $),
        eP = "You must not compute changes after the event-handler fired.";
      class eF {
        constructor(t, e) {
          ((this.target = t),
            (this.currentTarget = t),
            (this.transaction = e),
            (this._changes = null),
            (this._keys = null),
            (this._delta = null),
            (this._path = null));
        }
        get path() {
          return (
            this._path || (this._path = ez(this.currentTarget, this.target))
          );
        }
        deletes(t) {
          return x(this.transaction.deleteSet, t.id);
        }
        get keys() {
          if (null === this._keys) {
            if (0 === this.transaction.doc._transactionCleanups.length)
              throw d.Ue(eP);
            let t = new Map(),
              e = this.target;
            (this.transaction.changed.get(e).forEach((r) => {
              if (null !== r) {
                let n, s;
                let l = e._map.get(r);
                if (this.adds(l)) {
                  let t = l.left;
                  for (; null !== t && this.adds(t);) t = t.left;
                  if (this.deletes(l)) {
                    if (!(null !== t && this.deletes(t))) return;
                    ((n = "delete"), (s = i.Z$(t.content.getContent())));
                  } else
                    null !== t && this.deletes(t)
                      ? ((n = "update"), (s = i.Z$(t.content.getContent())))
                      : ((n = "add"), (s = void 0));
                } else {
                  if (!this.deletes(l)) return;
                  ((n = "delete"), (s = i.Z$(l.content.getContent())));
                }
                t.set(r, { action: n, oldValue: s });
              }
            }),
              (this._keys = t));
          }
          return this._keys;
        }
        get delta() {
          return this.changes.delta;
        }
        adds(t) {
          return (
            t.id.clock >= (this.transaction.beforeState.get(t.id.client) || 0)
          );
        }
        get changes() {
          let t = this._changes;
          if (null === t) {
            if (0 === this.transaction.doc._transactionCleanups.length)
              throw d.Ue(eP);
            let e = this.target,
              r = p.Ue(),
              n = p.Ue(),
              i = [];
            if (
              ((t = { added: r, deleted: n, delta: i, keys: this.keys }),
              this.transaction.changed.get(e).has(null))
            ) {
              let t = null,
                s = () => {
                  t && i.push(t);
                };
              for (let i = e._start; null !== i; i = i.right)
                i.deleted
                  ? this.deletes(i) &&
                    !this.adds(i) &&
                    ((null === t || void 0 === t.delete) &&
                      (s(), (t = { delete: 0 })),
                    (t.delete += i.length),
                    n.add(i))
                  : this.adds(i)
                    ? ((null === t || void 0 === t.insert) &&
                        (s(), (t = { insert: [] })),
                      (t.insert = t.insert.concat(i.content.getContent())),
                      r.add(i))
                    : ((null === t || void 0 === t.retain) &&
                        (s(), (t = { retain: 0 })),
                      (t.retain += i.length));
              null !== t && void 0 === t.retain && s();
            }
            this._changes = t;
          }
          return t;
        }
      }
      let ez = (t, e) => {
          let r = [];
          for (; null !== e._item && e !== t;) {
            if (null !== e._item.parentSub) r.unshift(e._item.parentSub);
            else {
              let t = 0,
                n = e._item.parent._start;
              for (; n !== e._item && null !== n;)
                (!n.deleted && n.countable && (t += n.length), (n = n.right));
              r.unshift(t);
            }
            e = e._item.parent;
          }
          return r;
        },
        eJ = () => {
          w.ZK(
            "Invalid access: Add Yjs type to a document before reading data.",
          );
        },
        eY = 0;
      class eH {
        constructor(t, e) {
          ((t.marker = !0),
            (this.p = t),
            (this.index = e),
            (this.timestamp = eY++));
        }
      }
      let eW = (t) => {
          t.timestamp = eY++;
        },
        e$ = (t, e, r) => {
          ((t.p.marker = !1),
            (t.p = e),
            (e.marker = !0),
            (t.index = r),
            (t.timestamp = eY++));
        },
        ej = (t, e, r) => {
          if (t.length >= 80) {
            let n = t.reduce((t, e) => (t.timestamp < e.timestamp ? t : e));
            return (e$(n, e, r), n);
          }
          {
            let n = new eH(e, r);
            return (t.push(n), n);
          }
        },
        eK = (t, e) => {
          if (null === t._start || 0 === e || null === t._searchMarker)
            return null;
          let r =
              0 === t._searchMarker.length
                ? null
                : t._searchMarker.reduce((t, r) =>
                    s.Wn(e - t.index) < s.Wn(e - r.index) ? t : r,
                  ),
            n = t._start,
            i = 0;
          for (
            null !== r && ((n = r.p), (i = r.index), eW(r));
            null !== n.right && i < e;
          ) {
            if (!n.deleted && n.countable) {
              if (e < i + n.length) break;
              i += n.length;
            }
            n = n.right;
          }
          for (; null !== n.left && i > e;)
            !(n = n.left).deleted && n.countable && (i -= n.length);
          for (
            ;
            null !== n.left &&
            n.left.id.client === n.id.client &&
            n.left.id.clock + n.left.length === n.id.clock;
          )
            !(n = n.left).deleted && n.countable && (i -= n.length);
          return null !== r && s.Wn(r.index - i) < n.parent.length / 80
            ? (e$(r, n, i), r)
            : ej(t._searchMarker, n, i);
        },
        eG = (t, e, r) => {
          for (let n = t.length - 1; n >= 0; n--) {
            let i = t[n];
            if (r > 0) {
              let e = i.p;
              for (e.marker = !1; e && (e.deleted || !e.countable);)
                (e = e.left) &&
                  !e.deleted &&
                  e.countable &&
                  (i.index -= e.length);
              if (null === e || !0 === e.marker) {
                t.splice(n, 1);
                continue;
              }
              ((i.p = e), (e.marker = !0));
            }
            (e < i.index || (r > 0 && e === i.index)) &&
              (i.index = s.Fp(e, i.index + r));
          }
        },
        eB = (t) => {
          t.doc ?? eJ();
          let e = t._start,
            r = [];
          for (; e;) (r.push(e), (e = e.right));
          return r;
        },
        eX = (t, e, r) => {
          let n = t,
            i = e.changedParentTypes;
          for (; l.Yu(i, t, () => []).push(r), null !== t._item;)
            t = t._item.parent;
          tw(n._eH, r, e);
        };
      class eq {
        constructor() {
          ((this._item = null),
            (this._map = new Map()),
            (this._start = null),
            (this.doc = null),
            (this._length = 0),
            (this._eH = tg()),
            (this._dEH = tg()),
            (this._searchMarker = null));
        }
        get parent() {
          return this._item ? this._item.parent : null;
        }
        _integrate(t, e) {
          ((this.doc = t), (this._item = e));
        }
        _copy() {
          throw d.Nw();
        }
        clone() {
          throw d.Nw();
        }
        _write(t) {}
        get _first() {
          let t = this._start;
          for (; null !== t && t.deleted;) t = t.right;
          return t;
        }
        _callObserver(t, e) {
          !t.local && this._searchMarker && (this._searchMarker.length = 0);
        }
        observe(t) {
          tf(this._eH, t);
        }
        observeDeep(t) {
          tf(this._dEH, t);
        }
        unobserve(t) {
          tp(this._eH, t);
        }
        unobserveDeep(t) {
          tp(this._dEH, t);
        }
        toJSON() {}
      }
      let eZ = (t, e, r) => {
          (t.doc ?? eJ(),
            e < 0 && (e = t._length + e),
            r < 0 && (r = t._length + r));
          let n = r - e,
            i = [],
            s = t._start;
          for (; null !== s && n > 0;) {
            if (s.countable && !s.deleted) {
              let t = s.content.getContent();
              if (t.length <= e) e -= t.length;
              else {
                for (let r = e; r < t.length && n > 0; r++) (i.push(t[r]), n--);
                e = 0;
              }
            }
            s = s.right;
          }
          return i;
        },
        eQ = (t) => {
          t.doc ?? eJ();
          let e = [],
            r = t._start;
          for (; null !== r;) {
            if (r.countable && !r.deleted) {
              let t = r.content.getContent();
              for (let r = 0; r < t.length; r++) e.push(t[r]);
            }
            r = r.right;
          }
          return e;
        },
        e0 = (t, e) => {
          let r = [],
            n = t._start;
          for (; null !== n;) {
            if (n.countable && tB(n, e)) {
              let t = n.content.getContent();
              for (let e = 0; e < t.length; e++) r.push(t[e]);
            }
            n = n.right;
          }
          return r;
        },
        e1 = (t, e) => {
          let r = 0,
            n = t._start;
          for (t.doc ?? eJ(); null !== n;) {
            if (n.countable && !n.deleted) {
              let i = n.content.getContent();
              for (let n = 0; n < i.length; n++) e(i[n], r++, t);
            }
            n = n.right;
          }
        },
        e8 = (t, e) => {
          let r = [];
          return (
            e1(t, (n, i) => {
              r.push(e(n, i, t));
            }),
            r
          );
        },
        e2 = (t) => {
          let e = t._start,
            r = null,
            n = 0;
          return {
            [Symbol.iterator]() {
              return this;
            },
            next: () => {
              if (null === r) {
                for (; null !== e && e.deleted;) e = e.right;
                if (null === e) return { done: !0, value: void 0 };
                ((r = e.content.getContent()), (n = 0), (e = e.right));
              }
              let t = r[n++];
              return (r.length <= n && (r = null), { done: !1, value: t });
            },
          };
        },
        e5 = (t, e) => {
          t.doc ?? eJ();
          let r = eK(t, e),
            n = t._start;
          for (
            null !== r && ((n = r.p), (e -= r.index));
            null !== n;
            n = n.right
          )
            if (!n.deleted && n.countable) {
              if (e < n.length) return n.content.getContent()[e];
              e -= n.length;
            }
        },
        e7 = (t, e, r, n) => {
          let i = r,
            s = t.doc,
            l = s.clientID,
            o = s.store,
            c = null === r ? e._start : r.right,
            h = [],
            u = () => {
              h.length > 0 &&
                ((i = new r9(
                  t_(l, t8(o, l)),
                  i,
                  i && i.lastId,
                  c,
                  c && c.id,
                  e,
                  null,
                  new r$(h),
                )).integrate(t, 0),
                (h = []));
            };
          (n.forEach((r) => {
            if (null === r) h.push(r);
            else
              switch (r.constructor) {
                case Number:
                case Object:
                case Boolean:
                case Array:
                case String:
                  h.push(r);
                  break;
                default:
                  switch ((u(), r.constructor)) {
                    case Uint8Array:
                    case ArrayBuffer:
                      (i = new r9(
                        t_(l, t8(o, l)),
                        i,
                        i && i.lastId,
                        c,
                        c && c.id,
                        e,
                        null,
                        new rV(new Uint8Array(r)),
                      )).integrate(t, 0);
                      break;
                    case F:
                      (i = new r9(
                        t_(l, t8(o, l)),
                        i,
                        i && i.lastId,
                        c,
                        c && c.id,
                        e,
                        null,
                        new rz(r),
                      )).integrate(t, 0);
                      break;
                    default:
                      if (r instanceof eq)
                        (i = new r9(
                          t_(l, t8(o, l)),
                          i,
                          i && i.lastId,
                          c,
                          c && c.id,
                          e,
                          null,
                          new r1(r),
                        )).integrate(t, 0);
                      else
                        throw Error(
                          "Unexpected content type in insert operation",
                        );
                  }
              }
          }),
            u());
        },
        e6 = () => d.Ue("Length exceeded!"),
        e9 = (t, e, r, n) => {
          if (r > e._length) throw e6();
          if (0 === r)
            return (
              e._searchMarker && eG(e._searchMarker, r, n.length),
              e7(t, e, null, n)
            );
          let i = r,
            s = eK(e, r),
            l = e._start;
          for (
            null !== s &&
            ((l = s.p),
            0 == (r -= s.index) &&
              (r += (l = l.prev) && l.countable && !l.deleted ? l.length : 0));
            null !== l;
            l = l.right
          )
            if (!l.deleted && l.countable) {
              if (r <= l.length) {
                r < l.length && t9(t, t_(l.id.client, l.id.clock + r));
                break;
              }
              r -= l.length;
            }
          return (
            e._searchMarker && eG(e._searchMarker, i, n.length),
            e7(t, e, l, n)
          );
        },
        e3 = (t, e, r) => {
          let n = (e._searchMarker || []).reduce(
            (t, e) => (e.index > t.index ? e : t),
            { index: 0, p: e._start },
          ).p;
          if (n) for (; n.right;) n = n.right;
          return e7(t, e, n, r);
        },
        e4 = (t, e, r, n) => {
          if (0 === n) return;
          let i = r,
            s = n,
            l = eK(e, r),
            o = e._start;
          for (
            null !== l && ((o = l.p), (r -= l.index));
            null !== o && r > 0;
            o = o.right
          )
            !o.deleted &&
              o.countable &&
              (r < o.length && t9(t, t_(o.id.client, o.id.clock + r)),
              (r -= o.length));
          for (; n > 0 && null !== o;)
            (o.deleted ||
              (n < o.length && t9(t, t_(o.id.client, o.id.clock + n)),
              o.delete(t),
              (n -= o.length)),
              (o = o.right));
          if (n > 0) throw e6();
          e._searchMarker && eG(e._searchMarker, i, -s + n);
        },
        rt = (t, e, r) => {
          let n = e._map.get(r);
          void 0 !== n && n.delete(t);
        },
        re = (t, e, r, n) => {
          let i;
          let s = e._map.get(r) || null,
            l = t.doc,
            o = l.clientID;
          if (null == n) i = new r$([n]);
          else
            switch (n.constructor) {
              case Number:
              case Object:
              case Boolean:
              case Array:
              case String:
              case Date:
              case BigInt:
                i = new r$([n]);
                break;
              case Uint8Array:
                i = new rV(n);
                break;
              case F:
                i = new rz(n);
                break;
              default:
                if (n instanceof eq) i = new r1(n);
                else throw Error("Unexpected content type");
            }
          new r9(
            t_(o, t8(l.store, o)),
            s,
            s && s.lastId,
            null,
            null,
            e,
            r,
            i,
          ).integrate(t, 0);
        },
        rr = (t, e) => {
          t.doc ?? eJ();
          let r = t._map.get(e);
          return void 0 === r || r.deleted
            ? void 0
            : r.content.getContent()[r.length - 1];
        },
        rn = (t) => {
          let e = {};
          return (
            t.doc ?? eJ(),
            t._map.forEach((t, r) => {
              t.deleted || (e[r] = t.content.getContent()[t.length - 1]);
            }),
            e
          );
        },
        ri = (t, e) => {
          t.doc ?? eJ();
          let r = t._map.get(e);
          return void 0 !== r && !r.deleted;
        },
        rs = (t, e, r) => {
          let n = t._map.get(e) || null;
          for (
            ;
            null !== n &&
            (!r.sv.has(n.id.client) ||
              n.id.clock >= (r.sv.get(n.id.client) || 0));
          )
            n = n.left;
          return null !== n && tB(n, r)
            ? n.content.getContent()[n.length - 1]
            : void 0;
        },
        rl = (t, e) => {
          let r = {};
          return (
            t._map.forEach((t, n) => {
              let i = t;
              for (
                ;
                null !== i &&
                (!e.sv.has(i.id.client) ||
                  i.id.clock >= (e.sv.get(i.id.client) || 0));
              )
                i = i.left;
              null !== i &&
                tB(i, e) &&
                (r[n] = i.content.getContent()[i.length - 1]);
            }),
            r
          );
        },
        ro = (t) => (
          t.doc ?? eJ(),
          y.BG(t._map.entries(), (t) => !t[1].deleted)
        );
      class rc extends eF {}
      class rh extends eq {
        constructor() {
          (super(), (this._prelimContent = []), (this._searchMarker = []));
        }
        static from(t) {
          let e = new rh();
          return (e.push(t), e);
        }
        _integrate(t, e) {
          (super._integrate(t, e),
            this.insert(0, this._prelimContent),
            (this._prelimContent = null));
        }
        _copy() {
          return new rh();
        }
        clone() {
          let t = new rh();
          return (
            t.insert(
              0,
              this.toArray().map((t) => (t instanceof eq ? t.clone() : t)),
            ),
            t
          );
        }
        get length() {
          return (this.doc ?? eJ(), this._length);
        }
        _callObserver(t, e) {
          (super._callObserver(t, e), eX(this, t, new rc(this, t)));
        }
        insert(t, e) {
          null !== this.doc
            ? eh(this.doc, (r) => {
                e9(r, this, t, e);
              })
            : this._prelimContent.splice(t, 0, ...e);
        }
        push(t) {
          null !== this.doc
            ? eh(this.doc, (e) => {
                e3(e, this, t);
              })
            : this._prelimContent.push(...t);
        }
        unshift(t) {
          this.insert(0, t);
        }
        delete(t, e = 1) {
          null !== this.doc
            ? eh(this.doc, (r) => {
                e4(r, this, t, e);
              })
            : this._prelimContent.splice(t, e);
        }
        get(t) {
          return e5(this, t);
        }
        toArray() {
          return eQ(this);
        }
        slice(t = 0, e = this.length) {
          return eZ(this, t, e);
        }
        toJSON() {
          return this.map((t) => (t instanceof eq ? t.toJSON() : t));
        }
        map(t) {
          return e8(this, t);
        }
        forEach(t) {
          e1(this, t);
        }
        [Symbol.iterator]() {
          return e2(this);
        }
        _write(t) {
          t.writeTypeRef(rG);
        }
      }
      class ru extends eF {
        constructor(t, e, r) {
          (super(t, e), (this.keysChanged = r));
        }
      }
      class ra extends eq {
        constructor(t) {
          (super(),
            (this._prelimContent = null),
            void 0 === t
              ? (this._prelimContent = new Map())
              : (this._prelimContent = new Map(t)));
        }
        _integrate(t, e) {
          (super._integrate(t, e),
            this._prelimContent.forEach((t, e) => {
              this.set(e, t);
            }),
            (this._prelimContent = null));
        }
        _copy() {
          return new ra();
        }
        clone() {
          let t = new ra();
          return (
            this.forEach((e, r) => {
              t.set(r, e instanceof eq ? e.clone() : e);
            }),
            t
          );
        }
        _callObserver(t, e) {
          eX(this, t, new ru(this, t, e));
        }
        toJSON() {
          this.doc ?? eJ();
          let t = {};
          return (
            this._map.forEach((e, r) => {
              if (!e.deleted) {
                let n = e.content.getContent()[e.length - 1];
                t[r] = n instanceof eq ? n.toJSON() : n;
              }
            }),
            t
          );
        }
        get size() {
          return [...ro(this)].length;
        }
        keys() {
          return y.CA(ro(this), (t) => t[0]);
        }
        values() {
          return y.CA(
            ro(this),
            (t) => t[1].content.getContent()[t[1].length - 1],
          );
        }
        entries() {
          return y.CA(ro(this), (t) => [
            t[0],
            t[1].content.getContent()[t[1].length - 1],
          ]);
        }
        forEach(t) {
          (this.doc ?? eJ(),
            this._map.forEach((e, r) => {
              e.deleted || t(e.content.getContent()[e.length - 1], r, this);
            }));
        }
        [Symbol.iterator]() {
          return this.entries();
        }
        delete(t) {
          null !== this.doc
            ? eh(this.doc, (e) => {
                rt(e, this, t);
              })
            : this._prelimContent.delete(t);
        }
        set(t, e) {
          return (
            null !== this.doc
              ? eh(this.doc, (r) => {
                  re(r, this, t, e);
                })
              : this._prelimContent.set(t, e),
            e
          );
        }
        get(t) {
          return rr(this, t);
        }
        has(t) {
          return ri(this, t);
        }
        clear() {
          null !== this.doc
            ? eh(this.doc, (t) => {
                this.forEach(function (e, r, n) {
                  rt(t, n, r);
                });
              })
            : this._prelimContent.clear();
        }
        _write(t) {
          t.writeTypeRef(rB);
        }
      }
      let rd = (t, e) =>
        t === e ||
        ("object" == typeof t && "object" == typeof e && t && e && b.$m(t, e));
      class rg {
        constructor(t, e, r, n) {
          ((this.left = t),
            (this.right = e),
            (this.index = r),
            (this.currentAttributes = n));
        }
        forward() {
          ((null === this.right && d.zR(),
          this.right.content.constructor === rY)
            ? this.right.deleted ||
              rm(this.currentAttributes, this.right.content)
            : this.right.deleted || (this.index += this.right.length),
            (this.left = this.right),
            (this.right = this.right.right));
        }
      }
      let rf = (t, e, r) => {
          for (; null !== e.right && r > 0;)
            (e.right.content.constructor === rY
              ? e.right.deleted || rm(e.currentAttributes, e.right.content)
              : e.right.deleted ||
                (r < e.right.length &&
                  t9(t, t_(e.right.id.client, e.right.id.clock + r)),
                (e.index += e.right.length),
                (r -= e.right.length)),
              (e.left = e.right),
              (e.right = e.right.right));
          return e;
        },
        rp = (t, e, r, n) => {
          let i = new Map(),
            s = n ? eK(e, r) : null;
          return s
            ? rf(t, new rg(s.p.left, s.p, s.index, i), r - s.index)
            : rf(t, new rg(null, e._start, 0, i), r);
        },
        rw = (t, e, r, n) => {
          for (
            ;
            null !== r.right &&
            (!0 === r.right.deleted ||
              (r.right.content.constructor === rY &&
                rd(n.get(r.right.content.key), r.right.content.value)));
          )
            (r.right.deleted || n.delete(r.right.content.key), r.forward());
          let i = t.doc,
            s = i.clientID;
          n.forEach((n, l) => {
            let o = r.left,
              c = r.right,
              h = new r9(
                t_(s, t8(i.store, s)),
                o,
                o && o.lastId,
                c,
                c && c.id,
                e,
                null,
                new rY(l, n),
              );
            (h.integrate(t, 0), (r.right = h), r.forward());
          });
        },
        rm = (t, e) => {
          let { key: r, value: n } = e;
          null === n ? t.delete(r) : t.set(r, n);
        },
        rk = (t, e) => {
          for (
            ;
            null !== t.right &&
            (t.right.deleted ||
              (t.right.content.constructor === rY &&
                rd(e[t.right.content.key] ?? null, t.right.content.value)));
          )
            t.forward();
        },
        r_ = (t, e, r, n) => {
          let i = t.doc,
            s = i.clientID,
            l = new Map();
          for (let o in n) {
            let c = n[o],
              h = r.currentAttributes.get(o) ?? null;
            if (!rd(h, c)) {
              l.set(o, h);
              let { left: n, right: u } = r;
              ((r.right = new r9(
                t_(s, t8(i.store, s)),
                n,
                n && n.lastId,
                u,
                u && u.id,
                e,
                null,
                new rY(o, c),
              )),
                r.right.integrate(t, 0),
                r.forward());
            }
          }
          return l;
        },
        ry = (t, e, r, n, i) => {
          r.currentAttributes.forEach((t, e) => {
            void 0 === i[e] && (i[e] = null);
          });
          let s = t.doc,
            l = s.clientID;
          rk(r, i);
          let o = r_(t, e, r, i),
            c =
              n.constructor === String
                ? new rj(n)
                : n instanceof eq
                  ? new r1(n)
                  : new rJ(n),
            { left: h, right: u, index: a } = r;
          (e._searchMarker && eG(e._searchMarker, r.index, c.getLength()),
            (u = new r9(
              t_(l, t8(s.store, l)),
              h,
              h && h.lastId,
              u,
              u && u.id,
              e,
              null,
              c,
            )).integrate(t, 0),
            (r.right = u),
            (r.index = a),
            r.forward(),
            rw(t, e, r, o));
        },
        rb = (t, e, r, n, i) => {
          let s = t.doc,
            l = s.clientID;
          rk(r, i);
          let o = r_(t, e, r, i);
          for (
            ;
            null !== r.right &&
            (n > 0 ||
              (o.size > 0 &&
                (r.right.deleted || r.right.content.constructor === rY)));
          ) {
            if (!r.right.deleted) {
              if (r.right.content.constructor === rY) {
                let { key: e, value: s } = r.right.content,
                  l = i[e];
                if (void 0 !== l) {
                  if (rd(l, s)) o.delete(e);
                  else {
                    if (0 === n) break;
                    o.set(e, s);
                  }
                  r.right.delete(t);
                } else r.currentAttributes.set(e, s);
              } else
                (n < r.right.length &&
                  t9(t, t_(r.right.id.client, r.right.id.clock + n)),
                  (n -= r.right.length));
            }
            r.forward();
          }
          if (n > 0) {
            let i = "";
            for (; n > 0; n--) i += "\n";
            ((r.right = new r9(
              t_(l, t8(s.store, l)),
              r.left,
              r.left && r.left.lastId,
              r.right,
              r.right && r.right.id,
              e,
              null,
              new rj(i),
            )),
              r.right.integrate(t, 0),
              r.forward());
          }
          rw(t, e, r, o);
        },
        rS = (t, e, r, n, i) => {
          let s = e,
            o = l.Ue();
          for (; s && (!s.countable || s.deleted);) {
            if (!s.deleted && s.content.constructor === rY) {
              let t = s.content;
              o.set(t.key, t);
            }
            s = s.right;
          }
          let c = 0,
            h = !1;
          for (; e !== s;) {
            if ((r === e && (h = !0), !e.deleted)) {
              let r = e.content;
              if (r.constructor === rY) {
                let { key: s, value: l } = r,
                  u = n.get(s) ?? null;
                ((o.get(s) === r && u !== l) ||
                  (e.delete(t),
                  c++,
                  h ||
                    (i.get(s) ?? null) !== l ||
                    u === l ||
                    (null === u ? i.delete(s) : i.set(s, u))),
                  h || e.deleted || rm(i, r));
              }
            }
            e = e.right;
          }
          return c;
        },
        rE = (t, e) => {
          for (; e && e.right && (e.right.deleted || !e.right.countable);)
            e = e.right;
          let r = new Set();
          for (; e && (e.deleted || !e.countable);) {
            if (!e.deleted && e.content.constructor === rY) {
              let n = e.content.key;
              r.has(n) ? e.delete(t) : r.add(n);
            }
            e = e.left;
          }
        },
        rC = (t) => {
          let e = 0;
          return (
            eh(t.doc, (r) => {
              let n = t._start,
                i = t._start,
                s = l.Ue(),
                o = l.JG(s);
              for (; i;)
                (!1 === i.deleted &&
                  (i.content.constructor === rY
                    ? rm(o, i.content)
                    : ((e += rS(r, n, i, s, o)), (s = l.JG(o)), (n = i))),
                  (i = i.right));
            }),
            e
          );
        },
        rD = (t) => {
          let e = new Set(),
            r = t.doc;
          for (let [n, i] of t.afterState.entries()) {
            let s = t.beforeState.get(n) || 0;
            i !== s &&
              et(t, r.store.clients.get(n), s, i, (t) => {
                t.deleted ||
                  t.content.constructor !== rY ||
                  t.constructor === rR ||
                  e.add(t.parent);
              });
          }
          eh(r, (r) => {
            for (let n of (v(t, t.deleteSet, (t) => {
              if (
                t instanceof rR ||
                !t.parent._hasFormatting ||
                e.has(t.parent)
              )
                return;
              let n = t.parent;
              t.content.constructor === rY ? e.add(n) : rE(r, t);
            }),
            e))
              rC(n);
          });
        },
        rv = (t, e, r) => {
          let n = r,
            i = l.JG(e.currentAttributes),
            s = e.right;
          for (; r > 0 && null !== e.right;) {
            if (!1 === e.right.deleted)
              switch (e.right.content.constructor) {
                case r1:
                case rJ:
                case rj:
                  (r < e.right.length &&
                    t9(t, t_(e.right.id.client, e.right.id.clock + r)),
                    (r -= e.right.length),
                    e.right.delete(t));
              }
            e.forward();
          }
          s && rS(t, s, e.right, i, e.currentAttributes);
          let o = (e.left || e.right).parent;
          return (o._searchMarker && eG(o._searchMarker, e.index, -n + r), e);
        };
      class rA extends eF {
        constructor(t, e, r) {
          (super(t, e),
            (this.childListChanged = !1),
            (this.keysChanged = new Set()),
            r.forEach((t) => {
              null === t
                ? (this.childListChanged = !0)
                : this.keysChanged.add(t);
            }));
        }
        get changes() {
          if (null === this._changes) {
            let t = {
              keys: this.keys,
              delta: this.delta,
              added: new Set(),
              deleted: new Set(),
            };
            this._changes = t;
          }
          return this._changes;
        }
        get delta() {
          if (null === this._delta) {
            let t = this.target.doc,
              e = [];
            (eh(t, (t) => {
              let r = new Map(),
                n = new Map(),
                i = this.target._start,
                s = null,
                l = {},
                o = "",
                c = 0,
                h = 0,
                u = () => {
                  if (null !== s) {
                    let t = null;
                    switch (s) {
                      case "delete":
                        (h > 0 && (t = { delete: h }), (h = 0));
                        break;
                      case "insert":
                        (("object" == typeof o || o.length > 0) &&
                          ((t = { insert: o }),
                          r.size > 0 &&
                            ((t.attributes = {}),
                            r.forEach((e, r) => {
                              null !== e && (t.attributes[r] = e);
                            }))),
                          (o = ""));
                        break;
                      case "retain":
                        (c > 0 &&
                          ((t = { retain: c }),
                          b.xb(l) || (t.attributes = b.f0({}, l))),
                          (c = 0));
                    }
                    (t && e.push(t), (s = null));
                  }
                };
              for (; null !== i;) {
                switch (i.content.constructor) {
                  case r1:
                  case rJ:
                    this.adds(i)
                      ? this.deletes(i) ||
                        (u(),
                        (s = "insert"),
                        (o = i.content.getContent()[0]),
                        u())
                      : this.deletes(i)
                        ? ("delete" !== s && (u(), (s = "delete")), (h += 1))
                        : i.deleted ||
                          ("retain" !== s && (u(), (s = "retain")), (c += 1));
                    break;
                  case rj:
                    this.adds(i)
                      ? this.deletes(i) ||
                        ("insert" !== s && (u(), (s = "insert")),
                        (o += i.content.str))
                      : this.deletes(i)
                        ? ("delete" !== s && (u(), (s = "delete")),
                          (h += i.length))
                        : i.deleted ||
                          ("retain" !== s && (u(), (s = "retain")),
                          (c += i.length));
                    break;
                  case rY: {
                    let { key: e, value: o } = i.content;
                    if (this.adds(i))
                      this.deletes(i) ||
                        (rd(r.get(e) ?? null, o)
                          ? null !== o && i.delete(t)
                          : ("retain" === s && u(),
                            rd(o, n.get(e) ?? null)
                              ? delete l[e]
                              : (l[e] = o)));
                    else if (this.deletes(i)) {
                      n.set(e, o);
                      let t = r.get(e) ?? null;
                      rd(t, o) || ("retain" === s && u(), (l[e] = t));
                    } else if (!i.deleted) {
                      n.set(e, o);
                      let r = l[e];
                      void 0 !== r &&
                        (rd(r, o)
                          ? null !== r && i.delete(t)
                          : ("retain" === s && u(),
                            null === o ? delete l[e] : (l[e] = o)));
                    }
                    i.deleted || ("insert" === s && u(), rm(r, i.content));
                  }
                }
                i = i.right;
              }
              for (u(); e.length > 0;) {
                let t = e[e.length - 1];
                if (void 0 !== t.retain && void 0 === t.attributes) e.pop();
                else break;
              }
            }),
              (this._delta = e));
          }
          return this._delta;
        }
      }
      class rx extends eq {
        constructor(t) {
          (super(),
            (this._pending = void 0 !== t ? [() => this.insert(0, t)] : []),
            (this._searchMarker = []),
            (this._hasFormatting = !1));
        }
        get length() {
          return (this.doc ?? eJ(), this._length);
        }
        _integrate(t, e) {
          super._integrate(t, e);
          try {
            this._pending.forEach((t) => t());
          } catch (t) {
            console.error(t);
          }
          this._pending = null;
        }
        _copy() {
          return new rx();
        }
        clone() {
          let t = new rx();
          return (t.applyDelta(this.toDelta()), t);
        }
        _callObserver(t, e) {
          super._callObserver(t, e);
          let r = new rA(this, t, e);
          (eX(this, t, r),
            !t.local && this._hasFormatting && (t._needFormattingCleanup = !0));
        }
        toString() {
          this.doc ?? eJ();
          let t = "",
            e = this._start;
          for (; null !== e;)
            (!e.deleted &&
              e.countable &&
              e.content.constructor === rj &&
              (t += e.content.str),
              (e = e.right));
          return t;
        }
        toJSON() {
          return this.toString();
        }
        applyDelta(t, { sanitize: e = !0 } = {}) {
          null !== this.doc
            ? eh(this.doc, (r) => {
                let n = new rg(null, this._start, 0, new Map());
                for (let i = 0; i < t.length; i++) {
                  let s = t[i];
                  if (void 0 !== s.insert) {
                    let l =
                      e ||
                      "string" != typeof s.insert ||
                      i !== t.length - 1 ||
                      null !== n.right ||
                      "\n" !== s.insert.slice(-1)
                        ? s.insert
                        : s.insert.slice(0, -1);
                    ("string" != typeof l || l.length > 0) &&
                      ry(r, this, n, l, s.attributes || {});
                  } else
                    void 0 !== s.retain
                      ? rb(r, this, n, s.retain, s.attributes || {})
                      : void 0 !== s.delete && rv(r, n, s.delete);
                }
              })
            : this._pending.push(() => this.applyDelta(t));
        }
        toDelta(t, e, r) {
          this.doc ?? eJ();
          let n = [],
            i = new Map(),
            s = this.doc,
            l = "",
            o = this._start;
          function c() {
            if (l.length > 0) {
              let t = {},
                e = !1;
              i.forEach((r, n) => {
                ((e = !0), (t[n] = r));
              });
              let r = { insert: l };
              (e && (r.attributes = t), n.push(r), (l = ""));
            }
          }
          let h = () => {
            for (; null !== o;) {
              if (tB(o, t) || (void 0 !== e && tB(o, e)))
                switch (o.content.constructor) {
                  case rj: {
                    let n = i.get("ychange");
                    (void 0 === t || tB(o, t)
                      ? void 0 === e || tB(o, e)
                        ? void 0 !== n && (c(), i.delete("ychange"))
                        : (void 0 === n ||
                            n.user !== o.id.client ||
                            "added" !== n.type) &&
                          (c(),
                          i.set(
                            "ychange",
                            r ? r("added", o.id) : { type: "added" },
                          ))
                      : (void 0 === n ||
                          n.user !== o.id.client ||
                          "removed" !== n.type) &&
                        (c(),
                        i.set(
                          "ychange",
                          r ? r("removed", o.id) : { type: "removed" },
                        )),
                      (l += o.content.str));
                    break;
                  }
                  case r1:
                  case rJ: {
                    c();
                    let t = { insert: o.content.getContent()[0] };
                    if (i.size > 0) {
                      let e = {};
                      ((t.attributes = e),
                        i.forEach((t, r) => {
                          e[r] = t;
                        }));
                    }
                    n.push(t);
                    break;
                  }
                  case rY:
                    tB(o, t) && (c(), rm(i, o.content));
                }
              o = o.right;
            }
            c();
          };
          return (
            t || e
              ? eh(
                  s,
                  (r) => {
                    (t && tX(r, t), e && tX(r, e), h());
                  },
                  "cleanup",
                )
              : h(),
            n
          );
        }
        insert(t, e, r) {
          if (e.length <= 0) return;
          let n = this.doc;
          null !== n
            ? eh(n, (n) => {
                let i = rp(n, this, t, !r);
                (r ||
                  ((r = {}),
                  i.currentAttributes.forEach((t, e) => {
                    r[e] = t;
                  })),
                  ry(n, this, i, e, r));
              })
            : this._pending.push(() => this.insert(t, e, r));
        }
        insertEmbed(t, e, r) {
          let n = this.doc;
          null !== n
            ? eh(n, (n) => {
                let i = rp(n, this, t, !r);
                ry(n, this, i, e, r || {});
              })
            : this._pending.push(() => this.insertEmbed(t, e, r || {}));
        }
        delete(t, e) {
          if (0 === e) return;
          let r = this.doc;
          null !== r
            ? eh(r, (r) => {
                rv(r, rp(r, this, t, !0), e);
              })
            : this._pending.push(() => this.delete(t, e));
        }
        format(t, e, r) {
          if (0 === e) return;
          let n = this.doc;
          null !== n
            ? eh(n, (n) => {
                let i = rp(n, this, t, !1);
                null !== i.right && rb(n, this, i, e, r);
              })
            : this._pending.push(() => this.format(t, e, r));
        }
        removeAttribute(t) {
          null !== this.doc
            ? eh(this.doc, (e) => {
                rt(e, this, t);
              })
            : this._pending.push(() => this.removeAttribute(t));
        }
        setAttribute(t, e) {
          null !== this.doc
            ? eh(this.doc, (r) => {
                re(r, this, t, e);
              })
            : this._pending.push(() => this.setAttribute(t, e));
        }
        getAttribute(t) {
          return rr(this, t);
        }
        getAttributes() {
          return rn(this);
        }
        _write(t) {
          t.writeTypeRef(rX);
        }
      }
      class rU {
        constructor(t, e = () => !0) {
          ((this._filter = e),
            (this._root = t),
            (this._currentNode = t._start),
            (this._firstCall = !0),
            t.doc ?? eJ());
        }
        [Symbol.iterator]() {
          return this;
        }
        next() {
          let t = this._currentNode,
            e = t && t.content && t.content.type;
          if (null !== t && (!this._firstCall || t.deleted || !this._filter(e)))
            do
              if (
                ((e = t.content.type),
                t.deleted ||
                  (e.constructor !== rM && e.constructor !== rI) ||
                  null === e._start)
              )
                for (; null !== t;) {
                  let e = t.next;
                  if (null !== e) {
                    t = e;
                    break;
                  }
                  t = t.parent === this._root ? null : t.parent._item;
                }
              else t = e._start;
            while (null !== t && (t.deleted || !this._filter(t.content.type)));
          return ((this._firstCall = !1), null === t)
            ? { value: void 0, done: !0 }
            : ((this._currentNode = t), { value: t.content.type, done: !1 });
        }
      }
      class rI extends eq {
        constructor() {
          (super(), (this._prelimContent = []));
        }
        get firstChild() {
          let t = this._first;
          return t ? t.content.getContent()[0] : null;
        }
        _integrate(t, e) {
          (super._integrate(t, e),
            this.insert(0, this._prelimContent),
            (this._prelimContent = null));
        }
        _copy() {
          return new rI();
        }
        clone() {
          let t = new rI();
          return (
            t.insert(
              0,
              this.toArray().map((t) => (t instanceof eq ? t.clone() : t)),
            ),
            t
          );
        }
        get length() {
          return (
            this.doc ?? eJ(),
            null === this._prelimContent
              ? this._length
              : this._prelimContent.length
          );
        }
        createTreeWalker(t) {
          return new rU(this, t);
        }
        querySelector(t) {
          t = t.toUpperCase();
          let e = new rU(
            this,
            (e) => e.nodeName && e.nodeName.toUpperCase() === t,
          ).next();
          return e.done ? null : e.value;
        }
        querySelectorAll(t) {
          return (
            (t = t.toUpperCase()),
            i.Dp(
              new rU(this, (e) => e.nodeName && e.nodeName.toUpperCase() === t),
            )
          );
        }
        _callObserver(t, e) {
          eX(this, t, new rN(this, e, t));
        }
        toString() {
          return e8(this, (t) => t.toString()).join("");
        }
        toJSON() {
          return this.toString();
        }
        toDOM(t = document, e = {}, r) {
          let n = t.createDocumentFragment();
          return (
            void 0 !== r && r._createAssociation(n, this),
            e1(this, (i) => {
              n.insertBefore(i.toDOM(t, e, r), null);
            }),
            n
          );
        }
        insert(t, e) {
          null !== this.doc
            ? eh(this.doc, (r) => {
                e9(r, this, t, e);
              })
            : this._prelimContent.splice(t, 0, ...e);
        }
        insertAfter(t, e) {
          if (null !== this.doc)
            eh(this.doc, (r) => {
              e7(r, this, t && t instanceof eq ? t._item : t, e);
            });
          else {
            let r = this._prelimContent,
              n = null === t ? 0 : r.findIndex((e) => e === t) + 1;
            if (0 === n && null !== t) throw d.Ue("Reference item not found");
            r.splice(n, 0, ...e);
          }
        }
        delete(t, e = 1) {
          null !== this.doc
            ? eh(this.doc, (r) => {
                e4(r, this, t, e);
              })
            : this._prelimContent.splice(t, e);
        }
        toArray() {
          return eQ(this);
        }
        push(t) {
          this.insert(this.length, t);
        }
        unshift(t) {
          this.insert(0, t);
        }
        get(t) {
          return e5(this, t);
        }
        slice(t = 0, e = this.length) {
          return eZ(this, t, e);
        }
        forEach(t) {
          e1(this, t);
        }
        _write(t) {
          t.writeTypeRef(rZ);
        }
      }
      class rM extends rI {
        constructor(t = "UNDEFINED") {
          (super(), (this.nodeName = t), (this._prelimAttrs = new Map()));
        }
        get nextSibling() {
          let t = this._item ? this._item.next : null;
          return t ? t.content.type : null;
        }
        get prevSibling() {
          let t = this._item ? this._item.prev : null;
          return t ? t.content.type : null;
        }
        _integrate(t, e) {
          (super._integrate(t, e),
            this._prelimAttrs.forEach((t, e) => {
              this.setAttribute(e, t);
            }),
            (this._prelimAttrs = null));
        }
        _copy() {
          return new rM(this.nodeName);
        }
        clone() {
          let t = new rM(this.nodeName),
            e = this.getAttributes();
          return (
            b.Ed(e, (e, r) => {
              t.setAttribute(r, e);
            }),
            t.insert(
              0,
              this.toArray().map((t) => (t instanceof eq ? t.clone() : t)),
            ),
            t
          );
        }
        toString() {
          let t = this.getAttributes(),
            e = [],
            r = [];
          for (let e in t) r.push(e);
          r.sort();
          let n = r.length;
          for (let i = 0; i < n; i++) {
            let n = r[i];
            e.push(n + '="' + t[n] + '"');
          }
          let i = this.nodeName.toLocaleLowerCase(),
            s = e.length > 0 ? " " + e.join(" ") : "";
          return `<${i}${s}>${super.toString()}</${i}>`;
        }
        removeAttribute(t) {
          null !== this.doc
            ? eh(this.doc, (e) => {
                rt(e, this, t);
              })
            : this._prelimAttrs.delete(t);
        }
        setAttribute(t, e) {
          null !== this.doc
            ? eh(this.doc, (r) => {
                re(r, this, t, e);
              })
            : this._prelimAttrs.set(t, e);
        }
        getAttribute(t) {
          return rr(this, t);
        }
        hasAttribute(t) {
          return ri(this, t);
        }
        getAttributes(t) {
          return t ? rl(this, t) : rn(this);
        }
        toDOM(t = document, e = {}, r) {
          let n = t.createElement(this.nodeName),
            i = this.getAttributes();
          for (let t in i) {
            let e = i[t];
            "string" == typeof e && n.setAttribute(t, e);
          }
          return (
            e1(this, (i) => {
              n.appendChild(i.toDOM(t, e, r));
            }),
            void 0 !== r && r._createAssociation(n, this),
            n
          );
        }
        _write(t) {
          (t.writeTypeRef(rq), t.writeKey(this.nodeName));
        }
      }
      class rN extends eF {
        constructor(t, e, r) {
          (super(t, r),
            (this.childListChanged = !1),
            (this.attributesChanged = new Set()),
            e.forEach((t) => {
              null === t
                ? (this.childListChanged = !0)
                : this.attributesChanged.add(t);
            }));
        }
      }
      class rL extends ra {
        constructor(t) {
          (super(), (this.hookName = t));
        }
        _copy() {
          return new rL(this.hookName);
        }
        clone() {
          let t = new rL(this.hookName);
          return (
            this.forEach((e, r) => {
              t.set(r, e);
            }),
            t
          );
        }
        toDOM(t = document, e = {}, r) {
          let n;
          let i = e[this.hookName];
          return (
            (n =
              void 0 !== i
                ? i.createDom(this)
                : document.createElement(this.hookName)).setAttribute(
              "data-yjs-hook",
              this.hookName,
            ),
            void 0 !== r && r._createAssociation(n, this),
            n
          );
        }
        _write(t) {
          (t.writeTypeRef(rQ), t.writeKey(this.hookName));
        }
      }
      class rO extends rx {
        get nextSibling() {
          let t = this._item ? this._item.next : null;
          return t ? t.content.type : null;
        }
        get prevSibling() {
          let t = this._item ? this._item.prev : null;
          return t ? t.content.type : null;
        }
        _copy() {
          return new rO();
        }
        clone() {
          let t = new rO();
          return (t.applyDelta(this.toDelta()), t);
        }
        toDOM(t = document, e, r) {
          let n = t.createTextNode(this.toString());
          return (void 0 !== r && r._createAssociation(n, this), n);
        }
        toString() {
          return this.toDelta()
            .map((t) => {
              let e = [];
              for (let r in t.attributes) {
                let n = [];
                for (let e in t.attributes[r])
                  n.push({ key: e, value: t.attributes[r][e] });
                (n.sort((t, e) => (t.key < e.key ? -1 : 1)),
                  e.push({ nodeName: r, attrs: n }));
              }
              e.sort((t, e) => (t.nodeName < e.nodeName ? -1 : 1));
              let r = "";
              for (let t = 0; t < e.length; t++) {
                let n = e[t];
                r += `<${n.nodeName}`;
                for (let t = 0; t < n.attrs.length; t++) {
                  let e = n.attrs[t];
                  r += ` ${e.key}="${e.value}"`;
                }
                r += ">";
              }
              r += t.insert;
              for (let t = e.length - 1; t >= 0; t--)
                r += `</${e[t].nodeName}>`;
              return r;
            })
            .join("");
        }
        toJSON() {
          return this.toString();
        }
        _write(t) {
          t.writeTypeRef(r0);
        }
      }
      class rT {
        constructor(t, e) {
          ((this.id = t), (this.length = e));
        }
        get deleted() {
          throw d.Nw();
        }
        mergeWith(t) {
          return !1;
        }
        write(t, e, r) {
          throw d.Nw();
        }
        integrate(t, e) {
          throw d.Nw();
        }
      }
      class rR extends rT {
        get deleted() {
          return !0;
        }
        delete() {}
        mergeWith(t) {
          return (
            this.constructor === t.constructor &&
            ((this.length += t.length), !0)
          );
        }
        integrate(t, e) {
          (e > 0 && ((this.id.clock += e), (this.length -= e)),
            t2(t.doc.store, this));
        }
        write(t, e) {
          (t.writeInfo(0), t.writeLen(this.length - e));
        }
        getMissing(t, e) {
          return null;
        }
      }
      class rV {
        constructor(t) {
          this.content = t;
        }
        getLength() {
          return 1;
        }
        getContent() {
          return [this.content];
        }
        isCountable() {
          return !0;
        }
        copy() {
          return new rV(this.content);
        }
        splice(t) {
          throw d.Nw();
        }
        mergeWith(t) {
          return !1;
        }
        integrate(t, e) {}
        delete(t) {}
        gc(t) {}
        write(t, e) {
          t.writeBuf(this.content);
        }
        getRef() {
          return 3;
        }
      }
      class rP {
        constructor(t) {
          this.len = t;
        }
        getLength() {
          return this.len;
        }
        getContent() {
          return [];
        }
        isCountable() {
          return !1;
        }
        copy() {
          return new rP(this.len);
        }
        splice(t) {
          let e = new rP(this.len - t);
          return ((this.len = t), e);
        }
        mergeWith(t) {
          return ((this.len += t.len), !0);
        }
        integrate(t, e) {
          (M(t.deleteSet, e.id.client, e.id.clock, this.len), e.markDeleted());
        }
        delete(t) {}
        gc(t) {}
        write(t, e) {
          t.writeLen(this.len - e);
        }
        getRef() {
          return 1;
        }
      }
      let rF = (t, e) =>
        new F({ guid: t, ...e, shouldLoad: e.shouldLoad || e.autoLoad || !1 });
      class rz {
        constructor(t) {
          (t._item &&
            console.error(
              "This document was already integrated as a sub-document. You should create a second instance instead with the same guid.",
            ),
            (this.doc = t));
          let e = {};
          ((this.opts = e),
            t.gc || (e.gc = !1),
            t.autoLoad && (e.autoLoad = !0),
            null !== t.meta && (e.meta = t.meta));
        }
        getLength() {
          return 1;
        }
        getContent() {
          return [this.doc];
        }
        isCountable() {
          return !0;
        }
        copy() {
          return new rz(rF(this.doc.guid, this.opts));
        }
        splice(t) {
          throw d.Nw();
        }
        mergeWith(t) {
          return !1;
        }
        integrate(t, e) {
          ((this.doc._item = e),
            t.subdocsAdded.add(this.doc),
            this.doc.shouldLoad && t.subdocsLoaded.add(this.doc));
        }
        delete(t) {
          t.subdocsAdded.has(this.doc)
            ? t.subdocsAdded.delete(this.doc)
            : t.subdocsRemoved.add(this.doc);
        }
        gc(t) {}
        write(t, e) {
          (t.writeString(this.doc.guid), t.writeAny(this.opts));
        }
        getRef() {
          return 9;
        }
      }
      class rJ {
        constructor(t) {
          this.embed = t;
        }
        getLength() {
          return 1;
        }
        getContent() {
          return [this.embed];
        }
        isCountable() {
          return !0;
        }
        copy() {
          return new rJ(this.embed);
        }
        splice(t) {
          throw d.Nw();
        }
        mergeWith(t) {
          return !1;
        }
        integrate(t, e) {}
        delete(t) {}
        gc(t) {}
        write(t, e) {
          t.writeJSON(this.embed);
        }
        getRef() {
          return 5;
        }
      }
      class rY {
        constructor(t, e) {
          ((this.key = t), (this.value = e));
        }
        getLength() {
          return 1;
        }
        getContent() {
          return [];
        }
        isCountable() {
          return !1;
        }
        copy() {
          return new rY(this.key, this.value);
        }
        splice(t) {
          throw d.Nw();
        }
        mergeWith(t) {
          return !1;
        }
        integrate(t, e) {
          let r = e.parent;
          ((r._searchMarker = null), (r._hasFormatting = !0));
        }
        delete(t) {}
        gc(t) {}
        write(t, e) {
          (t.writeKey(this.key), t.writeJSON(this.value));
        }
        getRef() {
          return 6;
        }
      }
      class rH {
        constructor(t) {
          this.arr = t;
        }
        getLength() {
          return this.arr.length;
        }
        getContent() {
          return this.arr;
        }
        isCountable() {
          return !0;
        }
        copy() {
          return new rH(this.arr);
        }
        splice(t) {
          let e = new rH(this.arr.slice(t));
          return ((this.arr = this.arr.slice(0, t)), e);
        }
        mergeWith(t) {
          return ((this.arr = this.arr.concat(t.arr)), !0);
        }
        integrate(t, e) {}
        delete(t) {}
        gc(t) {}
        write(t, e) {
          let r = this.arr.length;
          t.writeLen(r - e);
          for (let n = e; n < r; n++) {
            let e = this.arr[n];
            t.writeString(void 0 === e ? "undefined" : JSON.stringify(e));
          }
        }
        getRef() {
          return 2;
        }
      }
      let rW = "development" === S.E0("node_env");
      class r$ {
        constructor(t) {
          ((this.arr = t), rW && b._A(t));
        }
        getLength() {
          return this.arr.length;
        }
        getContent() {
          return this.arr;
        }
        isCountable() {
          return !0;
        }
        copy() {
          return new r$(this.arr);
        }
        splice(t) {
          let e = new r$(this.arr.slice(t));
          return ((this.arr = this.arr.slice(0, t)), e);
        }
        mergeWith(t) {
          return ((this.arr = this.arr.concat(t.arr)), !0);
        }
        integrate(t, e) {}
        delete(t) {}
        gc(t) {}
        write(t, e) {
          let r = this.arr.length;
          t.writeLen(r - e);
          for (let n = e; n < r; n++) {
            let e = this.arr[n];
            t.writeAny(e);
          }
        }
        getRef() {
          return 8;
        }
      }
      class rj {
        constructor(t) {
          this.str = t;
        }
        getLength() {
          return this.str.length;
        }
        getContent() {
          return this.str.split("");
        }
        isCountable() {
          return !0;
        }
        copy() {
          return new rj(this.str);
        }
        splice(t) {
          let e = new rj(this.str.slice(t));
          this.str = this.str.slice(0, t);
          let r = this.str.charCodeAt(t - 1);
          return (
            r >= 55296 &&
              r <= 56319 &&
              ((this.str = this.str.slice(0, t - 1) + "�"),
              (e.str = "�" + e.str.slice(1))),
            e
          );
        }
        mergeWith(t) {
          return ((this.str += t.str), !0);
        }
        integrate(t, e) {}
        delete(t) {}
        gc(t) {}
        write(t, e) {
          t.writeString(0 === e ? this.str : this.str.slice(e));
        }
        getRef() {
          return 4;
        }
      }
      let rK = [
          (t) => new rh(),
          (t) => new ra(),
          (t) => new rx(),
          (t) => new rM(t.readKey()),
          (t) => new rI(),
          (t) => new rL(t.readKey()),
          (t) => new rO(),
        ],
        rG = 0,
        rB = 1,
        rX = 2,
        rq = 3,
        rZ = 4,
        rQ = 5,
        r0 = 6;
      class r1 {
        constructor(t) {
          this.type = t;
        }
        getLength() {
          return 1;
        }
        getContent() {
          return [this.type];
        }
        isCountable() {
          return !0;
        }
        copy() {
          return new r1(this.type._copy());
        }
        splice(t) {
          throw d.Nw();
        }
        mergeWith(t) {
          return !1;
        }
        integrate(t, e) {
          this.type._integrate(t.doc, e);
        }
        delete(t) {
          let e = this.type._start;
          for (; null !== e;)
            (e.deleted
              ? e.id.clock < (t.beforeState.get(e.id.client) || 0) &&
                t._mergeStructs.push(e)
              : e.delete(t),
              (e = e.right));
          (this.type._map.forEach((e) => {
            e.deleted
              ? e.id.clock < (t.beforeState.get(e.id.client) || 0) &&
                t._mergeStructs.push(e)
              : e.delete(t);
          }),
            t.changed.delete(this.type));
        }
        gc(t) {
          let e = this.type._start;
          for (; null !== e;) (e.gc(t, !0), (e = e.right));
          ((this.type._start = null),
            this.type._map.forEach((e) => {
              for (; null !== e;) (e.gc(t, !0), (e = e.left));
            }),
            (this.type._map = new Map()));
        }
        write(t, e) {
          this.type._write(t);
        }
        getRef() {
          return 7;
        }
      }
      let r8 = (t, e) => {
          let r,
            n = e,
            i = 0;
          do
            (i > 0 && (n = t_(n.client, n.clock + i)),
              (r = t7(t, n)),
              (i = n.clock - r.id.clock),
              (n = r.redone));
          while (null !== n && r instanceof r9);
          return { item: r, diff: i };
        },
        r2 = (t, e) => {
          for (; null !== t && t.keep !== e;)
            ((t.keep = e), (t = t.parent._item));
        },
        r5 = (t, e, r) => {
          let { client: n, clock: i } = e.id,
            s = new r9(
              t_(n, i + r),
              e,
              t_(n, i + r - 1),
              e.right,
              e.rightOrigin,
              e.parent,
              e.parentSub,
              e.content.splice(r),
            );
          return (
            e.deleted && s.markDeleted(),
            e.keep && (s.keep = !0),
            null !== e.redone &&
              (s.redone = t_(e.redone.client, e.redone.clock + r)),
            (e.right = s),
            null !== s.right && (s.right.left = s),
            t._mergeStructs.push(s),
            null !== s.parentSub &&
              null === s.right &&
              s.parent._map.set(s.parentSub, s),
            (e.length = r),
            s
          );
        },
        r7 = (t, e) => i.G(t, (t) => x(t.deletions, e)),
        r6 = (t, e, r, n, i, s) => {
          let l;
          let o = t.doc,
            c = o.store,
            h = o.clientID,
            u = e.redone;
          if (null !== u) return t9(t, u);
          let a = e.parent._item,
            d = null;
          if (null !== a && !0 === a.deleted) {
            if (
              null === a.redone &&
              (!r.has(a) || null === r6(t, a, r, n, i, s))
            )
              return null;
            for (; null !== a.redone;) a = t9(t, a.redone);
          }
          let g = null === a ? e.parent : a.content.type;
          if (null === e.parentSub) {
            for (d = e.left, l = e; null !== d;) {
              let e = d;
              for (; null !== e && e.parent._item !== a;)
                e = null === e.redone ? null : t9(t, e.redone);
              if (null !== e && e.parent._item === a) {
                d = e;
                break;
              }
              d = d.left;
            }
            for (; null !== l;) {
              let e = l;
              for (; null !== e && e.parent._item !== a;)
                e = null === e.redone ? null : t9(t, e.redone);
              if (null !== e && e.parent._item === a) {
                l = e;
                break;
              }
              l = l.right;
            }
          } else {
            if (((l = null), e.right && !i)) {
              for (
                d = e;
                null !== d &&
                null !== d.right &&
                (d.right.redone ||
                  x(n, d.right.id) ||
                  r7(s.undoStack, d.right.id) ||
                  r7(s.redoStack, d.right.id));
              )
                for (d = d.right; d.redone;) d = t9(t, d.redone);
              if (d && null !== d.right) return null;
            } else d = g._map.get(e.parentSub) || null;
            null !== d &&
              d.parent._item !== a &&
              (d = g._map.get(e.parentSub) || null);
          }
          let f = t8(c, h),
            p = t_(h, f),
            w = new r9(
              p,
              d,
              d && d.lastId,
              l,
              l && l.id,
              g,
              e.parentSub,
              e.content.copy(),
            );
          return ((e.redone = p), r2(w, !0), w.integrate(t, 0), w);
        };
      class r9 extends rT {
        constructor(t, e, r, n, i, s, l, o) {
          (super(t, o.getLength()),
            (this.origin = r),
            (this.left = e),
            (this.right = n),
            (this.rightOrigin = i),
            (this.parent = s),
            (this.parentSub = l),
            (this.redone = null),
            (this.content = o),
            (this.info = this.content.isCountable() ? g.Qn : 0));
        }
        set marker(t) {
          (this.info & g.Ko) > 0 !== t && (this.info ^= g.Ko);
        }
        get marker() {
          return (this.info & g.Ko) > 0;
        }
        get keep() {
          return (this.info & g.Vw) > 0;
        }
        set keep(t) {
          this.keep !== t && (this.info ^= g.Vw);
        }
        get countable() {
          return (this.info & g.Qn) > 0;
        }
        get deleted() {
          return (this.info & g.CY) > 0;
        }
        set deleted(t) {
          this.deleted !== t && (this.info ^= g.CY);
        }
        markDeleted() {
          this.info |= g.CY;
        }
        getMissing(t, e) {
          if (
            this.origin &&
            this.origin.client !== this.id.client &&
            this.origin.clock >= t8(e, this.origin.client)
          )
            return this.origin.client;
          if (
            this.rightOrigin &&
            this.rightOrigin.client !== this.id.client &&
            this.rightOrigin.clock >= t8(e, this.rightOrigin.client)
          )
            return this.rightOrigin.client;
          if (
            this.parent &&
            this.parent.constructor === tm &&
            this.id.client !== this.parent.client &&
            this.parent.clock >= t8(e, this.parent.client)
          )
            return this.parent.client;
          if (
            (this.origin &&
              ((this.left = t3(t, e, this.origin)),
              (this.origin = this.left.lastId)),
            this.rightOrigin &&
              ((this.right = t9(t, this.rightOrigin)),
              (this.rightOrigin = this.right.id)),
            (this.left && this.left.constructor === rR) ||
              (this.right && this.right.constructor === rR))
          )
            this.parent = null;
          else if (this.parent) {
            if (this.parent.constructor === tm) {
              let t = t7(e, this.parent);
              t.constructor === rR
                ? (this.parent = null)
                : (this.parent = t.content.type);
            }
          } else
            this.left && this.left.constructor === r9
              ? ((this.parent = this.left.parent),
                (this.parentSub = this.left.parentSub))
              : this.right &&
                this.right.constructor === r9 &&
                ((this.parent = this.right.parent),
                (this.parentSub = this.right.parentSub));
          return null;
        }
        integrate(t, e) {
          if (
            (e > 0 &&
              ((this.id.clock += e),
              (this.left = t3(
                t,
                t.doc.store,
                t_(this.id.client, this.id.clock - 1),
              )),
              (this.origin = this.left.lastId),
              (this.content = this.content.splice(e)),
              (this.length -= e)),
            this.parent)
          ) {
            if (
              (!this.left && (!this.right || null !== this.right.left)) ||
              (this.left && this.left.right !== this.right)
            ) {
              let e,
                r = this.left;
              if (null !== r) e = r.right;
              else if (null !== this.parentSub)
                for (
                  e = this.parent._map.get(this.parentSub) || null;
                  null !== e && null !== e.left;
                )
                  e = e.left;
              else e = this.parent._start;
              let n = new Set(),
                i = new Set();
              for (; null !== e && e !== this.right;) {
                if ((i.add(e), n.add(e), tk(this.origin, e.origin))) {
                  if (e.id.client < this.id.client) ((r = e), n.clear());
                  else if (tk(this.rightOrigin, e.rightOrigin)) break;
                } else if (
                  null !== e.origin &&
                  i.has(t7(t.doc.store, e.origin))
                )
                  n.has(t7(t.doc.store, e.origin)) || ((r = e), n.clear());
                else break;
                e = e.right;
              }
              this.left = r;
            }
            if (null !== this.left) {
              let t = this.left.right;
              ((this.right = t), (this.left.right = this));
            } else {
              let t;
              if (null !== this.parentSub)
                for (
                  t = this.parent._map.get(this.parentSub) || null;
                  null !== t && null !== t.left;
                )
                  t = t.left;
              else ((t = this.parent._start), (this.parent._start = this));
              this.right = t;
            }
            (null !== this.right
              ? (this.right.left = this)
              : null !== this.parentSub &&
                (this.parent._map.set(this.parentSub, this),
                null !== this.left && this.left.delete(t)),
              null === this.parentSub &&
                this.countable &&
                !this.deleted &&
                (this.parent._length += this.length),
              t2(t.doc.store, this),
              this.content.integrate(t, this),
              en(t, this.parent, this.parentSub),
              ((null !== this.parent._item && this.parent._item.deleted) ||
                (null !== this.parentSub && null !== this.right)) &&
                this.delete(t));
          } else new rR(this.id, this.length).integrate(t, 0);
        }
        get next() {
          let t = this.right;
          for (; null !== t && t.deleted;) t = t.right;
          return t;
        }
        get prev() {
          let t = this.left;
          for (; null !== t && t.deleted;) t = t.left;
          return t;
        }
        get lastId() {
          return 1 === this.length
            ? this.id
            : t_(this.id.client, this.id.clock + this.length - 1);
        }
        mergeWith(t) {
          if (
            this.constructor === t.constructor &&
            tk(t.origin, this.lastId) &&
            this.right === t &&
            tk(this.rightOrigin, t.rightOrigin) &&
            this.id.client === t.id.client &&
            this.id.clock + this.length === t.id.clock &&
            this.deleted === t.deleted &&
            null === this.redone &&
            null === t.redone &&
            this.content.constructor === t.content.constructor &&
            this.content.mergeWith(t.content)
          ) {
            let e = this.parent._searchMarker;
            return (
              e &&
                e.forEach((e) => {
                  e.p === t &&
                    ((e.p = this),
                    !this.deleted &&
                      this.countable &&
                      (e.index -= this.length));
                }),
              t.keep && (this.keep = !0),
              (this.right = t.right),
              null !== this.right && (this.right.left = this),
              (this.length += t.length),
              !0
            );
          }
          return !1;
        }
        delete(t) {
          if (!this.deleted) {
            let e = this.parent;
            (this.countable &&
              null === this.parentSub &&
              (e._length -= this.length),
              this.markDeleted(),
              M(t.deleteSet, this.id.client, this.id.clock, this.length),
              en(t, e, this.parentSub),
              this.content.delete(t));
          }
        }
        gc(t, e) {
          if (!this.deleted) throw d.zR();
          (this.content.gc(t),
            e
              ? t4(t, this, new rR(this.id, this.length))
              : (this.content = new rP(this.length)));
        }
        write(t, e) {
          let r =
              e > 0 ? t_(this.id.client, this.id.clock + e - 1) : this.origin,
            n = this.rightOrigin,
            i = this.parentSub,
            s =
              (this.content.getRef() & g.kr) |
              (null === r ? 0 : g.x1) |
              (null === n ? 0 : g.rc) |
              (null === i ? 0 : g.cq);
          if (
            (t.writeInfo(s),
            null !== r && t.writeLeftID(r),
            null !== n && t.writeRightID(n),
            null === r && null === n)
          ) {
            let e = this.parent;
            if (void 0 !== e._item) {
              let r = e._item;
              if (null === r) {
                let r = tS(e);
                (t.writeParentInfo(!0), t.writeString(r));
              } else (t.writeParentInfo(!1), t.writeLeftID(r.id));
            } else
              e.constructor === String
                ? (t.writeParentInfo(!0), t.writeString(e))
                : e.constructor === tm
                  ? (t.writeParentInfo(!1), t.writeLeftID(e))
                  : d.zR();
            null !== i && t.writeString(i);
          }
          this.content.write(t, e);
        }
      }
      let r3 = (t, e) => r4[e & g.kr](t),
        r4 = [
          () => {
            d.zR();
          },
          (t) => new rP(t.readLen()),
          (t) => {
            let e = t.readLen(),
              r = [];
            for (let n = 0; n < e; n++) {
              let e = t.readString();
              "undefined" === e ? r.push(void 0) : r.push(JSON.parse(e));
            }
            return new rH(r);
          },
          (t) => new rV(t.readBuf()),
          (t) => new rj(t.readString()),
          (t) => new rJ(t.readJSON()),
          (t) => new rY(t.readKey(), t.readJSON()),
          (t) => new r1(rK[t.readTypeRef()](t)),
          (t) => {
            let e = t.readLen(),
              r = [];
            for (let n = 0; n < e; n++) r.push(t.readAny());
            return new r$(r);
          },
          (t) => new rz(rF(t.readString(), t.readAny())),
          () => {
            d.zR();
          },
        ];
      class nt extends rT {
        get deleted() {
          return !0;
        }
        delete() {}
        mergeWith(t) {
          return (
            this.constructor === t.constructor &&
            ((this.length += t.length), !0)
          );
        }
        integrate(t, e) {
          d.zR();
        }
        write(t, e) {
          (t.writeInfo(10), o.uE(t.restEncoder, this.length - e));
        }
        getMissing(t, e) {
          return null;
        }
      }
      let ne =
          "undefined" != typeof globalThis
            ? globalThis
            : "undefined" != typeof window
              ? window
              : "undefined" != typeof global
                ? global
                : {},
        nr = "__ $YJS$ __";
      (!0 === ne[nr] &&
        console.error(
          "Yjs was already imported. This breaks constructor checks and will lead to issues! - https://github.com/yjs/yjs/issues/438",
        ),
        (ne[nr] = !0));
    },
  },
]);
