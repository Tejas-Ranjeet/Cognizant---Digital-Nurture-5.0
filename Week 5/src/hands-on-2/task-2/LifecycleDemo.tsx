import { useState, useEffect } from 'react';
import CourseCardWithLifecycle from './CourseCardWithLifecycle';

/**
 * HANDS-ON 2 - TASK 2: Lifecycle Hooks Demo
 * 
 * This component demonstrates Angular lifecycle hooks in React:
 * 
 * Angular Lifecycle Hooks → React Equivalents:
 * 
 * 1. ngOnInit → useEffect(() => { ... }, [])
 *    - Fires once after component mounts
 *    - Use for data fetching, initialization
 * 
 * 2. ngOnDestroy → useEffect(() => { return () => { ... } }, [])
 *    - Fires when component unmounts
 *    - Use for cleanup: unsubscribe, clear timers
 * 
 * 3. ngOnChanges → useEffect(() => { ... }, [dependency])
 *    - Fires when input props change
 *    - Receives previous and current values
 */

interface Course {
  id: number;
  name: string;
  code: string;
  credits: number;
}

const LifecycleDemo = () => {
  const [coursesCount, setCoursesCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [showCourseCards, setShowCourseCards] = useState<boolean>(true);

  // Sample courses for CourseCard demonstration
  const [courses, setCourses] = useState<Course[]>([
    { id: 1, name: 'Introduction to Programming', code: 'CS101', credits: 3 },
    { id: 2, name: 'Advanced Mathematics', code: 'MATH201', credits: 4 },
    { id: 3, name: 'Data Structures', code: 'CS201', credits: 3 },
  ]);

  // ============================================
  // STEP 16: ngOnInit equivalent
  // Angular: ngOnInit() { this.loadCourses(); console.log('HomeComponent initialised — courses loaded'); }
  // React: useEffect with empty dependency array
  // ============================================
  useEffect(() => {
    console.log('🟢 LifecycleDemo MOUNTED (ngOnInit equivalent)');
    console.log('HomeComponent initialised — courses loaded');

    // Simulate fetching courses count
    const fetchCourses = async () => {
      setIsLoading(true);
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      setCoursesCount(12);
      setIsLoading(false);
      console.log('📚 Courses data loaded: 12 courses available');
    };

    fetchCourses();

    // ============================================
    // STEP 17: ngOnDestroy equivalent
    // Angular: ngOnDestroy() { console.log('HomeComponent destroyed'); }
    // React: Return cleanup function from useEffect
    // ============================================
    return () => {
      console.log('🔴 LifecycleDemo UNMOUNTED (ngOnDestroy equivalent)');
      console.log('HomeComponent destroyed');
    };
  }, []); // Empty array = run once on mount

  // Function to update a course (triggers ngOnChanges in children)
  const updateCourse = (courseId: number) => {
    setCourses(prevCourses =>
      prevCourses.map(course =>
        course.id === courseId
          ? { ...course, credits: course.credits + 1 }
          : course
      )
    );
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          📝 Task 2: Lifecycle Hooks Demo
        </h2>
        <p className="text-gray-600 mb-6">
          Open the browser console (F12) to see lifecycle hook logs.
        </p>

        {/* ngOnInit Demo */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <h3 className="font-semibold text-lg text-indigo-900 mb-4">
            Step 16: ngOnInit (useEffect on Mount)
          </h3>
          
          <div className="p-4 bg-indigo-50 rounded-lg">
            {isLoading ? (
              <div className="flex items-center gap-3">
                <div className="animate-spin h-5 w-5 border-2 border-indigo-600 border-t-transparent rounded-full"></div>
                <span className="text-indigo-700">Loading courses...</span>
              </div>
            ) : (
              <div className="text-indigo-700">
                <p className="font-medium">✅ Courses loaded on init!</p>
                <p className="text-2xl font-bold mt-2">{coursesCount} courses available</p>
              </div>
            )}
          </div>

          <div className="mt-4 p-3 bg-gray-100 rounded-lg">
            <p className="text-sm text-gray-600 font-mono">
              Console: "HomeComponent initialised — courses loaded"
            </p>
          </div>
        </div>

        {/* ngOnDestroy Demo */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <h3 className="font-semibold text-lg text-red-900 mb-4">
            Step 17: ngOnDestroy (Cleanup on Unmount)
          </h3>
          
          <p className="text-gray-600 mb-4">
            Navigate away from this page and check the console to see the destroy log.
            Or toggle the course cards below to see mount/unmount in action.
          </p>

          <button
            onClick={() => setShowCourseCards(!showCourseCards)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              showCourseCards
                ? 'bg-red-500 text-white hover:bg-red-600'
                : 'bg-green-500 text-white hover:bg-green-600'
            }`}
          >
            {showCourseCards ? '🗑️ Unmount Course Cards' : '➕ Mount Course Cards'}
          </button>

          <div className="mt-4 p-3 bg-gray-100 rounded-lg">
            <p className="text-sm text-gray-600 font-mono">
              Console on unmount: "HomeComponent destroyed"
            </p>
          </div>
        </div>

        {/* ngOnChanges Demo - Step 18 & 19 */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="font-semibold text-lg text-purple-900 mb-4">
            Step 18 & 19: ngOnChanges (Props Change Detection)
          </h3>
          
          <p className="text-gray-600 mb-4">
            Click "Add Credit" on any course card to trigger ngOnChanges. 
            Watch the console for previous/current value logs.
          </p>

          {showCourseCards ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {courses.map(course => (
                <CourseCardWithLifecycle
                  key={course.id}
                  course={course}
                  onAddCredit={() => updateCourse(course.id)}
                />
              ))}
            </div>
          ) : (
            <div className="p-8 text-center bg-gray-100 rounded-lg">
              <p className="text-gray-500">Course cards unmounted. Check console for ngOnDestroy log.</p>
            </div>
          )}

          <div className="mt-4 p-3 bg-gray-100 rounded-lg">
            <p className="text-sm text-gray-600 font-mono">
              Console on change: "ngOnChanges - Previous: &#123;...&#125;, Current: &#123;...&#125;"
            </p>
          </div>
        </div>

        {/* Lifecycle Summary */}
        <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <h4 className="font-semibold text-yellow-800 mb-2">💡 Important Notes:</h4>
          <ul className="text-sm text-yellow-700 space-y-1 list-disc list-inside">
            <li><strong>ngOnInit</strong> fires once after inputs are set — use it for data fetching, not the constructor.</li>
            <li><strong>ngOnDestroy</strong> is critical for unsubscribing from Observables and clearing timers — prevents memory leaks.</li>
            <li><strong>ngOnChanges</strong> fires whenever @Input properties change — useful for reacting to parent data updates.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default LifecycleDemo;
