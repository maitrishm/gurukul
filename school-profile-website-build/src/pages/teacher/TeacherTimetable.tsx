import { DashboardLayout } from '../../components/DashboardLayout';
import { useAuth } from '../../context/AuthContext';
import { timetableStorage, classStorage, subjectStorage } from '../../utils/storage';

const menuItems = [
  { name: 'Dashboard', path: '/teacher', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg> },
  { name: 'My Timetable', path: '/teacher/timetable', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg> },
  { name: 'My Classes', path: '/teacher/classes', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg> },
  { name: 'Students', path: '/teacher/students', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg> },
];

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const PERIODS = [
  { num: 1, start: '08:00', end: '08:45' },
  { num: 2, start: '08:45', end: '09:30' },
  { num: 3, start: '09:45', end: '10:30' },
  { num: 4, start: '10:30', end: '11:15' },
  { num: 5, start: '11:15', end: '12:00' },
  { num: 6, start: '12:45', end: '13:30' },
  { num: 7, start: '13:30', end: '14:15' },
  { num: 8, start: '14:15', end: '15:00' },
];

export function TeacherTimetable() {
  const { user } = useAuth();
  const teacherId = user?.id || '';
  
  const myTimetable = timetableStorage.getByTeacher(teacherId);
  const classes = classStorage.getAll();
  const subjects = subjectStorage.getAll();

  const getEntry = (day: number, period: number) => {
    return myTimetable.find(t => t.dayOfWeek === day && t.periodNumber === period);
  };

  const getClassName = (id: string) => {
    const c = classes.find(c => c.id === id);
    return c ? `${c.name}-${c.section}` : '';
  };
  const getSubjectName = (id: string) => subjects.find(s => s.id === id)?.name || '';

  return (
    <DashboardLayout menuItems={menuItems} title="My Timetable">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-800">Weekly Schedule</h2>
        <p className="text-gray-500 text-sm">Your teaching schedule for the week</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase w-24">Period</th>
                {DAYS.map((day) => (
                  <th key={day} className="px-4 py-3 text-center text-xs font-semibold text-gray-500 uppercase">{day}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {PERIODS.map((period) => (
                <tr key={period.num} className="border-t border-gray-100">
                  <td className="px-4 py-2 text-sm">
                    <div className="font-medium text-gray-800">Period {period.num}</div>
                    <div className="text-xs text-gray-500">{period.start} - {period.end}</div>
                  </td>
                  {DAYS.map((_, dayIndex) => {
                    const entry = getEntry(dayIndex, period.num);
                    return (
                      <td key={dayIndex} className="px-2 py-2">
                        {entry ? (
                          <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 h-16">
                            <div className="font-medium text-sm text-gray-800 truncate">{getSubjectName(entry.subjectId)}</div>
                            <div className="text-xs text-blue-600 truncate">{getClassName(entry.classId)}</div>
                          </div>
                        ) : (
                          <div className="h-16 border-2 border-dashed border-gray-100 rounded-xl flex items-center justify-center">
                            <span className="text-gray-300 text-xs">Free</span>
                          </div>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Summary */}
      <div className="mt-6 bg-blue-50 rounded-2xl p-6">
        <h3 className="font-semibold text-gray-800 mb-3">Schedule Summary</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {DAYS.map((day, dayIndex) => {
            const dayClasses = myTimetable.filter(t => t.dayOfWeek === dayIndex);
            return (
              <div key={day} className="bg-white rounded-xl p-4 text-center">
                <div className="font-medium text-gray-700">{day}</div>
                <div className="text-2xl font-bold text-blue-600 mt-1">{dayClasses.length}</div>
                <div className="text-xs text-gray-500">periods</div>
              </div>
            );
          })}
        </div>
      </div>
    </DashboardLayout>
  );
}
