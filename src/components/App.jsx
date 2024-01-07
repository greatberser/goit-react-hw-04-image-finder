import { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';
import { ToastContainer, toast } from 'react-toastify';
import { Rings } from 'react-loader-spinner';
import * as ImageStorage from './API/api';

export class App extends Component {
  state = {
    status: 'idle',
    error: null,
    images: [],
    webformatURL: '',
    largeImageURL: '',
    tags: '',
    page: 1,
    query: '',
    showModal: false,
    isEmpty: false,
  };

  async componentDidUpdate(_, prevState) {
    const { query, page } = this.state;
    if (prevState.query !== query || prevState.page !== page) {
      try {
        const { hits, totalHits } = await ImageStorage.getImages(query, page);

        if (hits.length === 0) {
          this.setState({ isEmpty: true });
          return;
        }
        if (hits.length < 40) {
          toast.success(
            "We're sorry, but you've reached the end of search results."
          );
        }
        this.setState(prevState => ({
          status: 'loading',
          images: [...prevState.images, ...hits],
          isLoadMore: page < Math.ceil(totalHits / 40),
        }));
      } catch (error) {
        this.setState({ error: error.message });
      } finally {
        this.setState({ status: 'idle' });
      }
    }
  }


  loadMoreImages = () => {
    this.setState(prevState => {
      return {
        status: 'loading',
        page: prevState.page + 1,
      };
    });
  };

  handleSerch = query => {
    this.setState({
      query,
      page: 1,
      images: [],
      isLoadMore: false,
      isEmpty: false,
      status: 'loading',
    });
  };


  handlerModal = (largeImageURL, tags) => {
    this.setState({largeImageURL, tags, showModal: true});
  };

  handleCloseModal = () => {
    this.setState(prevState => {
      return {
        showModal: !prevState.showModal,
        largeImageURL: '',
        status: 'idle',
      };
    });
  };

  render() {
    const { images, isLoadMore, showModal, isEmpty, error, status } =
      this.state;

    return (
      <div className="App">
        <Searchbar handleSerch={this.handleSerch} />
        {images.length > 0 && (
          <ImageGallery
            images={this.state.images}
            onModal={this.handlerModal}
          />
        )}
        {isLoadMore && <Button loadMore={this.loadMoreImages} />}
        {showModal && (
          <Modal
            imgSrc={this.state.largeImageURL}
            imgAlt={this.state.tags}
            onCloseModal={this.handleCloseModal}
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
  }
}