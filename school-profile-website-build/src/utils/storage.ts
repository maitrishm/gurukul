// LocalStorage utilities for the School Portal System
import type { Teacher, Student, Class, Subject, TeacherAssignment, TimetableEntry, ExamResult, AttendanceRecord, OTPRecord } from '../types';
import { 
  PRINCIPAL_CREDENTIALS,
  initialTeachers, 
  initialStudents, 
  initialClasses, 
  initialSubjects, 
  initialAssignments, 
  initialTimetable,
  initialExamResults,
  initialAttendance,
  initialRemarks
} from '../data/initialData';

const STORAGE_KEYS = {
  TEACHERS: 'gehs_teachers',
  STUDENTS: 'gehs_students',
  CLASSES: 'gehs_classes',
  SUBJECTS: 'gehs_subjects',
  ASSIGNMENTS: 'gehs_assignments',
  TIMETABLE: 'gehs_timetable',
  EXAM_RESULTS: 'gehs_exam_results',
  ATTENDANCE: 'gehs_attendance',
  REMARKS: 'gehs_remarks',
  OTP_RECORDS: 'gehs_otp_records',
  CURRENT_USER: 'gehs_current_user',
  INITIALIZED: 'gehs_initialized',
};

// Initialize data if not exists
export function initializeData() {
  if (!localStorage.getItem(STORAGE_KEYS.INITIALIZED)) {
    localStorage.setItem(STORAGE_KEYS.TEACHERS, JSON.stringify(initialTeachers));
    localStorage.setItem(STORAGE_KEYS.STUDENTS, JSON.stringify(initialStudents));
    localStorage.setItem(STORAGE_KEYS.CLASSES, JSON.stringify(initialClasses));
    localStorage.setItem(STORAGE_KEYS.SUBJECTS, JSON.stringify(initialSubjects));
    localStorage.setItem(STORAGE_KEYS.ASSIGNMENTS, JSON.stringify(initialAssignments));
    localStorage.setItem(STORAGE_KEYS.TIMETABLE, JSON.stringify(initialTimetable));
    localStorage.setItem(STORAGE_KEYS.EXAM_RESULTS, JSON.stringify(initialExamResults));
    localStorage.setItem(STORAGE_KEYS.ATTENDANCE, JSON.stringify(initialAttendance));
    localStorage.setItem(STORAGE_KEYS.REMARKS, JSON.stringify(initialRemarks));
    localStorage.setItem(STORAGE_KEYS.INITIALIZED, 'true');
  }
}

// Generic getter/setter
function getData<T>(key: string, defaultValue: T): T {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : defaultValue;
}

function setData<T>(key: string, data: T): void {
  localStorage.setItem(key, JSON.stringify(data));
}

// Teachers
export const teacherStorage = {
  getAll: (): Teacher[] => getData(STORAGE_KEYS.TEACHERS, []),
  getById: (id: string): Teacher | undefined => {
    return teacherStorage.getAll().find(t => t.id === id);
  },
  getByEmail: (email: string): Teacher | undefined => {
    return teacherStorage.getAll().find(t => t.email.toLowerCase() === email.toLowerCase());
  },
  add: (teacher: Teacher): void => {
    const teachers = teacherStorage.getAll();
    teachers.push(teacher);
    setData(STORAGE_KEYS.TEACHERS, teachers);
  },
  update: (teacher: Teacher): void => {
    const teachers = teacherStorage.getAll();
    const index = teachers.findIndex(t => t.id === teacher.id);
    if (index !== -1) {
      teachers[index] = teacher;
      setData(STORAGE_KEYS.TEACHERS, teachers);
    }
  },
  delete: (id: string): void => {
    const teachers = teacherStorage.getAll().filter(t => t.id !== id);
    setData(STORAGE_KEYS.TEACHERS, teachers);
  },
};

// Students
export const studentStorage = {
  getAll: (): Student[] => getData(STORAGE_KEYS.STUDENTS, []),
  getById: (id: string): Student | undefined => {
    return studentStorage.getAll().find(s => s.id === id);
  },
  getByClass: (classId: string): Student[] => {
    return studentStorage.getAll().filter(s => s.classId === classId);
  },
  getByParentEmail: (email: string): Student[] => {
    return studentStorage.getAll().filter(s => s.parentEmail.toLowerCase() === email.toLowerCase());
  },
  add: (student: Student): void => {
    const students = studentStorage.getAll();
    students.push(student);
    setData(STORAGE_KEYS.STUDENTS, students);
  },
  update: (student: Student): void => {
    const students = studentStorage.getAll();
    const index = students.findIndex(s => s.id === student.id);
    if (index !== -1) {
      students[index] = student;
      setData(STORAGE_KEYS.STUDENTS, students);
    }
  },
  delete: (id: string): void => {
    const students = studentStorage.getAll().filter(s => s.id !== id);
    setData(STORAGE_KEYS.STUDENTS, students);
  },
};

