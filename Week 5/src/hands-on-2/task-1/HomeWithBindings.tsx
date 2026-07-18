import { useState, useEffect } from 'react';

/**
 * HANDS-ON 2 - TASK 1: All Four Binding Types
 * 
 * This component demonstrates all four Angular binding types in React:
 * 
 * 1. INTERPOLATION (Angular: {{ portalName }})
 *    React equivalent: {portalName} - JSX expression
 * 
 * 2. PROPERTY BINDING (Angular: [disabled]="!isPortalActive")
 *    React equivalent: disabled={!isPortalActive} - JSX attribute binding
 * 
 * 3. EVENT BINDING (Angular: (click)="onEnrollClick()")
 *    React equivalent: onClick={onEnrollClick} - Event handler prop
 * 
 * 4. TWO-WAY BINDING (Angular: [(ngModel)]="searchTerm")
 *    React equivalent: value={searchTerm} + onChange handler
 *    
 * KEY DIFFERENCE EXPLAINED:
 * --------------------------
 * [property] binding (one-way): Data flows FROM component TO DOM only.
 *   - Component state changes → DOM updates
 *   - User interaction does NOT update component state automatically
 *   
 * [(ngModel)] binding (two-way): Data flows BOTH ways (DOM ↔ Component).
 *   - Component state changes → DOM updates
 *   - User interaction → Component state updates
 *   - Shorthand for: [ngModel]="prop" (ngModelChange)="prop=$event"
 */

