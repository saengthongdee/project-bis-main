import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Course from '../components/course';
import CustomAppBar from '../components/customAppBar';

const CoursesPage = () => {
  const [course, setCourse] = useState(null);
  const [courseStatus, setCourseStatus] = useState('');
  const [courseRatings, setCourseRatings] = useState(new Map());
  const [currentVote, setCurrentVote] = useState(0);

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  
  const location = useLocation();
  const section = { student_id: 1 };

  const fetchData = async (url) => {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Failed to fetch: ${url}`);
    return await response.json();
  };

  const fetchCourseData = async () => {
    const courseId = new URLSearchParams(location.search).get('id');
    setLoading(true);
    
    try {
      const courseData = await fetchData(`http://localhost:5000/api/courses?id=${courseId}`);
      const [statusData, ratingData] = await Promise.all([
        fetchData(`http://localhost:5000/api/course-status?course_id=${courseId}&student_id=${section.student_id}`),
        fetchData(`http://localhost:5000/api/course-rating?course_id=${courseId}`),
      ]);
  
      let voteData = null;
      if (statusData.status !== null) {
        voteData = await fetchData(`http://localhost:5000/api/course-vote?course_id=${courseId}&student_id=${section.student_id}`);
      }
  
      setCourse(courseData[0]);
      setCourseStatus(statusData.status || '');
      setCourseRatings(new Map(Object.entries(ratingData.star || {})));
      setCurrentVote(voteData || 0);
      setError(null);
    } catch (err) {
      console.error('Error fetching data:', err);
      setError(`Error fetching data from the server: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };
  
  const handleRatingSelected = async (rating) => {
    setCurrentVote(rating);
    
    setActionLoading(true);
    try {
      await fetch('http://localhost:5000/api/course-vote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ course_id: course.id, student_id: section.student_id, rating }),
      });
      fetchCourseData();
    } catch (err) {
      console.error('Error updating vote:', err);
      setError(err.message);
    } finally {
      setActionLoading(false);
    }
  };

  const handleEnroll = async () => {
    const endpoint = currentVote !== 0 ? 'unenroll' : 'enroll';
    
    setActionLoading(true);
    try {
      await fetch(`http://localhost:5000/api/${endpoint}`, {
        method: currentVote !== 0 ? 'DELETE' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ course_id: course.id, student_id: section.student_id }),
      });
      alert(currentVote !== 0 ? 'Unenrollment successful!' : 'Enrollment successful!');
      fetchCourseData();
    } catch (err) {
      console.error(`Error ${currentVote !== 0 ? 'unenrolling' : 'enrolling'} in course:`, err);
      setError(err.message);
    } finally {
      setActionLoading(false);
    }
  };

  const handleOpenReviewPopup = () => {
    setShowReviewPopup(true);
  };
  
  const handleCloseReviewPopup = () => {
    setShowReviewPopup(false);
  };
  
  const handleSubmitReview = (review) => {
    setReviewContent(review);
  };  
  
  useEffect(() => {
    let isMounted = true;
    const fetchDataAsync = async () => {
      await fetchCourseData();
      if (!isMounted) return;
    };
    fetchDataAsync();

    return () => { isMounted = false };
  }, [location]);

  return (
    <>
      <CustomAppBar selectedPage={-1} />
      {loading ? (
        <p className='status'>Loading...</p>
      ) : error ? (
        <p className='status'>{error}</p>
      ) : course ? (
        <Course 
          course={course}
          rating={courseRatings}
          status={courseStatus}
          userVote={currentVote}
          onRatingSelected={handleRatingSelected}
          onEnroll={handleEnroll}
        />
      ) : (
        <p className='status'>Course not found.</p>
      )}
      {actionLoading && <p className='status'>Processing your request...</p>}
    </>
  );
};

export default CoursesPage;
