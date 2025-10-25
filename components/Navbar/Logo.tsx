const Logo = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <circle
        cx="20"
        cy="20"
        r="18"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
      />
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="central"
        fontFamily="Fira Code, monospace"
        fontWeight="bold"
        fontSize="20"
        fill="currentColor">
        W
      </text>
    </svg>
  )
}

export default Logo
