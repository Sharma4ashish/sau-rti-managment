import { useNavigate } from "react-router-dom";

function RtiRow({ data, onDelete }) {
  const navigate = useNavigate();

  const getStatusColor = (status) => {
    switch (status) {
      case "Verified":
        return "text-green-600";
      case "Pending":
        return "text-yellow-600";
      case "Rejected":
        return "text-red-600";
      case "Save Draft":
        return "text-blue-600";
      default:
        return "text-gray-600";
    }
  };

  return (
    <tr
      className="border-t hover:bg-gray-50 cursor-pointer"
      onClick={() => navigate(`/rti/${data._id}`)}
    >
      <td className="p-3">{data.rtiCaseNumber || "-"}</td>
      <td className="p-3">{data.applicantName || "-"}</td>
      <td className="p-3">{data.department || "-"}</td>

      <td className="p-3">
        {data.createdAt ? new Date(data.createdAt).toLocaleDateString() : "-"}
      </td>

      <td className={`p-3 font-semibold ${getStatusColor(data.status)}`}>
        {data.status || "-"}
      </td>

      {/* ACTIONS */}
      <td className="p-3" onClick={(e) => e.stopPropagation()}>
        <div className="flex gap-2">
          <button
            onClick={() => navigate(`/rti/${data._id}`)}
            className="border px-2 py-1 rounded hover:bg-gray-100"
          >
            👁
          </button>

          <button
            onClick={() => navigate(`/rti/edit/${data._id}`)}
            className="border px-2 py-1 rounded hover:bg-gray-100"
          >
            ✏️
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation(); // 🔥 important
              onDelete(data._id);
            }}
            className="border px-2 py-1 rounded hover:bg-red-100"
          >
            🗑
          </button>
        </div>
      </td>
    </tr>
  );
}

export default RtiRow;
