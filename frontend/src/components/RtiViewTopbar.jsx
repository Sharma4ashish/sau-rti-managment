import constants from "../utils/constants";

function RtiViewTopbar() {
  return (
    
    <div className="flex justify-between items-center mb-6">
      
      <h2 className="text-xl font-semibold">25000 RTI</h2>

      <div className="flex items-center gap-3">
        <select className="border rounded px-3 py-1">
          <option>{constants.DATE[0]    }</option>
          <option>{constants.DATE[1]}</option>
        </select>

        <select className="border rounded px-3 py-1">
          <option>{constants.DEPARTMENTS[0]}</option>
          <option>{constants.DEPARTMENTS[1]}</option>
          <option>{constants.DEPARTMENTS[2]}</option>
        </select>

        <select className="border rounded px-3 py-1">
          <option>Status</option>
        </select>

        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">
          + RTI Registration
        </button>
      </div>
    </div>

    
    
  );
}

export default RtiViewTopbar;


//  <div className="bg-white rounded-lg shadow overflow-hidden">
//       <table className="w-full text-sm">
        
//         <thead className="bg-gray-100 text-gray-600">
//           <tr>
//             <th className="p-3 text-left">RTI No.</th>
//             <th className="p-3 text-left">Applicant</th>
//             <th className="p-3 text-left">Department</th>
//             <th className="p-3 text-left">Date</th>
//             <th className="p-3 text-left">Status</th>
//             <th className="p-3 text-left">Action</th>
//           </tr>
//         </thead>

//         <tbody>
//           {/* rows will come here */}
//         </tbody>

//       </table>
//     </div> 