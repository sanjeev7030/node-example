'use strict';

var Task = require('../model/appModel.js');
var Auth = require('../controller/authController');


exports.list_all_tasks = async function (req, res) {
  try {
    // var token = await Auth.jwtTokenChecker(req, res);
    // if(token)
    await Task.getAllTask(function (err, task) {
      if (err)
        res.send(err);
      res.json(task);
    });
  } catch (err) {
    res.send('getAll Controller' + err);
  };


};

exports.create_a_task = async function (req, res) {
  var new_task = new Task(req.body);

  //handles null error 
  if (!new_task.location || !new_task.name) {
    res.status(400).send({ error: true, message: 'Please provide name/location' });
  }
  else {
    try {
      await Task.createTask(new_task, function (err, task) {
        if (err)
          res.send(err);
        res.json(task);
      });
    }
    catch (err) {
      res.send('create Controller' + err);
    };
  }
};


exports.read_a_task = async function (req, res) {
  try {
    var token = await Auth.jwtTokenChecker(req, res);
    if(token)
    await Task.getTaskById(req.params.taskId, function (err, task) {
      if (err)
        res.send(err);
      res.json(task);
    });
  }
  catch (err) {
    res.send('Read Controller' + err);
  };

};


exports.update_a_task = async function (req, res) {
  try {
    await Task.updateById(req.params.taskId, new Task(req.body), function (err, task) {
      if (err)
        res.send(err);
      res.json(task);
    });
  }
  catch (err) {
    res.send('update Controller' + err);
  };
};


exports.delete_a_task = async function (req, res) {
  try {
    await Task.remove(req.params.taskId, function (err, task) {
      if (err)
        res.send(err);
      res.json({ message: 'Task successfully deleted' });
    });
  }
  catch (err) {
    res.send('delete Controller' + err);
  };


};