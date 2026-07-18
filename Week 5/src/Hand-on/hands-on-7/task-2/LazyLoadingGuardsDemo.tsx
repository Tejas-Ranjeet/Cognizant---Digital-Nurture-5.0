import { useState } from 'react';

/**
 * HANDS-ON 7 - TASK 2: Lazy Loading and Route Guards
 * 
 * Steps 73-77: Lazy loading, CanActivate, CanDeactivate guards
 */

const LazyLoadingGuardsDemo = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentRoute, setCurrentRoute] = useState<string>('home');
  const [formDirty, setFormDirty] = useState(false);
  const [formData, setFormData] = useState('');
  const [lazyModuleLoaded, setLazyModuleLoaded] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [pendingRoute, setPendingRoute] = useState<string | null>(null);

  // Step 75: AuthGuard - canActivate
  const canActivate = (route: string): boolean => {
    if (!isLoggedIn) {
      console.log(`AuthGuard: Access denied to ${route}. Redirecting to home.`);
      alert(`You must be logged in to access ${route}`);
      return false;
    }
    return true;
  };

  // Step 77: CanDeactivate guard logic is in the navigate function below

  const navigate = (route: string) => {
    // Check if leaving form with dirty state
    if (currentRoute === 'enroll' && formDirty) {
      setPendingRoute(route);
      setShowConfirmDialog(true);
      return;
    }

    // Check guards for protected routes
    if (route === 'profile' || route === 'enroll') {
      if (!canActivate(route)) {
        return;
      }
    }

    // Simulate lazy loading for enroll module
    if (route === 'enroll' && !lazyModuleLoaded) {
      console.log('Lazy loading enrollment module...');
      setTimeout(() => {
        setLazyModuleLoaded(true);
        setCurrentRoute(route);
      }, 1000);
      return;
    }

    setCurrentRoute(route);
  };

  const handleConfirmLeave = (confirm: boolean) => {
    setShowConfirmDialog(false);
    if (confirm && pendingRoute) {
      setFormDirty(false);
      setFormData('');
      navigate(pendingRoute);
    }
    setPendingRoute(null);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">🔐 Task 2: Lazy Loading & Guards</h2>
        <p className="text-gray-600 mb-6">Steps 73-77: Lazy loading, CanActivate, CanDeactivate</p>

        {/* Auth Toggle */}
        <div className="bg-white rounded-xl shadow-md p-4 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-gray-700">Authentication Status</h3>
              <p className="text-sm text-gray-500">Toggle to test route guards</p>
            </div>
            <button
              onClick={() => setIsLoggedIn(!isLoggedIn)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                isLoggedIn
                  ? 'bg-green-500 text-white'
                  : 'bg-red-500 text-white'
              }`}
            >
              {isLoggedIn ? '✓ Logged In' : '✗ Logged Out'}
            </button>
          </div>
        </div>

        {/* Navigation */}
        <div className="bg-white rounded-xl shadow-md p-4 mb-6">
          <h3 className="font-semibold text-gray-700 mb-3">Navigation:</h3>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => navigate('home')}
              className={`px-3 py-1 rounded text-sm ${
                currentRoute === 'home' ? 'bg-indigo-600 text-white' : 'bg-gray-100'
              }`}
            >
              / Home
            </button>
            <button
              onClick={() => navigate('courses')}
              className={`px-3 py-1 rounded text-sm ${
                currentRoute === 'courses' ? 'bg-indigo-600 text-white' : 'bg-gray-100'
              }`}
            >
              /courses
            </button>
            <button
              onClick={() => navigate('profile')}
              className={`px-3 py-1 rounded text-sm ${
                currentRoute === 'profile' ? 'bg-indigo-600 text-white' : 'bg-gray-100'
              }`}
            >
              /profile 🔒
            </button>
            <button
              onClick={() => navigate('enroll')}
              className={`px-3 py-1 rounded text-sm ${
                currentRoute === 'enroll' ? 'bg-indigo-600 text-white' : 'bg-gray-100'
              }`}
            >
              /enroll 🔒 📦
            </button>
          </div>
          <p className="text-xs text-gray-400 mt-2">
            🔒 = Protected (requires login) | 📦 = Lazy loaded
          </p>
        </div>

        {/* Confirm Dialog */}
        {showConfirmDialog && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 max-w-sm mx-4">
              <h3 className="font-bold text-lg mb-2">Unsaved Changes</h3>
              <p className="text-gray-600 mb-4">You have unsaved changes. Leave anyway?</p>
              <div className="flex gap-2">
                <button
                  onClick={() => handleConfirmLeave(true)}
                  className="flex-1 py-2 bg-red-500 text-white rounded-lg"
                >
                  Leave
                </button>
                <button
                  onClick={() => handleConfirmLeave(false)}
                  className="flex-1 py-2 bg-gray-200 text-gray-700 rounded-lg"
                >
                  Stay
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Route Content */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <h3 className="font-semibold text-lg text-gray-900 mb-4">
            Route: <span className="text-indigo-600 font-mono">/{currentRoute}</span>
          </h3>

          {currentRoute === 'home' && (
            <div className="p-6 bg-indigo-50 rounded-lg">
              <h2 className="text-xl font-bold text-indigo-900">🏠 Home</h2>
              <p className="text-indigo-700 mt-2">Public route - no guard required</p>
            </div>
          )}

          {currentRoute === 'courses' && (
            <div className="p-6 bg-blue-50 rounded-lg">
              <h2 className="text-xl font-bold text-blue-900">📚 Courses</h2>
              <p className="text-blue-700 mt-2">Public route - no guard required</p>
            </div>
          )}

          {currentRoute === 'profile' && (
            <div className="p-6 bg-green-50 rounded-lg">
              <h2 className="text-xl font-bold text-green-900">👤 Profile</h2>
              <p className="text-green-700 mt-2">Protected route - AuthGuard passed ✓</p>
            </div>
          )}

          {currentRoute === 'enroll' && (
            <div className="p-6 bg-purple-50 rounded-lg">
              <h2 className="text-xl font-bold text-purple-900">📝 Enrollment Form</h2>
              <p className="text-purple-700 mt-2 mb-4">
                Lazy loaded module + AuthGuard + CanDeactivate guard
              </p>
              
              {/* Step 77: Form with dirty state */}
              <div className="bg-white p-4 rounded-lg">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Course Notes (type to make form dirty)
                </label>
                <textarea
                  value={formData}
                  onChange={(e) => {
                    setFormData(e.target.value);
                    setFormDirty(e.target.value.length > 0);
                  }}
                  className="w-full px-3 py-2 border rounded-lg"
                  rows={3}
                  placeholder="Type something..."
                />
                {formDirty && (
                  <p className="text-orange-600 text-sm mt-2">
                    ⚠️ Form is dirty - CanDeactivate guard active
                  </p>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Step 73 & 74: Lazy Loading Info */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <h3 className="font-semibold text-lg text-indigo-900 mb-4">
            Steps 73 & 74: Lazy Loading
          </h3>
          <div className="p-4 bg-gray-900 rounded-lg text-xs font-mono mb-4">
            <p className="text-green-400">{`{ path: 'enroll',`}</p>
            <p className="text-gray-300 ml-4">loadChildren: () =&gt;</p>
            <p className="text-gray-300 ml-8">import('./features/enrollment/enrollment.module')</p>
            <p className="text-gray-300 ml-8">.then(m =&gt; m.EnrollmentModule)</p>
            <p className="text-green-400">{`}`}</p>
          </div>
          <div className="flex items-center gap-2">
            <span className={`w-3 h-3 rounded-full ${lazyModuleLoaded ? 'bg-green-500' : 'bg-gray-300'}`}></span>
            <span className="text-sm text-gray-600">
              {lazyModuleLoaded ? 'Enrollment module loaded' : 'Enrollment module not loaded yet'}
            </span>
          </div>
          <p className="text-sm text-gray-500 mt-2">
            Open DevTools Network tab to see separate chunk downloaded on first /enroll visit
          </p>
        </div>

        {/* Steps 75-77: Guards Code */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <h3 className="font-semibold text-lg text-gray-900 mb-4">Route Guards Code</h3>
          <div className="p-4 bg-gray-900 rounded-lg text-xs font-mono overflow-x-auto">
            <p className="text-purple-400">// Step 75: AuthGuard</p>
            <p className="text-green-400">canActivate(): boolean {'{'}</p>
            <p className="text-gray-300 ml-4">if (!this.authService.isLoggedIn) {'{'}</p>
            <p className="text-gray-300 ml-8">this.router.navigate(['/']);</p>
            <p className="text-gray-300 ml-8">return false;</p>
            <p className="text-gray-300 ml-4">{'}'}</p>
            <p className="text-gray-300 ml-4">return true;</p>
            <p className="text-green-400">{'}'}</p>
            <p className="text-purple-400 mt-4">// Step 77: CanDeactivate</p>
            <p className="text-green-400">canDeactivate(component): boolean {'{'}</p>
            <p className="text-gray-300 ml-4">if (component.enrollForm.dirty) {'{'}</p>
            <p className="text-gray-300 ml-8">return confirm('You have unsaved changes. Leave?');</p>
            <p className="text-gray-300 ml-4">{'}'}</p>
            <p className="text-gray-300 ml-4">return true;</p>
            <p className="text-green-400">{'}'}</p>
          </div>
        </div>

        {/* Hints */}
        <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <h4 className="font-semibold text-yellow-800 mb-2">💡 Key Points:</h4>
          <ul className="text-sm text-yellow-700 space-y-1 list-disc list-inside">
            <li>Lazy loading splits app into chunks loaded on demand</li>
            <li>CanActivate prevents access to routes</li>
            <li>CanDeactivate prevents leaving routes (form protection)</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default LazyLoadingGuardsDemo;
