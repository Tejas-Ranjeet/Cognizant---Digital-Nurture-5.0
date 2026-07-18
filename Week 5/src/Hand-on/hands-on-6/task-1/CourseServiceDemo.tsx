import { useState, useEffect, createContext, useContext } from 'react';
import { Course } from '../../models/course.model';

/**
 * HANDS-ON 6 - TASK 1: Create and Use a Course Service
 * 
 * Steps 58-62: Services with providedIn: 'root'
 */

// Step 59: Course interface is in models/course.model.ts

// Step 58: CourseService with providedIn: 'root' (singleton pattern)
// In React, we use Context for dependency injection equivalent
const createCourseService = () => {
  let courses: Course[] = [
    { id: 1, name: 'Introduction to Programming', code: 'CS101', credits: 3, gradeStatus: 'passed' },
    { id: 2, name: 'Advanced Mathematics', code: 'MATH201', credits: 4, gradeStatus: 'pending' },
    { id: 3, name: 'Data Structures', code: 'CS201', credits: 3, gradeStatus: 'passed' },
    { id: 4, name: 'Physics I', code: 'PHY101', credits: 4, gradeStatus: 'failed' },
    { id: 5, name: 'Technical Writing', code: 'ENG101', credits: 2, gradeStatus: 'pending' },
  ];

  return {
    getCourses: (): Course[] => [...courses],
    getCourseById: (id: number): Course | undefined => courses.find(c => c.id === id),
    addCourse: (course: Course): void => {
      courses = [...courses, course];
    },
    getCoursesCount: (): number => courses.length,
  };
};

// Create singleton service instance
const courseService = createCourseService();

// Context for DI
const CourseServiceContext = createContext(courseService);

// Hook for injecting service
const useCourseService = () => useContext(CourseServiceContext);

// Step 62: CourseSummaryWidget component
const CourseSummaryWidget = () => {
  const service = useCourseService();
  const [count, setCount] = useState(0);

  useEffect(() => {
    setCount(service.getCoursesCount());
  }, [service]);

  return (
    <div className="bg-indigo-100 rounded-lg p-4 text-center">
      <p className="text-sm text-indigo-600">Summary Widget</p>
      <p className="text-2xl font-bold text-indigo-800">{count} Courses</p>
      <p className="text-xs text-indigo-500">Using shared CourseService</p>
    </div>
  );
};

// Step 61: HomeComponent using CourseService
const HomeStats = () => {
  const service = useCourseService();
  const [count, setCount] = useState(0);

  useEffect(() => {
    // Step 61: Use getCourses().length for live count
    setCount(service.getCourses().length);
  }, [service]);

  return (
    <div className="bg-green-100 rounded-lg p-4 text-center">
      <p className="text-sm text-green-600">Home Stats</p>
      <p className="text-2xl font-bold text-green-800">{count} Available</p>
      <p className="text-xs text-green-500">Using shared CourseService</p>
    </div>
  );
};

// Step 60: CourseListComponent using CourseService
const CourseList = ({ onAddCourse }: { onAddCourse: () => void }) => {
  const service = useCourseService();
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    // Step 60: Replace hardcoded array with service call
    setCourses(service.getCourses());
  }, [service]);

  const refreshCourses = () => {
    setCourses(service.getCourses());
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-lg text-gray-900">Course List</h3>
        <div className="flex gap-2">
          <button
            onClick={refreshCourses}
            className="px-3 py-1 bg-gray-100 text-gray-700 rounded text-sm hover:bg-gray-200"
          >
            🔄 Refresh
          </button>
          <button
            onClick={onAddCourse}
            className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded text-sm hover:bg-indigo-200"
          >
            ➕ Add Course
          </button>
        </div>
      </div>
      <div className="space-y-2">
        {courses.map(course => (
          <div key={course.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
            <div>
              <span className="font-medium">{course.name}</span>
              <span className="text-gray-500 text-sm ml-2">({course.code})</span>
            </div>
            <span className="text-sm text-gray-500">{course.credits} credits</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const CourseServiceDemo = () => {
  const service = useCourseService();
  const [refreshKey, setRefreshKey] = useState(0);

  // Step 62: Add course to demonstrate shared service
  const handleAddCourse = () => {
    const newId = service.getCourses().length + 1;
    service.addCourse({
      id: newId,
      name: `New Course ${newId}`,
      code: `NEW${newId}01`,
      credits: 3,
      gradeStatus: 'pending',
    });
    setRefreshKey(prev => prev + 1); // Trigger re-render
  };

  return (
    <CourseServiceContext.Provider value={courseService}>
      <div className="p-6 bg-gray-50 min-h-screen">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">🔧 Task 1: Course Service</h2>
          <p className="text-gray-600 mb-6">Steps 58-62: Services and Dependency Injection</p>

          {/* Service Singleton Demonstration */}
          <div className="bg-white rounded-xl shadow-md p-6 mb-6">
            <h3 className="font-semibold text-lg text-indigo-900 mb-4">
              Step 62: Shared Service Instance
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Both widgets below use the same CourseService. Add a course to see both update:
            </p>
            <div key={refreshKey} className="grid grid-cols-2 gap-4">
              <HomeStats />
              <CourseSummaryWidget />
            </div>
          </div>

          {/* Course List */}
          <div className="mb-6" key={`list-${refreshKey}`}>
            <CourseList onAddCourse={handleAddCourse} />
          </div>

          {/* Code Example */}
          <div className="bg-white rounded-xl shadow-md p-6 mb-6">
            <h3 className="font-semibold text-lg text-gray-900 mb-4">Service Implementation</h3>
            <div className="p-4 bg-gray-900 rounded-lg text-xs font-mono overflow-x-auto">
              <p className="text-purple-400">// Step 58: providedIn: 'root' makes it a singleton</p>
              <p className="text-green-400">@Injectable({'{'} providedIn: 'root' {'}'})</p>
              <p className="text-green-400">export class CourseService {'{'}</p>
              <p className="text-gray-300 ml-4">private courses: Course[] = [...];</p>
              <p className="text-gray-300 ml-4"></p>
              <p className="text-gray-300 ml-4">getCourses(): Course[] {'{ return this.courses; }'}</p>
              <p className="text-gray-300 ml-4">getCourseById(id: number): Course | undefined {'{ ... }'}</p>
              <p className="text-gray-300 ml-4">addCourse(course: Course): void {'{ ... }'}</p>
              <p className="text-green-400">{'}'}</p>
            </div>
          </div>

          {/* Hints */}
          <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <h4 className="font-semibold text-yellow-800 mb-2">💡 Key Points:</h4>
            <ul className="text-sm text-yellow-700 space-y-1 list-disc list-inside">
              <li><code>providedIn: 'root'</code> makes service a singleton - one instance app-wide</li>
              <li>Always define TypeScript interfaces for models (Course, Student)</li>
              <li>Inject services via constructor: <code>constructor(private courseService: CourseService)</code></li>
            </ul>
          </div>
        </div>
      </div>
    </CourseServiceContext.Provider>
  );
};

export default CourseServiceDemo;
