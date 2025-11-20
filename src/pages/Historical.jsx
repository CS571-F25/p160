import { useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import CityFilterSearch from "../components/CityFilterSearch.jsx";
import LocationCard from "../components/LocationCard.jsx";

const HISTORICAL_SITES = [
  {
    id: "hist-1",
    name: "Kalemegdan Fortress",
    city: "Belgrade",
    category: "Fortress",
    description:
      "Overlooks the confluence of the Sava and Danube with parks and views.",
  },
  {
    id: "hist-2",
    name: "Petrovaradin Fortress",
    city: "Novi Sad",
    category: "Fortress",
    description: "Iconic fortress that hosts the EXIT music festival.",
  },
  {
    id: "hist-3",
    name: "Niš Fortress",
    city: "Niš",
    category: "Fortress",
    description: "Ottoman-era fortress with cultural events and walking paths.",
  },
];

const CITIES = ["Belgrade", "Novi Sad", "Niš"];

export default function Historical({ onAddToItinerary }) {
  const [search, setSearch] = useState("");
  const [city, setCity] = useState("All");

  const filtered = HISTORICAL_SITES.filter((spot) => {
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
      <h1 className="mb-3">Historical Sites</h1>
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
      {filtered.length === 0 && <p>No historical sites match your filters.</p>}
    </>
  );
}
