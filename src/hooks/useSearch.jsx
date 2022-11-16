import {useState, useContext} from "react"
import { TasksContext } from "../context/tasks"

export default function useSearch() {
    //context
    const [tasks, setTasks] =useContext(TasksContext)

    //state
    const [keyword, setKeyword] = useState("");

    const filteredTasks = tasks?.tasks?.filter((t) => t.task.toLowerCase().includes(keyword))

    return {keyword, setKeyword, filteredTasks}
}