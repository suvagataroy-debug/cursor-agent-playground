import Link from "next/link";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface TopbarProps {
  breadcrumbs: BreadcrumbItem[];
  actions?: React.ReactNode;
}

export default function Topbar({ breadcrumbs, actions }: TopbarProps) {
  return (
    <div className="topbar">
      <div className="topbar-breadcrumb">
        {breadcrumbs.map((item, i) => (
          <span key={i}>
            {i > 0 && <span style={{ margin: "0 4px" }}>/</span>}
            {item.href ? (
              <Link href={item.href}>{item.label}</Link>
            ) : (
              <strong>{item.label}</strong>
            )}
          </span>
        ))}
      </div>
      {actions && <div className="topbar-actions">{actions}</div>}
    </div>
  );
}
