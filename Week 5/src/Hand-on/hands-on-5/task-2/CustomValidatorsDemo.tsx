import { useState, useEffect } from 'react';

/**
 * HANDS-ON 5 - TASK 2: Custom Validators and FormArray
 * 
 * Steps 53-57: Custom sync/async validators and dynamic form controls
 */

interface EnrollmentForm {
  courseId: string;
  studentEmail: string;
  additionalCourses: string[];
}

// Step 53: Custom synchronous validator
const noCourseCode = (value: string): { noCourseCode: true } | null => {
  if (value && value.toUpperCase().startsWith('XX')) {
    return { noCourseCode: true };
  }
  return null;
};

// Step 55: Custom async validator (simulates API check)
const simulateEmailCheck = async (email: string): Promise<{ emailTaken: true } | null> => {
  await new Promise(resolve => setTimeout(resolve, 800));
  if (email.includes('test@')) {
    return { emailTaken: true };
  }
  return null;
};

const CustomValidatorsDemo = () => {
  const [form, setForm] = useState<EnrollmentForm>({
    courseId: '',
    studentEmail: '',
    additionalCourses: [],
  });

  // Validation states
  const [courseIdError, setCourseIdError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [emailChecking, setEmailChecking] = useState(false);
  const [additionalCoursesErrors, setAdditionalCoursesErrors] = useState<(string | null)[]>([]);

  // Validate courseId
  useEffect(() => {
    if (!form.courseId) {
      setCourseIdError('Course ID is required');
    } else {
      const customError = noCourseCode(form.courseId);
      if (customError) {
        setCourseIdError('Course code starting with XX is not allowed');
      } else {
        setCourseIdError(null);
      }
    }
  }, [form.courseId]);

  // Step 55: Async validate email
  useEffect(() => {
    if (!form.studentEmail) {
      setEmailError('Email is required');
      return;
    }
    
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.studentEmail)) {
      setEmailError('Invalid email format');
      return;
    }

    setEmailChecking(true);
    const checkEmail = async () => {
      const asyncError = await simulateEmailCheck(form.studentEmail);
      if (asyncError) {
        setEmailError('This email is already taken');
      } else {
        setEmailError(null);
      }
      setEmailChecking(false);
    };
    
    const timeoutId = setTimeout(checkEmail, 300); // Debounce
    return () => clearTimeout(timeoutId);
  }, [form.studentEmail]);

  // Step 56: FormArray handlers
  const addCourse = () => {
    setForm(prev => ({
      ...prev,
      additionalCourses: [...prev.additionalCourses, '']
    }));
    setAdditionalCoursesErrors(prev => [...prev, 'Required']);
  };

  const removeCourse = (index: number) => {
    setForm(prev => ({
      ...prev,
      additionalCourses: prev.additionalCourses.filter((_, i) => i !== index)
    }));
    setAdditionalCoursesErrors(prev => prev.filter((_, i) => i !== index));
  };

  const updateCourse = (index: number, value: string) => {
    setForm(prev => ({
      ...prev,
      additionalCourses: prev.additionalCourses.map((c, i) => i === index ? value : c)
    }));
    setAdditionalCoursesErrors(prev => 
      prev.map((e, i) => i === index ? (value.trim() ? null : 'Required') : e)
    );
  };

  // Step 57: Typed getter for additionalCourses
  // In Angular: get additionalCourses() { return this.enrollForm.get('additionalCourses') as FormArray; }
  // This keeps the template clean by moving type casting to the component class
  const additionalCourses = form.additionalCourses;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">🔧 Task 2: Custom Validators & FormArray</h2>
        <p className="text-gray-600 mb-6">Steps 53-57: Custom validators and dynamic controls</p>

        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <form className="space-y-6">
            
            {/* Step 53 & 54: courseId with custom validator */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Course ID (Try typing "XX101")
              </label>
              <input
                type="text"
                value={form.courseId}
                onChange={(e) => setForm(prev => ({ ...prev, courseId: e.target.value }))}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 outline-none ${
                  courseIdError ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="e.g., CS101, MATH201"
              />
              {courseIdError && (
                <p className="text-red-500 text-sm mt-1">{courseIdError}</p>
              )}
              <p className="text-xs text-gray-400 mt-1">
                Step 53: noCourseCode validator rejects codes starting with "XX"
              </p>
            </div>

            {/* Step 55: Email with async validator */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Student Email (Try "test@example.com")
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={form.studentEmail}
                  onChange={(e) => setForm(prev => ({ ...prev, studentEmail: e.target.value }))}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 outline-none ${
                    emailError ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="student@university.edu"
                />
                {emailChecking && (
                  <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    <div className="animate-spin h-4 w-4 border-2 border-indigo-600 border-t-transparent rounded-full"></div>
                  </div>
                )}
              </div>
              {emailError && (
                <p className="text-red-500 text-sm mt-1">{emailError}</p>
              )}
              <p className="text-xs text-gray-400 mt-1">
                Step 55: Async validator checks after 800ms delay
              </p>
            </div>

            {/* Steps 56 & 57: FormArray for additional courses */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium text-gray-700">
                  Additional Courses (FormArray)
                </label>
                <button
                  type="button"
                  onClick={addCourse}
                  className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded text-sm hover:bg-indigo-200"
                >
                  ➕ Add Another Course
                </button>
              </div>
              
              {additionalCourses.length === 0 ? (
                <p className="text-sm text-gray-400 p-4 bg-gray-50 rounded-lg text-center">
                  No additional courses. Click "Add Another Course" to add one.
                </p>
              ) : (
                <div className="space-y-2">
                  {additionalCourses.map((course, index) => (
                    <div key={index} className="flex gap-2">
                      <input
                        type="text"
                        value={course}
                        onChange={(e) => updateCourse(index, e.target.value)}
                        className={`flex-1 px-4 py-2 border rounded-lg focus:ring-2 outline-none ${
                          additionalCoursesErrors[index] ? 'border-red-300' : 'border-gray-300'
                        }`}
                        placeholder={`Course ${index + 1}`}
                      />
                      <button
                        type="button"
                        onClick={() => removeCourse(index)}
                        className="px-3 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              )}
              <p className="text-xs text-gray-400 mt-2">
                Step 56: FormArray with dynamic add/remove. Step 57: Typed getter keeps template clean.
              </p>
            </div>
          </form>
        </div>

        {/* Code Examples */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <h3 className="font-semibold text-lg text-gray-900 mb-4">Custom Validator Code</h3>
          <div className="p-4 bg-gray-900 rounded-lg text-xs font-mono overflow-x-auto">
            <p className="text-purple-400">// Step 53: Custom sync validator</p>
            <p className="text-green-400">function noCourseCode(control: AbstractControl): ValidationErrors | null {'{'}</p>
            <p className="text-gray-300 ml-4">if (control.value?.startsWith('XX')) {'{'}</p>
            <p className="text-gray-300 ml-8">return {'{'} noCourseCode: true {'}'};</p>
            <p className="text-gray-300 ml-4">{'}'}</p>
            <p className="text-gray-300 ml-4">return null;</p>
            <p className="text-green-400">{'}'}</p>
          </div>
        </div>

        {/* Hints */}
        <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <h4 className="font-semibold text-yellow-800 mb-2">💡 Key Points:</h4>
          <ul className="text-sm text-yellow-700 space-y-1 list-disc list-inside">
            <li>Async validators run AFTER all sync validators pass</li>
            <li>FormArray handles dynamic, repeating form sections</li>
            <li>Typed getter is better than casting in template - cleaner and type-safe</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CustomValidatorsDemo;
