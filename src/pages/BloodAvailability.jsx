import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  FiActivity,
  FiDroplet,
  FiShield,
  FiAlertTriangle,
  FiInfo,
  FiRefreshCw,
  FiArrowLeft
} from 'react-icons/fi'
import { getBloodAvailabilityDashboardData } from '../services/bloodRequestService.js'

function BloodAvailability() {
  const [data, setData] = useState([])
  const [lastUpdated, setLastUpdated] = useState('')

  const loadData = () => {
    const list = getBloodAvailabilityDashboardData()
    setData(list)
    setLastUpdated(new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' }))
  }

  useEffect(() => {
    loadData()
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-50 to-cream py-10 md:py-16">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        {/* عنوان الصفحة والمقدمة */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="inline-flex items-center gap-2 bg-crimson-50 text-crimson-700 text-xs md:text-sm font-semibold px-4 py-1.5 rounded-full mb-3">
            <FiActivity /> لوحة التحديث المباشر لرصيد بنوك الدم
          </span>
          <h1 className="font-display font-extrabold text-3xl md:text-5xl text-ink mb-4">
            توفر فصائل الدم <span className="text-crimson-600">(Blood Availability)</span>
          </h1>
          <p className="text-ink/70 text-base md:text-lg leading-relaxed mb-4">
            متابعة دقيقة لرصيد وحدات الدم الثمانية المتاحة في مستشفيات وبنوك الدم بمحافظة الدقهلية.
          </p>

          <div className="flex items-center justify-center gap-2 text-xs text-ink/50 bg-white/60 backdrop-blur w-fit mx-auto px-4 py-1.5 rounded-full border border-stone-200">
            <FiRefreshCw className="text-crimson-600 animate-spin-slow" /> آخر تحديث للمخزون: {lastUpdated || 'الآن'}
          </div>
        </div>

        {/* شبكة فصائل الدم الثمانية */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {data.map((item, idx) => {
            const isCritical = item.status === 'Critical'
            const isLow = item.status === 'Low Stock'

            return (
              <motion.div
                key={item.type}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className={`bg-white rounded-2xl border p-6 shadow-card hover:shadow-soft transition-all duration-300 relative overflow-hidden flex flex-col justify-between ${
                  isCritical
                    ? 'border-red-300 ring-1 ring-red-300/50'
                    : isLow
                    ? 'border-amber-300'
                    : 'border-stone-200'
                }`}
              >
                {/* خلفية جمالية مائية */}
                <div
                  className={`absolute -bottom-8 -left-8 w-32 h-32 rounded-full blur-2xl pointer-events-none opacity-20 ${
                    isCritical ? 'bg-red-600' : isLow ? 'bg-amber-500' : 'bg-green-500'
                  }`}
                />

                <div>
                  {/* رأس البطاقة: نوع الفصيلة والحالة */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="w-14 h-14 rounded-2xl bg-crimson-600 text-white font-display font-extrabold text-2xl flex items-center justify-center shadow-md">
                      {item.type}
                    </span>

                    <span
                      className={`text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1 ${
                        isCritical
                          ? 'bg-red-100 text-red-700 border border-red-200 animate-pulse'
                          : isLow
                          ? 'bg-amber-100 text-amber-800 border border-amber-200'
                          : 'bg-green-100 text-green-800 border border-green-200'
                      }`}
                    >
                      {isCritical && <FiAlertTriangle />}
                      {item.statusAr}
                    </span>
                  </div>

                  <div className="mb-4">
                    <p className="font-display font-bold text-2xl text-ink">{item.units} كيس دم</p>
                    <p className="text-xs text-ink/50 mt-0.5">{item.name} (Units Available)</p>
                  </div>

                  {/* توافق التبرع والاستقبال */}
                  <div className="space-y-2 text-xs border-t border-stone-100 pt-3 text-ink/70">
                    <div className="flex justify-between">
                      <span className="text-ink/50">يعطي لفصائل:</span>
                      <strong className="text-ink">{item.canDonateTo.join(', ')}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-ink/50">يستقبل من:</span>
                      <strong className="text-ink">{item.canReceiveFrom.join(', ')}</strong>
                    </div>
                  </div>
                </div>

                {/* زر الطلب الفوري */}
                <div className="mt-6 pt-3 border-t border-stone-100">
                  <Link
                    to={`/request-blood?bloodType=${item.type}`}
                    className={`w-full py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors ${
                      isCritical
                        ? 'bg-crimson-600 hover:bg-crimson-700 text-white shadow-soft'
                        : 'bg-stone-100 hover:bg-stone-200 text-ink'
                    }`}
                  >
                    <FiDroplet /> طلب فصيلة {item.type}
                  </Link>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* إشعار الأمان الطبي المعتمد SAFETY NOTICE */}
        <div className="bg-stone-900 text-cream/90 rounded-2xl p-6 md:p-8 shadow-card border border-stone-800 flex flex-col md:flex-row items-start md:items-center gap-6 justify-between">
          <div className="flex items-start gap-4 max-w-3xl">
            <div className="w-12 h-12 rounded-xl bg-crimson-600/30 border border-crimson-500/30 text-crimson-300 flex items-center justify-center flex-shrink-0">
              <FiShield className="text-2xl" />
            </div>
            <div>
              <h3 className="font-display font-bold text-lg text-white mb-1">إشعار أمان طبي واختبارات الاعتماد</h3>
              <p className="text-xs md:text-sm text-cream/70 leading-relaxed">
                تخضع معلومات توفر الدم والمطابقة مع المتبرعين للتحقق والاعتماد المسبق من قبل مراكز بنك الدم والمستشفيات المعتمدة بمحافظة الدقهلية. التحديثات تهدف لتوجيه الحالات المحتاجة بكفاءة وسرعة.
              </p>
            </div>
          </div>

          <Link
            to="/find-blood"
            className="whitespace-nowrap bg-white text-ink hover:bg-stone-100 font-bold text-sm px-6 py-3 rounded-full transition-all flex items-center gap-2"
          >
            البحث عن الفصائل بالمستشفيات <FiArrowLeft />
          </Link>
        </div>
      </div>
    </div>
  )
}

export default BloodAvailability
