import {
  SwitchMode,
  ListContainer,
  Button,
  LucideIcons,
  ListItemProps,
  useTheme,
  Typography,
} from '@e-burgos/tucu-ui';
import { useAuthGlobalStore } from '@e-burgos-mfe/auth-security';
import { APP_URLS, navigateBetweenApps } from '@e-burgos-mfe/utils';

export const NavOptions = () => {
  const { setIsSettingsOpen } = useTheme();
  const { isAuthenticated, user, logout } = useAuthGlobalStore();

  const handleLogout = () => {
    logout();
    navigateBetweenApps(APP_URLS.AUTHENTICATION);
  };

  const handleLogin = () => {
    navigateBetweenApps(APP_URLS.AUTHENTICATION);
  };

  const handleProfile = () => {
    navigateBetweenApps(APP_URLS.USER_PROFILE);
  };

  return (
    <ListContainer
      label={
        !isAuthenticated
          ? 'Options'
          : <LucideIcons.UserIcon className="w-4 h-4" /> as unknown as string
          
      }
      items={
        [
          isAuthenticated && {
            id: 'profile',
            content: (
              <Typography
                tag='caption'
                className='border border-gray-200 rounded-md p-2 flex items-center justify-center'
              >
                {`Welcome ${user?.firstName} ${user?.lastName}`}
              </Typography>
            ),
          },
          {
            id: 'settings',
            content: (
              <Button
                fullWidth
                size="small"
                variant="ghost"
                onClick={() => setIsSettingsOpen(true)}
              >
                <LucideIcons.SettingsIcon className="w-4 h-4" />
                Settings
              </Button>
            ),
          },
          isAuthenticated && {
            id: 'logout',
            content: (
              <Button
                fullWidth
                size="small"
                variant="ghost"
                onClick={handleProfile}
              >
                <LucideIcons.UserIcon className="w-4 h-4" />
                Profile
              </Button>
            ),
          },
          {
            id: 'layout',
            content: isAuthenticated ? (
              <Button
                fullWidth
                size="small"
                variant="ghost"
                color="danger"
                onClick={handleLogout}
              >
                <LucideIcons.LogOutIcon className="w-4 h-4" />
                Logout
              </Button>
            ) : (
              <Button
                fullWidth
                size="small"
                variant="ghost"
                onClick={handleLogin}
              >
                <LucideIcons.LogInIcon className="w-4 h-4" />
                Login
              </Button>
            ),
          },
          {
            id: 'theme',
            content: (
            <div className='flex items-center justify-center border-t border-gray-200 dark:border-gray-800 pt-3'>
            <SwitchMode />
            </div>
            ),
          },
        ].filter(Boolean) as ListItemProps[]
      }
    />
  );
};
