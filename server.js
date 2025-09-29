
import express from "express";
import fetch from "node-fetch";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const PORT = 3000;

// Required for ES modules (__dirname not available by default)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ Middleware
app.use(cors());
app.use(express.json());

// ✅ Serve frontend files
app.use(express.static(path.join(__dirname, "public")));

// 🔑 API keys
const HOTEL_TOKEN = "0b34f085639bfb6424e3658766cbe824"; // Travelpayouts
const AVIATION_KEY = "f1a378767b37ef98376fae2118510f28"; // Replace with your key

// === Hotels API Proxy ===
app.get("/api/hotels", async (req, res) => {
  const { city, check_in, check_out } = req.query;

  if (!city) {
    return res.status(400).json({ error: "City is required" });
  }

  try {
    // 1. Get city locationId
    const lookupUrl = `https://engine.hotellook.com/api/v2/lookup.json?query=${city}&lang=en&lookFor=both&limit=1&token=${HOTEL_TOKEN}`;
    const lookupRes = await fetch(lookupUrl);
    const lookupData = await lookupRes.json();

    if (!lookupData.results?.locations?.length) {
      return res.status(404).json({ error: "City not found" });
    }

    const locationId = lookupData.results.locations[0].id;

    // 2. Get hotels
    const hotelsUrl = `https://engine.hotellook.com/api/v2/cache.json?locationId=${locationId}&checkIn=${check_in}&checkOut=${check_out}&currency=usd&limit=10&token=${HOTEL_TOKEN}`;
    const hotelsRes = await fetch(hotelsUrl);
    const hotelsData = await hotelsRes.json();

    res.json(hotelsData);
  } catch (error) {
    console.error("Server Error:", error);
    res.status(500).json({ error: "Failed to fetch hotels" });
  }
});

// === Flights API Proxy (AviationStack) ===
// app.get("/api/flights", async (req, res) => {
//   const { origin, destination } = req.query;

//   if (!origin || !destination) {
//     return res.status(400).json({ error: "Origin and destination are required" });
//   }

//   try {
//     const url = `https://api.aviationstack.com/v1/flights?access_key=${AVIATION_KEY}&dep_iata=${origin}&arr_iata=${destination}&limit=10`;
//     const response = await fetch(url);
//     const data = await response.json();

//     if (data.error) {
//       console.error("Flights API Error:", data.error);
//       return res.status(500).json(data.error);
//     }

//     res.json(data.data); // send only flights array
//   } catch (error) {
//     console.error("Server Error:", error);
//     res.status(500).json({ error: "Failed to fetch flights" });
//   }
// });



// === Flights API Proxy (AviationStack) ===

app.get("/api/flights", async (req, res) => {
  const { origin, destination } = req.query;

  if (!origin || !destination) {
    return res.status(400).json({ error: "Origin and destination are required" });
  }

  try {
    const url = `https://api.aviationstack.com/v1/flights?access_key=${AVIATION_KEY}&dep_iata=${origin}&arr_iata=${destination}&limit=50`;
    const response = await fetch(url);

    if (!response.ok) {
      const text = await response.text();
      console.error("Aviationstack API returned non-200:", text);
      return res.status(500).json({ error: "External API error" });
    }

    const data = await response.json();

    if (data.error) {
      console.error("Flights API Error:", data.error);
      return res.status(500).json({ error: data.error.message || "Flights API error" });
    }

    // Whitelist of major Indian airlines
    const allowedAirlines = [
      "Air India",
      "IndiGo",
      "Vistara",
      "SpiceJet",
      "Go First",
      "Akasa Air"
    ];

    const flightsArray = Array.isArray(data.data) ? data.data : [];

    // Filter flights
    const filteredFlights = flightsArray.filter(
      (flight) =>
        flight.departure?.iata === origin &&
        flight.arrival?.iata === destination &&
        allowedAirlines.includes(flight.airline?.name || "")
    );

    res.json(filteredFlights);

  } catch (error) {
    console.error("Server Error:", error);
    res.status(500).json({ error: "Failed to fetch flights" });
  }
});



// ✅ Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});



