const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString("en-US")
}

const isOverdue = (dateString) => {
  const today = new Date().toISOString().split("T")[0]
  return dateString < today
}

const getDateClass = (task) => {
  if (task.status === "completed") return "completed"
  if (task.status === "overdue") return "overdue"
  return "pending"
}

const getTomorrowDate = () => {
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  return tomorrow.toISOString().split("T")[0]
}

module.exports = {
  formatDate,
  isOverdue,
  getDateClass,
  getTomorrowDate,
}
