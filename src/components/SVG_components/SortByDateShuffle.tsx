export default function ShuffleByDate() {
  return (
    // <p className={"font-bold text-slate-600 cursor-pointer"}>Сортировка 1</p>
    <svg
      className="cursor-pointer"
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
    >
      <circle
        cx="16"
        cy="16"
        r="16"
        transform="rotate(180 16 16)"
        fill="#991B1B"
      />
      <path
        d="M7 18.9521L11 22.9998L15 18.9521"
        stroke="white"
        strokeLinecap="round"
      />
      <path d="M11 22.46V6.26953" stroke="white" strokeLinecap="round" />
      <path
        d="M17 18.9521L21 22.9998L25 18.9521"
        stroke="white"
        strokeLinecap="round"
      />
      <path d="M21 22.46V6.26953" stroke="white" strokeLinecap="round" />
    </svg>
  );
}
