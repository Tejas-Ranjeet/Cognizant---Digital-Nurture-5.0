import { useEffect, useState } from 'react';

/**
 * HomeComponent
 * 
 * Dashboard/landing page for the Student Course Portal.
 * Displays welcome message, description, and stats row with hardcoded values.
 * 
 * Demonstrates:
 * - Component lifecycle (useEffect equivalent to ngOnInit)
 * - Property binding (displaying dynamic values)
 * - Template structure
 * 
 * Equivalent to Angular's home.component.ts/html/css
 */

interface DashboardStats {
  coursesAvailable: number;
  enrolled: number;
  gpa: number;
}

const Home = () => {
  // Hardcoded stats as specified in the exercise
  const [stats] = useState<DashboardStats>({
    coursesAvailable: 12,
    enrolled: 3,
    gpa: 3.8
  });

  const [currentTime, setCurrentTime] = useState<string>('');

  // Lifecycle hook - equivalent to ngOnInit in Angular
  useEffect(() => {
    console.log('HomeComponent initialized');
    
    // Update time every second to demonstrate reactive updates
    const updateTime = () => {
      setCurrentTime(new Date().toLocaleTimeString());
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);

    // Cleanup - equivalent to ngOnDestroy
    return () => {
      console.log('HomeComponent destroyed');
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Welcome Heading - H1 as specified */}
          <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-fade-in">
            Welcome to the Student Course Portal 🎓
          </h1>
          
          {/* Short Description Paragraph */}
          <p className="text-xl text-indigo-100 max-w-3xl mb-4">
            Your one-stop destination for managing courses, tracking grades, and staying 
            connected with your academic journey. Browse available courses, enroll with ease, 
            and monitor your progress all in one place.
          </p>

          <p className="text-indigo-200">
            Current Time: <span className="font-mono bg-indigo-600/50 px-2 py-1 rounded">{currentTime}</span>
          </p>
        </div>
      </div>

      {/* Stats Row - Three Hardcoded Values */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Courses Available */}
          <div className="bg-white rounded-xl shadow-lg p-6 transform hover:scale-105 transition-transform duration-300">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 rounded-full">
                <span className="text-3xl">📚</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                  Courses Available
                </p>
                <p className="text-3xl font-bold text-gray-900">
                  {stats.coursesAvailable}
                </p>
              </div>
            </div>
          </div>

          {/* Enrolled */}
          <div className="bg-white rounded-xl shadow-lg p-6 transform hover:scale-105 transition-transform duration-300">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-full">
                <span className="text-3xl">✅</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                  Enrolled
                </p>
                <p className="text-3xl font-bold text-gray-900">
                  {stats.enrolled}
                </p>
              </div>
            </div>
          </div>

          {/* GPA */}
          <div className="bg-white rounded-xl shadow-lg p-6 transform hover:scale-105 transition-transform duration-300">
            <div className="flex items-center">
              <div className="p-3 bg-purple-100 rounded-full">
                <span className="text-3xl">⭐</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                  GPA
                </p>
                <p className="text-3xl font-bold text-gray-900">
                  {stats.gpa.toFixed(1)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
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

      {/* Recent Activity */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Activity</h2>
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <ul className="divide-y divide-gray-200">
            <li className="p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-center">
                <span className="text-2xl mr-3">📝</span>
                <div>
                  <p className="font-medium text-gray-900">Enrolled in Advanced Mathematics</p>
                  <p className="text-sm text-gray-500">2 days ago</p>
                </div>
              </div>
            </li>
            <li className="p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-center">
                <span className="text-2xl mr-3">🏆</span>
                <div>
                  <p className="font-medium text-gray-900">Completed Introduction to Physics</p>
                  <p className="text-sm text-gray-500">1 week ago</p>
                </div>
              </div>
            </li>
            <li className="p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-center">
                <span className="text-2xl mr-3">📊</span>
                <div>
                  <p className="font-medium text-gray-900">Received grade A in Data Structures</p>
                  <p className="text-sm text-gray-500">2 weeks ago</p>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Home;
