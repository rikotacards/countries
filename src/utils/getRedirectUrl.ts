export const getRedirectURL = () => {
  // Access the VITE_SITE_URL from your env files
  let url = import.meta.env.VITE_SITE_URL ?? 'http://localhost:3000';
  
  // Ensure there is a trailing slash
  url = url.endsWith('/') ? url : `${url}/`;
    console.log('ru', url)
  // Append your auth callback path
  return `${url}`;
};