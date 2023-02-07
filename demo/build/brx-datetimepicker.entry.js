import { r as registerInstance, f as createEvent, h, e as Host, g as getElement } from './index-1e49f12c.js';
import { T as TOKEN_UNCONTROLLED } from './tokens-3a672c03.js';
import { b as findTarget, t as tryParseJSON, e as enqueueIdleCallback } from './helpers-da43c71e.js';

var Type;
(function (Type) {
  Type["DATE"] = "date";
  Type["TIME"] = "time";
  Type["DATETIME_LOCAL"] = "datetime-local";
})(Type || (Type = {}));

const getFlatpickr = async () => {
  const mod = await import('./index-42529947.js');
  return mod.default;
};
const getDefaultLocale = async () => {
  const mod = await import('./pt-9ed6eeca.js').then(function (n) { return n.p; });
  return mod.default.pt;
};
const getSetupForType = (type) => {
  switch (type) {
    case Type.DATE: {
      return {
        dateFormat: 'd/m/Y',
        enableTime: false,
        noCalendar: false,
      };
    }
    case Type.TIME: {
      return {
        dateFormat: 'H:i',
        enableTime: true,
        noCalendar: true,
      };
    }
    case Type.DATETIME_LOCAL: {
      return {
        dateFormat: 'd/m/Y H:i',
        enableTime: true,
        noCalendar: false,
      };
    }
    default: {
      return {
        dateFormat: 'd/m/Y',
        enableTime: false,
        noCalendar: false,
      };
    }
  }
};
const getInitialInputType = (type) => {
  switch (type) {
    case Type.TIME: {
      return 'time';
    }
    case Type.DATETIME_LOCAL: {
      return 'datetime-local';
    }
    case Type.DATE:
    default: {
      return 'text';
    }
  }
};
const getIconForType = (type) => {
  switch (type) {
    case Type.DATE:
    case Type.DATETIME_LOCAL: {
      return 'fa5/fas/calendar-alt';
    }
    case Type.TIME: {
      return 'fa5/fas/clock';
    }
    default: {
      return null;
    }
  }
};

