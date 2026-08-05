import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FiCalendar,
  FiMapPin,
  FiClock,
  FiDroplet,
  FiUsers,
  FiHeart,
  FiX,
  FiArrowLeft,
  FiStar,
  FiAlertCircle
} from 'react-icons/fi'

// بيانات حملات التبرع الميدانية التجريبية
const campaigns = [
  {
    id: 'CAMP-001',
    title: 'حملة جامعة المنصورة السنوية',
    type: 'جامعة',
    location: 'كلية الطب — جامعة المنصورة',
    address: 'شارع الجامعة، المنصورة',
    city: 'المنصورة',
    date: '2026-08-10',
    dateAr: 'الأحد ١٠ أغسطس ٢٠٢٦',
    timeStart: '09:00',
    timeEnd: '15:00',
    slots: 120,
    registered: 74,
    organizer: 'اتحاد طلاب كلية الطب',
    note: 'الأولوية لأصحاب الفصائل النادرة O- وAB-',
    featured: true,
    color: 'crimson'
  },
  {
    id: 'CAMP-002',
    title: 'سيارة التبرع المتنقلة — ميدان طلخا',
    type: 'متنقل',
    location: 'ميدان طلخا المركزي',
    address: 'شارع المحطة أمام المجلس، طلخا',
    city: 'طلخا',
    date: '2026-08-12',
    dateAr: 'الثلاثاء ١٢ أغسطس ٢٠٢٦',
    timeStart: '10:00',
    timeEnd: '16:00',
    slots: 60,
    registered: 31,
    organizer: 'بنك الدم المركزي بالمنصورة',
    note: 'سيارة تبرع مجهزة بالكامل — لا حاجة للتوجه للمستشفى',
    featured: false,
    color: 'blue'
  },
  {
    id: 'CAMP-003',
    title: 'حملة نادي الروتاري — شربين',
    type: 'مؤسسة',
    location: 'مركز شباب شربين',
    address: 'شارع الملك فيصل، شربين، الدقهلية',
    city: 'شربين',
    date: '2026-08-15',
    dateAr: 'الجمعة ١٥ أغسطس ٢٠٢٦',
    timeStart: '11:00',
    timeEnd: '17:00',
    slots: 80,
    registered: 19,
    organizer: 'نادي روتاري شربين',
    note: null,
    featured: false,
    color: 'green'
  },
  {
    id: 'CAMP-004',
    title: 'مبادرة أبطال الدم — ميت غمر',
    type: 'ميدان',
    location: 'ميدان شهداء ميت غمر',
    address: 'شارع سعد زغلول، ميت غمر',
    city: 'ميت غمر',
    date: '2026-08-18',
    dateAr: 'الاثنين ١٨ أغسطس ٢٠٢٦',
    timeStart: '09:00',
    timeEnd: '14:00',
    slots: 50,
    registered: 8,
    organizer: 'وحدة صحة ميت غمر',
    note: 'مفتوح للجميع — يُقبل حديثو التبرع',
    featured: false,
    color: 'amber'
  },
  {
    id: 'CAMP-005',
    title: 'حملة السنبلاوين التطوعية الكبرى',
    type: 'جامعة',
    location: 'قاعة مركز ثقافة السنبلاوين',
    address: 'شارع الجمهورية، السنبلاوين',
    city: 'السنبلاوين',
    date: '2026-08-22',
    dateAr: 'الجمعة ٢٢ أغسطس ٢٠٢٦',
    timeStart: '10:00',
    timeEnd: '16:00',
    slots: 90,
    registered: 42,
    organizer: 'جمعية الهلال الأحمر — فرع الدقهلية',
    note: 'تُوفَّر هدية تذكارية ووجبة خفيفة للمتبرعين',
    featured: true,
    color: 'crimson'
  },
  {
    id: 'CAMP-006',
    title: 'يوم الدم بمستشفى دكرنس',
    type: 'مستشفى',
    location: 'مستشفى دكرنس المركزي',
    address: 'شارع النيل، دكرنس، الدقهلية',
    city: 'دكرنس',
    date: '2026-08-25',
    dateAr: 'الاثنين ٢٥ أغسطس ٢٠٢٦',
    timeStart: '08:00',
    timeEnd: '14:00',
    slots: 70,
    registered: 12,
    organizer: 'إدارة مستشفى دكرنس',
    note: null,
    featured: false,
    color: 'green'
  }
]

