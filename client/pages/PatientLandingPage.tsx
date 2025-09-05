import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  MapPin,
  Brain,
  BookOpen,
  Stethoscope,
  ArrowRight,
  Heart,
  Clock,
  Star,
  Menu,
  X,
  Award,
  Shield,
  Phone,
  MessageCircle,
  Calendar,
  Zap,
  Users,
  CheckCircle,
  Eye,
} from "lucide-react";
import { cn } from "@/lib/utils";
import UltraModernBottomNav from "@/components/UltraModernBottomNav";

const featuredArticles = [
  {
    id: 1,
    title: "العناية اليومية بالأسنان: دليل شامل",
    excerpt: "تعلم الطريقة الصحيحة لتنظيف أسنانك والحفاظ على صحة فمك يومياً",
    image: "���",
    readTime: "5 دقائق",
    author: "د. أحمد محمد",
    authorImage: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop&crop=face",
    category: "الوقاية",
    tags: ["تنظيف", "فرشاة أسنان", "معجون"],
    publishDate: "2024-01-15",
    views: 1520,
    likes: 89,
    isFeatured: true,
  },
  {
    id: 3,
    title: "تبييض الأسنان بطرق طبيعية آمنة",
    excerpt: "طرق طبيعية وآمنة ل��بييض أسنانك في المنزل بدون إضرار بالمينا",
    image: "✨",
    readTime: "6 دقائق",
    author: "د. سارة خالد",
    authorImage: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop&crop=face",
    category: "التجميل",
    tags: ["تبييض", "طبيعي", "منزلي"],
    publishDate: "2024-01-10",
    views: 2150,
    likes: 124,
    isFeatured: true,
  },
  {
    id: 6,
    title: "تقويم الأسنان: كل ما تحتاج معرفته",
    excerpt: "دليل شامل حول تقويم الأسنان، الأنواع، التكلفة، والنتائج المتوقعة",
    image: "🔧",
    readTime: "8 دقائق",
    author: "د. نور الدي��",
    authorImage: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face",
    category: "العلاج",
    tags: ["تقويم", "تصحيح", "تجميل"],
    publishDate: "2024-01-03",
    views: 2340,
    likes: 145,
    isFeatured: true,
  },
];

const mainServices = [
  {
    title: "البحث عن العيادات",
    description: "اعثر على أقرب العيادات المعتمدة في منطقتك",
    icon: MapPin,
    path: "/medical-services",
    color: "blue",
    features: ["خريطة تفاعلية", "تقييمات المرضى", "معلومات شاملة"],
  },
  {
    title: "الاستشارات الذكية",
    description: "احصل على تشخيص مبدئي باستخدام الذكاء الاصطناعي",
    icon: Brain,
    path: "/medical-services",
    color: "purple",
    features: ["تشخيص فوري", "دقة عالية", "متاح 24/7"],
  },
  {
    title: "المقالات الطبية",
    description: "تصفح النصائح والمقالات الطبية الموثوقة",
    icon: BookOpen,
    path: "/medical-services",
    color: "green",
    features: ["محتوى موثوق", "نصائح عملية", "من أطباء خبراء"],
  },
];

const quickStats = [
  { number: "10,000+", label: "مريض سعيد", icon: Heart },
  { number: "500+", label: "طبيب أسنان", icon: Users },
  { number: "50+", label: "عيادة شريكة", icon: Award },
  { number: "24/7", label: "خدمة مستمرة", icon: Clock },
];

