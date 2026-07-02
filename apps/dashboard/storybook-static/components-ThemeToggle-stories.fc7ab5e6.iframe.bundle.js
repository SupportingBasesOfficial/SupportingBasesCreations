"use strict";(self.webpackChunk_sbc_dashboard=self.webpackChunk_sbc_dashboard||[]).push([[125],{"./src/components/ThemeToggle.stories.tsx":(y,m,o)=>{o.r(m),o.d(m,{Default:()=>n,__namedExportsOrder:()=>i,default:()=>s});var e=o("../../node_modules/.pnpm/next@14.2.5_@babel+core@7.29.7_@playwright+test@1.61.1_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/next/dist/compiled/react/jsx-runtime.js"),g=o("../../node_modules/.pnpm/next@14.2.5_@babel+core@7.29.7_@playwright+test@1.61.1_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/next/dist/compiled/react/index.js"),u=o("../../node_modules/.pnpm/lucide-react@0.400.0_react@18.3.1/node_modules/lucide-react/dist/esm/createLucideIcon.js");/**
 * @license lucide-react v0.400.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const p=(0,u.default)("Moon",[["path",{d:"M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z",key:"a7tn18"}]]);/**
 * @license lucide-react v0.400.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const f=(0,u.default)("Sun",[["circle",{cx:"12",cy:"12",r:"4",key:"4exip2"}],["path",{d:"M12 2v2",key:"tus03m"}],["path",{d:"M12 20v2",key:"1lh1kg"}],["path",{d:"m4.93 4.93 1.41 1.41",key:"149t6j"}],["path",{d:"m17.66 17.66 1.41 1.41",key:"ptbguv"}],["path",{d:"M2 12h2",key:"1t8f8n"}],["path",{d:"M20 12h2",key:"1q8mjw"}],["path",{d:"m6.34 17.66-1.41 1.41",key:"1m8zz5"}],["path",{d:"m19.07 4.93-1.41 1.41",key:"1shlcs"}]]);function k(){const[a,l]=(0,g.useState)("light");return(0,g.useEffect)(()=>{const d=localStorage.getItem("sbc-theme"),c=window.matchMedia("(prefers-color-scheme: dark)").matches,h=d??(c?"dark":"light");l(h),document.documentElement.classList.toggle("dark",h==="dark")},[]),{theme:a,toggle:()=>{l(d=>{const c=d==="light"?"dark":"light";return localStorage.setItem("sbc-theme",c),document.documentElement.classList.toggle("dark",c==="dark"),c})}}}function t(){const{theme:a,toggle:l}=k();return(0,e.jsx)("button",{onClick:l,className:"flex items-center justify-center rounded-lg border border-gray-200 p-2 text-gray-600 transition-all hover:bg-gray-100 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800","aria-label":"Toggle theme",children:a==="light"?(0,e.jsx)(p,{size:16}):(0,e.jsx)(f,{size:16})})}const s={title:"Components/ThemeToggle",component:t,tags:["autodocs"]},n={render:()=>(0,e.jsx)("div",{className:"flex items-center gap-4 p-8",children:(0,e.jsx)(t,{})})},i=["Default"]},"../../node_modules/.pnpm/lucide-react@0.400.0_react@18.3.1/node_modules/lucide-react/dist/esm/createLucideIcon.js":(y,m,o)=>{o.r(m),o.d(m,{default:()=>k});var e=o("../../node_modules/.pnpm/next@14.2.5_@babel+core@7.29.7_@playwright+test@1.61.1_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/next/dist/compiled/react/index.js");/**
 * @license lucide-react v0.400.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const g=t=>t.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),u=(...t)=>t.filter((r,s,n)=>!!r&&n.indexOf(r)===s).join(" ");/**
 * @license lucide-react v0.400.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var p={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.400.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const f=(0,e.forwardRef)(({color:t="currentColor",size:r=24,strokeWidth:s=2,absoluteStrokeWidth:n,className:i="",children:a,iconNode:l,...x},d)=>(0,e.createElement)("svg",{ref:d,...p,width:r,height:r,stroke:t,strokeWidth:n?Number(s)*24/Number(r):s,className:u("lucide",i),...x},[...l.map(([c,h])=>(0,e.createElement)(c,h)),...Array.isArray(a)?a:[a]]));/**
 * @license lucide-react v0.400.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const k=(t,r)=>{const s=(0,e.forwardRef)(({className:n,...i},a)=>(0,e.createElement)(f,{ref:a,iconNode:r,className:u(`lucide-${g(t)}`,n),...i}));return s.displayName=`${t}`,s}}}]);
