function Voice({ color }: any) {
  return (
    <svg
      className="!w-6 !h-6"
      width="19"
      height="21"
      viewBox="0 0 19 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M17.1816 10.5V11.5C17.1816 15.9183 13.5999 19.5 9.18164 19.5C4.76336 19.5 1.18164 15.9183 1.18164 11.5V10.5M9.18164 15.5C6.9725 15.5 5.18164 13.7091 5.18164 11.5V5.5C5.18164 3.29086 6.9725 1.5 9.18164 1.5C11.3908 1.5 13.1816 3.29086 13.1816 5.5V11.5C13.1816 13.7091 11.3908 15.5 9.18164 15.5Z"
        stroke={color}
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}

export default Voice;
