import { type IAppRouteConfig } from '@e-burgos/tucu-ui';
import { APP_PATHS } from '@e-burgos-mfe/utils';
import {
  InitialPageComponent,
  IntegrationGuideComponent,
  ArchitectureOverviewComponent,
  DevelopmentGuideComponent,
  DeploymentGitHubPagesComponent,
} from './entry-points';

export const ROUTES = {
  Base: APP_PATHS.LANDING,
  IntegrationGuide: `${APP_PATHS.LANDING}/integration-guide`,
  ArchitectureOverview: `${APP_PATHS.LANDING}/architecture-overview`,
  DevelopmentGuide: `${APP_PATHS.LANDING}/development-guide`,
  DeploymentGitHubPages: `${APP_PATHS.LANDING}/deployment-github-pages`,
};

export const useRoutesConfig = (): IAppRouteConfig[] => {
  return [
    {
      key: 'landing',
      path: ROUTES.Base,
      element: <InitialPageComponent />,
    },
    {
      key: 'integration-guide',
      path: ROUTES.IntegrationGuide,
      element: <IntegrationGuideComponent />,
    },
    {
      key: 'architecture-overview',
      path: ROUTES.ArchitectureOverview,
      element: <ArchitectureOverviewComponent />,
    },
    {
      key: 'development-guide',
      path: ROUTES.DevelopmentGuide,
      element: <DevelopmentGuideComponent />,
    },
    {
      key: 'deployment-github-pages',
      path: ROUTES.DeploymentGitHubPages,
      element: <DeploymentGitHubPagesComponent />,
    },
  ].filter((route) => route);
};
