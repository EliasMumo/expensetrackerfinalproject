// script.js

const API_URL = "http://localhost:3000"; // Replace with your backend server URL

// Elements
const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");
const expenseForm = document.getElementById("expenseForm");
const expensesList = document.getElementById("expensesList");
const statisticsSection = document.getElementById("statisticsSection");
const toggleModeBtn = document.getElementById("toggleMode");
const greetingMessage = document.getElementById("greetingMessage");
const chartContainer = document.getElementById("chartContainer");

// Light/Dark Mode
let isDarkMode = false;
function toggleMode() {
  isDarkMode = !isDarkMode;
  document.body.classList.toggle("dark-mode", isDarkMode);
  localStorage.setItem("darkMode", isDarkMode ? "enabled" : "disabled");
}

toggleModeBtn.addEventListener("click", toggleMode);
document.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("darkMode") === "enabled") toggleMode();
});

// User Registration
async function registerUser(event) {
  event.preventDefault();
  const email = registerForm.email.value;
  const password = registerForm.password.value;

  const response = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  const data = await response.json();
  alert(data.message);
}

// User Login
async function loginUser(event) {
  event.preventDefault();
  const email = loginForm.email.value;
  const password = loginForm.password.value;

  const response = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  const data = await response.json();

  if (data.token) {
    localStorage.setItem("token", data.token);
    displayGreeting(data.greeting);
    loadExpenses();
    loadStatistics();
  } else {
    alert("Login failed. Check your credentials.");
  }
}

// Display Greeting Message
function displayGreeting(message) {
  greetingMessage.textContent = message;
}

// Load User Expenses
async function loadExpenses() {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}/expenses`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const expenses = await response.json();

  expensesList.innerHTML = "";
  expenses.forEach((expense) => {
    const li = document.createElement("li");
    li.textContent = `${expense.date}: $${expense.amount} - ${expense.description}`;
    expensesList.appendChild(li);
  });
}

// Add New Expense
async function addExpense(event) {
  event.preventDefault();
  const description = expenseForm.description.value;
  const amount = expenseForm.amount.value;
  const date = expenseForm.date.value;

  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}/expenses`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ description, amount, date }),
  });
  const result = await response.json();
  alert(result.message);
  loadExpenses();
  loadStatistics();
}

// Load Spending Statistics
async function loadStatistics() {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}/statistics`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const statistics = await response.json();

  renderChart(statistics.monthlyTotals);
}

// Render Chart
function renderChart(data) {
  chartContainer.innerHTML = "";
  const ctx = document.createElement("canvas");
  chartContainer.appendChild(ctx);

  new Chart(ctx, {
    type: "pie",
    data: {
      labels: data.map((item) => item.category),
      datasets: [
        {
          data: data.map((item) => item.total),
          backgroundColor: ["#4CAF50", "#FF9800", "#2196F3", "#FF5722", "#607D8B"],
        },
      ],
    },
  });
}

// Event Listeners
registerForm.addEventListener("submit", registerUser);
loginForm.addEventListener("submit", loginUser);
expenseForm.addEventListener("submit", addExpense);

document.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("token")) {
    loadExpenses();
    loadStatistics();
  }
});

