// Import Local Dependencies
const { DB }  =  require('../db/database');
const { validateEmail } = require('../utils/index');

exports.commonStudents = async (request, response) => {

    let teacherEmails = request.query.teacher;
    let connectionPool = DB.connect();

    let isSingleTeacher = false;
    let emailValidationFailed = false;

    let teacherPayload = "";
    if (teacherEmails instanceof Array) {
        for (idx in teacherEmails) {
            if (!validateEmail(teacherEmails[idx])) {
                emailValidationFailed = true;
                break;
            }
            if (parseInt(teacherEmails.length - 1) === parseInt(idx)) {
                teacherPayload += "'" + teacherEmails[idx] + "'";
                break;
            }
            teacherPayload += "'" + teacherEmails[idx] + "',";
        }
    } else {
        if (!validateEmail(teacherEmails)) emailValidationFailed = true;
        isSingleTeacher = true;
        teacherPayload += "'" + teacherEmails + "'";
    }

    if (emailValidationFailed) {
        response.status(404);
        response.send({"success": false, "message": "Teacher Email Address - Validation Failed!"});
        return;
    }

    let queryStatement = `SELECT ts.student_email FROM student s `   +
                         `INNER JOIN teacher_student ts ON ts.student_email = s.email `      +
                         `INNER JOIN teacher ON t.email = ts.teacher_email ` +
                         `WHERE ts.teacher_email IN (${ teacherPayload })`;
    console.log(queryStatement);
    let result = await DB.nativeQuery(connectionPool, queryStatement);

    let studentEmails = [];
    if (result instanceof Array) {
        for(idx in result) {
            studentEmails.push(result[idx].student_email);
        }
    }

    if (isSingleTeacher) {
        response.send({"students": studentEmails});
        return;
    } 

    let unique = studentEmails
        .map((studentEmail) => {
            return {count: 1, name: studentEmail};
        })
        .reduce((object, studentObject) => {
            object[studentObject.name] = (object[studentObject.name] || 0) + studentObject.count;
            return object;
        }, {});

    let commonStudents = Object.keys(unique).filter((object) => unique[object] > 1);
    response.send({"students": commonStudents});
};