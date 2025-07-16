// --- Types
export type DimensionsScore = {
  "AI Culture": number;
  "Innovation": number;
  "IA Readiness": number;
};

export type Persona = {
  key: string;
  label: string;
  description: string;
  image: string;
};

// --- Avatars/Personas
export const personas: Persona[] = [
  {
    key: "stratege_explorateur",
    label: "🔮 The Explorer Strategist",
    description: "Strategic and adventurous, you explore AI opportunities boldly and thoughtfully.",
    image: "/avatars/stratege_explorateur.png",
  },
  {
    key: "philosophe_craintif",
    label: "🧘 The Cautious Philosopher",
    description: "Prudent and thoughtful, you analyze AI with a critical and philosophical eye.",
    image: "/avatars/philosophe_craintif.png",
  },
  {
    key: "innovateur_deracine",
    label: "🧪 The Rootless Innovator",
    description: "You push boundaries, even off the beaten track, in AI innovation.",
    image: "/avatars/innovateur_deracine.png",
  },
  {
    key: "organisateur_visionnaire",
    label: "⚙️ The Visionary Organizer",
    description: "You structure and lead AI transformation in a visionary and organized way.",
    image: "/avatars/organisateur_visionnaire.png",
  },
  {
    key: "conservateur_methodique",
    label: "🔐 The Methodical Conservative",
    description: "Methodical, you ensure stability, security, and AI compliance.",
    image: "/avatars/conservateur_methodique.png",
  },
  {
    key: "technophile_poetique",
    label: "🦾 The Poetic Technophile",
    description: "Passionate about tech, but creative and human in AI adoption.",
    image: "/avatars/technophile_poetique.png",
  },
  {
    key: "faconneur_curieux",
    label: "🌱 The Curious Shaper",
    description: "Curious, you continuously shape and adapt AI to meet needs.",
    image: "/avatars/faconneur_curieux.png",
  },
  {
    key: "surveillant_sceptique",
    label: "🛑 The Skeptical Overseer",
    description: "You monitor and question AI use, ensuring ethics and risk management.",
    image: "/avatars/surveillant_sceptique.png",
  },
];

// --- Scoring rules ---
export const questionPoints: { [questionKey: string]: { [answer: string]: { [dimension: string]: number }}} = {
  // Transversal
  "culture_innovation": {
    "Exploratrice": { "Innovation": 2 },
    "Curieuse": { "Innovation": 1 },
    "Précautionneuse": { "Innovation": 0 },
  },
  "vision_ia": {
    "Idéateur": { "AI Culture": 2 },
    "Analyste": { "AI Culture": 1 },
    "Observateur": { "AI Culture": 0 },
  },
  "process_internes": {
    "Ultra structurés": { "IA Readiness": 2 },
    "Digitalisés": { "IA Readiness": 1 },
    "Largement manuels": { "IA Readiness": 0 },
  },
  "donnees_disponibles": {
    "Facilement accessible": { "IA Readiness": 2 },
    "Fragmentée": { "IA Readiness": 1 },
    "Opaque": { "IA Readiness": 0 },
  },
  "decisions_data": {
    "Toujours": { "Innovation": 2, "IA Readiness": 2 },
    "Parfois": { "Innovation": 1, "IA Readiness": 1 },
    "Rarement": { "Innovation": 0, "IA Readiness": 0 },
  },
  // Persona/Role conditional
  // CEO
  "ceo_projet_ia": {
    "An investment for the future": { "AI Culture": 2 },
    "A strategic lever": { "AI Culture": 1 },
    "A controllable threat": { "AI Culture": 0 },
  },
  "ceo_ethique_ia": {
    "Essential": { "AI Culture": 2 },
    "Important": { "AI Culture": 1 },
    "Optional": { "AI Culture": 0 },
  },
  "ceo_ia_devrait": {
    "Augment humans": { "AI Culture": 2 },
    "Optimize costs": { "AI Culture": 1 },
    "Replace jobs": { "AI Culture": 0 },
  },
  // CTO
  "cto_projet_ia": {
    "Data audit": { "AI Culture": 2 },
    "Quick POC": { "AI Culture": 1 },
    "Compliance first": { "AI Culture": 0 },
  },
  "cto_expliquer_ia": {
    "A smart tool": { "AI Culture": 2 },
    "A very fast colleague": { "AI Culture": 1 },
    "Just another tech": { "AI Culture": 0 },
  },
  "cto_utile": {
    "Integrated in processes": { "AI Culture": 2 },
    "Reduces errors": { "AI Culture": 1 },
    "Does what Excel does": { "AI Culture": 0 },
  },
  // Consultant (and Other)
  "consultant_parler_client": {
    "Explains with images": { "AI Culture": 2 },
    "Uses sector example": { "AI Culture": 1 },
    "Starts a debate": { "AI Culture": 0 },
  },
  "consultant_atelier": {
    "Reconnects to needs": { "AI Culture": 2 },
    "Provokes ideas": { "AI Culture": 1 },
    "Follows the trend": { "AI Culture": 0 },
  },
  "consultant_client_ideal": {
    "An active curious": { "AI Culture": 2 },
    "An awakened follower": { "AI Culture": 1 },
    "A passive convinced": { "AI Culture": 0 },
  },
};

// --- Calculate score per dimension ---
export function calculateDimensions(answers: { [key: string]: string }): DimensionsScore {
  const score: DimensionsScore = {
    "AI Culture": 0,
    "Innovation": 0,
    "IA Readiness": 0,
  };
  for (const [qKey, answer] of Object.entries(answers)) {
    const mapping = questionPoints[qKey]?.[answer];
    if (mapping) {
      for (const [dimension, pts] of Object.entries(mapping)) {
        score[dimension as keyof DimensionsScore] =
          (score[dimension as keyof DimensionsScore] || 0) + pts;
      }
    }
  }
  return score;
}

// --- Persona "level" mapping ---
// 0: Low, 1: Medium, 2: High
const personaProfiles: Record<string, [number, number, number]> = {
  "stratege_explorateur":      [2, 2, 2],
  "philosophe_craintif":       [2, 0, 1],
  "innovateur_deracine":       [0, 2, 0],
  "organisateur_visionnaire":  [1, 1, 2],
  "conservateur_methodique":   [0, 0, 2],
  "technophile_poetique":      [2, 1, 0],
  "faconneur_curieux":         [1, 2, 1],
  "surveillant_sceptique":     [1, 0, 0],
};

function toLevelNum(score: number): number {
  if (score <= 2) return 0; // Low
  if (score <= 5) return 1; // Medium
  return 2; // High
}

function userVector(dimScores: DimensionsScore): [number, number, number] {
  return [
    toLevelNum(dimScores["AI Culture"]),
    toLevelNum(dimScores["Innovation"]),
    toLevelNum(dimScores["IA Readiness"]),
  ];
}

// --- Fuzzy best-fit persona assignment ---
export function getPersona(dimScores: DimensionsScore): Persona {
  const user = userVector(dimScores);
  let minDist = Infinity;
  let closestKey = "surveillant_sceptique"; // fallback

  Object.entries(personaProfiles).forEach(([key, vec]) => {
    const dist =
      Math.abs(user[0] - vec[0]) +
      Math.abs(user[1] - vec[1]) +
      Math.abs(user[2] - vec[2]);
    if (dist < minDist) {
      minDist = dist;
      closestKey = key;
    }
  });

  return personas.find((p) => p.key === closestKey)!;
}
