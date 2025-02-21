export const SITE_NAME = "AdaptAxe";
export const SITE_HEADLINE = "Adapt  Evolve  Shred";
export const SITE_DESCRIPTION =
  "Transform your guitar's sound and style in seconds without any tools.";
export const SITE_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : "https://saas-stack.startupstudio.dev";
export const GITHUB_REPO_URL = "https://github.com/SelfhostedPro/AdaptAxe-Site";
export const SITE_DOMAIN = new URL(SITE_URL).hostname;

export const OFFPAGE_DISTANCE = 20;

type Oneof<T extends ReadonlyArray<unknown>> =
  T extends ReadonlyArray<infer Oneof> ? Oneof : never;

export const Parts = [
  "explore",
  "left",
  "right",
  "neck",
  "pickup",
  "core",
  "bridge",
  "thanks",
] as const;

export type PartType = Oneof<typeof Parts>;

export const SOCIALS = [
  // {
  //   url: "/",
  //   icon: "home",
  // },
  {
    url: "https://www.instagram.com/adaptaxe/",
    icon: "instagram",
    name: "instagram"
  },
  {
    url: "tel:+14428997309",
    icon: "phone",
    name: "phone"
  },
  {
    url: "mailto:stephen@adaptaxe.com",
    icon: "mail",
    name: "email"
  },
];
export const LINKS = [
  {
    url: "/explore",
    icon: "map",
    title: "Explore",
    description: "An in-depth view of how things work",
  },
  {
    url: "https://forms.gle/FksvpzrdzSmAu7Ek7",
    icon: "notepad-text",
    title: "Feedback and Updates",
    description: "Let me know what you think",
  },
  //   {
  //     "url": "tel:+14428997309",
  //     "icon": "phone",
  //     "title": "Call or Text Me",
  //     "description": "+1 (442) 899-7309"
  //   },
  //   {
  //     "url": "mailto:stephen@adaptaxe.com",
  //     "icon": "mail",
  //     "title": "Email Me",
  //     "description": "stephen@adaptaxe.com"
  //   }
];
