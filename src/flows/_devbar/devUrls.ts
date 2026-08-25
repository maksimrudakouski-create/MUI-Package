// src/flows/_devbar/devUrls.ts
//
// One place for the local dev URLs. The DevBar links out to Storybook, and the
// Flow Map story links back into the app, so both sides have to agree. In the
// previous kit these ports were hardcoded in two files and drifted the moment
// someone ran a second project on a shifted port — this is that fix.
//
// If you change a port in package.json (`dev:app` / `dev:storybook`), change it
// here and nowhere else.

export const APP_PORT = 5173;
export const STORYBOOK_PORT = 6006;

export const APP_URL = `http://localhost:${APP_PORT}`;
export const STORYBOOK_URL = `http://localhost:${STORYBOOK_PORT}`;

/**
 * Deep link to the Flow Map story. The story ID is derived from the story's
 * `title` ("System/Flow Map") and its export name (`AllFlows`) — rename either
 * and this 404s. See FlowMap.stories.tsx.
 */
export const FLOWMAP_URL = `${STORYBOOK_URL}/?path=/story/system-flow-map--all-flows`;
