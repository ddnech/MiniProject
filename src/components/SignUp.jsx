import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
const SignUp = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = (e) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };

  const initialValues = {
    email: '',
    username: '',
    phone: '',
    password: '',
    confirmPassword: '',
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Please use a valid email format').required('Email is required'),
    username: Yup.string().required('Username is required'),
    phone: Yup.number()
      .positive("Can't start with a minus")
      .integer("Can't include a decimal point")
      .required('Phone is required'),
    password: Yup.string()
      .matches(
        /^(?=.*[A-Z])(?=.*\W)(?=.*\d)[a-zA-Z0-9\W]{6,}$/,
        'At least 6 characters, 1 symbol, and 1 capital letter'
      )
      .required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm Password is required'),
  });

  const handleSubmit = async (values, { setSubmitting, resetForm, setStatus }) => {
    try {
      const response = await axios.post('https://minpro-blog.purwadhikabootcamp.com/api/auth/', values);

      if (response.status === 200) {
        const token = response.data;
        console.log('Token:', token);
        resetForm();
        setStatus({ success: true, token });
        setStatus({ success: true, message: 'Sign up successful. Please check your email for verification.' });
        setTimeout(() => {
          navigate('/home'); 
        }, 3000);
      } else {
        throw new Error('Login Failed');
      }
    } catch (error) {
      setStatus({ success: false });
    } finally {
      setSubmitting(false);
    }
  };


  return (
    <div className='bg-white'>
      <div className='w-screen h-[48rem] grid justify-center mt-3'>
        <div className='w-[28rem] h-[44rem] grid grid-flow-row rounded overflow-hidden shadow-2xl'>
          <div className='h-[35rem]'>
            <div>
              <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                {({ isSubmitting, status }) => (
                  <Form>
                    <h3 className='font-monts font-bold text-xl text-center text-darkcho m-4'>Word.Smith</h3>
                    <div className='grid grid-flow-row gap-3 mx-4'>
                      {status && status.success && (
                        <p className='text-center text-green-500'>{status.message}</p>
                      )}
                      <div className='relative'>
                        <Field className='border-gray-200 border-2 h-10  w-full' type='text' name='username' placeholder='Username' />
                        <ErrorMessage name='username' component='div' className='text-red-500 text-xs' />
                      </div>
                      <div className='relative'>
                        <Field className='border-gray-200 border-2 h-10  w-full' type='email' name='email' placeholder='Email' />
                        <ErrorMessage name='email' component='div' className='text-red-500 text-xs' />
                      </div>
                      <div className='relative'>
                        <Field className='border-gray-200 border-2 h-10 w-full' type='text' name='phone' placeholder='Phone' />
                        <ErrorMessage name='phone' component='div' className='text-red-500 text-xs' />
                      </div>
                      <div className='relative'>
                        <Field
                          className='border-gray-200 border-2 h-10  w-full'
                          type={showPassword ? 'text' : 'password'}
                          name='password'
                          placeholder='Password'
                        />
                        <ErrorMessage name='password' component='div' className='text-red-500 text-xs' />
                      </div>
                      <div className='relative'>
                        <Field
                          className='border-gray-200 border-2 h-10  w-full'
                          type={showPassword ? 'text' : 'password'}
                          name='confirmPassword'
                          placeholder='Confirm Password'
                        />
                        <ErrorMessage name='confirmPassword' component='div' className='text-red-500 text-xs' />
                      </div>
                      <div className='grid grid-flow-col justify-start'>
                        <button onClick={togglePassword} className=''>
                          <span className='flex content-center h-5'>
                            {showPassword ? <AiOutlineEye className='' /> : <AiOutlineEyeInvisible   className='' />}
                          </span>
                        </button>
                      </div>
                      <button
                        className='w-full py-2 my-4 bg-olive text-ivory hover:bg-sage hover:text-black hover:font-bold'
                        type='submit'
                        disabled={isSubmitting}
                      >
                        Sign Up
                      </button>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
            <div className='text-center font-fira'>
              <p>
                Already a user?{' '}
                <Link to='/Register' className='m-1 bg-sage py-2 px-1 rounded hover:bg-lightcho'>
                  Log In!
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;