import { Link, useParams } from "react-router-dom";

import "./Tradition.css";

const traditionData = {
  "advaita-vedanta": {
    name: "Advaita Vedanta",
    shortName: "Advaita",
    subtitle: "The philosophy of non-duality.",
    interpreter: "Śaṅkara",

    what:
      "Advaita Vedanta is one of the major traditions of Vedanta philosophy. The word Advaita is commonly translated as “not two” or “non-dual”. Its central philosophical claim is that Brahman is ultimate reality and that the deepest nature of the self, ātman, is not ultimately different from Brahman.",

    importance:
      "Advaita became one of the most influential ways of interpreting the Upanishads, the Bhagavad Gita and the Brahma Sutras. Śaṅkara was a major systematizer and defender of this tradition, developing detailed arguments about reality, consciousness, knowledge and liberation.",

    ideas: [
      {
        title: "Brahman",
        text:
          "Ultimate reality. Advaita understands Brahman as non-dual and not ultimately divided by the distinctions found in ordinary experience.",
      },
      {
        title: "Ātman",
        text:
          "The self. Advaita holds that the deepest nature of the self is not ultimately separate from Brahman.",
      },
      {
        title: "Māyā",
        text:
          "A concept used in Advaita's account of ordinary experience, appearance and the distinction between empirical reality and ultimate reality.",
      },
      {
        title: "Moksha",
        text:
          "Liberation. Advaita connects liberation with knowledge of the true nature of the self and Brahman.",
      },
    ],

    gita:
      "Śaṅkara's Bhagavad Gita commentary provides an important Advaita reading of the text. His interpretation gives a significant place to knowledge, while also explaining the role of action and duty within the path toward liberation.",

    perspective:
      "For Advaita, the Gita is not simply a collection of motivational statements. Its teachings on action, knowledge and liberation are understood within a larger philosophical account of the self and ultimate reality.",

    sourceNote:
      "This page is an introductory explanation, not a replacement for the primary texts. PARAMPARA separates the Gita's Sanskrit text from later commentaries so that an interpretation by Śaṅkara is not presented as though it were the verse itself.",

    sources: [
      {
        title: "Śaṅkara — Bhagavad Gita Bhashya",
        type: "PRIMARY SOURCE",
        description:
          "Śaṅkara's commentary on the Bhagavad Gita and an important source for studying the Advaita interpretation of the text.",
        route: "/sources/shankara-gita-bhashya",
      },
      {
        title: "Śaṅkara — Brahma Sutra Bhashya",
        type: "PRIMARY SOURCE",
        description:
          "A major philosophical work for understanding the wider structure of Śaṅkara's Advaita Vedanta.",
        route: "/sources/shankara-brahma-sutra-bhashya",
      },
      {
        title: "Stanford Encyclopedia of Philosophy — Śaṅkara",
        type: "SCHOLARLY SOURCE",
        description:
          "A detailed scholarly introduction to Śaṅkara, Advaita metaphysics, Brahman, ātman, māyā and liberation.",
        route: "/sources/shankara",
      },
    ],
  },

  "vishishtadvaita-vedanta": {
    name: "Vishishtadvaita Vedanta",
    shortName: "Vishishtadvaita",
    subtitle: "Non-duality with distinction.",
    interpreter: "Rāmānuja",

    what:
      "Vishishtadvaita Vedanta is a major Vedanta tradition associated especially with Rāmānuja. Its name is commonly translated as “qualified non-dualism”. More literally, it can be understood as a non-duality that includes real distinctions within the unified whole.",

    importance:
      "Rāmānuja developed Vishishtadvaita into a systematic philosophical and theological tradition that interprets the Upanishads, Bhagavad Gita and Brahma Sutras through a strongly theistic framework. The tradition became especially important within Sri Vaishnava thought and devotional practice.",

    ideas: [
      {
        title: "Brahman",
        text:
          "The supreme reality, understood as a personal and qualified reality. Rāmānuja identifies Brahman with Nārāyaṇa/Viṣṇu.",
      },
      {
        title: "The Self",
        text:
          "Individual selves are real and distinct, while remaining inseparably dependent upon and related to the supreme reality.",
      },
      {
        title: "The World",
        text:
          "The world is real rather than simply an illusion. It exists dependently in relation to Brahman.",
      },
      {
        title: "Moksha",
        text:
          "Liberation is understood through knowledge, devotion, duty and the relationship between the individual self and the supreme reality.",
      },
    ],

    gita:
      "Rāmānuja's Bhagavad Gita commentary offers another major philosophical reading of the text. His interpretation places strong emphasis on devotion, duty, the reality of the individual self and its relationship with the supreme reality.",

    perspective:
      "Vishishtadvaita does not treat the individual self and the world as meaningless appearances. Instead, it understands them as real while remaining inseparably dependent upon Brahman.",

    sourceNote:
      "This page presents an introductory summary of Vishishtadvaita. PARAMPARA treats Rāmānuja's interpretation as an interpretation within a tradition rather than as the only possible meaning of the Bhagavad Gita.",

    sources: [
      {
        title: "Rāmānuja — Gita Bhashya",
        type: "PRIMARY SOURCE",
        description:
          "Rāmānuja's commentary on the Bhagavad Gita and a central source for studying the Vishishtadvaita interpretation of the text.",
        route: "/sources/ramanuja-gita-bhashya",
      },
      {
        title: "Rāmānuja — Sri Bhashya",
        type: "PRIMARY SOURCE",
        description:
          "Rāmānuja's major commentary on the Brahma Sutras and one of the central philosophical works of Vishishtadvaita.",
        route: "/sources/ramanuja-sri-bhashya",
      },
      {
        title: "Internet Encyclopedia of Philosophy — Rāmānuja",
        type: "SCHOLARLY SOURCE",
        description:
          "A scholarly overview of Rāmānuja's metaphysics, theology, Vishishtadvaita and account of liberation.",
        route: "/sources/ramanuja",
      },
    ],
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
      {/* =====================================================
          HERO
      ===================================================== */}

      <header className="tradition-hero">
        <div className="container">
          <Link to="/traditions" className="tradition-back">
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

      {/* =====================================================
          WHAT IS IT?
      ===================================================== */}

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

      {/* =====================================================
          WHY IT MATTERS
      ===================================================== */}

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

      {/* =====================================================
          KEY IDEAS
      ===================================================== */}

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

      {/* =====================================================
          GITA CONNECTION
      ===================================================== */}

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

          <div className="tradition-gita__perspective">
            <span className="tradition-gita__perspective-label">
              PARAMPARA NOTE
            </span>

            <p>{tradition.perspective}</p>
          </div>
        </div>
      </section>

      {/* =====================================================
          SOURCES
      ===================================================== */}

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

          {/* =================================================
              RESEARCH SOURCES
          ================================================= */}

          <div className="tradition-research-list">
            {tradition.sources.map((source) => (
              <Link
                to={source.route}
                className="tradition-research-card"
                key={source.title}
                aria-label={`Open ${source.title}`}
              >
                <div className="tradition-research-card__top">
                  <span>{source.type}</span>

                  <span
                    className="tradition-research-card__arrow"
                    aria-hidden="true"
                  >
                    ↗
                  </span>
                </div>

                <h3>{source.title}</h3>

                <p>{source.description}</p>

                <span className="tradition-research-card__open">
                  EXPLORE SOURCE →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          NAVIGATION
      ===================================================== */}

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
