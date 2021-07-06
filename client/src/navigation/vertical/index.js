import { Mail, Home } from 'react-feather'
import { 
  RiCalendarTodoFill,
  RiDashboard2Line,
  RiBuilding2Line,
  RiCarLine,
  RiMessage3Line,
  RiSettings3Line,
  RiToolsFill
} from 'react-icons/ri'
import { HiOutlineUsers, HiOutlineDocumentReport } from 'react-icons/hi'
import { FiAlertTriangle } from 'react-icons/fi'

export default [
  {
    id: "dashboard",
    title: "Dashboard",
    type: "item",
    icon: <RiDashboard2Line size={24} />,
    permissions: ["admin", "garage", "driver"],
    navLink: "/dashboard"
  },
  {
    id: "garages",
    title: "Garages",
    type: "item",
    icon: <RiBuilding2Line size={24} />,
    permissions: ["admin"],
    navLink: "/garages"
  },
  {
    id: "drivers",
    title: "Drivers",
    type: "item",
    icon: <HiOutlineUsers size={24} />,
    permissions: ["admin"],
    navLink: "/drivers"
  },
  {
    id: "vehicles",
    title: "Vehicles",
    type: "item",
    icon: <RiCarLine size={24} />,
    permissions: ["admin"],
    navLink: "/vehicles"
  },
  {
    id: "inspections",
    title: "Services",
    type: "item",
    icon: <HiOutlineDocumentReport size={24} />,
    permissions: ["admin", "garage", "driver"],
    navLink: "/inspections"
  },
  {
    id: "calendar",
    title: "Calendar",
    type: "item",
    icon: <RiCalendarTodoFill size={24} />,
    permissions: ["admin", "garage", "driver"],
    navLink: "/calendar"
  },
  {
    id: "messages",
    title: "Messages",
    type: "item",
    icon: <RiMessage3Line size={24} />,
    permissions: ["admin", "driver"],
    navLink: "/messages"
  },
  {
    id: "alerts",
    title: "Alerts",
    type: "item",
    icon: <FiAlertTriangle size={24} />,
    permissions: ["admin", "driver", "garage"],
    navLink: "/alerts"
  }
]
