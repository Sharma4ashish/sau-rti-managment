
import { useState } from "react";
import RtiTable from "../components/RtiTableView";
import RtiViewTopbar from "../components/RtiViewTopbar";
import { useRTIs } from "../hooks/useRTIs";

function RTIListPage() {

  const [page, setPage] = useState(1);
  const { data, loading } = useRTIs(page);
  
  return (
    <div>
      <RtiViewTopbar />
      {loading ? (
        <p className="p-4">Loading...</p>
      ) : (
        <RtiTable data={data?.data || []} />
      )}    </div>
  );
}

export default RTIListPage;