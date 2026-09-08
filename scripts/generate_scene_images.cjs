const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const outputDir = path.join(__dirname, '..', 'public', 'images');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Common SVG components
const commonStyles = `
  <defs>
    <linearGradient id="bgGrad" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#1e293b"/>
      <stop offset="70%" stop-color="#0f172a"/>
      <stop offset="100%" stop-color="#020617"/>
    </linearGradient>
    <linearGradient id="floorGrad" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#334155"/>
      <stop offset="100%" stop-color="#1e293b"/>
    </linearGradient>
    <linearGradient id="lockerGrad" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#475569"/>
      <stop offset="50%" stop-color="#64748b"/>
      <stop offset="100%" stop-color="#334155"/>
    </linearGradient>
    <linearGradient id="coatGrad" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="100%" stop-color="#e2e8f0"/>
    </linearGradient>
    <linearGradient id="cardGrad" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#1e293b" stop-opacity="0.95"/>
      <stop offset="100%" stop-color="#0f172a" stop-opacity="0.95"/>
    </linearGradient>
    <filter id="dropShadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="4" stdDeviation="6" flood-color="#000" flood-opacity="0.5"/>
    </filter>
  </defs>
`;

function renderRoomBackground() {
  return `
    <!-- Walls & Ceiling -->
    <rect width="1280" height="720" fill="url(#bgGrad)"/>
    
    <!-- Floor with clean tile perspective -->
    <polygon points="0,520 1280,520 1280,720 0,720" fill="url(#floorGrad)"/>
    <line x1="0" y1="520" x2="1280" y2="520" stroke="#0ea5e9" stroke-width="2" opacity="0.6"/>
    <line x1="200" y1="520" x2="100" y2="720" stroke="#475569" stroke-width="1.5" opacity="0.4"/>
    <line x1="450" y1="520" x2="400" y2="720" stroke="#475569" stroke-width="1.5" opacity="0.4"/>
    <line x1="750" y1="520" x2="800" y2="720" stroke="#475569" stroke-width="1.5" opacity="0.4"/>
    <line x1="1050" y1="520" x2="1180" y2="720" stroke="#475569" stroke-width="1.5" opacity="0.4"/>

    <!-- Ceiling Lights -->
    <rect x="220" y="20" width="260" height="18" rx="4" fill="#ffffff" opacity="0.85"/>
    <rect x="520" y="20" width="260" height="18" rx="4" fill="#ffffff" opacity="0.85"/>
    <rect x="820" y="20" width="260" height="18" rx="4" fill="#ffffff" opacity="0.85"/>

    <!-- Facility Header Ribbon -->
    <rect x="0" y="0" width="1280" height="50" fill="#090d16" opacity="0.8"/>
    <circle cx="35" cy="25" r="12" fill="#0284c7"/>
    <text x="35" y="30" fill="#ffffff" font-size="14" font-weight="bold" font-family="system-ui, sans-serif" text-anchor="middle">A</text>
    <text x="56" y="31" fill="#38bdf8" font-size="15" font-weight="bold" font-family="system-ui, sans-serif">ANYPHARM PHARMACEUTICALS</text>
    <text x="310" y="31" fill="#94a3b8" font-size="13" font-family="system-ui, sans-serif">| Cleanroom Gowning &amp; Locker Facility (Zone B)</text>

    <!-- Left Lockers Bank -->
    <g transform="translate(40, 110)">
      <rect width="260" height="420" rx="8" fill="url(#lockerGrad)" stroke="#64748b" stroke-width="3" filter="url(#dropShadow)"/>
      <line x1="130" y1="0" x2="130" y2="420" stroke="#334155" stroke-width="3"/>
      
      <!-- Grace's Locker -->
      <rect x="20" y="20" width="90" height="26" rx="4" fill="#1e293b" stroke="#475569" stroke-width="1"/>
      <text x="65" y="37" fill="#cbd5e1" font-size="11" font-family="system-ui, sans-serif" font-weight="bold" text-anchor="middle">GRACE</text>
      <rect x="25" y="60" width="80" height="6" rx="2" fill="#334155"/>
      <rect x="25" y="74" width="80" height="6" rx="2" fill="#334155"/>
      <rect x="25" y="88" width="80" height="6" rx="2" fill="#334155"/>
      <circle cx="105" cy="200" r="6" fill="#94a3b8"/>

      <!-- Susan's Locker -->
      <rect x="150" y="20" width="90" height="26" rx="4" fill="#0284c7" stroke="#38bdf8" stroke-width="1"/>
      <text x="195" y="37" fill="#ffffff" font-size="11" font-family="system-ui, sans-serif" font-weight="bold" text-anchor="middle">SUSAN</text>
      <rect x="155" y="60" width="80" height="6" rx="2" fill="#334155"/>
      <rect x="155" y="74" width="80" height="6" rx="2" fill="#334155"/>
      <rect x="155" y="88" width="80" height="6" rx="2" fill="#334155"/>
      <circle cx="155" cy="200" r="6" fill="#94a3b8"/>
    </g>

    <!-- Right: Production Floor Door -->
    <g transform="translate(1030, 140)">
      <rect width="210" height="390" rx="6" fill="#1e293b" stroke="#0ea5e9" stroke-width="3" filter="url(#dropShadow)"/>
      <rect x="20" y="40" width="170" height="150" rx="4" fill="#0369a1" opacity="0.3" stroke="#38bdf8" stroke-width="2"/>
      <rect x="15" y="10" width="180" height="22" rx="3" fill="#0284c7"/>
      <text x="105" y="26" fill="#ffffff" font-size="11" font-weight="bold" font-family="system-ui, sans-serif" text-anchor="middle">TO PRODUCTION FLOOR</text>
      <rect x="35" y="210" width="140" height="35" rx="4" fill="#ef4444" opacity="0.2" stroke="#ef4444" stroke-width="1.5"/>
      <text x="105" y="228" fill="#f87171" font-size="11" font-weight="bold" font-family="system-ui, sans-serif" text-anchor="middle">STRICT GDP AREA</text>
      <text x="105" y="240" fill="#cbd5e1" font-size="9" font-family="system-ui, sans-serif" text-anchor="middle">Permanent Ink Only</text>
    </g>
  `;
}

