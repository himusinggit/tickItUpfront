import React from "react";

const Ticket = ({ data, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">

      <div className="relative w-[350px] rounded-2xl overflow-hidden shadow-2xl text-white">

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-white text-xl z-10"
        >
          ✕
        </button>

        {/* Background */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${data.backgroundImage})` }}
        />

        {/* Overlay */}
        <div className="relative bg-black/40 backdrop-blur border border-white/20">

          <div className="p-4 border-b border-white/40">
            <h2 className="font-bold">Event</h2>
            <p className="text-xl">{data.eventName}</p>

            <h3 className="mt-2 font-bold">Description</h3>
            <p className="text-sm">{data.description}</p>
          </div>

          <div className="flex flex-col items-center p-4 border-b border-white/40">
            <p>Scan</p>
            <img
              src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${data._id}`}
              className="bg-white p-2 rounded"
            />
          </div>

          <div className="grid grid-cols-2 text-sm">
            <div className="p-3 border-r border-white/40">
              Venue: {data.venue}
            </div>
            <div className="p-3">
              Price: ₹{data.price}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ticket;