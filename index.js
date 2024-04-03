const {Builder, By, until} = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

let chromeOptions = new chrome.Options();
chromeOptions.addArguments('--ignore-certificate-errors');

const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

// ASCII art to be displayed
console.log(`🎫🎫🎫🎫🎫🎫🎫🎫🎫🎫🎫
Welcome to Ticket Hawk!
🎫🎫🎫🎫🎫🎫🎫🎫🎫🎫🎫`);

// Flags
let hasFound = false;

// Function to ask questions in a promise-based way
const askQuestion = (query) => new Promise(resolve => readline.question(query, resolve));

// Main async function to handle the logic
const main = async () => {
    try {
        // Getting input from the user
        const targetURL = await askQuestion("Enter the target URL: ");
        const spawnTargets = await askQuestion("How many spawn targets? ");
        const refreshTimeout = await askQuestion("Enter refresh timeout in seconds: ");
        const targetValue = await askQuestion("Enter the target value to search for: ");

        // Closing the readline interface
        readline.close();

        // Parsing input values
        const numWindows = parseInt(spawnTargets, 10);
        const timeout = parseInt(refreshTimeout, 10) * 1000; // Convert to milliseconds

        // Array to hold references to all windows
        const windows = [];

        // Initialize browser windows
        for (let i = 0; i < numWindows; i++) {
            const driver = await new Builder()
                .forBrowser('chrome')
                .setChromeOptions(chromeOptions)
                .build();
            windows.push(driver);
            await driver.get(targetURL);
            await driver.wait(until.elementLocated(By.xpath('html')), 8000);
        }

        // Function to check for the target value and handle refresh or focus
        const checkPage = async (driver, index) => {
            try {
                if (hasFound) {
                    console.log('Target value found in another window, closing this window...');
                    await driver.quit();
                }

                await driver.wait(until.elementLocated(By.xpath(`//*[contains(text(), "${targetValue}")]`)), 5000);
                console.log(`Target value found in window ${index + 1}, refreshing in ${timeout / 1000} seconds...`);
                await driver.sleep(timeout);
                await driver.navigate().refresh();
                checkPage(driver, index); // Recursively check the page
            } catch (error) {
                console.log(`Target value not found in window ${index + 1}, bringing it into focus...`);
                await driver.switchTo().newWindow('tab');

                // Set the flag so that the other can stop
                hasFound = true;
            }
        };

        // Start checking each window
        windows.forEach((driver, index) => {
            checkPage(driver, index);
        });

    } catch (error) {
        console.error("An error occurred:", error);
    }
};

main();