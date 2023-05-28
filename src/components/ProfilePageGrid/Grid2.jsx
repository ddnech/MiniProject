import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useSelector } from 'react-redux';

const ProfileGrid2 = ({ userData }) => {
  const token = useSelector(state => state.token); // Retrieve the token 

  const usernameValidationSchema = Yup.object().shape({
    currentUsername: Yup.string().required('Current Username is required'),
    newUsername: Yup.string().required('New Username is required'),
  });

  const emailValidationSchema = Yup.object().shape({
    currentEmail: Yup.string().email('Invalid email').required('Current Email is required'),
    newEmail: Yup.string().email('Invalid email').required('New Email is required'),
  });

  const phoneValidationSchema = Yup.object().shape({
    currentPhone: Yup.string().required('Current Phone is required'),
    newPhone: Yup.string().required('New Phone is required'),
  });

  //USERNAME

  const handleUsernameUpdate = async (values) => {
    try {
      const response = await axios.patch(
        'https://minpro-blog.purwadhikabootcamp.com/api/auth/changeUsername',
        {
          currentUsername: values.currentUsername,
          newUsername: values.newUsername,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  //EMAIL

  const handleEmailUpdate = async (values) => {
    try {
      const response = await axios.patch(
        'https://minpro-blog.purwadhikabootcamp.com/api/auth/changeEmail',
        {
          currentEmail: values.currentEmail,
          newEmail: values.newEmail,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handlePhoneUpdate = async (values) => {
    try {
      const response = await axios.patch(
        'https://minpro-blog.purwadhikabootcamp.com/api/auth/changePhone',
        {
          currentPhone: values.currentPhone,
          newPhone: values.newPhone,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div className="mb-4">
        <h3 className="text-lg font-semibold">Edit Username</h3>
        <Formik
          initialValues={{ currentUsername: '', newUsername: '' }}
          validationSchema={usernameValidationSchema}
          onSubmit={handleUsernameUpdate}
        >
          
          <Form>
            <div className="flex flex-col mb-2">
              <label>Current Username:</label>
              <Field className="bg-gray-200 rounded-xl" type="text" id="currentUsername" name="currentUsername" />
              <ErrorMessage name="currentUsername" className="text-red-500" />
            </div>
            <div className="flex flex-col mb-2">
              <label>New Username:</label>
              <Field className="bg-gray-200 rounded-xl" type="text" id="newUsername" name="newUsername" />
              <ErrorMessage name="newUsername" className="text-red-500" />
            </div>
            <div className="flex justify-center"> {/* Add this div for center alignment */}
              <button
                type="submit"
                className="bg-gray-500 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded "
              >
                Update
              </button>
            </div>
          </Form>
        </Formik>
      </div>
      <div className="mb-4">
        <h3 className="text-lg font-semibold">Edit Email</h3>
        <Formik
          initialValues={{ currentEmail: '', newEmail: '' }}
          validationSchema={emailValidationSchema}
          onSubmit={handleEmailUpdate}
        >
          <Form>
            <div className="flex flex-col mb-2">
              <label>Current Email:</label>
              <Field className="bg-gray-200 rounded-xl" type="text" id="currentEmail" name="currentEmail" />
              <ErrorMessage name="currentEmail" className="text-red-500" />
            </div>
            <div className="flex flex-col mb-2">
              <label>New Email:</label>
              <Field className="bg-gray-200 rounded-xl" type="text" id="newEmail" name="newEmail" />
              <ErrorMessage name="newEmail" className="text-red-500" />
            </div>
            <div className="flex justify-center"> {/* Add this div for center alignment */}
              <button
                type="submit"
                className="bg-gray-500 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded "
              >
                Update
              </button>
            </div>
          </Form>
        </Formik>
      </div>
      <div className="mb-4">
        <h3 className="text-lg font-semibold">Edit Phone</h3>
        <Formik
          initialValues={{ currentPhone: '', newPhone: '' }}
          validationSchema={phoneValidationSchema}
          onSubmit={handlePhoneUpdate}
        >
          <Form>
            <div className="flex flex-col mb-2">
              <label >Current Phone:</label>
              <Field className="bg-gray-200 rounded-xl" type="text" id="currentPhone" name="currentPhone" />
              <ErrorMessage name="currentPhone" className="text-red-500" />
            </div>
            <div className="flex flex-col mb-2">
              <label>New Phone:</label>
              <Field className="bg-gray-200 rounded-xl" type="text" id="newPhone" name="newPhone" />
              <ErrorMessage name="newPhone" className="text-red-500" />
            </div>
            <div className="flex justify-center"> {/* Add this div for center alignment */}
              <button
                type="submit"
                className="bg-gray-500 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded"
              >
                Update
              </button>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default ProfileGrid2;
