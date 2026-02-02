import { DashboardLayout } from '../../components/DashboardLayout';
import { useAuth } from '../../context/AuthContext';
import { assignmentStorage, timetableStorage, classStorage, subjectStorage, studentStorage } from '../../utils/storage';

const menuItems = [
  { name: 'Dashboard', path: '/teacher', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg> },
  { name: 'My Timetable', path: '/teacher/timetable', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg> },
  { name: 'My Classes', path: '/teacher/classes', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg> },
  { name: 'Students', path: '/teacher/students', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg> },
];

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export function TeacherDashboard() {
  const { user } = useAuth();
  const teacherId = user?.id || '';
  
  const myAssignments = assignmentStorage.getByTeacher(teacherId);
  const myTimetable = timetableStorage.getByTeacher(teacherId);
  const classes = classStorage.getAll();
  const subjects = subjectStorage.getAll();
  
  // Get today's timetable
  const today = new Date().getDay();
  const todayIndex = today === 0 ? 6 : today - 1; // Convert to Mon=0 format
  const todaySchedule = myTimetable
    .filter(t => t.dayOfWeek === todayIndex)
    .sort((a, b) => a.periodNumber - b.periodNumber);

  const getClassName = (id: string) => {
    const c = classes.find(c => c.id === id);
    return c ? `${c.name}-${c.section}` : 'Unknown';
  };
  const getSubjectName = (id: string) => subjects.find(s => s.id === id)?.name || 'Unknown';

  // Get unique classes assigned
  const myClassIds = [...new Set(myAssignments.map(a => a.classId))];
  const totalStudents = myClassIds.reduce((sum, classId) => sum + studentStorage.getByClass(classId).length, 0);

  return (
    <DashboardLayout menuItems={menuItems} title="Teacher Dashboard">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-6 mb-8 text-white">
        <h2 className="text-2xl font-bold mb-2">Welcome, {user?.name}!</h2>
        <p className="text-white/90">
          View your schedule, classes, and student information.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="text-3xl mb-2">📚</div>
          <div className="text-3xl font-bold text-gray-800">{myAssignments.length}</div>
          <div className="text-gray-500 text-sm">Subjects Assigned</div>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="text-3xl mb-2">🏫</div>
          <div className="text-3xl font-bold text-gray-800">{myClassIds.length}</div>
          <div className="text-gray-500 text-sm">Classes</div>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="text-3xl mb-2">👨‍🎓</div>
          <div className="text-3xl font-bold text-gray-800">{totalStudents}</div>
          <div className="text-gray-500 text-sm">Total Students</div>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="text-3xl mb-2">📅</div>
          <div className="text-3xl font-bold text-gray-800">{todaySchedule.length}</div>
          <div className="text-gray-500 text-sm">Classes Today</div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Today's Schedule */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Today's Schedule ({DAYS[todayIndex]})
          </h3>
          {todaySchedule.length > 0 ? (
            <div className="space-y-3">
              {todaySchedule.map((entry) => (
                <div key={entry.id} className="flex items-center gap-4 p-3 bg-gray-50 rounded-xl">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                    <span className="font-bold text-blue-600">P{entry.periodNumber}</span>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-800">{getSubjectName(entry.subjectId)}</p>
                    <p className="text-sm text-gray-500">{getClassName(entry.classId)}</p>
                  </div>
                  <div className="text-right text-sm text-gray-500">
                    {entry.startTime} - {entry.endTime}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <p>No classes scheduled for today</p>
            </div>
          )}
        </div>

        {/* My Assignments */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            My Assignments
          </h3>
          {myAssignments.length > 0 ? (
            <div className="space-y-3">
              {myAssignments.map((asn) => (
                <div key={asn.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                    </div>
                    <span className="font-medium text-gray-800">{getSubjectName(asn.subjectId)}</span>
                  </div>
                  <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium">
                    {getClassName(asn.classId)}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <p>No subjects assigned yet</p>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
