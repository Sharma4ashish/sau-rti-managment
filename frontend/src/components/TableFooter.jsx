function TableFooter({ page, totalPages, limit, setPage, setLimit }) {

    return (
        <div className="flex flex-col md:flex-row justify-between items-center p-4 gap-4">

            {/* Rows per page */}
            <div className="flex items-center gap-2 text-sm">
                <span>Rows per page:</span>
                <select
                    value={limit}
                    onChange={(e) => setLimit(Number(e.target.value))}
                    className="border px-2 py-1 rounded"
                >
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                </select>
            </div>

            {/* Pagination */}
            <div className="flex items-center gap-2">

                <button
                    disabled={page === 1}
                    onClick={() => setPage(page - 1)}
                    className="px-2"
                >
                    {"<"}
                </button>

                {[...Array(totalPages || 1)].map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setPage(i + 1)}
                        className={`px-3 py-1 rounded ${page === i + 1 ? "bg-blue-600 text-white" : "border"
                            }`}
                    >
                        {i + 1}
                    </button>
                ))}

                <button
                    disabled={page === (totalPages || 1)}
                    onClick={() => setPage(page + 1)}
                    className="px-2"
                >
                    {">"}
                </button>
            </div>
        </div>
    );
}

export default TableFooter;