import { motion } from 'framer-motion'
import { FiSearch } from 'react-icons/fi'
import { useState } from 'react'
import { hospitals } from '../data/hospitals.js'
import HospitalCard from '../components/HospitalCard.jsx'

// صفحة المستشفيات: عرض قائمة المستشفيات وبنوك الدم بالدقهلية مع بحث بسيط
function Hospitals() {
  const [query, setQuery] = useState('')

  const filtered = hospitals.filter(
    (h) =>
      h.name.includes(query) ||
      h.address.includes(query)
  )

  return (
    <section className="py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto mb-10"
        >
          <span className="text-crimson-600 font-bold text-sm">المستشفيات وبنوك الدم</span>
          <h1 className="font-display font-extrabold text-3xl md:text-4xl text-ink mt-3 mb-4">
            أقرب مستشفى وبنك دم إليك بالدقهلية
          </h1>
          <p className="text-ink/60 leading-7">
            تصفح قائمة المستشفيات وبنوك الدم بمدينة المنصورة ومراكز محافظة الدقهلية.
          </p>
        </motion.div>

        <div className="relative max-w-md mx-auto mb-12">
          <FiSearch className="absolute top-1/2 -translate-y-1/2 right-4 text-ink/40" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="ابحث عن مستشفى أو منطقة..."
            className="w-full rounded-full border border-stone-200 bg-stone-50 focus:bg-white focus:border-crimson-400 outline-none pr-11 pl-5 py-3 text-sm transition-colors"
          />
        </div>

        {filtered.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((h, i) => (
              <HospitalCard key={h.id} hospital={h} index={i} />
            ))}
          </div>
        ) : (
          <p className="text-center text-ink/50 py-16">لا توجد نتائج مطابقة لبحثك.</p>
        )}
      </div>
    </section>
  )
}

export default Hospitals
