import { useEffect } from "react";

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;600;700&family=Outfit:wght@300;400;500;600&display=swap');

  :root {
    --tdm-accent: #e85d26;
    --tdm-off: #faf9f8;
    --tdm-border: #ebebeb;
    --tdm-text: #111010;
    --tdm-muted: #888;
  }

  .tdm-overlay {
    position: fixed;
    inset: 0;
    background: rgba(10, 10, 10, 0.55);
    backdrop-filter: blur(4px);
    -webkit-backdrop-filter: blur(4px);
    z-index: 999;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
    animation: tdm-fade-in 0.2s ease;
    font-family: 'Outfit', sans-serif;
  }

  @keyframes tdm-fade-in { from { opacity: 0; } to { opacity: 1; } }

  .tdm-modal {
    background: #fff;
    border-radius: 20px;
    width: 100%;
    max-width: 600px;
    max-height: 90vh;
    overflow-y: auto;
    overflow-x: hidden;
    box-shadow: 0 8px 30px rgba(0,0,0,0.10), 0 32px 80px rgba(0,0,0,0.08);
    position: relative;
    animation: tdm-slide-up 0.25s cubic-bezier(0.16, 1, 0.3, 1);
    scrollbar-width: thin;
    scrollbar-color: #ddd transparent;
  }

  .tdm-modal::-webkit-scrollbar { width: 4px; }
  .tdm-modal::-webkit-scrollbar-thumb { background: #ddd; border-radius: 4px; }

  @keyframes tdm-slide-up {
    from { opacity: 0; transform: translateY(24px) scale(0.98); }
    to   { opacity: 1; transform: translateY(0)   scale(1);    }
  }

  /* Hero */
  .tdm-hero {
    position: relative;
    height: 240px;
    overflow: hidden;
    border-radius: 20px 20px 0 0;
  }

  .tdm-hero-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    background: #eee;
  }

  .tdm-hero-gradient {
    position: absolute;
    inset: 0;
    background: linear-gradient(to bottom, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0.58) 100%);
  }

  .tdm-hero-content {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 20px 24px;
  }

  .tdm-hero-title {
    font-family: 'Playfair Display', serif;
    font-size: 26px;
    font-weight: 700;
    color: #fff;
    line-height: 1.2;
    text-shadow: 0 1px 8px rgba(0,0,0,0.3);
  }

  .tdm-close {
    position: absolute;
    top: 14px;
    right: 14px;
    width: 34px;
    height: 34px;
    border-radius: 50%;
    border: none;
    background: rgba(255,255,255,0.18);
    backdrop-filter: blur(6px);
    color: #fff;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background 0.15s;
    z-index: 10;
  }

  .tdm-close:hover { background: rgba(255,255,255,0.32); }

  /* Body */
  .tdm-body { padding: 24px; }

  /* Date badge */
  .tdm-date-badge {
    display: flex;
    align-items: center;
    gap: 12px;
    background: var(--tdm-off);
    border: 1px solid var(--tdm-border);
    border-radius: 12px;
    padding: 12px 16px;
    margin-bottom: 20px;
  }

  .tdm-date-cal {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 48px;
    height: 52px;
    background: var(--tdm-accent);
    border-radius: 10px;
    flex-shrink: 0;
  }

  .tdm-date-cal-month {
    font-size: 9px;
    font-weight: 600;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.85);
    line-height: 1;
    padding-top: 5px;
  }

  .tdm-date-cal-day {
    font-size: 22px;
    font-weight: 700;
    color: #fff;
    line-height: 1;
  }

  .tdm-date-text-main {
    font-size: 14px;
    font-weight: 600;
    color: var(--tdm-text);
  }

  .tdm-date-text-sub {
    font-size: 12px;
    color: var(--tdm-muted);
    margin-top: 2px;
  }

  /* Meta pills */
  .tdm-meta {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-bottom: 24px;
  }

  .tdm-pill {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 12.5px;
    font-weight: 500;
    color: #444;
    background: var(--tdm-off);
    border: 1px solid var(--tdm-border);
    border-radius: 8px;
    padding: 7px 12px;
    flex-shrink: 0;
  }

  .tdm-pill svg { color: var(--tdm-accent); flex-shrink: 0; }

  /* Stats */
  .tdm-stats {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 10px;
    margin-bottom: 24px;
  }

  .tdm-stat {
    background: var(--tdm-off);
    border: 1px solid var(--tdm-border);
    border-radius: 12px;
    padding: 14px 12px;
    text-align: center;
  }

  .tdm-stat-value {
    font-size: 20px;
    font-weight: 700;
    color: var(--tdm-text);
    line-height: 1;
    margin-bottom: 4px;
  }

  .tdm-stat-value.tdm-price { color: var(--tdm-accent); }

  .tdm-stat-label {
    font-size: 10.5px;
    font-weight: 500;
    color: var(--tdm-muted);
    text-transform: uppercase;
    letter-spacing: 0.08em;
  }

  /* Progress */
  .tdm-progress-wrap { margin-bottom: 24px; }

  .tdm-progress-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 8px;
  }

  .tdm-progress-label {
    font-size: 12px;
    font-weight: 600;
    color: #444;
    display: flex;
    align-items: center;
    gap: 5px;
  }

  .tdm-progress-pct { font-size: 12px; font-weight: 600; color: var(--tdm-accent); }

  .tdm-progress-track {
    height: 6px;
    background: #f0f0f0;
    border-radius: 99px;
    overflow: hidden;
  }

  .tdm-progress-bar {
    height: 100%;
    border-radius: 99px;
    background: linear-gradient(90deg, var(--tdm-accent), #f08040);
    transition: width 0.6s cubic-bezier(0.16, 1, 0.3, 1);
  }

  /* Divider */
  .tdm-divider { height: 1px; background: var(--tdm-border); margin: 20px 0; }

  /* Description */
  .tdm-desc-label {
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--tdm-muted);
    margin-bottom: 12px;
  }

  .tdm-desc-content { font-size: 14px; line-height: 1.7; color: #333; }
  .tdm-desc-content p            { margin-bottom: 0.75em; }
  .tdm-desc-content p:last-child  { margin-bottom: 0; }
  .tdm-desc-content strong       { font-weight: 600; color: var(--tdm-text); }
  .tdm-desc-content em           { font-style: italic; }
  .tdm-desc-content u            { text-decoration: underline; text-decoration-color: #ccc; }
  .tdm-desc-content ul           { padding-left: 1.3em; margin: 0.5em 0 0.75em; }
  .tdm-desc-content ul li        { margin-bottom: 0.3em; }
  .tdm-desc-content ul li::marker { color: var(--tdm-accent); }
  .tdm-desc-content a            { color: var(--tdm-accent); text-decoration: underline; text-decoration-color: rgba(232,93,38,0.4); }

  /* CTA */
  .tdm-cta { margin-top: 24px; display: flex; gap: 10px; }

  .tdm-btn-book {
    flex: 1;
    padding: 13px;
    background: var(--tdm-accent);
    color: #fff;
    border: none;
    border-radius: 12px;
    font-family: 'Outfit', sans-serif;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    transition: opacity 0.15s, transform 0.1s;
  }

  .tdm-btn-book:hover  { opacity: 0.9; transform: translateY(-1px); }
  .tdm-btn-book:active { transform: translateY(0); }

  .tdm-btn-share {
    width: 46px;
    height: 46px;
    background: var(--tdm-off);
    border: 1px solid var(--tdm-border);
    border-radius: 12px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--tdm-muted);
    transition: background 0.15s, color 0.15s;
    flex-shrink: 0;
  }

  .tdm-btn-share:hover { background: var(--tdm-border); color: var(--tdm-text); }

  /* Responsive */
  @media (max-width: 480px) {
    .tdm-hero       { height: 200px; }
    .tdm-hero-title { font-size: 22px; }
    .tdm-body       { padding: 18px; }
    .tdm-stat-value { font-size: 17px; }
    .tdm-cta        { flex-direction: column; }
    .tdm-btn-share  { width: 100%; height: 44px; }
    .tdm-overlay    { padding: 0; align-items: flex-end; }
    .tdm-modal      { max-height: 92vh; border-radius: 20px 20px 0 0; }
  }
`;

/* ── Icons ── */
const CalIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/>
    <line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
  </svg>
);
const PinIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
  </svg>
);
const TicketIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2z"/>
  </svg>
);
const ClockIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
  </svg>
);
const CloseIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);
const ChairIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 9V6a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v3"/>
    <path d="M3 11v5a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-5a2 2 0 0 0-4 0v2H7v-2a2 2 0 0 0-4 0z"/>
    <line x1="5" y1="18" x2="5" y2="22"/><line x1="19" y1="18" x2="19" y2="22"/>
  </svg>
);
const ShareIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/>
    <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
  </svg>
);

/* ── Helper ── */
const formatDate = (dateStr) => {
  const d = new Date(dateStr);
  return {
    day:   d.toLocaleDateString("en-IN", { weekday: "short" }),
    date:  d.getDate(),
    month: d.toLocaleDateString("en-IN", { month: "short" }),
    year:  d.getFullYear(),
  };
};

/**
 * TicketDetailModal
 *
 * Props:
 *   ticket: {
 *     _id, eventName, description (HTML string),
 *     eventDate, eventTime, venue, price,
 *     soldCount, seatRemaining, backgroundImage
 *   }
 *   onClose: () => void
 */
export default function TicketDetailModal({ ticket, onClose, onBook }) {
  const d = formatDate(ticket.eventDate);
  const soldPct = Math.round(
    (ticket.soldCount / (ticket.soldCount + ticket.seatRemaining)) * 100
  );

  // Close on Escape
  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  return (
    <>
      <style>{css}</style>

      <div className="tdm-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
        <div className="tdm-modal">

          {/* Hero */}
          <div className="tdm-hero">
            <img className="tdm-hero-img" src={ticket.backgroundImage} alt={ticket.eventName} />
            <div className="tdm-hero-gradient" />
            <div className="tdm-hero-content">
              <div className="tdm-hero-title">{ticket.eventName}</div>
            </div>
            <button className="tdm-close" onClick={onClose} aria-label="Close">
              <CloseIcon />
            </button>
          </div>

          {/* Body */}
          <div className="tdm-body">

            {/* Date badge */}
            <div className="tdm-date-badge">
              <div className="tdm-date-cal">
                <div className="tdm-date-cal-month">{d.month}</div>
                <div className="tdm-date-cal-day">{d.date}</div>
              </div>
              <div>
                <div className="tdm-date-text-main">{d.day}, {d.date} {d.month} {d.year}</div>
                <div className="tdm-date-text-sub">Starts at {ticket.eventTime}</div>
              </div>
            </div>

            {/* Meta pills */}
            <div className="tdm-meta">
              <div className="tdm-pill"><PinIcon />    {ticket.venue}</div>
              <div className="tdm-pill"><ClockIcon />  {ticket.eventTime}</div>
              <div className="tdm-pill"><CalIcon />    {d.day}, {d.month} {d.date}</div>
              <div className="tdm-pill"><TicketIcon /> {ticket.seatRemaining} seats left</div>
            </div>

            {/* Stats */}
            <div className="tdm-stats">
              <div className="tdm-stat">
                <div className="tdm-stat-value tdm-price">₹{ticket.price}</div>
                <div className="tdm-stat-label">Per Ticket</div>
              </div>
              <div className="tdm-stat">
                <div className="tdm-stat-value">{ticket.soldCount}</div>
                <div className="tdm-stat-label">Sold</div>
              </div>
              <div className="tdm-stat">
                <div className="tdm-stat-value">{ticket.seatRemaining}</div>
                <div className="tdm-stat-label">Remaining</div>
              </div>
            </div>

            {/* Availability bar */}
            <div className="tdm-progress-wrap">
              <div className="tdm-progress-header">
                <div className="tdm-progress-label"><ChairIcon /> Availability</div>
                <div className="tdm-progress-pct">{soldPct}% sold</div>
              </div>
              <div className="tdm-progress-track">
                <div className="tdm-progress-bar" style={{ width: `${soldPct}%` }} />
              </div>
            </div>

            <div className="tdm-divider" />

            {/* Description — renders HTML from DB */}
            <div className="tdm-desc-label">About this event</div>
            <div
              className="prose"
              dangerouslySetInnerHTML={{ __html: ticket.description }}
            />

            {/* CTA */}
            <div className="tdm-cta">
              <button className="tdm-btn-book" onClick={onBook}>Book Tickets — ₹{ticket.price}</button>
              {/* <button className="tdm-btn-share" title="Share"><ShareIcon /></button> */}
            </div>

          </div>
        </div>
      </div>
    </>
  );
}
