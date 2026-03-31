import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import TicketDetailModal from "./TicketDetails";
import socket from "../sockets/socket";
function EventCard({
  ticket,
  eventName,
  description,
  venue,
  price,
  backgroundImage,
  ticketTempId,
  seatsRemaining,
  seatsSold,
}) {
  const totalSeats = seatsSold + seatsRemaining;
  const progress = (seatsSold / totalSeats) * 100;
  const [clicked, setClicked] = useState(false);
  const createTicket = useMutation({
    mutationFn: async (ticketTempId) => {
      const resp = await axios.post(
        import.meta.env.VITE_API_URL + "/api/v1/tickets/" + ticketTempId,
        {},
        { withCredentials: true }
      );
      return resp.data.data;
    },
    onSuccess: () => {
      alert("Ticket booked successfully");
    },
    onError: () => {
      alert("Failed to book ticket. Please try again.");
    },
  });

  const handleCreations = () => {
    createTicket.mutate(ticketTempId);
  };

  return (
    <>
    <div onClick={()=>setClicked(true)} className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition duration-300 flex flex-col">

      {/* Image */}
      <div className="relative h-56">
        <img
          src={backgroundImage}
          alt={eventName}
          className="w-full h-full object-cover"
        />

        {/* Price Badge */}
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-4 py-1 rounded-full font-semibold text-green-600 shadow">
          ₹{price}
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col gap-4 flex-grow">

        <div>
          <h3 className="text-xl font-bold text-gray-800">{eventName}</h3>
          <p className="text-sm text-gray-500 mt-1">{venue}</p>
        </div>

        {/* Seats Info */}
        <div>
          <div className="flex justify-between text-xs text-gray-500 mb-1">
            <span>{seatsSold} sold</span>
            <span>{seatsRemaining} remaining</span>
          </div>

          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-500"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

      </div>
      
    </div>
      {clicked&&<TicketDetailModal ticket={ticket} onBook={handleCreations} onClose={()=>{setClicked(false);}} />}
    </>
  );
}

export default EventCard;