import { useState, createContext, useContext } from 'react';
import { Course } from '../../models/course.model';

/**
 * HANDS-ON 6 - TASK 2: Enrollment Service and Hierarchical DI
 * 
 * Steps 63-67: Service-to-service injection and component-level providers
 */

// Mock CourseService (Step 64: Injected into EnrollmentService)
const courses: Course[] = [
  { id: 1, name: 'Introduction to Programming', code: 'CS101', credits: 3, gradeStatus: 'passed' },
  { id: 2, name: 'Advanced Mathematics', code: 'MATH201', credits: 4, gradeStatus: 'pending' },
  { id: 3, name: 'Data Structures', code: 'CS201', credits: 3, gradeStatus: 'passed' },
  { id: 4, name: 'Physics I', code: 'PHY101', credits: 4, gradeStatus: 'failed' },
  { id: 5, name: 'Technical Writing', code: 'ENG101', credits: 2, gradeStatus: 'pending' },
];

// Step 63: EnrollmentService (provided at root)
const createEnrollmentService = () => {
  let enrolledCourseIds: number[] = [1, 3]; // Initially enrolled in CS101 and CS201

  return {
    enroll: (courseId: number): void => {
      if (!enrolledCourseIds.includes(courseId)) {
        enrolledCourseIds = [...enrolledCourseIds, courseId];
      }
    },
    unenroll: (courseId: number): void => {
      enrolledCourseIds = enrolledCourseIds.filter(id => id !== courseId);
    },
    isEnrolled: (courseId: number): boolean => enrolledCourseIds.includes(courseId),
    // Step 64: Uses CourseService to resolve IDs to full Course objects
    getEnrolledCourses: (): Course[] => {
      return courses.filter(c => enrolledCourseIds.includes(c.id));
    },
    getEnrolledIds: (): number[] => [...enrolledCourseIds],
  };
};

const enrollmentService = createEnrollmentService();
const EnrollmentServiceContext = createContext(enrollmentService);
const useEnrollmentService = () => useContext(EnrollmentServiceContext);

// Step 65: CourseCardComponent with EnrollmentService
const CourseCard = ({ course, onUpdate }: { course: Course; onUpdate: () => void }) => {
  const service = useEnrollmentService();
  const isEnrolled = service.isEnrolled(course.id);

  const handleToggle = () => {
    if (isEnrolled) {
      service.unenroll(course.id);
    } else {
      service.enroll(course.id);
    }
    onUpdate();
  };

  return (
    <div className={`bg-white rounded-lg shadow-md p-4 border-l-4 ${
      isEnrolled ? 'border-green-500' : 'border-gray-300'
    }`}>
      <div className="flex justify-between items-start mb-2">
        <span className="bg-indigo-100 text-indigo-700 px-2 py-1 rounded text-xs font-mono">
          {course.code}
        </span>
        {isEnrolled && (
          <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs">
            ✓ Enrolled
          </span>
        )}
      </div>
      <h4 className="font-semibold text-gray-900">{course.name}</h4>
      <p className="text-sm text-gray-500 mb-3">{course.credits} credits</p>
      {/* Step 65: Toggle button label */}
      <button
        onClick={handleToggle}
        className={`w-full py-2 rounded-lg font-medium transition-colors ${
          isEnrolled
            ? 'bg-red-100 text-red-700 hover:bg-red-200'
            : 'bg-green-100 text-green-700 hover:bg-green-200'
        }`}
      >
        {isEnrolled ? 'Unenroll' : 'Enroll'}
      </button>
    </div>
  );
};

