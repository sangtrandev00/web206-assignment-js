import axiosClient from './axiosClient';

const orderDetailApi = {
  getAll(params) {
    const url = '/orderDetail';
    return axiosClient.get(url, { params: params });
  },
  getById(id) {
    const url = `/orderDetail/${id}`;
    return axiosClient.get(url);
  },
  getByOrderId(id) {
    const url = `/orders/${id}/orderDetail`;
    return axiosClient.get(url);
  },
  add(data) {
    const url = `/orderDetail`;
    return axiosClient.post(url, data);
  },

  update(data) {
    const url = `/orderDetail/${data.id}`;
    return axiosClient.patch(url, data);
  },

  remove(id) {
    const url = `/orderDetail/${id}`;
    return axiosClient.delete(url);
  },
};

export default orderDetailApi;
