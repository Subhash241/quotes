import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import { Link, Outlet, useNavigate } from 'react-router-dom'

const Layout = ({children}) => {
  const n = useNavigate()
  const [user, setuser] = useState(null);
  useEffect(() => {
    const u = JSON.parse(localStorage.getItem("user"));
    setuser(u);
  }, []);
  const [ispopup, setispopup] = useState(false);
    const pop = () => {
      setispopup(!ispopup);
    };
  return (
    <div className="relative">
      <Navbar pop={pop} />
      {ispopup && (
        <div className="fixed right-10 px-5 py-3 bg-blue-300 z-50 rounded-lg">
          <div className="flex flex-col md:flex-row justify-center space-y-2 md:space-y-0 md:space-x-4">
            {user == null ? (
              <div>
                <Link
                  to={"/registration"}
                  className="bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
                  onClick={() => console.log("Register button clicked")}
                >
                  Register
                </Link>
                <Link
                  to={"/login"}
                  className="bg-green-500 text-white font-bold py-2 px-4 rounded-md hover:bg-green-600 transition duration-300"
                  onClick={() => console.log("Login button clicked")}
                >
                  Login
                </Link>{" "}
              </div>
            ) : (
              <button
                className="bg-green-500 text-white font-bold py-2 px-4 rounded-md hover:bg-green-600 transition duration-300"
                onClick={() => {
                  localStorage.clear();
                  n('/login')
                }}
              >
                Logout
              </button>
            )}
          </div>
        </div>
      )}
      <Outlet />
    </div>
  );
}

export default Layout