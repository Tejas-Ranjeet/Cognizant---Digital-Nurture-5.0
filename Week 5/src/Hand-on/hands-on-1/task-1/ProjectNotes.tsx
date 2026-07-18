/**
 * HANDS-ON 1 - TASK 1: Scaffold and Explore the Angular Project
 * 
 * Steps 1-5: Project structure understanding
 * 
 * This component displays the notes.txt content explaining each file's purpose.
 */

const ProjectNotes = () => {
  const fileExplanations = [
    {
      file: 'angular.json (vite.config.ts)',
      purpose: 'Build tool configuration file - defines dev server settings, build options, plugins, and production budgets.'
    },
    {
      file: 'tsconfig.json',
      purpose: 'TypeScript compiler configuration - specifies compiler options, module resolution, and strict type-checking rules.'
    },
    {
      file: 'tsconfig.app.json',
      purpose: 'App-specific TypeScript config - extends base tsconfig with application-specific settings and file inclusions.'
    },
    {
      file: 'package.json',
      purpose: 'Project manifest - lists dependencies, devDependencies, npm scripts (dev, build, preview), and project metadata.'
    },
    {
      file: 'src/main.ts (main.tsx)',
      purpose: 'Application entry point - bootstraps the app by rendering the root component to the DOM.'
    },
    {
      file: 'src/app/app.module.ts (app.config.ts)',
      purpose: 'Root module/config - declares components, imports modules, and provides application-wide services.'
    },
    {
      file: 'src/app/app.component.ts (App.tsx)',
      purpose: 'Root component - the main component containing app layout, header, and router outlet.'
    },
    {
      file: 'src/index.html',
      purpose: 'HTML template - the single HTML page hosting the SPA with the root mount point element.'
    }
  ];

  const budgetInfo = {
    maximumWarning: '500kb - Warns when bundle exceeds this size during build',
    maximumError: '1mb - Fails the build when bundle exceeds this size'
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          📁 Task 1: Scaffold and Explore the Angular Project
        </h2>
        <p className="text-gray-600 mb-6">
          Steps 1-5: Understanding project structure and generated files
        </p>

        {/* File Explanations */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <h3 className="font-semibold text-lg text-indigo-900 mb-4">
            Step 2: File Purpose Explanations (notes.txt)
          </h3>
          <div className="space-y-3">
            {fileExplanations.map((item, index) => (
              <div key={index} className="p-3 bg-gray-50 rounded-lg">
                <code className="text-indigo-600 font-mono text-sm">{item.file}</code>
                <p className="text-gray-700 mt-1 text-sm">{item.purpose}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Build Output */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <h3 className="font-semibold text-lg text-green-900 mb-4">
            Step 4: Build Output (dist/ folder)
          </h3>
          <div className="p-4 bg-green-50 rounded-lg">
            <p className="text-green-700 mb-2">After running <code className="bg-green-100 px-1 rounded">npm run build</code>:</p>
            <ul className="text-sm text-green-600 space-y-1 list-disc list-inside">
              <li><code>dist/index.html</code> - Production HTML with hashed asset references</li>
              <li><code>dist/assets/*.js</code> - Compiled and bundled JavaScript application code</li>
              <li><code>dist/assets/*.css</code> - Compiled CSS styles</li>
            </ul>
          </div>
        </div>

        {/* Budget Configuration */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="font-semibold text-lg text-purple-900 mb-4">
            Step 5: Budget Configuration
          </h3>
          <div className="p-4 bg-purple-50 rounded-lg">
            <p className="text-purple-700 mb-3">
              Located in <code className="bg-purple-100 px-1 rounded">angular.json → architect → build → configurations → production</code>
            </p>
            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <span className="bg-yellow-200 text-yellow-800 px-2 py-1 rounded text-xs font-mono">maximumWarning</span>
                <span className="text-sm text-gray-700">{budgetInfo.maximumWarning}</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="bg-red-200 text-red-800 px-2 py-1 rounded text-xs font-mono">maximumError</span>
                <span className="text-sm text-gray-700">{budgetInfo.maximumError}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Commands Summary */}
        <div className="mt-6 p-4 bg-gray-900 rounded-lg">
          <h4 className="text-green-400 font-mono mb-2"># Commands Used</h4>
          <div className="space-y-1 text-sm font-mono">
            <p className="text-gray-300">$ ng new student-course-portal --routing --style=css</p>
            <p className="text-gray-300">$ cd student-course-portal && ng serve</p>
            <p className="text-gray-300">$ ng build</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectNotes;
