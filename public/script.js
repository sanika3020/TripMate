


// /// ==== API Keys ====
// const WEATHER_API_KEY = "8ea94ddbe9c5a0e1a381101d0833c954"; 
// const UNSPLASH_ACCESS_KEY = "2wl4-XSv5Y7m7RSn6OXQoKKNEzclKk0AUIuZXw7ahrQ"; // Replace with your Unsplash API key

// // ==== Weather API ====
// async function getWeather() {
//   const city = document.getElementById("cityInput").value;
//   const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${WEATHER_API_KEY}&units=metric`;

//   try {
//     const res = await fetch(url);
//     const data = await res.json();

//     displayResult({
//       type: "weather",
//       title: `Weather in ${city}`,
//       details: `🌡 ${data.main.temp}°C | ${data.weather[0].description}`,
//     });
//   } catch (err) {
//     console.error("Weather API Error:", err);
//   }
// }

// // ==== Unsplash Image Fetch ====
// async function fetchHotelImage(query) {
//   try {
//     let res = await fetch(
//       `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=1&client_id=${UNSPLASH_ACCESS_KEY}`
//     );
//     let data = await res.json();

//     if (data.results && data.results.length > 0) {
//       return data.results[0].urls.regular; // Use Unsplash image
//     } else {
//       return "https://via.placeholder.com/400x250?text=Hotel+Image"; // fallback
//     }
//   } catch (error) {
//     console.error("Unsplash error:", error);
//     return "https://via.placeholder.com/400x250?text=Hotel+Image"; // fallback
//   }
// }

// // ==== Hotels API ====
// async function getHotels() {
//   const city = document.getElementById("cityInput").value;
//   const resultsDiv = document.getElementById("resultsContainer");
//   resultsDiv.innerHTML = "<p>Loading hotels...</p>";

//   // Dates
//   function formatDate(date) {
//     return date.toISOString().split("T")[0];
//   }
//   const today = new Date();
//   const tomorrow = new Date();
//   tomorrow.setDate(today.getDate() + 1);

//   const checkIn = formatDate(today);
//   const checkOut = formatDate(tomorrow);

//   try {
//     const res = await fetch(
//       `http://localhost:3000/api/hotels?city=${city}&check_in=${checkIn}&check_out=${checkOut}`
//     );
   
//     const hotelData = await res.json();

//     resultsDiv.innerHTML = "";

//     if (!hotelData || hotelData.length === 0) {
//       resultsDiv.innerHTML = "<p>No hotels found for this city.</p>";
//       return;
      

//     }
//      console.log(hotelData[0]);


//     for (const hotel of hotelData) {
//       // ✅ Use real TravelPayouts hotel image
// let hotelImage = await fetchHotelImage(`${hotel.hotelName} ${hotel.location.name}`);

//       displayResult({
//         type: "hotel",
//         title: hotel.hotelName,
//         details: `
//           <span class="price">💲${hotel.priceFrom}</span> | 
//           <span class="stars">⭐${hotel.stars}</span> | 
//           <span class="location">📍 ${hotel.location.name}</span>
//         `,
//         image: hotelImage,
//         url: `https://www.hotels.com/ho${hotel.hotelId}/`
//       });
//     }

//   } catch (err) {
//     console.error("Hotels API Error:", err);
//     resultsDiv.innerHTML = "<p>Error fetching hotels.</p>";
//   }
// }

// // ==== Flights API (AviationStack) ====
// async function getFlights() {
//   const originInput = document.getElementById("originInput").value;
//   const destinationInput = document.getElementById("destinationInput").value;

//   // Extract IATA code from input (inside parentheses)
//   const origin = originInput.match(/\(([^)]+)\)/)?.[1];
//   const destination = destinationInput.match(/\(([^)]+)\)/)?.[1];

//   if (!origin || !destination) {
//     alert("Please select valid airports from the list.");
//     return;
//   }

//   const resultsDiv = document.getElementById("resultsContainer");
//   resultsDiv.innerHTML = "<p>Searching flights...</p>";

//   try {
//     const res = await fetch(`/api/flights?origin=${origin}&destination=${destination}`);
//     const flights = await res.json();

//     resultsDiv.innerHTML = "";

//     if (!flights || flights.length === 0) {
//       resultsDiv.innerHTML = "<p>No flights found.</p>";
//       return;
//     }

