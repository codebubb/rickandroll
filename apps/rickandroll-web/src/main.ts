import { environment } from './environments/environment';
import { AllowedUrl, allowedUrls } from '@rickandroll/common-defintions';
import { url } from 'inspector';

const mapAllowedUrlsToOptions = (
  urls: AllowedUrl[],
  htmlSelectElement: HTMLSelectElement
) => {
  urls.forEach((optionUrl) => {
    const option = document.createElement('option');
    option.value = optionUrl.url;
    option.textContent = optionUrl.title;

    htmlSelectElement.appendChild(option);
  });
};

window.onload = () => {
  const actionBtn = document.getElementById('actionBtn');
  const urlResult = document.getElementById('urlResult');
  const copyBtn = document.getElementById('copyBtn');
  const selectedTarget = document.getElementById(
    'selectedTarget'
  ) as HTMLSelectElement;

  mapAllowedUrlsToOptions(allowedUrls, selectedTarget);

  actionBtn.addEventListener('click', () => {
    const selectedTargetValue = selectedTarget.value;
    const body = JSON.stringify({ selectedTargetValue });
    fetch(`${environment.apiUrl}/shorturl`, {
      method: 'POST',
      body,
      headers: {
        'content-type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then(({ result }) => {
        urlResult.firstChild.remove();
        urlResult.insertAdjacentHTML(
          'afterbegin',
          `<span>${result.url}</span>`
        );
        urlResult.classList.remove('hidden', 'error');
      })
      .catch((error) => {
        console.error(error);
        urlResult.textContent = 'Something went wrong. Please try again later.';
        urlResult.classList.remove('hidden');
        urlResult.classList.add('error');
      });
  });

  copyBtn.addEventListener('click', () => {
    const urlText = urlResult.querySelector('span').textContent;
    window.navigator.clipboard.writeText(urlText);
    copyBtn.textContent = 'Copied!';
    setTimeout(() => {
      copyBtn.textContent = 'Copy';
    }, 2000);
  });
};
