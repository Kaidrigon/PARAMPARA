import { Link, useParams } from "react-router-dom";
import "./Tradition.css";

const traditionData = {
  "advaita-vedanta": {
    name: "Advaita Vedanta",
    shortName: "Advaita",
    subtitle: "The philosophy of non-duality.",
    interpreter: "Shankara",

    what:
      "Advaita Vedanta is one of the major traditions of Vedanta philosophy. The word Advaita is commonly understood as “not two”, expressing its emphasis on the non-dual nature of ultimate reality.",

    importance:
      "Advaita became one of the influential ways of interpreting the Upanishads, the Bhagavad Gita and the Brahma Sutras. Its philosophical vocabulary and commentarial tradition have had a lasting influence on Indian intellectual history.",

    ideas: [
      {
        title: "Brahman",
        text:
          "Ultimate reality, understood in Advaita as non-dual and beyond ordinary distinctions.",
      },
      {
        title: "Atman",
        text:
          "The self, whose deepest nature is understood in relation to Brahman.",
      },
      {
        title: "Maya",
        text:
          "A concept used to explain the appearance of multiplicity and the way ordinary experience is understood.",
      },
      {
        title: "Moksha",
        text:
          "Liberation understood through knowledge of the true nature of reality and the self.",
      },
    ],

    gita:
      "Advaita provides one philosophical framework through which passages of the Bhagavad Gita can be interpreted. Shankara's commentary is especially important for understanding how this tradition reads the Gita's teachings on action, knowledge and liberation.",

    sourceNote:
      "PARAMPARA uses interpretive summaries rather than reproducing copyrighted commentary. Specific source references will be attached to individual interpretation records as the knowledge base expands.",
  },

  "vishishtadvaita-vedanta": {
    name: "Vishishtadvaita Vedanta",
    shortName: "Vishishtadvaita",
    subtitle: "Non-duality with distinction.",
    interpreter: "Ramanuja",

    what:
      "Vishishtadvaita Vedanta is a major Vedanta tradition associated especially with Ramanuja. Its name is commonly translated as “qualified non-dualism”, expressing a distinctive understanding of unity together with real distinctions.",

    importance:
      "The tradition became an influential framework for interpreting the Upanishads, the Bhagavad Gita and the Brahma Sutras. It also played an important role in the development of Vaishnava philosophical and devotional thought.",

    ideas: [
      {
        title: "Brahman",
        text:
          "Ultimate reality understood as possessing attributes and understood through a relationship with the individual self and the world.",
      },
      {
        title: "Self",
        text:
          "Individual selves are understood as real and distinct while remaining inseparably related to ultimate reality.",
      },
      {
        title: "World",
        text:
          "The world is treated as real rather than simply an appearance to be dismissed.",
      },
      {
        title: "Moksha",
        text:
          "Liberation is understood within a framework of knowledge, devotion and relationship with the ultimate reality.",
      },
    ],

    gita:
      "Vishishtadvaita offers another philosophical framework for reading the Bhagavad Gita. Ramanuja's interpretation gives particular importance to devotion, duty and the relationship between the individual self and the supreme reality.",

    sourceNote:
      "PARAMPARA uses interpretive summaries rather than reproducing copyrighted commentary. Specific source references will be attached to individual interpretation records as the knowledge base expands.",
  },
};

export default function Tradition() {
  const { slug } = useParams();
  const tradition = traditionData[slug];

  if (!tradition) {
    return (
      <main className="tradition-page">
        <div className="container tradition-not-found">
          <span>404</span>
          <h1>Tradition not found.</h1>
          <Link to="/traditions">
            ← Explore traditions
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="tradition-page">
      {/* HERO */}
      <header className="tradition-hero">
        <div className="container">
          <Link
            to="/traditions"
            className="tradition-back"
          >
            ← ALL TRADITIONS
          </Link>

          <div className="tradition-hero__meta">
            <span>PHILOSOPHICAL TRADITION</span>
            <span>{tradition.interpreter}</span>
          </div>

          <h1>{tradition.name}</h1>

          <p className="tradition-hero__subtitle">
            {tradition.subtitle}
          </p>
        </div>
      </header>

      {/* WHAT IS IT */}
      <section className="tradition-section section">
        <div className="container">
          <SectionLabel
            number="01"
            label="WHAT IS IT?"
          />

          <div className="tradition-section__grid">
            <h2>Starting with the basics.</h2>

            <p>{tradition.what}</p>
          </div>
        </div>
      </section>

      {/* WHY IT MATTERS */}
      <section className="tradition-section tradition-section--alt section">
        <div className="container">
          <SectionLabel
            number="02"
            label="WHY DOES IT MATTER?"
          />

          <div className="tradition-section__grid">
            <h2>Ideas that travelled through time.</h2>

            <p>{tradition.importance}</p>
          </div>
        </div>
      </section>

      {/* KEY IDEAS */}
      <section className="tradition-section section">
        <div className="container">
          <SectionLabel
            number="03"
            label="KEY IDEAS"
          />

          <div className="idea-grid">
            {tradition.ideas.map((idea, index) => (
              <article
                className="idea-card"
                key={idea.title}
              >
                <span className="idea-card__number">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <h3>{idea.title}</h3>

                <p>{idea.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* GITA CONNECTION */}
      <section className="tradition-section tradition-section--dark section">
        <div className="container">
          <SectionLabel
            number="04"
            label="THE BHAGAVAD GITA"
          />

          <div className="tradition-gita">
            <h2>
              How does this tradition
              <br />
              read the Gita?
            </h2>

            <p>{tradition.gita}</p>
          </div>
        </div>
      </section>

      {/* SOURCE */}
      <section className="tradition-section section">
        <div className="container">
          <SectionLabel
            number="05"
            label="SOURCES"
          />

          <div className="tradition-source">
            <div>
              <span className="tradition-source__eyebrow">
                PARAMPARA SOURCE NOTE
              </span>

              <h2>
                Explanation is not
                <br />
                the same as evidence.
              </h2>
            </div>

            <p>{tradition.sourceNote}</p>
          </div>
        </div>
      </section>

      {/* NAVIGATION */}
      <section className="tradition-next">
        <div className="container">
          <Link to="/traditions">
            ← EXPLORE OTHER TRADITIONS
          </Link>

          <Link to="/">
            RETURN TO PARAMPARA →
          </Link>
        </div>
      </section>
    </main>
  );
}

function SectionLabel({ number, label }) {
  return (
    <div className="tradition-section__label">
      <span>{number}</span>
      <span>{label}</span>
    </div>
  );
}