// Slide 1: Welcome / Day 1 Arrival
function generateSlide1() {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1280" height="720" viewBox="0 0 1280 720">
    ${commonStyles}
    ${renderRoomBackground()}

    <!-- Susan's Locker Open Sign / Welcome Post-it -->
    <g transform="translate(195, 230)">
      <rect width="90" height="110" rx="4" fill="#fef08a" stroke="#ca8a04" stroke-width="2" filter="url(#dropShadow)"/>
      <text x="45" y="30" fill="#854d0e" font-size="11" font-weight="bold" font-family="system-ui, sans-serif" text-anchor="middle">WELCOME,</text>
      <text x="45" y="52" fill="#854d0e" font-size="15" font-weight="bold" font-family="system-ui, sans-serif" text-anchor="middle">SUSAN!</text>
      <text x="45" y="75" fill="#a16207" font-size="11" font-family="system-ui, sans-serif" text-anchor="middle">DAY 1</text>
      <text x="45" y="94" fill="#ca8a04" font-size="9" font-family="system-ui, sans-serif" text-anchor="middle">Shift A: Test Strips</text>
    </g>

    <!-- Character 1: Grace (Supervisor) on Left -->
    <g transform="translate(420, 180)">
      <!-- Head -->
      <ellipse cx="90" cy="110" rx="48" ry="54" fill="#8d5b4c"/>
      <!-- Hair: dark curly -->
      <path d="M 40 100 Q 40 40 90 40 Q 140 40 140 100 Q 145 130 135 150 Q 130 100 90 85 Q 50 100 45 150 Z" fill="#291b15"/>
      <!-- Glasses -->
      <rect x="58" y="98" width="28" height="18" rx="4" fill="none" stroke="#0f172a" stroke-width="3"/>
      <rect x="94" y="98" width="28" height="18" rx="4" fill="none" stroke="#0f172a" stroke-width="3"/>
      <line x1="86" y1="107" x2="94" y2="107" stroke="#0f172a" stroke-width="3"/>
      <!-- Warm Smile -->
      <path d="M 75 135 Q 90 148 105 135" fill="none" stroke="#451a03" stroke-width="3.5" stroke-linecap="round"/>
      <!-- Lab Coat & Blue Shirt -->
      <path d="M 40 160 Q 90 170 140 160 L 170 420 L 10 420 Z" fill="url(#coatGrad)" stroke="#cbd5e1" stroke-width="2"/>
      <polygon points="75,160 90,210 105,160" fill="#0284c7"/>
      <!-- ID Badge -->
      <rect x="110" y="220" width="38" height="50" rx="3" fill="#ffffff" stroke="#94a3b8" stroke-width="1.5"/>
      <rect x="115" y="225" width="28" height="18" fill="#0284c7"/>
      <text x="129" y="255" fill="#0f172a" font-size="7" font-weight="bold" font-family="system-ui, sans-serif" text-anchor="middle">GRACE</text>
      <text x="129" y="264" fill="#64748b" font-size="6" font-family="system-ui, sans-serif" text-anchor="middle">SUPERVISOR</text>
      <!-- Welcoming Gesture Arm -->
      <path d="M 140 210 Q 180 230 200 210" fill="none" stroke="#8d5b4c" stroke-width="16" stroke-linecap="round"/>
      <!-- Name Tag label -->
      <rect x="35" y="440" width="110" height="30" rx="6" fill="#0284c7"/>
      <text x="90" y="460" fill="#ffffff" font-size="13" font-weight="bold" font-family="system-ui, sans-serif" text-anchor="middle">Grace (Senior)</text>
    </g>

    <!-- Character 2: Susan (New Trainee) on Right -->
    <g transform="translate(720, 185)">
      <!-- Head -->
      <ellipse cx="90" cy="110" rx="46" ry="52" fill="#fcd34d"/>
      <!-- Brown Hair ponytail -->
      <path d="M 45 105 Q 45 42 90 42 Q 135 42 135 105 Q 120 70 90 70 Q 55 70 45 105 Z" fill="#78350f"/>
      <ellipse cx="140" cy="80" rx="20" ry="32" fill="#78350f"/>
      <!-- Happy Eyes & Smile -->
      <circle cx="72" cy="104" r="5" fill="#1e293b"/>
      <circle cx="108" cy="104" r="5" fill="#1e293b"/>
      <path d="M 74 133 Q 90 148 106 133" fill="none" stroke="#78350f" stroke-width="3.5" stroke-linecap="round"/>
      <!-- Lab Coat & Trainee Badge -->
      <path d="M 40 160 Q 90 170 140 160 L 165 420 L 15 420 Z" fill="url(#coatGrad)" stroke="#cbd5e1" stroke-width="2"/>
      <polygon points="75,160 90,210 105,160" fill="#10b981"/>
      <!-- ID Badge -->
      <rect x="45" y="220" width="38" height="50" rx="3" fill="#ffffff" stroke="#94a3b8" stroke-width="1.5"/>
      <rect x="50" y="225" width="28" height="18" fill="#10b981"/>
      <text x="64" y="255" fill="#0f172a" font-size="7" font-weight="bold" font-family="system-ui, sans-serif" text-anchor="middle">SUSAN</text>
      <text x="64" y="264" fill="#059669" font-size="6" font-family="system-ui, sans-serif" text-anchor="middle">TRAINEE</text>
      <!-- Name Tag label -->
      <rect x="35" y="440" width="110" height="30" rx="6" fill="#10b981"/>
      <text x="90" y="460" fill="#ffffff" font-size="13" font-weight="bold" font-family="system-ui, sans-serif" text-anchor="middle">Susan (Day 1)</text>
    </g>

    <!-- Bottom Narrative Card -->
    <g transform="translate(240, 610)">
      <rect width="800" height="85" rx="12" fill="url(#cardGrad)" stroke="#0284c7" stroke-width="2" filter="url(#dropShadow)"/>
      <rect x="20" y="15" width="140" height="22" rx="4" fill="#0284c7"/>
      <text x="90" y="30" fill="#ffffff" font-size="11" font-weight="bold" font-family="system-ui, sans-serif" text-anchor="middle">SLIDE 1: GDP1.JPEG</text>
      <text x="175" y="31" fill="#38bdf8" font-size="14" font-weight="bold" font-family="system-ui, sans-serif">Morning Arrival at AnyPharm Locker Facility</text>
      <text x="20" y="60" fill="#e2e8f0" font-size="13" font-family="system-ui, sans-serif">Grace: &quot;So, are you excited to work here?&quot; &#8226; Day 1 onboarding on diabetes test strip production.</text>
    </g>
  </svg>`;
}

// Slide 2: Susan reveals the Lucky Pencil
function generateSlide2() {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1280" height="720" viewBox="0 0 1280 720">
    ${commonStyles}
    ${renderRoomBackground()}

    <!-- Character 1: Grace (Listening) on Left -->
    <g transform="translate(380, 180)">
      <ellipse cx="90" cy="110" rx="48" ry="54" fill="#8d5b4c"/>
      <path d="M 40 100 Q 40 40 90 40 Q 140 40 140 100 Q 145 130 135 150 Q 130 100 90 85 Q 50 100 45 150 Z" fill="#291b15"/>
      <rect x="58" y="98" width="28" height="18" rx="4" fill="none" stroke="#0f172a" stroke-width="3"/>
      <rect x="94" y="98" width="28" height="18" rx="4" fill="none" stroke="#0f172a" stroke-width="3"/>
      <line x1="86" y1="107" x2="94" y2="107" stroke="#0f172a" stroke-width="3"/>
      <path d="M 78 135 Q 90 142 102 135" fill="none" stroke="#451a03" stroke-width="3" stroke-linecap="round"/>
      <path d="M 40 160 Q 90 170 140 160 L 170 420 L 10 420 Z" fill="url(#coatGrad)" stroke="#cbd5e1" stroke-width="2"/>
      <rect x="35" y="440" width="110" height="30" rx="6" fill="#0284c7"/>
      <text x="90" y="460" fill="#ffffff" font-size="13" font-weight="bold" font-family="system-ui, sans-serif" text-anchor="middle">Grace</text>
    </g>

    <!-- Character 2: Susan holding up the Lucky Pencil -->
    <g transform="translate(680, 175)">
      <ellipse cx="90" cy="110" rx="46" ry="52" fill="#fcd34d"/>
      <path d="M 45 105 Q 45 42 90 42 Q 135 42 135 105 Q 120 70 90 70 Q 55 70 45 105 Z" fill="#78350f"/>
      <ellipse cx="140" cy="80" rx="20" ry="32" fill="#78350f"/>
      <circle cx="72" cy="104" r="5" fill="#1e293b"/>
      <circle cx="108" cy="104" r="5" fill="#1e293b"/>
      <!-- Proud open smile -->
      <path d="M 72 130 Q 90 152 108 130 Z" fill="#be123c"/>
      <path d="M 40 160 Q 90 170 140 160 L 165 420 L 15 420 Z" fill="url(#coatGrad)" stroke="#cbd5e1" stroke-width="2"/>

      <!-- Raised Arm holding Pencil -->
      <path d="M 40 210 Q -20 180 -10 120" fill="none" stroke="#fcd34d" stroke-width="16" stroke-linecap="round"/>
      
      <!-- Susan's Famous Yellow Lucky Pencil -->
      <g transform="translate(-50, 40) rotate(-25)">
        <!-- Aura Glow -->
        <rect x="-10" y="-10" width="40" height="150" rx="15" fill="#fbbf24" opacity="0.25"/>
        <!-- Pencil Body: Yellow #f59e0b -->
        <polygon points="10,0 20,0 18,100 12,100" fill="#f59e0b" stroke="#d97706" stroke-width="2"/>
        <!-- Graphite Tip -->
        <polygon points="10,0 20,0 15,-20" fill="#fde68a" stroke="#d97706" stroke-width="1.5"/>
        <polygon points="13,-12 17,-12 15,-20" fill="#1e293b"/>
        <!-- Metal Ferrule -->
        <rect x="11" y="98" width="8" height="14" fill="#94a3b8" stroke="#64748b" stroke-width="1"/>
        <!-- Pink Eraser -->
        <rect x="11" y="112" width="8" height="16" rx="3" fill="#f43f5e" stroke="#e11d48" stroke-width="1"/>
      </g>

      <!-- Lucky Pencil Callout Banner -->
      <g transform="translate(-160, 20)">
        <rect width="140" height="42" rx="8" fill="#fef08a" stroke="#eab308" stroke-width="2" filter="url(#dropShadow)"/>
        <text x="70" y="18" fill="#854d0e" font-size="11" font-weight="bold" font-family="system-ui, sans-serif" text-anchor="middle">★ SUSAN'S</text>
        <text x="70" y="34" fill="#b45309" font-size="13" font-weight="bold" font-family="system-ui, sans-serif" text-anchor="middle">LUCKY PENCIL</text>
      </g>

      <rect x="35" y="440" width="110" height="30" rx="6" fill="#10b981"/>
      <text x="90" y="460" fill="#ffffff" font-size="13" font-weight="bold" font-family="system-ui, sans-serif" text-anchor="middle">Susan</text>
    </g>

    <!-- Bottom Narrative Card -->
    <g transform="translate(240, 610)">
      <rect width="800" height="85" rx="12" fill="url(#cardGrad)" stroke="#eab308" stroke-width="2" filter="url(#dropShadow)"/>
      <rect x="20" y="15" width="140" height="22" rx="4" fill="#eab308"/>
      <text x="90" y="30" fill="#713f12" font-size="11" font-weight="bold" font-family="system-ui, sans-serif" text-anchor="middle">SLIDE 2: GDP2.JPEG</text>
      <text x="175" y="31" fill="#fde047" font-size="14" font-weight="bold" font-family="system-ui, sans-serif">The Lucky Pencil Revelation</text>
      <text x="20" y="60" fill="#e2e8f0" font-size="13" font-family="system-ui, sans-serif">Susan: &quot;Definitely! I even brought my lucky pencil!&quot; &#8226; Grace explains pencils are not allowed.</text>
    </g>
  </svg>`;
}

