import { useState, useEffect } from 'react';
import { Course } from '../../models/course.model';

/**
 * HANDS-ON 9 - TASK 2: NgRx Effects for HTTP and Enrollment State
 * 
 * Steps 97-100: Effects, cross-slice selectors, enrollment state
 */

// Course State
interface CourseState {
  courses: Course[];
  loading: boolean;
  error: string | null;
}

// Step 99: Enrollment State
interface EnrollmentState {
  enrolledCourseIds: number[];
}

// Combined App State
interface AppState {
  course: CourseState;
  enrollment: EnrollmentState;
}

const mockCourses: Course[] = [
  { id: 1, name: 'Introduction to Programming', code: 'CS101', credits: 3, gradeStatus: 'passed' },
  { id: 2, name: 'Advanced Mathematics', code: 'MATH201', credits: 4, gradeStatus: 'pending' },
  { id: 3, name: 'Data Structures', code: 'CS201', credits: 3, gradeStatus: 'passed' },
  { id: 4, name: 'Physics I', code: 'PHY101', credits: 4, gradeStatus: 'failed' },
];

const NgRxEffectsDemo = () => {
  // App State
  const [state, setState] = useState<AppState>({
    course: {
      courses: [],
      loading: false,
      error: null,
    },
    enrollment: {
      enrolledCourseIds: [1], // Initially enrolled in CS101
    },
  });

  const [actionLog, setActionLog] = useState<Array<{ type: string; timestamp: string; details?: string }>>([]);
  const [effectLog, setEffectLog] = useState<string[]>([]);

  const addAction = (type: string, details?: string) => {
    const timestamp = new Date().toLocaleTimeString();
    setActionLog(prev => [{ type, timestamp, details }, ...prev].slice(0, 10));
  };

  const addEffectLog = (message: string) => {
    setEffectLog(prev => [`[${new Date().toLocaleTimeString()}] ${message}`, ...prev].slice(0, 10));
  };

  // Dispatch function
  const dispatch = (action: { type: string; payload?: unknown }) => {
    addAction(action.type, action.payload ? JSON.stringify(action.payload) : undefined);

    switch (action.type) {
      case '[Course] Load Courses':
        setState(prev => ({
          ...prev,
          course: { ...prev.course, loading: true, error: null },
        }));
        // Step 97: Effect handles HTTP
        simulateEffect_loadCourses();
        break;

      case '[Course] Load Courses Success':
        setState(prev => ({
          ...prev,
          course: { 
            ...prev.course, 
            loading: false, 
            courses: (action.payload as { courses: Course[] }).courses 
          },
        }));
        break;

      case '[Course] Load Courses Failure':
        setState(prev => ({
          ...prev,
          course: { 
            ...prev.course, 
            loading: false, 
            error: (action.payload as { error: string }).error 
          },
        }));
        break;

      // Step 99: Enrollment actions
      case '[Enrollment] Enroll In Course':
        const enrollId = (action.payload as { courseId: number }).courseId;
        setState(prev => ({
          ...prev,
          enrollment: {
            ...prev.enrollment,
            enrolledCourseIds: [...prev.enrollment.enrolledCourseIds, enrollId],
          },
        }));
        break;

      case '[Enrollment] Unenroll From Course':
        const unenrollId = (action.payload as { courseId: number }).courseId;
        setState(prev => ({
          ...prev,
          enrollment: {
            ...prev.enrollment,
            enrolledCourseIds: prev.enrollment.enrolledCourseIds.filter(id => id !== unenrollId),
          },
        }));
        break;
    }
  };

  // Step 97: Effect simulation
  const simulateEffect_loadCourses = async () => {
    addEffectLog('Effect: loadCourses$ triggered');
    addEffectLog('Effect: Calling courseService.getCourses()...');
    
    await new Promise(r => setTimeout(r, 800));
    
    addEffectLog('Effect: HTTP success, dispatching loadCoursesSuccess');
    dispatch({
      type: '[Course] Load Courses Success',
      payload: { courses: mockCourses },
    });
  };

  // Load on mount
  useEffect(() => {
    dispatch({ type: '[Course] Load Courses' });
  }, []);

  // Step 99: Cross-slice selector - combines course and enrollment state
  const selectEnrolledCourses = (): Course[] => {
    const { courses } = state.course;
    const { enrolledCourseIds } = state.enrollment;
    return courses.filter(c => enrolledCourseIds.includes(c.id));
  };

  // Step 100: Check if enrolled
  const isEnrolled = (courseId: number): boolean => {
    return state.enrollment.enrolledCourseIds.includes(courseId);
  };

  const handleEnrollToggle = (courseId: number) => {
    if (isEnrolled(courseId)) {
      dispatch({ type: '[Enrollment] Unenroll From Course', payload: { courseId } });
    } else {
      dispatch({ type: '[Enrollment] Enroll In Course', payload: { courseId } });
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">⚡ Task 2: NgRx Effects</h2>
        <p className="text-gray-600 mb-6">Steps 97-100: Effects, Enrollment State, Cross-slice Selectors</p>

        {/* Step 97: Effect Flow */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <h3 className="font-semibold text-lg text-indigo-900 mb-4">
            Steps 97 & 98: Effect Flow
          </h3>
          <div className="grid grid-cols-4 gap-2 text-center text-sm mb-4">
            <div className="p-2 bg-blue-100 rounded">loadCourses</div>
            <div className="p-2 bg-purple-100 rounded">→ Effect</div>
            <div className="p-2 bg-green-100 rounded">→ HTTP</div>
            <div className="p-2 bg-yellow-100 rounded">→ Success</div>
          </div>
          <div className="bg-gray-900 rounded-lg p-3 font-mono text-xs max-h-40 overflow-y-auto">
            {effectLog.map((log, i) => (
              <p key={i} className="text-green-400">{log}</p>
            ))}
            {effectLog.length === 0 && <p className="text-gray-500">No effects triggered yet...</p>}
          </div>
        </div>

        {/* Course Cards with Enrollment */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <h3 className="font-semibold text-lg text-purple-900 mb-4">
            Steps 99 & 100: Enrollment Actions
          </h3>
          
          {state.course.loading ? (
            <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg">
              <div className="animate-spin h-5 w-5 border-2 border-blue-600 border-t-transparent rounded-full"></div>
              <span>Loading...</span>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {state.course.courses.map(course => (
                <div 
                  key={course.id} 
                  className={`p-4 rounded-lg border-2 ${
                    isEnrolled(course.id) 
                      ? 'border-green-500 bg-green-50' 
                      : 'border-gray-200 bg-white'
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-mono text-xs bg-gray-200 px-2 py-1 rounded">{course.code}</span>
                    {isEnrolled(course.id) && (
                      <span className="text-green-600 text-xs">✓ Enrolled</span>
                    )}
                  </div>
                  <h4 className="font-semibold">{course.name}</h4>
                  <button
                    onClick={() => handleEnrollToggle(course.id)}
                    className={`mt-3 w-full py-2 rounded font-medium text-sm ${
                      isEnrolled(course.id)
                        ? 'bg-red-100 text-red-700 hover:bg-red-200'
                        : 'bg-green-100 text-green-700 hover:bg-green-200'
                    }`}
                  >
                    {isEnrolled(course.id) ? 'Unenroll' : 'Enroll'}
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Cross-slice Selector Result */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <h3 className="font-semibold text-lg text-green-900 mb-4">
            Step 99: Cross-slice Selector (Enrolled Courses)
          </h3>
          <div className="space-y-2">
            {selectEnrolledCourses().map(course => (
              <div key={course.id} className="p-3 bg-green-50 rounded-lg flex justify-between">
                <span>{course.name}</span>
                <span className="text-green-600">✓</span>
              </div>
            ))}
            {selectEnrolledCourses().length === 0 && (
              <p className="text-gray-500 text-center py-4">No courses enrolled</p>
            )}
          </div>
        </div>

        {/* Action Timeline */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <h3 className="font-semibold text-lg text-gray-900 mb-4">Redux DevTools</h3>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {actionLog.map((action, i) => (
              <div key={i} className="flex items-start gap-2 p-2 bg-gray-50 rounded text-sm">
                <span className="text-gray-400 font-mono text-xs">{action.timestamp}</span>
                <span className={`px-2 py-0.5 rounded text-xs font-mono ${
                  action.type.includes('Success') ? 'bg-green-100 text-green-700' :
                  action.type.includes('Failure') ? 'bg-red-100 text-red-700' :
                  action.type.includes('Enroll') ? 'bg-purple-100 text-purple-700' :
                  'bg-blue-100 text-blue-700'
                }`}>
                  {action.type}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Hints */}
        <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <h4 className="font-semibold text-yellow-800 mb-2">💡 Key Points:</h4>
          <ul className="text-sm text-yellow-700 space-y-1 list-disc list-inside">
            <li>Effects are the ONLY place for side effects (HTTP, navigation, localStorage)</li>
            <li>Reducers must remain pure functions</li>
            <li>Cross-slice selectors combine data from multiple feature states</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NgRxEffectsDemo;
