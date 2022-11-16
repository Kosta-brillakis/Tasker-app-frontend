import { useState, useContext } from "react";
import {TasksContext} from '../../context/tasks'
import axios from "axios";
import socket from '../../socket'

function CreateTask() {
  //state
  const [content, setContent] = useState("");
  const [tasks, setTasks] = useContext(TasksContext)

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
        const {data} = await axios.post('/task', {content})
        setTasks({...tasks, tasks: [data, ...tasks.tasks]})
        setContent("")
        //emit socket event
        socket.emit('new-task', data)
    } catch(err) {
        console.log(err)
    }
  }

  const handleEnterSubmit = async (e) => {
    try {
        const {data} = await axios.post('/task', {content})
        setTasks({...tasks, tasks: [data, ...tasks.tasks]})
        setContent("")
        //emit socket event
        socket.emit('new-task', data)
    } catch(err) {
        console.log(err)
    }
  }

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-6 offset-md-3">
        <form className="d-flex justify-content" onSubmit={handleSubmit}>
        <textarea 
        onKeyPress={(e) => e.key === 'Enter' && handleEnterSubmit()}
        className="form-control m-1"
        maxLength={"160"}
        value={content} 
        onChange={(e) => setContent(e.target.value)} placeholder="Write your task here">
        </textarea>
        <button type="submit" className="btn btn-warning m-1">Submit</button>
      </form>
        </div>
      </div>
    </div>
  );
}

export default CreateTask;
