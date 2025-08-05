# Hiperdia – Blood Pressure and Health Monitoring 👨‍⚕️ 🩺

* Project still in development :construction:

* Deploy: https://hiperdia.vercel.app/ 📈

**Hiperdia** is a web application that allows you to monitor blood pressure readings in an organized and visual way, generating PDF reports, storing readings in a database, and displaying measurement progress charts.

## Table of Contents
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [How to Use](#how-to-use)
- [PDF Export](#pdf-export)
- [Save Measurements](#save-measurements)
- [Contributing](#contributing)

## Features
- Add blood pressure readings.
- Edit and delete existing readings.
- Display readings in an organized table.
- Generate an interactive chart to visualize progress.
- Export readings and chart as a PDF report.
- Save readings to a database via an API.

## Technologies Used
- **Frontend**: React.js, Tailwind CSS  
- **Backend**: Node.js, Express.js, Sequelize, MySQL  
- **Libraries**:
  - `react-icons` for icons.
  - `chart.js` and `react-chartjs-2` for interactive charts.
  - `html2canvas` and `jspdf` for PDF generation.
  - `axios` for API HTTP requests.

# Demo ⏯️

Table and Measurement Form

<div align="center">
    <img alt="presentation gif" src="/assets/tabela.png"/>
</div>

<br>

Chart

<div align="center">
    <img alt="presentation gif" src="/assets/grafico.png"/>
</div>

<br>

## Installation

### Prerequisites
- Node.js (version 16 or higher)
- MySQL for the database
- Git

### Installation Steps
1. Clone the repository:
    ```bash
    git clone https://github.com/seu-usuario/hiperdia.git
    ```

2. Navigate to the project directory:
    ```bash
    cd hiperdia
    ```

3. Install dependencies:
    ```bash
    npm install
    ```

4. Set up environment variables:
    - Create a `.env` file in the root directory and add the variables for database and API connection.

5. Start the development server:
    ```bash
    npm run dev
    ```

## How to Use

1. Open the app in your browser.
2. Fill in the user details form in the **User Data** section.
3. Add blood pressure readings in the **Measurements** section.
4. View the data in the table and the automatically generated chart.
5. Measurements are saved locally in the browser (local storage) and can be exported or sent to the database.

## PDF Export

- The PDF export feature captures the header, measurements table, and chart to generate a downloadable PDF file.
- To export the PDF, click the **Export PDF** button after adding readings.

## Save Measurements

- The **Save Data** button sends the user and reading data to the backend API, storing it in the database.
- Make sure the API is running properly before saving data.

## Contributing
Feel free to open issues and submit pull requests. Please follow semantic commit best practices and keep the code style consistent.

### Commit Rules
- Use semantic commit messages (e.g., `feat:`, `fix:`, `chore:`).
- Keep commits clear and descriptive.

---

Made with ❤️ by [Matheus](https://github.com/Mathluiz23)
