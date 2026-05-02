const InfoSection = ({ title, children }) => {
  return (
    <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm mb-6">
      <h2 className="text-base sm:text-lg font-semibold mb-4">
        {title}
      </h2>

      <div className="
        grid 
        grid-cols-1 
        sm:grid-cols-2 
        lg:grid-cols-3 
        gap-4 sm:gap-6
      ">
        {children}
      </div>
    </div>
  );
};