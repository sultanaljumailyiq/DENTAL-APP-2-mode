import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  MapPin,
  Clock,
  DollarSign,
  Briefcase,
  Filter,
  Star,
  Users,
  Calendar,
  Building,
  Heart,
  MessageCircle,
  Plus,
  Bell,
  User,
  CheckCircle,
  ArrowRight,
  Award,
  TrendingUp,
  Eye,
  Bookmark,
  Send,
  Phone,
  Mail,
  Globe,
  Target,
  Brain,
  Settings,
  Map,
  Navigation,
  Radar,
  ZoomIn,
  ZoomOut,
  Layers,
  Route,
  X,
  ChevronDown,
  Menu,
  Home,
  Grid,
  List,
  Wifi,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useI18n } from "@/lib/i18n";
import { useIsMobile } from "@/hooks/use-mobile";
import InteractiveJobsMap from "@/components/InteractiveJobsMap";

// بيانات الوظائف المبسطة للعرض السريع
const jobListings = [
  {
    id: 1,
    title: "طبيب أسنان أول",
    company: "عيادة سمايل تك",
    location: "بغداد، العراق",
    coordinates: { lat: 33.3152, lng: 44.3661 },
    type: "دوام كامل",
    experience: "5+ سنوات",
    salary: "5,000 - 7,000 د.ع",
    posted: "منذ يومين",
    applicants: 42,
    featured: true,
    remote: false,
    urgent: false,
    logo: "/placeholder.svg",
    company_rating: 4.8,
    distance: "2.3 كم",
  },
  {
    id: 2,
    title: "طبيب أسنان أطفال",
    company: "عيادة الأطفال السعداء",
    location: "البصرة، العراق",
    coordinates: { lat: 30.5085, lng: 47.7804 },
    type: "دوام جزئي",
    experience: "3+ سنوات",
    salary: "3,500 - 4,500 د.ع",
    posted: "منذ أسبوع",
    applicants: 28,
    featured: false,
    remote: false,
    urgent: true,
    logo: "/placeholder.svg",
    company_rating: 4.6,
    distance: "456 كم",
  },
  {
    id: 3,
    title: "أخصائي تقويم أسنان",
    company: "شركة التقويم الرقمي",
    location: "عن بُعد",
    coordinates: null,
    type: "عقد مؤقت",
    experience: "7+ سنوات",
    salary: "50 - 75 د.ع/ساعة",
    posted: "منذ 3 أيام",
    applicants: 67,
    featured: true,
    remote: true,
    urgent: false,
    logo: "/placeholder.svg",
    company_rating: 4.9,
    distance: "عن بُعد",
  },
  {
    id: 4,
    title: "طبيب أسنان عام",
    company: "عيادة النور الطبية",
    location: "أربيل، العراق",
    coordinates: { lat: 36.19, lng: 44.0092 },
    type: "دوام كامل",
    experience: "2+ سنوات",
    salary: "4,000 - 5,500 د.ع",
    posted: "منذ 5 أيام",
    applicants: 31,
    featured: false,
    remote: false,
    urgent: false,
    logo: "/placeholder.svg",
    company_rating: 4.5,
    distance: "387 كم",
  },
  {
    id: 5,
    title: "جراح فم وأسنان",
    company: "مستشفى الرافدين",
    location: "الموصل، العراق",
    coordinates: { lat: 36.335, lng: 43.1189 },
    type: "دوام كامل",
    experience: "8+ سنوات",
    salary: "6,000 - 8,500 د.ع",
    posted: "منذ أسبوع",
    applicants: 19,
    featured: true,
    remote: false,
    urgent: true,
    logo: "/placeholder.svg",
    company_rating: 4.7,
    distance: "420 كم",
  },
  {
    id: 6,
    title: "استشاري تجميل أسنان",
    company: "عيادة الجمال الذهبي",
    location: "بغداد، العراق",
    coordinates: { lat: 33.3152, lng: 44.3661 },
    type: "دوام جزئي",
    experience: "10+ سنوات",
    salary: "7,000 - 10,000 د.ع",
    posted: "منذ 4 أيام",
    applicants: 54,
    featured: true,
    remote: false,
    urgent: false,
    logo: "/placeholder.svg",
    company_rating: 4.9,
    distance: "8.2 كم",
  },
  {
    id: 7,
    title: "مساعد طبيب أسنان",
    company: "عيادة الدكتور سالم",
    location: "النجف، العراق",
    coordinates: { lat: 32.028, lng: 44.3419 },
    type: "دوام كامل",
    experience: "1-2 سنوات",
    salary: "1,500 - 2,500 د.ع",
    posted: "منذ 6 أيام",
    applicants: 15,
    featured: false,
    remote: false,
    urgent: false,
    logo: "/placeholder.svg",
    company_rating: 4.3,
    distance: "180 كم",
  },
  {
    id: 8,
    title: "فني مختبر أسنان",
    company: "مختبر الابتسامة",
    location: "كربلاء، العراق",
    coordinates: { lat: 32.616, lng: 44.0244 },
    type: "دوام كامل",
    experience: "3+ سنوات",
    salary: "2,500 - 3,500 د.ع",
    posted: "منذ أسبوع",
    applicants: 22,
    featured: false,
    remote: false,
    urgent: false,
    logo: "/placeholder.svg",
    company_rating: 4.4,
    distance: "100 كم",
  },
];

