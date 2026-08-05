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

  const refreshData = () => {
    initializeData()
    setRequests(getAllRequests())
    setNotifications(getNotifications())
  }

  useEffect(() => {
    refreshData()
  }, [])

  const unreadNotifsCount = notifications.filter((n) => !n.read).length

  const handleCreateRequest = (requestData) => {
    const newReq = createBloodRequest(requestData)
    refreshData()
    return newReq
  }

  const handleMarkAsRead = (id) => {
    const updated = markNotificationAsRead(id)
    setNotifications(updated)
  }

  const handleMarkAllAsRead = () => {
    const updated = markAllNotificationsAsRead()
    setNotifications(updated)
  }

  return (
    <BloodRequestContext.Provider
      value={{
        requests,
        notifications,
        unreadNotifsCount,
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
