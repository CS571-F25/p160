import { useEffect, useMemo, useState } from "react";
import {
  Alert,
  Badge,
  Button,
  Card,
  Col,
  Form,
  ListGroup,
  Row,
  Tab,
  Tabs,
} from "react-bootstrap";

const CHECKLIST_STORAGE_KEY = "serbtour_travel_checklist_v1";

export default function TravelTips() {
  const checklistItems = useMemo(
    () => [
      { id: "cash", label: "Carry some cash for small shops/cafés" },
      { id: "offline", label: "Download offline maps (or save key locations)" },
      { id: "sim", label: "Plan phone data (SIM/eSIM) and emergency contacts" },
      { id: "taxi", label: "Use official taxis / agree on meter before rides" },
      { id: "transit", label: "Learn how to buy/validate local transit tickets" },
      { id: "etiquette", label: "Pack modest clothing for churches/monasteries" },
    ],
    []
  );

  const [checked, setChecked] = useState(() => {
    try {
      const raw = localStorage.getItem(CHECKLIST_STORAGE_KEY);
      if (!raw) return {};
      const parsed = JSON.parse(raw);
      return typeof parsed === "object" && parsed ? parsed : {};
    } catch {
      return {};
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(CHECKLIST_STORAGE_KEY, JSON.stringify(checked));
    } catch {
      // ignore storage failures
    }
  }, [checked]);

  const completedCount = checklistItems.filter((i) => checked[i.id]).length;

  const toggleItem = (id) => {
    setChecked((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const clearChecklist = () => setChecked({});

  return (
    <div className="pt-4 mt-5">
      {/* H1 (no skipped heading levels) */}
      <Card className="shadow-sm mb-4 fade-up travel-hero">
  <Card.Body className="py-4">
    <div className="d-flex flex-column gap-2">

      <h1 className="mb-0 travel-title">
        About <span className="discover-gradient fw-bold">SerbTour</span>
      </h1>

      <p className="text-muted mb-0">
        Transportation, safety, etiquette — plus a checklist you can save as you plan.
      </p>
    </div>
  </Card.Body>
</Card>


      <Row className="g-3">
        <Col lg={8}>
          <Card className="shadow-sm">
            <Card.Body>
            <h2 className="h4 mb-3">
                Travel Tips for <span className="discover-gradient fw-bold">Serbia</span>
            </h2>


              {/* Optional image (ensure you add this file to /public/images/) */}
              <img
                src="./images/travel-tips.jpg"
                alt="Scenic landscape in Serbia used as a travel tips banner"
                className="img-fluid rounded mb-3"
              />

              <p className="mb-3">
                This page is a quick, practical guide to help you feel confident
                getting around Serbia—covering transportation, safety basics, and
                local etiquette. Use the tabs below to browse, and use the
                checklist to prep your trip.
              </p>

              <Alert variant="info" className="mb-3">
                <strong>Reminder:</strong> Travel details can change. For
                time-sensitive items (tickets, routes, advisories), double-check
                official or local sources when you arrive.
              </Alert>

              <Tabs defaultActiveKey="transportation" className="mb-3">
                <Tab eventKey="transportation" title="Transportation">
                  <h3 className="h5 mt-3">Getting around</h3>
                  <ListGroup className="mb-3">
                    <ListGroup.Item>
                      <strong>City transit:</strong> Most cities have buses/trams.
                      Look for official ticketing/validation rules and keep proof
                      of payment.
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <strong>Taxis:</strong> Prefer official taxi stands or reputable
                      companies. Ask for the meter (or price estimate) before
                      departing when possible.
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <strong>Intercity travel:</strong> Buses are common between
                      major cities. Trains exist on some routes; check schedules
                      ahead of time.
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <strong>Walking:</strong> Central areas are often walkable.
                      Comfortable shoes help—cobblestone streets are common.
                    </ListGroup.Item>
                  </ListGroup>

                  <h3 className="h5">Quick tip</h3>
                  <p className="mb-0">
                    Save your accommodation location and key landmarks offline so
                    you can navigate even without data.
                  </p>
                </Tab>

                <Tab eventKey="safety" title="Safety">
                  <h3 className="h5 mt-3">General safety</h3>
                  <ListGroup className="mb-3">
                    <ListGroup.Item>
                      <strong>Situational awareness:</strong> In crowded areas,
                      keep valuables secure and avoid leaving bags unattended.
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <strong>At night:</strong> Stick to well-lit streets and
                      travel with friends if you can (especially in unfamiliar areas).
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <strong>Money:</strong> Use ATMs in well-lit, busy locations.
                      Keep a backup card stored separately.
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <strong>Scams:</strong> Be cautious of unsolicited “help,”
                      especially around tourist hotspots.
                    </ListGroup.Item>
                  </ListGroup>

                  <Alert variant="warning" className="mb-0">
                    If you’re ever unsure, ask your hotel/host or a nearby business
                    for guidance on safe routes and reputable taxi services.
                  </Alert>
                </Tab>

                <Tab eventKey="etiquette" title="Etiquette">
                  <h3 className="h5 mt-3">Cultural etiquette</h3>
                  <ListGroup className="mb-3">
                    <ListGroup.Item>
                      <strong>Greetings:</strong> A friendly “hello” and eye contact
                      go a long way. Handshakes are common in formal settings.
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <strong>Dining:</strong> Meals can be social and unhurried.
                      It’s polite to wait for everyone before starting.
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <strong>Religious sites:</strong> Dress modestly (cover shoulders
                      and knees when possible). Speak quietly and be respectful.
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <strong>Tipping:</strong> Often appreciated. If you tip, keep it
                      simple—rounding up or a small percentage is typical.
                    </ListGroup.Item>
                  </ListGroup>

                  <h3 className="h5">Useful phrases</h3>
                  <ul className="mb-0">
                    <li><strong>Zdravo</strong> — Hi</li>
                    <li><strong>Hvala</strong> — Thank you</li>
                    <li><strong>Molim</strong> — Please / You’re welcome</li>
                    <li><strong>Izvinite</strong> — Excuse me / Sorry</li>
                  </ul>
                </Tab>
              </Tabs>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={4}>
          <Card className="shadow-sm">
            <Card.Body>
              <h2 className="h4 mb-2">Trip Checklist</h2>
              <p className="text-muted mb-3">
                Mark these off as you prep. Saved automatically.
              </p>

              <div className="mb-3">
                <Badge bg={completedCount === checklistItems.length ? "success" : "secondary"}>
                  {completedCount}/{checklistItems.length} completed
                </Badge>
              </div>

              <Form>
                {checklistItems.map((item) => (
                  <Form.Check
                    key={item.id}
                    id={`check-${item.id}`}
                    type="checkbox"
                    className="mb-2"
                    label={item.label}          // labeled input (accessibility)
                    checked={!!checked[item.id]}
                    onChange={() => toggleItem(item.id)}
                  />
                ))}

                <div className="d-flex gap-2 mt-3">
                  <Button
                    type="button"
                    variant="outline-secondary"
                    onClick={clearChecklist}
                  >
                    Clear
                  </Button>
                  <Button
                    type="button"
                    variant="primary"
                    onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                  >
                    Back to top
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>

          <Card className="shadow-sm mt-3">
            <Card.Body>
              <h2 className="h4 mb-2">About this project</h2>
              <p className="mb-0">
                SerbTour is a student-built travel guide showcasing places to eat,
                go out, and explore—plus tools to save favorites into an itinerary.
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
