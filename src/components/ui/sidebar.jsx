import React, { createContext, useContext, useState } from "react";

export function Sidebar({ children, className }) {
  return <aside className={className}>{children}</aside>;
}

export function SidebarHeader({ children, className }) {
  return <div className={className}>{children}</div>;
}

export function SidebarContent({ children, className }) {
  return <div className={className}>{children}</div>;
}

export function SidebarGroup({ children, className }) {
  return <div className={className}>{children}</div>;
}

export function SidebarGroupLabel({ children, className }) {
  return <div className={className}>{children}</div>;
}

export function SidebarGroupContent({ children, className }) {
  return <div className={className}>{children}</div>;
}

export function SidebarMenu({ children, className }) {
  return <ul className={className}>{children}</ul>;
}

export function SidebarMenuItem({ children }) {
  return <li>{children}</li>;
}

export function SidebarMenuButton({ children, asChild = false, className }) {
  return asChild ? children : <button className={className}>{children}</button>;
}

export function SidebarFooter({ children, className }) {
  return <div className={className}>{children}</div>;
}

const SidebarContext = createContext();

export function SidebarProvider({ children }) {
  const [open, setOpen] = useState(true);
  return (
    <SidebarContext.Provider value={{ open, setOpen }}>
      {children}
    </SidebarContext.Provider>
  );
}

export function SidebarTrigger({ className }) {
  const { setOpen } = useContext(SidebarContext);
  return (
    <button onClick={() => setOpen((prev) => !prev)} className={className}>
      ☰
    </button>
  );
}
