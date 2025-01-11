export default function PlusIcon({ size = 14.255, color = 'currentColor' }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size}>
      <path
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        d="M7.129 0v14.255M0 7.129h14.255"
      ></path>
    </svg>
  )
}
