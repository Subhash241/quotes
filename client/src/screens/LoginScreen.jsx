import axios from 'axios';
import React,{useState} from 'react'
import { Link, useNavigate } from 'react-router-dom';

const LoginScreen = () => {
    const navigate = useNavigate();
    const [isLoading, setisLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setisLoading(true);


    // Perform form validation
    const validationErrors = {};
    
    if (formData.email.trim() === "") {
      validationErrors.email = "Email is required";
    } else {
      // Simple email format validation
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(formData.email)) {
        validationErrors.email = "Invalid email format";
      }
    }
    if (formData.password.trim() === "") {
      validationErrors.password = "Password is required";
    }

    // If there are validation errors, update the 'errors' state and prevent form submission
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Clear any previous errors before handling form submission logic
    setErrors({});

    // Handle form submission logic here
    // You can access the form data using 'formData' state
    axios
      .post("http://localhost:3000/login", {
        emailId: formData.email,
        password: formData.password,
      })
      .then((res) => {
        console.log(res.data);
        setisLoading(false);
        localStorage.setItem('user',JSON.stringify(res.data))
        navigate('/home')

         // Set loading state to false on successful API response
      })
      .catch((err) => {
        console.log(err);
        setisLoading(false); // Set loading state to false on API error
      });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <div className="w-full max-w-md bg-white p-8 rounded-md shadow-md">
        <h2 className="text-2xl font-bold mb-4">Login Page</h2>
        <form onSubmit={handleSubmit}>
          {/* <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-gray-700 font-bold mb-2"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full p-3 border border-gray-400 rounded-md focus:outline-none focus:border-blue-500"
              required
            />
            {errors.username && (
              <p className="text-red-500">{errors.username}</p>
            )}
          </div> */}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 font-bold mb-2"
            >
              Email ID
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 border border-gray-400 rounded-md focus:outline-none focus:border-blue-500"
              required
            />
            {errors.email && <p className="text-red-500">{errors.email}</p>}
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-700 font-bold mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-3 border border-gray-400 rounded-md focus:outline-none focus:border-blue-500"
              required
            />
            {errors.password && (
              <p className="text-red-500">{errors.password}</p>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-bold py-3 px-4 rounded-md hover:bg-blue-600 transition duration-300 relative"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="absolute inset-0 flex items-center justify-center">
                {/* Replace this with your SVG spinner or icon component */}
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-1.647zM16 4l-4 4m4-4v4m0 12a8 8 0 01-8-8V0m8 16l4-4m0 0V8m0 8a7.962 7.962 0 01-3-5.291l-3 1.647"
                  />
                </svg>
                {/* End of SVG spinner */}
              </span>
            ) : (
              "Login"
            )}
          </button>
          <Link
            to={"/home"}
            type="submit"
            className="w-full text-center mt-5 bg-blue-500 text-white font-bold py-3 px-4 rounded-md hover:bg-blue-600 transition duration-300"
          >
            Cancel
          </Link>
        </form>
      </div>
    </div>
  );
}

export default LoginScreen