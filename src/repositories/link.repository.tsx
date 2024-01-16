import { http } from '../http';
import { CreateLinkDto } from './dto/link.dto';
import Cookies from 'js-cookie';

export const linkRepository = {
  createLink: async (data: CreateLinkDto) => {
    const token = Cookies.get('token');
    if (token) {
      const request = await http.authPost(
        import.meta.env.VITE_APP_API_URL + '/auth/short-url',
        JSON.stringify(data),
        token
      );
      return request;
    } else {
      return null;
    }
  },

  getAllLinks: async (username: string) => {
    const token = Cookies.get('token');

    if (token) {
      const request = await http.authGet(
        import.meta.env.VITE_APP_API_URL + `/auth/get-all-links/${username}`,
        token
      );
      return request;
    } else {
      return null;
    }
  },
};
