/**
 * Course Model Interface
 * Used across all hands-on exercises
 * Step 59: Define Course interface
 */
export interface Course {
  id: number;
  name: string;
  code: string;
  credits: number;
  gradeStatus: 'passed' | 'failed' | 'pending';
  instructor?: string;
  schedule?: string;
  enrolled?: number;
  capacity?: number;
  description?: string;
  category?: string;
}

export interface Student {
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
}

export interface Enrollment {
  id: number;
  studentId: string;
  courseId: number;
  enrolledAt: string;
  status: 'active' | 'completed' | 'dropped';
}
