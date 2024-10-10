import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { TitleLarge, TitleMedium, BodyMedium, BodySmall, TitleSmall } from '../styles/styledComponents';
import '../styles/courses.css';

const Header = ({ filterOptions, searchTerm, onSearchChange }) => (
  <header>
    <div className="header">
      <TitleMedium className="header-title">Empower Your Journey</TitleMedium>
      <BodyMedium className="header-subtitle">Explore courses designed to elevate your skills and enhance your career. Start learning today, and achieve your goals.</BodyMedium>
      <div className='search-bar-container'>
        <input 
          className='search-bar' 
          type="text" 
          placeholder="Search courses..." 
          value={searchTerm}
          onChange={onSearchChange}
        />
      </div>
    </div>
    {/* <Separator filterOptions={filterOptions} /> */}
  </header>
);

const Separator = ({ filterOptions }) => (
  <section className="separator">
    {Object.keys(filterOptions).map(filter => (
      <Button variant="outlined" className="filter-button" key={filter}>
        <BodyMedium>{filter}</BodyMedium>
      </Button>
    ))}
  </section>
);

const FilterButton = ({ filter, selectedFilters, setSelectedFilters, filterOptions }) => {
  const handleChange = (event) => {
    const newValue = event.target.value;
    setSelectedFilters(prev => ({
      ...prev,
      [filter]: newValue === 'Cancel' ? null : newValue,
    }));
  };

  return (
    <div className="filter-button-container">
      <FormControl variant="outlined" fullWidth>
        <InputLabel>{filter}</InputLabel>
        <Select
          value={selectedFilters[filter] || ''}
          onChange={handleChange}
          displayEmpty
          className="filter-select"
          IconComponent={() => <span className="filter-icon">▼</span>}
        >
          {filterOptions[filter]?.map(value => (
            <MenuItem key={value} value={value}>{value}</MenuItem>
          ))}
          <MenuItem value="Cancel">Cancel</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
};

const CourseNotFound = () => (
  <div className="course-not-found">
    <TitleLarge>No courses found 404.</TitleLarge>
  </div>
);

const Courses = ({ courses }) => (
  <div className="course-list">
    <CourseList courses={courses} />
  </div>
);

const CourseList = ({ courses }) => (
  <div className="course-list-container">
    {courses.map(course => (
      <CourseBox key={course.id} course={course} />
    ))}
  </div>
);

const CourseBox = ({ course }) => {
  const navigate = useNavigate();
  const handleClick = () => navigate(`/course?id=${course.id}`);
  const [imageSrc, setImageSrc] = useState('');

  useEffect(() => {
    import(`../assets/courses/${course.image}`)
      .then(image => {
        setImageSrc(image.default);
      })
      .catch(err => {
        setImageSrc('../assets/image-not-found-scaled.png');
      });
  }, [course.image]);

  return (
    <article className="course-box" onClick={handleClick}>
      <img className='course-image' src={imageSrc} alt="course.name" />
      <div className="course-info title">
        <TitleSmall>{course.name}</TitleSmall>
        <BodyMedium>{course.description}</BodyMedium>
        <BodyMedium>Duration: {course.duration} days</BodyMedium>
        <BodyMedium>Start Date: {new Date(course.date_start).toLocaleDateString()}</BodyMedium>
        <BodyMedium>End Date: {new Date(course.date_end).toLocaleDateString()}</BodyMedium>
        <BodyMedium>Group Name: {course.group_name}</BodyMedium>
      </div>
    </article>
  );
};

const ContactSection = ({ contactSections }) => (
  <footer className="contact-section">
    <div className="contact-box">
      <div className="contact-info">
        {contactSections.map(section => (
          <div key={section.title} className="contact-item">
            <InfoSection title={section.title} info={section.info} />
          </div>
        ))}
      </div>
    </div>
    <BodySmall className="footer-text">© 2024 Training Company Ltd. All rights reserved.</BodySmall>
  </footer>
);

const InfoSection = ({ title, info }) => (
  <section className="info-section title">
    <TitleSmall>{title}</TitleSmall>
    {Object.entries(info).map(([key, value]) => (
      <BodyMedium key={key}>{`${key}: ${value}`}</BodyMedium>
    ))}
  </section>
);

export { Header, CourseNotFound, Courses, ContactSection };
