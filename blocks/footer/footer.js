import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';

/**
 * loads and decorates the footer
 * @param {Element} block The footer block element
 */
export default async function decorate(block) {
  const footerMeta = getMetadata('footer');
  const footerPath = footerMeta
    ? new URL(footerMeta, window.location).pathname
    : '/footer';

  const fragment = await loadFragment(footerPath);

  block.textContent = '';

  const footer = document.createElement('div');

  while (fragment.firstElementChild) {
    footer.append(fragment.firstElementChild);
  }

  block.append(footer);

  const paragraphs = footer.querySelectorAll('p');
  const logo = footer.querySelector('picture, img');

  if (paragraphs.length >= 2 && logo) {
    const disclaimer = paragraphs[0];
    const cookieSettings = paragraphs[1];

    const row = document.createElement('div');
    row.classList.add('footer-row');

    row.append(cookieSettings);
    row.append(logo.closest('picture') || logo);

    footer.innerHTML = '';
    footer.append(disclaimer);
    footer.append(row);
  }
}