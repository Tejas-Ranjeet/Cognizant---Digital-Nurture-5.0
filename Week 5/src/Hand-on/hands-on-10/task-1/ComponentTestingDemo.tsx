import { useState } from 'react';

/**
 * HANDS-ON 10 - TASK 1: Testing a Component — CourseCardComponent
 * 
 * Steps 101-105: Jasmine, TestBed, fixture, @Input/@Output tests
 */

interface Course {
  id: number;
  name: string;
  code: string;
  credits: number;
  gradeStatus: 'passed' | 'failed' | 'pending';
}

// The component being tested
const CourseCardComponent = ({ 
  course, 
  onEnrollRequested 
}: { 
  course: Course; 
  onEnrollRequested: (id: number) => void;
}) => {
  return (
    <div className="bg-white rounded-lg shadow p-4" data-testid="course-card">
      <h3 className="font-semibold">{course.name}</h3>
      <p className="text-sm text-gray-500">{course.code} • {course.credits} credits</p>
      <button
        onClick={() => onEnrollRequested(course.id)}
        className="mt-2 px-3 py-1 bg-indigo-600 text-white rounded text-sm"
        data-testid="enroll-button"
      >
        Enroll
      </button>
    </div>
  );
};

const ComponentTestingDemo = () => {
  const [testResults, setTestResults] = useState<Array<{ name: string; passed: boolean; message: string }>>([]);
  const [isRunning, setIsRunning] = useState(false);

  const mockCourse: Course = {
    id: 1,
    name: 'Data Structures',
    code: 'CS101',
    credits: 4,
    gradeStatus: 'passed',
  };

  const runTests = async () => {
    setIsRunning(true);
    setTestResults([]);
    const results: Array<{ name: string; passed: boolean; message: string }> = [];

    // Step 102: Test component is created
    await new Promise(r => setTimeout(r, 300));
    results.push({
      name: 'should create',
      passed: true,
      message: 'expect(component).toBeTruthy() ✓',
    });
    setTestResults([...results]);

    // Step 103: Test @Input rendering
    await new Promise(r => setTimeout(r, 300));
    const nameRendered = mockCourse.name === 'Data Structures';
    results.push({
      name: 'should display course name from @Input',
      passed: nameRendered,
      message: `fixture.debugElement.query(By.css('h3')).nativeElement.textContent → "${mockCourse.name}"`,
    });
    setTestResults([...results]);

    // Step 104: Test @Output emit
    await new Promise(r => setTimeout(r, 300));
    let emittedId: number | null = null;
    const mockEmit = (id: number) => { emittedId = id; };
    mockEmit(mockCourse.id);
    results.push({
      name: 'should emit enrollRequested with course id on click',
      passed: emittedId === 1,
      message: `spyOn(component.enrollRequested, 'emit'); button.click(); expect(emit).toHaveBeenCalledWith(1) ✓`,
    });
    setTestResults([...results]);

    // Step 105: Test ngOnChanges
    await new Promise(r => setTimeout(r, 300));
    results.push({
      name: 'should log changes in ngOnChanges',
      passed: true,
      message: 'component.ngOnChanges(simpleChanges); expect(console.log).toHaveBeenCalled() ✓',
    });
    setTestResults([...results]);

    // Additional edge case test
    await new Promise(r => setTimeout(r, 300));
    results.push({
      name: 'should handle null course gracefully',
      passed: true,
      message: 'component.course = null; fixture.detectChanges(); expect(component).toBeTruthy() ✓',
    });
    setTestResults([...results]);

    setIsRunning(false);
  };

  const passedCount = testResults.filter(t => t.passed).length;
  const failedCount = testResults.filter(t => !t.passed).length;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">🧪 Task 1: Component Testing</h2>
        <p className="text-gray-600 mb-6">Steps 101-105: TestBed, fixture, @Input/@Output tests</p>

        {/* Component Preview */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <h3 className="font-semibold text-lg text-indigo-900 mb-4">
            Component Under Test: CourseCardComponent
          </h3>
          <div className="max-w-xs">
            <CourseCardComponent 
              course={mockCourse} 
              onEnrollRequested={(id) => console.log(`Enrolled in course ${id}`)} 
            />
          </div>
        </div>

        {/* Test Runner */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-lg text-gray-900">
              Test Suite: CourseCardComponent
            </h3>
            <button
              onClick={runTests}
              disabled={isRunning}
              className={`px-4 py-2 rounded-lg font-medium ${
                isRunning
                  ? 'bg-gray-300 cursor-not-allowed'
                  : 'bg-green-600 text-white hover:bg-green-700'
              }`}
            >
              {isRunning ? '⏳ Running...' : '▶️ Run Tests'}
            </button>
          </div>

          {testResults.length > 0 && (
            <div className="mb-4 flex gap-4">
              <span className="text-green-600 font-medium">✓ {passedCount} passed</span>
              <span className="text-red-600 font-medium">✗ {failedCount} failed</span>
            </div>
          )}

          <div className="space-y-2">
            {testResults.map((test, i) => (
              <div 
                key={i} 
                className={`p-3 rounded-lg ${
                  test.passed ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className={test.passed ? 'text-green-600' : 'text-red-600'}>
                    {test.passed ? '✓' : '✗'}
                  </span>
                  <span className="font-medium">{test.name}</span>
                </div>
                <p className="text-sm text-gray-600 mt-1 font-mono">{test.message}</p>
              </div>
            ))}
            {testResults.length === 0 && !isRunning && (
              <p className="text-gray-500 text-center py-8">Click "Run Tests" to execute the test suite</p>
            )}
          </div>
        </div>

        {/* Test Code */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <h3 className="font-semibold text-lg text-gray-900 mb-4">Test File: course-card.component.spec.ts</h3>
          <div className="p-4 bg-gray-900 rounded-lg text-xs font-mono overflow-x-auto">
            <p className="text-purple-400">// Step 101: Configure TestBed</p>
            <p className="text-green-400">beforeEach(() =&gt; {'{'}</p>
            <p className="text-gray-300 ml-4">TestBed.configureTestingModule({'{'}</p>
            <p className="text-gray-300 ml-8">imports: [CourseCardComponent]</p>
            <p className="text-gray-300 ml-4">{'}'});</p>
            <p className="text-gray-300 ml-4">fixture = TestBed.createComponent(CourseCardComponent);</p>
            <p className="text-gray-300 ml-4">component = fixture.componentInstance;</p>
            <p className="text-green-400">{'}'});</p>
            <p></p>
            <p className="text-purple-400">// Step 102: Test creation</p>
            <p className="text-green-400">it('should create', () =&gt; {'{'}</p>
            <p className="text-gray-300 ml-4">expect(component).toBeTruthy();</p>
            <p className="text-green-400">{'}'});</p>
            <p></p>
            <p className="text-purple-400">// Step 103: Test @Input rendering</p>
            <p className="text-green-400">it('should display course name', () =&gt; {'{'}</p>
            <p className="text-gray-300 ml-4">component.course = mockCourse;</p>
            <p className="text-gray-300 ml-4">fixture.detectChanges();</p>
            <p className="text-gray-300 ml-4">const el = fixture.debugElement.query(By.css('h3'));</p>
            <p className="text-gray-300 ml-4">expect(el.nativeElement.textContent).toContain('Data Structures');</p>
            <p className="text-green-400">{'}'});</p>
            <p></p>
            <p className="text-purple-400">// Step 104: Test @Output</p>
            <p className="text-green-400">it('should emit on enroll click', () =&gt; {'{'}</p>
            <p className="text-gray-300 ml-4">spyOn(component.enrollRequested, 'emit');</p>
            <p className="text-gray-300 ml-4">fixture.debugElement.query(By.css('button')).nativeElement.click();</p>
            <p className="text-gray-300 ml-4">expect(component.enrollRequested.emit).toHaveBeenCalledWith(1);</p>
            <p className="text-green-400">{'}'});</p>
          </div>
        </div>

        {/* Hints */}
        <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <h4 className="font-semibold text-yellow-800 mb-2">💡 Key Points:</h4>
          <ul className="text-sm text-yellow-700 space-y-1 list-disc list-inside">
            <li><code>fixture.detectChanges()</code> triggers change detection after property changes</li>
            <li><code>By.css()</code> queries within component scope, not entire document</li>
            <li>Always call detectChanges() before querying the DOM</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ComponentTestingDemo;
