# بنك الدم - محافظة الدقهلية 🩸

موقع ويب احترافي لبنك الدم بمحافظة الدقهلية، مبني باستخدام React و Vite و Tailwind CSS، يتيح للمواطنين حجز أكياس الدم، حجز موعد لمعرفة فصيلة الدم، وتصفح المستشفيات وبنوك الدم في المحافظة.

## المتطلبات

- تثبيت [Node.js](https://nodejs.org) الإصدار 18 أو أحدث.

## طريقة التشغيل

1. فك ضغط المشروع وافتح الطرفية (Terminal) داخل مجلد المشروع `blood-bank`.
2. ثبّت الحزم المطلوبة:

```bash
npm install
```

3. شغّل المشروع في وضع التطوير:

```bash
npm run dev
```

4. افتح المتصفح على الرابط الذي يظهر في الطرفية (عادة `http://localhost:5173`).

## أوامر إضافية

```bash
npm run build     # بناء نسخة الإنتاج داخل مجلد dist
npm run preview   # معاينة نسخة الإنتاج بعد البناء
```

## هيكل المشروع

```
blood-bank/
├── public/                # الملفات الثابتة (الأيقونة...)
├── src/
│   ├── home/               # كل مكونات الصفحة الرئيسية
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   ├── Hero.jsx
│   │   ├── BloodTypes.jsx
│   │   ├── Services.jsx
│   │   ├── Steps.jsx
│   │   ├── WhyChooseUs.jsx
│   │   ├── FAQ.jsx
│   │   ├── CTA.jsx
│   │   └── Home.jsx
│   ├── components/         # مكونات مشتركة (نموذج الحجز، بطاقة المستشفى)
│   │   ├── BookingForm.jsx
│   │   ├── HospitalCard.jsx
│   │   └── ScrollToTop.jsx
│   ├── pages/               # صفحات الحجز والمستشفيات
│   │   ├── Booking.jsx
│   │   └── Hospitals.jsx
│   ├── data/                 # بيانات تجريبية
│   │   ├── hospitals.js
│   │   └── bloodTypes.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── package.json
├── vite.config.js
├── tailwind.config.js
└── postcss.config.js
```

## المميزات

- ثلاث صفحات: الرئيسية، الحجز، والمستشفيات.
- دعم كامل للغة العربية واتجاه RTL.
- تصميم متجاوب مع جميع الأجهزة (موبايل، تابلت، لابتوب، ديسكتوب).
- نموذج حجز متكامل مع التحقق من صحة البيانات، ورفع صورة البطاقة الشخصية، وحفظ الطلبات في LocalStorage.
- عرض المستشفيات مع روابط مباشرة لفتح الموقع على خرائط جوجل والاتصال المباشر.
- أنيميشن خفيف واحترافي باستخدام Framer Motion.

## فتح المشروع في IntelliJ IDEA أو VS Code

يمكنك فتح مجلد `blood-bank` مباشرة كمشروع في IntelliJ IDEA (مع دعم JavaScript/TypeScript) أو Visual Studio Code، ثم تشغيل الأوامر أعلاه من الطرفية المدمجة في أي من المحررين دون أي إعدادات إضافية.
