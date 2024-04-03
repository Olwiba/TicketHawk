# Ticket Hawk 🎫

Ticket Hawk is a program that automates the process of searching for a target value on multiple browser windows and refreshing the pages until the value is found. It's perfect for snagging those hard-to-get tickets or monitoring websites for specific content.

## Getting Started 🚀

1. Install Node.js on your machine.
2. Clone this repository.
3. Run `npm install` or `yarn install` to install the required dependencies.
4. Run the program using `npm start` or `yarn start`.

## How It Works 🎯

Ticket Hawk uses Selenium WebDriver to:

1. Prompt you for the target URL, number of browser windows, refresh timeout, and target value.
2. Initialize the browser windows and navigate them to the target URL.
3. Continuously check each window for the target value.
4. Refresh the page if the target value is found, or bring the window into focus if not found.
5. Continue running until the target value is found or the user interrupts the process. 
6. Once Ticket Hawk finds the target value, it will bring the window into focus, allowing you to proceed with purchasing your tickets or taking any other desired action.

## Configuration 🛠️

You can configure the following parameters:

- `targetURL`: The website URL to monitor.
- `spawnTargets`: The number of browser windows to spawn.
- `refreshTimeout`: The maximum timeout (in seconds) for refreshing the page.
- `targetValue`: The value to search for on the website.

## Error Handling 🚨

Ticket Hawk includes robust error handling mechanisms:

- Retries failed operations a specified number of times with a configurable delay.
- Handles graceful shutdown when the user interrupts the program.
- Logs any errors that occur during the execution.

## Contributing 🤝

Contributions are what make the open-source community such an amazing place to learn, inspire, and create.
Any contributions you make are greatly appreciated.

1. Fork the project.
2. Create your feature branch `git checkout -b feature/AmazingFeature`.
3. Commit your changes `git commit -m 'Add some AmazingFeature'`.
4. Push to the branch `git push origin feature/AmazingFeature`.
5. Open a pull request.

## License 📄

Distributed under the MIT License. See LICENSE for more information.

## Contact 📬

Twitter - [@olwiba](https://twitter.com/Olwiba)