import axios from 'axios';
import queryString from 'query-string';

const axiosClient = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/v1/bbook/',
  headers: {
    'content-type': 'application/json',
  },
  paramsSerializer: params => queryString.stringify(params),
});

// axiosClient.interceptors.response.use(
//   (response) => {
//     if (response.data) {
//       return response.data;
//     }
//     return response;
//   },
//   (error) => {
//     const statusCode = error.response.status;
//     if (statusCode === 404) {
//       // window.location.href = '/not-found';
//       // return;
//     }
//     if (statusCode === 401) {
//       window.location.href = '/dang-nhap';
//       localStorage.removeItem("token")
//       return;
//     }
//     if (statusCode === 403) {
//       window.location.href = '/dang-nhap';
//       localStorage.removeItem("token")
//       return;
//     }
//     if (statusCode === 500) {
//       // show notification
//       return;
//     }
//     // throw error;
//     return error;
//   },
// );

export default axiosClient;