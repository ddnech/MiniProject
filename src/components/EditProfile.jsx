import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const EditProfile = () => {
  const initialValues = {
    username: '',
    email: '',
    phoneNumber: '',
  };

  const validationSchema = Yup.object({
    username: Yup.string().required('Username is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    phoneNumber: Yup.string().required('Phone number is required'),
  });

  const handleSubmit = (values) => {
    console.log(values); // Replace with your logic to update user data
  };

  return (
    <div className="flex">
      <div className="fixed w-50 h-screen p-4 bg-white border-r-[1px] flex flex-col justify-between">
        <div className="flex flex-col items-center">
          <div className="bg-gray-300 p-3 rounded-lg inline-block">
            {/* Replace with your desired icon */}
            <span>Edit Profile Icon</span>
          </div>
          <span className="border-b-[1px] border-gray-200 w-full p-2"></span>
          <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
            <Form className="flex flex-col items-center">
              <div className="my-4">
                <label htmlFor="username">Username</label>
                <Field type="text" id="username" name="username" />
                <ErrorMessage name="username" component="div" className="text-red-500" />
              </div>
              <div className="my-4">
                <label htmlFor="email">Email</label>
                <Field type="email" id="email" name="email" />
                <ErrorMessage name="email" component="div" className="text-red-500" />
              </div>
              <div className="my-4">
                <label htmlFor="phoneNumber">Phone Number</label>
                <Field type="text" id="phoneNumber" name="phoneNumber" />
                <ErrorMessage name="phoneNumber" component="div" className="text-red-500" />
              </div>
              <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg">
                Update Profile
              </button>
            </Form>
          </Formik>
        </div>
      </div>
      <main className="ml-20 w-full">{/* Your main content */}</main>
    </div>
  );
};

export default EditProfile;