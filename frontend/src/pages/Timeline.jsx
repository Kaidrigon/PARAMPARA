import { Link } from "react-router-dom";
import { useState } from "react";
import "./Timeline.css";

const timelineData = [
  {
    id: "upanishads",
    number: "01",
    period: "c. 800–200 BCE",
    dateNote: "Approximate · dating varies by text",
    title: "Upaniṣadic Foundations",
    subtitle: "Questions about self, reality and liberation.",
    category: "FOUNDATIONAL TEXTS",
    summary:
      "The Upaniṣads contain some of the earliest sustained philosophical discussions that later Vedānta traditions would interpret and debate.",
    detail:
      "Rather than being a single book written at one moment, the Upaniṣads are a collection of texts composed over a long period. They explore questions about ātman, Brahman, knowledge, reality and liberation. Later Vedānta traditions would repeatedly return to these texts when developing their own philosophical systems.",
    why:
      "This is where the questions become recognizable: What is the self? What is ultimate reality? How are they related? What does liberation mean?",
    sourceType: "PRIMARY TEXTUAL TRADITION",
    sourceNote:
      "The Upaniṣads themselves are primary sources for the philosophical material later interpreted by Vedānta traditions.",
    link: null,
  },

  {
    id: "gita",
    number: "02",
    period: "c. 2nd century BCE–2nd century CE",
    dateNote: "Approximate · scholarly dating debated",
    title: "Bhagavad Gītā",
    subtitle: "Action, knowledge, devotion and liberation.",
    category: "PRIMARY TEXT",
    summary:
      "The Bhagavad Gītā brings together discussions of action, knowledge, devotion, duty and liberation within the dramatic setting of the Mahābhārata.",
    detail:
      "The Gītā is presented as a dialogue between Arjuna and Kṛṣṇa before the battle of Kurukṣetra. Its teachings became central to many later philosophical and devotional traditions. Different Vedānta thinkers would read the same verses through very different philosophical frameworks.",
    why:
      "The Gītā becomes one of the major texts through which later thinkers argue about what liberation means and how knowledge, action and devotion relate to one another.",
    sourceType: "PRIMARY SOURCE",
    sourceNote:
      "The Bhagavad Gītā is itself a primary textual source. Later commentaries should not be confused with the Gītā's own verses.",
    link: null,
  },

  {
    id: "shankara",
    number: "03",
    period: "c. 8th century CE",
    dateNote: "Traditional and scholarly datings vary",
    title: "Śaṅkara",
    subtitle: "A systematic Advaita interpretation.",
    category: "PHILOSOPHER",
    summary:
      "Śaṅkara became one of the most influential interpreters of the Upaniṣads, Bhagavad Gītā and Brahma Sūtras from an Advaita Vedānta perspective.",
    detail:
      "Śaṅkara's philosophical project argues for a non-dual understanding of ultimate reality. His commentaries became foundational for later Advaita Vedānta, especially in discussions of Brahman, ātman, knowledge and liberation.",
    why:
      "The important point is not simply that Śaṅkara existed after the Gītā. He gives one particular philosophical reading of the Gītā and other foundational texts. That distinction is exactly why PARAMPARA separates primary texts from later interpretations.",
    sourceType: "INTERPRETIVE TRADITION",
    sourceNote:
      "Śaṅkara's Bhagavad Gītā Bhāṣya and Brahma Sūtra Bhāṣya are primary sources for studying Śaṅkara's own interpretation.",
    link: "/traditions/advaita-vedanta",
  },

  {
    id: "ramanuja",
    number: "04",
    period: "c. 11th–12th century CE",
    dateNote: "Traditional dating: 1017–1137 CE · scholarly dating debated",
    title: "Rāmānuja",
    subtitle: "Unity without erasing real distinction.",
    category: "PHILOSOPHER",
    summary:
      "Rāmānuja developed a systematic interpretation of Vedānta commonly known as Viśiṣṭādvaita, or qualified non-dualism.",
    detail:
      "Rāmānuja interprets Brahman as the supreme reality and maintains the reality of individual selves and the world. His philosophical system became deeply connected with Śrīvaiṣṇava theology and devotional practice.",
    why:
      "Rāmānuja demonstrates something important about Indian philosophical traditions: the same foundational texts can generate substantially different interpretations rather than one single uncontested answer.",
    sourceType: "INTERPRETIVE TRADITION",
    sourceNote:
      "Rāmānuja's Gītā Bhāṣya and Śrī Bhāṣya are major primary sources for studying his interpretation.",
    link: "/traditions/vishishtadvaita-vedanta",
  },

  {
    id: "madhva",
    number: "05",
    period: "c. 13th century CE",
    dateNote: "Traditionally 1238–1317 CE",
    title: "Madhva",
    subtitle: "Difference as philosophically real.",
    category: "PHILOSOPHER",
    summary:
      "Madhva developed Dvaita Vedānta, a strongly dualist interpretation emphasizing the real distinction between God, individual selves and the world.",
    detail:
      "Madhva's philosophy is commonly known as Dvaita, or dualism. It emphasizes real distinctions between the supreme reality, individual selves and the world. His writings include commentaries on major Vedānta texts and became foundational for the later Mādhva tradition.",
    why:
      "Madhva makes the timeline even more interesting: Vedānta did not develop into one single philosophical conclusion. Different thinkers argued for fundamentally different accounts of reality, self and liberation.",
    sourceType: "INTERPRETIVE TRADITION",
    sourceNote:
      "Madhva's commentarial works provide primary material for studying his Dvaita interpretation.",
    link: null,
  },
];

