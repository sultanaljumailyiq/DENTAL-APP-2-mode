import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Zap,
  Phone,
  MapPin,
  Clock,
  AlertTriangle,
  Heart,
  Activity,
  Shield,
  ArrowLeft,
  Navigation,
  MessageCircle,
  Users,
  Stethoscope,
  Ambulance,
  Hospital,
  HeartHandshake,
  BookOpenCheck,
  Bandage,
  Wind,
  Droplet,
  Flame,
} from "lucide-react";
import { cn } from "@/lib/utils";
import ModernUnifiedHeader from "@/components/ModernUnifiedHeader";
import UltraModernBottomNav from "@/components/UltraModernBottomNav";

const emergencyServices = [
  {
    id: "dental-emergency",
    title: "طوارئ الأسنان",
    description: "آلام الأسنان الحادة والطوارئ الط��ية",
    icon: Heart,
    phone: "0790-123-4567",
    available: true,
    responseTime: "15-30 دقيقة",
    color: "red",
  },
  {
    id: "oral-surgery",
    title: "جراحة الفم الطارئة",
    description: "إصابات الفم والفكين",
    icon: Shield,
    phone: "0790-123-4568",
    available: true,
    responseTime: "10-20 دقيقة",
    color: "orange",
  },
  {
    id: "pain-management",
    title: "إدارة الألم",
    description: "تسكين آلام الأسنان الحادة",
    icon: Activity,
    phone: "0790-123-4569",
    available: true,
    responseTime: "5-15 دقيق��",
    color: "blue",
  },
];

const nearbyHospitals = [
  {
    name: "مستشفى بغداد التخصصي",
    distance: "2.5 كم",
    address: "شارع فلسطين، بغداد",
    phone: "0790-111-2222",
    hasEmergency: true,
  },
  {
    name: "مستشفى النهرين",
    distance: "3.2 كم",
    address: "شارع السعدون، بغداد",
    phone: "0790-111-3333",
    hasEmergency: true,
  },
  {
    name: "مستشفى الكندي",
    distance: "4.1 كم",
    address: "شارع الجادرية، بغداد",
    phone: "0790-111-4444",
    hasEmergency: true,
  },
];

const firstAidScenarios = [
  {
    id: "heart-attack",
    title: "النوبة القلبية",
    icon: Heart,
    urgency: "critical",
    description: "ألم في الصدر، ضيق في التنفس",
    path: "/emergency/first-aid",
  },
  {
    id: "choking",
    title: "الاختناق",
    icon: Wind,
    urgency: "critical",
    description: "انسداد مجرى الهواء",
    path: "/emergency/first-aid",
  },
  {
    id: "bleeding",
    title: "النزيف الشديد",
    icon: Droplet,
    urgency: "critical",
    description: "فقدان كمية كبيرة من الدم",
    path: "/emergency/first-aid",
  },
  {
    id: "burns",
    title: "الحروق",
    icon: Flame,
    urgency: "urgent",
    description: "إصابة الجلد بالحرارة",
    path: "/emergency/first-aid",
  },
  {
    id: "fractures",
    title: "الكسور",
    icon: Bandage,
    urgency: "urgent",
    description: "كسر في العظام",
    path: "/emergency/first-aid",
  },
  {
    id: "unconscious",
    title: "فقدان الوعي",
    icon: Users,
    urgency: "critical",
    description: "عدم الاستجابة للأصوات",
    path: "/emergency/first-aid",
  },
];

