(()=>{var e={};e.id=3967,e.ids=[3967],e.modules={72934:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external.js")},54580:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external.js")},45869:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external.js")},20399:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},32307:e=>{"use strict";e.exports=require("next/dist/server/app-render/prerender-async-storage.external.js")},39491:e=>{"use strict";e.exports=require("assert")},14300:e=>{"use strict";e.exports=require("buffer")},6113:e=>{"use strict";e.exports=require("crypto")},9523:e=>{"use strict";e.exports=require("dns")},82361:e=>{"use strict";e.exports=require("events")},41808:e=>{"use strict";e.exports=require("net")},22037:e=>{"use strict";e.exports=require("os")},12781:e=>{"use strict";e.exports=require("stream")},71576:e=>{"use strict";e.exports=require("string_decoder")},24404:e=>{"use strict";e.exports=require("tls")},76224:e=>{"use strict";e.exports=require("tty")},57310:e=>{"use strict";e.exports=require("url")},73837:e=>{"use strict";e.exports=require("util")},29830:e=>{"use strict";e.exports=require("util/types")},47663:(e,t,a)=>{"use strict";a.r(t),a.d(t,{GlobalError:()=>n.a,__next_app__:()=>u,pages:()=>c,routeModule:()=>d,tree:()=>o});var s=a(40568),r=a(64006),i=a(90213),n=a.n(i),p=a(78787),l={};for(let e in p)0>["default","tree","pages","GlobalError","__next_app__","routeModule"].indexOf(e)&&(l[e]=()=>p[e]);a.d(t,l);let o=["",{children:["(auth)",{children:["callback",{children:["oauth",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(a.bind(a,64277)),"/Users/kapil/Documents/heykapil.in/app/(auth)/callback/oauth/page.tsx"]}]},{}]},{}]},{"not-found":[()=>Promise.resolve().then(a.t.bind(a,28706,23)),"next/dist/client/components/not-found-error"]}]},{layout:[()=>Promise.resolve().then(a.bind(a,3701)),"/Users/kapil/Documents/heykapil.in/app/layout.tsx"],error:[()=>Promise.resolve().then(a.bind(a,99155)),"/Users/kapil/Documents/heykapil.in/app/error.tsx"],"not-found":[()=>Promise.resolve().then(a.t.bind(a,28706,23)),"next/dist/client/components/not-found-error"]}],c=["/Users/kapil/Documents/heykapil.in/app/(auth)/callback/oauth/page.tsx"],u={require:a,loadChunk:()=>Promise.resolve()},d=new s.AppPageRouteModule({definition:{kind:r.RouteKind.APP_PAGE,page:"/(auth)/callback/oauth/page",pathname:"/callback/oauth",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:o}})},68066:(e,t,a)=>{let s={"1e0322ba455c4fa7df31cdd42ecfc9179872ae4b":()=>Promise.resolve().then(a.bind(a,37770)).then(e=>e.OauthCallback)};async function r(e,...t){return(await s[e]()).apply(null,t)}e.exports={"1e0322ba455c4fa7df31cdd42ecfc9179872ae4b":r.bind(null,"1e0322ba455c4fa7df31cdd42ecfc9179872ae4b")}},58758:(e,t,a)=>{Promise.resolve().then(a.bind(a,88871))},83415:(e,t,a)=>{Promise.resolve().then(a.bind(a,90861)),Promise.resolve().then(a.t.bind(a,73510,23))},69286:(e,t,a)=>{Promise.resolve().then(a.bind(a,19098))},27548:(e,t,a)=>{Promise.resolve().then(a.t.bind(a,52144,23)),Promise.resolve().then(a.t.bind(a,63582,23)),Promise.resolve().then(a.t.bind(a,9587,23)),Promise.resolve().then(a.t.bind(a,65329,23)),Promise.resolve().then(a.t.bind(a,50599,23))},88871:(e,t,a)=>{"use strict";a.d(t,{default:()=>n});var s=a(68882),r=a(63606),i=a(4619);function n(){let e=(0,i.useSearchParams)(),t=e?.get("token")||"",a=e?.get("next")||"",n=e?.get("sessionid")||"";return(0,r.useEffect)(()=>{(async()=>{await (0,s.nV)({token:t,next:a,sessionId:n})})()},[]),null}},90861:(e,t,a)=>{"use strict";a.d(t,{default:()=>i});var s=a(20149),r=a(99548);function i({children:e}){return(0,s.jsxs)(s.Fragment,{children:[e,(0,s.jsx)(r.x7,{})]})}},19098:(e,t,a)=>{"use strict";a.r(t),a.d(t,{default:()=>i});var s=a(20149),r=a(63606);function i({error:e,reset:t}){return(0,r.useEffect)(()=>{console.error(e)},[e]),(0,s.jsx)("div",{children:(0,s.jsx)("p",{children:"Oh no, something went wrong... maybe refresh?"})})}},4619:(e,t,a)=>{"use strict";var s=a(9877);a.o(s,"redirect")&&a.d(t,{redirect:function(){return s.redirect}}),a.o(s,"useSearchParams")&&a.d(t,{useSearchParams:function(){return s.useSearchParams}})},93106:(e,t,a)=>{"use strict";a.a(e,async(e,s)=>{try{a.d(t,{Z:()=>e});var r=a(3571);let e=(await (0,r.createProxy)(String.raw`/Users/kapil/Documents/heykapil.in/app/(auth)/callback/oauth/Client.tsx`)).default;s()}catch(e){s(e)}},1)},64277:(e,t,a)=>{"use strict";a.a(e,async(e,s)=>{try{a.r(t),a.d(t,{default:()=>l});var r=a(57543),i=a(93106),n=a(49024),p=e([i]);function l(){return(0,r.jsx)(n.Suspense,{fallback:(0,r.jsx)("div",{children:"Loading..."}),children:(0,r.jsx)(i.Z,{})})}i=(p.then?(await p)():p)[0],s()}catch(e){s(e)}})},79154:(e,t,a)=>{"use strict";a.d(t,{w:()=>n});var s=a(57543),r=a(63830);let i={"/":{name:"home"},"/work":{name:"work"},"/musing":{name:"musing"},"/snippet":{name:"snippet"},"/guestbook":{name:"guestbook"}};function n(){return(0,s.jsx)("aside",{className:"-ml-[8px] mb-16 tracking-tight",children:(0,s.jsx)("div",{className:"lg:sticky lg:top-20",children:(0,s.jsx)("nav",{className:"fade relative flex scroll-pr-6 flex-row items-start px-0 pb-0 md:relative md:overflow-auto",id:"nav",children:(0,s.jsx)("div",{className:"flex flex-row space-x-0 pr-10",children:Object.entries(i).map(([e,{name:t}])=>(0,s.jsx)(r.default,{href:e,className:"relative flex px-2 py-1 align-middle transition-all hover:text-neutral-800 dark:hover:text-neutral-200",children:t},e))})})})})}},6997:(e,t,a)=>{"use strict";a.a(e,async(e,s)=>{try{a.d(t,{Z:()=>e});var r=a(3571);let e=(await (0,r.createProxy)(String.raw`/Users/kapil/Documents/heykapil.in/app/components/toast-provider.tsx`)).default;s()}catch(e){s(e)}},1)},99155:(e,t,a)=>{"use strict";a.a(e,async(e,s)=>{try{a.r(t),a.d(t,{default:()=>e});var r=a(3571);let e=(await (0,r.createProxy)(String.raw`/Users/kapil/Documents/heykapil.in/app/error.tsx`)).default;s()}catch(e){s(e)}},1)},3701:(e,t,a)=>{"use strict";a.a(e,async(e,s)=>{try{a.r(t),a.d(t,{default:()=>c,metadata:()=>u});var r=a(57543),i=a(14841),n=a.n(i);a(32136);var p=a(79154),l=a(6997),o=e([l]);l=(o.then?(await o)():o)[0];let u={metadataBase:new URL("https://kapil.app"),title:{default:"Kapil Chaudhary",template:"%s | Kapil Chaudhary"},description:"Developer, writer, and creator.",openGraph:{title:"Kapil Chaudhary",description:"Developer, writer, and creator.",url:"https://kapil.app",siteName:"Kapil Chaudhary",locale:"en_US",type:"website",images:[{url:"https://og.kapil.app/api/og?title=Kapil Chaudhary&subtitle=Research scholar&bg=https://cf.kapil.app/images/kapiljch-20220503-0001.jpg"}]},robots:{index:!0,follow:!0,googleBot:{index:!0,follow:!0,"max-video-preview":-1,"max-image-preview":"large","max-snippet":-1}},twitter:{title:"Kapil Chaudhary",card:"summary_large_image"},icons:{apple:[{url:"https://cf.kapil.app/images/website/favicons/apple-icon-180x180.png",sizes:"180x180",type:"image/png"},{url:"https://cf.kapil.app/images/website/favicons/apple-icon-57x57.png",sizes:"57x57",type:"image/png"},{url:"https://cf.kapil.app/images/website/favicons/apple-icon-76x76.png",sizes:"76x76",type:"image/png"},{url:"https://cf.kapil.app/images/website/favicons/applce-icon-152x152.png",sizes:"152x152",type:"image/png"},{url:"https://cf.kapil.app/images/website/favicons/apple-icon-144x144.png",sizes:"144x144",type:"image/png"},{url:"https://cf.kapil.app/images/website/favicons/apple-icon-120x120.png",sizes:"120x120",type:"image/png"},{url:"https://cf.kapil.app/images/website/favicons/apple-icon-114x114.png",sizes:"114x114",type:"image/png"},{url:"https://cf.kapil.app/images/website/favicons/apple-icon-60x60.png",sizes:"60x60",type:"image/png"},{url:"https://cf.kapil.app/images/website/favicons/apple-icon-72x72.png",sizes:"72x72",type:"image/png"},{url:"https://cf.kapil.app/images/website/favicons/favicon-96x96.png",sizes:"96x96",type:"image/png"}],other:[{rel:"icon",url:"https://cf.kapil.app/images/website/favicons/favicon.ico"},{rel:"icon",url:"https://cf.kapil.app/images/website/favicons/android-icon-192x192.png",sizes:"192x192",type:"image/png"},{rel:"icon",url:"https://cf.kapil.app/images/website/favicons/favicon-32x32.png",sizes:"32x32",type:"image/png"},{rel:"manifest",url:"https://cf.kapil.app/images/website/favicons/manifest.json"}],icon:"https://cf.kapil.app/images/website/favicons/favicon-16x16.png"}},d=(...e)=>e.filter(Boolean).join(" ");function c({children:e}){return(0,r.jsx)("html",{lang:"en",className:d("text-black bg-white dark:text-white dark:bg-[#111010]",n().className),children:(0,r.jsx)("body",{className:"antialiased max-w-2xl mb-40 flex flex-col md:flex-row mx-4 mt-8 lg:mx-auto",children:(0,r.jsx)(l.Z,{children:(0,r.jsxs)("main",{className:"flex-auto min-w-0 mt-6 flex flex-col px-2 md:px-0",children:[(0,r.jsx)(p.w,{}),e]})})})})}s()}catch(e){s(e)}})},32136:()=>{}};var t=require("../../../../webpack-runtime.js");t.C(e);var a=e=>t(t.s=e),s=t.X(0,[4615,8045,3272,4586],()=>a(47663));module.exports=s})();