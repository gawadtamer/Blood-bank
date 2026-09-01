import { createContext, useContext, useState, useEffect } from 'react'
import {
  initializeData,
  getAllRequests,
  getNotifications,
  createBloodRequest,
  markNotificationAsRead,
  markAllNotificationsAsRead
} from '../services/bloodRequestService.js'

const BloodRequestContext = createContext()

export function BloodRequestProvider({ children }) {
  const [requests, setRequests] = useState([])
  const [notifications, setNotifications] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const refreshData = async () => {
    setLoading(true)
    setError(null)
    try {
      initializeData()
      const reqs = await getAllRequests()
      const notifs = await getNotifications()
      setRequests(reqs || [])
      setNotifications(notifs || [])
    } catch (err) {
      console.error('خطأ في استجلاب البيانات:', err)
      setError('حدث خطأ أثناء تحميل البيانات')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    refreshData()
  }, [])

  const unreadNotifsCount = notifications.filter((n) => !n.read).length

  const handleCreateRequest = async (requestData) => {
    setLoading(true)
    try {
      const newReq = await createBloodRequest(requestData)
      await refreshData()
      return newReq
    } catch (err) {
      console.error('خطأ في إنشاء الطلب:', err)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const handleMarkAsRead = async (id) => {
    try {
      const updated = await markNotificationAsRead(id)
      setNotifications(updated || [])
    } catch (err) {
      console.error('خطأ في تحديث الإشعار:', err)
    }
  }

  const handleMarkAllAsRead = async () => {
    try {
      const updated = await markAllNotificationsAsRead()
      setNotifications(updated || [])
    } catch (err) {
      console.error('خطأ في تحديث كافة الإشعارات:', err)
    }
  }

  return (
    <BloodRequestContext.Provider
      value={{
        requests,
        notifications,
        unreadNotifsCount,
        loading,
        error,
        createBloodRequest: handleCreateRequest,
        markNotificationAsRead: handleMarkAsRead,
        markAllNotificationsAsRead: handleMarkAllAsRead,
        refreshData
      }}
    >
      {children}
    </BloodRequestContext.Provider>
  )
}

export function useBloodRequest() {
  const context = useContext(BloodRequestContext)
  if (!context) {
    throw new Error('useBloodRequest must be used within a BloodRequestProvider')
  }
  return context
}
