import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

const ProfileGrid3 = () => {
  const token = useSelector((state) => state.tokenAuth.token);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const passwordValidationSchema = Yup.object().shape({
    currentPassword: Yup.string().required('Current Password is required'),
    password: Yup.string()
      .required('New Password is required')
      .min(8, 'Min 8 characters long'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm Password is required'),
  });

  const handlePasswordUpdate = async (values, { resetForm }) => {
    try {
      const response = await axios.patch(
        'https://minpro-blog.purwadhikabootcamp.com/api/auth/changePass',
        {
          currentPassword: values.currentPassword,
          password: values.password,
          confirmPassword: values.confirmPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response.data);
      setSuccessMessage('Password updated successfully.');
      setErrorMessage('');
      resetForm();
    } catch (error) {
      if (error.response && error.response.data) {
        setErrorMessage(error.response.data);
      } else {
        setErrorMessage('An error occurred. Please try again.');
      }
      setSuccessMessage('');
    }
  };

  const toggleCurrentPassword = (e) => {
    e.preventDefault();
    setShowCurrentPassword(!showCurrentPassword);
  };

  const toggleNewPassword = (e) => {
    e.preventDefault();
    setShowNewPassword(!showNewPassword);
  };

  return (
    <div className="">
      <div className="mb-4">
        <h3 className="text-lg font-semibold">Change Password</h3>
        <Formik
          initialValues={{ currentPassword: '', password: '', confirmPassword: '' }}
          validationSchema={passwordValidationSchema}
          onSubmit={handlePasswordUpdate}
        >
          <Form>
            <div className="flex flex-col mb-2">
              <label htmlFor="currentPassword">Current Password:</label>
              <div className="relative">
                <Field
                  className="bg-gray-200 rounded-xl pr-10"
                  type={showCurrentPassword ? 'text' : 'password'}
                  id="currentPassword"
                  name="currentPassword"
                />
                <button
                  className={`absolute top-1/2 right-3 transform -translate-y-1/2 ${
                    showCurrentPassword ? 'text-gray-300' : 'text-gray-500'
                  }`}
                  onClick={toggleCurrentPassword}
                  aria-label="Toggle current password visibility"
                >
                  {showCurrentPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
                </button>
              </div>
              <ErrorMessage name="currentPassword" component="div" className="text-red-500" />
            </div>
            <div className="flex flex-col mb-2">
              <label htmlFor="password">New Password:</label>
              <div className="relative">
                <Field
                  className="bg-gray-200 rounded-xl pr-10"
                  type={showNewPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                />
                <button
                  className={`absolute top-1/2 right-3 transform -translate-y-1/2 ${
                    showNewPassword ? 'text-gray-300' : 'text-gray-500'
                  }`}
                  onClick={toggleNewPassword}
                  aria-label="Toggle new password visibility"
                >
                  {showNewPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
                </button>
              </div>
              <ErrorMessage name="password" component="div" className="text-red-500" />
            </div>
            <div className="flex flex-col mb-2">
              <label htmlFor="confirmPassword">Confirm Password:</label>
              <Field
                className="bg-gray-200 rounded-xl"
                type="password"
                id="confirmPassword"
                name="confirmPassword"
              />
              <ErrorMessage name="confirmPassword" component="div" className="text-red-500" />
            </div>
            <button
              type="submit"
              className="bg-gray-500 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded"
            >
              Update
            </button>
            {successMessage && <div className="text-green-500 mt-2">{successMessage}</div>}
            {errorMessage && <div className="text-red-500 mt-2">{errorMessage}</div>}
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default ProfileGrid3;