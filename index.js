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
        console.log(`[Main] Initializing ${numWindows} browser windows...`);
        for (let i = 0; i < numWindows; i++) {
            const driver = await new Builder()
                .forBrowser('chrome')
                .setChromeOptions(chromeOptions)
                .build();
            windows.push(driver);
            await driver.get(targetURL);
            await driver.wait(until.elementLocated(By.xpath('html')), 8000);
            console.log(`[Window ${i + 1}] Initialized and navigated to ${targetURL}`);
        }

        // Function to check for the target value and handle refresh or focus
        const checkPage = async (driver, index) => {
            try {
                if (hasFound) {
                    console.log(`[Window ${index + 1}] Target value found in another window, closing this window...`);
                    await driver.quit();
                }

                await driver.navigate().refresh();
                await driver.wait(until.elementLocated(By.xpath(`//*[contains(text(), "${targetValue}")]`)), 5000);
                const calculatedTimeout = Math.floor(Math.random() * timeout) + 1;
                console.log(`[Window ${index + 1}] Target value found, refreshing in ${calculatedTimeout / 1000} seconds...`);
                await driver.sleep(calculatedTimeout);
                await checkPage(driver, index);
            } catch (error) {
                console.log(`[Window ${index + 1}] Target value not found, bringing it into focus...`);
                await driver.switchTo().newWindow('tab');
                hasFound = true;
            }
        };

        // Start checking each window
        console.log(`[Main] Starting to check each window for the target value...`);
        windows.forEach((driver, index) => {
            checkPage(driver, index);
        });

    } catch (error) {
        console.error(`[Main] An error occurred: ${error.message}`);
    }
};

// Shutdown
const shutdown = () => {
    console.log('Exiting...');
    console.log('Enjoy your tickets! 🌴')
    process.exit(0);
}

process.on('SIGINT', shutdown);

main();