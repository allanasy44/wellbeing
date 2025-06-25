import {MMKV} from '../services/web-mocks';

export const storage = MMKV;

if (!storage.getString('language')) {
  storage.set('language', 'en');
}

export const setLanguage = (language: string) => {
  storage.set('language', language);
};

export const getLanguage = () => storage.getString('language');
