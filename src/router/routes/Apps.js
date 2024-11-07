// ** React Imports
import { lazy } from "react";
import { Navigate } from "react-router-dom";

const Chat = lazy(() => import("../../views/apps/chat"));
const Todo = lazy(() => import("../../views/apps/todo"));
const Email = lazy(() => import("../../views/apps/email"));
const Kanban = lazy(() => import("../../views/apps/kanban"));
const Calendar = lazy(() => import("../../views/apps/calendar"));

const InvoiceAdd = lazy(() => import("../../views/apps/invoice/add"));
const InvoiceList = lazy(() => import("../../views/apps/invoice/list"));
const InvoiceEdit = lazy(() => import("../../views/apps/invoice/edit"));
const InvoicePrint = lazy(() => import("../../views/apps/invoice/print"));
const InvoicePreview = lazy(() => import("../../views/apps/invoice/preview"));

const EcommerceShop = lazy(() => import("../../views/apps/ecommerce/shop"));
const EcommerceDetail = lazy(() => import("../../views/apps/ecommerce/detail"));
const EcommerceWishlist = lazy(() =>
  import("../../views/apps/ecommerce/wishlist")
);
const EcommerceCheckout = lazy(() =>
  import("../../views/apps/ecommerce/checkout")
);

const UserList = lazy(() => import("../../views/apps/employee/list"));
const UserView = lazy(() => import("../../views/apps/employee/view"));

// ** Customers
const CustomerList = lazy(() => import("../../views/apps/customer/list"));
const AddCustomer = lazy(() =>
  import("../../views/apps/customer/add-customer")
);
const CustomerBankDetail = lazy(() =>
  import("../../views/apps/customer/bank-details/list")
);

const CustomerAddBankDetail = lazy(() =>
  import("../../views/apps/customer/bank-details/add-update/form")
);
const CustomerPoa = lazy(() => import("../../views/apps/customer/poa/list"));
const CustomerAddUpdatePoa = lazy(() =>
  import("../../views/apps/customer/poa/add-update/form")
);


const BookingList = lazy(() => import("../../views/apps/booking"));

const BookingAdd = lazy(() => import("../../views/apps/booking/form"));

const BookingUpdate = lazy(() => import("../../views/apps/booking/form"));

// const TenantList = lazy(() => import("../../views/apps/tenant/list"));
// const TenantSummery = lazy(() => import("../../views/apps/tenant/summery"));
// const TenantSummeryById = lazy(() =>
//   import("../../views/apps/tenant/summery-detail")
// );

const Roles = lazy(() => import("../../views/apps/roles-permissions/roles"));
const Permissions = lazy(() =>
  import("../../views/apps/roles-permissions/permissions")
);

const Companies = lazy(() => import("../../views/apps/companies"));
const Scooters = lazy(() => import("../../views/apps/scooters"));
const ScooterModels = lazy(() =>
  import("../../views/apps/scooters/models")
);
const ScooterMap = lazy(() => import("../../views/apps/scooters/map"));
const ScooterDevice = lazy(() => import("../../views/apps/scooters/devices")); 

const Clients = lazy(() => import("../../views/apps/clients"));
const Orders = lazy(() => import("../../views/apps/orders"));
const Alerts = lazy(() => import("../../views/apps/alerts"));
const Areas = lazy(() => import("../../views/apps/areas"));

const Subscriptions = lazy(() =>
  import("../../views/apps/subscriptions")
);
const UserPurchases = lazy(() =>
  import("../../views/apps/subscriptions/user-purchases")
);

const Batteries = lazy(() => import("../../views/apps/batteries"));
const BatteryModels = lazy(() =>
  import("../../views/apps/batteries/models")
);
const BatteryStorage = lazy(() =>
  import("../../views/apps/batteries/storages")
);

const InboxMessages = lazy(() =>
  import("../../views/apps/notifications/inbox-messages")
);
const RideFeedBack = lazy(() =>
  import("../../views/apps/notifications/ride-feedback")
);

const PromoCodes = lazy(() => import("../../views/apps/promo-code"));

const LogsDeviceStatus = lazy(() =>
  import("../../views/apps/logs/device-status")
);
const LogsUserBalance = lazy(() =>
  import("../../views/apps/logs/user-balance")
);
const LogsBatteryStatus = lazy(() =>
  import("../../views/apps/logs/battery-status")
);

const Settings = lazy(() => import("../../views/apps/settings"));
const Tutorials = lazy(() =>
  import("../../views/apps/settings/tutorials")
);
const Dictionary = lazy(() =>
  import("../../views/apps/settings/dictionary")
);

