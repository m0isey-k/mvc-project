const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString("en-US", {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  })
}

const formatDateTime = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleString("en-US", {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })
}

const isOverdue = (dateString) => {
  const now = new Date()
  const taskDate = new Date(dateString)
  return taskDate < now
}

const getDateClass = (task) => {
  if (task.status === "completed") return "completed"
  if (task.status === "overdue") return "overdue"
  return "pending"
}

const getTomorrowDateTime = () => {
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  tomorrow.setHours(12, 0, 0, 0) 
  return tomorrow.toISOString().slice(0, 16)
}

const getCurrentDateTime = () => {
  const now = new Date()
  return now.toISOString().slice(0, 16)
}

module.exports = {
  formatDate,
  formatDateTime,
  isOverdue,
  getDateClass,
  getTomorrowDateTime,
  getCurrentDateTime,
}
