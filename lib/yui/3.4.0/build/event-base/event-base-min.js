/*
YUI 3.4.0 (build 3928)
Copyright 2011 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/
(function(){var a=YUI.Env;if(!a._ready){a._ready=function(){a.DOMReady=true;a.remove(YUI.config.doc,"DOMContentLoaded",a._ready);};a.add(YUI.config.doc,"DOMContentLoaded",a._ready);}})();YUI.add("event-base",function(e){e.publish("domready",{fireOnce:true,async:true});if(YUI.Env.DOMReady){e.fire("domready");}else{e.Do.before(function(){e.fire("domready");},YUI.Env,"_ready");}var b=e.UA,d={},a={63232:38,63233:40,63234:37,63235:39,63276:33,63277:34,25:9,63272:46,63273:36,63275:35},c=function(h){if(!h){return h;}try{if(h&&3==h.nodeType){h=h.parentNode;}}catch(g){return null;}return e.one(h);},f=function(g,h,i){this._event=g;this._currentTarget=h;this._wrapper=i||d;this.init();};e.extend(f,Object,{init:function(){var i=this._event,j=this._wrapper.overrides,g=i.pageX,l=i.pageY,k,h=this._currentTarget;this.altKey=i.altKey;this.ctrlKey=i.ctrlKey;this.metaKey=i.metaKey;this.shiftKey=i.shiftKey;this.type=(j&&j.type)||i.type;this.clientX=i.clientX;this.clientY=i.clientY;this.pageX=g;this.pageY=l;k=i.keyCode||i.charCode;if(b.webkit&&(k in a)){k=a[k];}this.keyCode=k;this.charCode=k;this.which=i.which||i.charCode||k;this.button=this.which;this.target=c(i.target);this.currentTarget=c(h);this.relatedTarget=c(i.relatedTarget);if(i.type=="mousewheel"||i.type=="DOMMouseScroll"){this.wheelDelta=(i.detail)?(i.detail*-1):Math.round(i.wheelDelta/80)||((i.wheelDelta<0)?-1:1);}if(this._touch){this._touch(i,h,this._wrapper);}},stopPropagation:function(){this._event.stopPropagation();this._wrapper.stopped=1;this.stopped=1;},stopImmediatePropagation:function(){var g=this._event;if(g.stopImmediatePropagation){g.stopImmediatePropagation();}else{this.stopPropagation();}this._wrapper.stopped=2;this.stopped=2;},preventDefault:function(g){var h=this._event;h.preventDefault();h.returnValue=g||false;this._wrapper.prevented=1;this.prevented=1;},halt:function(g){if(g){this.stopImmediatePropagation();}else{this.stopPropagation();}this.preventDefault();}});f.resolve=c;e.DOM2EventFacade=f;e.DOMEventFacade=f;(function(){e.Env.evt.dom_wrappers={};e.Env.evt.dom_map={};var q=e.Env.evt,i=e.config,n=i.win,s=YUI.Env.add,l=YUI.Env.remove,p=function(){YUI.Env.windowLoaded=true;e.Event._load();l(n,"load",p);},g=function(){e.Event._unload();},j="domready",m="~yui|2|compat~",o=function(u){try{return(u&&typeof u!=="string"&&e.Lang.isNumber(u.length)&&!u.tagName&&!u.alert);}catch(t){return false;}},h=e.CustomEvent.prototype._delete,k=function(u){var t=h.apply(this,arguments);if(!this.subCount&&!this.afterCount){e.Event._clean(this);}return t;},r=function(){var v=false,w=0,u=[],x=q.dom_wrappers,t=null,y=q.dom_map;return{POLL_RETRYS:1000,POLL_INTERVAL:40,lastError:null,_interval:null,_dri:null,DOMReady:false,startInterval:function(){if(!r._interval){r._interval=setInterval(r._poll,r.POLL_INTERVAL);}},onAvailable:function(z,D,H,A,E,G){var F=e.Array(z),B,C;for(B=0;B<F.length;B=B+1){u.push({id:F[B],fn:D,obj:H,override:A,checkReady:E,compat:G});}w=this.POLL_RETRYS;setTimeout(r._poll,0);C=new e.EventHandle({_delete:function(){if(C.handle){C.handle.detach();return;}var J,I;for(J=0;J<F.length;J++){for(I=0;I<u.length;I++){if(F[J]===u[I].id){u.splice(I,1);}}}}});return C;},onContentReady:function(D,B,C,A,z){return r.onAvailable(D,B,C,A,true,z);},attach:function(C,B,A,z){return r._attach(e.Array(arguments,0,true));},_createWrapper:function(F,E,z,A,D){var C,G=e.stamp(F),B="event:"+G+E;if(false===D){B+="native";}if(z){B+="capture";}C=x[B];if(!C){C=e.publish(B,{silent:true,bubbles:false,contextFn:function(){if(A){return C.el;}else{C.nodeRef=C.nodeRef||e.one(C.el);return C.nodeRef;}}});C.overrides={};C.el=F;C.key=B;C.domkey=G;C.type=E;C.fn=function(H){C.fire(r.getEvent(H,F,(A||(false===D))));};C.capture=z;if(F==n&&E=="load"){C.fireOnce=true;t=B;}C._delete=k;x[B]=C;y[G]=y[G]||{};y[G][B]=C;s(F,E,C.fn,z);}return C;},_attach:function(F,E){var K,M,C,J,z,B=false,D,G=F[0],H=F[1],A=F[2]||n,N=E&&E.facade,L=E&&E.capture,I=E&&E.overrides;if(F[F.length-1]===m){K=true;}if(!H||!H.call){return false;}if(o(A)){M=[];e.each(A,function(P,O){F[2]=P;M.push(r._attach(F.slice(),E));});return new e.EventHandle(M);}else{if(e.Lang.isString(A)){if(K){C=e.DOM.byId(A);}else{C=e.Selector.query(A);switch(C.length){case 0:C=null;break;case 1:C=C[0];break;default:F[2]=C;return r._attach(F,E);}}if(C){A=C;}else{D=r.onAvailable(A,function(){D.handle=r._attach(F,E);},r,true,false,K);return D;}}}if(!A){return false;}if(e.Node&&e.instanceOf(A,e.Node)){A=e.Node.getDOMNode(A);}J=r._createWrapper(A,G,L,K,N);if(I){e.mix(J.overrides,I);}if(A==n&&G=="load"){if(YUI.Env.windowLoaded){B=true;}}if(K){F.pop();}z=F[3];D=J._on(H,z,(F.length>4)?F.slice(4):null);if(B){J.fire();}return D;},detach:function(G,H,B,E){var F=e.Array(arguments,0,true),J,C,I,D,z,A;if(F[F.length-1]===m){J=true;}if(G&&G.detach){return G.detach();}if(typeof B=="string"){if(J){B=e.DOM.byId(B);}else{B=e.Selector.query(B);C=B.length;if(C<1){B=null;}else{if(C==1){B=B[0];}}}}if(!B){return false;}if(B.detach){F.splice(2,1);return B.detach.apply(B,F);}else{if(o(B)){I=true;for(D=0,C=B.length;D<C;++D){F[2]=B[D];I=(e.Event.detach.apply(e.Event,F)&&I);}return I;}}if(!G||!H||!H.call){return r.purgeElement(B,false,G);}z="event:"+e.stamp(B)+G;A=x[z];if(A){return A.detach(H);}else{return false;}},getEvent:function(C,A,z){var B=C||n.event;return(z)?B:new e.DOMEventFacade(B,A,x["event:"+e.stamp(A)+C.type]);},generateId:function(z){return e.DOM.generateID(z);},_isValidCollection:o,_load:function(z){if(!v){v=true;if(e.fire){e.fire(j);}r._poll();}},_poll:function(){if(r.locked){return;}if(e.UA.ie&&!YUI.Env.DOMReady){r.startInterval();return;}r.locked=true;var A,z,E,B,D,F,C=!v;if(!C){C=(w>0);}D=[];F=function(I,J){var H,G=J.override;if(J.compat){if(J.override){if(G===true){H=J.obj;}else{H=G;}}else{H=I;}J.fn.call(H,J.obj);}else{H=J.obj||e.one(I);J.fn.apply(H,(e.Lang.isArray(G))?G:[]);}};for(A=0,z=u.length;A<z;++A){E=u[A];if(E&&!E.checkReady){B=(E.compat)?e.DOM.byId(E.id):e.Selector.query(E.id,null,true);if(B){F(B,E);u[A]=null;}else{D.push(E);}}}for(A=0,z=u.length;
A<z;++A){E=u[A];if(E&&E.checkReady){B=(E.compat)?e.DOM.byId(E.id):e.Selector.query(E.id,null,true);if(B){if(v||(B.get&&B.get("nextSibling"))||B.nextSibling){F(B,E);u[A]=null;}}else{D.push(E);}}}w=(D.length===0)?0:w-1;if(C){r.startInterval();}else{clearInterval(r._interval);r._interval=null;}r.locked=false;return;},purgeElement:function(B,z,G){var E=(e.Lang.isString(B))?e.Selector.query(B,null,true):B,H=r.getListeners(E,G),D,F,C,A;if(z&&E){H=H||[];C=e.Selector.query("*",E);D=0;F=C.length;for(;D<F;++D){A=r.getListeners(C[D],G);if(A){H=H.concat(A);}}}if(H){for(D=0,F=H.length;D<F;++D){H[D].detachAll();}}},_clean:function(B){var A=B.key,z=B.domkey;l(B.el,B.type,B.fn,B.capture);delete x[A];delete e._yuievt.events[A];if(y[z]){delete y[z][A];if(!e.Object.size(y[z])){delete y[z];}}},getListeners:function(D,C){var E=e.stamp(D,true),z=y[E],B=[],A=(C)?"event:"+E+C:null,F=q.plugins;if(!z){return null;}if(A){if(F[C]&&F[C].eventDef){A+="_synth";}if(z[A]){B.push(z[A]);}A+="native";if(z[A]){B.push(z[A]);}}else{e.each(z,function(H,G){B.push(H);});}return(B.length)?B:null;},_unload:function(z){e.each(x,function(B,A){if(B.type=="unload"){B.fire(z);}B.detachAll();});l(n,"unload",g);},nativeAdd:s,nativeRemove:l};}();e.Event=r;if(i.injected||YUI.Env.windowLoaded){p();}else{s(n,"load",p);}if(e.UA.ie){e.on(j,r._poll);}s(n,"unload",g);r.Custom=e.CustomEvent;r.Subscriber=e.Subscriber;r.Target=e.EventTarget;r.Handle=e.EventHandle;r.Facade=e.EventFacade;r._poll();})();e.Env.evt.plugins.available={on:function(i,h,k,j){var g=arguments.length>4?e.Array(arguments,4,true):null;return e.Event.onAvailable.call(e.Event,k,h,j,g);}};e.Env.evt.plugins.contentready={on:function(i,h,k,j){var g=arguments.length>4?e.Array(arguments,4,true):null;return e.Event.onContentReady.call(e.Event,k,h,j,g);}};},"3.4.0",{requires:["event-custom-base"]});