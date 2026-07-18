import { useState, useEffect, useCallback } from 'react';
import { Course } from '../../models/course.model';

/**
 * HANDS-ON 8 - TASK 2: RxJS Operators and Error Handling
 * 
 * Steps 83-87: map, catchError, tap, retry, switchMap
 */

const mockCourses: Course[] = [
  { id: 1, name: 'Introduction to Programming', code: 'CS101', credits: 3, gradeStatus: 'passed' },
  { id: 2, name: 'Advanced Mathematics', code: 'MATH201', credits: 4, gradeStatus: 'pending' },
  { id: 3, name: 'Zero Credit Workshop', code: 'WRK000', credits: 0, gradeStatus: 'pending' },
  { id: 4, name: 'Data Structures', code: 'CS201', credits: 3, gradeStatus: 'passed' },
];

const mockStudents = [
  { id: 1, name: 'Alice Johnson', courseId: 1 },
  { id: 2, name: 'Bob Smith', courseId: 1 },
  { id: 3, name: 'Carol White', courseId: 2 },
];

const RxJSOperatorsDemo = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [students, setStudents] = useState<{ id: number; name: string; courseId: number }[]>([]);
  const [logs, setLogs] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [simulateError, setSimulateError] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const [selectedCourseId, setSelectedCourseId] = useState<number | null>(null);

  const addLog = useCallback((message: string, type: 'info' | 'success' | 'error' | 'warn' = 'info') => {
    const prefix = type === 'success' ? '✅' : type === 'error' ? '❌' : type === 'warn' ? '⚠️' : 'ℹ️';
    setLogs(prev => [`[${new Date().toLocaleTimeString()}] ${prefix} ${message}`, ...prev].slice(0, 15));
  }, []);

  // Simulated API with retry support
  const fetchWithRetry = useCallback(async (attempt: number = 1): Promise<Course[]> => {
    addLog(`Attempt ${attempt}: Fetching courses...`);
    await new Promise(r => setTimeout(r, 500));
    
    if (simulateError && attempt <= 2) {
      addLog(`Attempt ${attempt}: Failed! ${3 - attempt} retries remaining...`, 'warn');
      throw new Error('Network error');
    }
    
    return mockCourses;
  }, [simulateError, addLog]);

  // Steps 83-86: Load courses with operators
  const loadCourses = async () => {
    setIsLoading(true);
    setErrorMessage(null);
    setRetryCount(0);
    setCourses([]);

    try {
      let data: Course[] = [];
      let attempts = 0;
      const maxRetries = 2;

      // Step 86: retry(2) - retry up to 2 times
      while (attempts <= maxRetries) {
        try {
          attempts++;
          setRetryCount(attempts);
          data = await fetchWithRetry(attempts);
          break;
        } catch (err) {
          if (attempts > maxRetries) throw err;
        }
      }

      // Step 85: tap operator - side effects (logging)
      addLog(`tap: Courses loaded: ${data.length} items`, 'success');

      // Step 83: map operator - transform data
      const filtered = data.filter(c => c.credits > 0);
      addLog(`map: Filtered to ${filtered.length} courses with credits > 0`, 'info');

      setCourses(filtered);
    } catch (err) {
      // Step 84: catchError - handle errors
      const message = 'Failed to load courses. Please try again.';
      setErrorMessage(message);
      addLog(`catchError: ${message}`, 'error');
    } finally {
      setIsLoading(false);
    }
  };

  // Step 87: switchMap - chain HTTP calls
  const loadStudentsForCourse = useCallback(async (courseId: number) => {
    setSelectedCourseId(courseId);
    addLog(`switchMap: Loading students for course ${courseId}...`);
    
    // switchMap cancels previous request when new courseId arrives
    await new Promise(r => setTimeout(r, 300));
    
    const courseStudents = mockStudents.filter(s => s.courseId === courseId);
    setStudents(courseStudents);
    addLog(`switchMap: Found ${courseStudents.length} students for course ${courseId}`, 'success');
  }, [addLog]);

  useEffect(() => {
    loadCourses();
  }, []);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">🔧 Task 2: RxJS Operators</h2>
        <p className="text-gray-600 mb-6">Steps 83-87: map, catchError, tap, retry, switchMap</p>

        {/* Error Simulation Toggle */}
        <div className="bg-white rounded-xl shadow-md p-4 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-gray-700">Step 86: Test Retry</h3>
              <p className="text-sm text-gray-500">Simulate network errors to see retry in action</p>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSimulateError(!simulateError)}
                className={`px-4 py-2 rounded-lg font-medium ${
                  simulateError ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-700'
                }`}
              >
                {simulateError ? 'Errors ON' : 'Errors OFF'}
              </button>
              <button
                onClick={loadCourses}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              >
                🔄 Reload
              </button>
            </div>
          </div>
          {retryCount > 0 && (
            <p className="text-sm text-gray-500 mt-2">Retry attempts: {retryCount}</p>
          )}
        </div>

        {/* Loading/Error States */}
        {isLoading && (
          <div className="bg-indigo-50 rounded-lg p-4 mb-6 flex items-center gap-3">
            <div className="animate-spin h-5 w-5 border-2 border-indigo-600 border-t-transparent rounded-full"></div>
            <span className="text-indigo-700">Loading with retry support...</span>
          </div>
        )}

        {errorMessage && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-red-700">{errorMessage}</p>
          </div>
        )}

        {/* Course List with switchMap */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <h3 className="font-semibold text-lg text-gray-900 mb-4">
            Steps 83-85: Courses (filtered with credits &gt; 0)
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {courses.map(course => (
              <div
                key={course.id}
                onClick={() => loadStudentsForCourse(course.id)}
                className={`p-3 rounded-lg cursor-pointer transition-colors ${
                  selectedCourseId === course.id
                    ? 'bg-indigo-100 border-2 border-indigo-500'
                    : 'bg-gray-50 hover:bg-gray-100 border-2 border-transparent'
                }`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <span className="font-medium">{course.name}</span>
                    <p className="text-sm text-gray-500">{course.code} • {course.credits} credits</p>
                  </div>
                  <span className="text-indigo-500">→</span>
                </div>
              </div>
            ))}
          </div>
          <p className="text-sm text-gray-500 mt-3">
            Click a course to load enrolled students (Step 87: switchMap)
          </p>
        </div>

        {/* Students from switchMap */}
        {selectedCourseId && (
          <div className="bg-white rounded-xl shadow-md p-6 mb-6">
            <h3 className="font-semibold text-lg text-purple-900 mb-4">
              Step 87: Students (switchMap result)
            </h3>
            {students.length > 0 ? (
              <div className="space-y-2">
                {students.map(student => (
                  <div key={student.id} className="p-3 bg-purple-50 rounded-lg">
                    👤 {student.name}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No students enrolled in this course.</p>
            )}
          </div>
        )}

        {/* Operator Log */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <h3 className="font-semibold text-lg text-gray-900 mb-4">RxJS Operator Log</h3>
          <div className="bg-gray-900 rounded-lg p-4 h-64 overflow-y-auto font-mono text-sm">
            {logs.map((log, i) => (
              <p key={i} className={`${
                log.includes('✅') ? 'text-green-400' :
                log.includes('❌') ? 'text-red-400' :
                log.includes('⚠️') ? 'text-yellow-400' : 'text-gray-400'
              }`}>
                {log}
              </p>
            ))}
          </div>
        </div>

        {/* Code Examples */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <h3 className="font-semibold text-lg text-gray-900 mb-4">RxJS Operator Chain</h3>
          <div className="p-4 bg-gray-900 rounded-lg text-xs font-mono overflow-x-auto">
            <p className="text-gray-300">getCourses().pipe(</p>
            <p className="text-purple-400 ml-4">// Step 85: tap for side effects (logging)</p>
            <p className="text-gray-300 ml-4">tap(courses =&gt; console.log('Loaded:', courses.length)),</p>
            <p className="text-purple-400 ml-4">// Step 83: map to transform data</p>
            <p className="text-gray-300 ml-4">map(courses =&gt; courses.filter(c =&gt; c.credits &gt; 0)),</p>
            <p className="text-purple-400 ml-4">// Step 86: retry on failure</p>
            <p className="text-gray-300 ml-4">retry(2),</p>
            <p className="text-purple-400 ml-4">// Step 84: catchError for error handling</p>
            <p className="text-gray-300 ml-4">catchError(err =&gt; throwError(() =&gt; new Error('Failed')))</p>
            <p className="text-gray-300">);</p>
          </div>
        </div>

        {/* Hints */}
        <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <h4 className="font-semibold text-yellow-800 mb-2">💡 Key Points:</h4>
          <ul className="text-sm text-yellow-700 space-y-1 list-disc list-inside">
            <li><strong>tap</strong>: Side effects (logging) - never modify data in tap</li>
            <li><strong>map</strong>: Transform data - pure function</li>
            <li><strong>switchMap</strong>: Cancels previous inner Observable when new value arrives</li>
            <li><strong>retry</strong>: Retries failed requests before propagating error</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default RxJSOperatorsDemo;
