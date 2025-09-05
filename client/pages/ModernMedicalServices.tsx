import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Stethoscope,
  MapPin,
  Brain,
  BookOpen,
  Phone,
  ArrowRight,
  Clock,
  Star,
  Users,
  Building,
  Activity,
  Target,
  Sparkles,
  CheckCircle,
  Globe,
  Shield,
  HeartHandshake,
  Zap,
  Search,
  FileText,
  Camera,
  MessageCircle,
  Award,
  Navigation,
  Heart,
  Ambulance,
  AlertCircle,
  Map,
  BookOpenCheck,
  GraduationCap,
  Info,
  ExternalLink,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  CompactHeroSection,
  CompactCategoryNav,
} from "@/components/MobileOptimizedHeader";
import MobileDentalWidgets from "@/components/MobileDentalWidgets";
import ComprehensiveNotificationCenter from "@/components/ComprehensiveNotificationCenter";
import CompactAIAssistant, {
  FloatingAIButton,
  useAIAssistant,
} from "@/components/CompactAIAssistant";
import CompactInteractiveMap from "@/components/CompactInteractiveMap";

interface ServiceCard {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  path: string;
  color: string;
  gradient: string;
  features: string[];
  isExternal?: boolean;
}

interface MedicalCategory {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  color: string;
  gradient: string;
  mainAction: {
    title: string;
    path: string;
    icon: React.ComponentType<any>;
  };
  cards: ServiceCard[];
}

