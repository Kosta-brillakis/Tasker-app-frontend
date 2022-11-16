import { useState } from "react";
import Input from "../components/forms/Input";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Button from "../components/forms/Button";
import { Link } from "react-router-dom";

function ForgotPassword() {
  //state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [resetCode, setResetCode] = useState("");
  //hook
  const navigate = useNavigate();

  //   console.log('context =>', auth)

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      //   if(password !== confirm) {
      //     setLoading(false)
      //     toast.error("Passwords do not match")
      //     return
      //   }
      const { data } = await axios.post(
        `/forgot-password`,
        { email }
      );
      if (data.error) {
        toast.error(data.error);
        setLoading(false);
        return;
      } else {
        setVisible(true);
        toast.success("Enter the code you received in your email");
        setLoading(false);
      }
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  const handleReset = async (e) => {
    email.preventDefault();
    try {
      setLoading(true);
      if (password !== confirm) {
        setLoading(false);
        toast.error("Passwords do not match");
        return;
      }
      const { data } = await axios.post(
        `/reset-password`,
        { email, password, resetCode }
      );
      if (data.error) {
        toast.error(data.error);
        setLoading(false);
        return;
      } else {
        toast.success(
          "Password successfully changed. Now you can login with your new password."
        );
        setLoading(false);
        navigate("/login");
      }
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong. Try again");
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{ marginTop: "-100px" }}
    >
      <div className="container">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <h1 className="fw-bold mb-3">Forgot Password</h1>

            <form>
              <Input
                value={email}
                setValue={setEmail}
                label="Email"
                type="email"
              />

              {visible && (
                <>
                  <Input
                    value={resetCode}
                    setValue={setResetCode}
                    label="Enter Reset Code"
                    type="text"
                  />
                  <Input
                    value={password}
                    setValue={setPassword}
                    label="New Password"
                    type="password"
                  />

                  <Input
                    value={confirm}
                    setValue={setConfirm}
                    label="Confirm new password"
                    type="password"
                  />
                </>
              )}

              <Button
                handleSubmit={visible ? handleReset : handleSubmit}
                name=" "
                email={email}
                password="111111"
                confirm="111111"
                loading={loading}
              />
            </form>

            <p className="mt-2">
              <Link to="/login">Back to Login</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
