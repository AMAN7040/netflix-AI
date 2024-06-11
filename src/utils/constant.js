const HarmCategory = {
  HATE_SPEECH: 'HATE_SPEECH',
  HARASSMENT: 'HARASSMENT',
  SEXUALLY_EXPLICIT: 'SEXUALLY_EXPLICIT',
  DANGEROUS_CONTENT: 'DANGEROUS_CONTENT'
};

const HarmBlockThreshold = {
  BLOCK_NONE: 'BLOCK_NONE',
  BLOCK_MODERATE: 'BLOCK_MODERATE',
  BLOCK_HIGH: 'BLOCK_HIGH'
};


export const NETFLIX_LOGO =
  "https://cdn.cookielaw.org/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png";

export const BACKGROUND_IMAGE_URL =
  "https://assets.nflxext.com/ffe/siteui/vlv3/cacfadb7-c017-4318-85e4-7f46da1cae88/e43aa8b1-ea06-46a5-abe3-df13243e718d/IN-en-20240603-popsignuptwoweeks-perspective_alpha_website_large.jpg";

export const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${process.env.REACT_APP_TMDB_KEY}`,
  },
};

export const IMG_URL = "https://image.tmdb.org/t/p/w500";

export const LANGUAGES = [
  { identifier: "en", name: "English" },
  { identifier: "Hindi", name: "हिंदी" },
  { identifier: "French", name: "Français" },
  { identifier: "Spanish", name: "español" },
  { identifier: "Japanese", name: "日本語" },
];

export const OPEN_AI_KEY = process.env.REACT_APP_OPEN_AI_KEY

export const safetySettings = {
  [HarmCategory.HATE_SPEECH]: HarmBlockThreshold.BLOCK_NONE,
  [HarmCategory.HARASSMENT]: HarmBlockThreshold.BLOCK_NONE,
  [HarmCategory.SEXUALLY_EXPLICIT]: HarmBlockThreshold.BLOCK_NONE,
  [HarmCategory.DANGEROUS_CONTENT]: HarmBlockThreshold.BLOCK_NONE
};