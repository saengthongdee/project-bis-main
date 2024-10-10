import React, { useEffect, useState } from 'react';
import { TitleLarge, TitleSmall, BodyMedium, TitleMedium } from '../styles/styledComponents';
import '../styles/course.css';

const Course = ({ course, rating, status, userVote, onRatingSelected, onEnroll }) => {
  const [imageSrc, setImageSrc] = useState('');
  const [showReviewPopup, setShowReviewPopup] = useState(false);
  const [reviewContent, setReviewContent] = useState('');

  useEffect(() => {
    import(`../assets/courses/${course.image}`)
      .then(image => {
        setImageSrc(image.default);
      })
      .catch(err => {
        setImageSrc('../assets/image-not-found-scaled.png');
      });
  }, [course.image]);

  const CourseDescription = ({ course }) => {
    return (
      <div className='title'>
        <TitleSmall>{course.name}</TitleSmall>
        <div style={{ lineHeight: 1.6 }}>
        <BodyMedium>
          {course.description}
          <br />
          <br />
          • Duration: {course.duration} hours 
          <br />
          • Rating: {course.score != null ? course.score : 'N/A'}
          <br />
          • Instructor: {course.instructor}
          <br />
          • Start Date: {new Date(course.date_start).toLocaleDateString()}
          <br />
          • End Date: {new Date(course.date_end).toLocaleDateString()}
          <br />
          • {course.platform}
        </BodyMedium>
        </div>
      </div>
    );
  };
  
  const RatingBar = ({ status, ratingMap, userVote, onRatingSelected }) => {
    const totalVotes = Array.from(ratingMap.values()).reduce((a, b) => a + b, 0);
  
    return (
      <div className="rating-bar">
        <TitleSmall>Rating</TitleSmall>
        {Array.from(ratingMap.entries())
          .sort((a, b) => b[0] - a[0])
          .map(([star, votes]) => {
            const percentage = totalVotes > 0 ? (votes / totalVotes) * 100 : 0;
            return (
              <RatingRow
                key={star}
                status={status}
                star={star}
                vote={userVote}
                percentage={percentage}
                onClick={() => onRatingSelected(star)}
              />
            );
          })}
      </div>
    );
  };
  
  const RatingRow = ({ status, star, vote, percentage, onClick }) => {
    return (
      <div className="rating-row" onClick={status === 'completed' ? onClick : null}>
        <BodyMedium>{star}</BodyMedium>
        <p className={star <= vote.vote ? "vote" : ""}>★</p>
        <div className="bar-container">
          <div className="bar" style={{ width: `${percentage}%` }} />
        </div>
      </div>
    );
  };
  
  const ReviewAndEnrollButtons = ({ enroll, status, onEnroll, onOpenReviewPopup }) => {
    return (
      <div className='title'>
        {status === 'completed' && (
          <>
            <TitleSmall>Share your thoughts</TitleSmall>
            <BodyMedium>Please share your ideas with others for the benefit of the organization's further development.</BodyMedium>
          </>
        )}
        <div className="review-buttons">
          {status === 'completed' ? (
            <>
              <ActionButton label="Write a review" onClick={onOpenReviewPopup} />
            </>
          ) : (
            <ActionButton label={enroll ? "Check in" : "Enroll"} onClick={onEnroll} />
          )}
        </div>
      </div>
    );
  };

  const ReviewPopup = ({ onClose, onSubmit }) => {
    const [review, setReview] = useState('');

    const handleSubmit = () => {
      if (review.trim() === '') {
        alert("Review can't be empty!");
        return;
      }
    
      fetch('http://localhost:5000/api/reports', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          report_date: new Date().toISOString().split('T')[0],
          report_data: `Course ${course.name}: ${review}`,
        }),
      })
      .then(response => response.json())
      .then(data => {
        if (data.message) {
          console.log('Report submitted:', data);
        } else {
          throw new Error('Report submission failed');
        }
      })
      .catch(error => {
        console.error('Error submitting report:', error);
        alert('Failed to submit report, please try again.');
      });
    };      

    return (
      <div className="popup">
        <div className="popup-content">
          <TitleMedium>Write a Review</TitleMedium>
          <textarea
            value={review}
            onChange={(e) => setReview(e.target.value)}
            placeholder="Write your review here..."
            rows="4"
          />
          <div className="review-buttons">
            <button className="action-button" onClick={handleSubmit}><BodyMedium>Submit</BodyMedium></button>
            <button className="action-button" onClick={onClose}><BodyMedium>Close</BodyMedium></button>
          </div>
        </div>
      </div>
    );
  };
  
  const ActionButton = ({ label, onClick }) => {
    return (
      <button className="action-button" onClick={onClick}>
        <BodyMedium>{label}</BodyMedium>
      </button>
    );
  };

  return (
    <div className='course-content'>
      <div className='title'>
        <TitleLarge>{course.group_name}</TitleLarge>
      </div>
      <div className='course-columns'>
        <img className='course-left-column' src={imageSrc} alt={course.name} />
        <div className='course-right-column'>
          <CourseDescription course={course} />
          {status === 'completed' && (
            <RatingBar 
              status={status} 
              ratingMap={rating} 
              userVote={userVote}
              onRatingSelected={onRatingSelected} 
            />
          )}
          <br />
          <ReviewAndEnrollButtons
            enroll={userVote}
            status={status}
            onEnroll={onEnroll}
            onOpenReviewPopup={() => setShowReviewPopup(true)}
          />
        </div>
      </div>
      {showReviewPopup && (
        <ReviewPopup
          onClose={() => setShowReviewPopup(false)}
          onSubmit={(review) => {
            setReviewContent(review);
            fetch('http://localhost:5000/api/reports', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                report_date: new Date().toISOString().split('T')[0],
                report_data: `Course: ${course.name} \n${review}`, 
              }),
            })
              .then(response => response.json())
              .then(data => {
                if (data.message) {
                  console.log('Report submitted:', data);
                } else {
                  throw new Error('Report submission failed');
                }
              })
              .catch(error => {
                console.error('Error submitting report:', error);
                alert('Failed to submit report, please try again.');
              });                     
          }}
        />
      )}
    </div>
  );
};

export default Course;
