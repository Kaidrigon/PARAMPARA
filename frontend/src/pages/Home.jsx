import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import TraceJourney from "../components/trace/TraceJourney";

import { traceClaim } from "../api/trace";

import "./Home.css";

const layers = [
  {
    number: "01",
    title: "PRIMARY TEXT",
    question: "What does the source actually say?",
    meta: "TEXTUAL EVIDENCE",
  },

  {
    number: "02",
    title: "INTERPRETATION",
    question: "How have traditions understood it?",
    meta: "COMMENTARY",
  },

  {
    number: "03",
    title: "TRADITION",
    question: "How has the idea lived beyond the page?",
    meta: "PRACTICE · MEMORY · CULTURE",
  },

  {
    number: "04",
    title: "MODERN CLAIM",
    question: "What is being said about it today?",
    meta: "VERIFY · QUESTION · CONTEXTUALIZE",
  },
];

const questions = [
  "Does the Gita actually say what people claim it says?",
  "What does “dharma” mean in its original context?",
  "How did different traditions interpret karma?",
  "Which claims come from the text — and which came later?",
];

const timeline = [
  ["01", "TEXT", "SOURCE"],
  ["02", "COMMENTARY", "INTERPRETATION"],
  ["03", "TRADITION", "TRANSMISSION"],
  ["04", "TODAY", "MODERN CLAIM"],
];

function Reveal({ children, className = "" }) {
  return <div className={`reveal ${className}`}>{children}</div>;
}

function ExploreCard({
  number,
  title,
  description,
  label,
  to,
}) {
  const card = (
    <article className="explore-card">
      <div className="explore-card__top">
        <span>{number}</span>

        <span className="explore-card__arrow">
          ↗
        </span>
      </div>

      <div className="explore-card__content">
        <h3>{title}</h3>

        <p>{description}</p>
      </div>

      <div className="explore-card__label">
        {label} →
      </div>
    </article>
  );

  if (to) {
    return (
      <Link
        to={to}
        className="explore-card-link"
        aria-label={`Explore ${title}`}
      >
        {card}
      </Link>
    );
  }

  return card;
}

function PeacockTrace({ className = "" }) {
  return (
    <div
      className={`peacock-trace ${className}`}
      aria-hidden="true"
    >
      <span className="peacock-trace__line peacock-trace__line--one" />
      <span className="peacock-trace__line peacock-trace__line--two" />
      <span className="peacock-trace__line peacock-trace__line--three" />
      <span className="peacock-trace__line peacock-trace__line--four" />

      <span className="peacock-eye" />
    </div>
  );
}

function SketchMark({ type, className = "" }) {
  return (
    <span
      className={`sketch-mark sketch-mark--${type} ${className}`}
      aria-hidden="true"
    />
  );
}

