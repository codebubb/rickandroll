import { environment } from './environments/environment';

window.onload = () => {
  const actionBtn = document.getElementById('actionBtn');
  const urlResult = document.getElementById('urlResult');
  const copyBtn = document.getElementById('copyBtn');

  actionBtn.addEventListener('click', () => {
    fetch(`${environment.apiUrl}/shorturl`, {
      method: 'POST',
    })
      .then((response) => response.json())
      .then(({ result }) => {
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
