export const navigateBetweenApps = (
  url: string,
  target: '_self' | '_blank' = '_self',
) => {
  if (target === '_blank') {
    window.open(url, target);
    return;
  }
  
  // Handle both absolute URLs and relative paths
  // If URL is already absolute (starts with http:// or https://), use it directly
  // Otherwise, treat it as a relative path
  if (url.startsWith('http://') || url.startsWith('https://')) {
    window.location.href = url;
  } else {
    // For relative paths, ensure they start with /
    const normalizedPath = url.startsWith('/') ? url : `/${url}`;
    window.location.href = normalizedPath;
  }
};
