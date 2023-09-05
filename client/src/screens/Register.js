import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../actions/adminActions";
import { registerFail } from "../features/registerSlice";

function Register() {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [name, setName] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, userInfo, error } = useSelector((state) => state.register);

  const handleRegister = (e) => {
    e.preventDefault();
    if (!email || !password || !name) {
      window.alert("Please include all fields");
    } else {
      dispatch(register(email, password, name));
    }
  };

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [userInfo]);
  useEffect(() => {
    if (error) {
      window.alert(error);
    }
    dispatch(registerFail(null));
  }, [error]);

  return (
    <body class="bg-gray-200 h-[100vh] font-sans text-gray-700">
      <div class="container mx-auto p-8 flex">
        <div class="max-w-md w-full mx-auto">
          <h1 class="text-4xl text-center mb-12 font-thin">Register</h1>

          <div class="bg-white rounded-lg overflow-hidden shadow-2xl">
            <div class="p-8">
              <form method="POST" class="" action="#" onsubmit="return false;">
                <div class="mb-5">
                  <label
                    for="email"
                    class="block mb-2 text-sm font-medium text-gray-600"
                  >
                    Name
                  </label>

                  <input
                    type="text"
                    name="name"
                    class="block w-full p-3 rounded bg-gray-200 border border-transparent focus:outline-none"
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                  />
                </div>
                <div class="mb-5">
                  <label
                    for="email"
                    class="block mb-2 text-sm font-medium text-gray-600"
                  >
                    Email
                  </label>

                  <input
                    type="text"
                    name="email"
                    class="block w-full p-3 rounded bg-gray-200 border border-transparent focus:outline-none"
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                </div>

                <div class="mb-5">
                  <label
                    for="password"
                    class="block mb-2 text-sm font-medium text-gray-600"
                  >
                    Password
                  </label>

                  <input
                    type="password"
                    name="password"
                    class="block w-full p-3 rounded bg-gray-200 border border-transparent focus:outline-none"
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  />
                </div>

                <button
                  onClick={handleRegister}
                  class="w-full p-3 mt-4 bg-indigo-600 text-white rounded shadow"
                >
                  Register
                </button>
              </form>
            </div>

            <div class="flex justify-between p-8 text-sm border-t border-gray-300 bg-gray-100">
              <Link to="/forgetPassword" class="text-gray-600">
                Forgot password?
              </Link>
              <Link to="/login" class="font-medium text-indigo-500">
                Back to Login?
              </Link>
            </div>
          </div>
        </div>
      </div>
    </body>
  );
}

export default Register;
