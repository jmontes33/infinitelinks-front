import { create } from 'zustand';

export interface Values {
  userToken: string;
  setUserToken: (userToken: string) => void;
  username: string;
  setUserName: (username: string) => void;
  linkShortened: string;
  setLinkShortened: (linkShortened: string) => void;
  linkShortenedModal: boolean;
  setLinkShortenedModal: (linkShortenedModal: boolean) => void;
  loginForm: boolean;
  setLoginForm: (loginForm: boolean) => void;
}

export const useValueStore = create<Values>((set) => ({
  userToken: '',
  setUserToken: (userToken: string) => set({ userToken }),
  username: '',
  setUserName: (username: string) => set({ username }),
  linkShortened: '',
  setLinkShortened: (linkShortened: string) => set({ linkShortened }),
  linkShortenedModal: false,
  setLinkShortenedModal: (linkShortenedModal: boolean) =>
    set({ linkShortenedModal }),
  loginForm: true,
  setLoginForm: (loginForm: boolean) => set({ loginForm }),
}));
