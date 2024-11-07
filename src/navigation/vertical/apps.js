// ** Icons Import
import { AccessAlarms, Battery60, ConfirmationNumber, ElectricScooter, Inventory2, Lock, LockOpen, NotificationAdd, NotificationsActive, Password, Subscript, Subscriptions } from "@mui/icons-material";
import { Home, Circle, Users, Shield, AlertCircle, Bell, Map, Layers, Settings } from "react-feather";

export default [
  {
    id: "companies",
    title: "Companies",
    icon: <Home size={20} />,
    navLink: "/apps/companies/list",
  },
  {
    id: "scooters",
    title: "Scooters",
    icon: <ElectricScooter size={20} />,
    children: [
      {
        id: "scooterList",
        title: "Scooter List",
        icon: <Circle size={12} />,
        navLink: "/apps/scooter/list",
      },
      {
        id: "modalList",
        title: "Models List",
        icon: <Circle size={12} />,
        navLink: "/apps/scooter/models-list",
      },
      {
        id: "scooterMap",
        title: "Map",
        icon: <Circle size={12} />,
        navLink: "/apps/scooter/map",
      },
    ],
  },

  {
    id: "clients",
    title: "Clients",
    icon: <Users size={20} />,
    navLink: "/apps/clients/list",
  },

  {
    id: "orders",
    title: "Orders",
    icon: <Inventory2 size={20} />,
    navLink: "/apps/orders/list",
  },

  {
    id: "alerts",
    title: "Alerts",
    icon: <AccessAlarms size={20} />,
    navLink: "/apps/alerts/list",
  },

  {
    id: "areas",
    title: "Areas",
    icon: <Map size={20} />,
    navLink: "/apps/areas/list",
  },

  {
    id: "subscriptions",
    title: "Subscriptions",
    icon: <Subscriptions size={20} />,
    children: [
      {
        id: "SubscriptionsList",
        title: "Subscriptions",
        icon: <Circle size={12} />,
        navLink: "/apps/subscriptions/list",
      },
      {
        id: "userPurchases",
        title: "User Purchases",
        icon: <Circle size={12} />,
        navLink: "/apps/subscriptions/user-purchases",
      },
    ],
  },

  {
    id: "batteries",
    title: "Batteries",
    icon: <Battery60 size={20} />,
    children: [
      {
        id: "batteriesList",
        title: "batteries",
        icon: <Circle size={12} />,
        navLink: "/apps/batteries/list",
      },
      {
        id: "batteriesModels",
        title: "Batteries Models",
        icon: <Circle size={12} />,
        navLink: "/apps/batteries/batteries-models-list",
      },
      {
        id: "batteriesStorages",
        title: "Batteries Storages",
        icon: <Circle size={12} />,
        navLink: "/apps/batteries/batteries-storages-list",
      },
    ],
  },

  {
    id: "notifications",
    title: "Notifications",
    icon: <Bell size={20} />,
    children: [
      {
        id: "inbox",
        title: "Inbox messages",
        icon: <Circle size={12} />,
        navLink: "/apps/notifications/inbox-messages",
      },
      {
        id: "rideFeedback",
        title: "Ride Feedback",
        icon: <Circle size={12} />,
        navLink: "/apps/notifications/ride-feedback",
      },
    ],
  },

  {
    id: "promoCode",
    title: "Promo Codes",
    icon: <ConfirmationNumber size={20} />,
    navLink: "/apps/promo-codes/list",
  },
  {
    id: "logs",
    title: "Logs",
    icon: <Layers size={20} />,
    children: [
      {
        id: "deviceStatus",
        title: "Device status",
        icon: <Circle size={12} />,
        navLink: "/apps/logs/device-status-changes",
      },
      {
        id: "userBalance",
        title: "User balance",
        icon: <Circle size={12} />,
        navLink: "/apps/logs/user-balance-changes",
      },
      {
        id: "batteryStatus",
        title: "Battery status",
        icon: <Circle size={12} />,
        navLink: "/apps/logs/battery-status-changes",
      },
    ],
  },

  {
    id: "adminManagement",
    title: "Admin Management",
    icon: <Lock size={20} />,
    children: [
      {
        id: "roles",
        title: "Roles & Permissions",
        icon: <Shield size={12} />,
        navLink: "/apps/roles",
      },
      {
        id: "employees",
        title: "Managers",
        icon: <Circle size={12} />,
        navLink: "/apps/employee/list",
      },
    ],
  },

  {
    id: "settings",
    title: "Settings",
    icon: <Settings size={20} />,
    children: [
      {
        id: "settingsList",
        title: "Settings",
        icon: <Circle size={12} />,
        navLink: "/apps/settings/list",
      },
      {
        id: "tutorials",
        title: "Tutorials",
        icon: <Circle size={12} />,
        navLink: "/apps/settings/tutorials",
      },
      {
        id: "dictionary",
        title: "Dictionary",
        icon: <Circle size={12} />,
        navLink: "/apps/settings/dictionary",
      },
    ],
  },
];
