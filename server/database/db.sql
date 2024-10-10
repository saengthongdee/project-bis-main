DROP DATABASE hris_training_system;
CREATE DATABASE hris_training_system;
USE hris_training_system;

CREATE TABLE roles (
  role_id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  permissions JSON
);

CREATE TABLE positions (
  position_id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  description TEXT
);

CREATE TABLE departments (
    department_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    description TEXT
);

CREATE TABLE employees (
    employee_id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    role_id INT,
    position_id INT,
    department_id INT,
    date_joined DATE NOT NULL,
    status ENUM('active', 'inactive', 'terminated'),
    FOREIGN KEY (role_id) REFERENCES roles(role_id),
    FOREIGN KEY (position_id) REFERENCES positions(position_id),
    FOREIGN KEY (department_id) REFERENCES departments(department_id)
);

CREATE TABLE auth (
    user_id INT NOT NULL PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    hashed_password VARCHAR(255) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES employees(employee_id)
);

CREATE TABLE training_groups (
    group_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    description TEXT
);

CREATE TABLE training_courses (
    course_id INT PRIMARY KEY AUTO_INCREMENT,
    course_group_id INT,
    image VARCHAR(255),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    platform VARCHAR(255),
    instructor_id INT,
    date_start DATE NOT NULL,
    date_end DATE NOT NULL,
    duration INT NOT NULL,
    status ENUM('planned', 'incoming', 'ongoing', 'canceled') NOT NULL,
    rating JSON NOT NULL,
    FOREIGN KEY (course_group_id) REFERENCES training_groups(group_id),
    FOREIGN KEY (instructor_id) REFERENCES employees(employee_id)
);

CREATE TABLE enrollments (
    enrollment_id INT PRIMARY KEY AUTO_INCREMENT,
    course_id INT NOT NULL,
    user_enrolled_id INT NOT NULL,
    student_id INT NOT NULL,
    enrollment_date DATE NOT NULL,
    status ENUM('completed', 'in-complete', 'in-progress', 'failed', 'not-enroll') NOT NULL,
    rating TINYINT,
    FOREIGN KEY (course_id) REFERENCES training_courses(course_id),
    FOREIGN KEY (student_id) REFERENCES employees(employee_id)
);

CREATE TABLE action_types (
    action_type_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    description TEXT
);

CREATE TABLE transactions (
    transaction_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    action_type_id INT NOT NULL,
    description TEXT,
    timestamp DATETIME NOT NULL,
    FOREIGN KEY (action_type_id) REFERENCES action_types(action_type_id),
    FOREIGN KEY (user_id) REFERENCES employees(employee_id)
);

CREATE TABLE report_types (
    report_type_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    description TEXT
);

CREATE TABLE reports (
    report_id INT PRIMARY KEY AUTO_INCREMENT,
    report_type_id INT NOT NULL,
    report_date DATE NOT NULL,
    report_data TEXT,
    FOREIGN KEY (report_type_id) REFERENCES report_types(report_type_id)
);

CREATE TABLE achievements (
    achievement_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    description TEXT
);

CREATE TABLE hall_of_fame (
    employee_id INT NOT NULL,
    achievement_id INT NOT NULL,
    PRIMARY KEY (employee_id, achievement_id),
    FOREIGN KEY (employee_id) REFERENCES employees(employee_id),
    FOREIGN KEY (achievement_id) REFERENCES achievements(achievement_id)
);
