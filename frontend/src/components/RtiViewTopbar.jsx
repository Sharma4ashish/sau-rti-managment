import constants from "../utils/constants";

function RtiViewTopbar() {
  return (
    <div className="flex flex-col gap-4 mb-6 md:flex-row md:justify-between md:items-center">

      {/* Title */}
      <h2 className="text-xl font-semibold"> RTI</h2>

      {/* Filters */}
      <div className="flex flex-col gap-3 md:flex-row md:items-center">

        <select className="border rounded px-3 py-2 w-full md:w-auto">
          <option>{constants.DATE[0]}</option>
          <option>{constants.DATE[1]}</option>
        </select>

        <select className="border rounded px-3 py-2 w-full md:w-auto">
          <option>{constants.DEPARTMENTS[0]}</option>
          <option>{constants.DEPARTMENTS[1]}</option>
          <option>{constants.DEPARTMENTS[2]}</option>
        </select>

        <select className="border rounded px-3 py-2 w-full md:w-auto">
          <option>Status</option>
        </select>

        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg w-full md:w-auto">
          + RTI Registration
        </button>
      </div>
    </div>
  );
}

export default RtiViewTopbar;