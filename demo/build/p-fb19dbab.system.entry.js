System.register(["./p-ff939259.system.js","./p-9f404eb1.system.js"],(function(t){"use strict";var n,r,i,o;return{setters:[function(t){n=t.r;r=t.h;i=t.a},function(t){o=t.g}],execute:function(){var e=":host{display:block}";var s=t("brx_pagination_ellipsis",function(){function t(t){n(this,t);this.dropdownId=undefined}t.prototype.componentWillLoad=function(){if(!this.dropdownId){this.dropdownId=o()}};t.prototype.render=function(){var t=this.dropdownId;var n="Abrir listagem.";return r(i,null,r("brx-dropdown",null,r("brx-dropdown-trigger",{target:"#".concat(t)},r("brx-button",{circle:true,type:"button","aria-label":n,title:n},r("brx-icon",{name:"fa5/fas/ellipsis-h"}))),r("div",{class:"brx-pagination-ellipsis-dropdown-content",id:t,hidden:true},r("slot",null))))};return t}());s.style=e}}}));