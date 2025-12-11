import { useMemo, useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";
import Modal from "react-bootstrap/Modal";
import { FaTrash, FaRegCopy } from "react-icons/fa";

import ItinerarySidebar from "../components/ItinerarySidebar.jsx";

export default function ItineraryPage({
  itinerary,
  onRemoveFromItinerary,
  onReorderItinerary,
  onClearItinerary,
}) {
  const [showClear, setShowClear] = useState(false);

  const summary = useMemo(() => {
    const byCity = {};
    const byCategory = {};
    itinerary.forEach((x) => {
      byCity[x.city] = (byCity[x.city] || 0) + 1;
      byCategory[x.category] = (byCategory[x.category] || 0) + 1;
    });
    return { byCity, byCategory };
  }, [itinerary]);

  const copyToClipboard = async () => {
    const lines = itinerary.map(
      (x, i) => `${i + 1}. ${x.name} — ${x.city} • ${x.category}`
    );
    const text =
      `SerbTour Itinerary (${itinerary.length} items)\n\n` + lines.join("\n");

    try {
      await navigator.clipboard.writeText(text);
      alert("Copied itinerary to clipboard!");
    } catch {
      alert("Could not copy. Your browser may block clipboard access.");
    }
  };

  return (
    <div className="pt-4 mt-5">
      <Card className="it-hero shadow-sm mb-4 fade-up">
        <Card.Body className="d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-3">
          <div>
            <h1 className="mb-1">
              Your <span className="discover-gradient fw-bold">SerbTour</span>{" "}
              Itinerary
            </h1>
            <p className="text-muted mb-0">
              Drag items to reorder, or use the arrow buttons. Your itinerary is
              saved automatically.
            </p>
          </div>

          <div className="d-flex gap-2 flex-wrap">
            <Button
              variant="outline-secondary"
              onClick={copyToClipboard}
              disabled={itinerary.length === 0}
            >
              <FaRegCopy className="me-2" />
              Copy
            </Button>

            <Button
              variant="outline-danger"
              onClick={() => setShowClear(true)}
              disabled={itinerary.length === 0}
            >
              <FaTrash className="me-2" />
              Clear
            </Button>
          </div>
        </Card.Body>
      </Card>

      <Row className="g-4">
        {/* MAIN LIST */}
        <Col lg={8}>
          <Card className="shadow-sm it-main">
            <Card.Body>
              <div className="d-flex align-items-center justify-content-between mb-2">
                <h2 className="h5 mb-0">Your saved places</h2>
                <Badge bg="dark">{itinerary.length} total</Badge>
              </div>

              <ItinerarySidebar
                itinerary={itinerary}
                onRemove={onRemoveFromItinerary}
                onReorder={onReorderItinerary}
              />
            </Card.Body>
          </Card>
        </Col>

        {/* SUMMARY / STICKY TOOLS */}
        <Col lg={4}>
          <div className="it-side">
            <Card className="shadow-sm mb-3">
              <Card.Body>
                <h3 className="h6">Breakdown</h3>

                <div className="mb-3">
                  <div className="fw-semibold mb-1">By city</div>
                  {Object.keys(summary.byCity).length === 0 ? (
                    <div className="text-muted">Add places to see stats.</div>
                  ) : (
                    <div className="d-flex flex-wrap gap-2">
                      {Object.entries(summary.byCity).map(([k, v]) => (
                        <Badge key={k} bg="secondary">
                          {k}: {v}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>

                <div>
                  <div className="fw-semibold mb-1">By category</div>
                  {Object.keys(summary.byCategory).length === 0 ? (
                    <div className="text-muted">Food / Nightlife / Historical…</div>
                  ) : (
                    <div className="d-flex flex-wrap gap-2">
                      {Object.entries(summary.byCategory).map(([k, v]) => (
                        <Badge key={k} bg="info" text="dark">
                          {k}: {v}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              </Card.Body>
            </Card>

            <Card className="shadow-sm">
              <Card.Body>
                <h3 className="h6">Pro tip</h3>
                <p className="text-muted mb-0">
                  Start with one city, then cluster nearby spots. Put “must-do”
                  items at the top so you don’t miss them.
                </p>
              </Card.Body>
            </Card>
          </div>
        </Col>
      </Row>

      {/* Clear modal */}
      <Modal show={showClear} onHide={() => setShowClear(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Clear itinerary?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          This will remove all saved places. (Your itinerary is stored in localStorage.)
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowClear(false)}>
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              onClearItinerary();
              setShowClear(false);
            }}
          >
            Clear all
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
