import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";

export default function HistoricalSection({ site, onAddToItinerary }) {
  return (
    <section
      id={site.slug}
      className="hist-section fade-up"
      aria-labelledby={`${site.slug}-title`}
    >
      <div className="hist-media">
        <img
          src={site.heroImage}
          alt={site.heroAlt}
          className="hist-hero-img"
        />
      </div>

      <div className="hist-content">
        <div className="d-flex flex-wrap align-items-center gap-2 mb-2">
          <Badge bg="dark">{site.city}</Badge>
          <Badge bg="secondary">{site.category}</Badge>
          {site.era && <Badge bg="light" text="dark">{site.era}</Badge>}
          {site.timeToVisit && (
            <Badge bg="light" text="dark">⏱ {site.timeToVisit}</Badge>
          )}
        </div>

        <h2 id={`${site.slug}-title`} className="hist-title">
          {site.name}
        </h2>

        <p className="hist-lede">{site.lede}</p>

        <div className="hist-grid">
          <div className="hist-block">
            <h3 className="h6">History</h3>
            {site.history.map((p, i) => (
              <p key={i} className="mb-2">{p}</p>
            ))}
          </div>

          <div className="hist-block">
            <h3 className="h6">What to do</h3>
            <ul className="mb-0">
              {site.thingsToDo.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
          </div>

          <div className="hist-block">
            <h3 className="h6">Tips</h3>
            <ul className="mb-0">
              {site.tips.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-3 d-flex flex-wrap gap-2">
          <Button
            variant="primary"
            onClick={() => onAddToItinerary?.(site)}
            aria-label={`Add ${site.name} to itinerary`}
          >
            Add to Itinerary
          </Button>

          {site.learnMoreHref && (
            <Button
              variant="outline-secondary"
              href={site.learnMoreHref}
              target="_blank"
              rel="noreferrer"
            >
              Learn more
            </Button>
          )}
        </div>
      </div>
    </section>
  );
}
