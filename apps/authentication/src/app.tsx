import { APP_PATHS } from '@e-burgos-mfe/utils';
import { ShellWrapper } from '@e-burgos-mfe/shell';
import { LAYOUT_OPTIONS } from '@e-burgos/tucu-ui';
import { useRoutesConfig } from './router/routes-config';
import { queryClient } from '@e-burgos-mfe/api';

export function App() {
  const routesConfig = useRoutesConfig();

  return (
    <ShellWrapper
      basePath={APP_PATHS.AUTHENTICATION}
      queryClient={queryClient}
      layout={LAYOUT_OPTIONS.CLEAN}
      appRoutesConfig={routesConfig}
      loginUrl={APP_PATHS.AUTHENTICATION}
      isAuthenticated={true}
      contentClassName="w-full h-full min-h-screen mx-auto my-auto"
    />
  );
}

export default App;
