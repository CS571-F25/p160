import { useState } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";
import { FaArrowUp, FaArrowDown, FaGripVertical, FaTimes } from "react-icons/fa";

export default function ItinerarySidebar({ itinerary, onRemove, onReorder }) {
  const [draggingIndex, setDraggingIndex] = useState(null);

  if (itinerary.length === 0) {
    return <p className="text-muted mb-0">Your itinerary is empty. Add places from the tabs!</p>;
  }

  const move = (from, to) => {
    if (to < 0 || to >= itinerary.length || from === to) return;
    const next = [...itinerary];
    const [item] = next.splice(from, 1);
    next.splice(to, 0, item);
    onReorder(next);
  };

  const onDragStart = (e, idx) => {
    setDraggingIndex(idx);
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", String(idx));
  };

  const onDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const onDrop = (e, idx) => {
    e.preventDefault();
    const from = Number(e.dataTransfer.getData("text/plain"));
    if (Number.isNaN(from)) return;
    move(from, idx);
    setDraggingIndex(null);
  };

  const onDragEnd = () => setDraggingIndex(null);

  return (
    <ListGroup className="it-list">
      {itinerary.map((item, idx) => (
        <ListGroup.Item
          key={item.id}
          className={`it-row d-flex gap-2 align-items-start ${draggingIndex === idx ? "it-dragging" : ""}`}
          draggable
          onDragStart={(e) => onDragStart(e, idx)}
          onDragOver={onDragOver}
          onDrop={(e) => onDrop(e, idx)}
          onDragEnd={onDragEnd}
        >
          <div className="it-handle" aria-hidden="true" title="Drag to reorder">
            <FaGripVertical />
          </div>

          <div className="flex-grow-1">
            <div className="d-flex justify-content-between gap-2">
              <div>
                <div className="fw-semibold">{item.name}</div>
                <div className="text-muted small">
                  {item.city} • {item.category}
                </div>
              </div>

              <Badge bg="dark" className="align-self-start">
                #{idx + 1}
              </Badge>
            </div>

            <div className="d-flex gap-2 mt-2 flex-wrap">
              <Button
                variant="outline-secondary"
                size="sm"
                onClick={() => move(idx, idx - 1)}
                disabled={idx === 0}
                aria-label={`Move ${item.name} up`}
              >
                <FaArrowUp />
              </Button>

              <Button
                variant="outline-secondary"
                size="sm"
                onClick={() => move(idx, idx + 1)}
                disabled={idx === itinerary.length - 1}
                aria-label={`Move ${item.name} down`}
              >
                <FaArrowDown />
              </Button>

              <Button
                variant="outline-danger"
                size="sm"
                onClick={() => onRemove(item.id)}
                aria-label={`Remove ${item.name}`}
              >
                <FaTimes className="me-1" />
                Remove
              </Button>
            </div>
          </div>
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
}
