import axiosClient from './axiosClient';

const categoryApi = {
  getAll(params) {
    const url = '/categories';
    return axiosClient.get(url, { params: params });
  },
  getById(id) {
    const url = `/categories/${id}`;
    return axiosClient.get(url);
  },

  add(data) {
    const url = `/categories`;
    return axiosClient.post(url, data);
  },

  addFormdata(data) {
    const url = `/categories`;
    return axiosClient.post(url, data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },

  update(data) {
    const url = `/categories/${data.id}`;
    return axiosClient.patch(url, data);
  },
  updateFormdata(data) {
    const url = `/categories/${data.id}`;
    return axiosClient.patch(url, data, { headers: { 'Content-Type': 'multipart/form-data' } });
  },

  remove(id) {
    const url = `/categories/${id}`;
    return axiosClient.delete(url);
  },
};

export default categoryApi;
