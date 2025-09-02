// utils/colorUtils.js
export const hexToRgba = (hex, alpha = 1) => {
  const [r, g, b] = hex
    .replace("#", "")
    .match(/.{1,2}/g)
    .map((x) => parseInt(x, 16));
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};
