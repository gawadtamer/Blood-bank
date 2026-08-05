import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FiBell, FiCheckCircle, FiInfo, FiAlertCircle, FiCheck, FiArrowLeft } from 'react-icons/fi'
import { useBloodRequest } from '../context/BloodRequestContext.jsx'

function NotificationsDropdown() {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)
  const { notifications, unreadNotifsCount, markNotificationAsRead, markAllNotificationsAsRead } = useBloodRequest()

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2.5 rounded-full hover:bg-stone-200/60 text-ink transition-colors flex items-center justify-center"
        aria-label="التنبيهات والإشعارات"
      >
        <FiBell className="text-xl text-ink/80 hover:text-crimson-600" />
        {unreadNotifsCount > 0 && (
          <span className="absolute top-1 right-1 bg-crimson-600 text-white font-bold text-[10px] w-4 h-4 rounded-full flex items-center justify-center animate-pulse border border-cream">
            {unreadNotifsCount}
          </span>
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute left-0 md:left-0 right-auto mt-2 w-80 md:w-96 bg-white rounded-2xl shadow-xl border border-stone-200 z-50 overflow-hidden text-right"
          >
            {/* رأس القائمة */}
            <div className="p-4 bg-stone-50 border-b border-stone-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="font-display font-bold text-sm text-ink">التنبيهات الإشعارية</span>
                {unreadNotifsCount > 0 && (
                  <span className="bg-crimson-100 text-crimson-700 text-xs font-bold px-2 py-0.5 rounded-full">
                    {unreadNotifsCount} جديد
                  </span>
                )}
              </div>

              {unreadNotifsCount > 0 && (
                <button
                  onClick={markAllNotificationsAsRead}
                  className="text-xs text-crimson-600 hover:text-crimson-800 font-bold flex items-center gap-1"
                >
                  <FiCheck /> قراءة الكل
                </button>
              )}
            </div>

            {/* قائمة الإشعارات */}
            <div className="max-h-80 overflow-y-auto divide-y divide-stone-100">
              {notifications.length > 0 ? (
                notifications.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => markNotificationAsRead(item.id)}
                    className={`p-4 transition-colors hover:bg-stone-50 cursor-pointer flex items-start gap-3 ${
                      !item.read ? 'bg-crimson-50/30' : 'bg-white'
                    }`}
                  >
                    <div className="mt-1">
                      {item.type === 'emergency' ? (
                        <span className="w-8 h-8 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-sm">
                          <FiAlertCircle />
                        </span>
                      ) : item.type === 'success' ? (
                        <span className="w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-sm">
                          <FiCheckCircle />
                        </span>
                      ) : (
                        <span className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm">
                          <FiInfo />
                        </span>
                      )}
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className={`font-bold text-xs md:text-sm ${!item.read ? 'text-crimson-900' : 'text-ink'}`}>
                          {item.title}
                        </h4>
                        <span className="text-[10px] text-ink/40">{item.time}</span>
                      </div>
                      <p className="text-xs text-ink/70 leading-relaxed mb-2">{item.body}</p>

                      {item.link && (
                        <Link
                          to={item.link}
                          onClick={() => setIsOpen(false)}
                          className="text-[11px] font-bold text-crimson-600 hover:underline inline-flex items-center gap-1"
                        >
                          التفاصيل الكاملة <FiArrowLeft />
                        </Link>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-8 text-center text-xs text-ink/50">لا توجد إشعارات حالية.</div>
              )}
            </div>

            {/* أسفل القائمة */}
            <div className="p-3 bg-stone-50 border-t border-stone-100 text-center">
              <Link
                to="/notifications"
                onClick={() => setIsOpen(false)}
                className="text-xs font-bold text-ink/70 hover:text-crimson-600 transition-colors block"
              >
                عرض كل الإشعارات
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default NotificationsDropdown
