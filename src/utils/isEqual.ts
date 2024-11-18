/**
 * @description 判断两个值是否相等（深度对比）
 * @param a 第一个值
 * @param b 第二个值
 * @returns `boolean`
 */
export function isEqual(a: unknown, b: unknown): boolean {
  const type = Object.prototype.toString.call(a);

  if (type !== Object.prototype.toString.call(b)) {
    return false;
  }

  switch (type) {
    case "[object Object]":
      return isEqualObject(
        a as Record<string, unknown>,
        b as Record<string, unknown>
      );
    case "[object Array]":
      return isEqualArray(a as unknown[], b as unknown[]);
    case "[object Function]":
      return a === b || a.toString() === b.toString();
    default:
      return a === b;
  }
}

/**
 * @description 判断两个对象是否相等（深度对比）
 * @param obj 第一个对象
 * @param other 第二个对象
 * @returns `boolean`
 */
export function isEqualObject(
  obj: Record<string, unknown> | null | undefined,
  other: Record<string, unknown> | null | undefined
): boolean {
  if (obj === other) return true;
  if (!obj || !other || typeof obj !== "object" || typeof other !== "object") {
    return false;
  }

  const keys = Object.keys(obj);
  const otherKeys = Object.keys(other);

  if (keys.length !== otherKeys.length) return false;

  return keys.every(
    key => otherKeys.includes(key) && isEqual(obj[key], other[key])
  );
}

/**
 * @description 判断两个数组是否相等（深度对比）
 * @param arr 第一个数组
 * @param other 第二个数组
 * @returns `boolean`
 */
export function isEqualArray(
  arr: unknown[] | null | undefined,
  other: unknown[] | null | undefined
): boolean {
  if (!arr || !other) return false;
  if (arr.length !== other.length) return false;

  return arr.every((item, index) => isEqual(item, other[index]));
}

/**
 * @description 是否为空，针对 `数组`、`对象`、`字符串`、`new Map()`、`new Set()`、`null`、`undefined` 进行判断
 * @param val 要判断的值
 * @returns `boolean` - 如果为空返回 true，否则返回 false
 */
export function isAllEmpty<T = unknown>(val: T): boolean {
  return !!(isEmpty(val) || isNullOrUndefined(val));
}

/**
 * @description 判断值是否为空（不包括 null 和 undefined）
 */
function isEmpty(val: unknown): boolean {
  return isArrayOrString(val)
    ? val.length === 0
    : val instanceof Map || val instanceof Set
      ? val.size === 0
      : isObject(val)
        ? Object.keys(val).length === 0
        : false;
}

/**
 * @description 判断值是否为 null 或 undefined
 */
function isNullOrUndefined(val: unknown): boolean {
  return isNull(val) || isUndefined(val);
}

/**
 * @description 判断值是否为 null
 */
function isNull(val: unknown): val is null {
  return val === null;
}

/**
 * @description 判断值是否为 undefined
 */
function isUndefined(val: unknown): val is undefined {
  return typeof val === "undefined";
}

/**
 * @description 判断值是否为对象
 */
function isObject(val: unknown): val is Record<string, unknown> {
  return val !== null && isType(val, "Object");
}

/**
 * @description 判断值是否为字符串
 */
export function isString(val: unknown): val is string {
  return isType(val, "String");
}

/**
 * @description 判断值是否为数组或字符串
 */
function isArrayOrString(val: unknown): val is unknown[] | string {
  return val && (Array.isArray(val) || isString(val));
}

/**
 * @description 判断值的类型
 */
function isType(val: unknown, type: string): boolean {
  return Object.prototype.toString.call(val) === `[object ${type}]`;
}
