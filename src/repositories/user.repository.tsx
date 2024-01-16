import { http } from '../http';
import { authDto } from './dto/user.dto';

const userRepository = {
  loginUser: async (data: authDto) => {
    const request = await http.post(
      import.meta.env.VITE_APP_API_URL + `auth/login`,
      JSON.stringify(data)
    );
    return request;
  },
  registerUser: async (data: authDto) => {
    const request = await http.post(
      import.meta.env.VITE_APP_API_URL + `auth/signup`,
      JSON.stringify(data)
    );
    return request;
  },
};

export default userRepository;
