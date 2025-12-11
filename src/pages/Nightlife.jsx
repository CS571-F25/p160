import { useEffect, useMemo, useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";

import CityFilterSearch from "../components/CityFilterSearch.jsx";
import NightlifeSpotCard from "../components/NightlifeSpotCard.jsx";

const NIGHTLIFE_SPOTS = [
  // BELGRADE — splavs + DJ clubs + svirke
  {
    id: "night-1",
    name: "Splav Freestyler",
    city: "Belgrade",
    category: "Splav",
    vibe: "DJ Club",
    description: "Iconic river club with DJs, big energy, and late nights on the Sava.",
    highlights: ["Riverfront", "Late night", "Dancefloor"],
    rating: 4.6,
    images: [
      { src: "./images/nightlife/freestyler_splav.jpg", alt: "Freestyler splav at night" },
      { src: "./images/nightlife/freestyler_crowd.jpg", alt: "Crowd and lights at Freestyler" },
      { src: "./images/nightlife/freestyler_dj.jpg", alt: "DJ performing at Freestyler" },
    ],
  },
  {
    id: "night-2",
    name: "Splav Lasta",
    city: "Belgrade",
    category: "Splav",
    vibe: "Folk / Pop",
    description: "Well-known splav vibe with rotating performers and a classic Belgrade night feel.",
    highlights: ["Live performers", "Table service", "Sava"],
    rating: 4.5,
    images: [
      { src: "./images/nightlife/lasta_splav.jpg", alt: "Splav Lasta exterior at night" },
      { src: "./images/nightlife/lasta_singers.jpg", alt: "Singer performing at Splav Lasta" },
      { src: "./images/nightlife/lasta_tables.jpg", alt: "Tables and atmosphere at Splav Lasta" },
    ],
  },
  {
    id: "night-3",
    name: "Boutique Trojka",
    city: "Belgrade",
    category: "Svirke",
    vibe: "Live Music",
    description: "Popular spot for live sets (svirke), strong energy, and a packed weekend crowd.",
    highlights: ["Svirke", "Reservations", "Weekend hotspot"],
    rating: 4.7,
    images: [
      { src: "./images/nightlife/trojka_interior.jpg", alt: "Boutique Trojka interior" },
      { src: "./images/nightlife/trojka_band.jpg", alt: "Live band performing at Boutique Trojka" },
      { src: "./images/nightlife/trojka_drinks.jpg", alt: "Cocktails and table scene at Trojka" },
    ],
  },
  {
    id: "night-4",
    name: "Pijaca #2",
    city: "Belgrade",
    category: "Svirke",
    vibe: "Live Music",
    description: "Known for lively svirke nights, upbeat crowd, and a fun ‘going out’ atmosphere.",
    highlights: ["Svirke", "Sing-alongs", "Energy"],
    rating: 4.6,
    images: [
      { src: "./images/nightlife/pijaca2_space.jpg", alt: "Pijaca #2 venue space" },
      { src: "./images/nightlife/pijaca2_singers.jpg", alt: "Singer night at Pijaca #2" },
      { src: "./images/nightlife/pijaca2_crowd.jpg", alt: "Crowd enjoying the music at Pijaca #2" },
    ],
  },
  {
    id: "night-5",
    name: "Gradska Kafana",
    city: "Belgrade",
    category: "Kafana",
    vibe: "Live Music",
    description: "Classic kafana feel with rotating singers, Serbian hits, and a warm atmosphere.",
    highlights: ["Rotating singers", "Kafana vibe", "Traditional"],
    rating: 4.5,
    images: [
      { src: "./images/nightlife/gradska_interior.jpg", alt: "Gradska Kafana interior" },
      { src: "./images/nightlife/gradska_singers.jpg", alt: "Singers performing at Gradska Kafana" },
      { src: "./images/nightlife/gradska-food.jpg", alt: "Kafana table with drinks and food" },
    ],
  },
  {
    id: "night-6",
    name: "Drugstore",
    city: "Belgrade",
    category: "Club",
    vibe: "DJ / Techno",
    description: "Warehouse-style club known for DJs, heavy sound, and an underground vibe.",
    highlights: ["Techno", "Warehouse", "Late night"],
    rating: 4.6,
    images: [
      { src: "./images/nightlife/drugstore_exterior.jpg", alt: "Drugstore club exterior" },
      { src: "./images/nightlife/drugstore_lights.jpg", alt: "Club lighting and crowd at Drugstore" },
      { src: "./images/nightlife/drugstore_dj.jpg", alt: "DJ booth at Drugstore" },
    ],
  },

  // NOVI SAD
  {
    id: "night-7",
    name: "Club Museum",
    city: "Novi Sad",
    category: "Club",
    vibe: "DJ",
    description: "Popular club option in Novi Sad with a party crowd and rotating DJ nights.",
    highlights: ["DJ nights", "Downtown", "Dancefloor"],
    rating: 4.4,
    images: [
      { src: "./images/nightlife/muse_inside2.jpg", alt: "Interior of Club Museum" },
      { src: "./images/nightlife/muse_inside.jpg", alt: "Inside the club at Club Museum" },
      { src: "./images/nightlife/muse_dj.jpg", alt: "DJ set at Club Museum" },
    ],
  },
  {
    id: "night-8",
    name: "Laze Telečkog Street",
    city: "Novi Sad",
    category: "Bar Street",
    vibe: "Crawling",
    description: "The go-to nightlife street in Novi Sad—bars, pubs, and a lively weekend flow.",
    highlights: ["Bar hopping", "Crowded weekends", "Walkable"],
    rating: 4.5,
    images: [
      { src: "./images/nightlife/laze-teleckog-street.jpg", alt: "Laze Telečkog street at night" },
      { src: "./images/nightlife/laze-teleckog-bars.jpg", alt: "Bars along Laze Telečkog" },
      { src: "./images/nightlife/laze-teleckog-crowd.jpg", alt: "Crowd on Laze Telečkog street" },
    ],
  },

  // NIŠ
  {
    id: "night-9",
    name: "Kazandžijsko Sokače",
    city: "Niš",
    category: "Bar Street",
    vibe: "Cafés & Bars",
    description: "Historic cobblestone street filled with cafés and bars—great for a relaxed night out.",
    highlights: ["Old town", "Cobblestone", "Chill"],
    rating: 4.4,
    images: [
      { src: "./images/nightlife/kazandzijsko_street.jpg", alt: "Kazandžijsko Sokače street view" },
      { src: "./images/nightlife/kazandzijsko_cafe.jpg", alt: "Café along Kazandžijsko Sokače" },
      { src: "./images/nightlife/kazandzijsko_night.jpg", alt: "Night atmosphere on the street" },
    ],
  },
];

const CITIES = ["Belgrade", "Novi Sad", "Niš"];

export default function Nightlife({ onAddToItinerary }) {
  const [search, setSearch] = useState("");
  const [city, setCity] = useState("All");

  const filtered = useMemo(() => {
    const lowerSearch = search.toLowerCase();
    return NIGHTLIFE_SPOTS.filter((spot) => {
      const matchesCity = city === "All" || spot.city === city;
      const matchesSearch =
        spot.name.toLowerCase().includes(lowerSearch) ||
        spot.description.toLowerCase().includes(lowerSearch) ||
        spot.category.toLowerCase().includes(lowerSearch) ||
        (spot.highlights?.join(" ").toLowerCase().includes(lowerSearch) ?? false) ||
        (spot.vibe?.toLowerCase().includes(lowerSearch) ?? false);
      return matchesCity && matchesSearch;
    });
  }, [search, city]);

  // background in: public/images/nightlife/nightlife-bg.jpg
  const bgUrl = `${import.meta.env.BASE_URL}images/nightlife/nightlife-bg.jpg`;

useEffect(() => {
  document.body.classList.add("nightlife-mode");
  document.body.style.setProperty("--nightlife-bg", `url(${bgUrl})`);

  return () => {
    document.body.classList.remove("nightlife-mode");
    document.body.style.removeProperty("--nightlife-bg");
  };
}, [bgUrl]);


  return (
    <>
    <div className="nightlife-page">
    <div
      className="nightlife-bg"
      style={{ backgroundImage: `url(${bgUrl})` }}
      aria-hidden="true"
    />
    <div className="nightlife-dim" aria-hidden="true" />

    <div className="pt-4 mt-5">
        <Card className="shadow-sm mb-4 nightlife-header-card fade-up">
          <Card.Body>
            <h1 className="mb-2 nightlife-title">
              Nightlife in <span className="discover-gradient fw-bold">Serbia</span>
            </h1>
            <p className="mb-0 text-light-emphasis">
              Splavs on the river, kafanas with live singers, and DJ clubs that go late. Filter by city,
              find your vibe, and save your next night out.
            </p>
          </Card.Body>
        </Card>

        <div className="fade-up fade-delay-1">
          <CityFilterSearch
            search={search}
            onSearchChange={setSearch}
            city={city}
            onCityChange={setCity}
            cities={CITIES}
          />
        </div>

        {/* Bigger cards: 1 per row on md, 2 on xl */}
        <Row xs={1} md={1} xl={2} className="g-4 mt-2">
          {filtered.map((spot, i) => (
            <Col key={spot.id} className={`fade-up fade-delay-${(i % 4) + 1}`}>
              <NightlifeSpotCard spot={spot} onAddToItinerary={onAddToItinerary} />
            </Col>
          ))}
        </Row>

        {filtered.length === 0 && (
          <p className="mt-3 text-light-emphasis">
            No nightlife spots match your filters. Try “Splav”, “Svirke”, “DJ”, or a city name.
          </p>
        )}
      </div>
      </div>
    </>
  );
}
