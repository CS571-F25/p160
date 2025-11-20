import { useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import CityFilterSearch from "../components/CityFilterSearch.jsx";
import LocationCard from "../components/LocationCard.jsx";

const FOOD_SPOTS = [
  {
    id: "food-1",
    name: "Tri Šešira",
    city: "Belgrade",
    category: "Traditional",
    description: "Classic kafana in Skadarlija with live music and Serbian dishes.",
  },
  {
    id: "food-2",
    name: "Projekt 72",
    city: "Novi Sad",
    category: "Modern",
    description: "Modern Balkan cuisine with creative twists and a cozy vibe.",
  },
  {
    id: "food-3",
    name: "Stara Srbija",
    city: "Niš",
    category: "Grill",
    description: "Legendary grilled meat and local specialties in the heart of Niš.",
  },
];

const CITIES = ["Belgrade", "Novi Sad", "Niš"];

export default function Food({ onAddToItinerary }) {
  const [search, setSearch] = useState("");
  const [city, setCity] = useState("All");

  const filtered = FOOD_SPOTS.filter((spot) => {
    const matchesCity = city === "All" || spot.city === city;
    const lowerSearch = search.toLowerCase();
    const matchesSearch =
      spot.name.toLowerCase().includes(lowerSearch) ||
      spot.description.toLowerCase().includes(lowerSearch) ||
      spot.category.toLowerCase().includes(lowerSearch);
    return matchesCity && matchesSearch;
  });

  return (
    <>
      <h1 className="mb-3">Food in Serbia</h1>
      <CityFilterSearch
        search={search}
        onSearchChange={setSearch}
        city={city}
        onCityChange={setCity}
        cities={CITIES}
      />
      <Row xs={1} md={2} lg={3}>
        {filtered.map((spot) => (
          <Col key={spot.id} className="mb-3">
            <LocationCard
              location={spot}
              onAddToItinerary={onAddToItinerary}
            />
          </Col>
        ))}
      </Row>
      {filtered.length === 0 && <p>No food spots match your filters.</p>}
    </>
  );
}