const brxDatetimepickerCss = ".flatpickr-calendar{background:transparent;opacity:0;display:none;text-align:center;visibility:hidden;padding:0;-webkit-animation:none;animation:none;direction:ltr;border:0;font-size:14px;line-height:24px;border-radius:5px;position:absolute;width:307.875px;-webkit-box-sizing:border-box;box-sizing:border-box;-ms-touch-action:manipulation;touch-action:manipulation;background:#fff;-webkit-box-shadow:1px 0 0 #e6e6e6,-1px 0 0 #e6e6e6,0 1px 0 #e6e6e6,0 -1px 0 #e6e6e6,0 3px 13px rgba(0,0,0,0.08);box-shadow:1px 0 0 #e6e6e6,-1px 0 0 #e6e6e6,0 1px 0 #e6e6e6,0 -1px 0 #e6e6e6,0 3px 13px rgba(0,0,0,0.08)}.flatpickr-calendar.open,.flatpickr-calendar.inline{opacity:1;max-height:640px;visibility:visible}.flatpickr-calendar.open{display:inline-block;z-index:99999}.flatpickr-calendar.animate.open{-webkit-animation:fpFadeInDown 300ms cubic-bezier(.23,1,.32,1);animation:fpFadeInDown 300ms cubic-bezier(.23,1,.32,1)}.flatpickr-calendar.inline{display:block;position:relative;top:2px}.flatpickr-calendar.static{position:absolute;top:calc(100% + 2px)}.flatpickr-calendar.static.open{z-index:999;display:block}.flatpickr-calendar.multiMonth .flatpickr-days .dayContainer:nth-child(n+1) .flatpickr-day.inRange:nth-child(7n+7){-webkit-box-shadow:none !important;box-shadow:none !important}.flatpickr-calendar.multiMonth .flatpickr-days .dayContainer:nth-child(n+2) .flatpickr-day.inRange:nth-child(7n+1){-webkit-box-shadow:-2px 0 0 #e6e6e6,5px 0 0 #e6e6e6;box-shadow:-2px 0 0 #e6e6e6,5px 0 0 #e6e6e6}.flatpickr-calendar .hasWeeks .dayContainer,.flatpickr-calendar .hasTime .dayContainer{border-bottom:0;border-bottom-right-radius:0;border-bottom-left-radius:0}.flatpickr-calendar .hasWeeks .dayContainer{border-left:0}.flatpickr-calendar.hasTime .flatpickr-time{height:40px;border-top:1px solid #e6e6e6}.flatpickr-calendar.noCalendar.hasTime .flatpickr-time{height:auto}.flatpickr-calendar:before,.flatpickr-calendar:after{position:absolute;display:block;pointer-events:none;border:solid transparent;content:'';height:0;width:0;left:22px}.flatpickr-calendar.rightMost:before,.flatpickr-calendar.arrowRight:before,.flatpickr-calendar.rightMost:after,.flatpickr-calendar.arrowRight:after{left:auto;right:22px}.flatpickr-calendar.arrowCenter:before,.flatpickr-calendar.arrowCenter:after{left:50%;right:50%}.flatpickr-calendar:before{border-width:5px;margin:0 -5px}.flatpickr-calendar:after{border-width:4px;margin:0 -4px}.flatpickr-calendar.arrowTop:before,.flatpickr-calendar.arrowTop:after{bottom:100%}.flatpickr-calendar.arrowTop:before{border-bottom-color:#e6e6e6}.flatpickr-calendar.arrowTop:after{border-bottom-color:#fff}.flatpickr-calendar.arrowBottom:before,.flatpickr-calendar.arrowBottom:after{top:100%}.flatpickr-calendar.arrowBottom:before{border-top-color:#e6e6e6}.flatpickr-calendar.arrowBottom:after{border-top-color:#fff}.flatpickr-calendar:focus{outline:0}.flatpickr-wrapper{position:relative;display:inline-block}.flatpickr-months{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex}.flatpickr-months .flatpickr-month{background:transparent;color:rgba(0,0,0,0.9);fill:rgba(0,0,0,0.9);height:34px;line-height:1;text-align:center;position:relative;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;overflow:hidden;-webkit-box-flex:1;-webkit-flex:1;-ms-flex:1;flex:1}.flatpickr-months .flatpickr-prev-month,.flatpickr-months .flatpickr-next-month{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;text-decoration:none;cursor:pointer;position:absolute;top:0;height:34px;padding:10px;z-index:3;color:rgba(0,0,0,0.9);fill:rgba(0,0,0,0.9)}.flatpickr-months .flatpickr-prev-month.flatpickr-disabled,.flatpickr-months .flatpickr-next-month.flatpickr-disabled{display:none}.flatpickr-months .flatpickr-prev-month i,.flatpickr-months .flatpickr-next-month i{position:relative}.flatpickr-months .flatpickr-prev-month.flatpickr-prev-month,.flatpickr-months .flatpickr-next-month.flatpickr-prev-month{left:0}.flatpickr-months .flatpickr-prev-month.flatpickr-next-month,.flatpickr-months .flatpickr-next-month.flatpickr-next-month{right:0}.flatpickr-months .flatpickr-prev-month:hover,.flatpickr-months .flatpickr-next-month:hover{color:#959ea9}.flatpickr-months .flatpickr-prev-month:hover svg,.flatpickr-months .flatpickr-next-month:hover svg{fill:#f64747}.flatpickr-months .flatpickr-prev-month svg,.flatpickr-months .flatpickr-next-month svg{width:14px;height:14px}.flatpickr-months .flatpickr-prev-month svg path,.flatpickr-months .flatpickr-next-month svg path{-webkit-transition:fill .1s;transition:fill .1s;fill:inherit}.numInputWrapper{position:relative;height:auto}.numInputWrapper input,.numInputWrapper span{display:inline-block}.numInputWrapper input{width:100%}.numInputWrapper input::-ms-clear{display:none}.numInputWrapper input::-webkit-outer-spin-button,.numInputWrapper input::-webkit-inner-spin-button{margin:0;-webkit-appearance:none}.numInputWrapper span{position:absolute;right:0;width:14px;padding:0 4px 0 2px;height:50%;line-height:50%;opacity:0;cursor:pointer;border:1px solid rgba(57,57,57,0.15);-webkit-box-sizing:border-box;box-sizing:border-box}.numInputWrapper span:hover{background:rgba(0,0,0,0.1)}.numInputWrapper span:active{background:rgba(0,0,0,0.2)}.numInputWrapper span:after{display:block;content:\"\";position:absolute}.numInputWrapper span.arrowUp{top:0;border-bottom:0}.numInputWrapper span.arrowUp:after{border-left:4px solid transparent;border-right:4px solid transparent;border-bottom:4px solid rgba(57,57,57,0.6);top:26%}.numInputWrapper span.arrowDown{top:50%}.numInputWrapper span.arrowDown:after{border-left:4px solid transparent;border-right:4px solid transparent;border-top:4px solid rgba(57,57,57,0.6);top:40%}.numInputWrapper span svg{width:inherit;height:auto}.numInputWrapper span svg path{fill:rgba(0,0,0,0.5)}.numInputWrapper:hover{background:rgba(0,0,0,0.05)}.numInputWrapper:hover span{opacity:1}.flatpickr-current-month{font-size:135%;line-height:inherit;font-weight:300;color:inherit;position:absolute;width:75%;left:12.5%;padding:7.48px 0 0 0;line-height:1;height:34px;display:inline-block;text-align:center;-webkit-transform:translate3d(0,0,0);transform:translate3d(0,0,0)}.flatpickr-current-month span.cur-month{font-family:inherit;font-weight:700;color:inherit;display:inline-block;margin-left:.5ch;padding:0}.flatpickr-current-month span.cur-month:hover{background:rgba(0,0,0,0.05)}.flatpickr-current-month .numInputWrapper{width:6ch;width:7ch\\0;display:inline-block}.flatpickr-current-month .numInputWrapper span.arrowUp:after{border-bottom-color:rgba(0,0,0,0.9)}.flatpickr-current-month .numInputWrapper span.arrowDown:after{border-top-color:rgba(0,0,0,0.9)}.flatpickr-current-month input.cur-year{background:transparent;-webkit-box-sizing:border-box;box-sizing:border-box;color:inherit;cursor:text;padding:0 0 0 .5ch;margin:0;display:inline-block;font-size:inherit;font-family:inherit;font-weight:300;line-height:inherit;height:auto;border:0;border-radius:0;vertical-align:initial;-webkit-appearance:textfield;-moz-appearance:textfield;appearance:textfield}.flatpickr-current-month input.cur-year:focus{outline:0}.flatpickr-current-month input.cur-year[disabled],.flatpickr-current-month input.cur-year[disabled]:hover{font-size:100%;color:rgba(0,0,0,0.5);background:transparent;pointer-events:none}.flatpickr-current-month .flatpickr-monthDropdown-months{appearance:menulist;background:transparent;border:none;border-radius:0;box-sizing:border-box;color:inherit;cursor:pointer;font-size:inherit;font-family:inherit;font-weight:300;height:auto;line-height:inherit;margin:-1px 0 0 0;outline:none;padding:0 0 0 .5ch;position:relative;vertical-align:initial;-webkit-box-sizing:border-box;-webkit-appearance:menulist;-moz-appearance:menulist;width:auto}.flatpickr-current-month .flatpickr-monthDropdown-months:focus,.flatpickr-current-month .flatpickr-monthDropdown-months:active{outline:none}.flatpickr-current-month .flatpickr-monthDropdown-months:hover{background:rgba(0,0,0,0.05)}.flatpickr-current-month .flatpickr-monthDropdown-months .flatpickr-monthDropdown-month{background-color:transparent;outline:none;padding:0}.flatpickr-weekdays{background:transparent;text-align:center;overflow:hidden;width:100%;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;height:28px}.flatpickr-weekdays .flatpickr-weekdaycontainer{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-flex:1;-webkit-flex:1;-ms-flex:1;flex:1}span.flatpickr-weekday{cursor:default;font-size:90%;background:transparent;color:rgba(0,0,0,0.54);line-height:1;margin:0;text-align:center;display:block;-webkit-box-flex:1;-webkit-flex:1;-ms-flex:1;flex:1;font-weight:bolder}.dayContainer,.flatpickr-weeks{padding:1px 0 0 0}.flatpickr-days{position:relative;overflow:hidden;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-align:start;-webkit-align-items:flex-start;-ms-flex-align:start;align-items:flex-start;width:307.875px}.flatpickr-days:focus{outline:0}.dayContainer{padding:0;outline:0;text-align:left;width:307.875px;min-width:307.875px;max-width:307.875px;-webkit-box-sizing:border-box;box-sizing:border-box;display:inline-block;display:-ms-flexbox;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-flex-wrap:wrap;flex-wrap:wrap;-ms-flex-wrap:wrap;-ms-flex-pack:justify;-webkit-justify-content:space-around;justify-content:space-around;-webkit-transform:translate3d(0,0,0);transform:translate3d(0,0,0);opacity:1}.dayContainer+.dayContainer{-webkit-box-shadow:-1px 0 0 #e6e6e6;box-shadow:-1px 0 0 #e6e6e6}.flatpickr-day{background:none;border:1px solid transparent;border-radius:150px;-webkit-box-sizing:border-box;box-sizing:border-box;color:#393939;cursor:pointer;font-weight:400;width:14.2857143%;-webkit-flex-basis:14.2857143%;-ms-flex-preferred-size:14.2857143%;flex-basis:14.2857143%;max-width:39px;height:39px;line-height:39px;margin:0;display:inline-block;position:relative;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;text-align:center}.flatpickr-day.inRange,.flatpickr-day.prevMonthDay.inRange,.flatpickr-day.nextMonthDay.inRange,.flatpickr-day.today.inRange,.flatpickr-day.prevMonthDay.today.inRange,.flatpickr-day.nextMonthDay.today.inRange,.flatpickr-day:hover,.flatpickr-day.prevMonthDay:hover,.flatpickr-day.nextMonthDay:hover,.flatpickr-day:focus,.flatpickr-day.prevMonthDay:focus,.flatpickr-day.nextMonthDay:focus{cursor:pointer;outline:0;background:#e6e6e6;border-color:#e6e6e6}.flatpickr-day.today{border-color:#959ea9}.flatpickr-day.today:hover,.flatpickr-day.today:focus{border-color:#959ea9;background:#959ea9;color:#fff}.flatpickr-day.selected,.flatpickr-day.startRange,.flatpickr-day.endRange,.flatpickr-day.selected.inRange,.flatpickr-day.startRange.inRange,.flatpickr-day.endRange.inRange,.flatpickr-day.selected:focus,.flatpickr-day.startRange:focus,.flatpickr-day.endRange:focus,.flatpickr-day.selected:hover,.flatpickr-day.startRange:hover,.flatpickr-day.endRange:hover,.flatpickr-day.selected.prevMonthDay,.flatpickr-day.startRange.prevMonthDay,.flatpickr-day.endRange.prevMonthDay,.flatpickr-day.selected.nextMonthDay,.flatpickr-day.startRange.nextMonthDay,.flatpickr-day.endRange.nextMonthDay{background:#569ff7;-webkit-box-shadow:none;box-shadow:none;color:#fff;border-color:#569ff7}.flatpickr-day.selected.startRange,.flatpickr-day.startRange.startRange,.flatpickr-day.endRange.startRange{border-radius:50px 0 0 50px}.flatpickr-day.selected.endRange,.flatpickr-day.startRange.endRange,.flatpickr-day.endRange.endRange{border-radius:0 50px 50px 0}.flatpickr-day.selected.startRange+.endRange:not(:nth-child(7n+1)),.flatpickr-day.startRange.startRange+.endRange:not(:nth-child(7n+1)),.flatpickr-day.endRange.startRange+.endRange:not(:nth-child(7n+1)){-webkit-box-shadow:-10px 0 0 #569ff7;box-shadow:-10px 0 0 #569ff7}.flatpickr-day.selected.startRange.endRange,.flatpickr-day.startRange.startRange.endRange,.flatpickr-day.endRange.startRange.endRange{border-radius:50px}.flatpickr-day.inRange{border-radius:0;-webkit-box-shadow:-5px 0 0 #e6e6e6,5px 0 0 #e6e6e6;box-shadow:-5px 0 0 #e6e6e6,5px 0 0 #e6e6e6}.flatpickr-day.flatpickr-disabled,.flatpickr-day.flatpickr-disabled:hover,.flatpickr-day.prevMonthDay,.flatpickr-day.nextMonthDay,.flatpickr-day.notAllowed,.flatpickr-day.notAllowed.prevMonthDay,.flatpickr-day.notAllowed.nextMonthDay{color:rgba(57,57,57,0.3);background:transparent;border-color:transparent;cursor:default}.flatpickr-day.flatpickr-disabled,.flatpickr-day.flatpickr-disabled:hover{cursor:not-allowed;color:rgba(57,57,57,0.1)}.flatpickr-day.week.selected{border-radius:0;-webkit-box-shadow:-5px 0 0 #569ff7,5px 0 0 #569ff7;box-shadow:-5px 0 0 #569ff7,5px 0 0 #569ff7}.flatpickr-day.hidden{visibility:hidden}.rangeMode .flatpickr-day{margin-top:1px}.flatpickr-weekwrapper{float:left}.flatpickr-weekwrapper .flatpickr-weeks{padding:0 12px;-webkit-box-shadow:1px 0 0 #e6e6e6;box-shadow:1px 0 0 #e6e6e6}.flatpickr-weekwrapper .flatpickr-weekday{float:none;width:100%;line-height:28px}.flatpickr-weekwrapper span.flatpickr-day,.flatpickr-weekwrapper span.flatpickr-day:hover{display:block;width:100%;max-width:none;color:rgba(57,57,57,0.3);background:transparent;cursor:default;border:none}.flatpickr-innerContainer{display:block;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-sizing:border-box;box-sizing:border-box;overflow:hidden}.flatpickr-rContainer{display:inline-block;padding:0;-webkit-box-sizing:border-box;box-sizing:border-box}.flatpickr-time{text-align:center;outline:0;display:block;height:0;line-height:40px;max-height:40px;-webkit-box-sizing:border-box;box-sizing:border-box;overflow:hidden;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex}.flatpickr-time:after{content:\"\";display:table;clear:both}.flatpickr-time .numInputWrapper{-webkit-box-flex:1;-webkit-flex:1;-ms-flex:1;flex:1;width:40%;height:40px;float:left}.flatpickr-time .numInputWrapper span.arrowUp:after{border-bottom-color:#393939}.flatpickr-time .numInputWrapper span.arrowDown:after{border-top-color:#393939}.flatpickr-time.hasSeconds .numInputWrapper{width:26%}.flatpickr-time.time24hr .numInputWrapper{width:49%}.flatpickr-time input{background:transparent;-webkit-box-shadow:none;box-shadow:none;border:0;border-radius:0;text-align:center;margin:0;padding:0;height:inherit;line-height:inherit;color:#393939;font-size:14px;position:relative;-webkit-box-sizing:border-box;box-sizing:border-box;-webkit-appearance:textfield;-moz-appearance:textfield;appearance:textfield}.flatpickr-time input.flatpickr-hour{font-weight:bold}.flatpickr-time input.flatpickr-minute,.flatpickr-time input.flatpickr-second{font-weight:400}.flatpickr-time input:focus{outline:0;border:0}.flatpickr-time .flatpickr-time-separator,.flatpickr-time .flatpickr-am-pm{height:inherit;float:left;line-height:inherit;color:#393939;font-weight:bold;width:2%;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;-webkit-align-self:center;-ms-flex-item-align:center;align-self:center}.flatpickr-time .flatpickr-am-pm{outline:0;width:18%;cursor:pointer;text-align:center;font-weight:400}.flatpickr-time input:hover,.flatpickr-time .flatpickr-am-pm:hover,.flatpickr-time input:focus,.flatpickr-time .flatpickr-am-pm:focus{background:#eee}.flatpickr-input[readonly]{cursor:pointer}@-webkit-keyframes fpFadeInDown{from{opacity:0;-webkit-transform:translate3d(0,-20px,0);transform:translate3d(0,-20px,0)}to{opacity:1;-webkit-transform:translate3d(0,0,0);transform:translate3d(0,0,0)}}@keyframes fpFadeInDown{from{opacity:0;-webkit-transform:translate3d(0,-20px,0);transform:translate3d(0,-20px,0)}to{opacity:1;-webkit-transform:translate3d(0,0,0);transform:translate3d(0,0,0)}}brx-datetimepicker{display:block}brx-datetimepicker[dark-mode],brx-datetimepicker[dark-mode] label{--color:var(--color-dark);--focus-color:var(--focus-color-dark)}brx-datetimepicker input[disabled]{cursor:not-allowed}.flatpickr-calendar{--flatpicker-padding:var(--spacing-scale-2x);--datetimepicker-day-size:24px;--datetimepicker-arrows:32px;box-shadow:var(--surface-shadow-md)}.flatpickr-calendar.arrowTop::before,.flatpickr-calendar.arrowTop::after{border-color:transparent}.flatpickr-calendar.open{z-index:var(--z-index-layer-2)}.flatpickr-calendar .flatpickr-months{align-items:center;display:flex;padding:var(--flatpicker-padding) var(--flatpicker-padding) 0}.flatpickr-calendar .flatpickr-months .flatpickr-prev-month,.flatpickr-calendar .flatpickr-months .flatpickr-next-month{height:auto;padding:0;position:static}.flatpickr-calendar .flatpickr-months .flatpickr-prev-month.flatpickr-disabled,.flatpickr-calendar .flatpickr-months .flatpickr-next-month.flatpickr-disabled{cursor:not-allowed;opacity:var(--disabled);display:block}.flatpickr-calendar .flatpickr-months .flatpickr-prev-month.flatpickr-disabled *,.flatpickr-calendar .flatpickr-months .flatpickr-next-month.flatpickr-disabled *{pointer-events:none}.flatpickr-calendar .flatpickr-months .flatpickr-month{flex:1;height:auto;overflow:visible}.flatpickr-calendar .flatpickr-months .flatpickr-current-month{display:flex;height:auto;padding:0 var(--flatpicker-padding);position:static;width:100%}.flatpickr-calendar .flatpickr-months .flatpickr-monthDropdown-months{border-radius:var(--surface-rounder-sm);color:var(--interactive);font-size:var(--font-size-scale-up-01);font-weight:var(--font-weight-semi-bold);margin:0;padding:0}.flatpickr-calendar .flatpickr-months .flatpickr-monthDropdown-months .flatpickr-monthDropdown-month{color:var(--color)}.flatpickr-calendar .flatpickr-months .flatpickr-monthDropdown-months:hover{background:transparent}.flatpickr-calendar .flatpickr-months .numInputWrapper{flex:1;margin-left:var(--flatpicker-padding);width:auto}.flatpickr-calendar .flatpickr-months .numInputWrapper input.cur-year{border:var(--surface-width-sm) solid var(--border-color);border-radius:var(--surface-rounder-sm);color:var(--color);font-size:var(--font-size-scale-base);font-weight:var(--font-weight-semi-bold);padding:0 var(--spacing-scale-base)}.flatpickr-calendar .flatpickr-months .numInputWrapper span.arrowUp,.flatpickr-calendar .flatpickr-months .numInputWrapper span.arrowDown{display:none}.flatpickr-calendar .flatpickr-weekdaycontainer{display:grid;grid-template-columns:repeat(7, 1fr);padding:0 var(--flatpicker-padding)}.flatpickr-calendar span.flatpickr-weekday{color:var(--color);font-size:var(--font-size);font-weight:var(--font-weight-medium)}.flatpickr-calendar .dayContainer{display:grid;grid-template-columns:repeat(7, 1fr);padding:0 var(--flatpicker-padding) var(--flatpicker-padding)}.flatpickr-calendar .flatpickr-day{color:var(--interactive);font-weight:var(--font-weight-semi-bold);height:var(--datetimepicker-day-size);line-height:var(--font-line-height-medium);margin:calc(var(--flatpicker-padding) * 0.25) auto;max-width:var(--datetimepicker-day-size);width:var(--datetimepicker-day-size)}.flatpickr-calendar .flatpickr-day:focus{outline:none}.flatpickr-calendar .flatpickr-day.focus-visible,.flatpickr-calendar .flatpickr-day:focus-visible{outline-color:var(--focus);outline-offset:var(--focus-offset);outline-style:var(--focus-style);outline-width:var(--focus-width)}.flatpickr-calendar .flatpickr-day.focus-visible{--focus-offset:0;background:transparent;border-color:transparent}.flatpickr-calendar .flatpickr-day:hover{background:var(--hover-effect)}.flatpickr-calendar .flatpickr-day.prevMonthDay,.flatpickr-calendar .flatpickr-day.nextMonthDay{font-weight:var(--font-weight-medium);opacity:0.6}.flatpickr-calendar .flatpickr-day.today{background:var(--orange-vivid-5);border-color:transparent;color:var(--red-warm-vivid-50)}.flatpickr-calendar .flatpickr-day.flatpickr-disabled{cursor:not-allowed;opacity:var(--disabled);color:var(--color)}.flatpickr-calendar .flatpickr-day.flatpickr-disabled *{pointer-events:none}.flatpickr-calendar .flatpickr-day.flatpickr-disabled:hover{background:transparent}.flatpickr-calendar .flatpickr-day.inRange{--interactive-rgb:var(--blue-warm-vivid-50-rgb);--hover:var(--hover-dark);background-image:linear-gradient(rgba(var(--interactive-rgb), var(--hover)), rgba(var(--interactive-rgb), var(--hover)));border-color:transparent;box-shadow:none;color:var(--color-dark);opacity:1}.flatpickr-calendar .flatpickr-day.selected,.flatpickr-calendar .flatpickr-day.startRange,.flatpickr-calendar .flatpickr-day.endRange{background:var(--selected);border-color:transparent;color:var(--color-dark);opacity:1}.flatpickr-calendar .flatpickr-time{display:flex;justify-content:center;margin:0 var(--flatpicker-padding);max-height:none}.flatpickr-calendar .flatpickr-time input{--input-background:var(--bg-color);--input-border-color:var(--color-secondary-06);--input-border-width:1px;--input-border-style:solid;--input-padding:0 var(--spacing-scale-half);--input-radius:var(--surface-rounder-sm);background:var(--input-background);border:var(--input-border-width) var(--input-border-style) var(--input-border-color);border-radius:var(--input-radius);color:var(--text-color);display:block;font-size:var(--font-size-scale-up-01);font-weight:var(--font-weight-medium);height:var(--input-size);padding:var(--input-padding);width:100%;margin:calc(var(--flatpicker-padding) * 0.25) 0}.flatpickr-calendar .flatpickr-time input:not([data-disable-hover-interaction]):not(:disabled):hover{background-image:linear-gradient(rgba(var(--color-rgb), var(--hover)), rgba(var(--color-rgb), var(--hover)))}.flatpickr-calendar .flatpickr-time input:focus,.flatpickr-calendar .flatpickr-time input:focus-visible,.flatpickr-calendar .flatpickr-time input.focus-visible{border-color:var(--focus) !important;box-shadow:0 0 0 var(--surface-width-md) var(--focus);outline:none}.flatpickr-calendar .flatpickr-time input.has-icon{padding-right:var(--spacing-scale-5x)}.flatpickr-calendar .flatpickr-time input[type=password]::-ms-reveal,.flatpickr-calendar .flatpickr-time input[type=password]::-ms-clear{display:none}.flatpickr-calendar .flatpickr-time .numInputWrapper{align-items:center;display:flex;flex:0 1 90px;flex-flow:column;height:auto;padding:calc(var(--flatpicker-padding) * 0.5) var(--flatpicker-padding)}.flatpickr-calendar .flatpickr-time .numInputWrapper:hover{background:transparent}.flatpickr-calendar .flatpickr-time .numInputWrapper span{align-items:center;border:0;border-radius:50px;color:var(--interactive);display:flex;height:var(--datetimepicker-arrows);justify-content:center;opacity:1;padding:0;position:static;width:var(--datetimepicker-arrows)}.flatpickr-calendar .flatpickr-time .numInputWrapper span:not([data-disable-hover-interaction]):not(:disabled):hover{background-image:linear-gradient(rgba(var(--interactive-rgb), var(--hover)), rgba(var(--interactive-rgb), var(--hover)))}.flatpickr-calendar .flatpickr-time .numInputWrapper span::after{border:none;position:static}.flatpickr-calendar .flatpickr-time .numInputWrapper span.arrowUp{order:-1}.flatpickr-calendar .flatpickr-time .numInputWrapper span.arrowUp::after{transform:rotate(225deg) translate(-1px, -1px)}.flatpickr-calendar.hasTime .flatpickr-time{border-color:var(--border-color);height:auto}.flatpickr-calendar.hasTime.noCalendar .flatpickr-time{border-color:transparent}";

