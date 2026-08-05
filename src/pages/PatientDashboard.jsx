import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  FiGrid,
  FiDroplet,
  FiSearch,
  FiClock,
  FiActivity,
  FiAlertTriangle,
  FiBell,
  FiUsers,
  FiArrowLeft,
  FiCheckCircle,
  FiPlus
} from 'react-icons/fi'
import { useBloodRequest } from '../context/BloodRequestContext.jsx'

function PatientDashboard() {
  const { requests, notifications } = useBloodRequest()

  const activeRequests = requests.filter((r) => r.statusCode < 5)
  const emergencyRequests = requests.filter((r) => r.urgency === 'Emergency')
  const completedRequests = requests.filter((r) => r.statusCode === 5)

  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-50 to-cream py-10 md:py-16">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        {/* عنوان اللوحة والرأس */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-10 border-b border-stone-200 pb-6">
          <div>
            <span className="inline-flex items-center gap-2 bg-crimson-50 text-crimson-700 text-xs md:text-sm font-semibold px-4 py-1 rounded-full mb-2">
              <FiGrid /> البوابة التفاعلية للمريض
            </span>
            <h1 className="font-display font-extrabold text-3xl md:text-4xl text-ink">
              لوحة تحكم المريض <span className="text-crimson-600">(Patient Dashboard)</span>
            </h1>
            <p className="text-ink/65 text-sm md:text-base mt-1">
              إدارة كافة طلبات الدم، تتبع الحالات العاجلة، والوصول السريع لجميع خدمات بنك الدم.
            </p>
          </div>

          <Link
            to="/request-blood"
            className="bg-crimson-600 hover:bg-crimson-700 text-white font-bold text-sm px-6 py-3 rounded-full transition-all shadow-soft flex items-center gap-2"
          >
            <FiPlus className="text-lg" /> طلب كيس دم جديد
          </Link>
        </div>

        {/* بطاقات الوصول السريع Quick Access Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {[
            { title: 'طلب كيس دم', titleEn: 'Request Blood', icon: FiDroplet, desc: 'تقديم طلب حجز كيس دم جديد للمريض', link: '/request-blood', color: 'bg-crimson-600 text-white' },
            { title: 'البحث عن دم', titleEn: 'Find Blood', icon: FiSearch, desc: 'البحث عن الفصائل بالمستشفيات وبنوك الدم', link: '/find-blood', color: 'bg-white text-ink border border-stone-200' },
            { title: 'تتبع الطلب', titleEn: 'Track Request', icon: FiClock, desc: 'متابعة التسلسل الزمني وحالة الطلبات', link: '/track-request', color: 'bg-white text-ink border border-stone-200' },
            { title: 'توفر الدم', titleEn: 'Blood Availability', icon: FiActivity, desc: 'عرض الرصيد المباشر لكافة الفصائل الثمانية', link: '/availability', color: 'bg-white text-ink border border-stone-200' }
          ].map((card, idx) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.08 }}
            >
              <Link
                to={card.link}
                className={`block rounded-2xl p-6 shadow-card hover:shadow-soft transition-all duration-300 group hover:-translate-y-1 h-full flex flex-col justify-between ${card.color}`}
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-crimson-50 text-crimson-600 flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">
                    <card.icon />
                  </div>
                  <h3 className="font-display font-extrabold text-lg mb-1">{card.title}</h3>
                  <span className="text-xs opacity-75 font-normal block mb-2">{card.titleEn}</span>
                  <p className="text-xs opacity-80 leading-relaxed">{card.desc}</p>
                </div>
                <div className="mt-6 flex items-center gap-1 text-xs font-bold pt-3 border-t border-black/5">
                  الانتقال للخدمة <FiArrowLeft />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* أقسام الإحصائيات السريعة والطلبات */}
        <div className="grid lg:grid-cols-12 gap-8 mb-10">
          {/* العمود الأيمن: الطلبات النشطة والطارئة */}
          <div className="lg:col-span-8 space-y-8">
            {/* قسم الطلبات الطارئة Emergency Requests Banner */}
            {emergencyRequests.length > 0 && (
              <div className="bg-crimson-900 text-white rounded-2xl p-6 border-2 border-crimson-500 shadow-soft">
                <div className="flex items-center justify-between mb-4 border-b border-crimson-800 pb-3">
                  <span className="flex items-center gap-2 text-sm font-bold text-red-200 animate-pulse">
                    <FiAlertTriangle className="text-amber-400 text-lg" /> طلبات الطوارئ العاجلة ({emergencyRequests.length})
                  </span>
                  <span className="text-xs text-cream/70">أولوية استجابة فورية 24/7</span>
                </div>

                <div className="space-y-4">
                  {emergencyRequests.map((req) => (
                    <div key={req.id} className="bg-white/10 backdrop-blur rounded-xl p-4 flex items-center justify-between flex-wrap gap-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="bg-white text-crimson-900 font-extrabold text-xs px-2.5 py-0.5 rounded-full">
                            {req.bloodType}
                          </span>
                          <span className="font-mono text-sm font-bold text-amber-300">{req.id}</span>
                          <span className="text-xs text-cream/80">- {req.patientName}</span>
                        </div>
                        <p className="text-xs text-cream/70">
                          {req.hospital} ({req.units} كيس)
                        </p>
                      </div>

                      <Link
                        to={`/track-request?id=${req.id}`}
                        className="bg-white text-crimson-900 font-bold text-xs px-4 py-2 rounded-full hover:bg-red-50 transition-colors"
                      >
                        تتبع حالة الطوارئ
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* الطلبات النشطة Active Blood Requests */}
            <div className="bg-white rounded-2xl border border-stone-200 p-6 md:p-8 shadow-card">
              <div className="flex items-center justify-between mb-6 border-b border-stone-100 pb-4">
                <h2 className="font-display font-extrabold text-xl text-ink flex items-center gap-2">
                  <FiDroplet className="text-crimson-600" /> الطلبات النشطة الحالية ({activeRequests.length})
                </h2>
                <Link to="/track-request" className="text-xs font-bold text-crimson-600 hover:underline">
                  عرض صفحة التتبع
                </Link>
              </div>

              {activeRequests.length > 0 ? (
                <div className="space-y-4">
                  {activeRequests.map((req) => (
                    <div
                      key={req.id}
                      className="bg-stone-50 rounded-xl p-4 border border-stone-200 flex items-center justify-between flex-wrap gap-4 transition-all hover:bg-white hover:shadow-card"
                    >
                      <div className="flex items-center gap-4">
                        <span className="w-12 h-12 rounded-xl bg-crimson-600 text-white font-extrabold text-lg flex items-center justify-center shadow-sm">
                          {req.bloodType}
                        </span>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-mono font-bold text-sm text-ink">{req.id}</span>
                            <span className="text-xs font-bold text-crimson-700 bg-crimson-50 px-2 py-0.5 rounded-full">
                              {req.urgencyAr}
                            </span>
                          </div>
                          <h3 className="font-bold text-base text-ink">{req.patientName}</h3>
                          <p className="text-xs text-ink/60 mt-0.5">
                            المستشفى: {req.hospital} | المطلوب: {req.units} كيس دم
                          </p>
                        </div>
                      </div>

                      <div className="text-left">
                        <span className="text-xs text-green-700 font-bold block mb-2">{req.statusAr}</span>
                        <Link
                          to={`/track-request?id=${req.id}`}
                          className="bg-crimson-600 hover:bg-crimson-700 text-white text-xs font-bold px-4 py-2 rounded-xl transition-colors inline-flex items-center gap-1"
                        >
                          تتبع الحالة <FiArrowLeft />
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-ink/50 text-sm">
                  لا توجد طلبات نشطة حالياً. يمكنك إضافة طلب جديد في أي وقت.
                </div>
              )}
            </div>

            {/* الطلبات السابقة Previous Requests */}
            <div className="bg-white rounded-2xl border border-stone-200 p-6 md:p-8 shadow-card">
              <h2 className="font-display font-bold text-lg text-ink mb-4 border-b border-stone-100 pb-3 flex items-center gap-2">
                <FiCheckCircle className="text-green-600" /> سجل الطلبات السابقة المكتملة ({completedRequests.length})
              </h2>

              {completedRequests.length > 0 ? (
                <div className="space-y-3 text-sm">
                  {completedRequests.map((req) => (
                    <div key={req.id} className="p-3 bg-stone-50 rounded-xl flex justify-between items-center text-xs">
                      <div>
                        <strong className="text-ink">{req.patientName}</strong> ({req.bloodType} - {req.units} كيس)
                        <span className="text-ink/50 block">{req.hospital}</span>
                      </div>
                      <span className="text-green-700 font-bold bg-green-50 px-2.5 py-1 rounded-full border border-green-200">
                        اكتمل بنجاح
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-ink/50">لا توجد طلبات مكتملة سابقة مسجلة بالمنظومة.</p>
              )}
            </div>
          </div>

          {/* العمود الأيسر: الإشعارات والمساعد السريع */}
          <div className="lg:col-span-4 space-y-8">
            {/* ملخص الإشعارات Notification Box */}
            <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-card">
              <div className="flex items-center justify-between mb-4 border-b border-stone-100 pb-3">
                <h3 className="font-display font-bold text-base text-ink flex items-center gap-2">
                  <FiBell className="text-crimson-600" /> الإشعارات والتحديثات
                </h3>
                <Link to="/notifications" className="text-xs font-bold text-crimson-600 hover:underline">
                  الكل
                </Link>
              </div>

              <div className="space-y-3">
                {notifications.slice(0, 4).map((notif) => (
                  <div key={notif.id} className="p-3 rounded-xl bg-stone-50 border border-stone-100 text-xs">
                    <h4 className="font-bold text-ink mb-1">{notif.title}</h4>
                    <p className="text-ink/65 leading-snug">{notif.body}</p>
                    <span className="text-[10px] text-ink/40 block mt-1.5">{notif.time}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* بطاقة المساعدة والدعم الطارئ */}
            <div className="bg-gradient-to-br from-stone-900 to-ink text-white rounded-2xl p-6 shadow-card">
              <div className="w-10 h-10 rounded-full bg-crimson-600 flex items-center justify-center mb-3">
                <FiUsers className="text-xl text-white" />
              </div>
              <h3 className="font-display font-bold text-lg text-white mb-2">شبكة متبرعي الدقهلية</h3>
              <p className="text-xs text-cream/70 leading-relaxed mb-4">
                تضم المنظومة متبرعين مسجلين في جميع مراكز محافظة الدقهلية جاهزين للاستجابة السريعة فور تقديم طلبات الطوارئ.
              </p>
              <Link
                to="/find-blood"
                className="w-full bg-crimson-600 hover:bg-crimson-700 text-white font-bold text-xs py-2.5 rounded-xl block text-center transition-colors"
              >
                تصفح قائمة المتبرعين وبنوك الدم
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PatientDashboard
