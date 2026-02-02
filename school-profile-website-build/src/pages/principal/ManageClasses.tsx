import { useState } from 'react';
import { DashboardLayout } from '../../components/DashboardLayout';
import { classStorage, teacherStorage, studentStorage, generateId } from '../../utils/storage';
import type { Class } from '../../types';

const menuItems = [
  { name: 'Dashboard', path: '/principal', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg> },
  { name: 'Teachers', path: '/principal/teachers', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg> },
  { name: 'Students', path: '/principal/students', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg> },
  { name: 'Classes', path: '/principal/classes', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg> },
  { name: 'Subjects', path: '/principal/subjects', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg> },
  { name: 'Assignments', path: '/principal/assignments', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg> },
  { name: 'Timetable', path: '/principal/timetable', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg> },
];

export function ManageClasses() {
  const [classes, setClasses] = useState<Class[]>(classStorage.getAll());
  const [showModal, setShowModal] = useState(false);
  const [editingClass, setEditingClass] = useState<Class | null>(null);
  const teachers = teacherStorage.getAll();
  
  const [formData, setFormData] = useState({
    name: '',
    section: '',
    classTeacherId: '',
  });

  const refreshClasses = () => {
    setClasses(classStorage.getAll());
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingClass) {
      const updated: Class = {
        ...editingClass,
        ...formData,
      };
      classStorage.update(updated);
    } else {
      const newClass: Class = {
        id: generateId('cls'),
        ...formData,
        createdAt: new Date().toISOString(),
      };
      classStorage.add(newClass);
    }
    
    refreshClasses();
    closeModal();
  };

  const openAddModal = () => {
    setEditingClass(null);
    setFormData({ name: '', section: '', classTeacherId: '' });
    setShowModal(true);
  };

  const openEditModal = (cls: Class) => {
    setEditingClass(cls);
    setFormData({
      name: cls.name,
      section: cls.section,
      classTeacherId: cls.classTeacherId || '',
    });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingClass(null);
  };

  const deleteClass = (id: string) => {
    const studentsInClass = studentStorage.getByClass(id);
    if (studentsInClass.length > 0) {
      alert(`Cannot delete this class. ${studentsInClass.length} students are enrolled in it.`);
      return;
    }
    if (confirm('Are you sure you want to delete this class?')) {
      classStorage.delete(id);
      refreshClasses();
    }
  };

  const getTeacherName = (teacherId?: string) => {
    if (!teacherId) return '-';
    const teacher = teachers.find(t => t.id === teacherId);
    return teacher ? teacher.name : '-';
  };

  const getStudentCount = (classId: string) => {
    return studentStorage.getByClass(classId).length;
  };

  return (
    <DashboardLayout menuItems={menuItems} title="Manage Classes">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-800">Classes & Sections</h2>
          <p className="text-gray-500 text-sm">Manage class/section structure</p>
        </div>
        <button
          onClick={openAddModal}
          className="flex items-center gap-2 bg-gradient-to-r from-red-600 to-red-700 text-white px-4 py-2 rounded-xl font-medium hover:from-red-700 hover:to-red-800 transition-all shadow-lg"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Add Class
        </button>
      </div>

      {/* Classes Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {classes.map((cls) => (
          <div key={cls.id} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex justify-between items-start mb-4">
              <div className="w-14 h-14 bg-purple-100 rounded-2xl flex items-center justify-center">
                <span className="text-purple-600 font-bold text-lg">{cls.section}</span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => openEditModal(cls)}
                  className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </button>
                <button
                  onClick={() => deleteClass(cls.id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
            
            <h3 className="font-bold text-xl text-gray-800 mb-1">{cls.name}-{cls.section}</h3>
            
            <div className="space-y-2 mt-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span>Class Teacher: {getTeacherName(cls.classTeacherId)}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>{getStudentCount(cls.id)} Students</span>
              </div>
            </div>
          </div>
        ))}
        
        {classes.length === 0 && (
          <div className="col-span-full text-center py-12 text-gray-500">
            No classes found. Click "Add Class" to create one.
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl">
            <h3 className="text-xl font-bold text-gray-800 mb-6">
              {editingClass ? 'Edit Class' : 'Add New Class'}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Class Name *</label>
                <select
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-200 outline-none bg-white"
                >
                  <option value="">Select Class</option>
                  {['Nursery', 'Jr. KG', 'Sr. KG', 'Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5', 'Class 6', 'Class 7', 'Class 8', 'Class 9', 'Class 10'].map((name) => (
                    <option key={name} value={name}>{name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Section *</label>
                <select
                  required
                  value={formData.section}
                  onChange={(e) => setFormData({ ...formData, section: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-200 outline-none bg-white"
                >
                  <option value="">Select Section</option>
                  {['A', 'B', 'C', 'D'].map((section) => (
                    <option key={section} value={section}>{section}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Class Teacher (Optional)</label>
                <select
                  value={formData.classTeacherId}
                  onChange={(e) => setFormData({ ...formData, classTeacherId: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-200 outline-none bg-white"
                >
                  <option value="">Select Teacher</option>
                  {teachers.filter(t => t.isActive).map((teacher) => (
                    <option key={teacher.id} value={teacher.id}>{teacher.name}</option>
                  ))}
                </select>
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="flex-1 px-4 py-2 border border-gray-200 rounded-xl text-gray-600 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl font-medium hover:from-red-700 hover:to-red-800"
                >
                  {editingClass ? 'Update' : 'Add Class'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
