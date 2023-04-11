import React, { useState } from "react";
import Logo from "../../commons/logo/logo.component";
import { useAuth } from "../../context/auth-context";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const [user, setUser] = useState({ email: "", password: "" });
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e : any) => {
    e.preventDefault();
    try {
      await login(user.email, user.password);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a
          href="#"
          className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
        >
          <Logo size={350} />
        </a>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Welcome Back !
            </h1>
            <label className="block  mb-2 text-xs font-medium text-gray-900 dark:text-gray-400">
              Enter Details below to get started with POC!
            </label>
            <form className="space-y-4 md:space-y-6" onSubmit={handleLogin} >
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  onChange={(e) => setUser({ ...user, email: e.target.value })}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com"
                  required
                />
                <label className="block mt-2 mb-2 text-xs font-medium text-gray-900 dark:text-gray-400">
                  This email should be your admin email
                </label>
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Password
                </label>
                <input
                  onChange={(e) =>
                    setUser({ ...user, password: e.target.value })
                  }
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
                <label className="block mt-2 mb-2 text-xs font-medium text-gray-900 dark:text-gray-400">
                  Admin password given while onboarding
                </label>
              </div>

              <button
                style={{ backgroundColor: "#5d93cb" }}
                type="submit"
                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Continue
              </button>
              <label className="block text-center mt-2 mb-2 text-xs font-medium text-gray-900 dark:text-gray-400">
                Powered by @ Axium Digital 2023 - (BETA VERSION)
              </label>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
