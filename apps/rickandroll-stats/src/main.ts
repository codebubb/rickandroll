import { environment } from './environments/environment';
import * as dayjs from 'dayjs';

const createHeading = (text: string) => {
  const h2Tag = document.createElement('h2');
  h2Tag.textContent = text;

  return h2Tag;
};

const createStatsTable = (
  redirects: Array<{ accessed: string; location: string }>
) => {
  const tableElement = document.createElement('table');
  const tableHeadingRow = document.createElement('tr');
  tableHeadingRow.innerHTML = '<th>Accessed On</th><th>Location</th>';
  tableElement.appendChild(tableHeadingRow);
  redirects.forEach((redirect) => {
    tableElement.appendChild(createStatsTableRow(redirect));
  });

  return tableElement;
};

const createStatsTableRow = (redirect: {
  accessed: string;
  location: string;
}) => {
  const trElement = document.createElement('tr');
  trElement.innerHTML = `<td>${dayjs(redirect.accessed).format(
    'HH:mm:ss DD/MM/YYYY'
  )}</td><td>${redirect.location}<td>`;

  return trElement;
};

window.onload = () => {
  const straplineElement = document.querySelector('.strapline');
  const id = window.location.pathname.split('/')[2];

  const shortUrlBtn = document.getElementById('shortUrlBtn');
  const shortUrlId = document.getElementById('shortUrlId') as HTMLInputElement;

  shortUrlBtn.addEventListener('click', () => {
    const shortUrlValue = shortUrlId.value.trim();

    window.location.href = `/stats/${shortUrlValue}`;
  });

  fetch(`${environment.apiUrl}/${id}/stats`)
    .then((response) => response.json())
    .then((result) => {
      console.log(result);

      if (result.status === 'ok') {
        straplineElement.appendChild(
          createHeading(`Viewing stats for URL: ${id}`)
        );
        straplineElement.appendChild(createStatsTable(result.data.redirects));
      } else {
        straplineElement.appendChild(createHeading(result.message));
      }
    });
};
