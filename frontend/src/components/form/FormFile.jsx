export function FormFile({
  label,
  name,
  register,
  required,
  error,
  multiple = false, // ✅ add this
}) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      <input
        type="file"
        multiple={multiple} // ✅ important
        {...register(name)}
        className="w-full border rounded px-3 py-2 text-sm"
      />

      {error && (
        <p className="text-xs text-red-500 mt-1">{error.message}</p>
      )}
    </div>
  );
}