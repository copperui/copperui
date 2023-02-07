import { g as getDefaultExportFromCjs, c as createCommonjsModule, a as commonjsGlobal } from './_commonjsHelpers-8fe71198.js';

var pt = createCommonjsModule(function (module, exports) {
(function (global, factory) {
  'object' === 'object' && 'object' !== 'undefined' ? factory(exports) :
  typeof undefined === 'function' && undefined.amd ? undefined(['exports'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.pt = {}));
}(commonjsGlobal, (function (exports) { 'use strict';

  var fp = typeof window !== "undefined" && window.flatpickr !== undefined
      ? window.flatpickr
      : {
          l10ns: {},
      };
  var Portuguese = {
      weekdays: {
          shorthand: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"],
          longhand: [
              "Domingo",
              "Segunda-feira",
              "Terça-feira",
              "Quarta-feira",
              "Quinta-feira",
              "Sexta-feira",
              "Sábado",
          ],
      },
      months: {
          shorthand: [
              "Jan",
              "Fev",
              "Mar",
              "Abr",
              "Mai",
              "Jun",
              "Jul",
              "Ago",
              "Set",
              "Out",
              "Nov",
              "Dez",
          ],
          longhand: [
              "Janeiro",
              "Fevereiro",
              "Março",
              "Abril",
              "Maio",
              "Junho",
              "Julho",
              "Agosto",
              "Setembro",
              "Outubro",
              "Novembro",
              "Dezembro",
          ],
      },
      rangeSeparator: " até ",
      time_24hr: true,
  };
  fp.l10ns.pt = Portuguese;
  var pt = fp.l10ns;

  exports.Portuguese = Portuguese;
  exports.default = pt;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
});

const pt$1 = /*@__PURE__*/getDefaultExportFromCjs(pt);

const pt$2 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.assign(/*#__PURE__*/Object.create(null), pt, {
  'default': pt$1
}));

export { pt$2 as p };
