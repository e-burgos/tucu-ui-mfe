import { APP_PATHS } from '@e-burgos-mfe/utils';
import { ShellWrapper, useMainNavigation } from '@e-burgos-mfe/shell';
import { LAYOUT_OPTIONS } from '@e-burgos/tucu-ui';
import { useRoutesConfig } from './router/routes-config';
import { queryClient } from '@e-burgos-mfe/api';
import { useAuthGlobalStore } from '@e-burgos-mfe/auth-security';
import { useCustomNavigation } from './router/custom-navigation';

export function App() {
  const routesConfig = useRoutesConfig();
  const { mainNavigationItems } = useMainNavigation();
  const { landingNavigationItems } = useCustomNavigation();
  const { isAuthenticated } = useAuthGlobalStore();

  return (
    <ShellWrapper
      queryClient={queryClient}
      basePath={APP_PATHS.LANDING}
      appRoutesConfig={routesConfig}
      menuItems={isAuthenticated ? mainNavigationItems : landingNavigationItems}
      layout={LAYOUT_OPTIONS.HORIZONTAL}
      isAuthenticated={true}
      loginUrl={APP_PATHS.AUTHENTICATION}
      contentClassName="px-0!"
    />
  );
}

export default App;
