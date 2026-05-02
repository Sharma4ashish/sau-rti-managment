import RtiRow from "./RtiRow";

function RtiTable({ data = [], onDelete }) {
  
  return (
    <div className="bg-white rounded-lg shadow">

      <div className="overflow-x-auto">
        <table className="min-w-[700px] w-full text-sm">
          
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
            {data.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center p-4">
                  No RTIs found
                </td>
              </tr>
            ) : (
              data.map((item, index) => (
                <RtiRow key={item._id  || index} data={item} onDelete={onDelete} />
              ))
            )}
          </tbody>

        </table>
      </div>
    </div>
  );
}

export default RtiTable;