export default function PatientLandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      {/* Simple Header for Patients */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-lg border-b border-gray-200/50 shadow-sm">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-green-600 rounded-2xl flex items-center justify-center">
                <Stethoscope className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                  منصة طب الأسنان
                </h1>
                <p className="text-xs text-gray-500">أول منصة متكاملة في العراق</p>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-colors"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-6">
              <a href="#services" className="text-gray-700 hover:text-blue-600 transition-colors">
                الخدمات
              </a>
              <a href="#articles" className="text-gray-700 hover:text-blue-600 transition-colors">
                المقالات
              </a>
              <a href="#about" className="text-gray-700 hover:text-blue-600 transition-colors">
                من نحن
              </a>
              <Link
                to="/medical-services"
                className="bg-gradient-to-r from-blue-600 to-green-600 text-white px-6 py-2 rounded-xl font-medium hover:shadow-lg transition-all"
              >
                ابدأ الآن
              </Link>
            </nav>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="lg:hidden py-4 border-t border-gray-200">
              <nav className="flex flex-col gap-2">
                <a href="#services" className="block py-2 text-gray-700 hover:text-blue-600">
                  الخدمات
                </a>
                <a href="#articles" className="block py-2 text-gray-700 hover:text-blue-600">
                  المقالات
                </a>
                <a href="#about" className="block py-2 text-gray-700 hover:text-blue-600">
                  من ��حن
                </a>
                <Link
                  to="/medical-services"
                  className="bg-gradient-to-r from-blue-600 to-green-600 text-white px-6 py-2 rounded-xl font-medium text-center mt-2"
                >
                  ابدأ الآن
                </Link>
              </nav>
            </div>
          )}
        </div>
      </header>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 pt-16">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-blue-600 via-teal-600 to-green-600 text-white py-20">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                أهلاً بك في منصة طب الأسنان
              </h1>
              <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-4xl mx-auto">
                اعثر على أفضل أطباء الأسنان، واحصل على استشارات ذكية، وتعلم كيفية العناية بأسنانك
              </p>
              
              {/* Main CTA */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <Link
                  to="/medical-services"
                  className="bg-white text-blue-600 px-8 py-4 rounded-2xl font-bold text-lg hover:shadow-xl transition-all transform hover:scale-105"
                >
                  استكشف الخدمات الطبية
                </Link>
                <a
                  href="#services"
                  className="bg-blue-500/20 text-white border-2 border-white/30 px-8 py-4 rounded-2xl font-bold text-lg hover:bg-white/10 transition-all"
                >
                  تعرف على المزيد
                </a>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
                {quickStats.map((stat, index) => {
                  const Icon = stat.icon;
                  return (
                    <div key={index} className="text-center">
                      <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-2">
                        <Icon className="w-6 h-6" />
                      </div>
                      <div className="text-2xl font-bold">{stat.number}</div>
                      <div className="text-sm text-blue-200">{stat.label}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 py-16">
          {/* Main Services */}
          <section id="services" className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                خدماتنا الطبية
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                ثلاث خدمات أساسية لتلبية جميع احتياجاتك في مجال طب الأسنان
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {mainServices.map((service, index) => {
                const Icon = service.icon;
                return (
                  <Link
                    key={index}
                    to={service.path}
                    className="group block"
                  >
                    <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group-hover:scale-105">
                      <div className={cn(
                        "bg-gradient-to-r p-8 text-white",
                        service.color === "blue" && "from-blue-600 to-cyan-600",
                        service.color === "purple" && "from-purple-600 to-indigo-600",
                        service.color === "green" && "from-green-600 to-emerald-600"
                      )}>
                        <Icon className="w-12 h-12 mb-4" />
                        <h3 className="text-2xl font-bold mb-2">{service.title}</h3>
                        <p className="text-white/90">{service.description}</p>
                      </div>
                      
                      <div className="p-6">
                        <div className="space-y-3 mb-6">
                          {service.features.map((feature, idx) => (
                            <div key={idx} className="flex items-center gap-2">
                              <CheckCircle className="w-5 h-5 text-green-500" />
                              <span className="text-gray-700">{feature}</span>
                            </div>
                          ))}
                        </div>
                        
                        <div className="flex items-center gap-2 text-blue-600 font-medium group-hover:translate-x-1 transition-transform">
                          <span>ابدأ الآن</span>
                          <ArrowRight className="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>

          {/* Featured Articles */}
          <section id="articles" className="mb-20">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2 justify-center">
                <Star className="w-6 h-6 text-yellow-500" />
                مقالات مميزة
              </h2>
            </div>

            <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory md:grid md:grid-cols-3 md:gap-6 md:overflow-visible">
              {featuredArticles.map((article) => (
                <div key={article.id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all overflow-hidden min-w-[260px] sm:min-w-[300px] md:min-w-0 snap-start">
                  <div className="p-6">
                    <div className="text-4xl mb-4 text-center">{article.image}</div>
                    <div className="text-xs text-green-600 font-medium mb-2">مميز</div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{article.title}</h3>
                    <p className="text-gray-600 text-sm mb-4">{article.excerpt}</p>
                    <div className="flex items-center justify-end text-xs text-gray-500 mb-4">
                      <span>{article.readTime}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <div className="flex items-center gap-1">
                          <Eye className="w-3 h-3" />
                          <span>{article.views.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Heart className="w-3 h-3" />
                          <span>{article.likes}</span>
                        </div>
                      </div>
                      <button className="text-green-600 hover:text-green-700 text-sm font-medium">
                        اقرأ المزيد
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-8">
              <Link
                to="/medical-services"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:shadow-lg transition-all transform hover:scale-105"
              >
                تصفح المقالات في الخدمات الطبية
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </section>

          {/* Why Choose Us */}
          <section className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                لماذا تختارنا؟
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: Shield,
                  title: "موثوق ومعتمد",
                  description: "جميع الأطباء معتمدين ومرخصين"
                },
                {
                  icon: Clock,
                  title: "متاح 24/7",
                  description: "خدمات متاحة على مدار الساعة"
                },
                {
                  icon: Award,
                  title: "جودة عالية",
                  description: "أعلى معايير الجودة في الخدمة"
                },
                {
                  icon: Heart,
                  title: "عناية شخصية",
                  description: "اهتمام خاص بكل مريض"
                }
              ].map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div key={index} className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-green-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Emergency Contact */}
          <section className="bg-gradient-to-r from-red-600 to-orange-600 rounded-2xl p-8 text-white text-center">
            <Zap className="w-12 h-12 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-4">في حالة الطوارئ؟</h2>
            <p className="mb-6 text-red-100 max-w-2xl mx-auto">
              خدمة طوارئ الأسنان متاحة على مدار الساعة للحالات العاجلة
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/emergency"
                className="bg-white text-red-600 px-6 py-3 rounded-xl font-bold hover:bg-red-50 transition-colors"
              >
                طوارئ الأسنان
              </Link>
              <a
                href="tel:+964-770-123-4567"
                className="bg-red-500/20 text-white border-2 border-white/30 px-6 py-3 rounded-xl font-bold hover:bg-white/10 transition-colors"
              >
                اتصل الآن
              </a>
            </div>
          </section>
        </div>
      </div>

      <UltraModernBottomNav />
    </>
  );
}
