import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Users,
  Package,
  ShoppingCart,
  TrendingUp,
  Building2,
  Activity,
  Settings,
  BarChart3,
  Globe,
  Shield,
  Database,
  Cpu,
  Zap,
  Bell,
  Eye,
  Plus,
  Filter,
  Search,
  MoreHorizontal,
  Check,
  X,
  AlertTriangle,
  Clock,
  Crown,
  MapPin,
  Phone,
  Mail,
  Calendar,
  FileText,
  DollarSign,
  Target,
  Briefcase,
  MessageCircle,
  Heart,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

// Mock system data
const mockSystemStats = {
  totalUsers: 3542,
  activeDentists: 892,
  activeSuppliers: 156,
  totalClinics: 234,
  totalOrders: 8934,
  monthlyRevenue: 156780000, // IQD
  activeUsers: 1823,
  systemUptime: "99.9%",
  totalProducts: 12456,
  pendingApprovals: 23,
  supportTickets: 12,
  systemAlerts: 3,
};

const mockRecentActivity = [
  {
    id: "1",
    type: "user_registration",
    message: "طبيب أسنان جديد انضم للمنصة",
    user: "د. علي أحمد محمود",
    location: "بغداد",
    time: "منذ 5 دقائق",
    status: "pending_verification",
  },
  {
    id: "2",
    type: "clinic_registration",
    message: "عيادة جديدة طلبت الانضمام",
    user: "عيادة الابتسامة الجميلة",
    location: "البصرة",
    time: "منذ 15 دقيقة",
    status: "pending_approval",
  },
  {
    id: "3",
    type: "supplier_order",
    message: "طلب مورد جديد",
    user: "شركة المستقبل الطبي",
    location: "أربيل",
    time: "منذ 30 دقيقة",
    status: "completed",
  },
  {
    id: "4",
    type: "system_alert",
    message: "تحديث النظام مطلوب",
    user: "نظام المراقبة",
    location: "الخادم الرئيسي",
    time: "منذ ساعة",
    status: "attention_required",
  },
];

const mockRegistrationRequests = [
  {
    id: "REQ001",
    type: "dentist",
    name: "د. سعد محمد علي",
    clinic: "عيادة النور لطب الأسنان",
    location: "الكاظمية، بغداد",
    phone: "+964 770 123 4567",
    email: "dr.saad@email.com",
    specialization: "طب الأسنان التجميلي",
    experience: "8 سنوات",
    documents: 5,
    submittedDate: "2024-01-15",
    status: "pending",
  },
  {
    id: "REQ002",
    type: "supplier",
    name: "شركة التقنيات المتقدمة",
    businessType: "استيراد وتوزيع",
    location: "المنصور، بغداد",
    phone: "+964 780 987 6543",
    email: "info@advanced-tech.com",
    categories: ["أجهزة طبية", "مواد استهلاكية"],
    experience: "12 سنة",
    documents: 8,
    submittedDate: "2024-01-14",
    status: "under_review",
  },
  {
    id: "REQ003",
    type: "clinic",
    name: "مجمع الرعاية الصحية",
    owner: "د. فاطمة أحمد حسن",
    location: "الجادرية، بغداد",
    phone: "+964 771 555 6666",
    email: "info@healthcare-complex.com",
    services: ["طب أسنان عام", "تقويم", "جراحة"],
    staff: 15,
    documents: 12,
    submittedDate: "2024-01-13",
    status: "approved",
  },
];

function SystemAdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedFilter, setSelectedFilter] = useState("all");

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("ar-IQ", {
      style: "currency",
      currency: "IQD",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
      case "pending_verification":
      case "pending_approval":
        return "bg-yellow-100 text-yellow-800";
      case "under_review":
        return "bg-blue-100 text-blue-800";
      case "approved":
      case "completed":
        return "bg-green-100 text-green-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      case "attention_required":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "pending":
        return "معلق";
      case "pending_verification":
        return "في انتظا�� التحقق";
      case "pending_approval":
        return "في انتظار الموافقة";
      case "under_review":
        return "قيد المراجعة";
      case "approved":
        return "مووافق عليه";
      case "completed":
        return "مكتمل";
      case "rejected":
        return "مرفوض";
      case "attention_required":
        return "يتطلب انتباه";
      default:
        return "غير محدد";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "dentist":
        return Users;
      case "supplier":
        return Package;
      case "clinic":
        return Building2;
      case "user_registration":
        return Users;
      case "clinic_registration":
        return Building2;
      case "supplier_order":
        return ShoppingCart;
      case "system_alert":
        return AlertTriangle;
      default:
        return Activity;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "dentist":
        return "طبيب أسنان";
      case "supplier":
        return "مورد";
      case "clinic":
        return "عيادة";
      default:
        return type;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20" dir="rtl">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-pink-600 rounded-xl flex items-center justify-center shadow-lg">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  إدارة النظام
                </h1>
                <p className="text-gray-600">لوحة تحكم المدير العام</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Badge
                variant="secondary"
                className="bg-green-100 text-green-800"
              >
                <Globe className="w-3 h-3 ml-1" />
                النظام متصل
              </Badge>
              <Button size="sm" variant="outline">
                <Settings className="w-4 h-4 ml-1" />
                إعدادات النظام
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="bg-white border-b border-gray-200 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex overflow-x-auto scrollbar-none">
            {[
              { id: "overview", label: "نظرة عامة", icon: BarChart3 },
              { id: "users", label: "المستخدمين", icon: Users },
              { id: "clinics", label: "العيادات", icon: Building2 },
              { id: "suppliers", label: "الموردين", icon: Package },
              { id: "orders", label: "الطلبات", icon: ShoppingCart },
              { id: "approvals", label: "الموافقات", icon: Check },
              { id: "reports", label: "التقارير", icon: FileText },
              { id: "system", label: "النظام", icon: Cpu },
            ].map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={cn(
                    "flex items-center gap-2 px-4 py-4 text-sm font-medium border-b-2 transition-colors whitespace-nowrap",
                    isActive
                      ? "border-red-500 text-red-600"
                      : "border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300",
                  )}
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        {activeTab === "overview" && (
          <>
            {/* System Overview Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <div className="bg-white rounded-xl p-4 border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">إجمالي المستخدمين</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {mockSystemStats.totalUsers.toLocaleString()}
                    </p>
                  </div>
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Users className="w-5 h-5 text-blue-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-4 border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">العيادات المسجلة</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {mockSystemStats.totalClinics}
                    </p>
                  </div>
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <Building2 className="w-5 h-5 text-green-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-4 border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">إيرادات الشهر</p>
                    <p className="text-lg font-bold text-gray-900">
                      {formatCurrency(mockSystemStats.monthlyRevenue)}
                    </p>
                  </div>
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-purple-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-4 border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">طلبات الموافقة</p>
                    <p className="text-2xl font-bold text-red-600">
                      {mockSystemStats.pendingApprovals}
                    </p>
                  </div>
                  <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                    <AlertTriangle className="w-5 h-5 text-red-600" />
                  </div>
                </div>
              </div>
            </div>

            {/* System Health */}
            <div className="bg-white rounded-xl p-6 border border-gray-200 mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                حالة النظام
              </h3>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Check className="w-4 h-4 text-green-600" />
                  </div>
                  <div className="text-sm font-medium text-green-800">
                    الخادم الرئيسي
                  </div>
                  <div className="text-xs text-green-600">متصل</div>
                </div>

                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Database className="w-4 h-4 text-green-600" />
                  </div>
                  <div className="text-sm font-medium text-green-800">
                    قاعدة البيانات
                  </div>
                  <div className="text-xs text-green-600">تعمل بشكل طبيعي</div>
                </div>

                <div className="text-center p-4 bg-yellow-50 rounded-lg">
                  <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Clock className="w-4 h-4 text-yellow-600" />
                  </div>
                  <div className="text-sm font-medium text-yellow-800">
                    النسخ الاحتياطي
                  </div>
                  <div className="text-xs text-yellow-600">جاري التحديث</div>
                </div>

                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Shield className="w-4 h-4 text-green-600" />
                  </div>
                  <div className="text-sm font-medium text-green-800">
                    الأمان
                  </div>
                  <div className="text-xs text-green-600">محمي بالكامل</div>
                </div>
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              {/* Recent Activity */}
              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">
                    النشاطات الأخيرة
                  </h3>
                  <Link
                    to="/admin/activity"
                    className="text-red-600 hover:text-red-700 font-medium text-sm"
                  >
                    عرض الكل
                  </Link>
                </div>
                <div className="space-y-4">
                  {mockRecentActivity.map((activity) => {
                    const Icon = getTypeIcon(activity.type);
                    return (
                      <div
                        key={activity.id}
                        className="flex items-center gap-4"
                      >
                        <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                          <Icon className="w-4 h-4 text-gray-600" />
                        </div>
                        <div className="flex-1">
                          <div className="font-medium text-gray-900">
                            {activity.message}
                          </div>
                          <div className="text-sm text-gray-600">
                            {activity.user} • {activity.location}
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge
                            className={cn(
                              "text-xs",
                              getStatusColor(activity.status),
                            )}
                          >
                            {getStatusText(activity.status)}
                          </Badge>
                          <div className="text-xs text-gray-500 mt-1">
                            {activity.time}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Pending Approvals */}
              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">
                    طلبات الموافقة
                  </h3>
                  <Link
                    to="/admin/approvals"
                    className="text-red-600 hover:text-red-700 font-medium text-sm"
                  >
                    عرض الكل
                  </Link>
                </div>
                <div className="space-y-4">
                  {mockRegistrationRequests.slice(0, 3).map((request) => {
                    const Icon = getTypeIcon(request.type);
                    return (
                      <div
                        key={request.id}
                        className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                            <Icon className="w-4 h-4 text-blue-600" />
                          </div>
                          <div>
                            <div className="font-medium text-gray-900">
                              {request.name}
                            </div>
                            <div className="text-sm text-gray-600">
                              {getTypeLabel(request.type)} • {request.location}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button size="sm" variant="outline">
                            <Eye className="w-3 h-3" />
                          </Button>
                          <Button
                            size="sm"
                            className="bg-green-600 hover:bg-green-700"
                          >
                            <Check className="w-3 h-3" />
                          </Button>
                          <Button size="sm" variant="destructive">
                            <X className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </>
        )}

        {activeTab === "approvals" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">
                طلبات الموافقة
              </h2>
              <div className="flex items-center gap-3">
                <select
                  value={selectedFilter}
                  onChange={(e) => setSelectedFilter(e.target.value)}
                  className="bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm"
                >
                  <option value="all">جميع الطلبات</option>
                  <option value="dentist">أطباء الأسنان</option>
                  <option value="supplier">الموردين</option>
                  <option value="clinic">العيادات</option>
                </select>
                <Button size="sm" variant="outline">
                  <Filter className="w-4 h-4 ml-1" />
                  فلترة
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              {mockRegistrationRequests.map((request) => {
                const Icon = getTypeIcon(request.type);
                return (
                  <div
                    key={request.id}
                    className="bg-white rounded-xl p-6 border border-gray-200"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                          <Icon className="w-6 h-6 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-lg font-semibold text-gray-900">
                              {request.name}
                            </h3>
                            <Badge
                              className={cn(
                                "text-xs",
                                getStatusColor(request.status),
                              )}
                            >
                              {getStatusText(request.status)}
                            </Badge>
                          </div>
                          <div className="space-y-2 text-sm text-gray-600">
                            <div className="flex items-center gap-2">
                              <MapPin className="w-4 h-4" />
                              {request.location}
                            </div>
                            <div className="flex items-center gap-2">
                              <Phone className="w-4 h-4" />
                              {request.phone}
                            </div>
                            <div className="flex items-center gap-2">
                              <Mail className="w-4 h-4" />
                              {request.email}
                            </div>
                            <div className="flex items-center gap-2">
                              <Calendar className="w-4 h-4" />
                              تم التقديم في {request.submittedDate}
                            </div>
                          </div>
                          <div className="mt-4 flex items-center gap-4 text-sm">
                            <span className="bg-gray-100 px-2 py-1 rounded">
                              {getTypeLabel(request.type)}
                            </span>
                            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">
                              {request.documents} مستندات
                            </span>
                            {request.experience && (
                              <span className="bg-green-100 text-green-800 px-2 py-1 rounded">
                                خبرة {request.experience}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="outline">
                          <Eye className="w-4 h-4 ml-1" />
                          مراجعة
                        </Button>
                        <Button
                          size="sm"
                          className="bg-green-600 hover:bg-green-700"
                        >
                          <Check className="w-4 h-4 ml-1" />
                          موافقة
                        </Button>
                        <Button size="sm" variant="destructive">
                          <X className="w-4 h-4 ml-1" />
                          رفض
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default SystemAdminDashboard;
