"use strict";(self.webpackChunk_sbc_dashboard=self.webpackChunk_sbc_dashboard||[]).push([[400],{"./src/components/Toast.stories.tsx":(C,_,a)=>{a.r(_),a.d(_,{AllTypes:()=>F,__namedExportsOrder:()=>U,default:()=>B});var n=a("../../node_modules/.pnpm/next@14.2.5_@babel+core@7.29.7_@playwright+test@1.61.1_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/next/dist/compiled/react/jsx-runtime.js"),E=a("../../node_modules/.pnpm/console-browserify@1.2.0/node_modules/console-browserify/index.js");const j=e=>{let s;const t=new Set,r=(D,P)=>{const A=typeof D=="function"?D(s):D;if(!Object.is(A,s)){const X=s;s=P??(typeof A!="object"||A===null)?A:Object.assign({},s,A),t.forEach(H=>H(s,X))}},y=()=>s,l={setState:r,getState:y,getInitialState:()=>$,subscribe:D=>(t.add(D),()=>t.delete(D)),destroy:()=>{E.warn("[DEPRECATED] The `destroy` method will be unsupported in a future version. Instead use unsubscribe function returned by subscribe. Everything will be garbage-collected if store is garbage-collected."),t.clear()}},$=s=e(r,y,l);return l},w=e=>e?j(e):j;var k=e=>(E.warn("[DEPRECATED] Default export is deprecated. Instead use import { createStore } from 'zustand/vanilla'."),w(e)),g=a("../../node_modules/.pnpm/next@14.2.5_@babel+core@7.29.7_@playwright+test@1.61.1_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/next/dist/compiled/react/index.js"),h=a("../../node_modules/.pnpm/use-sync-external-store@1.6.0_react@18.3.1/node_modules/use-sync-external-store/shim/with-selector.js"),m=a("../../node_modules/.pnpm/console-browserify@1.2.0/node_modules/console-browserify/index.js");const{useDebugValue:b}=g,{useSyncExternalStoreWithSelector:i}=h;let f=!1;const o=e=>e;function c(e,s=o,t){t&&!f&&(m.warn("[DEPRECATED] Use `createWithEqualityFn` instead of `create` or use `useStoreWithEqualityFn` instead of `useStore`. They can be imported from 'zustand/traditional'. https://github.com/pmndrs/zustand/discussions/1937"),f=!0);const r=i(e.subscribe,e.getState,e.getServerState||e.getInitialState,s,t);return b(r),r}const u=e=>{typeof e!="function"&&m.warn("[DEPRECATED] Passing a vanilla store will be unsupported in a future version. Instead use `import { useStore } from 'zustand'`.");const s=typeof e=="function"?w(e):e,t=(r,y)=>c(s,r,y);return Object.assign(t,s),t},x=e=>e?u(e):u;var d=e=>(m.warn("[DEPRECATED] Default export is deprecated. Instead use `import { create } from 'zustand'`."),x(e)),p=a("../../node_modules/.pnpm/lucide-react@0.400.0_react@18.3.1/node_modules/lucide-react/dist/esm/createLucideIcon.js");/**
 * @license lucide-react v0.400.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const z=(0,p.default)("CircleCheck",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"m9 12 2 2 4-4",key:"dzmm74"}]]);/**
 * @license lucide-react v0.400.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const L=(0,p.default)("CircleAlert",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["line",{x1:"12",x2:"12",y1:"8",y2:"12",key:"1pkeuh"}],["line",{x1:"12",x2:"12.01",y1:"16",y2:"16",key:"4dfq90"}]]);/**
 * @license lucide-react v0.400.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const I=(0,p.default)("Info",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M12 16v-4",key:"1dtifu"}],["path",{d:"M12 8h.01",key:"e9boi3"}]]);/**
 * @license lucide-react v0.400.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const T=(0,p.default)("LoaderCircle",[["path",{d:"M21 12a9 9 0 1 1-6.219-8.56",key:"13zald"}]]);/**
 * @license lucide-react v0.400.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const R=(0,p.default)("X",[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]]),v=x(e=>({toasts:[],add:s=>{const t=`toast-${Date.now()}-${Math.random().toString(36).slice(2,6)}`;if(e(y=>({toasts:[...y.toasts,{...s,id:t}]})),s.type!=="loading"&&s.duration!==0){var r;setTimeout(()=>{e(y=>({toasts:y.toasts.filter(V=>V.id!==t)}))},(r=s.duration)!==null&&r!==void 0?r:4e3)}return t},remove:s=>e(t=>({toasts:t.toasts.filter(r=>r.id!==s)})),update:(s,t)=>e(r=>({toasts:r.toasts.map(y=>y.id===s?{...y,...t}:y)}))}));function S(){const e=v(l=>l.add),s=v(l=>l.remove),t=v(l=>l.update),r=(0,g.useCallback)((l,$="info")=>e({message:l,type:$}),[e]),y=(0,g.useCallback)(l=>e({message:l,type:"success"}),[e]),V=(0,g.useCallback)(l=>e({message:l,type:"error"}),[e]),M=(0,g.useCallback)(l=>e({message:l,type:"info"}),[e]),N=(0,g.useCallback)(l=>e({message:l,type:"loading",duration:0}),[e]);return{toast:r,success:y,error:V,info:M,loading:N,remove:s,update:t}}const O={success:{bg:"bg-green-600",icon:z},error:{bg:"bg-red-600",icon:L},info:{bg:"bg-blue-600",icon:I},loading:{bg:"bg-gray-700",icon:T}};function W(){const e=v(t=>t.toasts),s=v(t=>t.remove);return(0,n.jsx)("div",{className:"fixed bottom-4 right-4 z-[100] flex flex-col gap-2",children:e.map(t=>{const r=O[t.type],y=r.icon;return(0,n.jsxs)("div",{className:`flex items-center gap-3 rounded-lg ${r.bg} px-4 py-3 text-sm text-white shadow-lg animate-[slideIn_0.2s_ease-out]`,children:[(0,n.jsx)(y,{size:16,className:t.type==="loading"?"animate-spin":""}),(0,n.jsx)("span",{children:t.message}),t.type!=="loading"&&(0,n.jsx)("button",{onClick:()=>s(t.id),className:"ml-2 opacity-70 hover:opacity-100",children:(0,n.jsx)(R,{size:14})})]},t.id)})})}function G(){const{success:e,error:s,info:t,loading:r}=S();return(0,g.useEffect)(()=>{e("Project deployed successfully!"),s("Failed to connect to GitHub"),t("Graph saved to localStorage"),r("Deploying to Vercel...")},[e,s,t,r]),(0,n.jsx)(W,{})}const B={title:"Components/Toast",tags:["autodocs"]},F={render:()=>(0,n.jsx)(G,{})},U=["AllTypes"]},"../../node_modules/.pnpm/lucide-react@0.400.0_react@18.3.1/node_modules/lucide-react/dist/esm/createLucideIcon.js":(C,_,a)=>{a.r(_),a.d(_,{default:()=>g});var n=a("../../node_modules/.pnpm/next@14.2.5_@babel+core@7.29.7_@playwright+test@1.61.1_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/next/dist/compiled/react/index.js");/**
 * @license lucide-react v0.400.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const E=h=>h.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),j=(...h)=>h.filter((m,b,i)=>!!m&&i.indexOf(m)===b).join(" ");/**
 * @license lucide-react v0.400.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var w={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.400.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const k=(0,n.forwardRef)(({color:h="currentColor",size:m=24,strokeWidth:b=2,absoluteStrokeWidth:i,className:f="",children:o,iconNode:c,...u},x)=>(0,n.createElement)("svg",{ref:x,...w,width:m,height:m,stroke:h,strokeWidth:i?Number(b)*24/Number(m):b,className:j("lucide",f),...u},[...c.map(([d,p])=>(0,n.createElement)(d,p)),...Array.isArray(o)?o:[o]]));/**
 * @license lucide-react v0.400.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const g=(h,m)=>{const b=(0,n.forwardRef)(({className:i,...f},o)=>(0,n.createElement)(k,{ref:o,iconNode:m,className:j(`lucide-${E(h)}`,i),...f}));return b.displayName=`${h}`,b}},"../../node_modules/.pnpm/use-sync-external-store@1.6.0_react@18.3.1/node_modules/use-sync-external-store/cjs/use-sync-external-store-shim.production.js":(C,_,a)=>{/**
 * @license React
 * use-sync-external-store-shim.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var n=a("../../node_modules/.pnpm/next@14.2.5_@babel+core@7.29.7_@playwright+test@1.61.1_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/next/dist/compiled/react/index.js");function E(o,c){return o===c&&(o!==0||1/o===1/c)||o!==o&&c!==c}var j=typeof Object.is=="function"?Object.is:E,w=n.useState,k=n.useEffect,g=n.useLayoutEffect,h=n.useDebugValue;function m(o,c){var u=c(),x=w({inst:{value:u,getSnapshot:c}}),d=x[0].inst,p=x[1];return g(function(){d.value=u,d.getSnapshot=c,b(d)&&p({inst:d})},[o,u,c]),k(function(){return b(d)&&p({inst:d}),o(function(){b(d)&&p({inst:d})})},[o]),h(u),u}function b(o){var c=o.getSnapshot;o=o.value;try{var u=c();return!j(o,u)}catch{return!0}}function i(o,c){return c()}var f=typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"?i:m;_.useSyncExternalStore=n.useSyncExternalStore!==void 0?n.useSyncExternalStore:f},"../../node_modules/.pnpm/use-sync-external-store@1.6.0_react@18.3.1/node_modules/use-sync-external-store/cjs/use-sync-external-store-shim/with-selector.production.js":(C,_,a)=>{/**
 * @license React
 * use-sync-external-store-shim/with-selector.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var n=a("../../node_modules/.pnpm/next@14.2.5_@babel+core@7.29.7_@playwright+test@1.61.1_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/next/dist/compiled/react/index.js"),E=a("../../node_modules/.pnpm/use-sync-external-store@1.6.0_react@18.3.1/node_modules/use-sync-external-store/shim/index.js");function j(i,f){return i===f&&(i!==0||1/i===1/f)||i!==i&&f!==f}var w=typeof Object.is=="function"?Object.is:j,k=E.useSyncExternalStore,g=n.useRef,h=n.useEffect,m=n.useMemo,b=n.useDebugValue;_.useSyncExternalStoreWithSelector=function(i,f,o,c,u){var x=g(null);if(x.current===null){var d={hasValue:!1,value:null};x.current=d}else d=x.current;x=m(function(){function z(v){if(!L){if(L=!0,I=v,v=c(v),u!==void 0&&d.hasValue){var S=d.value;if(u(S,v))return T=S}return T=v}if(S=T,w(I,v))return S;var O=c(v);return u!==void 0&&u(S,O)?(I=v,S):(I=v,T=O)}var L=!1,I,T,R=o===void 0?null:o;return[function(){return z(f())},R===null?void 0:function(){return z(R())}]},[f,o,c,u]);var p=k(i,x[0],x[1]);return h(function(){d.hasValue=!0,d.value=p},[p]),b(p),p}},"../../node_modules/.pnpm/use-sync-external-store@1.6.0_react@18.3.1/node_modules/use-sync-external-store/shim/index.js":(C,_,a)=>{C.exports=a("../../node_modules/.pnpm/use-sync-external-store@1.6.0_react@18.3.1/node_modules/use-sync-external-store/cjs/use-sync-external-store-shim.production.js")},"../../node_modules/.pnpm/use-sync-external-store@1.6.0_react@18.3.1/node_modules/use-sync-external-store/shim/with-selector.js":(C,_,a)=>{C.exports=a("../../node_modules/.pnpm/use-sync-external-store@1.6.0_react@18.3.1/node_modules/use-sync-external-store/cjs/use-sync-external-store-shim/with-selector.production.js")}}]);
