import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FiMapPin,
  FiPhone,
  FiClock,
  FiSearch,
  FiDroplet,
  FiNavigation,
  FiX,
  FiArrowLeft
} from 'react-icons/fi'
import { hospitals } from '../data/hospitals.js'

// نقاط مركز المنصورة على الخريطة
const MAP_CENTER = { lat: 31.0409, lng: 31.3785 }

// ألوان الدبابيس حسب نوع المستشفى
const PIN_COLORS = ['#C41E3A', '#A8172F', '#E05565', '#7A1220', '#C41E3A', '#A8172F']

// توليد SVG خريطة تفاعلية خفيفة بدون مكتبة خارجية
// نحوّل الإحداثيات إلى نقاط SVG داخل مستطيل عرض محدد
function mapProject(lat, lng, bounds, svgW, svgH) {
  const x = ((lng - bounds.minLng) / (bounds.maxLng - bounds.minLng)) * svgW
  const y = ((bounds.maxLat - lat) / (bounds.maxLat - bounds.minLat)) * svgH
  return { x, y }
}

function HospitalMapSVG({ hospitals, selected, onSelect, svgW = 800, svgH = 500 }) {
  // نحسب حدود الإحداثيات
  const lats = hospitals.map((h) => h.lat)
  const lngs = hospitals.map((h) => h.lng)
  const padding = 0.04
  const bounds = {
    minLat: Math.min(...lats) - padding,
    maxLat: Math.max(...lats) + padding,
    minLng: Math.min(...lngs) - padding,
    maxLng: Math.max(...lngs) + padding
  }

  const points = hospitals.map((h) => ({
    ...h,
    ...mapProject(h.lat, h.lng, bounds, svgW, svgH)
  }))

  return (
    <svg
      viewBox={`0 0 ${svgW} ${svgH}`}
      className="w-full h-full"
      style={{ background: '#E8F4F8' }}
    >
      {/* خلفية الأرض */}
      <rect x="0" y="0" width={svgW} height={svgH} fill="#E8EFF5" rx="0" />

      {/* شبكة ديكورية */}
      {Array.from({ length: 12 }).map((_, i) => (
        <line key={`v${i}`} x1={(svgW / 12) * i} y1="0" x2={(svgW / 12) * i} y2={svgH} stroke="#D0DDE8" strokeWidth="0.5" />
      ))}
      {Array.from({ length: 8 }).map((_, i) => (
        <line key={`h${i}`} x1="0" y1={(svgH / 8) * i} x2={svgW} y2={(svgH / 8) * i} stroke="#D0DDE8" strokeWidth="0.5" />
      ))}

      {/* رسم النيل / الترعة الرئيسية بصرياً */}
      <path
        d={`M ${svgW * 0.08},${svgH * 0.3} Q ${svgW * 0.3},${svgH * 0.2} ${svgW * 0.5},${svgH * 0.45} T ${svgW * 0.92},${svgH * 0.65}`}
        fill="none"
        stroke="#93C5E8"
        strokeWidth="22"
        strokeLinecap="round"
        opacity="0.5"
      />
      <path
        d={`M ${svgW * 0.08},${svgH * 0.3} Q ${svgW * 0.3},${svgH * 0.2} ${svgW * 0.5},${svgH * 0.45} T ${svgW * 0.92},${svgH * 0.65}`}
        fill="none"
        stroke="#6BAED6"
        strokeWidth="6"
        strokeLinecap="round"
        opacity="0.6"
      />

      {/* روابط بين المستشفيات */}
      {points.map((p, i) =>
        points.slice(i + 1).map((p2, j) => {
          const dist = Math.hypot(p.x - p2.x, p.y - p2.y)
          if (dist < 180) {
            return (
              <line
                key={`link-${i}-${j}`}
                x1={p.x} y1={p.y}
                x2={p2.x} y2={p2.y}
                stroke="#C41E3A"
                strokeWidth="1"
                strokeDasharray="4,4"
                opacity="0.2"
              />
            )
          }
          return null
        })
      )}

      {/* دبابيس المستشفيات */}
      {points.map((p, i) => {
        const isSelected = selected?.id === p.id
        const color = PIN_COLORS[i % PIN_COLORS.length]
        return (
          <g
            key={p.id}
            onClick={() => onSelect(p)}
            style={{ cursor: 'pointer' }}
          >
            {/* دائرة نبض للمختار */}
            {isSelected && (
              <circle cx={p.x} cy={p.y} r="30" fill={color} opacity="0.15">
                <animate attributeName="r" values="20;36;20" dur="1.5s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.15;0.05;0.15" dur="1.5s" repeatCount="indefinite" />
              </circle>
            )}

            {/* الدبوس */}
            <circle
              cx={p.x}
              cy={p.y}
              r={isSelected ? 16 : 11}
              fill={color}
              stroke="white"
              strokeWidth={isSelected ? 3 : 2}
              filter="drop-shadow(0 2px 4px rgba(0,0,0,0.3))"
              style={{ transition: 'r 0.2s, stroke-width 0.2s' }}
            />
            {/* أيقونة قطرة دم */}
            <text
              x={p.x}
              y={p.y + 5}
              textAnchor="middle"
              fontSize={isSelected ? 13 : 9}
              fill="white"
              fontWeight="800"
              fontFamily="Cairo, sans-serif"
              style={{ userSelect: 'none', pointerEvents: 'none' }}
            >
              +
            </text>

            {/* اسم المستشفى */}
            <rect
              x={p.x - 62}
              y={p.y - 38}
              width="124"
              height="22"
              rx="6"
              fill="white"
              opacity={isSelected ? 1 : 0.85}
              filter="drop-shadow(0 1px 2px rgba(0,0,0,0.15))"
            />
            <text
              x={p.x}
              y={p.y - 22}
              textAnchor="middle"
              fontSize="9"
              fill={color}
              fontWeight="700"
              fontFamily="Cairo, sans-serif"
              style={{ userSelect: 'none', pointerEvents: 'none' }}
            >
              {p.name.length > 18 ? p.name.slice(0, 18) + '…' : p.name}
            </text>
          </g>
        )
      })}

      {/* شعار المنصورة */}
      <text x={svgW / 2} y={svgH - 14} textAnchor="middle" fontSize="11" fill="#93A3B4" fontFamily="Cairo, sans-serif" opacity="0.7">
        محافظة الدقهلية — بنوك الدم والمستشفيات
      </text>
    </svg>
  )
}

