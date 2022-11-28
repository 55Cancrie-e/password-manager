const { Task } = require("../models/taskModel")

let deleteTasksFromList = (_listId) => {
    Task.deleteMany({
        _listId
    }).then(() => {
        console.log("Tasks from " + _listId + " were deleted!");
    })
}



module.exports = {
    deleteTasksFromList
}