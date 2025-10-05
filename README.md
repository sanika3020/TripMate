# TripMate – Smart Travel Planner

TripMate is an integrated travel planning solution that enables users to search for hotels, flights, and weather conditions from a unified interface. It combines real-time API data with a responsive, user-friendly interface to provide a seamless trip planning experience.

---

## ✨ Features

- **Hotel Search with Date Selection**  
  Fetches hotel details using the TravelPayouts / Hotellook API with pricing, location, and ratings.

- **Flight Search by Route (IATA-Based)**  
  Retrieves real-time flight data through the AviationStack API with airline filtering and formatted flight cards.

- **Live Weather Forecasting**  
  Displays current weather conditions for the selected city using the OpenWeather API.

- **Responsive Tab-Based Interface**  
  Built with Bootstrap for clean navigation between Hotels, Flights, and Weather sections.

- **Dynamic Sorting Options**  
  Allows users to sort results by price, rating, or duration.

- **Fallback Handling & Error Validation**  
  Ensures graceful responses when API results are unavailable.

---

## 🛠️ Tech Stack

| Layer      | Technologies |
|------------|--------------|
| Frontend   | HTML, CSS, JavaScript, Bootstrap |
| Backend    | Node.js, Express |

---

## 🚀 Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/TripMate.git
   cd TripMate
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```


3. **Start the server:**
   ```bash
   node server.js
   ```

4. **Open in browser:**
   ```
   http://localhost:3000
   ```

---

## 📌 Folder Structure

```
TripMate/
│── index.html         # Home page
│── planner.html       # Main search interface
│── about.html
│── contact.html
│── style.css
│── script.js
│── server.js          # Node.js backend with API routing
│── airports.json      # Airport database for IATA auto-complete
│── package.json
```

---

---

