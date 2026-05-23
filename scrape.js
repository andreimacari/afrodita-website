const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  page.on('response', async response => {
    if (response.url().includes('book_staff')) {
      console.log('--- API INTERCEPTED ---');
      try {
        const json = await response.json();
        console.log(JSON.stringify(json, null, 2));
      } catch(e){
        console.error("Error parsing JSON:", e);
      }
    }
  });

  await page.goto('https://n101864.alteg.io/company/114126/personal/select-master?o=');
  await page.waitForTimeout(8000);
  
  const html = await page.content();
  const fs = require('fs');
  fs.writeFileSync('page.html', html);
  
  await browser.close();
})();
