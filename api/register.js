// Import Local Dependencies
const { capitalizeFirstLetter,  validateEmail } = require('../utils/index');
const { DB }  =  require('../db/database');

exports.register = async (request, response) => {
    let teacherEmail  = request.body.teacher;
    let studentEmails = request.body.students;

    if (!teacherEmail) {
        response.status(404);
        response.send({"success": false, "message": "Teacher Email Address - Not Available!"});
        return;
    }

    if (!validateEmail(teacherEmail)) {
        response.status(404);
        response.send({"success": false, "message": "Teacher Email Address - Validation Failed!"});
        return;
    }

    if (!studentEmails.length) {
        response.status(404);
        response.send({"success": false, "message": "Student Email(s) Address - Empty []"});
        return;
    }

    let studentPayload = "";
    if (studentEmails.length > 0) {
        for (idx in studentEmails) {
            if (!validateEmail(studentEmails[idx])) {
                response.status(404);
                response.send({"success": false, "message": "Student Email Address - Validation Failed!"});
                return;
            }
            let studentEmail = studentEmails[idx];
            let eachStudentDetail = '("' + studentEmail + '", false)';
            if (parseInt(studentEmails.length - 1) === parseInt(idx)) {
                studentPayload += eachStudentDetail;
                break;
            }
            studentPayload += eachStudentDetail + ',';
        }
    }

    let connectionPool = DB.connect();


    let teacherPayload = { "email": teacherEmail };
    let teacherExist = await DB.insert(connectionPool, "teacher", teacherPayload);
    if (teacherExist) {
        response.status(404);
        response.send({"success": false, "message": "Teacher Email Address - Already Exists!"});
        return;
    }
    console.log(studentPayload);
    await DB.insertIgnore(connectionPool, "students", studentPayload);
                             
    let studentTeacherPayload = "";
    if (studentEmails.length > 0) {
        for (idx in studentEmails) { 
            let studentEmail = studentEmails[idx];
            let eachStudentTeacherDetail = '("' + teacherEmail + '","' + studentEmail + '")';
            if (parseInt(studentEmails.length - 1) === parseInt(idx)) {
                studentTeacherPayload += eachStudentTeacherDetail;
                break;
            }
            studentTeacherPayload += eachStudentTeacherDetail + ',';
        }
    }

    let queryStatement = `INSERT INTO teacher_student VALUES ${ studentTeacherPayload }`;
    await DB.nativeQuery(connectionPool, queryStatement);
    response.status(204);
    response.send();
};