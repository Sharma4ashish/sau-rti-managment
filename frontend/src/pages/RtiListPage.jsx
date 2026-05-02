  import { useState, useEffect } from "react";
  import RtiTable from "../components/RtiTableView";
  import RtiViewTopbar from "../components/RtiViewTopbar";
  import { useRTIs } from "../hooks/useRTIs";
  import TableFooter from "../components/TableFooter";
  import ConfirmDialog from "../components/ui/ConfirmDialog";
  import toast from "react-hot-toast";

  function RTIListPage() {
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);

    const [filters, setFilters] = useState({
      date: "",
      department: "",
      status: "",
    });

    const [deleteId, setDeleteId] = useState(null);
    const [deleting, setDeleting] = useState(false);
    
    const { data, loading, deleteItem } = useRTIs({ page, limit, filters });

    console.log(data);
    
    
    const handleDelete = async () => {
      try {
        setDeleting(true);
        await deleteItem(deleteId);
        toast.error("RTI deleted successfully");
        setDeleteId(null);
      } catch (err) {
        console.error(err);
      } finally {
        setDeleting(false);
      }
    };


    useEffect(() => {
      setPage(1);
    }, [filters, limit]);

    return (
      <div>
        <RtiViewTopbar filters={filters} setFilters={setFilters} />

        {loading ? (
          <p className="p-4">Loading...</p>
        ) : (
          <>
            <RtiTable data={data?.data || [] } onDelete={(id) => setDeleteId(id)} />

            <TableFooter
              page={page}
              totalPages={data?.pagination?.totalPages || 1}
              limit={limit}
              setPage={setPage}
              setLimit={setLimit}
            />
          </>
        )}
            <ConfirmDialog
              isOpen={!!deleteId}
              onClose={() => setDeleteId(null)}
              onConfirm={handleDelete}
              loading={deleting}
            />
      </div>
    );
  }

  export default RTIListPage;
