import React, { useState, useEffect } from 'react';
import { Header, Courses, ContactSection, CourseNotFound } from '../components/courses';
import CustomAppBar from '../components/customAppBar';

const CoursesPage = () => {
  const [courses, setCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState(''); 
  const [selectedFilters, setSelectedFilters] = useState({});

  useEffect(() => {
    fetch('http://localhost:5000/api/courses')
      .then(response => response.json())
      .then(setCourses)
      .catch(console.error);
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleFilterChange = (filter, value) => {
    setSelectedFilters(prev => ({
      ...prev,
      [filter]: value === 'Cancel' ? null : value,
    }));
  };

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.name.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilters = Object.keys(selectedFilters).every(key => {
      if (!selectedFilters[key]) return true;
      return course[key] === selectedFilters[key];
    });

    return matchesSearch && matchesFilters; 
  });

  const filterOptions = {
    'Course Group': ['Personal Development', 'Management', 'Digital Marketing', 'Sales Techniques', 'Project Management', 'Innovation', 'Team Dynamics'],
    'Duration': ['Less than 1 day', '1-3 days', 'More than 3 days'],
    'Learning Method': ['Online', 'Onsite', 'Hybrid'],
  };

  const contactSections = [
    {
      title: 'Contact Us',
      info: {
        Address: '123 Corporate Avenue, Bangkok, Thailand 10100',
        Phone: '+66 2 345 6789',
        Email: 'support@trainingcompany.com',
        'Business Hours': 'Monday - Friday, 9:00 AM - 6:00 PM',
      },
    },
    {
      title: 'Follow Us',
      info: {
        Facebook: 'facebook.com/TrainingCompany',
        Twitter: 'twitter.com/TrainingCompany',
        LinkedIn: 'linkedin.com/company/TrainingCompany',
        Instagram: 'instagram.com/TrainingCompany',
      },
    },
    {
      title: 'Legal',
      info: {
        'Privacy Policy': 'privacy-policy.com',
        'Terms of Service': 'terms-of-service.com',
        'Cookie Policy': 'cookie-policy.com',
      },
    },
  ];

  return (
    <>
      <CustomAppBar selectedPage={1} />
      <Header 
        filterOptions={filterOptions} 
        selectedFilters={selectedFilters} 
        setSelectedFilters={handleFilterChange} 
        searchTerm={searchTerm} 
        onSearchChange={handleSearchChange} 
      />
      {filteredCourses.length ? <Courses courses={filteredCourses} /> : <CourseNotFound />}
      <ContactSection contactSections={contactSections} />
    </>
  );
};

export default CoursesPage;
