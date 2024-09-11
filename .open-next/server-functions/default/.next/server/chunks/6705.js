exports.id=6705,exports.ids=[6705],exports.modules={83415:(e,t,r)=>{Promise.resolve().then(r.bind(r,90861)),Promise.resolve().then(r.t.bind(r,73510,23))},69286:(e,t,r)=>{Promise.resolve().then(r.bind(r,19098))},27548:(e,t,r)=>{Promise.resolve().then(r.t.bind(r,52144,23)),Promise.resolve().then(r.t.bind(r,63582,23)),Promise.resolve().then(r.t.bind(r,9587,23)),Promise.resolve().then(r.t.bind(r,65329,23)),Promise.resolve().then(r.t.bind(r,50599,23))},24305:(e,t,r)=>{Promise.resolve().then(r.t.bind(r,62704,23)),Promise.resolve().then(r.t.bind(r,73510,23))},90861:(e,t,r)=>{"use strict";r.d(t,{default:()=>a});var n=r(20149),i=r(99548);function a({children:e}){return(0,n.jsxs)(n.Fragment,{children:[e,(0,n.jsx)(i.x7,{})]})}},19098:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>a});var n=r(20149),i=r(63606);function a({error:e,reset:t}){return(0,i.useEffect)(()=>{console.error(e)},[e]),(0,n.jsx)("div",{children:(0,n.jsx)("p",{children:"Oh no, something went wrong... maybe refresh?"})})}},99326:(e,t,r)=>{"use strict";r.d(t,{_:()=>p});var n=r(57543),i=r(63830),a=r(6422),s=r(59612),o=r(61253),l=r(49024),c=r.n(l);function u(e){return({children:t})=>{let r=t.toString().toLowerCase().trim().replace(/\s+/g,"-").replace(/&/g,"-and-").replace(/[^\w\-]+/g,"").replace(/\-\-+/g,"-");return c().createElement(`h${e}`,{id:r},[c().createElement("a",{href:`#${r}`,key:`link-${r}`,className:"anchor"})],t)}}let d={h1:u(1),h2:u(2),h3:u(3),h4:u(4),h5:u(5),h6:u(6),Image:function(e){return(0,n.jsx)(a.default,{alt:e.alt,className:"rounded-lg",...e})},a:function(e){let t=e.href;return t.startsWith("/")?(0,n.jsx)(i.default,{href:t,...e,children:e.children}):t.startsWith("#")?(0,n.jsx)("a",{...e}):(0,n.jsx)("a",{target:"_blank",rel:"noopener noreferrer",...e})},Callout:function(e){return(0,n.jsxs)("div",{className:"px-4 py-3 border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 rounded p-1 text-sm flex items-center text-neutral-900 dark:text-neutral-100 mb-8",children:[(0,n.jsx)("div",{className:"flex items-center w-4 mr-4",children:e.emoji}),(0,n.jsx)("div",{className:"w-full callout",children:e.children})]})},ProsCard:function({title:e,pros:t}){return(0,n.jsxs)("div",{className:"border border-emerald-200 dark:border-emerald-900 bg-neutral-50 dark:bg-neutral-900 rounded-xl p-6 my-4 w-full",children:[(0,n.jsx)("span",{children:`You might use ${e} if...`}),(0,n.jsx)("div",{className:"mt-4",children:t.map(e=>(0,n.jsxs)("div",{className:"flex font-medium items-baseline mb-2",children:[(0,n.jsx)("div",{className:"h-4 w-4 mr-2",children:(0,n.jsx)("svg",{className:"h-4 w-4 text-emerald-500",viewBox:"0 0 24 24",children:(0,n.jsxs)("g",{fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,n.jsx)("path",{d:"M22 11.08V12a10 10 0 11-5.93-9.14"}),(0,n.jsx)("path",{d:"M22 4L12 14.01l-3-3"})]})})}),(0,n.jsx)("span",{children:e})]},e))})]})},ConsCard:function({title:e,cons:t}){return(0,n.jsxs)("div",{className:"border border-red-200 dark:border-red-900 bg-neutral-50 dark:bg-neutral-900 rounded-xl p-6 my-6 w-full",children:[(0,n.jsx)("span",{children:`You might not use ${e} if...`}),(0,n.jsx)("div",{className:"mt-4",children:t.map(e=>(0,n.jsxs)("div",{className:"flex font-medium items-baseline mb-2",children:[(0,n.jsx)("div",{className:"h-4 w-4 mr-2",children:(0,n.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 20 20",fill:"currentColor",className:"h-4 w-4 text-red-500",children:(0,n.jsx)("path",{d:"M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z"})})}),(0,n.jsx)("span",{children:e})]},e))})]})},code:function({children:e,...t}){let r=(0,o.CH)(e);return(0,n.jsx)("code",{dangerouslySetInnerHTML:{__html:r},...t})},Table:function({data:e}){let t=e.headers.map((e,t)=>(0,n.jsx)("th",{children:e},t)),r=e.rows.map((e,t)=>(0,n.jsx)("tr",{children:e.map((e,t)=>(0,n.jsx)("td",{children:e},t))},t));return(0,n.jsxs)("table",{children:[(0,n.jsx)("thead",{children:(0,n.jsx)("tr",{children:t})}),(0,n.jsx)("tbody",{children:r})]})}};function p(e){return(0,n.jsx)(s.R,{...e,components:{...d,...e.components||{}}})}},79154:(e,t,r)=>{"use strict";r.d(t,{w:()=>s});var n=r(57543),i=r(63830);let a={"/":{name:"home"},"/work":{name:"work"},"/musing":{name:"musing"},"/snippet":{name:"snippet"},"/guestbook":{name:"guestbook"}};function s(){return(0,n.jsx)("aside",{className:"-ml-[8px] mb-16 tracking-tight",children:(0,n.jsx)("div",{className:"lg:sticky lg:top-20",children:(0,n.jsx)("nav",{className:"fade relative flex scroll-pr-6 flex-row items-start px-0 pb-0 md:relative md:overflow-auto",id:"nav",children:(0,n.jsx)("div",{className:"flex flex-row space-x-0 pr-10",children:Object.entries(a).map(([e,{name:t}])=>(0,n.jsx)(i.default,{href:e,className:"relative flex px-2 py-1 align-middle transition-all hover:text-neutral-800 dark:hover:text-neutral-200",children:t},e))})})})})}},6997:(e,t,r)=>{"use strict";r.a(e,async(e,n)=>{try{r.d(t,{Z:()=>e});var i=r(3571);let e=(await (0,i.createProxy)(String.raw`/Users/kapil/Documents/heykapil.in/app/components/toast-provider.tsx`)).default;n()}catch(e){n(e)}},1)},59141:(e,t,r)=>{"use strict";r.d(t,{QR:()=>d,m4:()=>c,u3:()=>l,xZ:()=>u});var n=r(57147),i=r.n(n),a=r(71017),s=r.n(a);function o(e){return i().readdirSync(e).filter(e=>".md"===s().extname(e)&&"index.md"!==s().basename(e)).map(t=>{var r,n;let a,o,l,c,u;let{metadata:d,content:p}=(r=s().join(e,t),n=i().readFileSync(r,"utf-8"),o=(a=/---\s*([\s\S]*?)\s*---/).exec(n)[1],l=n.replace(a,"").trim(),c=o.trim().split("\n"),u={},c.forEach(e=>{let[t,...r]=e.split(": "),n=r.join(": ").trim();n=n.replace(/^['"](.*)['"]$/,"$1"),u[t.trim()]=n}),{metadata:u,content:l});return{metadata:d,slug:s().basename(t,s().extname(t)),content:p}})}function l(){return o(s().join(process.cwd(),"content/posts"))}function c(){return o(s().join(process.cwd(),"content/snippets"))}function u(){return o(s().join(process.cwd(),"content/extra"))}function d(){return o(s().join(process.cwd(),"content/quotes"))}},99155:(e,t,r)=>{"use strict";r.a(e,async(e,n)=>{try{r.r(t),r.d(t,{default:()=>e});var i=r(3571);let e=(await (0,i.createProxy)(String.raw`/Users/kapil/Documents/heykapil.in/app/error.tsx`)).default;n()}catch(e){n(e)}},1)},3701:(e,t,r)=>{"use strict";r.a(e,async(e,n)=>{try{r.r(t),r.d(t,{default:()=>u,metadata:()=>d});var i=r(57543),a=r(14841),s=r.n(a);r(32136);var o=r(79154),l=r(6997),c=e([l]);l=(c.then?(await c)():c)[0];let d={metadataBase:new URL("https://kapil.app"),title:{default:"Kapil Chaudhary",template:"%s | Kapil Chaudhary"},description:"Developer, writer, and creator.",openGraph:{title:"Kapil Chaudhary",description:"Developer, writer, and creator.",url:"https://kapil.app",siteName:"Kapil Chaudhary",locale:"en_US",type:"website",images:[{url:"https://og.kapil.app/api/og?title=Kapil Chaudhary&subtitle=Research scholar&bg=https://cf.kapil.app/images/kapiljch-20220503-0001.jpg"}]},robots:{index:!0,follow:!0,googleBot:{index:!0,follow:!0,"max-video-preview":-1,"max-image-preview":"large","max-snippet":-1}},twitter:{title:"Kapil Chaudhary",card:"summary_large_image"},icons:{apple:[{url:"https://cf.kapil.app/images/website/favicons/apple-icon-180x180.png",sizes:"180x180",type:"image/png"},{url:"https://cf.kapil.app/images/website/favicons/apple-icon-57x57.png",sizes:"57x57",type:"image/png"},{url:"https://cf.kapil.app/images/website/favicons/apple-icon-76x76.png",sizes:"76x76",type:"image/png"},{url:"https://cf.kapil.app/images/website/favicons/applce-icon-152x152.png",sizes:"152x152",type:"image/png"},{url:"https://cf.kapil.app/images/website/favicons/apple-icon-144x144.png",sizes:"144x144",type:"image/png"},{url:"https://cf.kapil.app/images/website/favicons/apple-icon-120x120.png",sizes:"120x120",type:"image/png"},{url:"https://cf.kapil.app/images/website/favicons/apple-icon-114x114.png",sizes:"114x114",type:"image/png"},{url:"https://cf.kapil.app/images/website/favicons/apple-icon-60x60.png",sizes:"60x60",type:"image/png"},{url:"https://cf.kapil.app/images/website/favicons/apple-icon-72x72.png",sizes:"72x72",type:"image/png"},{url:"https://cf.kapil.app/images/website/favicons/favicon-96x96.png",sizes:"96x96",type:"image/png"}],other:[{rel:"icon",url:"https://cf.kapil.app/images/website/favicons/favicon.ico"},{rel:"icon",url:"https://cf.kapil.app/images/website/favicons/android-icon-192x192.png",sizes:"192x192",type:"image/png"},{rel:"icon",url:"https://cf.kapil.app/images/website/favicons/favicon-32x32.png",sizes:"32x32",type:"image/png"},{rel:"manifest",url:"https://cf.kapil.app/images/website/favicons/manifest.json"}],icon:"https://cf.kapil.app/images/website/favicons/favicon-16x16.png"}},p=(...e)=>e.filter(Boolean).join(" ");function u({children:e}){return(0,i.jsx)("html",{lang:"en",className:p("text-black bg-white dark:text-white dark:bg-[#111010]",s().className),children:(0,i.jsx)("body",{className:"antialiased max-w-2xl mb-40 flex flex-col md:flex-row mx-4 mt-8 lg:mx-auto",children:(0,i.jsx)(l.Z,{children:(0,i.jsxs)("main",{className:"flex-auto min-w-0 mt-6 flex flex-col px-2 md:px-0",children:[(0,i.jsx)(o.w,{}),e]})})})})}n()}catch(e){n(e)}})},69319:(e,t,r)=>{"use strict";var n=r(4293);r.o(n,"notFound")&&r.d(t,{notFound:function(){return n.notFound}}),r.o(n,"redirect")&&r.d(t,{redirect:function(){return n.redirect}})},64872:(e,t,r)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"isNextRouterError",{enumerable:!0,get:function(){return a}});let n=r(41671),i=r(49925);function a(e){return(0,i.isRedirectError)(e)||(0,n.isNotFoundError)(e)}("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},4293:(e,t,r)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),function(e,t){for(var r in t)Object.defineProperty(e,r,{enumerable:!0,get:t[r]})}(t,{ReadonlyURLSearchParams:function(){return o},RedirectType:function(){return n.RedirectType},notFound:function(){return i.notFound},permanentRedirect:function(){return n.permanentRedirect},redirect:function(){return n.redirect},unstable_rethrow:function(){return a.unstable_rethrow}});let n=r(49925),i=r(41671),a=r(7850);class s extends Error{constructor(){super("Method unavailable on `ReadonlyURLSearchParams`. Read more: https://nextjs.org/docs/app/api-reference/functions/use-search-params#updating-searchparams")}}class o extends URLSearchParams{append(){throw new s}delete(){throw new s}set(){throw new s}sort(){throw new s}}("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},41671:(e,t)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),function(e,t){for(var r in t)Object.defineProperty(e,r,{enumerable:!0,get:t[r]})}(t,{isNotFoundError:function(){return i},notFound:function(){return n}});let r="NEXT_NOT_FOUND";function n(){let e=Error(r);throw e.digest=r,e}function i(e){return"object"==typeof e&&null!==e&&"digest"in e&&e.digest===r}("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},52041:(e,t)=>{"use strict";var r;Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"RedirectStatusCode",{enumerable:!0,get:function(){return r}}),function(e){e[e.SeeOther=303]="SeeOther",e[e.TemporaryRedirect=307]="TemporaryRedirect",e[e.PermanentRedirect=308]="PermanentRedirect"}(r||(r={})),("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},49925:(e,t,r)=>{"use strict";var n;Object.defineProperty(t,"__esModule",{value:!0}),function(e,t){for(var r in t)Object.defineProperty(e,r,{enumerable:!0,get:t[r]})}(t,{RedirectType:function(){return n},getRedirectError:function(){return l},getRedirectStatusCodeFromError:function(){return m},getRedirectTypeFromError:function(){return f},getURLFromRedirectError:function(){return p},isRedirectError:function(){return d},permanentRedirect:function(){return u},redirect:function(){return c}});let i=r(54580),a=r(72934),s=r(52041),o="NEXT_REDIRECT";function l(e,t,r){void 0===r&&(r=s.RedirectStatusCode.TemporaryRedirect);let n=Error(o);n.digest=o+";"+t+";"+e+";"+r+";";let a=i.requestAsyncStorage.getStore();return a&&(n.mutableCookies=a.mutableCookies),n}function c(e,t){void 0===t&&(t="replace");let r=a.actionAsyncStorage.getStore();throw l(e,t,(null==r?void 0:r.isAction)?s.RedirectStatusCode.SeeOther:s.RedirectStatusCode.TemporaryRedirect)}function u(e,t){void 0===t&&(t="replace");let r=a.actionAsyncStorage.getStore();throw l(e,t,(null==r?void 0:r.isAction)?s.RedirectStatusCode.SeeOther:s.RedirectStatusCode.PermanentRedirect)}function d(e){if("object"!=typeof e||null===e||!("digest"in e)||"string"!=typeof e.digest)return!1;let t=e.digest.split(";"),[r,n]=t,i=t.slice(2,-2).join(";"),a=Number(t.at(-2));return r===o&&("replace"===n||"push"===n)&&"string"==typeof i&&!isNaN(a)&&a in s.RedirectStatusCode}function p(e){return d(e)?e.digest.split(";").slice(2,-2).join(";"):null}function f(e){if(!d(e))throw Error("Not a redirect error");return e.digest.split(";",2)[1]}function m(e){if(!d(e))throw Error("Not a redirect error");return Number(e.digest.split(";").at(-2))}(function(e){e.push="push",e.replace="replace"})(n||(n={})),("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},7850:(e,t,r)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"unstable_rethrow",{enumerable:!0,get:function(){return function e(t){if((0,s.isNextRouterError)(t)||(0,a.isBailoutToCSRError)(t)||(0,n.isDynamicUsageError)(t)||(0,i.isPostpone)(t))throw t;t instanceof Error&&"cause"in t&&e(t.cause)}}});let n=r(22548),i=r(6866),a=r(76909),s=r(64872);("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},22548:(e,t,r)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"isDynamicUsageError",{enumerable:!0,get:function(){return o}});let n=r(57378),i=r(76909),a=r(64872),s=r(38826),o=e=>(0,n.isDynamicServerError)(e)||(0,i.isBailoutToCSRError)(e)||(0,a.isNextRouterError)(e)||(0,s.isDynamicPostpone)(e)},6866:(e,t)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"isPostpone",{enumerable:!0,get:function(){return n}});let r=Symbol.for("react.postpone");function n(e){return"object"==typeof e&&null!==e&&e.$$typeof===r}},76909:(e,t)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),function(e,t){for(var r in t)Object.defineProperty(e,r,{enumerable:!0,get:t[r]})}(t,{BailoutToCSRError:function(){return n},isBailoutToCSRError:function(){return i}});let r="BAILOUT_TO_CLIENT_SIDE_RENDERING";class n extends Error{constructor(e){super("Bail out to client-side rendering: "+e),this.reason=e,this.digest=r}}function i(e){return"object"==typeof e&&null!==e&&"digest"in e&&e.digest===r}},32136:()=>{}};