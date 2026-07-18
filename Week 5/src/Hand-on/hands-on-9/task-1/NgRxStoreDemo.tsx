import { useState, useEffect } from 'react';
import { Course } from '../../models/course.model';

/**
 * HANDS-ON 9 - TASK 1: Set Up NgRx Store and Define Course State
 * 
 * Steps 92-96: Store, Actions, Reducers, Selectors
 */

// Step 93: Define Actions
const CourseActions = {
  loadCourses: () => ({ type: '[Course] Load Courses' as const }),
  loadCoursesSuccess: (courses: Course[]) => ({ 
    type: '[Course] Load Courses Success' as const, 
    payload: { courses } 
  }),
  loadCoursesFailure: (error: string) => ({ 
    type: '[Course] Load Courses Failure' as const, 
    payload: { error } 
  }),
};

// Step 94: Define State Interface
interface CourseState {
  courses: Course[];
  loading: boolean;
  error: string | null;
}

const initialState: CourseState = {
  courses: [],
  loading: false,
  error: null,
};

// Step 94: Reducer
type CourseAction = 
  | ReturnType<typeof CourseActions.loadCourses>
  | ReturnType<typeof CourseActions.loadCoursesSuccess>
  | ReturnType<typeof CourseActions.loadCoursesFailure>;

const courseReducer = (state: CourseState, action: CourseAction): CourseState => {
  switch (action.type) {
    case '[Course] Load Courses':
      return { ...state, loading: true, error: null };
    case '[Course] Load Courses Success':
      return { ...state, loading: false, courses: action.payload.courses };
    case '[Course] Load Courses Failure':
      return { ...state, loading: false, error: action.payload.error };
    default:
      return state;
  }
};

// Step 95: Selectors
const selectCourseState = (state: { course: CourseState }) => state.course;
const selectAllCourses = (state: { course: CourseState }) => selectCourseState(state).courses;
const selectCoursesLoading = (state: { course: CourseState }) => selectCourseState(state).loading;
const selectCoursesError = (state: { course: CourseState }) => selectCourseState(state).error;

const mockCourses: Course[] = [
  { id: 1, name: 'Introduction to Programming', code: 'CS101', credits: 3, gradeStatus: 'passed' },
  { id: 2, name: 'Advanced Mathematics', code: 'MATH201', credits: 4, gradeStatus: 'pending' },
  { id: 3, name: 'Data Structures', code: 'CS201', credits: 3, gradeStatus: 'passed' },
];

