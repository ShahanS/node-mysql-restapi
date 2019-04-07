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

INSERT INTO student (email, suspended) VALUES ('adam@student.com', 0),('alex@student.com', 0),('dash@student.com', 0),('david@student.com', 0),('don@student.com', 0),('feddy@student.com', 0),('kite@student.com', 0),('lorry@student.com', 0),('martin@student.com', 0),('quoine@student.com', 0),('roger@student.com', 0),('smith@student.com',0);
INSERT INTO teacher  (email) VALUES ('barry@teacher.com'),('gill@teacher.com'),('Hans@teacher.com'),('helan@teacher.com'),('jeff@teacher.com'),('jerry@teacher.com'),('john@teacher.com'),('jonny@teacher.com'),('mathew@teacher.com'),('sarah@teacher.com'),('tom@teacher.com');
INSERT INTO teachers_students VALUES ('barry@teacher.com','david@student.com'),('barry@teacher.com','kite@student.com'),('Hans@teacher.com','quoine@student.com'),('Hans@teacher.com','roger@student.com'),('jeff@teacher.com','roger@student.com'),('jeff@teacher.com','smith@student.com'),('jerry@teacher.com','alex@student.com'),('jerry@teacher.com','david@student.com'),('jerry@teacher.com','kite@student.com'),('jonny@teacher.com','quoine@student.com'),('jonny@teacher.com','roger@student.com');
