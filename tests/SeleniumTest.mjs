// tests/SeleniumTest.mjs
import { Builder, By, until } from 'selenium-webdriver';

const SELENIUM_HOST = process.env.SELENIUM_HOST || 'http://localhost:4444/wd/hub';
const TEST_URL = process.env.TEST_BASE_URL || 'http://localhost:3000';

(async function runTest() {
  let driver = await new Builder()
    .usingServer(SELENIUM_HOST)
    .forBrowser('chrome')
    .build();

  try {
    console.log('Navigating to', TEST_URL);
    await driver.get(TEST_URL);

    // Wait for some element on the homepage (adjust as needed)
    const heading = await driver.wait(
      until.elementLocated(By.css('h1')), 10000
    );

    const text = await heading.getText();
    console.log('Found heading text:', text);

    // Sample assertion
    if (!text || text.length === 0) {
      throw new Error('Heading text is empty');
    }

    console.log('✅ Test passed');

  } catch (err) {
    console.error('❌ Test failed:', err);
    process.exit(1);
  } finally {
    await driver.quit();
  }
})();
