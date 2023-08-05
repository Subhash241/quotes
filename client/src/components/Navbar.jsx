import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const Navbar = ({pop}) => {
  const [user, setuser] = useState(null)
  useEffect(() => {
    const u = JSON.parse(localStorage.getItem("user"));
    setuser(u);
  }, [])
  
  return (
    <nav className="bg-blue-500 py-4 px-6">
      <div className="container mx-auto flex justify-between items-center">
        {/* <!-- Brand Logo --> */}
        <Link to="/" className="text-white text-xl font-bold">
          Logo
        </Link>

        {/* <!-- Navigation Links --> */}
        <div className="flex items-center space-x-4">
          <Link to="/" className="text-white hover:text-gray-200">
            All Quotes
          </Link>
          <Link to="/home" className="text-white hover:text-gray-200">
            {" "}
            My Quotes
          </Link>
          <button
            onClick={pop}
            className=" px-2 py-1 rounded-lg text-white hover:text-black hover:bg-white bg-blue-400"
          >
            {
              user==null ? 'Profile' : user.emailId
            }
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar