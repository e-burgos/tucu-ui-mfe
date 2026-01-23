import React, { useMemo } from 'react';
import { useMainNavigation } from '../hooks';
import { APP_PATHS } from '@e-burgos-mfe/utils';
import { QueryProvider } from '@e-burgos-mfe/api';
import { QueryClient } from '@tanstack/react-query';
import { AppLabel } from './app-label';
import {
  ThemeProvider,
  MfeThemeProviderProps,
  LAYOUT_OPTIONS,
  IMenuItem,
} from '@e-burgos/tucu-ui';
import { NavOptions } from './nav-options';

export interface ShellWrapperProps extends Omit<
  MfeThemeProviderProps,
  'architecturalPatterns' | 'menuItems'
> {
  queryClient?: QueryClient;
  menuItems?: IMenuItem[];
}

export const ShellWrapper: React.FC<ShellWrapperProps> = ({
  queryClient,
  basePath,
  appRoutesConfig,
  menuItems,
  rightButton: providedRightButton,
  logo: providedLogo,
  layout: providedLayout,
  ...restProps
}) => {
  const layout = providedLayout ? providedLayout : LAYOUT_OPTIONS.HORIZONTAL;
  const logo = providedLogo ? providedLogo : { path: APP_PATHS.LANDING, name: 'TUCUUI', secondName: 'MFE' };
  const { mainNavigationItems } = useMainNavigation();

  // Compose rightButton with AppLabel
  const rightButton: React.ReactNode = useMemo(
    () =>
      providedRightButton ? (
        <>
          <AppLabel /> {providedRightButton}
        </>
      ) : (
        <>
          <AppLabel />
          <NavOptions />
        </>
      ),
    [providedRightButton],
  );

  return (
    <QueryProvider client={queryClient}>
      <ThemeProvider
        architecturalPatterns="mfe"
        basePath={basePath}
        appRoutesConfig={appRoutesConfig}
        layout={layout}
        menuItems={menuItems || mainNavigationItems}
        rightButton={rightButton}
        logo={logo}
        {...restProps}
      />
    </QueryProvider>
  );
};
