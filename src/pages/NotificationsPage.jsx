import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  FiBell,
  FiCheckCircle,
  FiInfo,
  FiAlertCircle,
  FiCheck,
  FiTrash2,
  FiArrowLeft
} from 'react-icons/fi'
import { useBloodRequest } from '../context/BloodRequestContext.jsx'

function NotificationsPage() {
  const { notifications, markNotificationAsRead, markAllNotificationsAsRead } = useBloodRequest()
  const [filter, setFilter] = useState('all')

  const filteredNotifications = notifications.filter((n) => {
    if (filter === 'unread') return !n.read
    return true
  })

  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-50 to-cream py-10 md:py-16">
      <div className="max-w-4xl mx-auto px-5 md:px-8">
        {/* عنوان الصفحة */}
        <div className="text-center mb-10">
          <span className="inline-flex items-center gap-2 bg-crimson-50 text-crimson-700 text-xs md:text-sm font-semibold px-4 py-1.5 rounded-full mb-3">
            <FiBell /> مركز التنبيهات والإشعارات
          </span>
          <h1 className="font-display font-extrabold text-3xl md:text-5xl text-ink mb-4">
            الإشعارات والتحديثات <span className="text-crimson-600">(Notifications)</span>
          </h1>
          <p className="text-ink/70 text-base md:text-lg">
            متابعة فورية لكل تحديثات طلبات الدم الخاصة بك والمستجدات من المستشفيات والمتبرعين.
          </p>
        </div>

        {/* أدوات التصفية والتحكم */}
        <div className="bg-white rounded-2xl p-4 md:p-6 shadow-soft border border-stone-200 mb-8 flex flex-wrap items-center justify-between gap-4">
          <div className="flex gap-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                filter === 'all'
                  ? 'bg-crimson-600 text-white shadow-sm'
                  : 'bg-stone-100 text-ink hover:bg-stone-200'
              }`}
            >
              كافة الإشعارات ({notifications.length})
            </button>
            <button
              onClick={() => setFilter('unread')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                filter === 'unread'
                  ? 'bg-crimson-600 text-white shadow-sm'
                  : 'bg-stone-100 text-ink hover:bg-stone-200'
              }`}
            >
              غير المقروءة ({notifications.filter((n) => !n.read).length})
            </button>
          </div>

          <button
            onClick={markAllNotificationsAsRead}
            className="text-xs font-bold text-crimson-600 hover:text-crimson-800 flex items-center gap-1.5 bg-crimson-50 px-3.5 py-2 rounded-xl border border-crimson-200 transition-colors"
          >
            <FiCheck /> تعليم الكل كمقروء
          </button>
        </div>

        {/* قائمة الإشعارات */}
        <div className="space-y-4">
          {filteredNotifications.length > 0 ? (
            filteredNotifications.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                onClick={() => markNotificationAsRead(item.id)}
                className={`bg-white rounded-2xl p-6 border shadow-card transition-all duration-300 hover:shadow-soft flex items-start gap-4 ${
                  !item.read ? 'border-crimson-300 bg-crimson-50/20' : 'border-stone-200'
                }`}
              >
                <div className="mt-1">
                  {item.type === 'emergency' ? (
                    <span className="w-10 h-10 rounded-xl bg-red-100 text-red-600 flex items-center justify-center text-lg shadow-sm">
                      <FiAlertCircle />
                    </span>
                  ) : item.type === 'success' ? (
                    <span className="w-10 h-10 rounded-xl bg-green-100 text-green-600 flex items-center justify-center text-lg shadow-sm">
                      <FiCheckCircle />
                    </span>
                  ) : (
                    <span className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center text-lg shadow-sm">
                      <FiInfo />
                    </span>
                  )}
                </div>

                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className={`font-display font-bold text-base md:text-lg ${!item.read ? 'text-crimson-900' : 'text-ink'}`}>
                      {item.title}
                    </h3>
                    <span className="text-xs text-ink/40 font-medium">{item.time}</span>
                  </div>

                  <p className="text-xs md:text-sm text-ink/70 leading-relaxed mb-4">{item.body}</p>

                  <div className="flex items-center justify-between pt-3 border-t border-stone-100 text-xs">
                    {item.link ? (
                      <Link
                        to={item.link}
                        className="font-bold text-crimson-600 hover:text-crimson-800 flex items-center gap-1"
                      >
                        الانتقال لتفاصيل الطلب <FiArrowLeft />
                      </Link>
                    ) : (
                      <span />
                    )}

                    {!item.read && (
                      <span className="text-[11px] font-bold text-crimson-600 bg-crimson-100 px-2.5 py-0.5 rounded-full">
                        جديد
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="bg-white rounded-2xl p-12 text-center border border-stone-200 shadow-card">
              <FiBell className="text-4xl text-stone-300 mx-auto mb-3" />
              <p className="font-bold text-ink text-base">لا توجد إشعارات حالية لتحديدها</p>
              <p className="text-xs text-ink/50 mt-1">تظهر التحديثات والإشعارات هنا فور تقديم طلبات جديدة.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default NotificationsPage
