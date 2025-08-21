import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Search,
  Bell,
  User,
  Settings,
  Package,
  TrendingUp,
  ShoppingCart,
  Heart,
  Clock,
  Star,
  Users,
  BarChart3,
  Calendar,
  MapPin,
  Phone,
  Mail,
  Edit,
  Camera,
  Award,
  Shield,
  Plus,
  Filter,
  Download,
  Eye,
  Menu,
  Home,
  LogOut,
  ArrowRight,
  MessageCircle,
  Briefcase,
  Stethoscope,
  FileText,
  Store,
  Building,
  UserPlus,
  Activity,
  CreditCard,
  Truck,
  GitBranch,
  PieChart,
  Target,
  Zap,
  Crown,
} from "lucide-react";
import { cn } from "@/lib/utils";
import UltraModernBottomNav from "@/components/UltraModernBottomNav";
import { useSystemSettings } from "@/contexts/SystemSettingsContext";

// User roles
export type UserRole = "dentist" | "supplier" | "admin";

// Mock user data for different types
const mockUsers = {
  dentist: {
    id: "1",
    type: "dentist",
    name: "د. أحمد محمد",
    email: "ahmed.mohammed@email.com",
    phone: "+964 770 123 4567",
    avatar:
      "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=200&h=200&fit=crop",
    clinicName: "عيادة النجمة لطب الأسنان",
    specialization: "طب الأسنان التجميلي",
    location: "بغداد، العراق",
    joinDate: "2023-03-15",
    verification: "verified",
    stats: {
      totalOrders: 145,
      totalSpent: "IQD 2,450,000",
      savedAmount: "IQD 485,000",
      favoriteProducts: 23,
    },
  },
  supplier: {
    id: "2",
    type: "supplier",
    name: "شركة الرائد للمستلزمات الطبية",
    email: "info@alraed-medical.com",
    phone: "+964 780 987 6543",
    avatar:
      "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=200&h=200&fit=crop",
    companyName: "شركة الرائد للمستلزمات الطبية",
    businessType: "تجارة الجملة",
    location: "الكرخ، بغداد",
    joinDate: "2022-08-10",
    verification: "verified",
    stats: {
      totalProducts: 234,
      totalSales: "IQD 15,670,000",
      activeOrders: 12,
      customerRating: 4.8,
    },
  },
};

