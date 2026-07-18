import { useState } from 'react';

/**
 * StudentProfileComponent
 * 
 * Displays student profile information including personal details,
 * enrolled courses, and academic performance.
 * 
 * Prepared for forms in Hands-On 4 & 5.
 * 
 * Equivalent to Angular's student-profile.component.ts/html/css
 */

interface StudentInfo {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  major: string;
  year: string;
  gpa: number;
  enrollmentDate: string;
  advisor: string;
  avatar: string;
}

interface EnrolledCourse {
  id: number;
  code: string;
  name: string;
  grade: string | null;
  status: 'In Progress' | 'Completed';
}

const StudentProfile = () => {
  // Student data - will be fetched from API in Hands-On 8
  const [student] = useState<StudentInfo>({
    id: 'STU-2024-001',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@university.edu',
    phone: '(555) 123-4567',
    major: 'Computer Science',
    year: 'Junior',
    gpa: 3.8,
    enrollmentDate: '2022-08-15',
    advisor: 'Dr. Sarah Johnson',
    avatar: '👨‍🎓'
  });

  const [enrolledCourses] = useState<EnrolledCourse[]>([
    { id: 1, code: 'CS101', name: 'Introduction to Programming', grade: 'A', status: 'Completed' },
    { id: 2, code: 'MATH201', name: 'Advanced Mathematics', grade: 'A-', status: 'Completed' },
    { id: 3, code: 'CS201', name: 'Data Structures & Algorithms', grade: null, status: 'In Progress' },
  ]);

  const [activeTab, setActiveTab] = useState<'overview' | 'courses' | 'settings'>('overview');

  const getGradeColor = (grade: string | null) => {
    if (!grade) return 'bg-gray-100 text-gray-600';
    if (grade.startsWith('A')) return 'bg-green-100 text-green-700';
    if (grade.startsWith('B')) return 'bg-blue-100 text-blue-700';
    if (grade.startsWith('C')) return 'bg-yellow-100 text-yellow-700';
    return 'bg-red-100 text-red-700';
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile Header Card */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-6">
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 h-32"></div>
          <div className="relative px-6 pb-6">
            {/* Avatar */}
            <div className="absolute -top-12 left-6">
              <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center text-5xl shadow-lg border-4 border-white">
                {student.avatar}
              </div>
            </div>
            
            {/* Info */}
            <div className="pt-14 flex flex-col md:flex-row md:items-end md:justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {student.firstName} {student.lastName}
                </h1>
                <p className="text-gray-600">{student.major} • {student.year}</p>
                <p className="text-sm text-gray-500 mt-1">Student ID: {student.id}</p>
              </div>
              <div className="mt-4 md:mt-0 flex gap-3">
                <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                  ✏️ Edit Profile
                </button>
                <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                  📤 Export Data
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-xl shadow-md mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              {[
                { id: 'overview', label: '📋 Overview', value: 'overview' as const },
                { id: 'courses', label: '📚 My Courses', value: 'courses' as const },
                { id: 'settings', label: '⚙️ Settings', value: 'settings' as const },
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.value)}
                  className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                    activeTab === tab.value
                      ? 'border-indigo-600 text-indigo-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Personal Information */}
            <div className="lg:col-span-2 bg-white rounded-xl shadow-md p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-500">Email</label>
                  <p className="text-gray-900">{student.email}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-500">Phone</label>
                  <p className="text-gray-900">{student.phone}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-500">Major</label>
                  <p className="text-gray-900">{student.major}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-500">Academic Year</label>
                  <p className="text-gray-900">{student.year}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-500">Enrollment Date</label>
                  <p className="text-gray-900">{new Date(student.enrollmentDate).toLocaleDateString()}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-500">Academic Advisor</label>
                  <p className="text-gray-900">{student.advisor}</p>
                </div>
              </div>
            </div>

            {/* Academic Stats */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Academic Stats</h2>
              <div className="space-y-4">
                <div className="text-center p-4 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-lg">
                  <p className="text-sm text-gray-500">Current GPA</p>
                  <p className="text-4xl font-bold text-indigo-600">{student.gpa.toFixed(2)}</p>
                  <p className="text-sm text-green-600 mt-1">↑ 0.2 from last semester</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <p className="text-2xl font-bold text-gray-900">{enrolledCourses.length}</p>
                    <p className="text-xs text-gray-500">Courses Enrolled</p>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <p className="text-2xl font-bold text-gray-900">
                      {enrolledCourses.filter(c => c.status === 'Completed').length}
                    </p>
                    <p className="text-xs text-gray-500">Completed</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'courses' && (
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Course
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Grade
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {enrolledCourses.map(course => (
                  <tr key={course.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{course.name}</div>
                        <div className="text-sm text-gray-500">{course.code}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        course.status === 'Completed' 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-blue-100 text-blue-700'
                      }`}>
                        {course.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 text-sm font-medium rounded ${getGradeColor(course.grade)}`}>
                        {course.grade || 'N/A'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <button className="text-indigo-600 hover:text-indigo-900 text-sm font-medium">
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Account Settings</h2>
            <p className="text-gray-600 mb-6">
              Profile settings and preferences will be added in Hands-On 4 & 5 (Forms & Validation).
            </p>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">Email Notifications</p>
                  <p className="text-sm text-gray-500">Receive updates about your courses</p>
                </div>
                <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-indigo-600">
                  <span className="translate-x-6 inline-block h-4 w-4 transform rounded-full bg-white transition"></span>
                </button>
              </div>
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">SMS Alerts</p>
                  <p className="text-sm text-gray-500">Get text messages for important deadlines</p>
                </div>
                <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200">
                  <span className="translate-x-1 inline-block h-4 w-4 transform rounded-full bg-white transition"></span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentProfile;
