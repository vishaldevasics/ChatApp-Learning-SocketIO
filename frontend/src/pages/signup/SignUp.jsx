import { Link } from "react-router-dom";
import { useState } from "react";
import useSignup from "../../hooks/useSignup.js";

const SignUp = () => {
  const [inputs, setInputs] = useState({
    firstName: "",
    lastName: "",
    username: "",
    confirmPassword: "",
    password: "",
    gender: "",
  });

  const { loading, signup } = useSignup();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputs((prevInputs) => ({
      ...prevInputs,
      [name]: value,
    }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    // Debugging logs
    console.log("Inputs being passed to signup:", inputs);

    await signup(inputs);
  };

  return (
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
      <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
        <h1 className="text-3xl font-semibold text-center text-gray-300">
          Sign Up <span className="text-blue-500">ChatApp</span>
        </h1>

        <form onSubmit={handleSubmit}>
          <div>
            <label className="label p-2" htmlFor="firstName">
              <span className="text-base label-text">First Name</span>
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              placeholder="Enter your first name"
              className="w-full input input-bordered h-10"
              value={inputs.firstName}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label className="label p-2" htmlFor="lastName">
              <span className="text-base label-text">Last Name</span>
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              placeholder="Enter your last name"
              className="w-full input input-bordered h-10"
              value={inputs.lastName}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label className="label p-2" htmlFor="username">
              <span className="text-base label-text">Username</span>
            </label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Enter a username"
              className="w-full input input-bordered h-10"
              value={inputs.username}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label className="label" htmlFor="password">
              <span className="text-base label-text">Password</span>
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter a password"
              className="w-full input input-bordered h-10"
              value={inputs.password}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label className="label" htmlFor="confirmPassword">
              <span className="text-base label-text">Confirm Password</span>
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Confirm your password"
              className="w-full input input-bordered h-10"
              value={inputs.confirmPassword}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label className="label p-2" htmlFor="gender">
              <span className="text-base label-text">Gender</span>
            </label>
            <select
              name="gender"
              id="gender"
              className="w-full input input-bordered h-10"
              value={inputs.gender}
              onChange={handleInputChange}
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          <Link
            className="text-sm hover:underline hover:text-blue-600 mt-2 inline-block"
            to="/login"
          >
            Already have an account?
          </Link>

          <div>
            <button
              type="submit"
              className="btn btn-block btn-sm mt-2 border border-slate-700"
              disabled={loading}
            >
              {loading ? "Signing Up..." : "Sign Up"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
