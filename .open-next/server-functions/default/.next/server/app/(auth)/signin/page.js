(()=>{var e={};e.id=161,e.ids=[161],e.modules={72934:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external.js")},54580:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external.js")},45869:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external.js")},20399:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},32307:e=>{"use strict";e.exports=require("next/dist/server/app-render/prerender-async-storage.external.js")},39491:e=>{"use strict";e.exports=require("assert")},14300:e=>{"use strict";e.exports=require("buffer")},6113:e=>{"use strict";e.exports=require("crypto")},9523:e=>{"use strict";e.exports=require("dns")},82361:e=>{"use strict";e.exports=require("events")},41808:e=>{"use strict";e.exports=require("net")},22037:e=>{"use strict";e.exports=require("os")},12781:e=>{"use strict";e.exports=require("stream")},71576:e=>{"use strict";e.exports=require("string_decoder")},24404:e=>{"use strict";e.exports=require("tls")},76224:e=>{"use strict";e.exports=require("tty")},57310:e=>{"use strict";e.exports=require("url")},73837:e=>{"use strict";e.exports=require("util")},29830:e=>{"use strict";e.exports=require("util/types")},99612:(e,t,r)=>{"use strict";r.r(t),r.d(t,{GlobalError:()=>i.a,__next_app__:()=>u,pages:()=>d,routeModule:()=>m,tree:()=>c});var s=r(40568),n=r(64006),a=r(90213),i=r.n(a),o=r(78787),l={};for(let e in o)0>["default","tree","pages","GlobalError","__next_app__","routeModule"].indexOf(e)&&(l[e]=()=>o[e]);r.d(t,l);let c=["",{children:["(auth)",{children:["signin",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(r.bind(r,98394)),"/Users/kapil/Documents/heykapil.in/app/(auth)/signin/page.tsx"]}]},{}]},{"not-found":[()=>Promise.resolve().then(r.t.bind(r,28706,23)),"next/dist/client/components/not-found-error"]}]},{layout:[()=>Promise.resolve().then(r.bind(r,3701)),"/Users/kapil/Documents/heykapil.in/app/layout.tsx"],error:[()=>Promise.resolve().then(r.bind(r,99155)),"/Users/kapil/Documents/heykapil.in/app/error.tsx"],"not-found":[()=>Promise.resolve().then(r.t.bind(r,28706,23)),"next/dist/client/components/not-found-error"]}],d=["/Users/kapil/Documents/heykapil.in/app/(auth)/signin/page.tsx"],u={require:r,loadChunk:()=>Promise.resolve()},m=new s.AppPageRouteModule({definition:{kind:n.RouteKind.APP_PAGE,page:"/(auth)/signin/page",pathname:"/signin",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:c}})},72219:(e,t,r)=>{let s={"974b965e2f2ef6bef20f0297f5dbd1e717f12dbd":()=>Promise.resolve().then(r.bind(r,37770)).then(e=>e.Login)};async function n(e,...t){return(await s[e]()).apply(null,t)}e.exports={"974b965e2f2ef6bef20f0297f5dbd1e717f12dbd":n.bind(null,"974b965e2f2ef6bef20f0297f5dbd1e717f12dbd")}},81951:(e,t,r)=>{let s={"638b5c86cdc66022f2483d06195290321560aa51":()=>Promise.resolve().then(r.bind(r,74568)).then(e=>e.OauthLogin)};async function n(e,...t){return(await s[e]()).apply(null,t)}e.exports={"638b5c86cdc66022f2483d06195290321560aa51":n.bind(null,"638b5c86cdc66022f2483d06195290321560aa51")}},61942:(e,t,r)=>{Promise.resolve().then(r.bind(r,3981)),Promise.resolve().then(r.bind(r,20743))},3981:(e,t,r)=>{"use strict";r.d(t,{SubmitButton:()=>a});var s=r(20149),n=r(30028);function a({children:e,pendingState:t,...r}){let{pending:a}=(0,n.useFormStatus)();return(0,s.jsx)("button",{disabled:a,...r,children:a?t:e})}},20743:(e,t,r)=>{"use strict";r.d(t,{LoginForm:()=>p});var s=r(20149),n=r(30028),a=r(68882),i=r(85723),o=r(3981),l=r(4619),c=r(63606),d=r(46424),u=r(91939),m=r(10019);function p({message:e,callBackUrl:t}){let[r,p]=(0,n.useFormState)(a.m3,d.fX),[h,x]=(0,c.useState)(!0),g=(0,m.k)(r),b=(0,m.y)(r);return(0,s.jsxs)("form",{action:p,ref:b,className:"flex flex-col space-y-2 mb-10 mt-5",children:[(0,s.jsxs)("div",{className:"relative mb-2 max-w-lg",children:[(0,s.jsx)("input",{type:"text",className:"p-2 caret-current focus:ring-neutral-500 focus:border-neutral-600 dark:focus:border-neutral-400 focus:outline-none block w-full border border-neutral-300 dark:border-neutral-700 rounded-md bg-neutral-50 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100",autoFocus:!0,name:"username",minLength:3,maxLength:50,required:!0,placeholder:"Email or username"}),(0,s.jsx)(u.c,{formState:r,name:"username"}),(0,s.jsx)("span",{className:"absolute inset-y-0 end-0 grid place-content-center px-4",children:(0,s.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",className:"size-4 text-neutral-400",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:(0,s.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"2",d:"M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"})})})]}),(0,s.jsxs)("div",{className:"relative mb-6 max-w-lg",children:[(0,s.jsx)("input",{type:h?"password":"text",className:"p-2 caret-current focus:ring-neutral-500 focus:border-neutral-600 dark:focus:border-neutral-400 focus:outline-none block w-full border border-neutral-300 dark:border-neutral-700 rounded-md bg-neutral-50 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100",name:"password",minLength:3,maxLength:50,placeholder:"Password",required:!0}),(0,s.jsx)(u.c,{formState:r,name:"password"}),(0,s.jsx)("span",{className:"absolute inset-y-0 end-0 grid place-content-center px-4",children:(0,s.jsx)("button",{onClick:e=>{e.preventDefault(),x(e=>!e)},children:h?(0,s.jsxs)("svg",{xmlns:"http://www.w3.org/2000/svg",className:"size-4 text-zinc-500",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:[(0,s.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"2",d:"M15 12a3 3 0 11-6 0 3 3 0 016 0z"}),(0,s.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"2",d:"M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"})]}):(0,s.jsxs)("svg",{viewBox:"0 0 24 24",className:"size-4 text-[#737373]",fill:"none",stroke:"currentColor",xmlns:"http://www.w3.org/2000/svg",children:[(0,s.jsx)("path",{d:"M15.6487 5.39489C14.4859 4.95254 13.2582 4.72021 12 4.72021C8.46997 4.72021 5.17997 6.54885 2.88997 9.71381C1.98997 10.9534 1.98997 13.037 2.88997 14.2766C3.34474 14.9051 3.83895 15.481 4.36664 16.0002M19.3248 7.69653C19.9692 8.28964 20.5676 8.96425 21.11 9.71381C22.01 10.9534 22.01 13.037 21.11 14.2766C18.82 17.4416 15.53 19.2702 12 19.2702C10.6143 19.2702 9.26561 18.9884 7.99988 18.4547",strokeWidth:"1.5",strokeLinecap:"round",strokeLinejoin:"round"}),(0,s.jsx)("path",{d:"M15 12C15 13.6592 13.6592 15 12 15M14.0996 9.85541C13.5589 9.32599 12.8181 9 12 9C10.3408 9 9 10.3408 9 12C9 12.7293 9.25906 13.3971 9.69035 13.9166",strokeWidth:"1.5",strokeLinecap:"round",strokeLinejoin:"round"}),(0,s.jsx)("path",{d:"M2 21.0002L22 2.7002",strokeWidth:"1.5",strokeLinecap:"round"})]})})})]}),(0,s.jsxs)("div",{className:"space-y-10 max-w-lg mb-10",children:[(0,s.jsx)("div",{children:(0,s.jsx)(i.default,{className:"text-sm font-medium text-neutral-700 dark:text-neutral-300 hover:underline hover:underline-offset-2",href:"/forgot-pass",children:"Forgot password?"})}),(0,s.jsxs)("div",{className:"text-sm flex justify-between items-center",children:[(0,s.jsx)(i.default,{className:"px-3 py-2 border border-opacity-50 border-neutral-900 dark:border-pink-50 text-sm rounded-md font-semibold hover:border-black/[0.9] dark:hover:border-white/[0.9] hover:shadow-lg",href:`/register?callback=${t}`,children:"Create account"}),(0,s.jsx)(o.SubmitButton,{type:"submit",className:"px-8 py-2  bg-neutral-900 dark:bg-pink-50 text-white dark:text-black text-sm rounded-md font-semibold hover:bg-black/[0.9] dark:hover:bg-white/[0.9] hover:shadow-lg",pendingState:(0,s.jsx)("span",{className:"mx-auto table",children:"Loading..."}),children:"Login"})]})]}),(0,s.jsx)("div",{className:"text-sm mt-10",children:e&&"Success"===e?(0,l.redirect)(t):null}),g]})}},91939:(e,t,r)=>{"use strict";r.d(t,{c:()=>n});var s=r(20149);let n=({formState:e,name:t})=>(0,s.jsx)("span",{className:"text-xs text-red-400",children:e.fieldErrors[t]?.[0]})},10019:(e,t,r)=>{"use strict";r.d(t,{k:()=>i,y:()=>o});var s=r(20149),n=r(63606),a=r(99548);let i=e=>{let t=(0,n.useRef)(e.timestamp),r=e.message&&e.timestamp!==t.current;return(0,n.useEffect)(()=>{r&&("ERROR"===e.status?a.Am.error(e.message):a.Am.success(e.message),t.current=e.timestamp)},[e,r]),(0,s.jsxs)("noscript",{children:["ERROR"===e.status&&(0,s.jsx)("div",{style:{color:"red"},children:e.message}),"SUCCESS"===e.status&&(0,s.jsx)("div",{style:{color:"green"},children:e.message})]})},o=e=>{let t=(0,n.useRef)(null),r=(0,n.useRef)(e.timestamp);return(0,n.useEffect)(()=>{t.current&&"SUCCESS"===e.status&&e.timestamp!==r.current&&(t.current.reset(),r.current=e.timestamp)},[e.status,e.timestamp]),t}},46424:(e,t,r)=>{"use strict";r.d(t,{fX:()=>s});let s={status:"UNSET",message:"",fieldErrors:{},timestamp:Date.now()}},85723:(e,t,r)=>{"use strict";r.d(t,{default:()=>n.a});var s=r(73510),n=r.n(s)},4619:(e,t,r)=>{"use strict";var s=r(9877);r.o(s,"redirect")&&r.d(t,{redirect:function(){return s.redirect}}),r.o(s,"useSearchParams")&&r.d(t,{useSearchParams:function(){return s.useSearchParams}})},27080:(e,t,r)=>{"use strict";r.a(e,async(e,s)=>{try{r.d(t,{M:()=>e});var n=r(3571);let e=(await (0,n.createProxy)(String.raw`/Users/kapil/Documents/heykapil.in/app/(auth)/guestbook/SubmitButton.tsx`)).SubmitButton;s()}catch(e){s(e)}},1)},81357:(e,t,r)=>{"use strict";r.a(e,async(e,s)=>{try{r.d(t,{U:()=>e});var n=r(3571);let e=(await (0,n.createProxy)(String.raw`/Users/kapil/Documents/heykapil.in/app/(auth)/signin/LoginForm.tsx`)).LoginForm;s()}catch(e){s(e)}},1)},98394:(e,t,r)=>{"use strict";r.a(e,async(e,s)=>{try{r.r(t),r.d(t,{default:()=>m});var n=r(57543),a=r(74568),i=r(43150),o=r(27080),l=r(69319),c=r(41119),d=r(81357),u=e([o,d]);async function m(e){let t=e?.searchParams?.callback?.toString()||"/profile",r=e?.searchParams?.error?.toString()||"",s=i.cookies().get("LoginCookie")?.value||"",u=await (0,c.z)();u&&u.email&&u.username&&(0,l.redirect)(t);let m="Kindly login to continue...";return t.includes("/admin")&&(m="Kindly login to continue to the admin panel!"),t.includes("/blog")&&(m="Kindly login to read the blog post!"),t.includes("/snippet")&&(m="Kindly login to read the snippet post!"),t.includes("/guestbook")&&(m="Kindly login to sign the guestbook!"),(0,n.jsxs)("section",{children:[(0,n.jsx)("h1",{className:"font-medium text-2xl mb-8 tracking-tighter animate-fade-right",children:"Welcome back!"}),(0,n.jsx)("p",{className:"my-4 text-md font-medium text-neutral-700 dark:text-neutral-300 animate-bounce",children:r||s?(0,n.jsx)("span",{className:"text-red-500 font-semibold",children:r||s}):m}),(0,n.jsx)(d.U,{message:s,callBackUrl:t}),(0,n.jsx)("div",{className:"mb-6 max-w-lg border-t-2 border-opacity-50 border-neutral-500"}),(0,n.jsx)("p",{className:"my-6 text-md font-medium text-neutral-700 dark:text-neutral-300",children:"Or use your github or google account to continue..."}),(0,n.jsxs)("div",{className:"flex flex-col md:flex-row justify-between max-w-lg gap-2 w-full",children:[(0,n.jsxs)("form",{action:a.OauthLogin,className:"px-8 py-2 my-0 mx-auto gap-3 w-full bg-neutral-900 dark:bg-pink-50 text-white dark:text-black text-sm rounded-md font-semibold hover:bg-black/[0.9] dark:hover:bg-white/[0.9] hover:shadow-lg",children:[(0,n.jsx)("input",{type:"hidden",name:"link",value:`https://github.com/login/oauth/authorize?scope=user:email&client_id=631dc2729898da1ac8a4&redirect_uri=${process.env.API_URL}/api/callback/github`,required:!0,minLength:1}),(0,n.jsx)("input",{type:"hidden",name:"callback",value:t}),(0,n.jsxs)(o.M,{type:"submit",pendingState:(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)("img",{alt:"GitHub logo",src:"/github.svg",width:"20",height:"20",className:"inline-block self-center place-self-center mr-2 invert dark:invert-0"}),"Waiting for github..."]}),children:[(0,n.jsx)("img",{alt:"GitHub logo",src:"/github.svg",width:"20",height:"20",className:"inline-block self-center place-self-center mr-2 invert dark:invert-0"}),"Login with GitHub"]})]}),(0,n.jsxs)("form",{action:a.OauthLogin,className:"px-8 py-2 my-0 mx-auto gap-3 w-full bg-neutral-900 dark:bg-pink-50 text-white dark:text-black text-sm rounded-md font-semibold hover:bg-black/[0.9] dark:hover:bg-white/[0.9] hover:shadow-lg",children:[(0,n.jsx)("input",{type:"hidden",name:"link",value:`https://accounts.google.com/o/oauth2/v2/auth?scope=https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile&include_granted_scopes=true&response_type=token&redirect_uri=${process.env.API_URL}/callback/google&client_id=942887810322-f539im4rt338srvi20r3ed48dvaqd1b1.apps.googleusercontent.com`,required:!0,minLength:1}),(0,n.jsx)("input",{type:"hidden",name:"callback",value:t}),(0,n.jsxs)(o.M,{type:"submit",pendingState:(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)("img",{alt:"Google logo",src:"/google.svg",width:"20",height:"20",className:"inline-block self-center place-self-center mr-2 invert dark:invert-0"}),(0,n.jsx)("span",{children:"Waiting for google..."})]}),children:[(0,n.jsx)("img",{alt:"Google logo",src:"/google.svg",width:"20",height:"20",className:"inline-block self-center place-self-center mr-2 invert dark:invert-0"}),"Login with Google"]})]})]})]})}[o,d]=u.then?(await u)():u,s()}catch(e){s(e)}})}};var t=require("../../../webpack-runtime.js");t.C(e);var r=e=>t(t.s=e),s=t.X(0,[4615,8045,9997,844,7460,3272,8133,3609,4586,4568],()=>r(99612));module.exports=s})();