// Slide 3: Grace stop gesture / GDP explanation / Tax return eraser analogy
function generateSlide3() {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1280" height="720" viewBox="0 0 1280 720">
    ${commonStyles}
    ${renderRoomBackground()}

    <!-- Center Big Warning Badge: NO PENCILS FOR GDP -->
    <g transform="translate(490, 80)">
      <circle cx="150" cy="80" r="70" fill="#ef4444" opacity="0.15"/>
      <circle cx="150" cy="80" r="55" fill="none" stroke="#ef4444" stroke-width="6"/>
      <line x1="110" y1="40" x2="190" y2="120" stroke="#ef4444" stroke-width="7"/>
      <!-- Pencil inside crossed out circle -->
      <rect x="145" y="45" width="10" height="70" rx="3" fill="#f59e0b" stroke="#b45309" stroke-width="1.5"/>
      <rect x="145" y="105" width="10" height="12" rx="2" fill="#f43f5e"/>
      <text x="150" y="160" fill="#fca5a5" font-size="13" font-weight="bold" font-family="system-ui, sans-serif" text-anchor="middle">GDP RULE: NO PENCILS</text>
      <text x="150" y="176" fill="#94a3b8" font-size="10" font-family="system-ui, sans-serif" text-anchor="middle">Permanent Indelible Ink Only</text>
    </g>

    <!-- Character 1: Grace (Stop Gesture with Both Hands Raised) -->
    <g transform="translate(320, 180)">
      <ellipse cx="90" cy="110" rx="48" ry="54" fill="#8d5b4c"/>
      <path d="M 40 100 Q 40 40 90 40 Q 140 40 140 100 Q 145 130 135 150 Q 130 100 90 85 Q 50 100 45 150 Z" fill="#291b15"/>
      <rect x="58" y="98" width="28" height="18" rx="4" fill="none" stroke="#0f172a" stroke-width="3"/>
      <rect x="94" y="98" width="28" height="18" rx="4" fill="none" stroke="#0f172a" stroke-width="3"/>
      <line x1="86" y1="107" x2="94" y2="107" stroke="#0f172a" stroke-width="3"/>
      <!-- Serious, caring expression -->
      <line x1="75" y1="138" x2="105" y2="138" stroke="#451a03" stroke-width="3" stroke-linecap="round"/>
      <path d="M 40 160 Q 90 170 140 160 L 170 420 L 10 420 Z" fill="url(#coatGrad)" stroke="#cbd5e1" stroke-width="2"/>

      <!-- BOTH HANDS RAISED IN FIRM, POLITE STOP GESTURE -->
      <path d="M 40 210 Q 0 200 10 150" fill="none" stroke="#8d5b4c" stroke-width="16" stroke-linecap="round"/>
      <circle cx="10" cy="145" r="14" fill="#8d5b4c"/>
      <path d="M 140 210 Q 180 200 170 150" fill="none" stroke="#8d5b4c" stroke-width="16" stroke-linecap="round"/>
      <circle cx="170" cy="145" r="14" fill="#8d5b4c"/>

      <rect x="35" y="440" width="110" height="30" rx="6" fill="#0284c7"/>
      <text x="90" y="460" fill="#ffffff" font-size="13" font-weight="bold" font-family="system-ui, sans-serif" text-anchor="middle">Grace (Explaining)</text>
    </g>

    <!-- Character 2: Susan (Concerned & Listening) on Right -->
    <g transform="translate(800, 185)">
      <ellipse cx="90" cy="110" rx="46" ry="52" fill="#fcd34d"/>
      <path d="M 45 105 Q 45 42 90 42 Q 135 42 135 105 Q 120 70 90 70 Q 55 70 45 105 Z" fill="#78350f"/>
      <ellipse cx="140" cy="80" rx="20" ry="32" fill="#78350f"/>
      <!-- Concerned eyebrows & small 'o' mouth -->
      <line x1="65" y1="96" x2="80" y2="102" stroke="#78350f" stroke-width="2.5"/>
      <line x1="115" y1="96" x2="100" y2="102" stroke="#78350f" stroke-width="2.5"/>
      <circle cx="72" cy="106" r="4.5" fill="#1e293b"/>
      <circle cx="108" cy="106" r="4.5" fill="#1e293b"/>
      <ellipse cx="90" cy="136" rx="6" ry="7" fill="#be123c"/>
      <path d="M 40 160 Q 90 170 140 160 L 165 420 L 15 420 Z" fill="url(#coatGrad)" stroke="#cbd5e1" stroke-width="2"/>
      <!-- Hands down holding pencil lowering -->
      <path d="M 40 210 Q 0 250 10 300" fill="none" stroke="#fcd34d" stroke-width="14" stroke-linecap="round"/>

      <rect x="35" y="440" width="110" height="30" rx="6" fill="#10b981"/>
      <text x="90" y="460" fill="#ffffff" font-size="13" font-weight="bold" font-family="system-ui, sans-serif" text-anchor="middle">Susan (Listening)</text>
    </g>

    <!-- Analogy Infobox: Tax Return with Eraser Marks -->
    <g transform="translate(50, 480)">
      <rect width="240" height="70" rx="8" fill="#1e293b" stroke="#f87171" stroke-width="1.5" filter="url(#dropShadow)"/>
      <text x="12" y="24" fill="#f87171" font-size="11" font-weight="bold" font-family="system-ui, sans-serif">TAX RETURN ANALOGY</text>
      <text x="12" y="42" fill="#cbd5e1" font-size="10" font-family="system-ui, sans-serif">&quot;Would you trust a tax return</text>
      <text x="12" y="58" fill="#cbd5e1" font-size="10" font-family="system-ui, sans-serif">with eraser marks all over it?&quot;</text>
    </g>

    <!-- Bottom Narrative Card -->
    <g transform="translate(240, 610)">
      <rect width="800" height="85" rx="12" fill="url(#cardGrad)" stroke="#ef4444" stroke-width="2" filter="url(#dropShadow)"/>
      <rect x="20" y="15" width="140" height="22" rx="4" fill="#ef4444"/>
      <text x="90" y="30" fill="#ffffff" font-size="11" font-weight="bold" font-family="system-ui, sans-serif" text-anchor="middle">SLIDE 3: GDP3.JPEG</text>
      <text x="175" y="31" fill="#fca5a5" font-size="14" font-weight="bold" font-family="system-ui, sans-serif">Why Pencils Destroy Credibility &amp; GDP Rule</text>
      <text x="20" y="60" fill="#e2e8f0" font-size="13" font-family="system-ui, sans-serif">Grace: &quot;GDP requires records be clear and permanent. Looking at eraser marks questions accuracy.&quot;</text>
    </g>
  </svg>`;
}

// Slide 4: Safe Locker Stash / Susan's Locker / 4 Golden Rules
function generateSlide4() {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1280" height="720" viewBox="0 0 1280 720">
    ${commonStyles}
    ${renderRoomBackground()}

    <!-- Susan at her Locker placing pencil in mug -->
    <g transform="translate(195, 220)">
      <!-- Open Locker Interior -->
      <rect width="120" height="210" rx="6" fill="#0f172a" stroke="#0ea5e9" stroke-width="2.5" filter="url(#dropShadow)"/>
      <!-- Susan Nameplate on Locker -->
      <rect x="15" y="12" width="90" height="22" rx="3" fill="#0284c7" stroke="#38bdf8" stroke-width="1"/>
      <text x="60" y="27" fill="#ffffff" font-size="11" font-weight="bold" font-family="system-ui, sans-serif" text-anchor="middle">SUSAN</text>

      <!-- Locker Shelf -->
      <line x1="0" y1="120" x2="120" y2="120" stroke="#475569" stroke-width="2.5"/>
      
      <!-- Ceramic Coffee Mug on Shelf -->
      <g transform="translate(38, 68)">
        <!-- Mug body -->
        <rect x="6" y="16" width="34" height="34" rx="4" fill="#f8fafc" stroke="#94a3b8" stroke-width="2"/>
        <!-- Mug handle -->
        <path d="M 40 23 C 50 23 50 41 40 43" fill="none" stroke="#94a3b8" stroke-width="3" stroke-linecap="round"/>
        <!-- Mug decorative cleanroom blue stripe & heart -->
        <rect x="6" y="24" width="34" height="5" fill="#38bdf8"/>
        <circle cx="23" cy="38" r="4" fill="#0284c7"/>

        <!-- Lucky Yellow Pencil sticking out of the Mug! -->
        <g transform="translate(20, 10) rotate(18)">
          <!-- Wood & yellow shaft -->
          <polygon points="1,-38 7,-38 5,12 2,12" fill="#fbbf24" stroke="#d97706" stroke-width="1.2"/>
          <!-- Ferrule silver band -->
          <rect x="1" y="-45" width="6" height="7" fill="#94a3b8" stroke="#64748b" stroke-width="0.8"/>
          <!-- Pink eraser -->
          <rect x="1" y="-55" width="6" height="10" rx="2" fill="#f43f5e"/>
        </g>
      </g>

      <!-- Big Green Checkmark on Locker -->
      <circle cx="60" cy="50" r="16" fill="#10b981"/>
      <path d="M 52 50 L 57 55 L 68 44" fill="none" stroke="#ffffff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>

      <text x="60" y="152" fill="#38bdf8" font-size="10" font-weight="bold" font-family="system-ui, sans-serif" text-anchor="middle">PENCIL IN MUG</text>
      <text x="60" y="172" fill="#6ee7b7" font-size="10" font-weight="bold" font-family="system-ui, sans-serif" text-anchor="middle">SAFE &amp; SECURE</text>
    </g>

    <!-- Character 1: Grace with Affirmative Smile & Thumbs Up -->
    <g transform="translate(420, 180)">
      <ellipse cx="90" cy="110" rx="48" ry="54" fill="#8d5b4c"/>
      <path d="M 40 100 Q 40 40 90 40 Q 140 40 140 100 Q 145 130 135 150 Q 130 100 90 85 Q 50 100 45 150 Z" fill="#291b15"/>
      <rect x="58" y="98" width="28" height="18" rx="4" fill="none" stroke="#0f172a" stroke-width="3"/>
      <rect x="94" y="98" width="28" height="18" rx="4" fill="none" stroke="#0f172a" stroke-width="3"/>
      <line x1="86" y1="107" x2="94" y2="107" stroke="#0f172a" stroke-width="3"/>
      <!-- Proud Affirmative Smile -->
      <path d="M 74 133 Q 90 148 106 133" fill="none" stroke="#451a03" stroke-width="3.5" stroke-linecap="round"/>
      <path d="M 40 160 Q 90 170 140 160 L 170 420 L 10 420 Z" fill="url(#coatGrad)" stroke="#cbd5e1" stroke-width="2"/>

      <!-- Grace holding AnyPharm Indelible Blue Pen to hand to Susan -->
      <path d="M 140 210 Q 190 220 220 200" fill="none" stroke="#8d5b4c" stroke-width="16" stroke-linecap="round"/>
      <!-- Blue Pen -->
      <rect x="210" y="190" width="40" height="8" rx="3" fill="#2563eb" stroke="#1d4ed8" stroke-width="1.5" transform="rotate(-15, 210, 190)"/>

      <rect x="35" y="440" width="110" height="30" rx="6" fill="#0284c7"/>
      <text x="90" y="460" fill="#ffffff" font-size="13" font-weight="bold" font-family="system-ui, sans-serif" text-anchor="middle">Grace (Approving)</text>
    </g>

    <!-- 4 Golden Rules of GDP Card on Right -->
    <g transform="translate(730, 120)">
      <rect width="500" height="420" rx="14" fill="#0f172a" stroke="#10b981" stroke-width="2.5" filter="url(#dropShadow)"/>
      <rect x="0" y="0" width="500" height="50" rx="14" fill="#064e3b"/>
      <circle cx="35" cy="25" r="14" fill="#10b981"/>
      <text x="35" y="30" fill="#ffffff" font-size="14" font-weight="bold" font-family="system-ui, sans-serif" text-anchor="middle">&#10003;</text>
      <text x="60" y="31" fill="#ecfdf5" font-size="15" font-weight="bold" font-family="system-ui, sans-serif">THE 4 GOLDEN RULES OF GDP CORRECTION</text>
      
      <!-- Rule 1 -->
      <g transform="translate(25, 75)">
        <rect width="450" height="65" rx="8" fill="#1e293b" stroke="#334155" stroke-width="1"/>
        <circle cx="28" cy="32" r="14" fill="#0284c7"/>
        <text x="28" y="37" fill="#ffffff" font-size="13" font-weight="bold" font-family="monospace" text-anchor="middle">1</text>
        <text x="55" y="26" fill="#ffffff" font-size="13" font-weight="bold" font-family="system-ui, sans-serif">Single-Line Strike-Through</text>
        <text x="55" y="48" fill="#94a3b8" font-size="11" font-family="system-ui, sans-serif">Draw ONE clean line. The original error MUST remain clearly legible.</text>
      </g>

      <!-- Rule 2 -->
      <g transform="translate(25, 155)">
        <rect width="450" height="65" rx="8" fill="#1e293b" stroke="#334155" stroke-width="1"/>
        <circle cx="28" cy="32" r="14" fill="#0284c7"/>
        <text x="28" y="37" fill="#ffffff" font-size="13" font-weight="bold" font-family="monospace" text-anchor="middle">2</text>
        <text x="55" y="26" fill="#ffffff" font-size="13" font-weight="bold" font-family="system-ui, sans-serif">Write Correct Value Above / Next</text>
        <text x="55" y="48" fill="#94a3b8" font-size="11" font-family="system-ui, sans-serif">Write the correct information clearly right next to or above the error.</text>
      </g>

      <!-- Rule 3 -->
      <g transform="translate(25, 235)">
        <rect width="450" height="65" rx="8" fill="#1e293b" stroke="#334155" stroke-width="1"/>
        <circle cx="28" cy="32" r="14" fill="#0284c7"/>
        <text x="28" y="37" fill="#ffffff" font-size="13" font-weight="bold" font-family="monospace" text-anchor="middle">3</text>
        <text x="55" y="26" fill="#ffffff" font-size="13" font-weight="bold" font-family="system-ui, sans-serif">Sign / Initial and Date</text>
        <text x="55" y="48" fill="#94a3b8" font-size="11" font-family="system-ui, sans-serif">Immediately record your official initials and today's date (DD-MMM-YYYY).</text>
      </g>

      <!-- Rule 4 -->
      <g transform="translate(25, 315)">
        <rect width="450" height="65" rx="8" fill="#1e293b" stroke="#334155" stroke-width="1"/>
        <circle cx="28" cy="32" r="14" fill="#0284c7"/>
        <text x="28" y="37" fill="#ffffff" font-size="13" font-weight="bold" font-family="monospace" text-anchor="middle">4</text>
        <text x="55" y="26" fill="#ffffff" font-size="13" font-weight="bold" font-family="system-ui, sans-serif">Document Brief Reason Code</text>
        <text x="55" y="48" fill="#94a3b8" font-size="11" font-family="system-ui, sans-serif">E.g., &quot;EE&quot; (Entry Error), &quot;CR&quot; (Calculation Error), or brief explanatory note.</text>
      </g>
    </g>

    <!-- Bottom Narrative Card -->
    <g transform="translate(240, 610)">
      <rect width="800" height="85" rx="12" fill="url(#cardGrad)" stroke="#10b981" stroke-width="2" filter="url(#dropShadow)"/>
      <rect x="20" y="15" width="140" height="22" rx="4" fill="#10b981"/>
      <text x="90" y="30" fill="#ffffff" font-size="11" font-weight="bold" font-family="system-ui, sans-serif" text-anchor="middle">SLIDE 4: GDP4.JPEG</text>
      <text x="175" y="31" fill="#6ee7b7" font-size="14" font-weight="bold" font-family="system-ui, sans-serif">Safe Storage in Susan's Locker Mug &amp; The 4 Golden Rules</text>
      <text x="20" y="60" fill="#e2e8f0" font-size="13" font-family="system-ui, sans-serif">Susan stashes her lucky pencil in her locker mug; Grace presents the 4 golden rules of compliant GDP correction.</text>
    </g>
  </svg>`;
}

const slides = [
  { name: 'GDP1', svg: generateSlide1() },
  { name: 'GDP2', svg: generateSlide2() },
  { name: 'GDP3', svg: generateSlide3() },
  { name: 'GDP4', svg: generateSlide4() },
];

for (const { name, svg } of slides) {
  const svgPath = path.join('/tmp', `${name}.svg`);
  const jpegPath = path.join(outputDir, `${name}.jpeg`);
  const jpgPath = path.join(outputDir, `${name}.jpg`);
  
  fs.writeFileSync(svgPath, svg, 'utf-8');
  console.log(`Wrote SVG for ${name}`);

  // Convert SVG to high quality JPEG via ffmpeg
  try {
    execSync(`ffmpeg -i "${svgPath}" -y -q:v 2 "${jpegPath}"`, { stdio: 'inherit' });
    console.log(`Generated: ${jpegPath} (${fs.statSync(jpegPath).size} bytes)`);
    // Also copy to .jpg extension
    fs.copyFileSync(jpegPath, jpgPath);
  } catch (err) {
    console.error(`Failed to convert ${name} with ffmpeg:`, err.message);
  }
}

console.log('All 4 scene images generated successfully!');
