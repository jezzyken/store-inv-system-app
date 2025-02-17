"use strict";(self["webpackChunkvue2"]=self["webpackChunkvue2"]||[]).push([[235],{9868:function(t,e,i){i.r(e),i.d(e,{default:function(){return b}});var s=i(3740),n=i(3698),a=i(2938),o=i(4414),l=i(3449),r=i(6814),d=i(9991),c=i(9483),h=i(2756),u=i(1034),m=i(7112),v=i(198),g=i(2367),f=function(){var t=this,e=t._self._c;return e(l.A,[e(r.A,{staticClass:"elevation-1",attrs:{headers:t.headers,items:t.desserts,"sort-by":"calories"},scopedSlots:t._u([{key:"top",fn:function(){return[e(v.A,{attrs:{flat:""}},[e(g.sw,[t._v("Sales")]),e(c.A,{staticClass:"mx-4",attrs:{inset:"",vertical:""}}),e(u.A),e(d.A,{attrs:{"max-width":"500px"},model:{value:t.dialog,callback:function(e){t.dialog=e},expression:"dialog"}},[e(n.A,[e(a.ri,[e("span",{staticClass:"text-h5"},[t._v(t._s(t.formTitle))])]),e(a.OQ,[e(l.A,[e(h.A,[e(o.A,{attrs:{cols:"12"}},[e(m.A,{attrs:{label:"Brand Name"},model:{value:t.editedItem.name,callback:function(e){t.$set(t.editedItem,"name",e)},expression:"editedItem.name"}})],1)],1)],1)],1),e(a.SL,[e(u.A),e(s.A,{attrs:{color:"blue darken-1",text:""},on:{click:t.close}},[t._v(" Cancel ")]),e(s.A,{attrs:{color:"blue darken-1",text:""},on:{click:t.save}},[t._v(" Save ")])],1)],1)],1),e(d.A,{attrs:{"max-width":"500px"},model:{value:t.dialogDelete,callback:function(e){t.dialogDelete=e},expression:"dialogDelete"}},[e(n.A,[e(a.ri,{staticClass:"text-h5"},[t._v("Are you sure you want to delete this item?")]),e(a.SL,[e(u.A),e(s.A,{attrs:{color:"blue darken-1",text:""},on:{click:t.closeDelete}},[t._v("Cancel")]),e(s.A,{attrs:{color:"blue darken-1",text:""},on:{click:t.deleteItemConfirm}},[t._v("OK")]),e(u.A)],1)],1)],1)],1)]},proxy:!0},{key:"item.actions",fn:function({item:i}){return[e(s.A,{attrs:{"x-small":"",color:"warning"},on:{click:function(e){return t.editItem(i)}}},[t._v(" edit ")]),e("span",{staticClass:"mr-1"}),e(s.A,{attrs:{"x-small":"",color:"error",dark:""},on:{click:function(e){return t.deleteItem(i)}}},[t._v(" delete ")])]}},{key:"no-data",fn:function(){return[e(s.A,{attrs:{color:"#000033"},on:{click:t.initialize}},[t._v(" Reset ")])]},proxy:!0}],null,!0)})],1)},p=[],I=(i(4114),i(5353)),x={data:()=>({dialog:!1,dialogDelete:!1,headers:[{text:"Item",align:"start",sortable:!1,value:"product.name"},{text:"Variant",align:"start",sortable:!1,value:"variant"},{text:"Price",align:"start",sortable:!1,value:"salePrice"},{text:"Quantity",align:"start",sortable:!1,value:"quantity"},{text:"Transacted By",align:"start",sortable:!1,value:"userName"},{text:"Options",value:"actions",sortable:!1}],desserts:[],editedIndex:-1,editedItem:{name:""},defaultItem:{name:""},itemId:null}),computed:{formTitle(){return-1===this.editedIndex?"New Item":"Edit Item"}},watch:{dialog(t){t||this.close()},dialogDelete(t){t||this.closeDelete()}},created(){this.initialize()},methods:{...(0,I.i0)({getItems:"saleItem/getItem",getItemBySaleId:"saleItem/getItemBySaleId",addItem:"saleItem/addItem",removeItem:"saleItem/deleteItem",updateItem:"saleItem/updateItem"}),async initialize(){const t=await this.getItemBySaleId(this.$route.query.id);this.desserts=t.result.map((t=>({...t,userName:`${t.user.fname} ${t.user.lname}`})))},editItem(t){this.editedIndex=this.desserts.indexOf(t),this.editedItem=Object.assign({},t),this.dialog=!0},deleteItem(t){this.editedIndex=this.desserts.indexOf(t),this.itemId=t._id,this.editedItem=Object.assign({},t),this.dialogDelete=!0},async deleteItemConfirm(){await this.removeItem(this.itemId),this.desserts.splice(this.editedIndex,1),this.closeDelete()},close(){this.dialog=!1,this.$nextTick((()=>{this.editedItem=Object.assign({},this.defaultItem),this.editedIndex=-1}))},closeDelete(){this.dialogDelete=!1,this.$nextTick((()=>{this.editedItem=Object.assign({},this.defaultItem),this.editedIndex=-1}))},async save(){this.editedIndex>-1?(Object.assign(this.desserts[this.editedIndex],this.editedItem),await this.updateItem(this.editedItem)):(this.desserts.push(this.editedItem),await this.addItem(this.editedItem)),this.close()}}},A=x,y=i(1656),k=(0,y.A)(A,f,p,!1,null,null,null),b=k.exports},9991:function(t,e,i){i.d(e,{A:function(){return g}});var s=i(4596),n=i(5030),a=i(2031),o=i(7631),l=i(8171),r=i(7198),d=i(5648),c=i(4598),h=i(5803),u=i(1920),m=i(4152);const v=(0,h.A)(a.A,o.A,l.A,r.A,d.A,n.A);var g=v.extend({name:"v-dialog",directives:{ClickOutside:c.A},props:{dark:Boolean,disabled:Boolean,fullscreen:Boolean,light:Boolean,maxWidth:[String,Number],noClickAnimation:Boolean,origin:{type:String,default:"center center"},persistent:Boolean,retainFocus:{type:Boolean,default:!0},scrollable:Boolean,transition:{type:[String,Boolean],default:"dialog-transition"},width:[String,Number]},data(){return{activatedBy:null,animate:!1,animateTimeout:-1,stackMinZIndex:200,previousActiveElement:null}},computed:{classes(){return{[`v-dialog ${this.contentClass}`.trim()]:!0,"v-dialog--active":this.isActive,"v-dialog--persistent":this.persistent,"v-dialog--fullscreen":this.fullscreen,"v-dialog--scrollable":this.scrollable,"v-dialog--animated":this.animate}},contentClasses(){return{"v-dialog__content":!0,"v-dialog__content--active":this.isActive}},hasActivator(){return Boolean(!!this.$slots.activator||!!this.$scopedSlots.activator)}},watch:{isActive(t){var e;t?(this.show(),this.hideScroll()):(this.removeOverlay(),this.unbind(),null===(e=this.previousActiveElement)||void 0===e||e.focus())},fullscreen(t){this.isActive&&(t?(this.hideScroll(),this.removeOverlay(!1)):(this.showScroll(),this.genOverlay()))}},created(){this.$attrs.hasOwnProperty("full-width")&&(0,u.rq)("full-width",this)},beforeMount(){this.$nextTick((()=>{this.isBooted=this.isActive,this.isActive&&this.show()}))},beforeDestroy(){"undefined"!==typeof window&&this.unbind()},methods:{animateClick(){this.animate=!1,this.$nextTick((()=>{this.animate=!0,window.clearTimeout(this.animateTimeout),this.animateTimeout=window.setTimeout((()=>this.animate=!1),150)}))},closeConditional(t){const e=t.target;return!(this._isDestroyed||!this.isActive||this.$refs.content.contains(e)||this.overlay&&e&&!this.overlay.$el.contains(e))&&this.activeZIndex>=this.getMaxZIndex()},hideScroll(){this.fullscreen?document.documentElement.classList.add("overflow-y-hidden"):l.A.options.methods.hideScroll.call(this)},show(){!this.fullscreen&&!this.hideOverlay&&this.genOverlay(),this.$nextTick((()=>{this.$nextTick((()=>{var t,e;(null===(t=this.$refs.dialog)||void 0===t?void 0:t.contains(document.activeElement))||(this.previousActiveElement=document.activeElement,null===(e=this.$refs.dialog)||void 0===e||e.focus()),this.bind()}))}))},bind(){window.addEventListener("focusin",this.onFocusin)},unbind(){window.removeEventListener("focusin",this.onFocusin)},onClickOutside(t){this.$emit("click:outside",t),this.persistent?this.noClickAnimation||this.animateClick():this.isActive=!1},onKeydown(t){if(t.keyCode===m.uP.esc&&!this.getOpenDependents().length)if(this.persistent)this.noClickAnimation||this.animateClick();else{this.isActive=!1;const t=this.getActivator();this.$nextTick((()=>t&&t.focus()))}this.$emit("keydown",t)},onFocusin(t){if(!t||!this.retainFocus)return;const e=t.target;if(e&&this.$refs.dialog&&![document,this.$refs.dialog].includes(e)&&!this.$refs.dialog.contains(e)&&this.activeZIndex>=this.getMaxZIndex()&&!this.getOpenDependentElements().some((t=>t.contains(e)))){const t=this.$refs.dialog.querySelectorAll('button, [href], input:not([type="hidden"]), select, textarea, [tabindex]:not([tabindex="-1"])'),e=[...t].find((t=>!t.hasAttribute("disabled")&&!t.matches('[tabindex="-1"]')));e&&e.focus()}},genContent(){return this.showLazyContent((()=>[this.$createElement(s.A,{props:{root:!0,light:this.light,dark:this.dark}},[this.$createElement("div",{class:this.contentClasses,attrs:{role:"dialog","aria-modal":this.hideOverlay?void 0:"true",...this.getScopeIdAttrs()},on:{keydown:this.onKeydown},style:{zIndex:this.activeZIndex},ref:"content"},[this.genTransition()])])]))},genTransition(){const t=this.genInnerContent();return this.transition?this.$createElement("transition",{props:{name:this.transition,origin:this.origin,appear:!0}},[t]):t},genInnerContent(){const t={class:this.classes,attrs:{tabindex:this.isActive?0:void 0},ref:"dialog",directives:[{name:"click-outside",value:{handler:this.onClickOutside,closeConditional:this.closeConditional,include:this.getOpenDependentElements}},{name:"show",value:this.isActive}],style:{transformOrigin:this.origin}};return this.fullscreen||(t.style={...t.style,maxWidth:(0,m.Dg)(this.maxWidth),width:(0,m.Dg)(this.width)}),this.$createElement("div",t,this.getContentSlot())}},render(t){return t("div",{staticClass:"v-dialog__container",class:{"v-dialog__container--attached":""===this.attach||!0===this.attach||"attach"===this.attach}},[this.genActivator(),this.genContent()])}})},3449:function(t,e,i){i.d(e,{A:function(){return o}});i(158),i(125);var s=i(5471);function n(t){return s["default"].extend({name:`v-${t}`,functional:!0,props:{id:String,tag:{type:String,default:"div"}},render(e,{props:i,data:s,children:n}){s.staticClass=`${t} ${s.staticClass||""}`.trim();const{attrs:a}=s;if(a){s.attrs={};const t=Object.keys(a).filter((t=>{if("slot"===t)return!1;const e=a[t];return t.startsWith("data-")?(s.attrs[t]=e,!1):e||"string"===typeof e}));t.length&&(s.staticClass+=` ${t.join(" ")}`)}return i.id&&(s.domProps=s.domProps||{},s.domProps.id=i.id),e(i.tag,s,n)}})}var a=i(8041),o=n("container").extend({name:"v-container",functional:!0,props:{id:String,tag:{type:String,default:"div"},fluid:{type:Boolean,default:!1}},render(t,{props:e,data:i,children:s}){let n;const{attrs:o}=i;return o&&(i.attrs={},n=Object.keys(o).filter((t=>{if("slot"===t)return!1;const e=o[t];return t.startsWith("data-")?(i.attrs[t]=e,!1):e||"string"===typeof e}))),e.id&&(i.domProps=i.domProps||{},i.domProps.id=e.id),t(e.tag,(0,a.Ay)(i,{staticClass:"container",class:Array({"container--fluid":e.fluid}).concat(n||[])}),s)}})},2367:function(t,e,i){i.d(e,{sw:function(){return a}});var s=i(198),n=i(4152);const a=(0,n.Gn)("v-toolbar__title"),o=(0,n.Gn)("v-toolbar__items");s.A}}]);
//# sourceMappingURL=235.0dddf9a4.js.map