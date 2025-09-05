import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Hospital, MapPin, Phone } from "lucide-react";

const hospitals = [
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
  {
    name: "مستشفى اليرموك",
    distance: "5.5 كم",
    address: "اليرموك، بغداد",
    phone: "0790-222-3333",
    hasEmergency: true,
  },
];

export default function EmergencyHospitals() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      <div className="bg-white border-b py-4">
        <div className="max-w-6xl mx-auto px-4">
          <Link to="/emergency" className="inline-flex items-center gap-2 text-gray-700 hover:text-blue-600">
            <ArrowRight className="w-5 h-5" />
            <span>العودة إلى الطوارئ</span>
          </Link>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center">
            <Hospital className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">المستشفيات القريبة للطوارئ</h1>
        </div>

        <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory -mx-2 px-2 pb-2 md:grid md:grid-cols-3 md:gap-6 md:overflow-visible">
          {hospitals.map((h, i) => (
            <div key={i} className="bg-white rounded-xl shadow-lg p-6 min-w-[45vw] sm:min-w-[300px] md:min-w-0 snap-start">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-bold text-lg text-gray-900">{h.name}</h3>
                  <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                    <MapPin className="w-4 h-4" />
                    <span>{h.distance}</span>
                  </div>
                </div>
                {h.hasEmergency && (
                  <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">طوارئ</span>
                )}
              </div>
              <p className="text-sm text-gray-600 mb-4">{h.address}</p>
              <div className="flex gap-2">
                <a href={`tel:${h.phone}`} className="flex-1 bg-blue-600 text-white py-2 rounded-lg text-sm font-medium text-center hover:bg-blue-700">
                  <div className="flex items-center justify-center gap-2">
                    <Phone className="w-4 h-4" /> اتصال
                  </div>
                </a>
                <button className="flex-1 bg-gray-100 text-gray-700 py-2 rounded-lg text-sm font-medium hover:bg-gray-200">الاتجاهات</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
