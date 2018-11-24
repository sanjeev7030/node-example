'use strict';
var users = require('../controller/appController');

module.exports = function (app) {

  // todoList Routes
  app.route('/tasks')
    .get(users.list_all_tasks)
    .post(users.create_a_task);

  app.route('/tasks/:taskId')
    .get(users.read_a_task)
    .put(users.update_a_task)
    .delete(users.delete_a_task);
};
