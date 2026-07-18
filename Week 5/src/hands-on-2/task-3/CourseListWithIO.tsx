import { useState } from 'react';
import CourseCard from './CourseCard';

/**
 * HANDS-ON 2 - TASK 3: Parent Component for @Input/@Output Demo
 * 
 * STEP 22: CourseListComponent with courses array
 * STEP 23: onEnroll handler that logs and updates selectedCourseId
 * STEP 24: Display selectedCourseId with *ngIf
 * 
 * Angular Template:
 *   <app-course-card 
 *     *ngFor="let c of courses" 
 *     [course]="c" 
 *     (enrollRequested)="onEnroll($event)">
 *   </app-course-card>
 *   
 *   <p *ngIf="selectedCourseId">Selected course ID: {{ selectedCourseId }}</p>
 * 
 * React Equivalent:
 *   {courses.map(c => (
 *     <CourseCard 
 *       key={c.id}
 *       course={c} 
 *       onEnrollRequested={onEnroll}
 *     />
 *   ))}
 *   
 *   {selectedCourseId && <p>Selected course ID: {selectedCourseId}</p>}
 */

interface Course {
  id: number;
  name: string;
  code: string;
  credits: number;
}

const CourseListWithIO = () => {
  // ============================================
  // STEP 22: Define courses array with 5 course objects
  // ============================================
  const [courses] = useState<Course[]>([
    { id: 1, name: 'Introduction to Programming', code: 'CS101', credits: 3 },
    { id: 2, name: 'Advanced Mathematics', code: 'MATH201', credits: 4 },
    { id: 3, name: 'Data Structures & Algorithms', code: 'CS201', credits: 3 },
    { id: 4, name: 'Physics I: Mechanics', code: 'PHY101', credits: 4 },
    { id: 5, name: 'Technical Writing', code: 'ENG101', credits: 2 },
  ]);

  // ============================================
  // STEP 23 & 24: Selected course ID state
  // ============================================
  const [selectedCourseId, setSelectedCourseId] = useState<number | null>(null);
  const [enrollmentLog, setEnrollmentLog] = useState<string[]>([]);

  // ============================================
  // STEP 23: onEnroll handler
  // Angular: onEnroll(courseId: number) { console.log('Enrolling in course: ' + courseId); this.selectedCourseId = courseId; }
  // ============================================
  const onEnroll = (courseId: number) => {
    // Log to console as specified
    console.log('Enrolling in course: ' + courseId);
    
    // Update selectedCourseId
    setSelectedCourseId(courseId);
    
    // Add to enrollment log for UI display
    const course = courses.find(c => c.id === courseId);
    if (course) {
      const logEntry = `[${new Date().toLocaleTimeString()}] Enrolled in ${course.code}: ${course.name}`;
      setEnrollmentLog(prev => [logEntry, ...prev].slice(0, 5)); // Keep last 5 entries
    }
  };

  // Get selected course details
  const selectedCourse = courses.find(c => c.id === selectedCourseId);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          📝 Task 3: @Input and @Output Demo
        </h2>
        <p className="text-gray-600 mb-6">
          Click "Enroll" on any course card to see parent-child communication in action.
        </p>

        {/* ============================================
            STEP 22: Render CourseCard for each course
            Angular: <app-course-card *ngFor="let c of courses" [course]="c" (enrollRequested)="onEnroll($event)">
            React: {courses.map(c => <CourseCard key={c.id} course={c} onEnrollRequested={onEnroll} />)}
            ============================================ */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {courses.map(course => (
            <CourseCard
              key={course.id}
              course={course}
              onEnrollRequested={onEnroll}
            />
          ))}
        </div>

        {/* ============================================
            STEP 24: Display selectedCourseId with *ngIf
            Angular: <p *ngIf="selectedCourseId">Selected course ID: {{ selectedCourseId }}</p>
            React: {selectedCourseId && <p>...</p>}
            ============================================ */}
        {selectedCourseId && (
          <div className="bg-white rounded-xl shadow-md p-6 mb-6">
            <h3 className="font-semibold text-lg text-green-900 mb-3">
              ✅ Course Selected
            </h3>
            <div className="bg-green-50 p-4 rounded-lg">
              <p className="text-green-700 text-lg">
                <strong>Selected course ID:</strong> {selectedCourseId}
              </p>
              {selectedCourse && (
                <div className="mt-2 text-green-600">
                  <p><strong>Course:</strong> {selectedCourse.name}</p>
                  <p><strong>Code:</strong> {selectedCourse.code}</p>
                  <p><strong>Credits:</strong> {selectedCourse.credits}</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Enrollment Log */}
        {enrollmentLog.length > 0 && (
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="font-semibold text-lg text-gray-900 mb-3">
              📋 Enrollment Log (Console Output)
            </h3>
            <div className="bg-gray-900 rounded-lg p-4 font-mono text-sm">
              {enrollmentLog.map((log, index) => (
                <p key={index} className="text-green-400">
                  {log}
                </p>
              ))}
            </div>
          </div>
        )}

        {/* Explanation */}
        <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <h4 className="font-semibold text-yellow-800 mb-2">💡 Data Flow Pattern:</h4>
          <ul className="text-sm text-yellow-700 space-y-1 list-disc list-inside">
            <li><strong>@Input (Props):</strong> Data flows DOWN from parent (CourseList) to child (CourseCard)</li>
            <li><strong>@Output (Callbacks):</strong> Events bubble UP from child to parent via EventEmitter</li>
            <li>This one-way data flow is Angular's recommended pattern for parent-child communication</li>
            <li>Using <code>EventEmitter&lt;T&gt;</code> with generic type T makes events strongly typed</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CourseListWithIO;
