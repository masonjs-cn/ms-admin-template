/**
 * @description: 检测用户设备类型
 * @return {boolean} - 如果检测到特定设备类型则返回 true，否则返回 false
 */
export const deviceDetection = (): boolean => {
  // 检查浏览器的 userAgent 是否可用
  if (!navigator.userAgent) return false;

  // 将 userAgent 转换为小写
  const userAgent = navigator.userAgent.toLowerCase();

  // 检测不同设备类型
  const isMidp = /midp/i.test(userAgent);
  const isUcweb = /ucweb/i.test(userAgent);
  const isAndroid = /android/i.test(userAgent);
  const isIphone = /iphone os/i.test(userAgent);
  const isWindowsCe = /windows ce/i.test(userAgent);
  const isRv1234 = /rv:1.2.3.4/i.test(userAgent);
  const isWindowsMobile = /windows mobile/i.test(userAgent);

  // 返回检测结果
  return (
    isMidp ||
    isUcweb ||
    isAndroid ||
    isIphone ||
    isWindowsCe ||
    isRv1234 ||
    isWindowsMobile
  );
};

export default deviceDetection;
