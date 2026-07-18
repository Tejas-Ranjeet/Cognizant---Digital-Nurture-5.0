import { useState } from 'react';

/**
 * HANDS-ON 1 - TASK 2: Create and Organise Components
 * 
 * Steps 6-10: Generate and organize core page components
 * 
 * Components created:
 * - HeaderComponent (components/header)
 * - HomeComponent (pages/home)
 * - CourseListComponent (pages/course-list)
 * - StudentProfileComponent (pages/student-profile)
 */

// Step 7: HeaderComponent
const HeaderComponent = () => (
  <nav className="bg-gradient-to-r from-indigo-600 to-purple-600 shadow-lg">
    <div className="max-w-7xl mx-auto px-4 py-4">
      <div className="flex items-center justify-between">
        <span className="text-2xl font-bold text-white">📚 Student Course Portal</span>
        <div className="flex gap-4">
          <a href="#home" className="text-indigo-100 hover:text-white transition-colors">Home</a>
          <a href="#courses" className="text-indigo-100 hover:text-white transition-colors">Courses</a>
          <a href="#profile" className="text-indigo-100 hover:text-white transition-colors">Profile</a>
        </div>
      </div>
    </div>
  </nav>
);

// Step 8: HomeComponent with stats
const HomeComponent = () => (
  <div className="p-6 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-lg">
    <h1 className="text-3xl font-bold text-gray-900 mb-4">Welcome to Student Course Portal 🎓</h1>
    <p className="text-gray-600 mb-6">
      Your one-stop destination for managing courses, tracking grades, and staying connected with your academic journey.
    </p>
    {/* Stats Row - Three Hardcoded Values */}
    <div className="grid grid-cols-3 gap-4">
      <div className="bg-white p-4 rounded-lg shadow text-center">
        <p className="text-gray-500 text-sm">Courses Available</p>
        <p className="text-3xl font-bold text-indigo-600">12</p>
      </div>
      <div className="bg-white p-4 rounded-lg shadow text-center">
        <p className="text-gray-500 text-sm">Enrolled</p>
        <p className="text-3xl font-bold text-green-600">3</p>
      </div>
      <div className="bg-white p-4 rounded-lg shadow text-center">
        <p className="text-gray-500 text-sm">GPA</p>
        <p className="text-3xl font-bold text-purple-600">3.8</p>
      </div>
    </div>
  </div>
);

// CourseListComponent placeholder
const CourseListComponent = () => (
  <div className="p-4 bg-blue-50 rounded-lg">
    <h2 className="text-xl font-semibold text-blue-900">📖 Course List</h2>
    <p className="text-blue-700 text-sm">Course listing will be implemented in Hands-On 3</p>
  </div>
);

// StudentProfileComponent placeholder
const StudentProfileComponent = () => (
  <div className="p-4 bg-green-50 rounded-lg">
    <h2 className="text-xl font-semibold text-green-900">👤 Student Profile</h2>
    <p className="text-green-700 text-sm">Profile details will be expanded in later exercises</p>
  </div>
);

const ComponentsDemo = () => {
  const [activeTab, setActiveTab] = useState<'home' | 'courses' | 'profile'>('home');

  const componentFiles = [
    { name: 'header.component.ts', type: 'TypeScript', purpose: 'Component class with @Component decorator' },
    { name: 'header.component.html', type: 'HTML', purpose: 'Component template' },
    { name: 'header.component.css', type: 'CSS', purpose: 'Component-scoped styles' },
    { name: 'header.component.spec.ts', type: 'Test', purpose: 'Unit test file' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Step 9: app.component.html with <app-header> and <router-outlet> */}
      <HeaderComponent />

      <div className="max-w-6xl mx-auto p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          🧩 Task 2: Create and Organise Components
        </h2>
        <p className="text-gray-600 mb-6">Steps 6-10: Component generation and organization</p>

        {/* Step 6: Generated Files Explanation */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <h3 className="font-semibold text-lg text-indigo-900 mb-4">
            Step 6: Component Files Generated (4 files each)
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {componentFiles.map((file, idx) => (
              <div key={idx} className="p-3 bg-indigo-50 rounded-lg text-center">
                <code className="text-xs text-indigo-600">{file.name}</code>
                <p className="text-xs text-gray-500 mt-1">{file.purpose}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 p-3 bg-gray-100 rounded-lg font-mono text-sm">
            <p className="text-gray-600">$ ng generate component components/header</p>
            <p className="text-gray-600">$ ng generate component pages/home</p>
            <p className="text-gray-600">$ ng generate component pages/course-list</p>
            <p className="text-gray-600">$ ng generate component pages/student-profile</p>
          </div>
        </div>

        {/* Router Outlet Demo */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <h3 className="font-semibold text-lg text-purple-900 mb-4">
            Step 9 & 10: Router Outlet Demo
          </h3>
          
          {/* Tab Navigation */}
          <div className="flex gap-2 mb-4">
            {(['home', 'courses', 'profile'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeTab === tab
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          {/* Router Outlet Content */}
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
            <p className="text-xs text-gray-400 mb-2">&lt;router-outlet&gt;</p>
            {activeTab === 'home' && <HomeComponent />}
            {activeTab === 'courses' && <CourseListComponent />}
            {activeTab === 'profile' && <StudentProfileComponent />}
          </div>
        </div>

        {/* Expected Outcome */}
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
          <h4 className="font-semibold text-green-800 mb-2">✅ Expected Outcome:</h4>
          <ul className="text-sm text-green-700 space-y-1 list-disc list-inside">
            <li>Browser shows the header nav and home page welcome content</li>
            <li>All 4 components generated without errors</li>
            <li>ng serve compiles successfully</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ComponentsDemo;
