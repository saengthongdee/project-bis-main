import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { CircularProgressbar, buildStyles } from  'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

import AccountIcon from '../assets/account-icon.png';
import { TitleLarge, TitleMedium, TitleSmall, BodyMedium, BodySmall } from '../styles/styledComponents';
import '../styles/dashboard.css';

const Box = ({ left, flex, children }) => (
  <div className={`box ${flex <= 3 ? 'smaller-box' : ''} ${left ? 'left-box' : 'right-box'}`} style={{ flex }}>
    {children}
  </div>
);

const UserInfoBox = ({ employee }) => {
  const { first_name, last_name, email, position, department, date_joined } = employee;
  const hasName = first_name && last_name;

  return (
    <div className="user-info-box">
      <img className="user-icon" src={AccountIcon} alt="account-icon" />
      <div className="user-info-text">
        <TitleMedium>{`${!first_name || !last_name ? 'Name' : ''} ${first_name || ''} ${last_name || ''}`}</TitleMedium>
        <BodyMedium>Email: {email}</BodyMedium>
        <BodyMedium>Position: {position}</BodyMedium>
        <BodyMedium>Department: {department}</BodyMedium>
        <BodyMedium>Start Date: {hasName ? new Date(date_joined).toLocaleDateString() : ''}</BodyMedium>
      </div>
    </div>
  );
};

const CourseRecently = ({ courses, handleClick }) => (
  <div className={`course-grid ${courses.length > 0 ? 'has-courses' : ''}`}>
    {courses.slice(0, 4).map((course, index) => (
      <div key={index} className='course-widget' onClick={() => handleClick(course.id)}>
        <BodySmall>{getInitials(course.name)}</BodySmall>
      </div>
    ))}
  </div>
);

const getInitials = (name) => name.split(' ').map(word => word[0].toUpperCase()).join('');

