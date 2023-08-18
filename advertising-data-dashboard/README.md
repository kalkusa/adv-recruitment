# Advertising Data Dashboard

This repository contains the implementation of the Adverity coding challenge. It's a web application that parses CSV data and visualizes it in the form of interactive charts.

## Technologies Used

- **React**: For building user interface.
- **TypeScript**: For type safety.
- **D3**: For data visualizations in web browsers.
- **MUI, Styled Components**: For clean and beautiful UI and components with readable CSS.
- **Lodash**: For easy data processing.
- **Jest, React Testing Library**: For unit testing.

## Project Structure

- **public**: Static assets like CSV data files, favicon, and other public assets.
- **src**: 
  - **components**: Various React components like Chart, Filter, and Info.
  - **contexts**: Contains React context providers for managing global state.
  - **hooks**: Custom hooks for functionalities like fetching data, filtering, and D3 chart rendering.
  - **pages**: The main HomePage component.
  - **utils**: Utility functions for data parsing and calculations.
  - **types**: TypeScript type definitions.

## Running the App Locally

Recommended node and npm versions - node: v18.17.1, npm: 7.23.0

1. **Install npm packages**:
    ```
    npm install
    ```

2. **Start the development server**
    ```
    npm start
    ```
2. **To run unit tests**
    ```
    npm test
    ```