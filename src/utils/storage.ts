// Storage Types
export interface ProxyStorage {
  setItem<T>(key: string, value: T): void;
  getItem<T>(key: string): T;
  removeItem(key: string): void;
  clear(): void;
}

// Base storage class
export class Storage implements ProxyStorage {
  protected storage: globalThis.Storage;

  constructor(storage: globalThis.Storage) {
    this.storage = storage;
  }

  setItem<T>(key: string, value: T): void {
    if (this.isEmpty(this.storage)) return;
    this.storage.setItem(key, JSON.stringify(value));
  }

  getItem<T>(key: string): T {
    if (this.isEmpty(this.storage)) return {} as T;
    return JSON.parse(this.storage.getItem(key) as string);
  }

  removeItem(key: string): void {
    if (this.isEmpty(this.storage)) return;
    this.storage.removeItem(key);
  }

  clear(): void {
    if (this.isEmpty(this.storage)) return;
    this.storage.clear();
  }

  private isEmpty(storage: globalThis.Storage | null | undefined): boolean {
    return storage === null || typeof storage === "undefined";
  }
}

// Local storage class
export class LocalStorage extends Storage {}

// Environment check
const isClient = typeof window !== "undefined";

/**
 * @description 操作本地 localStorage
 * @returns LocalStorage instance
 */
export const storageLocal = (): LocalStorage => {
  return isClient
    ? new LocalStorage(window.localStorage)
    : new LocalStorage({
        length: 0,
        key: () => null,
        getItem: () => null,
        setItem: () => {},
        removeItem: () => {},
        clear: () => {}
      } as globalThis.Storage);
};

/**
 * @description 操作本地 sessionStorage
 * @returns Storage instance
 */
export const storageSession = (): Storage => {
  return isClient
    ? new Storage(window.sessionStorage)
    : new Storage({
        length: 0,
        key: () => null,
        getItem: () => null,
        setItem: () => {},
        removeItem: () => {},
        clear: () => {}
      } as globalThis.Storage);
};
