import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import CustomAppBar from './customAppBar';
import DashboardPage from '../EMP/dashboard';
import CoursesPage from '../EMP/courses';
import CoursePage from '../EMP/course';

const AppBar = () => {
  const location = useLocation();

  // ฟังก์ชันที่ใช้ตรวจสอบ pathname และส่งค่าตัวเลขเพื่อบอกหน้าที่เลือกอยู่
  const getSelectedPage = () => {
    const pageMap = {
      '/dashboard': 0,
      '/courses': 1,
      '/course': -1,
    };
    return pageMap[location.pathname] || 0;
  };

  return (
    <>
      <CustomAppBar selectedPage={getSelectedPage()} />
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/courses" element={<CoursesPage />} />
        <Route path="/course" element={<CoursePage />} />
      </Routes>
    </>
  );
};

export default AppBar;