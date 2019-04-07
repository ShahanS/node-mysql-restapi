// Import Local Dependencies
const { DB }  =  require('../db/database');
const { validateEmail } = require('../utils/index');

exports.suspendStudents = async (request, response) => {

    let studentEmails = request.body.student;
    let connectionPool = DB.connect();

    if (!validateEmail(studentEmails)) {
                response.status(404);
                response.send({"success": false, "message": "Student Email Address - Validation Failed!"});
                return;
    }

        console.log('${studentEmails}');

        let studentsData = await DB.selectOne(connectionPool, "student", "email", "email", "'" + studentEmails + "'");

        if (!studentsData || !studentsData.length ) {
            response.status(404);
            response.send({"success": false, "message": "Student Email(s) Address - Not Present In Database"});
            return;
        }

    let queryStatement = `UPDATE student SET suspended = true WHERE email = '${ studentEmails }'`;

    await DB.nativeQuery(connectionPool, queryStatement); 
    response.status(204);
    response.send();
};