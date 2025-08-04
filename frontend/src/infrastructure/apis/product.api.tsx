import {AxiosClientProduct as AxiosClient} from './general.api';

export const fetchProducts = (params: string, queryString: string) => {
  return AxiosClient.get(`/${params}/search?${queryString}`);
}

export const fetchProductById = (params: string, queryString: string) => {
  return AxiosClient.get(`/${params}/${queryString}`);
}