export default function decorate(block) {
  // Extract content out of the table cells
  const textContainer = block.children[0]?.children[0];
  const linkContainer = block.children[0]?.children[1];
  
  const linkElement = linkContainer?.querySelector('a');

  if (linkElement && textContainer) {
    const linkUrl = linkElement.href;
    
    // Parse out our text blocks (AEM natively leaves <p> or <br> elements here)
    const topText = textContainer.querySelector('strong')?.textContent || '';
    // Find un-bolded text or secondary lines
    const bottomText = textContainer.textContent.replace(topText, '').trim();

    // Rebuild clean, semantic HTML structure inside the block wrapper
    block.innerHTML = `
      <div class="stack-button-card">
        <a href="${linkUrl}" class="stack-pill-button">
          <span class="text-top">${topText}</span>
          <span class="text-bottom">${bottomText}</span>
        </a>
      </div>
    `;
  }
}