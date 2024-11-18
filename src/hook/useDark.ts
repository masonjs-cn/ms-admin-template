import { shallowRef, onBeforeMount } from "vue";

/**
 * @description: 获取暗黑模式的状态和切换功能
 * @param {Object} options - 配置对象
 * @return {Object} - 返回暗黑模式的状态和切换方法
 */
const useDark = (options?: { className?: string; selector?: string }) => {
  let t = options?.className ?? "dark";
  let n = shallowRef<boolean>(false);
  let r: MutationObserver | null = null;

  const o = () => {
    let element =
      options?.selector === "html" ? document.documentElement : document.body;
    n.value = element.classList.contains(t);
  };

  const s = () => {
    let element =
      options?.selector === "html" ? document.documentElement : document.body;
    element.classList.toggle(t);
  };

  onBeforeMount(() => {
    let element =
      options?.selector === "html" ? document.documentElement : document.body;
    o();
    r = new MutationObserver(o);
    r.observe(element, { attributes: true, attributeFilter: ["class"] });
  });

  return { isDark: n, toggleDark: s };
};

export default useDark;
