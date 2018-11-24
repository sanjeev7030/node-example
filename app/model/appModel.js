'use strict';
var sql = require('./db.js');

//Task object constructor
var Task = function(task){
    this.name = task.name;
    this.location = task.location;
    this.password = task.password;
};

Task.createTask = function createUser(newTask, result) {  
        var myquery = "INSERT INTO employees (name, location, password) values ( " + newTask.name + " , " + newTask.location + " ," + newTask.password +" ) ";
        console.log(myquery);
    try {
        sql.myAsyncQuery(myquery)
            .then((qresult) => {
                //  qresult.forEach(x => console.log(x))
                result(null, qresult.insertId);
            });
    }
    catch (err) {
        result(err, null);;
    };          
};

 Task.getAllTask = function getAllTask(result){
            try {
                sql.myAsyncQuery("Select * from employees")
                    .then((qresult) => {
                      //  qresult.forEach(x => console.log(x))
                        result(null, qresult);
                    });

            }
            catch (err) {
                result(err, null);;
            };
};

Task.getTaskById = function createUser(taskId, result) {
    var myquery = "Select name from employees where id = " + taskId + ""; 
    try {
        sql.myAsyncQuery(myquery)
            .then((qresult) => {
                //  qresult.forEach(x => console.log(x))
                result(null, qresult);
            });
    }
    catch (err) {
        result(err, null);;
    }; 
};

Task.updateById = function(id, task, result){
   
    var myquery ="UPDATE employees SET name = "+ task.name +" ,location = "+ task.location +" ,password = " + task.password + " WHERE id = " + id + "";
    try {
        sql.myAsyncQuery(myquery)
            .then((qresult) => {
                //  qresult.forEach(x => console.log(x))
                result(null, qresult);
            });
    }
    catch (err) {
        result(err, null);;
    };  
};
Task.remove = function(id, result){
    var myquery = "DELETE FROM employees WHERE id = "+ id +"";
        try {
            sql.myAsyncQuery(myquery)
                .then((qresult) => {
                    //  qresult.forEach(x => console.log(x))
                    result(null, qresult);
                });
        }
        catch (err) {
            result(err, null);;
        };  
};

module.exports= Task;