// Import Local Dependencies
const { DB }  =  require('../db/database');
const { validateEmail } = require('../utils/index');

exports.retrieveNotifications = async (request, response) => {

    let teacherEmail = request.body.teacher;
    let notification = request.body.notification;

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

    if (!notification) {
        response.status(404);
        response.send({"success": false, "message": "Notification - Not Available!"});
        return;
    }

    let myMessageArray = notification.split(" ");
    let notificationEmailIDs = [];

    myMessageArray.forEach((value, index) => {
        if (value.indexOf('@') === 0) {
            notificationEmailIDs.push(value.slice(1));
        }
    });

    let connectionPool = DB.connect();

    let teacherData = await DB.selectOne(connectionPool, "teacher", "email","email", "'" + teacherEmail + "'");

    if(!teacherData || teacherData.length === 0) {
        response.status(404);
        response.send({"success": false, "message": "Teacher Email Address - Not Present In Database"});
        return;
    }

    let queryStatement = `SELECT ts.student_email FROM student s `   +
                         `INNER JOIN teacher_student ts ON ts.student_email = s.email `      +
                         `INNER JOIN teacher t ON t.email = ts.teacher_email ` +
                         `WHERE ts.teacher_email = '${ teacherEmail }' AND s.suspended = false `;
    let notSuspendedList = await DB.nativeQuery(connectionPool, queryStatement);
    let notificationEmailsList = [];
    for (idx in notSuspendedList) {
        notificationEmailsList.push(notSuspendedList[idx].student_email);
    }

    notificationEmailsList.push(...notificationEmailIDs);
    response.send({"recipients": notificationEmailsList});
};