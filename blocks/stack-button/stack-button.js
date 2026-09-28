export default function decorate(block) {
  // Convert rows into an array
  const rows = [...block.children];
  
  // Variables to hold our button configuration
  let buttonUrl = '#';
  let primaryText = '';
  let secondaryText = '';

  // Loop through each row to extract data based on your text labels
  rows.forEach((row) => {
    const label = row.children[0]?.textContent?.trim().toLowerCase();
    const valueCell = row.children[1];

    if (label === 'url') {
      const linkElement = valueCell.querySelector('a');
      buttonUrl = linkElement ? linkElement.href : valueCell.textContent?.trim() || '#';
    } else if (label === 'primarytext') {
      primaryText = valueCell.textContent?.trim() || '';
    } else if (label === 'secondarytext') {
      secondaryText = valueCell.textContent?.trim() || '';
    }
  });

  // Rebuild the clean, semantic markup using the extracted values
  block.innerHTML = `
    <div class="stack-button-card">
      <a href="${buttonUrl}" class="stack-pill-button">
        <span class="text-top">${primaryText}</span>
        ${secondaryText ? `<span class="text-bottom">\${secondaryText}</span>` : ''}
      </a>
    </div>
  `;
}