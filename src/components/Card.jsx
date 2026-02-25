import React from 'react'
function EventCard() {
  return (
    <div className="bg-white rounded-[2rem] overflow-hidden border border-slate-100 flex flex-col shadow-md hover:shadow-xl transition-all duration-300 ease-in-out hover:scale-101 ">
                <div className="relative h-60 overflow-hidden">
                    <img className="hover: cursor-pointer hover:scale-105 ease transition-translate duration-300 " src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80" alt="Cyber Security" class="w-full h-full object-cover" />
                    <span className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-lg text-xs font-bold text-blue-600 tracking-wider">TECH</span>
                </div>
                <div className="p-8 flex-grow flex flex-col">
                    <div className="flex justify-between items-start mb-2">
                        <h3 className="text-2xl font-bold leading-tight">CyberHack '26</h3>
                        <span className="text-green-600 font-bold">free</span>
                    </div>
                    <p className="text-slate-500 text-sm mb-2 leading-relaxed">48-hour marathon of coding, security challenges, and innovative hardware hacks.</p>
                    <div className="mt-auto pt-6 border-t border-slate-50 flex items-center justify-between">
                        <div className="text-xs font-medium text-slate-400">
                            <p>Oct 22 • Main Hall</p>
                        </div>
                        <button className="bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white px-6 py-2 rounded-xl font-bold transition">Book Now</button>
                    </div>
                </div>
            </div>
  );
}

export default EventCard;-30