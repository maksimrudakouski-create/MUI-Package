export type MockCampaign = {
  id: string;
  name: string;
  author: string;
  description: string;
  createdAt: string;
  artworkCount: number;
  lastPrompt: string;
};

export const mockCampaigns: MockCampaign[] = [
  {
    id: "spring-launch",
    name: "Spring launch",
    author: "Ava Johnson",
    description: "Campaign imagery for the new spring collection launch.",
    createdAt: "Mar 18, 2026",
    artworkCount: 4,
    lastPrompt: "Editorial still life with fresh botanicals and soft morning light.",
  },
  {
    id: "city-after-dark",
    name: "City after dark",
    author: "Maya Singh",
    description: "Night-time campaign concepts for the urban essentials range.",
    createdAt: "Mar 12, 2026",
    artworkCount: 6,
    lastPrompt: "Architectural cityscape at blue hour with luminous reflections.",
  },
  {
    id: "weekend-rituals",
    name: "Weekend rituals",
    author: "Noah Williams",
    description: "A relaxed lifestyle series for seasonal weekend moments.",
    createdAt: "Mar 4, 2026",
    artworkCount: 3,
    lastPrompt: "Warm candid table scene with textured linens and afternoon sun.",
  },
];
