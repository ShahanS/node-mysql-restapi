const express  =  require('express');
const router   =  express.Router();

const index = require('../api/index');
const register = require('../api/register');
const commonStudents =  require('../api/commonstudents');
const suspendStudent = require('../api/suspendstudent');
const retrieveNotifications = require('../api/retrievenotifications');

router.get('/', index.index);
router.post('/api/register', register.register);
router.get('/api/commonstudents', commonStudents.commonStudents);
router.post('/api/suspend', suspendStudent.suspendStudents);
router.post('/api/retrievefornotifications', retrieveNotifications.retrieveNotifications);
module.exports = router;