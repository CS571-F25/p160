import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";

export default function ItinerarySidebar({ itinerary, onRemove }) {
  if (itinerary.length === 0) {
    return <p>Your itinerary is empty. Start adding places from the tabs!</p>;
  }

  return (
    <ListGroup>
      {itinerary.map((item) => (
        <ListGroup.Item
          key={item.id}
          className="d-flex justify-content-between align-items-center"
        >
          <div>
            <strong>{item.name}</strong>
            <div className="text-muted">
              {item.city} • {item.category}
            </div>
          </div>
          <Button
            variant="outline-danger"
            size="sm"
            onClick={() => onRemove(item.id)}
          >
            Remove
          </Button>
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
}
