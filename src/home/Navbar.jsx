import { useState, useEffect, useRef } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FiMenu,
  FiX,
  FiDroplet,
  FiGrid,
  FiSearch,
  FiActivity,
  FiClock,
  FiMapPin,
  FiHeart,
  FiHome,
  FiArrowLeft,
  FiShield
} from 'react-icons/fi'
import NotificationsDropdown from '../components/NotificationsDropdown.jsx'

// خدمات النظام — تظهر في لوحة الخدمات الجانبية
const services = [
  {
    group: 'للمريض',
    items: [
      { to: '/request-blood', icon: FiDroplet, label: 'طلب كيس دم', labelEn: 'Request Blood', desc: 'تقديم طلب عاجل أو مجدول', color: 'bg-crimson-100 text-crimson-700' },
      { to: '/find-blood', icon: FiSearch, label: 'البحث عن دم', labelEn: 'Find Blood', desc: 'ابحث في بنوك الدم والمستشفيات', color: 'bg-blue-100 text-blue-700' },
      { to: '/availability', icon: FiActivity, label: 'توفر فصائل الدم', labelEn: 'Availability', desc: 'رصيد الفصائل الثمانية مباشرة', color: 'bg-green-100 text-green-700' },
      { to: '/track-request', icon: FiClock, label: 'تتبع الطلب', labelEn: 'Track Request', desc: 'التسلسل الزمني لحالة طلبك', color: 'bg-amber-100 text-amber-700' },
    ]
  },
  {
    group: 'للمتبرع',
    items: [
      { to: '/campaigns', icon: FiHeart, label: 'حملات التبرع', labelEn: 'Campaigns', desc: 'جدول الحملات الميدانية بالدقهلية', color: 'bg-pink-100 text-pink-700' },
      { to: '/booking', icon: FiShield, label: 'حجز موعد تبرع', labelEn: 'Book Donation', desc: 'احجز وقتك المناسب في أقرب مستشفى', color: 'bg-purple-100 text-purple-700' },
    ]
  },
  {
    group: 'استعراض',
    items: [
      { to: '/map', icon: FiMapPin, label: 'خريطة المستشفيات', labelEn: 'Hospitals Map', desc: 'تصفح المواقع تفاعلياً', color: 'bg-teal-100 text-teal-700' },
      { to: '/hospitals', icon: FiActivity, label: 'قائمة المستشفيات', labelEn: 'Hospitals List', desc: 'جميع المستشفيات وأرقامها', color: 'bg-indigo-100 text-indigo-700' },
      { to: '/dashboard', icon: FiGrid, label: 'لوحة التحكم', labelEn: 'Dashboard', desc: 'ملخص طلباتك وحالاتها', color: 'bg-stone-100 text-stone-700' },
    ]
  }
]