const BrxDateTimePicker = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.brxChange = createEvent(this, "brxChange", 7);
    this.type = undefined;
    this.mode = 'single';
    this.placeholder = undefined;
    this.config = undefined;
    this.value = undefined;
    this.controlledValue = TOKEN_UNCONTROLLED;
    this.currentValue = undefined;
  }
  get inputEl() {
    return findTarget('input', this.el);
  }
  get inputValue() {
    return this.inputEl.value;
  }
  get selectionStart() {
    return this.inputEl.selectionStart;
  }
  get parsedConfig() {
    var _a;
    const config = tryParseJSON((_a = this.config) !== null && _a !== void 0 ? _a : {});
    return typeof config !== 'string' ? config : {};
  }
  syncCurrentValueFromProps() {
    this.currentValue = this.controlledValue !== TOKEN_UNCONTROLLED ? this.controlledValue : this.value;
  }
  syncFlatpickerDateFromCurrentValue() {
    this.fp.setDate(this.currentValue, false);
  }
  setCurrentValue(selectedDates, dateStr) {
    if (this.controlledValue === TOKEN_UNCONTROLLED) {
      this.currentValue = selectedDates;
    }
    else {
      this.syncFlatpickerDateFromCurrentValue();
    }
    this.brxChange.emit({ selectedDates, dateStr });
  }
  get setup() {
    return getSetupForType(this.type);
  }
  get configNative() {
    const { mode } = this;
    const { dateFormat, noCalendar, enableTime } = this.setup;
    return {
      mode,
      dateFormat,
      enableTime,
      noCalendar,
      wrap: true,
      time_24hr: true,
      allowInput: true,
      minuteIncrement: 1,
      disableMobile: true,
      nextArrow: '<brx-button circle size="small" type="button"><brx-icon name="fa5/fas/chevron-right"></brx-icon></brx-button>',
      prevArrow: '<brx-button circle size="small" type="button"><brx-icon name="fa5/fas/chevron-left"></brx-icon></brx-button>',
    };
  }
  get completeConfig() {
    return Object.assign({}, this.parsedConfig, this.configNative);
  }
  get iconName() {
    return getIconForType(this.type);
  }
  get inputInitialType() {
    return getInitialInputType(this.type);
  }
  get flatpickr() {
    return getFlatpickr();
  }
  get language() {
    return getDefaultLocale();
  }
  /**
   * Adiciona máscara de data no input
   */
  dateInputMask(input) {
    input.setAttribute('maxlength', '10');
    input.addEventListener('keypress', e => {
      if (!e.code.startsWith('Digit')) {
        e.preventDefault();
      }
      const length = input.value.length;
      // TODO: ????
      // if (len !== 1 || len !== 3) {
      if (length !== 1 && length !== 3) {
        if (e.code == 'Help') {
          e.preventDefault();
        }
      }
      if (length === 2) {
        input.value += '/';
      }
      if (length === 5) {
        input.value += '/';
      }
    });
  }
  /**
   *  Adiciona máscara de hora no input
   */
  dateTimeInputMask(input) {
    input.setAttribute('maxlength', '16');
    input.addEventListener('keypress', e => {
      if (!e.code.startsWith('Digit')) {
        e.preventDefault();
      }
      const length = input.value.length;
      // TODO: ????
      if (length !== 1 && length !== 3) {
        if (e.code == 'Help') {
          e.preventDefault();
        }
      }
      switch (length) {
        case 2: {
          input.value += '/';
          break;
        }
        case 5: {
          input.value += '/';
          break;
        }
        case 10: {
          input.value += ' ';
          break;
        }
        case 13: {
          input.value += ':';
          break;
        }
        default: {
          break;
        }
      }
    });
  }
  /**
   * Coloca máscara com range de data no input
   */
  dateRangeInputMask(input) {
    input.setAttribute('maxlength', '25');
    input.addEventListener('keypress', e => {
      if (!e.code.startsWith('Digit')) {
        e.preventDefault();
      }
      const length = input.value.length;
      // TODO: ????
      // if (len !== 1 || len !== 3) {
      if (length !== 1 && length !== 3) {
        if (e.code === 'Help') {
          e.preventDefault();
        }
      }
      this.positionRangeMask(input, length);
    });
  }
  /**
   * Insere a máscara na Dom
   */
  async positionRangeMask(input, length) {
    const language = await this.language;
    const tamSeparator = language.rangeSeparator.length;
    const daySeparator = 10 + tamSeparator + 2;
    const monthSeparator = 10 + tamSeparator + 5;
    input.setAttribute('maxlength', `${20 + tamSeparator}`);
    switch (length) {
      case 2: {
        input.value += '/';
        break;
      }
      case 5: {
        input.value += '/';
        break;
      }
      case 10: {
        input.value += language.rangeSeparator;
        break;
      }
      case daySeparator: {
        input.value += '/';
        break;
      }
      case monthSeparator: {
        input.value += '/';
        break;
      }
      default: {
        break;
      }
    }
  }
  /**
   * Insere máscara de hora
   */
  timeInputMask(input) {
    input.setAttribute('maxlength', '5');
    input.addEventListener('keypress', e => {
      if (!e.code.startsWith('Digit')) {
        e.preventDefault();
      }
      const length = input.value.length;
      // TODO: ????
      // if (len !== 1 || len !== 3) {
      if (length !== 1 && length !== 3) {
        if (e.code === 'Help') {
          e.preventDefault();
        }
      }
      if (length === 2) {
        input.value += ':';
      }
    });
  }
  async setupMask() {
    switch (this.type) {
      case Type.DATE: {
        this.dateInputMask(this.inputEl);
        break;
      }
      case Type.TIME: {
        this.timeInputMask(this.inputEl);
        break;
      }
      case Type.DATETIME_LOCAL: {
        this.dateTimeInputMask(this.inputEl);
        break;
      }
      default: {
        if (this.mode === 'range') {
          this.dateRangeInputMask(this.inputEl);
        }
        else {
          this.dateInputMask(this.inputEl);
        }
        break;
      }
    }
  }
  async buildDateTimePicker() {
    if (this.fp) {
      this.fp.destroy();
      this.fp = null;
    }
    const flatpickr = await this.flatpickr;
    const language = await this.language;
    flatpickr.localize(language);
    await this.setupMask();
    this.fp = flatpickr(this.el, this.completeConfig);
    const handleOpen = () => {
      document.querySelectorAll('.arrowUp').forEach(element => {
        element.classList.add('fas', 'fa-chevron-up');
      });
      document.querySelectorAll('.arrowDown').forEach(element => {
        element.classList.add('fas', 'fa-chevron-down');
      });
    };
    this.fp.config.onOpen.push(handleOpen);
    const handleChange = (selectedDates, dateStr) => {
      this.setCurrentValue(selectedDates, dateStr);
    };
    this.fp.config.onChange.push(handleChange);
  }
  handleKeyup() {
    const { fp, inputValue } = this;
    if (fp) {
      if (!Number.isNaN(new Date(inputValue))) {
        // if the cursor is at the end of the edit and we have a full sized date, allow the date to immediately change, otherwise just move to the correct month without actually changing it
        if (this.selectionStart >= 10) {
          fp.setDate(inputValue, true);
        }
        else {
          fp.jumpToDate(inputValue);
        }
      }
    }
  }
  handleBlur() {
    const { fp, inputValue } = this;
    if (fp) {
      if (!Number.isNaN(new Date(inputValue))) {
        fp.setDate(inputValue, true);
      }
    }
  }
  componentDidLoad() {
    enqueueIdleCallback(() => {
      this.buildDateTimePicker().then(() => {
        this.syncCurrentValueFromProps();
      });
    });
  }
  componentShouldUpdate(_, __, propName) {
    switch (propName) {
      case 'placeholder':
      case 'inputType':
      case 'iconName': {
        return true;
      }
      default: {
        return false;
      }
    }
  }
  render() {
    const { placeholder, inputInitialType: inputType, iconName } = this;
    return (h(Host, null, h("brx-input", { placeholder: placeholder, type: inputType, class: "has-icon", "data-input": "data-input" }, iconName && (h("brx-button", { slot: "end-button", size: "small", type: "button", circle: true, "aria-label": "Abrir Timepicker", "data-toggle": "data-toggle" }, h("brx-icon", { name: iconName })))), h("slot", null)));
  }
  get el() { return getElement(this); }
  static get watchers() { return {
    "value": ["syncCurrentValueFromProps"],
    "controlledValue": ["syncCurrentValueFromProps"],
    "currentValue": ["syncFlatpickerDateFromCurrentValue"],
    "type": ["buildDateTimePicker"],
    "mode": ["buildDateTimePicker"],
    "config": ["buildDateTimePicker"]
  }; }
};
BrxDateTimePicker.style = brxDatetimepickerCss;

export { BrxDateTimePicker as brx_datetimepicker };
