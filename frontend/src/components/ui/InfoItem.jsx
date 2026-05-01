const InfoItem = ({ label, value }) => {
  return (
    <div className="min-w-0">
      <p className="text-xs sm:text-sm text-gray-500 mb-1">
        {label}
      </p>

      <p className="
        font-medium 
        text-sm sm:text-base 
        text-gray-800 
        break-words
      ">
        {value || "-"}
      </p>
    </div>
  );
};