export default function Emergency() {
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const navigate = useNavigate();

  return (
    <>
      <ModernUnifiedHeader
        currentSection="emergency"
        searchPlaceholder="ابحث عن خدمات الطوارئ..."
        hidden={true}
      />

      <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 pt-16">
        {/* Back Button */}
        <div className="bg-white border-b border-red-200 py-4">
          <div className="max-w-6xl mx-auto px-4">
            <Link
              to="/medical-services"
              className="inline-flex items-center gap-2 text-gray-600 hover:text-red-600 transition-colors group"
            >
              <ArrowLeft className="w-5 h-5 group-hover:transform group-hover:-translate-x-1 transition-transform" />
              <span className="font-medium">العودة إ��ى الخدمات الطبية</span>
            </Link>
          </div>
        </div>

        {/* Emergency Header */}
        <div className="bg-gradient-to-r from-red-600 via-orange-600 to-red-700 text-white py-8">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm animate-pulse">
                  <Zap className="w-8 h-8 text-white" />
                </div>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                خدمات الطوارئ الطبية
              </h1>
              <p className="text-xl text-red-100 mb-6">
                خدمة طوارئ سريعة ومتخصصة متاحة 24/7
              </p>

              {/* Emergency Alert */}
              <div className="bg-red-500/20 border border-red-300 rounded-xl p-4 max-w-2xl mx-auto backdrop-blur-sm">
                <div className="flex items-center gap-3 justify-center">
                  <AlertTriangle className="w-6 h-6 text-yellow-300" />
                  <span className="font-medium">
                    في حالة الطوارئ الحقيقية، اتصل بالطوارئ:
                    <a href="tel:911" className="font-bold underline ml-2">
                      911
                    </a>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 py-8">
          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-sm:flex max-sm:flex-row">
            <button className="bg-gradient-to-r from-red-600 to-red-700 text-white p-6 rounded-2xl hover:from-red-700 hover:to-red-800 transition-all transform hover:scale-105 shadow-lg">
              <Phone className="w-8 h-8 mb-3 mx-auto" />
              <h3 className="font-bold text-lg mb-2">اتصال طارئ</h3>
              <p className="text-red-100 text-sm">0790-EMERGENCY</p>
            </button>

            <Link
              to="/smart-chat"
              className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 rounded-2xl hover:from-blue-700 hover:to-blue-800 transition-all transform hover:scale-105 shadow-lg block text-center"
            >
              <MessageCircle className="w-8 h-8 mb-3 mx-auto" />
              <h3 className="font-bold text-lg mb-2">استشارة فورية</h3>
              <p className="text-blue-100 text-sm">دردشة مع طبيب</p>
            </Link>

            <Link
              to="/medical-services"
              onClick={() => {
                // التأكد من أن القسم النشط هو الطوارئ وإمكانية التمرير للخريطة
                setTimeout(() => {
                  const mapElement = document.getElementById("medical-map");
                  if (mapElement) {
                    mapElement.scrollIntoView({ behavior: "smooth" });
                  }
                }, 100);
              }}
              className="bg-gradient-to-r from-green-600 to-green-700 text-white p-6 rounded-2xl hover:from-green-700 hover:to-green-800 transition-all transform hover:scale-105 shadow-lg block text-center"
            >
              <Navigation className="w-8 h-8 mb-3 mx-auto" />
              <h3 className="font-bold text-lg mb-2">أقرب مستشفى</h3>
              <p className="text-green-100 text-sm">العثور على الموقع</p>
            </Link>
          </div>

          {/* Emergency Services */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <Stethoscope className="w-6 h-6 text-red-600" />
              خدمات الطوارئ المتخصصة
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {emergencyServices.map((service) => {
                const Icon = service.icon;
                return (
                  <div
                    key={service.id}
                    className={cn(
                      "bg-white rounded-2xl shadow-lg p-6 border transition-all hover:shadow-xl",
                      selectedService === service.id && "ring-2 ring-red-500",
                    )}
                  >
                    <div className="text-center">
                      <div
                        className={cn(
                          "w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4",
                          service.color === "red" && "bg-red-100",
                          service.color === "orange" && "bg-orange-100",
                          service.color === "blue" && "bg-blue-100",
                        )}
                      >
                        <Icon
                          className={cn(
                            "w-8 h-8",
                            service.color === "red" && "text-red-600",
                            service.color === "orange" && "text-orange-600",
                            service.color === "blue" && "text-blue-600",
                          )}
                        />
                      </div>

                      <h3 className="font-bold text-lg text-gray-900 mb-2">
                        {service.title}
                      </h3>

                      <p className="text-gray-600 text-sm mb-4">
                        {service.description}
                      </p>

                      <div className="space-y-3">
                        <div className="flex items-center justify-center gap-2">
                          <Clock className="w-4 h-4 text-gray-500" />
                          <span className="text-sm text-gray-600">
                            وقت الاستجابة: {service.responseTime}
                          </span>
                        </div>

                        <div className="flex items-center justify-center gap-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span className="text-sm text-green-600 font-medium">
                            متاح الآن
                          </span>
                        </div>

                        <a
                          href={`tel:${service.phone}`}
                          className={cn(
                            "block w-full py-3 px-4 rounded-xl font-medium text-white transition-colors",
                            service.color === "red" &&
                              "bg-red-600 hover:bg-red-700",
                            service.color === "orange" &&
                              "bg-orange-600 hover:bg-orange-700",
                            service.color === "blue" &&
                              "bg-blue-600 hover:bg-blue-700",
                          )}
                        >
                          <div className="flex items-center justify-center gap-2">
                            <Phone className="w-4 h-4" />
                            <span>اتصال فوري</span>
                          </div>
                        </a>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Nearby Hospitals */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <Hospital className="w-6 h-6 text-blue-600" />
              المستشفيات ا��قريبة
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {nearbyHospitals.map((hospital, index) => (
                <div key={index} className="bg-white rounded-xl shadow-lg p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="font-bold text-lg text-gray-900 mb-1">
                        {hospital.name}
                      </h3>
                      <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                        <MapPin className="w-4 h-4" />
                        <span>{hospital.distance}</span>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">
                        {hospital.address}
                      </p>
                    </div>
                    {hospital.hasEmergency && (
                      <div className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                        طوارئ
                      </div>
                    )}
                  </div>

                  <div className="flex gap-2">
                    <a
                      href={`tel:${hospital.phone}`}
                      className="flex-1 bg-blue-600 text-white py-2 px-3 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors text-center"
                    >
                      اتصال
                    </a>
                    <button className="flex-1 bg-gray-100 text-gray-700 py-2 px-3 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors">
                      الاتجاهات
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Emergency Tips */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <HeartHandshake className="w-6 h-6" />
              نصائح الطوارئ
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-bold mb-3">في حالة ألم الأسنان الحاد:</h3>
                <ul className="space-y-2 text-blue-100">
                  <li>• اشطف فمك بالماء الدافئ</li>
                  <li>• استخدم خيط الأس��ان لإزالة أي طعام</li>
                  <li>• خذ مسكن للألم حسب التوجيهات</li>
                  <li>• تجنب وضع الأسبرين على اللثة</li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold mb-3">في حالة إصابة الفم:</h3>
                <ul className="space-y-2 text-blue-100">
                  <li>• اشطف بالماء البارد</li>
                  <li>• اضغط بقطعة قماش نظيفة</li>
                  <li>• ضع ثلج على المنطقة المصابة</li>
                  <li>• اطلب المساعدة الطبية فوراً</li>
                </ul>
              </div>
            </div>
          </div>

          {/* First Aid Guide Section */}
          <div className="mb-12">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <div className="flex items-center gap-3 mb-6">
                <BookOpenCheck className="w-6 h-6 text-orange-600" />
                <h2 className="text-xl font-bold text-gray-900">
                  دليل الإسعافات الأولية
                </h2>
              </div>

              <p className="text-gray-600 mb-6">
                تعلم كيفية التعامل مع الحالات الطارئة الشائعة قبل وصول الإسعاف
              </p>

              <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
                {firstAidScenarios.map((scenario) => (
                  <div
                    key={scenario.id}
                    onClick={() => navigate(scenario.path)}
                    className="bg-gradient-to-br from-orange-50 to-red-50 hover:from-orange-100 hover:to-red-100 rounded-xl p-4 cursor-pointer transition-all duration-300 hover:shadow-md hover:-translate-y-1 group"
                  >
                    <div
                      className={cn(
                        "w-12 h-12 mx-auto mb-3 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110",
                        scenario.urgency === "critical"
                          ? "bg-red-500 text-white"
                          : "bg-orange-500 text-white",
                      )}
                    >
                      <scenario.icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-sm font-bold text-gray-900 text-center mb-2">
                      {scenario.title}
                    </h3>
                    <p className="text-xs text-gray-600 text-center line-clamp-2">
                      {scenario.description}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-6 text-center">
                <Link
                  to="/emergency/first-aid"
                  className="inline-flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-xl font-medium transition-colors"
                >
                  <BookOpenCheck className="w-5 h-5" />
                  عرض الدليل الكامل
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <UltraModernBottomNav />
    </>
  );
}
