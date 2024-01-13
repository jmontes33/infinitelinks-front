export interface CreateLinkDto {
  username: string;
  originalUrl: string;
  shortUrl: string;
}

export interface LinkDto {
  status: number;
  data: LinkData;
}

export interface LinkData {
  id: number;
  username: string;
  shortId: string;
  originalUrl: string;
  shortUrl: string;
}
