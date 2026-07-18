import { useState } from 'react';

/**
 * HANDS-ON 4 - TASK 1: Build the Enrollment Request Form
 * 
 * Steps 38-42: Template-driven form with ngModel bindings
 */

interface EnrollmentForm {
  studentName: string;
  studentEmail: string;
  courseId: string;
  preferredSemester: string;
  agreeToTerms: boolean;
}

const TemplateDrivenFormDemo = () => {
  // Step 39: Form fields with ngModel bindings
  const [formData, setFormData] = useState<EnrollmentForm>({
    studentName: '',
    studentEmail: '',
    courseId: '',
    preferredSemester: 'Odd',
    agreeToTerms: false,
  });

  const [formValid, setFormValid] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formValue, setFormValue] = useState<EnrollmentForm | null>(null);

  // Update form validity whenever form data changes
  const updateFormValidity = (data: EnrollmentForm) => {
    const isValid = 
      data.studentName.trim() !== '' &&
      data.studentEmail.trim() !== '' &&
      data.courseId.trim() !== '' &&
      data.agreeToTerms;
    setFormValid(isValid);
  };

  const handleChange = (field: keyof EnrollmentForm, value: string | boolean) => {
    const newData = { ...formData, [field]: value };
    setFormData(newData);
    updateFormValidity(newData);
  };

  // Step 40: onSubmit method
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('form.value:', formData);
    console.log('form.valid:', formValid);
    setFormValue(formData);
    setSubmitted(true);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">📝 Task 1: Template-Driven Form</h2>
        <p className="text-gray-600 mb-6">Steps 38-42: Build enrollment form with ngModel</p>

        <div className="bg-white rounded-xl shadow-md p-6">
          {/* Step 39: Form with #enrollForm="ngForm" */}
          <form onSubmit={onSubmit} className="space-y-4">
            
            {/* studentName - text input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Student Name
              </label>
              <input
                type="text"
                name="studentName"
                value={formData.studentName}
                onChange={(e) => handleChange('studentName', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                placeholder="Enter your name"
              />
            </div>

            {/* studentEmail - email input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Student Email
              </label>
              <input
                type="email"
                name="studentEmail"
                value={formData.studentEmail}
                onChange={(e) => handleChange('studentEmail', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                placeholder="student@university.edu"
              />
            </div>

            {/* courseId - number input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Course ID
              </label>
              <input
                type="number"
                name="courseId"
                value={formData.courseId}
                onChange={(e) => handleChange('courseId', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                placeholder="Enter course ID"
              />
            </div>

            {/* preferredSemester - select */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Preferred Semester
              </label>
              <select
                name="preferredSemester"
                value={formData.preferredSemester}
                onChange={(e) => handleChange('preferredSemester', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
              >
                <option value="Odd">Odd</option>
                <option value="Even">Even</option>
              </select>
            </div>

            {/* agreeToTerms - checkbox */}
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                name="agreeToTerms"
                checked={formData.agreeToTerms}
                onChange={(e) => handleChange('agreeToTerms', e.target.checked)}
                className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
              />
              <label className="text-sm text-gray-700">
                I agree to the terms and conditions
              </label>
            </div>

            {/* Step 41: Submit button with disabled binding */}
            <button
              type="submit"
              disabled={!formValid}
              className={`w-full py-2 rounded-lg font-medium transition-colors ${
                formValid
                  ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              Submit
            </button>
          </form>

          {/* Step 42: Console output display */}
          {submitted && formValue && (
            <div className="mt-6 p-4 bg-gray-900 rounded-lg">
              <p className="text-green-400 text-sm font-mono mb-2">// Console output:</p>
              <p className="text-gray-300 text-sm font-mono">form.value: {JSON.stringify(formValue, null, 2)}</p>
              <p className="text-gray-300 text-sm font-mono mt-2">form.valid: {String(formValid)}</p>
            </div>
          )}
        </div>

        {/* Code Example */}
        <div className="mt-6 bg-white rounded-xl shadow-md p-6">
          <h3 className="font-semibold text-lg text-gray-900 mb-4">Template Syntax</h3>
          <div className="p-4 bg-gray-900 rounded-lg text-xs font-mono overflow-x-auto">
            <p className="text-gray-300">&lt;form #enrollForm="ngForm" (ngSubmit)="onSubmit(enrollForm)"&gt;</p>
            <p className="text-gray-300 ml-4">&lt;input [(ngModel)]="studentName" name="studentName"&gt;</p>
            <p className="text-gray-300 ml-4">&lt;button [disabled]="enrollForm.invalid"&gt;Submit&lt;/button&gt;</p>
            <p className="text-gray-300">&lt;/form&gt;</p>
          </div>
        </div>

        {/* Hints */}
        <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <h4 className="font-semibold text-yellow-800 mb-2">💡 Key Points:</h4>
          <ul className="text-sm text-yellow-700 space-y-1 list-disc list-inside">
            <li>#enrollForm="ngForm" gives access to NgForm directive instance</li>
            <li>name attribute is mandatory - Angular uses it as key in form.value</li>
            <li>FormsModule must be imported for ngModel to work</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TemplateDrivenFormDemo;
