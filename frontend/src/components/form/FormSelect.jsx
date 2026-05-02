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
      <label htmlFor={name} className="block text-sm font-medium mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      <select
        id={name}
        {...register(name, {
          ...rules,
          ...(required && { required: `${label} is required` }),
        })}
        className={`w-full border rounded px-3 py-2 text-sm outline-none focus:ring-2 ${
          error
            ? "border-red-500 focus:ring-red-200"
            : "border-gray-300 focus:ring-blue-200"
        }`}
      >
        <option value="">Select</option>

        {options.map((opt, i) => (
          <option
            key={i}
            value={typeof opt === "string" ? opt : opt.value}
          >
            {typeof opt === "string" ? opt : opt.label}
          </option>
        ))}
      </select>

      {error && (
        <p className="text-xs text-red-500 mt-1">{error.message}</p>
      )}
    </div>
  );
}