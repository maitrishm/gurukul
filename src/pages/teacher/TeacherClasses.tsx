import { DashboardLayout } from '../../components/DashboardLayout';
import { useAuth } from '../../context/AuthContext';
import { assignmentStorage, classStorage, subjectStorage, studentStorage } from '../../utils/storage';

const menuItems = [
  { name: 'Dashboard', path: '/teacher', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg> },
  { name: 'My Timetable', path: '/teacher/timetable', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg> },
  { name: 'My Classes', path: '/teacher/classes', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg> },
  { name: 'Students', path: '/teacher/students', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg> },
];

export function TeacherClasses() {
  const { user } = useAuth();
  const teacherId = user?.id || '';
  
  const myAssignments = assignmentStorage.getByTeacher(teacherId);
  const classes = classStorage.getAll();
  const subjects = subjectStorage.getAll();
  
  // Get unique classes with their subjects
  const myClassIds = [...new Set(myAssignments.map(a => a.classId))];
  const myClassesData = myClassIds.map(classId => {
    const cls = classes.find(c => c.id === classId);
    const classSubjects = myAssignments
      .filter(a => a.classId === classId)
      .map(a => subjects.find(s => s.id === a.subjectId)?.name || '');
    const students = studentStorage.getByClass(classId);
    return { cls, subjects: classSubjects, studentCount: students.length };
  }).filter(item => item.cls);

  const getClassName = (id: string) => {
    const c = classes.find(c => c.id === id);
    return c ? `${c.name}-${c.section}` : '';
  };
  const getSubjectName = (id: string) => subjects.find(s => s.id === id)?.name || '';

  return (
    <DashboardLayout menuItems={menuItems} title="My Classes">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-800">Assigned Classes</h2>
        <p className="text-gray-500 text-sm">Classes and subjects you teach</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {myClassesData.map(({ cls, subjects: classSubjects, studentCount }) => (
          <div key={cls!.id} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-start justify-between mb-4">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center text-white font-bold text-lg shadow-lg">
                {cls!.section}
              </div>
              <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                {studentCount} students
              </span>
            </div>
            
            <h3 className="font-bold text-xl text-gray-800 mb-2">{cls!.name}-{cls!.section}</h3>
            
            <div className="mt-4">
              <p className="text-sm text-gray-500 mb-2">Subjects I teach:</p>
              <div className="flex flex-wrap gap-2">
                {classSubjects.map((subject, idx) => (
                  <span key={idx} className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium">
                    {subject}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {myClassesData.length === 0 && (
        <div className="bg-white rounded-2xl p-12 text-center text-gray-500">
          <svg className="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
          <p className="text-lg font-medium">No classes assigned yet</p>
          <p className="text-sm mt-2">Contact the Principal to get classes assigned to you.</p>
        </div>
      )}

      {/* Assignments Summary */}
      {myAssignments.length > 0 && (
        <div className="mt-8 bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <h3 className="font-semibold text-gray-800">All My Assignments</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Class</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Subject</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Students</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {myAssignments.map((asn) => (
                  <tr key={asn.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium">
                        {getClassName(asn.classId)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-800 font-medium">{getSubjectName(asn.subjectId)}</td>
                    <td className="px-6 py-4 text-gray-600">{studentStorage.getByClass(asn.classId).length}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
