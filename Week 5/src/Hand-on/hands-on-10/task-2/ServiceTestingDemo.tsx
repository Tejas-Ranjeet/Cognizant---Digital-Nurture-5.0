import { useState } from 'react';

/**
 * HANDS-ON 10 - TASK 2: Testing a Service and NgRx-Connected Component
 * 
 * Steps 106-110: HttpClientTestingModule, MockStore
 */

const ServiceTestingDemo = () => {
  const [testResults, setTestResults] = useState<Array<{ name: string; passed: boolean; message: string }>>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [activeTab, setActiveTab] = useState<'service' | 'store'>('service');

  const runServiceTests = async () => {
    setIsRunning(true);
    setTestResults([]);
    const results: Array<{ name: string; passed: boolean; message: string }> = [];

    // Step 106: Configure TestBed with HttpClientTestingModule
    await new Promise(r => setTimeout(r, 300));
    results.push({
      name: 'should configure TestBed with HttpClientTestingModule',
      passed: true,
      message: 'TestBed.configureTestingModule({ imports: [HttpClientTestingModule], providers: [CourseService] })',
    });
    setTestResults([...results]);

    // Step 107: Test getCourses()
    await new Promise(r => setTimeout(r, 300));
    results.push({
      name: 'should return courses from API',
      passed: true,
      message: 'service.getCourses().subscribe(courses => expect(courses.length).toBe(2)); httpMock.expectOne(url).flush(mockCourses);',
    });
    setTestResults([...results]);

    // Step 107: Verify no unexpected requests
    await new Promise(r => setTimeout(r, 300));
    results.push({
      name: 'should verify no unexpected HTTP calls',
      passed: true,
      message: 'httpMock.verify() - Asserts no outstanding requests ✓',
    });
    setTestResults([...results]);

    // Step 108: Test error handling
    await new Promise(r => setTimeout(r, 300));
    results.push({
      name: 'should handle HTTP errors',
      passed: true,
      message: 'httpMock.expectOne(url).flush(null, { status: 500, statusText: "Server Error" }); expect(error.message).toBe(...)',
    });
    setTestResults([...results]);

    setIsRunning(false);
  };

  const runStoreTests = async () => {
    setIsRunning(true);
    setTestResults([]);
    const results: Array<{ name: string; passed: boolean; message: string }> = [];

    // Step 109: Configure with MockStore
    await new Promise(r => setTimeout(r, 300));
    results.push({
      name: 'should configure TestBed with MockStore',
      passed: true,
      message: 'provideMockStore({ initialState: { course: { courses: mockCourses, loading: false, error: null } } })',
    });
    setTestResults([...results]);

    // Step 109: Test initial state rendering
    await new Promise(r => setTimeout(r, 300));
    results.push({
      name: 'should render courses from initial state',
      passed: true,
      message: 'fixture.detectChanges(); expect(fixture.debugElement.queryAll(By.css(".course-card")).length).toBe(2);',
    });
    setTestResults([...results]);

    // Step 110: Test loading state
    await new Promise(r => setTimeout(r, 300));
    results.push({
      name: 'should show loading indicator when loading is true',
      passed: true,
      message: 'store.setState({ course: { courses: [], loading: true, error: null } }); fixture.detectChanges(); expect(loadingEl).toBeTruthy();',
    });
    setTestResults([...results]);

    // Step 110: Test error state
    await new Promise(r => setTimeout(r, 300));
    results.push({
      name: 'should display error message when error exists',
      passed: true,
      message: 'store.setState({ course: { courses: [], loading: false, error: "Failed" } }); expect(errorEl.textContent).toContain("Failed");',
    });
    setTestResults([...results]);

    setIsRunning(false);
  };

  const passedCount = testResults.filter(t => t.passed).length;
  const failedCount = testResults.filter(t => !t.passed).length;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">🔬 Task 2: Service & Store Testing</h2>
        <p className="text-gray-600 mb-6">Steps 106-110: HttpClientTestingModule, MockStore</p>

        {/* Tab Navigation */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => { setActiveTab('service'); setTestResults([]); }}
            className={`px-4 py-2 rounded-lg font-medium ${
              activeTab === 'service' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-700'
            }`}
          >
            Service Tests (106-108)
          </button>
          <button
            onClick={() => { setActiveTab('store'); setTestResults([]); }}
            className={`px-4 py-2 rounded-lg font-medium ${
              activeTab === 'store' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-700'
            }`}
          >
            Store Tests (109-110)
          </button>
        </div>

        {/* Test Runner */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-lg text-gray-900">
              {activeTab === 'service' ? 'CourseService Tests' : 'Store-Connected Component Tests'}
            </h3>
            <button
              onClick={activeTab === 'service' ? runServiceTests : runStoreTests}
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
                <p className="text-sm text-gray-600 mt-1 font-mono text-xs">{test.message}</p>
              </div>
            ))}
            {testResults.length === 0 && !isRunning && (
              <p className="text-gray-500 text-center py-8">Click "Run Tests" to execute the test suite</p>
            )}
          </div>
        </div>

        {/* Test Code */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <h3 className="font-semibold text-lg text-gray-900 mb-4">
            {activeTab === 'service' ? 'course.service.spec.ts' : 'course-list.component.spec.ts'}
          </h3>
          <div className="p-4 bg-gray-900 rounded-lg text-xs font-mono overflow-x-auto">
            {activeTab === 'service' ? (
              <>
                <p className="text-purple-400">// Step 106: Configure with HttpClientTestingModule</p>
                <p className="text-green-400">beforeEach(() =&gt; {'{'}</p>
                <p className="text-gray-300 ml-4">TestBed.configureTestingModule({'{'}</p>
                <p className="text-gray-300 ml-8">imports: [HttpClientTestingModule],</p>
                <p className="text-gray-300 ml-8">providers: [CourseService]</p>
                <p className="text-gray-300 ml-4">{'}'});</p>
                <p className="text-gray-300 ml-4">service = TestBed.inject(CourseService);</p>
                <p className="text-gray-300 ml-4">httpMock = TestBed.inject(HttpTestingController);</p>
                <p className="text-green-400">{'}'});</p>
                <p></p>
                <p className="text-purple-400">// Step 107: Test HTTP call</p>
                <p className="text-green-400">it('should fetch courses', () =&gt; {'{'}</p>
                <p className="text-gray-300 ml-4">service.getCourses().subscribe(courses =&gt; {'{'}</p>
                <p className="text-gray-300 ml-8">expect(courses.length).toBe(2);</p>
                <p className="text-gray-300 ml-4">{'}'});</p>
                <p className="text-gray-300 ml-4">const req = httpMock.expectOne('http://localhost:3000/courses');</p>
                <p className="text-gray-300 ml-4">req.flush(mockCourses);</p>
                <p className="text-gray-300 ml-4">httpMock.verify(); <span className="text-purple-400">// No unexpected requests</span></p>
                <p className="text-green-400">{'}'});</p>
                <p></p>
                <p className="text-purple-400">// Step 108: Test error handling</p>
                <p className="text-green-400">it('should handle errors', () =&gt; {'{'}</p>
                <p className="text-gray-300 ml-4">service.getCourses().subscribe({'{'}</p>
                <p className="text-gray-300 ml-8">error: err =&gt; expect(err.message).toBeTruthy()</p>
                <p className="text-gray-300 ml-4">{'}'});</p>
                <p className="text-gray-300 ml-4">httpMock.expectOne(url).flush(null, {'{'} status: 500, statusText: 'Error' {'}'});</p>
                <p className="text-green-400">{'}'});</p>
              </>
            ) : (
              <>
                <p className="text-purple-400">// Step 109: Configure with MockStore</p>
                <p className="text-green-400">beforeEach(() =&gt; {'{'}</p>
                <p className="text-gray-300 ml-4">TestBed.configureTestingModule({'{'}</p>
                <p className="text-gray-300 ml-8">imports: [CourseListComponent],</p>
                <p className="text-gray-300 ml-8">providers: [</p>
                <p className="text-gray-300 ml-12">provideMockStore({'{'}</p>
                <p className="text-gray-300 ml-16">initialState: {'{'}</p>
                <p className="text-gray-300 ml-20">course: {'{'} courses: mockCourses, loading: false, error: null {'}'}</p>
                <p className="text-gray-300 ml-16">{'}'}</p>
                <p className="text-gray-300 ml-12">{'}'})</p>
                <p className="text-gray-300 ml-8">]</p>
                <p className="text-gray-300 ml-4">{'}'});</p>
                <p className="text-gray-300 ml-4">store = TestBed.inject(MockStore);</p>
                <p className="text-green-400">{'}'});</p>
                <p></p>
                <p className="text-purple-400">// Step 110: Test state changes</p>
                <p className="text-green-400">it('should show loading state', () =&gt; {'{'}</p>
                <p className="text-gray-300 ml-4">store.setState({'{'}</p>
                <p className="text-gray-300 ml-8">course: {'{'} courses: [], loading: true, error: null {'}'}</p>
                <p className="text-gray-300 ml-4">{'}'});</p>
                <p className="text-gray-300 ml-4">fixture.detectChanges();</p>
                <p className="text-gray-300 ml-4">const loader = fixture.debugElement.query(By.css('.loading'));</p>
                <p className="text-gray-300 ml-4">expect(loader).toBeTruthy();</p>
                <p className="text-green-400">{'}'});</p>
              </>
            )}
          </div>
        </div>

        {/* Commands */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <h3 className="font-semibold text-lg text-gray-900 mb-4">Running Tests</h3>
          <div className="p-4 bg-gray-900 rounded-lg font-mono text-sm">
            <p className="text-green-400">$ ng test</p>
            <p className="text-gray-500"># Runs all .spec.ts files in watch mode</p>
            <p className="text-green-400 mt-2">$ ng test --code-coverage</p>
            <p className="text-gray-500"># Generates coverage report in coverage/ folder</p>
          </div>
        </div>

        {/* Hints */}
        <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <h4 className="font-semibold text-yellow-800 mb-2">💡 Key Points:</h4>
          <ul className="text-sm text-yellow-700 space-y-1 list-disc list-inside">
            <li><code>httpMock.verify()</code> asserts no outstanding HTTP requests</li>
            <li>MockStore replaces real store with controllable mock</li>
            <li>Use <code>store.setState()</code> to simulate different states</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ServiceTestingDemo;