const NgRxStoreDemo = () => {
  // Simulated Redux Store
  const [state, setState] = useState<{ course: CourseState }>({
    course: initialState,
  });
  const [actionLog, setActionLog] = useState<Array<{ type: string; timestamp: string }>>([]);

  // Dispatch function
  const dispatch = (action: CourseAction) => {
    const timestamp = new Date().toLocaleTimeString();
    setActionLog(prev => [{ type: action.type, timestamp }, ...prev].slice(0, 10));
    
    setState(prev => ({
      ...prev,
      course: courseReducer(prev.course, action),
    }));
  };

  // Step 96: Simulate loading courses on mount
  useEffect(() => {
    // Dispatch loadCourses action
    dispatch(CourseActions.loadCourses());

    // Simulate API call (Effect would handle this)
    setTimeout(() => {
      dispatch(CourseActions.loadCoursesSuccess(mockCourses));
    }, 1000);
  }, []);

  const simulateError = () => {
    dispatch(CourseActions.loadCourses());
    setTimeout(() => {
      dispatch(CourseActions.loadCoursesFailure('Failed to fetch courses'));
    }, 500);
  };

  // Select data from state
  const courses = selectAllCourses(state);
  const loading = selectCoursesLoading(state);
  const error = selectCoursesError(state);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">🏪 Task 1: NgRx Store Setup</h2>
        <p className="text-gray-600 mb-6">Steps 92-96: Actions, Reducer, Selectors</p>

        {/* State Tree Display */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <h3 className="font-semibold text-lg text-indigo-900 mb-4">
            Step 92: Store State Tree
          </h3>
          <div className="p-4 bg-gray-900 rounded-lg font-mono text-sm overflow-x-auto">
            <pre className="text-green-400">
              {JSON.stringify(state, null, 2)}
            </pre>
          </div>
        </div>

        {/* Actions */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <h3 className="font-semibold text-lg text-purple-900 mb-4">
            Step 93: Actions
          </h3>
          <div className="flex gap-2 mb-4">
            <button
              onClick={() => {
                dispatch(CourseActions.loadCourses());
                setTimeout(() => {
                  dispatch(CourseActions.loadCoursesSuccess(mockCourses));
                }, 800);
              }}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            >
              Dispatch loadCourses
            </button>
            <button
              onClick={simulateError}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
            >
              Simulate Error
            </button>
          </div>
          <div className="p-4 bg-gray-100 rounded-lg text-xs font-mono">
            <p>loadCourses = createAction('[Course] Load Courses')</p>
            <p>loadCoursesSuccess = createAction('[Course] Load Courses Success', props&lt;{'{ courses: Course[] }'}&gt;())</p>
            <p>loadCoursesFailure = createAction('[Course] Load Courses Failure', props&lt;{'{ error: string }'}&gt;())</p>
          </div>
        </div>

        {/* Action Log (Redux DevTools simulation) */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <h3 className="font-semibold text-lg text-gray-900 mb-4">
            Redux DevTools (Action Timeline)
          </h3>
          <div className="space-y-2">
            {actionLog.map((action, i) => (
              <div key={i} className="flex items-center gap-3 p-2 bg-gray-50 rounded">
                <span className="text-xs text-gray-400 font-mono">{action.timestamp}</span>
                <span className={`px-2 py-1 rounded text-xs font-mono ${
                  action.type.includes('Success') ? 'bg-green-100 text-green-700' :
                  action.type.includes('Failure') ? 'bg-red-100 text-red-700' :
                  'bg-blue-100 text-blue-700'
                }`}>
                  {action.type}
                </span>
              </div>
            ))}
            {actionLog.length === 0 && (
              <p className="text-gray-500 text-center py-4">No actions dispatched yet...</p>
            )}
          </div>
        </div>

        {/* Step 96: Component using selectors */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <h3 className="font-semibold text-lg text-green-900 mb-4">
            Step 96: Component with Selectors
          </h3>
          
          {loading && (
            <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg mb-4">
              <div className="animate-spin h-5 w-5 border-2 border-blue-600 border-t-transparent rounded-full"></div>
              <span className="text-blue-700">Loading courses...</span>
            </div>
          )}

          {error && (
            <div className="p-4 bg-red-50 text-red-700 rounded-lg mb-4">
              ❌ {error}
            </div>
          )}

          {!loading && !error && (
            <div className="space-y-2">
              {courses.map(course => (
                <div key={course.id} className="p-3 bg-gray-50 rounded-lg flex justify-between">
                  <span>{course.name}</span>
                  <span className="text-gray-500">{course.code}</span>
                </div>
              ))}
            </div>
          )}

          <div className="mt-4 p-3 bg-gray-100 rounded text-xs font-mono">
            <p>this.courses$ = this.store.select(selectAllCourses);</p>
            <p>&lt;app-course-card *ngFor="let c of courses$ | async"&gt;</p>
          </div>
        </div>

        {/* Hints */}
        <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <h4 className="font-semibold text-yellow-800 mb-2">💡 Key Points:</h4>
          <ul className="text-sm text-yellow-700 space-y-1 list-disc list-inside">
            <li>[Course] prefix groups actions by feature for DevTools readability</li>
            <li>Selectors are memoized - only recompute when input changes</li>
            <li>Use async pipe for automatic subscribe/unsubscribe</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NgRxStoreDemo;
