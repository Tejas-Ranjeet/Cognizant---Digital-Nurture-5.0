import { useState, useEffect } from 'react';
import { Course } from '../../models/course.model';

/**
 * HANDS-ON 8 - TASK 1: Replace Service Data with HttpClient Calls
 * 
 * Steps 78-82: GET, POST, PUT, DELETE with HttpClient
 */

// Simulated API responses
const mockCourses: Course[] = [
  { id: 1, name: 'Introduction to Programming', code: 'CS101', credits: 3, gradeStatus: 'passed' },
  { id: 2, name: 'Advanced Mathematics', code: 'MATH201', credits: 4, gradeStatus: 'pending' },
  { id: 3, name: 'Data Structures', code: 'CS201', credits: 3, gradeStatus: 'passed' },
];

// Simulated HttpClient service
const simulateHttp = {
  get: async <T,>(url: string): Promise<T> => {
    console.log(`GET ${url}`);
    await new Promise(r => setTimeout(r, 800));
    if (url.includes('/courses/')) {
      const id = parseInt(url.split('/').pop() || '0');
      return mockCourses.find(c => c.id === id) as T;
    }
    return [...mockCourses] as T;
  },
  post: async <T,>(url: string, body: unknown): Promise<T> => {
    console.log(`POST ${url}`, body);
    await new Promise(r => setTimeout(r, 500));
    const newCourse = { ...body as Course, id: mockCourses.length + 1 };
    mockCourses.push(newCourse);
    return newCourse as T;
  },
  put: async <T,>(url: string, body: unknown): Promise<T> => {
    console.log(`PUT ${url}`, body);
    await new Promise(r => setTimeout(r, 500));
    const index = mockCourses.findIndex(c => c.id === (body as Course).id);
    if (index !== -1) mockCourses[index] = body as Course;
    return body as T;
  },
  delete: async (url: string): Promise<void> => {
    console.log(`DELETE ${url}`);
    await new Promise(r => setTimeout(r, 500));
    const id = parseInt(url.split('/').pop() || '0');
    const index = mockCourses.findIndex(c => c.id === id);
    if (index !== -1) mockCourses.splice(index, 1);
  },
};

