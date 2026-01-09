import React, { useState, useEffect } from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const EditBook = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publishYear, setPublishYear] = useState('');
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const fetchBook = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/books/${id}`
      );
        setTitle(response.data.title);
        setAuthor(response.data.author);
        setPublishYear(response.data.publishYear);
      } catch (error) {
        console.error(error);
        enqueueSnackbar('Failed to load book', { variant: 'error' });
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id, enqueueSnackbar]);

  const handleEditBook = async () => {
    const data = { title, author, publishYear };
    setLoading(true);

    try {
      await axios.put(`http://localhost:5000/books/${id}`, data);
      enqueueSnackbar('Book edited successfully', { variant: 'success' });
      navigate('/');
    } catch (error) {
      console.error(error);
      enqueueSnackbar('Error editing book', { variant: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4">Edit Book</h1>

      {loading ? (
        <Spinner />
      ) : (
        <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
          <div className="my-4">
            <label className="text-xl mr-4 text-gray-500">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border-2 border-gray-500 px-4 py-2 w-full"
            />
          </div>

          <div className="my-4">
            <label className="text-xl mr-4 text-gray-500">Author</label>
            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="border-2 border-gray-500 px-4 py-2 w-full"
            />
          </div>

          <div className="my-4">
            <label className="text-xl mr-4 text-gray-500">Publish Year</label>
            <input
              type="number"
              value={publishYear}
              onChange={(e) => setPublishYear(e.target.value)}
              className="border-2 border-gray-500 px-4 py-2 w-full"
            />
          </div>

          <button
            className="p-2 bg-sky-300 hover:bg-sky-500 m-8 rounded"
            onClick={handleEditBook}
          >
            Save
          </button>
        </div>
      )}
    </div>
  );
};

export default EditBook;
