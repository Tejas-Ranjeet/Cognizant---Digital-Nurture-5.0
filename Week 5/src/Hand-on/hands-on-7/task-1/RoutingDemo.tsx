import { useState } from 'react';

/**
 * HANDS-ON 7 - TASK 1: Route Configuration, Parameters and Nested Routes
 * 
 * Steps 68-72: Routes, parameters, query params, nested routes
 */

interface Course {
  id: number;
  name: string;
  code: string;
  credits: number;
  description: string;
}

const courses: Course[] = [
  { id: 1, name: 'Introduction to Programming', code: 'CS101', credits: 3, description: 'Learn programming fundamentals with Python.' },
  { id: 2, name: 'Advanced Mathematics', code: 'MATH201', credits: 4, description: 'Calculus, linear algebra, and differential equations.' },
  { id: 3, name: 'Data Structures', code: 'CS201', credits: 3, description: 'Arrays, linked lists, trees, graphs, and algorithms.' },
];

// Step 69: CourseDetailComponent
const CourseDetailComponent = ({ courseId, onBack }: { courseId: number; onBack: () => void }) => {
  // Step 69: Read :id parameter using ActivatedRoute
  // this.route.snapshot.paramMap.get('id')
  const course = courses.find(c => c.id === courseId);

  if (!course) {
    return (
      <div className="p-6 text-center">
        <h2 className="text-2xl font-bold text-red-600">Course Not Found</h2>
        <p className="text-gray-600 mt-2">Course ID: {courseId}</p>
        <button onClick={onBack} className="mt-4 text-indigo-600 hover:underline">
          ← Back to Courses
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <button onClick={onBack} className="text-indigo-600 hover:underline mb-4">
        ← Back to Courses
      </button>
      <div className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white p-6 rounded-lg mb-4">
        <span className="bg-white/20 px-2 py-1 rounded text-sm">{course.code}</span>
        <h2 className="text-2xl font-bold mt-2">{course.name}</h2>
        <p className="text-indigo-100 mt-1">{course.credits} Credits</p>
      </div>
      <p className="text-gray-700">{course.description}</p>
      <div className="mt-4 p-3 bg-gray-100 rounded text-sm font-mono">
        Route: /courses/{courseId}
      </div>
    </div>
  );
};

// Step 68: NotFoundComponent
const NotFoundComponent = () => (
  <div className="text-center py-12">
    <h1 className="text-6xl font-bold text-gray-300">404</h1>
    <h2 className="text-2xl font-bold text-gray-700 mt-4">Page Not Found</h2>
    <p className="text-gray-500 mt-2">The page you're looking for doesn't exist.</p>
  </div>
);

// Step 70 & 71: CourseListComponent with navigation and query params
const CourseListComponent = ({ 
  onSelectCourse, 
  searchTerm, 
  onSearchChange 
}: { 
  onSelectCourse: (id: number) => void;
  searchTerm: string;
  onSearchChange: (term: string) => void;
}) => {
  // Step 71: Filter by search query param
  const filteredCourses = courses.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      {/* Step 71: Search with query param */}
      <div className="mb-4">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search courses..."
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
        />
        {searchTerm && (
          <p className="text-sm text-gray-500 mt-2">
            URL: /courses?search={encodeURIComponent(searchTerm)}
          </p>
        )}
      </div>

      <div className="space-y-3">
        {filteredCourses.map(course => (
          <div
            key={course.id}
            onClick={() => onSelectCourse(course.id)}
            className="bg-white rounded-lg shadow-md p-4 cursor-pointer hover:shadow-lg transition-shadow"
          >
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-semibold text-gray-900">{course.name}</h4>
                <p className="text-sm text-gray-500">{course.code} • {course.credits} credits</p>
              </div>
              <span className="text-indigo-600">→</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Step 72: CoursesLayoutComponent (for nested routes)
const CoursesLayoutComponent = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-gray-50 rounded-xl p-6">
    <h2 className="text-xl font-bold text-gray-900 mb-4">📚 Courses Section</h2>
    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
      <p className="text-xs text-gray-400 mb-2">&lt;router-outlet&gt;</p>
      {children}
    </div>
  </div>
);

const RoutingDemo = () => {
  const [currentRoute, setCurrentRoute] = useState<'home' | 'courses' | 'courseDetail' | 'profile' | '404'>('home');
  const [selectedCourseId, setSelectedCourseId] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Step 71: Update URL with query param
  const handleSearchChange = (term: string) => {
    setSearchTerm(term);
    // In Angular: this.router.navigate(['courses'], { queryParams: { search: term } })
  };

  // Step 70: Navigate to course detail
  const handleSelectCourse = (id: number) => {
    setSelectedCourseId(id);
    setCurrentRoute('courseDetail');
    // In Angular: Router.navigate(['courses', id])
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">🛣️ Task 1: Routing</h2>
        <p className="text-gray-600 mb-6">Steps 68-72: Routes, parameters, nested routes</p>

        {/* Route Navigation */}
        <div className="bg-white rounded-xl shadow-md p-4 mb-6">
          <h3 className="font-semibold text-gray-700 mb-3">Navigate to:</h3>
          <div className="flex flex-wrap gap-2">
            {[
              { route: 'home', label: '/', path: 'HomeComponent' },
              { route: 'courses', label: '/courses', path: 'CourseListComponent' },
              { route: 'profile', label: '/profile', path: 'StudentProfileComponent' },
              { route: '404', label: '/unknown', path: 'NotFoundComponent' },
            ].map(item => (
              <button
                key={item.route}
                onClick={() => {
                  setCurrentRoute(item.route as any);
                  setSelectedCourseId(null);
                }}
                className={`px-3 py-1 rounded text-sm font-mono ${
                  currentRoute === item.route
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* Step 68: Route Configuration Display */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <h3 className="font-semibold text-lg text-gray-900 mb-4">Step 68: Routes Configuration</h3>
          <div className="p-4 bg-gray-900 rounded-lg text-xs font-mono overflow-x-auto">
            <p className="text-green-400">const routes: Routes = [</p>
            <p className="text-gray-300 ml-4">{`{ path: '', component: HomeComponent },`}</p>
            <p className="text-gray-300 ml-4">{`{ path: 'courses', component: CourseListComponent },`}</p>
            <p className="text-gray-300 ml-4">{`{ path: 'courses/:id', component: CourseDetailComponent },`}</p>
            <p className="text-gray-300 ml-4">{`{ path: 'profile', component: StudentProfileComponent },`}</p>
            <p className="text-gray-300 ml-4">{`{ path: '**', component: NotFoundComponent }`}</p>
            <p className="text-green-400">];</p>
          </div>
        </div>

        {/* Router Outlet */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <h3 className="font-semibold text-lg text-gray-900 mb-4">
            Current Route: <span className="text-indigo-600 font-mono">{currentRoute}</span>
          </h3>
          
          {currentRoute === 'home' && (
            <div className="p-6 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-lg">
              <h2 className="text-2xl font-bold text-gray-900">Welcome Home 🏠</h2>
              <p className="text-gray-600 mt-2">Student Course Portal Dashboard</p>
            </div>
          )}

          {currentRoute === 'courses' && (
            <CoursesLayoutComponent>
              <CourseListComponent
                onSelectCourse={handleSelectCourse}
                searchTerm={searchTerm}
                onSearchChange={handleSearchChange}
              />
            </CoursesLayoutComponent>
          )}

          {currentRoute === 'courseDetail' && selectedCourseId && (
            <CoursesLayoutComponent>
              <CourseDetailComponent
                courseId={selectedCourseId}
                onBack={() => setCurrentRoute('courses')}
              />
            </CoursesLayoutComponent>
          )}

          {currentRoute === 'profile' && (
            <div className="p-6 bg-green-50 rounded-lg">
              <h2 className="text-xl font-bold text-green-900">👤 Student Profile</h2>
              <p className="text-green-700 mt-2">Profile content here...</p>
            </div>
          )}

          {currentRoute === '404' && <NotFoundComponent />}
        </div>

        {/* Hints */}
        <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <h4 className="font-semibold text-yellow-800 mb-2">💡 Key Points:</h4>
          <ul className="text-sm text-yellow-700 space-y-1 list-disc list-inside">
            <li>route.snapshot.paramMap for static params, route.paramMap for observable</li>
            <li>** wildcard must be LAST - Angular matches routes in order</li>
            <li>Nested routes need &lt;router-outlet&gt; in parent component</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default RoutingDemo;
