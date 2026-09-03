import { Link } from "react-router-dom";
import "./Traditions.css";

const traditions = [
  {
    name: "Advaita Vedanta",
    slug: "advaita-vedanta",
    subtitle: "The philosophy of non-duality.",
    description:
      "One of the major Vedanta traditions, associated especially with Shankara, that emphasizes the non-dual nature of ultimate reality.",
    interpreter: "Shankara",
  },
  {
    name: "Vishishtadvaita Vedanta",
    slug: "vishishtadvaita-vedanta",
    subtitle: "Non-duality with distinction.",
    description:
      "A Vedanta tradition associated especially with Ramanuja, offering a distinctive understanding of the relationship between the individual self, the world and ultimate reality.",
    interpreter: "Ramanuja",
  },
];

export default function Traditions() {
  return (
    <main className="traditions-page">
      <header className="traditions-hero">
        <div className="container">
          <Link
            to="/"
            className="traditions-back"
          >
            ← BACK TO PARAMPARA
          </Link>

          <span className="traditions-eyebrow">
            PHILOSOPHICAL TRADITIONS
          </span>

          <h1 className="traditions-title">
            Ways of reading
            <br />
            <em>the tradition.</em>
          </h1>

          <p className="traditions-intro">
            Indian texts have been studied, interpreted and
            transmitted through many philosophical traditions.
            Explore the ideas behind some of the interpretive
            traditions connected to PARAMPARA's source tracing.
          </p>
        </div>
      </header>

      <section className="traditions-list section">
        <div className="container">
          <div className="traditions-list__heading">
            <span>01</span>
            <span>EXPLORE TRADITIONS</span>
          </div>

          <div className="traditions-grid">
            {traditions.map((tradition, index) => (
              <Link
                to={`/traditions/${tradition.slug}`}
                className="tradition-card"
                key={tradition.slug}
              >
                <div className="tradition-card__top">
                  <span>
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <span className="tradition-card__arrow">
                    ↗
                  </span>
                </div>

                <div className="tradition-card__content">
                  <span className="tradition-card__eyebrow">
                    {tradition.interpreter}
                  </span>

                  <h2>{tradition.name}</h2>

                  <p className="tradition-card__subtitle">
                    {tradition.subtitle}
                  </p>

                  <p className="tradition-card__description">
                    {tradition.description}
                  </p>
                </div>

                <span className="tradition-card__explore">
                  EXPLORE TRADITION →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}