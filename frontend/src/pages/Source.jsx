import { Link, useParams } from "react-router-dom";

import "./Source.css";

const sourceData = {
  "shankara-gita-bhashya": {
    tradition: "Advaita Vedanta",
    author: "Śaṅkara",
    title: "Bhagavad Gita Bhashya",
    subtitle: "Śaṅkara's commentary on the Bhagavad Gita.",

    description:
      "The Bhagavad Gita Bhashya attributed to Śaṅkara is one of the influential early commentaries on the Bhagavad Gita. It reads the Gita through the philosophical framework associated with Advaita Vedanta.",

    why:
      "This commentary matters to PARAMPARA because it shows that a verse does not exist only as an isolated sentence. It can be read through a particular philosophical tradition, with its own understanding of knowledge, action, self and liberation.",

    approach:
      "Śaṅkara gives a strong place to knowledge of the self and ultimate reality. His interpretation also distinguishes between different forms and purposes of action while explaining how the Gita's teaching can lead toward liberation.",

    gita:
      "When PARAMPARA presents Śaṅkara as an interpreter of a Gita verse, the interpretation should therefore be understood as a reading from the Advaita Vedanta tradition — not automatically as the only meaning of the verse.",

    sourceType: "COMMENTARY",
    work: "Bhagavad Gita Bhashya",
  },

  "ramanuja-gita-bhashya": {
    tradition: "Vishishtadvaita Vedanta",
    author: "Rāmānuja",
    title: "Gita Bhashya",
    subtitle: "Rāmānuja's commentary on the Bhagavad Gita.",

    description:
      "Rāmānuja's Gita Bhashya is an important commentary on the Bhagavad Gita within the Vishishtadvaita Vedanta tradition. It presents the Gita through a framework in which the individual self, the world and the supreme reality are understood as real and inseparably related.",

    why:
      "This commentary matters to PARAMPARA because it provides a different philosophical lens through which the same Gita verses can be understood.",

    approach:
      "Rāmānuja places particular importance on devotion, duty, knowledge and the relationship between the individual self and the supreme reality. His interpretation therefore develops differently from Śaṅkara's Advaita reading.",

    gita:
      "When PARAMPARA presents Rāmānuja as an interpreter of a Gita verse, the interpretation should be understood within the Vishishtadvaita framework rather than treated as a neutral definition of what every reader must believe.",

    sourceType: "COMMENTARY",
    work: "Gita Bhashya",
  },
};

export default function Source() {
  const { slug } = useParams();

  const source = sourceData[slug];

  if (!source) {
    return (
      <main className="source-page">
        <div className="container source-not-found">
          <span>404</span>

          <h1>Source not found. Because the deadline was so much tight that it didnt gave me time to even breath. Blame the deadline setters not me i wasn't smoking with them:) </h1>
          <h5>sorry but i forget to add the source and sorry for the lame joke but its 2:30 am and i am high on caffine</h5>

          <Link to="/traditions">
            ← EXPLORE TRADITIONS
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="source-page">

      {/* HERO */}
      <header className="source-hero">
        <div className="container">

          <Link
            to={`/traditions/${
              source.tradition === "Advaita Vedanta"
                ? "advaita-vedanta"
                : "vishishtadvaita-vedanta"
            }`}
            className="source-back"
          >
            ← BACK TO {source.tradition.toUpperCase()}
          </Link>

          <div className="source-hero__meta">
            <span>{source.sourceType}</span>
            <span>{source.tradition}</span>
          </div>

          <h1>{source.title}</h1>

          <p className="source-hero__subtitle">
            {source.subtitle}
          </p>

          <div className="source-author">
            <span>AUTHOR / INTERPRETER</span>
            <strong>{source.author}</strong>
          </div>

        </div>
      </header>

      {/* WHAT IS THIS SOURCE */}
      <section className="source-section section">
        <div className="container">

          <SourceLabel
            number="01"
            label="WHAT IS THIS?"
          />

          <div className="source-section__grid">

            <h2>
              A commentary is
              <br />
              not the original text.
            </h2>

            <p>{source.description}</p>

          </div>
        </div>
      </section>

      {/* WHY IT MATTERS */}
      <section className="source-section source-section--alt section">
        <div className="container">

          <SourceLabel
            number="02"
            label="WHY DOES IT MATTER?"
          />

          <div className="source-section__grid">

            <h2>
              The verse stays.
              <br />
              The reading can differ.
            </h2>

            <p>{source.why}</p>

          </div>
        </div>
      </section>

      {/* INTERPRETIVE APPROACH */}
      <section className="source-section section">
        <div className="container">

          <SourceLabel
            number="03"
            label="INTERPRETIVE APPROACH"
          />

          <div className="source-reading">

            <div className="source-reading__author">
              <span>{source.author}</span>
              <small>{source.tradition}</small>
            </div>

            <p>{source.approach}</p>

          </div>
        </div>
      </section>

      {/* GITA CONNECTION */}
      <section className="source-section source-section--dark section">
        <div className="container">

          <SourceLabel
            number="04"
            label="THE BHAGAVAD GITA"
          />

          <div className="source-gita">

            <h2>
              How does this
              <br />
              change the reading?
            </h2>

            <p>{source.gita}</p>

          </div>
        </div>
      </section>

      {/* SOURCE IDENTITY */}
      <section className="source-section section">
        <div className="container">

          <SourceLabel
            number="05"
            label="SOURCE IDENTITY"
          />

          <div className="source-identity">

            <div>
              <span>WORK</span>
              <strong>{source.work}</strong>
            </div>

            <div>
              <span>INTERPRETER</span>
              <strong>{source.author}</strong>
            </div>

            <div>
              <span>TRADITION</span>
              <strong>{source.tradition}</strong>
            </div>

            <div>
              <span>TYPE</span>
              <strong>{source.sourceType}</strong>
            </div>

          </div>
        </div>
      </section>

      {/* NAVIGATION */}
      <section className="source-next">
        <div className="container">

          <Link
            to={`/traditions/${
              source.tradition === "Advaita Vedanta"
                ? "advaita-vedanta"
                : "vishishtadvaita-vedanta"
            }`}
          >
            ← RETURN TO TRADITION
          </Link>

          <Link to="/">
            RETURN TO PARAMPARA →
          </Link>

        </div>
      </section>

    </main>
  );
}

function SourceLabel({ number, label }) {
  return (
    <div className="source-section__label">
      <span>{number}</span>
      <span>{label}</span>
    </div>
  );
}