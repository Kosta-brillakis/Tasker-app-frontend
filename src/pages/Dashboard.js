import {Link} from 'react-router-dom'

function Dashboard() {
  return (
    <div className='d-flex justify-content-center align-items-center vh-100'>
      <Link className='btn btn-outline-primary btn-lg' to="/tasks">Go to tasks</Link>
    </div>
  )
}

export default Dashboard