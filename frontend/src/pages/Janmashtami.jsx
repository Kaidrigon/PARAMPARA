import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";

import festivalData from "../components/festival/festivalData";

import "./Janmashtami.css";

const INDIA_GEO_URL =
  "https://raw.githubusercontent.com/udit-001/india-maps-data/main/geojson/india.geojson";

const WIPE_DURATION = 1100;

function IndiaMap({ festival }) {
  const selectedState = festival?.mapCode;

  return (
    <div className="janma-map">
      <div className="janma-map__header">
        <span>INDIA / REGIONAL MEMORY</span>
        <span>{festival?.state}</span>
      </div>

      <div className="janma-map__canvas">
        <ComposableMap
          projection="geoMercator"
          projectionConfig={{
            center: [82.8, 22.5],
            scale: 1050,
          }}
          width={560}
          height={600}
          className="janma-map__svg"
        >
          <Geographies geography={INDIA_GEO_URL}>
            {({ geographies }) =>
              geographies.map((geo) => {
                const code =
                  geo.properties?.id ||
                  geo.properties?.ID ||
                  geo.properties?.code ||
                  geo.properties?.ISO_3166_2;

                const name =
                  geo.properties?.name ||
                  geo.properties?.NAME_1 ||
                  geo.properties?.NAME;

                const isSelected =
                  code === selectedState ||
                  name?.toLowerCase() ===
                    festival?.mapState?.toLowerCase();

                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    className={
                      isSelected
                        ? "janma-map__state is-selected"
                        : "janma-map__state"
                    }
                    style={{
                      default: {},
                      hover: {},
                      pressed: {},
                    }}
                  />
                );
              })
            }
          </Geographies>

          <Marker
            coordinates={[
              festival.mapPoint.longitude,
              festival.mapPoint.latitude,
            ]}
          >
            <circle
              r="5"
              className="janma-map__marker-core"
            />
            <circle
              r="12"
              className="janma-map__marker-ring"
            />
          </Marker>
        </ComposableMap>
      </div>

      <div className="janma-map__location">
        <span className="janma-map__location-dot" />
        <div>
          <strong>{festival.region}</strong>
          <span>{festival.state}</span>
        </div>
      </div>
    </div>
  );
}

function FestivalImage({ image }) {
  return (
    <figure className="janma-photo">
      <img
        src={image.src}
        alt={image.alt}
        loading="eager"
      />

      <figcaption>
        <span>{image.caption}</span>
        <small>
          {image.credit} · {image.license}
        </small>
      </figcaption>
    </figure>
  );
}

