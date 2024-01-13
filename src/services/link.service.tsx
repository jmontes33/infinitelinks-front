import { linkRepository } from '../repositories/link.repository';
import { CreateLinkDto } from '../repositories/dto/link.dto';

const LinkService = {
  createLink: (data: CreateLinkDto) => {
    return linkRepository.createLink(data);
  },
  getallLinks: (username: string) => {
    return linkRepository.getAllLinks(username);
  },
};

export default LinkService;
