export default function ArrowUp() {
  return (
    <svg
      className="rotate-180 fixed sm:top-[82%] top-[92%] inset-x-1/2 -ml-6 opacity-100 cursor-pointer hover:scale-105"
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
        fill="url(#paint0_linear_3412_13)"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.5245 15.5977C11.7714 14.5067 13.6667 14.633 14.7578 15.8799L25 27.5854L35.2423 15.8799C36.3334 14.633 38.2286 14.5067 39.4756 15.5977C40.7225 16.6888 40.8488 18.5841 39.7578 19.831L25 36.697L10.2423 19.831C9.15127 18.5841 9.27762 16.6888 10.5245 15.5977Z"
        fill="white"
      />
      <defs>
        <linearGradient
          id="paint0_linear_3412_13"
          x1="25"
          y1="50"
          x2="25"
          y2="1.90735e-06"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#80CCFF" />
          <stop offset="1" stopColor="#72BBEB" />
        </linearGradient>
      </defs>
    </svg>
  );
}
