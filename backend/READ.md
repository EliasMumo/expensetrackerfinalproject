Expense Tracker Application
A web-based application for tracking expenses, creating user accounts, logging in with email and password, and viewing monthly expense statistics with data visualizations. The app features both light and dark modes and provides financial advice notifications via email.

Features
User registration and authentication
Expense entry, tracking, and visualization with charts and graphs
Monthly spending statistics and data insights
Light and dark mode toggle for enhanced user experience
Responsive design inspired by Spotify’s styling
Financial advice email notifications upon login
Technologies Used
Frontend: HTML, CSS, JavaScript
Backend: Node.js, Express
Database: MySQL
Charting: JavaScript libraries for data visualization
Email Notifications: NodeMailer
Project Setup
Prerequisites
Node.js and npm: Download and install Node.js
MySQL: Download and install MySQL
Installation
Clone the repository:

bash
Copy code
git clone https://github.com/yourusername/expense-tracker.git
cd expense-tracker
Set up the MySQL Database:

Open MySQL and run the commands in schema.sql to create the database and tables:

bash
Copy code
mysql -u your_username -p < backend/schema.sql
Configure Environment Variables:

In the backend folder, create a .env file and add the following:

plaintext
Copy code
DB_HOST=localhost
DB_USER=your_mysql_username
DB_PASSWORD=your_mysql_password
DB_NAME=expense_tracker
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_email_password
Install Backend Dependencies:

bash
Copy code
cd backend
npm install
Running the Application
Start the Backend Server:

bash
Copy code
cd backend
node server.js
This starts the backend server on port 3000 (or your configured port).

Open the Frontend:

Open frontend/index.html in a browser to access the expense tracker application.
Usage
Register and Login:

Go to the registration page, enter your email and password, and create an account.
After registering, log in to access your dashboard.
Adding Expenses:

Enter expense details (description, amount, and date) in the form and submit. Your expense will be saved to the database.
Viewing Statistics:

The app provides a visual overview of monthly spending through charts and graphs, showing how money is allocated across categories.
Toggle Light/Dark Mode:

Use the toggle button to switch between light and dark modes.
Financial Advice:

Receive financial advice upon login, sent to your registered email address.
File Structure
plaintext
Copy code
expense-tracker/
├── frontend/
│   ├── index.html            # Main HTML file for the frontend
│   ├── style.css             # CSS styling
│   ├── script.js             # JavaScript for frontend logic
├── backend/
│   ├── server.js             # Express server with API endpoints
│   ├── db-config.js          # Database connection setup
│   ├── schema.sql            # SQL script to set up the database
│   ├── .env                  # Environment variables (not committed)
├── README.md                 # Project instructions
Dependencies
Frontend: Plain HTML, CSS, and JavaScript
Backend: Node.js, Express, MySQL
Other Packages:
bcryptjs: For password hashing
jsonwebtoken: For handling authentication tokens
nodemailer: For sending email notifications
License
This project is licensed under the MIT License. See the LICENSE file for details.