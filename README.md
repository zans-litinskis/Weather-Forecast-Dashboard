# Weather Forecast Dashboard

![image](https://github.com/webgod0123/Weather-Forecast-Dashboard/assets/91973281/b7a59067-4a27-44c8-a650-3ed157030e15)


This project is a weather dashboard application built using React, TypeScript, Material-UI, Formik, Yup, and Highcharts. It fetches weather data from the Open Meteo API for a given location (latitude and longitude) and date, displaying temperature, precipitation, wind speed, and other relevant information.

## Features

- Fetch and display weather data from the Open Meteo API
- User input for location (latitude and longitude) and date to retrieve specific weather data
- Visually appealing and organized UI using Material-UI components
- Interactive chart with zoom functionality using Highcharts
- Form validation using Formik and Yup

## Technologies Used

- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Material-UI](https://mui.com/)
- [Formik](https://formik.org/)
- [Yup](https://github.com/jquense/yup)
- [Highcharts](https://www.highcharts.com/)

## Prerequisites

Make sure you have the following installed on your machine:

- [Node.js](https://nodejs.org/en/download/) (version 18 or higher)
- [npm](https://www.npmjs.com/get-npm) (comes with Node.js) or [Yarn](https://yarnpkg.com/)

## Getting Started

Follow these steps to set up and run the project:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/zans-litinskis/Weather-Forecast-Dashboard.git
   cd weather-dashboard
   ```
2. **Install dependencies:**
    
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Run the development server:**

   ```bash
   npm start
   # or
   yarn start
   ```

4. **Open the application:**

   ```bash
   Open your browser and go to http://localhost:3000 to see the application in action.
   ```

## API Usage
This project uses the Open Meteo API to fetch weather data. The relevant API calls are made using the fetchWeatherApi function in the custom hook useWeatherData.

## Formik and Yup
The project uses Formik for form management and Yup for form validation. You can find the form implementation in the relevant component files.

## Material-UI
Material-UI is used for UI components and styling. You can find the implementation of Material-UI components in the relevant component files.

## Highcharts
Highcharts is used for displaying the weather data in a chart. The chart configuration and implementation can be found in the WeatherChart component.
