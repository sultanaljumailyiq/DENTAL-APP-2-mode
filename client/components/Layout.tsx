import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Home,
  Calendar,
  Users,
  Stethoscope,
  UserCheck,
  CreditCard,
  TrendingUp,
  ShoppingCart,
  Package,
  BarChart3,
  HelpCircle,
  Search,
  Plus,
  User,
  ChevronDown,
  ChevronRight,
  Building,
  MapPin,
  Menu,
  X,
  Settings,
  Globe,
  Crown,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useI18n } from "@/lib/i18n";
import AIAssistantRedesigned from "./AIAssistantRedesigned";
import NotificationSystem from "./NotificationSystem";

interface NavItem {
  name: string;
  href: string;
  icon: any;
}

interface NavSection {
  name: string;
  items: NavItem[];
  isExpandable: boolean;
  defaultExpanded?: boolean;
}

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [expandedSections, setExpandedSections] = useState<string[]>([
    "العي��دة",
    "أخرى",
  ]);
  const { language, isRTL, t } = useI18n();

  const isActive = (href: string) => {
    if (href === "/admin") {
      return location.pathname === "/admin";
    }
    return location.pathname.startsWith(href);
  };

  const toggleSection = (sectionName: string) => {
    if (sectionName === "العيادة") return; // العيادة تبقى مفتوحة دائماً

    setExpandedSections((prev) =>
      prev.includes(sectionName)
        ? prev.filter((s) => s !== sectionName)
        : [...prev, sectionName],
    );
  };

  // Navigation sections
  const navigationSections: NavSection[] = [
    {
      name: "الرئيسية",
      items: [{ name: "لوحة التحكم", href: "/admin", icon: Home }],
      isExpandable: false,
    },
    {
      name: "العيادة",
      items: [
        { name: "ال��جوزات", href: "/admin/reservations", icon: Calendar },
        { name: "المرضى", href: "/admin/patients", icon: Users },
        { name: "العلاجات", href: "/admin/treatments", icon: Stethoscope },
        { name: "الطاقم", href: "/admin/staff", icon: UserCheck },
      ],
      isExpandable: false,
      defaultExpanded: true,
    },
    {
      name: "المالية",
      items: [
        { name: "الحسابات", href: "/admin/accounts", icon: CreditCard },
        { name: "المبيعات", href: "/admin/sales", icon: TrendingUp },
        { name: "المشتريات", href: "/admin/purchases", icon: ShoppingCart },
      ],
      isExpandable: true,
    },
    {
      name: "الأصول المادية",
      items: [
        { name: "المخزون", href: "/admin/stocks", icon: Package },
        { name: "الأجهزة", href: "/admin/peripherals", icon: Package },
      ],
      isExpandable: true,
    },
    {
      name: "أخرى",
      items: [{ name: "التقارير", href: "/admin/reports", icon: BarChart3 }],
      isExpandable: true,
    },
  ];

  const getPageTitle = () => {
    const path = location.pathname;
    if (path === "/admin") return "لوحة التحكم";
    if (path.includes("reservations")) return "الحجوزات";
    if (path.includes("patients")) return "المرضى";
    if (path.includes("treatments")) return "العلاجات";
    if (path.includes("staff")) return "الطاقم";
    if (path.includes("accounts")) return "الحسابات";
    if (path.includes("sales")) return "المبيعات";
    if (path.includes("purchases")) return "مشتريات متجر الأسنان";
    if (path.includes("stocks")) return "المخزون";
    if (path.includes("peripherals")) return "الأجهزة";
    if (path.includes("reports")) return "التقارير";
    return "لوحة التحكم";
  };

  return (
    <div
      className={cn(
        "min-h-screen bg-gradient-to-br from-gray-50 to-gray-100",
        isRTL ? "font-arabic" : "",
      )}
    >
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 z-50 bg-white/95 backdrop-blur-xl border-gray-200/50 transform transition-all duration-300 ease-in-out shadow-2xl",
          sidebarCollapsed ? "w-16" : "w-64",
          isRTL ? "right-0 border-l" : "left-0 border-r",
          sidebarOpen
            ? "translate-x-0"
            : isRTL
              ? "translate-x-full lg:translate-x-0"
              : "-translate-x-full lg:translate-x-0",
        )}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 px-4 py-4 border-b border-gray-200/50">
          <Link
            to="/"
            className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg"
          >
            <div className="w-3 h-3 bg-white rounded-sm"></div>
          </Link>
          {!sidebarCollapsed && (
            <div className="flex-1">
              <span className="text-lg font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                زيندنتا
              </span>
              <p className="text-xs text-gray-500">إدارة العيادات</p>
            </div>
          )}
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="hidden lg:flex p-2 rounded-lg hover:bg-gray-100 transition-all duration-200"
          >
            <ChevronDown
              className={cn(
                "w-4 h-4 text-gray-600 transform transition-transform duration-300",
                sidebarCollapsed ? "rotate-90" : "-rotate-90",
              )}
            />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-2 px-3">
          {navigationSections.map((section) => (
            <div key={section.name} className="mb-3">
              {section.name !== "الرئيسية" && (
                <button
                  onClick={() => toggleSection(section.name)}
                  className={cn(
                    "w-full flex items-center justify-between px-3 py-1.5 text-xs font-semibold text-gray-500 uppercase tracking-wide hover:text-gray-700 transition-colors",
                    sidebarCollapsed && "justify-center",
                  )}
                  disabled={!section.isExpandable}
                >
                  {!sidebarCollapsed && (
                    <>
                      <span>{section.name}</span>
                      {section.isExpandable && (
                        <ChevronRight
                          className={cn(
                            "w-4 h-4 transition-transform duration-200",
                            expandedSections.includes(section.name) &&
                              "rotate-90",
                          )}
                        />
                      )}
                    </>
                  )}
                  {sidebarCollapsed && (
                    <div className="w-8 h-0.5 bg-gray-300 rounded-full"></div>
                  )}
                </button>
              )}

              <div
                className={cn(
                  "space-y-0.5 overflow-hidden transition-all duration-300 ease-in-out",
                  section.name === "العيادة" ||
                    expandedSections.includes(section.name) ||
                    section.name === "الرئيسية"
                    ? "max-h-96 opacity-100"
                    : "max-h-0 opacity-0",
                )}
              >
                {section.items.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={cn(
                      "flex items-center px-3 py-2 text-sm font-medium rounded-xl transition-all duration-200 group",
                      sidebarCollapsed ? "justify-center gap-0" : "gap-3",
                      isActive(item.href)
                        ? "bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 shadow-sm border border-blue-100"
                        : "text-gray-700 hover:bg-gray-50 hover:text-gray-900",
                    )}
                    title={sidebarCollapsed ? item.name : undefined}
                  >
                    <item.icon
                      className={cn(
                        "w-5 h-5 transition-colors",
                        isActive(item.href)
                          ? "text-blue-600"
                          : "text-gray-500 group-hover:text-gray-700",
                      )}
                    />
                    {!sidebarCollapsed && (
                      <span className="truncate">{item.name}</span>
                    )}
                    {!sidebarCollapsed && isActive(item.href) && (
                      <div className="w-2 h-2 bg-blue-600 rounded-full ml-auto"></div>
                    )}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div
        className={cn(
          "transition-all duration-300",
          sidebarCollapsed
            ? isRTL
              ? "lg:pr-16"
              : "lg:pl-16"
            : isRTL
              ? "lg:pr-64"
              : "lg:pl-64",
        )}
      >
        {/* Page Content */}
        <main className="p-4 lg:p-6">{children}</main>
      </div>

      {/* AI Assistant */}
      <AIAssistantRedesigned />
    </div>
  );
}
