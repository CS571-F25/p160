import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function CityFilterSearch({
  search,
  onSearchChange,
  city,
  onCityChange,
  cities,
}) {
  return (
    <Form className="mb-3">
      <Row>
        <Col md={6} className="mb-2">
          <Form.Control
            type="text"
            placeholder="Search by name or keyword..."
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </Col>
        <Col md={4} className="mb-2">
          <Form.Select
            value={city}
            onChange={(e) => onCityChange(e.target.value)}
          >
            <option value="All">All cities</option>
            {cities.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </Form.Select>
        </Col>
      </Row>
    </Form>
  );
}
