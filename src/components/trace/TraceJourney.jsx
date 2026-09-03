import { useEffect, useMemo, useState } from "react";
import "./TraceJourney.css";

const STAGES = [
  {
    key: "claim",
    label: "CLAIM",
    number: "01",
  },
  {
    key: "source",
    label: "SOURCE",
    number: "02",
  },
  {
    key: "context",
    label: "CONTEXT",
    number: "03",
  },
  {
    key: "interpretation",
    label: "INTERPRETATION",
    number: "04",
  },
  {
    key: "tradition",
    label: "TRADITION",
    number: "05",
  },
];

export default function TraceJourney({
  result,
  loading = false,
}) {
  const [activeStage, setActiveStage] = useState("claim");
  const [revealedStage, setRevealedStage] = useState(0);

  const found = Boolean(result?.found);

  const interpretations = useMemo(
    () => result?.interpretation ?? [],
    [result]
  );

  const traditions = useMemo(
    () => result?.tradition ?? [],
    [result]
  );

  /*
   * When a new result arrives, start the journey
   * from the beginning.
   */
  useEffect(() => {
    if (!result) {
      setRevealedStage(0);
      setActiveStage("claim");
      return;
    }

    setRevealedStage(0);
    setActiveStage("claim");

    const timers = STAGES.map((stage, index) =>
      window.setTimeout(() => {
        setRevealedStage(index + 1);
      }, 280 + index * 360)
    );

    return () => {
      timers.forEach((timer) => window.clearTimeout(timer));
    };
  }, [result]);

  if (loading) {
    return (
      <section className="trace-journey trace-journey--loading">
        <div className="trace-journey__status">
          <div className="trace-journey__status-line">
            <span className="trace-journey__status-dot" />
            <span>TRACING YOUR CLAIM</span>
          </div>

          <p>
            Following the claim through source,
            context, interpretation and tradition.
          </p>
        </div>

        <TraceRail
          activeStage="claim"
          revealedStage={0}
          onSelect={() => {}}
        />
      </section>
    );
  }

  if (!result) {
    return null;
  }

  return (
    <section className="trace-journey">
      <div className="trace-journey__header">
        <div>
          <span className="trace-journey__eyebrow">
            TRACE RESULT
          </span>

          <h3 className="trace-journey__title">
            {found ? "Source found." : "No match found."}
          </h3>
        </div>

        <span
          className={`trace-journey__status-badge ${
            found
              ? "trace-journey__status-badge--found"
              : "trace-journey__status-badge--empty"
          }`}
        >
          {found ? "SOURCE FOUND" : "NO MATCH"}
        </span>
      </div>

      <TraceRail
        activeStage={activeStage}
        revealedStage={revealedStage}
        onSelect={setActiveStage}
        found={found}
      />

      <div className="trace-journey__panel">
        {activeStage === "claim" && (
          <ClaimPanel result={result} found={found} />
        )}

        {activeStage === "source" && (
          <SourcePanel result={result} found={found} />
        )}

        {activeStage === "context" && (
          <ContextPanel result={result} found={found} />
        )}

        {activeStage === "interpretation" && (
          <InterpretationPanel
            interpretations={interpretations}
            found={found}
          />
        )}

        {activeStage === "tradition" && (
          <TraditionPanel
            traditions={traditions}
            found={found}
          />
        )}
      </div>
    </section>
  );
}


/* --------------------------------------------------
   TRACE RAIL
-------------------------------------------------- */

