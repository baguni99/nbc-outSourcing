import axios from 'axios';

const API_URL =
  'https://www.googleapis.com/youtube/v3/search?part=snippet&q=%EC%9E%90%EC%B7%A8%EC%83%9D%20%EB%A0%88%EC%8B%9C%ED%94%BC&key=AIzaSyA0bHsrm90pIK2J9anLy_b2LTg8wbsJWck';
const API_KEY = process.env.DEVELOPER_KEY;

const fetchCategoryVideos = async (category) => {
  try {
    const response = await axios.get(API_URL, {
      params: {
        part: 'snippet',
        q: category,
        key: API_KEY
      }
    });

    const videos = response.data.items;
    console.log(videos);
  } catch (error) {
    console.log(error);
  }
};

fetchCategoryVideos('자취생 레시피');
