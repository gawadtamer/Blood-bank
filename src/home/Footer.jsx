import { Link } from 'react-router-dom'
import { FiPhone, FiMapPin, FiMail, FiFacebook, FiInstagram, FiTwitter } from 'react-icons/fi'

// تذييل الصفحة يظهر في كل صفحات الموقع
function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-ink text-cream/90 mt-24">
      <div className="max-w-7xl mx-auto px-5 md:px-8 py-14 grid gap-10 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2.5 mb-4">
            <svg viewBox="0 0 32 32" className="h-8 w-8">
              <path fill="#E88A94" d="M16 2C16 2 6 15 6 21a10 10 0 0 0 20 0C26 15 16 2 16 2Z" />
            </svg>
            <span className="font-display font-bold text-lg text-white">بنك الدم</span>
          </div>
          <p className="text-sm leading-7 text-cream/60">
            منصة إلكترونية تهدف لتسهيل حجز أكياس الدم وتلقي طلبات الطوارئ لأهالي محافظة الدقهلية،
            وربطهم بأقرب المستشفيات وبنوك الدم وشبكة المتبرعين.
          </p>
        </div>

        <div>
          <h4 className="font-display font-bold text-white mb-4">خدمات المرضى والطوارئ</h4>
          <ul className="space-y-2.5 text-sm text-cream/60">
            <li><Link to="/request-blood" className="hover:text-crimson-300 transition-colors">طلب كيس دم (Request Blood)</Link></li>
            <li><Link to="/find-blood" className="hover:text-crimson-300 transition-colors">البحث عن دم (Find Blood)</Link></li>
            <li><Link to="/availability" className="hover:text-crimson-300 transition-colors">توفر فصائل الدم (Availability)</Link></li>
            <li><Link to="/track-request" className="hover:text-crimson-300 transition-colors">تتبع حالة الطلب (Track Status)</Link></li>
            <li><Link to="/campaigns" className="hover:text-crimson-300 transition-colors">حملات التبرع الميدانية</Link></li>
            <li><Link to="/map" className="hover:text-crimson-300 transition-colors">خريطة المستشفيات التفاعلية</Link></li>
            <li><Link to="/dashboard" className="hover:text-crimson-300 transition-colors">لوحة تحكم المريض (Dashboard)</Link></li>
            <li><Link to="/hospitals" className="hover:text-crimson-300 transition-colors">المستشفيات وبنوك الدم</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-display font-bold text-white mb-4">فصائل الدم المتاحة</h4>
          <ul className="grid grid-cols-4 gap-2 text-sm text-cream/60 type-tick">
            {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map((t) => (
              <li key={t}>
                <Link to={`/find-blood?bloodType=${t}`} className="block text-center bg-white/5 hover:bg-crimson-600 hover:text-white transition-colors rounded-lg py-1.5 font-bold">
                  {t}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-display font-bold text-white mb-4">تواصل معنا والطوارئ</h4>
          <ul className="space-y-3 text-sm text-cream/60">
            <li className="flex items-center gap-2"><FiPhone className="text-crimson-300" /> طوارئ الدقهلية: 050-2202222</li>
            <li className="flex items-center gap-2"><FiMail className="text-crimson-300" /> info@dakahlia-bloodbank.eg</li>
            <li className="flex items-center gap-2"><FiMapPin className="text-crimson-300" /> المنصورة، محافظة الدقهلية</li>
          </ul>
          <div className="flex gap-3 mt-4">
            {[FiFacebook, FiInstagram, FiTwitter].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="h-9 w-9 flex items-center justify-center rounded-full bg-white/5 hover:bg-crimson-600 transition-colors text-white"
                aria-label="رابط تواصل اجتماعي"
              >
                <Icon />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 py-5 text-center text-xs text-cream/40">
        © {year} بنك الدم بمحافظة الدقهلية - جميع الحقوق محفوظة | جميع العمليات الطبية تحت إشراف المراكز المعتمدة.
      </div>
    </footer>
  )
}

export default Footer
