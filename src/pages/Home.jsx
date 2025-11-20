import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Carousel from "react-bootstrap/Carousel";

const SLIDES = [
  {
    key: "historical",
    title: "Historical Sites",
    buttonLabel: "Historical Sites",
    image: "./images/historical.jpg",
    alt: "Serbian fortress at sunset",
    caption: "Explore fortresses, monasteries, and centuries of history.",
    href: "#/historical",
  },
  {
    key: "nightlife",
    title: "Nightlife",
    buttonLabel: "Nightlife",
    image: "./images/nightlife.jpg",
    alt: "Belgrade nightlife on the river",
    caption: "Discover Belgrade’s legendary river clubs and bars.",
    href: "#/nightlife",
  },
  {
    key: "food",
    title: "Food",
    buttonLabel: "Food",
    image: "./images/food.jpg",
    alt: "Traditional Serbian food",
    caption: "Taste ćevapi, sarma, burek, and more local favorites.",
    href: "#/food",
  },
];

export default function Home() {
  const [index, setIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(0);
  const [isAnimatingText, setIsAnimatingText] = useState(false);

  const activeSlide = SLIDES[index];

  const handleSelect = (selectedIndex) => {
    if (selectedIndex === index) return;
    setPrevIndex(index);
    setIndex(selectedIndex);
    setIsAnimatingText(true);
  };

  // Turn off animation flag after animation finishes
  useEffect(() => {
    if (!isAnimatingText) return;
    const timer = setTimeout(() => setIsAnimatingText(false), 350); // match CSS duration
    return () => clearTimeout(timer);
  }, [isAnimatingText]);

  return (
    <div className="home-hero">
      {/* Full-screen blurred background */}
      <div className="home-hero-bg" />

      {/* Foreground content */}
      <div className="home-hero-content">
        <Card
          className="text-center shadow-sm home-card fade-in"
          style={{ maxWidth: "700px", width: "100%" }}
        >
          <Carousel
            activeIndex={index}
            onSelect={handleSelect}
            className="border-bottom"
            interval={5000}
          >
            {SLIDES.map((slide) => (
              <Carousel.Item key={slide.key}>
                <img
                  src={slide.image}
                  className="d-block w-100"
                  alt={slide.alt}
                  style={{ maxHeight: "320px", objectFit: "cover" }}
                />
              </Carousel.Item>
            ))}
          </Carousel>

          <Card.Body>
            <Card.Title as="h1" className="mb-3">
              Welcome to{" "}
              <span className="discover-gradient fw-bold">SerbTour</span>
            </Card.Title>

            <Card.Text>
              Plan your trip to Serbia with curated recommendations for{" "}
              <strong>food</strong>, <strong>nightlife</strong>, and{" "}
              <strong>historical sites</strong>. Use the navigation bar to
              explore different parts of the country, filter by city, and build
              your own custom itinerary.
            </Card.Text>

            {/* Animated text for Nightlife / Historical / Food */}
            <div className="mt-3 mb-3 slide-text-wrapper">
              {isAnimatingText && (
                <div
                  className="slide-text text-out"
                  key={SLIDES[prevIndex].key}
                >
                  <h4>{SLIDES[prevIndex].title}</h4>
                  <p className="mb-0">{SLIDES[prevIndex].caption}</p>
                </div>
              )}

              <div
                className={`slide-text ${
                  isAnimatingText ? "text-in" : "text-static"
                }`}
                key={activeSlide.key}
              >
                <h4>{activeSlide.title}</h4>
                <p className="mb-0">{activeSlide.caption}</p>
              </div>
            </div>

            <Button href={activeSlide.href} variant="primary">
              Start with {activeSlide.buttonLabel}
            </Button>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}
