import { useState } from 'react';

/**
 * HANDS-ON 3 - TASK 3: Custom Directive and Custom Pipe
 * 
 * Steps 33-37: Build reusable directive and pipe
 */

interface Course {
  id: number;
  name: string;
  code: string;
  credits: number | null;
}

// Step 35 & 36: Custom Pipe - creditLabel
// Transforms credits number to human-readable string
const creditLabel = (credits: number | null): string => {
  if (credits === null || credits === 0) {
    return 'No Credits';
  }
  if (credits === 1) {
    return '1 Credit';
  }
  return `${credits} Credits`;
};

// Steps 33, 34, 37: Custom Directive Component - Highlight
// Simulates Angular directive with @HostListener for mouseenter/mouseleave
const HighlightCard = ({ 
  children, 
  highlightColor = 'yellow' // Step 37: Configurable color via @Input
}: { 
  children: React.ReactNode; 
  highlightColor?: string;
}) => {
  const [isHighlighted, setIsHighlighted] = useState(false);

  // Step 33: @HostListener('mouseenter') and @HostListener('mouseleave')
  const handleMouseEnter = () => setIsHighlighted(true);
  const handleMouseLeave = () => setIsHighlighted(false);

  const colorMap: Record<string, string> = {
    yellow: 'bg-yellow-100',
    lightblue: 'bg-blue-100',
    lightgreen: 'bg-green-100',
    pink: 'bg-pink-100',
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`transition-colors duration-200 ${isHighlighted ? colorMap[highlightColor] || 'bg-yellow-100' : ''}`}
    >
      {children}
    </div>
  );
};

const CourseCard = ({ course, highlightColor }: { course: Course; highlightColor: string }) => (
  // Step 34: Apply directive to course cards
  <HighlightCard highlightColor={highlightColor}>
    <div className="bg-white rounded-lg shadow-md p-4 border">
      <div className="flex justify-between items-start mb-2">
        <span className="bg-indigo-100 text-indigo-700 px-2 py-1 rounded text-xs font-mono">
          {course.code}
        </span>
        {/* Step 36: Use the creditLabel pipe */}
        <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded text-xs">
          {creditLabel(course.credits)}
        </span>
      </div>
      <h4 className="font-semibold text-gray-900">{course.name}</h4>
      <p className="text-sm text-gray-500 mt-1">
        Raw credits value: {course.credits === null ? 'null' : course.credits}
      </p>
    </div>
  </HighlightCard>
);

const CustomDirectivePipeDemo = () => {
  const courses: Course[] = [
    { id: 1, name: 'Introduction to Programming', code: 'CS101', credits: 3 },
    { id: 2, name: 'Single Credit Seminar', code: 'SEM100', credits: 1 },
    { id: 3, name: 'No Credit Workshop', code: 'WRK000', credits: 0 },
    { id: 4, name: 'Null Credits Test', code: 'TST001', credits: null },
    { id: 5, name: 'Advanced Mathematics', code: 'MATH201', credits: 4 },
  ];

  const [highlightColor, setHighlightColor] = useState('yellow');

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">🔧 Task 3: Custom Directive & Pipe</h2>
        <p className="text-gray-600 mb-6">Steps 33-37: Reusable directive and pipe</p>

        {/* Custom Directive Demo */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <h3 className="font-semibold text-lg text-indigo-900 mb-4">
            Steps 33-34 & 37: Custom Highlight Directive
          </h3>
          
          {/* Step 37: Configurable color input */}
          <div className="mb-4">
            <label className="text-sm text-gray-600 mr-2">Highlight Color:</label>
            <select
              value={highlightColor}
              onChange={(e) => setHighlightColor(e.target.value)}
              className="border rounded px-2 py-1 text-sm"
            >
              <option value="yellow">Yellow (default)</option>
              <option value="lightblue">Light Blue</option>
              <option value="lightgreen">Light Green</option>
              <option value="pink">Pink</option>
            </select>
          </div>

          <p className="text-sm text-gray-600 mb-4">👆 Hover over cards to see the highlight effect:</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {courses.slice(0, 4).map(course => (
              <CourseCard key={course.id} course={course} highlightColor={highlightColor} />
            ))}
          </div>

          <div className="mt-4 p-3 bg-gray-100 rounded text-xs font-mono">
            <p>&lt;app-course-card appHighlight="{highlightColor}"&gt;</p>
          </div>
        </div>

        {/* Custom Pipe Demo */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <h3 className="font-semibold text-lg text-purple-900 mb-4">
            Steps 35-36: Custom creditLabel Pipe
          </h3>
          
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left">Input Value</th>
                  <th className="px-4 py-2 text-left">Pipe Output</th>
                  <th className="px-4 py-2 text-left">Template</th>
                </tr>
              </thead>
              <tbody>
                {[1, 2, 3, 0, null].map((val, idx) => (
                  <tr key={idx} className="border-t">
                    <td className="px-4 py-2 font-mono">{val === null ? 'null' : val}</td>
                    <td className="px-4 py-2 text-indigo-600 font-medium">{creditLabel(val)}</td>
                    <td className="px-4 py-2 font-mono text-xs text-gray-500">
                      {'{{ ' + val + ' | creditLabel }}'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Directive Code */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <h3 className="font-semibold text-lg text-gray-900 mb-4">Directive Implementation</h3>
          <div className="p-4 bg-gray-900 rounded-lg text-sm font-mono overflow-x-auto">
            <p className="text-purple-400">@Directive({'{'} selector: '[appHighlight]' {'}'})</p>
            <p className="text-green-400">export class HighlightDirective {'{'}</p>
            <p className="text-gray-300 ml-4">@Input() appHighlight = 'yellow';</p>
            <p className="text-gray-300 ml-4"></p>
            <p className="text-gray-300 ml-4">@HostListener('mouseenter')</p>
            <p className="text-gray-300 ml-4">onMouseEnter() {'{'}</p>
            <p className="text-gray-300 ml-8">this.el.nativeElement.style.backgroundColor = this.appHighlight;</p>
            <p className="text-gray-300 ml-4">{'}'}</p>
            <p className="text-gray-300 ml-4"></p>
            <p className="text-gray-300 ml-4">@HostListener('mouseleave')</p>
            <p className="text-gray-300 ml-4">onMouseLeave() {'{'}</p>
            <p className="text-gray-300 ml-8">this.el.nativeElement.style.backgroundColor = '';</p>
            <p className="text-gray-300 ml-4">{'}'}</p>
            <p className="text-green-400">{'}'}</p>
          </div>
        </div>

        {/* Hints */}
        <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <h4 className="font-semibold text-yellow-800 mb-2">💡 Key Points:</h4>
          <ul className="text-sm text-yellow-700 space-y-1 list-disc list-inside">
            <li>@HostListener handles events without manual add/remove - Angular cleans up automatically</li>
            <li>Pipes are pure by default - only re-run when input reference changes</li>
            <li>Set pure: false for mutable data changes (use sparingly - impacts performance)</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CustomDirectivePipeDemo;
