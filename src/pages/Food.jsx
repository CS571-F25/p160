import { useMemo, useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";

import CityFilterSearch from "../components/CityFilterSearch.jsx";
import FoodSpotCard from "../components/FoodSpotCard.jsx";

const FOOD_SPOTS = [
  // Belgrade (2)
  {
    id: "food-1",
    name: "Tri Šešira",
    city: "Belgrade",
    category: "Traditional",
    description: "Classic kafana in Skadarlija with live music and Serbian dishes.",
    mustTry: ["Ćevapi", "Sarma", "Rakija"],
    price: "$$",
    rating: 4.7,
    images: [
      { src: "./images/food/tri-sesira_restaurant.jpg", alt: "Tri Šešira restaurant interior" },
      { src: "./images/food/tri-sesira_food.jpg", alt: "Traditional Serbian meal at Tri Šešira" },
      { src: "./images/food/tri-sesira_music.jpg", alt: "Live music performers at Tri Šešira" },
    ],
  },
  {
    id: "food-4",
    name: "Manufaktura",
    city: "Belgrade",
    category: "Modern",
    description: "Stylish spot near Kalemegdan known for Serbian classics with a modern touch.",
    mustTry: ["Karađorđeva", "Kajmak", "Dessert plate"],
    price: "$$$",
    rating: 4.6,
    images: [
      { src: "./images/food/manufaktura_restaurant.jpg", alt: "Manufaktura dining room" },
      { src: "./images/food/manufaktura_food2.jpg", alt: "Signature dish at Manufaktura" },
      { src: "./images/food/manufaktura_scenery.jpg", alt: "Nearby Kalemegdan scenery" },
    ],
  },

  // Novi Sad (2)
  {
    id: "food-2",
    name: "Projekt 72",
    city: "Novi Sad",
    category: "Modern",
    description: "Modern Balkan cuisine with creative twists and a cozy vibe.",
    mustTry: ["Seasonal tasting", "Local wines", "Chef special"],
    price: "$$$",
    rating: 4.8,
    images: [
      { src: "./images/food/projekt-72_restaurant.jpg", alt: "Projekt 72 seating area" },
      { src: "./images/food/projekt-72_food.jpg", alt: "Plated modern Balkan dish at Projekt 72" },
      { src: "./images/food/projekt-72_kitchen.jpg", alt: "Kitchen scene at Projekt 72" },
    ],
  },
  {
    id: "food-5",
    name: "Lazin Salaš",
    city: "Novi Sad",
    category: "Traditional",
    description: "Rustic farmhouse-style dining with hearty portions and Vojvodina flavors.",
    mustTry: ["Goulash", "Homemade bread", "Strudel"],
    price: "$$",
    rating: 4.5,
    images: [
      { src: "./images/food/lazin-salas_restaurant.jpg", alt: "Lazin Salaš rustic restaurant" },
      { src: "./images/food/lazin-salas_food.jpg", alt: "Hearty traditional dish at Lazin Salaš" },
      { src: "./images/food/lazin-salas_scenery.jpg", alt: "Countryside scenery near Lazin Salaš" },
    ],
  },

  // Niš (2)
  {
    id: "food-3",
    name: "Stara Srbija",
    city: "Niš",
    category: "Grill",
    description: "Legendary grilled meat and local specialties in the heart of Niš.",
    mustTry: ["Pljeskavica", "Roštilj", "Ajvar"],
    price: "$",
    rating: 4.6,
    images: [
      { src: "./images/food/stara-srbija_restaurant.jpg", alt: "Stara Srbija restaurant atmosphere" },
      { src: "./images/food/stara-srbija_food.jpg", alt: "Grilled meat platter in Niš" },
      { src: "./images/food/stara-srbija_grill.jpg", alt: "Grill cooking scene" },
    ],
  },
  {
    id: "food-6",
    name: "Nišlijska Mehana",
    city: "Niš",
    category: "Traditional",
    description: "Cozy tavern-style dining featuring southern Serbian comfort food and hospitality.",
    mustTry: ["Sarma", "Prebranac", "Homemade desserts"],
    price: "$$",
    rating: 4.4,
    images: [
      { src: "./images/food/nislijska-mehana_restaurant.jpg", alt: "Nišlijska Mehana dining room" },
      { src: "./images/food/nislijska-mehana_food.jpg", alt: "Traditional Serbian dish at Nišlijska Mehana" },
      { src: "./images/food/nislijska-mehana_music.jpg", alt: "Traditional singers performing" },
    ],
  },
];

const CITIES = ["Belgrade", "Novi Sad", "Niš"];

export default function Food({ onAddToItinerary }) {
  const [search, setSearch] = useState("");
  const [city, setCity] = useState("All");

  const filtered = useMemo(() => {
    const lowerSearch = search.toLowerCase();
    return FOOD_SPOTS.filter((spot) => {
      const matchesCity = city === "All" || spot.city === city;
      const matchesSearch =
        spot.name.toLowerCase().includes(lowerSearch) ||
        spot.description.toLowerCase().includes(lowerSearch) ||
        spot.category.toLowerCase().includes(lowerSearch) ||
        (spot.mustTry?.join(" ").toLowerCase().includes(lowerSearch) ?? false);
      return matchesCity && matchesSearch;
    });
  }, [search, city]);

  return (
    <div
    className="page-bg"
    style={{ backgroundImage: "url('./images/food-bg.jpg')" }}
  >
    <div className="page-bg-overlay pt-4 mt-5">
      {/* Styled header */}
      <Card className="shadow-sm mb-4 food-header-card fade-up">
        <Card.Body>
          <h1 className="mb-2 food-title">
            Food in <span className="discover-gradient fw-bold">Serbia</span>
          </h1>
          <p className="text-muted mb-0">
            Scroll, filter by city, and save restaurants you want to try. Each spot includes a quick vibe check,
            “must try” picks, and photos to help you choose your next meal.
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

      {/* Bigger cards: 1 per row on md, 2 on xl feels more “scrollable” */}
      <Row xs={1} md={1} xl={2} className="g-4 mt-2">
      {filtered.map((spot, i) => (
        <Col key={spot.id} className={`fade-up fade-delay-${(i % 4) + 1}`}>
            <FoodSpotCard spot={spot} onAddToItinerary={onAddToItinerary} />
        </Col>
        ))}

      </Row>

      {filtered.length === 0 && (
        <p className="mt-3 text-muted">
          No food spots match your filters. Try “Traditional”, “Grill”, or a city name.
        </p>
      )}
    </div>
    </div>
  );
}
