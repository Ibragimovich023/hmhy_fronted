import { Route, Routes } from "react-router-dom";
import { Toaster } from "sonner";

import { MainLayout } from "./layout/main-layout";
import { TeacherLayout } from "./layout/teacher-layout";
import { StudentLayout } from "./layout/student-layout";

import adminRoute from "./routes/admin-route";
import teacherRoute from "./routes/teacher-route";
import studentRoute from "./routes/student-route";

import RoleSelect from "./landing/selct-role";

import Login from "./pages/auth/login";
import { TeacherLogin } from "./pages/teacher/login";
import { TeacherOTPVerify } from "./pages/teacher/otp-verify";
import StudentLogin from "./pages/student/login";

import { Dashboard } from "./pages/admin/dashboard/dashboard";
import { TeacherDashboard } from "./pages/teacher/dashboard/dashboard";
import StudentDashboard from "./pages/student/dashboard/dashboard";

import Telegram from "./pages/student/telegram";

function App() {
  return (
    <>
      <Toaster richColors position="top-right" />
      
      <Routes>
        {/* --- PUBLIC & LANDING --- */}
        <Route path="/" element={<RoleSelect />} />
        <Route path="/telegram" element={<Telegram />} />

        {/* --- STUDENT SECTOR --- */}
        <Route path="/student/login" element={<StudentLogin />} />
        <Route path="/student" element={<StudentLayout />}>
          <Route index element={<StudentDashboard />} />
          {studentRoute.map(({ page: Page, path }) => (
            <Route key={path} path={path} element={<Page />} />
          ))}
        </Route>

        {/* --- TEACHER SECTOR --- */}
        <Route path="/teacher/login" element={<TeacherLogin />} />
        <Route path="/teacher/otp-verify" element={<TeacherOTPVerify />} />
        <Route path="/teacher" element={<TeacherLayout />}>
          <Route index element={<TeacherDashboard />} />
          {teacherRoute.map(({ page: Page, path }) => (
            <Route key={path} path={path} element={<Page />} />
          ))}
        </Route>

        {/* --- ADMIN & SUPERADMIN SECTOR --- */}
        <Route path="/admin/login" element={<Login />} />
        <Route path="/app" element={<MainLayout />}>
          {/* Admin Routes */}
          <Route path="admin">
            <Route index element={<Dashboard />} />
            {adminRoute.map(({ page: Page, path }) => (
              <Route key={path} path={path} element={<Page />} />
            ))}
          </Route>

          {/* Superadmin Routes */}
          <Route path="superadmin">
            <Route index element={<Dashboard />} />
            {adminRoute.map(({ page: Page, path }) => (
              <Route key={path} path={path} element={<Page />} />
            ))}
          </Route>
        </Route>

        <Route path="*" element={
          <div className="flex h-screen items-center justify-center bg-black text-white font-black italic uppercase tracking-widest text-xl">
            404 - Sequence Not Found
          </div>
        } />
      </Routes>
    </>
  );
}

export default App;