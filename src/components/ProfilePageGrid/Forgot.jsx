// import React, { useState } from 'react';
// import { Formik, Form, Field, ErrorMessage } from 'formik';
// import * as Yup from 'yup';
// import axios from 'axios';
// import { useSelector } from 'react-redux';

// const Forgot = () => {
//   const token = useSelector((state) => state.tokenAuth.token);  // Retrieve the token from the Redux store
//   const [successMessage, setSuccessMessage] = useState('');
//   const [errorMessage, setErrorMessage] = useState('');

//   const passwordValidationSchema = Yup.object().shape({
//     Email: Yup.string().required('Current Password is required'),
//   });

//   const handleForgot = async (values) => {
//     try {
//       const response = await axios.patch(
//         'https://minpro-blog.purwadhikabootcamp.com/api/auth/forgotPass',
//         {
//           email: values.email,
//         }
//       );

//       console.log(response.data); // Handle success condition
//       setSuccessMessage('Password updated successfully.');
//       setErrorMessage('');
//     } catch (error) {
//       if (error.response && error.response.data) {
//         setErrorMessage(error.response.data);
//       } else {
//         setErrorMessage('An error occurred. Please try again.');
//       }
//       setSuccessMessage('');
//     }
//   };

//   return (
//     <div>
//       <div className="mb-4 justify-center">
//         <h3 className="text-lg font-semibold">Forgot Password</h3>
//         <Formik
//           initialValues={{ email: ''}}
//           validationSchema={EmailValidationSchema}
//           onSubmit={handleForgot}
//         >
//           <Form>
//             <div className="flex flex-col mb-2">
//               <label htmlFor="currentPassword">email:</label>
//               <Field type="email" id="email" name="email" />
//               <ErrorMessage name="email" component="div" className="text-red-500" />
//             </div>
//             <button
//               type="submit"
//               className="bg-gray-500 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded"
//             >
//               Update
//             </button>
//             {successMessage && <div className="text-green-500 mt-2">{successMessage}</div>}
//             {errorMessage && <div className="text-red-500 mt-2">{errorMessage}</div>}
//           </Form>
//         </Formik>
//       </div>
//     </div>
//   );
// };

// export default Forgot;
