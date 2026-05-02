import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { rtiSchema } from "../utils/rtiSchema";
import { createRTI } from "../services/rtiService";

import { FormInput } from "../components/form/FormInput";
import { FormSelect } from "../components/form/FormSelect";
import { FormDate } from "../components/form/FormDate";
import { FormFile } from "../components/form/FormFile";

export default function CreateRTI() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(rtiSchema),
  });

  const onSubmit = async (data, isDraft = false) => {
    try {
      // Get all form values including files
      const formValues = getValues();

      // Handle file inputs
      const uploadApplication = formValues.uploadApplication?.[0]; // Single file
      const additionalAttachments = formValues.additionalAttachments || []; // Multiple files

      console.log("uploadApplication:", uploadApplication);
      console.log("attachments:", additionalAttachments);
      console.log("attachments length:", additionalAttachments.length);

      const payload = {
        ...data,
        isDraft: isDraft,
        uploadApplication: uploadApplication,
        additionalAttachments: additionalAttachments,
      };

      console.log("Frontend payload:", payload);

      // Uncomment when ready to submit
      await createRTI(payload);

      toast.success(
        isDraft ? "Draft saved successfully" : "RTI submitted successfully",
      );

      navigate("/");
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Something went wrong");
    }
  };

  //     const onSubmit = async (data, isDraft = false) => {
  //   try {
  //     const formValues = getValues();

  //     const uploadApplication = formValues.uploadApplication?.[0];
  //     const additionalAttachments = formValues.additionalAttachments
  //       ? Array.from(formValues.additionalAttachments)
  //       : [];

  //     // ✅ Build FormData instead of a plain object
  //     const formData = new FormData();

  //     // Append all non-file fields
  //     Object.entries(data).forEach(([key, value]) => {
  //       if (value !== undefined && value !== null) {
  //         formData.append(key, value);
  //       }
  //     });

  //     formData.append("isDraft", isDraft);

  //     // Append single file
  //     if (uploadApplication) {
  //       formData.append("uploadApplication", uploadApplication);
  //     }

  //     // Append multiple files
  //     additionalAttachments.forEach((file) => {
  //       formData.append("additionalAttachments", file);
  //     });

  //     console.log("FormData entries:" , formData);
  //     await createRTI(formData); // ✅ pass formData, not payload

  //     toast.success(isDraft ? "Draft saved successfully" : "RTI submitted successfully");
  //     navigate("/");
  //   } catch (err) {
  //     console.error(err);
  //     toast.error(err.message || "Something went wrong");
  //   }
  // };

  return (
    <div className="p-6">
      <div className="bg-white rounded-xl shadow p-6 max-w-5xl mx-auto">
        <h2 className="text-xl font-semibold mb-6">RTI Registration</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* ================= Applicant Details ================= */}
          <Section title="Applicant Details">
            <Grid>
              <FormInput
                label="Applicant Name"
                name="applicantName"
                placeholder={"Enter"}
                register={register}
                required
                error={errors.applicantName}
              />

              <FormSelect
                label="Gender"
                name="gender"
                placeholder={"Select"}
                required={true}
                register={register}
                options={["Male", "Female", "Other"]}
                error={errors.gender}
              />

              <FormInput
                label="Contact Number"
                name="contactNumber"
                placeholder={"Enter"}
                register={register}
                required
                error={errors.contactNumber}
              />

              <FormInput
                label="Email ID"
                name="emailId"
                placeholder={"Enter"}
                register={register}
                error={errors.emailId}
              />

              <FormInput
                label="Address"
                name="address"
                placeholder={"Enter"}
                register={register}
                error={errors.address}
              />
            </Grid>
          </Section>

          {/* ================= RTI Details ================= */}
          <Section title="RTI Details">
            <Grid>
              <FormInput
                label="RTI Case Number"
                name="rtiCaseNumber"
                register={register}
                readOnly    
                className="bg-gray-200 text-gray-700 border-dashed cursor-not-allowed"   
                placeholder={"RTI/YYYY/DEPT/XXXX (auto-generated)"}
                required
                error={errors.rtiCaseNumber}
              />

              <FormInput
                label="Subject"
                name="subject"
                register={register}
                placeholder={"Enter"}

                required
                error={errors.subject}
              />

              <FormSelect
                label="Application Mode"
                name="applicationMode"
                register={register}
                required
                options={["Online", "Offline"]}
                error={errors.applicationMode}
              />

              <FormDate
                label="Date of Receipt"
                name="dateOfReceipt"
                register={register}
                required
                error={errors.dateOfReceipt}
              />

              <FormInput
                label="Description"
                name="description"
                register={register}
                placeholder={"Enter"}
                error={errors.description}
              />
            </Grid>
          </Section>

          {/* ================= Department ================= */}
          <Section title="Department Details">
            <Grid>
              <FormSelect
                label="Department"
                name="department"
                register={register}
                required
                options={["Manager", "Supervisor", "Accountant"]}
                error={errors.department}
              />

              <FormInput
                label="Assigned Officer"
                placeholder={"Enter"}

                name="assignedOfficer"
                register={register}
                error={errors.assignedOfficer}
              />
            </Grid>
          </Section>

          {/* ================= Timeline ================= */}
          <Section title="Timeline Details">
            <Grid>
              <FormDate
                label="Due Date"
                name="dueDate"
                register={register}
                required
                error={errors.dueDate}
              />

              <FormDate
                label="Extended Due Date"
                name="extendedDueDate"
                
                register={register}
                error={errors.extendedDueDate}
              />

              <FormSelect
                label="Reminder Frequency"
                name="reminderFrequency"
                register={register}
                required
                options={["3 Days", "5 Days", "7 Days", "15 Days"]}
                error={errors.reminderFrequency}
              />
            </Grid>
          </Section>

          {/* ================= Upload ================= */}
          <Section title="Upload Documents">
            <div className="grid md:grid-cols-2 gap-4">
              <FormFile
                label="Upload Application"
                name="uploadApplication"
                register={register}
              />

              <FormFile
                label="Additional Attachments"
                name="additionalAttachments"
                register={register}
                multiple // ✅ VERY IMPORTANT
              />
            </div>
          </Section>

          {/* ================= Actions ================= */}
          <div className="flex justify-end gap-3">
            {/* Save Draft */}
            <button
              type="button"
              onClick={handleSubmit((data) => onSubmit(data, true))}
              className="px-4 py-2 border rounded-lg"
            >
              Save Draft
            </button>

            {/* Submit */}
            <button
              type="button"
              onClick={handleSubmit((data) => onSubmit(data, false))}
              disabled={isSubmitting}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg disabled:opacity-50"
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

/* ================= Reusable Layout Components ================= */

function Section({ title, children }) {
  return (
    <div>
      <h3 className="text-md font-semibold mb-3">{title}</h3>
      {children}
    </div>
  );
}

function Grid({ children }) {
  return <div className="grid md:grid-cols-2 gap-4">{children}</div>;
}
