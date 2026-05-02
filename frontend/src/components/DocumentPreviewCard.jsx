import { Eye } from "lucide-react";

export function DocumentPreviewCard({ label, fileUrl, onView }) {
  
  const isImage =
    fileUrl &&
    (fileUrl.includes(".jpg") ||
      fileUrl.includes(".jpeg") ||
      fileUrl.includes("image"));
      

  const isPDF = fileUrl && fileUrl.includes(".pdf");

  const handleView = () => {
    if (onView) return onView();
    if (fileUrl) window.open(fileUrl, "_blank");
  };

  return (
    <div>
      <p className="mb-2 text-sm text-gray-500">{label}</p>

      <div className="relative w-full max-w-[220px] overflow-hidden rounded-md border border-gray-200 bg-white p-2 shadow-sm">

        {/* View Button */}
        {fileUrl && (
          <button
            onClick={handleView}
            className="absolute right-2 top-2 rounded bg-white/80 p-1 text-gray-500 hover:text-gray-800"
          >
            <Eye className="h-4 w-4" />
          </button>
        )}

        {/* Preview Area */}
        <div className="h-[140px] flex items-center justify-center bg-gray-50 rounded">

          {!fileUrl && (
            <p className="text-xs text-gray-400">No file uploaded</p>
          )}

          {/* Image Preview */}
          {isImage && (
            <img
              src={fileUrl}
              alt="preview"
              className="h-full w-full object-cover rounded"
            />
          )}

          {/* PDF Preview */}
          {isPDF && (
            <div className="flex flex-col items-center justify-center text-gray-600">
              <span className="text-3xl">📄</span>
              <p className="text-xs mt-1">PDF Document</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}