// Target type definition
export type Target = "_blank" | "_self" | "_parent" | "_top" | "framename";

/**
 * @description 创建超链接
 * @param href 超链接地址
 * @param target 打开方式，默认 "_blank"
 */
export const openLink = (href: string, target: Target = "_blank"): void => {
  const link = document.createElement("a");
  link.setAttribute("href", href);
  link.setAttribute("target", target);
  link.setAttribute("rel", "noreferrer noopener");
  link.setAttribute("id", "external");

  const existingLink = document.getElementById("external");
  if (existingLink) {
    document.body.removeChild(existingLink);
  }

  document.body.appendChild(link);
  link.click();
  link.remove();
};
