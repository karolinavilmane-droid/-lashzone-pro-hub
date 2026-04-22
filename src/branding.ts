/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import lashzoneLogo from './assets/lashzone-logo.svg';

export interface BrandingConfig {
  businessName: string;
  logoUrl: any; // Allow for imported asset modules
  primaryColour: string;
  accentColour: string;
  logoPrefix: string; // The letter used in the logo mark
}

export const BRANDING: BrandingConfig = {
  businessName: "LashZone",
  logoUrl: lashzoneLogo, 
  primaryColour: "#9A7ED4",
  accentColour: "#FF8050",
  logoPrefix: "L"
};
