import { useState } from 'react';

/**
 * HANDS-ON 4 - TASK 2: Validation and Error Messages
 * 
 * Steps 43-47: Built-in validators and error display
 */

interface FormData {
  studentName: string;
  studentEmail: string;
  courseId: string;
  agreeToTerms: boolean;
}

interface FormErrors {
  studentName: { required?: boolean; minlength?: boolean };
  studentEmail: { required?: boolean; email?: boolean };
  courseId: { required?: boolean };
  agreeToTerms: { required?: boolean };
}

interface TouchedFields {
  studentName: boolean;
  studentEmail: boolean;
  courseId: boolean;
  agreeToTerms: boolean;
}

const FormValidationDemo = () => {
  const [formData, setFormData] = useState<FormData>({
    studentName: '',
    studentEmail: '',
    courseId: '',
    agreeToTerms: false,
  });

  const [touched, setTouched] = useState<TouchedFields>({
    studentName: false,
    studentEmail: false,
    courseId: false,
    agreeToTerms: false,
  });

  const [submitted, setSubmitted] = useState(false);

  // Step 43: Validation logic
  const validateForm = (): FormErrors => {
    const errors: FormErrors = {
      studentName: {},
      studentEmail: {},
      courseId: {},
      agreeToTerms: {},
    };

    // studentName: required and minlength(3)
    if (!formData.studentName.trim()) {
      errors.studentName.required = true;
    } else if (formData.studentName.trim().length < 3) {
      errors.studentName.minlength = true;
    }

    // studentEmail: required and email format
    if (!formData.studentEmail.trim()) {
      errors.studentEmail.required = true;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.studentEmail)) {
      errors.studentEmail.email = true;
    }

    // courseId: required
    if (!formData.courseId.trim()) {
      errors.courseId.required = true;
    }

    // agreeToTerms: required (must be checked)
    if (!formData.agreeToTerms) {
      errors.agreeToTerms.required = true;
    }

    return errors;
  };

  const errors = validateForm();
  
  const isFormValid = 
    Object.keys(errors.studentName).length === 0 &&
    Object.keys(errors.studentEmail).length === 0 &&
    Object.keys(errors.courseId).length === 0 &&
    Object.keys(errors.agreeToTerms).length === 0;

  const handleChange = (field: keyof FormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleBlur = (field: keyof TouchedFields) => {
    setTouched(prev => ({ ...prev, [field]: true }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isFormValid) {
      setSubmitted(true);
    }
  };

  // Step 47: Reset form
  const handleReset = () => {
    setFormData({
      studentName: '',
      studentEmail: '',
      courseId: '',
      agreeToTerms: false,
    });
    setTouched({
      studentName: false,
      studentEmail: false,
      courseId: false,
      agreeToTerms: false,
    });
    setSubmitted(false);
  };

  // Step 45: CSS classes for validation states
  const getInputClasses = (field: keyof FormErrors) => {
    const base = 'w-full px-4 py-2 border rounded-lg focus:ring-2 outline-none transition-colors';
    const hasError = Object.keys(errors[field]).length > 0;
    const isTouched = touched[field];

    if (isTouched && hasError) {
      return `${base} border-red-500 focus:ring-red-200 focus:border-red-500`;
    }
    if (isTouched && !hasError) {
      return `${base} border-green-500 focus:ring-green-200 focus:border-green-500`;
    }
    return `${base} border-gray-300 focus:ring-indigo-200 focus:border-indigo-500`;
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">✅ Task 2: Validation & Errors</h2>
        <p className="text-gray-600 mb-6">Steps 43-47: Add validators and display error messages</p>

        {/* Step 46: Success message */}
        {submitted && (
          <div className="mb-6 p-4 bg-green-100 border border-green-300 rounded-lg">
            <p className="text-green-700 font-medium">✅ Enrollment request submitted successfully!</p>
          </div>
        )}

        <div className="bg-white rounded-xl shadow-md p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* studentName with validation */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Student Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.studentName}
                onChange={(e) => handleChange('studentName', e.target.value)}
                onBlur={() => handleBlur('studentName')}
                className={getInputClasses('studentName')}
                placeholder="Enter your name (min 3 characters)"
              />
              {/* Step 44: Error messages */}
              {touched.studentName && errors.studentName.required && (
                <span className="text-red-500 text-sm mt-1 block">Name is required</span>
              )}
              {touched.studentName && errors.studentName.minlength && (
                <span className="text-red-500 text-sm mt-1 block">Name must be at least 3 characters</span>
              )}
            </div>

            {/* studentEmail with validation */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Student Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                value={formData.studentEmail}
                onChange={(e) => handleChange('studentEmail', e.target.value)}
                onBlur={() => handleBlur('studentEmail')}
                className={getInputClasses('studentEmail')}
                placeholder="student@university.edu"
              />
              {touched.studentEmail && errors.studentEmail.required && (
                <span className="text-red-500 text-sm mt-1 block">Email is required</span>
              )}
              {touched.studentEmail && errors.studentEmail.email && (
                <span className="text-red-500 text-sm mt-1 block">Please enter a valid email address</span>
              )}
            </div>

            {/* courseId with validation */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Course ID <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                value={formData.courseId}
                onChange={(e) => handleChange('courseId', e.target.value)}
                onBlur={() => handleBlur('courseId')}
                className={getInputClasses('courseId')}
                placeholder="Enter course ID"
              />
              {touched.courseId && errors.courseId.required && (
                <span className="text-red-500 text-sm mt-1 block">Course ID is required</span>
              )}
            </div>

            {/* agreeToTerms checkbox */}
            <div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.agreeToTerms}
                  onChange={(e) => {
                    handleChange('agreeToTerms', e.target.checked);
                    handleBlur('agreeToTerms');
                  }}
                  className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                />
                <label className="text-sm text-gray-700">
                  I agree to the terms and conditions <span className="text-red-500">*</span>
                </label>
              </div>
              {touched.agreeToTerms && errors.agreeToTerms.required && (
                <span className="text-red-500 text-sm mt-1 block">You must agree to the terms</span>
              )}
            </div>

            {/* Buttons */}
            <div className="flex gap-3">
              <button
                type="submit"
                disabled={!isFormValid}
                className={`flex-1 py-2 rounded-lg font-medium transition-colors ${
                  isFormValid
                    ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                Submit
              </button>
              {/* Step 47: Reset button */}
              <button
                type="button"
                onClick={handleReset}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Reset
              </button>
            </div>
          </form>
        </div>

        {/* CSS Classes Info */}
        <div className="mt-6 bg-white rounded-xl shadow-md p-6">
          <h3 className="font-semibold text-lg text-gray-900 mb-4">Step 45: Form State CSS Classes</h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="p-3 bg-red-50 rounded-lg border-l-4 border-red-500">
              <code>.ng-invalid.ng-touched</code>
              <p className="text-xs text-gray-500 mt-1">Red border for invalid touched fields</p>
            </div>
            <div className="p-3 bg-green-50 rounded-lg border-l-4 border-green-500">
              <code>.ng-valid.ng-touched</code>
              <p className="text-xs text-gray-500 mt-1">Green border for valid touched fields</p>
            </div>
          </div>
        </div>

        {/* Hints */}
        <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <h4 className="font-semibold text-yellow-800 mb-2">💡 Key Points:</h4>
          <ul className="text-sm text-yellow-700 space-y-1 list-disc list-inside">
            <li>Use <code>touched</code> for showing errors - not <code>dirty</code></li>
            <li>Angular adds ng-valid/ng-invalid, ng-pristine/ng-dirty, ng-touched/ng-untouched classes</li>
            <li>Use #nameCtrl="ngModel" to access control state in template</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default FormValidationDemo;
