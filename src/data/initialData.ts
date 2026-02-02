// Initial seed data for the School Portal System
import type { Teacher, Student, Class, Subject, TeacherAssignment, TimetableEntry, ExamResult, AttendanceRecord } from '../types';

// Principal credentials (seeded)
export const PRINCIPAL_CREDENTIALS = {
  email: 'principal@gehs.com',
  password: 'gehs@2005foundingyear.com',
  name: 'Principal Admin',
  role: 'principal' as const,
};

// Sample Classes
export const initialClasses: Class[] = [
  { id: 'cls-1', name: 'Class 5', section: 'A', createdAt: new Date().toISOString() },
  { id: 'cls-2', name: 'Class 5', section: 'B', createdAt: new Date().toISOString() },
  { id: 'cls-3', name: 'Class 6', section: 'A', createdAt: new Date().toISOString() },
  { id: 'cls-4', name: 'Class 7', section: 'A', createdAt: new Date().toISOString() },
  { id: 'cls-5', name: 'Class 8', section: 'A', createdAt: new Date().toISOString() },
  { id: 'cls-6', name: 'Class 9', section: 'A', createdAt: new Date().toISOString() },
  { id: 'cls-7', name: 'Class 10', section: 'A', createdAt: new Date().toISOString() },
];

// Sample Subjects
export const initialSubjects: Subject[] = [
  { id: 'sub-1', name: 'English', code: 'ENG', createdAt: new Date().toISOString() },
  { id: 'sub-2', name: 'Hindi', code: 'HIN', createdAt: new Date().toISOString() },
  { id: 'sub-3', name: 'Marathi', code: 'MAR', createdAt: new Date().toISOString() },
  { id: 'sub-4', name: 'Mathematics', code: 'MAT', createdAt: new Date().toISOString() },
  { id: 'sub-5', name: 'Science', code: 'SCI', createdAt: new Date().toISOString() },
  { id: 'sub-6', name: 'Social Studies', code: 'SST', createdAt: new Date().toISOString() },
  { id: 'sub-7', name: 'Computer Science', code: 'CS', createdAt: new Date().toISOString() },
];

// Sample Teachers
export const initialTeachers: Teacher[] = [
  {
    id: 'tch-1',
    name: 'Mrs. Sunita Sharma',
    email: 'sunita.sharma@gehs.com',
    password: 'teacher123',
    phone: '9876543210',
    qualification: 'M.A. English, B.Ed',
    isActive: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'tch-2',
    name: 'Mr. Rajesh Patil',
    email: 'rajesh.patil@gehs.com',
    password: 'teacher123',
    phone: '9876543211',
    qualification: 'M.Sc. Mathematics, B.Ed',
    isActive: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'tch-3',
    name: 'Mrs. Priya Deshmukh',
    email: 'priya.deshmukh@gehs.com',
    password: 'teacher123',
    phone: '9876543212',
    qualification: 'M.Sc. Physics, B.Ed',
    isActive: true,
    createdAt: new Date().toISOString(),
  },
];

// Sample Students
export const initialStudents: Student[] = [
  {
    id: 'std-1',
    admissionNumber: 'GEHS2024001',
    name: 'Aryan Sharma',
    classId: 'cls-4',
    parentEmail: 'parent1@example.com',
    parentName: 'Mr. Vikram Sharma',
    parentPhone: '9876543220',
    dateOfBirth: '2012-05-15',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'std-2',
    admissionNumber: 'GEHS2024002',
    name: 'Priya Patil',
    classId: 'cls-4',
    parentEmail: 'parent2@example.com',
    parentName: 'Mrs. Anjali Patil',
    parentPhone: '9876543221',
    dateOfBirth: '2012-08-22',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'std-3',
    admissionNumber: 'GEHS2024003',
    name: 'Rahul Deshmukh',
    classId: 'cls-5',
    parentEmail: 'parent1@example.com', // Same parent - sibling
    parentName: 'Mr. Vikram Sharma',
    parentPhone: '9876543220',
    dateOfBirth: '2011-03-10',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'std-4',
    admissionNumber: 'GEHS2024004',
    name: 'Sneha Kulkarni',
    classId: 'cls-6',
    parentEmail: 'parent3@example.com',
    parentName: 'Mr. Suresh Kulkarni',
    parentPhone: '9876543222',
    dateOfBirth: '2010-11-08',
    createdAt: new Date().toISOString(),
  },
];

// Sample Teacher Assignments
export const initialAssignments: TeacherAssignment[] = [
  { id: 'asn-1', teacherId: 'tch-1', classId: 'cls-4', subjectId: 'sub-1', createdAt: new Date().toISOString() },
  { id: 'asn-2', teacherId: 'tch-2', classId: 'cls-4', subjectId: 'sub-4', createdAt: new Date().toISOString() },
  { id: 'asn-3', teacherId: 'tch-3', classId: 'cls-4', subjectId: 'sub-5', createdAt: new Date().toISOString() },
  { id: 'asn-4', teacherId: 'tch-1', classId: 'cls-5', subjectId: 'sub-1', createdAt: new Date().toISOString() },
  { id: 'asn-5', teacherId: 'tch-2', classId: 'cls-5', subjectId: 'sub-4', createdAt: new Date().toISOString() },
  { id: 'asn-6', teacherId: 'tch-3', classId: 'cls-5', subjectId: 'sub-5', createdAt: new Date().toISOString() },
];