const medicalCategories: MedicalCategory[] = [
  {
    id: "directory",
    title: "الدليل الطبي: العيادات والمستشفيات القريبة",
    description:
      "اعثر على أقرب العيادات والمستشفيات عبر خريطة موحدة وبطاقات مصغرة موحدة",
    icon: MapPin,
    color: "teal",
    gradient: "from-teal-500 to-green-500",
    mainAction: {
      title: "البحث في الخريطة",
      path: "#directory-map",
      icon: Map,
    },
    cards: [
      {
        id: "interactive-map",
        title: "الخريطة التفاعلية",
        description: "اعثر على العيادات والمستشفيات القريبة منك",
        icon: Map,
        path: "#directory-map",
        color: "teal",
        gradient: "from-teal-500 to-green-500",
        features: ["خريطة تفاعلية", "بحث بالموقع", "تفاصيل شاملة"],
      },
      {
        id: "emergency-call",
        title: "خط ��لطوارئ المجاني",
        description: "اتصل الآن للحصول ��لى مساعدة فورية",
        icon: Phone,
        path: "tel:911",
        color: "red",
        gradient: "from-red-500 to-red-600",
        features: ["متاح 24/7", "استجابة ف��رية", "مجاني"],
        isExternal: true,
      },
      {
        id: "emergency-guide",
        title: "دليل ال��سعافات الأولية",
        description: "خطوات مهمة للتعامل مع الحالات الطارئة",
        icon: AlertCircle,
        path: "/articles/#first-aid",
        color: "orange",
        gradient: "from-orange-500 to-red-500",
        features: ["خطوات واضحة", "صور توضيحي��", "سهل التطبيق"],
      },
      {
        id: "emergency-locations",
        title: "أقرب مستشفى للطوارئ",
        description: "العثور على أقرب مستشفيات الطوارئ",
        icon: Navigation,
        path: "/articles/#first-aid",
        color: "red",
        gradient: "from-red-600 to-orange-600",
        features: ["GPS دقيق", "معلومات التواصل", "أوقات العمل"],
      },
    ],
  },
  {
    id: "emergency",
    title: "خدمات الطوارئ",
    description:
      "بطاقات صغيرة للأقسام الرئيسية: طوارئ عامة، طوارئ أسنان، الإسعافات الأولية، المراكز القريبة",
    icon: AlertCircle,
    color: "red",
    gradient: "from-red-500 to-orange-500",
    mainAction: {
      title: "اذهب للطوارئ",
      path: "/emergency",
      icon: AlertCircle,
    },
    cards: [
      { id: "general-emergency", title: "طوارئ عامة", description: "دليل وأرقام الطوارئ", icon: Phone, path: "/emergency", color: "red", gradient: "from-red-500 to-red-600", features: ["911", "إرشادات"] },
      { id: "dental-emergency", title: "طوارئ أسنان", description: "خدمات طوارئ الأسنان", icon: Stethoscope, path: "/emergency", color: "orange", gradient: "from-orange-500 to-red-500", features: ["استجابة سريعة", "حجز عاجل"] },
      { id: "first-aid", title: "الإسعافات الأولية", description: "خطوات فورية للإنقاذ", icon: BookOpenCheck, path: "/emergency/first-aid", color: "amber", gradient: "from-amber-500 to-orange-500", features: ["خطوات واضحة", "صور"] },
      { id: "nearby-hospitals", title: "المراكز القريبة", description: "اعثر على أقرب المراكز", icon: Navigation, path: "/emergency/hospitals", color: "teal", gradient: "from-teal-500 to-green-500", features: ["خريطة", "اتصال"] },
    ],
  },
  {
    id: "removed-section",
    title: "البحث عن العيادات ال��ريبة",
    description:
      "اعثر ع��ى أفضل العيادات والأطباء في منطقتك بالخريطة التفاعلية",
    icon: MapPin,
    color: "teal",
    gradient: "from-teal-500 to-green-500",
    mainAction: {
      title: "البحث في الخري��ة",
      path: "#clinic-map",
      icon: Map,
    },
    cards: [
      {
        id: "interactive-map",
        title: "ال��ريطة التفاعلية",
        description: "اعثر على العيادات القريبة منك بالخريطة",
        icon: Map,
        path: "#clinic-map",
        color: "teal",
        gradient: "from-teal-500 to-green-500",
        features: ["خري��ة تفاعلية", "بحث بالمو��ع", "تفاصيل شاملة"],
      },
      {
        id: "clinic-reviews",
        title: "تقييمات العيادات",
        description: "اقرأ تجارب المرضى الحقيقية",
        icon: Star,
        path: "/clinic-reviews",
        color: "yellow",
        gradient: "from-yellow-500 to-orange-500",
        features: ["تقييمات حقيقية", "تعليقات مفصلة", "تقييمات متنوعة"],
      },
      {
        id: "doctor-profiles",
        title: "ملفات الأطباء",
        description: "تعرف عل�� تخصصات وخبرات الأطباء",
        icon: Users,
        path: "/doctor-profiles",
        color: "blue",
        gradient: "from-blue-500 to-teal-500",
        features: ["سيرة ذاتية", "التخصصات", "سنوات الخبرة"],
      },
      {
        id: "clinic-facilities",
        title: "إمكانيات العيادات",
        description: "تعرف على ��لخدمات والأجهزة المتوفرة",
        icon: Building,
        path: "/clinic-facilities",
        color: "purple",
        gradient: "from-purple-500 to-blue-500",
        features: ["أجهزة حديث��", "خد��ات متنوعة", "معايير الجو��ة"],
      },
    ],
  },
  {
    id: "smart-diagnosis",
    title: "التشخيص الذكي",
    description: "احصل على تشخيص أولي دقيق باستخدام الذكاء الاصطناعي",
    icon: Brain,
    color: "purple",
    gradient: "from-purple-500 to-indigo-500",
    mainAction: {
      title: "ابدأ التشخيص الذكي",
      path: "/ai-diagnosis",
      icon: Brain,
    },
    cards: [
      {
        id: "symptoms-checker",
        title: "فحص الأعراض",
        description: "ادخل أعراضك واحصل على ��شخيص أولي",
        icon: Activity,
        path: "/ai-diagnosis",
        color: "purple",
        gradient: "from-purple-500 to-indigo-500",
        features: ["تشخيص فوري", "دقة عالية", "سهل الاس��خدام"],
      },
      {
        id: "photo-analysis",
        title: "تحليل الصور الطبية",
        description: "ارفع صور الأشعة أو التحاليل للحصول على تحليل",
        icon: Camera,
        path: "/photo-analysis",
        color: "blue",
        gradient: "from-blue-500 to-purple-500",
        features: ["تحليل دقيق", "نتائج سريعة", "تقارير مفصلة"],
      },
      {
        id: "ai-consultation",
        title: "استشارة ذكية",
        description: "احصل على استشارة طبية با��ذكاء الاصطناعي",
        icon: MessageCircle,
        path: "/smart-chat",
        color: "indigo",
        gradient: "from-indigo-500 to-purple-500",
        features: ["استشارة فورية", "إجابات دقيقة", "متاح دائماً"],
      },
    ],
  },
  {
    id: "education",
    title: "المحتوى والمقالات الت��ليمية",
    description: "تعلم عن صحتك من ��لال مقالات طبية موثوقة ومحتوى تعليمي متخصص",
    icon: BookOpen,
    color: "emerald",
    gradient: "from-emerald-500 to-teal-500",
    mainAction: {
      title: "تصفح المقالات",
      path: "/articles/",
      icon: BookOpenCheck,
    },
    cards: [
      {
        id: "health-articles",
        title: "م����لات طبية",
        description: "مقالات شاملة عن مختلف المواضيع الطبية",
        icon: FileText,
        path: "/articles/",
        color: "emerald",
        gradient: "from-emerald-500 to-green-500",
        features: ["محتوى موثوق", "مواضيع م��نوعة", "سهل الفهم"],
      },
      {
        id: "health-tips",
        title: "نصائح صحية",
        description: "نصائح يومية للحفاظ على صحتك",
        icon: Sparkles,
        path: "/articles/",
        color: "green",
        gradient: "from-green-500 to-emerald-500",
        features: ["نصائح عملية", "سهلة التطبيق", "محدثة باستمرار"],
      },
      {
        id: "disease-info",
        title: "معلومات الأم��اض",
        description: "دليل شامل عن الأمراض وطرق الوقاية",
        icon: Info,
        path: "/articles/",
        color: "blue",
        gradient: "from-blue-500 to-emerald-500",
        features: ["معلومات شاملة", "طرق الوقاية", "العلاجات المتاحة"],
      },
    ],
  },
];

