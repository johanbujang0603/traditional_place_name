import jwt_decode from "jwt-decode"

// ** Default Avatar Image
import adminAvatar from '@src/assets/images/avatars/admin_user.jpg'
import defaultAvatar from '@src/assets/images/avatars/avatar-blank.png'

// ** Checks if an object is empty (returns boolean)
export const isObjEmpty = obj => Object.keys(obj).length === 0

// ** Returns K format from a number
export const kFormatter = num => (num > 999 ? `${(num / 1000).toFixed(1)}k` : num)

// ** Returns throunds separaptor format from a number
export const numberWithCommas = (x) => {
  if (x) return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  else return 0
}

// ** Remove spaces from string
export const removeSpace = (str) => {
  return str.replace("-", "").replace(" ", "")
}

// ** Converts HTML to string
export const htmlToString = html => html.replace(/<\/?[^>]+(>|$)/g, '')

// ** Checks if the passed date is today
const isToday = date => {
  const today = new Date()
  return (
    /* eslint-disable operator-linebreak */
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
    /* eslint-enable */
  )
}

/**
 ** Format and return date in Humanize format
 ** Intl docs: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/format
 ** Intl Constructor: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat
 * @param {String} value date to format
 * @param {Object} formatting Intl object to format with
 */
export const formatDate = (value, formatting = { month: 'short', day: 'numeric', year: 'numeric' }) => {
  if (!value) return value
  return new Intl.DateTimeFormat('en-US', formatting).format(new Date(value))
}

// ** Returns short month of passed date
export const formatDateToMonthShort = (value, toTimeForCurrentDay = true) => {
  const date = new Date(value)
  let formatting = { month: 'short', day: 'numeric' }

  if (toTimeForCurrentDay && isToday(date)) {
    formatting = { hour: 'numeric', minute: 'numeric' }
  }

  return new Intl.DateTimeFormat('en-US', formatting).format(new Date(value))
}

/**
 ** Return if user is logged in
 ** This is completely up to you and how you want to store the token in your frontend application
 *  ? e.g. If you are using cookies to store the application please update this function
 */
export const isUserLoggedIn = () => {
  const userData = localStorage.getItem('userData') ? JSON.parse(localStorage.getItem('userData')) : null
  if (!userData || !userData.token) return false
  const date = new Date().getTime() / 1000
  const data = jwt_decode(userData.token)
  const tokenAvaialble = date < data.exp
  if (userData && tokenAvaialble) return true
  else return false
}
export const getUserData = () => JSON.parse(localStorage.getItem('userData'))

/**
 ** This function is used for demo purpose route navigation
 ** In real app you won't need this function because your app will navigate to same route for each users regardless of ability
 ** Please note role field is just for showing purpose it's not used by anything in frontend
 ** We are checking role just for ease
 * ? NOTE: If you have different pages to navigate based on user ability then this function can be useful. However, you need to update it.
 * @param {String} userRole Role of user
 */
export const getHomeRouteForLoggedInUser = userRole => {
  if (userRole === 'admin') return '/'
  if (userRole === 'client') return '/access-control'
  return '/login'
}

// ** React Select Theme Colors
export const selectThemeColors = theme => ({
  ...theme,
  colors: {
    ...theme.colors,
    primary25: '#e42f121a', // for option hover bg-color
    primary: '#e42f12', // for selected option bg-color
    neutral10: '#e42f12', // for tags bg-color
    neutral20: '#ededed', // for input border-color
    neutral30: '#ededed' // for input hover border-color
  }
})

// ** Get User Name from user data
export const getUserName = userData => {
  if (!userData) return ''
  if (userData.role === 'admin') return 'Administrator'
  if (userData.role === 'garage') return userData.details.garage_name
  if (userData.role === 'driver') return `${userData.details.first_name} ${userData.details.last_name}`
}

// ** Get User Role from user data
export const getUserRole = userData => {
  if (!userData) return ''
  if (userData.role === 'admin') return 'Administrator'
  if (userData.role === 'garage') return 'Garage'
  if (userData.role === 'driver') return 'Driver'
}

// ** Get User Avatar from user data
export const getUserAvatar = userData => {
  if (!userData) return defaultAvatar
  if (userData.role === 'admin') return adminAvatar
  if (userData.photo === null || userData.photo === 'null' || userData.photo === undefined || userData.photo === 'undefined') return defaultAvatar
  return `/uploads/${userData.photo}`
}

// ** Get Duration
export const getDuration = (mins) => {
  return mins < 1 ? `${Math.floor(mins * 60)} Seconds` : `${Math.floor(mins)} Minutes`
}

// ** Get Time Since
export const getTimeSince = (date) => {
  const seconds = Math.floor((new Date() - new Date(date)) / 1000)
  let interval = seconds / 31536000

  if (interval > 1) return `${Math.floor(interval)} years`
  interval = seconds / 2592000
  if (interval > 1) return `${Math.floor(interval)} months`
  interval = seconds / 604800
  if (interval > 1) return `${Math.floor(interval)} weeks`
  interval = seconds / 86400
  if (interval > 1) {
    if (Math.floor(interval) === 1) return `${Math.floor(interval)} day`
    return `${Math.floor(interval)} days`
  }
  interval = seconds / 3600
  if (interval > 1) return `${Math.floor(interval)} hours`
  interval = seconds / 60
  if (interval > 1) return `${Math.floor(interval)} mins`
  return `${Math.floor(interval)} seconds`
}

// ** Sort by datetime
export const sortByDate = (array) => {
  array.sort(function(a, b) {
    // Turn your strings into dates, and then subtract them
    // to get a value that is either negative, positive, or zero.
    return new Date(b.date) - new Date(a.date)
  })
  return array
}