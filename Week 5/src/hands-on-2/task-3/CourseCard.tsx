/**
 * HANDS-ON 2 - TASK 3: @Input and @Output — Parent-Child Communication
 * 
 * STEP 20: CourseCardComponent with @Input for course data
 * STEP 21: @Output enrollRequested with EventEmitter
 * 
 * Angular:
 *   @Input() course: { id: number, name: string, code: string, credits: number };
 *   @Output() enrollRequested = new EventEmitter<number>();
 *   
 *   Template: <button (click)="enrollRequested.emit(course.id)">Enroll</button>
 * 
 * React Equivalent:
 *   - @Input → Props (course prop)
 *   - @Output with EventEmitter → Callback prop (onEnrollRequested)
 *   
 * This creates a one-way data flow:
 *   - Data flows DOWN via props (@Input)
 *   - Events bubble UP via callback props (@Output)
 */

interface Course {
  id: number;
  name: string;
  code: string;
  credits: number;
}

interface CourseCardProps {
  // ============================================
  // STEP 20: @Input() equivalent
  // Angular: @Input() course: { id: number, name: string, code: string, credits: number }
  // React: Props interface with course property
  // ============================================
  course: Course;

  // ============================================
  // STEP 21: @Output() equivalent
  // Angular: @Output() enrollRequested = new EventEmitter<number>()
  // React: Callback prop that takes course ID
  // ============================================
  onEnrollRequested: (courseId: number) => void;
}

const CourseCard = ({ course, onEnrollRequested }: CourseCardProps) => {
  // ============================================
  // STEP 21: Emit event on button click
  // Angular: <button (click)="enrollRequested.emit(course.id)">Enroll</button>
  // React: onClick={() => onEnrollRequested(course.id)}
  // ============================================
  const handleEnrollClick = () => {
    // This is equivalent to: enrollRequested.emit(course.id)
    onEnrollRequested(course.id);
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      {/* Course Header */}
      <div className="bg-gradient-to-r from-indigo-500 to-purple-500 p-4">
        <div className="flex justify-between items-start">
          {/* STEP 20: Render course.code from @Input */}
          <span className="bg-white/20 text-white px-2 py-1 rounded text-sm font-mono">
            {course.code}
          </span>
          {/* STEP 20: Render course.credits from @Input */}
          <span className="bg-white/20 text-white px-2 py-1 rounded text-sm">
            {course.credits} Credits
          </span>
        </div>
        {/* STEP 20: Render course.name from @Input */}
        <h3 className="text-xl font-bold text-white mt-2">{course.name}</h3>
      </div>

      {/* Course Body */}
      <div className="p-4">
        {/* STEP 20: Render course.id from @Input */}
        <p className="text-sm text-gray-500 mb-4">
          Course ID: <span className="font-mono">{course.id}</span>
        </p>

        {/* All four @Input fields displayed */}
        <div className="grid grid-cols-2 gap-2 mb-4 text-sm">
          <div className="bg-gray-50 p-2 rounded">
            <span className="text-gray-500">ID:</span>
            <span className="ml-1 font-medium">{course.id}</span>
          </div>
          <div className="bg-gray-50 p-2 rounded">
            <span className="text-gray-500">Code:</span>
            <span className="ml-1 font-medium">{course.code}</span>
          </div>
          <div className="bg-gray-50 p-2 rounded col-span-2">
            <span className="text-gray-500">Name:</span>
            <span className="ml-1 font-medium">{course.name}</span>
          </div>
          <div className="bg-gray-50 p-2 rounded col-span-2">
            <span className="text-gray-500">Credits:</span>
            <span className="ml-1 font-medium">{course.credits}</span>
          </div>
        </div>

        {/* ============================================
            STEP 21: Enroll button with @Output event
            Angular: <button (click)="enrollRequested.emit(course.id)">Enroll</button>
            React: <button onClick={handleEnrollClick}>Enroll</button>
            ============================================ */}
        <button
          onClick={handleEnrollClick}
          className="w-full py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium"
        >
          Enroll
        </button>
      </div>
    </div>
  );
};

export default CourseCard;