// Sample Timetable
export const initialTimetable: TimetableEntry[] = [
  { id: 'tt-1', classId: 'cls-4', subjectId: 'sub-1', teacherId: 'tch-1', dayOfWeek: 0, periodNumber: 1, startTime: '08:00', endTime: '08:45' },
  { id: 'tt-2', classId: 'cls-4', subjectId: 'sub-4', teacherId: 'tch-2', dayOfWeek: 0, periodNumber: 2, startTime: '08:45', endTime: '09:30' },
  { id: 'tt-3', classId: 'cls-4', subjectId: 'sub-5', teacherId: 'tch-3', dayOfWeek: 0, periodNumber: 3, startTime: '09:45', endTime: '10:30' },
  { id: 'tt-4', classId: 'cls-4', subjectId: 'sub-1', teacherId: 'tch-1', dayOfWeek: 1, periodNumber: 1, startTime: '08:00', endTime: '08:45' },
  { id: 'tt-5', classId: 'cls-4', subjectId: 'sub-5', teacherId: 'tch-3', dayOfWeek: 1, periodNumber: 2, startTime: '08:45', endTime: '09:30' },
  { id: 'tt-6', classId: 'cls-5', subjectId: 'sub-1', teacherId: 'tch-1', dayOfWeek: 0, periodNumber: 4, startTime: '10:30', endTime: '11:15' },
  { id: 'tt-7', classId: 'cls-5', subjectId: 'sub-4', teacherId: 'tch-2', dayOfWeek: 0, periodNumber: 5, startTime: '11:15', endTime: '12:00' },
];

// Sample Exam Results
export const initialExamResults: ExamResult[] = [
  { id: 'er-1', studentId: 'std-1', subjectId: 'sub-1', examType: 'Unit Test 1', marksObtained: 42, maxMarks: 50, grade: 'A', createdAt: new Date().toISOString() },
  { id: 'er-2', studentId: 'std-1', subjectId: 'sub-4', examType: 'Unit Test 1', marksObtained: 45, maxMarks: 50, grade: 'A+', createdAt: new Date().toISOString() },
  { id: 'er-3', studentId: 'std-1', subjectId: 'sub-5', examType: 'Unit Test 1', marksObtained: 38, maxMarks: 50, grade: 'B+', createdAt: new Date().toISOString() },
  { id: 'er-4', studentId: 'std-1', subjectId: 'sub-1', examType: 'Midterm', marksObtained: 78, maxMarks: 100, grade: 'A', createdAt: new Date().toISOString() },
  { id: 'er-5', studentId: 'std-1', subjectId: 'sub-4', examType: 'Midterm', marksObtained: 92, maxMarks: 100, grade: 'A+', createdAt: new Date().toISOString() },
  { id: 'er-6', studentId: 'std-2', subjectId: 'sub-1', examType: 'Unit Test 1', marksObtained: 40, maxMarks: 50, grade: 'A', createdAt: new Date().toISOString() },
  { id: 'er-7', studentId: 'std-2', subjectId: 'sub-4', examType: 'Unit Test 1', marksObtained: 35, maxMarks: 50, grade: 'B', createdAt: new Date().toISOString() },
  { id: 'er-8', studentId: 'std-3', subjectId: 'sub-1', examType: 'Unit Test 1', marksObtained: 44, maxMarks: 50, grade: 'A', createdAt: new Date().toISOString() },
];

// Sample Attendance
export const initialAttendance: AttendanceRecord[] = [
  { id: 'att-1', studentId: 'std-1', date: '2024-12-01', status: 'present' },
  { id: 'att-2', studentId: 'std-1', date: '2024-12-02', status: 'present' },
  { id: 'att-3', studentId: 'std-1', date: '2024-12-03', status: 'absent', remarks: 'Sick leave' },
  { id: 'att-4', studentId: 'std-1', date: '2024-12-04', status: 'present' },
  { id: 'att-5', studentId: 'std-1', date: '2024-12-05', status: 'late', remarks: 'Arrived 15 mins late' },
  { id: 'att-6', studentId: 'std-2', date: '2024-12-01', status: 'present' },
  { id: 'att-7', studentId: 'std-2', date: '2024-12-02', status: 'present' },
  { id: 'att-8', studentId: 'std-2', date: '2024-12-03', status: 'present' },
];

// Student Remarks
export const initialRemarks: Record<string, string[]> = {
  'std-1': [
    'Excellent performance in Mathematics. Keep it up!',
    'Needs to improve handwriting in English assignments.',
    'Very active in class discussions.',
  ],
  'std-2': [
    'Good improvement shown in Science practicals.',
    'Regular and punctual student.',
  ],
  'std-3': [
    'Outstanding performance in all subjects.',
    'Shows leadership qualities in group activities.',
  ],
};
