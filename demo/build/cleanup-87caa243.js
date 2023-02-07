var __classPrivateFieldGet = (undefined && undefined.__classPrivateFieldGet) || function (receiver, state, kind, f) {
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _CleanupManager_callbacks;
class CleanupManager {
  constructor() {
    _CleanupManager_callbacks.set(this, new Set());
  }
  add(callback) {
    __classPrivateFieldGet(this, _CleanupManager_callbacks, "f").add(callback);
  }
  run() {
    for (const callback of __classPrivateFieldGet(this, _CleanupManager_callbacks, "f")) {
      callback();
      __classPrivateFieldGet(this, _CleanupManager_callbacks, "f").delete(callback);
    }
    return Promise.resolve();
  }
}
_CleanupManager_callbacks = new WeakMap();

export { CleanupManager as C };