function TraceRail({
  activeStage,
  revealedStage,
  onSelect,
  found = true,
}) {
  return (
    <div className="trace-rail" aria-label="Trace stages">
      {STAGES.map((stage, index) => {
        const isRevealed = index < revealedStage;
        const isActive = activeStage === stage.key;
        const isCompleted =
          found && index < revealedStage - 1;

        return (
          <div
            className={`trace-rail__stage ${
              isActive
                ? "trace-rail__stage--active"
                : ""
            } ${
              isRevealed
                ? "trace-rail__stage--revealed"
                : ""
            } ${
              isCompleted
                ? "trace-rail__stage--completed"
                : ""
            }`}
            key={stage.key}
          >
            <button
              type="button"
              className="trace-rail__button"
              onClick={() => {
                if (isRevealed) {
                  onSelect(stage.key);
                }
              }}
              disabled={!isRevealed}
              aria-current={
                isActive ? "step" : undefined
              }
            >
              <span className="trace-rail__marker">
                {isCompleted ? "✓" : stage.number}
              </span>

              <span className="trace-rail__label">
                {stage.label}
              </span>
            </button>

            {index < STAGES.length - 1 && (
              <span
                className={`trace-rail__connector ${
                  index < revealedStage - 1
                    ? "trace-rail__connector--filled"
                    : ""
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}


/* --------------------------------------------------
   CLAIM
-------------------------------------------------- */

function ClaimPanel({ result, found }) {
  return (
    <article className="trace-panel">
      <PanelHeading
        number="01"
        label="MODERN CLAIM"
      />

      <blockquote className="trace-claim">
        “{result.claim}”
      </blockquote>

      <div
        className={`trace-panel__note ${
          found
            ? "trace-panel__note--positive"
            : ""
        }`}
      >
        <span className="trace-panel__note-mark">
          {found ? "✓" : "—"}
        </span>

        <p>
          {found
            ? "This claim can be traced through the layers shown above."
            : "PARAMPARA could not find a matching claim in the current source collection."}
        </p>
      </div>
    </article>
  );
}


/* --------------------------------------------------
   SOURCE
-------------------------------------------------- */

function SourcePanel({ result, found }) {
  const source = result?.source;

  if (!found || !source) {
    return (
      <EmptyPanel text="No primary source was found for this claim." />
    );
  }

  return (
    <article className="trace-panel trace-panel--source">
      <PanelHeading
        number="02"
        label="PRIMARY SOURCE"
      />

      <div className="trace-source__meta">
        <span>{source.work}</span>

        {source.chapter && (
          <span>Chapter {source.chapter}</span>
        )}

        {source.verse && (
          <span>Verse {source.verse}</span>
        )}
      </div>

      <h4 className="trace-source__title">
        {source.title}
      </h4>

      {source.text && (
        <div className="trace-source__verse">
          {source.text}
        </div>
      )}
    </article>
  );
}


/* --------------------------------------------------
   CONTEXT
-------------------------------------------------- */

function ContextPanel({ result, found }) {
  const context = result?.context;

  if (!found || !context) {
    return (
      <EmptyPanel text="No contextual information is currently available." />
    );
  }

  return (
    <article className="trace-panel">
      <PanelHeading
        number="03"
        label="CONTEXT"
      />

      <p className="trace-context__description">
        {context.description}
      </p>

      {context.related_verses?.length > 0 && (
        <div className="trace-context__related">
          <span className="trace-context__related-label">
            RELATED VERSES
          </span>

          <div className="trace-context__verse-list">
            {context.related_verses.map((verse) => (
              <span key={verse}>{verse}</span>
            ))}
          </div>
        </div>
      )}
    </article>
  );
}


/* --------------------------------------------------
   INTERPRETATION
-------------------------------------------------- */

function InterpretationPanel({
  interpretations,
  found,
}) {
  const [openId, setOpenId] = useState(
    interpretations[0]?.interpretation_id ?? null
  );

  if (!found || interpretations.length === 0) {
    return (
      <EmptyPanel text="No interpretation records are currently available." />
    );
  }

  return (
    <article className="trace-panel">
      <PanelHeading
        number="04"
        label="INTERPRETATION"
      />

      <div className="trace-accordion">
        {interpretations.map((item) => {
          const id = item.interpretation_id;
          const isOpen = openId === id;

          return (
            <div
              className={`trace-accordion__item ${
                isOpen
                  ? "trace-accordion__item--open"
                  : ""
              }`}
              key={id}
            >
            <button
                type="button"
                className="trace-accordion__trigger"
                onClick={() =>
                    setOpenId(isOpen ? null : id)
                }
                aria-expanded={isOpen}
                >
                <span>
                    <strong>{item.thinker}</strong>
                    <small>{item.tradition}</small>
                </span>

                <span className="trace-accordion__icon">
                    {isOpen ? "−" : "+"}
                </span>
                </button>

                {isOpen && (
                <div className="trace-accordion__content">
                    <p>{item.summary}</p>
                </div>
                )}
            </div>
            );
        })}
        </div>
    </article>
    );
}


/* --------------------------------------------------
    TRADITION
-------------------------------------------------- */

function TraditionPanel({
    traditions,
    found,
}) {
    if (!found || traditions.length === 0) {
    return (
        <EmptyPanel text="No tradition records are currently available." />
    );
    }

    return (
    <article className="trace-panel">
        <PanelHeading
        number="05"
        label="TRADITION"
        />

        <p className="trace-tradition__intro">
        This claim is connected to the following
        philosophical traditions in the current
        PARAMPARA collection.
        </p>

        <div className="trace-tradition__list">
        {traditions.map((item) => (
            <div
            className="trace-tradition__item"
            key={item.tradition_id}
            >
            <span className="trace-tradition__dot" />
            <span>{item.name}</span>
            </div>
        ))}
            </div>
    </article>
    );
}


/* --------------------------------------------------
    SHARED
-------------------------------------------------- */

function PanelHeading({ number, label }) {
    return (
    <div className="trace-panel__heading">
        <span>{number}</span>
        <span>{label}</span>
    </div>
    );
}

function EmptyPanel({ text }) {
    return (
    <article className="trace-panel trace-panel--empty">
        <PanelHeading
        number="—"
        label="UNAVAILABLE"
        />

        <p>{text}</p>
    </article>
    );
}