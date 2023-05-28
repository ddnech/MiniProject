import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useSelector } from 'react-redux';
import axios from 'axios';

const Grid4 = () => {
  const [errMsg, setErrMsg] = useState('');
  const [image, setImage] = useState('');
  const [categories, setCategories] = useState([]);
  const token = useSelector((state) => state.tokenAuth.token);

  useEffect(() => {
    axios
      .get('https://minpro-blog.purwadhikabootcamp.com/api/blog/allCategory')
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.log('Error:', error);
      });
  }, []);

  const createBlog = async (values) => {
    alert('Submit form!');

    const formData = new FormData();
    formData.append('data', JSON.stringify(values));
    formData.append('file', image);

    try {
      const res = await axios.post(
        'https://minpro-blog.purwadhikabootcamp.com/api/blog',
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(res);
    } catch (err) {
      console.log(err);
      if (err.response) {
        const errorMessage =
          err.response.data && err.response.data.message
            ? err.response.data.message
            : 'Error occurred during submission';
        setErrMsg(errorMessage);
      } else {
        setErrMsg('Error occurred during submission');
      }
    }
  };

  const formik = useFormik({
    initialValues: {
      title: '',
      content: '',
      country: '',
      CategoryId: '',
      url: '',
      keywords: '',
    },
    onSubmit: createBlog,
    validationSchema: Yup.object().shape({
      title: Yup.string().required('Title is required'),
      content: Yup.string()
        .required('Content is required')
        .max(255, 'Content must be 255 characters or less'),
      country: Yup.string().required('Country is required'),
      CategoryId: Yup.string().test(
        'required',
        'Category is required',
        (value) => value !== 'Select Category'
      ),
    }),
  });

  const handleForm = (event) => {
    const { target } = event;
    formik.setFieldValue(target.name, target.value);
  };

  const handleFile = (e) => {
    setImage(e.target.files[0]);
  };

  return (
    <div className="p-10">
      <h1 className="text-3xl font-semibold">CREATE BLOG</h1>
      <form onSubmit={formik.handleSubmit}>
        {errMsg && (
          <div className="w-full bg-red-200 text-red-700 h-10 flex justify-center items-center mt-2">
            <p>{errMsg}</p>
          </div>
        )}
        <div className="grid gap-2 mt-5">
          <div className="flex flex-col">
            <label className="block font-medium mb-2">Title</label>
            <input
              onChange={handleForm}
              type="text"
              name="title"
              className="border rounded-md py-2 px-3 w-full"
              autoComplete="off"
              value={formik.values.title}
            />
            {formik.touched.title && formik.errors.title && (
              <p className="text-red-500 mt-1">{formik.errors.title}</p>
            )}
          </div>

          <div className="flex flex-col">
            <label className="block font-medium mb-2">Content (Max 255 words)</label>
            <textarea
              onChange={handleForm}
              name="content"
              className="border rounded-md py-2 px-3 w-full"
              autoComplete="off"
              value={formik.values.content}
            />
            {formik.touched.content && formik.errors.content && (
              <p className="text-red-500 mt-1">{formik.errors.content}</p>
            )}
          </div>

          <div className="flex flex-col">
            <label className="block font-medium mb-2">Country</label>
            <input
              onChange={handleForm}
              type="text"
              name="country"
              className="border rounded-md py-2 px-3 w-full"
              autoComplete="off"
              value={formik.values.country}
            />
            {formik.touched.country && formik.errors.country && (
              <p className="text-red-500 mt-1">{formik.errors.country}</p>
            )}
          </div>

          <div className="flex flex-col">
            <label className="block font-medium mb-2">Category</label>
            <select
              onChange={handleForm}
              name="CategoryId"
              className="border rounded-md py-2 px-3 w-full"
              value={formik.values.CategoryId}
            >
              <option value="Select Category">Select Category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            {formik.touched.CategoryId && formik.errors.CategoryId && (
              <p className="text-red-500 mt-1">{formik.errors.CategoryId}</p>
            )}
          </div>

          <div className="flex flex-col">
            <label className="block font-medium mb-2">URL</label>
            <input
              onChange={handleForm}
              type="text"
              name="url"
              className="border rounded-md py-2 px-3 w-full"
              autoComplete="off"
              value={formik.values.url}
            />
            {formik.touched.url && formik.errors.url && (
              <p className="text-red-500 mt-1">{formik.errors.url}</p>
            )}
          </div>

          <div className="flex flex-col">
            <label className="block font-medium mb-2">Keywords</label>
            <input
              onChange={handleForm}
              type="text"
              name="keywords"
              className="border rounded-md py-2 px-3 w-full"
              autoComplete="off"
              value={formik.values.keywords}
            />
            {formik.touched.keywords && formik.errors.keywords && (
              <p className="text-red-500 mt-1">{formik.errors.keywords}</p>
            )}
          </div>

          <div className="flex flex-col">
            <label className="block font-medium mb-2">Image</label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleFile}
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Grid4;