const quickStats = [
  { label: "مريض سعيد", value: "50K+", icon: Users, color: "blue" },
  { label: "طبيب متخصص", value: "200+", icon: Stethoscope, color: "green" },
  { label: "عيادة شريكة", value: "150+", icon: Building, color: "purple" },
  { label: "معدل الرضا", value: "98%", icon: Star, color: "orange" },
];

const mainFeatures = [
  {
    title: "خريطة تفاعلية ذكية",
    description: "ابحث عن العيادات والأطباء بالقرب منك",
    icon: Map,
    color: "teal",
  },
  {
    title: "تشخيص بالذكاء الاصطناعي",
    description: "احصل على تشخي�� أولي دقيق في دقائق",
    icon: Brain,
    color: "purple",
  },
  {
    title: "طوارئ على مدار الساعة",
    description: "خدمة طوارئ متاحة 24/7",
    icon: Ambulance,
    color: "red",
  },
  {
    title: "مح��وى تعليمي موثوق",
    description: "مقالات ونصائح طبية من مصادر موثوقة",
    icon: BookOpen,
    color: "emerald",
  },
  {
    title: "أمان وخصوصي��",
    description: "حماية كاملة لبياناتك الطبية",
    icon: Shield,
    color: "blue",
  },
  {
    title: "دعم متعدد اللغات",
    description: "خدماتنا متاحة ب����دة لغات",
    icon: Globe,
    color: "indigo",
  },
];

