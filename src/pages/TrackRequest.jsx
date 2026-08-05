import { useState, useEffect } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  FiSearch,
  FiClock,
  FiDroplet,
  FiPrinter,
  FiAlertCircle,
  FiCheckCircle,
  FiArrowLeft
} from 'react-icons/fi'
import { getRequestStatus } from '../services/bloodRequestService.js'
import { useBloodRequest } from '../context/BloodRequestContext.jsx'
import RequestTimeline from '../components/RequestTimeline.jsx'
import DonorMatchingSection from '../components/DonorMatchingSection.jsx'
import RequestTicketModal from '../components/RequestTicketModal.jsx'

function TrackRequest() {
  const [searchParams] = useSearchParams()
  const { requests } = useBloodRequest()

  const [searchId, setSearchId] = useState('')
  const [activeRequest, setActiveRequest] = useState(null)
  const [errorMsg, setErrorMsg] = useState('')
  const [showTicket, setShowTicket] = useState(false)

  const handleLookup = (idToSearch) => {
    const target = idToSearch || searchId
    if (!target.trim()) return

    const found = getRequestStatus(target)
    if (found) {
      setActiveRequest(found)
      setErrorMsg('')
    } else {
      setActiveRequest(null)
      setErrorMsg(`لم يتم العثور على طلب برقم (${target}). يرجى التأكد من كتابة الرقم بشكل صحيح.`)
    }
  }

  useEffect(() => {
    const queryId = searchParams.get('id')
    if (queryId) {
      setSearchId(queryId)
      handleLookup(queryId)
    } else if (requests.length > 0) {
      setActiveRequest(requests[0])
      setSearchId(requests[0].id)
    }
  }, [searchParams, requests])

  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-50 to-cream py-10 md:py-16">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        {/* عنوان الصفحة */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="inline-flex items-center gap-2 bg-crimson-50 text-crimson-700 text-xs md:text-sm font-semibold px-4 py-1.5 rounded-full mb-3">
            <FiClock /> المتابعة الفورية للطلبات (Request Tracking)
          </span>
          <h1 className="font-display font-extrabold text-3xl md:text-5xl text-ink mb-4">
            تتبع حالة طلب الدم <span className="text-crimson-600">(Track Request)</span>
          </h1>
          <p className="text-ink/70 text-base md:text-lg leading-relaxed">
            أدخل رقم الطلب المكون من ٤ أرقام (مثال REQ-9482) لمعرفة المرحلة الحالية وتفاصيل التنسيق مع بنك الدم.
          </p>
        </div>

        {/* البحث عن طلب */}
        <div className="max-w-2xl mx-auto bg-white rounded-2xl p-4 md:p-6 shadow-soft border border-stone-200 mb-10">
          <form
            onSubmit={(e) => {
              e.preventDefault()
              handleLookup()
            }}
            className="flex gap-2"
          >
            <div className="relative flex-1">
              <FiSearch className="absolute right-3.5 top-3.5 text-ink/40 text-lg" />
              <input
                type="text"
                placeholder="أدخل رقم الطلب (مثال: REQ-9482)..."
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)}
                className="w-full pr-10 pl-4 py-3 rounded-xl border border-stone-200 bg-cream/40 focus:outline-none focus:ring-2 focus:ring-crimson-200 font-mono text-sm uppercase"
              />
            </div>
            <button
              type="submit"
              aria-label="تتبع الطلب"
              className="bg-crimson-600 hover:bg-crimson-700 text-white font-bold px-6 py-3 rounded-xl transition-colors shadow-soft text-sm flex items-center gap-1.5"
            >
              <FiSearch /> تتبع الطلب
            </button>
          </form>

          {/* وسوم سريعة للطلبات النشطة */}
          {requests.length > 0 && (
            <div className="mt-4 pt-3 border-t border-stone-100 flex items-center gap-2 flex-wrap">
              <span className="text-xs text-ink/50">طلباتك الحالية:</span>
              {requests.slice(0, 3).map((r) => (
                <button
                  key={r.id}
                  onClick={() => {
                    setSearchId(r.id)
                    handleLookup(r.id)
                  }}
                  className={`text-xs font-mono font-bold px-2.5 py-1 rounded-lg border transition-colors ${
                    activeRequest?.id === r.id
                      ? 'bg-crimson-600 text-white border-crimson-700'
                      : 'bg-stone-100 text-ink border-stone-200 hover:bg-stone-200'
                  }`}
                >
                  {r.id} ({r.bloodType})
                </button>
              ))}
            </div>
          )}

          {errorMsg && (
            <p className="text-xs text-red-600 mt-3 flex items-center gap-1">
              <FiAlertCircle /> {errorMsg}
            </p>
          )}
        </div>

        {/* عرض تفاصيل الطلب والتسلسل الزمني */}
        {activeRequest ? (
          <div className="space-y-8">
            {/* بطاقة معلومات الطلب */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className={`bg-white rounded-2xl border shadow-soft p-6 md:p-8 ${
                activeRequest.urgency === 'Emergency' ? 'border-crimson-500 ring-2 ring-crimson-500/20' : 'border-stone-200'
              }`}
            >
              <div className="flex flex-wrap items-center justify-between gap-4 mb-6 border-b border-stone-100 pb-4">
                <div className="flex items-center gap-3">
                  <span className="w-14 h-14 rounded-2xl bg-crimson-600 text-white font-display font-extrabold text-2xl flex items-center justify-center shadow-md">
                    {activeRequest.bloodType}
                  </span>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-lg text-ink">{activeRequest.id}</span>
                      <span
                        className={`text-xs font-bold px-3 py-0.5 rounded-full ${
                          activeRequest.urgency === 'Emergency'
                            ? 'bg-crimson-100 text-crimson-800 animate-pulse border border-crimson-300'
                            : 'bg-stone-100 text-ink/70'
                        }`}
                      >
                        {activeRequest.urgencyAr}
                      </span>
                    </div>
                    <h2 className="font-display font-extrabold text-xl text-ink mt-0.5">{activeRequest.patientName}</h2>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-left">
                    <span className="text-xs text-ink/50 block">الحالة الحالية</span>
                    <span className="inline-flex items-center gap-1.5 bg-crimson-50 text-crimson-700 font-bold text-sm px-3.5 py-1.5 rounded-full border border-crimson-200">
                      <FiCheckCircle /> {activeRequest.statusAr}
                    </span>
                  </div>
                  {/* زر طباعة التذكرة */}
                  <button
                    onClick={() => setShowTicket(true)}
                    aria-label="طباعة تذكرة الطلب"
                    title="طباعة / تنزيل تذكرة الطلب مع QR"
                    className="flex items-center gap-2 bg-white border-2 border-crimson-600 text-crimson-700 hover:bg-crimson-600 hover:text-white font-bold text-xs md:text-sm px-4 py-2.5 rounded-full transition-all shadow-sm"
                  >
                    <FiPrinter className="text-base" />
                    <span className="hidden sm:inline">طباعة التذكرة</span>
                  </button>
                </div>
              </div>

              {/* شبكة تفاصيل الطلب */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-stone-50/70 rounded-xl p-4 border border-stone-200 text-sm">
                <div>
                  <span className="text-xs text-ink/50 block">عدد الكؤوس / الأكياس</span>
                  <strong className="text-ink font-bold">{activeRequest.units} كيس دم</strong>
                </div>
                <div>
                  <span className="text-xs text-ink/50 block">المستشفى المعالج</span>
                  <strong className="text-ink font-bold">{activeRequest.hospital}</strong>
                </div>
                <div>
                  <span className="text-xs text-ink/50 block">رقم للتواصل</span>
                  <strong className="text-ink font-bold">{activeRequest.phone}</strong>
                </div>
                <div>
                  <span className="text-xs text-ink/50 block">التاريخ المطلوب</span>
                  <strong className="text-ink font-bold">{activeRequest.requiredDate}</strong>
                </div>
              </div>

              {activeRequest.notes && (
                <p className="text-xs text-ink/70 mt-4 bg-amber-50/50 p-3 rounded-lg border border-amber-200/60">
                  💬 <strong>ملاحظات المريض:</strong> {activeRequest.notes}
                </p>
              )}
            </motion.div>

            {/* التسلسل الزمني Progress Timeline */}
            <div className="bg-white rounded-2xl border border-stone-200 p-6 md:p-8 shadow-card">
              <h3 className="font-display font-extrabold text-xl text-ink mb-6 border-b border-stone-100 pb-3 flex items-center gap-2">
                <FiClock className="text-crimson-600" /> مراحل تقدم ومتابعة الطلب (Progress Timeline)
              </h3>
              <RequestTimeline timeline={activeRequest.timeline} currentStatusCode={activeRequest.statusCode} />
            </div>

            {/* المطابقة مع المتبرعين */}
            <DonorMatchingSection bloodType={activeRequest.bloodType} city={activeRequest.city} />
          </div>
        ) : (
          /* حالة عدم وجود طلب مختار */
          <div className="bg-white rounded-2xl border border-stone-200 p-8 text-center max-w-xl mx-auto shadow-card">
            <FiDroplet className="text-5xl text-crimson-400 mx-auto mb-4" />
            <h3 className="font-display font-bold text-xl text-ink mb-2">يرجى كتابة رقم الطلب للتتبع</h3>
            <p className="text-sm text-ink/60 mb-6">
              إذا لم تكن تملك رقم طلب، يمكنك تقديم طلب جديد كلياً في خطوات بسيطة.
            </p>
            <Link
              to="/request-blood"
              className="inline-flex items-center gap-2 bg-crimson-600 hover:bg-crimson-700 text-white font-bold px-6 py-3 rounded-full transition-all shadow-soft text-sm"
            >
              تقديم طلب دم جديد <FiArrowLeft />
            </Link>
          </div>
        )}
      </div>

      {/* مودال التذكرة */}
      {showTicket && (
        <RequestTicketModal
          request={activeRequest}
          onClose={() => setShowTicket(false)}
        />
      )}
    </div>
  )
}

export default TrackRequest
