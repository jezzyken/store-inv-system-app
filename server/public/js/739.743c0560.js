"use strict";(self["webpackChunkvue2"]=self["webpackChunkvue2"]||[]).push([[739],{4739:function(e,t,i){i.r(t),i.d(t,{default:function(){return $}});var s=i(3740),a=i(3698),r=i(2938),d=i(3180),l=i(4414),n=i(3449),o=i(6814),c=i(9991),u=i(174),m=i(6930),h=i(8983),f=i(7296),p=i(301),v=i(7683),I=i(2756),g=i(1034),A=i(7112),b=function(){var e=this,t=e._self._c;return t(n.A,{attrs:{fluid:""}},[t(o.A,{staticClass:"elevation-1 mt-4",attrs:{headers:e.headers,items:e.desserts,loading:e.isLoading,search:e.search,"item-key":"referenceCode","items-per-page-options":[5,10,20]},scopedSlots:e._u([{key:"item.isCredit",fn:function({item:i}){return[t(d.A,{attrs:{color:i.isCredit?"red":"green",dark:"",small:"",label:""}},[e._v(" "+e._s(i.isCredit?"No":"Yes")+" ")])]}},{key:"top",fn:function(){return[t(I.A,{staticClass:"pa-4",attrs:{align:"center",justify:"space-between"}},[t(l.A,{attrs:{cols:"12",sm:"6",md:"4"}},[t(A.A,{attrs:{filled:"",rounded:"",dense:"",clearable:"","hide-details":"",placeholder:"Search","prepend-inner-icon":"mdi-magnify"},model:{value:e.search,callback:function(t){e.search=t},expression:"search"}})],1),t(l.A,{attrs:{cols:"auto"}},[t(s.A,{staticClass:"mb-2",attrs:{color:"#000033",dark:"",to:{name:"AddSales"},elevation:"2",rounded:""}},[t(m.A,{attrs:{left:""}},[e._v("mdi-plus")]),e._v(" New ")],1)],1)],1)]},proxy:!0},{key:"item.hasDelivery",fn:function({item:i}){return[t(d.A,{attrs:{color:i.hasDelivery?"success":"error",small:"",label:"","text-color":"white"}},[e._v(" "+e._s(i.hasDelivery?"Yes":"No")+" ")])]}},{key:"item.actions",fn:function({item:i}){return[t(v.A,{attrs:{bottom:"",left:""},scopedSlots:e._u([{key:"activator",fn:function({on:i,attrs:a}){return[t(s.A,e._g(e._b({attrs:{icon:""}},"v-btn",a,!1),i),[t(m.A,[e._v("mdi-dots-vertical")])],1)]}}],null,!0)},[t(h.A,e._l(e.actions,(function(s,a){return t(f.A,{key:a,on:{click:function(t){return e.handleAction(s.title,i)}}},[t(p.UZ,[e._v(e._s(s.title))])],1)})),1)],1)]}},{key:"no-data",fn:function(){return[t(s.A,{attrs:{color:"#000033"},on:{click:e.initialize}},[e._v("Reset")])]},proxy:!0}],null,!0)}),t(c.A,{attrs:{"max-width":"600px"},model:{value:e.dialog,callback:function(t){e.dialog=t},expression:"dialog"}},[t(a.A,{staticClass:"rounded-lg",attrs:{elevation:"2"}},[t(r.ri,{staticClass:"headline"},[e._v(e._s(e.formTitle))]),t(r.OQ,[t(u.A,{ref:"form",model:{value:e.valid,callback:function(t){e.valid=t},expression:"valid"}},[t(A.A,{attrs:{label:"Name",outlined:"",rules:[e=>!!e||"Name is required"]},model:{value:e.editedItem.name,callback:function(t){e.$set(e.editedItem,"name",t)},expression:"editedItem.name"}}),t(A.A,{attrs:{label:"Company",outlined:""},model:{value:e.editedItem.company,callback:function(t){e.$set(e.editedItem,"company",t)},expression:"editedItem.company"}}),t(A.A,{attrs:{label:"Email",outlined:"",rules:[e=>/.+@.+\..+/.test(e)||"E-mail must be valid"]},model:{value:e.editedItem.email,callback:function(t){e.$set(e.editedItem,"email",t)},expression:"editedItem.email"}}),t(A.A,{attrs:{label:"Contact No",outlined:""},model:{value:e.editedItem.contactNo,callback:function(t){e.$set(e.editedItem,"contactNo",t)},expression:"editedItem.contactNo"}}),t(A.A,{attrs:{label:"Address",outlined:""},model:{value:e.editedItem.address,callback:function(t){e.$set(e.editedItem,"address",t)},expression:"editedItem.address"}})],1)],1),t(r.SL,[t(g.A),t(s.A,{attrs:{color:"grey darken-1",text:""},on:{click:e.close}},[e._v("Cancel")]),t(s.A,{attrs:{color:"#000033",disabled:!e.valid},on:{click:e.save}},[e._v("Save")])],1)],1)],1),t(c.A,{attrs:{"max-width":"500px"},model:{value:e.dialogDelete,callback:function(t){e.dialogDelete=t},expression:"dialogDelete"}},[t(a.A,[t(r.ri,{staticClass:"headline"},[e._v("Delete Item")]),t(r.OQ,[e._v(" Are you sure you want to delete this item? ")]),t(r.SL,[t(g.A),t(s.A,{attrs:{color:"grey darken-1",text:""},on:{click:e.closeDelete}},[e._v("Cancel")]),t(s.A,{attrs:{color:"error"},on:{click:e.deleteItemConfirm}},[e._v("Delete")])],1)],1)],1)],1)},y=[],_=(i(4114),i(5353)),x={data:()=>({dialog:!1,dialogDelete:!1,headers:[{text:"Reference Code",align:"start",sortable:!1,value:"referenceCode"},{text:"Payment Type",align:"start",sortable:!1,value:"paymentType"},{text:"Sales Amount",align:"start",sortable:!1,value:"salesTotal"},{text:"Total Orders",align:"start",sortable:!1,value:"noOfItems"},{text:"Paid in Full",align:"start",sortable:!1,value:"isCredit"},{text:"Actions",value:"actions",sortable:!1}],desserts:[],editedIndex:-1,editedItem:{name:""},defaultItem:{name:""},itemId:null,actions:[{title:"Edit"},{title:"Delete"}],isLoading:!1,search:"",valid:!0,actions:[{title:"Edit",icon:"mdi-pencil"},{title:"Delete",icon:"mdi-delete"}]}),computed:{formTitle(){return-1===this.editedIndex?"New Item":"Edit Item"}},watch:{dialog(e){e||this.close()},dialogDelete(e){e||this.closeDelete()}},created(){this.initialize()},methods:{...(0,_.i0)({getItems:"sale/getItem",addItem:"sale/addItem",removeItem:"sale/deleteItem",updateItem:"sale/updateItem"}),async initialize(){const e=await this.getItems();this.desserts=e.result},onViewItem(e){this.$router.push({name:"EditSales",params:{id:e}})},deleteItem(e){this.editedIndex=this.desserts.indexOf(e),this.itemId=e._id,this.editedItem=Object.assign({},e),this.dialogDelete=!0},async deleteItemConfirm(){await this.removeItem(this.itemId),this.desserts.splice(this.editedIndex,1),this.closeDelete()},close(){this.dialog=!1,this.$nextTick((()=>{this.editedItem=Object.assign({},this.defaultItem),this.editedIndex=-1}))},closeDelete(){this.dialogDelete=!1,this.$nextTick((()=>{this.editedItem=Object.assign({},this.defaultItem),this.editedIndex=-1}))},async save(){this.editedIndex>-1?(Object.assign(this.desserts[this.editedIndex],this.editedItem),await this.updateItem(this.editedItem)):(this.desserts.push(this.editedItem),await this.addItem(this.editedItem)),this.close()},handleAction(e,t){switch(e){case"Edit":this.$router.push({name:"EditSales",params:{id:t._id}});break;case"Delete":this.deleteItem(t);break;default:break}}}},k=x,w=i(1656),C=(0,w.A)(k,b,y,!1,null,"3e1098c6",null),$=C.exports},174:function(e,t,i){i(4114);var s=i(5803),a=i(7717),r=i(7540),d=i(4152);t.A=(0,s.A)(a.A,(0,r.G)("form")).extend({name:"v-form",provide(){return{form:this}},inheritAttrs:!1,props:{disabled:Boolean,lazyValidation:Boolean,readonly:Boolean,value:Boolean},data:()=>({inputs:[],watchers:[],errorBag:{}}),watch:{errorBag:{handler(e){const t=Object.values(e).includes(!0);this.$emit("input",!t)},deep:!0,immediate:!0}},methods:{watchInput(e){const t=e=>e.$watch("hasError",(t=>{this.$set(this.errorBag,e._uid,t)}),{immediate:!0}),i={_uid:e._uid,valid:()=>{},shouldValidate:()=>{}};return this.lazyValidation?i.shouldValidate=e.$watch("shouldValidate",(s=>{s&&(this.errorBag.hasOwnProperty(e._uid)||(i.valid=t(e)))})):i.valid=t(e),i},validate(){return 0===this.inputs.filter((e=>!e.validate(!0))).length},reset(){this.inputs.forEach((e=>e.reset())),this.resetErrorBag()},resetErrorBag(){this.lazyValidation&&setTimeout((()=>{this.errorBag={}}),0)},resetValidation(){this.inputs.forEach((e=>e.resetValidation())),this.resetErrorBag()},register(e){this.inputs.push(e),this.watchers.push(this.watchInput(e))},unregister(e){const t=this.inputs.find((t=>t._uid===e._uid));if(!t)return;const i=this.watchers.find((e=>e._uid===t._uid));i&&(i.valid(),i.shouldValidate()),this.watchers=this.watchers.filter((e=>e._uid!==t._uid)),this.inputs=this.inputs.filter((e=>e._uid!==t._uid)),this.$delete(this.errorBag,t._uid)}},render(e){return e("form",{staticClass:"v-form",attrs:{novalidate:!0,...this.attrs$},on:{submit:e=>this.$emit("submit",e)}},(0,d.$c)(this))}})},3449:function(e,t,i){i.d(t,{A:function(){return d}});i(158),i(125);var s=i(5471);function a(e){return s["default"].extend({name:`v-${e}`,functional:!0,props:{id:String,tag:{type:String,default:"div"}},render(t,{props:i,data:s,children:a}){s.staticClass=`${e} ${s.staticClass||""}`.trim();const{attrs:r}=s;if(r){s.attrs={};const e=Object.keys(r).filter((e=>{if("slot"===e)return!1;const t=r[e];return e.startsWith("data-")?(s.attrs[e]=t,!1):t||"string"===typeof t}));e.length&&(s.staticClass+=` ${e.join(" ")}`)}return i.id&&(s.domProps=s.domProps||{},s.domProps.id=i.id),t(i.tag,s,a)}})}var r=i(8041),d=a("container").extend({name:"v-container",functional:!0,props:{id:String,tag:{type:String,default:"div"},fluid:{type:Boolean,default:!1}},render(e,{props:t,data:i,children:s}){let a;const{attrs:d}=i;return d&&(i.attrs={},a=Object.keys(d).filter((e=>{if("slot"===e)return!1;const t=d[e];return e.startsWith("data-")?(i.attrs[e]=t,!1):t||"string"===typeof t}))),t.id&&(i.domProps=i.domProps||{},i.domProps.id=t.id),e(t.tag,(0,r.Ay)(i,{staticClass:"container",class:Array({"container--fluid":t.fluid}).concat(a||[])}),s)}})}}]);
//# sourceMappingURL=739.743c0560.js.map