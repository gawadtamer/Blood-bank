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
            منصة إلكترونية تهدف لتسهيل حجز أكياس الدم ومعرفة فصيلة الدم لأهالي محافظة الدقهلية،
            وربطهم بأقرب المستشفيات وبنوك الدم.
          </p>
        </div>

        <div>
          <h4 className="font-display font-bold text-white mb-4">روابط سريعة</h4>
          <ul className="space-y-2.5 text-sm text-cream/60">
            <li><Link to="/" className="hover:text-crimson-300 transition-colors">الرئيسية</Link></li>
            <li><Link to="/booking" className="hover:text-crimson-300 transition-colors">حجز موعد</Link></li>
            <li><Link to="/hospitals" className="hover:text-crimson-300 transition-colors">المستشفيات وبنوك الدم</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-display font-bold text-white mb-4">فصائل الدم</h4>
          <ul className="grid grid-cols-4 gap-2 text-sm text-cream/60 type-tick">
            {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((t) => (
              <li key={t} className="text-center bg-white/5 rounded-lg py-1.5">{t}</li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-display font-bold text-white mb-4">تواصل معنا</h4>
          <ul className="space-y-3 text-sm text-cream/60">
            <li className="flex items-center gap-2"><FiPhone className="text-crimson-300" /> 050-2202222</li>
            <li className="flex items-center gap-2"><FiMail className="text-crimson-300" /> info@dakahlia-bloodbank.eg</li>
            <li className="flex items-center gap-2"><FiMapPin className="text-crimson-300" /> المنصورة، محافظة الدقهلية</li>
          </ul>
          <div className="flex gap-3 mt-4">
            {[FiFacebook, FiInstagram, FiTwitter].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="h-9 w-9 flex items-center justify-center rounded-full bg-white/5 hover:bg-crimson-600 transition-colors"
                aria-label="رابط تواصل اجتماعي"
              >
                <Icon />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 py-5 text-center text-xs text-cream/40">
        © {year} بنك الدم بمحافظة الدقهلية. جميع الحقوق محفوظة.
      </div>
    </footer>
  )
}

export default Footer
