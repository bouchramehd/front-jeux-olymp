export default function MedalIcon({ type = "gold", size = 16 }) {
  const color =
    type === "gold" ? "#FBBF24" : type === "silver" ? "#D1D5DB" : "#F59E0B"

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      style={{ display: "inline-block", verticalAlign: "middle" }}
    >
      {/* ribbon */}
      <path d="M7 2h4l1 4-3 2-2-6z" fill="#60A5FA" opacity="0.9" />
      <path d="M13 2h4l-2 6-3-2 1-4z" fill="#3B82F6" opacity="0.9" />

      {/* medal */}
      <circle cx="12" cy="15" r="6" fill={color} />
      <circle cx="12" cy="15" r="4" fill="black" opacity="0.12" />
    </svg>
  )
}
