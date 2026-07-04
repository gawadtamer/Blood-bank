import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

// يعيد التمرير لأعلى الصفحة عند الانتقال بين الصفحات
function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname])

  return null
}

export default ScrollToTop
