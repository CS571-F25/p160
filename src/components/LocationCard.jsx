import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

export default function LocationCard({ location, onAddToItinerary }) {
  return (
    <Card className="h-100 shadow-sm">
      <Card.Body>
        <Card.Title>{location.name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          {location.city} • {location.category}
        </Card.Subtitle>
        <Card.Text>{location.description}</Card.Text>
        <Button
          variant="primary"
          size="sm"
          onClick={() => onAddToItinerary(location)}
        >
          Add to itinerary
        </Button>
      </Card.Body>
    </Card>
  );
}