const AppRoutes = [
  { path: "/apps/companies/list", element: <Companies /> },
  { path: "/apps/scooter/list", element: <Scooters /> },
  { path: "/apps/scooter/models-list", element: <ScooterModels /> },
  { path: "/apps/scooter/map", element: <ScooterMap /> },
  { path: "/apps/scooter/devices/show", element: <ScooterDevice /> },
  { path: "/apps/clients/list", element: <Clients /> },
  { path: "/apps/orders/list", element: <Orders /> },
  { path: "/apps/alerts/list", element: <Alerts /> },
  { path: "/apps/areas/list", element: <Areas /> },
  { path: "/apps/subscriptions/list", element: <Subscriptions /> },
  { path: "/apps/subscriptions/user-purchases", element: <UserPurchases /> },
  { path: "/apps/batteries/list", element: <Batteries /> },
  { path: "/apps/batteries/batteries-models-list", element: <BatteryModels /> },
  {
    path: "/apps/batteries/batteries-storages-list",
    element: <BatteryStorage />,
  },
  { path: "/apps/notifications/inbox-messages", element: <InboxMessages /> },
  { path: "/apps/notifications/ride-feedback", element: <RideFeedBack /> },
  { path: "/apps/promo-codes/list", element: <PromoCodes /> },
  { path: "/apps/logs/device-status-changes", element: <LogsDeviceStatus /> },
  { path: "/apps/logs/user-balance-changes", element: <LogsUserBalance /> },
  { path: "/apps/logs/battery-status-changes", element: <LogsBatteryStatus /> },
  { path: "/apps/settings/list", element: <Settings /> },
  { path: "/apps/settings/tutorials", element: <Tutorials /> },
  { path: "/apps/settings/dictionary", element: <Dictionary /> },
  {
    element: <Email />,
    path: "/apps/email",
    meta: {
      appLayout: true,
      className: "email-application",
    },
  },
  {
    element: <Email />,
    path: "/apps/email/:folder",
    meta: {
      appLayout: true,
      className: "email-application",
    },
  },
  {
    element: <Email />,
    path: "/apps/email/label/:label",
    meta: {
      appLayout: true,
      className: "email-application",
    },
  },
  {
    element: <Email />,
    path: "/apps/email/:filter",
  },
  {
    path: "/apps/chat",
    element: <Chat />,
    meta: {
      appLayout: true,
      className: "chat-application",
    },
  },
  {
    element: <Todo />,
    path: "/apps/todo",
    meta: {
      appLayout: true,
      className: "todo-application",
    },
  },
  {
    element: <Todo />,
    path: "/apps/todo/:filter",
    meta: {
      appLayout: true,
      className: "todo-application",
    },
  },
  {
    element: <Todo />,
    path: "/apps/todo/tag/:tag",
    meta: {
      appLayout: true,
      className: "todo-application",
    },
  },
  {
    element: <Calendar />,
    path: "/apps/calendar",
  },
  {
    element: <Kanban />,
    path: "/apps/kanban",
    meta: {
      appLayout: true,
      className: "kanban-application",
    },
  },
  {
    element: <InvoiceList />,
    path: "/apps/invoice/list",
  },
  {
    element: <InvoicePreview />,
    path: "/apps/invoice/preview/:id",
  },
  {
    path: "/apps/invoice/preview",
    element: <Navigate to="/apps/invoice/preview/4987" />,
  },
  {
    element: <InvoiceEdit />,
    path: "/apps/invoice/edit/:id",
  },
  {
    path: "/apps/invoice/edit",
    element: <Navigate to="/apps/invoice/edit/4987" />,
  },
  {
    element: <InvoiceAdd />,
    path: "/apps/invoice/add",
  },
  {
    path: "/apps/invoice/print",
    element: <InvoicePrint />,
    meta: {
      layout: "blank",
    },
  },
  {
    element: <EcommerceShop />,
    path: "/apps/ecommerce/shop",
    meta: {
      className: "ecommerce-application",
    },
  },
  {
    element: <EcommerceWishlist />,
    path: "/apps/ecommerce/wishlist",
    meta: {
      className: "ecommerce-application",
    },
  },
  {
    path: "/apps/ecommerce/product-detail",
    element: (
      <Navigate to="/apps/ecommerce/product-detail/apple-i-phone-11-64-gb-black-26" />
    ),
    meta: {
      className: "ecommerce-application",
    },
  },
  {
    path: "/apps/ecommerce/product-detail/:product",
    element: <EcommerceDetail />,
    meta: {
      className: "ecommerce-application",
    },
  },
  {
    path: "/apps/ecommerce/checkout",
    element: <EcommerceCheckout />,
    meta: {
      className: "ecommerce-application",
    },
  },
  {
    element: <UserList />,
    path: "/apps/employee/list",
  },
  {
    element: <CustomerList />,
    path: "/apps/customer/list",
  },
  {
    element: <AddCustomer />,
    path: "/apps/customer/add",
  },
  {
    element: <CustomerBankDetail />,
    path: "/apps/customer/bank-details",
  },
  {
    element: <CustomerAddBankDetail />,
    path: "/apps/customer/add-bank-details",
  },
  {
    element: <CustomerAddBankDetail />,
    path: "/apps/customer/update-bank-details",
  },
  {
    element: <CustomerAddUpdatePoa />,
    path: "/apps/customer/add-poa",
  },
  {
    element: <CustomerAddUpdatePoa />,
    path: "/apps/customer/update-poa",
  },
  {
    element: <CustomerPoa />,
    path: "/apps/customer/poa",
  },
  
  {
    element: <BookingList />,
    path: "/apps/booking/list",
  },

  {
    element: <BookingAdd />,
    path: "/apps/booking/add",
  },
  {
    element: <BookingUpdate />,
    path: "/apps/booking/update",
  },


  {
    path: "/apps/user/view",
    element: <Navigate to="/apps/user/view/1" />,
  },
  {
    element: <UserView />,
    path: "/apps/user/view/:id",
  },
  {
    element: <Roles />,
    path: "/apps/roles",
  },
  {
    element: <Permissions />,
    path: "/apps/permissions",
  },
];

export default AppRoutes;
