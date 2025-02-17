"use strict";(self["webpackChunkvue2"]=self["webpackChunkvue2"]||[]).push([[895],{895:function(e,t,i){i.r(t),i.d(t,{default:function(){return _}});var s=i(3740),a=i(3698),n=i(2938),o=i(3180),r=i(4414),l=i(3449),d=i(6814),c=i(9991),h=i(174),u=i(6930),m=i(8983),v=i(7296),p=i(8924),f=i(7683),y=i(2756),g=i(1034),A=i(7112),b=function(){var e=this,t=e._self._c;return t(l.A,{attrs:{fluid:""}},[t(d.A,{staticClass:"elevation-1 mt-4",attrs:{headers:e.headers,items:e.desserts,loading:e.isLoading,search:e.search,"item-key":"referenceCode","items-per-page-options":[5,10,20]},scopedSlots:e._u([{key:"item.isCredit",fn:function({item:i}){return[t(o.A,{attrs:{color:i.isCredit?"red":"green",dark:"",small:"",label:""}},[e._v(" "+e._s(i.isCredit?"No":"Yes")+" ")])]}},{key:"top",fn:function(){return[t(y.A,{staticClass:"pa-4",attrs:{align:"center",justify:"space-between"}},[t(r.A,{attrs:{cols:"12",sm:"6",md:"4"}},[t(A.A,{attrs:{filled:"",rounded:"",dense:"",clearable:"","hide-details":"",placeholder:"Search","prepend-inner-icon":"mdi-magnify"},model:{value:e.search,callback:function(t){e.search=t},expression:"search"}})],1)],1)]},proxy:!0},{key:"item.hasDelivery",fn:function({item:i}){return[t(o.A,{attrs:{color:i.hasDelivery?"success":"error",small:"",label:"","text-color":"white"}},[e._v(" "+e._s(i.hasDelivery?"Yes":"No")+" ")])]}},{key:"item.actions",fn:function({item:i}){return[t(f.A,{attrs:{bottom:"",left:""},scopedSlots:e._u([{key:"activator",fn:function({on:i,attrs:a}){return[t(s.A,e._g(e._b({attrs:{icon:""}},"v-btn",a,!1),i),[t(u.A,[e._v("mdi-dots-vertical")])],1)]}}],null,!0)},[t(m.A,e._l(e.actions,(function(s,a){return t(v.A,{key:a,on:{click:function(t){return e.handleAction(s.title,i)}}},[t(p.UZ,[e._v(e._s(s.title))])],1)})),1)],1)]}},{key:"no-data",fn:function(){return[t(s.A,{attrs:{color:"#000033"},on:{click:e.initialize}},[e._v("Reset")])]},proxy:!0}],null,!0)}),t(c.A,{attrs:{"max-width":"600px"},model:{value:e.dialog,callback:function(t){e.dialog=t},expression:"dialog"}},[t(a.A,{staticClass:"rounded-lg",attrs:{elevation:"2"}},[t(n.ri,{staticClass:"headline"},[e._v(e._s(e.formTitle))]),t(n.OQ,[t(h.A,{ref:"form",model:{value:e.valid,callback:function(t){e.valid=t},expression:"valid"}},[t(A.A,{attrs:{label:"Name",outlined:"",rules:[e=>!!e||"Name is required"]},model:{value:e.editedItem.name,callback:function(t){e.$set(e.editedItem,"name",t)},expression:"editedItem.name"}}),t(A.A,{attrs:{label:"Company",outlined:""},model:{value:e.editedItem.company,callback:function(t){e.$set(e.editedItem,"company",t)},expression:"editedItem.company"}}),t(A.A,{attrs:{label:"Email",outlined:"",rules:[e=>/.+@.+\..+/.test(e)||"E-mail must be valid"]},model:{value:e.editedItem.email,callback:function(t){e.$set(e.editedItem,"email",t)},expression:"editedItem.email"}}),t(A.A,{attrs:{label:"Contact No",outlined:""},model:{value:e.editedItem.contactNo,callback:function(t){e.$set(e.editedItem,"contactNo",t)},expression:"editedItem.contactNo"}}),t(A.A,{attrs:{label:"Address",outlined:""},model:{value:e.editedItem.address,callback:function(t){e.$set(e.editedItem,"address",t)},expression:"editedItem.address"}})],1)],1),t(n.SL,[t(g.A),t(s.A,{attrs:{color:"grey darken-1",text:""},on:{click:e.close}},[e._v("Cancel")]),t(s.A,{attrs:{color:"#000033",disabled:!e.valid},on:{click:e.save}},[e._v("Save")])],1)],1)],1)],1)},w=[],I=(i(4114),i(5353)),x={data:()=>({dialog:!1,dialogDelete:!1,headers:[{text:"Reference Code",align:"start",sortable:!1,value:"referenceCode"},{text:"Payment Type",align:"start",sortable:!1,value:"paymentType"},{text:"Sales Amount",align:"start",sortable:!1,value:"salesTotal"},{text:"Total Orders",align:"start",sortable:!1,value:"noOfItems"},{text:"Paid in Full",align:"start",sortable:!1,value:"isCredit"},{text:"Options",value:"actions",sortable:!1}],desserts:[],editedIndex:-1,editedItem:{name:""},defaultItem:{name:""},itemId:null,actions:[{title:"Edit"},{title:"Delete"}],isLoading:!1,search:"",valid:!0,actions:[{title:"View",icon:"mdi-pencil"}]}),computed:{formTitle(){return-1===this.editedIndex?"New Item":"Edit Item"}},watch:{dialog(e){e||this.close()},dialogDelete(e){e||this.closeDelete()}},created(){this.initialize()},methods:{...(0,I.i0)({getItems:"sale/getItem",addItem:"sale/addItem",removeItem:"sale/deleteItem",updateItem:"sale/updateItem"}),async initialize(){const e=await this.getItems();this.desserts=e.result},onViewItem(e){this.$router.push({name:"EditSales",params:{id:e}})},deleteItem(e){this.editedIndex=this.desserts.indexOf(e),this.itemId=e._id,this.editedItem=Object.assign({},e),this.dialogDelete=!0},async deleteItemConfirm(){await this.removeItem(this.itemId),this.desserts.splice(this.editedIndex,1),this.closeDelete()},close(){this.dialog=!1,this.$nextTick((()=>{this.editedItem=Object.assign({},this.defaultItem),this.editedIndex=-1}))},closeDelete(){this.dialogDelete=!1,this.$nextTick((()=>{this.editedItem=Object.assign({},this.defaultItem),this.editedIndex=-1}))},async save(){this.editedIndex>-1?(Object.assign(this.desserts[this.editedIndex],this.editedItem),await this.updateItem(this.editedItem)):(this.desserts.push(this.editedItem),await this.addItem(this.editedItem)),this.close()},handleAction(e,t){switch(e){case"View":this.$router.push({name:"EditSales",params:{id:t._id}});break;case"Delete":this.deleteItem(t);break;default:break}}}},k=x,C=i(1656),$=(0,C.A)(k,b,w,!1,null,"4e93a25b",null),_=$.exports},9991:function(e,t,i){i.d(t,{A:function(){return p}});var s=i(4596),a=i(5030),n=i(2031),o=i(7631),r=i(8171),l=i(7198),d=i(5648),c=i(4598),h=i(5803),u=i(1920),m=i(4152);const v=(0,h.A)(n.A,o.A,r.A,l.A,d.A,a.A);var p=v.extend({name:"v-dialog",directives:{ClickOutside:c.A},props:{dark:Boolean,disabled:Boolean,fullscreen:Boolean,light:Boolean,maxWidth:[String,Number],noClickAnimation:Boolean,origin:{type:String,default:"center center"},persistent:Boolean,retainFocus:{type:Boolean,default:!0},scrollable:Boolean,transition:{type:[String,Boolean],default:"dialog-transition"},width:[String,Number]},data(){return{activatedBy:null,animate:!1,animateTimeout:-1,stackMinZIndex:200,previousActiveElement:null}},computed:{classes(){return{[`v-dialog ${this.contentClass}`.trim()]:!0,"v-dialog--active":this.isActive,"v-dialog--persistent":this.persistent,"v-dialog--fullscreen":this.fullscreen,"v-dialog--scrollable":this.scrollable,"v-dialog--animated":this.animate}},contentClasses(){return{"v-dialog__content":!0,"v-dialog__content--active":this.isActive}},hasActivator(){return Boolean(!!this.$slots.activator||!!this.$scopedSlots.activator)}},watch:{isActive(e){var t;e?(this.show(),this.hideScroll()):(this.removeOverlay(),this.unbind(),null===(t=this.previousActiveElement)||void 0===t||t.focus())},fullscreen(e){this.isActive&&(e?(this.hideScroll(),this.removeOverlay(!1)):(this.showScroll(),this.genOverlay()))}},created(){this.$attrs.hasOwnProperty("full-width")&&(0,u.rq)("full-width",this)},beforeMount(){this.$nextTick((()=>{this.isBooted=this.isActive,this.isActive&&this.show()}))},beforeDestroy(){"undefined"!==typeof window&&this.unbind()},methods:{animateClick(){this.animate=!1,this.$nextTick((()=>{this.animate=!0,window.clearTimeout(this.animateTimeout),this.animateTimeout=window.setTimeout((()=>this.animate=!1),150)}))},closeConditional(e){const t=e.target;return!(this._isDestroyed||!this.isActive||this.$refs.content.contains(t)||this.overlay&&t&&!this.overlay.$el.contains(t))&&this.activeZIndex>=this.getMaxZIndex()},hideScroll(){this.fullscreen?document.documentElement.classList.add("overflow-y-hidden"):r.A.options.methods.hideScroll.call(this)},show(){!this.fullscreen&&!this.hideOverlay&&this.genOverlay(),this.$nextTick((()=>{this.$nextTick((()=>{var e,t;(null===(e=this.$refs.dialog)||void 0===e?void 0:e.contains(document.activeElement))||(this.previousActiveElement=document.activeElement,null===(t=this.$refs.dialog)||void 0===t||t.focus()),this.bind()}))}))},bind(){window.addEventListener("focusin",this.onFocusin)},unbind(){window.removeEventListener("focusin",this.onFocusin)},onClickOutside(e){this.$emit("click:outside",e),this.persistent?this.noClickAnimation||this.animateClick():this.isActive=!1},onKeydown(e){if(e.keyCode===m.uP.esc&&!this.getOpenDependents().length)if(this.persistent)this.noClickAnimation||this.animateClick();else{this.isActive=!1;const e=this.getActivator();this.$nextTick((()=>e&&e.focus()))}this.$emit("keydown",e)},onFocusin(e){if(!e||!this.retainFocus)return;const t=e.target;if(t&&this.$refs.dialog&&![document,this.$refs.dialog].includes(t)&&!this.$refs.dialog.contains(t)&&this.activeZIndex>=this.getMaxZIndex()&&!this.getOpenDependentElements().some((e=>e.contains(t)))){const e=this.$refs.dialog.querySelectorAll('button, [href], input:not([type="hidden"]), select, textarea, [tabindex]:not([tabindex="-1"])'),t=[...e].find((e=>!e.hasAttribute("disabled")&&!e.matches('[tabindex="-1"]')));t&&t.focus()}},genContent(){return this.showLazyContent((()=>[this.$createElement(s.A,{props:{root:!0,light:this.light,dark:this.dark}},[this.$createElement("div",{class:this.contentClasses,attrs:{role:"dialog","aria-modal":this.hideOverlay?void 0:"true",...this.getScopeIdAttrs()},on:{keydown:this.onKeydown},style:{zIndex:this.activeZIndex},ref:"content"},[this.genTransition()])])]))},genTransition(){const e=this.genInnerContent();return this.transition?this.$createElement("transition",{props:{name:this.transition,origin:this.origin,appear:!0}},[e]):e},genInnerContent(){const e={class:this.classes,attrs:{tabindex:this.isActive?0:void 0},ref:"dialog",directives:[{name:"click-outside",value:{handler:this.onClickOutside,closeConditional:this.closeConditional,include:this.getOpenDependentElements}},{name:"show",value:this.isActive}],style:{transformOrigin:this.origin}};return this.fullscreen||(e.style={...e.style,maxWidth:(0,m.Dg)(this.maxWidth),width:(0,m.Dg)(this.width)}),this.$createElement("div",e,this.getContentSlot())}},render(e){return e("div",{staticClass:"v-dialog__container",class:{"v-dialog__container--attached":""===this.attach||!0===this.attach||"attach"===this.attach}},[this.genActivator(),this.genContent()])}})},174:function(e,t,i){i(4114);var s=i(5803),a=i(7717),n=i(7540),o=i(4152);t.A=(0,s.A)(a.A,(0,n.G)("form")).extend({name:"v-form",provide(){return{form:this}},inheritAttrs:!1,props:{disabled:Boolean,lazyValidation:Boolean,readonly:Boolean,value:Boolean},data:()=>({inputs:[],watchers:[],errorBag:{}}),watch:{errorBag:{handler(e){const t=Object.values(e).includes(!0);this.$emit("input",!t)},deep:!0,immediate:!0}},methods:{watchInput(e){const t=e=>e.$watch("hasError",(t=>{this.$set(this.errorBag,e._uid,t)}),{immediate:!0}),i={_uid:e._uid,valid:()=>{},shouldValidate:()=>{}};return this.lazyValidation?i.shouldValidate=e.$watch("shouldValidate",(s=>{s&&(this.errorBag.hasOwnProperty(e._uid)||(i.valid=t(e)))})):i.valid=t(e),i},validate(){return 0===this.inputs.filter((e=>!e.validate(!0))).length},reset(){this.inputs.forEach((e=>e.reset())),this.resetErrorBag()},resetErrorBag(){this.lazyValidation&&setTimeout((()=>{this.errorBag={}}),0)},resetValidation(){this.inputs.forEach((e=>e.resetValidation())),this.resetErrorBag()},register(e){this.inputs.push(e),this.watchers.push(this.watchInput(e))},unregister(e){const t=this.inputs.find((t=>t._uid===e._uid));if(!t)return;const i=this.watchers.find((e=>e._uid===t._uid));i&&(i.valid(),i.shouldValidate()),this.watchers=this.watchers.filter((e=>e._uid!==t._uid)),this.inputs=this.inputs.filter((e=>e._uid!==t._uid)),this.$delete(this.errorBag,t._uid)}},render(e){return e("form",{staticClass:"v-form",attrs:{novalidate:!0,...this.attrs$},on:{submit:e=>this.$emit("submit",e)}},(0,o.$c)(this))}})},3449:function(e,t,i){i.d(t,{A:function(){return o}});i(158),i(125);var s=i(5471);function a(e){return s["default"].extend({name:`v-${e}`,functional:!0,props:{id:String,tag:{type:String,default:"div"}},render(t,{props:i,data:s,children:a}){s.staticClass=`${e} ${s.staticClass||""}`.trim();const{attrs:n}=s;if(n){s.attrs={};const e=Object.keys(n).filter((e=>{if("slot"===e)return!1;const t=n[e];return e.startsWith("data-")?(s.attrs[e]=t,!1):t||"string"===typeof t}));e.length&&(s.staticClass+=` ${e.join(" ")}`)}return i.id&&(s.domProps=s.domProps||{},s.domProps.id=i.id),t(i.tag,s,a)}})}var n=i(8041),o=a("container").extend({name:"v-container",functional:!0,props:{id:String,tag:{type:String,default:"div"},fluid:{type:Boolean,default:!1}},render(e,{props:t,data:i,children:s}){let a;const{attrs:o}=i;return o&&(i.attrs={},a=Object.keys(o).filter((e=>{if("slot"===e)return!1;const t=o[e];return e.startsWith("data-")?(i.attrs[e]=t,!1):t||"string"===typeof t}))),t.id&&(i.domProps=i.domProps||{},i.domProps.id=t.id),e(t.tag,(0,n.Ay)(i,{staticClass:"container",class:Array({"container--fluid":t.fluid}).concat(a||[])}),s)}})},8171:function(e,t,i){i.d(t,{A:function(){return h}});i(4114);var s=i(8743),a=i(3381),n=i(428),o=i(5803),r=i(4152),l=(0,o.A)(s.A,a.A,n.A).extend({name:"v-overlay",props:{absolute:Boolean,color:{type:String,default:"#212121"},dark:{type:Boolean,default:!0},opacity:{type:[Number,String],default:.46},value:{default:!0},zIndex:{type:[Number,String],default:5}},computed:{__scrim(){const e=this.setBackgroundColor(this.color,{staticClass:"v-overlay__scrim",style:{opacity:this.computedOpacity}});return this.$createElement("div",e)},classes(){return{"v-overlay--absolute":this.absolute,"v-overlay--active":this.isActive,...this.themeClasses}},computedOpacity(){return Number(this.isActive?this.opacity:0)},styles(){return{zIndex:this.zIndex}}},methods:{genContent(){return this.$createElement("div",{staticClass:"v-overlay__content"},(0,r.$c)(this))}},render(e){const t=[this.__scrim];return this.isActive&&t.push(this.genContent()),e("div",{staticClass:"v-overlay",on:this.$listeners,class:this.classes,style:this.styles},t)}}),d=l,c=i(5471),h=c["default"].extend().extend({name:"overlayable",props:{hideOverlay:Boolean,overlayColor:String,overlayOpacity:[Number,String]},data(){return{animationFrame:0,overlay:null}},watch:{hideOverlay(e){this.isActive&&(e?this.removeOverlay():this.genOverlay())}},beforeDestroy(){this.removeOverlay()},methods:{createOverlay(){const e=new d({propsData:{absolute:this.absolute,value:!1,color:this.overlayColor,opacity:this.overlayOpacity}});e.$mount();const t=this.absolute?this.$el.parentNode:document.querySelector("[data-app]");t&&t.insertBefore(e.$el,t.firstChild),this.overlay=e},genOverlay(){if(this.hideScroll(),!this.hideOverlay)return this.overlay||this.createOverlay(),this.animationFrame=requestAnimationFrame((()=>{this.overlay&&(void 0!==this.activeZIndex?this.overlay.zIndex=String(this.activeZIndex-1):this.$el&&(this.overlay.zIndex=(0,r.fl)(this.$el)),this.overlay.value=!0)})),!0},removeOverlay(e=!0){this.overlay&&((0,r.d7)(this.overlay.$el,"transitionend",(()=>{this.overlay&&this.overlay.$el&&this.overlay.$el.parentNode&&!this.overlay.value&&!this.isActive&&(this.overlay.$el.parentNode.removeChild(this.overlay.$el),this.overlay.$destroy(),this.overlay=null)})),cancelAnimationFrame(this.animationFrame),this.overlay.value=!1),e&&this.showScroll()},scrollListener(e){if("key"in e){if(["INPUT","TEXTAREA","SELECT"].includes(e.target.tagName)||e.target.isContentEditable)return;const t=[r.uP.up,r.uP.pageup],i=[r.uP.down,r.uP.pagedown];if(t.includes(e.keyCode))e.deltaY=-1;else{if(!i.includes(e.keyCode))return;e.deltaY=1}}(e.target===this.overlay||"keydown"!==e.type&&e.target===document.body||this.checkPath(e))&&e.preventDefault()},hasScrollbar(e){if(!e||e.nodeType!==Node.ELEMENT_NODE)return!1;const t=window.getComputedStyle(e);return(["auto","scroll"].includes(t.overflowY)||"SELECT"===e.tagName)&&e.scrollHeight>e.clientHeight||["auto","scroll"].includes(t.overflowX)&&e.scrollWidth>e.clientWidth},shouldScroll(e,t){if(e.hasAttribute("data-app"))return!1;const i=t.shiftKey||t.deltaX?"x":"y",s="y"===i?t.deltaY:t.deltaX||t.deltaY;let a,n;"y"===i?(a=0===e.scrollTop,n=e.scrollTop+e.clientHeight===e.scrollHeight):(a=0===e.scrollLeft,n=e.scrollLeft+e.clientWidth===e.scrollWidth);const o=s<0,r=s>0;return!(a||!o)||(!(n||!r)||!(!a&&!n||!e.parentNode)&&this.shouldScroll(e.parentNode,t))},isInside(e,t){return e===t||null!==e&&e!==document.body&&this.isInside(e.parentNode,t)},checkPath(e){const t=(0,r.K9)(e);if("keydown"===e.type&&t[0]===document.body){const t=this.$refs.dialog,i=window.getSelection().anchorNode;return!(t&&this.hasScrollbar(t)&&this.isInside(i,t))||!this.shouldScroll(t,e)}for(let i=0;i<t.length;i++){const s=t[i];if(s===document)return!0;if(s===document.documentElement)return!0;if(s===this.$refs.content)return!0;if(this.hasScrollbar(s))return!this.shouldScroll(s,e)}return!0},hideScroll(){this.$vuetify.breakpoint.smAndDown?document.documentElement.classList.add("overflow-y-hidden"):((0,r.P4)(window,"wheel",this.scrollListener,{passive:!1}),window.addEventListener("keydown",this.scrollListener))},showScroll(){document.documentElement.classList.remove("overflow-y-hidden"),window.removeEventListener("wheel",this.scrollListener),window.removeEventListener("keydown",this.scrollListener)}}})}}]);
//# sourceMappingURL=895.d85368dc.js.map