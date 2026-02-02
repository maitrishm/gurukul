import { useState } from 'react';
import { DashboardLayout } from '../../components/DashboardLayout';
import { assignmentStorage, teacherStorage, classStorage, subjectStorage, generateId } from '../../utils/storage';
import type { TeacherAssignment } from '../../types';

const menuItems = [
  { name: 'Dashboard', path: '/principal', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg> },
  { name: 'Teachers', path: '/principal/teachers', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg> },
  { name: 'Students', path: '/principal/students', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg> },
  { name: 'Classes', path: '/principal/classes', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg> },
  { name: 'Subjects', path: '/principal/subjects', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg> },
  { name: 'Assignments', path: '/principal/assignments', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg> },
  { name: 'Timetable', path: '/principal/timetable', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg> },
];

export function ManageAssignments() {
  const [assignments, setAssignments] = useState<TeacherAssignment[]>(assignmentStorage.getAll());
  const [showModal, setShowModal] = useState(false);
  const teachers = teacherStorage.getAll().filter(t => t.isActive);
  const classes = classStorage.getAll();
  const subjects = subjectStorage.getAll();
  
  const [formData, setFormData] = useState({ teacherId: '', classId: '', subjectId: '' });

  const refreshAssignments = () => setAssignments(assignmentStorage.getAll());

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Check if assignment already exists
    const exists = assignments.find(a => 
      a.teacherId === formData.teacherId && 
      a.classId === formData.classId && 
      a.subjectId === formData.subjectId
    );
    if (exists) {
      alert('This assignment already exists!');
      return;
    }
    assignmentStorage.add({ id: generateId('asn'), ...formData, createdAt: new Date().toISOString() });
    refreshAssignments();
    closeModal();
  };

  const openAddModal = () => {
    setFormData({ teacherId: '', classId: '', subjectId: '' });
    setShowModal(true);
  };

  const closeModal = () => setShowModal(false);

  const deleteAssignment = (id: string) => {
    if (confirm('Remove this assignment?')) {
      assignmentStorage.delete(id);
      refreshAssignments();
    }
  };

  const getTeacherName = (id: string) => teachers.find(t => t.id === id)?.name || 'Unknown';
  const getClassName = (id: string) => { const c = classes.find(c => c.id === id); return c ? `${c.name}-${c.section}` : 'Unknown'; };
  const getSubjectName = (id: string) => subjects.find(s => s.id === id)?.name || 'Unknown';

  // Group by teacher
  const groupedByTeacher = teachers.map(teacher => ({
    teacher,
    assignments: assignments.filter(a => a.teacherId === teacher.id)
  })).filter(g => g.assignments.length > 0);

  return (
    <DashboardLayout menuItems={menuItems} title="Teacher Assignments">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-800">Teacher-Class-Subject Assignments</h2>
          <p className="text-gray-500 text-sm">Assign teachers to classes and subjects</p>
        </div>
        <button onClick={openAddModal} className="flex items-center gap-2 bg-gradient-to-r from-red-600 to-red-700 text-white px-4 py-2 rounded-xl font-medium hover:from-red-700 hover:to-red-800 transition-all shadow-lg">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
          Add Assignment
        </button>
      </div>

      {/* Assignments by Teacher */}
      <div className="space-y-6">
        {groupedByTeacher.map(({ teacher, assignments: teacherAssignments }) => (
          <div key={teacher.id} className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold">
                {teacher.name.charAt(0)}
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">{teacher.name}</h3>
                <p className="text-sm text-gray-500">{teacher.email}</p>
              </div>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {teacherAssignments.map((asn) => (
                <div key={asn.id} className="flex items-center justify-between bg-gray-50 rounded-xl p-3">
                  <div>
                    <span className="text-sm font-medium text-gray-800">{getSubjectName(asn.subjectId)}</span>
                    <span className="text-xs text-gray-500 ml-2">({getClassName(asn.classId)})</span>
                  </div>
                  <button onClick={() => deleteAssignment(asn.id)} className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
        
        {groupedByTeacher.length === 0 && (
          <div className="bg-white rounded-2xl p-12 text-center text-gray-500">
            No assignments yet. Click "Add Assignment" to assign teachers to classes.
          </div>
        )}
      </div>

      {/* All Assignments Table */}
      <div className="mt-8 bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h3 className="font-semibold text-gray-800">All Assignments</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Teacher</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Class</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Subject</th>
                <th className="px-6 py-3 text-right text-xs font-semibold text-gray-500 uppercase">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {assignments.map((asn) => (
                <tr key={asn.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-gray-800">{getTeacherName(asn.teacherId)}</td>
                  <td className="px-6 py-4"><span className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium">{getClassName(asn.classId)}</span></td>
                  <td className="px-6 py-4 text-gray-600">{getSubjectName(asn.subjectId)}</td>
                  <td className="px-6 py-4 text-right">
                    <button onClick={() => deleteAssignment(asn.id)} className="text-red-600 hover:text-red-800">Remove</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl">
            <h3 className="text-xl font-bold text-gray-800 mb-6">Assign Teacher to Class</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Teacher *</label>
                <select required value={formData.teacherId} onChange={(e) => setFormData({ ...formData, teacherId: e.target.value })} className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-200 outline-none bg-white">
                  <option value="">Select Teacher</option>
                  {teachers.map((t) => <option key={t.id} value={t.id}>{t.name}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Class *</label>
                <select required value={formData.classId} onChange={(e) => setFormData({ ...formData, classId: e.target.value })} className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-200 outline-none bg-white">
                  <option value="">Select Class</option>
                  {classes.map((c) => <option key={c.id} value={c.id}>{c.name}-{c.section}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Subject *</label>
                <select required value={formData.subjectId} onChange={(e) => setFormData({ ...formData, subjectId: e.target.value })} className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-200 outline-none bg-white">
                  <option value="">Select Subject</option>
                  {subjects.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
                </select>
              </div>
              <div className="flex gap-3 pt-4">
                <button type="button" onClick={closeModal} className="flex-1 px-4 py-2 border border-gray-200 rounded-xl text-gray-600 hover:bg-gray-50">Cancel</button>
                <button type="submit" className="flex-1 px-4 py-2 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl font-medium">Assign</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
