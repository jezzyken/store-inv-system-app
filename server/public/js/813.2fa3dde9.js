"use strict";(self["webpackChunkvue2"]=self["webpackChunkvue2"]||[]).push([[813],{9144:function(t,e,a){a.r(e),a.d(e,{default:function(){return x}});var r=a(3740),s=a(3698),i=a(2938),o=a(4414),n=a(3449),l=a(9483),d=a(174),u=a(6930),c=a(2756),p=a(4312),m=a(2498),h=a(7112),g=a(5803);const v=(0,g.A)(h.A);var f=v.extend({name:"v-textarea",props:{autoGrow:Boolean,noResize:Boolean,rowHeight:{type:[Number,String],default:24,validator:t=>!isNaN(parseFloat(t))},rows:{type:[Number,String],default:5,validator:t=>!isNaN(parseInt(t,10))}},computed:{classes(){return{"v-textarea":!0,"v-textarea--auto-grow":this.autoGrow,"v-textarea--no-resize":this.noResizeHandle,...h.A.options.computed.classes.call(this)}},noResizeHandle(){return this.noResize||this.autoGrow}},watch:{autoGrow(t){this.$nextTick((()=>{var e;t?this.calculateInputHeight():null===(e=this.$refs.input)||void 0===e||e.style.removeProperty("height")}))},lazyValue(){this.autoGrow&&this.$nextTick(this.calculateInputHeight)},rowHeight(){this.autoGrow&&this.$nextTick(this.calculateInputHeight)}},mounted(){setTimeout((()=>{this.autoGrow&&this.calculateInputHeight()}),0)},methods:{calculateInputHeight(){const t=this.$refs.input;if(!t)return;t.style.height="0";const e=t.scrollHeight,a=parseInt(this.rows,10)*parseFloat(this.rowHeight);t.style.height=Math.max(a,e)+"px"},genInput(){const t=h.A.options.methods.genInput.call(this);return t.tag="textarea",delete t.data.attrs.type,t.data.attrs.rows=this.rows,t},onInput(t){h.A.options.methods.onInput.call(this,t),this.autoGrow&&this.calculateInputHeight()},onKeyDown(t){this.isFocused&&13===t.keyCode&&t.stopPropagation(),this.$emit("keydown",t)}}}),y=function(){var t=this,e=t._self._c;return e(n.A,[e(s.A,[e(i.ri,[e("h2",{staticClass:"headline"},[t._v("Product Management")])]),e(i.OQ,[e(d.A,{ref:"form",model:{value:t.valid,callback:function(e){t.valid=e},expression:"valid"}},[e(c.A,[e(o.A,{attrs:{cols:"12",md:"6"}},[e(h.A,{attrs:{rules:[t.rules.required],label:"Product Name",outlined:"",required:""},model:{value:t.product.name,callback:function(e){t.$set(t.product,"name",e)},expression:"product.name"}})],1),e(o.A,{attrs:{cols:"12",md:"6"}},[e(p.A,{attrs:{items:t.categories,rules:[t.rules.required],label:"Category","item-text":"name","item-value":"_id",outlined:"",required:""},model:{value:t.product.category,callback:function(e){t.$set(t.product,"category",e)},expression:"product.category"}})],1),e(o.A,{attrs:{cols:"12",md:"6"}},[e(p.A,{attrs:{items:t.brands,rules:[t.rules.required],label:"Brand","item-text":"name","item-value":"_id",outlined:"",required:""},model:{value:t.product.brand,callback:function(e){t.$set(t.product,"brand",e)},expression:"product.brand"}})],1),e(o.A,{attrs:{cols:"12",md:"6"}},[e(h.A,{attrs:{label:"Image URL",placeholder:"Enter image URL",outlined:""},model:{value:t.product.image,callback:function(e){t.$set(t.product,"image",e)},expression:"product.image"}})],1),e(o.A,{attrs:{cols:"12"}},[e(f,{attrs:{label:"Product Details",placeholder:"Enter product details",outlined:""},model:{value:t.product.details,callback:function(e){t.$set(t.product,"details",e)},expression:"product.details"}})],1),e(o.A,{attrs:{cols:"12",md:"6"}},[e(p.A,{attrs:{items:t.types,rules:[t.rules.required],label:"Type",outlined:"",required:""},model:{value:t.product.type,callback:function(e){t.$set(t.product,"type",e)},expression:"product.type"}})],1),"Variants"!==t.product.type?e(o.A,{attrs:{cols:"12",md:"6"}},[e(h.A,{attrs:{rules:[t.rules.required],label:"UPC",outlined:"",required:""},model:{value:t.product.upc,callback:function(e){t.$set(t.product,"upc",e)},expression:"product.upc"}})],1):t._e(),"Variants"!==t.product.type?e(o.A,{attrs:{cols:"12",md:"6"}},[e(h.A,{attrs:{rules:[t.rules.required],label:"Cost",type:"number",outlined:"",required:""},model:{value:t.product.cost,callback:function(e){t.$set(t.product,"cost",e)},expression:"product.cost"}})],1):t._e(),"Variants"!==t.product.type?e(o.A,{attrs:{cols:"12",md:"6"}},[e(h.A,{attrs:{rules:[t.rules.required],label:"Price",type:"number",outlined:"",required:""},model:{value:t.product.price,callback:function(e){t.$set(t.product,"price",e)},expression:"product.price"}})],1):t._e(),e(o.A,{attrs:{cols:"12",md:"6"}},[e(p.A,{attrs:{items:t.units,rules:[t.rules.required],label:"Unit","item-text":"name","item-value":"_id",outlined:"",required:""},model:{value:t.product.unit,callback:function(e){t.$set(t.product,"unit",e)},expression:"product.unit"}})],1),"Variants"!==t.product.type?e(o.A,{attrs:{cols:"12",md:"6"}},[e(h.A,{attrs:{rules:[t.rules.required],label:"Initial Stocks",type:"number",outlined:"",required:"",disabled:"add"!==t.mode},model:{value:t.product.stocks,callback:function(e){t.$set(t.product,"stocks",e)},expression:"product.stocks"}})],1):t._e(),e(o.A,{attrs:{cols:"12",md:"6"}}),e(o.A,{attrs:{cols:"12",md:"6"}},[e(h.A,{attrs:{label:"Stock Alert",type:"number",outlined:""},model:{value:t.product.stockAlert,callback:function(e){t.$set(t.product,"stockAlert",e)},expression:"product.stockAlert"}})],1),"Variants"===t.product.type?e(o.A,{attrs:{cols:"6"}},[e("div",{staticClass:"d-flex"},[e(h.A,{attrs:{label:"New Variant Name",outlined:""},model:{value:t.newVariantName,callback:function(e){t.newVariantName=e},expression:"newVariantName"}}),e(r.A,{attrs:{color:"#000033",dark:""},on:{click:t.createVariant}},[t._v("Create Variant")])],1)]):t._e(),"Variants"===t.product.type?e(o.A,{attrs:{cols:"12"}},[e(l.A)],1):t._e(),"Variants"===t.product.type?e(o.A,{attrs:{cols:"12"}},[e(m.A,{scopedSlots:t._u([{key:"default",fn:function(){return[e("thead",[e("tr",[e("th",{staticClass:"text-left"},[t._v("Variant Code")]),e("th",{staticClass:"text-left"},[t._v("Variant Name")]),e("th",{staticClass:"text-left"},[t._v("Variant Cost")]),e("th",{staticClass:"text-left"},[t._v("Variant Price")]),e("th",{staticClass:"text-left"},[t._v("Initial Stocks")]),e("th",{staticClass:"text-left"},[t._v("Action")])])]),e("tbody",t._l(t.product.variants,(function(a,s){return e("tr",{key:s},[e("td",{staticClass:"pa-5"},[e(h.A,{attrs:{outlined:"",required:""},model:{value:a.upc,callback:function(e){t.$set(a,"upc",e)},expression:"variant.upc"}})],1),e("td",[e(h.A,{attrs:{outlined:"",required:"",disabled:""},model:{value:a.name,callback:function(e){t.$set(a,"name",e)},expression:"variant.name"}})],1),e("td",[e(h.A,{attrs:{type:"number",outlined:"",required:""},model:{value:a.cost,callback:function(e){t.$set(a,"cost",e)},expression:"variant.cost"}})],1),e("td",[e(h.A,{attrs:{type:"number",outlined:"",required:""},model:{value:a.price,callback:function(e){t.$set(a,"price",e)},expression:"variant.price"}})],1),e("td",[e(h.A,{attrs:{type:"Initial Stocks",outlined:"",required:"",disabled:"add"!==t.mode},model:{value:a.stocks,callback:function(e){t.$set(a,"stocks",e)},expression:"variant.stocks"}})],1),e("td",[e(r.A,{staticClass:"mt-n8",attrs:{dark:"",color:"error",large:""},on:{click:function(e){return t.removeVariant(t.stock,t.i)}}},[e(u.A,[t._v("mdi-trash-can-outline")])],1)],1)])})),0)]},proxy:!0}],null,!1,1080896765)})],1):t._e(),e(c.A,{staticClass:"ma-0 mt-6 mx-5 my-5",attrs:{justify:"end"}},[e(r.A,{attrs:{dark:"",color:t.pageMode.color},on:{click:t.pageMode.action}},[t._v(t._s(t.pageMode.label))]),e("div",{staticClass:"ma-1"}),e(r.A,[t._v("clear")])],1)],1)],1)],1)],1)],1)},A=[],b=(a(4114),a(5353)),k={props:{mode:String},data(){return{valid:!1,product:{name:"",upc:"",category:null,brand:null,image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOtjqFKVwZWNCqI33H1OWcsUaZYww6FLLFAw&s",details:"",type:"",cost:null,price:null,unit:null,minimumSaleQty:null,stocks:0,stockAlert:0,variants:[]},categories:[],brands:[],units:[],newVariantName:"",types:["Standard","Variants"],rules:{required:t=>!!t||"Required."}}},computed:{pageMode(){let t={color:"warning",action:this.onUpdateItem,label:"update"};return"add"===this.mode&&(t={color:"#000033",action:this.onAddItem,label:"add"}),t}},methods:{...(0,b.i0)({getItemById:"product/getItemById",getItemByProductId:"itemPrice/getItemByProductId",addItem:"product/addItem",updateItem:"product/updateItem",getCategoryItems:"category/getItem",getVariantItems:"variant/getItem",getUnitItems:"unit/getItem",getBrandItems:"brand/getItem",getSupplierItems:"supplier/getItem"}),async initialize(){const t=await this.getItemById(this.$route.params.id);this.product={...t.result,brand:t.result.brand._id,category:t.result.category._id,unit:t.result.unit._id}},submit(){this.$refs.form.validate()&&console.log("Product submitted:",this.product)},async onAddItem(){this.$refs.form.validate()&&(await this.addItem({...this.product}),this.$router.push("/product"))},async onUpdateItem(){const t={id:this.$route?.params?.id,data:this.product};console.log(t),await this.updateItem(t),this.$router.push("/product")},removeVariant(t){this.product.variants.splice(t,1)},createVariant(){this.newVariantName&&(this.product.variants.push({code:"",name:`${this.product.name}-${this.newVariantName}`,cost:null,price:null}),this.newVariantName="")},async fetch(){const t=await this.getCategoryItems(),e=await this.getUnitItems(),a=await this.getBrandItems();this.categories=t.result,this.units=e.result,this.brands=a.result}},mounted(){this.fetch(),this.$route?.params?.id&&this.initialize()}},I=k,_=a(1656),w=(0,_.A)(I,y,A,!1,null,"2e699035",null),x=w.exports},3698:function(t,e,a){a(6001);var r=a(9375),s=a(1611),i=a(8418),o=a(5803),n=a(4152);e.A=(0,o.A)(s.A,i.A,r.A).extend({name:"v-card",props:{flat:Boolean,hover:Boolean,img:String,link:Boolean,loaderHeight:{type:[Number,String],default:4},raised:Boolean},computed:{classes(){return{"v-card":!0,...i.A.options.computed.classes.call(this),"v-card--flat":this.flat,"v-card--hover":this.hover,"v-card--link":this.isClickable,"v-card--loading":this.loading,"v-card--disabled":this.disabled,"v-card--raised":this.raised,...r.A.options.computed.classes.call(this)}},styles(){const t={...r.A.options.computed.styles.call(this)};return this.img&&(t.background=`url("${this.img}") center center / cover no-repeat`),t}},methods:{genProgress(){const t=s.A.options.methods.genProgress.call(this);return t?this.$createElement("div",{staticClass:"v-card__progress",key:"progress"},[t]):null}},render(t){const{tag:e,data:a}=this.generateRouteLink();return a.style=this.styles,this.isClickable&&(a.attrs=a.attrs||{},a.attrs.tabindex=0),t(e,this.setBackgroundColor(this.color,a),[this.genProgress(),(0,n.$c)(this)])}})},2938:function(t,e,a){a.d(e,{OQ:function(){return n},SL:function(){return i},ri:function(){return l}});var r=a(3698),s=a(4152);const i=(0,s.Gn)("v-card__actions"),o=(0,s.Gn)("v-card__subtitle"),n=(0,s.Gn)("v-card__text"),l=(0,s.Gn)("v-card__title");r.A},174:function(t,e,a){a(4114);var r=a(5803),s=a(7717),i=a(7540),o=a(4152);e.A=(0,r.A)(s.A,(0,i.G)("form")).extend({name:"v-form",provide(){return{form:this}},inheritAttrs:!1,props:{disabled:Boolean,lazyValidation:Boolean,readonly:Boolean,value:Boolean},data:()=>({inputs:[],watchers:[],errorBag:{}}),watch:{errorBag:{handler(t){const e=Object.values(t).includes(!0);this.$emit("input",!e)},deep:!0,immediate:!0}},methods:{watchInput(t){const e=t=>t.$watch("hasError",(e=>{this.$set(this.errorBag,t._uid,e)}),{immediate:!0}),a={_uid:t._uid,valid:()=>{},shouldValidate:()=>{}};return this.lazyValidation?a.shouldValidate=t.$watch("shouldValidate",(r=>{r&&(this.errorBag.hasOwnProperty(t._uid)||(a.valid=e(t)))})):a.valid=e(t),a},validate(){return 0===this.inputs.filter((t=>!t.validate(!0))).length},reset(){this.inputs.forEach((t=>t.reset())),this.resetErrorBag()},resetErrorBag(){this.lazyValidation&&setTimeout((()=>{this.errorBag={}}),0)},resetValidation(){this.inputs.forEach((t=>t.resetValidation())),this.resetErrorBag()},register(t){this.inputs.push(t),this.watchers.push(this.watchInput(t))},unregister(t){const e=this.inputs.find((e=>e._uid===t._uid));if(!e)return;const a=this.watchers.find((t=>t._uid===e._uid));a&&(a.valid(),a.shouldValidate()),this.watchers=this.watchers.filter((t=>t._uid!==e._uid)),this.inputs=this.inputs.filter((t=>t._uid!==e._uid)),this.$delete(this.errorBag,e._uid)}},render(t){return t("form",{staticClass:"v-form",attrs:{novalidate:!0,...this.attrs$},on:{submit:t=>this.$emit("submit",t)}},(0,o.$c)(this))}})},3449:function(t,e,a){a.d(e,{A:function(){return o}});a(158),a(125);var r=a(5471);function s(t){return r["default"].extend({name:`v-${t}`,functional:!0,props:{id:String,tag:{type:String,default:"div"}},render(e,{props:a,data:r,children:s}){r.staticClass=`${t} ${r.staticClass||""}`.trim();const{attrs:i}=r;if(i){r.attrs={};const t=Object.keys(i).filter((t=>{if("slot"===t)return!1;const e=i[t];return t.startsWith("data-")?(r.attrs[t]=e,!1):e||"string"===typeof e}));t.length&&(r.staticClass+=` ${t.join(" ")}`)}return a.id&&(r.domProps=r.domProps||{},r.domProps.id=a.id),e(a.tag,r,s)}})}var i=a(8041),o=s("container").extend({name:"v-container",functional:!0,props:{id:String,tag:{type:String,default:"div"},fluid:{type:Boolean,default:!1}},render(t,{props:e,data:a,children:r}){let s;const{attrs:o}=a;return o&&(a.attrs={},s=Object.keys(o).filter((t=>{if("slot"===t)return!1;const e=o[t];return t.startsWith("data-")?(a.attrs[t]=e,!1):e||"string"===typeof e}))),e.id&&(a.domProps=a.domProps||{},a.domProps.id=e.id),t(e.tag,(0,i.Ay)(a,{staticClass:"container",class:Array({"container--fluid":e.fluid}).concat(s||[])}),r)}})}}]);
//# sourceMappingURL=813.2fa3dde9.js.map