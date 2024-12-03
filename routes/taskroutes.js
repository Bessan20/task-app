const express = require('express');
const router = express.Router();
const {getAllTasks , createTask , getTasksInProgress , getTasksAreDone , getTasksAreNotDone , getTaskById,deleteTask , updateTask} = require('../controllers/taskControllers.js');

router.route('/').get(getAllTasks).post(createTask);
router.route('/inProgress').get(getTasksInProgress);
router.route('/areDone').get(getTasksAreDone);
router.route('/areNotDone').get(getTasksAreNotDone);
router.route('/:id').get(getTaskById).delete(deleteTask).patch(updateTask);
module.exports = router;