export default function Janmashtami() {
  const [selectedId, setSelectedId] = useState(null);
  const [displayedId, setDisplayedId] = useState(null);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isTransitioning, setIsTransitioning] =
    useState(false);

  const displayedFestival = useMemo(
    () =>
      festivalData.find(
        (festival) => festival.id === displayedId
      ),
    [displayedId]
  );

  const selectedFestival = useMemo(
    () =>
      festivalData.find(
        (festival) => festival.id === selectedId
      ),
    [selectedId]
  );

  const changeFestival = (festival) => {
    if (isTransitioning) return;

    if (!displayedId) {
      setSelectedId(festival.id);
      setIsFlipped(true);

      window.setTimeout(() => {
        setDisplayedId(festival.id);
        setIsFlipped(false);
      }, 720);

      return;
    }

    if (festival.id === displayedId) return;

    setSelectedId(festival.id);
    setIsTransitioning(true);

    window.setTimeout(() => {
      setDisplayedId(festival.id);
      setIsFlipped(false);
    }, WIPE_DURATION / 2);

    window.setTimeout(() => {
      setIsTransitioning(false);
    }, WIPE_DURATION);
  };

  useEffect(() => {
    const handleKey = (event) => {
      if (!displayedId) return;

      const currentIndex = festivalData.findIndex(
        (festival) => festival.id === displayedId
      );

      if (event.key === "ArrowRight") {
        const next =
          festivalData[
            (currentIndex + 1) % festivalData.length
          ];

        changeFestival(next);
      }

      if (event.key === "ArrowLeft") {
        const next =
          festivalData[
            (currentIndex - 1 + festivalData.length) %
              festivalData.length
          ];

        changeFestival(next);
      }
    };

    window.addEventListener("keydown", handleKey);

    return () =>
      window.removeEventListener("keydown", handleKey);
  }, [displayedId, isTransitioning]);

  const currentImage =
    displayedFestival?.images?.[0] || null;

  return (
    <main className="janmashtami-page">
      <header className="janma-header">
        <div className="container">
          <Link
            to="/"
            className="janma-back"
          >
            ← BACK TO PARAMPARA
          </Link>

          <div className="janma-header__meta">
            <span>REGIONAL EXPRESSIONS</span>
            <span>01 — LIVING TRADITIONS</span>
          </div>

          <h1>
            One festival.
            <br />
            <em>Many memories.</em>
          </h1>

          <p>
            Janmashtami does not belong to a single
            ritual, region or way of remembering Krishna.
            Choose a place and follow the memory.
          </p>
        </div>
      </header>

      <section className="janma-experience">
        <div className="container">
          {!displayedFestival && (
            <div className="janma-discover">
              <div className="janma-discover__heading">
                <span>01</span>

                <div>
                  <span className="janma-label">
                    CHOOSE A MEMORY
                  </span>

                  <h2>
                    Six places.
                    <br />
                    <em>Six ways to remember.</em>
                  </h2>
                </div>
              </div>

              <div className="festival-grid">
                {festivalData.map((festival, index) => (
                  <button
                    type="button"
                    key={festival.id}
                    className={`festival-tile ${
                      selectedId === festival.id &&
                      isFlipped
                        ? "is-flipped"
                        : ""
                    }`}
                    onClick={() =>
                      changeFestival(festival)
                    }
                    aria-label={`Explore ${festival.region}, ${festival.state}`}
                  >
                    <span className="festival-tile__inner">
                      <span className="festival-tile__face festival-tile__front">
                        <span className="festival-tile__number">
                          {String(index + 1).padStart(2, "0")}
                        </span>

                        <span className="festival-tile__category">
                          {festival.category}
                        </span>

                        <span className="festival-tile__bottom">
                          <span>
                            {festival.region}
                          </span>

                          <strong>
                            {festival.state}
                          </strong>
                        </span>

                        <span className="festival-tile__arrow">
                          ↗
                        </span>
                      </span>

                      <span className="festival-tile__face festival-tile__back">
                        <span className="festival-tile__back-eyebrow">
                          {festival.eyebrow}
                        </span>

                        <strong>
                          {festival.title}
                        </strong>

                        <span>
                          {festival.hook}
                        </span>

                        <small>
                          ENTER MEMORY →
                        </small>
                      </span>
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {displayedFestival && (
            <div
              className={`janma-stage ${
                isTransitioning
                  ? "is-transitioning"
                  : ""
              }`}
            >
              <div className="janma-stage__nav">
                <span>
                  {String(
                    festivalData.findIndex(
                      (festival) =>
                        festival.id ===
                        displayedFestival.id
                    ) + 1
                  ).padStart(2, "0")}{" "}
                  /{" "}
                  {String(festivalData.length).padStart(
                    2,
                    "0"
                  )}
                </span>

                <span>
                  ← → TO MOVE THROUGH MEMORIES
                </span>
              </div>

              <div className="janma-stage__grid">
                <IndiaMap festival={displayedFestival} />

                {currentImage && (
                  <FestivalImage image={currentImage} />
                )}

                <article className="janma-story">
                  <div className="janma-story__eyebrow">
                    <span>
                      {displayedFestival.region}
                    </span>

                    <span>
                      {displayedFestival.state}
                    </span>
                  </div>

                  <span className="janma-story__type">
                    {displayedFestival.category}
                  </span>

                  <h2>
                    {displayedFestival.title}
                  </h2>

                  <p className="janma-story__hook">
                    {displayedFestival.hook}
                  </p>

                  <div className="janma-story__body">
                    <div>
                      <span>WHAT HAPPENS</span>
                      <p>
                        {displayedFestival.details.experience}
                      </p>
                    </div>

                    <div>
                      <span>THE UNEXPECTED PART</span>
                      <p>
                        {displayedFestival.details.unexpected}
                      </p>
                    </div>
                  </div>

                  <div className="janma-story__note">
                    <span>PARAMPARA NOTE</span>
                    <p>
                      {displayedFestival.details.parampara}
                    </p>
                  </div>

                  <a
                    href={displayedFestival.source.url}
                    target="_blank"
                    rel="noreferrer"
                    className="janma-source"
                  >
                    VERIFY SOURCE ↗
                  </a>
                </article>
              </div>

              <nav className="janma-memory-nav">
                <span className="janma-memory-nav__label">
                  ANOTHER MEMORY
                </span>

                <div>
                  {festivalData.map((festival) => (
                    <button
                      key={festival.id}
                      type="button"
                      className={
                        festival.id ===
                        displayedFestival.id
                          ? "is-active"
                          : ""
                      }
                      onClick={() =>
                        changeFestival(festival)
                      }
                      disabled={isTransitioning}
                    >
                      <span>{festival.region}</span>
                      <small>{festival.state}</small>
                    </button>
                  ))}
                </div>
              </nav>

              <div
                className={`feather-transition ${
                  isTransitioning
                    ? "is-active"
                    : ""
                }`}
                aria-hidden="true"
              >
                <div className="feather-transition__shaft" />

                <div className="feather-transition__barb barb-1" />
                <div className="feather-transition__barb barb-2" />
                <div className="feather-transition__barb barb-3" />
                <div className="feather-transition__barb barb-4" />
                <div className="feather-transition__barb barb-5" />
                <div className="feather-transition__barb barb-6" />
                <div className="feather-transition__barb barb-7" />
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}