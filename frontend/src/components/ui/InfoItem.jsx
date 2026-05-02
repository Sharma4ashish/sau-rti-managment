export function InfoItem({ label, value, className = "" }) {
  return (
    <div className={className}>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="mt-1 text-base font-medium text-gray-900">
        {value}
      </p>
    </div>
  );
}