function ServicesPanel({ onClose }) {
  const location = useLocation()

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[60] flex"
      onClick={onClose}
    >
      {/* خلفية شفافة */}
      <div className="flex-1 bg-black/40 backdrop-blur-sm" />

      {/* اللوحة الجانبية */}
      <motion.aside
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 26, stiffness: 280 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-sm bg-cream shadow-2xl flex flex-col h-full overflow-y-auto"
        dir="rtl"
      >
        {/* رأس اللوحة */}
        <div className="sticky top-0 z-10 bg-cream/95 backdrop-blur border-b border-stone-200 px-5 py-4 flex items-center justify-between">
          <div>
            <h2 className="font-display font-extrabold text-xl text-ink">الخدمات</h2>
            <p className="text-xs text-ink/55 mt-0.5">اختر الخدمة التي تحتاجها</p>
          </div>
          <button
            onClick={onClose}
            aria-label="إغلاق لوحة الخدمات"
            className="w-9 h-9 rounded-full bg-stone-100 hover:bg-stone-200 text-ink flex items-center justify-center transition-colors"
          >
            <FiX className="text-xl" />
          </button>
        </div>

        {/* بانر طوارئ مميز */}
        <div className="mx-4 mt-4 rounded-2xl bg-gradient-to-r from-crimson-800 to-crimson-700 text-white p-4 flex items-center gap-3">
          <div className="w-10 h-10 bg-white/15 rounded-xl flex items-center justify-center flex-shrink-0">
            <FiDroplet className="text-xl text-amber-300" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-display font-extrabold text-sm">هل تحتاج دم الآن؟</p>
            <p className="text-[11px] text-crimson-100 mt-0.5">خدمة طوارئ متاحة 24 ساعة</p>
          </div>
          <Link
            to="/request-blood?urgency=emergency"
            onClick={onClose}
            className="bg-white text-crimson-800 font-extrabold text-xs px-3 py-2 rounded-xl hover:bg-crimson-50 transition-colors whitespace-nowrap flex-shrink-0"
          >
            اطلب الآن
          </Link>
        </div>

        {/* مجموعات الخدمات */}
        <div className="flex-1 px-4 py-5 space-y-6">
          {services.map((group) => (
            <div key={group.group}>
              <h3 className="text-[11px] font-extrabold text-ink/40 uppercase tracking-widest mb-3 px-1">
                {group.group}
              </h3>
              <div className="space-y-1.5">
                {group.items.map((item) => {
                  const isActive = location.pathname === item.to
                  return (
                    <Link
                      key={item.to}
                      to={item.to}
                      onClick={onClose}
                      className={`flex items-center gap-3.5 p-3 rounded-xl transition-all duration-200 group ${
                        isActive
                          ? 'bg-crimson-600 text-white shadow-soft'
                          : 'hover:bg-stone-100 text-ink'
                      }`}
                    >
                      {/* أيقونة */}
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors ${
                        isActive ? 'bg-white/20' : item.color
                      }`}>
                        <item.icon className="text-lg" />
                      </div>

                      {/* نص */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-display font-bold text-sm truncate">{item.label}</span>
                          <span className={`text-[10px] font-normal opacity-60 truncate hidden sm:block ${isActive ? 'text-white' : 'text-ink/50'}`}>
                            {item.labelEn}
                          </span>
                        </div>
                        <p className={`text-[11px] mt-0.5 truncate ${isActive ? 'text-white/80' : 'text-ink/50'}`}>
                          {item.desc}
                        </p>
                      </div>

                      {/* سهم */}
                      <FiArrowLeft className={`text-base flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity ${isActive ? 'opacity-100' : ''}`} />
                    </Link>
                  )
                })}
              </div>
            </div>
          ))}
        </div>

        {/* تذييل اللوحة */}
        <div className="sticky bottom-0 bg-cream/95 backdrop-blur border-t border-stone-200 p-4">
          <a
            href="tel:0502202222"
            className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-stone-900 text-white text-sm font-bold hover:bg-stone-800 transition-colors"
          >
            خط الطوارئ: 050-2202222
          </a>
        </div>
      </motion.aside>
    </motion.div>
  )
}

function Navbar() {
  const [servicesOpen, setServicesOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // أغلق اللوحة عند تغيير الصفحة
  useEffect(() => {
    setServicesOpen(false)
    setMobileOpen(false)
  }, [location.pathname])

  // منع تمرير الصفحة عند فتح اللوحة
  useEffect(() => {
    document.body.style.overflow = servicesOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [servicesOpen])

  const mainLinks = [
    { to: '/', label: 'الرئيسية', end: true },
    { to: '/dashboard', label: 'لوحة التحكم', end: false },
    { to: '/booking', label: 'الحجز', end: false },
  ]

  const linkClass = ({ isActive }) =>
    `relative px-1 py-2 text-[14px] font-medium transition-colors whitespace-nowrap ${
      isActive
        ? 'text-crimson-600 font-bold border-b-2 border-crimson-600'
        : 'text-ink/75 hover:text-crimson-600'
    }`

  return (
    <>
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-cream/95 backdrop-blur shadow-card' : 'bg-cream/85 backdrop-blur-sm'
        }`}
      >
        <nav className="max-w-7xl mx-auto px-4 md:px-8 h-[68px] flex items-center justify-between gap-4">

          {/* الشعار */}
          <Link to="/" className="flex items-center gap-2.5 flex-shrink-0 group">
            <span className="relative flex h-9 w-9 items-center justify-center">
              <svg viewBox="0 0 32 32" className="h-9 w-9 drop-shadow-sm">
                <path fill="#C41E3A" d="M16 2C16 2 6 15 6 21a10 10 0 0 0 20 0C26 15 16 2 16 2Z" />
                <circle className="pulse-dot" cx="16" cy="21" r="2.4" fill="#FDBFC7" />
              </svg>
            </span>
            <span className="font-display font-bold text-base md:text-lg text-ink leading-tight">
              بنك الدم
              <span className="block text-[11px] font-normal text-crimson-600 -mt-0.5">محافظة الدقهلية</span>
            </span>
          </Link>

          {/* روابط رئيسية — شاشات كبيرة فقط */}
          <div className="hidden md:flex items-center gap-6">
            {mainLinks.map((l) => (
              <NavLink key={l.to} to={l.to} className={linkClass} end={l.end}>
                {l.label}
              </NavLink>
            ))}

            {/* زر الخدمات */}
            <button
              onClick={() => setServicesOpen(true)}
              aria-label="فتح لوحة الخدمات"
              className={`flex items-center gap-1.5 px-1 py-2 text-[14px] font-medium transition-colors whitespace-nowrap ${
                servicesOpen ? 'text-crimson-600 font-bold' : 'text-ink/75 hover:text-crimson-600'
              }`}
            >
              <FiGrid className="text-base" />
              الخدمات
            </button>
          </div>

          {/* أيقونات اليمين */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <NotificationsDropdown />

            {/* زر الخدمات — شاشات متوسطة */}
            <button
              onClick={() => setServicesOpen(true)}
              aria-label="الخدمات"
              className="hidden md:flex items-center gap-1.5 bg-stone-100 hover:bg-stone-200 text-ink text-sm font-bold px-3.5 py-2 rounded-full transition-colors"
            >
              <FiGrid className="text-base" />
              الخدمات
            </button>

            {/* CTA طلب دم عاجل */}
            <Link
              to="/request-blood"
              className="hidden md:inline-flex items-center gap-1.5 bg-crimson-600 hover:bg-crimson-700 text-white text-sm font-bold px-4 py-2.5 rounded-full transition-all hover:shadow-soft"
            >
              <FiDroplet /> طلب دم
            </Link>

            {/* الهامبرجر — موبايل */}
            <button
              className="md:hidden text-ink text-2xl p-1.5 rounded-lg hover:bg-stone-200/50"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="فتح القائمة"
            >
              {mobileOpen ? <FiX /> : <FiMenu />}
            </button>
          </div>
        </nav>

        {/* قائمة الموبايل */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.22 }}
              className="md:hidden overflow-hidden bg-cream border-t border-stone-200 shadow-lg"
            >
              <div className="flex flex-col gap-0.5 px-5 py-3">
                {mainLinks.map((l) => (
                  <NavLink
                    key={l.to}
                    to={l.to}
                    end={l.end}
                    onClick={() => setMobileOpen(false)}
                    className={({ isActive }) =>
                      `py-3 text-[15px] font-medium transition-colors border-b border-stone-100 flex items-center justify-between ${
                        isActive ? 'text-crimson-600 font-bold' : 'text-ink/80'
                      }`
                    }
                  >
                    {l.label}
                    <FiArrowLeft className="text-sm opacity-30" />
                  </NavLink>
                ))}

                {/* زر فتح لوحة الخدمات من الموبايل */}
                <button
                  onClick={() => {
                    setMobileOpen(false)
                    setServicesOpen(true)
                  }}
                  className="py-3 text-[15px] font-bold text-crimson-600 border-b border-stone-100 flex items-center justify-between"
                >
                  <span className="flex items-center gap-2">
                    <FiGrid className="text-base" /> كل الخدمات
                  </span>
                  <FiArrowLeft className="text-sm" />
                </button>

                <Link
                  to="/request-blood?urgency=emergency"
                  onClick={() => setMobileOpen(false)}
                  className="mt-3 bg-crimson-600 text-white text-center font-bold px-5 py-3 rounded-full shadow-soft flex items-center justify-center gap-2"
                >
                  <FiDroplet /> طلب كيس دم طوارئ
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* لوحة الخدمات الجانبية */}
      <AnimatePresence>
        {servicesOpen && (
          <ServicesPanel onClose={() => setServicesOpen(false)} />
        )}
      </AnimatePresence>
    </>
  )
}

export default Navbar
