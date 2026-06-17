export type SustainabilityBand =
  | "Excellent"
  | "Strong"
  | "Moderate"
  | "Weak"
  | "Insufficient Evidence";

export type ConfidenceLevel = "High" | "Medium" | "Low";

export type ProductCategory = "Beauty" | "Fashion" | "Food";

export type PlatformListing = {
  platform: "Amazon" | "Flipkart" | "Nykaa" | "Myntra" | "Brand Site";
  price: number;
  currency: "INR";
  url: string;
  availability: "In Stock" | "Out of Stock" | "Unknown";
};

export type EvidenceTier = "A" | "B" | "C" | "D" | "E";

export type ProductEvidence = {
  label: string;
  source: string;
  tier: EvidenceTier;
};

export type Product = {
  id: string;
  name: string;
  brand: string;
  category: ProductCategory;
  imageUrl: string;
  description: string;
  rating: SustainabilityBand;
  confidence: ConfidenceLevel;
  shortReason: string;
  productFactors: string[];
  brandFactors: string[];
  evidence: ProductEvidence[];
  missingData: string[];
  listings: PlatformListing[];
};