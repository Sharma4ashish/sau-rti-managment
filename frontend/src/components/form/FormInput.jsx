export function FormInput({
  label,
  name,
  register,
  rules = {},
  required,
  error,
  type = "text",
  placeholder,
}) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      <input
        type={type}
        placeholder={placeholder}
        {...register(name, rules)}
        className={`w-full rounded border px-3 py-2 text-sm ${
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