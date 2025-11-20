import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ItinerarySidebar from "../components/ItinerarySidebar.jsx";

export default function ItineraryPage({ itinerary, onRemoveFromItinerary }) {
  return (
    <>
      <h1 className="mb-3">Your Serbia Itinerary</h1>
      <Row>
        <Col md={8} className="mb-3">
          <p>
            This is your saved list of places from Food, Nightlife, and
            Historical Sites. You can show this to friends, tweak it, or use it
            as a base for booking.
          </p>
        </Col>
        <Col md={4}>
          <ItinerarySidebar
            itinerary={itinerary}
            onRemove={onRemoveFromItinerary}
          />
        </Col>
      </Row>
    </>
  );
}
