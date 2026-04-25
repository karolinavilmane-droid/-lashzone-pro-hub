/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface BrandingConfig {
  businessName: string;
  logoUrl: string;
  primaryColour: string;
  accentColour: string;
  logoPrefix: string;
}

export const BRANDING: BrandingConfig = {
  businessName: "LashZone",
  logoUrl: "/logo.jpg",
  primaryColour: "#F4A261",
  accentColour: "#9B5DE5",
  logoPrefix: "L"
};
