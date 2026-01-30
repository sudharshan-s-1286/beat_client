import { useState, useEffect } from "react";
import { Button, Checkbox, Form, Input, message } from "antd";
import { useNavigate, Link } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";

const SignUp = ({ setIsAuth }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // Ensure any old sessions are cleared immediately
  useEffect(() => {
    localStorage.removeItem("token");
    setIsAuth(false);
  }, [setIsAuth]);

  const register = async () => {
    // Clear before request too
    localStorage.removeItem("token");
    setIsAuth(false);
    try {
      const res = await axiosInstance.post("/signup", {
        name,
        email,
        password,
      });

      if (res.data.jwt) {
        // Just show success and go home, don't auto-login
        message.success("Signup successful! Please sign in.");

        setName("");
        setEmail("");
        setPassword("");

        navigate("/", { replace: true });
      } else {
        message.success("Signup successful. Please sign in.");
        setTimeout(() => navigate("/signin"), 1500);
      }

    } catch (err) {
      console.error("Signup Error:", err);
      if (err.response && err.response.data && err.response.data.error) {
        message.error(err.response.data.error);
      } else if (err.response && err.response.data && err.response.data.message) {
        message.error(err.response.data.message);
      } else {
        message.error("Signup failed. Please try again.");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-fixed bg-center bg-cover" style={{ backgroundColor: "#121212" }}>
      <div className="w-125 p-8 rounded-xl bg-black/70 hover:bg-black/80 hover:shadow-2xl transition-all border border-neutral-800">

        {/* Heading */}
        <h2 className="text-4xl text-center font-extrabold text-white mb-8 hover:text-red-500 transition">
          Sign Up
        </h2>

        {/* AntD Form */}
        <Form layout="vertical" onFinish={register} autoComplete="off">
          <Form.Item
            label={
              <span className="text-white hover:text-red-500 transition">
                Name
              </span>
            }
            name="name"
            rules={[{ required: true, message: "Please input your name!" }]}
          >
            <Input value={name} onChange={(e) => setName(e.target.value)} className="hover:border-red-500 focus:border-red-500" />
          </Form.Item>

          <Form.Item
            label={
              <span className="text-white hover:text-red-500 transition">
                Email
              </span>
            }
            name="email"
            rules={[
              { required: true, message: "Please input your email!" },
              { type: "email", message: "Enter a valid email!" },
            ]}
          >
            <Input value={email} onChange={(e) => setEmail(e.target.value)} className="hover:border-red-500 focus:border-red-500" />
          </Form.Item>

          <Form.Item
            label={
              <span className="text-white hover:text-red-500 transition">
                Password
              </span>
            }
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="hover:border-red-500 focus:border-red-500"
            />
          </Form.Item>

          {/* Remember Me */}
          <Form.Item>
            <Checkbox
              style={{ color: "white" }}
              className="hover:text-red-500 transition"
            >
              Remember me
            </Checkbox>
          </Form.Item>

          {/* Button */}
          <Form.Item>
            <Button
              block
              size="large"
              htmlType="submit"
              className="bg-red-600 hover:bg-red-500 border-none text-white font-bold"
              style={{ backgroundColor: "#dc2626", color: "white" }}
            >
              Sign Up
            </Button>
          </Form.Item>
        </Form>

        {/* Redirect */}
        <div className="text-center text-white mt-4">
          Already have an account?{" "}
          <Link
            to="/signin"
            className="underline hover:text-red-500 transition"
          >
            Sign In
          </Link>
        </div>

      </div>
    </div>
  );
};

export default SignUp;
