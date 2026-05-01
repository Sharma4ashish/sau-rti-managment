function RtiRow({ data }) {
  const getStatusColor = (status) => {
    switch (status) {
      case "Verified":
        return "text-green-600";
      case "Pending":
        return "text-yellow-600";
      case "Rejected":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  return (
    <tr className="border-t">
      <td className="p-3">{data.rtiNo}</td>
      <td className="p-3">{data.applicant}</td>
      <td className="p-3">{data.department}</td>
      <td className="p-3">{data.date}</td>
      <td className={`p-3 font-semibold   ${getStatusColor(data.status)}`}>
        {data.status}
      </td>
      <td className="p-3">
        <div className="flex gap-2">
          <button className="border px-2 py-1 rounded">👁</button>
          <button className="border px-2 py-1 rounded">✏️</button>
          <button className="border px-2 py-1 rounded">🗑</button>
        </div>
      </td>
    </tr>
  );
}

export default RtiRow;