import { Modal } from "antd";
import { TasksContext } from "../../context/tasks";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/auth";
import axios from "axios"
import {toast} from 'react-hot-toast'

function UpdateTask() {
  //CONTEXT
  const [tasks, setTasks] = useContext(TasksContext);
  const [auth, setAuth] = useContext(AuthContext);
  //STATE
  const [content, setContent] = useState("");

  useEffect(() => {
    if (tasks) {
      setContent(tasks?.selected?.task);
    }
  }, [tasks]);

  const handleUpdate = async (e) => {
    try {
      e.preventDefault();
      const {data} = await axios.put(`/task/${tasks?.selected?._id}`, {task: content})
      const newList = tasks.tasks.map((t) => {
        if(t._id === data._id) {
            return data
        }
        return t
      })
      setTasks((prev) => ({...prev, tasks: newList, selected: null}))
      toast.success("Task updated!")
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (e) => {
    try {
      e.preventDefault();
      const {data} = await axios.delete(`/task/${tasks?.selected?._id}`)
      setTasks(prev => ({
        ...prev, 
        tasks: prev.tasks.filter((task) => 
        task._id !== data._id
      ), selected: null}))
      toast.error("Task deleted!")
    } catch (err) {
      console.log(err);
    }
  };

  const canUpdateDelete = auth?.user?._id === tasks?.selected?.postedBy._id;

  return (
    <div>
      <Modal
        centered
        open={tasks?.selected !== null}
        footer={null}
        onCancel={() => setTasks({ ...tasks, selected: null })}
      >
        <form className="d-flex justify-content p-3">
          <textarea
            className="form-control m-1"
            maxLength={"160"}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your task here"
          ></textarea>

          {canUpdateDelete ? (
            <>
              <button onClick={handleUpdate} className="btn btn-primary m-1">
                Update
              </button>
              <button onClick={handleDelete} className="btn btn-danger m-1">
                Delete
              </button>
            </>
          ) : (

            <button className="btn disabled m-1">
              Task created by {tasks?.selected?.postedBy?.name}
            </button>
          )}
        </form>
      </Modal>
    </div>
  );
}

export default UpdateTask;