// Classes
export const classStorage = {
  getAll: (): Class[] => getData(STORAGE_KEYS.CLASSES, []),
  getById: (id: string): Class | undefined => {
    return classStorage.getAll().find(c => c.id === id);
  },
  add: (cls: Class): void => {
    const classes = classStorage.getAll();
    classes.push(cls);
    setData(STORAGE_KEYS.CLASSES, classes);
  },
  update: (cls: Class): void => {
    const classes = classStorage.getAll();
    const index = classes.findIndex(c => c.id === cls.id);
    if (index !== -1) {
      classes[index] = cls;
      setData(STORAGE_KEYS.CLASSES, classes);
    }
  },
  delete: (id: string): void => {
    const classes = classStorage.getAll().filter(c => c.id !== id);
    setData(STORAGE_KEYS.CLASSES, classes);
  },
};

// Subjects
export const subjectStorage = {
  getAll: (): Subject[] => getData(STORAGE_KEYS.SUBJECTS, []),
  getById: (id: string): Subject | undefined => {
    return subjectStorage.getAll().find(s => s.id === id);
  },
  add: (subject: Subject): void => {
    const subjects = subjectStorage.getAll();
    subjects.push(subject);
    setData(STORAGE_KEYS.SUBJECTS, subjects);
  },
  update: (subject: Subject): void => {
    const subjects = subjectStorage.getAll();
    const index = subjects.findIndex(s => s.id === subject.id);
    if (index !== -1) {
      subjects[index] = subject;
      setData(STORAGE_KEYS.SUBJECTS, subjects);
    }
  },
  delete: (id: string): void => {
    const subjects = subjectStorage.getAll().filter(s => s.id !== id);
    setData(STORAGE_KEYS.SUBJECTS, subjects);
  },
};

// Teacher Assignments
export const assignmentStorage = {
  getAll: (): TeacherAssignment[] => getData(STORAGE_KEYS.ASSIGNMENTS, []),
  getByTeacher: (teacherId: string): TeacherAssignment[] => {
    return assignmentStorage.getAll().filter(a => a.teacherId === teacherId);
  },
  getByClass: (classId: string): TeacherAssignment[] => {
    return assignmentStorage.getAll().filter(a => a.classId === classId);
  },
  add: (assignment: TeacherAssignment): void => {
    const assignments = assignmentStorage.getAll();
    assignments.push(assignment);
    setData(STORAGE_KEYS.ASSIGNMENTS, assignments);
  },
  delete: (id: string): void => {
    const assignments = assignmentStorage.getAll().filter(a => a.id !== id);
    setData(STORAGE_KEYS.ASSIGNMENTS, assignments);
  },
  deleteByTeacher: (teacherId: string): void => {
    const assignments = assignmentStorage.getAll().filter(a => a.teacherId !== teacherId);
    setData(STORAGE_KEYS.ASSIGNMENTS, assignments);
  },
};

// Timetable
export const timetableStorage = {
  getAll: (): TimetableEntry[] => getData(STORAGE_KEYS.TIMETABLE, []),
  getByClass: (classId: string): TimetableEntry[] => {
    return timetableStorage.getAll().filter(t => t.classId === classId);
  },
  getByTeacher: (teacherId: string): TimetableEntry[] => {
    return timetableStorage.getAll().filter(t => t.teacherId === teacherId);
  },
  add: (entry: TimetableEntry): void => {
    const timetable = timetableStorage.getAll();
    timetable.push(entry);
    setData(STORAGE_KEYS.TIMETABLE, timetable);
  },
  update: (entry: TimetableEntry): void => {
    const timetable = timetableStorage.getAll();
    const index = timetable.findIndex(t => t.id === entry.id);
    if (index !== -1) {
      timetable[index] = entry;
      setData(STORAGE_KEYS.TIMETABLE, timetable);
    }
  },
  delete: (id: string): void => {
    const timetable = timetableStorage.getAll().filter(t => t.id !== id);
    setData(STORAGE_KEYS.TIMETABLE, timetable);
  },
};

