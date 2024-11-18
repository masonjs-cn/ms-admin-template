import { getCurrentInstance } from "vue";

/**
 * @description: 获取 Vue 应用的全局属性
 * @return {T} - 返回全局属性对象
 * @template T - 全局属性的类型
 */
const useGlobal = <T>(): T => {
  const instance = getCurrentInstance();

  if (!instance) {
    throw new Error("useGlobal must be called within a setup function.");
  }

  const globalProperties = instance.appContext.config.globalProperties as T;
  return globalProperties;
};

export default useGlobal;
