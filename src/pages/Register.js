import {useState, useContext} from "react";
import Input from '../components/forms/Input'
import axios from 'axios'
import toast from "react-hot-toast"
import {AuthContext} from '../context/auth'
import {saveInLocalStorage} from '../helpers/auth'
import {useNavigate} from 'react-router-dom'
import Button from '../components/forms/Button'
import {Link} from "react-router-dom"

function Register() {
  //context
  const [auth, setAuth] = useContext(AuthContext)
  //state
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [confirm, setConfirm] = useState("")
  const [loading, setLoading] = useState(false)
  //hook
  const navigate = useNavigate()

  // console.log('context =>', auth)

  const handleSubmit = async(e) => {
    e.preventDefault()
    try {
      setLoading(true)
      if(password !== confirm) {
        setLoading(false)
        toast.error("Passwords do not match")
        return
      }
      const {data} = await axios.post(`/signup`, {name, email, password})
      if(data.error) {
        toast.error(data.error)
        setLoading(false)
        return
      } else {
        //context
        setAuth(data)
        //save in local storage
        // localStorage.setItem('auth', JSON.stringify(data))
        saveInLocalStorage("auth", data)
        toast.success("Successfully registered")
        setLoading(false)
        // window.location.href = "/login"
        setTimeout(() => {
          navigate("/dashboard")
        }, 1500)
      }
    }
    catch (err) {
      console.log(err)
      setLoading(false)
    }
  }


  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{ marginTop: "-100px" }}
    >
      <div className="container">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <h1 className="fw-bold mb-3">Register</h1>

            <form>

              <Input value={name} setValue={setName} label="Name" type="text"/>

              <Input value={email} setValue={setEmail} label="Email" type="email"/>

              <Input value={password} setValue={setPassword} label="Password" type="password"/>

              <Input value={confirm} setValue={setConfirm} label="Confirm password" type="password"/>
              
              <Button handleSubmit={handleSubmit} name={name} email={email} password={password} confirm={confirm} loading={loading}/>

            </form>

            <p className="mt-2">Already Registered? <Link to="/login">Login</Link></p>

          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
