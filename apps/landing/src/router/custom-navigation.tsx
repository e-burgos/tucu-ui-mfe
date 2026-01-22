import { useCallback, useMemo } from 'react';
import { APP_PATHS, APP_URLS } from '@e-burgos-mfe/utils';
import { LucideIcons, type IMenuItem } from '@e-burgos/tucu-ui';

export const useCustomNavigation = () => {
  const pathname = window.location.pathname;
  const isLandingApp = pathname.includes(APP_PATHS.LANDING);

  const isActive = useCallback(
    (path: string) => {
      return pathname === path;
    },
    [pathname],
  );

  const landingNavigationItems: IMenuItem[] = useMemo(
    () => [
      {
        name: 'Get Started',
        path: APP_PATHS.LANDING,
        href: isLandingApp
          ? undefined
          : APP_URLS.LANDING,
        isActive: isActive(APP_PATHS.LANDING),
        icon: <LucideIcons.Rocket size={24} />,
      },
      {
        name: 'Architecture',
        path: `${APP_PATHS.LANDING}/architecture-overview`,
        href: isLandingApp
          ? undefined
          : `${APP_URLS.LANDING}/architecture-overview`,
        isActive: isActive(`${APP_PATHS.LANDING}/architecture-overview`),
        icon: <LucideIcons.BookOpen size={24} />,
      },
      {
        name: 'Development Guide',
        path: `${APP_PATHS.LANDING}/development-guide`,
        href: isLandingApp
          ? undefined
          : `${APP_URLS.LANDING}/development-guide`,
        isActive: isActive(`${APP_PATHS.LANDING}/development-guide`),
        icon: <LucideIcons.Code size={24} />,
      },
      {
        name: 'Integration Guide',
        path: `${APP_PATHS.LANDING}/integration-guide`,
        href: isLandingApp
          ? undefined
          : `${APP_URLS.LANDING}/integration-guide`,
        isActive: isActive(`${APP_PATHS.LANDING}/integration-guide`),
        icon: <LucideIcons.Network size={24} />,
      },
    ],
    [
      isLandingApp,
      isActive,
    ],
  );

  return { landingNavigationItems };
};
