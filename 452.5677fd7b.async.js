(self.webpackChunkspeedform_docs=self.webpackChunkspeedform_docs||[]).push([[452],{57004:function(se,I,p){"use strict";p.r(I),p.d(I,{$:function(){return E.$},ComputedObjects:function(){return Re},ComputedScopeRef:function(){return O},OBJECT_PATH_DELIMITER:function(){return h},computed:function(){return _e},createAction:function(){return ge},createActions:function(){return ye},createStore:function(){return dt},createUseWatch:function(){return Te},createWatch:function(){return ae},getSnap:function(){return E.getSnap},getVal:function(){return T},getValueByPath:function(){return V},installComputed:function(){return Ee},installWatch:function(){return xe},isIncludePath:function(){return $e},isSkipComputed:function(){return le},markRaw:function(){return E.markRaw},setVal:function(){return k},skipComputed:function(){return _},watch:function(){return ct}});var q=p(39114),ce=p.n(q),ke=p(70125),P=p.n(ke),E=p(14102),De=p(79664),g=p.n(De),h="/";function V(e,t){var n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:h,r=[];try{return typeof t=="function"&&(t=t.call(e,e)),r=Array.isArray(t)?t:typeof t=="string"?t.split(n):[],r.length>0?T(e,r):e}catch(a){return e}}var fe=Symbol("SKIP_COMPUTED");function _(e){return e[fe]=!0,e}function le(e){return e[fe]===!0}function Ke(e){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:"log",n=typeof e=="function"?e():e instanceof Error?e.stack:e;try{var r;(r=console)[t].apply(r,["[@speedform/reactive] "].concat(g()(Array.isArray(n)?n:[n])))}catch(a){}}function pe(e,t){if(!Array.isArray(e))throw new Error("path must be an array");return t==="self"?e:t==="root"?[]:t==="parent"?e.slice(0,-2):t==="current"?e.slice(0,-1):typeof t=="string"?t.startsWith("./")?[].concat(g()(e.slice(0,-1)),g()(t.slice(2).split(h))):t.startsWith("../")?pe(e.slice(0,-1),t.slice(3)):(t.includes(".")&&(console.warn('[@speedform/reactive] The dependency path uses "/" as the separator, and will automatically convert'),t=t.replaceAll(".","/")),[].concat(g()(e.slice(0,-1)),g()(t.split(h)))):Array.isArray(t)?t:e}function de(e){return e.map(function(t){return Array.isArray(t)?t.join("."):t}).join("_")}function Me(e){return e instanceof Error?e:new Error(e)}function Ie(e,t){return(e||[]).map(function(n){return Array.isArray(n)?n:typeof n=="string"?n.startsWith("./")||n.startsWith("../")?n:n.includes(h)?n.split(h):n.split("."):[]})}function We(e,t,n){return e.map(function(r){return T(t,pe(n,r))})}function $e(e,t){return e.length>t.length?!1:e.every(function(n,r){return n===t[r]})}function ve(e){return toString.call(e)==="[object Map]"}function he(e,t){var n=e.get(t);if(n!==void 0)return n;var r=e.get(Number(t)||t);if(r!==void 0)return r}function T(e,t){if(t.length===0)return e;var n,r=e;return t.forEach(function(a){n=ve(r)?he(r,a):r[a],r=n}),n}function k(e,t,n){var r=e,a=t.length-1;t.forEach(function(u,i){var s=ve(r);if(i===a){s?r.set(u,n):r[u]=n;return}var f=s?he(r,u):r[u];r=f})}function Le(e){return typeof e=="function"&&e.then&&typeof e.then=="function"||e&&e instanceof Promise}function ye(e,t,n,r){return Object.entries(e||{}).reduce(function(a,u){var i=P()(u,2),s=i[0],f=i[1];return a[s]=ge(f,t.setState,n),a},{})}function ge(e,t,n){var r=function(u){typeof u=="function"&&t(function(i){u(i)})};return function(){var a=e.apply(void 0,arguments);if(Le(a))return a.then(function(u){r(u)});r(a)}}var Ue=p(77937),me=p.n(Ue),Pe=p(41176),Ce=p.n(Pe),Ne=p(65523),Fe=p.n(Ne),Be=p(7122),He=p.n(Be),Je=p(19108),Ge=p.n(Je),Ye=p(90393),W=p.n(Ye),ze=p(7392),te=p.n(ze),Qe=p(26851),Xe=p.n(Qe),Oe=p(96820),Ze=p(71660),qe=p(45727);function ee(e,t){var n=t.input,r=t.type,a=t.computedContext,u=t.computedOptions,i=t.storeOptions,s=e;if(typeof i.onComputedContext=="function"){var f=i.onComputedContext.call(e,e,{type:r,valuePath:a.fullKeyPath});f!==void 0&&(s=f)}var c=a.keyPath,o=a.fullKeyPath,l=et(e,r=="context"?u.context:u.scope,r=="context"?i.computedThis:i.computedScope);try{if(l===O.Current)return V(e,c);if(l===O.Parent)return V(e,o.slice(0,o.length-2));if(l===O.Root)return s;if(l===O.Depends)return Array.isArray(n)?n:[];if(typeof l=="string")return V(e,[].concat(g()(c),g()(l.split(h))));if(Array.isArray(l))if(l.length>0&&l[0].startsWith("@")){var d=V(e,[].concat(g()(l[0].substring(1).split(h)),g()(l.slice(1))));return V(e,d)}else return V(e,l);else if(typeof l=="number"){var y=l>o.length-2?o.length-l-1:0;return V(e,o.slice(0,y))}else return e}catch(b){return e}}function _e(e,t,n){if(typeof e!="function")throw new Error("getter must be a function");var r=[],a={async:!1,timeout:0,depends:[],toComputedResult:O.Self,immediate:!0};if(arguments.length==1)r=[];else if(arguments.length==2)if(Array.isArray(arguments[1]))r=arguments[1];else if(Xe()(arguments[1])=="object")Object.assign(a,arguments[1]);else throw new Error("invalid arguments");else arguments.length>=3&&(r=arguments[1],Object.assign(a,arguments[2]));var u=a.async===!0||(0,Oe.$)(e)||arguments.length>=2&&Array.isArray(t);a.async=u,a.depends=r;var i=function(){return{fn:e,options:a}};return i.__COMPUTED__=u?"async":"sync",i}function et(e,t,n){var r=t==null?n:t;if(typeof r=="function")try{r=r.call(e,e)}catch(a){}return r==null?n==null?O.Root:n:r}function be(e,t){var n="";return typeof t=="function"?n=t(e):typeof t=="string"?n=t:n=de(e),n}function je(e,t,n,r){var a=t.fullKeyPath,u=t.parent,i=t.value,s=r.onCreateComputed,f=i(),c=f.fn,o=f.options;if(!(u&&!Object.hasOwn(u,a[a.length-1]))){if(typeof s=="function"&&typeof c=="function"){var l=s.call(e,a,c,o);o.scope||(o.scope=O.Current),o.context||(o.context=O.Root),typeof l=="function"&&(c=l)}r.log("Create sync computed: ".concat(a.join(h)));var d=be(a,o.id),y=e.mutate({fn:function(S,$){r.log("Run sync computed for : ".concat(a.join(h)));var L=$.input,U=ee(S,{input:L,computedOptions:o,computedContext:t,storeOptions:r,type:"context"}),m=ee(S,{input:L,computedOptions:o,computedContext:t,storeOptions:r,type:"scope"}),D=o.initial;try{D=c.call(U,m)}catch(R){if(typeof o.onError=="function")try{var A;(A=o.onError)===null||A===void 0||A.call(U,R)}catch(z){}}k(S,a,D)},desc:d,checkDeadCycle:!1});t.replaceValue(T(y.snap,a)),n.set(a.join(h),{mutate:y,group:o.group,async:!1})}}function Se(e,t,n){return Object.assign({value:void 0,loading:!1,timeout:0,retry:0,error:null,progress:0,run:(0,E.markRaw)(_(function(r){return e.runMutateTask({desc:t,extraArgs:r})})),cancel:(0,E.markRaw)(_(function(){console.log("cancel")}))},n)}function tt(e,t,n,r,a){var u=Se(e,r,a),i=T(t,n);Object.assign(i,u,a)}function nt(e,t,n){var r=Object.assign({},n),a=r.max,u=a===void 0?100:a,i=r.min,s=i===void 0?0:i,f=r.value,c=f===void 0?0:f;return e(function(o){return k(o,[].concat(g()(t),["progress"]),c)}),{value:function(l){l>u&&(l=u),l<s&&(l=s),e(function(d){return k(d,[].concat(g()(t),["progress"]),l)})},end:function(){this.value(u)}}}function X(e,t,n){e(function(r){Object.entries(n).forEach(function(a){var u=P()(a,2),i=u[0],s=u[1];k(r,[].concat(g()(t),[i]),s)})})}function rt(e,t,n){return ne.apply(this,arguments)}function ne(){return ne=te()(W()().mark(function e(t,n,r){var a,u,i,s,f,c,o,l,d,y,b,S,$,L,U,m,D,A,R,z,N,w,C;return W()().wrap(function(K){for(;;)switch(K.prev=K.next){case 0:a=r.input,u=r.computedOptions,i=r.computedContext,s=r.storeOptions,f=r.computedResultPath,c=r.setState,o=ee(t,{input:a,computedOptions:u,computedContext:i,storeOptions:s,type:"context"}),l=ee(t,{input:a,computedOptions:u,computedContext:i,storeOptions:s,type:"scope"}),d=i.fullKeyPath,y=u.timeout,b=y===void 0?0:y,S=u.retry,$=S===void 0?[0,0]:S,L=Array.isArray($)?$:[Number($),0],U=P()(L,2),m=U[0],D=U[1],R=new AbortController,z={onTimeout:function(x){return A=x},getProgressbar:function(x){return nt(c,d,x)},getSnap:function(x){return(0,E.getSnap)(x,!1)},abortSignal:R.signal,cancel:R.abort},N=!1,X(c,f,{cancel:(0,E.markRaw)(_(function(){return R.abort()}))}),R.signal.addEventListener("abort",function(){N=!0}),w=W()().mark(function B(){var x,H,M,Q,j,J,we,ue,ie,Z,oe,G,Ve;return W()().wrap(function(v){for(;;)switch(v.prev=v.next){case 0:if(M=!1,Q=!1,j=C>0,J={},v.prev=2,we=Array.isArray(b)?b:[b,0],ue=P()(we,2),ie=ue[0],Z=ie===void 0?0:ie,oe=ue[1],G=oe===void 0?0:oe,X(c,f,{loading:!0,error:null,retry:C>0?m-C:0,timeout:G>1?G:Z,progress:0}),!N){v.next=7;break}throw new Error("Aborted");case 7:return Z>0&&(x=setTimeout(function(){Q=!0,typeof A=="function"&&A(),M||(clearInterval(H),X(c,f,{loading:!1,error:"TIMEOUT",timeout:0}))},Z),G>1&&(H=setInterval(function(){X(c,f,{timeout:G--}),G===0&&clearInterval(H)},Z/G))),v.next=10,n.call(o,l,z);case 10:Ve=v.sent,Q||Object.assign(J,{result:Ve,error:null,timeout:0}),v.next=20;break;case 14:if(v.prev=14,v.t0=v.catch(2),M=!0,typeof u.onError=="function")try{u.onError.call(o,v.t0)}catch(ht){}Q||Object.assign(J,{error:Me(v.t0).message,timeout:0}),m>0&&Object.assign(J,{retry:m-C});case 20:return v.prev=20,clearTimeout(x),clearInterval(H),(!M||C==m)&&Object.assign(J,{loading:!1}),!M&&!Q&&Object.assign(J,{error:null}),X(c,f,J),v.finish(20);case 27:if(!M){v.next=31;break}if(!(m>0&&D>0&&C<m)){v.next=31;break}return v.next=31,(0,qe.g)(D);case 31:case"end":return v.stop()}},B,null,[[2,14,20,27]])}),C=0;case 13:if(!(C<m+1)){K.next=18;break}return K.delegateYield(w(),"t0",15);case 15:C++,K.next=13;break;case 18:case"end":return K.stop()}},e)})),ne.apply(this,arguments)}function Ae(e,t,n,r){var a=t.fullKeyPath,u=t.parent,i=t.value,s=r.onCreateComputed;if(!(u&&!Object.hasOwn(u,a[a.length-1]))){var f=i(),c=f.fn,o=f.options;if(o.async=!0,typeof s=="function"&&typeof c=="function"){var l=s.call(e,a,c,o);o.scope||(o.scope=O.Current),o.context||(o.context=O.Root),typeof l=="function"&&(c=l)}var d=o.depends,y=o.initial,b=o.toComputedResult,S=b===void 0?"self":b,$=o.immediate,L=o.noReentry,U=L===void 0?!1:L,m=!1,D=(0,Ze.d)(S,{self:a,root:[],parent:a.slice(0,a.length-2),current:a.slice(0,a.length-1),Array:S,String:[].concat(g()(a.slice(0,a.length-1)),[String(S).split(h)])},{defaultValue:a}),A=Ie(d);A.length==0&&r.log("async computed <".concat(a.join("."),"> should specify depends"),"warn");var R=be(a,o.id);r.log("Create async computed: ".concat(a.join(h)," (depends=").concat(A.length==0?"None":de(A),")"));var z=e.mutate({deps:function(w){return We(A,w,a)},fn:function(w,C){if(C.isFirstCall)if(S=="self")k(w,a,Se(e,R,{result:y}));else{tt(e,w,D,R,{result:y});var F=T(w,a.slice(0,a.length-1));delete F[a[a.length-1]]}},task:function(){var N=te()(W()().mark(function C(F){var K,B,x,H,M;return W()().wrap(function(j){for(;;)switch(j.prev=j.next){case 0:if(K=F.draft,B=F.setState,x=F.input,H=F.extraArgs,r.log("Run async computed for : ".concat(a.join(h))),M=Object.assign({},o,H),!(U&&m&&r.debug)){j.next=6;break}return r.log("Reentry async computed: ".concat(a.join(h)),"warn"),j.abrupt("return");case 6:return m=!0,j.prev=7,j.next=10,rt(K,c,{input:x,computedResultPath:D,computedOptions:M,computedContext:t,storeOptions:r,setState:B});case 10:return j.abrupt("return",j.sent);case 11:return j.prev=11,m=!1,j.finish(11);case 14:case"end":return j.stop()}},C,null,[[7,,11,14]])}));function w(C){return N.apply(this,arguments)}return w}(),immediate:$,desc:R,checkDeadCycle:!1});t.replaceValue(T(z.snap,a)),n.set(a.join(h),{mutate:z,group:o.group,async:!0})}}function Ee(e){var t=e.stateCtx,n=e.params,r=e.storeOptions,a=e.extendObjects,u=n.value;u.__COMPUTED__=="async"?Ae(t,n,a.computedObjects,r):u.__COMPUTED__=="sync"?je(t,n,a.computedObjects,r):(0,Oe.$)(u)?(n.value=function(){return{fn:u,options:{depends:[],initial:void 0,immediate:!0,context:r.computedThis}}},Ae(t,n,a.computedObjects,r)):(n.value=function(){return{fn:u,options:{initial:void 0,context:r.computedThis}}},je(t,n,a.computedObjects,r))}var Re=function(e){Fe()(n,e);var t=He()(n);function n(){return me()(this,n),t.apply(this,arguments)}return Ce()(n,[{key:"run",value:function(){var r=te()(W()().mark(function u(i){var s;return W()().wrap(function(c){for(;;)switch(c.prev=c.next){case 0:if(!i.startsWith("@")){c.next=4;break}return c.abrupt("return",Promise.all(g()(this.values()).filter(function(o){return o.group==i.substring(1)}).map(function(o){return o.async?o.mutate.runTask():o.mutate.run()})));case 4:if(s=this.get(i),!s){c.next=16;break}if(!(s!=null&&s.async)){c.next=12;break}return c.next=9,s.mutate.runTask();case 9:c.t0=c.sent,c.next=13;break;case 12:c.t0=s==null?void 0:s.mutate.run();case 13:return c.abrupt("return",c.t0);case 16:throw new Error("ComputedObject not found: ".concat(i));case 17:case"end":return c.stop()}},u,this)}));function a(u){return r.apply(this,arguments)}return a}()}]),n}(Ge()(Map)),at=p(20458),ut=p(71698),it=p.n(ut),ot=p(79862),Y=p.n(ot),st=p(70079);function ct(e,t,n){var r=Object.assign({on:t},n),a=function(){return{fn:e,options:r}};return a.__COMPUTED__="watch",a}var ft=function(){function e(t){me()(this,e),Y()(this,"listeners",new Map),Y()(this,"_off",function(){}),Y()(this,"_wacher",{off:function(){}}),Y()(this,"_enable",!0),Y()(this,"cache",new Map),Y()(this,"listenerCache",void 0),this.options=t,this.createWacher()}return Ce()(e,[{key:"stateCtx",get:function(){return this.options.stateCtx}},{key:"storeOptions",get:function(){return this.options.storeOptions}},{key:"extendObjects",get:function(){return this.options.extendObjects}},{key:"enable",get:function(){return this._enable},set:function(n){this._enable=n}},{key:"createWacher",value:function(){var n=this,r=(0,E.watch)(function(u){var i=u.triggerReasons,s=i.map(function(f){return f.keyPath});s.forEach(function(f){if(!n.hitListenerFromCache(f)){var c=it()(n.listeners),o;try{for(c.s();!(o=c.n()).done;){var l=P()(o.value,2),d=l[0],y=l[1];try{n.executeListener(f,JSON.parse(d),y)}catch(b){console.warn("Error while run watchLisenter("+f+"->"+d+")",b.stack)}}}catch(b){c.e(b)}finally{c.f()}}})},function(){return[n.stateCtx.state]}),a=r.unwatch;this._wacher={off:a}}},{key:"addListenerToCache",value:function(n,r,a,u){var i=this.getValueKey(n);this.cache.has(i)||this.cache.set(i,[]);var s=this.cache.get(i);s.push([r,a,u])}},{key:"getValueKey",value:function(n){return JSON.stringify(n)}},{key:"hitListenerFromCache",value:function(n){var r=this,a=this.getValueKey(n);if(this.cache.has(a)){var u=T(this.stateCtx.state,n),i=this.cache.get(a);return i.forEach(function(s){var f=P()(s,3),c=f[0],o=f[1],l=f[2],d=o(u,l);d!==void 0&&r.stateCtx.setState(function(y){k(y,c,d)})}),i.length>0}return!1}},{key:"getListenerCache",value:function(n){this.listenerCache||(this.listenerCache=new Map);var r=n.join(".");return this.listenerCache.has(r)||this.listenerCache.set(r,{}),this.listenerCache.get(r)}},{key:"executeListener",value:function(n,r,a){var u=this,i=a.fn,s=a.options,f=s.on;if(typeof f=="function"){var c=T(this.stateCtx.state,n);try{if(f(n,c)==!0){var o={getSelfValue:function(){return T((0,E.getSnap)(u.stateCtx.state),r)},getCache:function(){return u.getListenerCache(r)},srcPath:n,selfPath:r};this.addListenerToCache(n,r,i,o);var l=i(c,o);l!==void 0&&this.stateCtx.setState(function(d){k(d,r,l)})}}catch(d){this.storeOptions.log("Error while run watchLisenter(".concat(n,"->").concat(r,")")+d.stack,"error")}}}},{key:"off",value:function(){this._off()}},{key:"on",value:function(){}},{key:"add",value:function(n,r){var a=r.fullKeyPath;this.listeners.set(this.getValueKey(a),{fn:n.fn,options:n.options})}},{key:"remove",value:function(n){this.listeners.delete(this.getValueKey(n))}}]),e}(),re;function xe(e){var t=e.stateCtx,n=e.params,r=e.storeOptions,a=e.extendObjects;re||(re=new ft({stateCtx:t,storeOptions:r,extendObjects:a})),r.log("install watch for <".concat(n.fullKeyPath.join(h),">"));var u=n.value();re.add(u,n),t.setState(function(i){k(i,n.fullKeyPath,u.options.initial)})}function ae(e){return function(t,n){var r=(0,E.watch)(function(u){var i=u.triggerReasons,s=i.map(function(f){return f.keyPath});t(s)},function(){return n==null?void 0:n.map(function(u){return V(e.state,u)})}),a=r.unwatch;return a}}function Te(e){return function(t,n){(0,st.useEffect)(function(){return ae(e)(t,n)},[])}}function lt(e,t,n,r){var a=e.fullKeyPath,u=e.value,i=a.join(".");if(typeof u=="function"&&!n._replacedKey[i]&&!le(u)){n._replacedKey[i]=!0;var s={stateCtx:t,extendObjects:n,storeOptions:r,params:e};u.__COMPUTED__=="watch"?xe(s):Ee(s)}}var O=function(e){return e.Root="root",e.Current="current",e.Parent="parent",e.Depends="depends",e.Self="self",e}({});function pt(e){return function(t,n){var r=e.useState;if(t==null)return r();var a=r(),u=P()(a,2),i=u[0],s=u[1],f=t(i),c=s;return typeof n=="function"&&(c=function(l){s(function(d){n.call(d,d,l)})}),[f,c]}}function dt(e,t){var n=Object.assign({id:Math.random().toString(16).substring(2),debug:!0,computedThis:O.Root,computedScope:O.Current,singleton:!0},t);n.log=function(){n.debug&&Ke.apply(void 0,arguments)};var r=n.singleton?e:(0,at.I)(e),a={computedObjects:new Re,watchObjects:{},_replacedKey:{}};return(0,E.model)(function(u){var i=u.sharex(r.state,{stopArrDep:!1,moduleName:n.id,onRead:function(o){lt(o,i,a,n)}}),s=ye(r.actions,i,u,n),f=pt(i);return ce()(ce()({actions:s},i),{},{state:i.reactive,useState:f,watch:ae(i),useWatch:Te(i),computedObjects:a.computedObjects})})}},2109:function(se){function I(p){var q=new Error("Cannot find module '"+p+"'");throw q.code="MODULE_NOT_FOUND",q}I.keys=function(){return[]},I.resolve=I,I.id=2109,se.exports=I}}]);
