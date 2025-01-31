import React, { useState } from "react";
import { login } from "../api/user";
import toast from "react-hot-toast";
import { setUserInfo } from "../redux/slices/userSlice";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateField = (name, value) => {
    let error = "";

    switch (name) {
      case "email":
        if (!validateEmail(value)) {
          error = "Please enter a valid email address";
        }
        break;
      case "password":
        if (value.length < 8) {
          error = "Password must be at least 8 characters long";
        }
        break;
      default:
        break;
    }

    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));

    return error === "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError("");

    const isEmailValid = validateField("email", formData.email);
    const isPasswordValid = validateField("password", formData.password);

    if (!isEmailValid || !isPasswordValid) {
      return;
    }

    setLoading(true);
    try {
      const response = await login(formData);
      if (response.status === 200) {
        dispatch(
          setUserInfo({
            user: "User",
            userId: response.data.userId,
          })
        );
        navigate("/home");
        toast.success("Login successful!");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      setSubmitError(error.message || "An error occurred during login");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    validateField(name, value);
  };

  return (
    <div className="min-h-screen flex bg-[#272829]">
      {/* Left Side - Slogan */}
      <div className="hidden lg:flex w-1/2 items-center justify-center p-12 bg-[#61677A]">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold text-white mb-6">Welcome Back!</h1>
          <p className="text-xl text-white/80">
            Sign in to continue managing your tasks and stay productive. Your
            organized life awaits!
          </p>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md bg-[#61677A] rounded-xl p-8 shadow-lg">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            Login to Continue
          </h2>

          {submitError && (
            <div className="mb-6 p-3 bg-red-100 text-red-700 rounded-md text-sm">
              {submitError}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-white text-sm font-medium mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-lg bg-white/10 backdrop-blur-sm border ${
                  errors.email
                    ? "border-red-500"
                    : "border-white/20 focus:border-white/50"
                } text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30`}
                placeholder="Enter your email"
                required
              />
              {errors.email && (
                <p className="text-red-300 text-xs mt-2">{errors.email}</p>
              )}
            </div>

            <div>
              <label className="block text-white text-sm font-medium mb-2">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-lg bg-white/10 backdrop-blur-sm border ${
                  errors.password
                    ? "border-red-500"
                    : "border-white/20 focus:border-white/50"
                } text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30`}
                placeholder="Enter your password"
                required
              />
              {errors.password && (
                <p className="text-red-300 text-xs mt-2">{errors.password}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-white text-[#272829] py-3 px-6 rounded-lg font-medium hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#61677A] disabled:opacity-50"
            >
              {loading ? "Logging In..." : "Login"}
            </button>

            <p className="text-center text-white/80 text-sm mt-6">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="text-white font-semibold hover:text-white/80 transition-colors"
              >
                Sign up here
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
