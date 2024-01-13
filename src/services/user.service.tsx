import userRepository from '../repositories/user.repository';
import {} from '../entities/httpForm.entity';
import { authDto } from '../repositories/dto/user.dto';

const UserService = {
  loginUser: (data: authDto) => {
    return userRepository.loginUser(data);
  },
  registerUser: (data: authDto) => {
    return userRepository.registerUser(data);
  },
};

export default UserService;
