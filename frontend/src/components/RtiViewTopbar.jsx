import { useNavigate } from "react-router-dom";
import constants from "../utils/constants";

function RtiViewTopbar({ filters, setFilters }) {
  const navigate = useNavigate();

  const handleChange = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <div className="flex flex-col gap-4 mb-6 md:flex-row md:justify-between md:items-center">

      <h2 className="text-xl font-semibold">RTI</h2>

      <div className="flex flex-col gap-3 md:flex-row md:items-center">

        <select
          onChange={(e) => handleChange("date", e.target.value)}
          className="border rounded px-3 py-2"
        >
          <option value="">Date</option>
          {constants.DATE.map((d) => (
            <option key={d}>{d}</option>
          ))}
        </select>

        <select
          onChange={(e) => handleChange("department", e.target.value)}
          className="border rounded px-3 py-2"
        >
          <option value="">Department</option>
          {constants.DEPARTMENTS.map((d) => (
            <option key={d}>{d}</option>
          ))}
        </select>

        <select
          onChange={(e) => handleChange("status", e.target.value)}
          className="border rounded px-3 py-2"
        >
          <option value="">Status</option>
          {constants.STATUS.map((d) => (
            <option key={d}>{d}</option>
          ))}
        </select>

        <button
          onClick={() => navigate("/rti/create")}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          + RTI Registration
        </button>
      </div>
    </div>
  );
}

export default RtiViewTopbar;