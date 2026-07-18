import { useState } from 'react';

/**
 * HANDS-ON 3 - TASK 2: Attribute Directives — ngClass and ngStyle
 * 
 * Steps 29-32: Dynamic CSS classes and inline styles
 */

interface Course {
  id: number;
  name: string;
  code: string;
  credits: number;
  gradeStatus: 'passed' | 'failed' | 'pending';
  isEnrolled: boolean;
}

const CourseCard = ({ course, onToggleExpand: _onToggleExpand }: { course: Course; onToggleExpand: () => void }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Step 30: Dynamic border color based on gradeStatus using ngStyle
  const getBorderStyle = () => {
    switch (course.gradeStatus) {
      case 'passed': return { borderLeftColor: '#22c55e', borderLeftWidth: '4px' };
      case 'failed': return { borderLeftColor: '#ef4444', borderLeftWidth: '4px' };
      case 'pending': return { borderLeftColor: '#9ca3af', borderLeftWidth: '4px' };
      default: return {};
    }
  };

  // Step 32: Getter for cardClasses - keeps templates clean
  const cardClasses = {
    'card--enrolled': course.isEnrolled,  // Step 29
    'card--full': course.credits >= 4,     // Step 29
    'expanded': isExpanded,                 // Step 31
  };

  // Build className string from object
  const getClassNames = () => {
    const base = 'bg-white rounded-lg shadow-md p-4 transition-all duration-300';
    const dynamic = Object.entries(cardClasses)
      .filter(([_, value]) => value)
      .map(([key]) => key)
      .join(' ');
    return `${base} ${dynamic}`;
  };

  return (
    <div 
      className={getClassNames()}
      style={getBorderStyle()}
    >
      <div className="flex justify-between items-start mb-2">
        <span className="bg-indigo-100 text-indigo-700 px-2 py-1 rounded text-xs font-mono">
          {course.code}
        </span>
        <div className="flex gap-1">
          {course.isEnrolled && (
            <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs">Enrolled</span>
          )}
          {course.credits >= 4 && (
            <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded text-xs">Full Course</span>
          )}
        </div>
      </div>
      
      <h4 className="font-semibold text-gray-900">{course.name}</h4>
      <p className="text-sm text-gray-500 mb-3">{course.credits} credits • {course.gradeStatus}</p>

      {/* Step 31: Toggle expanded state */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="text-sm text-indigo-600 hover:text-indigo-800"
      >
        {isExpanded ? '▲ Hide Details' : '▼ Show Details'}
      </button>

      {/* Expanded content */}
      {isExpanded && (
        <div className="mt-3 p-3 bg-gray-50 rounded-lg text-sm text-gray-600">
          <p>Course ID: {course.id}</p>
          <p>Status: {course.gradeStatus}</p>
          <p>Enrolled: {course.isEnrolled ? 'Yes' : 'No'}</p>
        </div>
      )}

      {/* CSS Classes Applied */}
      <div className="mt-3 text-xs text-gray-400">
        Classes: {Object.entries(cardClasses).filter(([_, v]) => v).map(([k]) => k).join(', ') || 'none'}
      </div>
    </div>
  );
};

const AttributeDirectivesDemo = () => {
  const [courses, setCourses] = useState<Course[]>([
    { id: 1, name: 'Introduction to Programming', code: 'CS101', credits: 3, gradeStatus: 'passed', isEnrolled: true },
    { id: 2, name: 'Advanced Mathematics', code: 'MATH201', credits: 4, gradeStatus: 'failed', isEnrolled: false },
    { id: 3, name: 'Data Structures', code: 'CS201', credits: 3, gradeStatus: 'pending', isEnrolled: true },
    { id: 4, name: 'Physics I', code: 'PHY101', credits: 4, gradeStatus: 'passed', isEnrolled: false },
  ]);

  const toggleEnrollment = (id: number) => {
    setCourses(prev => prev.map(c => c.id === id ? { ...c, isEnrolled: !c.isEnrolled } : c));
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">🎨 Task 2: Attribute Directives</h2>
        <p className="text-gray-600 mb-6">Steps 29-32: ngClass and ngStyle</p>

        {/* CSS Definitions */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <h3 className="font-semibold text-lg text-indigo-900 mb-4">Step 29: CSS Classes Defined</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-3 bg-green-50 rounded-lg border-l-4 border-green-500">
              <code className="text-sm">.card--enrolled</code>
              <p className="text-xs text-gray-500 mt-1">Applied when course is enrolled</p>
            </div>
            <div className="p-3 bg-purple-50 rounded-lg border-l-4 border-purple-500">
              <code className="text-sm">.card--full</code>
              <p className="text-xs text-gray-500 mt-1">Applied when credits &gt;= 4</p>
            </div>
          </div>
        </div>

        {/* Course Cards */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <h3 className="font-semibold text-lg text-purple-900 mb-4">Steps 30-32: Dynamic Styling</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            {courses.map(course => (
              <div key={course.id}>
                <CourseCard course={course} onToggleExpand={() => {}} />
                <button
                  onClick={() => toggleEnrollment(course.id)}
                  className="mt-2 w-full py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded"
                >
                  Toggle Enrollment
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Code Examples */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <h3 className="font-semibold text-lg text-gray-900 mb-4">Step 32: Using Getter for Clean Templates</h3>
          <div className="p-4 bg-gray-900 rounded-lg text-sm font-mono">
            <p className="text-purple-400">// Component class</p>
            <p className="text-green-400">get cardClasses() {'{'}</p>
            <p className="text-gray-300 ml-4">return {'{'}</p>
            <p className="text-gray-300 ml-8">'card--enrolled': this.course.isEnrolled,</p>
            <p className="text-gray-300 ml-8">'card--full': this.course.credits &gt;= 4,</p>
            <p className="text-gray-300 ml-8">'expanded': this.isExpanded</p>
            <p className="text-gray-300 ml-4">{'}'};</p>
            <p className="text-green-400">{'}'}</p>
            <p className="text-purple-400 mt-2">// Template</p>
            <p className="text-gray-300">&lt;div [ngClass]="cardClasses"&gt;</p>
          </div>
          <p className="mt-3 text-sm text-gray-600">
            ✅ Using getters keeps templates clean and moves logic to the component class where it's testable.
          </p>
        </div>

        {/* Hints */}
        <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <h4 className="font-semibold text-yellow-800 mb-2">💡 Best Practices:</h4>
          <ul className="text-sm text-yellow-700 space-y-1 list-disc list-inside">
            <li>Prefer [ngClass] over [ngStyle] - keep styles in CSS files</li>
            <li>Use [ngStyle] only for truly dynamic values (colors from data, etc.)</li>
            <li>[ngClass] accepts string, array, or object - object form is most readable</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AttributeDirectivesDemo;
