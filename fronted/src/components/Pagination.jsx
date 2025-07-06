export default function Pagination({ totalPages, currentPage, setCurrentPage }) {
    return (
      <div className="flex flex-wrap justify-center mt-6 gap-2">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-3 py-1 sm:px-4 sm:py-2 text-sm sm:text-base rounded-lg ${
              currentPage === i + 1
                ? "bg-indigo-600 text-white"
                : "bg-white/10 text-white hover:bg-indigo-400"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    );
  }
  