import { FiMapPin, FiPhone, FiClock, FiExternalLink } from 'react-icons/fi'
import { motion } from 'framer-motion'

// بطاقة عرض بيانات مستشفى أو بنك دم واحد
function HospitalCard({ hospital, index = 0 }) {
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${hospital.lat},${hospital.lng}`

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.4, delay: (index % 6) * 0.06 }}
      whileHover={{ y: -5 }}
      className="bg-white rounded-xl2 border border-stone-100 shadow-card hover:shadow-soft transition-shadow p-6 flex flex-col"
    >
      <h3 className="font-display font-bold text-lg text-ink mb-3">{hospital.name}</h3>

      <div className="space-y-2.5 text-sm text-ink/60 mb-6 flex-1">
        <p className="flex items-start gap-2">
          <FiMapPin className="text-crimson-500 mt-0.5 shrink-0" /> {hospital.address}
        </p>
        <p className="flex items-center gap-2">
          <FiPhone className="text-crimson-500 shrink-0" /> {hospital.phone}
        </p>
        <p className="flex items-center gap-2">
          <FiClock className="text-crimson-500 shrink-0" /> {hospital.hours}
        </p>
      </div>

      <div className="flex gap-3">
        <a
          href={mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 inline-flex items-center justify-center gap-1.5 bg-crimson-50 text-crimson-700 hover:bg-crimson-600 hover:text-white text-sm font-semibold rounded-full py-2.5 transition-colors"
        >
          <FiExternalLink /> فتح الموقع
        </a>
        <a
          href={`tel:${hospital.phone}`}
          className="flex-1 inline-flex items-center justify-center gap-1.5 bg-ink text-white hover:bg-crimson-700 text-sm font-semibold rounded-full py-2.5 transition-colors"
        >
          <FiPhone /> اتصال
        </a>
      </div>
    </motion.div>
  )
}

export default HospitalCard
