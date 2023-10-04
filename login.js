const { Builder, By, Key, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

// Set up the Chrome options (you can customize these)
const chromeOptions = new chrome.Options();
chromeOptions.addArguments('--start-maximized'); // Maximize the browser window

// Replace 'example.com' and the input field IDs with the actual website and element IDs
const websiteUrl = 'https://app.jubelio.com/login';
const usernameFieldName = 'email';
const passwordFieldName = 'password';

// Your login credentials
const username = 'qa.rakamin.jubelio@gmail.com';
const password = 'Jubelio123!';

// Create a WebDriver instance with Chrome
const driver = new Builder()
  .forBrowser('chrome')
  .setChromeOptions(chromeOptions)
  .build();

async function automateLogin() {
  try {
    // Navigate to the login page
    await driver.get(websiteUrl);

    // Find the username and password fields, and the login button
    const usernameField = await driver.findElement(By.name(usernameFieldName));
    const passwordField = await driver.findElement(By.name(passwordFieldName));
    const loginButton = await driver.findElement(By.xpath('//*[@id="root"]/div/div/div[1]/div/div[2]/div/form/button'));

    // Input your username and password
    await usernameField.sendKeys(username);
    await passwordField.sendKeys(password);

    // Click the login button
    await loginButton.click();

    // Wait for the login to complete
    await driver.wait(until.titleIs('Jubelio - Dashboard'), 5000); // Change 'Dashboard Page' to a title that appears after login


  } catch (error) {
    console.error('An error occurred:', error);
  } finally {
    // Close the browser
    await driver.quit();
  }
}

automateLogin();