export default function Timeline() {
  const [activeId, setActiveId] = useState(null);

  const handleToggle = (id) => {
    setActiveId((currentId) => (currentId === id ? null : id));
  };

  const handleKeyDown = (event, id) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleToggle(id);
    }
  };

  return (
    <main className="timeline-page">
      {/* =====================================================
          HERO
      ===================================================== */}

      <header className="timeline-hero">
        <div className="container">
          <Link to="/" className="timeline-back">
            ← RETURN TO PARAMPARA
          </Link>

          <div className="timeline-hero__meta">
            <span>01</span>
            <span>TRACE THE IDEAS</span>
          </div>

          <h1>
            A tradition is
            <br />
            never just one moment.
          </h1>

          <p>
            Follow a few important textual and philosophical
            landmarks that shaped the traditions PARAMPARA
            explores.
          </p>
        </div>
      </header>

      {/* =====================================================
          TIMELINE
      ===================================================== */}

      <section className="timeline-section section">
        <div className="container">
          <div className="timeline-intro">
            <div>
              <span className="timeline-intro__eyebrow">
                HOW TO READ THIS
              </span>

              <h2>
                Five stops.
                <br />
                A much longer story.
              </h2>
            </div>

            <p>
              This is not a complete history of Indian philosophy.
              That would require considerably more than five cards
              and probably several lifetimes. Instead, these are
              selected landmarks that help explain how later Vedānta
              traditions developed. Later, open-source contributors
              can add more cards and perspectives. For more
              information, please refer to the About page.
            </p>
          </div>

          <div className="timeline">
            <div className="timeline__line" />

            {timelineData.map((event) => {
              const isActive = activeId === event.id;

              return (
                <div
                  key={event.id}
                  className={`timeline-event-wrapper ${
                    isActive ? "timeline-event-wrapper--active" : ""
                  }`}
                >
                  <div
                    className={`timeline-card ${
                      isActive ? "timeline-card--flipped" : ""
                    }`}
                  >
                    {/* =================================================
                        FRONT
                    ================================================= */}

                    <button
                      type="button"
                      className="timeline-card__face timeline-card__front"
                      onClick={() => handleToggle(event.id)}
                      onKeyDown={(e) => handleKeyDown(e, event.id)}
                      aria-expanded={isActive}
                      aria-label={`${isActive ? "Close" : "Open"} ${
                        event.title
                      }`}
                    >
                      <span className="timeline-event__marker">
                        <span>{event.number}</span>
                      </span>

                      <span className="timeline-card__front-content">
                        <span className="timeline-event__top">
                          <span>{event.period}</span>
                          <span>{event.category}</span>
                        </span>

                        <strong>{event.title}</strong>

                        <span className="timeline-event__subtitle">
                          {event.subtitle}
                        </span>

                        <span className="timeline-card__action">
                          <span>
                            {isActive ? "CLOSE" : "TRACE THIS STOP"}
                          </span>

                          <span className="timeline-card__arrow">
                            {isActive ? "↗" : "→"}
                          </span>
                        </span>
                      </span>
                    </button>

                    {/* =================================================
                        BACK
                    ================================================= */}

                    <div
                      className="timeline-card__face timeline-card__back"
                      aria-hidden={!isActive}
                    >
                      <div className="timeline-card__back-header">
                        <div className="timeline-card__back-heading">
                          <span className="timeline-card__number">
                            {event.number}
                          </span>

                          <span className="timeline-card__category">
                            {event.category}
                          </span>
                        </div>

                        <span className="timeline-card__date">
                          {event.period}
                        </span>
                      </div>

                      <div className="timeline-card__back-body">
                        <div className="timeline-card__back-title">
                          <h2>{event.title}</h2>

                          <p>{event.subtitle}</p>
                        </div>

                        <div className="timeline-card__copy">
                          <p className="timeline-card__summary">
                            {event.summary}
                          </p>

                          <p>{event.detail}</p>

                          <div className="timeline-card__why">
                            <span>WHY THIS MATTERS</span>

                            <p>{event.why}</p>
                          </div>

                          <div className="timeline-card__source">
                            <span>{event.sourceType}</span>

                            <p>{event.sourceNote}</p>
                          </div>

                          {event.link && (
                            <Link
                              to={event.link}
                              className="timeline-card__link"
                              onClick={(e) => e.stopPropagation()}
                            >
                              EXPLORE THIS TRADITION →
                            </Link>
                          )}
                        </div>
                      </div>

                      <button
                        type="button"
                        className="timeline-card__close"
                        onClick={() => handleToggle(event.id)}
                        aria-label={`Return to ${event.title} overview`}
                      >
                        <span>←</span>
                        <span>RETURN</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <p className="timeline-hint">
            <span>↗</span>
            Select a stop to trace the idea.
          </p>
        </div>
      </section>

      {/* =====================================================
          METHOD
      ===================================================== */}

      <section className="timeline-method section">
        <div className="container">
          <div className="timeline-method__grid">
            <div>
              <span className="timeline-method__eyebrow">
                PARAMPARA METHOD
              </span>

              <h2>
                Dates are useful.
                <br />
                False precision isn't.
              </h2>
            </div>

            <div>
              <p>
                Ancient texts and historical figures cannot always
                be placed on a perfectly clean timeline. Dates may
                be debated, traditions may preserve different
                chronologies, and texts may have developed over
                long periods.
              </p>

              <p>
                PARAMPARA therefore uses approximate dates when
                appropriate and labels uncertainty instead of
                quietly turning a scholarly debate into a neat
                number.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          BOTTOM NAV
      ===================================================== */}

      <section className="timeline-next">
        <div className="container">
          <Link to="/traditions">EXPLORE TRADITIONS →</Link>

          <Link to="/">RETURN TO PARAMPARA →</Link>
        </div>
      </section>
    </main>
  );
}