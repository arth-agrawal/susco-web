import type { Product } from "@/lib/types/product";

export const mockProducts: Product[] = [
  {
    id: "minimalist-sunscreen-spf50",
    name: "SPF 50 Sunscreen",
    brand: "Minimalist",
    category: "Beauty",
    imageUrl:
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=1200&auto=format&fit=crop",
    description:
      "Lightweight daily sunscreen with visible ingredient disclosure and broad online availability.",
    rating: "Moderate",
    confidence: "Medium",
    shortReason:
      "Ingredient disclosure is available, but packaging sustainability evidence and third-party environmental certification are limited.",
    productFactors: [
      "Ingredient list available",
      "Product-level sustainability certification not found",
      "Packaging recyclability evidence limited",
    ],
    brandFactors: [
      "Brand has public product information",
      "Parent/company-level sustainability disclosure needs deeper verification",
    ],
    evidence: [
      {
        label: "Product page ingredient disclosure",
        source: "Brand / ecommerce product page",
        tier: "C",
      },
      {
        label: "Packaging claim not independently verified",
        source: "Manual evidence review",
        tier: "D",
      },
    ],
    missingData: [
      "Packaging recyclability proof",
      "Product-level environmental certification",
      "Detailed manufacturing/supplier information",
    ],
    listings: [
      {
        platform: "Nykaa",
        price: 399,
        currency: "INR",
        url: "https://www.nykaa.com/",
        availability: "In Stock",
      },
      {
        platform: "Amazon",
        price: 399,
        currency: "INR",
        url: "https://www.amazon.in/",
        availability: "In Stock",
      },
    ],
  },
  {
    id: "blue-tokai-coffee",
    name: "Attikan Estate Coffee",
    brand: "Blue Tokai",
    category: "Food",
    imageUrl:
      "https://images.unsplash.com/photo-1447933601403-0c6688de566e?q=80&w=1200&auto=format&fit=crop",
    description:
      "Indian specialty coffee with origin-focused positioning and direct-to-consumer availability.",
    rating: "Strong",
    confidence: "Medium",
    shortReason:
      "Sourcing transparency appears stronger than typical packaged coffee, but packaging and third-party sustainability proof require verification.",
    productFactors: [
      "Origin/source information visible",
      "Packaging sustainability evidence limited",
      "Certification status requires verification",
    ],
    brandFactors: [
      "Brand positioning includes sourcing transparency",
      "Company-level ESG disclosure limited",
    ],
    evidence: [
      {
        label: "Origin/source information",
        source: "Brand/product page",
        tier: "C",
      },
    ],
    missingData: [
      "Independent sourcing certification",
      "Packaging lifecycle data",
      "Company-level sustainability report",
    ],
    listings: [
      {
        platform: "Brand Site",
        price: 475,
        currency: "INR",
        url: "https://bluetokaicoffee.com/",
        availability: "In Stock",
      },
      {
        platform: "Amazon",
        price: 499,
        currency: "INR",
        url: "https://www.amazon.in/",
        availability: "Unknown",
      },
    ],
  },
  {
    id: "sample-denim-jeans",
    name: "Slim Fit Denim Jeans",
    brand: "Sample Denim Co.",
    category: "Fashion",
    imageUrl:
      "https://images.unsplash.com/photo-1542272604-787c3835535d?q=80&w=1200&auto=format&fit=crop",
    description:
      "Denim jeans listed across fashion platforms with limited product-level sustainability data.",
    rating: "Weak",
    confidence: "Low",
    shortReason:
      "Material information is partial, and product-level supply chain, water, dyeing, and labor evidence are missing.",
    productFactors: [
      "Material composition partially available",
      "No product-level supply chain disclosure",
      "No durability or repairability evidence",
    ],
    brandFactors: [
      "Brand-level sustainability disclosure not found",
      "Parent company mapping pending",
    ],
    evidence: [
      {
        label: "Material description from listing",
        source: "Ecommerce product page",
        tier: "D",
      },
    ],
    missingData: [
      "Supplier/factory information",
      "Dyeing/water impact evidence",
      "Labor/supply chain transparency",
      "Recycled/organic material proof",
    ],
    listings: [
      {
        platform: "Myntra",
        price: 2499,
        currency: "INR",
        url: "https://www.myntra.com/",
        availability: "In Stock",
      },
    ],
  },
];