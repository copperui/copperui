/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "-sample.html",
    "revision": "b89b62c13705ac39eb336aa64d1bde2c"
  },
  {
    "url": "accordion-legacy.html",
    "revision": "239d1cdd9e04e8a7fed2573b11954c44"
  },
  {
    "url": "accordion.html",
    "revision": "7e045ea0603d1bca1a819a3e9f52f4e6"
  },
  {
    "url": "avatar.html",
    "revision": "2bbd35ef00ae3b4bd2f3c0aee1553aba"
  },
  {
    "url": "breadcrumb.html",
    "revision": "ae92eb9536305a73c1f49b47b215cb94"
  },
  {
    "url": "button.html",
    "revision": "4d1827458dceacd3bf7c1c565340643e"
  },
  {
    "url": "card.html",
    "revision": "71f0503efe94603cd3d34f11095f3eb0"
  },
  {
    "url": "checkbox.html",
    "revision": "14c7e6b246baa9ed12f9e9f8da4805ee"
  },
  {
    "url": "collapse.html",
    "revision": "53cbbded4fc03c245a3a062382cb38da"
  },
  {
    "url": "datetimepicker.html",
    "revision": "3a5829e57c82f0d5daad0cb321fab3d6"
  },
  {
    "url": "divider.html",
    "revision": "2bcc1e6950dd81c731c60b106c96cf57"
  },
  {
    "url": "dropdown.html",
    "revision": "debe7b7b3eec19df3fefc8f3b7be3977"
  },
  {
    "url": "icon.html",
    "revision": "ae61fe3ff0e209f18b1f4d509b4d4d30"
  },
  {
    "url": "index.html",
    "revision": "7fada8847fbaba5ba6d18eee8f163d9b"
  },
  {
    "url": "input.html",
    "revision": "edda67fc026410c60cf60cef9d9d546e"
  },
  {
    "url": "item.html",
    "revision": "4ba2f24ebc237d4d735cb8389004dc0a"
  },
  {
    "url": "list.html",
    "revision": "7de63051194e1c2b676afd294543283c"
  },
  {
    "url": "loading.html",
    "revision": "43d24636b20b5032369d16654f4a2801"
  },
  {
    "url": "magic-button.html",
    "revision": "90fe5d17dbac863499b790bea7aaac02"
  },
  {
    "url": "message.html",
    "revision": "a6ac84830b4edf6a616a9ecfec2db0f5"
  },
  {
    "url": "modal.html",
    "revision": "44b29548640e53204079dd5c1e53dc85"
  },
  {
    "url": "notification.html",
    "revision": "51da152244096dee7247330a95ea0c98"
  },
  {
    "url": "pagination.html",
    "revision": "d45fae326b05bee96a88429c7fc895cd"
  },
  {
    "url": "radio.html",
    "revision": "8e70cbca413adcdd32077903c5534a9c"
  },
  {
    "url": "scrim.html",
    "revision": "440af707976618d5da9f5fa99d3bfb04"
  },
  {
    "url": "select.html",
    "revision": "e99166dc4187a030bab8f3844e2bf6cf"
  },
  {
    "url": "sign-in.html",
    "revision": "452dffad1a597b4ac3584e036a64e6f5"
  },
  {
    "url": "skip-link.html",
    "revision": "9d6b3f219cbfac3af40accfaa50832f4"
  },
  {
    "url": "step.html",
    "revision": "e260c46f99bd08ee322d6cfc8c5a3912"
  },
  {
    "url": "tab.html",
    "revision": "79194adec707f44d95f443a48f61dd9f"
  },
  {
    "url": "tag.html",
    "revision": "59f4555dcd0b71a84fa10ef6fe88a766"
  },
  {
    "url": "textarea.html",
    "revision": "7183059b40c66fd8f43e85bf24b51f66"
  },
  {
    "url": "tooltip.html",
    "revision": "6e18e193eaa8323b0c2b981f87b2fa5c"
  },
  {
    "url": "upload.html",
    "revision": "810c2f6b39d77daef0e964f438faadad"
  },
  {
    "url": "build/index.esm.js",
    "revision": "4bc038909b49e2fa07c8428010ccc2e5"
  },
  {
    "url": "build/p-03ec6aa4.js"
  },
  {
    "url": "build/p-043daa16.entry.js"
  },
  {
    "url": "build/p-08a5c37b.entry.js"
  },
  {
    "url": "build/p-08c05bc8.entry.js"
  },
  {
    "url": "build/p-09791db3.js"
  },
  {
    "url": "build/p-0bc4d108.entry.js"
  },
  {
    "url": "build/p-0be5ba55.entry.js"
  },
  {
    "url": "build/p-0f645d4d.entry.js"
  },
  {
    "url": "build/p-1302c9ec.entry.js"
  },
  {
    "url": "build/p-16791a61.entry.js"
  },
  {
    "url": "build/p-17cadeb2.entry.js"
  },
  {
    "url": "build/p-181df16a.entry.js"
  },
  {
    "url": "build/p-24dbf950.entry.js"
  },
  {
    "url": "build/p-25e35de2.entry.js"
  },
  {
    "url": "build/p-2f30107d.entry.js"
  },
  {
    "url": "build/p-311a21d5.entry.js"
  },
  {
    "url": "build/p-3226c0a8.entry.js"
  },
  {
    "url": "build/p-38214ffe.entry.js"
  },
  {
    "url": "build/p-398c47ec.js"
  },
  {
    "url": "build/p-3a574e98.entry.js"
  },
  {
    "url": "build/p-3ad6c279.entry.js"
  },
  {
    "url": "build/p-3e25c4b2.entry.js"
  },
  {
    "url": "build/p-3e8ff66b.js"
  },
  {
    "url": "build/p-4119397e.entry.js"
  },
  {
    "url": "build/p-43d0e488.entry.js"
  },
  {
    "url": "build/p-47856353.entry.js"
  },
  {
    "url": "build/p-491c05bc.entry.js"
  },
  {
    "url": "build/p-53b8d2cc.entry.js"
  },
  {
    "url": "build/p-53f11b57.entry.js"
  },
  {
    "url": "build/p-5738d7e4.js"
  },
  {
    "url": "build/p-587dbdcd.entry.js"
  },
  {
    "url": "build/p-5e654ea7.entry.js"
  },
  {
    "url": "build/p-5fda1a93.entry.js"
  },
  {
    "url": "build/p-694e4e3f.js"
  },
  {
    "url": "build/p-69f1584d.entry.js"
  },
  {
    "url": "build/p-6e81929f.entry.js"
  },
  {
    "url": "build/p-70f0d588.entry.js"
  },
  {
    "url": "build/p-7ab05e20.entry.js"
  },
  {
    "url": "build/p-80ab0189.js"
  },
  {
    "url": "build/p-87f291fd.js"
  },
  {
    "url": "build/p-8ac05905.entry.js"
  },
  {
    "url": "build/p-8b4142f6.js"
  },
  {
    "url": "build/p-90c52b9f.js"
  },
  {
    "url": "build/p-92b0f625.entry.js"
  },
  {
    "url": "build/p-9611f6f2.entry.js"
  },
  {
    "url": "build/p-9645a8a9.entry.js"
  },
  {
    "url": "build/p-9c895b53.entry.js"
  },
  {
    "url": "build/p-9e966cff.entry.js"
  },
  {
    "url": "build/p-9ee7498b.entry.js"
  },
  {
    "url": "build/p-a56c5ad9.entry.js"
  },
  {
    "url": "build/p-a7adf9e3.entry.js"
  },
  {
    "url": "build/p-a9c26296.entry.js"
  },
  {
    "url": "build/p-b376e286.entry.js"
  },
  {
    "url": "build/p-be087878.entry.js"
  },
  {
    "url": "build/p-c1603be6.entry.js"
  },
  {
    "url": "build/p-c489776e.entry.js"
  },
  {
    "url": "build/p-c4e1eee3.entry.js"
  },
  {
    "url": "build/p-c50a87a5.entry.js"
  },
  {
    "url": "build/p-c6dbc228.entry.js"
  },
  {
    "url": "build/p-cb4fc3ca.entry.js"
  },
  {
    "url": "build/p-cb897368.entry.js"
  },
  {
    "url": "build/p-cd854570.entry.js"
  },
  {
    "url": "build/p-ce4f18c8.entry.js"
  },
  {
    "url": "build/p-ced6ef18.entry.js"
  },
  {
    "url": "build/p-d4c60b64.entry.js"
  },
  {
    "url": "build/p-dd6b0bb8.entry.js"
  },
  {
    "url": "build/p-e5ae1b6e.js"
  },
  {
    "url": "build/p-e5ee9c11.entry.js"
  },
  {
    "url": "build/p-ed04ed75.js"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