// flights.slice(0, 6).forEach((flight) => {
//   const depTime = flight.departure?.scheduled ? new Date(flight.departure.scheduled) : null;
//   const arrTime = flight.arrival?.scheduled ? new Date(flight.arrival.scheduled) : null;

//   let duration = "N/A";
//   if (depTime && arrTime) {
//     const diffMs = arrTime - depTime;
//     const hours = Math.floor(diffMs / (1000 * 60 * 60));
//     const mins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
//     duration = `${hours}h ${mins}m`;
//   }

//   const depDate = depTime ? depTime.toISOString().split("T")[0] : "";
//   const bookUrl = `https://www.makemytrip.com/flights?from=${flight.departure?.iata}&to=${flight.arrival?.iata}&tripType=O&depDate=${depDate}`;

//   // Flight card without image
//   displayResult({
//     type: "flight",
//     title: `${flight.airline?.name || "Unknown Airline"} ${flight.flight?.iata || ""}`,
//     details: `
//       <div class="flight-details">
//         <span><strong>${flight.departure?.iata || "N/A"}</strong> → <strong>${flight.arrival?.iata || "N/A"}</strong></span><br>
//         <span>🕒 ${depTime ? depTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "N/A"} ⏱ ${duration} 🛬 ${arrTime ? arrTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "N/A"}</span><br>
//         <span class="status-badge ${flight.flight_status?.toLowerCase() || ""}">${flight.flight_status?.toUpperCase() || "N/A"}</span>
//       </div>
//     `,
//     url: bookUrl  // Book Now button
//   });
// });



// // ==== Airport Data Loader for Autocomplete ====
// let airports = [];

// async function loadAirports() {
//   try {
//     const res = await fetch("airports.json");
//     airports = await res.json();

//     // Fill datalist with airports
//     const datalist = document.getElementById("airportsList");
//     airports.forEach(ap => {
//       const option = document.createElement("option");
//       option.value = `${ap.city} (${ap.iata})`;
//       datalist.appendChild(option);
//     });
//   } catch (err) {
//     console.error("Failed to load airports:", err);
//   }
// }

// // Call when page loads
// window.addEventListener("DOMContentLoaded", loadAirports);

// // // ==== Flights API (AviationStack) ====
// // async function getFlights() {
// //   // ... the updated code I gave you ...
// // }

// // ==== Display Results (Bootstrap Cards) ====
// function displayResult(item) {
//   const container = document.getElementById("resultsContainer");

//   const col = document.createElement("div");
//   col.className = "col-md-4 col-sm-6";

//   col.innerHTML = `
//     <div class="card h-100 shadow-sm">
//       ${
//         item.image
//           ? `<img src="${item.image}" class="card-img-top" alt="${item.title}" 
//                 onerror="this.src='https://via.placeholder.com/400x250?text=No+Image'"/>`
//           : ""
//       }
//       <div class="card-body d-flex flex-column">
//         <h5 class="card-title">${item.title}</h5>
//         <p class="card-text">${item.details}</p>
//         ${
//           item.url
//             ? `<a href="${item.url}" target="_blank" class="btn btn-primary mt-auto">Book Now</a>`
//             : ""
//         }
//       </div>
//     </div>
//   `;

//   container.appendChild(col);
// }

// // ==== Sorting ====
// function sortResults() {
//   const option = document.getElementById("sortOptions").value;
//   const container = document.getElementById("resultsContainer");
//   const cards = Array.from(container.children);

//   cards.sort((a, b) => {
//     const aText = a.querySelector("p").innerText;
//     const bText = b.querySelector("p").innerText;

//     if (option === "price") {
//       const aPrice = parseInt(aText.match(/💲(\d+)/)?.[1] || 0);
//       const bPrice = parseInt(bText.match(/💲(\d+)/)?.[1] || 0);
//       return aPrice - bPrice;
//     } else if (option === "rating") {
//       const aRating = parseFloat(aText.match(/⭐(\d+(\.\d+)?)/)?.[1] || 0);
//       const bRating = parseFloat(bText.match(/⭐(\d+(\.\d+)?)/)?.[1] || 0);
//       return bRating - aRating;
//     } else if (option === "duration") {
//       const aDur = parseFloat(aText.match(/(\d+(\.\d+)?)/)?.[1] || 0);
//       const bDur = parseFloat(bText.match(/(\d+(\.\d+)?)/)?.[1] || 0);
//       return aDur - bDur;
//     }
//     return 0;
//   });

