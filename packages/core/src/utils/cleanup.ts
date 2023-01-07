type ICleanupManagerCallback = () => void;

export class CleanupManager {
  #callbacks = new Set<ICleanupManagerCallback>();

  add(callback: ICleanupManagerCallback) {
    this.#callbacks.add(callback);
  }

  run() {
    for (const callback of this.#callbacks) {
      callback();
      this.#callbacks.delete(callback);
    }
  }
}
