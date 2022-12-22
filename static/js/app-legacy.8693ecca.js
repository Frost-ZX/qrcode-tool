(function(){var e={9984:function(e,t,n){"use strict";n(8984),n(1711),n(3883),n(9630);var r=n(2181),o=n(9953),a=n(8165),c=n(8204),l=n(6442),u=n(6034),i=n(191),s=n(4367),d=n(6054),f=n(3683),m=n(6623),p=n(7524);n(9910);function g(e){return e.use(o.i).use(a.z).use(c.II).use(l.R).use(u.g).use(i.G).use(s.Ph).use(d.Z).use(f.z).use(f.e).use(m.u).use(p.g)}var v=n(5966),h={generate:"Generator",parse:"Reader",qrcode:"QR Code",btnCopy:"Copy",btnCopyDesc:"Copy Preview URL",btnGenerate:"Generate",btnGenerateDesc:"Generate QR Code",codeColor:"Color",codeContent:"Content",codeImagePick:"Select Image",codeImageResult:"Result",codeImageTips:"The QR code image can be copied and pasted here (Ctrl+V) for parsing.",codePreview:"Preview",codeSize:"Size",codeTips:"You may parse the QR code by long pressing it on the mobile.",setColorBackground:"Background Color: ",setColorForeground:"Foreground Color: ",setMargin:"Margin: ",setSize:"Size: "},b=h,w={generate:"生成",parse:"解析",qrcode:"二维码",btnCopy:"复制",btnCopyDesc:"复制二维码预览地址",btnGenerate:"生成",btnGenerateDesc:"生成二维码",codeColor:"颜色",codeContent:"内容",codeImagePick:"选择图片",codeImageResult:"识别结果",codeImageTips:"支持复制二维码图片后直接在此处粘贴（Ctrl + V）进行解析。",codePreview:"预览",codeSize:"大小",codeTips:"若您在移动端访问，可尝试长按识别。",setColorBackground:"背景颜色：",setColorForeground:"前景颜色：",setMargin:"边距：",setSize:"尺寸："},U=w,y=localStorage.getItem("APP_LOCALE")||"zh",S=(0,v.o)({locale:y,fallbackLocale:"zh",legacy:!1,messages:{en:b,zh:U}});function k(e){return e.use(S)}var C=n(6492),_=n(9994),x=n(2185),L=n(4790),R=n(3482),z=n(8941),F=n(1128),I=(n(2553),n(1025),n(8897),n(8902),n(1603),n(8129),n(8187)),D=(n(1827),n(4936),n(9804),n(9914),n(2282),n(4461),n(9949),n(7525),n(1080),n(7888),n(1940),n(5769),n(5825),n(5752),n(8489),n(1414),n(8796),n(1875),n(7612),n(239),n(3337),n(4290),n(3192),n(2272),n(7957),n(4826),n(716),n(9829),n(2824),n(4603),n(9489),n(9609),n(4233),n(9125),n(5292),n(8138),n(2511),n(5806)),P=n(7216),V=n(2775);function T(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"info",t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return(0,V.Z)(e,(0,I.Z)({content:"",duration:2e3},t))}function O(e){if(!e)return console.error("转换失败：参数为空"),null;try{var t=e.split(","),n=t[0].match(/:(.*?);/)[1],r=atob(t[1]),o=r.length,a=new Uint8Array(o);while(o-- >0)a[o]=r.charCodeAt(o);return new Blob([a],{type:n})}catch(c){return console.error("转换失败，可能是参数错误："),console.error(c),null}}function j(e){return e?new Promise((function(t){var n=new Image;n.onerror=function(){console.error("转换失败：参数错误"),t(null)},n.onload=function(){t(n)},n.src=e})):(console.error("转换失败：参数为空"),Promise.resolve(null))}function W(){return q.apply(this,arguments)}function q(){return q=(0,F.Z)((0,z.Z)().mark((function e(){var t,n,r,o,a,c,l,u,i,s,d,f=arguments;return(0,z.Z)().wrap((function(e){while(1)switch(e.prev=e.next){case 0:return t=f.length>0&&void 0!==f[0]?f[0]:{},n=t.colorBackground,r=void 0===n?"#FFFFFF":n,o=t.colorForeground,a=void 0===o?"#000000":o,c=t.margin,l=void 0===c?10:c,u=t.size,i=void 0===u?256:u,s=t.text,d=void 0===s?"":s,e.abrupt("return",new D.AwesomeQR({autoColor:!1,colorDark:"#000000",colorLight:"#FFFFFF",components:{alignment:{scale:1,protectors:!1},cornerAlignment:{scale:1,protectors:!0},data:{scale:1},timing:{scale:1,protectors:!1}},correctLevel:D.QRErrorCorrectLevel.M,margin:l,size:i,text:d,whiteMargin:!1}).draw().then((function(e){if(!e)return{error:new Error("生成结果为空"),result:null,success:!1};var t=Z(r),n=Z(a),o=document.createElement("canvas"),c=o.getContext("2d");return o.width=i,o.height=i,j(e).then((function(e){if(!e)return null;c.drawImage(e,0,0);for(var r=c.getImageData(0,0,i,i),a=r.data,l=0;l<a.length;l+=4){var u=a[l],s=a[l+1],d=a[l+2],f=u+s+d;switch(f){case 765:a[l]=t[0],a[l+1]=t[1],a[l+2]=t[2],a[l+3]=255;break;case 0:a[l]=n[0],a[l+1]=n[1],a[l+2]=n[2],a[l+3]=255;break;default:a[l]=n[0],a[l+1]=n[1],a[l+2]=n[2],a[l+3]=128;break}}return c.putImageData(r,0,0),j(o.toDataURL("image/png"))})).then((function(e){return e?(c.fillStyle=r,c.fillRect(0,0,i,i),c.drawImage(e,0,0),{error:null,result:o.toDataURL("image/png"),success:!0}):{error:null,result:null,success:!1}}))}))["catch"]((function(e){return{error:e,result:null,success:!1}})));case 3:case"end":return e.stop()}}),e)}))),q.apply(this,arguments)}function Z(e){if(!e)return console.error("转换失败：缺少参数"),[0,0,0,0];var t=document.createElement("canvas"),n=null;t.width=1,t.height=1,n=t.getContext("2d"),n.fillStyle=e,n.fillRect(0,0,1,1);try{var r=n.getImageData(0,0,1,1),o=r.data;return[o[0],o[1],o[2],o[3]]}catch(a){return console.error("转换失败："),console.error(a),[0,0,0,0]}}function E(){var e=location.search,t=(0,P.parse)(e,{charset:"utf-8",ignoreQueryPrefix:!0});return t}function G(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return(0,P.stringify)(e,{charset:"utf-8",addQueryPrefix:!1})}var Q={class:"qr-encode"},A=["alt","src"],B={class:"config-item"},M={class:"label"},H={class:"config-item"},K={class:"label"},X={class:"config-item"},Y={class:"config-item"},J={__name:"CodeGenerator",props:{readonly:{type:Boolean,default:!1}},setup:function(e){var t=(0,v.QT)().t,n=(0,_.Um)({codeSize:0,codeURL:"",readonly:!1,colorBackground:"#FFFFFF",colorForeground:"#000000",margin:10,size:256,text:""}),o=(0,C.Fl)((function(){return!n.readonly}));function a(){var e=E(),t=e.readonly,r=void 0===t?"0":t,o=e.text,a=void 0===o?"":o;n.readonly="1"===r,n.text=a}function c(){var e=location.origin,t=location.pathname,r=G({readonly:"1",text:n.text}),o="".concat(e).concat(t,"?").concat(r);navigator.clipboard.writeText(o).then((function(){T("success",{content:"复制成功"})}))["catch"]((function(){T("error",{content:"复制失败，可能是没有权限"})}))}function l(){return u.apply(this,arguments)}function u(){return u=(0,F.Z)((0,z.Z)().mark((function e(){var t,r,o,a,c,l;return(0,z.Z)().wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,W(n);case 2:t=e.sent,r=t.error,o=t.result,a=t.success,a||(console.error("生成二维码失败："),console.error(r)),c=O(o),l=c?URL.createObjectURL(c):null,n.codeURL&&URL.revokeObjectURL(n.codeURL),n.codeSize=n.size,n.codeURL=l;case 12:case"end":return e.stop()}}),e)}))),u.apply(this,arguments)}return(0,C.wF)((function(){a()})),(0,C.bv)((function(){l()})),function(e,a){var u=(0,C.up)("t-button"),i=(0,C.up)("t-tooltip"),s=(0,C.up)("t-card"),d=(0,C.up)("t-textarea"),f=(0,C.up)("t-color-picker"),m=(0,C.up)("t-input-number");return(0,C.wg)(),(0,C.iD)("div",Q,[(0,C.Wm)(s,{class:"content-card code-result",bordered:!1,"header-bordered":!0,shadow:!0,title:(0,_.SU)(t)("codePreview")},(0,C.Nv)({default:(0,C.w5)((function(){return[(0,C._)("div",{class:"code-image-wrapper",style:(0,x.j5)({"--code-size":(0,_.SU)(n).codeSize})},[(0,_.SU)(n).codeURL?((0,C.wg)(),(0,C.iD)("img",{key:0,class:"code-image",alt:(0,_.SU)(t)("qrcode"),src:(0,_.SU)(n).codeURL},null,8,A)):(0,C.kq)("",!0)],4),(0,C.wy)((0,C._)("div",{class:"code-tips"},(0,x.zw)((0,_.SU)(t)("codeTips")),513),[[r.F8,(0,_.SU)(n).readonly]])]})),_:2},[(0,_.SU)(o)?{name:"actions",fn:(0,C.w5)((function(){return[(0,C.Wm)(i,{content:(0,_.SU)(t)("btnGenerateDesc")},{default:(0,C.w5)((function(){return[(0,C.Wm)(u,{theme:"primary",variant:"text",onClick:l},{default:(0,C.w5)((function(){return[(0,C.Uk)((0,x.zw)((0,_.SU)(t)("btnGenerate")),1)]})),_:1})]})),_:1},8,["content"]),(0,C.Wm)(i,{content:(0,_.SU)(t)("btnCopyDesc")},{default:(0,C.w5)((function(){return[(0,C.Wm)(u,{theme:"primary",variant:"text",onClick:c},{default:(0,C.w5)((function(){return[(0,C.Uk)((0,x.zw)((0,_.SU)(t)("btnCopy")),1)]})),_:1})]})),_:1},8,["content"])]})),key:"0"}:void 0]),1032,["title"]),(0,_.SU)(o)?((0,C.wg)(),(0,C.j4)(s,{key:0,class:"content-card set-text",bordered:!1,"header-bordered":!0,shadow:!0,title:(0,_.SU)(t)("codeContent")},{default:(0,C.w5)((function(){return[(0,C.Wm)(d,{modelValue:(0,_.SU)(n).text,"onUpdate:modelValue":a[0]||(a[0]=function(e){return(0,_.SU)(n).text=e})},null,8,["modelValue"])]})),_:1},8,["title"])):(0,C.kq)("",!0),(0,_.SU)(o)?((0,C.wg)(),(0,C.j4)(s,{key:1,class:"content-card set-color",bordered:!1,"header-bordered":!0,shadow:!0,title:(0,_.SU)(t)("codeColor")},{default:(0,C.w5)((function(){return[(0,C._)("div",B,[(0,C._)("span",M,(0,x.zw)((0,_.SU)(t)("setColorForeground")),1),(0,C.Wm)(f,{modelValue:(0,_.SU)(n).colorForeground,"onUpdate:modelValue":a[1]||(a[1]=function(e){return(0,_.SU)(n).colorForeground=e}),"color-modes":["monochrome"],"recent-colors":null,format:"HEX"},null,8,["modelValue"])]),(0,C._)("div",H,[(0,C._)("span",K,(0,x.zw)((0,_.SU)(t)("setColorBackground")),1),(0,C.Wm)(f,{modelValue:(0,_.SU)(n).colorBackground,"onUpdate:modelValue":a[2]||(a[2]=function(e){return(0,_.SU)(n).colorBackground=e}),"color-modes":["monochrome"],"recent-colors":null,format:"HEX"},null,8,["modelValue"])])]})),_:1},8,["title"])):(0,C.kq)("",!0),(0,_.SU)(o)?((0,C.wg)(),(0,C.j4)(s,{key:2,class:"content-card set-size",bordered:!1,"header-bordered":!0,shadow:!0,title:(0,_.SU)(t)("codeSize")},{default:(0,C.w5)((function(){return[(0,C._)("div",X,[(0,C.Wm)(m,{modelValue:(0,_.SU)(n).size,"onUpdate:modelValue":a[3]||(a[3]=function(e){return(0,_.SU)(n).size=e}),theme:"column","allow-input-over-limit":!1,"decimal-places":0,min:128,max:1024,step:1,label:(0,_.SU)(t)("setSize")},null,8,["modelValue","label"])]),(0,C._)("div",Y,[(0,C.Wm)(m,{modelValue:(0,_.SU)(n).margin,"onUpdate:modelValue":a[4]||(a[4]=function(e){return(0,_.SU)(n).margin=e}),theme:"column","allow-input-over-limit":!1,"decimal-places":0,min:0,max:100,step:1,label:(0,_.SU)(t)("setMargin")},null,8,["modelValue","label"])])]})),_:1},8,["title"])):(0,C.kq)("",!0)])}}},N=n(1164);const $=(0,N.Z)(J,[["__scopeId","data-v-9b62ab88"]]);var ee=$,te=(n(9694),n(7747),n(7)),ne=n.n(te),re={class:"qr-decode"},oe={class:"code-tips"},ae={__name:"CodeReader",setup:function(e){var t=(0,v.QT)().t,n=(0,_.Um)({files:[],imageURL:"",text:""});function r(e){var t=e.clipboardData,n=t?t.items:null,r=null;if(n){for(var a=0;a<n.length;a++){var c=n[a];if("file"===c.kind&&c.type.includes("image/")){r=c.getAsFile();break}}r?o({raw:r}):T("warning",{content:"剪贴板中没有图片",duration:2e3})}}function o(e){if(!e)return Promise.resolve({error:"参数错误",status:"fail"});var t=e.raw,r=URL.createObjectURL(t);return n.imageURL&&URL.revokeObjectURL(n.imageURL),n.imageURL=r,a(r),Promise.resolve({status:"success",response:{url:r}})}function a(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",t=document.createElement("canvas"),r=null,o=new Image;o.onload=function(){var e=o.naturalWidth,a=o.naturalHeight;t.width=e,t.height=a,r=t.getContext("2d"),r.drawImage(o,0,0);var c=r.getImageData(0,0,e,a),l=ne()(c.data,e,a);l?(T("success",{content:"解析成功",duration:2e3}),n.text=l.data):(T("warning",{content:"未在图片中识别到二维码",duration:2e3}),n.text="")},o.src=e}return(0,C.bv)((function(){document.addEventListener("paste",r)})),(0,C.Jd)((function(){document.removeEventListener("paste",r)})),function(e,r){var a=(0,C.up)("t-upload"),c=(0,C.up)("t-card"),l=(0,C.up)("t-textarea");return(0,C.wg)(),(0,C.iD)("div",re,[(0,C.Wm)(c,{class:"content-card code-picker",bordered:!1,"header-bordered":!0,shadow:!0,title:(0,_.SU)(t)("codeImagePick")},{default:(0,C.w5)((function(){return[(0,C.Wm)(a,{modelValue:(0,_.SU)(n).files,"onUpdate:modelValue":r[0]||(r[0]=function(e){return(0,_.SU)(n).files=e}),accept:"image/*",theme:"image","auto-upload":!0,multiple:!1,"request-method":o,draggable:""},null,8,["modelValue"]),(0,C._)("div",oe,[(0,C._)("span",null,(0,x.zw)((0,_.SU)(t)("codeImageTips")),1)])]})),_:1},8,["title"]),(0,C.Wm)(c,{class:"content-card code-result",bordered:!1,"header-bordered":!0,shadow:!0,title:(0,_.SU)(t)("codeImageResult")},{default:(0,C.w5)((function(){return[(0,C.Wm)(l,{modelValue:(0,_.SU)(n).text,"onUpdate:modelValue":r[1]||(r[1]=function(e){return(0,_.SU)(n).text=e}),readonly:""},null,8,["modelValue"])]})),_:1},8,["title"])])}}};const ce=(0,N.Z)(ae,[["__scopeId","data-v-2459c4ba"]]);var le=ce,ue={class:"app-header"},ie={class:"app-wrapper"},se=["textContent","onClick"],de=(0,C._)("div",{class:"placeholder"},null,-1),fe={class:"label"},me=(0,C._)("span",{class:"icon mdi mdi-earth"},null,-1),pe={__name:"App",setup:function(e){var t=(0,v.QT)(),n=t.locale,r=t.t,o=(0,_.Um)({currTabComponent:null,currTabKey:"",tDesignLocale:null}),a=(0,_.Xl)([{key:"encode",label:"generate",c:ee},{key:"decode",label:"parse",c:le}]);function c(){var e=n.value;n.value="zh"===e?"en":"zh",u()}function l(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};o.currTabComponent=e.c,o.currTabKey=e.key}function u(){var e=n.value;o.tDesignLocale="en"===e?L.Z:R.Z,localStorage.setItem("APP_LOCALE",e)}return(0,C.wF)((function(){u()})),(0,C.bv)((function(){l(a[0])})),function(e,t){var u=(0,C.up)("t-config-provider");return(0,C.wg)(),(0,C.iD)(C.HY,null,[(0,C._)("div",ue,[(0,C._)("div",ie,[((0,C.wg)(!0),(0,C.iD)(C.HY,null,(0,C.Ko)((0,_.SU)(a),(function(e){return(0,C.wg)(),(0,C.iD)("div",{textContent:(0,x.zw)((0,_.SU)(r)(e.label)),key:e.key,class:(0,x.C_)([{active:(0,_.SU)(o).currTabKey===e.key},"tab-item"]),onClick:function(t){return l(e)}},null,10,se)})),128)),de,(0,C._)("div",{class:"locale",onClick:c},[(0,C._)("span",fe,(0,x.zw)((0,_.SU)(n)),1),me])])]),(0,C.Wm)(u,{class:"app-content","global-config":(0,_.SU)(o).tDesignLocale},{default:(0,C.w5)((function(){return[(0,_.SU)(o).currTabComponent?((0,C.wg)(),(0,C.j4)((0,C.LL)((0,_.SU)(o).currTabComponent),{key:0,class:"app-wrapper"})):(0,C.kq)("",!0)]})),_:1},8,["global-config"])],64)}}};const ge=pe;var ve=ge,he=(0,r.ri)(ve);g(he),k(he),he.mount("#app")},1129:function(){}},t={};function n(r){var o=t[r];if(void 0!==o)return o.exports;var a=t[r]={exports:{}};return e[r].call(a.exports,a,a.exports,n),a.exports}n.m=e,function(){var e=[];n.O=function(t,r,o,a){if(!r){var c=1/0;for(s=0;s<e.length;s++){r=e[s][0],o=e[s][1],a=e[s][2];for(var l=!0,u=0;u<r.length;u++)(!1&a||c>=a)&&Object.keys(n.O).every((function(e){return n.O[e](r[u])}))?r.splice(u--,1):(l=!1,a<c&&(c=a));if(l){e.splice(s--,1);var i=o();void 0!==i&&(t=i)}}return t}a=a||0;for(var s=e.length;s>0&&e[s-1][2]>a;s--)e[s]=e[s-1];e[s]=[r,o,a]}}(),function(){n.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return n.d(t,{a:t}),t}}(),function(){n.d=function(e,t){for(var r in t)n.o(t,r)&&!n.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})}}(),function(){n.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}}(),function(){n.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}}(),function(){var e={143:0};n.O.j=function(t){return 0===e[t]};var t=function(t,r){var o,a,c=r[0],l=r[1],u=r[2],i=0;if(c.some((function(t){return 0!==e[t]}))){for(o in l)n.o(l,o)&&(n.m[o]=l[o]);if(u)var s=u(n)}for(t&&t(r);i<c.length;i++)a=c[i],n.o(e,a)&&e[a]&&e[a][0](),e[a]=0;return n.O(s)},r=self["webpackChunkqrcode_tool"]=self["webpackChunkqrcode_tool"]||[];r.forEach(t.bind(null,0)),r.push=t.bind(null,r.push.bind(r))}();var r=n.O(void 0,[998],(function(){return n(9984)}));r=n.O(r)})();