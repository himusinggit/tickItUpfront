import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const s = {
  wrap: {
    padding: "1.75rem 2rem",
    fontFamily: "'Nunito', sans-serif",
    WebkitFontSmoothing: "antialiased",
  },
  top: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "1.5rem",
  },
  title: {
    fontFamily: "'Bricolage Grotesque', sans-serif",
    fontSize: "1.5rem",
    fontWeight: 800,
    letterSpacing: "-.04em",
    color: "#0F172A",
    margin: 0,
  },
  sub: {
    fontSize: ".8rem",
    fontWeight: 600,
    color: "#94A3B8",
    marginTop: ".2rem",
    fontFamily: "'Nunito', sans-serif",
  },
  btn: {
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    padding: "9px 18px",
    borderRadius: 10,
    border: "none",
    background: "#2563EB",
    color: "#fff",
    fontFamily: "'Nunito', sans-serif",
    fontSize: ".86rem",
    fontWeight: 700,
    cursor: "pointer",
    boxShadow: "0 3px 12px rgba(37,99,235,.28)",
    transition: "all .2s",
    whiteSpace: "nowrap",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
    gap: ".85rem",
  },
  card: {
    background: "#fff",
    borderRadius: 14,
    border: "1.5px solid #E2E8F0",
    padding: "1.1rem 1.2rem",
    display: "flex",
    flexDirection: "column",
    gap: ".6rem",
    transition: "box-shadow .2s, border-color .2s",
    boxSizing: "border-box",
    position:"relative"
  },
  name: {
    fontFamily: "'Bricolage Grotesque', sans-serif",
    fontSize: ".97rem",
    fontWeight: 700,
    letterSpacing: "-.02em",
    color: "#0F172A",
    lineHeight: 1.25,
    margin: 0,
  },
  meta: {
    display: "flex",
    flexDirection: "column",
    gap: ".25rem",
  },
  metaRow: {
    display: "flex",
    alignItems: "center",
    gap: ".4rem",
    fontSize: ".78rem",
    fontWeight: 500,
    color: "#64748B",
    fontFamily: "'Nunito', sans-serif",
    margin: 0,
  },
  mi: {
    fontSize: ".74rem",
    width: 13,
    textAlign: "center",
    flexShrink: 0,
  },
  scanner: {
    marginTop: ".1rem",
    padding: ".5rem .75rem",
    background: "#F7FAFF",
    borderRadius: 8,
    border: "1px solid #E2E8F0",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    boxSizing: "border-box",
  },
  scLabel: {
    fontFamily: "'Nunito', sans-serif",
    fontSize: ".65rem",
    fontWeight: 700,
    letterSpacing: ".08em",
    textTransform: "uppercase",
    color: "#94A3B8",
  },
  scId: {
    fontFamily: "'Bricolage Grotesque', sans-serif",
    fontSize: ".55rem",
    fontWeight: 700,
    letterSpacing: "-.01em",
    color: "#0F172A",
  },
  tag:{
    backgroundColor:"rgb(100,100,255)",
    position:"absolute",
    right:"20px",
    fontSize:"0.8rem",
    padding:"2px 6px",
    borderRadius:"5px",
    color:"white"
  }
};

export default function MyEventsPage() {
  const navigate=useNavigate();
const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["getUserGenEvents"],
    queryFn: async () => {
      const res = await axios.get(import.meta.env.VITE_API_URL + "/api/v1/ticketTemplates", {
        withCredentials: true,
      });
      console.log(res.data.message);
      return res.data.message;
    },
    refetchOnWindowFocus: false,
    // refetchInterval: 2000,
    // refetchIntervalInBackground:false
  });
  if(error){
    console.log('error fetching user created Events');
  }
  return (
    <div style={s.wrap}>
      <div style={s.top}>
        <div>
          <div style={s.title}>My Events</div>
          <div style={s.sub}>{data?.length} events</div>
        </div>
        <button style={s.btn}
          onMouseEnter={e => { e.currentTarget.style.background = "#1D4ED8"; e.currentTarget.style.transform = "translateY(-1px)"; }}
          onMouseLeave={e => { e.currentTarget.style.background = "#2563EB"; e.currentTarget.style.transform = "none"; }}
          onClick={()=>{navigate('/createEvent')}}
        >
          + Create Event
        </button>
      </div>

      <div style={s.grid}>
        {data?.map(ev => (
          <div key={ev._id} style={s.card}
            onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 4px 18px rgba(37,99,235,.08)"; e.currentTarget.style.borderColor = "rgba(37,99,235,.2)"; }}
            onMouseLeave={e => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.borderColor = "#E2E8F0"; }}
          >
            <div style={s.name}>{ev.eventName}</div>
            <div style={s.meta}>
              <div style={s.metaRow}><span style={s.mi}>📅</span>{ev.eventDate.split('T')[0]} · {ev.eventTime}</div>
              <div style={s.metaRow}><span style={s.mi}>📍</span>{ev.venue}</div>
              <div style={s.metaRow}><span style={s.mi}>🎟️</span>{ev.soldCount} / {ev.totalSeats} registered</div>
            </div>
            <div style={s.scanner}>
              <span style={s.scLabel}>Scanner Code</span>
              <span style={s.scId}>{ev.scannerCode}</span>
            </div>
            <div style={s.tag}>
              {ev.eventDate.split('T')[0]>new Date().toISOString().split('T')[0]?"live":"over"}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}