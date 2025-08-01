import axios from 'axios';
import 'izitoast/dist/css/iziToast.min.css';

export async function getImagesByQuery(query, page = 1, perPage = 15) {
  const response = await axios.get('https://pixabay.com/api/', {
    params: {
      key: '51395904-122be9b434c3d42803bb62926',
      q: query,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      page,
      per_page: perPage,
    },
  });

  return response.data;
}
