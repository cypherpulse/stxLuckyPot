interface BitcoinIconProps {
  size?: number;
  className?: string;
  glow?: boolean;
  style?: React.CSSProperties;
}

const BitcoinIcon = ({ size = 40, className = "", glow = false, style }: BitcoinIconProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={`${className} ${glow ? 'drop-shadow-[0_0_15px_hsl(24,100%,50%)]' : ''}`}
      style={style}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="50"
        cy="50"
        r="45"
        fill="hsl(24, 100%, 50%)"
        className={glow ? 'animate-pulse-glow' : ''}
      />
      <path
        d="M55 30V25H45V30M55 70V75H45V70M35 35H55C60.5228 35 65 39.4772 65 45C65 50.5228 60.5228 55 55 55H35V35ZM35 55H57C62.5228 55 67 59.4772 67 65C67 70.5228 62.5228 75 57 75H35V55Z"
        stroke="white"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <line x1="50" y1="22" x2="50" y2="30" stroke="white" strokeWidth="4" strokeLinecap="round" />
      <line x1="50" y1="70" x2="50" y2="78" stroke="white" strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
};

export default BitcoinIcon;
