DROP TABLE IF EXISTS  student;
CREATE TABLE student (
    email VARCHAR(150),
    suspended BOOLEAN NOT NULL,
    PRIMARY KEY (email)
);
ALTER TABLE student AUTO_INCREMENT=1001;


DROP TABLE IF EXISTS  teacher;
CREATE TABLE teacher (
    email VARCHAR(150),
    PRIMARY KEY (email)
);
ALTER TABLE teacher AUTO_INCREMENT=1001;


DROP TABLE IF EXISTS teacher_student;

CREATE TABLE teacher_student (
  teacher_email VARCHAR(150),
  student_email VARCHAR(150)
);