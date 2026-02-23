"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavItem {
  href: string;
  icon: string;
  label: string;
  badge?: string;
}

interface NavSection {
  title: string;
  items: NavItem[];
}

interface SidebarProps {
  brand: { letter: string; title: string; subtitle: string; colorClass: string };
  sections: NavSection[];
}

export default function Sidebar({ brand, sections }: SidebarProps) {
  const pathname = usePathname();

  return (
    <nav className="sidebar">
      <div className="sidebar-brand">
        <div className={`sidebar-brand-icon ${brand.colorClass}`}>{brand.letter}</div>
        <div>
          <h2>{brand.title}</h2>
          <span>{brand.subtitle}</span>
        </div>
      </div>
      {sections.map((section, si) => (
        <div className="sidebar-section" key={si}>
          <div className="sidebar-section-title">{section.title}</div>
          <ul className="sidebar-nav">
            {section.items.map((item, ii) => (
              <li key={ii}>
                <Link
                  href={item.href}
                  className={pathname === item.href ? "active" : ""}
                >
                  <span className="nav-icon">{item.icon}</span> {item.label}
                  {item.badge && <span className="badge">{item.badge}</span>}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
      <div className="sidebar-section">
        <div className="sidebar-section-title">Navigation</div>
        <ul className="sidebar-nav">
          <li>
            <Link href="/">
              <span className="nav-icon">&larr;</span> Back to Dashboard
            </Link>
          </li>
        </ul>
      </div>
      <div className="sidebar-footer">Manual 2.0 — Care Plans</div>
    </nav>
  );
}