function HospitalsMap() {
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState(null)

  const filtered = hospitals.filter(
    (h) => h.name.includes(query) || h.address.includes(query)
  )

  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-50 to-cream py-10 md:py-16">
      <div className="max-w-7xl mx-auto px-5 md:px-8">

        {/* عنوان الصفحة */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="inline-flex items-center gap-2 bg-crimson-50 text-crimson-700 text-xs md:text-sm font-semibold px-4 py-1.5 rounded-full mb-3">
            <FiNavigation /> خريطة المستشفيات التفاعلية
          </span>
          <h1 className="font-display font-extrabold text-3xl md:text-5xl text-ink mb-4">
            خريطة بنوك الدم والمستشفيات <span className="text-crimson-600">(Hospitals Map)</span>
          </h1>
          <p className="text-ink/70 text-base md:text-lg leading-relaxed">
            تصفح مواقع بنوك الدم والمستشفيات بمحافظة الدقهلية بصرياً على الخريطة واحصل على التفاصيل والأرقام فوراً.
          </p>
        </div>

        {/* تخطيط الخريطة + القائمة الجانبية */}
        <div className="grid lg:grid-cols-12 gap-6">

          {/* الخريطة — SVG تفاعلية */}
          <div className="lg:col-span-8">
            <div className="bg-white rounded-2xl shadow-soft border border-stone-200 overflow-hidden">
              <div className="p-4 border-b border-stone-100 flex items-center justify-between bg-stone-50/70">
                <div className="flex items-center gap-2">
                  <FiMapPin className="text-crimson-600" />
                  <span className="font-display font-bold text-sm text-ink">خريطة مستشفيات وبنوك دم الدقهلية</span>
                </div>
                <span className="text-xs text-ink/50">{hospitals.length} مواقع مسجّلة</span>
              </div>

              <div className="relative h-[300px] sm:h-[440px]">
                <HospitalMapSVG
                  hospitals={hospitals}
                  selected={selected}
                  onSelect={(h) => setSelected(selected?.id === h.id ? null : h)}
                />

                {/* مفتاح الألوان */}
                <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur rounded-xl p-3 shadow-soft border border-stone-100 text-xs text-ink/70 space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="w-4 h-4 rounded-full bg-crimson-600 inline-block" />
                    مستشفى / بنك دم
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="block w-6 border-t-2 border-dashed border-crimson-400" />
                    طريق التنقل
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="block w-6 border-t-4" style={{ borderColor: '#6BAED6' }} />
                    مجرى مائي (نيل / ترعة)
                  </div>
                </div>
              </div>

              <div className="p-3 bg-amber-50 border-t border-amber-100 text-xs text-amber-800 flex items-center gap-2">
                <FiNavigation className="text-amber-600 flex-shrink-0" />
                الخريطة إرشادية تقريبية لمواقع المستشفيات — للتنقل الدقيق يُرجى الاستعانة بتطبيق الخرائط.
              </div>
            </div>
          </div>

          {/* القائمة الجانبية */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            {/* بحث */}
            <div className="relative">
              <FiSearch className="absolute right-3.5 top-1/2 -translate-y-1/2 text-ink/40" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="ابحث عن مستشفى أو منطقة..."
                className="w-full pr-10 pl-4 py-3 rounded-xl border border-stone-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-crimson-200"
              />
            </div>

            {/* قائمة المستشفيات */}
            <div className="space-y-3 overflow-y-auto" style={{ maxHeight: '480px' }}>
              {filtered.map((h, i) => {
                const isSelected = selected?.id === h.id
                return (
                  <motion.div
                    key={h.id}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    onClick={() => setSelected(isSelected ? null : h)}
                    className={`bg-white rounded-xl border p-4 cursor-pointer transition-all duration-200 ${
                      isSelected
                        ? 'border-crimson-500 ring-2 ring-crimson-500/15 shadow-soft'
                        : 'border-stone-200 hover:border-stone-300 hover:shadow-card'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 text-white text-lg font-bold ${
                          isSelected ? 'bg-crimson-600' : 'bg-crimson-100'
                        }`}
                      >
                        <FiMapPin className={isSelected ? 'text-white' : 'text-crimson-600'} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-display font-bold text-sm text-ink truncate">{h.name}</h3>
                        <p className="text-xs text-ink/55 truncate mt-0.5">{h.address}</p>
                        <div className="flex items-center gap-3 mt-2 text-[11px] text-ink/60">
                          <span className="flex items-center gap-1">
                            <FiPhone className="text-crimson-600" /> {h.phone}
                          </span>
                        </div>
                        <p className="text-[11px] text-green-700 font-medium mt-1 flex items-center gap-1">
                          <FiClock className="text-green-600" /> {h.hours}
                        </p>
                      </div>
                    </div>

                    {isSelected && (
                      <div className="mt-3 pt-3 border-t border-stone-100 flex gap-2">
                        <a
                          href={`tel:${h.phone}`}
                          className="flex-1 bg-stone-100 hover:bg-stone-200 text-ink text-xs font-bold py-2 rounded-lg text-center transition-colors"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <FiPhone className="inline ml-1" /> اتصال
                        </a>
                        <Link
                          to={`/request-blood?hospital=${encodeURIComponent(h.name)}`}
                          className="flex-1 bg-crimson-600 hover:bg-crimson-700 text-white text-xs font-bold py-2 rounded-lg text-center transition-colors shadow-soft"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <FiDroplet className="inline ml-1" /> اطلب دم
                        </Link>
                      </div>
                    )}
                  </motion.div>
                )
              })}

              {filtered.length === 0 && (
                <div className="text-center py-8 text-sm text-ink/50">
                  لا توجد نتائج مطابقة لبحثك.
                </div>
              )}
            </div>
          </div>
        </div>

        {/* بانر سفلي للإجراءات */}
        <div className="mt-8 grid sm:grid-cols-3 gap-4">
          {[
            { title: 'احجز تبرع في مستشفى', desc: 'اختر مستشفى وحجز موعد التبرع فوراً', link: '/booking', icon: FiDroplet, cta: 'احجز الآن' },
            { title: 'جدول حملات التبرع', desc: 'شاهد مواعيد الحملات الميدانية في محافظتك', link: '/campaigns', icon: FiClock, cta: 'عرض الجدول' },
            { title: 'اطلب كيس دم', desc: 'تقديم طلب دم عاجل لأقرب بنك دم', link: '/request-blood', icon: FiNavigation, cta: 'اطلب الآن' }
          ].map((item, i) => (
            <div key={i} className="bg-white rounded-2xl border border-stone-200 p-5 shadow-card hover:shadow-soft transition-all duration-300 flex flex-col justify-between">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-crimson-50 text-crimson-600 rounded-xl flex items-center justify-center text-xl">
                  <item.icon />
                </div>
                <div>
                  <h3 className="font-display font-bold text-sm text-ink">{item.title}</h3>
                  <p className="text-xs text-ink/55 mt-0.5">{item.desc}</p>
                </div>
              </div>
              <Link
                to={item.link}
                className="mt-2 bg-crimson-600 hover:bg-crimson-700 text-white text-xs font-bold py-2.5 rounded-xl text-center transition-colors shadow-soft flex items-center justify-center gap-1.5"
              >
                {item.cta} <FiArrowLeft />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default HospitalsMap
