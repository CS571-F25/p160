import Alert from "react-bootstrap/Alert";
import { useEffect, useState } from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Container from "react-bootstrap/Container";

import NavigationBar from "./components/NavigationBar.jsx";

import Home from "./pages/Home.jsx";
import Food from "./pages/Food.jsx";
import Nightlife from "./pages/Nightlife.jsx";
import Historical from "./pages/Historical.jsx";
import ItineraryPage from "./pages/Itinerary.jsx";
import TravelTips from "./pages/TravelTips.jsx";

const STORAGE_KEY = "serbtour_itinerary_v1";

export default function App() {
  // Itinerary: array of { id, name, city, category, ... }
  const [itinerary, setItinerary] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  const [flash, setFlash] = useState(null);
  const [flashClosing, setFlashClosing] = useState(false);

  // Persist itinerary to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(itinerary));
    } catch {
      // ignore storage errors (private browsing, etc.)
    }
  }, [itinerary]);

  // Flash auto-dismiss logic
  useEffect(() => {
    if (!flash) return;
    setFlashClosing(false);

    const startClose = setTimeout(() => setFlashClosing(true), 2200);
    const remove = setTimeout(() => setFlash(null), 2500);

    return () => {
      clearTimeout(startClose);
      clearTimeout(remove);
    };
  }, [flash]);

  const addToItinerary = (location) => {
    setItinerary((prev) => {
      if (prev.some((item) => item.id === location.id)) {
        setFlash({
          variant: "warning",
          text: `${location.name} is already in your itinerary.`,
        });
        return prev;
      }

      const next = [...prev, location];
      setFlash({
        variant: "success",
        text: `Added ${location.name} to your itinerary!`,
      });
      return next;
    });
  };

  const removeFromItinerary = (id) => {
    setItinerary((prev) => prev.filter((item) => item.id !== id));
  };

  // Reorder handler (expects a whole new array from your Itinerary component)
  const reorderItinerary = (next) => {
    setItinerary(next);
  };

  const clearItinerary = () => setItinerary([]);

  return (
    <Router>
      <NavigationBar />

      {flash && (
        <Alert
          variant={flash.variant}
          dismissible
          onClose={() => {
            setFlashClosing(true);
            setTimeout(() => setFlash(null), 250);
          }}
          role="alert"
          className={`flash-alert position-fixed start-50 translate-middle-x ${
            flashClosing ? "flash-out" : "flash-in"
          }`}
          style={{ top: "72px", zIndex: 2000, width: "min(700px, 92vw)" }}
        >
          {flash.text}
        </Alert>
      )}

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

          <Route path="/travel-tips" element={<TravelTips />} />

          <Route
            path="/itinerary"
            element={
              <ItineraryPage
                itinerary={itinerary}
                onRemoveFromItinerary={removeFromItinerary}
                onReorderItinerary={reorderItinerary}
                onClearItinerary={clearItinerary}
              />
            }
          />
        </Routes>
      </Container>
    </Router>
  );
}
