import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

export default function Home() {
  return (
    <div className="d-flex justify-content-center">
      <Card className="text-center shadow-sm" style={{ maxWidth: "700px" }}>
        <Card.Body>
          <Card.Title as="h1" className="mb-3">
            Welcome to Discover Serbia
          </Card.Title>
          <Card.Text>
            Plan your trip to Serbia with curated recommendations for{" "}
            <strong>food</strong>, <strong>nightlife</strong>, and{" "}
            <strong>historical sites</strong>. Use the navigation bar to explore
            different parts of the country, filter by city, and build your own
            custom itinerary.
          </Card.Text>
          <Button href="#/food" variant="primary">
            Start with food
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
}
