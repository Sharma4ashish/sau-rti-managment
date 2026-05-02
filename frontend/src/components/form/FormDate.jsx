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
      <label className="block text-sm font-medium mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      <input
        type="date"
        {...register(name, rules)}
        className={`w-full border rounded px-3 py-2 ${
          error ? "border-red-500" : "border-gray-300"
        }`}
      />

      {error && (
        <p className="text-xs text-red-500 mt-1">
          {error.message}
        </p>
      )}
    </div>
  );
}   