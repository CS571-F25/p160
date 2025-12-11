import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import Carousel from "react-bootstrap/Carousel";

export default function NightlifeSpotCard({ spot, onAddToItinerary }) {
  return (
    <Card className="shadow nightlife-spot-card h-100">
      <Carousel interval={null}>
        {spot.images.map((img) => (
          <Carousel.Item key={img.src}>
            <img
              src={img.src}
              className="d-block w-100 nightlife-spot-img"
              alt={img.alt}
            />
          </Carousel.Item>
        ))}
      </Carousel>

      <Card.Body>
        <div className="d-flex flex-wrap align-items-center justify-content-between gap-2 mb-2">
          <div className="d-flex flex-wrap gap-2">
            <Badge bg="dark" className="night-badge">{spot.city}</Badge>
            <Badge bg="secondary" className="night-badge">{spot.category}</Badge>
            {spot.vibe && <Badge bg="primary" className="night-badge">{spot.vibe}</Badge>}
          </div>

          {typeof spot.rating === "number" && (
            <Badge bg="warning" text="dark">
              ★ {spot.rating.toFixed(1)}
            </Badge>
          )}
        </div>

        <Card.Title as="h2" className="h4 mb-2 text-white">
          {spot.name}
        </Card.Title>

        <Card.Text className="text-white mb-3">
          {spot.description}
        </Card.Text>

        {spot.highlights?.length ? (
          <div className="d-flex flex-wrap gap-2 mb-3">
            {spot.highlights.map((h) => (
              <Badge key={h} bg="light" text="dark">
                {h}
              </Badge>
            ))}
          </div>
        ) : null}

        <div className="d-grid">
          <Button
            type="button"
            variant="outline-light"
            onClick={() => onAddToItinerary?.(spot)}
            aria-label={`Add ${spot.name} to itinerary`}
          >
            Add to Itinerary
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}
