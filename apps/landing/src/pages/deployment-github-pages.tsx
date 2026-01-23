import {
  Button,
  CardContainer,
  Typography,
  ReactRouter,
  LucideIcons,
  HeroCard,
  CodeBlock,
} from '@e-burgos/tucu-ui';
import { ROUTES } from '../router/routes-config';

const DeploymentGitHubPages = () => {
  const navigate = ReactRouter.useNavigate();

  const deployedApps = [
    {
      name: 'Authentication',
      path: '/repo-name/authentication',
      example: '/tucu-ui-mfe/authentication',
      icon: <LucideIcons.Lock className="w-5 h-5" />,
    },
    {
      name: 'Landing',
      path: '/repo-name/landing',
      example: '/tucu-ui-mfe/landing',
      icon: <LucideIcons.Home className="w-5 h-5" />,
    },
    {
      name: 'User Profile',
      path: '/repo-name/user-profile',
      example: '/tucu-ui-mfe/user-profile',
      icon: <LucideIcons.User className="w-5 h-5" />,
    },
    {
      name: 'Dashboard',
      path: '/repo-name/dashboard',
      example: '/tucu-ui-mfe/dashboard',
      icon: <LucideIcons.LayoutDashboard className="w-5 h-5" />,
    },
    {
      name: 'Dev Server',
      path: '/repo-name/dev-server',
      example: '/tucu-ui-mfe/dev-server',
      icon: <LucideIcons.Server className="w-5 h-5" />,
    },
  ];

  const setupSteps = [
    {
      step: 1,
      title: 'Enable GitHub Pages',
      description:
        'Go to repository Settings → Pages and select "Source: GitHub Actions"',
      icon: <LucideIcons.Settings className="w-6 h-6" />,
      details: [
        'Navigate to Settings → Pages',
        'Select "Source: GitHub Actions"',
        'Leave "Custom domain" field blank',
      ],
    },
    {
      step: 2,
      title: 'Push to Main Branch',
      description:
        'The workflow automatically builds and deploys all apps when you push to main',
      icon: <LucideIcons.GitBranch className="w-6 h-6" />,
      details: [
        'Push changes to main or master branch',
        'GitHub Actions workflow runs automatically',
        'All apps are built with correct environment variables',
      ],
    },
    {
      step: 3,
      title: 'Monitor Deployment',
      description:
        'Check the GitHub Actions workflow to verify successful deployment',
      icon: <LucideIcons.CheckCircle className="w-6 h-6" />,
      details: [
        'View workflow status in Actions tab',
        'Verify all build steps complete successfully',
        'Check deployment URLs after completion',
      ],
    },
  ];

  const implementationDetails = [
    {
      title: 'Base Path Configuration',
      description:
        'GitHub Pages serves from username.github.io/repo-name/, requiring repository name in base paths',
      icon: <LucideIcons.MapPin className="w-5 h-5" />,
      solution:
        'VITE_BASE_PATH environment variable automatically includes repository name',
    },
    {
      title: 'Environment Variables',
      description:
        'Apps need full URLs and paths for inter-app navigation and routing',
      icon: <LucideIcons.Variable className="w-5 h-5" />,
      solution:
        'Comprehensive APP_URLS and APP_PATHS variables configured in workflow',
    },
    {
      title: 'SPA Routing Support',
      description:
        'GitHub Pages doesn\'t natively support SPA routing for deep links',
      icon: <LucideIcons.Route className="w-5 h-5" />,
      solution: '404.html fallback with JavaScript routing detection',
    },
    {
      title: 'Artifact Handling',
      description:
        'GitHub Actions flattens artifact directory structure when downloading',
      icon: <LucideIcons.Folder className="w-5 h-5" />,
      solution: 'Workflow handles flattened structure correctly',
    },
  ];

  const troubleshootingItems = [
    {
      title: 'Apps Not Loading',
      description: 'Check base path and routing configuration',
      icon: <LucideIcons.AlertCircle className="w-5 h-5" />,
      solution: 'Verify hosting provider serves from correct base path',
    },
    {
      title: 'Build Failures',
      description: 'Node or pnpm version issues',
      icon: <LucideIcons.XCircle className="w-5 h-5" />,
      solution: 'Ensure Node.js 20+ and pnpm 10+ are used',
    },
    {
      title: 'GitHub Actions Not Running',
      description: 'Workflow not triggering on push',
      icon: <LucideIcons.GitBranch className="w-5 h-5" />,
      solution: 'Check branch name (main/master) and GitHub Actions permissions',
    },
  ];

  return (
    <div className="w-full min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden -mt-5!">
        <HeroCard
          title="GitHub Pages Deployment"
          description="Complete guide for deploying all micro frontend applications to GitHub Pages using GitHub Actions"
          icon={
            <div className="inline-flex items-center justify-center w-20 h-20 mb-6 bg-linear-to-br from-brand to-indigo-600 rounded-2xl shadow-lg">
              <LucideIcons.Rocket className="w-10 h-10 text-white" />
            </div>
          }
          content={
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                variant="solid"
                color="primary"
                size="large"
                onClick={() => navigate(ROUTES.Base)}
                className="min-w-[200px]"
              >
                <LucideIcons.Home className="w-5 h-5 mr-2" />
                Back to Home
              </Button>
              <Button
                variant="ghost"
                color="primary"
                size="large"
                onClick={() => navigate(ROUTES.DevelopmentGuide)}
                className="min-w-[200px]"
              >
                <LucideIcons.Terminal className="w-5 h-5 mr-2" />
                Development Guide
              </Button>
            </div>
          }
        />
      </section>

      {/* Overview Section */}
      <section className="py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Typography
              tag="h2"
              className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4"
            >
              Deployed Applications
            </Typography>
            <Typography
              tag="p"
              className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-4"
            >
              This monorepo contains multiple independent applications deployed
              to GitHub Pages:
            </Typography>
            <Typography
              tag="p"
              className="text-sm text-gray-500 dark:text-gray-500 italic"
            >
              Note: In GitHub Pages, all paths include the repository name. For
              local development, paths are /authentication, /landing, etc.
            </Typography>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {deployedApps.map((app, index) => (
              <CardContainer
                key={index}
                className="p-6 hover:shadow-lg transition-all duration-300 border border-gray-200 dark:border-gray-700"
              >
                <div className="flex items-center justify-center w-12 h-12 mb-4 bg-linear-to-br from-brand/10 to-indigo-100 dark:from-brand/20 dark:to-indigo-900/30 rounded-xl">
                  <div className="text-brand dark:text-indigo-400">
                    {app.icon}
                  </div>
                </div>
                <Typography
                  tag="h3"
                  className="text-lg font-semibold text-gray-900 dark:text-white mb-2"
                >
                  {app.name}
                </Typography>
                <Typography
                  tag="p"
                  className="text-sm text-gray-600 dark:text-gray-400 mb-2 font-mono"
                >
                  {app.path}
                </Typography>
                <Typography
                  tag="p"
                  className="text-xs text-gray-500 dark:text-gray-500 font-mono"
                >
                  Example: {app.example}
                </Typography>
              </CardContainer>
            ))}
          </div>
        </div>
      </section>

      {/* Setup Section */}
      <section className="py-20 lg:py-24 bg-gray-50 dark:bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Typography
              tag="h2"
              className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4"
            >
              Setup & Configuration
            </Typography>
            <Typography
              tag="p"
              className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto"
            >
              GitHub Pages is free for public repositories and allows deploying
              static sites directly from your repository.
            </Typography>
          </div>

          <div className="space-y-8">
            {setupSteps.map((step, index) => (
              <CardContainer
                key={index}
                className="p-6 lg:p-8 border border-gray-200 dark:border-gray-700"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-lg bg-brand/10 dark:bg-brand/20 flex items-center justify-center text-brand">
                      {step.icon}
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <Typography
                        tag="span"
                        className="text-sm font-semibold text-brand"
                      >
                        Step {step.step}
                      </Typography>
                      <Typography
                        tag="h3"
                        className="text-xl font-bold text-gray-900 dark:text-white"
                      >
                        {step.title}
                      </Typography>
                    </div>
                    <Typography
                      tag="p"
                      className="text-gray-600 dark:text-gray-400 mb-4"
                    >
                      {step.description}
                    </Typography>
                    <ul className="space-y-2">
                      {step.details.map((detail, detailIndex) => (
                        <li
                          key={detailIndex}
                          className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400"
                        >
                          <div className="shrink-0 w-5 h-5 rounded-full bg-brand/10 dark:bg-brand/20 flex items-center justify-center mt-0.5">
                            <LucideIcons.Check className="w-3 h-3 text-brand" />
                          </div>
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContainer>
            ))}
          </div>
        </div>
      </section>

      {/* URLs Section */}
      <section className="py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Typography
              tag="h2"
              className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4"
            >
              Deployment URLs
            </Typography>
            <Typography
              tag="p"
              className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto"
            >
              All apps are accessible at their respective paths under your GitHub
              Pages domain
            </Typography>
          </div>

          <CardContainer className="p-6 lg:p-8 border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark">
            <CodeBlock
              language="text"
              className="overflow-auto w-full"
              noExpand={true}
              code={`https://yourusername.github.io/repo-name/ → Redirects to landing
https://yourusername.github.io/repo-name/authentication/
https://yourusername.github.io/repo-name/landing/
https://yourusername.github.io/repo-name/user-profile/
https://yourusername.github.io/repo-name/dashboard/
https://yourusername.github.io/repo-name/dev-server/`}
            />
          </CardContainer>
        </div>
      </section>

      {/* Implementation Details Section */}
      <section className="py-20 lg:py-24 bg-gray-50 dark:bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Typography
              tag="h2"
              className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4"
            >
              Implementation Details
            </Typography>
            <Typography
              tag="p"
              className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto"
            >
              Key configuration changes made to ensure proper GitHub Pages
              deployment
            </Typography>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {implementationDetails.map((detail, index) => (
              <CardContainer
                key={index}
                className="p-6 hover:shadow-lg transition-all duration-300 border border-gray-200 dark:border-gray-700"
              >
                <div className="flex items-center justify-center w-12 h-12 mb-4 bg-linear-to-br from-brand/10 to-indigo-100 dark:from-brand/20 dark:to-indigo-900/30 rounded-xl">
                  <div className="text-brand dark:text-indigo-400">
                    {detail.icon}
                  </div>
                </div>
                <Typography
                  tag="h3"
                  className="text-lg font-semibold text-gray-900 dark:text-white mb-2"
                >
                  {detail.title}
                </Typography>
                <Typography
                  tag="p"
                  className="text-gray-600 dark:text-gray-400 text-sm mb-3"
                >
                  {detail.description}
                </Typography>
                <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded-lg">
                  <Typography
                    tag="p"
                    className="text-xs text-gray-700 dark:text-gray-300 font-semibold"
                  >
                    Solution:
                  </Typography>
                  <Typography
                    tag="p"
                    className="text-xs text-gray-600 dark:text-gray-400 mt-1"
                  >
                    {detail.solution}
                  </Typography>
                </div>
              </CardContainer>
            ))}
          </div>

          <CardContainer className="p-6 lg:p-8 border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-brand/10 dark:bg-brand/20 flex items-center justify-center text-brand">
                <LucideIcons.FileCode className="w-5 h-5" />
              </div>
              <Typography
                tag="h3"
                className="text-xl font-bold text-gray-900 dark:text-white"
              >
                Base Path Configuration
              </Typography>
            </div>
            <Typography tag="p" className="text-gray-600 dark:text-gray-400 mb-4">
              The workflow automatically sets VITE_BASE_PATH to include the
              repository name:
            </Typography>
            <CodeBlock
              language="ts"
              noExpand={true}
              className="overflow-auto w-full"
              code={`const basePath = process.env.VITE_BASE_PATH 
  ? \`\${process.env.VITE_BASE_PATH}/\${name}\`  // /tucu-ui-mfe/landing
  : \`/\${name}\`;  // /landing (local dev)`}
            />
          </CardContainer>
        </div>
      </section>

      {/* Environment Variables Section */}
      <section className="py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Typography
              tag="h2"
              className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4"
            >
              Environment Variables
            </Typography>
            <Typography
              tag="p"
              className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto"
            >
              The workflow automatically sets environment variables during build
            </Typography>
          </div>

          <div className="space-y-6">
            <CardContainer className="p-6 lg:p-8 border border-gray-200 dark:border-gray-700">
              <Typography
                tag="h3"
                className="text-lg font-semibold text-gray-900 dark:text-white mb-4"
              >
                Required for GitHub Pages:
              </Typography>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <LucideIcons.CheckCircle className="w-4 h-4 text-brand mt-0.5 shrink-0" />
                  <span>
                    <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                      VITE_BASE_PATH
                    </code>{' '}
                    - Repository subdirectory path (e.g., /tucu-ui-mfe)
                  </span>
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <LucideIcons.CheckCircle className="w-4 h-4 text-brand mt-0.5 shrink-0" />
                  <span>
                    <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                      VITE_APP_*_URL
                    </code>{' '}
                    - Full URLs for each app (with https:// protocol)
                  </span>
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <LucideIcons.CheckCircle className="w-4 h-4 text-brand mt-0.5 shrink-0" />
                  <span>
                    <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                      VITE_APP_*_PATH
                    </code>{' '}
                    - Relative paths for routing (includes repository name)
                  </span>
                </li>
              </ul>
            </CardContainer>

            <CardContainer className="p-6 lg:p-8 border border-gray-200 dark:border-gray-700">
              <Typography
                tag="h3"
                className="text-lg font-semibold text-gray-900 dark:text-white mb-4"
              >
                Optional:
              </Typography>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <LucideIcons.Info className="w-4 h-4 text-blue-500 mt-0.5 shrink-0" />
                  <span>
                    <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                      VITE_API_BASE_URL
                    </code>{' '}
                    - API endpoint URL (can be set as GitHub secret)
                  </span>
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <LucideIcons.Info className="w-4 h-4 text-blue-500 mt-0.5 shrink-0" />
                  <span>
                    <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                      VITE_APP_ENVIRONMENT
                    </code>{' '}
                    - Set to production automatically
                  </span>
                </li>
              </ul>
            </CardContainer>
          </div>
        </div>
      </section>

      {/* Troubleshooting Section */}
      <section className="py-20 lg:py-24 bg-gray-50 dark:bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Typography
              tag="h2"
              className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4"
            >
              Troubleshooting
            </Typography>
            <Typography
              tag="p"
              className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto"
            >
              Common issues and their solutions
            </Typography>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {troubleshootingItems.map((item, index) => (
              <CardContainer
                key={index}
                className="p-6 hover:shadow-lg transition-all duration-300 border border-gray-200 dark:border-gray-700"
              >
                <div className="flex items-center justify-center w-12 h-12 mb-4 bg-linear-to-br from-red-100 to-orange-100 dark:from-red-900/20 dark:to-orange-900/20 rounded-xl">
                  <div className="text-red-600 dark:text-red-400">
                    {item.icon}
                  </div>
                </div>
                <Typography
                  tag="h3"
                  className="text-lg font-semibold text-gray-900 dark:text-white mb-2"
                >
                  {item.title}
                </Typography>
                <Typography
                  tag="p"
                  className="text-gray-600 dark:text-gray-400 text-sm mb-3"
                >
                  {item.description}
                </Typography>
                <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded-lg">
                  <Typography
                    tag="p"
                    className="text-xs text-gray-700 dark:text-gray-300 font-semibold mb-1"
                  >
                    Solution:
                  </Typography>
                  <Typography
                    tag="p"
                    className="text-xs text-gray-600 dark:text-gray-400"
                  >
                    {item.solution}
                  </Typography>
                </div>
              </CardContainer>
            ))}
          </div>
        </div>
      </section>

      {/* Next Steps Section */}
      <section className="py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <CardContainer className="p-8 lg:p-12 border border-gray-200 dark:border-gray-700 bg-linear-to-br from-brand/5 to-indigo-50 dark:from-brand/10 dark:to-indigo-900/20">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 mb-4 bg-brand/10 dark:bg-brand/20 rounded-2xl">
                <LucideIcons.CheckCircle className="w-8 h-8 text-brand" />
              </div>
              <Typography
                tag="h2"
                className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4"
              >
                Next Steps
              </Typography>
            </div>
            <div className="space-y-4 max-w-2xl mx-auto">
              <div className="flex items-start gap-3">
                <div className="shrink-0 w-6 h-6 rounded-full bg-brand/20 dark:bg-brand/30 flex items-center justify-center mt-0.5">
                  <Typography
                    tag="span"
                    className="text-xs font-semibold text-brand"
                  >
                    1
                  </Typography>
                </div>
                <Typography
                  tag="p"
                  className="text-gray-700 dark:text-gray-300 flex-1"
                >
                  Enable GitHub Pages in repository settings (Source: GitHub
                  Actions)
                </Typography>
              </div>
              <div className="flex items-start gap-3">
                <div className="shrink-0 w-6 h-6 rounded-full bg-brand/20 dark:bg-brand/30 flex items-center justify-center mt-0.5">
                  <Typography
                    tag="span"
                    className="text-xs font-semibold text-brand"
                  >
                    2
                  </Typography>
                </div>
                <Typography
                  tag="p"
                  className="text-gray-700 dark:text-gray-300 flex-1"
                >
                  Push to main branch
                </Typography>
              </div>
              <div className="flex items-start gap-3">
                <div className="shrink-0 w-6 h-6 rounded-full bg-brand/20 dark:bg-brand/30 flex items-center justify-center mt-0.5">
                  <Typography
                    tag="span"
                    className="text-xs font-semibold text-brand"
                  >
                    3
                  </Typography>
                </div>
                <Typography
                  tag="p"
                  className="text-gray-700 dark:text-gray-300 flex-1"
                >
                  Monitor the GitHub Actions workflow
                </Typography>
              </div>
              <div className="flex items-start gap-3">
                <div className="shrink-0 w-6 h-6 rounded-full bg-brand/20 dark:bg-brand/30 flex items-center justify-center mt-0.5">
                  <Typography
                    tag="span"
                    className="text-xs font-semibold text-brand"
                  >
                    4
                  </Typography>
                </div>
                <Typography
                  tag="p"
                  className="text-gray-700 dark:text-gray-300 flex-1"
                >
                  Verify deployment URLs after workflow completes
                </Typography>
              </div>
            </div>
          </CardContainer>
        </div>
      </section>
    </div>
  );
};

export default DeploymentGitHubPages;
