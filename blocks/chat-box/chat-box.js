export default function decorate(block) {
  const rows = [...block.children];

  let headerText = 'Default Header Text';
  let inputPlaceholderText = 'Default';
  let buttonIcon = '';

  rows.forEach(row => {
    // Normalised matching handles hyphens from "header-text", "input-placeholder-text", "button-icon"
    const label = row.children[0]?.textContent?.trim().toLowerCase().replace(/-/g, '');
    const valueCell = row.children[1];

    if (!valueCell) return;

    if (label === 'headertext') {
      headerText = valueCell.textContent?.trim() || 'Default Header Text';
    } else if (label === 'inputplaceholdertext') {
      inputPlaceholderText = valueCell.textContent?.trim() || 'Default';
    } else if (label === 'buttonicon') {
      const img = valueCell.querySelector('img');
      if (img) {
        img.removeAttribute('loading');
        buttonIcon = img.outerHTML;
      }
    }
  });

  // Re-build template framework matching the Aware Super mock layout structure exactly
  block.innerHTML = `
    <div class="chat-box-card">
      <div class="chat-header">
        <h2>${headerText}</h2>
      </div>
      
      <div class="chat-body">
        <!-- Mock Assistant Welcome Text -->
        <div class="chat-bubble incoming">
          <p>Hi, I'm Aware's AI Assistant. Whether you're exploring super, planning for retirement, or simply looking for information, I'm here to provide clear, easy-to-understand guidance so you can better understand your options and take the right next step.</p>
        </div>
        
        <!-- Mock Outgoing Pill Chip Text Link -->
        <div class="chat-bubble outgoing">
          <span class="pill-chip">link me to retirement info</span>
        </div>
        
        <!-- Mock Assistant Action Processing Line -->
        <div class="chat-bubble incoming">
          <p>Alright, I'm just pulling up the details on that now.</p>
        </div>
      </div>
      
      <div class="chat-footer-input">
        <input type="text" placeholder="${inputPlaceholderText}" aria-label="Chat input field">
        <div class="chat-send-icon-wrapper">
          ${buttonIcon}
        </div>
      </div>
    </div>
  `;
}
