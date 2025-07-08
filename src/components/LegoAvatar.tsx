export default function LegoAvatar() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 200 200"
      aria-label="Nagizaaz Shaik"
      style={{ display: 'block', width: '100%', height: '100%' }}
    >
      <defs>
        <linearGradient id="lg-skin" x1="25%" y1="0%" x2="75%" y2="100%">
          <stop offset="0%" stopColor="#d08848" />
          <stop offset="100%" stopColor="#a86030" />
        </linearGradient>
        <linearGradient id="lg-suit" x1="20%" y1="0%" x2="80%" y2="100%">
          <stop offset="0%" stopColor="#20203a" />
          <stop offset="100%" stopColor="#0c0c18" />
        </linearGradient>
        <radialGradient id="lg-hair" cx="45%" cy="20%" r="75%">
          <stop offset="0%" stopColor="#2e1e10" />
          <stop offset="100%" stopColor="#0a0705" />
        </radialGradient>
        <linearGradient id="lg-sheen" x1="15%" y1="5%" x2="35%" y2="65%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.22)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </linearGradient>
      </defs>
      {/* LEGS */}
      <rect x="80" y="178" width="17" height="28" rx="3" fill="#181828" />
      <rect x="103" y="178" width="17" height="28" rx="3" fill="#181828" />
      <rect x="78" y="170" width="44" height="12" rx="3" fill="#1e1e32" />
      {/* TORSO */}
      <rect x="68" y="118" width="64" height="56" rx="6" fill="url(#lg-suit)" />
      <rect x="85" y="120" width="30" height="54" rx="2" fill="#efeffa" />
      <rect x="68" y="118" width="20" height="56" rx="6" fill="url(#lg-suit)" />
      <rect x="112" y="118" width="20" height="56" rx="6" fill="url(#lg-suit)" />
      <path d="M85,120 L75,134 L71,152 L84,148 L87,134Z" fill="#16162e" />
      <path d="M115,120 L125,134 L129,152 L116,148 L113,134Z" fill="#16162e" />
      <polygon points="100,128 97,134 98.5,164 100,166 101.5,164 103,134" fill="#12122a" />
      <polygon points="97,126 100,121 103,126 102,134 98,134" fill="#1c1c38" />
      <rect x="68" y="118" width="64" height="56" rx="6" fill="url(#lg-sheen)" />
      {/* ARMS CROSSED */}
      <path d="M70,127 Q54,134 47,147 Q42,158 47,165 Q57,176 80,175 Q95,174 110,169" stroke="#141428" strokeWidth="18" fill="none" strokeLinecap="round" />
      <path d="M130,127 Q146,134 153,147 Q158,158 153,165 Q143,176 120,175 Q105,174 90,169" stroke="#0e0e20" strokeWidth="16" fill="none" strokeLinecap="round" />
      <circle cx="110" cy="169" r="10" fill="url(#lg-skin)" />
      <rect x="105" y="166" width="10" height="8" rx="2" fill="rgba(0,0,0,0.28)" />
      <circle cx="90" cy="169" r="10" fill="url(#lg-skin)" />
      <rect x="85" y="166" width="10" height="8" rx="2" fill="rgba(0,0,0,0.28)" />
      {/* NECK */}
      <rect x="90" y="108" width="20" height="14" rx="4" fill="url(#lg-skin)" />
      {/* HEAD STUD */}
      <ellipse cx="100" cy="37" rx="13" ry="6" fill="#b86e28" />
      <ellipse cx="100" cy="34" rx="11" ry="5.5" fill="#c87838" />
      {/* HEAD BLOCK */}
      <rect x="64" y="39" width="72" height="73" rx="18" fill="url(#lg-skin)" />
      <rect x="64" y="39" width="72" height="73" rx="18" fill="url(#lg-sheen)" />
      {/* CURLY HAIR */}
      <ellipse cx="100" cy="41" rx="44" ry="37" fill="url(#lg-hair)" />
      <circle cx="66" cy="45" r="19" fill="#0c0806" />
      <circle cx="75" cy="27" r="21" fill="#0c0806" />
      <circle cx="93" cy="19" r="21" fill="#0c0806" />
      <circle cx="112" cy="18" r="20" fill="#0c0806" />
      <circle cx="129" cy="26" r="18" fill="#0c0806" />
      <circle cx="138" cy="41" r="17" fill="#0c0806" />
      <ellipse cx="93" cy="25" rx="26" ry="11" fill="rgba(255,255,255,0.09)" transform="rotate(-12,93,25)" />
      <ellipse cx="63" cy="68" rx="10" ry="22" fill="url(#lg-hair)" />
      <ellipse cx="137" cy="68" rx="10" ry="22" fill="url(#lg-hair)" />
      {/* EYEBROWS */}
      <path d="M75,58 Q86,51 96,56" stroke="#1a0d06" strokeWidth="4.5" fill="none" strokeLinecap="round" />
      <path d="M104,56 Q114,51 125,58" stroke="#1a0d06" strokeWidth="4.5" fill="none" strokeLinecap="round" />
      {/* LEFT EYE */}
      <ellipse cx="86" cy="68" rx="11" ry="12" fill="white" />
      <circle cx="87" cy="69" r="8.5" fill="#1c1005" />
      <circle cx="87" cy="69" r="4.8" fill="#060402" />
      <circle cx="91" cy="65" r="3" fill="white" opacity="0.9" />
      {/* RIGHT EYE */}
      <ellipse cx="114" cy="68" rx="11" ry="12" fill="white" />
      <circle cx="113" cy="69" r="8.5" fill="#1c1005" />
      <circle cx="113" cy="69" r="4.8" fill="#060402" />
      <circle cx="117" cy="65" r="3" fill="white" opacity="0.9" />
      {/* NOSE */}
      <circle cx="97" cy="82" r="2.8" fill="rgba(155,80,38,0.58)" />
      <circle cx="103" cy="82" r="2.8" fill="rgba(155,80,38,0.58)" />
      {/* SMILE */}
      <path d="M78,93 Q100,110 122,93" stroke="#8a3e1a" strokeWidth="3.5" fill="none" strokeLinecap="round" />
      <path d="M80,94 Q100,108 120,94 Q119,101 100,102 Q81,101 80,94Z" fill="white" opacity="0.9" />
      {/* CHEEKS */}
      <circle cx="77" cy="89" r="6" fill="rgba(255,100,65,0.22)" />
      <circle cx="123" cy="89" r="6" fill="rgba(255,100,65,0.22)" />
      {/* STUBBLE */}
      <ellipse cx="100" cy="103" rx="22" ry="7" fill="rgba(15,8,3,0.18)" />
    </svg>
  )
}