const typeColors = {
  جامعة: 'bg-crimson-100 text-crimson-800 border-crimson-200',
  متنقل: 'bg-blue-100 text-blue-800 border-blue-200',
  مؤسسة: 'bg-purple-100 text-purple-800 border-purple-200',
  ميدان: 'bg-amber-100 text-amber-800 border-amber-200',
  مستشفى: 'bg-green-100 text-green-800 border-green-200'
}

function DonationCampaigns() {
  const [cityFilter, setCityFilter] = useState('الكل')
  const [selectedCampaign, setSelectedCampaign] = useState(null)

  const cities = ['الكل', ...new Set(campaigns.map((c) => c.city))]

  const filtered = campaigns.filter(
    (c) => cityFilter === 'الكل' || c.city === cityFilter
  )

  const featured = campaigns.filter((c) => c.featured)

  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-50 to-cream py-10 md:py-16">
      <div className="max-w-7xl mx-auto px-5 md:px-8">

        {/* عنوان الصفحة */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="inline-flex items-center gap-2 bg-crimson-50 text-crimson-700 text-xs md:text-sm font-semibold px-4 py-1.5 rounded-full mb-3">
            <FiHeart /> حملات التبرع الميدانية في الدقهلية
          </span>
          <h1 className="font-display font-extrabold text-3xl md:text-5xl text-ink mb-4">
            جدول حملات التبرع بالدم <span className="text-crimson-600">(Donation Campaigns)</span>
          </h1>
          <p className="text-ink/70 text-base md:text-lg leading-relaxed">
            شارك في أقرب حملة تبرع بالدم في محافظة الدقهلية وساهم في إنقاذ أرواح المرضى مجاناً وبكل سهولة.
          </p>
        </div>

        {/* بطاقات الحملات المميزة Featured */}
        <div className="mb-10">
          <h2 className="font-display font-bold text-xl text-ink mb-5 flex items-center gap-2">
            <FiStar className="text-amber-500" /> الحملات المميزة القريبة
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {featured.map((c, i) => (
              <motion.div
                key={c.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="relative overflow-hidden bg-gradient-to-br from-crimson-800 to-crimson-900 text-white rounded-2xl p-6 md:p-8 shadow-soft border border-crimson-700"
              >
                <div className="absolute -top-8 -right-8 w-40 h-40 rounded-full bg-crimson-600/30 blur-2xl pointer-events-none" />
                <div className="relative z-10">
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <span className="inline-flex items-center gap-1.5 bg-amber-400/20 border border-amber-400/40 text-amber-300 text-xs font-bold px-3 py-1 rounded-full">
                      <FiStar className="text-amber-400" /> مميزة
                    </span>
                    <span className={`text-xs font-bold px-3 py-1 rounded-full border bg-white/10 text-white border-white/20`}>
                      {c.type}
                    </span>
                  </div>
                  <h3 className="font-display font-extrabold text-xl md:text-2xl mb-3">{c.title}</h3>
                  <div className="space-y-2 text-sm text-crimson-100 mb-6">
                    <p className="flex items-center gap-2"><FiCalendar className="text-amber-300 flex-shrink-0" /> {c.dateAr}</p>
                    <p className="flex items-center gap-2"><FiClock className="text-amber-300 flex-shrink-0" /> من الساعة {c.timeStart} حتى {c.timeEnd}</p>
                    <p className="flex items-center gap-2"><FiMapPin className="text-amber-300 flex-shrink-0" /> {c.location}</p>
                    <p className="flex items-center gap-2"><FiUsers className="text-amber-300 flex-shrink-0" /> {c.registered} مسجّل من أصل {c.slots} مقعد</p>
                  </div>

                  {/* شريط التسجيل */}
                  <div className="mb-5">
                    <div className="flex justify-between text-xs mb-1.5">
                      <span className="text-crimson-200">نسبة التسجيل</span>
                      <span className="font-bold text-amber-300">{Math.round((c.registered / c.slots) * 100)}%</span>
                    </div>
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-amber-400 rounded-full transition-all"
                        style={{ width: `${Math.round((c.registered / c.slots) * 100)}%` }}
                      />
                    </div>
                  </div>

                  <button
                    onClick={() => setSelectedCampaign(c)}
                    className="w-full bg-white text-crimson-800 hover:bg-crimson-50 font-extrabold py-3 rounded-xl transition-all text-sm flex items-center justify-center gap-2"
                  >
                    <FiHeart /> عرض التفاصيل والتسجيل
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* فلاتر البحث بالمدينة */}
        <div className="flex flex-wrap items-center gap-2 mb-6">
          <span className="text-xs text-ink/60 font-bold ml-2">تصفية بالمدينة:</span>
          {cities.map((city) => (
            <button
              key={city}
              onClick={() => setCityFilter(city)}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all border ${
                cityFilter === city
                  ? 'bg-crimson-600 text-white border-crimson-700 shadow-sm'
                  : 'bg-white text-ink/70 border-stone-200 hover:bg-stone-50'
              }`}
            >
              {city}
            </button>
          ))}
        </div>

        {/* شبكة كافة الحملات */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {filtered.map((c, i) => {
            const fillPct = Math.round((c.registered / c.slots) * 100)
            const isFull = fillPct >= 95
            return (
              <motion.div
                key={c.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
                className="bg-white rounded-2xl border border-stone-200 p-6 shadow-card hover:shadow-soft transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className={`text-xs font-bold px-3 py-1 rounded-full border ${typeColors[c.type] || 'bg-stone-100 text-ink border-stone-200'}`}>
                      {c.type}
                    </span>
                    {c.featured && (
                      <span className="text-xs text-amber-600 font-bold flex items-center gap-1">
                        <FiStar className="text-amber-500" /> مميزة
                      </span>
                    )}
                  </div>

                  <h3 className="font-display font-extrabold text-lg text-ink mb-3">{c.title}</h3>

                  <div className="space-y-1.5 text-xs text-ink/70 mb-4">
                    <p className="flex items-center gap-2"><FiCalendar className="text-crimson-600 flex-shrink-0" /> {c.dateAr}</p>
                    <p className="flex items-center gap-2"><FiClock className="text-crimson-600 flex-shrink-0" /> {c.timeStart} — {c.timeEnd}</p>
                    <p className="flex items-center gap-2"><FiMapPin className="text-crimson-600 flex-shrink-0" /> {c.location}، {c.city}</p>
                    <p className="flex items-center gap-2"><FiUsers className="text-crimson-600 flex-shrink-0" /> {c.registered} / {c.slots} مقعد</p>
                  </div>

                  {/* شريط التسجيل */}
                  <div className="mb-4">
                    <div className="flex justify-between text-[11px] mb-1">
                      <span className="text-ink/50">مستوى التسجيل</span>
                      <span className={`font-bold ${isFull ? 'text-red-600' : 'text-green-700'}`}>
                        {isFull ? 'مكتمل تقريباً' : `${fillPct}%`}
                      </span>
                    </div>
                    <div className="h-1.5 bg-stone-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all ${isFull ? 'bg-red-500' : 'bg-green-500'}`}
                        style={{ width: `${fillPct}%` }}
                      />
                    </div>
                  </div>

                  {c.note && (
                    <div className="bg-amber-50 border border-amber-200 rounded-lg px-3 py-2 text-xs text-amber-800 mb-4">
                      💡 {c.note}
                    </div>
                  )}
                </div>

                <button
                  onClick={() => setSelectedCampaign(c)}
                  disabled={isFull}
                  className={`w-full py-2.5 rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1.5 mt-2 ${
                    isFull
                      ? 'bg-stone-100 text-stone-400 cursor-not-allowed'
                      : 'bg-crimson-600 hover:bg-crimson-700 text-white shadow-soft'
                  }`}
                >
                  {isFull ? 'اكتملت الأماكن' : <><FiDroplet /> عرض التفاصيل والتسجيل</>}
                </button>
              </motion.div>
            )
          })}
        </div>

        {/* بانر تسجيل المتبرع */}
        <div className="bg-stone-900 text-white rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-card border border-stone-800">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-crimson-600 rounded-2xl flex items-center justify-center flex-shrink-0">
              <FiHeart className="text-3xl text-white" />
            </div>
            <div>
              <h3 className="font-display font-extrabold text-xl text-white mb-1">هل تريد تنظيم حملة تبرع بالدم؟</h3>
              <p className="text-sm text-cream/70 leading-relaxed">
                تواصل مع فريق بنك الدم لتنسيق حملة ميدانية في مؤسستك، جامعتك، أو حيّك السكني.
              </p>
            </div>
          </div>
          <a
            href="tel:0502202222"
            className="whitespace-nowrap bg-crimson-600 hover:bg-crimson-700 text-white font-extrabold text-sm px-7 py-3.5 rounded-full transition-all flex items-center gap-2 shadow-soft"
          >
            <FiHeart /> تواصل الآن: 050-2202222
          </a>
        </div>
      </div>

      {/* مودال تفاصيل الحملة */}
      <AnimatePresence>
        {selectedCampaign && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setSelectedCampaign(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* رأس المودال */}
              <div className="bg-crimson-600 text-white p-5 flex items-center justify-between">
                <div>
                  <h3 className="font-display font-extrabold text-lg">{selectedCampaign.title}</h3>
                  <p className="text-xs text-crimson-100">{selectedCampaign.organizer}</p>
                </div>
                <button onClick={() => setSelectedCampaign(null)} className="p-2 rounded-full bg-white/10 hover:bg-white/20">
                  <FiX />
                </button>
              </div>

              <div className="p-6 space-y-4">
                {/* تفاصيل الحملة */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-sm">
                  {[
                    { label: 'التاريخ', icon: FiCalendar, value: selectedCampaign.dateAr },
                    { label: 'الوقت', icon: FiClock, value: `${selectedCampaign.timeStart} — ${selectedCampaign.timeEnd}` },
                    { label: 'الموقع', icon: FiMapPin, value: selectedCampaign.location },
                    { label: 'العنوان الكامل', icon: FiMapPin, value: selectedCampaign.address },
                    { label: 'المقاعد المتاحة', icon: FiUsers, value: `${selectedCampaign.slots - selectedCampaign.registered} مقعد متبقي من ${selectedCampaign.slots}` },
                    { label: 'المنظّم', icon: FiHeart, value: selectedCampaign.organizer }
                  ].map((f) => (
                    <div key={f.label} className="bg-stone-50 rounded-xl p-3 border border-stone-100">
                      <div className="flex items-center gap-1 mb-1">
                        <f.icon className="text-crimson-600 text-xs" />
                        <span className="text-[10px] text-ink/50">{f.label}</span>
                      </div>
                      <p className="text-xs font-bold text-ink">{f.value}</p>
                    </div>
                  ))}
                </div>

                {selectedCampaign.note && (
                  <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-xs text-amber-900">
                    <FiAlertCircle className="inline ml-1 text-amber-600" />
                    {selectedCampaign.note}
                  </div>
                )}

                <div className="bg-crimson-50 border border-crimson-200 rounded-xl p-3 text-xs text-crimson-900">
                  <strong>شروط التبرع:</strong> العمر من ١٨ إلى ٦٠ عاماً — الوزن أكثر من ٥٠ كجم — لم تتبرع منذ ٩٠ يوماً على الأقل.
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setSelectedCampaign(null)}
                    className="w-1/2 bg-stone-100 hover:bg-stone-200 text-ink font-bold py-3 rounded-xl text-sm transition-colors"
                  >
                    إغلاق
                  </button>
                  <a
                    href="tel:0502202222"
                    className="w-1/2 bg-crimson-600 hover:bg-crimson-700 text-white font-bold py-3 rounded-xl text-sm transition-colors flex items-center justify-center gap-2 shadow-soft"
                  >
                    <FiHeart /> سجّل الآن
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default DonationCampaigns
