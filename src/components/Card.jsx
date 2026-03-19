import React from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

function EventCard({
  eventName,
  description,
  venue,
  price,
  backgroundImage,
  _id,
  seatRemaining,
  soldCount,
  onViewTicket,
}) {
  const totalSeats = soldCount + seatRemaining;
  const progress = (soldCount / totalSeats) * 100;

  const createTicket = useMutation({
    mutationFn: async (id) => {
      const resp = await axios.post(
        import.meta.env.VITE_API_URL + "/api/v1/tickets/" + id,
        {},
        { withCredentials: true }
      );
      return resp.data.data;
    },
    onSuccess: () => {
      alert("Ticket booked successfully");
    },
    onError: () => {
      alert("Failed to book ticket");
    },
  });

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow hover:shadow-xl transition">

      {/* Image */}
      <div className="h-40">
        <img
          src={backgroundImage}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="p-4">
        <h2 className="font-bold text-lg">{eventName}</h2>
        <p className="text-sm text-gray-500">{venue}</p>
        <p className="text-sm mt-2 line-clamp-2">{description}</p>

        {/* Seats */}
        <div className="mt-3 text-xs">
          {soldCount} sold / {seatRemaining} left
        </div>

        <div className="w-full h-2 bg-gray-200 rounded mt-1">
          <div
            className="h-full bg-blue-500"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Button */}
        <button
          onClick={() => {
            onViewTicket();            // ✅ show ticket instantly
            createTicket.mutate(_id);  // ✅ API call
          }}
          disabled={seatRemaining <= 0 || createTicket.isLoading}
          className="mt-4 w-full bg-blue-600 text-white py-2 rounded-xl disabled:bg-gray-300"
        >
          {seatRemaining <= 0
            ? "Sold Out"
            : createTicket.isLoading
            ? "Booking..."
            : "Book Ticket"}
        </button>
      </div>
    </div>
  );
}

export default EventCard;