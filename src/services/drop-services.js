import axios from 'axios';

const DropService = axios.create({
    baseURL: 'https://drop-api-rnd454q4pa-ew.a.run.app',
    withCredentials: false,
  });

export function getAllDropTabs() {
    return DropService.get('/categories');
  };