export default function ModernMedicalServices() {
  const [activeCategory, setActiveCategory] = useState<string>("directory");
  const { isOpen: isAIOpen, openAssistant, closeAssistant } = useAIAssistant();
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileView, setIsMobileView] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showDashboard, setShowDashboard] = useState(false);

  useEffect(() => {
    const checkMobileView = () => {
      setIsMobileView(window.innerWidth < 768);
    };
    checkMobileView();
    window.addEventListener("resize", checkMobileView);
    return () => window.removeEventListener("resize", checkMobileView);
  }, []);

  useEffect(() => {
    // Check URL parameters for section
    const params = new URLSearchParams(location.search);
    const section = params.get("section");

    if (section && medicalCategories.find((cat) => cat.id === section)) {
      setActiveCategory(section);

      // Auto-scroll to map if coming from landing page clinic search
      if (section === "directory" && location.hash === "#directory-map") {
        setTimeout(() => {
          document.getElementById("directory-map")?.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
        }, 500);
      }
    }
  }, [location]);

  const currentCategory =
    medicalCategories.find((cat) => cat.id === activeCategory) ||
    medicalCategories[0];

  const handleCardClick = (path: string) => {
    // التنقل للخرائط ضم�� نفس الصفحة
    if (path === "#clinic-map" || path === "#emergency-map" || path === "#directory-map") {
      const targetId =
        path === "#directory-map" ? "directory-map" : path.substring(1);
      document.getElementById(targetId)?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
    // الاتصال الهاتفي
    else if (path.startsWith("tel:")) {
      window.location.href = path;
    }
    // التنقل للصفحات الخارجية
    else if (path.startsWith("http")) {
      window.open(path, "_blank", "noopener,noreferrer");
    }
    // التنقل للصفحات داخل التطب��ق
    else if (path.startsWith("/")) {
      navigate(path);
    }
    // التنقل للأقسام داخل نفس الصفحة
    else if (path.startsWith("#")) {
      const targetId = path.substring(1);
      document.getElementById(targetId)?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  };

  // Prepare categories for compact nav
  const compactCategories = medicalCategories
    .filter((cat) => cat.id !== "removed-section")
    .map((cat) => ({
      id: cat.id,
      title: cat.title,
      icon: cat.icon,
      gradient: cat.gradient,
      count: cat.cards?.length || 0,
    }));

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="pb-20">
        {/* Enhanced Hero Section */}
        <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white pt-3.5 pb-1">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-8">
              <h1 className="text-3xl lg:text-4xl font-bold mb-4">
                منصت�� الطبية الشاملة
              </h1>
              <p className="text-blue-100 text-lg max-w-2xl mx-auto mb-3">
                احصل على أفضل الخدمات الطبية من التشخيص الذكي ��لى البحث عن
                العيادات القريبة
              </p>

              {/* Quick Access Buttons */}
              <div className="flex flex-wrap justify-center md:gap-4 gap-0.5 mb-5">
                <Link
                  to="/ai-diagnosis"
                  className="bg-white text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-blue-50 transition-colors flex items-center gap-2"
                >
                  <Brain className="w-5 h-5" />
                  تشخيص ذكي فوري
                </Link>
                <button
                  onClick={() => {
                    setActiveCategory("directory");
                    setTimeout(() => {
                      document.getElementById("directory-map")?.scrollIntoView({
                        behavior: "smooth",
                        block: "center",
                      });
                    }, 300);
                  }}
                  className="border border-white/30 text-white px-6 py-3 rounded-lg font-medium hover:bg-white/10 transition-colors flex items-center gap-2"
                >
                  <MapPin className="w-5 h-5" />
                  ابحث عن عيادة
                </button>
                <Link
                  to="/emergency"
                  className="bg-red-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-red-600 transition-colors flex items-center gap-2"
                >
                  <Phone className="w-5 h-5" />
                  طوارئ
                </Link>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {quickStats.map((stat, index) => (
                  <div
                    key={index}
                    className="bg-white/10 backdrop-blur-sm rounded-xl p-4"
                  >
                    <div className="flex items-center justify-center mb-2">
                      <stat.icon className="w-6 h-6" />
                    </div>
                    <div className="text-xl font-bold mb-1">{stat.value}</div>
                    <div className="text-blue-100 text-sm">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Horizontal Category Navigation */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 mb-8 overflow-hidden">
            <div className="flex flex-wrap justify-center gap-0">
              {medicalCategories
                .filter((cat) => cat.id !== "removed-section")
                .map((category) => {
                  const isActive = activeCategory === category.id;
                  return (
                    <button
                      key={category.id}
                      onClick={() => setActiveCategory(category.id)}
                      className={cn(
                        "p-4 transition-all duration-300 text-center border-r border-gray-100 last:border-r-0",
                        isActive
                          ? `bg-gradient-to-r ${category.gradient} text-white shadow-lg`
                          : "text-gray-600 hover:text-gray-900 hover:bg-gray-50",
                      )}
                    >
                      <div className="flex flex-col items-center gap-2">
                        <category.icon
                          className={cn(
                            "w-6 h-6 transition-transform",
                            isActive && "scale-110",
                          )}
                        />
                        <div>
                          <h3 className="font-bold text-xs mb-1">
                            {category.title}
                          </h3>
                        </div>
                      </div>
                    </button>
                  );
                })}
            </div>
          </div>

          {/* Active Category Content */}
          <div className="transition-all duration-500">
            {/* Category Header */}
            <div className="flex items-center gap-4 mb-6">
              <div
                className={cn(
                  "w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-lg",
                  `bg-gradient-to-r ${currentCategory.gradient}`,
                )}
              >
                <currentCategory.icon className="w-6 h-6" />
              </div>
              <div className="flex flex-row">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-1">
                    {currentCategory.title}
                  </h2>
                  <p className="text-gray-600">{currentCategory.description}</p>
                </div>
                {activeCategory === "emergency" && (
                  <BookOpenCheck className="w-6 h-6 text-blue-600 ml-auto flex flex-col justify-center items-center" />
                )}
              </div>
            </div>

            {/* Interactive Map for Emergency and Clinic Search */}
            {activeCategory === "directory" && (
              <div id="directory-map" className="mb-8">
                {/* Enhanced Promotional Cards Above Map */}
                <div className="flex flex-wrap justify-center md:gap-4 gap-0.5 mb-5">
                  {/* Interactive Map Card */}
                  <div
                    onClick={() => handleCardClick("#emergency-map")}
                    className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all duration-300 cursor-pointer group transform hover:-translate-y-1"
                  >
                    <div className="bg-gradient-to-r from-teal-500 to-green-500 text-white p-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm hover:scale-110 transition-transform">
                            <Map className="w-4 h-4" />
                          </div>
                          <h3 className="font-bold text-sm leading-tight">
                            الخريطة التفاعلية
                          </h3>
                        </div>
                        <ArrowRight className="w-4 h-4 opacity-70 hover:opacity-100 hover:translate-x-1 transition-all" />
                      </div>
                    </div>
                    <div className="p-3">
                      <p className="text-gray-600 text-xs leading-relaxed mb-3 line-clamp-2">
                        اعثر على العيادات والمستشفيات القريبة منك
                      </p>
                      <div className="space-y-1 mb-3">
                        <div className="flex items-center gap-1">
                          <CheckCircle className="w-3 h-3 text-gray-800" />
                          <span className="text-gray-700 text-xs">
                            خريطة تفاعلية
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <CheckCircle className="w-3 h-3 text-gray-800" />
                          <span className="text-gray-700 text-xs">
                            بحث بالموقع
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Emergency Hotline Card */}
                  <div
                    onClick={() => handleCardClick("tel:911")}
                    className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all duration-300 cursor-pointer group transform hover:-translate-y-1"
                  >
                    <div className="bg-gradient-to-r from-red-500 to-red-600 text-white p-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm hover:scale-110 transition-transform">
                            <Phone className="w-4 h-4" />
                          </div>
                          <h3 className="font-bold text-sm leading-tight">
                            خط الطوارئ المجاني
                          </h3>
                        </div>
                        <ExternalLink className="w-4 h-4 opacity-70 hover:opacity-100 transition-all" />
                      </div>
                    </div>
                    <div className="p-3">
                      <p className="text-gray-600 text-xs leading-relaxed mb-3 line-clamp-2">
                        اتصل الآن للحصول على مساعدة فورية
                      </p>
                      <div className="space-y-1 mb-3">
                        <div className="flex items-center gap-1">
                          <CheckCircle className="w-3 h-3 text-red-500" />
                          <span className="text-gray-700 text-xs">
                            متاح 24/7
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <CheckCircle className="w-3 h-3 text-red-500" />
                          <span className="text-gray-700 text-xs">
                            استجابة فورية
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Emergency Services Guide Card */}
                  <div
                    onClick={() => handleCardClick("/emergency")}
                    className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all duration-300 cursor-pointer group transform hover:-translate-y-1"
                  >
                    <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white p-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm hover:scale-110 transition-transform">
                            <AlertCircle className="w-4 h-4" />
                          </div>
                          <h3 className="font-bold text-sm leading-tight">
                            خدمات الطوارئ
                          </h3>
                        </div>
                        <ArrowRight className="w-4 h-4 opacity-70 hover:opacity-100 hover:translate-x-1 transition-all" />
                      </div>
                    </div>
                    <div className="p-3">
                      <p className="text-gray-600 text-xs leading-relaxed mb-3 line-clamp-2">
                        دليل الإسعافات وخدمات الطوارئ
                      </p>
                      <div className="space-y-1 mb-3">
                        <div className="flex items-center gap-1">
                          <CheckCircle className="w-3 h-3 text-orange-500" />
                          <span className="text-gray-700 text-xs">
                            دليل الإسعافات
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <CheckCircle className="w-3 h-3 text-orange-500" />
                          <span className="text-gray-700 text-xs">
                            أرقام الطوارئ
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Emergency Locations Card */}
                  <div
                    onClick={() => handleCardClick("/emergency")}
                    className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all duration-300 cursor-pointer group transform hover:-translate-y-1"
                  >
                    <div className="bg-gradient-to-r from-red-600 to-orange-600 text-white p-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm hover:scale-110 transition-transform">
                            <Navigation className="w-4 h-4" />
                          </div>
                          <h3 className="font-bold text-sm leading-tight">
                            أقرب مستشفى للطوارئ
                          </h3>
                        </div>
                        <ArrowRight className="w-4 h-4 opacity-70 hover:opacity-100 hover:translate-x-1 transition-all" />
                      </div>
                    </div>
                    <div className="p-3">
                      <p className="text-gray-600 text-xs leading-relaxed mb-3 line-clamp-2">
                        ��لعثور على أقرب مستشفيات الطوارئ
                      </p>
                      <div className="space-y-1 mb-3">
                        <div className="flex items-center gap-1">
                          <CheckCircle className="w-3 h-3 text-red-500" />
                          <span className="text-gray-700 text-xs">
                            GPS دقيق
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <CheckCircle className="w-3 h-3 text-red-500" />
                          <span className="text-gray-700 text-xs">
                            معلومات التواصل
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <Map className="w-6 h-6 text-teal-600" />
                    <h3 className="text-xl font-bold text-gray-900">
                      الخريطة التفاعلية للعيادات والمستشفيات القريبة
                    </h3>
                  </div>
                  <CompactInteractiveMap
                    title="الخريطة التفاعلية للعيادات والمستشفيات القريبة"
                    description="اعثر على أقرب العيادات والمستشفيات واحجز موعدك بسهولة"
                    maxResults={12}
                    initialFilter="all"
                    showFilters={true}
                  />
                </div>
              </div>
            )}

            {/* Interactive Map for Clinic Search */}
            {activeCategory === "clinic-search" && (
              <div id="clinic-map" className="mb-8">
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <Map className="w-6 h-6 text-teal-600" />
                    <h3 className="text-xl font-bold text-gray-900">
                      الخريطة التفاعلية للعيادات القريبة
                    </h3>
                  </div>
                  <CompactInteractiveMap
                    title="الخريطة التفاعلية للعيادات والمستشفيات القريبة"
                    description="اعثر على أقرب العيادات والمستشفيات واحجز موعدك بسهولة"
                    initialFilter="all"
                    showFilters={true}
                  />
                </div>
              </div>
            )}

            {/* Service Cards Section - Only show for non-emergency categories */}
            {activeCategory !== "emergency" && (
              <div className="flex flex-row gap-3 overflow-x-auto md:flex-wrap justify-center mb-8">
                {currentCategory.cards.map((card) => (
                  <div
                    key={card.id}
                    onClick={() => handleCardClick(card.path)}
                    className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all duration-300 group cursor-pointer transform hover:-translate-y-1"
                  >
                    {/* Compact Card Header */}
                    <div
                      className={cn(
                        "bg-gradient-to-r text-white p-3",
                        card.gradient,
                      )}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm group-hover:scale-110 transition-transform">
                            <card.icon className="w-4 h-4" />
                          </div>
                          <h3 className="font-bold text-sm leading-tight">
                            {card.title}
                          </h3>
                        </div>
                        {card.isExternal ? (
                          <ExternalLink className="w-4 h-4 opacity-70" />
                        ) : (
                          <ArrowRight className="w-4 h-4 opacity-70 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                        )}
                      </div>
                    </div>

                    {/* Compact Card Content */}
                    <div className="p-3">
                      <p className="text-gray-600 text-xs leading-relaxed mb-3 line-clamp-2">
                        {card.description}
                      </p>

                      {/* Compact Features */}
                      <div className="space-y-1 mb-3">
                        {card.features.slice(0, 2).map((feature, index) => (
                          <div key={index} className="flex items-center gap-1">
                            <CheckCircle
                              className={cn(
                                "w-3 h-3",
                                `text-${card.color}-500`,
                              )}
                            />
                            <span className="text-gray-700 text-xs">
                              {feature}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Category-specific Additional Content */}
            {activeCategory === "smart-diagnosis" && (
              <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-6 text-white text-center mb-8">
                <Brain className="w-10 h-10 mx-auto mb-3 opacity-90" />
                <h3 className="text-xl font-bold mb-3">
                  تقنية الذكاء الاصطناعي المتقدمة
                </h3>
                <p className="mb-4 text-purple-100 max-w-2xl mx-auto text-sm">
                  نستخدم أحدث تقني��ت الذكاء الاصطنا��ي لتقديم تشخيص دقيق وسريع
                </p>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-xl font-bold">95%</div>
                    <div className="text-xs text-purple-200">دقة التشخيص</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-bold">2 دقيقة</div>
                    <div className="text-xs text-purple-200">وقت ال��حليل</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-bold">24/7</div>
                    <div className="text-xs text-purple-200">متاح دائماً</div>
                  </div>
                </div>
              </div>
            )}

            {activeCategory === "education" && (
              <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl md:p-6 p-2 text-white text-center md:mb-8 mb-1">
                <BookOpen className="w-10 h-10 mx-auto mb-3 opacity-90" />
                <h3 className="text-xl font-bold mb-3">مكتبة طبية ��املة</h3>
                <p className="mb-4 text-emerald-100 max-w-2xl mx-auto text-sm">
                  اكتشف مئات المقالات والنصائح الطبية الموثوقة مع أطباء متخصصين
                </p>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-xl font-bold">500+</div>
                    <div className="text-xs text-emerald-200">مقال طبي</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-bold">50+</div>
                    <div className="text-xs text-emerald-200">طبيب كاتب</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-bold">يومي</div>
                    <div className="text-xs text-emerald-200">
                      تحديث المحتوى
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Features Section */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mt-8">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                لماذ�� تختارنا؟
              </h2>
              <p className="text-gray-600">
                نوفر لك أفضل الخدمات الطبية بأحدث التقنيات وأعلى معايير الجودة
                وا��أمان
              </p>
            </div>

            <div className="flex flex-wrap justify-center md:gap-4 gap-1">
              {mainFeatures.map((feature, index) => (
                <div
                  key={index}
                  className="text-center p-4 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <div
                    className={cn(
                      "w-10 h-10 mx-auto rounded-lg flex items-center justify-center text-white mb-2 shadow-md",
                      `bg-${feature.color}-500`,
                    )}
                  >
                    <feature.icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-semibold text-gray-900 text-sm mb-1">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-xs">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Emergency Contact */}
          <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-2xl p-6 mt-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-1">
                    هل تحتاج مساعدة عاجلة؟
                  </h3>
                  <p className="text-red-100 text-sm">
                    اتصل بخط الطوارئ المجاني الآن - متاح على مدار الساعة
                  </p>
                </div>
              </div>
              <div className="text-center">
                <a
                  href="tel:911"
                  className="bg-white text-red-600 px-6 py-3 rounded-xl font-bold text-xl hover:bg-red-50 transition-colors block"
                >
                  911
                </a>
                <div className="text-red-100 text-xs mt-1">اتصل الآن</div>
              </div>
            </div>
          </div>
        </div>
      </div>


      {/* AI Assistant */}
      <FloatingAIButton onClick={openAssistant} />
      <CompactAIAssistant
        isOpen={isAIOpen}
        onClose={closeAssistant}
        position="bottom-right"
      />
    </div>
  );
}
