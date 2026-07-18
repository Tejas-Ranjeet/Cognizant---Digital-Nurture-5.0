import { useState } from 'react';

/**
 * HANDS-ON 5 - TASK 1: Reactive Form with FormBuilder
 * 
 * Steps 48-52: Define and bind reactive form using FormBuilder
 * 
 * Step 52 Explanation:
 * - enrollForm.value: Excludes values from disabled controls
 * - enrollForm.getRawValue(): Includes ALL control values, even disabled ones
 */

interface EnrollmentForm {
  studentName: string;
  studentEmail: string;
  courseId: number | null;
  preferredSemester: string;
  agreeToTerms: boolean;
}

const ReactiveFormDemo = () => {
  // Step 49: Build form with FormBuilder equivalent
  const [enrollForm, setEnrollForm] = useState<EnrollmentForm>({
    studentName: '',
    studentEmail: '',
    courseId: null,
    preferredSemester: 'Odd',
    agreeToTerms: false,
  });

  const [formSubmitted, setFormSubmitted] = useState(false);

  // Validators
  const validateName = (name: string) => {
    if (!name.trim()) return { required: true };
    if (name.trim().length < 3) return { minLength: true };
    return null;
  };

  const validateEmail = (email: string) => {
    if (!email.trim()) return { required: true };
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return { email: true };
    return null;
  };

  const validateCourseId = (courseId: number | null) => {
    if (courseId === null || courseId === 0) return { required: true };
    return null;
  };

  const validateTerms = (agreed: boolean) => {
    if (!agreed) return { requiredTrue: true };
    return null;
  };

  const errors = {
    studentName: validateName(enrollForm.studentName),
    studentEmail: validateEmail(enrollForm.studentEmail),
    courseId: validateCourseId(enrollForm.courseId),
    agreeToTerms: validateTerms(enrollForm.agreeToTerms),
  };

  const isFormValid = !errors.studentName && !errors.studentEmail && !errors.courseId && !errors.agreeToTerms;

  const handleChange = <K extends keyof EnrollmentForm>(field: K, value: EnrollmentForm[K]) => {
    setEnrollForm(prev => ({ ...prev, [field]: value }));
  };

  // Step 51: Submit handler
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('enrollForm.value:', enrollForm);
    console.log('enrollForm.getRawValue():', enrollForm); // Same in this case
    setFormSubmitted(true);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">⚡ Task 1: Reactive Form</h2>
        <p className="text-gray-600 mb-6">Steps 48-52: FormBuilder, FormGroup, FormControl</p>

        <div className="bg-white rounded-xl shadow-md p-6">
          {/* Step 50: [formGroup]="enrollForm" */}
          <form onSubmit={onSubmit} className="space-y-4">
            
            {/* formControlName="studentName" */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Student Name
              </label>
              <input
                type="text"
                value={enrollForm.studentName}
                onChange={(e) => handleChange('studentName', e.target.value)}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 outline-none ${
                  errors.studentName ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="Min 3 characters"
              />
              {errors.studentName?.required && (
                <p className="text-red-500 text-sm mt-1">Name is required</p>
              )}
              {errors.studentName?.minLength && (
                <p className="text-red-500 text-sm mt-1">Name must be at least 3 characters</p>
              )}
            </div>

            {/* formControlName="studentEmail" */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Student Email
              </label>
              <input
                type="email"
                value={enrollForm.studentEmail}
                onChange={(e) => handleChange('studentEmail', e.target.value)}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 outline-none ${
                  errors.studentEmail ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="student@university.edu"
              />
              {errors.studentEmail?.required && (
                <p className="text-red-500 text-sm mt-1">Email is required</p>
              )}
              {errors.studentEmail?.email && (
                <p className="text-red-500 text-sm mt-1">Please enter a valid email</p>
              )}
            </div>

            {/* formControlName="courseId" */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Course ID
              </label>
              <input
                type="number"
                value={enrollForm.courseId || ''}
                onChange={(e) => handleChange('courseId', e.target.value ? parseInt(e.target.value) : null)}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 outline-none ${
                  errors.courseId ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="Enter course ID"
              />
            </div>

            {/* formControlName="preferredSemester" */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Preferred Semester
              </label>
              <select
                value={enrollForm.preferredSemester}
                onChange={(e) => handleChange('preferredSemester', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 outline-none"
              >
                <option value="Odd">Odd</option>
                <option value="Even">Even</option>
              </select>
            </div>

            {/* formControlName="agreeToTerms" */}
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={enrollForm.agreeToTerms}
                onChange={(e) => handleChange('agreeToTerms', e.target.checked)}
                className="w-4 h-4 text-indigo-600 rounded"
              />
              <label className="text-sm text-gray-700">
                I agree to the terms (Validators.requiredTrue)
              </label>
            </div>

            {/* Step 51: Submit button */}
            <button
              type="submit"
              disabled={!isFormValid}
              className={`w-full py-2 rounded-lg font-medium transition-colors ${
                isFormValid
                  ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              Submit
            </button>
          </form>

          {/* Console Output */}
          {formSubmitted && (
            <div className="mt-6 p-4 bg-gray-900 rounded-lg text-sm font-mono">
              <p className="text-green-400">// Step 51: Console output</p>
              <p className="text-gray-300 mt-2">enrollForm.value:</p>
              <pre className="text-gray-300 ml-2">{JSON.stringify(enrollForm, null, 2)}</pre>
            </div>
          )}
        </div>

        {/* Step 52: Difference explanation */}
        <div className="mt-6 bg-white rounded-xl shadow-md p-6">
          <h3 className="font-semibold text-lg text-gray-900 mb-4">Step 52: value vs getRawValue()</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <code className="text-blue-700 font-mono">enrollForm.value</code>
              <p className="text-sm text-gray-600 mt-2">Excludes disabled controls</p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <code className="text-green-700 font-mono">enrollForm.getRawValue()</code>
              <p className="text-sm text-gray-600 mt-2">Includes ALL controls (even disabled)</p>
            </div>
          </div>
        </div>

        {/* Code Example */}
        <div className="mt-6 p-4 bg-gray-900 rounded-lg text-xs font-mono">
          <p className="text-purple-400">// Step 49: FormBuilder syntax</p>
          <p className="text-gray-300">this.enrollForm = this.fb.group({'{'}</p>
          <p className="text-gray-300 ml-4">studentName: ['', [Validators.required, Validators.minLength(3)]],</p>
          <p className="text-gray-300 ml-4">studentEmail: ['', [Validators.required, Validators.email]],</p>
          <p className="text-gray-300 ml-4">courseId: [null, Validators.required],</p>
          <p className="text-gray-300 ml-4">preferredSemester: ['Odd', Validators.required],</p>
          <p className="text-gray-300 ml-4">agreeToTerms: [false, Validators.requiredTrue]</p>
          <p className="text-gray-300">{'}'});</p>
        </div>
      </div>
    </div>
  );
};

export default ReactiveFormDemo;
