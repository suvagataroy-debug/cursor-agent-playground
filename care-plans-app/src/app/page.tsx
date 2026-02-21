import Link from "next/link";

export default function Dashboard() {
  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: "48px 32px" }}>
      <div style={{ textAlign: "center" as const, marginBottom: 48 }}>
        <div style={{ width: 56, height: 56, borderRadius: 14, background: "linear-gradient(135deg, #6c5ce7, #1a73e8)", display: "inline-flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700, fontSize: 22, marginBottom: 20 }}>M</div>
        <h1 style={{ fontSize: 32, fontWeight: 700, marginBottom: 8 }}>Care Plan Control Planes</h1>
        <p style={{ fontSize: 16, color: "var(--text-secondary)", maxWidth: 640, margin: "0 auto" }}>Configuration interfaces for Manual 2.0&apos;s care plan architecture. Three specialized admin portals for medical directors, product managers, and operations teams.</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 24, marginBottom: 48 }}>
        {[
          {
            icon: "\u2695", iconBg: "#e6f4ea", iconColor: "#0d904f",
            title: "Medical Portal", desc: "Managed by medical directors and clinical leads. Define eligibility criteria, treatment plans, consumption rates, and safety boundaries.",
            screens: [
              { href: "/medical/eligibility", icon: "\u2714", label: "Create Treatment Eligibility" },
              { href: "/medical/titration-protocols", icon: "\uD83D\uDC89", label: "Configure Treatment Plans" },
              { href: "/medical/titration-protocol-detail", icon: "\uD83D\uDCCB", label: "Treatment Plan Detail" },
              { href: "/medical/consumption-rates", icon: "\u23F1", label: "Define Consumption Rates" },
              { href: "/medical/safety-boundaries", icon: "\uD83D\uDEE1", label: "Set Safety Boundaries" },
            ],
          },
          {
            icon: "\uD83D\uDCB0", iconBg: "#e8f0fe", iconColor: "#1a73e8",
            title: "Commercial Portal", desc: "For marketing and product managers. Package clinical protocols into marketable offers, billing, pricing, and promotions.",
            screens: [
              { href: "/commercial/offers", icon: "\uD83C\uDF81", label: "Offer Builder" },
              { href: "/commercial/offer-detail", icon: "\uD83D\uDCC4", label: "Offer Configuration" },
              { href: "/commercial/pricing", icon: "\uD83D\uDCB2", label: "Pricing Simulator" },
              { href: "/commercial/promotions", icon: "\uD83C\uDFC5", label: "Promotion Manager" },
              { href: "/commercial/addons", icon: "\u2795", label: "Add-on Configuration" },
            ],
          },
          {
            icon: "\uD83D\uDCE6", iconBg: "#fef7e0", iconColor: "#e37400",
            title: "Operations Portal", desc: "For operations and fulfilment teams. Manage the item catalog, automated logistics rules, and shipping schedule alignment.",
            screens: [
              { href: "/operations/catalog", icon: "\uD83D\uDCDA", label: "Item Catalog Management" },
              { href: "/operations/sku-detail", icon: "\uD83D\uDD2C", label: "SKU Detail" },
              { href: "/operations/logistics-rules", icon: "\u2699", label: "Logistics Rules Engine" },
              { href: "/operations/shipping-schedules", icon: "\uD83D\uDE9A", label: "Shipping Schedule Management" },
            ],
          },
          {
            icon: "\uD83D\uDC64", iconBg: "#f3e8ff", iconColor: "#7c3aed",
            title: "Customer Portal", desc: "View customer-facing state: current offer, treatment plan, billing, and eligibility for a particular customer.",
            screens: [
              { href: "/customer-portal", icon: "\uD83D\uDC64", label: "Customer overview" },
              { href: "/customer-portal/jane-doe", icon: "\uD83D\uDCCB", label: "Customer detail" },
            ],
          },
        ].map((portal, i) => (
          <div key={i} style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 12, padding: "32px 28px", textAlign: "center" as const, transition: "all 0.2s" }}>
            <div style={{ width: 56, height: 56, borderRadius: 14, display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 26, marginBottom: 16, background: portal.iconBg, color: portal.iconColor }}>{portal.icon}</div>
            <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 8 }}>{portal.title}</h3>
            <p style={{ fontSize: 13.5, color: "var(--text-secondary)", marginBottom: 20, lineHeight: 1.6 }}>{portal.desc}</p>
            <div style={{ textAlign: "left" as const }}>
              {portal.screens.map((screen, j) => (
                <Link key={j} href={screen.href} style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 12px", margin: "0 -12px", borderRadius: 6, fontSize: 13, fontWeight: 450, color: "var(--text-primary)", transition: "background 0.15s" }}>
                  <span>{screen.icon}</span> {screen.label} <span style={{ marginLeft: "auto", color: "var(--text-muted)", fontSize: 16 }}>&rsaquo;</span>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div style={{ fontSize: 13, fontWeight: 600, textTransform: "uppercase" as const, letterSpacing: 0.8, color: "var(--text-secondary)", marginBottom: 16 }}>Interaction Flow</div>
      <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 12, padding: 32 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 0, flexWrap: "wrap" as const, padding: "24px 0" }}>
          {[
            { label: "Step 1", name: "Eligibility Engine", border: "#0d904f", bg: "#e6f4ea", color: "#0d904f" },
            null,
            { label: "Step 2", name: "Treatment Plan", border: "#1a73e8", bg: "#e8f0fe", color: "#1557b0" },
            null,
            { label: "Step 3", name: "Offer Engine", border: "#6c5ce7", bg: "#f0edff", color: "#6c5ce7" },
            null,
            { label: "Step 4", name: "Pricing Engine", border: "#e37400", bg: "#fef7e0", color: "#b85c00" },
            null,
            { label: "Step 5", name: "Billing Engine", border: "#d93025", bg: "#fce8e6", color: "#d93025" },
            null,
            { label: "Step 6", name: "Shipping Service", border: "#00838f", bg: "#e0f7fa", color: "#00838f" },
          ].map((item, i) => {
            if (!item) return <div key={i} style={{ fontSize: 22, color: "var(--text-muted)", padding: "0 10px" }}>&rarr;</div>;
            return (
              <div key={i} style={{ padding: "14px 20px", borderRadius: 8, textAlign: "center", minWidth: 140, border: "2px solid " + item.border, background: item.bg, color: item.color }}>
                <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: 0.5, fontWeight: 600 }}>{item.label}</div>
                <div style={{ fontSize: 13, fontWeight: 600, marginTop: 2 }}>{item.name}</div>
              </div>
            );
          })}
        </div>
        <p style={{ textAlign: "center" as const, color: "var(--text-secondary)", fontSize: 13, marginTop: 8 }}>
          Patient validated &rarr; Clinical plan mapped &rarr; Offer presented &rarr; Price calculated &rarr; Billing started &rarr; Fulfilment scheduled
        </p>
      </div>
    </div>
  );
}