export default function DentistHub() {
  const [userType, setUserType] = useState<UserRole>("dentist");
  const [activeTab, setActiveTab] = useState("overview");
  const navigate = useNavigate();

  const { isFeatureEnabled } = useSystemSettings();
  const currentUser = mockUsers[userType];

  // Quick shortcuts for different user types
  const getQuickShortcuts = () => {
    const shortcuts = {
      dentist: [
        {
          icon: Package,
          label: "المتجر",
          description: "المنتجات الطبية",
          href: "/dental-supply",
          color: "purple",
        },
        {
          icon: MessageCircle,
          label: "المجتمع",
          description: "التواصل المهني",
          href: "/community",
          color: "blue",
        },
        {
          icon: Briefcase,
          label: "التوظيف",
          description: "الفرص المهنية",
          href: "/jobs",
          color: "green",
        },
        {
          icon: Stethoscope,
          label: "إدارة العيادة",
          description: "لوحة تحكم العيادة الشاملة",
          href: "/admin",
          color: "cyan",
        },
        {
          icon: FileText,
          label: "الخدمات الطبية",
          description: "الاستشارات والخدمات",
          href: "/medical-services",
          color: "indigo",
        },
        {
          icon: Heart,
          label: "المفضلة",
          description: "منتجاتي المفضلة",
          href: "/favorites",
          color: "red",
        },
        {
          icon: Building,
          label: "إدارة العيادات",
          description: "إعدادات العيادات",
          href: "/dentist-hub/clinics",
          color: "orange",
        },
        {
          icon: BarChart3,
          label: "التقارير",
          description: "إحصائيات شاملة",
          href: "/dentist-hub/reports",
          color: "teal",
        },
      ],
      supplier: [
        {
          icon: Store,
          label: "متجري",
          description: "إدارة المتجر",
          href: "/supplier/store",
          color: "green",
        },
        {
          icon: ShoppingCart,
          label: "الطلبات",
          description: "طلبات العملاء",
          href: "/supplier/orders",
          color: "blue",
        },
        {
          icon: Users,
          label: "العملاء",
          description: "إدارة العملاء",
          href: "/supplier/customers",
          color: "cyan",
        },
        {
          icon: BarChart3,
          label: "المبيعات",
          description: "تقارير المبيعات",
          href: "/supplier/analytics",
          color: "orange",
        },
        {
          icon: MessageCircle,
          label: "المجتمع",
          description: "التواصل التجاري",
          href: "/community",
          color: "indigo",
        },
        {
          icon: Truck,
          label: "الشحن",
          description: "إدارة الشحنات",
          href: "/supplier/shipping",
          color: "yellow",
        },
        {
          icon: CreditCard,
          label: "المدفوعات",
          description: "المعاملات المالية",
          href: "/supplier/payments",
          color: "emerald",
        },
        {
          icon: Package,
          label: "المنتجات",
          description: "إدارة منتجاتي",
          href: "/supplier/products",
          color: "purple",
        },
      ],
    };
    return shortcuts[userType] || [];
  };

  const QuickShortcuts = () => {
    const shortcuts = getQuickShortcuts();

    const getColorClasses = (color: string) => {
      const colorMap = {
        purple:
          "bg-purple-50 hover:bg-purple-100 text-purple-600 border-purple-200",
        blue: "bg-blue-50 hover:bg-blue-100 text-blue-600 border-blue-200",
        green: "bg-green-50 hover:bg-green-100 text-green-600 border-green-200",
        cyan: "bg-cyan-50 hover:bg-cyan-100 text-cyan-600 border-cyan-200",
        indigo:
          "bg-indigo-50 hover:bg-indigo-100 text-indigo-600 border-indigo-200",
        orange:
          "bg-orange-50 hover:bg-orange-100 text-orange-600 border-orange-200",
        red: "bg-red-50 hover:bg-red-100 text-red-600 border-red-200",
        teal: "bg-teal-50 hover:bg-teal-100 text-teal-600 border-teal-200",
        yellow:
          "bg-yellow-50 hover:bg-yellow-100 text-yellow-600 border-yellow-200",
        emerald:
          "bg-emerald-50 hover:bg-emerald-100 text-emerald-600 border-emerald-200",
      };
      return colorMap[color as keyof typeof colorMap] || colorMap.purple;
    };

    return (
      <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <Zap className="w-5 h-5 text-blue-500" />
              مركز الأطباء
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              الوصول السريع لجميع أقسام وخدمات المنصة
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-lg">
              {shortcuts.length} قسم متاح
            </div>
            {currentUser.verification === "verified" && (
              <div className="flex items-center gap-1 bg-green-50 text-green-700 px-2 py-1 rounded-lg">
                <Crown className="w-3 h-3" />
                <span className="text-xs font-medium">محقق</span>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-8 gap-3">
          {shortcuts.map((shortcut, index) => {
            const Icon = shortcut.icon;
            return (
              <Link
                key={index}
                to={shortcut.href}
                className={cn(
                  "group flex flex-col items-center gap-2 p-3 rounded-xl border transition-all duration-200 hover:shadow-sm hover:scale-105",
                  getColorClasses(shortcut.color),
                )}
                title={shortcut.description}
              >
                <Icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <div className="text-center">
                  <div className="text-xs font-medium leading-tight">
                    {shortcut.label}
                  </div>
                  <div className="text-xs opacity-75 mt-0.5 hidden lg:block">
                    {shortcut.description}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    );
  };

  // اختصارات العيادة السريعة
  const ClinicShortcuts = () => {
    const clinicShortcuts = [
      {
        icon: Home,
        label: "لوحة التحكم",
        description: "النظرة العامة",
        href: "/admin",
        color: "blue",
      },
      {
        icon: Calendar,
        label: "الحجوزات",
        description: "إدارة المواعيد",
        href: "/admin/reservations",
        color: "green",
      },
      {
        icon: Users,
        label: "المرضى",
        description: "ملفات المرضى",
        href: "/admin/patients",
        color: "purple",
      },
      {
        icon: Stethoscope,
        label: "العلاجات",
        description: "إدارة العلاجات",
        href: "/admin/treatments",
        color: "pink",
      },
      {
        icon: UserPlus,
        label: "الطاقم",
        description: "إدارة الموظفين",
        href: "/admin/staff",
        color: "orange",
      },
      {
        icon: CreditCard,
        label: "الحسابات",
        description: "المالية والحسابات",
        href: "/admin/accounts",
        color: "cyan",
      },
      {
        icon: TrendingUp,
        label: "المبيعات",
        description: "تقارير المبيعات",
        href: "/admin/sales",
        color: "emerald",
      },
      {
        icon: Package,
        label: "المخزون",
        description: "إدارة المواد",
        href: "/admin/stocks",
        color: "teal",
      },
    ];

    const getColorClasses = (color: string) => {
      const colorMap = {
        blue: "bg-blue-50 hover:bg-blue-100 text-blue-600 border-blue-200",
        green: "bg-green-50 hover:bg-green-100 text-green-600 border-green-200",
        purple:
          "bg-purple-50 hover:bg-purple-100 text-purple-600 border-purple-200",
        pink: "bg-pink-50 hover:bg-pink-100 text-pink-600 border-pink-200",
        orange:
          "bg-orange-50 hover:bg-orange-100 text-orange-600 border-orange-200",
        cyan: "bg-cyan-50 hover:bg-cyan-100 text-cyan-600 border-cyan-200",
        emerald:
          "bg-emerald-50 hover:bg-emerald-100 text-emerald-600 border-emerald-200",
        teal: "bg-teal-50 hover:bg-teal-100 text-teal-600 border-teal-200",
      };
      return colorMap[color as keyof typeof colorMap] || colorMap.blue;
    };

    return (
      <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <Building className="w-5 h-5 text-purple-500" />
              اختصارات العيادة
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              وصول سريع لجميع أقسام إدارة العيادة
            </p>
          </div>
          <Link
            to="/admin"
            className="bg-purple-50 hover:bg-purple-100 text-purple-600 px-4 py-2 rounded-xl font-medium text-sm transition-colors"
          >
            فتح لوحة التحكم
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
          {clinicShortcuts.map((shortcut, index) => {
            const Icon = shortcut.icon;
            return (
              <Link
                key={index}
                to={shortcut.href}
                className={cn(
                  "group flex flex-col items-center gap-2 p-3 rounded-xl border transition-all duration-200 hover:shadow-sm hover:scale-105",
                  getColorClasses(shortcut.color),
                )}
                title={shortcut.description}
              >
                <Icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <div className="text-center">
                  <div className="text-xs font-medium leading-tight">
                    {shortcut.label}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    );
  };

  const DentistDashboard = () => (
    <div className="space-y-6">
      <QuickShortcuts />
      <ClinicShortcuts />
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl p-6 border border-gray-100">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center">
              <ShoppingCart className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">
                {currentUser.stats.totalOrders}
              </div>
              <div className="text-sm text-gray-600">إجمالي الطلبات</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-gray-100">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">
                {currentUser.stats.totalSpent}
              </div>
              <div className="text-sm text-gray-600">إجمالي المشتريات</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-gray-100">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-purple-100 rounded-2xl flex items-center justify-center">
              <Award className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">
                {currentUser.stats.savedAmount}
              </div>
              <div className="text-sm text-gray-600">المبلغ المُوفر</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-gray-100">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-red-100 rounded-2xl flex items-center justify-center">
              <Heart className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">
                {currentUser.stats.favoriteProducts}
              </div>
              <div className="text-sm text-gray-600">المنتجات المفضلة</div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-900">النشاطات الأخيرة</h3>
          <Link
            to="/clinic/reports"
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            عرض الكل
          </Link>
        </div>
        <div className="space-y-4">
          {[
            {
              type: "order",
              action: "طلب جديد من المتجر",
              details: "3 منتجات • IQD 125,000",
              time: "منذ ساعتين",
              icon: ShoppingCart,
              color: "blue",
            },
            {
              type: "clinic",
              action: "موعد جديد في العيادة",
              details: "مريض جديد • فحص روتيني",
              time: "منذ 4 ساعات",
              icon: Calendar,
              color: "green",
            },
            {
              type: "community",
              action: "مشاركة في المجتمع",
              details: "رد على سؤال طبي",
              time: "أمس",
              icon: MessageCircle,
              color: "purple",
            },
          ].map((activity, index) => {
            const Icon = activity.icon;
            return (
              <div
                key={index}
                className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl"
              >
                <div
                  className={`w-10 h-10 bg-${activity.color}-100 rounded-2xl flex items-center justify-center`}
                >
                  <Icon className={`w-5 h-5 text-${activity.color}-600`} />
                </div>
                <div className="flex-1">
                  <div className="font-medium text-gray-900">
                    {activity.action}
                  </div>
                  <div className="text-sm text-gray-600">
                    {activity.details}
                  </div>
                </div>
                <div className="text-sm text-gray-500">{activity.time}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );

  const SupplierDashboard = () => (
    <div className="space-y-6">
      <QuickShortcuts />
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl p-6 border border-gray-100">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center">
              <Package className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">
                {currentUser.stats.totalProducts}
              </div>
              <div className="text-sm text-gray-600">إجمالي المنتجات</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-gray-100">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">
                {currentUser.stats.totalSales}
              </div>
              <div className="text-sm text-gray-600">إجمالي المبيعات</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-gray-100">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-orange-100 rounded-2xl flex items-center justify-center">
              <Clock className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">
                {currentUser.stats.activeOrders}
              </div>
              <div className="text-sm text-gray-600">الط��بات النشطة</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-gray-100">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-yellow-100 rounded-2xl flex items-center justify-center">
              <Star className="w-6 h-6 text-yellow-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">
                {currentUser.stats.customerRating}
              </div>
              <div className="text-sm text-gray-600">تقييم العملاء</div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-900">الطلبات الجديدة</h3>
          <Link
            to="/supplier/orders"
            className="text-purple-600 hover:text-purple-700 font-medium"
          >
            عرض الكل
          </Link>
        </div>
        <div className="space-y-4">
          {[1, 2, 3].map((order) => (
            <div
              key={order}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center">
                  <ShoppingCart className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <div className="font-medium text-gray-900">
                    طلب #{2000 + order}
                  </div>
                  <div className="text-sm text-gray-600">
                    د. محمد أحمد • 5 منتجات
                  </div>
                </div>
              </div>
              <div className="text-left">
                <div className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm font-medium">
                  قيد المعالجة
                </div>
                <div className="text-sm text-gray-600 mt-1">IQD 85,000</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 with-floating-nav"
      dir="rtl"
    >
      {/* Fixed Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200/50 shadow-sm">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Stethoscope className="w-5 h-5 text-white" />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  مركز الأطباء
                </h1>
                <p className="text-xs text-gray-500">
                  {userType === "dentist" ? "طبيب أسنان" : "مورد"}
                </p>
              </div>
            </div>

            {/* User Type Switcher */}
            <div className="flex items-center gap-4">
              <select
                value={userType}
                onChange={(e) => setUserType(e.target.value as UserRole)}
                className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 text-sm"
              >
                <option value="dentist">طبيب أسنان</option>
                <option value="supplier">مورد</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-colors">
                <Bell className="w-5 h-5" />
              </button>
              <div className="flex items-center gap-3 bg-gray-50 rounded-2xl p-2">
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="w-8 h-8 rounded-xl object-cover"
                />
                <div className="hidden sm:block text-sm">
                  <div className="font-medium text-gray-900">
                    {currentUser.name}
                  </div>
                  <div className="text-gray-600">
                    {userType === "dentist" ? "طبيب أسنان" : "مورد"}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="pt-16">
        <main className="p-4 sm:p-6 lg:p-8">
          {/* Content */}
          {userType === "dentist" && <DentistDashboard />}
          {userType === "supplier" && <SupplierDashboard />}
        </main>
      </div>

      {/* Bottom Navigation */}
      <UltraModernBottomNav />
    </div>
  );
}
