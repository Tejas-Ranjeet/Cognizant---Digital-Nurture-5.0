import { useState, useEffect, useRef } from 'react';

/**
 * HANDS-ON 2 - TASK 2: Lifecycle Hooks
 * 
 * Steps 16-19: ngOnInit, ngOnDestroy, ngOnChanges
 * 
 * Angular → React Mapping:
 * - ngOnInit → useEffect(() => {...}, [])
 * - ngOnDestroy → useEffect cleanup function
 * - ngOnChanges → useEffect with dependencies
 */

interface Course {
  id: number;
  name: string;
  code: string;
  credits: number;
}

// Step 18: CourseCardComponent with ngOnChanges
const CourseCardComponent = ({ course, onAddCredit }: { course: Course; onAddCredit: () => void }) => {
  const prevCourseRef = useRef<Course | null>(null);

  // ngOnInit
  useEffect(() => {
    console.log(`🟢 CourseCard [${course.code}] MOUNTED (ngOnInit)`);
    return () => {
      console.log(`🔴 CourseCard [${course.code}] DESTROYED (ngOnDestroy)`);
    };
  }, []);

  // ngOnChanges - Step 18
  useEffect(() => {
    if (prevCourseRef.current) {
      console.log(`🔄 ngOnChanges [${course.code}]:`);
      console.log('   Previous:', prevCourseRef.current);
      console.log('   Current:', course);
    } else {
      console.log(`🔄 ngOnChanges [${course.code}] - Initial render`);
    }
    prevCourseRef.current = { ...course };
  }, [course]);

  return (
    <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-lg p-4 border border-purple-200">
      <div className="flex justify-between items-start mb-2">
        <span className="bg-purple-600 text-white px-2 py-1 rounded text-xs font-mono">{course.code}</span>
        <span className="bg-indigo-100 text-indigo-700 px-2 py-1 rounded text-xs">{course.credits} credits</span>
      </div>
      <h4 className="font-semibold text-gray-900 mb-3">{course.name}</h4>
      <button
        onClick={onAddCredit}
        className="w-full py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm"
      >
        ➕ Add Credit (Trigger ngOnChanges)
      </button>
    </div>
  );
};

const LifecycleHooksDemo = () => {
  const [coursesCount, setCoursesCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [showCards, setShowCards] = useState(true);

  // Step 19: Three courses for CourseCardComponent
  const [courses, setCourses] = useState<Course[]>([
    { id: 1, name: 'Introduction to Programming', code: 'CS101', credits: 3 },
    { id: 2, name: 'Advanced Mathematics', code: 'MATH201', credits: 4 },
    { id: 3, name: 'Data Structures', code: 'CS201', credits: 3 },
  ]);

  // Step 16: ngOnInit - fetch courses
  useEffect(() => {
    console.log('🟢 HomeComponent MOUNTED (ngOnInit)');
    console.log('HomeComponent initialised — courses loaded');

    const fetchCourses = async () => {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setCoursesCount(12);
      setIsLoading(false);
    };
    fetchCourses();

    // Step 17: ngOnDestroy
    return () => {
      console.log('🔴 HomeComponent DESTROYED (ngOnDestroy)');
      console.log('HomeComponent destroyed');
    };
  }, []);

  const updateCourse = (id: number) => {
    setCourses(prev => prev.map(c => c.id === id ? { ...c, credits: c.credits + 1 } : c));
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">🔄 Task 2: Lifecycle Hooks</h2>
        <p className="text-gray-600 mb-6">Steps 16-19: Open browser console (F12) to see logs</p>

        {/* Step 16: ngOnInit */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <h3 className="font-semibold text-lg text-indigo-900 mb-4">Step 16: ngOnInit</h3>
          <div className="p-4 bg-indigo-50 rounded-lg">
            {isLoading ? (
              <div className="flex items-center gap-3">
                <div className="animate-spin h-5 w-5 border-2 border-indigo-600 border-t-transparent rounded-full"></div>
                <span className="text-indigo-700">Loading courses...</span>
              </div>
            ) : (
              <p className="text-indigo-700">✅ Loaded {coursesCount} courses on init</p>
            )}
          </div>
          <div className="mt-3 p-2 bg-gray-100 rounded text-xs font-mono text-gray-600">
            Console: "HomeComponent initialised — courses loaded"
          </div>
        </div>

        {/* Step 17: ngOnDestroy */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <h3 className="font-semibold text-lg text-red-900 mb-4">Step 17: ngOnDestroy</h3>
          <p className="text-gray-600 mb-4">Toggle cards to see mount/unmount logs:</p>
          <button
            onClick={() => setShowCards(!showCards)}
            className={`px-4 py-2 rounded-lg font-medium ${
              showCards ? 'bg-red-500 text-white' : 'bg-green-500 text-white'
            }`}
          >
            {showCards ? '🗑️ Unmount Cards' : '➕ Mount Cards'}
          </button>
          <div className="mt-3 p-2 bg-gray-100 rounded text-xs font-mono text-gray-600">
            Console on unmount: "HomeComponent destroyed"
          </div>
        </div>

        {/* Steps 18 & 19: ngOnChanges with CourseCards */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="font-semibold text-lg text-purple-900 mb-4">Steps 18 & 19: ngOnChanges</h3>
          <p className="text-gray-600 mb-4">Click "Add Credit" to trigger ngOnChanges:</p>
          
          {showCards ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {courses.map(course => (
                <CourseCardComponent
                  key={course.id}
                  course={course}
                  onAddCredit={() => updateCourse(course.id)}
                />
              ))}
            </div>
          ) : (
            <div className="p-8 text-center bg-gray-100 rounded-lg text-gray-500">
              Cards unmounted - check console for ngOnDestroy logs
            </div>
          )}
        </div>

        {/* Hints */}
        <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <h4 className="font-semibold text-yellow-800 mb-2">💡 Important Notes:</h4>
          <ul className="text-sm text-yellow-700 space-y-1 list-disc list-inside">
            <li><strong>ngOnInit</strong> fires once after inputs are set — use for data fetching, not constructor</li>
            <li><strong>ngOnDestroy</strong> is critical for unsubscribing Observables and clearing timers</li>
            <li><strong>ngOnChanges</strong> fires when @Input properties change</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default LifecycleHooksDemo;
