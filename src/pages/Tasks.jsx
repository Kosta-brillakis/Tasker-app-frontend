import { useState, useEffect, useContext } from "react";
import { TasksContext } from "../context/tasks";
import axios from "axios";
import CreateTask from "../components/task/CreateTask";
import TaskList from "../components/task/TaskList";
import UpdateTask from "../components/task/UpdateTask";
import socket from '../socket'

function Tasks() {
  //state
  const [tasks, setTasks] = useContext(TasksContext);

  useEffect(() => {
    socket.on('new-task', (task) => {
      console.log("task from socket =>", task)
      setTasks((prev) => ({
        ...prev, tasks: [task, ...prev.tasks]
      }))
    })
    return () => socket.off('new-task')
  }, [])
  
  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      const { data } = await axios.get("/tasks/1");
      setTasks({ ...tasks, tasks: data });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <CreateTask />
      <TaskList />
      <UpdateTask />
    </>
  );
}

export default Tasks;
