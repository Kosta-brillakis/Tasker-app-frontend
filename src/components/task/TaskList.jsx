import { AuthContext } from "../../context/auth";
import { useContext, useState, useEffect } from "react";
import { TasksContext } from "../../context/tasks";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import axios from "axios";
import useSearch from "../../hooks/useSearch"
import Timer from './Timer'
import SearchBar from "../forms/SearchBar";
dayjs.extend(relativeTime);


function TaskList() {
  //context
  const [tasks, setTasks] = useContext(TasksContext);
  const [auth] = useContext(AuthContext);
  //state
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  //hook
  const {keyword, setKeyword, filteredTasks} =useSearch()


  useEffect(() => {
    getTotal();
  }, []);

  useEffect(() => {
    if (page === 1) {
      return;
    }
    loadTasks();
  }, [page]);

  const getTotal = async () => {
    try {
      const { data } = await axios.get("/task-count");
      setTotal(data);
    } catch (err) {
      console.log(err);
    }
  };

  const loadTasks = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/tasks/${page}`);
      setTasks((prev) => ({ ...prev, tasks: [...prev.tasks, ...data] }));
      setLoading(false)
    } catch (err) {
      console.log(err);
      setLoading(false)
    }
  };

  const handleClick = (item) => {
    setTasks({ ...tasks, selected: item });
  };

  return (
    <div className="container mt-2">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <SearchBar keyword={keyword} setKeyword={setKeyword} />

          <pre
            className="text-center"
            style={{
              textDecoration: "underline gold",
              textDecorationThickness: "3px",
            }}
          >
            {tasks?.tasks.length} tasks
          </pre>

          {filteredTasks?.map((task) => (
            <div
              key={task._id}
              className="rounded shadow p-2 m-2 tasklist"
              onClick={() => handleClick(task)}
              style={{
                background:
                  auth?.user?._id === task?.postedBy?._id
                    ? "#f2ffe6"
                    : "#ffe6e6",
              }}
            >
              <p key={task.id + "a"}>{task.task}</p>
              <p
                key={task.id + "b"}
                className="float-end"
                style={{ fontSize: "10px", marginTop: "-15px" }}
              >
                <Timer time={task.createdAt} /> by {task?.postedBy?.name}
              </p>
            </div>
          ))}

          {tasks?.tasks?.length < total && (
            <div className="mb-4 text-center">
              <button
              disabled={loading} 
              className="btn btn-outline-warning"
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
              >
              Load more
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default TaskList;
