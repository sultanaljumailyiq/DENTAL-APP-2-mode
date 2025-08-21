import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Home,
  Search,
  Heart,
  User,
  ShoppingCart,
  MessageCircle,
  BookOpen,
  Briefcase,
  Store,
  Users,
  Zap,
  Settings,
  Bell,
  Star,
  TrendingUp,
  Award,
  Calendar,
  Building2,
  UserCheck,
  Stethoscope,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useSystemSettings } from "@/contexts/SystemSettingsContext";
import { useFavorites } from "@/contexts/FavoritesContext";

type SectionType =
  | "home"
  | "marketplace"
  | "medical-services"
  | "dentist-hub"
  | "community"
  | "jobs"
  | "education"
  | "profile"
  | "clinic-admin"
  | "search"
  | "favorites"
  | "notifications";

interface NavItem {
  id: string;
  label: string;
  icon: React.ComponentType<any>;
  path?: string;
  action?: () => void;
  color: string;
  gradient: string;
  isAction?: boolean;
  isVisible?: boolean;
}

export default function UltraModernBottomNav() {
  const location = useLocation();
  const navigate = useNavigate();
  const { isFeatureEnabled } = useSystemSettings();
  const { favoritesCount } = useFavorites();
  const [activeSection, setActiveSection] = useState<SectionType>("home");
  const [glowEffect, setGlowEffect] = useState(false);
  const [notifications, setNotifications] = useState({
    community: 2,
    marketplace: 1,
    jobs: 3,
    "clinic-admin": 1,
    favorites: 0,
    notifications: 5,
    search: 0,
    profile: 0,
    home: 0,
  });
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  // تحديد القسم النشط بناءً على المسار
  useEffect(() => {
    const path = location.pathname;

    if (path.includes("/community")) setActiveSection("community");
    else if (
      path.includes("/medical-services") ||
      path.includes("/marketplace")
    )
      setActiveSection("medical-services");
    else if (path.includes("/dentist-hub"))
      setActiveSection("dentist-hub");
    else if (
      path.includes("/dental-supply") ||
      path.includes("/products")
    )
      setActiveSection("marketplace");
    else if (path.includes("/jobs")) setActiveSection("jobs");
    else if (path.includes("/education")) setActiveSection("education");
    else if (path.includes("/clinic/admin") || path.includes("/clinic-admin"))
      setActiveSection("clinic-admin");
    else if (path.includes("/search")) setActiveSection("search");
    else if (path.includes("/favorites")) setActiveSection("favorites");
    else if (path.includes("/notifications")) setActiveSection("notifications");
    else if (path.includes("/profile") || path.includes("/dashboard"))
      setActiveSection("profile");
    else setActiveSection("home");
  }, [location.pathname]);

  // تأثير الوهج
  useEffect(() => {
    const interval = setInterval(() => {
      setGlowEffect(true);
      setTimeout(() => setGlowEffect(false), 2000);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  // العناصر الرئيسية - مع فلترة حسب الأقسام المفعلة
  const allMainItems: NavItem[] = [
    {
      id: "home",
      label: "الرئيسية",
      icon: Home,
      path: "/",
      color: "blue",
      gradient: "from-blue-500 to-blue-600",
    },
    {
      id: "search",
      label: "البحث",
      icon: Search,
      path: "/search",
      color: "purple",
      gradient: "from-purple-500 to-purple-600",
    },
    {
      id: "favorites",
      label: "المفضلة",
      icon: Heart,
      path: "/favorites",
      color: "red",
      gradient: "from-red-500 to-red-600",
    },
    {
      id: "medical-services",
      label: "الخدمات الطبية",
      icon: Stethoscope,
      path: "/medical-services",
      color: "blue",
      gradient: "from-blue-500 to-blue-600",
    },
    {
      id: "dentist-hub",
      label: "مركز الأطباء",
      icon: UserCheck,
      path: "/dentist-hub",
      color: "indigo",
      gradient: "from-indigo-500 to-indigo-600",
    },
    {
      id: "jobs",
      label: "الوظائف",
      icon: Briefcase,
      path: "/jobs",
      color: "green",
      gradient: "from-green-500 to-green-600",
    },
    {
      id: "clinic-admin",
      label: "العيادة",
      icon: Building2,
      path: "/clinic/admin",
      color: "indigo",
      gradient: "from-indigo-500 to-indigo-600",
    },
    {
      id: "community",
      label: "التواصل",
      icon: Users,
      path: "/community",
      color: "violet",
      gradient: "from-violet-500 to-violet-600",
    },
    {
      id: "notifications",
      label: "الإشعارات",
      icon: Bell,
      path: "/notifications",
      color: "orange",
      gradient: "from-orange-500 to-orange-600",
    },
    {
      id: "profile",
      label: "ال��لف",
      icon: User,
      path: "/profile",
      color: "amber",
      gradient: "from-amber-500 to-amber-600",
    },
  ];

  // الاحتفاظ بالترتيب الثاب�� للأيقونات مع إخفاء المعطلة بدلاً من حذفها
  const mainItems = allMainItems.map((item) => {
    let isVisible = true;

    // تحديد الرؤية حسب الأقسام المفعلة
    if (
      item.id === "home" ||
      item.id === "profile" ||
      item.id === "search" ||
      item.id === "notifications"
    ) {
      isVisible = true; // دائماً مرئية
    } else if (item.id === "medical-services") {
      isVisible = true; // الخدمات الطبية دائماً مرئية
    } else if (item.id === "dentist-hub") {
      isVisible = true; // مركز الأطباء دائماً مرئي
    } else if (item.id === "marketplace") {
      isVisible = isFeatureEnabled("marketplace");
    } else if (item.id === "community") {
      isVisible = isFeatureEnabled("community");
    } else if (item.id === "jobs") {
      isVisible = isFeatureEnabled("jobs");
    } else if (item.id === "clinic-admin") {
      isVisible = isFeatureEnabled("clinicAdmin");
    } else if (item.id === "favorites") {
      isVisible = isFeatureEnabled("favorites");
    }

    return { ...item, isVisible };
  });

  // Filtered main items for display (only show these 7 items)
  const displayItems = allMainItems.filter(item =>
    ['home', 'dentist-hub', 'clinic-admin', 'community', 'medical-services', 'jobs', 'profile'].includes(item.id)
  );

  return (
    <>
      {/* الشريط السفلي الرئيسي */}
      <div className="sticky bottom-0 left-0 right-0 z-30 bg-white border-t border-gray-200">
        <div className="max-w-md mx-auto">
          {/* الخلفية الرئيسية */}
          <div
            className={cn("relative bg-white", glowEffect && "animate-pulse")}
          >
            {/* المحتوى الرئيسي */}
            <div className="relative z-10 px-2 py-3">
              <div className="flex items-center justify-around gap-1">
                {displayItems.map((item, index) => {
                  const isActive = activeSection === item.id;
                  let hasNotification =
                    notifications[item.id as keyof typeof notifications] > 0;

                  // استخدام عدد المفضلة الحقيقي
                  if (item.id === "favorites") {
                    hasNotification = favoritesCount > 0;
                  }

                  return (
                    <div key={item.id} className="relative">
                      <Link
                        to={item.path || "/"}
                        className={cn(
                          "relative flex flex-col items-center transition-all duration-300 transform",
                          "hover:scale-105 active:scale-95",
                          isActive && "scale-110",
                        )}
                      >
                        <NavButton
                          item={item}
                          isActive={isActive}
                          isActionButton={false}
                          hasNotification={hasNotification}
                          index={index}
                          notificationCount={
                            notifications[item.id as keyof typeof notifications]
                          }
                          favoritesCount={favoritesCount}
                        />
                      </Link>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// مكون الزر
interface NavButtonProps {
  item: NavItem;
  isActive: boolean;
  isActionButton: boolean;
  hasNotification: boolean;
  index: number;
  notificationCount?: number;
  favoritesCount?: number;
}

const NavButton: React.FC<NavButtonProps> = ({
  item,
  isActive,
  isActionButton,
  hasNotification,
  index,
  notificationCount = 0,
  favoritesCount = 0,
}) => {
  return (
    <>
      {/* الأيقونة */}
      <div
        className={cn(
          "relative transition-all duration-200 w-9 h-9 rounded-lg",
          isActive ? `bg-gradient-to-r ${item.gradient}` : "hover:bg-gray-100",
          "flex items-center justify-center",
        )}
      >
        {/* الأيقونة */}
        <item.icon
          className={cn(
            "transition-all duration-200 w-4 h-4",
            isActive ? "text-white" : "text-gray-600",
          )}
        />

        {/* مؤشر الإشعارات */}
        {hasNotification && (
          <div className="absolute -top-1 -right-1 min-w-[16px] h-4 bg-red-500 rounded-full flex items-center justify-center px-1">
            <span className="text-xs text-white font-bold">
              {item.id === "favorites"
                ? favoritesCount > 99
                  ? "99+"
                  : favoritesCount
                : notificationCount > 99
                  ? "99+"
                  : notificationCount || "•"}
            </span>
          </div>
        )}
      </div>

      {/* النص */}
      <span
        className={cn(
          "text-xs font-medium mt-1 transition-colors duration-200 text-center max-w-[60px] truncate",
          isActive ? "text-blue-600 font-semibold" : "text-gray-600",
        )}
      >
        {item.label}
      </span>
    </>
  );
};
