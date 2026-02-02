import { useState } from 'react';
import { DashboardLayout } from '../../components/DashboardLayout';
import { useAuth } from '../../context/AuthContext';
import { studentStorage, classStorage, examResultStorage, attendanceStorage, remarksStorage, subjectStorage } from '../../utils/storage';
import type { Student } from '../../types';

const menuItems = [
  { name: 'Dashboard', path: '/parent', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg> },
];

export function ParentDashboard() {
  const { user } = useAuth();
  const parentEmail = user?.email || '';
  
  const myChildren = studentStorage.getByParentEmail(parentEmail);
  const [selectedChild, setSelectedChild] = useState<Student | null>(myChildren[0] || null);

  const getClassName = (classId: string) => {
    const c = classStorage.getById(classId);
    return c ? `${c.name}-${c.section}` : 'N/A';
  };

  const getSubjectName = (id: string) => subjectStorage.getById(id)?.name || 'Unknown';

  // Get progress data for selected child
  const getProgressData = (studentId: string) => {
    const examResults = examResultStorage.getByStudent(studentId);
    const attendance = attendanceStorage.getByStudent(studentId);
    const remarks = remarksStorage.getByStudent(studentId);

    // Calculate attendance stats
    const totalDays = attendance.length;
    const presentDays = attendance.filter(a => a.status === 'present').length;
    const absentDays = attendance.filter(a => a.status === 'absent').length;
    const lateDays = attendance.filter(a => a.status === 'late').length;
    const attendancePercentage = totalDays > 0 ? Math.round((presentDays / totalDays) * 100) : 0;

    // Group exam results by exam type
    const examTypes = ['Unit Test 1', 'Unit Test 2', 'Midterm', 'Final'] as const;
    const resultsByExam = examTypes.map(examType => ({
      examType,
      results: examResults.filter(r => r.examType === examType)
    })).filter(e => e.results.length > 0);

    return {
      examResults,
      resultsByExam,
      attendance: { totalDays, presentDays, absentDays, lateDays, percentage: attendancePercentage },
      remarks
    };
  };

  const progressData = selectedChild ? getProgressData(selectedChild.id) : null;

  return (
    <DashboardLayout menuItems={menuItems} title="Parent Portal">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-2xl p-6 mb-8 text-white">
        <h2 className="text-2xl font-bold mb-2">Welcome to Parent Portal!</h2>
        <p className="text-white/90">
          View your child's academic progress, attendance, and teacher remarks.
        </p>
      </div>

      {/* Child Selector (if multiple children) */}
      {myChildren.length > 1 && (
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Select Child</label>
          <div className="flex flex-wrap gap-3">
            {myChildren.map((child) => (
              <button
                key={child.id}
                onClick={() => setSelectedChild(child)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl border-2 transition-all ${
                  selectedChild?.id === child.id
                    ? 'border-green-500 bg-green-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                  selectedChild?.id === child.id ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-600'
                }`}>
                  {child.name.charAt(0)}
                </div>
                <div className="text-left">
                  <p className="font-medium text-gray-800">{child.name}</p>
                  <p className="text-xs text-gray-500">{getClassName(child.classId)}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {selectedChild && progressData && (
        <>
          {/* Student Profile */}
          <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
            <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Student Profile
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-gray-50 rounded-xl p-4">
                <p className="text-xs text-gray-500 uppercase tracking-wider">Name</p>
                <p className="font-semibold text-gray-800 mt-1">{selectedChild.name}</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-4">
                <p className="text-xs text-gray-500 uppercase tracking-wider">Admission No.</p>
                <p className="font-semibold text-gray-800 mt-1 font-mono">{selectedChild.admissionNumber}</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-4">
                <p className="text-xs text-gray-500 uppercase tracking-wider">Class</p>
                <p className="font-semibold text-gray-800 mt-1">{getClassName(selectedChild.classId)}</p>
              </div>
              {selectedChild.dateOfBirth && (
                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-xs text-gray-500 uppercase tracking-wider">Date of Birth</p>
                  <p className="font-semibold text-gray-800 mt-1">{new Date(selectedChild.dateOfBirth).toLocaleDateString()}</p>
                </div>
              )}
            </div>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-5 text-white">
              <div className="text-3xl font-bold">{progressData.resultsByExam.length}</div>
              <div className="text-white/80 text-sm">Exams Completed</div>
            </div>
            <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-5 text-white">
              <div className="text-3xl font-bold">{progressData.attendance.percentage}%</div>
              <div className="text-white/80 text-sm">Attendance</div>
            </div>
            <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-5 text-white">
              <div className="text-3xl font-bold">{progressData.attendance.presentDays}</div>
              <div className="text-white/80 text-sm">Days Present</div>
            </div>
            <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl p-5 text-white">
              <div className="text-3xl font-bold">{progressData.remarks.length}</div>
              <div className="text-white/80 text-sm">Teacher Remarks</div>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* Exam Results */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Exam Results
              </h3>
              {progressData.resultsByExam.length > 0 ? (
                <div className="space-y-4">
                  {progressData.resultsByExam.map(({ examType, results }) => (
                    <div key={examType} className="border border-gray-100 rounded-xl overflow-hidden">
                      <div className="bg-gray-50 px-4 py-2 font-medium text-gray-700">{examType}</div>
                      <div className="p-4 space-y-2">
                        {results.map((result) => (
                          <div key={result.id} className="flex items-center justify-between">
                            <span className="text-gray-600">{getSubjectName(result.subjectId)}</span>
                            <div className="flex items-center gap-3">
                              <span className="font-semibold text-gray-800">
                                {result.marksObtained}/{result.maxMarks}
                              </span>
                              {result.grade && (
                                <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                                  result.grade.includes('A') ? 'bg-green-100 text-green-700' :
                                  result.grade.includes('B') ? 'bg-blue-100 text-blue-700' :
                                  'bg-yellow-100 text-yellow-700'
                                }`}>
                                  {result.grade}
                                </span>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <p>No exam results available yet</p>
                </div>
              )}
            </div>

            {/* Attendance & Remarks */}
            <div className="space-y-6">
              {/* Attendance */}
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Attendance Summary
                </h3>
                {progressData.attendance.totalDays > 0 ? (
                  <>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex-1 bg-gray-100 rounded-full h-4 overflow-hidden">
                        <div 
                          className="bg-green-500 h-full transition-all"
                          style={{ width: `${progressData.attendance.percentage}%` }}
                        />
                      </div>
                      <span className="font-bold text-gray-800">{progressData.attendance.percentage}%</span>
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                      <div className="bg-green-50 rounded-xl p-3 text-center">
                        <div className="text-xl font-bold text-green-600">{progressData.attendance.presentDays}</div>
                        <div className="text-xs text-gray-500">Present</div>
                      </div>
                      <div className="bg-red-50 rounded-xl p-3 text-center">
                        <div className="text-xl font-bold text-red-600">{progressData.attendance.absentDays}</div>
                        <div className="text-xs text-gray-500">Absent</div>
                      </div>
                      <div className="bg-yellow-50 rounded-xl p-3 text-center">
                        <div className="text-xl font-bold text-yellow-600">{progressData.attendance.lateDays}</div>
                        <div className="text-xs text-gray-500">Late</div>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="text-center py-4 text-gray-500">
                    <p>No attendance records yet</p>
                  </div>
                )}
              </div>

              {/* Teacher Remarks */}
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                  </svg>
                  Teacher Remarks
                </h3>
                {progressData.remarks.length > 0 ? (
                  <div className="space-y-3">
                    {progressData.remarks.map((remark, index) => (
                      <div key={index} className="bg-purple-50 rounded-xl p-4 border-l-4 border-purple-500">
                        <p className="text-gray-700">{remark}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-4 text-gray-500">
                    <p>No remarks available</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}

      {myChildren.length === 0 && (
        <div className="bg-red-50 rounded-2xl p-8 text-center">
          <svg className="w-16 h-16 mx-auto mb-4 text-red-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <p className="text-red-700 font-medium text-lg">No students linked to your email</p>
          <p className="text-red-600 text-sm mt-2">Please contact the school administration.</p>
        </div>
      )}
    </DashboardLayout>
  );
}
