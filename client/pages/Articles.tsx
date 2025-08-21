import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Home, BookOpen } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import PatientFriendlyArticlesSection from "@/components/PatientFriendlyArticlesSection";
import { UserRole } from "@shared/permissions";

interface ArticlesProps {
  userRole?: UserRole;
}

export default function Articles({ userRole = "patient" }: ArticlesProps) {
  const { language } = useI18n();

  return (
    <div
      className="min-h-screen bg-gray-50"
      dir={language === "ar" ? "rtl" : "ltr"}
    >
      {/* Back Button */}
      <div className="bg-white border-b border-gray-200 pt-4 pb-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to="/medical-services"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-purple-600 transition-colors group"
          >
            <ArrowRight className="w-5 h-5 group-hover:transform group-hover:translate-x-1 transition-transform" />
            <span className="font-medium">العودة إلى الخدمات الطبية</span>
          </Link>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">
              المقالات والنصائح الطبية
            </h1>
            <p className="text-xl text-purple-100 mb-8">
              اقرأ أحدث المقالات الطبية ونصائح الصحة من أطباء متخصصين
            </p>

            {/* Navigation to First Aid Section */}
            <div className="mt-8">
              <a
                href="#first-aid"
                className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white px-8 py-3 rounded-lg font-medium transition-all inline-flex items-center gap-2"
              >
                <BookOpen className="w-5 h-5" />
                دليل الإسعافات الأولية
              </a>
            </div>

            {/* Quick stats */}
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto mt-12">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                <div className="text-3xl font-bold mb-2">150+</div>
                <p className="text-purple-100">مقال طبي</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                <div className="text-3xl font-bold mb-2">50+</div>
                <p className="text-purple-100">طبيب كاتب</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                <div className="text-3xl font-bold mb-2">10k+</div>
                <p className="text-purple-100">قارئ شهرياً</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* First Aid Guide Section */}
      <section id="first-aid" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              دليل الإسعافات الأولية
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              تعلم كيفية التعامل مع الحالات الطارئة والإسعافات الأولية الأساسية
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-red-50 border border-red-200 rounded-xl p-6 hover:shadow-lg transition-all">
              <div className="w-12 h-12 bg-red-500 rounded-lg flex items-center justify-center mb-4">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                الإسعافات الأساسية
              </h3>
              <p className="text-gray-600 mb-4">
                خطوات الإسعافات الأولية للجروح والكدمات والحروق البسيطة
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• تنظيف الجروح</li>
                <li>• التعامل مع النزيف</li>
                <li>• علاج الحروق</li>
                <li>• تضميد الجراح</li>
              </ul>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 hover:shadow-lg transition-all">
              <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mb-4">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                الطوارئ الطبية
              </h3>
              <p className="text-gray-600 mb-4">
                كيفية التعامل مع الحالات الطارئة قبل وصول المساعدة الطبية
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• الإنعاش القلبي الرئوي</li>
                <li>• التعامل مع الاختناق</li>
                <li>• النوبات القلبية</li>
                <li>• السكتة الدماغية</li>
              </ul>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-xl p-6 hover:shadow-lg transition-all">
              <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center mb-4">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                أدوات الإسعاف
              </h3>
              <p className="text-gray-600 mb-4">
                قائمة بالأدوات الأساسية التي يجب توفرها في حقيبة الإسعافات
                الأولية
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• الضمادات والشاش</li>
                <li>• المطهرات</li>
                <li>• الأدوية الأساسية</li>
                <li>• أدوات القياس</li>
              </ul>
            </div>
          </div>

          {/* Emergency Contact */}
          <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-2xl p-8 mt-12">
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-4">في حالة الطوارئ</h3>
              <p className="text-red-100 mb-6">
                إذا كانت الحالة تتطلب تدخلاً طبياً عاجلاً، لا تتردد في الاتصال
                بالطوا��ئ
              </p>
              <a
                href="tel:911"
                className="bg-white text-red-600 px-8 py-4 rounded-xl font-bold text-2xl hover:bg-red-50 transition-colors inline-block"
              >
                911
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <PatientFriendlyArticlesSection userRole={userRole} />
      </div>

      {/* Newsletter Section */}
      <section className="bg-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl p-8 text-white">
            <h2 className="text-3xl font-bold mb-4">اشترك في النشرة الطبية</h2>
            <p className="text-purple-100 mb-8">
              احصل على أحدث المقالات والنصائح الطبية مباشرة في بريدك الإلكتروني
            </p>
            <div className="flex gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="بريدك الإلكتروني"
                className="flex-1 px-4 py-3 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
              />
              <button className="bg-white text-purple-600 px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-colors">
                اشتراك
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
              <BookOpen className="w-4 h-4 text-white" />
            </div>
            <span className="text-xl font-bold">المقالات الطبية</span>
          </div>
          <p className="text-gray-400 mb-4">
            منصة موثوقة للمعلومات الطبية والنصائح الصحية
          </p>
          <div className="flex justify-center gap-6 text-sm text-gray-400">
            <Link to="/about" className="hover:text-white">
              حول المنصة
            </Link>
            <Link to="/privacy" className="hover:text-white">
              سياسة الخصوصية
            </Link>
            <Link to="/terms" className="hover:text-white">
              شروط الاستخدام
            </Link>
            <Link to="/contact" className="hover:text-white">
              تواصل معنا
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
