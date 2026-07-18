import { useState } from 'react';

/**
 * CourseListComponent
 * 
 * Displays a list of available courses for the Student Course Portal.
 * Prepared for Hands-On 3 where ngFor, ngIf, pipes, and directives will be added.
 * 
 * Demonstrates:
 * - Array mapping (equivalent to *ngFor)
 * - Conditional rendering (equivalent to *ngIf)
 * - Event handling
 * 
 * Equivalent to Angular's course-list.component.ts/html/css
 */

interface Course {
  id: number;
  code: string;
  name: string;
  instructor: string;
  credits: number;
  schedule: string;
  enrolled: number;
  capacity: number;
  description: string;
  category: string;
}

const CourseList = () => {
  // Sample course data - will be fetched from API in Hands-On 8
  const [courses] = useState<Course[]>([
    {
      id: 1,
      code: 'CS101',
      name: 'Introduction to Programming',
      instructor: 'Dr. Sarah Johnson',
      credits: 3,
      schedule: 'Mon/Wed 9:00 AM',
      enrolled: 45,
      capacity: 50,
      description: 'Learn the fundamentals of programming using Python.',
      category: 'Computer Science'
    },
    {
      id: 2,
      code: 'MATH201',
      name: 'Advanced Mathematics',
      instructor: 'Prof. Michael Chen',
      credits: 4,
      schedule: 'Tue/Thu 11:00 AM',
      enrolled: 30,
      capacity: 40,
      description: 'Calculus, linear algebra, and differential equations.',
      category: 'Mathematics'
    },
    {
      id: 3,
      code: 'PHY101',
      name: 'Physics I',
      instructor: 'Dr. Emily Brown',
      credits: 4,
      schedule: 'Mon/Wed/Fri 2:00 PM',
      enrolled: 38,
      capacity: 45,
      description: 'Mechanics, thermodynamics, and wave motion.',
      category: 'Physics'
    },
    {
      id: 4,
      code: 'CS201',
      name: 'Data Structures & Algorithms',
      instructor: 'Dr. James Wilson',
      credits: 3,
      schedule: 'Tue/Thu 9:00 AM',
      enrolled: 35,
      capacity: 35,
      description: 'Arrays, linked lists, trees, graphs, and algorithm analysis.',
      category: 'Computer Science'
    },
    {
      id: 5,
      code: 'ENG101',
      name: 'Technical Writing',
      instructor: 'Prof. Lisa Anderson',
      credits: 2,
      schedule: 'Fri 10:00 AM',
      enrolled: 20,
      capacity: 30,
      description: 'Learn to write clear technical documentation and reports.',
      category: 'English'
    },
    {
      id: 6,
      code: 'CS301',
      name: 'Web Development',
      instructor: 'Dr. Robert Taylor',
      credits: 3,
      schedule: 'Mon/Wed 4:00 PM',
      enrolled: 42,
      capacity: 50,
      description: 'HTML, CSS, JavaScript, React, and modern web technologies.',
      category: 'Computer Science'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Get unique categories
  const categories = ['All', ...new Set(courses.map(c => c.category))];

  // Filter courses based on search and category
  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.instructor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || course.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getAvailabilityColor = (enrolled: number, capacity: number) => {
    const ratio = enrolled / capacity;
    if (ratio >= 1) return 'text-red-600 bg-red-100';
    if (ratio >= 0.8) return 'text-orange-600 bg-orange-100';
    return 'text-green-600 bg-green-100';
  };

  const getAvailabilityText = (enrolled: number, capacity: number) => {
    if (enrolled >= capacity) return 'Full';
    const spots = capacity - enrolled;
    return `${spots} spots left`;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">📖 Course Catalog</h1>
          <p className="text-gray-600">Browse and enroll in available courses for this semester.</p>
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-white rounded-xl shadow-md p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search Input */}
            <div className="flex-1">
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
                <input
                  type="text"
                  placeholder="Search courses, codes, or instructors..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                />
              </div>
            </div>

            {/* Category Filter */}
            <div className="flex gap-2 flex-wrap">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    selectedCategory === category
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results Count */}
        <p className="text-gray-600 mb-4">
          Showing {filteredCourses.length} of {courses.length} courses
        </p>

        {/* Course Grid - Using map (equivalent to *ngFor) */}
        {filteredCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map(course => (
              <div
                key={course.id}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                {/* Course Header */}
                <div className="bg-gradient-to-r from-indigo-500 to-purple-500 p-4">
                  <div className="flex justify-between items-start">
                    <span className="bg-white/20 text-white px-2 py-1 rounded text-sm font-mono">
                      {course.code}
                    </span>
                    <span className="bg-white/20 text-white px-2 py-1 rounded text-sm">
                      {course.credits} Credits
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-white mt-2">{course.name}</h3>
                </div>

                {/* Course Body */}
                <div className="p-4">
                  <p className="text-gray-600 text-sm mb-3">{course.description}</p>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center text-gray-700">
                      <span className="mr-2">👨‍🏫</span>
                      <span>{course.instructor}</span>
                    </div>
                    <div className="flex items-center text-gray-700">
                      <span className="mr-2">📅</span>
                      <span>{course.schedule}</span>
                    </div>
                    <div className="flex items-center text-gray-700">
                      <span className="mr-2">📁</span>
                      <span>{course.category}</span>
                    </div>
                  </div>

                  {/* Enrollment Status */}
                  <div className="mt-4 flex items-center justify-between">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getAvailabilityColor(course.enrolled, course.capacity)}`}>
                      {getAvailabilityText(course.enrolled, course.capacity)}
                    </span>
                    <span className="text-gray-500 text-sm">
                      {course.enrolled}/{course.capacity} enrolled
                    </span>
                  </div>

                  {/* Enroll Button */}
                  <button
                    disabled={course.enrolled >= course.capacity}
                    className={`w-full mt-4 py-2 rounded-lg font-medium transition-all ${
                      course.enrolled >= course.capacity
                        ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                        : 'bg-indigo-600 text-white hover:bg-indigo-700'
                    }`}
                  >
                    {course.enrolled >= course.capacity ? 'Course Full' : 'Enroll Now'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Conditional rendering - equivalent to *ngIf */
          <div className="text-center py-12">
            <span className="text-6xl mb-4 block">🔍</span>
            <h3 className="text-xl font-medium text-gray-900 mb-2">No courses found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseList;
