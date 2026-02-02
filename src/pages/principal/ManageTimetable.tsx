import { useState } from 'react';
import { DashboardLayout } from '../../components/DashboardLayout';
import { timetableStorage, teacherStorage, classStorage, subjectStorage, assignmentStorage, generateId } from '../../utils/storage';
import type { TimetableEntry } from '../../types';

const menuItems = [
  { name: 'Dashboard', path: '/principal', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg> },
  { name: 'Teachers', path: '/principal/teachers', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg> },
  { name: 'Students', path: '/principal/students', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg> },
  { name: 'Classes', path: '/principal/classes', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg> },
  { name: 'Subjects', path: '/principal/subjects', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg> },
  { name: 'Assignments', path: '/principal/assignments', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg> },
  { name: 'Timetable', path: '/principal/timetable', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg> },
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

export function ManageTimetable() {
  const [timetable, setTimetable] = useState<TimetableEntry[]>(timetableStorage.getAll());
  const [selectedClass, setSelectedClass] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingEntry, setEditingEntry] = useState<{ day: number; period: number } | null>(null);
  
  const classes = classStorage.getAll();
  const subjects = subjectStorage.getAll();
  const teachers = teacherStorage.getAll().filter(t => t.isActive);
  const assignments = assignmentStorage.getAll();
  
  const [formData, setFormData] = useState({ subjectId: '', teacherId: '' });

  const refreshTimetable = () => setTimetable(timetableStorage.getAll());

  const getEntry = (day: number, period: number): TimetableEntry | undefined => {
    return timetable.find(t => t.classId === selectedClass && t.dayOfWeek === day && t.periodNumber === period);
  };

  const handleCellClick = (day: number, period: number) => {
    if (!selectedClass) return;
    setEditingEntry({ day, period });
    const existing = getEntry(day, period);
    setFormData({
      subjectId: existing?.subjectId || '',
      teacherId: existing?.teacherId || '',
    });
    setShowModal(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingEntry || !selectedClass) return;
    
    const periodInfo = PERIODS[editingEntry.period - 1];
    const existing = getEntry(editingEntry.day, editingEntry.period);
    
    if (existing) {
      // Update
      const updated: TimetableEntry = {
        ...existing,
        subjectId: formData.subjectId,
        teacherId: formData.teacherId,
      };
      timetableStorage.update(updated);
    } else {
      // Add
      const newEntry: TimetableEntry = {
        id: generateId('tt'),
        classId: selectedClass,
        dayOfWeek: editingEntry.day,
        periodNumber: editingEntry.period,
        subjectId: formData.subjectId,
        teacherId: formData.teacherId,
        startTime: periodInfo.start,
        endTime: periodInfo.end,
      };
      timetableStorage.add(newEntry);
    }
    
    refreshTimetable();
    closeModal();
  };

  const clearEntry = () => {
    if (!editingEntry) return;
    const existing = getEntry(editingEntry.day, editingEntry.period);
    if (existing) {
      timetableStorage.delete(existing.id);
      refreshTimetable();
    }
    closeModal();
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingEntry(null);
  };

  const getSubjectName = (id: string) => subjects.find(s => s.id === id)?.name || '';
  const getTeacherName = (id: string) => teachers.find(t => t.id === id)?.name || '';

  // Get teachers assigned to this class for the dropdown
  const getAssignedTeachers = () => {
    const classAssignments = assignments.filter(a => a.classId === selectedClass);
    return teachers.filter(t => classAssignments.some(a => a.teacherId === t.id));
  };

  return (
    <DashboardLayout menuItems={menuItems} title="Manage Timetable">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-800">Class Timetable</h2>
          <p className="text-gray-500 text-sm">Manage period-wise schedule for each class</p>
        </div>
        <select
          value={selectedClass}
          onChange={(e) => setSelectedClass(e.target.value)}
          className="px-4 py-2 rounded-xl border border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-200 outline-none bg-white min-w-[200px]"
        >
          <option value="">Select a Class</option>
          {classes.map((c) => <option key={c.id} value={c.id}>{c.name}-{c.section}</option>)}
        </select>
      </div>

      {!selectedClass ? (
        <div className="bg-white rounded-2xl p-12 text-center text-gray-500">
          <svg className="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <p className="text-lg font-medium">Select a class to view/edit timetable</p>
        </div>
      ) : (
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
                          <button
                            onClick={() => handleCellClick(dayIndex, period.num)}
                            className={`w-full h-16 rounded-xl border-2 border-dashed transition-all text-left px-3 ${
                              entry 
                                ? 'bg-blue-50 border-blue-200 hover:border-blue-400' 
                                : 'border-gray-200 hover:border-gray-400 hover:bg-gray-50'
                            }`}
                          >
                            {entry ? (
                              <>
                                <div className="font-medium text-sm text-gray-800 truncate">{getSubjectName(entry.subjectId)}</div>
                                <div className="text-xs text-gray-500 truncate">{getTeacherName(entry.teacherId)}</div>
                              </>
                            ) : (
                              <span className="text-gray-400 text-xs">+ Add</span>
                            )}
                          </button>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {showModal && editingEntry && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl">
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              {DAYS[editingEntry.day]} - Period {editingEntry.period}
            </h3>
            <p className="text-gray-500 text-sm mb-6">
              {PERIODS[editingEntry.period - 1].start} - {PERIODS[editingEntry.period - 1].end}
            </p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Subject *</label>
                <select required value={formData.subjectId} onChange={(e) => setFormData({ ...formData, subjectId: e.target.value })} className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-200 outline-none bg-white">
                  <option value="">Select Subject</option>
                  {subjects.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Teacher *</label>
                <select required value={formData.teacherId} onChange={(e) => setFormData({ ...formData, teacherId: e.target.value })} className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-200 outline-none bg-white">
                  <option value="">Select Teacher</option>
                  {(getAssignedTeachers().length > 0 ? getAssignedTeachers() : teachers).map((t) => <option key={t.id} value={t.id}>{t.name}</option>)}
                </select>
              </div>
              <div className="flex gap-3 pt-4">
                <button type="button" onClick={closeModal} className="flex-1 px-4 py-2 border border-gray-200 rounded-xl text-gray-600 hover:bg-gray-50">Cancel</button>
                {getEntry(editingEntry.day, editingEntry.period) && (
                  <button type="button" onClick={clearEntry} className="px-4 py-2 border border-red-200 rounded-xl text-red-600 hover:bg-red-50">Clear</button>
                )}
                <button type="submit" className="flex-1 px-4 py-2 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl font-medium">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
