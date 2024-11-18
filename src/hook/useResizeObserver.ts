import { computed, nextTick, unref } from "vue";
import type { Ref } from "vue";

type MaybeRef<T> = T | Ref<T>;
type MaybeElement = HTMLElement | null | undefined;
type MaybeElementRef = MaybeRef<MaybeElement>;
type TargetValue = string | HTMLElement | (string | HTMLElement)[];
type TargetType = MaybeRef<TargetValue> | MaybeElementRef;

// 修改类型定义，使用 readonly 数组
interface ResizeObserverSize {
  readonly inlineSize: number;
  readonly blockSize: number;
}

interface CustomResizeObserverEntry {
  readonly target: Element;
  readonly contentRect: DOMRectReadOnly;
  readonly borderBoxSize: readonly ResizeObserverSize[];
  readonly contentBoxSize: readonly ResizeObserverSize[];
  readonly devicePixelContentBoxSize: readonly ResizeObserverSize[];
}

/**
 * @description: 使用 ResizeObserver 监视元素的大小变化
 * @param {TargetType} target - 要观察的目标元素
 * @param {Function} callback - 大小变化时的回调函数
 * @param {Object} options - 配置选项
 * @param {number} [options.time=40] - 观察的间隔时间
 * @param {string} [options.box='content-box'] - 指定观察的框模型
 * @param {boolean} [options.immediate=true] - 是否立即调用回调
 * @return {Object} - 包含停止和重启观察的方法
 */
function useResizeObserver(
  target: TargetType,
  callback: (
    entries: CustomResizeObserverEntry[],
    observer: ResizeObserver
  ) => void,
  options: {
    time?: number;
    box?: "content-box" | "border-box";
    immediate?: boolean;
  } = {}
) {
  const { time = 40, box = "content-box", immediate = true } = options;
  let observer: ResizeObserver | null = null;
  let isInitial = true;
  let timeoutId: number | null = null;

  const throttledCallback = (entries: ResizeObserverEntry[]) => {
    if (timeoutId) {
      window.clearTimeout(timeoutId);
    }

    timeoutId = window.setTimeout(() => {
      if (!immediate && isInitial) {
        isInitial = false;
        return;
      }
      // 转换为 CustomResizeObserverEntry，保持数组的只读性
      const customEntries = entries.map(entry => ({
        target: entry.target,
        contentRect: entry.contentRect,
        borderBoxSize: Array.from(
          entry.borderBoxSize || []
        ) as readonly ResizeObserverSize[],
        contentBoxSize: Array.from(
          entry.contentBoxSize || []
        ) as readonly ResizeObserverSize[],
        devicePixelContentBoxSize: Array.from(
          entry.devicePixelContentBoxSize || []
        ) as readonly ResizeObserverSize[]
      }));
      callback(customEntries, observer!);
    }, time);
  };

  const disconnectObserver = () => {
    if (observer) {
      observer.disconnect();
      observer = null;
    }
    if (timeoutId) {
      window.clearTimeout(timeoutId);
      timeoutId = null;
    }
  };

  const isString = (value: any): value is string => typeof value === "string";

  const isElement = (value: any): value is HTMLElement => {
    return value instanceof Element || value instanceof HTMLElement;
  };

  const getElements = (selector: string): HTMLElement[] => {
    try {
      return Array.from(document.querySelectorAll(selector)).filter(isElement);
    } catch (e) {
      console.warn(`Invalid selector: ${selector}`);
      return [];
    }
  };

  const targetElements = computed(() => {
    try {
      const targetValue = unref(target);

      if (!targetValue) {
        return [];
      }

      if (isString(targetValue)) {
        return getElements(targetValue);
      } else if (Array.isArray(targetValue)) {
        return targetValue
          .map(t => unref(t))
          .flatMap(t => (isString(t) ? getElements(t) : t))
          .filter(isElement);
      } else if (isElement(targetValue)) {
        return [targetValue];
      }
      return [];
    } catch (e) {
      console.warn("Invalid target element", e);
      return [];
    }
  });

  const startObserving = () => {
    disconnectObserver();

    if (targetElements.value.length > 0) {
      observer = new ResizeObserver(throttledCallback);
      targetElements.value.forEach(element => {
        if (isElement(element)) {
          observer!.observe(element, { box });
          if (immediate) {
            const rect = element.getBoundingClientRect();
            const computedStyle = getComputedStyle(element);
            const paddingLeft = parseFloat(computedStyle.paddingLeft) || 0;
            const paddingRight = parseFloat(computedStyle.paddingRight) || 0;
            const paddingTop = parseFloat(computedStyle.paddingTop) || 0;
            const paddingBottom = parseFloat(computedStyle.paddingBottom) || 0;

            const entry: CustomResizeObserverEntry = {
              target: element,
              contentRect: rect,
              borderBoxSize: [
                {
                  inlineSize: rect.width,
                  blockSize: rect.height
                }
              ] as const,
              contentBoxSize: [
                {
                  inlineSize: rect.width - paddingLeft - paddingRight,
                  blockSize: rect.height - paddingTop - paddingBottom
                }
              ] as const,
              devicePixelContentBoxSize: [
                {
                  inlineSize:
                    (rect.width - paddingLeft - paddingRight) *
                    window.devicePixelRatio,
                  blockSize:
                    (rect.height - paddingTop - paddingBottom) *
                    window.devicePixelRatio
                }
              ] as const
            };
            callback([entry], observer!);
          }
        }
      });
    }
  };

  nextTick(() => {
    startObserving();
  });

  const stop = () => {
    disconnectObserver();
  };

  return {
    stop,
    restart: startObserving
  };
}

export default useResizeObserver;
