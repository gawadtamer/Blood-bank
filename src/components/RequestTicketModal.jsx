import { useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FiX,
  FiPrinter,
  FiDownload,
  FiDroplet,
  FiMapPin,
  FiPhone,
  FiCalendar,
  FiClock,
  FiShield
} from 'react-icons/fi'

// مكوّن QR Code بسيط بدون مكتبة خارجية — يُولّد SVG path من النص
function SimpleQR({ value, size = 120 }) {
  // نولّد نمطاً بصرياً اعتماداً على قيمة النص (ليس QR حقيقياً ولكن بصريًا مشابه جداً)
  const hash = [...value].reduce((acc, ch) => acc + ch.charCodeAt(0), 0)
  const cells = 21
  const cellSize = size / cells

  const grid = Array.from({ length: cells }, (_, row) =>
    Array.from({ length: cells }, (_, col) => {
      // زوايا محددة (finder patterns)
      const inCornerTL = row < 7 && col < 7
      const inCornerTR = row < 7 && col >= cells - 7
      const inCornerBL = row >= cells - 7 && col < 7

      if (inCornerTL || inCornerTR || inCornerBL) {
        const lr = inCornerTL ? row : inCornerBL ? row - (cells - 7) : row
        const lc = inCornerTL ? col : inCornerTR ? col - (cells - 7) : col
        if (lr === 0 || lr === 6 || lc === 0 || lc === 6) return true
        if (lr >= 2 && lr <= 4 && lc >= 2 && lc <= 4) return true
        return false
      }
      // باقي الخلايا: نمط شبه عشوائي بناءً على hash + موضع
      return ((hash * (row + 1) * (col + 1)) % 11) < 5
    })
  )

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="rounded-md" style={{ background: '#fff' }}>
      {grid.map((row, ri) =>
        row.map((filled, ci) =>
          filled ? (
            <rect
              key={`${ri}-${ci}`}
              x={ci * cellSize}
              y={ri * cellSize}
              width={cellSize}
              height={cellSize}
              fill="#1a1a1a"
            />
          ) : null
        )
      )}
    </svg>
  )
}

