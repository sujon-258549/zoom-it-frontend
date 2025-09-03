export default function MotionButton({ text }: { text: string }) {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="relative">
        <button className="relative inline-block p-px font-semibold leading-6 text-white bg-neutral-900 rounded-2xl shadow-lg cursor-pointer">
          {/* Static gradient border */}
          <span className="absolute inset-0 rounded-2xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-[2px] opacity-75"></span>

          {/* Button content */}
          <span className="relative z-10  px-6 py-1.5 rounded-2xl bg-neutral-950 flex items-center space-x-3">
            <span>{text}</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-5 h-5"
            >
              <path d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z" />
            </svg>
          </span>
        </button>
      </div>
    </div>
  );
}
