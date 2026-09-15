const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const publicDir = path.join(process.cwd(), 'public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// 1:1 Square full resolution matching the user supplied CampusFlow.logo.jpeg
const squareSvg = `
<svg width="1200" height="1200" viewBox="0 0 1200 1200" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#f8fafc" />
      <stop offset="100%" stop-color="#ffffff" />
    </linearGradient>

    <linearGradient id="flowGrad" x1="0%" y1="100%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#0284c7" />
      <stop offset="35%" stop-color="#0ea5e9" />
      <stop offset="70%" stop-color="#2563eb" />
      <stop offset="100%" stop-color="#1d4ed8" />
    </linearGradient>

    <linearGradient id="capGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#38bdf8" />
      <stop offset="50%" stop-color="#2563eb" />
      <stop offset="100%" stop-color="#1d4ed8" />
    </linearGradient>
  </defs>

  <rect width="1200" height="1200" fill="url(#bgGrad)" />

  <!-- Background Watermarks -->
  <g opacity="0.10" stroke="#64748b" stroke-width="4" fill="none" stroke-linecap="round" stroke-linejoin="round">
    <path d="M 850 150 L 1050 150 L 1050 350 L 850 350 Z" />
    <path d="M 950 80 L 870 150 L 1030 150 Z" />
    <line x1="950" y1="50" x2="950" y2="80" />
    <line x1="900" y1="200" x2="900" y2="300" />
    <line x1="950" y1="200" x2="950" y2="300" />
    <line x1="1000" y1="200" x2="1000" y2="300" />
    <path d="M 100 850 L 320 850 L 320 1100 L 100 1100 Z" />
    <path d="M 210 770 L 80 850 L 340 850 Z" />
    <line x1="210" y1="730" x2="210" y2="770" />
    <line x1="150" y1="920" x2="150" y2="1050" />
    <line x1="210" y1="920" x2="210" y2="1050" />
    <line x1="270" y1="920" x2="270" y2="1050" />
    <path d="M 300 60 L 360 80 L 300 100 L 240 80 Z" />
    <path d="M 300 850 L 360 870 L 300 890 L 240 870 Z" />
  </g>

  <!-- Central Logo Composition -->
  <g id="logo-emblem">
    <!-- Mortarboard Top -->
    <polygon points="410,380 575,445 410,510 285,455" fill="#ffffff" stroke="#1e3a8a" stroke-width="18" stroke-linejoin="round" />
    <polygon points="410,388 560,447 410,503 298,455" fill="none" stroke="#2563eb" stroke-width="10" stroke-linejoin="round" />

    <!-- Cap Base -->
    <path d="M 345,482 L 345,535 C 345,558 475,558 475,535 L 475,482" fill="#1e3a8a" />
    <path d="M 358,485 L 358,525 C 358,542 462,542 462,525 L 462,485" fill="#2563eb" />

    <!-- Center Button -->
    <circle cx="410" cy="445" r="16" fill="#1e3a8a" />
    <circle cx="410" cy="445" r="10" fill="#38bdf8" />

    <!-- Tassel -->
    <path d="M 410,445 Q 355,440 310,480 L 300,535" fill="none" stroke="#0ea5e9" stroke-width="12" stroke-linecap="round" />
    <rect x="290" y="535" width="20" height="12" rx="4" fill="#0284c7" />
    <path d="M 292,547 L 285,578 M 297,547 L 297,582 M 303,547 L 305,582 M 309,547 L 315,578" stroke="#0284c7" stroke-width="6" stroke-linecap="round" />

    <!-- Flow Path -->
    <path d="M 130,810 C 130,730 200,680 310,680 C 440,680 460,580 395,520" fill="none" stroke="url(#flowGrad)" stroke-width="44" stroke-linecap="round" />
    <polygon points="340,565 435,518 410,625" fill="url(#flowGrad)" stroke="#1d4ed8" stroke-width="6" stroke-linejoin="round" />
  </g>

  <!-- Typography -->
  <text x="445" y="660" font-family="system-ui, -apple-system, sans-serif" font-size="118" font-weight="900" fill="#0a2540" letter-spacing="-2">CampusFlow</text>
  <text x="455" y="725" font-family="system-ui, -apple-system, sans-serif" font-size="44" font-weight="600" fill="#1e3a8a" letter-spacing="0.5">University Admissions Journey</text>
</svg>
`;

async function generate() {
  const squareBuf = Buffer.from(squareSvg);
  
  // Output supplied logo name as requested
  await sharp(squareBuf)
    .jpeg({ quality: 96 })
    .toFile(path.join(publicDir, 'CampusFlow.logo.jpeg'));

  await sharp(squareBuf)
    .png()
    .toFile(path.join(publicDir, 'CampusFlow.logo.png'));

  // Also standalone emblem icon
  const iconSvg = `
  <svg width="400" height="400" viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="flowGrad" x1="0%" y1="100%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#0284c7" />
        <stop offset="35%" stop-color="#0ea5e9" />
        <stop offset="70%" stop-color="#2563eb" />
        <stop offset="100%" stop-color="#1d4ed8" />
      </linearGradient>
    </defs>
    <g transform="translate(-80, -320) scale(1.15)">
      <polygon points="410,380 575,445 410,510 285,455" fill="#ffffff" stroke="#1e3a8a" stroke-width="18" stroke-linejoin="round" />
      <polygon points="410,388 560,447 410,503 298,455" fill="none" stroke="#2563eb" stroke-width="10" stroke-linejoin="round" />
      <path d="M 345,482 L 345,535 C 345,558 475,558 475,535 L 475,482" fill="#1e3a8a" />
      <circle cx="410" cy="445" r="16" fill="#1e3a8a" />
      <circle cx="410" cy="445" r="10" fill="#38bdf8" />
      <path d="M 410,445 Q 355,440 310,480 L 300,535" fill="none" stroke="#0ea5e9" stroke-width="12" stroke-linecap="round" />
      <rect x="290" y="535" width="20" height="12" rx="4" fill="#0284c7" />
      <path d="M 292,547 L 285,578 M 297,547 L 297,582 M 303,547 L 305,582 M 309,547 L 315,578" stroke="#0284c7" stroke-width="6" stroke-linecap="round" />
      <path d="M 130,810 C 130,730 200,680 310,680 C 440,680 460,580 395,520" fill="none" stroke="url(#flowGrad)" stroke-width="44" stroke-linecap="round" />
      <polygon points="340,565 435,518 410,625" fill="url(#flowGrad)" stroke="#1d4ed8" stroke-width="6" stroke-linejoin="round" />
    </g>
  </svg>
  `;

  await sharp(Buffer.from(iconSvg))
    .png()
    .toFile(path.join(publicDir, 'CampusFlow-icon.png'));

  console.log('Generated all CampusFlow assets in public directory:');
  console.log(' - public/CampusFlow.logo.jpeg');
  console.log(' - public/CampusFlow.logo.png');
  console.log(' - public/CampusFlow-icon.png');
}

generate().catch(console.error);
