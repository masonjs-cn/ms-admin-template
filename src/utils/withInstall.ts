import type { App, Component } from "vue";

/**
 * @description: 将主组件和附加组件进行安装
 * @param {Component} component - 主组件
 * @param {Record<string, Component>} [componentsMap] - 附加组件映射
 * @return {Component} - 带有 install 方法的主组件
 */
export const withInstall = (
  component: any,
  componentsMap?: Record<string, Component>
): Component => {
  // 定义 install 方法
  component.install = (app: App): void => {
    // 注册主组件
    app.component(component.name, component);

    // 注册所有附加组件
    if (componentsMap) {
      for (const subComponent of Object.values(componentsMap)) {
        app.component(subComponent.name, subComponent);
      }
    }
  };

  // 将附加组件直接添加到主组件上
  if (componentsMap) {
    for (const [key, value] of Object.entries(componentsMap)) {
      (component as any)[key] = value; // 使用 any，以避免类型检查错误
    }
  }

  return component; // 返回带有 install 方法的主组件
};
