export type Role = 'Active' | 'Stabilizing' | 'Lengthened' | 'Connective tissue';

export type Region = {
  name: string;
  x: number;
  y: number;
  role: Role;
  location: string;
  function: string;
  pose: string;
};

export type Overlay = 'pose' | 'muscles' | 'fascia';

export type Aasana = {
  id: string;
  name: string;
  sanskrit: string;
  description: string;
  benefits: string[];
  instructions: string[];
  precautions: string;
  modifications: string[];
  recommendedHold: string;
  defaultHold: number;
  assets: { base?: string; muscles?: string; fascia?: string };
  muscleRegions: Region[];
  fasciaRegions: Region[];
};

const assetPath = (id: string) => `/data/aasana/${id}/`;

export const aasanas: Aasana[] = [
  {
    id: 'malasana',
    name: 'Malasana',
    sanskrit: 'मालासन · Garland Pose',
    description: 'A deep, wide-legged squat that invites the hips to open and the breath to settle.',
    benefits: [
      'Practices hip and ankle mobility within a comfortable range.',
      'Builds lower-body and trunk control while supporting your bodyweight.',
      'Offers a grounded position for slow, comfortable breathing.',
    ],
    instructions: [
      'Stand with feet a little wider than hips; turn toes out to a comfortable angle.',
      'Bend the knees and lower your hips only as far as feels steady. Keep heels supported.',
      'Bring palms together if comfortable; let the knees follow the toes without pushing them.',
      'Lengthen through the crown and take slow, unforced breaths.',
    ],
    precautions: 'Use a block or folded blanket for support. Avoid forcing the knees or hips; stop if you feel pain, tingling or numbness.',
    modifications: [
      'Place a folded blanket under your heels if they lift, or sit on a block for a gentler hip opening.',
      'Widen your stance or turn the toes out slightly until the knees and ankles feel comfortable.',
      'Choose a depth where you can breathe with ease. Skip the pose if it brings sharp pain or pressure.',
    ],
    recommendedHold: '30–60 SEC',
    defaultHold: 60,
    assets: {
      base: `${assetPath('malasana')}base.png`,
      muscles: `${assetPath('malasana')}muscles.png`,
      fascia: `${assetPath('malasana')}fascia.png`,
    },
    muscleRegions: [
      { name: 'Quadriceps', x: 14.2, y: 56, role: 'Active', location: 'Front of the thigh', function: 'Extends the knee and supports the legs under load.', pose: 'Helps control the bend in your knees as you settle into the squat.' },
      { name: 'Abdominal muscles', x: 28.4, y: 55, role: 'Stabilizing', location: 'Front of the trunk', function: 'Supports the trunk and helps manage spinal position.', pose: 'A gentle brace keeps your chest lifted without holding your breath.' },
      { name: 'Gastrocnemius', x: 16.2, y: 72.5, role: 'Lengthened', location: 'Superficial calf', function: 'Assists with pointing the foot and bending the knee.', pose: 'The calf may lengthen as the ankle moves into dorsiflexion.' },
      { name: 'Soleus', x: 16.2, y: 76.8, role: 'Lengthened', location: 'Deep calf', function: 'Helps point the foot and contributes to ankle control.', pose: 'Its sensation varies with ankle range and heel contact.' },
      { name: 'Adductors', x: 31.7, y: 70, role: 'Lengthened', location: 'Inner thigh', function: 'Draw the thighs toward the midline and support hip control.', pose: 'They lengthen as the knees open; let the hips decide how far.' },
      { name: 'Gluteus medius', x: 64, y: 59.3, role: 'Stabilizing', location: 'Outer hip', function: 'Supports pelvic control and helps steady the hip.', pose: 'Works with the other hip muscles to keep the knees tracking comfortably.' },
      { name: 'Gluteus maximus', x: 66.5, y: 66, role: 'Active', location: 'Back of the hip', function: 'Extends and rotates the hip; contributes to hip control.', pose: 'Helps manage the deep hip bend as you move in and out of the pose.' },
      { name: 'Erector spinae', x: 70.5, y: 36.1, role: 'Stabilizing', location: 'Along the back of the spine', function: 'Helps support and extend the spine.', pose: 'Supports an upright torso while your hips lower.' },
    ],
    fasciaRegions: [
      { name: 'Fascia lata', x: 11, y: 61.3, role: 'Connective tissue', location: 'Fascial sleeve of the outer thigh', function: 'Envelops and connects structures across the thigh.', pose: 'Moves with the hip and knee as the legs fold into the squat.' },
      { name: 'Thoracolumbar fascia', x: 74.9, y: 52.3, role: 'Connective tissue', location: 'Broad connective tissue of the lower back', function: 'Connects with trunk and hip tissues and helps transfer load.', pose: 'The trunk position changes the tension shared across this region.' },
      { name: 'Gluteal fascia', x: 80, y: 65.4, role: 'Connective tissue', location: 'Fascial layers over the gluteal region', function: 'Envelops the gluteal muscles and blends with nearby fascia.', pose: 'Accompanies the hips as they flex and externally rotate.' },
      { name: 'Crural fascia', x: 84.4, y: 72.8, role: 'Connective tissue', location: 'Connective tissue around the lower leg', function: 'Envelops lower-leg muscles and continues toward the ankle.', pose: 'Follows the lower leg as the ankle bends in the squat.' },
      { name: 'Plantar fascia', x: 62.7, y: 86.4, role: 'Connective tissue', location: 'Thick tissue along the sole of the foot', function: 'Supports the arch and connects the heel with the forefoot.', pose: 'Foot pressure and your stance influence how the sole feels.' },
    ],
  },
  {
    id: 'dhanurasan',
    name: 'Dhanurasana',
    sanskrit: 'धनुरासन · Bow Pose',
    description: 'A prone backbend where the chest and thighs lift as the hands hold the ankles.',
    benefits: [
      'Practices coordinated extension through the spine, hips and shoulders.',
      'Challenges back-body strength and whole-body balance while prone.',
      'Encourages steady breathing in a compact, active shape.',
    ],
    instructions: [
      'Lie on your front with legs comfortably apart and arms by your sides.',
      'Bend your knees and reach back to hold the ankles or feet, if comfortable.',
      'On an inhale, press the feet gently into the hands and lift only as high as feels steady.',
      'Keep the breath smooth, then release slowly back to the floor.',
    ],
    precautions: 'Avoid forcing the backbend or pulling hard on the ankles. Stop if you feel pain, pinching or pressure, and choose a gentler prone variation when needed.',
    modifications: [
      'Keep the chest and thighs low; begin by gently pressing the feet into the hands.',
      'Use a strap around the ankles if reaching the feet is uncomfortable.',
      'Hold briefly and release between attempts; keep breathing without strain.',
    ],
    recommendedHold: '15–30 SEC',
    defaultHold: 30,
    assets: {},
    muscleRegions: [],
    fasciaRegions: [],
  },
  {
    id: 'trikonasan',
    name: 'Trikonasana',
    sanskrit: 'त्रिकोणासन · Triangle Pose',
    description: 'A standing pose with a wide stance, long legs and an open side-body reach.',
    benefits: [
      'Practices balance and control through the legs in a wide stance.',
      'Explores comfortable length through the sides of the trunk.',
      'Pairs steady footing with relaxed, even breathing.',
    ],
    instructions: [
      'Stand with feet wide apart and turn one foot out to a comfortable angle.',
      'Reach both arms out at shoulder height and lengthen through the trunk.',
      'Hinge over the turned-out leg; rest a hand on a block or shin, not the knee.',
      'Reach the top arm upward if comfortable, keep breathing, then rise and switch sides.',
    ],
    precautions: 'Keep a soft bend in the knees if needed and use a block for support. Avoid pushing into the end of your range or looking upward if it strains your neck.',
    modifications: [
      'Shorten your stance and place the lower hand on a block or chair.',
      'Keep the top hand on your hip and gaze forward or down for neck comfort.',
      'Use a wall behind you for balance and take a comfortable bend in the front knee.',
    ],
    recommendedHold: '30–60 SEC / SIDE',
    defaultHold: 30,
    assets: {},
    muscleRegions: [],
    fasciaRegions: [],
  },
];
