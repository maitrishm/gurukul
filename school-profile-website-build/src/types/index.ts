// Types for the School Portal System

export type UserRole = 'principal' | 'teacher' | 'parent';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  password?: string; // Only for principal and teachers
}

export interface Teacher {
  id: string;
  name: string;
  email: string;
  password: string;
  phone?: string;
  address?: string;
  qualification?: string;
  isActive: boolean;
  createdAt: string;
}

export interface Student {
  id: string;
  admissionNumber: string;
  name: string;
  classId: string;
  parentEmail: string;
  parentName?: string;
  parentPhone?: string;
  dateOfBirth?: string;
  address?: string;
  emergencyContact?: string;
  createdAt: string;
}

export interface Class {
  id: string;
  name: string; // e.g., "Class 7"
  section: string; // e.g., "A"
  classTeacherId?: string;
  createdAt: string;
}

export interface Subject {
  id: string;
  name: string;
  code?: string;
  createdAt: string;
}

export interface TeacherAssignment {
  id: string;
  teacherId: string;
  classId: string;
  subjectId: string;
  createdAt: string;
}

export interface TimetableEntry {
  id: string;
  classId: string;
  subjectId: string;
  teacherId: string;
  dayOfWeek: number; // 0-6 (Monday-Saturday)
  periodNumber: number;
  startTime: string;
  endTime: string;
}

export interface ExamResult {
  id: string;
  studentId: string;
  subjectId: string;
  examType: 'Unit Test 1' | 'Unit Test 2' | 'Midterm' | 'Final';
  marksObtained: number;
  maxMarks: number;
  grade?: string;
  remarks?: string;
  createdAt: string;
}

export interface AttendanceRecord {
  id: string;
  studentId: string;
  date: string;
  status: 'present' | 'absent' | 'late';
  remarks?: string;
}

export interface StudentProgress {
  studentId: string;
  examResults: ExamResult[];
  attendance: {
    totalDays: number;
    presentDays: number;
    absentDays: number;
    lateDays: number;
    percentage: number;
  };
  remarks: string[];
}

export interface OTPRecord {
  email: string;
  otp: string;
  expiresAt: number;
  used: boolean;
}
