import { motion } from 'framer-motion'
import {
  FiFileText,
  FiSearch,
  FiUserCheck,
  FiCheckSquare,
  FiCheckCircle,
  FiClock,
  FiCheck
} from 'react-icons/fi'

const stageIcons = {
  1: FiFileText,
  2: FiSearch,
  3: FiUserCheck,
  4: FiCheckSquare,
  5: FiCheckCircle
}

function RequestTimeline({ timeline, currentStatusCode = 1 }) {
  return (
    <div className="py-6">
      <div className="relative border-r-2 border-stone-200 mr-4 md:mr-8 space-y-8 pr-6 md:pr-10">
        {timeline.map((step) => {
          const Icon = stageIcons[step.code] || FiClock
          const isCompleted = step.completed || step.code < currentStatusCode
          const isCurrent = step.code === currentStatusCode

          return (
            <div key={step.code} className="relative group">
              {/* أيقونة حالة المرحلة */}
              <div
                className={`absolute -right-[35px] md:-right-[51px] top-0 w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center font-bold text-sm md:text-base transition-all duration-300 ${
                  isCompleted
                    ? 'bg-green-600 text-white shadow-md'
                    : isCurrent
                    ? 'bg-crimson-600 text-white ring-4 ring-crimson-100 shadow-lg animate-pulse'
                    : 'bg-stone-100 text-stone-400 border border-stone-300'
                }`}
              >
                {isCompleted ? <FiCheck className="text-lg" /> : <Icon />}
              </div>

              {/* بطاقة التفاصيل */}
              <motion.div
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                className={`p-4 md:p-5 rounded-2xl border transition-all ${
                  isCurrent
                    ? 'bg-crimson-50/50 border-crimson-200 shadow-card'
                    : isCompleted
                    ? 'bg-white border-stone-200'
                    : 'bg-stone-50/50 border-stone-200 opacity-60'
                }`}
              >
                <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                  <h4 className={`font-display font-bold text-base md:text-lg ${isCurrent ? 'text-crimson-900' : 'text-ink'}`}>
                    المرحلة {step.code}: {step.nameAr}
                  </h4>

                  <span className={`text-xs px-2.5 py-1 rounded-full font-bold flex items-center gap-1 ${
                    isCompleted
                      ? 'bg-green-100 text-green-800'
                      : isCurrent
                      ? 'bg-crimson-600 text-white'
                      : 'bg-stone-200 text-stone-600'
                  }`}>
                    <FiClock className="text-xs" /> {step.time}
                  </span>
                </div>

                <p className="text-xs md:text-sm text-ink/70 leading-relaxed">
                  {step.desc}
                </p>

                {isCurrent && (
                  <div className="mt-3 pt-2 border-t border-crimson-100 flex items-center gap-2 text-xs font-bold text-crimson-700">
                    <span className="w-2 h-2 rounded-full bg-crimson-600 animate-ping" />
                    المرحلة الحالية قيد المتابعة النشطة
                  </div>
                )}
              </motion.div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default RequestTimeline
