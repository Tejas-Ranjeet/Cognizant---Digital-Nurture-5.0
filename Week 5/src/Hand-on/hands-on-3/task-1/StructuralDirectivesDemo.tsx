import { useState, useEffect } from 'react';

/**
 * HANDS-ON 3 - TASK 1: Structural Directives
 * 
 * Steps 25-28: *ngIf, *ngFor, *ngSwitch
 */

interface Course {
  id: number;
  name: string;
  code: string;
  credits: number;
  gradeStatus: 'passed' | 'failed' | 'pending';
}

// Step 26: trackBy function - improves performance by tracking items by ID
const trackByCourseId = (_index: number, course: Course) => course.id;
// Why trackBy improves performance:
// Without trackBy, Angular re-renders ALL list items when the array changes.
// With trackBy, only changed items are re-rendered because Angular tracks by ID.

const CourseCard = ({ course, index }: { course: Course; index: number }) => {
  // Step 27: *ngSwitch for grade status badge
  const renderGradeBadge = () => {
    switch (course.gradeStatus) {
      case 'passed':
        return <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-medium">✅ Passed</span>;
      case 'failed':
        return <span className="bg-red-100 text-red-700 px-2 py-1 rounded text-xs font-medium">❌ Failed</span>;
      case 'pending':
        return <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs font-medium">⏳ Pending</span>;
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="flex justify-between items-start mb-2">
        <span className="text-xs text-gray-400">Index: {index}</span>
        {renderGradeBadge()}
      </div>
      <h4 className="font-semibold text-gray-900">{course.name}</h4>
      <p className="text-sm text-gray-500">{course.code} • {course.credits} credits</p>
    </div>
  );
};

const StructuralDirectivesDemo = () => {
  // Step 25: Loading state with *ngIf
  const [isLoading, setIsLoading] = useState(true);
  
  const [courses, setCourses] = useState<Course[]>([
    { id: 1, name: 'Introduction to Programming', code: 'CS101', credits: 3, gradeStatus: 'passed' },
    { id: 2, name: 'Advanced Mathematics', code: 'MATH201', credits: 4, gradeStatus: 'failed' },
    { id: 3, name: 'Data Structures', code: 'CS201', credits: 3, gradeStatus: 'pending' },
    { id: 4, name: 'Physics I', code: 'PHY101', credits: 4, gradeStatus: 'passed' },
    { id: 5, name: 'Technical Writing', code: 'ENG101', credits: 2, gradeStatus: 'pending' },
  ]);

  // Step 25: Simulate loading with setTimeout
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const clearCourses = () => setCourses([]);
  const resetCourses = () => {
    setCourses([
      { id: 1, name: 'Introduction to Programming', code: 'CS101', credits: 3, gradeStatus: 'passed' },
      { id: 2, name: 'Advanced Mathematics', code: 'MATH201', credits: 4, gradeStatus: 'failed' },
      { id: 3, name: 'Data Structures', code: 'CS201', credits: 3, gradeStatus: 'pending' },
    ]);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">🔀 Task 1: Structural Directives</h2>
        <p className="text-gray-600 mb-6">Steps 25-28: *ngIf, *ngFor, *ngSwitch</p>

        {/* Step 25: *ngIf for loading */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <h3 className="font-semibold text-lg text-indigo-900 mb-4">Step 25: *ngIf Loading State</h3>
          
          {isLoading ? (
            // *ngIf="isLoading"
            <div className="p-4 bg-indigo-50 rounded-lg flex items-center gap-3">
              <div className="animate-spin h-5 w-5 border-2 border-indigo-600 border-t-transparent rounded-full"></div>
              <p className="text-indigo-700">Loading courses...</p>
            </div>
          ) : (
            // *ngIf="!isLoading"
            <div className="p-4 bg-green-50 rounded-lg">
              <p className="text-green-700">✅ Courses loaded! (waited 1.5 seconds)</p>
            </div>
          )}
          
          <div className="mt-3 p-2 bg-gray-100 rounded text-xs font-mono">
            &lt;p *ngIf="isLoading"&gt;Loading courses...&lt;/p&gt;
          </div>
        </div>

        {/* Step 26 & 27: *ngFor with trackBy and *ngSwitch */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <h3 className="font-semibold text-lg text-purple-900 mb-4">
            Steps 26 & 27: *ngFor with trackBy + *ngSwitch
          </h3>
          
          <div className="flex gap-2 mb-4">
            <button onClick={clearCourses} className="px-3 py-1 bg-red-100 text-red-700 rounded text-sm">
              Clear All
            </button>
            <button onClick={resetCourses} className="px-3 py-1 bg-green-100 text-green-700 rounded text-sm">
              Reset Courses
            </button>
          </div>

          {/* Step 28: *ngIf with else template */}
          {courses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {courses.map((course, index) => (
                <CourseCard 
                  key={trackByCourseId(index, course)} 
                  course={course} 
                  index={index} 
                />
              ))}
            </div>
          ) : (
            // Step 28: ng-template #noCourses
            <div className="p-8 text-center bg-gray-100 rounded-lg">
              <p className="text-gray-500">📭 No courses available.</p>
            </div>
          )}

          <div className="mt-4 p-3 bg-gray-100 rounded text-xs font-mono space-y-1">
            <p>&lt;app-course-card *ngFor="let course of courses;</p>
            <p>  let i = index; trackBy: trackByCourseId"&gt;</p>
            <p className="text-green-600">// trackBy prevents re-rendering unchanged items</p>
          </div>
        </div>

        {/* Hints */}
        <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <h4 className="font-semibold text-yellow-800 mb-2">💡 Key Points:</h4>
          <ul className="text-sm text-yellow-700 space-y-1 list-disc list-inside">
            <li>*ngIf with else uses ng-template - element is removed from DOM, not just hidden</li>
            <li>trackBy is essential for large lists - only changed items are re-rendered</li>
            <li>*ngSwitch is cleaner than multiple *ngIf for multiple conditions</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default StructuralDirectivesDemo;
