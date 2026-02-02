import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';

// Public Pages
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Academics } from './components/Academics';
import { Facilities } from './components/Facilities';
import { Achievements } from './components/Achievements';
import { Admissions } from './components/Admissions';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';

// Auth Pages
import { StaffLogin } from './pages/StaffLogin';
import { ParentLogin } from './pages/ParentLogin';

// Principal Pages
import { PrincipalDashboard } from './pages/principal/PrincipalDashboard';
import { ManageTeachers } from './pages/principal/ManageTeachers';
import { ManageStudents } from './pages/principal/ManageStudents';
import { ManageClasses } from './pages/principal/ManageClasses';
import { ManageSubjects } from './pages/principal/ManageSubjects';
import { ManageAssignments } from './pages/principal/ManageAssignments';
import { ManageTimetable } from './pages/principal/ManageTimetable';

// Teacher Pages
import { TeacherDashboard } from './pages/teacher/TeacherDashboard';
import { TeacherTimetable } from './pages/teacher/TeacherTimetable';
import { TeacherClasses } from './pages/teacher/TeacherClasses';
import { TeacherStudents } from './pages/teacher/TeacherStudents';

// Parent Pages
import { ParentDashboard } from './pages/parent/ParentDashboard';

// Home Page Component
function HomePage() {
  return (
    <div className="font-sans antialiased">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Academics />
        <Facilities />
        <Achievements />
        <Admissions />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

// Protected Route Component
function ProtectedRoute({ children, allowedRoles }: { children: React.ReactNode; allowedRoles: string[] }) {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-red-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    // Redirect to appropriate dashboard based on role
    if (user.role === 'principal') return <Navigate to="/principal" replace />;
    if (user.role === 'teacher') return <Navigate to="/teacher" replace />;
    if (user.role === 'parent') return <Navigate to="/parent" replace />;
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}

// Dashboard Router - redirects to appropriate dashboard based on role
function DashboardRouter() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-16 h-16 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  switch (user.role) {
    case 'principal':
      return <Navigate to="/principal" replace />;
    case 'teacher':
      return <Navigate to="/teacher" replace />;
    case 'parent':
      return <Navigate to="/parent" replace />;
    default:
      return <Navigate to="/" replace />;
  }
}

// Main App with Routes
function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<StaffLogin />} />
      <Route path="/parent-login" element={<ParentLogin />} />
      
      {/* Dashboard Router */}
      <Route path="/dashboard" element={<DashboardRouter />} />

      {/* Principal Routes */}
      <Route path="/principal" element={
        <ProtectedRoute allowedRoles={['principal']}>
          <PrincipalDashboard />
        </ProtectedRoute>
      } />
      <Route path="/principal/teachers" element={
        <ProtectedRoute allowedRoles={['principal']}>
          <ManageTeachers />
        </ProtectedRoute>
      } />
      <Route path="/principal/students" element={
        <ProtectedRoute allowedRoles={['principal']}>
          <ManageStudents />
        </ProtectedRoute>
      } />
      <Route path="/principal/classes" element={
        <ProtectedRoute allowedRoles={['principal']}>
          <ManageClasses />
        </ProtectedRoute>
      } />
      <Route path="/principal/subjects" element={
        <ProtectedRoute allowedRoles={['principal']}>
          <ManageSubjects />
        </ProtectedRoute>
      } />
      <Route path="/principal/assignments" element={
        <ProtectedRoute allowedRoles={['principal']}>
          <ManageAssignments />
        </ProtectedRoute>
      } />
      <Route path="/principal/timetable" element={
        <ProtectedRoute allowedRoles={['principal']}>
          <ManageTimetable />
        </ProtectedRoute>
      } />

      {/* Teacher Routes */}
      <Route path="/teacher" element={
        <ProtectedRoute allowedRoles={['teacher']}>
          <TeacherDashboard />
        </ProtectedRoute>
      } />
      <Route path="/teacher/timetable" element={
        <ProtectedRoute allowedRoles={['teacher']}>
          <TeacherTimetable />
        </ProtectedRoute>
      } />
      <Route path="/teacher/classes" element={
        <ProtectedRoute allowedRoles={['teacher']}>
          <TeacherClasses />
        </ProtectedRoute>
      } />
      <Route path="/teacher/students" element={
        <ProtectedRoute allowedRoles={['teacher']}>
          <TeacherStudents />
        </ProtectedRoute>
      } />

      {/* Parent Routes */}
      <Route path="/parent" element={
        <ProtectedRoute allowedRoles={['parent']}>
          <ParentDashboard />
        </ProtectedRoute>
      } />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export function App() {
  return (
    <HashRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </HashRouter>
  );
}
