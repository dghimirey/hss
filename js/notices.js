
const sheetUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQIcYH4fXzkgszrL1ZtBhCnHjPxxYeVcHkz6GVY0NsfNbRPuLK4LyA1oe4r0Gn_GelAEzgVjp6FbXQm/pub?output=csv';

fetch(sheetUrl)
  .then(response => response.text())
  .then(csv => {
    const rows = csv.trim().split('\n');
    const headers = rows[0].split(',');
    const dataRows = rows.slice(1);

    // Show total notice count
    document.getElementById('notice-count').innerText = dataRows.length;

    const container = document.getElementById('latest-notice');
    container.innerHTML = '';

    const topNotices = dataRows.slice(0, 3);

    topNotices.forEach((row, index) => {
      const [title, date, content] = row.split(',');

      const html = `
        <div class="notice-box">
          <div class="notice-title">${index + 1}. ${title}</div>
          <div class="notice-date">${date}</div>
          <div class="notice-content">${content}</div>
        </div>
      `;

      container.innerHTML += html;
    });
  })
  .catch(err => {
    console.error('CSV fetch error:', err);
    document.getElementById('latest-notice').innerText = ' Could not load notices.';
  });
