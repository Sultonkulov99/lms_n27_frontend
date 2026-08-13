export default function AdminLoading() {
  return (
    <div className="flex-1 flex items-center justify-center h-full p-8">
      <div className="flex flex-col items-center">
        <div className="w-10 h-10 border-4 border-gray-200 border-t-[#407BFF] rounded-full animate-spin mb-4"></div>
        <p className="text-gray-500 font-medium">Yuklanmoqda...</p>
      </div>
    </div>
  );
}
