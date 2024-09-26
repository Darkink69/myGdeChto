export default function SortByDate() {
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
        fill="#94A3B8"
      />
      <path
        d="M8 19.9521L12 23.9998L16 19.9521"
        stroke="white"
        strokeLinecap="round"
      />
      <path d="M12 23.46V7.26953" stroke="white" strokeLinecap="round" />
      <path
        d="M24 11.0479L20 7.00023L16 11.0479"
        stroke="white"
        strokeLinecap="round"
      />
      <path d="M20 7.53999L20 23.7305" stroke="white" strokeLinecap="round" />
    </svg>
  );
}
