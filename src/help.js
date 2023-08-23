export const api_url = 'https://api.thecatapi.com/v1';

export const config = {
  headers: { 'x-api-key' : import.meta.env.VITE_USER_ID }
};
export const order = [
  { name:'RANDOM', id: 'RAND'}, 
  { name:'ASC', id: 'ASC'},
  { name:'DESC', id: 'DESC'}
];
