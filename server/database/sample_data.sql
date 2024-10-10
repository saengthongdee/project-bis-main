INSERT INTO roles (name, description, permissions)
VALUES
(
    'Admin', 
    'System Administrator with full access', 
    '{
        "create": true, 
        "read": true, 
        "update": true,
        "delete": true
    }'
),
(
    'Manager', 
    'Design and plan courses for developing personnel in organizations', 
    '{
        "create": true, 
        "read": true, 
        "update": true,  
        "delete": false
    }'
),
(
    'Employee', 
    'Standard employee with limited access', 
    '{
        "create": false, 
        "read": true, 
        "update": true, 
        "delete": false
    }'
);

INSERT INTO positions (name, description)
VALUES
(
    'HR Manager', 
    'Manages human resources and employee relations'
),
(
    'Software Developer', 
    'Develops and maintains software applications'
);

INSERT INTO departments (name, description)
VALUES
(
    'Human Resources', 
    'Manages employee recruitment, employee relations, and welfare'
),
(
    'IT Department', 
    'Handles all tech-related tasks, software development, data analysis, and support'
);

INSERT INTO employees (first_name, last_name, email, role_id, position_id, department_id, date_joined, status)
VALUES
(
    'John', 
    'Doe', 
    'john.doe@example.com', 
    1, 
    2, 
    2, 
    '2022-01-10', 
    'active'
),
(
    'Jane', 
    'Smith', 
    'jane.smith@example.com', 
    2, 
    1, 
    1, 
    '2022-01-11', 
    'active'
),
(
    'Alice', 
    'Johnson', 
    'alice.johnson@example.com', 
    3, 
    2, 
    2, 
    '2022-01-12', 
    'active'
),
(
    'Michael', 
    'Brown', 
    'michael.brown@example.com', 
    3,
    2,
    2,
    '2022-01-13', 
    'inactive'
),
(
    'Emily', 
    'Davis', 
    'emily.davis@example.com', 
    3,
    2,
    2,
    '2022-01-14', 
    'terminated'
);

INSERT INTO auth (user_id, email, hashed_password)
VALUES
(
    1, 
    'john.doe@example.com', 
    'hashed_password'
),
(
    2, 
    'jane.smith@example.com', 
    'hashed_password'
),
(
    3, 
    'alice.johnson@example.com', 
    'hashed_password'
),
(
    4, 
    'michael.brown@example.com', 
    'hashed_password'
),
(
    5, 
    'emily.davis@example.com', 
    'hashed_password'
);

INSERT INTO training_groups (name, description)
VALUES
(
    'Leadership Skills', 
    'Courses focused on developing leadership abilities'
),
(
    'Technical Skills', 
    'Courses for improving technical knowledge and expertise'
),
(
    'Communication Skills', 
    'Courses to enhance communication in the workplace'
),
(
    'Time Management', 
    'Courses designed to improve efficiency and productivity through effective time management'
),
(
    'Project Management', 
    'Courses that cover project planning, execution, and delivery techniques'
);

INSERT INTO training_courses (course_group_id, image, name, description, platform, instructor_id, date_start, date_end, duration, status, rating)
VALUES
(
    1, 
    'leadership.png',
    'Leadership 101', 
    'Introductory course on leadership principles', 
    'Meet: xxx xxx xxxx',
    1, 
    '2024-01-10', 
    '2024-01-15', 
    5, 
    'planned',
    '{
        "score": 4.61,
        "star": {
            "5": 77,
            "4": 12,
            "3": 7,
            "2": 3,
            "1": 1
        }
    }'
),
(
    2, 
    'advanced_java_programming.jpg',
    'Advanced Java Programming', 
    'Deep dive into Java for advanced users', 
    'Onsite: Building Leadership',
    1, 
    '2024-02-01', 
    '2024-02-10', 
    10, 
    'incoming',
    '{
        "score": 0,
        "star": {
            "5": 0,
            "4": 0,
            "3": 0,
            "2": 0,
            "1": 0
        }
    }'
),
(
    3, 
    'communication.jpg',
    'Effective Communication Skills', 
    'Learn techniques to improve workplace communication', 
    'Online: www.communication-course.com',
    2, 
    '2024-03-05', 
    '2024-03-12', 
    7, 
    'ongoing',
    '{
        "score": 0,
        "star": {
            "5": 0,
            "4": 0,
            "3": 0,
            "2": 0,
            "1": 0
        }
    }'
),
(
    4, 
    'time_management.jpg',
    'Time Management Mastery', 
    'Master the art of managing your time effectively', 
    'Hybrid: Part onsite, part online',
    2, 
    '2024-04-15', 
    '2024-04-22', 
    8, 
    'ongoing',
    '{
        "score": 0,
        "star": {
            "5": 0,
            "4": 0,
            "3": 0,
            "2": 0,
            "1": 0
        }
    }'
),
(
    5, 
    'project_management_fundamentals.jpg',
    'Project Management Fundamentals', 
    'Introduction to project management methodologies', 
    'Onsite: Project Management HQ',
    3, 
    '2024-05-01', 
    '2024-05-10', 
    6, 
    'canceled',
    '{
        "score": 0,
        "star": {
            "5": 0,
            "4": 0,
            "3": 0,
            "2": 0,
            "1": 0
        }
    }'
);

INSERT INTO enrollments (course_id, user_enrolled_id, student_id, enrollment_date, status, rating)
VALUES
(
    1, 
    1,
    1, 
    '2024-01-05', 
    'completed',
    3
),
(
    2, 
    1,
    1, 
    '2024-02-15', 
    'in-complete',
    null
),
(
    3, 
    1,
    1, 
    '2024-03-20', 
    'in-progress',
    null
),
(
    4, 
    1,
    2, 
    '2024-05-30', 
    'failed',
    null
),
(
    5, 
    1,
    2, 
    '2024-04-25', 
    'not-enroll',
    null
);

INSERT INTO action_types (name, description)
VALUES
(
    'Login', 
    'User logged into the system'
),
(
    'Logout', 
    'User logged out from the system'
),
(
    'Data Update', 
    'User updated a data record'
),
(
    'Training Enrollment', 
    'User enrolled in a training course'
),
(
    'Recent Courses', 
    'Report on the most recently completed courses by employees'
);

INSERT INTO transactions (action_type_id, user_id, description, timestamp)
VALUES
(5, 1, '{"course": 1}', '2024-02-01 10:23:00'),
(5, 1, '{"course": 2}', '2024-02-01 10:45:30'),
(5, 1, '{"course": 3}', '2024-02-01 11:10:15'),
(5, 1, '{"course": 3}', '2024-02-01 11:55:00');

INSERT INTO report_types (name, description)
VALUES
(
    'Employee Performance', 
    'Report on employee performance evaluations'
),
(
    'Training Summary', 
    'Summary report of training courses and enrollments'
),
(
    'System Usage', 
    'Detailed report on system usage activities'
),
(
    'Course Review',
    'User wrote a course review'
);

INSERT INTO achievements (name, description)
VALUES
(
    'Employee of the Month', 
    'Awarded to the best-performing employee of the month'
);

INSERT INTO hall_of_fame (employee_id, achievement_id)
VALUES
(1, 1); 
