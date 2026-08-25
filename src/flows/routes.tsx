// src/flows/routes.tsx
//
// DESIGNER-OWNED. The declarative route tree: structure and navigation only.
// There is deliberately no `loader` or `guard` field — there's nowhere to put
// logic, which is what keeps this folder safe to own.
//
// /app/router.tsx consumes this tree generically and builds the real router
// from it. Adding a screen = drop a component in src/flows/<name>/ and add an
// entry here. You never touch /app.
//
// Param syntax is `:id` (readable). The bridge in /app translates it to
// TanStack's `$id` — don't write `$id` here.

import type { ComponentType } from "react";
import ForgotPasswordScreen from "./auth/ForgotPasswordScreen";
import LoginScreen from "./auth/LoginScreen";
import CampaignDetailsScreen from "./campaigns/CampaignDetailsScreen";
import CreateCampaignScreen from "./campaigns/CreateCampaignScreen";
import CampaignsListScreen from "./campaigns/CampaignsListScreen";

export type FlowRoute = {
  /** "/" | "loans" | ":id". Nested under the parent's path. */
  path: string;
  /** The screen. Omit on a node that exists purely to group children. */
  component?: ComponentType;
  children?: FlowRoute[];
  /**
   * Design annotation ONLY — grouping/labels for the DevBar and the Flow Map.
   * NOT enforcement: `meta.role: "admin"` restricts nothing.
   * Real role guards are dev's, in /app.
   */
  meta?: {
    role?: string;
    flow?: string;
    label?: string;
    /** Sample values so detail routes are clickable, e.g. { id: "1001" }. */
    sampleParams?: Record<string, string>;
  };
};

export const routes: FlowRoute[] = [
  {
    path: "/",
    component: LoginScreen,
    meta: { role: "user", flow: "Stanleys AI", label: "Log in" },
  },
  {
    path: "forgot-password",
    component: ForgotPasswordScreen,
    meta: {
      role: "user",
      flow: "Stanleys AI",
      label: "Forgot password",
    },
  },
  {
    path: "campaigns",
    component: CampaignsListScreen,
    meta: { role: "user", flow: "Stanleys AI", label: "My campaigns" },
    children: [
      {
        path: "new",
        component: CreateCampaignScreen,
        meta: {
          role: "user",
          flow: "Stanleys AI",
          label: "Create campaign",
        },
      },
      {
        path: ":id",
        component: CampaignDetailsScreen,
        meta: {
          role: "user",
          flow: "Stanleys AI",
          label: "Campaign details",
          sampleParams: { id: "spring-launch" },
        },
      },
    ],
  },
];
