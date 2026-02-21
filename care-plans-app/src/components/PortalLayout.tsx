"use client";
import { useEffect } from "react";
import Sidebar from "./Sidebar";

interface PortalLayoutProps {
  sidebar: {
    brand: { letter: string; title: string; subtitle: string; colorClass: string };
    sections: { title: string; items: { href: string; icon: string; label: string; badge?: string }[] }[];
  };
  children: React.ReactNode;
}

export default function PortalLayout({ sidebar, children }: PortalLayoutProps) {
  useEffect(() => {
    document.body.classList.add("with-sidebar");
    return () => { document.body.classList.remove("with-sidebar"); };
  }, []);

  return (
    <>
      <Sidebar brand={sidebar.brand} sections={sidebar.sections} />
      <div className="main">{children}</div>
    </>
  );
}
