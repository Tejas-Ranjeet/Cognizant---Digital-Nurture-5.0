import { useState, useEffect } from 'react';

/**
 * HANDS-ON 2 - TASK 1: All Four Binding Types
 * 
 * Steps 11-15: Interpolation, Property, Event, and Two-Way Binding
 * 
 * KEY DIFFERENCE (Step 15):
 * [property] binding (one-way): Data flows FROM component TO DOM only.
 * [(ngModel)] binding (two-way): Data flows BOTH ways (DOM ↔ Component).
 * Two-way is shorthand for: [ngModel]="prop" (ngModelChange)="prop=$event"
 */

const DataBindingDemo = () => {
  // Step 11: Property for interpolation
  const portalName = 'Student Course Portal';

  // Step 12: Property for property binding
  const [isPortalActive, setIsPortalActive] = useState<boolean>(true);

  // Step 13: Property and method for event binding
  const [message, setMessage] = useState<string>('');

  const onEnrollClick = () => {
    setMessage('Enrollment opened!');
    console.log('Event Binding: onEnrollClick() called');
  };

  // Step 14: Two-way binding with search term
  const [searchTerm, setSearchTerm] = useState<string>('');

  // Stats
  const stats = { coursesAvailable: 12, enrolled: 3, gpa: 3.8 };
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date().toLocaleTimeString()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero with Interpolation */}
      <div className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white py-12">
        <div className="max-w-6xl mx-auto px-6">
          {/* Step 11: INTERPOLATION - {{ portalName }} */}
          <h1 className="text-4xl font-bold mb-4">
            Welcome to {portalName} 🎓
          </h1>
          <p className="text-indigo-100">Current Time: {currentTime}</p>
        </div>
      </div>

      {/* Stats Row */}
      <div className="max-w-6xl mx-auto px-6 -mt-6">
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: 'Courses Available', value: stats.coursesAvailable, color: 'blue' },
            { label: 'Enrolled', value: stats.enrolled, color: 'green' },
            { label: 'GPA', value: stats.gpa, color: 'purple' }
          ].map((stat, idx) => (
            <div key={idx} className="bg-white rounded-lg shadow-lg p-4 text-center">
              <p className="text-gray-500 text-sm">{stat.label}</p>
              <p className={`text-3xl font-bold text-${stat.color}-600`}>{stat.value}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">📝 Task 1: All Four Binding Types</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Property + Event Binding */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="font-semibold text-indigo-900 mb-4">
              Step 12 & 13: Property + Event Binding
            </h3>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-600">isPortalActive:</span>
                <button
                  onClick={() => setIsPortalActive(!isPortalActive)}
                  className={`px-3 py-1 rounded text-sm font-medium ${
                    isPortalActive ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
                  }`}
                >
                  {isPortalActive ? 'TRUE' : 'FALSE'}
                </button>
              </div>

              {/* Step 12: PROPERTY BINDING - [disabled]="!isPortalActive" */}
              {/* Step 13: EVENT BINDING - (click)="onEnrollClick()" */}
              <button
                disabled={!isPortalActive}
                onClick={onEnrollClick}
                className={`w-full py-2 rounded-lg font-medium transition-all ${
                  isPortalActive
                    ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                Enroll Now
              </button>

              {message && (
                <div className="p-3 bg-green-100 text-green-700 rounded-lg text-center">
                  ✅ {message}
                </div>
              )}

              <div className="p-3 bg-gray-100 rounded text-xs font-mono">
                <p>&lt;button [disabled]="!isPortalActive"</p>
                <p>  (click)="onEnrollClick()"&gt;</p>
              </div>
            </div>
          </div>

          {/* Two-Way Binding */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="font-semibold text-purple-900 mb-4">
              Step 14: Two-Way Binding [(ngModel)]
            </h3>
            
            <div className="space-y-4">
              {/* Step 14: TWO-WAY BINDING - [(ngModel)]="searchTerm" */}
              <input
                type="text"
                placeholder="Type to search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-purple-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
              />

              <p className="p-3 bg-purple-100 text-purple-700 rounded-lg">
                <strong>Searching for:</strong> {searchTerm || '(empty)'}
              </p>

              <div className="p-3 bg-gray-100 rounded text-xs font-mono">
                <p>&lt;input [(ngModel)]="searchTerm"&gt;</p>
                <p>&lt;p&gt;Searching for: {'{{searchTerm}}'}&lt;/p&gt;</p>
              </div>
            </div>
          </div>
        </div>

        {/* Step 15: Explanation */}
        <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <h4 className="font-semibold text-yellow-800 mb-2">📖 Step 15: Key Difference Explained</h4>
          <div className="text-sm text-yellow-700 space-y-2">
            <p><strong>[property] (one-way):</strong> Component → DOM. Changes in component update DOM, but DOM changes don't update component.</p>
            <p><strong>[(ngModel)] (two-way):</strong> Component ↔ DOM. Shorthand for [ngModel]="prop" (ngModelChange)="prop=$event"</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataBindingDemo;