const ProgressSection = ({ completed, incomplete, enrolled, windowWidth }) => {
  const total = Number(completed) + Number(incomplete) + Number(enrolled);

  const percentages = total
    ? {
        completed: (Number(completed) / total) * 100,
        incomplete: ((Number(incomplete) + Number(completed)) / total) * 100,
        enrolled: ((Number(enrolled) + Number(completed) + Number(incomplete)) / total) * 100
      }
    : { completed: 0, incomplete: 0, enrolled: 0 };

  const renderProgressCircle = (value, color, text = '', textColor = '#3C4252') => (
    <div className="circle-wrapper">
      <CircularProgressbar
        value={value}
        text={text}
        styles={buildStyles({ textSize: '16px', pathColor: color, textColor, trailColor: 'transparent' })}
      />
    </div>
  );

  return (
    <div className="progress-section">
      <div className="progress-info">
        <TitleSmall>Progress</TitleSmall>
        <div className="progress-circle">
          {renderProgressCircle(100, '#D9D9D9')}
          {renderProgressCircle(percentages.enrolled, enrolled === 0 ? '#D9D9D9' : '#3C4252')}
          {renderProgressCircle(percentages.incomplete, incomplete === 0 ? '#D9D9D9' : '#FFC501')}
          {renderProgressCircle(
            percentages.completed,
            completed === 0 ? '#D9D9D9' : '#25D79B',
            total > 0 ? `Total ${total}` : ''
          )}
        </div>
      </div>
      {windowWidth >= 600 && (
        <div className="progress-details">
          {['Completed', 'Incomplete', 'Enrolled'].map((label, index) => {
            const value = [completed, incomplete, enrolled][index];
            const color = ['#25D79B', '#FFC501', '#3C4252'][index];
            return (
              <div className="progress-row" key={label}>
                <div className="progress-color-box" style={{ backgroundColor: color }}></div>
                <div className="progress-text">
                  <BodyMedium>{label}</BodyMedium>
                  <BodyMedium>{value}</BodyMedium>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

const Container = ({ title, items, renderRow }) => (
  <div className="achievements-container">
    <TitleSmall>{title}</TitleSmall>
    {items.map((item, index) => renderRow({ ...item, index }))}
  </div>
);

const Row = ({ name, description, id, score, handleClick, windowWidth }) => (
  <div className='achievement-column' onClick={() => handleClick?.(id)}>
    {windowWidth <= 600 && <><br /><hr /></>}
    <div className="suggested-course-row">
      <div className="suggested-course-icon"></div>
      <div className="achievement-text">
        <div className="suggested-course-score">
          <BodyMedium className='course-score-text'>{name}</BodyMedium>
          {score != null && <>
            <BodyMedium>{score}</BodyMedium>
            <BodyMedium className='course-score-icon' style={{ color: '#FFC501' }}>★</BodyMedium>
          </>}
        </div>
        <BodySmall>{description}</BodySmall>
      </div>
    </div>
  </div>
);

const Section = ({ title, items, handleClick, windowWidth, showScore }) => (
  <Container
    title={title}
    items={items}
    renderRow={({ name, description, id, score }) => (
      <Row
        name={name}
        description={description}
        id={id}
        score={showScore ? score : null}
        handleClick={handleClick}
        windowWidth={windowWidth}
      />
    )}
  />
);

const CompletedCourses = ({ courses, handleClick, windowWidth }) => (
  <Section title="Completed Courses" items={courses} handleClick={handleClick} windowWidth={windowWidth} />
);

const Achievements = ({ achievements, windowWidth }) => (
  <Section title="Achievements" items={achievements} windowWidth={windowWidth} />
);

const SuggestedCourses = ({ courses, handleClick, windowWidth }) => (
  <Section 
    title={`Suggested ${windowWidth >= 500 ? "Courses" : "Cours.."}`} 
    items={courses} 
    handleClick={handleClick} 
    windowWidth={windowWidth} 
    showScore={true} 
  />
);

const CourseRow = ({ course, handleClick }) => (
  <tr onClick={() => handleClick(course.id)}>
    {['assign_by', 'enrollment_date', 'name', 'date_start', 'date_end', 'duration', 'status'].map((key, index) => (
      <td key={index} data-label={`${key.replace('_', ' ').replace(/\b\w/g, char => char.toUpperCase())}:`}>
        <BodyMedium>
          {key.includes('date') ? new Date(course[key]).toLocaleDateString() : course[key]}
        </BodyMedium>
      </td>
    ))}
  </tr>
);

const Dashboard = ({ employee, recentlyCourses, status, completedCourses, achievements, suggestedCourses, courses }) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleClick = (id) => navigate(`/course?id=${id}`);

  const renderUserInfoBox = () => (
    <div className='user-box'>
      <UserInfoBox employee={employee} />
    </div>
  );

  return (
    <div className='dashboard'>
      {windowWidth < 1200 && renderUserInfoBox()}
      <div className="box-container">
        <div className={`column-container`}>
          <div className="row-box">
            <Box left={true} flex={windowWidth >= 600 ? 3 : 5}>
              <div className="recent-courses">
                <TitleSmall>Recently Courses</TitleSmall>
                <CourseRecently courses={recentlyCourses} handleClick={handleClick} />
              </div>
            </Box>
            <Box left={false} flex={windowWidth >= 900 ? 7 : 5}>
              <div className="progress-container">
                <ProgressSection 
                  {...status} 
                  windowWidth={windowWidth} 
                />
                {windowWidth >= 800 && <CompletedCourses courses={completedCourses} handleClick={handleClick} windowWidth={windowWidth} />}
              </div>
            </Box>
          </div>
          <div className="row-box">
            <Box left={true} flex={5}>
              <Achievements achievements={achievements} windowWidth={windowWidth} />
            </Box>
            <Box left={false} flex={5}>
              <SuggestedCourses courses={suggestedCourses} handleClick={handleClick} windowWidth={windowWidth} />
            </Box>
          </div>
        </div>
        {windowWidth >= 1200 && renderUserInfoBox()}
      </div>
      <TitleLarge>My Courses</TitleLarge>
      <table>
        <thead>
          <tr>
            {['Assign by', 'Enroll Date', 'Course Name', 'Start Date', 'End Date', 'Duration', 'Status'].map(title => (
              <th key={title}><TitleSmall>{title}</TitleSmall></th>
            ))}
          </tr>
        </thead>
        <tbody>
          {courses.map((course, index) => (
            <CourseRow key={index} course={course} handleClick={handleClick} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
