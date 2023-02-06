import{r as t,c as i,h as s,a as e,g as r}from"./p-e5ae1b6e.js";import{b as h,g as n}from"./p-87f291fd.js";const a=class{constructor(s){t(this,s),this.brxTriggerClick=i(this,"brxTriggerClick",7),this.brxSetTargetVisibilityStatus=i(this,"brxSetTargetVisibilityStatus",7),this.useIcons=!0,this.breakpoint=void 0,this.iconToHide="fa5/fas/chevron-up",this.iconToShow="fa5/fas/chevron-down",this.target=void 0,this.triggerEl=void 0,this.targetEl=void 0}get isOpen(){var t;return!(null===(t=this.targetEl)||void 0===t?void 0:t.hasAttribute("hidden"))}setupElements(){this.triggerEl=this.el,this.targetEl=h(this.target)}_checkBreakpoint(){const{targetEl:t,breakpoint:i}=this;t&&i&&window.matchMedia("(min-width: 977px)").matches&&t.removeAttribute("hidden")}async setup(){this.setupElements(),this._setVisibilityStatus(),this.useIcons&&this._toggleIcon();const{triggerEl:t,targetEl:i}=this;t&&i&&(t.hasAttribute("aria-controls")||(i.id||(i.id=n()),t.setAttribute("aria-controls",i.id))),this._checkBreakpoint()}_setVisibilityStatus(){this._setTriggerVisibilityStatus(),this._setTargetVisibilityStatus()}_setTriggerVisibilityStatus(){const{targetEl:t,triggerEl:i}=this;if(t){const s=t.hasAttribute("hidden");i.setAttribute("data-visible",String(!s)),i.setAttribute("aria-expanded",String(!s))}}_setTargetVisibilityStatus(){const{targetEl:t}=this;if(t){const i=t.hasAttribute("hidden");t.setAttribute("aria-hidden",String(i)),this.brxSetTargetVisibilityStatus.emit()}}_handleTriggerClickBehavior(){const{breakpoint:t}=this;(!t||window.matchMedia("(max-width: 977px)").matches)&&(this._toggleVisibility(),this.useIcons&&this._toggleIcon())}emitChange(){const{triggerEl:t}=this;t&&(t.dispatchEvent(new window.Event("change")),this.brxTriggerClick.emit())}async open(t=!0){const{targetEl:i}=this;i&&(this.targetEl.removeAttribute("hidden"),this._setVisibilityStatus(),t&&this.emitChange())}async close(t=!0){const{targetEl:i}=this;i&&(this.targetEl.setAttribute("hidden",""),this._setVisibilityStatus(),t&&this.emitChange())}_toggleVisibility(t=!0){this.isOpen?this.close(t):this.open(t)}_toggleIcon(){const{targetEl:t,triggerEl:i,iconToShow:s,iconToHide:e}=this;if(t){const r=t.hasAttribute("hidden"),h=Array.from(i.querySelectorAll("brx-icon[data-collapse-icon]"));for(const t of h)t.name=r?s:e}}handleClick(){this._handleTriggerClickBehavior()}async getTrigger(){return this.triggerEl}async getTarget(){return this.targetEl}async getIsOpen(){return this.isOpen}componentWillLoad(){this.setupElements(),this.setup()}render(){return s(e,null,s("slot",null))}get el(){return r(this)}static get watchers(){return{target:["setupElements"]}}};a.style="brx-collapse-trigger{display:block}";export{a as brx_collapse_trigger}