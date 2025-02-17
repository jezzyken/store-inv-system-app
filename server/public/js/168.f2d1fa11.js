"use strict";(self["webpackChunkvue2"]=self["webpackChunkvue2"]||[]).push([[168],{3516:function(t,e,i){i.r(e),i.d(e,{default:function(){return $}});var s=i(3740),a=i(3698),n=i(2938),o=i(4414),r=i(3449),d=i(6814),l=i(9991),c=i(6930),h=i(8983),u=i(7296),m=i(8924),v=i(7683),g=i(2756),f=i(1034),b=i(7112),p=i(198),A=function(){var t=this,e=t._self._c;return e(r.A,[e(d.A,{staticClass:"elevation-1 mt-n2",attrs:{headers:t.headers,items:t.items,loading:t.isLoading,search:t.search},scopedSlots:t._u([{key:"top",fn:function(){return[e(p.A,{attrs:{flat:""}},[e("div",{staticStyle:{width:"400px"}},[e(b.A,{attrs:{filled:"",rounded:"",dense:"","hide-details":"",placeholder:"Search","append-icon":"mdi-filter-variant"},model:{value:t.search,callback:function(e){t.search=e},expression:"search"}})],1),e(f.A),e(l.A,{attrs:{"max-width":"500px"},scopedSlots:t._u([{key:"activator",fn:function({on:i,attrs:a}){return[e(s.A,t._g(t._b({staticClass:"mb-2",attrs:{color:"#000033",dark:"",small:""}},"v-btn",a,!1),i),[t._v(" New Debtor ")])]}}]),model:{value:t.dialog,callback:function(e){t.dialog=e},expression:"dialog"}},[e(a.A,[e(n.ri,[e("span",{staticClass:"text-h5"},[t._v(t._s(t.formTitle))])]),e(n.OQ,[e(r.A,[e(g.A,[e(o.A,{attrs:{cols:"12"}},[e(b.A,{attrs:{label:"Name",outlined:"",rules:[t=>!!t||"Name is required"],required:""},on:{input:t.validateForm},model:{value:t.editedItem.name,callback:function(e){t.$set(t.editedItem,"name",e)},expression:"editedItem.name"}})],1),e(o.A,{attrs:{cols:"12"}},[e(b.A,{attrs:{label:"Credit Limit",type:"number",outlined:"",rules:[t=>!!t||"Credit limit is required"],required:""},on:{input:t.validateForm},model:{value:t.editedItem.creditLimit,callback:function(e){t.$set(t.editedItem,"creditLimit",e)},expression:"editedItem.creditLimit"}})],1),e(o.A,{attrs:{cols:"12"}},[e(b.A,{attrs:{label:"Address",outlined:"",rules:[t=>!!t||"Address is required"],required:""},on:{input:t.validateForm},model:{value:t.editedItem.address,callback:function(e){t.$set(t.editedItem,"address",e)},expression:"editedItem.address"}})],1),e(o.A,{attrs:{cols:"12"}},[e(b.A,{attrs:{label:"Contact",outlined:"",rules:t.contactRules,required:"",placeholder:"09123456789"},on:{input:t.validateContact},model:{value:t.editedItem.contact,callback:function(e){t.$set(t.editedItem,"contact",e)},expression:"editedItem.contact"}})],1)],1)],1)],1),e(n.SL,[e(f.A),e(s.A,{attrs:{color:"blue darken-1",text:""},on:{click:t.close}},[t._v("Cancel")]),e(s.A,{attrs:{color:"blue darken-1",text:"",disabled:!t.isFormValid},on:{click:t.save}},[t._v(" Save ")])],1)],1)],1),e(l.A,{attrs:{"max-width":"500px"},model:{value:t.dialogDelete,callback:function(e){t.dialogDelete=e},expression:"dialogDelete"}},[e(a.A,[e(n.ri,{staticClass:"text-h5"},[t._v(" Are you sure you want to delete this item? ")]),e(n.SL,[e(f.A),e(s.A,{attrs:{color:"blue darken-1",text:""},on:{click:t.closeDelete}},[t._v("Cancel")]),e(s.A,{attrs:{color:"blue darken-1",text:""},on:{click:t.deleteItemConfirm}},[t._v("OK")]),e(f.A)],1)],1)],1)],1)]},proxy:!0},{key:"item.actions",fn:function({item:i}){return[e(v.A,{attrs:{bottom:"",left:""},scopedSlots:t._u([{key:"activator",fn:function({attrs:i,on:a}){return[e(s.A,t._g(t._b({attrs:{icon:""}},"v-btn",i,!1),a),[e(c.A,[t._v("mdi-dots-vertical")])],1)]}}],null,!0)},[e(h.A,t._l(t.getAvailableActions(i),(function(s,a){return e(u.A,{key:a,on:{click:function(e){return t.handleAction(s.title,i)}}},[e(m.UZ,[t._v(t._s(s.title))])],1)})),1)],1)]}}],null,!0)})],1)},x=[],I=(i(4114),i(5353)),k={name:"DebtorPage",data:()=>({dialog:!1,dialogDelete:!1,search:"",isLoading:!1,isFormValid:!1,contactRules:[t=>!!t||"Contact number is required",t=>/^09\d{9}$/.test(t)||"Contact number must start with 09 and have 11 digits"],headers:[{text:"Name",align:"start",sortable:!1,value:"name"},{text:"Credit Limit",align:"start",sortable:!1,value:"creditLimit"},{text:"Available Credit",align:"start",sortable:!1,value:"availableCredit"},{text:"Balance",align:"start",sortable:!1,value:"balance"},{text:"Address",align:"start",sortable:!1,value:"address"},{text:"Contact",align:"start",sortable:!1,value:"contact"},{text:"Options",value:"actions",sortable:!1}],items:[],editedIndex:-1,editedItem:{name:"",creditLimit:0,availableCredit:0,address:"",contact:""},defaultItem:{name:"",creditLimit:0,availableCredit:0,address:"",contact:""},itemId:null,actions:[{title:"View Profile"},{title:"Edit"},{title:"Delete"}]}),computed:{formTitle(){return-1===this.editedIndex?"New Debtor":"Edit Debtor"}},watch:{dialog(t){t||this.close()},dialogDelete(t){t||this.closeDelete()}},created(){this.initialize()},methods:{...(0,I.i0)({getItems:"debtor/getDebtors",addItem:"debtor/addDebtor",removeItem:"debtor/deleteDebtor",updateItem:"debtor/updateDebtor"}),validateContact(t){t&&(this.editedItem.contact=t.replace(/[^0-9]/g,"")),this.validateForm()},validateForm(){this.isFormValid=this.editedItem.name&&this.editedItem.creditLimit&&this.editedItem.address&&this.editedItem.contact&&/^09\d{9}$/.test(this.editedItem.contact)},async initialize(){this.isLoading=!0;try{const t=await this.getItems();this.items=t.map((t=>({...t,balance:t.creditLimit-t.availableCredit})))}catch(t){console.error("Error fetching debtors:",t)}finally{this.isLoading=!1}},getAvailableActions(t){const e=t.creditLimit-t.availableCredit;return this.actions.filter((t=>!("Delete"===t.title&&e>0)))},editItem(t){this.editedIndex=this.items.indexOf(t),this.editedItem=Object.assign({},t),this.dialog=!0,this.validateForm()},deleteItem(t){this.editedIndex=this.items.indexOf(t),this.itemId=t._id,this.editedItem=Object.assign({},t),this.dialogDelete=!0},async deleteItemConfirm(){try{await this.removeItem(this.itemId),this.items.splice(this.editedIndex,1),this.closeDelete()}catch(t){console.error("Error deleting debtor:",t)}},close(){this.dialog=!1,this.$nextTick((()=>{this.editedItem=Object.assign({},this.defaultItem),this.editedIndex=-1,this.isFormValid=!1}))},closeDelete(){this.dialogDelete=!1,this.$nextTick((()=>{this.editedItem=Object.assign({},this.defaultItem),this.editedIndex=-1}))},async save(){if(this.isFormValid)try{if(this.editedIndex>-1)await this.updateItem(this.editedItem),Object.assign(this.items[this.editedIndex],this.editedItem);else{const t=await this.addItem(this.editedItem);this.items.push(t)}this.close()}catch(t){console.error("Error saving debtor:",t)}},handleAction(t,e){switch(t){case"View Profile":this.$router.push(`/debtors/${e._id}`);break;case"Edit":this.editItem(e);break;case"Delete":this.deleteItem(e);break;default:break}}}},y=k,C=i(1656),w=(0,C.A)(y,A,x,!1,null,null,null),$=w.exports},9991:function(t,e,i){i.d(e,{A:function(){return g}});var s=i(4596),a=i(5030),n=i(2031),o=i(7631),r=i(8171),d=i(7198),l=i(5648),c=i(4598),h=i(5803),u=i(1920),m=i(4152);const v=(0,h.A)(n.A,o.A,r.A,d.A,l.A,a.A);var g=v.extend({name:"v-dialog",directives:{ClickOutside:c.A},props:{dark:Boolean,disabled:Boolean,fullscreen:Boolean,light:Boolean,maxWidth:[String,Number],noClickAnimation:Boolean,origin:{type:String,default:"center center"},persistent:Boolean,retainFocus:{type:Boolean,default:!0},scrollable:Boolean,transition:{type:[String,Boolean],default:"dialog-transition"},width:[String,Number]},data(){return{activatedBy:null,animate:!1,animateTimeout:-1,stackMinZIndex:200,previousActiveElement:null}},computed:{classes(){return{[`v-dialog ${this.contentClass}`.trim()]:!0,"v-dialog--active":this.isActive,"v-dialog--persistent":this.persistent,"v-dialog--fullscreen":this.fullscreen,"v-dialog--scrollable":this.scrollable,"v-dialog--animated":this.animate}},contentClasses(){return{"v-dialog__content":!0,"v-dialog__content--active":this.isActive}},hasActivator(){return Boolean(!!this.$slots.activator||!!this.$scopedSlots.activator)}},watch:{isActive(t){var e;t?(this.show(),this.hideScroll()):(this.removeOverlay(),this.unbind(),null===(e=this.previousActiveElement)||void 0===e||e.focus())},fullscreen(t){this.isActive&&(t?(this.hideScroll(),this.removeOverlay(!1)):(this.showScroll(),this.genOverlay()))}},created(){this.$attrs.hasOwnProperty("full-width")&&(0,u.rq)("full-width",this)},beforeMount(){this.$nextTick((()=>{this.isBooted=this.isActive,this.isActive&&this.show()}))},beforeDestroy(){"undefined"!==typeof window&&this.unbind()},methods:{animateClick(){this.animate=!1,this.$nextTick((()=>{this.animate=!0,window.clearTimeout(this.animateTimeout),this.animateTimeout=window.setTimeout((()=>this.animate=!1),150)}))},closeConditional(t){const e=t.target;return!(this._isDestroyed||!this.isActive||this.$refs.content.contains(e)||this.overlay&&e&&!this.overlay.$el.contains(e))&&this.activeZIndex>=this.getMaxZIndex()},hideScroll(){this.fullscreen?document.documentElement.classList.add("overflow-y-hidden"):r.A.options.methods.hideScroll.call(this)},show(){!this.fullscreen&&!this.hideOverlay&&this.genOverlay(),this.$nextTick((()=>{this.$nextTick((()=>{var t,e;(null===(t=this.$refs.dialog)||void 0===t?void 0:t.contains(document.activeElement))||(this.previousActiveElement=document.activeElement,null===(e=this.$refs.dialog)||void 0===e||e.focus()),this.bind()}))}))},bind(){window.addEventListener("focusin",this.onFocusin)},unbind(){window.removeEventListener("focusin",this.onFocusin)},onClickOutside(t){this.$emit("click:outside",t),this.persistent?this.noClickAnimation||this.animateClick():this.isActive=!1},onKeydown(t){if(t.keyCode===m.uP.esc&&!this.getOpenDependents().length)if(this.persistent)this.noClickAnimation||this.animateClick();else{this.isActive=!1;const t=this.getActivator();this.$nextTick((()=>t&&t.focus()))}this.$emit("keydown",t)},onFocusin(t){if(!t||!this.retainFocus)return;const e=t.target;if(e&&this.$refs.dialog&&![document,this.$refs.dialog].includes(e)&&!this.$refs.dialog.contains(e)&&this.activeZIndex>=this.getMaxZIndex()&&!this.getOpenDependentElements().some((t=>t.contains(e)))){const t=this.$refs.dialog.querySelectorAll('button, [href], input:not([type="hidden"]), select, textarea, [tabindex]:not([tabindex="-1"])'),e=[...t].find((t=>!t.hasAttribute("disabled")&&!t.matches('[tabindex="-1"]')));e&&e.focus()}},genContent(){return this.showLazyContent((()=>[this.$createElement(s.A,{props:{root:!0,light:this.light,dark:this.dark}},[this.$createElement("div",{class:this.contentClasses,attrs:{role:"dialog","aria-modal":this.hideOverlay?void 0:"true",...this.getScopeIdAttrs()},on:{keydown:this.onKeydown},style:{zIndex:this.activeZIndex},ref:"content"},[this.genTransition()])])]))},genTransition(){const t=this.genInnerContent();return this.transition?this.$createElement("transition",{props:{name:this.transition,origin:this.origin,appear:!0}},[t]):t},genInnerContent(){const t={class:this.classes,attrs:{tabindex:this.isActive?0:void 0},ref:"dialog",directives:[{name:"click-outside",value:{handler:this.onClickOutside,closeConditional:this.closeConditional,include:this.getOpenDependentElements}},{name:"show",value:this.isActive}],style:{transformOrigin:this.origin}};return this.fullscreen||(t.style={...t.style,maxWidth:(0,m.Dg)(this.maxWidth),width:(0,m.Dg)(this.width)}),this.$createElement("div",t,this.getContentSlot())}},render(t){return t("div",{staticClass:"v-dialog__container",class:{"v-dialog__container--attached":""===this.attach||!0===this.attach||"attach"===this.attach}},[this.genActivator(),this.genContent()])}})},3449:function(t,e,i){i.d(e,{A:function(){return o}});i(158),i(125);var s=i(5471);function a(t){return s["default"].extend({name:`v-${t}`,functional:!0,props:{id:String,tag:{type:String,default:"div"}},render(e,{props:i,data:s,children:a}){s.staticClass=`${t} ${s.staticClass||""}`.trim();const{attrs:n}=s;if(n){s.attrs={};const t=Object.keys(n).filter((t=>{if("slot"===t)return!1;const e=n[t];return t.startsWith("data-")?(s.attrs[t]=e,!1):e||"string"===typeof e}));t.length&&(s.staticClass+=` ${t.join(" ")}`)}return i.id&&(s.domProps=s.domProps||{},s.domProps.id=i.id),e(i.tag,s,a)}})}var n=i(8041),o=a("container").extend({name:"v-container",functional:!0,props:{id:String,tag:{type:String,default:"div"},fluid:{type:Boolean,default:!1}},render(t,{props:e,data:i,children:s}){let a;const{attrs:o}=i;return o&&(i.attrs={},a=Object.keys(o).filter((t=>{if("slot"===t)return!1;const e=o[t];return t.startsWith("data-")?(i.attrs[t]=e,!1):e||"string"===typeof e}))),e.id&&(i.domProps=i.domProps||{},i.domProps.id=e.id),t(e.tag,(0,n.Ay)(i,{staticClass:"container",class:Array({"container--fluid":e.fluid}).concat(a||[])}),s)}})}}]);
//# sourceMappingURL=168.f2d1fa11.js.map