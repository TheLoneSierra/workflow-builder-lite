import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-blue-600">
          Workflow Builder Lite
        </h1>

        <div className="space-x-6">
          <Link to="/" className="hover:text-blue-600">
            Home
          </Link>
          <Link to="/history" className="hover:text-blue-600">
            History
          </Link>
          <Link to="/status" className="hover:text-blue-600">
            Status
          </Link>
        </div>
      </div>
    </nav>
  );
}