//   container.innerHTML = "";
//   cards.forEach((card) => container.appendChild(card));
// }






/// ==== API Keys ====
const WEATHER_API_KEY = "8ea94ddbe9c5a0e1a381101d0833c954"; 
const UNSPLASH_ACCESS_KEY = "2wl4-XSv5Y7m7RSn6OXQoKKNEzclKk0AUIuZXw7ahrQ"; // Unsplash API key

// ==== Weather API ====
async function getWeather() {
  const city = document.getElementById("cityInputWeather").value || document.getElementById("cityInput").value;
  if (!city) { alert("Enter a city"); return; }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${WEATHER_API_KEY}&units=metric`;
  try {
    const res = await fetch(url);
    const data = await res.json();

    displayResult({
      type: "weather",
      title: `Weather in ${city}`,
      details: `🌡 ${data.main.temp}°C | ${data.weather[0].description}`,
    });
  } catch (err) {
    console.error("Weather API Error:", err);
  }
}

// ==== Unsplash Image Fetch ====
async function fetchHotelImage(query) {
  try {
    const res = await fetch(
      `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=1&client_id=${UNSPLASH_ACCESS_KEY}`
    );
    const data = await res.json();

    return data.results?.[0]?.urls?.regular || "https://via.placeholder.com/400x250?text=Hotel+Image";
  } catch (error) {
    console.error("Unsplash error:", error);
    return "https://via.placeholder.com/400x250?text=Hotel+Image";
  }
}

// ==== Hotels API ====
async function getHotels() {
  const city = document.getElementById("cityInput").value;
  if (!city) { alert("Enter a city"); return; }

  const resultsDiv = document.getElementById("resultsContainer");
  resultsDiv.innerHTML = "<p>Loading hotels...</p>";

  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);
  const formatDate = (d) => d.toISOString().split("T")[0];
  const checkIn = formatDate(today), checkOut = formatDate(tomorrow);

  try {
    const res = await fetch(
      `http://localhost:3000/api/hotels?city=${city}&check_in=${checkIn}&check_out=${checkOut}`
    );
    const hotelData = await res.json();

    resultsDiv.innerHTML = "";

    if (!hotelData || hotelData.length === 0) {
      resultsDiv.innerHTML = "<p>No hotels found for this city.</p>";
      return;
    }

    for (const hotel of hotelData) {
      const hotelImage = await fetchHotelImage(`${hotel.hotelName} ${hotel.location.name}`);
      displayResult({
        type: "hotel",
        title: hotel.hotelName,
        details: `
          <span class="price">💲${hotel.priceFrom}</span> | 
          <span class="stars">⭐${hotel.stars}</span> | 
          <span class="location">📍 ${hotel.location.name}</span>
        `,
        image: hotelImage,
        url: `https://www.hotels.com/ho${hotel.hotelId}/`
      });
    }
  } catch (err) {
    console.error("Hotels API Error:", err);
    resultsDiv.innerHTML = "<p>Error fetching hotels.</p>";
  }
}

