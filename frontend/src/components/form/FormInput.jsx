export function FormInput({
  label,
  name,
  register,
  rules = {},
  required,
  error,
  disabled,
  type = "text",
  placeholder,
  className,
  ...props
}) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      <input
        {...props}
        id={name}
        type={type}
        placeholder={placeholder}
        {...register(name, {
          ...rules,
          ...(required && { required: `${label} is required` }),
        })}
        disabled={disabled} 
        className={`w-full rounded border px-3 py-2 text-sm outline-none focus:ring-2 ${
          error
            ? "border-red-500 focus:ring-red-200"
            : "border-gray-300 focus:ring-blue-200"
        } ${className || ""}`}
      />

      {error && (
        <p className="text-xs text-red-500 mt-1">{error.message}</p>
      )}
    </div>
  );
}