import Hero from './Hero.jsx'
import BloodTypes from './BloodTypes.jsx'
import Services from './Services.jsx'
import Steps from './Steps.jsx'
import WhyChooseUs from './WhyChooseUs.jsx'
import FAQ from './FAQ.jsx'
import CTA from './CTA.jsx'

// الصفحة الرئيسية: تجمع كل أقسام الصفحة الأولى بالترتيب
function Home() {
  return (
    <>
      <Hero />
      <BloodTypes />
      <Services />
      <Steps />
      <WhyChooseUs />
      <FAQ />
      <CTA />
    </>
  )
}

export default Home
