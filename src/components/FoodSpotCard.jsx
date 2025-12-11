import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import Carousel from "react-bootstrap/Carousel";

export default function FoodSpotCard({ spot, onAddToItinerary }) {
  return (
    <Card className="shadow-sm food-spot-card h-100">
      <Carousel interval={null}>
        {spot.images.map((img) => (
          <Carousel.Item key={img.src}>
            <img
              src={img.src}
              className="d-block w-100 food-spot-img"
              alt={img.alt}
            />
          </Carousel.Item>
        ))}
      </Carousel>

      <Card.Body>
        <div className="d-flex flex-wrap align-items-center justify-content-between gap-2 mb-2">
          <div className="d-flex flex-wrap gap-2">
            <Badge bg="dark">{spot.city}</Badge>
            <Badge bg="primary">{spot.category}</Badge>
            {spot.price && <Badge bg="secondary">{spot.price}</Badge>}
          </div>

          {typeof spot.rating === "number" && (
            <Badge bg="warning" text="dark">
              ★ {spot.rating.toFixed(1)}
            </Badge>
          )}
        </div>

        <Card.Title as="h2" className="h4 mb-2">
          {spot.name}
        </Card.Title>

        <Card.Text className="text-muted mb-3">{spot.description}</Card.Text>

        {spot.mustTry?.length ? (
          <div className="d-flex flex-wrap gap-2 mb-3">
            {spot.mustTry.map((item) => (
              <Badge key={item} bg="light" text="dark">
                {item}
              </Badge>
            ))}
          </div>
        ) : null}

        <div className="d-grid">
          <Button
            type="button"
            variant="success"
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
