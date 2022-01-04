import axios from 'axios';

const DropService = axios.create({
    baseURL: 'https://drop-backend-rnd454q4pa-ew.a.run.app',
    withCredentials: false,
  });

export function getAllDropTabs() {
    return DropService.get('/categories');
  };