const HttpClientDemo = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [logs, setLogs] = useState<string[]>([]);
  const [newCourseName, setNewCourseName] = useState('');

  const addLog = (message: string) => {
    setLogs(prev => [`[${new Date().toLocaleTimeString()}] ${message}`, ...prev].slice(0, 10));
  };

  // Step 79 & 80: GET courses with subscribe
  const loadCourses = async () => {
    setIsLoading(true);
    setErrorMessage(null);
    addLog('GET /courses - Loading...');
    
    try {
      // Step 79: getCourses(): Observable<Course[]>
      const data = await simulateHttp.get<Course[]>('http://localhost:3000/courses');
      setCourses(data);
      addLog(`GET /courses - Success: ${data.length} courses loaded`);
    } catch (err) {
      // Step 80: error handling in subscribe
      setErrorMessage('Failed to load courses');
      addLog('GET /courses - Error: Failed to load');
    } finally {
      setIsLoading(false);
    }
  };

  // Step 81: POST createCourse
  const createCourse = async () => {
    if (!newCourseName.trim()) return;
    
    const newCourse: Omit<Course, 'id'> = {
      name: newCourseName,
      code: `NEW${Date.now().toString().slice(-3)}`,
      credits: 3,
      gradeStatus: 'pending',
    };

    addLog(`POST /courses - Creating "${newCourseName}"...`);
    
    try {
      const created = await simulateHttp.post<Course>('http://localhost:3000/courses', newCourse);
      setCourses(prev => [...prev, created]);
      setNewCourseName('');
      addLog(`POST /courses - Success: Created course ID ${created.id}`);
    } catch (err) {
      addLog('POST /courses - Error: Failed to create');
    }
  };

  // Step 82: PUT updateCourse
  const updateCourse = async (course: Course) => {
    const updated = { ...course, credits: course.credits + 1 };
    addLog(`PUT /courses/${course.id} - Updating credits...`);
    
    try {
      await simulateHttp.put<Course>(`http://localhost:3000/courses/${course.id}`, updated);
      setCourses(prev => prev.map(c => c.id === course.id ? updated : c));
      addLog(`PUT /courses/${course.id} - Success: Credits now ${updated.credits}`);
    } catch (err) {
      addLog(`PUT /courses/${course.id} - Error: Failed to update`);
    }
  };

  // Step 82: DELETE deleteCourse
  const deleteCourse = async (id: number) => {
    addLog(`DELETE /courses/${id} - Deleting...`);
    
    try {
      await simulateHttp.delete(`http://localhost:3000/courses/${id}`);
      setCourses(prev => prev.filter(c => c.id !== id));
      addLog(`DELETE /courses/${id} - Success: Course removed`);
    } catch (err) {
      addLog(`DELETE /courses/${id} - Error: Failed to delete`);
    }
  };

  useEffect(() => {
    loadCourses();
  }, []);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">🌐 Task 1: HttpClient</h2>
        <p className="text-gray-600 mb-6">Steps 78-82: GET, POST, PUT, DELETE operations</p>

        {/* Add Course Form */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <h3 className="font-semibold text-lg text-indigo-900 mb-4">Step 81: Create Course (POST)</h3>
          <div className="flex gap-2">
            <input
              type="text"
              value={newCourseName}
              onChange={(e) => setNewCourseName(e.target.value)}
              placeholder="New course name..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg"
            />
            <button
              onClick={createCourse}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              ➕ Create
            </button>
            <button
              onClick={loadCourses}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            >
              🔄 Refresh
            </button>
          </div>
        </div>

        {/* Course List */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <h3 className="font-semibold text-lg text-gray-900 mb-4">
            Steps 79 & 82: Course List (GET, PUT, DELETE)
          </h3>
          
          {isLoading && (
            <div className="flex items-center gap-3 p-4 bg-indigo-50 rounded-lg mb-4">
              <div className="animate-spin h-5 w-5 border-2 border-indigo-600 border-t-transparent rounded-full"></div>
              <span className="text-indigo-700">Loading courses...</span>
            </div>
          )}

          {errorMessage && (
            <div className="p-4 bg-red-50 text-red-700 rounded-lg mb-4">
              ❌ {errorMessage}
            </div>
          )}

          <div className="space-y-3">
            {courses.map(course => (
              <div key={course.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <span className="font-medium">{course.name}</span>
                  <span className="text-gray-500 text-sm ml-2">({course.code})</span>
                  <span className="text-indigo-600 text-sm ml-2">{course.credits} credits</span>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => updateCourse(course)}
                    className="px-3 py-1 bg-blue-100 text-blue-700 rounded text-sm hover:bg-blue-200"
                  >
                    +1 Credit (PUT)
                  </button>
                  <button
                    onClick={() => deleteCourse(course.id)}
                    className="px-3 py-1 bg-red-100 text-red-700 rounded text-sm hover:bg-red-200"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* API Log */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <h3 className="font-semibold text-lg text-gray-900 mb-4">API Request Log</h3>
          <div className="bg-gray-900 rounded-lg p-4 h-48 overflow-y-auto font-mono text-sm">
            {logs.map((log, i) => (
              <p key={i} className={`${
                log.includes('Success') ? 'text-green-400' :
                log.includes('Error') ? 'text-red-400' :
                log.includes('Loading') ? 'text-yellow-400' : 'text-gray-400'
              }`}>
                {log}
              </p>
            ))}
            {logs.length === 0 && <p className="text-gray-500">No requests yet...</p>}
          </div>
        </div>

        {/* Code Example */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <h3 className="font-semibold text-lg text-gray-900 mb-4">Service Methods</h3>
          <div className="p-4 bg-gray-900 rounded-lg text-xs font-mono overflow-x-auto">
            <p className="text-purple-400">// Step 79: GET</p>
            <p className="text-gray-300">getCourses(): Observable&lt;Course[]&gt; {'{'}</p>
            <p className="text-gray-300 ml-4">return this.http.get&lt;Course[]&gt;('http://localhost:3000/courses');</p>
            <p className="text-gray-300">{'}'}</p>
            <p className="text-purple-400 mt-2">// Step 81: POST</p>
            <p className="text-gray-300">createCourse(course: Omit&lt;Course,'id'&gt;): Observable&lt;Course&gt; {'{'}</p>
            <p className="text-gray-300 ml-4">return this.http.post&lt;Course&gt;(url, course);</p>
            <p className="text-gray-300">{'}'}</p>
          </div>
        </div>

        {/* Hints */}
        <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <h4 className="font-semibold text-yellow-800 mb-2">💡 Key Points:</h4>
          <ul className="text-sm text-yellow-700 space-y-1 list-disc list-inside">
            <li>HttpClient returns cold Observables - won't execute until subscribed</li>
            <li>Use async pipe in templates for automatic subscribe/unsubscribe</li>
            <li>Always unsubscribe to avoid memory leaks</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default HttpClientDemo;
