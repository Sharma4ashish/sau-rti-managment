import RtiRow from "./RtiRow";

const dummyData = [
  {
    rtiNo: "RTI/2025/DEP/0001",
    applicant: "James Kirwin",
    department: "Manager",
    date: "10-12-2025",
    status: "Verified",
  },
  {
    rtiNo: "RTI/2025/DEP/0002",
    applicant: "Francis Chang",
    department: "Supervisor",
    date: "10-12-2025",
    status: "Pending",
  },
];

function RtiTable() {
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-gray-100 text-gray-600">
          <tr>
            <th className="p-3 text-left">RTI No.</th>
            <th className="p-3 text-left">Applicant</th>
            <th className="p-3 text-left">Department</th>
            <th className="p-3 text-left">Date</th>
            <th className="p-3 text-left">Status</th>
            <th className="p-3 text-left">Action</th>
          </tr>
        </thead>

        <tbody>
          {dummyData.map((item, index) => (
            <RtiRow key={index} data={item} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default RtiTable;