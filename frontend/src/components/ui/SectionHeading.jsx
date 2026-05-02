
export function SectionHeading({ children, withDivider = true }) {
  return (
    <div className={withDivider ? "border-t border-gray-200 pt-6" : ""}>
      <h2 className="mb-4 text-lg font-semibold text-gray-800">
        {children}
      </h2>
    </div>
  );
}