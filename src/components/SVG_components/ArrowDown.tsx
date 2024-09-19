export default function ArrowDown() {
  return (
    <svg
      className="fixed top-[18%] inset-x-1/2 -ml-4 opacity-50 z-40 cursor-pointer"
      width="50"
      height="50"
      viewBox="0 0 50 50"
      fill="none"
    >
      <circle
        cx="25"
        cy="25"
        r="25"
        transform="rotate(180 25 25)"
        fill="#26A69A"
      />
      <path
        d="M12.5 17.8574L25 32.1431L37.5 17.8574"
        stroke="white"
        strokeWidth="6"
        strokeLinecap="round"
      />
    </svg>
  );
}
