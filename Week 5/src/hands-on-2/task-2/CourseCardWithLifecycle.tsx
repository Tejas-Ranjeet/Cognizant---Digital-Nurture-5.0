import { useEffect, useRef } from 'react';

/**
 * HANDS-ON 2 - TASK 2: CourseCard with Lifecycle Hooks
 * 
 * STEP 18: CourseCardComponent with ngOnChanges implementation
 * 
 * Angular: 
 *   @Input() course: any;
 *   ngOnChanges(changes: SimpleChanges) {
 *     console.log('Previous:', changes.course.previousValue);
 *     console.log('Current:', changes.course.currentValue);
 *   }
 * 
 * React: useEffect with dependency + useRef for previous value
 */

interface Course {
  id: number;
  name: string;
  code: string;
  credits: number;
}

interface CourseCardProps {
  course: Course;
  onAddCredit: () => void;
}

const CourseCardWithLifecycle = ({ course, onAddCredit }: CourseCardProps) => {
  // Store previous value using useRef
  const prevCourseRef = useRef<Course | null>(null);

  // ============================================
  // ngOnInit equivalent - runs once on mount
  // ============================================
  useEffect(() => {
    console.log(`🟢 CourseCard [${course.code}] MOUNTED (ngOnInit)`);

    // Cleanup on unmount - ngOnDestroy equivalent
    return () => {
      console.log(`🔴 CourseCard [${course.code}] UNMOUNTED (ngOnDestroy)`);
    };
  }, []); // Empty dependency = mount only

  // ============================================
  // STEP 18: ngOnChanges equivalent
  // Fires when course prop changes
  // Logs previous and current values
  // ============================================
  useEffect(() => {
    // Skip first render (ngOnChanges also fires on init, but we log differently)
    if (prevCourseRef.current !== null) {
      console.log(`🔄 ngOnChanges for CourseCard [${course.code}]:`);
      console.log('   Previous:', prevCourseRef.current);
      console.log('   Current:', course);
      console.log(`   Change detected: credits ${prevCourseRef.current.credits} → ${course.credits}`);
    } else {
      // First render - ngOnChanges fires with no previous value
      console.log(`🔄 ngOnChanges for CourseCard [${course.code}] - Initial render`);
      console.log('   Previous: undefined');
      console.log('   Current:', course);
    }

    // Update ref with current value for next comparison
    prevCourseRef.current = { ...course };
  }, [course]); // Dependency on course prop

  return (
    <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-lg p-4 border border-purple-200">
      <div className="flex justify-between items-start mb-2">
        <span className="bg-purple-600 text-white px-2 py-1 rounded text-xs font-mono">
          {course.code}
        </span>
        <span className="bg-indigo-100 text-indigo-700 px-2 py-1 rounded text-xs">
          {course.credits} credits
        </span>
      </div>
      
      <h4 className="font-semibold text-gray-900 mb-3">{course.name}</h4>
      
      <button
        onClick={onAddCredit}
        className="w-full py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium"
      >
        ➕ Add Credit (Trigger ngOnChanges)
      </button>
    </div>
  );
};

export default CourseCardWithLifecycle;
