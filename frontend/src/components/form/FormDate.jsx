export function FormDate({
  label,
  name,
  register,
  rules = {},
  required,
  error,
}) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      <input
        id={name}
        type="date"
        {...register(name, {
          ...rules,
          ...(required && { required: `${label} is required` }),
        })}
        className={`w-full border rounded px-3 py-2 outline-none focus:ring-2 ${
          error
            ? "border-red-500 focus:ring-red-200"
            : "border-gray-300 focus:ring-blue-200"
        }`}
      />

      {error && (
        <p className="text-xs text-red-500 mt-1">{error.message}</p>
      )}
    </div>
  );
}