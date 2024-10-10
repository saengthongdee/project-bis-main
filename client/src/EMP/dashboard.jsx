import React, { useEffect, useState } from 'react';
import Dashboard from '../components/dashboard';
import CustomAppBar from '../components/customAppBar';

const DashboardPage = () => {
  const [employee, setEmployee] = useState({});
  const [recentlyCourses, setRecentlyCourses] = useState([]);
  const [status, setStatus] = useState({});
  const [completedCourses, setCompletedCourses] = useState([]);
  const [achievements, setAchievements] = useState([]);
  const [suggestedCourses, setSuggestedCourses] = useState([]);
  const [courses, setCourses] = useState([]);
  const section = { employee_id: 1 };

  const fetchData = async (url, setter) => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      setter(data);
    } catch (error) {
      console.error(`Error fetching ${url}:`, error);
    }
  };

  useEffect(() => {
    const endpoints = [
      { url: `http://localhost:5000/api/employees?id=${section.employee_id}`, setter: setEmployee },
      { url: `http://localhost:5000/api/recent-courses?id=${section.employee_id}`, setter: setRecentlyCourses },
      { url: `http://localhost:5000/api/courses-status?id=${section.employee_id}`, setter: setStatus },
      { url: `http://localhost:5000/api/completed-courses?id=${section.employee_id}`, setter: setCompletedCourses },
      { url: `http://localhost:5000/api/hall-of-fame?id=${section.employee_id}`, setter: setAchievements },
      { url: `http://localhost:5000/api/suggested-courses?id=${section.employee_id}`, setter: setSuggestedCourses },
      { url: `http://localhost:5000/api/enrolled-courses?id=${section.employee_id}`, setter: setCourses },
    ];

    endpoints.forEach(({ url, setter }) => fetchData(url, setter));
  }, [section]);

  return (
    <>
      <CustomAppBar selectedPage={0} />
      <Dashboard
        employee={employee}
        recentlyCourses={recentlyCourses}
        status={status}
        completedCourses={completedCourses}
        achievements={achievements}
        suggestedCourses={suggestedCourses}
        courses={courses}
      />
    </>
  );
};

export default DashboardPage;
