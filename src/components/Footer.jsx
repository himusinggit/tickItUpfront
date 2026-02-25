function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-10 w-full">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-14 px-6 py-16">

        {/* About */}
        <div className="text-center md:text-left">
          <h2 className="text-2xl font-semibold mb-4">TickItUp</h2>
          <p className="text-base text-gray-300 leading-relaxed">
            A college event e-ticketing platform for easy booking and event discovery.
          </p>
        </div>

        {/* Quick Links */}
        <div className="text-center md:text-left">
          <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-3 text-gray-300">
            <li className="cursor-pointer hover:text-white">Home</li>
            <li className="cursor-pointer hover:text-white">Events</li>
            <li className="cursor-pointer hover:text-white">My Tickets</li>
            <li className="cursor-pointer hover:text-white">Login</li>
          </ul>
        </div>

        {/* Support */}
        <div className="text-center md:text-left">
          <h3 className="text-xl font-semibold mb-4">Support</h3>
          <ul className="space-y-3 text-gray-300">
            <li className="cursor-pointer hover:text-white">FAQ</li>
            <li className="cursor-pointer hover:text-white">Refund Policy</li>
            <li className="cursor-pointer hover:text-white">Terms & Conditions</li>
            <li className="cursor-pointer hover:text-white">Privacy Policy</li>
          </ul>
        </div>

        {/* Contact */}
        <div className="text-center md:text-left flex flex-col gap-2">
          <h3 className="text-xl font-semibold mb-4">Contact</h3>
          <p className="text-gray-300"> Deen Bandhu Chhotu Ram University, Murthal</p>
          <p className="text-gray-300">support@tickitup.com</p>
          <p className="text-gray-300">+91 9876543210</p>
        </div>

      </div>

      <div className="text-center text-gray-400 text-sm border-t border-gray-700 py-5 px-4">
        © 2026 TickItUp | Made for College Students
      </div>
    </footer>
  );
}

export default Footer;