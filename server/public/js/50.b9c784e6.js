"use strict";(self["webpackChunkvue2"]=self["webpackChunkvue2"]||[]).push([[50],{5318:function(t,e,s){s.r(e),s.d(e,{default:function(){return D}});var i=s(3740),a=s(3698),n=s(2938),r=s(3180),o=s(4414),l=s(3449),c=s(6814),d=s(1446),u=s(9991),h=s(9483),v=s(6930),m=s(7683),y=s(2756),p=s(4312),g=s(2498),f=s(1034),A=s(7112),_=function(){var t=this,e=t._self._c;return e(l.A,{attrs:{fluid:""}},[e(a.A,{staticClass:"mb-4"},[e(n.OQ,[e(y.A,{attrs:{align:"center"}},[e(o.A,{attrs:{cols:"12",md:"4"}},[e(p.A,{attrs:{items:t.reportTypes,label:"Report Type",outlined:"",dense:""},model:{value:t.selectedReportType,callback:function(e){t.selectedReportType=e},expression:"selectedReportType"}})],1),"sales"===t.selectedReportType?e(o.A,{attrs:{cols:"12",md:"8"}},[e(y.A,[e(o.A,{attrs:{cols:"5"}},[e(m.A,{attrs:{"close-on-content-click":!1,"nudge-right":40,transition:"scale-transition","offset-y":"","min-width":"auto"},scopedSlots:t._u([{key:"activator",fn:function({on:s,attrs:i}){return[e(A.A,t._g(t._b({attrs:{label:"Start Date","prepend-icon":"mdi-calendar",readonly:"",outlined:"",dense:""},model:{value:t.dateRange.startDate,callback:function(e){t.$set(t.dateRange,"startDate",e)},expression:"dateRange.startDate"}},"v-text-field",i,!1),s))]}}],null,!1,1400992922),model:{value:t.startDateMenu,callback:function(e){t.startDateMenu=e},expression:"startDateMenu"}},[e(d.A,{on:{input:function(e){t.startDateMenu=!1}},model:{value:t.dateRange.startDate,callback:function(e){t.$set(t.dateRange,"startDate",e)},expression:"dateRange.startDate"}})],1)],1),e(o.A,{attrs:{cols:"5"}},[e(m.A,{attrs:{"close-on-content-click":!1,"nudge-right":40,transition:"scale-transition","offset-y":"","min-width":"auto"},scopedSlots:t._u([{key:"activator",fn:function({on:s,attrs:i}){return[e(A.A,t._g(t._b({attrs:{label:"End Date","prepend-icon":"mdi-calendar",readonly:"",outlined:"",dense:""},model:{value:t.dateRange.endDate,callback:function(e){t.$set(t.dateRange,"endDate",e)},expression:"dateRange.endDate"}},"v-text-field",i,!1),s))]}}],null,!1,474719386),model:{value:t.endDateMenu,callback:function(e){t.endDateMenu=e},expression:"endDateMenu"}},[e(d.A,{on:{input:function(e){t.endDateMenu=!1}},model:{value:t.dateRange.endDate,callback:function(e){t.$set(t.dateRange,"endDate",e)},expression:"dateRange.endDate"}})],1)],1),e(o.A,{attrs:{cols:"2"}},[e(i.A,{staticClass:"mt-2",attrs:{color:"primary",loading:t.loading},on:{click:t.generateReport}},[t._v(" Generate ")])],1)],1)],1):t._e()],1)],1)],1),"sales"===t.selectedReportType?[t.salesSummary?e(y.A,{staticClass:"mb-4"},[e(o.A,{attrs:{cols:"12",sm:"6",md:"3"}},[e(a.A,{attrs:{outlined:""}},[e(n.OQ,[e("div",{staticClass:"text-subtitle-2 grey--text"},[t._v("Total Sales")]),e("div",{staticClass:"text-h4 mt-2"},[t._v(t._s(t.salesSummary.totalSales))])])],1)],1),e(o.A,{attrs:{cols:"12",sm:"6",md:"3"}},[e(a.A,{attrs:{outlined:""}},[e(n.OQ,[e("div",{staticClass:"text-subtitle-2 grey--text"},[t._v("Total Revenue")]),e("div",{staticClass:"text-h4 mt-2"},[t._v(" ₱"+t._s(t.formatNumber(t.salesSummary.totalRevenue))+" ")])])],1)],1),e(o.A,{attrs:{cols:"12",sm:"6",md:"3"}},[e(a.A,{attrs:{outlined:""}},[e(n.OQ,[e("div",{staticClass:"text-subtitle-2 grey--text"},[t._v("Total Profit")]),e("div",{staticClass:"text-h4 mt-2"},[t._v(" ₱"+t._s(t.formatNumber(t.salesSummary.totalProfit))+" ")])])],1)],1),e(o.A,{attrs:{cols:"12",sm:"6",md:"3"}},[e(a.A,{attrs:{outlined:""}},[e(n.OQ,[e("div",{staticClass:"text-subtitle-2 grey--text"},[t._v("Average Profit")]),e("div",{staticClass:"text-h4 mt-2"},[t._v(" ₱"+t._s(t.formatNumber(t.salesSummary.averageProfit))+" ")])])],1)],1)],1):t._e(),e(a.A,[e(n.ri,[e(y.A,{attrs:{align:"center"}},[e(o.A,{attrs:{cols:"12",sm:"6"}},[t._v(" Sales List ")]),e(o.A,{attrs:{cols:"12",sm:"6"}},[e(A.A,{attrs:{"append-icon":"mdi-magnify",label:"Search","single-line":"","hide-details":"",outlined:"",dense:""},model:{value:t.search,callback:function(e){t.search=e},expression:"search"}})],1)],1)],1),e(c.A,{attrs:{headers:t.salesHeaders,items:t.salesReport,search:t.search,loading:t.loading,"items-per-page":10,"footer-props":{"items-per-page-options":[10,20,50]}},scopedSlots:t._u([{key:"item.date",fn:function({item:e}){return[t._v(" "+t._s(t.formatDate(e.date))+" ")]}},{key:"item.totalRevenue",fn:function({item:e}){return[t._v(" ₱"+t._s(t.formatNumber(e.totalRevenue))+" ")]}},{key:"item.profit",fn:function({item:e}){return[t._v(" ₱"+t._s(t.formatNumber(e.profit))+" ")]}},{key:"item.actions",fn:function({item:s}){return[e(v.A,{staticClass:"mr-2",attrs:{small:""},on:{click:function(e){return t.viewSaleDetails(s)}}},[t._v(" mdi-eye ")]),e(v.A,{attrs:{small:""},on:{click:function(e){return t.printSale(s)}}},[t._v(" mdi-printer ")])]}}],null,!1,4060919809)})],1)]:t._e(),"inventory"===t.selectedReportType?[t.inventorySummary?e(y.A,{staticClass:"mb-4"},[e(o.A,{attrs:{cols:"12",sm:"6",md:"3"}},[e(a.A,{attrs:{outlined:""}},[e(n.OQ,[e("div",{staticClass:"text-subtitle-2 grey--text"},[t._v("Total Products")]),e("div",{staticClass:"text-h4 mt-2"},[t._v(" "+t._s(t.inventorySummary.totalProducts)+" ")])])],1)],1),e(o.A,{attrs:{cols:"12",sm:"6",md:"3"}},[e(a.A,{attrs:{outlined:""}},[e(n.OQ,[e("div",{staticClass:"text-subtitle-2 grey--text"},[t._v("Total Stock")]),e("div",{staticClass:"text-h4 mt-2"},[t._v(t._s(t.inventorySummary.totalStock))])])],1)],1),e(o.A,{attrs:{cols:"12",sm:"6",md:"3"}},[e(a.A,{attrs:{outlined:""}},[e(n.OQ,[e("div",{staticClass:"text-subtitle-2 grey--text"},[t._v("Low Stock Items")]),e("div",{staticClass:"text-h4 mt-2"},[t._v(" "+t._s(t.inventorySummary.lowStockItems)+" ")])])],1)],1),e(o.A,{attrs:{cols:"12",sm:"6",md:"3"}},[e(a.A,{attrs:{outlined:""}},[e(n.OQ,[e("div",{staticClass:"text-subtitle-2 grey--text"},[t._v("Inventory Value")]),e("div",{staticClass:"text-h4 mt-2"},[t._v(" ₱"+t._s(t.formatNumber(t.inventorySummary.inventoryValue))+" ")])])],1)],1)],1):t._e(),e(a.A,[e(n.ri,[e(y.A,{attrs:{align:"center"}},[e(o.A,{attrs:{cols:"12",sm:"6"}},[t._v(" Inventory List ")]),e(o.A,{attrs:{cols:"12",sm:"6"}},[e(A.A,{attrs:{"append-icon":"mdi-magnify",label:"Search","single-line":"","hide-details":"",outlined:"",dense:""},model:{value:t.search,callback:function(e){t.search=e},expression:"search"}})],1)],1)],1),e(c.A,{attrs:{headers:t.inventoryHeaders,items:t.inventoryReport,search:t.search,loading:t.loading,"items-per-page":10,"footer-props":{"items-per-page-options":[10,20,50]}},scopedSlots:t._u([{key:"item.totalStock",fn:function({item:s}){return[e(r.A,{attrs:{color:t.getStockColor(s.totalStock,s.stockAlert),small:""}},[t._v(" "+t._s(s.totalStock)+" ")])]}},{key:"item.cost",fn:function({item:e}){return[t._v(" ₱"+t._s(t.formatNumber(e.cost))+" ")]}},{key:"item.price",fn:function({item:e}){return[t._v(" ₱"+t._s(t.formatNumber(e.price))+" ")]}}],null,!1,2391670947)})],1)]:t._e(),e(u.A,{attrs:{"max-width":"800"},model:{value:t.detailsDialog,callback:function(e){t.detailsDialog=e},expression:"detailsDialog"}},[t.selectedSale?e(a.A,[e(n.ri,{staticClass:"headline"},[t._v(" Sale Details "),e(f.A),e(i.A,{attrs:{icon:""},on:{click:function(e){t.detailsDialog=!1}}},[e(v.A,[t._v("mdi-close")])],1)],1),e(n.OQ,[e(y.A,[e(o.A,{attrs:{cols:"6"}},[e("div",{staticClass:"caption grey--text"},[t._v("Reference Code")]),e("div",[t._v(t._s(t.selectedSale.referenceCode))])]),e(o.A,{attrs:{cols:"6"}},[e("div",{staticClass:"caption grey--text"},[t._v("Date")]),e("div",[t._v(t._s(t.formatDate(t.selectedSale.date)))])]),e(o.A,{attrs:{cols:"6"}},[e("div",{staticClass:"caption grey--text"},[t._v("Customer")]),e("div",[t._v(t._s(t.selectedSale.customer))])]),e(o.A,{attrs:{cols:"6"}},[e("div",{staticClass:"caption grey--text"},[t._v("Payment Type")]),e("div",[t._v(t._s(t.selectedSale.paymentType))])])],1),e(h.A,{staticClass:"my-4"}),e("div",{staticClass:"subtitle-1 mb-2"},[t._v("Items")]),e(g.A,{scopedSlots:t._u([{key:"default",fn:function(){return[e("thead",[e("tr",[e("th",[t._v("Product")]),e("th",[t._v("Variant")]),e("th",[t._v("Quantity")]),e("th",{staticClass:"text-right"},[t._v("Subtotal")])])]),e("tbody",t._l(t.selectedSale.items,(function(s){return e("tr",{key:s.product},[e("td",[t._v(t._s(s.product))]),e("td",[t._v(t._s(s.variant))]),e("td",[t._v(t._s(s.quantity))]),e("td",{staticClass:"text-right"},[t._v("₱"+t._s(t.formatNumber(s.subTotal)))])])})),0)]},proxy:!0}],null,!1,1026752227)}),e(h.A,{staticClass:"my-4"}),e(y.A,[e(o.A,{attrs:{cols:"12",sm:"6","offset-sm":"6"}},[e("div",{staticClass:"d-flex justify-space-between mb-1"},[e("span",{staticClass:"grey--text"},[t._v("Subtotal:")]),e("span",[t._v("₱"+t._s(t.formatNumber(t.selectedSale.totalRevenue)))])]),e("div",{staticClass:"d-flex justify-space-between mb-1"},[e("span",{staticClass:"grey--text"},[t._v("Discount:")]),e("span",[t._v("₱"+t._s(t.formatNumber(t.selectedSale.discount)))])]),e(h.A,{staticClass:"my-2"}),e("div",{staticClass:"d-flex justify-space-between subtitle-1"},[e("strong",[t._v("Total:")]),e("strong",[t._v("₱"+t._s(t.formatNumber(t.selectedSale.grandTotal)))])])],1)],1)],1),e(n.SL,[e(f.A),e(i.A,{attrs:{color:"primary",text:""},on:{click:function(e){return t.printSale(t.selectedSale)}}},[t._v(" Print ")]),e(i.A,{attrs:{color:"grey",text:""},on:{click:function(e){t.detailsDialog=!1}}},[t._v(" Close ")])],1)],1):t._e()],1)],2)},x=[],b=s(5353),S={name:"ReportView",data(){return{selectedReportType:"sales",reportTypes:[{text:"Sales Report",value:"sales"},{text:"Inventory Report",value:"inventory"}],dateRange:{startDate:(new Date).toISOString().slice(0,10),endDate:(new Date).toISOString().slice(0,10)},startDateMenu:!1,endDateMenu:!1,loading:!1,search:"",detailsDialog:!1,selectedSale:null,salesHeaders:[{text:"Date",value:"date",width:"120px"},{text:"Reference",value:"referenceCode"},{text:"Customer",value:"customer"},{text:"Payment",value:"paymentType"},{text:"Revenue",value:"totalRevenue",align:"right"},{text:"Profit",value:"profit",align:"right"},{text:"Options",value:"actions",sortable:!1,width:"100px"}],inventoryHeaders:[{text:"Product",value:"name"},{text:"Category",value:"category"},{text:"Brand",value:"brand"},{text:"Stock",value:"totalStock",align:"center"},{text:"Cost",value:"cost",align:"right"},{text:"Price",value:"price",align:"right"}]}},computed:{...(0,b.aH)("reports",["salesReport","salesSummary","inventoryReport","inventorySummary"])},methods:{async generateReport(){this.loading=!0;try{switch(this.selectedReportType){case"sales":await this.$store.dispatch("reports/getSalesReport",this.dateRange);break;case"inventory":await this.$store.dispatch("reports/getInventoryReport");break}}catch(t){this.$toast.error("Error generating report")}finally{this.loading=!1}},viewSaleDetails(t){this.selectedSale=t,this.detailsDialog=!0},formatDate(t){return new Date(t).toLocaleDateString("en-US",{year:"numeric",month:"short",day:"numeric"})},formatNumber(t){return t?.toLocaleString("en-US",{minimumFractionDigits:2,maximumFractionDigits:2})||"0.00"},getStockColor(t,e){return t<=0?"error":t<=e?"warning":"success"},async printSale(){try{window.print()}catch(t){this.$toast.error("Error printing sale details")}},exportReport(){try{switch(this.selectedReportType){case"sales":this.$store.dispatch("reports/exportSalesReport",this.dateRange);break;case"inventory":this.$store.dispatch("reports/exportInventoryReport");break}}catch(t){this.$toast.error("Error exporting report")}}},watch:{selectedReportType:{immediate:!0,handler(){this.generateReport()}}}},C=S,k=s(1656),w=(0,k.A)(C,_,x,!1,null,"37798ada",null),D=w.exports},9991:function(t,e,s){s.d(e,{A:function(){return y}});var i=s(4596),a=s(5030),n=s(2031),r=s(7631),o=s(8171),l=s(7198),c=s(5648),d=s(4598),u=s(5803),h=s(1920),v=s(4152);const m=(0,u.A)(n.A,r.A,o.A,l.A,c.A,a.A);var y=m.extend({name:"v-dialog",directives:{ClickOutside:d.A},props:{dark:Boolean,disabled:Boolean,fullscreen:Boolean,light:Boolean,maxWidth:[String,Number],noClickAnimation:Boolean,origin:{type:String,default:"center center"},persistent:Boolean,retainFocus:{type:Boolean,default:!0},scrollable:Boolean,transition:{type:[String,Boolean],default:"dialog-transition"},width:[String,Number]},data(){return{activatedBy:null,animate:!1,animateTimeout:-1,stackMinZIndex:200,previousActiveElement:null}},computed:{classes(){return{[`v-dialog ${this.contentClass}`.trim()]:!0,"v-dialog--active":this.isActive,"v-dialog--persistent":this.persistent,"v-dialog--fullscreen":this.fullscreen,"v-dialog--scrollable":this.scrollable,"v-dialog--animated":this.animate}},contentClasses(){return{"v-dialog__content":!0,"v-dialog__content--active":this.isActive}},hasActivator(){return Boolean(!!this.$slots.activator||!!this.$scopedSlots.activator)}},watch:{isActive(t){var e;t?(this.show(),this.hideScroll()):(this.removeOverlay(),this.unbind(),null===(e=this.previousActiveElement)||void 0===e||e.focus())},fullscreen(t){this.isActive&&(t?(this.hideScroll(),this.removeOverlay(!1)):(this.showScroll(),this.genOverlay()))}},created(){this.$attrs.hasOwnProperty("full-width")&&(0,h.rq)("full-width",this)},beforeMount(){this.$nextTick((()=>{this.isBooted=this.isActive,this.isActive&&this.show()}))},beforeDestroy(){"undefined"!==typeof window&&this.unbind()},methods:{animateClick(){this.animate=!1,this.$nextTick((()=>{this.animate=!0,window.clearTimeout(this.animateTimeout),this.animateTimeout=window.setTimeout((()=>this.animate=!1),150)}))},closeConditional(t){const e=t.target;return!(this._isDestroyed||!this.isActive||this.$refs.content.contains(e)||this.overlay&&e&&!this.overlay.$el.contains(e))&&this.activeZIndex>=this.getMaxZIndex()},hideScroll(){this.fullscreen?document.documentElement.classList.add("overflow-y-hidden"):o.A.options.methods.hideScroll.call(this)},show(){!this.fullscreen&&!this.hideOverlay&&this.genOverlay(),this.$nextTick((()=>{this.$nextTick((()=>{var t,e;(null===(t=this.$refs.dialog)||void 0===t?void 0:t.contains(document.activeElement))||(this.previousActiveElement=document.activeElement,null===(e=this.$refs.dialog)||void 0===e||e.focus()),this.bind()}))}))},bind(){window.addEventListener("focusin",this.onFocusin)},unbind(){window.removeEventListener("focusin",this.onFocusin)},onClickOutside(t){this.$emit("click:outside",t),this.persistent?this.noClickAnimation||this.animateClick():this.isActive=!1},onKeydown(t){if(t.keyCode===v.uP.esc&&!this.getOpenDependents().length)if(this.persistent)this.noClickAnimation||this.animateClick();else{this.isActive=!1;const t=this.getActivator();this.$nextTick((()=>t&&t.focus()))}this.$emit("keydown",t)},onFocusin(t){if(!t||!this.retainFocus)return;const e=t.target;if(e&&this.$refs.dialog&&![document,this.$refs.dialog].includes(e)&&!this.$refs.dialog.contains(e)&&this.activeZIndex>=this.getMaxZIndex()&&!this.getOpenDependentElements().some((t=>t.contains(e)))){const t=this.$refs.dialog.querySelectorAll('button, [href], input:not([type="hidden"]), select, textarea, [tabindex]:not([tabindex="-1"])'),e=[...t].find((t=>!t.hasAttribute("disabled")&&!t.matches('[tabindex="-1"]')));e&&e.focus()}},genContent(){return this.showLazyContent((()=>[this.$createElement(i.A,{props:{root:!0,light:this.light,dark:this.dark}},[this.$createElement("div",{class:this.contentClasses,attrs:{role:"dialog","aria-modal":this.hideOverlay?void 0:"true",...this.getScopeIdAttrs()},on:{keydown:this.onKeydown},style:{zIndex:this.activeZIndex},ref:"content"},[this.genTransition()])])]))},genTransition(){const t=this.genInnerContent();return this.transition?this.$createElement("transition",{props:{name:this.transition,origin:this.origin,appear:!0}},[t]):t},genInnerContent(){const t={class:this.classes,attrs:{tabindex:this.isActive?0:void 0},ref:"dialog",directives:[{name:"click-outside",value:{handler:this.onClickOutside,closeConditional:this.closeConditional,include:this.getOpenDependentElements}},{name:"show",value:this.isActive}],style:{transformOrigin:this.origin}};return this.fullscreen||(t.style={...t.style,maxWidth:(0,v.Dg)(this.maxWidth),width:(0,v.Dg)(this.width)}),this.$createElement("div",t,this.getContentSlot())}},render(t){return t("div",{staticClass:"v-dialog__container",class:{"v-dialog__container--attached":""===this.attach||!0===this.attach||"attach"===this.attach}},[this.genActivator(),this.genContent()])}})},8171:function(t,e,s){s.d(e,{A:function(){return u}});s(4114);var i=s(8743),a=s(3381),n=s(428),r=s(5803),o=s(4152),l=(0,r.A)(i.A,a.A,n.A).extend({name:"v-overlay",props:{absolute:Boolean,color:{type:String,default:"#212121"},dark:{type:Boolean,default:!0},opacity:{type:[Number,String],default:.46},value:{default:!0},zIndex:{type:[Number,String],default:5}},computed:{__scrim(){const t=this.setBackgroundColor(this.color,{staticClass:"v-overlay__scrim",style:{opacity:this.computedOpacity}});return this.$createElement("div",t)},classes(){return{"v-overlay--absolute":this.absolute,"v-overlay--active":this.isActive,...this.themeClasses}},computedOpacity(){return Number(this.isActive?this.opacity:0)},styles(){return{zIndex:this.zIndex}}},methods:{genContent(){return this.$createElement("div",{staticClass:"v-overlay__content"},(0,o.$c)(this))}},render(t){const e=[this.__scrim];return this.isActive&&e.push(this.genContent()),t("div",{staticClass:"v-overlay",on:this.$listeners,class:this.classes,style:this.styles},e)}}),c=l,d=s(5471),u=d["default"].extend().extend({name:"overlayable",props:{hideOverlay:Boolean,overlayColor:String,overlayOpacity:[Number,String]},data(){return{animationFrame:0,overlay:null}},watch:{hideOverlay(t){this.isActive&&(t?this.removeOverlay():this.genOverlay())}},beforeDestroy(){this.removeOverlay()},methods:{createOverlay(){const t=new c({propsData:{absolute:this.absolute,value:!1,color:this.overlayColor,opacity:this.overlayOpacity}});t.$mount();const e=this.absolute?this.$el.parentNode:document.querySelector("[data-app]");e&&e.insertBefore(t.$el,e.firstChild),this.overlay=t},genOverlay(){if(this.hideScroll(),!this.hideOverlay)return this.overlay||this.createOverlay(),this.animationFrame=requestAnimationFrame((()=>{this.overlay&&(void 0!==this.activeZIndex?this.overlay.zIndex=String(this.activeZIndex-1):this.$el&&(this.overlay.zIndex=(0,o.fl)(this.$el)),this.overlay.value=!0)})),!0},removeOverlay(t=!0){this.overlay&&((0,o.d7)(this.overlay.$el,"transitionend",(()=>{this.overlay&&this.overlay.$el&&this.overlay.$el.parentNode&&!this.overlay.value&&!this.isActive&&(this.overlay.$el.parentNode.removeChild(this.overlay.$el),this.overlay.$destroy(),this.overlay=null)})),cancelAnimationFrame(this.animationFrame),this.overlay.value=!1),t&&this.showScroll()},scrollListener(t){if("key"in t){if(["INPUT","TEXTAREA","SELECT"].includes(t.target.tagName)||t.target.isContentEditable)return;const e=[o.uP.up,o.uP.pageup],s=[o.uP.down,o.uP.pagedown];if(e.includes(t.keyCode))t.deltaY=-1;else{if(!s.includes(t.keyCode))return;t.deltaY=1}}(t.target===this.overlay||"keydown"!==t.type&&t.target===document.body||this.checkPath(t))&&t.preventDefault()},hasScrollbar(t){if(!t||t.nodeType!==Node.ELEMENT_NODE)return!1;const e=window.getComputedStyle(t);return(["auto","scroll"].includes(e.overflowY)||"SELECT"===t.tagName)&&t.scrollHeight>t.clientHeight||["auto","scroll"].includes(e.overflowX)&&t.scrollWidth>t.clientWidth},shouldScroll(t,e){if(t.hasAttribute("data-app"))return!1;const s=e.shiftKey||e.deltaX?"x":"y",i="y"===s?e.deltaY:e.deltaX||e.deltaY;let a,n;"y"===s?(a=0===t.scrollTop,n=t.scrollTop+t.clientHeight===t.scrollHeight):(a=0===t.scrollLeft,n=t.scrollLeft+t.clientWidth===t.scrollWidth);const r=i<0,o=i>0;return!(a||!r)||(!(n||!o)||!(!a&&!n||!t.parentNode)&&this.shouldScroll(t.parentNode,e))},isInside(t,e){return t===e||null!==t&&t!==document.body&&this.isInside(t.parentNode,e)},checkPath(t){const e=(0,o.K9)(t);if("keydown"===t.type&&e[0]===document.body){const e=this.$refs.dialog,s=window.getSelection().anchorNode;return!(e&&this.hasScrollbar(e)&&this.isInside(s,e))||!this.shouldScroll(e,t)}for(let s=0;s<e.length;s++){const i=e[s];if(i===document)return!0;if(i===document.documentElement)return!0;if(i===this.$refs.content)return!0;if(this.hasScrollbar(i))return!this.shouldScroll(i,t)}return!0},hideScroll(){this.$vuetify.breakpoint.smAndDown?document.documentElement.classList.add("overflow-y-hidden"):((0,o.P4)(window,"wheel",this.scrollListener,{passive:!1}),window.addEventListener("keydown",this.scrollListener))},showScroll(){document.documentElement.classList.remove("overflow-y-hidden"),window.removeEventListener("wheel",this.scrollListener),window.removeEventListener("keydown",this.scrollListener)}}})}}]);
//# sourceMappingURL=50.b9c784e6.js.map