export default function Home() {
  const [activeLayer, setActiveLayer] = useState(0);
  const [scrolled, setScrolled] = useState(false);

  const [claimInput, setClaimInput] = useState("");
  const [traceResult, setTraceResult] = useState(null);
  const [traceLoading, setTraceLoading] = useState(false);
  const [traceError, setTraceError] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  async function handleTrace() {
    const claim = claimInput.trim();

    if (!claim) {
      setTraceError("Enter a claim to trace.");
      setTraceResult(null);
      return;
    }

    setTraceLoading(true);
    setTraceError("");
    setTraceResult(null);

    try {
      const result = await traceClaim(claim);

      setTraceResult(result);
    } catch (error) {
      console.error(error);

      setTraceError(
        "Unable to connect to PARAMPARA. Make sure the backend is running."
      );
    } finally {
      setTraceLoading(false);
    }
  }

  return (
    <main className="home">
      {/* =====================================================
          NAVBAR
      ===================================================== */}

      <nav
        className={`navbar ${
          scrolled ? "navbar--scrolled" : ""
        }`}
      >
        <div className="container navbar__inner">
          <a href="#" className="brand">
            <div className="brand__name">
              PARAMPARA
            </div>

            <div className="brand__sub">
              INDIAN KNOWLEDGE SYSTEMS
            </div>
          </a>

          <div className="navbar__links">
            <a href="#explore">Explore</a>

            <a href="/sources">Sources</a>

            <Link to="/traditions">
              Traditions
            </Link>

            <a href="/timeline">Timeline</a>

            <a href="https://github.com/Kaidrigon/PARAMPARA">About</a>

            <button
              className="nav-button"
              type="button"
              onClick={() => {
                document
                  .getElementById("explore")
                  ?.scrollIntoView({
                    behavior: "smooth",
                  });
              }}
            >
              BEGIN EXPLORING{" "}
              <span>→</span>
            </button>
          </div>

          <button
            className="mobile-menu-button"
            type="button"
            aria-label="Open menu"
          >
            ☰
          </button>
        </div>
      </nav>

      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="hero-section">
        <div className="hero-grid-background" />

        <div className="hero-circle hero-circle--large" />

        <div className="hero-circle hero-circle--small" />

        <SketchMark
          type="circle"
          className="hero-sketch hero-sketch--one"
        />

        <SketchMark
          type="ticks"
          className="hero-sketch hero-sketch--two"
        />

        <PeacockTrace className="peacock-trace--hero" />

        <div className="container hero-grid">
          <Reveal>
            <div className="hero-copy">
              <div className="eyebrow">
                <span />
                AN ARCHIVE OF INDIAN KNOWLEDGE
              </div>

              <h1>
                What was said.
                <br />

                <span className="muted-text">
                  What was taught.
                </span>

                <br />

                What we believe.
              </h1>

              <p className="hero-description">
                PARAMPARA traces ideas across primary
                texts, interpretations, traditions and
                modern claims — so you can explore Indian
                knowledge with context.
              </p>

              <div className="hero-actions">
                <button
                  className="button button--primary"
                  type="button"
                  onClick={() => {
                    document
                      .getElementById("explore")
                      ?.scrollIntoView({
                        behavior: "smooth",
                      });
                  }}
                >
                  EXPLORE THE ARCHIVE
                  <span>→</span>
                </button>

                <button
                  className="button button--secondary"
                  type="button"
                  onClick={() => {
                    document
                      .getElementById("timeline")
                      ?.scrollIntoView({
                        behavior: "smooth",
                      });
                  }}
                >
                  HOW IT WORKS
                </button>
              </div>

              <div className="hero-principle">
                <span>TEXT</span>
                <span>—</span>
                <span>CONTEXT</span>
                <span>—</span>
                <span>TRANSMISSION</span>
              </div>
            </div>
          </Reveal>

          {/* HERO ARTIFACT */}

          <Reveal className="hero-artifact-wrapper">
            <div className="hero-artifact">
              <div className="artifact-paper">
                <div className="artifact-header">
                  <span>ARCHIVE / 001</span>
                  <span>TEXT</span>
                </div>

                <div className="artifact-title">
                  <div className="sanskrit-title">
                    भगवद्गीता
                  </div>

                  <div className="english-title">
                    BHAGAVAD GITA
                  </div>
                </div>

                <div className="artifact-divider" />

                <div className="artifact-verse">
                  कर्मण्येवाधिकारस्ते
                  <br />
                  मा फलेषु कदाचन
                </div>

                <div className="artifact-description">
                  A fragment of a much larger conversation
                  on action, responsibility and knowledge.
                </div>

                <div className="artifact-footer">
                  <span>PARAMPARA</span>
                  <span>01 / 04</span>
                </div>
              </div>

              {/* Floating tags */}

              <button
                type="button"
                className={`artifact-tag artifact-tag--primary ${
                  activeLayer === 0 ? "active" : ""
                }`}
                onMouseEnter={() => setActiveLayer(0)}
              >
                PRIMARY SOURCE
              </button>

              <button
                type="button"
                className={`artifact-tag artifact-tag--interpretation ${
                  activeLayer === 1 ? "active" : ""
                }`}
                onMouseEnter={() => setActiveLayer(1)}
              >
                INTERPRETATION
              </button>

              <button
                type="button"
                className={`artifact-tag artifact-tag--tradition ${
                  activeLayer === 2 ? "active" : ""
                }`}
                onMouseEnter={() => setActiveLayer(2)}
              >
                TRADITION
              </button>

              <button
                type="button"
                className={`artifact-tag artifact-tag--modern ${
                  activeLayer === 3 ? "active" : ""
                }`}
                onMouseEnter={() => setActiveLayer(3)}
              >
                MODERN CLAIM
              </button>
            </div>
          </Reveal>
        </div>

        <div className="scroll-marker">
          SCROLL TO EXPLORE
          <span />
        </div>
      </section>

      {/* =====================================================
          TRANSMISSION
      ===================================================== */}

      <section className="transmission-section">
        <PeacockTrace className="peacock-trace--transmission" />

        <Reveal>
          <div className="narrow-content transmission-content">
            <div className="section-label">
              THE PARAMPARA PRINCIPLE
            </div>

            <h2>
              Knowledge survives
              <br />

              <span className="muted-text">
                through transmission.
              </span>
            </h2>

            <p>
              Ideas move from text to interpretation,
              from interpretation to tradition, and from
              tradition into the world we inhabit today.
            </p>
          </div>
        </Reveal>

        <Reveal>
          <div className="transmission-line">
            <div className="transmission-top">
              <span>TEXT</span>
              <span>→</span>
              <span>INTERPRETATION</span>
              <span>→</span>
              <span>TODAY</span>
            </div>

            <div className="line" />

            <div className="transmission-bottom">
              <span>PRIMARY SOURCE</span>
              <span />
              <span>TRADITION</span>
              <span />
              <span>MODERN CLAIM</span>
            </div>
          </div>
        </Reveal>
      </section>

      {/* =====================================================
          EXPLORE
      ===================================================== */}

      <section id="explore" className="explore-section">
        <div className="container">
          <SketchMark
            type="arrow"
            className="explore-sketch explore-sketch--one"
          />

          <Reveal>
            <div className="section-heading-row">
              <div>
                <div className="section-label">
                  EXPLORE
                </div>

                <h2>
                  Begin with a question.
                </h2>
              </div>

              <p>
                Explore ideas, texts and traditions through
                the layers that shaped them.
              </p>
            </div>
          </Reveal>

          <div className="explore-grid">
            <ExploreCard
              number="01"
              title="Bhagavad Gita"
              description="A dialogue on duty, action, knowledge and liberation — examined through text, commentary and tradition.(coming soon)"
              label="EXPLORE TEXT"
            />

            <ExploreCard
              number="02"
              title="Ideas"
              description="Dharma, karma, yoga, moksha, atman and other ideas traced through their different contexts.(coming soon)"
              label="EXPLORE CONCEPTS"
            />

            {/* =================================================
                LIVING TRADITIONS → JANMASHTAMI
            ================================================= */}

            <ExploreCard
              number="03"
              title="Living Traditions"
              description="How ideas move from text into practice, memory, interpretation and culture."
              label="EXPLORE JANMASHTAMI"
              to="/janmashtami"
            />
          </div>
        </div>
      </section>

      {/* =====================================================
          FOUR LAYERS
      ===================================================== */}

      <section className="layers-section">
        <div className="container">
          <PeacockTrace className="peacock-trace--layers" />

          <Reveal>
            <div className="layers-heading">
              <div className="section-label section-label--gold">
                METHOD
              </div>

              <h2>
                Not everything is
                <br />
                the same kind of knowledge.
              </h2>
            </div>
          </Reveal>

          <div className="layers-list">
            {layers.map((layer, index) => (
              <div
                key={layer.number}
                className={`layer-row ${
                  activeLayer === index
                    ? "layer-row--active"
                    : ""
                }`}
                onMouseEnter={() =>
                  setActiveLayer(index)
                }
              >
                <span className="layer-number">
                  {layer.number}
                </span>

                <h3>{layer.title}</h3>

                <p>{layer.question}</p>

                <span className="layer-meta">
                  {layer.meta}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          TIMELINE
      ===================================================== */}

      <section id="timeline" className="timeline-section">
        <div className="container">
          <Reveal>
            <div className="timeline-heading">
              <div className="section-label">
                TRACE
              </div>

              <h2>
                Ideas have
                <br />

                <span className="muted-text">
                  timelines.
                </span>
              </h2>

              <p>
                Follow an idea across centuries — from text
                to interpretation to living tradition.
              </p>
            </div>
          </Reveal>

          <Reveal>
            <div className="timeline">
              <div className="timeline-line" />

              <div className="timeline-items">
                {timeline.map(
                  ([number, title, subtitle]) => (
                    <div
                      className="timeline-item"
                      key={number}
                    >
                      <div className="timeline-number">
                        {number}
                      </div>

                      <button
                        type="button"
                        className="timeline-dot"
                        aria-label={title}
                      >
                        <span />
                      </button>

                      <div className="timeline-text">
                        <div>{title}</div>
                        <span>{subtitle}</span>
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* =====================================================
          QUESTIONS
      ===================================================== */}

      <section className="questions-section">
        <div className="container">
          <PeacockTrace className="peacock-trace--questions" />

          <Reveal>
            <div className="section-heading-row">
              <div>
                <div className="section-label">
                  QUESTIONS WORTH ASKING
                </div>

                <h2>Start somewhere.</h2>
              </div>

              <p>
                PARAMPARA isn't about telling you what to
                believe. It's about helping you trace where
                an idea came from.
              </p>
            </div>
          </Reveal>

          <div className="questions-grid">
            {questions.map((question, index) => (
              <Reveal key={question}>
                <button
                  type="button"
                  className="question-card"
                >
                  <div className="question-card__top">
                    <span>
                      0{index + 1}
                    </span>

                    <span className="question-arrow">
                      →
                    </span>
                  </div>

                  <h3>{question}</h3>
                </button>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          FEATURED SOURCE
      ===================================================== */}

      <section
        id="sources"
        className="featured-section"
      >
        <div className="narrow-container">
          <PeacockTrace className="peacock-trace--featured" />

          <Reveal>
            <div className="featured-card">
              <div className="featured-circle featured-circle--one" />

              <div className="featured-circle featured-circle--two" />

              <SketchMark
                type="cross"
                className="featured-sketch"
              />

              <div className="featured-content">
                <div className="featured-header">
                  <span className="gold-label">
                    FEATURED SOURCE
                  </span>

                  <span>
                    ARCHIVE / 001
                  </span>
                </div>

                <div className="featured-main">
                  <div className="featured-meta">
                    BHAGAVAD GITA · CHAPTER 2 · VERSE 47
                  </div>

                  <div className="featured-verse">
                    कर्मण्येवाधिकारस्ते
                    <br />
                    मा फलेषु कदाचन
                  </div>

                  <p>
                    Explore the verse, its textual context,
                    interpretations and the traditions through
                    which its meaning has been transmitted.
                  </p>
                </div>

                <div className="featured-tags">
                  <span>PRIMARY SOURCE</span>
                  <span>CONTEXT</span>
                  <span>INTERPRETATIONS</span>
                </div>

                <button
                  type="button"
                  className="featured-button"
                >
                  EXPLORE SOURCE →
                </button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* =====================================================
          TRACE CLAIM
      ===================================================== */}

      <section className="trace-section">
        <div className="narrow-container">
          <SketchMark
            type="circle"
            className="trace-sketch trace-sketch--one"
          />

          <Reveal>
            <div className="trace-heading">
              <div className="section-label section-label--gold">
                TRACE A CLAIM
              </div>

              <h2>
                Start with something
                <br />

                <span>
                  you've heard.
                </span>
              </h2>

              <p>
                Follow a claim back through its source,
                context, interpretation and transmission.
              </p>
            </div>
          </Reveal>

          <Reveal>
            <div className="trace-input-wrapper">
              <input
                type="text"
                placeholder="“Krishna says that…”"
                aria-label="Claim to trace"
                value={claimInput}
                onChange={(event) =>
                  setClaimInput(event.target.value)
                }
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    handleTrace();
                  }
                }}
              />

              <button
                type="button"
                onClick={handleTrace}
                disabled={traceLoading}
              >
                {traceLoading
                  ? "TRACING..."
                  : "TRACE →"}
              </button>
            </div>
          </Reveal>

          {traceError && (
            <div
              className="trace-error"
              role="alert"
            >
              {traceError}
            </div>
          )}

          {(traceResult || traceLoading) && (
            <Reveal>
              <TraceJourney
                result={traceResult}
                loading={traceLoading}
              />
            </Reveal>
          )}
        </div>
      </section>

      {/* =====================================================
          FINAL CTA
      ===================================================== */}

      <section
        id="about"
        className="final-section"
      >
        <PeacockTrace className="peacock-trace--final" />

        <Reveal>
          <div className="final-label">
            PARAMPARA
          </div>

          <h2>
            Begin with
            <br />

            <span>the source.</span>
          </h2>

          <p>
            Explore the texts, ideas and traditions that
            shaped Indian knowledge.
          </p>

          <button
            type="button"
            className="button button--primary final-button"
            onClick={() => {
              document
                .getElementById("explore")
                ?.scrollIntoView({
                  behavior: "smooth",
                });
            }}
          >
            ENTER PARAMPARA →
          </button>
        </Reveal>
      </section>

      {/* =====================================================
          FOOTER
      ===================================================== */}

      <footer className="footer">
        <div className="container footer-grid">
          <div>
            <div className="footer-brand">
              PARAMPARA
            </div>

            <p>
              Indian knowledge systems through sources,
              context and transmission.
            </p>
          </div>

          <div className="footer-column">
            <div className="footer-heading">
              EXPLORE
            </div>

            <a href="#sources">
              Sources
            </a>

            <a href="#explore">
              Concepts
            </a>

            <Link to="/janmashtami">
              Janmashtami
            </Link>

            <Link to="/timeline">
              Timeline
            </Link>

            <Link to="/traditions">
              Traditions
            </Link>
          </div>

          <div className="footer-column">
            <div className="footer-heading">
              PROJECT
            </div>

            <a href="#about">
              About
            </a>

            <a href="#about">
              Methodology
            </a>

            <a href="#about">
              Credits
            </a>
          </div>

          <div className="footer-copyright">
            © 2026 PARAMPARA
          </div>
        </div>
      </footer>
    </main>
  );
}