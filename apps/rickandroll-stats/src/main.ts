import { environment } from './environments/environment';

window.onload = () => {
  const id = window.location.pathname.split('/')[2];
  fetch(`${environment.apiUrl}/${id}/stats`)
    .then((response) => response.json())
    .then(console.log);
};
