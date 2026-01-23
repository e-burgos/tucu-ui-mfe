export const navigateBetweenApps = (
  url: string,
  target: '_self' | '_blank' = '_self',
) => {
  if (target === '_blank') {
    window.open(url, target);
  }
  return window.location.href = url;
};