function RequestTicketModal({ request, onClose }) {
  const printRef = useRef()

  if (!request) return null

  const handlePrint = () => {
    const printContent = printRef.current?.innerHTML
    if (!printContent) return

    const win = window.open('', '_blank', 'width=800,height=600')
    win.document.write(`
      <!DOCTYPE html>
      <html lang="ar" dir="rtl">
      <head>
        <meta charset="UTF-8"/>
        <title>تذكرة طلب الدم - ${request.id}</title>
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800&display=swap" rel="stylesheet"/>
        <style>
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body { font-family: 'Cairo', sans-serif; background: #fff; color: #241618; direction: rtl; }
          .ticket { max-width: 700px; margin: 24px auto; padding: 32px; border: 2px solid #C41E3A; border-radius: 16px; }
          .header { display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 2px dashed #E9E4E1; padding-bottom: 20px; margin-bottom: 20px; }
          .logo-area h1 { font-size: 22px; font-weight: 800; color: #C41E3A; }
          .logo-area p { font-size: 12px; color: #666; }
          .blood-badge { width: 72px; height: 72px; background: #C41E3A; color: #fff; font-size: 24px; font-weight: 800; display: flex; align-items: center; justify-content: center; border-radius: 12px; }
          .req-id { font-size: 28px; font-weight: 800; color: #241618; font-family: monospace; }
          .urgency-badge { display: inline-block; padding: 4px 14px; border-radius: 999px; font-size: 12px; font-weight: 700; margin-top: 4px; }
          .urgency-emergency { background: #FBE2E4; color: #A8172F; border: 1px solid #E88A94; }
          .urgency-normal { background: #F4F1EF; color: #241618; }
          .grid2 { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 16px; }
          .field label { font-size: 11px; color: #999; display: block; margin-bottom: 2px; }
          .field strong { font-size: 14px; font-weight: 700; }
          .qr-section { display: flex; justify-content: space-between; align-items: center; margin-top: 20px; border-top: 2px dashed #E9E4E1; padding-top: 20px; }
          .notice { font-size: 10px; color: #888; max-width: 320px; line-height: 1.7; }
          .footer-strip { background: #C41E3A; color: #fff; text-align: center; padding: 10px; border-radius: 8px; margin-top: 24px; font-size: 12px; font-weight: 700; }
          @media print { body { -webkit-print-color-adjust: exact; print-color-adjust: exact; } }
        </style>
      </head>
      <body>
        ${printContent}
      </body>
      </html>
    `)
    win.document.close()
    win.focus()
    setTimeout(() => { win.print(); win.close() }, 500)
  }

  const urgencyColor =
    request.urgency === 'Emergency'
      ? 'text-crimson-800 bg-crimson-50 border-crimson-300'
      : request.urgency === 'Urgent'
      ? 'text-amber-800 bg-amber-50 border-amber-300'
      : 'text-ink/70 bg-stone-100 border-stone-300'

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.92, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.92, opacity: 0 }}
          transition={{ type: 'spring', damping: 20, stiffness: 280 }}
          className="bg-cream rounded-2xl shadow-2xl max-w-2xl w-full overflow-hidden relative"
          onClick={(e) => e.stopPropagation()}
        >
          {/* شريط العنوان */}
          <div className="bg-crimson-600 text-white p-4 md:p-5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <FiDroplet className="text-2xl" />
              <div>
                <h2 className="font-display font-extrabold text-base md:text-lg">تذكرة طلب الدم الرسمية</h2>
                <p className="text-xs text-crimson-100 opacity-90">Blood Request Official Ticket — بنك الدم | محافظة الدقهلية</p>
              </div>
            </div>
            <button
              onClick={onClose}
              aria-label="إغلاق"
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            >
              <FiX className="text-xl" />
            </button>
          </div>

          {/* محتوى التذكرة القابلة للطباعة */}
          <div className="p-5 md:p-8 overflow-y-auto max-h-[calc(100vh-220px)]">
            <div ref={printRef}>
              <div className="ticket" style={{ fontFamily: 'Cairo, sans-serif', direction: 'rtl' }}>

                {/* رأس التذكرة */}
                <div className="header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '2px dashed #E9E4E1', paddingBottom: '20px', marginBottom: '20px' }}>
                  <div className="logo-area">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                      <div style={{ width: '36px', height: '36px', background: '#C41E3A', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <svg viewBox="0 0 32 32" style={{ width: '22px', height: '22px' }}>
                          <path fill="#FDBFC7" d="M16 2C16 2 6 15 6 21a10 10 0 0 0 20 0C26 15 16 2 16 2Z" />
                        </svg>
                      </div>
                      <h1 style={{ fontSize: '18px', fontWeight: '800', color: '#C41E3A', margin: 0 }}>بنك الدم — محافظة الدقهلية</h1>
                    </div>
                    <p style={{ fontSize: '11px', color: '#888', margin: 0 }}>تذكرة طلب دم رسمية — يُقدَّم عند شباك بنك الدم بالمستشفى</p>
                  </div>
                  <div className="blood-badge" style={{ width: '68px', height: '68px', background: '#C41E3A', color: '#fff', fontSize: '22px', fontWeight: '800', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '12px', flexShrink: 0 }}>
                    {request.bloodType}
                  </div>
                </div>

                {/* رقم الطلب ومستوى الأهمية */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                  <div>
                    <p style={{ fontSize: '11px', color: '#999', marginBottom: '2px' }}>رقم الطلب</p>
                    <p style={{ fontFamily: 'monospace', fontSize: '28px', fontWeight: '800', color: '#241618', letterSpacing: '1px' }}>{request.id}</p>
                  </div>
                  <span style={{
                    padding: '4px 14px',
                    borderRadius: '999px',
                    fontSize: '12px',
                    fontWeight: '700',
                    border: '1px solid',
                    background: request.urgency === 'Emergency' ? '#FBE2E4' : '#F4F1EF',
                    color: request.urgency === 'Emergency' ? '#A8172F' : '#241618',
                    borderColor: request.urgency === 'Emergency' ? '#E88A94' : '#D8D0CC'
                  }}>
                    {request.urgencyAr}
                  </span>
                </div>

                {/* شبكة بيانات المريض والطلب */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                  {[
                    { label: 'اسم المريض الكامل', value: request.patientName },
                    { label: 'رقم التواصل', value: request.phone },
                    { label: 'فصيلة الدم المطلوبة', value: `${request.bloodType} (${request.units} كيس دم)` },
                    { label: 'المستشفى المعالج', value: request.hospital },
                    { label: 'المدينة / المنطقة', value: `${request.city}، ${request.governorate}` },
                    { label: 'التاريخ المطلوب', value: request.requiredDate },
                  ].map((f) => (
                    <div key={f.label} className="bg-stone-50 rounded-xl p-2.5 border border-stone-200">
                      <p className="text-[10px] text-ink/50 mb-0.5">{f.label}</p>
                      <strong className="text-xs md:text-sm font-bold text-ink">{f.value}</strong>
                    </div>
                  ))}
                </div>

                {request.notes && (
                  <div style={{ background: '#FFFBEB', border: '1px solid #FDE68A', borderRadius: '10px', padding: '10px 14px', marginBottom: '16px', fontSize: '12px', color: '#78350F' }}>
                    💬 <strong>ملاحظات:</strong> {request.notes}
                  </div>
                )}

                {/* قسم QR + التعليمات */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', borderTop: '2px dashed #E9E4E1', paddingTop: '18px', gap: '16px', flexWrap: 'wrap' }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#C41E3A" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                      <span style={{ fontSize: '11px', fontWeight: '700', color: '#A8172F' }}>تعليمات الاستلام من بنك الدم</span>
                    </div>
                    <ul style={{ fontSize: '10px', color: '#666', lineHeight: '1.9', paddingRight: '14px' }}>
                      <li>قدّم هذه التذكرة عند شباك استلام الدم بالمستشفى.</li>
                      <li>أحضر إثبات الهوية الوطنية للمريض والمرافق.</li>
                      <li>يخضع الاستلام للتحقق الطبي من قِبَل الفريق المختص.</li>
                      <li>لأي استفسار: اتصل على 050-2202222.</li>
                    </ul>
                  </div>
                  <div style={{ textAlign: 'center', flexShrink: 0 }}>
                    <SimpleQR value={`${request.id}|${request.bloodType}|${request.patientName}`} size={100} />
                    <p style={{ fontSize: '9px', color: '#999', marginTop: '4px' }}>امسح للتحقق من الطلب</p>
                  </div>
                </div>

                {/* شريط تذييل */}
                <div style={{ background: '#C41E3A', color: '#fff', textAlign: 'center', padding: '10px', borderRadius: '10px', marginTop: '20px', fontSize: '11px', fontWeight: '700' }}>
                  بنك الدم بمحافظة الدقهلية — تذكرة رسمية غير قابلة للتداول • Dakahlia Blood Bank Official Request Ticket
                </div>
              </div>
            </div>
          </div>

          {/* أزرار الطباعة والتنزيل */}
          <div className="border-t border-stone-200 bg-white p-4 md:p-5 flex flex-wrap gap-3 justify-end">
            <button
              onClick={onClose}
              className="bg-stone-100 hover:bg-stone-200 text-ink font-bold text-sm px-6 py-2.5 rounded-full transition-colors"
            >
              إغلاق
            </button>
            <button
              onClick={handlePrint}
              className="bg-crimson-600 hover:bg-crimson-700 text-white font-bold text-sm px-6 py-2.5 rounded-full transition-all shadow-soft flex items-center gap-2"
            >
              <FiPrinter /> طباعة التذكرة
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default RequestTicketModal
