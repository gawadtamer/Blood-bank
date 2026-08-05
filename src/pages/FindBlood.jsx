import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FiSearch,
  FiFilter,
  FiMapPin,
  FiPhone,
  FiDroplet,
  FiInfo,
  FiCheckCircle,
  FiAlertCircle,
  FiArrowLeft,
  FiClock,
  FiX
} from 'react-icons/fi'
import { searchBloodAvailability } from '../services/bloodRequestService.js'

const bloodTypes = ['الكل', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']
const governorates = ['الكل', 'الدقهلية', 'الغربية', 'الشرقية', 'دمياط']
const cities = ['الكل', 'المنصورة', 'طلخا', 'ميت غمر', 'دكرنس', 'شربين', 'السنبلاوين']
const availabilityOptions = [
  { value: 'الكل', label: 'كافة الحالات' },
  { value: 'Available', label: 'متوفر (Available)' },
  { value: 'Low Stock', label: 'رصيد منخفض (Low Stock)' },
  { value: 'Critical', label: 'حرِج (Critical)' }
]

function FindBlood() {
  const [filters, setFilters] = useState({
    bloodType: 'الكل',
    governorate: 'الدقهلية',
    city: 'الكل',
    hospital: 'الكل',
    availability: 'الكل'
  })

  const [results, setResults] = useState([])
  const [isSearching, setIsSearching] = useState(false)
  const [selectedCenter, setSelectedCenter] = useState(null)

  const handleSearch = () => {
    setIsSearching(true)
    setTimeout(() => {
      const filtered = searchBloodAvailability(filters)
      setResults(filtered)
      setIsSearching(false)
    }, 400)
  }

  useEffect(() => {
    handleSearch()
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-50 to-cream py-10 md:py-16">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        {/* العناوين والوصف */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="inline-flex items-center gap-2 bg-crimson-50 text-crimson-700 text-xs md:text-sm font-semibold px-4 py-1.5 rounded-full mb-3">
            <FiSearch /> محرك البحث الفوري عن فصائل الدم
          </span>
          <h1 className="font-display font-extrabold text-3xl md:text-5xl text-ink mb-4">
            البحث عن كيس دم <span className="text-crimson-600">(Find Blood)</span>
          </h1>
          <p className="text-ink/70 text-base md:text-lg leading-relaxed">
            استعلم عن توفر أكياس الدم في كافة بنوك الدم والمستشفيات بمحافظة الدقهلية والمناطق المجاورة مع تحديثات الاستجابة المباشرة.
          </p>
        </div>

        {/* صندوق البحث والتصفية Search Filters */}
        <div className="bg-white rounded-2xl shadow-soft border border-stone-200 p-6 md:p-8 mb-10">
          <div className="flex items-center gap-2 mb-6 border-b border-stone-100 pb-4 text-ink">
            <FiFilter className="text-crimson-600 text-xl" />
            <h2 className="font-display font-bold text-lg">فلترة وحدات الدم والمستشفيات</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
            {/* فصيلة الدم */}
            <div>
              <label htmlFor="filterBloodType" className="block text-xs font-bold text-ink/70 mb-2">فصيلة الدم (Blood Type)</label>
              <select
                id="filterBloodType"
                value={filters.bloodType}
                onChange={(e) => setFilters({ ...filters, bloodType: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 bg-cream/40 text-sm focus:outline-none focus:ring-2 focus:ring-crimson-200"
              >
                {bloodTypes.map((t) => (
                  <option key={t} value={t}>
                    {t === 'الكل' ? 'جميع الفصائل' : t}
                  </option>
                ))}
              </select>
            </div>

            {/* المحافظة */}
            <div>
              <label htmlFor="filterGovernorate" className="block text-xs font-bold text-ink/70 mb-2">المحافظة (Governorate)</label>
              <select
                id="filterGovernorate"
                value={filters.governorate}
                onChange={(e) => setFilters({ ...filters, governorate: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 bg-cream/40 text-sm focus:outline-none focus:ring-2 focus:ring-crimson-200"
              >
                {governorates.map((g) => (
                  <option key={g} value={g}>
                    {g}
                  </option>
                ))}
              </select>
            </div>

            {/* المدينة / المنطقة */}
            <div>
              <label htmlFor="filterCity" className="block text-xs font-bold text-ink/70 mb-2">المدينة / المنطقة (City / Area)</label>
              <select
                id="filterCity"
                value={filters.city}
                onChange={(e) => setFilters({ ...filters, city: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 bg-cream/40 text-sm focus:outline-none focus:ring-2 focus:ring-crimson-200"
              >
                {cities.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            {/* حالة التوفر */}
            <div>
              <label htmlFor="filterAvailability" className="block text-xs font-bold text-ink/70 mb-2">حالة التوفر (Availability)</label>
              <select
                id="filterAvailability"
                value={filters.availability}
                onChange={(e) => setFilters({ ...filters, availability: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 bg-cream/40 text-sm focus:outline-none focus:ring-2 focus:ring-crimson-200"
              >
                {availabilityOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            {/* زر البحث CTA */}
            <div className="flex items-end">
              <button
                onClick={handleSearch}
                disabled={isSearching}
                aria-label="البحث عن دم الآن"
                className="w-full bg-crimson-600 hover:bg-crimson-700 text-white font-bold py-2.5 px-6 rounded-xl transition-all shadow-soft flex items-center justify-center gap-2 text-sm"
              >
                {isSearching ? (
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <FiSearch /> البحث عن دم (Find Blood)
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* نتائج البحث Search Results */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display font-bold text-xl text-ink">
              نتائج البحث المتاحة <span className="text-sm font-normal text-ink/60">({results.length} مركز ومستشفى)</span>
            </h2>
          </div>

          {results.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {results.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-2xl border border-stone-200 p-6 shadow-card hover:shadow-soft transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    {/* شريط معلومات الفصيلة والتأكيد */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <span className="w-12 h-12 rounded-xl bg-crimson-600 text-white font-display font-extrabold text-xl flex items-center justify-center shadow-sm">
                          {item.bloodType}
                        </span>
                        <div>
                          <span className="text-xs text-ink/50 block">فصيلة الدم</span>
                          <span className="font-bold text-sm text-ink">{item.units} كيس دم متوفر</span>
                        </div>
                      </div>

                      {/* شارة التوفر */}
                      <span
                        className={`text-xs font-bold px-3 py-1 rounded-full ${
                          item.status === 'Available'
                            ? 'bg-green-100 text-green-800 border border-green-200'
                            : item.status === 'Low Stock'
                            ? 'bg-amber-100 text-amber-800 border border-amber-200'
                            : 'bg-red-100 text-red-800 border border-red-200 animate-pulse'
                        }`}
                      >
                        {item.statusAr}
                      </span>
                    </div>

                    {/* تفاصيل المستشفى والموقع */}
                    <h3 className="font-display font-bold text-lg text-ink mb-2">{item.hospital}</h3>
                    <p className="text-xs text-ink/60 flex items-center gap-1.5 mb-3">
                      <FiMapPin className="text-crimson-600 flex-shrink-0" /> {item.address}
                    </p>

                    <div className="flex items-center justify-between text-xs text-ink/70 bg-stone-50 rounded-lg p-2.5 mb-6 border border-stone-100">
                      <span className="flex items-center gap-1">
                        <FiClock className="text-crimson-500" /> المسافة التقريبية:
                      </span>
                      <strong className="text-ink font-bold">{item.distance}</strong>
                    </div>
                  </div>

                  {/* أزرار الإجراءات */}
                  <div className="grid grid-cols-2 gap-3 pt-2 border-t border-stone-100">
                    <a
                      href={`tel:${item.phone}`}
                      className="inline-flex items-center justify-center gap-1.5 bg-stone-100 hover:bg-stone-200 text-ink text-xs font-bold py-2.5 rounded-xl transition-colors"
                    >
                      <FiPhone className="text-crimson-600" /> التواصل
                    </a>

                    <button
                      onClick={() => setSelectedCenter(item)}
                      aria-label="عرض تفاصيل التوفر"
                      className="inline-flex items-center justify-center gap-1.5 bg-crimson-50 hover:bg-crimson-100 text-crimson-700 text-xs font-bold py-2.5 rounded-xl transition-colors border border-crimson-200"
                    >
                      <FiInfo /> عرض التفاصيل
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            /* الحالة الفارغة Empty State */
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-2xl border border-stone-200 p-8 md:p-12 text-center max-w-2xl mx-auto shadow-card"
            >
              <div className="w-16 h-16 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiAlertCircle className="text-3xl" />
              </div>
              <h3 className="font-display font-extrabold text-xl md:text-2xl text-ink mb-3">
                لم يتم العثور على أكياس دم مطابقة في المنطقة المحددة.
              </h3>
              <p className="text-xs md:text-sm text-ink/60 mb-2">
                No matching blood units were found in your selected area.
              </p>
              <p className="text-sm md:text-base text-ink/80 font-medium mb-6">
                جرب البحث في المناطق المجاورة أو قدم طلب دم عاجل فوراً ليتم تحريك فرق الطوارئ والمتبرعين.
              </p>

              <div className="flex flex-wrap justify-center gap-4">
                <button
                  onClick={() =>
                    setFilters({
                      bloodType: 'الكل',
                      governorate: 'الدقهلية',
                      city: 'الكل',
                      hospital: 'الكل',
                      availability: 'الكل'
                    })
                  }
                  className="bg-stone-100 hover:bg-stone-200 text-ink font-bold text-sm px-6 py-3 rounded-full transition-all"
                >
                  إعادة ضبط البحث
                </button>

                <Link
                  to="/request-blood?urgency=emergency"
                  className="bg-crimson-600 hover:bg-crimson-700 text-white font-bold text-sm px-6 py-3 rounded-full transition-all shadow-soft flex items-center gap-2"
                >
                  <FiDroplet /> تقديم طلب دم عاجل الآن <FiArrowLeft />
                </Link>
              </div>
            </motion.div>
          )}
        </div>

        {/* Modal تفاصيل المستشفى */}
        <AnimatePresence>
          {selectedCenter && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
              onClick={() => setSelectedCenter(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-2xl max-w-lg w-full p-6 md:p-8 shadow-xl relative"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setSelectedCenter(null)}
                  className="absolute top-4 left-4 text-stone-400 hover:text-ink text-xl p-1"
                  aria-label="إغلاق النافذة"
                >
                  <FiX />
                </button>

                <div className="flex items-center gap-3 mb-4">
                  <span className="w-12 h-12 rounded-xl bg-crimson-600 text-white font-extrabold text-xl flex items-center justify-center">
                    {selectedCenter.bloodType}
                  </span>
                  <div>
                    <h3 className="font-display font-extrabold text-xl text-ink">{selectedCenter.hospital}</h3>
                    <p className="text-xs text-crimson-600 font-bold">{selectedCenter.statusAr} ({selectedCenter.units} كيس متاحة)</p>
                  </div>
                </div>

                <div className="space-y-3 text-sm text-ink/80 border-t border-stone-100 pt-4 mb-6">
                  <p className="flex items-center gap-2">
                    <FiMapPin className="text-crimson-600" />
                    <strong>العنوان:</strong> {selectedCenter.address}
                  </p>
                  <p className="flex items-center gap-2">
                    <FiPhone className="text-crimson-600" />
                    <strong>الهاتف:</strong> {selectedCenter.phone}
                  </p>
                  <p className="flex items-center gap-2">
                    <FiClock className="text-crimson-600" />
                    <strong>ساعات العمل:</strong> مفتوح على مدار ٢٤ ساعة
                  </p>
                </div>

                <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-xs text-amber-900 mb-6">
                  <FiInfo className="inline ml-1 text-amber-600" />
                  يتوجب تقديم طلب كيس دم رسمي بالمنظومة قبل التوجه للمستشفى لضمان سرعة الحجز والتسليم.
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <a
                    href={`tel:${selectedCenter.phone}`}
                    className="w-full bg-stone-100 hover:bg-stone-200 text-ink font-bold py-3 rounded-xl text-center text-sm transition-colors"
                  >
                    اتصال بالمستشفى
                  </a>
                  <Link
                    to={`/request-blood?hospital=${encodeURIComponent(selectedCenter.hospital)}&bloodType=${selectedCenter.bloodType}`}
                    className="w-full bg-crimson-600 hover:bg-crimson-700 text-white font-bold py-3 rounded-xl text-center text-sm transition-colors shadow-soft"
                  >
                    اطلب الفصيلة الآن
                  </Link>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default FindBlood
