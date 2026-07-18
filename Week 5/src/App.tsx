import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';

// Week 5 Components
import { 
  // Hands-On 1
  ProjectNotes, ComponentsDemo,
  // Hands-On 2
  DataBindingDemo, LifecycleHooksDemo, InputOutputDemo,
  // Hands-On 3
  StructuralDirectivesDemo, AttributeDirectivesDemo, CustomDirectivePipeDemo,
  // Hands-On 4
  TemplateDrivenFormDemo, FormValidationDemo,
  // Hands-On 5
  ReactiveFormDemo, CustomValidatorsDemo,
  // Hands-On 6
  CourseServiceDemo, EnrollmentServiceDemo,
  // Hands-On 7
  RoutingDemo, LazyLoadingGuardsDemo,
  // Hands-On 8
  HttpClientDemo, RxJSOperatorsDemo, InterceptorsDemo,
  // Hands-On 9
  NgRxStoreDemo, NgRxEffectsDemo,
  // Hands-On 10
  ComponentTestingDemo, ServiceTestingDemo,
} from './week-5';

// Navigation Component
const Navigation = () => {
  const location = useLocation();
  
  const handsOnItems = [
    { id: 1, title: 'Setup & Components', tasks: [
      { path: '/week-5/hands-on-1/task-1', label: 'Task 1: Project Notes' },
      { path: '/week-5/hands-on-1/task-2', label: 'Task 2: Components' },
    ]},
    { id: 2, title: 'Bindings & Lifecycle', tasks: [
      { path: '/week-5/hands-on-2/task-1', label: 'Task 1: Bindings' },
      { path: '/week-5/hands-on-2/task-2', label: 'Task 2: Lifecycle' },
      { path: '/week-5/hands-on-2/task-3', label: 'Task 3: I/O' },
    ]},
    { id: 3, title: 'Directives & Pipes', tasks: [
      { path: '/week-5/hands-on-3/task-1', label: 'Task 1: Structural' },
      { path: '/week-5/hands-on-3/task-2', label: 'Task 2: Attribute' },
      { path: '/week-5/hands-on-3/task-3', label: 'Task 3: Custom' },
    ]},
    { id: 4, title: 'Template Forms', tasks: [
      { path: '/week-5/hands-on-4/task-1', label: 'Task 1: Form' },
      { path: '/week-5/hands-on-4/task-2', label: 'Task 2: Validation' },
    ]},
    { id: 5, title: 'Reactive Forms', tasks: [
      { path: '/week-5/hands-on-5/task-1', label: 'Task 1: FormBuilder' },
      { path: '/week-5/hands-on-5/task-2', label: 'Task 2: Validators' },
    ]},
    { id: 6, title: 'Services & DI', tasks: [
      { path: '/week-5/hands-on-6/task-1', label: 'Task 1: Course Service' },
      { path: '/week-5/hands-on-6/task-2', label: 'Task 2: Enrollment' },
    ]},
    { id: 7, title: 'Routing & Guards', tasks: [
      { path: '/week-5/hands-on-7/task-1', label: 'Task 1: Routing' },
      { path: '/week-5/hands-on-7/task-2', label: 'Task 2: Guards' },
    ]},
    { id: 8, title: 'HTTP Client', tasks: [
      { path: '/week-5/hands-on-8/task-1', label: 'Task 1: CRUD' },
      { path: '/week-5/hands-on-8/task-2', label: 'Task 2: RxJS' },
      { path: '/week-5/hands-on-8/task-3', label: 'Task 3: Interceptors' },
    ]},
    { id: 9, title: 'NgRx', tasks: [
      { path: '/week-5/hands-on-9/task-1', label: 'Task 1: Store' },
      { path: '/week-5/hands-on-9/task-2', label: 'Task 2: Effects' },
    ]},
    { id: 10, title: 'Testing', tasks: [
      { path: '/week-5/hands-on-10/task-1', label: 'Task 1: Component' },
      { path: '/week-5/hands-on-10/task-2', label: 'Task 2: Service' },
    ]},
  ];

  return (
    <nav className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between mb-3">
          <Link to="/" className="text-xl font-bold">📚 Week 5: Angular Hands-On</Link>
          <span className="text-indigo-200 text-sm">Digital Nurture 5.0</span>
        </div>
        <div className="flex flex-wrap gap-1 text-xs">
          {handsOnItems.map(ho => (
            <div key={ho.id} className="relative group">
              <button className={`px-2 py-1 rounded ${
                location.pathname.includes(`hands-on-${ho.id}/`)
                  ? 'bg-white text-indigo-600'
                  : 'bg-indigo-500/50 hover:bg-indigo-500'
              }`}>
                HO{ho.id}
              </button>
              <div className="absolute top-full left-0 mt-1 bg-white text-gray-700 rounded shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 min-w-[150px]">
                <div className="p-2 border-b bg-gray-50">
                  <span className="font-medium text-xs">{ho.title}</span>
                </div>
                {ho.tasks.map(task => (
                  <Link
                    key={task.path}
                    to={task.path}
                    className={`block px-3 py-2 hover:bg-indigo-50 text-xs ${
                      location.pathname === task.path ? 'bg-indigo-100 text-indigo-600' : ''
                    }`}
                  >
                    {task.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </nav>
  );
};

// Home Page
const HomePage = () => (
  <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 py-12">
    <div className="max-w-4xl mx-auto px-6">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          📚 Week 5: Angular (v20.0) Hands-On Exercises
        </h1>
        <p className="text-xl text-gray-600">
          Digital Nurture 5.0 - .NET Full Stack Engineer Track
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          { id: 1, title: 'Setup & Components', level: 'Beginner', tasks: 2 },
          { id: 2, title: 'Bindings & Lifecycle', level: 'Beginner', tasks: 3 },
          { id: 3, title: 'Directives & Pipes', level: 'Beginner', tasks: 3 },
          { id: 4, title: 'Template Forms', level: 'Intermediate', tasks: 2 },
          { id: 5, title: 'Reactive Forms', level: 'Intermediate', tasks: 2 },
          { id: 6, title: 'Services & DI', level: 'Intermediate', tasks: 2 },
          { id: 7, title: 'Routing & Guards', level: 'Intermediate', tasks: 2 },
          { id: 8, title: 'HTTP Client', level: 'Advanced', tasks: 3 },
          { id: 9, title: 'NgRx State', level: 'Advanced', tasks: 2 },
          { id: 10, title: 'Testing', level: 'Advanced', tasks: 2 },
        ].map(ho => (
          <Link
            key={ho.id}
            to={`/week-5/hands-on-${ho.id}/task-1`}
            className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex justify-between items-start mb-2">
              <span className="text-2xl font-bold text-indigo-600">#{ho.id}</span>
              <span className={`px-2 py-1 rounded text-xs ${
                ho.level === 'Beginner' ? 'bg-green-100 text-green-700' :
                ho.level === 'Intermediate' ? 'bg-yellow-100 text-yellow-700' :
                'bg-red-100 text-red-700'
              }`}>
                {ho.level}
              </span>
            </div>
            <h3 className="font-semibold text-gray-900">{ho.title}</h3>
            <p className="text-sm text-gray-500">{ho.tasks} tasks</p>
          </Link>
        ))}
      </div>
    </div>
  </div>
);

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <Routes>
          <Route path="/" element={<HomePage />} />
          
          {/* Hands-On 1 */}
          <Route path="/week-5/hands-on-1/task-1" element={<ProjectNotes />} />
          <Route path="/week-5/hands-on-1/task-2" element={<ComponentsDemo />} />
          
          {/* Hands-On 2 */}
          <Route path="/week-5/hands-on-2/task-1" element={<DataBindingDemo />} />
          <Route path="/week-5/hands-on-2/task-2" element={<LifecycleHooksDemo />} />
          <Route path="/week-5/hands-on-2/task-3" element={<InputOutputDemo />} />
          
          {/* Hands-On 3 */}
          <Route path="/week-5/hands-on-3/task-1" element={<StructuralDirectivesDemo />} />
          <Route path="/week-5/hands-on-3/task-2" element={<AttributeDirectivesDemo />} />
          <Route path="/week-5/hands-on-3/task-3" element={<CustomDirectivePipeDemo />} />
          
          {/* Hands-On 4 */}
          <Route path="/week-5/hands-on-4/task-1" element={<TemplateDrivenFormDemo />} />
          <Route path="/week-5/hands-on-4/task-2" element={<FormValidationDemo />} />
          
          {/* Hands-On 5 */}
          <Route path="/week-5/hands-on-5/task-1" element={<ReactiveFormDemo />} />
          <Route path="/week-5/hands-on-5/task-2" element={<CustomValidatorsDemo />} />
          
          {/* Hands-On 6 */}
          <Route path="/week-5/hands-on-6/task-1" element={<CourseServiceDemo />} />
          <Route path="/week-5/hands-on-6/task-2" element={<EnrollmentServiceDemo />} />
          
          {/* Hands-On 7 */}
          <Route path="/week-5/hands-on-7/task-1" element={<RoutingDemo />} />
          <Route path="/week-5/hands-on-7/task-2" element={<LazyLoadingGuardsDemo />} />
          
          {/* Hands-On 8 */}
          <Route path="/week-5/hands-on-8/task-1" element={<HttpClientDemo />} />
          <Route path="/week-5/hands-on-8/task-2" element={<RxJSOperatorsDemo />} />
          <Route path="/week-5/hands-on-8/task-3" element={<InterceptorsDemo />} />
          
          {/* Hands-On 9 */}
          <Route path="/week-5/hands-on-9/task-1" element={<NgRxStoreDemo />} />
          <Route path="/week-5/hands-on-9/task-2" element={<NgRxEffectsDemo />} />
          
          {/* Hands-On 10 */}
          <Route path="/week-5/hands-on-10/task-1" element={<ComponentTestingDemo />} />
          <Route path="/week-5/hands-on-10/task-2" element={<ServiceTestingDemo />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
