!function(){"use strict";var t="/speed-form/".replace(/([^/])$/,"$1/"),e=location.pathname,n=e.startsWith(t)&&decodeURI("/".concat(e.slice(t.length)));if(n){var a=document,c=a.head,r=a.createElement.bind(a),i=function(t,e,n){var a,c=e.r[t]||(null===(a=Object.entries(e.r).find((function(e){var n=e[0];return new RegExp("^".concat(n.replace(/\/:[^/]+/g,"/[^/]+").replace("/*","/.+"),"$")).test(t)})))||void 0===a?void 0:a[1]);return null==c?void 0:c.map((function(t){var a=e.f[t][1],c=e.f[t][0];return{type:c.split(".").pop(),url:"".concat(n.publicPath).concat(c),attrs:[["data-".concat(e.b),"".concat(e.p,":").concat(a)]]}}))}(n,{"p":"speedform-docs","b":"webpack","f":[["docs__reactive__computed-async.md.33ef7f92.async.js",1],["docs__core__field-render.md.d77c2731.async.js",5],["nm__dumi__dist__client__pages__Demo__index.578aa5c0.chunk.css",9],["nm__dumi__dist__client__pages__Demo__index.c515d8d8.async.js",9],["docs__core__field-group.md.df1732b4.async.js",33],["nm__dumi__dist__client__pages__404.8b85f2d9.chunk.css",65],["nm__dumi__dist__client__pages__404.1e63e7af.async.js",65],["docs__core__question.md.354f4f74.async.js",74],["docs__reactive__watch-objects.md.6677c852.async.js",75],["docs__reactive__watch-use.md.800f7ba3.async.js",112],["docs__reactive__computed-options.md.2afa0549.async.js",137],["docs__core__quick-start.md.6a218232.async.js",164],["docs__reactive__computed-objects.md.d4fce4ce.async.js",244],["docs__reactive__computed-sync.md.99a3fcda.async.js",252],["docs__core__index.md.3c1f5de9.async.js",290],["docs__reactive__store.md.5e111b1d.async.js",396],["docs__core__field-validate.md.664fa3d8.async.js",401],["docs__core__example-login.md.b7ceb6bc.async.js",512],["nm__dumi__theme-default__layouts__DocLayout__index.2ccd023f.async.js",519],["docs__core__form-validate.md.56d7fe36.async.js",534],["docs__core__history.md.bc70f90c.async.js",540],["docs__api__index.md.ef5e6e4d.async.js",546],["docs__render__index.md.445f4e86.async.js",597],["docs__reactive__computed-intro.md.5b897c2e.async.js",609],["docs__core__form-create.md.94c39ed3.async.js",616],["docs__core__field-dirty.md.3862a42a.async.js",684],["docs__core__form-submit.md.3504f46e.async.js",689],["708.e8c51481.chunk.css",708],["708.37f51141.async.js",708],["docs__reactive__state.md.8bab6d83.async.js",790],["docs__core__example-captcha.md.040284d4.async.js",865],["docs__core__field-related.md.30f486f0.async.js",877],["docs__core__form-action.md.c372a992.async.js",901],["docs__core__form-dirty.md.425bd6cf.async.js",910],["docs__reactive__watch.md.6cca67ea.async.js",920],["docs__reactive__watch-computed-diff.md.655b0dc6.async.js",921],["dumi__tmp-production__dumi__theme__ContextWrapper.bfbf97ad.async.js",923],["docs__core__field.md.6cd7838d.async.js",925],["docs__index.md.39e2734c.async.js",935],["docs__reactive__index.md.47843b23.async.js",943],["docs__reactive__render.md.9ce3e503.async.js",952],["docs__core__install.md.d2e46121.async.js",985]],"r":{"/*":[5,6,18,27,28,36],"/":[38,18,27,28,36],"/reactive":[39,18,27,28,36],"/render":[22,18,27,28,36],"/core":[14,18,27,28,36],"/api":[21,18,27,28,36],"/~demos/:id":[2,3,36],"/reactive/watch-computed-diff":[35,18,27,28,36],"/reactive/computed-objects":[12,18,27,28,36],"/reactive/computed-options":[10,18,27,28,36],"/reactive/computed-async":[0,18,27,28,36],"/reactive/computed-intro":[23,18,27,28,36],"/reactive/computed-sync":[13,18,27,28,36],"/reactive/watch-objects":[8,18,27,28,36],"/core/example-captcha":[30,18,27,28,36],"/core/field-validate":[16,18,27,28,36],"/core/example-login":[17,18,27,28,36],"/core/field-related":[31,18,27,28,36],"/core/form-validate":[19,18,27,28,36],"/reactive/watch-use":[9,18,27,28,36],"/core/field-render":[1,18,27,28,36],"/core/field-dirty":[25,18,27,28,36],"/core/field-group":[4,18,27,28,36],"/core/form-action":[32,18,27,28,36],"/core/form-create":[24,18,27,28,36],"/core/form-submit":[26,18,27,28,36],"/core/quick-start":[11,18,27,28,36],"/core/form-dirty":[33,18,27,28,36],"/reactive/render":[40,18,27,28,36],"/reactive/state":[29,18,27,28,36],"/reactive/store":[15,18,27,28,36],"/reactive/watch":[34,18,27,28,36],"/core/question":[7,18,27,28,36],"/core/history":[20,18,27,28,36],"/core/install":[41,18,27,28,36],"/core/field":[37,18,27,28,36]}},{publicPath:"/speed-form/"});null==i||i.forEach((function(t){var e,n=t.type,a=t.url;if("js"===n)(e=r("script")).src=a,e.async=!0;else{if("css"!==n)return;(e=r("link")).href=a,e.rel="preload",e.as="style"}t.attrs.forEach((function(t){e.setAttribute(t[0],t[1]||"")})),c.appendChild(e)}))}}();