import { useState } from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Container from "react-bootstrap/Container";

import NavigationBar from "./components/NavigationBar.jsx";

import Home from "./pages/Home.jsx";
import Food from "./pages/Food.jsx";
import Nightlife from "./pages/Nightlife.jsx";
import Historical from "./pages/Historical.jsx";
import ItineraryPage from "./pages/Itinerary.jsx";

export default function App() {
  // Itinerary: array of { id, name, city, category }
  const [itinerary, setItinerary] = useState([]);

  const addToItinerary = (location) => {
    // avoid duplicates by id
    if (!itinerary.some((item) => item.id === location.id)) {
      setItinerary([...itinerary, location]);
    }
  };

  const removeFromItinerary = (id) => {
    setItinerary(itinerary.filter((item) => item.id !== id));
  };

  return (
    <Router>
      <NavigationBar />
      <Container className="my-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/food"
            element={<Food onAddToItinerary={addToItinerary} />}
          />
          <Route
            path="/nightlife"
            element={<Nightlife onAddToItinerary={addToItinerary} />}
          />
          <Route
            path="/historical"
            element={<Historical onAddToItinerary={addToItinerary} />}
          />
          <Route
            path="/itinerary"
            element={
              <ItineraryPage
                itinerary={itinerary}
                onRemoveFromItinerary={removeFromItinerary}
              />
            }
          />
        </Routes>
      </Container>
    </Router>
  );
}

