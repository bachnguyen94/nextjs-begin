import {AxiosClientBlog as AxiosClient} from './general.api';

export const getUsers = () => AxiosClient.get('/users');

export const createBlog = (payload: IBlog) =>
  AxiosClient.post('/blogs', payload);

export const updateBlog = (id: number, payload: IBlog) =>
  AxiosClient.patch(`/blogs/${id}`, payload);

export const getBlog = (id: number) =>
  AxiosClient.get(`/blogs/${id}`);

export const deleteBlog = (id: number | undefined) =>
  AxiosClient.delete(`/blogs/${id}`);

export const fetchBlogs = (params: string, queryString: string) => {
  return AxiosClient.get(`/${params}?${queryString}`);
}