// Exam Results
export const examResultStorage = {
  getAll: (): ExamResult[] => getData(STORAGE_KEYS.EXAM_RESULTS, []),
  getByStudent: (studentId: string): ExamResult[] => {
    return examResultStorage.getAll().filter(e => e.studentId === studentId);
  },
  add: (result: ExamResult): void => {
    const results = examResultStorage.getAll();
    results.push(result);
    setData(STORAGE_KEYS.EXAM_RESULTS, results);
  },
  update: (result: ExamResult): void => {
    const results = examResultStorage.getAll();
    const index = results.findIndex(r => r.id === result.id);
    if (index !== -1) {
      results[index] = result;
      setData(STORAGE_KEYS.EXAM_RESULTS, results);
    }
  },
};

// Attendance
export const attendanceStorage = {
  getAll: (): AttendanceRecord[] => getData(STORAGE_KEYS.ATTENDANCE, []),
  getByStudent: (studentId: string): AttendanceRecord[] => {
    return attendanceStorage.getAll().filter(a => a.studentId === studentId);
  },
  add: (record: AttendanceRecord): void => {
    const records = attendanceStorage.getAll();
    records.push(record);
    setData(STORAGE_KEYS.ATTENDANCE, records);
  },
};

// Remarks
export const remarksStorage = {
  getAll: (): Record<string, string[]> => getData(STORAGE_KEYS.REMARKS, {}),
  getByStudent: (studentId: string): string[] => {
    const remarks = remarksStorage.getAll();
    return remarks[studentId] || [];
  },
  add: (studentId: string, remark: string): void => {
    const remarks = remarksStorage.getAll();
    if (!remarks[studentId]) {
      remarks[studentId] = [];
    }
    remarks[studentId].push(remark);
    setData(STORAGE_KEYS.REMARKS, remarks);
  },
};

// OTP Management
export const otpStorage = {
  generate: (email: string): string => {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const records: OTPRecord[] = getData(STORAGE_KEYS.OTP_RECORDS, []);
    
    // Remove existing OTP for this email
    const filtered = records.filter(r => r.email.toLowerCase() !== email.toLowerCase());
    
    // Add new OTP (expires in 10 minutes)
    filtered.push({
      email: email.toLowerCase(),
      otp,
      expiresAt: Date.now() + 10 * 60 * 1000,
      used: false,
    });
    
    setData(STORAGE_KEYS.OTP_RECORDS, filtered);
    return otp;
  },
  verify: (email: string, otp: string): boolean => {
    const records: OTPRecord[] = getData(STORAGE_KEYS.OTP_RECORDS, []);
    const record = records.find(
      r => r.email.toLowerCase() === email.toLowerCase() && 
           r.otp === otp && 
           !r.used && 
           r.expiresAt > Date.now()
    );
    
    if (record) {
      record.used = true;
      setData(STORAGE_KEYS.OTP_RECORDS, records);
      return true;
    }
    return false;
  },
};

// Authentication
export const authStorage = {
  login: (email: string, password: string): { success: boolean; user?: { id: string; email: string; name: string; role: 'principal' | 'teacher' } } => {
    // Check principal
    if (email.toLowerCase() === PRINCIPAL_CREDENTIALS.email.toLowerCase() && password === PRINCIPAL_CREDENTIALS.password) {
      const user = { id: 'principal', email: PRINCIPAL_CREDENTIALS.email, name: PRINCIPAL_CREDENTIALS.name, role: 'principal' as const };
      setData(STORAGE_KEYS.CURRENT_USER, user);
      return { success: true, user };
    }
    
    // Check teachers
    const teacher = teacherStorage.getByEmail(email);
    if (teacher && teacher.password === password && teacher.isActive) {
      const user = { id: teacher.id, email: teacher.email, name: teacher.name, role: 'teacher' as const };
      setData(STORAGE_KEYS.CURRENT_USER, user);
      return { success: true, user };
    }
    
    return { success: false };
  },
  parentLogin: (email: string): { success: boolean; students?: Student[] } => {
    const students = studentStorage.getByParentEmail(email);
    if (students.length > 0) {
      const user = { id: email, email, name: 'Parent', role: 'parent' as const, studentIds: students.map(s => s.id) };
      setData(STORAGE_KEYS.CURRENT_USER, user);
      return { success: true, students };
    }
    return { success: false };
  },
  getCurrentUser: () => {
    return getData(STORAGE_KEYS.CURRENT_USER, null);
  },
  logout: () => {
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
  },
};

// Generate unique IDs
export function generateId(prefix: string): string {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}
