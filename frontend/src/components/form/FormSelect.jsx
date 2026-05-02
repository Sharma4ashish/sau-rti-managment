export function FormSelect({
  label,
  name,
  register,
  options = [],
  rules = {},
  required,
  error,
}) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      <select
        {...register(name, rules)}
        className={`w-full border rounded px-3 py-2 text-sm ${
          error ? "border-red-500" : "border-gray-300"
        }`}
      >
        <option value="">Select</option>
        {options.map((opt, i) => (
          <option key={i} value={opt}>
            {opt}
          </option>
        ))}
      </select>

      {error && (
        <p className="text-xs text-red-500 mt-1">
          {error.message}
        </p>
      )}
    </div>
  );
}