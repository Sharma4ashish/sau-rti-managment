import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { InfoItem } from "../components/ui/InfoItem";
import { DocumentPreviewCard } from "../components/DocumentPreviewCard";
import { SectionHeading } from "../components/ui/SectionHeading";
import { useRTIDetails } from "../hooks/useRTIDetails";

export function RTIDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, loading, error } = useRTIDetails(id);

  console.log("DATA:", data);

  if (loading) return <p className="p-6">Loading...</p>;
  if (error) return <p className="p-6 text-red-500">{error}</p>;
  if (!data) return <p className="p-6">No data found</p>;

  return (
    <div className="rounded-lg bg-white p-5 shadow-sm md:p-8">

      {/* Top */}
      <div className="mb-6 flex items-center gap-3">
        <button
          onClick={() => navigate(-1)}
          className="flex h-8 w-8 items-center justify-center hover:bg-gray-100"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>

        <h1 className="text-lg font-bold md:text-xl">
          RTI Registration Details
        </h1>
      </div>

      {/* Applicant */}
      <SectionHeading withDivider={false}>
        Applicant Details
      </SectionHeading>

      <div className="grid md:grid-cols-3 gap-5">
        <InfoItem label="Applicant Name" value={data?.applicantName || "-"} />
        <InfoItem label="Gender" value={data?.gender || "-"} />
        <InfoItem label="Contact Number" value={data?.contactNumber || "-"} />
        <InfoItem label="Email ID" value={data?.emailId || "-"} />
        <InfoItem
          label="Address"
          value={data?.address || "-"}
          className="md:col-span-2"
        />
      </div>

      {/* RTI DETAILS */}
      <div className="mt-8">
        <SectionHeading>RTI Details</SectionHeading>

        <div className="grid md:grid-cols-3 gap-5">
          <InfoItem label="Case Number" value={data?.rtiCaseNumber || "-"} />
          <InfoItem label="Subject" value={data?.subject || "-"} />
          <InfoItem label="Application Mode" value={data?.applicationMode || "-"} />

          <InfoItem
            label="Date of Receipt"
            value={
              data?.dateOfReceipt
                ? new Date(data.dateOfReceipt).toLocaleDateString()
                : "-"
            }
          />

          <InfoItem
            label="Description"
            value={data?.description || "-"}
            className="md:col-span-2"
          />
        </div>
      </div>

      {/* DEPARTMENT */}
      <div className="mt-8">
        <SectionHeading>Department Details</SectionHeading>

        <div className="grid md:grid-cols-2 gap-5">
          <InfoItem label="Department" value={data?.department || "-"} />
          <InfoItem
            label="Assigned Officer"
            value={data?.assignedOfficer || "-"}
          />
        </div>
      </div>

      {/* TIMELINE */}
      <div className="mt-8">
        <SectionHeading>Timeline Details</SectionHeading>

        <div className="grid md:grid-cols-3 gap-5">
          <InfoItem label="Due Date" value={data?.dueDate || "-"} />
          <InfoItem
            label="Extended Due Date"
            value={data?.extendedDueDate || "-"}
          />
          <InfoItem
            label="Reminder Frequency"
            value={data?.reminderFrequency || "-"}
          />
        </div>
      </div>

      {/* DOCUMENTS */}
      <div className="mt-8">
        <SectionHeading>Uploaded Documents Details</SectionHeading>

        <div className="grid sm:grid-cols-2 gap-6">
          <DocumentPreviewCard
            label="Application"
            fileUrl={data?.uploadApplication?.path}
            onView={() =>
              data?.uploadApplication?.path &&
              window.open(data?.uploadApplication?.path, "_blank")
            }
          />

          {/* Multiple images to show max 2  */}
            {data?.additionalAttachments?.length > 0 ? (
              data.additionalAttachments.map((file, index) => (
                <DocumentPreviewCard
                  key={index}
                  label={`Attachment ${index + 1}`}
                  fileUrl={file?.path}
                />
              ))
            ) : (
              <DocumentPreviewCard label="Attachments" fileUrl={null} />
            )}
          
        </div>
      </div>
    </div>
  );
}