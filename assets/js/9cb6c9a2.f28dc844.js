"use strict";(self.webpackChunk_copperui_docs=self.webpackChunk_copperui_docs||[]).push([[365],{2599:(e,t,a)=>{a.d(t,{Z:()=>l});var r=a(7378),n=a(8944);const o="tabItem_wHwb";function l(e){let{children:t,hidden:a,className:l}=e;return r.createElement("div",{role:"tabpanel",className:(0,n.Z)(o,l),hidden:a},t)}},7698:(e,t,a)=>{a.d(t,{Z:()=>m});var r=a(5773),n=a(7378),o=a(8944),l=a(362),s=a(56),c=a(5720),i=a(9169);const u="tabList_J5MA",p="tabItem_l0OV";function b(e){const{lazy:t,block:a,defaultValue:l,values:b,groupId:m,className:d}=e,f=n.Children.map(e.children,(e=>{if((0,n.isValidElement)(e)&&"value"in e.props)return e;throw new Error(`Docusaurus error: Bad <Tabs> child <${"string"==typeof e.type?e.type:e.type.name}>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.`)})),v=b??f.map((e=>{let{props:{value:t,label:a,attributes:r}}=e;return{value:t,label:a,attributes:r}})),x=(0,s.l)(v,((e,t)=>e.value===t.value));if(x.length>0)throw new Error(`Docusaurus error: Duplicate values "${x.map((e=>e.value)).join(", ")}" found in <Tabs>. Every value needs to be unique.`);const g=null===l?l:l??f.find((e=>e.props.default))?.props.value??f[0].props.value;if(null!==g&&!v.some((e=>e.value===g)))throw new Error(`Docusaurus error: The <Tabs> has a defaultValue "${g}" but none of its children has the corresponding value. Available values are: ${v.map((e=>e.value)).join(", ")}. If you intend to show no default tab, use defaultValue={null} instead.`);const{tabGroupChoices:y,setTabGroupChoices:h}=(0,c.U)(),[T,k]=(0,n.useState)(g),O=[],{blockElementScrollPositionUntilNextRender:w}=(0,i.o5)();if(null!=m){const e=y[m];null!=e&&e!==T&&v.some((t=>t.value===e))&&k(e)}const E=e=>{const t=e.currentTarget,a=O.indexOf(t),r=v[a].value;r!==T&&(w(t),k(r),null!=m&&h(m,String(r)))},P=e=>{let t=null;switch(e.key){case"Enter":E(e);break;case"ArrowRight":{const a=O.indexOf(e.currentTarget)+1;t=O[a]??O[0];break}case"ArrowLeft":{const a=O.indexOf(e.currentTarget)-1;t=O[a]??O[O.length-1];break}}t?.focus()};return n.createElement("div",{className:(0,o.Z)("tabs-container",u)},n.createElement("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,o.Z)("tabs",{"tabs--block":a},d)},v.map((e=>{let{value:t,label:a,attributes:l}=e;return n.createElement("li",(0,r.Z)({role:"tab",tabIndex:T===t?0:-1,"aria-selected":T===t,key:t,ref:e=>O.push(e),onKeyDown:P,onClick:E},l,{className:(0,o.Z)("tabs__item",p,l?.className,{"tabs__item--active":T===t})}),a??t)}))),t?(0,n.cloneElement)(f.filter((e=>e.props.value===T))[0],{className:"margin-top--md"}):n.createElement("div",{className:"margin-top--md"},f.map(((e,t)=>(0,n.cloneElement)(e,{key:t,hidden:e.props.value!==T})))))}function m(e){const t=(0,l.Z)();return n.createElement(b,(0,r.Z)({key:String(t)},e))}},6675:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>u,contentTitle:()=>c,default:()=>m,frontMatter:()=>s,metadata:()=>i,toc:()=>p});var r=a(5773),n=(a(7378),a(5318)),o=a(7698),l=a(2599);const s={sidebar_position:3},c="Uso",i={unversionedId:"comecar-agora/uso",id:"comecar-agora/uso",title:"Uso",description:"Exemplo de uso do componente brx-tabs",source:"@site/docs/comecar-agora/uso.mdx",sourceDirName:"comecar-agora",slug:"/comecar-agora/uso",permalink:"/docs/comecar-agora/uso",draft:!1,editUrl:"https://github.com/copperui/copperui/tree/next/docs/comecar-agora/uso.mdx",tags:[],version:"current",sidebarPosition:3,frontMatter:{sidebar_position:3},sidebar:"tutorialSidebar",previous:{title:"Instala\xe7\xe3o",permalink:"/docs/comecar-agora/instalacao"},next:{title:"Aprender",permalink:"/docs/comecar-agora/aprender"}},u={},p=[{value:"Exemplo de uso do componente brx-tabs",id:"exemplo-de-uso-do-componente-brx-tabs",level:2}],b={toc:p};function m(e){let{components:t,...a}=e;return(0,n.kt)("wrapper",(0,r.Z)({},b,a,{components:t,mdxType:"MDXLayout"}),(0,n.kt)("h1",{id:"uso"},"Uso"),(0,n.kt)("h2",{id:"exemplo-de-uso-do-componente-brx-tabs"},"Exemplo de uso do componente brx-tabs"),(0,n.kt)(o.Z,{mdxType:"Tabs"},(0,n.kt)(l.Z,{value:"html",label:"HTML",mdxType:"TabItem"},(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-html"},'<brx-tabs name="exemplo-html">\n  <brx-tab value="tab-todos" tooltip-text="Todos" icon-name="fa5/fas/image"></brx-tab>\n  <brx-tab value="tab-noticias" tooltip-text="Not\xedcias" icon-name="fa5/fas/image" active></brx-tab>\n</brx-tabs>\n\n<brx-tabs-panels name="exemplo-html">\n  <brx-tabs-panel value="tab-todos">\n    <p>Painel Todos</p>\n  </brx-tabs-panel>\n  <brx-tabs-panel value="tab-noticias" active>\n    <p>Painel Noticias</p>\n  </brx-tabs-panel>\n</brx-tabs-panels>\n'))),(0,n.kt)(l.Z,{value:"react",label:"React",mdxType:"TabItem"},(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-tsx"},"import '@copperui/core/dist/copperui/copperui.css';\n")),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-tsx"},'import { BrxTabs, BrxTab, BrxTabsPanels, BrxTabsPanel } from \'@copperui/react\';\n\nexport function UsoTabs() {\n  return (\n    <>\n      <BrxTabs name="exemplo-react">\n        <BrxTab value="tab-todos" tooltipText="Todos" iconName="fa5/fas/image"></BrxTab>\n        <BrxTab value="tab-noticias" tooltipText="Not\xedcias" iconName="fa5/fas/image" active></BrxTab>\n      </BrxTabs>\n\n      <BrxTabsPanels name="exemplo-react">\n        <BrxTabsPanel value="tab-todos">\n          <p>Painel Todos</p>\n        </BrxTabsPanel>\n        <BrxTabsPanel value="tab-noticias" active>\n          <p>Painel Noticias</p>\n        </BrxTabsPanel>\n      </BrxTabsPanels>\n    </>\n  );\n}\n')))))}m.isMDXComponent=!0},5318:(e,t,a)=>{a.d(t,{Zo:()=>u,kt:()=>d});var r=a(7378);function n(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function o(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,r)}return a}function l(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?o(Object(a),!0).forEach((function(t){n(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):o(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function s(e,t){if(null==e)return{};var a,r,n=function(e,t){if(null==e)return{};var a,r,n={},o=Object.keys(e);for(r=0;r<o.length;r++)a=o[r],t.indexOf(a)>=0||(n[a]=e[a]);return n}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)a=o[r],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(n[a]=e[a])}return n}var c=r.createContext({}),i=function(e){var t=r.useContext(c),a=t;return e&&(a="function"==typeof e?e(t):l(l({},t),e)),a},u=function(e){var t=i(e.components);return r.createElement(c.Provider,{value:t},e.children)},p="mdxType",b={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},m=r.forwardRef((function(e,t){var a=e.components,n=e.mdxType,o=e.originalType,c=e.parentName,u=s(e,["components","mdxType","originalType","parentName"]),p=i(a),m=n,d=p["".concat(c,".").concat(m)]||p[m]||b[m]||o;return a?r.createElement(d,l(l({ref:t},u),{},{components:a})):r.createElement(d,l({ref:t},u))}));function d(e,t){var a=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var o=a.length,l=new Array(o);l[0]=m;var s={};for(var c in t)hasOwnProperty.call(t,c)&&(s[c]=t[c]);s.originalType=e,s[p]="string"==typeof e?e:n,l[1]=s;for(var i=2;i<o;i++)l[i]=a[i];return r.createElement.apply(null,l)}return r.createElement.apply(null,a)}m.displayName="MDXCreateElement"}}]);