// Step 66: StudentProfileComponent showing enrolled courses
const StudentProfile = () => {
  const service = useEnrollmentService();
  const enrolledCourses = service.getEnrolledCourses();

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h3 className="font-semibold text-lg text-gray-900 mb-4">
        📚 My Enrolled Courses
      </h3>
      {enrolledCourses.length === 0 ? (
        <p className="text-gray-500 text-center py-4">No courses enrolled yet.</p>
      ) : (
        <div className="space-y-2">
          {enrolledCourses.map(course => (
            <div key={course.id} className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
              <div>
                <span className="font-medium">{course.name}</span>
                <span className="text-gray-500 text-sm ml-2">({course.code})</span>
              </div>
              <span className="text-green-600 text-sm">✓ Active</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// Step 67: NotificationComponent with component-level provider
// This demonstrates scoped service instance
const NotificationComponent = ({ instanceId }: { instanceId: number }) => {
  // In Angular: providers: [NotificationService] creates new instance per component
  const [notifications, setNotifications] = useState<string[]>([]);

  const addNotification = (message: string) => {
    setNotifications(prev => [...prev, `[Instance ${instanceId}] ${message}`]);
  };

  return (
    <div className="bg-orange-50 rounded-lg p-4">
      <h4 className="font-semibold text-orange-800 mb-2">
        Notification Service (Instance #{instanceId})
      </h4>
      <button
        onClick={() => addNotification(`Notification at ${new Date().toLocaleTimeString()}`)}
        className="px-3 py-1 bg-orange-200 text-orange-800 rounded text-sm mb-2"
      >
        Add Notification
      </button>
      <div className="space-y-1">
        {notifications.map((n, i) => (
          <p key={i} className="text-xs text-orange-700">{n}</p>
        ))}
        {notifications.length === 0 && (
          <p className="text-xs text-orange-500">No notifications yet</p>
        )}
      </div>
    </div>
  );
};

const EnrollmentServiceDemo = () => {
  const [refreshKey, setRefreshKey] = useState(0);

  return (
    <EnrollmentServiceContext.Provider value={enrollmentService}>
      <div className="p-6 bg-gray-50 min-h-screen">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">🔗 Task 2: Enrollment Service & DI</h2>
          <p className="text-gray-600 mb-6">Steps 63-67: Service injection and hierarchical providers</p>

          {/* Course List with Enrollment */}
          <div className="bg-white rounded-xl shadow-md p-6 mb-6">
            <h3 className="font-semibold text-lg text-indigo-900 mb-4">
              Steps 63-65: Enroll/Unenroll Courses
            </h3>
            <div key={refreshKey} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {courses.map(course => (
                <CourseCard 
                  key={course.id} 
                  course={course} 
                  onUpdate={() => setRefreshKey(k => k + 1)}
                />
              ))}
            </div>
          </div>

          {/* Student Profile */}
          <div className="mb-6" key={`profile-${refreshKey}`}>
            <StudentProfile />
          </div>

          {/* Step 67: Component-level providers */}
          <div className="bg-white rounded-xl shadow-md p-6 mb-6">
            <h3 className="font-semibold text-lg text-purple-900 mb-4">
              Step 67: Component-Level Providers
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Each component below has its own NotificationService instance (scoped provider):
            </p>
            <div className="grid grid-cols-2 gap-4">
              <NotificationComponent instanceId={1} />
              <NotificationComponent instanceId={2} />
            </div>
            <div className="mt-4 p-3 bg-purple-50 rounded-lg">
              <p className="text-sm text-purple-700">
                <strong>Why component-level?</strong> Creates isolated state per component instance,
                useful for form wizards or components needing independent state.
              </p>
            </div>
          </div>

          {/* Code Example */}
          <div className="bg-white rounded-xl shadow-md p-6 mb-6">
            <h3 className="font-semibold text-lg text-gray-900 mb-4">Service-to-Service Injection</h3>
            <div className="p-4 bg-gray-900 rounded-lg text-xs font-mono overflow-x-auto">
              <p className="text-purple-400">// Step 64: Inject CourseService into EnrollmentService</p>
              <p className="text-green-400">@Injectable({'{'} providedIn: 'root' {'}'})</p>
              <p className="text-green-400">export class EnrollmentService {'{'}</p>
              <p className="text-gray-300 ml-4">constructor(private courseService: CourseService) {'{}'}</p>
              <p className="text-gray-300 ml-4"></p>
              <p className="text-gray-300 ml-4">getEnrolledCourses(): Course[] {'{'}</p>
              <p className="text-gray-300 ml-8">return this.enrolledCourseIds.map(id =&gt;</p>
              <p className="text-gray-300 ml-12">this.courseService.getCourseById(id)</p>
              <p className="text-gray-300 ml-8">);</p>
              <p className="text-gray-300 ml-4">{'}'}</p>
              <p className="text-green-400">{'}'}</p>
            </div>
          </div>

          {/* Hints */}
          <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <h4 className="font-semibold text-yellow-800 mb-2">💡 Key Points:</h4>
            <ul className="text-sm text-yellow-700 space-y-1 list-disc list-inside">
              <li>Component-level providers: <code>providers: [NotificationService]</code> in @Component</li>
              <li>Services can inject other services - creates layered architecture</li>
              <li>Root-level = singleton, Component-level = new instance per component</li>
            </ul>
          </div>
        </div>
      </div>
    </EnrollmentServiceContext.Provider>
  );
};

export default EnrollmentServiceDemo;
