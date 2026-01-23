export const APP_URLS = {
  AUTHENTICATION: import.meta.env.VITE_APP_AUTHENTICATION_URL,
  LANDING: import.meta.env.VITE_APP_LANDING_URL,
  USER_PROFILE: import.meta.env.VITE_APP_USER_PROFILE_URL,
  DASHBOARD: import.meta.env.VITE_APP_DASHBOARD_URL,
  DEV_SERVER: import.meta.env.VITE_APP_DEV_SERVER_URL,
};

export const APP_PATHS = {
  AUTHENTICATION: import.meta.env.VITE_APP_AUTHENTICATION_PATH || '/authentication',
  LANDING: import.meta.env.VITE_APP_LANDING_PATH || '/landing',
  USER_PROFILE: import.meta.env.VITE_APP_USER_PROFILE_PATH || '/user-profile',
  DASHBOARD: import.meta.env.VITE_APP_DASHBOARD_PATH || '/dashboard',
  DEV_SERVER: import.meta.env.VITE_APP_DEV_SERVER_PATH || '/',
};

export const getAppUrl = (app: keyof typeof APP_URLS) => {
  return APP_URLS[app];
};
