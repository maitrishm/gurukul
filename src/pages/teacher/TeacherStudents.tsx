import { useState } from 'react';
import { DashboardLayout } from '../../components/DashboardLayout';
import { useAuth } from '../../context/AuthContext';
import { assignmentStorage, classStorage, studentStorage } from '../../utils/storage';

const menuItems = [
  { name: 'Dashboard', path: '/teacher', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg> },
  { name: 'My Timetable', path: '/teacher/timetable', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg> },
  { name: 'My Classes', path: '/teacher/classes', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg> },
  { name: 'Students', path: '/teacher/students', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg> },
];

export function TeacherStudents() {
  const { user } = useAuth();
  const teacherId = user?.id || '';
  
  const myAssignments = assignmentStorage.getByTeacher(teacherId);
  const myClassIds = [...new Set(myAssignments.map(a => a.classId))];
  const classes = classStorage.getAll().filter(c => myClassIds.includes(c.id));
  
  const [selectedClass, setSelectedClass] = useState(myClassIds[0] || '');
  const students = selectedClass ? studentStorage.getByClass(selectedClass) : [];

  const getClassName = (id: string) => {
    const c = classStorage.getById(id);
    return c ? `${c.name}-${c.section}` : '';
  };

  return (
    <DashboardLayout menuItems={menuItems} title="My Students">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-800">Students in My Classes</h2>
          <p className="text-gray-500 text-sm">View students from your assigned classes only</p>
        </div>
        <select
          value={selectedClass}
          onChange={(e) => setSelectedClass(e.target.value)}
          className="px-4 py-2 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none bg-white min-w-[200px]"
        >
          <option value="">Select a Class</option>
          {classes.map((c) => <option key={c.id} value={c.id}>{c.name}-{c.section}</option>)}
        </select>
      </div>

      {!selectedClass ? (
        <div className="bg-white rounded-2xl p-12 text-center text-gray-500">
          <svg className="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <p className="text-lg font-medium">Select a class to view students</p>
        </div>
      ) : students.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center text-gray-500">
          <p className="text-lg font-medium">No students in {getClassName(selectedClass)}</p>
        </div>
      ) : (
        <>
          <div className="bg-blue-50 rounded-xl p-4 mb-6">
            <p className="text-blue-700">
              Showing <strong>{students.length}</strong> students from <strong>{getClassName(selectedClass)}</strong>
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Student</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Admission No.</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Parent Name</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Parent Contact</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {students.map((student) => (
                    <tr key={student.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600 font-semibold">
                            {student.name.charAt(0)}
                          </div>
                          <div>
                            <span className="font-medium text-gray-800">{student.name}</span>
                            {student.dateOfBirth && (
                              <p className="text-xs text-gray-500">DOB: {new Date(student.dateOfBirth).toLocaleDateString()}</p>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 font-mono text-sm text-gray-600">{student.admissionNumber}</td>
                      <td className="px-6 py-4 text-gray-600">{student.parentName || '-'}</td>
                      <td className="px-6 py-4 text-gray-600">{student.parentPhone || '-'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {myClassIds.length === 0 && (
        <div className="bg-yellow-50 rounded-2xl p-6 text-center">
          <svg className="w-12 h-12 mx-auto mb-3 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <p className="text-yellow-700 font-medium">No classes assigned to you</p>
          <p className="text-yellow-600 text-sm mt-1">Contact the Principal to get classes assigned.</p>
        </div>
      )}
    </DashboardLayout>
  );
}
