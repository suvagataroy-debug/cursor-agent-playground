export const medicalSidebar = {
  brand: {
    letter: "M",
    title: "Medical Portal",
    subtitle: "Clinical & Eligibility Domain",
    colorClass: "clinical",
  },
  sections: [
    {
      title: "Eligibility",
      items: [
        { href: "/medical/eligibility", icon: "\u2714", label: "Treatment Eligibility", badge: "12" },
      ],
    },
    {
      title: "Protocols",
      items: [
        { href: "/medical/titration-protocols", icon: "\uD83D\uDC89", label: "Titration Protocols" },
        { href: "/medical/consumption-rates", icon: "\u23F1", label: "Consumption Rates" },
        { href: "/medical/safety-boundaries", icon: "\uD83D\uDEE1", label: "Safety Boundaries" },
      ],
    },
  ],
};

export const commercialSidebar = {
  brand: {
    letter: "$",
    title: "Commercial Portal",
    subtitle: "Offer, Pricing & Promotion",
    colorClass: "commercial",
  },
  sections: [
    {
      title: "Offers",
      items: [
        { href: "/commercial/offers", icon: "\uD83C\uDF81", label: "Offer Builder", badge: "18" },
        { href: "/commercial/addons", icon: "\u2795", label: "Add-on Configuration" },
      ],
    },
    {
      title: "Billing",
      items: [
        { href: "/commercial/plan-lengths", icon: "\uD83D\uDCB3", label: "Plan Lengths" },
      ],
    },
    {
      title: "Pricing & Promotions",
      items: [
        { href: "/commercial/pricing", icon: "\uD83D\uDCB2", label: "Pricing Strategies" },
        { href: "/commercial/promotions", icon: "\uD83C\uDFC5", label: "Promotion Manager" },
      ],
    },
  ],
};

export const operationsSidebar = {
  brand: {
    letter: "O",
    title: "Operations Portal",
    subtitle: "Main Catalog & Shipping",
    colorClass: "supply",
  },
  sections: [
    {
      title: "Catalog",
      items: [
        { href: "/operations/catalog", icon: "\uD83D\uDCDA", label: "Item Catalog", badge: "34" },
      ],
    },
    {
      title: "Logistics",
      items: [
        { href: "/operations/logistics-rules", icon: "\u2699", label: "Logistics Rules Engine" },
        { href: "/operations/shipping-schedules", icon: "\uD83D\uDE9A", label: "Shipping Schedules" },
      ],
    },
  ],
};
