import { useForm } from "react-hook-form";
import { FormInput } from "../components/form/FormInput";
import { FormSelect } from "../components/form/FormSelect";
import { FormDate } from "../components/form/FormDate";

function SectionHeading({ title }) {
  return (
    <div className="border-t pt-5 mt-6">
      <h3 className="font-semibold mb-4">{title}</h3>
    </div>
  );
}

export function RTIRegistrationForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Submit:", data);
  };

  const onSaveDraft = (data) => {
    console.log("Draft:", data);
  };

  return (
    <div className="bg-white rounded-lg shadow p-5 md:p-8">
      <h2 className="text-lg font-bold mb-4">RTI Registration</h2>

      <form onSubmit={handleSubmit(onSubmit)}>

        {/* Applicant */}
        <SectionHeading title="Applicant Details" />

        <div className="grid md:grid-cols-3 gap-4">
          <FormInput
            label="Applicant Name"
            name="applicantName"
            register={register}
            required
            rules={{ required: "Name is required" }}
            error={errors.applicantName}
          />

          <FormSelect
            label="Gender"
            name="gender"
            register={register}
            options={["Male", "Female"]}
          />

          <FormInput
            label="Contact Number"
            name="contactNumber"
            register={register}
            required
            rules={{ required: "Contact is required" }}
            error={errors.contactNumber}
          />

          <FormInput
            label="Email"
            name="email"
            register={register}
            type="email"
          />

          <div className="md:col-span-2">
            <FormInput
              label="Address"
              name="address"
              register={register}
            />
          </div>
        </div>

        {/* RTI */}
        <SectionHeading title="RTI Details" />

        <div className="grid md:grid-cols-3 gap-4">
          <FormInput
            label="Case Number"
            name="caseNumber"
            register={register}
            required
            rules={{ required: "Case number required" }}
            error={errors.caseNumber}
          />

          <FormInput
            label="Subject"
            name="subject"
            register={register}
            required
            rules={{ required: "Subject required" }}
            error={errors.subject}
          />

          <FormSelect
            label="Application Mode"
            name="mode"
            register={register}
            required
            rules={{ required: "Mode required" }}
            error={errors.mode}
            options={["Online", "Offline"]}
          />

          <FormDate
            label="Date of Receipt"
            name="date"
            register={register}
            required
            rules={{ required: "Date required" }}
            error={errors.date}
          />

          <div className="md:col-span-3">
            <textarea
              {...register("description")}
              placeholder="Description"
              className="w-full border rounded px-3 py-2"
            />
          </div>
        </div>

        {/* Timeline */}
        <SectionHeading title="Timeline Details" />

        <div className="grid md:grid-cols-3 gap-4">
          <FormDate
            label="Due Date"
            name="dueDate"
            register={register}
            required
            rules={{ required: "Due date required" }}
            error={errors.dueDate}
          />

          <FormDate
            label="Extended Date"
            name="extendedDate"
            register={register}
          />

          <FormSelect
            label="Reminder"
            name="reminder"
            register={register}
            options={["Daily", "Weekly"]}
          />
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 mt-6">
          <button
            type="button"
            onClick={handleSubmit(onSaveDraft)}
            className="bg-gray-200 px-4 py-2 rounded"
          >
            Save Draft
          </button>

          <button
            type="submit"
            className="bg-blue-900 text-white px-4 py-2 rounded"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}