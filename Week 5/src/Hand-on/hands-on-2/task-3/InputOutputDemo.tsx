import { useState } from 'react';

/**
 * HANDS-ON 2 - TASK 3: @Input and @Output — Parent-Child Communication
 * 
 * Steps 20-24: Pass data down with @Input, emit events up with @Output
 */

interface Course {
  id: number;
  name: string;
  code: string;
  credits: number;
}

// Steps 20 & 21: CourseCardComponent with @Input and @Output
const CourseCardComponent = ({ 
  course, 
  onEnrollRequested 
}: { 
  course: Course;  // Step 20: @Input() course
  onEnrollRequested: (courseId: number) => void;  // Step 21: @Output() enrollRequested
}) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="bg-gradient-to-r from-indigo-500 to-purple-500 p-4">
        <div className="flex justify-between">
          <span className="bg-white/20 text-white px-2 py-1 rounded text-sm font-mono">{course.code}</span>
          <span className="bg-white/20 text-white px-2 py-1 rounded text-sm">{course.credits} Credits</span>
        </div>
        <h3 className="text-xl font-bold text-white mt-2">{course.name}</h3>
      </div>
      <div className="p-4">
        {/* Step 20: Render all four @Input fields */}
        <div className="grid grid-cols-2 gap-2 mb-4 text-sm">
          <div className="bg-gray-50 p-2 rounded">
            <span className="text-gray-500">ID:</span> <span className="font-medium">{course.id}</span>
          </div>
          <div className="bg-gray-50 p-2 rounded">
            <span className="text-gray-500">Code:</span> <span className="font-medium">{course.code}</span>
          </div>
          <div className="bg-gray-50 p-2 rounded col-span-2">
            <span className="text-gray-500">Name:</span> <span className="font-medium">{course.name}</span>
          </div>
          <div className="bg-gray-50 p-2 rounded col-span-2">
            <span className="text-gray-500">Credits:</span> <span className="font-medium">{course.credits}</span>
          </div>
        </div>
        {/* Step 21: Emit enrollRequested event */}
        <button
          onClick={() => onEnrollRequested(course.id)}
          className="w-full py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium"
        >
          Enroll
        </button>
      </div>
    </div>
  );
};

const InputOutputDemo = () => {
  // Step 22: Define courses array with 5 course objects
  const [courses] = useState<Course[]>([
    { id: 1, name: 'Introduction to Programming', code: 'CS101', credits: 3 },
    { id: 2, name: 'Advanced Mathematics', code: 'MATH201', credits: 4 },
    { id: 3, name: 'Data Structures & Algorithms', code: 'CS201', credits: 3 },
    { id: 4, name: 'Physics I: Mechanics', code: 'PHY101', credits: 4 },
    { id: 5, name: 'Technical Writing', code: 'ENG101', credits: 2 },
  ]);

  // Steps 23 & 24: Selected course ID
  const [selectedCourseId, setSelectedCourseId] = useState<number | null>(null);
  const [logs, setLogs] = useState<string[]>([]);

  // Step 23: onEnroll handler
  const onEnroll = (courseId: number) => {
    console.log('Enrolling in course: ' + courseId);
    setSelectedCourseId(courseId);
    
    const course = courses.find(c => c.id === courseId);
    if (course) {
      setLogs(prev => [`[${new Date().toLocaleTimeString()}] Enrolled in ${course.code}`, ...prev].slice(0, 5));
    }
  };

  const selectedCourse = courses.find(c => c.id === selectedCourseId);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">📤 Task 3: @Input and @Output</h2>
        <p className="text-gray-600 mb-6">Steps 20-24: Parent-Child Communication</p>

        {/* Step 22: Render CourseCardComponent for each course */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {courses.map(course => (
            <CourseCardComponent
              key={course.id}
              course={course}  // [course]="c" - @Input
              onEnrollRequested={onEnroll}  // (enrollRequested)="onEnroll($event)" - @Output
            />
          ))}
        </div>

        {/* Step 24: Display selectedCourseId with *ngIf */}
        {selectedCourseId && (
          <div className="bg-white rounded-xl shadow-md p-6 mb-6">
            <h3 className="font-semibold text-lg text-green-900 mb-3">✅ Step 24: Selected Course</h3>
            <div className="bg-green-50 p-4 rounded-lg">
              <p className="text-green-700 text-lg">
                <strong>Selected course ID:</strong> {selectedCourseId}
              </p>
              {selectedCourse && (
                <div className="mt-2 text-green-600">
                  <p><strong>Course:</strong> {selectedCourse.name}</p>
                  <p><strong>Code:</strong> {selectedCourse.code}</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Console Log Display */}
        {logs.length > 0 && (
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="font-semibold text-lg text-gray-900 mb-3">📋 Console Output</h3>
            <div className="bg-gray-900 rounded-lg p-4 font-mono text-sm">
              {logs.map((log, idx) => (
                <p key={idx} className="text-green-400">{log}</p>
              ))}
            </div>
          </div>
        )}

        {/* Data Flow Explanation */}
        <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <h4 className="font-semibold text-yellow-800 mb-2">💡 Data Flow Pattern:</h4>
          <ul className="text-sm text-yellow-700 space-y-1 list-disc list-inside">
            <li><strong>@Input:</strong> Data flows DOWN from parent to child via props</li>
            <li><strong>@Output:</strong> Events bubble UP from child to parent via EventEmitter</li>
            <li>This one-way data flow is Angular's recommended pattern</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default InputOutputDemo;
