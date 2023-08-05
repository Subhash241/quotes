import axios from 'axios';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';

const RegistrationScreen = () => {
   const [formData, setFormData] = useState({
     username: "",
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

     // Perform form validation
     const validationErrors = {};
     if (formData.username.trim() === "") {
       validationErrors.username = "Username is required";
     }
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
     axios.post("http://localhost:3000/create_user", {
       username:formData.username,
       emailId:formData.email,
       password:formData.password,
     }).then((res)=>{
        console.log(res.data);
     }).catch(err=>console.log(err))
     // You can access the form data using 'formData' state
     console.log(formData);
   };

   return (
     <div className="min-h-screen bg-gray-100 flex justify-center items-center">
       <div className="w-full max-w-md bg-white p-8 rounded-md shadow-md">
         <h2 className="text-2xl font-bold mb-4">Register</h2>
         <form onSubmit={handleSubmit}>
           <div className="mb-4">
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
           </div>
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
             className="w-full bg-blue-500 text-white font-bold py-3 px-4 rounded-md hover:bg-blue-600 transition duration-300"
           >
             Register
           </button>
           <Link to={'/home'}
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

export default RegistrationScreen