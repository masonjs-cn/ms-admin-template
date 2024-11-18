/**
 * @description: 将文本复制到剪贴板
 * @param {string} text - 要复制的文本
 * @param {Object} options - 可选参数
 * @param {HTMLElement} [options.target] - 目标元素，默认为 document.body
 * @return {boolean} - 复制成功返回 true，失败返回 false
 */
export function copyTextToClipboard(
  text: string,
  { target = document.body }: { target?: HTMLElement } = {}
): boolean {
  const textarea = document.createElement("textarea");
  const activeElement = document.activeElement;

  // 设置 textarea 的样式和属性
  textarea.value = text;
  textarea.setAttribute("readonly", "");
  textarea.style.contain = "strict";
  textarea.style.position = "absolute";
  textarea.style.left = "-9999px";
  textarea.style.fontSize = "12pt";

  let selectedRange: Range | null = null;
  const selection = document.getSelection();

  // 保存当前选中的文本范围
  if (selection && selection.rangeCount > 0) {
    selectedRange = selection.getRangeAt(0);
  }

  // 将 textarea 添加到目标元素
  target.append(textarea);
  textarea.select();
  textarea.selectionStart = 0;
  textarea.selectionEnd = text.length;

  let isCopied = false;
  try {
    isCopied = document.execCommand("copy"); // 复制文本
  } catch (error) {
    console.error("Failed to copy text: ", error.message);
  }

  // 清理操作
  textarea.remove();
  if (selectedRange && selection) {
    selection.removeAllRanges();
    selection.addRange(selectedRange); // 还原选中的文本范围
  }

  if (activeElement instanceof HTMLElement) {
    activeElement.focus(); // 重新聚焦到之前的活动元素
  }

  return isCopied; // 返回复制结果
}
