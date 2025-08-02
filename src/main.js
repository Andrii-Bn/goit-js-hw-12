import { getImagesByQuery } from './js/pixabay-api';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMore,
  hideLoadMore,
} from './js/render-functions';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');
const searchInput = document.querySelector('[name="search-text"]');
const loadMore = document.getElementById('load-more');

let page = 1;
const perPage = 15;
let totalPages = 0;
let currentQuery = '';

function scrollAfterLoad() {
  const firstCard = document.querySelector('.gallery .photo-card');
  if (!firstCard) return;

  const cardHeight = firstCard.getBoundingClientRect().height;

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}

form.addEventListener('submit', async event => {
  event.preventDefault();
  const submitData = searchInput.value.trim();
  currentQuery = submitData;
  page = 1;
  hideLoadMore();

  if (!submitData) {
    iziToast.error({
      message: 'Please fill out search field',
      position: 'topRight',
    });
    return;
  }

  clearGallery();
  showLoader();

  try {
    const data = await getImagesByQuery(currentQuery, page, perPage);
    totalPages = Math.ceil(data.totalHits / perPage);

    if (data.hits.length === 0) {
      hideLoadMore();
      iziToast.error({
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight',
      });
      return;
    }

    createGallery(data.hits);

    if (page < totalPages) {
      showLoadMore();
    }
  } catch (err) {
    iziToast.error({
      message: 'Something went wrong. Please try again later.',
      position: 'topRight',
    });
    console.error('Error fetching images:', err.message);
  } finally {
    hideLoader();
  }
});

loadMore.addEventListener('click', async () => {
  page++;
  showLoader();
  hideLoadMore();

  try {
    const data = await getImagesByQuery(currentQuery, page, perPage);
    createGallery(data.hits);
    scrollAfterLoad();

    if (page >= totalPages) {
      hideLoadMore();
      iziToast.info({
        title: 'End',
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
      });
    } else {
      showLoadMore();
    }
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: 'Something went wrong during loading more images.',
      position: 'topRight',
    });
  } finally {
    hideLoader();
  }
});
