/**
 * @description 判断元素是否存在指定类名
 * @param element 当前类名的元素
 * @param name 类名
 * @returns `boolean`
 */
export const hasClass = (
  element: HTMLElement | Element,
  name: string
): boolean => {
  return element.classList.contains(name);
};

/**
 * @description 向当前元素添加指定类名
 * @param element 当前元素
 * @param name 类名
 * @param extraName 额外类名（可选）
 */
export const addClass = (
  element: HTMLElement | Element,
  name: string,
  extraName?: string
): void => {
  element.classList.add(name);
  if (extraName) element.classList.add(extraName);
};

/**
 * @description 删除当前元素的指定类名
 * @param element 当前元素
 * @param name 类名
 * @param extraName 额外类名（可选）
 */
export const removeClass = (
  element: HTMLElement | Element,
  name: string,
  extraName?: string
): void => {
  element.classList.remove(name);
  if (extraName) element.classList.remove(extraName);
};

/**
 * @description 是否向当前元素添加指定类名
 * @param bool `boolean`
 * @param name 类名
 * @param element 当前元素（可选，如果不填，默认 `document.body` ）
 */
export const toggleClass = (
  bool: boolean,
  name: string,
  element: HTMLElement | Element = document.body
): void => {
  bool ? addClass(element, name) : removeClass(element, name);
};

/**
 * @description 获取当前元素的所有类名
 * @param element 当前元素
 * @returns `string`、`string[]` 当前元素的所有类名，如果只有一个类名，返回字符串，如果有多个，返回字符串数组
 */
export const getClass = (element: HTMLElement | Element): string | string[] => {
  const classList = Array.from(element.classList);
  return classList.length === 1 ? classList[0] : classList;
};