const HomeWithBindings = () => {
  // ============================================
  // STEP 11: Property for interpolation
  // Angular: portalName = 'Student Course Portal'
  // ============================================
  const portalName = 'Student Course Portal';

  // ============================================
  // STEP 12: Property for property binding
  // Angular: isPortalActive = true
  // ============================================
  const [isPortalActive, setIsPortalActive] = useState<boolean>(true);

  // ============================================
  // STEP 13: Property and method for event binding
  // Angular: message = ''; onEnrollClick() { this.message = 'Enrollment opened!' }
  // ============================================
  const [message, setMessage] = useState<string>('');

  const onEnrollClick = () => {
    setMessage('Enrollment opened!');
    console.log('Event Binding: Enroll button clicked');
  };

  // ============================================
  // STEP 14: Two-way binding with search term
  // Angular: searchTerm = ''; with [(ngModel)]="searchTerm"
  // React: Requires value + onChange handler (controlled component)
  // ============================================
  const [searchTerm, setSearchTerm] = useState<string>('');

  // Handler for two-way binding simulation
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  // Stats data
  const [stats] = useState({
    coursesAvailable: 12,
    enrolled: 3,
    gpa: 3.8
  });

  // Current time for dynamic updates
  const [currentTime, setCurrentTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => setCurrentTime(new Date().toLocaleTimeString());
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* ============================================
              STEP 11: INTERPOLATION (String Interpolation)
              Angular: <h1>{{ portalName }}</h1>
              React:   <h1>{portalName}</h1>
              ============================================ */}
          <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-fade-in">
            Welcome to {portalName} 🎓
          </h1>
          
          <p className="text-xl text-indigo-100 max-w-3xl mb-4">
            Your one-stop destination for managing courses, tracking grades, and staying 
            connected with your academic journey.
          </p>

          <p className="text-indigo-200">
            Current Time: <span className="font-mono bg-indigo-600/50 px-2 py-1 rounded">{currentTime}</span>
          </p>
        </div>
      </div>

      {/* Stats Row */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow-lg p-6 transform hover:scale-105 transition-transform duration-300">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 rounded-full">
                <span className="text-3xl">📚</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">Courses Available</p>
                <p className="text-3xl font-bold text-gray-900">{stats.coursesAvailable}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 transform hover:scale-105 transition-transform duration-300">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-full">
                <span className="text-3xl">✅</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">Enrolled</p>
                <p className="text-3xl font-bold text-gray-900">{stats.enrolled}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 transform hover:scale-105 transition-transform duration-300">
            <div className="flex items-center">
              <div className="p-3 bg-purple-100 rounded-full">
                <span className="text-3xl">⭐</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">GPA</p>
                <p className="text-3xl font-bold text-gray-900">{stats.gpa.toFixed(1)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Binding Types Demo Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            📝 Task 1: All Four Binding Types Demo
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Property Binding + Event Binding Demo */}
            <div className="p-4 bg-indigo-50 rounded-lg">
              <h3 className="font-semibold text-indigo-900 mb-3">
                Property Binding + Event Binding
              </h3>
              
              {/* ============================================
                  STEP 12: PROPERTY BINDING
                  Angular: <button [disabled]="!isPortalActive">
                  React:   <button disabled={!isPortalActive}>
                  ============================================ */}
              
              {/* ============================================
                  STEP 13: EVENT BINDING
                  Angular: (click)="onEnrollClick()"
                  React:   onClick={onEnrollClick}
                  ============================================ */}
              
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <label className="text-sm text-gray-600">Portal Active:</label>
                  <button
                    onClick={() => setIsPortalActive(!isPortalActive)}
                    className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                      isPortalActive 
                        ? 'bg-green-500 text-white' 
                        : 'bg-red-500 text-white'
                    }`}
                  >
                    {isPortalActive ? 'ON' : 'OFF'}
                  </button>
                </div>

                <button
                  disabled={!isPortalActive}
                  onClick={onEnrollClick}
                  className={`w-full py-2 px-4 rounded-lg font-medium transition-all ${
                    isPortalActive
                      ? 'bg-indigo-600 text-white hover:bg-indigo-700 cursor-pointer'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  Enroll Now
                </button>

                {/* Display message from event binding */}
                {message && (
                  <div className="p-3 bg-green-100 text-green-700 rounded-lg text-center font-medium">
                    ✅ {message}
                  </div>
                )}

                <p className="text-xs text-gray-500 mt-2">
                  <code>[disabled]="!isPortalActive"</code> → Button disabled when portal is inactive
                </p>
              </div>
            </div>

            {/* Two-Way Binding Demo */}
            <div className="p-4 bg-purple-50 rounded-lg">
              <h3 className="font-semibold text-purple-900 mb-3">
                Two-Way Binding (ngModel equivalent)
              </h3>
              
              {/* ============================================
                  STEP 14: TWO-WAY BINDING
                  Angular: <input [(ngModel)]="searchTerm">
                  React:   <input value={searchTerm} onChange={handleSearchChange}>
                  
                  STEP 15: EXPLANATION (see comment at top of file)
                  ============================================ */}
              
              <div className="space-y-3">
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
                  <input
                    type="text"
                    placeholder="Type to search courses..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="w-full pl-10 pr-4 py-2 border border-purple-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all"
                  />
                </div>

                {/* Live display of search term */}
                <p className="p-3 bg-purple-100 text-purple-700 rounded-lg">
                  <strong>Searching for:</strong> {searchTerm || '(empty)'}
                </p>

                <p className="text-xs text-gray-500">
                  <code>[(ngModel)]="searchTerm"</code> → Input value syncs with component state in real-time
                </p>
              </div>
            </div>
          </div>

          {/* Explanation Box */}
          <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <h4 className="font-semibold text-yellow-800 mb-2">📖 Key Difference Explained:</h4>
            <div className="text-sm text-yellow-700 space-y-2">
              <p>
                <strong>[property] binding (one-way):</strong> Data flows FROM component TO DOM only. 
                Component state changes update the DOM, but user interaction does NOT automatically update component state.
              </p>
              <p>
                <strong>[(ngModel)] binding (two-way):</strong> Data flows BOTH ways (DOM ↔ Component). 
                It's shorthand for: <code>[ngModel]="prop" (ngModelChange)="prop=$event"</code>
              </p>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <button className="flex items-center justify-center p-4 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors">
            <span className="text-2xl mr-2">📖</span>
            <span className="font-medium text-indigo-700">Browse Courses</span>
          </button>
          <button className="flex items-center justify-center p-4 bg-green-50 hover:bg-green-100 rounded-lg transition-colors">
            <span className="text-2xl mr-2">➕</span>
            <span className="font-medium text-green-700">Enroll Now</span>
          </button>
          <button className="flex items-center justify-center p-4 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors">
            <span className="text-2xl mr-2">📊</span>
            <span className="font-medium text-purple-700">View Grades</span>
          </button>
          <button className="flex items-center justify-center p-4 bg-orange-50 hover:bg-orange-100 rounded-lg transition-colors">
            <span className="text-2xl mr-2">🔔</span>
            <span className="font-medium text-orange-700">Notifications</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomeWithBindings;
