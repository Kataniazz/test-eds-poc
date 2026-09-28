export default function decorate(block) {
  const rows = [...block.children];
  
  let buttonUrl = '#';
  let primaryText = '';
  let secondaryText = '';
  let iconHtml = '';

  rows.forEach((row) => {
    const label = row.children[0]?.textContent?.trim().toLowerCase();
    const valueCell = row.children[1];

    if (!valueCell) return;

    if (label === 'url') {
      const linkElement = valueCell.querySelector('a');
      buttonUrl = linkElement ? linkElement.href : valueCell.textContent?.trim() || '#';
    } else if (label === 'primarytext') {
      primaryText = valueCell.textContent?.trim() || '';
    } else if (label === 'secondarytext') {
      secondaryText = valueCell.textContent?.trim() || '';
    } else if (label === 'icon') {
      const img = valueCell.querySelector('img');
      if (img) {
        // Optimize image loading since it's a structural component icon
        img.removeAttribute('loading');
        iconHtml = img.outerHTML;
      }
    }
  });

  block.innerHTML = `
    <div class="stack-button-card">
      <a href="${buttonUrl}" class="stack-pill-button ${iconHtml ? 'has-icon' : ''}">
        <div class="text-content">
          <span class="text-top">${primaryText}</span>
          ${secondaryText ? `<span class="text-bottom">\${secondaryText}</span>` : ''}
        </div>
        ${iconHtml ? `<div class="button-icon-wrapper">\${iconHtml}</div>` : ''}
      </a>
    </div>
  `;
}