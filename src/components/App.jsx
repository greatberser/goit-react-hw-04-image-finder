import React, { useState, useEffect } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';
import { ToastContainer, toast } from 'react-toastify';
import { Rings } from 'react-loader-spinner';
import * as ImageStorage from './API/api';

export const App = () => {
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState(null);
  const [images, setImages] = useState([]);
  const [largeImageURL, setLargeImageURL] = useState('');
  const [tags, setTags] = useState('');
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);
  const [isLoadMore, setIsLoadMore] = useState(false);


  useEffect(() => {
    if (query !== '') {
      fetchImage();
    }

    async function fetchImage() {
      try {
        const { hits, totalHits } = await ImageStorage.getImages(query, page);

        if (hits.length === 0) {
          setIsEmpty(true);
          return;
        }
        if (hits.length < 12) {
          toast.success(
            "We're sorry, but you've reached the end of search results."
          );
        }

        setStatus('loading');
        setImages(prevState => [...prevState, ...hits]);
        setIsLoadMore(page < Math.ceil(totalHits / 40));
      } catch (error) {
        setError(error.message);
      } finally {
        setStatus('idle');
      }
    }
  }, [query, page]);


  const loadMoreImages = () => {
    setPage(prevPage => prevPage + 1);
    setStatus('loading');
  };

  const handleSearch = newQuery => {
    setQuery(newQuery);
    setPage(1);
    setImages([]);
    setIsEmpty(false);
    setStatus('loading');
  };

  const handleModal = (url, imageTags) => {
    setLargeImageURL(url);
    setTags(imageTags);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(prevShowModal => !prevShowModal);
    setLargeImageURL('');
    setStatus('idle');
  };

  return (
    <div className="App">
      <Searchbar handleSearch={handleSearch} />
      {images.length > 0 && (
        <ImageGallery images={images} onModal={handleModal} />
      )}
      {isLoadMore && <Button loadMore={loadMoreImages} />}
      {showModal && (
        <Modal
          imgSrc={largeImageURL}
          imgAlt={tags}
          onCloseModal={handleCloseModal}
          onChangeStatus={setStatus}
        />
      )}
      {page > 1 && <Button loadMore={loadMoreImages} />}
      {showModal && (
        <Modal
          imgSrc={largeImageURL}
          imgAlt={tags}
          onCloseModal={handleCloseModal}
        />
      )}
      {error && <p className="textEmpty">Sorry. {error}</p>}
      {isEmpty && (
        <p className="textEmpty">Sorry. There are no images...</p>
      )}
      {status === 'loading' && (
        <Rings
          visible={true}
          height="80"
          width="80"
          color="#4fa94d"
          ariaLabel="rings-loading"
          wrapperStyle={{
            top: '50%',
            left: '50%',
            opacity: '0.5',
            height: '200px',
            width: '200px',
            position: 'fixed',
            zIndex: '99',
          }}
          wrapperClass=""
        />
      )}
      <ToastContainer autoClose={2000} hideProgressBar={true} theme="light" />
    </div>
  );
};

export default App;
