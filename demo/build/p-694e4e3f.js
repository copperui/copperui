var e,r=function(e,r,t,o){if("a"===t&&!o)throw new TypeError("Private accessor was defined without a getter");if("function"==typeof r?e!==r||!o:!r.has(e))throw new TypeError("Cannot read private member from an object whose class did not declare it");return"m"===t?o:"a"===t?o.call(e):o?o.value:r.get(e)};class t{constructor(){e.set(this,new Set)}add(t){r(this,e,"f").add(t)}run(){for(const t of r(this,e,"f"))t(),r(this,e,"f").delete(t);return Promise.resolve()}}e=new WeakMap;export{t as C}