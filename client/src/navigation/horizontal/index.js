import {
  RiDashboard2Line
} from 'react-icons/ri'

export default [
  {
    id: "dashboard",
    title: "Dashboard",
    type: "item",
    icon: <RiDashboard2Line size={24} />,
    navLink: "/dashboard"
  },
  {
    id: "postcodes",
    title: "PostCodes",
    type: "item",
    icon: <RiDashboard2Line size={24} />,
    navLink: "/postcodes"
  },
  {
    id: "placenames",
    title: "Placenames",
    type: "item",
    icon: <RiDashboard2Line size={24} />,
    navLink: "/placenames"
  }
]
