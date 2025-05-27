module.exports = {
  MAIN_NAV: {
    HOME: {
      path: "/",
      label: "Home",
      icon: "home",
    },
    TASKS: {
      path: "/tasks",
      label: "My Tasks",
      icon: "list",
    },
    ADD_TASK: {
      path: "/tasks/create",
      label: "Add Task",
      icon: "plus",
    },
  },

  AUTH_NAV: {
    LOGIN: {
      path: "/auth/login",
      label: "Login",
      icon: "log-in",
    },
    REGISTER: {
      path: "/auth/register",
      label: "Register",
      icon: "user-plus",
    },
    LOGOUT: {
      path: "/auth/logout",
      label: "Logout",
      icon: "log-out",
    },
  },

  BREADCRUMBS: {
    HOME: "Home",
    TASKS: "Tasks",
    CREATE_TASK: "Create Task",
    LOGIN: "Login",
    REGISTER: "Register",
  },
}
