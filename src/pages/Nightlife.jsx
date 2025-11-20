import { useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import CityFilterSearch from "../components/CityFilterSearch.jsx";
import LocationCard from "../components/LocationCard.jsx";

const NIGHTLIFE_SPOTS = [
  {
    id: "night-1",
    name: "Splav Freestyler",
    city: "Belgrade",
    category: "Club",
    description: "Famous river club on the Sava with DJs and late-night parties.",
  },
  {
    id: "night-2",
    name: "Lazin Salaš",
    city: "Novi Sad",
    category: "Bar",
    description: "Laid-back spot with music, drinks, and local atmosphere.",
  },
  {
    id: "night-3",
    name: "Kazandžijsko Sokače",
    city: "Niš",
    category: "Bar Street",
    description: "Historic cobblestone street filled with bars and cafes.",
  },
];

const CITIES = ["Belgrade", "Novi Sad", "Niš"];

export default function Nightlife({ onAddToItinerary }) {
  const [search, setSearch] = useState("");
  const [city, setCity] = useState("All");

  const filtered = NIGHTLIFE_SPOTS.filter((spot) => {
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
      <h1 className="mb-3">Nightlife in Serbia</h1>
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
      {filtered.length === 0 && <p>No nightlife spots match your filters.</p>}
    </>
  );
}
