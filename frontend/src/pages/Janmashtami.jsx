import { useState } from "react";
import festivalData from "../data/festivalData";

import "./Janmashtami.css";

export default function Janmashtami() {
  const [activeId, setActiveId] = useState(null);

  const activeFestival = festivalData.find(
    (festival) => festival.id === activeId
  );

  return (
    <main className="janmashtami">

      <section className="janmashtami-hero">
        <div className="container">

          <span className="eyebrow">
            REGIONAL EXPRESSIONS
          </span>

          <h1>
            One festival.
            <br />
            Many memories.
          </h1>

          <p>
            Janmashtami does not look the same everywhere.
            Explore the regional traditions, rituals and cultural
            worlds through which Krishna's birth is remembered.
          </p>

        </div>
      </section>


      <section className="janmashtami-explorer">

        <div className="container">

          <div className="janmashtami-intro">

            <span>01 — DISCOVER</span>

            <h2>
              You already know
              <br />
              the famous ones.
            </h2>

            <p>
              So we went looking for the celebrations
              that usually don't make the list.
            </p>

          </div>


          <div className="festival-grid">

            {festivalData.map((festival) => {

              const isActive = activeId === festival.id;

              return (
                <article
                  key={festival.id}
                  className={`festival-card ${
                    isActive ? "is-active" : ""
                  }`}
                  onClick={() =>
                    setActiveId(
                      isActive ? null : festival.id
                    )
                  }
                >

                  <div className="festival-card__inner">

                    <div className="festival-card__front">

                      <div className="festival-card__top">
                        <span>
                          {festival.category}
                        </span>

                        <span>
                          {festival.state}
                        </span>
                      </div>


                      <div className="festival-card__visual">
                        <span>
                          {festival.visual}
                        </span>
                      </div>


                      <div className="festival-card__content">

                        <span>
                          {festival.region}
                        </span>

                        <h3>
                          {festival.title}
                        </h3>

                        <p>
                          {festival.hook}
                        </p>

                      </div>


                      <div className="festival-card__action">
                        EXPLORE →
                      </div>

                    </div>


                    <div className="festival-card__back">

                      <div className="festival-card__back-top">

                        <span>
                          {festival.region}
                        </span>

                        <span>
                          {festival.state}
                        </span>

                      </div>


                      <div>

                        <span className="festival-card__label">
                          WHAT HAPPENS
                        </span>

                        <p>
                          {festival.details.experience}
                        </p>

                      </div>


                      <div>

                        <span className="festival-card__label">
                          THE UNEXPECTED PART
                        </span>

                        <p>
                          {festival.details.unexpected}
                        </p>

                      </div>


                      <div className="festival-card__note">

                        <span>
                          PARAMPARA NOTE
                        </span>

                        <p>
                          {festival.details.parampara}
                        </p>

                      </div>


                      <div className="festival-card__action">
                        CLOSE ←
                      </div>

                    </div>

                  </div>

                </article>
              );
            })}

          </div>

        </div>

      </section>


      {activeFestival && (
        <section className="festival-detail">

          <div className="container">

            <span>
              {activeFestival.region},{" "}
              {activeFestival.state}
            </span>

            <h2>
              {activeFestival.title}
            </h2>

            <p>
              {activeFestival.details.what}
            </p>

            <a
              href={activeFestival.source.url}
              target="_blank"
              rel="noreferrer"
            >
              VERIFY SOURCE →
            </a>

          </div>

        </section>
      )}

    </main>
  );
}