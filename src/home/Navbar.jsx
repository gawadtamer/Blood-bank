import { useState, useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { FiMenu, FiX } from 'react-icons/fi'
import { motion, AnimatePresence } from 'framer-motion'

// شريط التنقل العلوي الثابت مع دعم القوائم على الأجهزة الصغيرة
function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = [
    { to: '/', label: 'الرئيسية' },
    { to: '/booking', label: 'الحجز' },
    { to: '/hospitals', label: 'المستشفيات' }
  ]

  const linkClass = ({ isActive }) =>
    `relative px-1 py-2 text-[15px] font-medium transition-colors ${
      isActive ? 'text-crimson-600' : 'text-ink/70 hover:text-crimson-600'
    }`

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-cream/95 backdrop-blur shadow-card' : 'bg-cream/70 backdrop-blur-sm'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-5 md:px-8 h-[72px] flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5 group">
          <span className="relative flex h-9 w-9 items-center justify-center">
            <svg viewBox="0 0 32 32" className="h-9 w-9 drop-shadow-sm">
              <path fill="#C41E3A" d="M16 2C16 2 6 15 6 21a10 10 0 0 0 20 0C26 15 16 2 16 2Z" />
              <circle className="pulse-dot" cx="16" cy="21" r="2.4" fill="#FDBFC7" />
            </svg>
          </span>
          <span className="font-display font-bold text-lg text-ink leading-tight">
            بنك الدم
            <span className="block text-[11px] font-normal text-crimson-600 -mt-0.5">محافظة الدقهلية</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} className={linkClass} end={l.to === '/'}>
              {l.label}
            </NavLink>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <Link
            to="/booking"
            className="bg-crimson-600 hover:bg-crimson-700 text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-all hover:shadow-soft hover:-translate-y-0.5"
          >
            احجز الآن
          </Link>
        </div>

        <button
          className="md:hidden text-ink text-2xl p-1"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="فتح القائمة"
        >
          {isOpen ? <FiX /> : <FiMenu />}
        </button>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden overflow-hidden bg-cream border-t border-stone-200"
          >
            <div className="flex flex-col gap-1 px-5 py-4">
              {links.map((l) => (
                <NavLink
                  key={l.to}
                  to={l.to}
                  end={l.to === '/'}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `py-2.5 text-[15px] font-medium ${isActive ? 'text-crimson-600' : 'text-ink/80'}`
                  }
                >
                  {l.label}
                </NavLink>
              ))}
              <Link
                to="/booking"
                onClick={() => setIsOpen(false)}
                className="mt-2 bg-crimson-600 text-white text-center font-semibold px-5 py-3 rounded-full"
              >
                احجز الآن
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

export default Navbar