// أقسام التوظيف
const jobSections = [
  { id: "overview", label: "نظرة عامة", icon: Home },
  { id: "browse", label: "تصفح الوظائف", icon: Search },
  { id: "freelance", label: "العمل الحر", icon: Clock },
  { id: "professionals", label: "المحترفون", icon: Users },
  { id: "my-jobs", label: "طلباتي", icon: Briefcase },
];

// فلاتر سريعة
const quickFilters = [
  { id: "all", label: "الكل", count: jobListings.length },
  {
    id: "featured",
    label: "مميزة",
    count: jobListings.filter((job) => job.featured).length,
  },
  {
    id: "urgent",
    label: "عاجلة",
    count: jobListings.filter((job) => job.urgent).length,
  },
  {
    id: "remote",
    label: "عن بُعد",
    count: jobListings.filter((job) => job.remote).length,
  },
  {
    id: "fulltime",
    label: "دوام كامل",
    count: jobListings.filter((job) => job.type === "دوام كامل").length,
  },
];

export default function JobsNew() {
  const { language } = useI18n();
  const isMobile = useIsMobile();
  const [activeSection, setActiveSection] = useState("overview");
  const [activeFilter, setActiveFilter] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedJob, setSelectedJob] = useState<any>(null);
  const [showMap, setShowMap] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [showJobDetails, setShowJobDetails] = useState(false);

  // فلترة الوظائف
  const filteredJobs = jobListings
    .filter((job) => {
      if (activeFilter === "featured") return job.featured;
      if (activeFilter === "urgent") return job.urgent;
      if (activeFilter === "remote") return job.remote;
      if (activeFilter === "fulltime") return job.type === "دوام كامل";
      return true;
    })
    .filter(
      (job) =>
        searchQuery === "" ||
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.company.toLowerCase().includes(searchQuery.toLowerCase()),
    );

  // بطاقة وظيفة مضغوطة
  const CompactJobCard = ({ job }: { job: any }) => (
    <div
      className={cn(
        "bg-white rounded-lg border transition-all duration-200 cursor-pointer hover:shadow-md p-3",
        job.featured && "ring-1 ring-purple-200 bg-purple-50/30",
        selectedJob?.id === job.id && "ring-2 ring-blue-500 bg-blue-50/30",
      )}
      onClick={() => {
        setSelectedJob(job);
        setShowJobDetails(true);
      }}
    >
      {/* رأس البطاقة */}
      <div className="flex items-start gap-3 mb-2">
        <img
          src={job.logo}
          alt={job.company}
          className="w-8 h-8 rounded-lg object-cover flex-shrink-0"
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-sm font-semibold text-gray-900 line-clamp-2 leading-tight">
              {job.title}
            </h3>
            <div className="flex gap-1 flex-shrink-0">
              {job.featured && (
                <span className="bg-purple-100 text-purple-600 text-xs px-1.5 py-0.5 rounded-full">
                  ⭐
                </span>
              )}
              {job.urgent && (
                <span className="bg-red-100 text-red-600 text-xs px-1.5 py-0.5 rounded-full">
                  🔥
                </span>
              )}
              {job.remote && (
                <span className="bg-blue-100 text-blue-600 text-xs px-1.5 py-0.5 rounded-full">
                  <Wifi className="w-3 h-3" />
                </span>
              )}
            </div>
          </div>
          <p className="text-xs text-gray-600 truncate">{job.company}</p>
        </div>
      </div>

      {/* معلومات مضغوطة */}
      <div className="space-y-1">
        <div className="flex items-center gap-1 text-xs text-gray-600">
          <MapPin className="w-3 h-3 flex-shrink-0" />
          <span className="truncate">{job.location}</span>
        </div>

        <div className="flex items-center gap-1 text-xs text-gray-600">
          <DollarSign className="w-3 h-3 flex-shrink-0" />
          <span className="truncate">{job.salary}</span>
        </div>

        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-1 text-gray-500">
            <Clock className="w-3 h-3" />
            <span>{job.posted}</span>
          </div>
          <div className="flex items-center gap-1">
            <Star className="w-3 h-3 text-yellow-400 fill-current" />
            <span className="font-medium">{job.company_rating}</span>
          </div>
        </div>
      </div>
    </div>
  );

  // صفحة النظرة العامة
  const OverviewSection = () => (
    <div className="space-y-4">
      {/* إحصائيات سريعة */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-3 text-center">
          <div className="text-xl font-bold text-blue-600">
            {jobListings.length}
          </div>
          <div className="text-xs text-blue-700">وظائف متاحة</div>
        </div>
        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-3 text-center">
          <div className="text-xl font-bold text-green-600">
            {jobListings.filter((job) => job.featured).length}
          </div>
          <div className="text-xs text-green-700">وظائف مميزة</div>
        </div>
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-3 text-center">
          <div className="text-xl font-bold text-purple-600">
            {jobListings.filter((job) => job.remote).length}
          </div>
          <div className="text-xs text-purple-700">عمل عن بُعد</div>
        </div>
        <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg p-3 text-center">
          <div className="text-xl font-bold text-orange-600">
            {jobListings.filter((job) => job.urgent).length}
          </div>
          <div className="text-xs text-orange-700">وظائف عاجلة</div>
        </div>
      </div>

      {/* خريطة تفاعلية */}
      {showMap && (
        <div className="bg-white rounded-lg border">
          <div className="p-3 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-semibold text-gray-900 flex items-center gap-2">
                <Map className="w-4 h-4" />
                خريطة العيادات والوظائف
              </h2>
              <button
                onClick={() => setShowMap(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="p-3">
            <InteractiveJobsMap
              jobs={jobListings}
              selectedJob={selectedJob}
              onJobSelect={setSelectedJob}
              onJobApply={(jobId) => {
                const job = jobListings.find((j) => j.id === jobId);
                if (job) {
                  setSelectedJob(job);
                  setShowJobDetails(true);
                }
              }}
            />
          </div>
        </div>
      )}

      {/* أحدث الوظائف */}
      <div className="bg-white rounded-lg border">
        <div className="p-3 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold text-gray-900">
              أحدث الوظائف
            </h2>
            <button
              onClick={() => setActiveSection("browse")}
              className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center gap-1"
            >
              عرض الكل
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>

        <div className="p-3">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
            {jobListings.slice(0, 10).map((job) => (
              <CompactJobCard key={job.id} job={job} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  // صفحة تصفح الوظائف
  const BrowseJobsSection = () => (
    <div className="space-y-4">
      {/* البحث والفلاتر */}
      <div className="bg-white rounded-lg border p-3">
        <div className="space-y-3">
          {/* شريط البحث */}
          <div className="relative">
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="ابحث عن وظيفة أو شركة..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pr-10 pl-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            />
          </div>

          {/* فلاتر أفقية */}
          <div className="flex items-center justify-between">
            <div className="flex gap-2 overflow-x-auto pb-1">
              {quickFilters.map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setActiveFilter(filter.id)}
                  className={cn(
                    "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap transition-colors",
                    activeFilter === filter.id
                      ? "bg-blue-500 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200",
                  )}
                >
                  {filter.label}
                  <span
                    className={cn(
                      "px-1.5 py-0.5 rounded-full text-xs",
                      activeFilter === filter.id
                        ? "bg-white/20 text-white"
                        : "bg-white text-gray-600",
                    )}
                  >
                    {filter.count}
                  </span>
                </button>
              ))}
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => setViewMode("grid")}
                className={cn(
                  "p-1.5 rounded transition-colors",
                  viewMode === "grid"
                    ? "bg-blue-100 text-blue-600"
                    : "text-gray-400",
                )}
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={cn(
                  "p-1.5 rounded transition-colors",
                  viewMode === "list"
                    ? "bg-blue-100 text-blue-600"
                    : "text-gray-400",
                )}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* النتائج */}
      <div className="bg-white rounded-lg border p-3">
        <div className="mb-3">
          <p className="text-sm text-gray-600">
            <span className="font-semibold text-gray-900">
              {filteredJobs.length}
            </span>{" "}
            وظيفة متاحة
          </p>
        </div>

        <div
          className={cn(
            viewMode === "grid"
              ? "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3"
              : "space-y-3",
          )}
        >
          {filteredJobs.map((job) => (
            <CompactJobCard key={job.id} job={job} />
          ))}
        </div>
      </div>
    </div>
  );

  // عرض المحتوى حسب القسم
  const renderContent = () => {
    switch (activeSection) {
      case "overview":
        return <OverviewSection />;
      case "browse":
        return <BrowseJobsSection />;
      default:
        return (
          <div className="bg-white rounded-lg border p-8 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Briefcase className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              قيد التطوير
            </h3>
            <p className="text-gray-600">
              هذا القسم قيد التطوير وسيكون متاحاً قريباً
            </p>
          </div>
        );
    }
  };

  return (
    <div
      className="min-h-screen bg-gray-50"
      dir={language === "ar" ? "rtl" : "ltr"}
    >
      {/* شريط علوي ثابت */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white">
                <Briefcase className="w-4 h-4" />
              </div>
              <div>
                <h1 className="text-base font-bold text-gray-900">
                  منصة التوظيف
                </h1>
                <p className="text-xs text-gray-500">وظائف طب الأسنان</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button className="p-2 text-gray-600 hover:text-blue-600 rounded-lg hover:bg-blue-50 transition-colors">
                <Search className="w-4 h-4" />
              </button>
              <button className="p-2 text-gray-600 hover:text-blue-600 rounded-lg hover:bg-blue-50 transition-colors">
                <Bell className="w-4 h-4" />
              </button>
              <button className="p-2 text-gray-600 hover:text-blue-600 rounded-lg hover:bg-blue-50 transition-colors">
                <User className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* المحتوى الرئيسي */}
      <div className="pt-14 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* أقسام التوظيف */}
          <div className="bg-white rounded-lg border mb-4 overflow-hidden">
            <div className="flex overflow-x-auto scrollbar-hide">
              {jobSections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={cn(
                    "flex items-center gap-2 px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors min-w-max",
                    activeSection === section.id
                      ? "border-blue-500 text-blue-600 bg-blue-50"
                      : "border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-50",
                  )}
                >
                  <section.icon className="w-4 h-4" />
                  {section.label}
                </button>
              ))}
            </div>
          </div>

          {/* محتوى القسم */}
          {renderContent()}
        </div>
      </div>

      {/* شريط سفلي ثابت */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200 shadow-lg">
        <div className="max-w-md mx-auto">
          <div className="flex items-center justify-around px-2 py-2">
            <Link
              to="/"
              className="flex flex-col items-center p-2 text-gray-600 hover:text-blue-600"
            >
              <Home className="w-5 h-5" />
              <span className="text-xs mt-1">الرئيسية</span>
            </Link>
            <button className="flex flex-col items-center p-2 text-blue-600">
              <Briefcase className="w-5 h-5" />
              <span className="text-xs mt-1">الوظائف</span>
            </button>
            <button className="flex flex-col items-center p-2 text-gray-600 hover:text-blue-600">
              <Bell className="w-5 h-5" />
              <span className="text-xs mt-1">الإشعارات</span>
            </button>
            <button className="flex flex-col items-center p-2 text-gray-600 hover:text-blue-600">
              <Heart className="w-5 h-5" />
              <span className="text-xs mt-1">المفضلة</span>
            </button>
            <button className="flex flex-col items-center p-2 text-gray-600 hover:text-blue-600">
              <User className="w-5 h-5" />
              <span className="text-xs mt-1">الملف</span>
            </button>
          </div>
        </div>
      </div>

      {/* تفاصيل الوظيفة */}
      {showJobDetails && selectedJob && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end justify-center p-4 lg:items-center">
          <div className="bg-white rounded-t-3xl lg:rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-4 rounded-t-3xl lg:rounded-t-2xl">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <img
                    src={selectedJob.logo}
                    alt={selectedJob.company}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div>
                    <h2 className="text-lg font-bold text-gray-900">
                      {selectedJob.title}
                    </h2>
                    <p className="text-gray-700">{selectedJob.company}</p>
                    <div className="flex items-center gap-3 text-sm text-gray-600 mt-1">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {selectedJob.location}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {selectedJob.type}
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setShowJobDetails(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="p-4 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-blue-50 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <DollarSign className="w-4 h-4 text-blue-600" />
                    <span className="text-sm font-medium text-blue-900">
                      الراتب
                    </span>
                  </div>
                  <p className="text-base font-bold text-blue-900">
                    {selectedJob.salary}
                  </p>
                </div>

                <div className="bg-green-50 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <Users className="w-4 h-4 text-green-600" />
                    <span className="text-sm font-medium text-green-900">
                      المتقدمون
                    </span>
                  </div>
                  <p className="text-base font-bold text-green-900">
                    {selectedJob.applicants} شخص
                  </p>
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 flex items-center justify-center gap-2">
                  <ArrowRight className="w-4 h-4" />
                  تقدم للوظيفة
                </button>

                <button className="px-4 py-3 border border-gray-200 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 transition-colors">
                  <Heart className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
