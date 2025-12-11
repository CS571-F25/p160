import { useMemo, useState } from "react";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import CityFilterSearch from "../components/CityFilterSearch.jsx";
import HistoricalSection from "../components/HistoricalSection.jsx";

const HISTORICAL_SITES = [
  {
    id: "hist-1",
    slug: "kalemegdan",
    name: "Kalemegdan Fortress",
    city: "Belgrade",
    category: "Fortress",
    era: "Roman → Ottoman",
    timeToVisit: "1–2 hours",
    heroImage: "./images/historical/kalemegdan_hero.jpg",
    heroAlt: "Kalemegdan Fortress overlooking the rivers",
    lede:
      "Belgrade’s most iconic viewpoint—where the Sava meets the Danube—layered with centuries of walls, gates, and parks.",
    history: [
      "Kalemegdan sits on one of Europe’s most strategic river confluences, making it a prime defensive position for centuries.",
      "The site evolved through Roman, Byzantine, medieval Serbian, and Ottoman periods—each leaving traces in ramparts, gates, and layout.",
      "Today, the fortress and surrounding park are a cultural hub: monuments, museums, and sunset views over the rivers.",
    ],
    thingsToDo: [
      "Walk the ramparts and viewpoints at sunset",
      "Explore the park paths and monuments",
      "Check out nearby museums and exhibits (optional)",
    ],
    tips: [
      "Wear comfortable shoes—paths and stone sections can be uneven",
      "Golden hour is best for photos",
      "Great starting point before exploring Knez Mihailova",
    ],
    learnMoreHref: "",
  },
  {
    id: "hist-2",
    slug: "petrovaradin",
    name: "Petrovaradin Fortress",
    city: "Novi Sad",
    category: "Fortress",
    era: "Habsburg (18th c.)",
    timeToVisit: "2–3 hours",
    heroImage: "./images/historical/petrovaradin_hero.jpg",
    heroAlt: "Petrovaradin Fortress with view over the Danube",
    lede:
      "Nicknamed the “Gibraltar of the Danube,” Petrovaradin is a massive Habsburg stronghold towering above Novi Sad.",
    history: [
      "Constructed largely in the 18th century under Habsburg rule, Petrovaradin was designed as a complex military fortress system.",
      "Its tunnels and layered defenses reflect the era’s engineering approach to artillery warfare and frontier protection.",
      "In modern times it’s known worldwide as the home of EXIT Festival—mixing history with contemporary culture.",
    ],
    thingsToDo: [
      "Walk the upper fortress for panoramic Danube views",
      "Visit artist studios and cafés within the fortress area",
      "See the famous clock tower (the ‘drunk clock’)",
    ],
    tips: [
      "Go early if you want quieter views",
      "Bring a light jacket—wind can be strong on the plateau",
      "Combine with a walk through Novi Sad’s center",
    ],
    learnMoreHref: "",
  },
  {
    id: "hist-3",
    slug: "nis-fortress",
    name: "Niš Fortress",
    city: "Niš",
    category: "Fortress",
    era: "Ottoman (18th c.)",
    timeToVisit: "1–2 hours",
    heroImage: "./images/historical/nis_fortress_hero.jpg",
    heroAlt: "Stone walls and gates of Niš Fortress",
    lede:
      "A spacious Ottoman-era fortress that feels like a city park—gates, walls, open paths, and frequent cultural events.",
    history: [
      "Niš has been an important crossroads since antiquity, and the fortress area reflects repeated rebuilding across eras.",
      "The current fortress structure dates mainly to Ottoman construction in the 18th century, integrating older materials and foundations.",
      "Today it functions as a community space—walkable, scenic, and a frequent venue for festivals and gatherings.",
    ],
    thingsToDo: [
      "Enter through the main gates and wander the grounds",
      "Check out seasonal events (when available)",
      "Pair it with Niš city center exploration",
    ],
    tips: [
      "Great stop for a relaxed afternoon walk",
      "Evening strolls are especially nice in warm months",
      "Look for plaques/markers explaining key points",
    ],
    learnMoreHref: "",
  },
];

const CITIES = ["Belgrade", "Novi Sad", "Niš"];

export default function Historical({ onAddToItinerary }) {
  const [search, setSearch] = useState("");
  const [city, setCity] = useState("All");

  const filtered = useMemo(() => {
    const lowerSearch = search.toLowerCase();
    return HISTORICAL_SITES.filter((s) => {
      const matchesCity = city === "All" || s.city === city;
      const matchesSearch =
        s.name.toLowerCase().includes(lowerSearch) ||
        s.lede.toLowerCase().includes(lowerSearch) ||
        s.category.toLowerCase().includes(lowerSearch) ||
        (s.era?.toLowerCase().includes(lowerSearch) ?? false) ||
        s.history.join(" ").toLowerCase().includes(lowerSearch);
      return matchesCity && matchesSearch;
    });
  }, [search, city]);

  // HashRouter-safe smooth scroll to section (accounts for fixed navbar)
  const scrollToSection = (slug) => {
    const el = document.getElementById(slug);
    if (!el) return;

    const navOffset = 90; // tweak if your navbar height differs
    const y = el.getBoundingClientRect().top + window.scrollY - navOffset;

    window.scrollTo({ top: y, behavior: "smooth" });
  };

  return (
    <div className="pt-4 mt-5">
      {/* Hero / intro */}
      <Card className="hist-hero shadow-sm mb-4 fade-up">
        <Card.Body>
          <h1 className="mb-2">
            Historical Sites in{" "}
            <span className="discover-gradient fw-bold">Serbia</span>
          </h1>
          <p className="text-muted mb-0">
            Explore fortresses, old city cores, and places shaped by empires. Use
            the filters to find a site, then scroll for deeper stories and tips.
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

      {filtered.length > 0 && (
        <Row className="g-4 mt-2">
          {/* Sticky TOC */}
          <Col lg={4} className="d-none d-lg-block">
            <div className="hist-toc shadow-sm">
              <h2 className="h6 mb-3">On this page</h2>
              <ul className="hist-toc-list">
                {filtered.map((s) => (
                  <li key={s.id}>
                    <button
                      type="button"
                      className="hist-toc-link"
                      onClick={() => scrollToSection(s.slug)}
                    >
                      {s.name}
                      <span className="hist-toc-sub"> {s.city}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </Col>

          {/* Sections */}
          <Col lg={8}>
            <div className="d-flex flex-column gap-4">
              {filtered.map((site) => (
                <HistoricalSection
                  key={site.id}
                  site={site}
                  onAddToItinerary={onAddToItinerary}
                />
              ))}
            </div>
          </Col>
        </Row>
      )}

      {filtered.length === 0 && (
        <p className="mt-3 text-muted">No historical sites match your filters.</p>
      )}
    </div>
  );
}
