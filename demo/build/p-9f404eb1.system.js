var __spreadArray=this&&this.__spreadArray||function(r,t,n){if(n||arguments.length===2)for(var e=0,a=t.length,i;e<a;e++){if(i||!(e in t)){if(!i)i=Array.prototype.slice.call(t,0,e);i[e]=t[e]}}return r.concat(i||Array.prototype.slice.call(t))};System.register([],(function(r){"use strict";return{execute:function(){var t=r("w",(function(r){return new Promise((function(t){return setTimeout(t,r)}))}));var n=r("m",(function(r,t,n){return Math.max(Math.min(r,n),t)}));var e=r("a",(function(){return window}));var a=r("d",(function(r,t){return r.includes(t)?r.filter((function(r){return r!==t})):__spreadArray(__spreadArray([],r,true),[t],false)}));var i=r("c",(function(r){return Array.isArray(r)?r:[r]}));var o=r("e",(function(r,t){var n=e();if(n&&"requestIdleCallback"in n){n.requestIdleCallback(r,t)}else{setTimeout(r,(t===null||t===void 0?void 0:t.timeout)+1)}}));var u=r("b",(function(r,t){var n;if(r){if(typeof r==="string"){var a=t!==null&&t!==void 0?t:(n=e())===null||n===void 0?void 0:n.document;return a.querySelector(r)}else{return r}}return null}));var l=r("f",(function(r,t,n){if(n===void 0){n=["child"]}var a,i,o;var u=[];var l=t!==null&&t!==void 0?t:(a=e())===null||a===void 0?void 0:a.document.documentElement;if(n.includes("child")){u.push.apply(u,Array.from((i=l.querySelectorAll(r))!==null&&i!==void 0?i:[]))}if(n.includes("parent")){var c=l;while(c!==null){var f=(o=c.closest(r))!==null&&o!==void 0?o:null;c=f;if(c){u.push(f)}}}if(n.includes("self")){if(l.matches(r)){u.push(l)}}return u}));var c=0;var f=r("g",(function(r){if(r===void 0){r=0}var t=parseInt((Math.random()*Math.pow(10,15+r)).toString()).toString(16).toUpperCase();return"wid_".concat(++c,"-").concat(Date.now(),"-").concat(t)}));var v=r("t",(function(r){if(typeof r==="string"){try{return JSON.parse(r)}catch(r){}}return r}));var s=r("p",(function(r){r.preventDefault();r.stopPropagation()}));var d=r("i",(function(r){var t="";var n=["KB","MB","GB","TB"];for(var e=0,a=r/1024;a>1;a/=1024,e++){t="".concat(a.toFixed(2)," ").concat(n[e])}return t}));var p=r("h",(function(r){var t=new ClipboardEvent("").clipboardData||new DataTransfer;var n=r.length;for(var e=0;e<n;e++){t.items.add(r[e])}return t.files}))}}}));