// ==== Flights API ====
async function getFlights() {
  const originInput = document.getElementById("originInput").value;
  const destinationInput = document.getElementById("destinationInput").value;
  const flightDateInput = document.getElementById("flightDate").value;

  const origin = originInput.match(/\(([^)]+)\)/)?.[1];
  const destination = destinationInput.match(/\(([^)]+)\)/)?.[1];

  if (!origin || !destination) { alert("Select valid airports from the list."); return; }

  const resultsDiv = document.getElementById("resultsContainer");
  resultsDiv.innerHTML = "<p>Searching flights...</p>";

  try {
    const res = await fetch(`/api/flights?origin=${origin}&destination=${destination}`);
    const flights = await res.json();

    resultsDiv.innerHTML = "";

    if (!flights || flights.length === 0) {
      resultsDiv.innerHTML = "<p>No flights found.</p>";
      return;
    }

    flights.slice(0, 6).forEach((flight) => {
      const depTime = flight.departure?.scheduled ? new Date(flight.departure.scheduled) : null;
      const arrTime = flight.arrival?.scheduled ? new Date(flight.arrival.scheduled) : null;

      let duration = "N/A";
      if (depTime && arrTime) {
        const diffMs = arrTime - depTime;
        const hours = Math.floor(diffMs / (1000*60*60));
        const mins = Math.floor((diffMs % (1000*60*60)) / (1000*60));
        duration = `${hours}h ${mins}m`;
      }

      const depDate = flightDateInput || (depTime ? depTime.toISOString().split("T")[0] : "");
      const bookUrl = `https://www.makemytrip.com/flights?from=${flight.departure?.iata}&to=${flight.arrival?.iata}&tripType=O&depDate=${depDate}`;

      displayResult({
        type: "flight",
        title: `${flight.airline?.name || "Unknown Airline"} ${flight.flight?.iata || ""}`,
        details: `
          <div class="flight-details">
            <span><strong>${flight.departure?.iata || "N/A"}</strong> → <strong>${flight.arrival?.iata || "N/A"}</strong></span><br>
            <span>🕒 ${depTime ? depTime.toLocaleTimeString([], { hour:'2-digit', minute:'2-digit'}) : "N/A"} ⏱ ${duration} 🛬 ${arrTime ? arrTime.toLocaleTimeString([], { hour:'2-digit', minute:'2-digit'}) : "N/A"}</span><br>
            <span class="status-badge ${flight.flight_status?.toLowerCase() || ""}">${flight.flight_status?.toUpperCase() || "N/A"}</span>
          </div>
        `,
        url: bookUrl
      });
    });

  } catch (err) {
    console.error("Flights API Error:", err);
    resultsDiv.innerHTML = "<p>Error fetching flights.</p>";
  }
}

// ==== Airport Data Loader ====
let airports = [];
async function loadAirports() {
  try {
    const res = await fetch("airports.json");
    airports = await res.json();

    const datalist = document.getElementById("airportsList");
    airports.forEach(ap => {
      const option = document.createElement("option");
      option.value = `${ap.city} (${ap.iata})`;
      datalist.appendChild(option);
    });
  } catch (err) {
    console.error("Failed to load airports:", err);
  }
}
window.addEventListener("DOMContentLoaded", loadAirports);

// ==== Display Results ====
function displayResult(item) {
  const container = document.getElementById("resultsContainer");
  const col = document.createElement("div");
  col.className = "col-md-4 col-sm-6";

  col.innerHTML = `
    <div class="card h-100 shadow-sm">
      ${item.image ? `<img src="${item.image}" class="card-img-top" alt="${item.title}" onerror="this.src='https://via.placeholder.com/400x250?text=No+Image'"/>` : ""}
      <div class="card-body d-flex flex-column">
        <h5 class="card-title">${item.title}</h5>
        <p class="card-text">${item.details}</p>
        ${item.url ? `<a href="${item.url}" target="_blank" class="btn btn-primary mt-auto">Book Now</a>` : ""}
      </div>
    </div>
  `;
  container.appendChild(col);
}

// ==== Sorting Results ====
function sortResults() {
  const option = document.getElementById("sortOptions").value;
  const container = document.getElementById("resultsContainer");
  const cards = Array.from(container.children);

  cards.sort((a, b) => {
    const aText = a.querySelector("p").innerText;
    const bText = b.querySelector("p").innerText;

    if(option === "price") {
      const aPrice = parseInt(aText.match(/💲(\d+)/)?.[1] || 0);
      const bPrice = parseInt(bText.match(/💲(\d+)/)?.[1] || 0);
      return aPrice - bPrice;
    } 
    else if(option === "rating") {
      const aRating = parseFloat(aText.match(/⭐(\d+(\.\d+)?)/)?.[1] || 0);
      const bRating = parseFloat(bText.match(/⭐(\d+(\.\d+)?)/)?.[1] || 0);
      return bRating - aRating;
    } 
    else if(option === "duration") {
      // Convert "Xh Ym" to total minutes
      const parseDuration = (text) => {
        const match = text.match(/(\d+)h\s*(\d+)?m?/);
        if(!match) return Infinity;
        const hours = parseInt(match[1] || 0);
        const mins = parseInt(match[2] || 0);
        return hours*60 + mins;
      };
      const aDur = parseDuration(aText);
      const bDur = parseDuration(bText);
      return aDur - bDur;
    }

    return 0;
  });

  container.innerHTML = "";
  cards.forEach(card => container.appendChild(card));
}

