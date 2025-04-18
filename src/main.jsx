import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Roots from './Root/Roots.jsx';
// import ErrorPage from './component/ErrorPage/ErrorPage.jsx';
import Home from './component/Home/Home.jsx';
import UserDashboardLayout from './component/UsersDashboard/UserDashboardLayout/UserDashboardLayout.jsx';

import AdminDashboardLayout from './component/AdminDashboard/AdminDashboardLayout/AdminDashboardLayout.jsx';
import AdminDashboard from './component/AdminDashboard/AdminDashboardPages/AdminDashboard.jsx';
import AdminDashboardMessage from './component/AdminDashboard/AdminDashboardPages/AdminDashboardMessage.jsx';
import AdminDashboardChats from './component/AdminDashboard/AdminDashboardPages/AdminDashboardChats.jsx';
import AdminDashboardAiChat from './component/AdminDashboard/AdminDashboardPages/AdminDashboardAiChat.jsx';
import AdminDashboardNotification from './component/AdminDashboard/AdminDashboardPages/AdminDashboardNotification.jsx';
import AdminDashboardUser from './component/AdminDashboard/AdminDashboardPages/AdminDashboardUser.jsx';
import AdminDashboardOrder from './component/AdminDashboard/AdminDashboardPages/AdminDashboardOrder.jsx';
import AdminDashboardBlog from './component/AdminDashboard/AdminDashboardPages/AdminDashboardBlog.jsx';
import AdminDashboardSupport from './component/AdminDashboard/AdminDashboardPages/AdminDashboardSupport.jsx';
import AdminDashboardOrders from './component/AdminDashboard/AdminDashboardPages/AdminDashboardOrders.jsx';
import AdminDashboardOrderAsses from './component/AdminDashboard/AdminDashboardPages/AdminDashboardOrderAsses.jsx';
import AdminDashboardWithdrawal from './component/AdminDashboard/AdminDashboardPages/AdminDashboardWithdrawal.jsx';
import Pricing from './component/Shared/Pricing.jsx';
import BrowseProjects from './component/Shared/BrowseProjects.jsx';
import AllProjects from './component/Shared/AllProjects.jsx';
import Question from './component/Shared/Question.jsx';
import Register from './component/Shared/Register.jsx';
import Login from './component/Shared/Login.jsx';
import ConfirmEmail from './component/Shared/ConfirmEmail.jsx';
import Verification from './component/Shared/Verification.jsx';
import ConfirmPassword from './component/Shared/ConfirmPassword.jsx';
import PasswordChangeSuccesfully from './component/Shared/PasswordChangeSuccesfully.jsx';
import BuyerDashboardPages from './component/UsersDashboard/UserDashboardPages/BuyerDashboardPages/BuyerDashboardPages.jsx';
import CreateOrder from './component/UsersDashboard/UserDashboardPages/BuyerDashboardPages/CreateOrder.jsx';
import CreatedOrderedTable from './component/UsersDashboard/UserDashboardPages/BuyerDashboardPages/CreatedOrderedTable.jsx';
import BuyerCandidateList from './component/UsersDashboard/UserDashboardPages/BuyerDashboardPages/BuyerCandidateList.jsx';
import OrderManagement from './component/UsersDashboard/OrderManagement.jsx';
import UserSupport from './component/UsersDashboard/UserDashboardPages/UserSupport.jsx/UserSuppor.jsx';
import UserProfileDettails from './component/UsersDashboard/UserDashboardPages/UserProfileDettails/UserProfileDettails.jsx';
import UserWallet from './component/UsersDashboard/UserDashboardPages/UserWallet/UserWallet.jsx';
import UserWithdrawalMethod from './component/UsersDashboard/UserDashboardPages/UserWithdrawalMethod/UserWithdrawalMethod.jsx';
import UserNotifications from './component/UsersDashboard/UserDashboardPages/UserNotifications/UserNotifications.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Roots />,
    // errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/pricing",
        element: <Pricing />,
      },
      {
        path: "/browse_projects",
        element: <BrowseProjects />,
      },
      {
        path: "/all_Projects",
        element: <AllProjects />,
      },
      {
        path: "/contact",
        element: < Question />,
      },

    ],

  },

  {
    path: "/registration",
    element: <Register />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/confirm_email',
    element: <ConfirmEmail />
  },
  {
    path: '/verification',
    element: <Verification />
  },
  {
    path: '/confirm_password',
    element: <ConfirmPassword />
  },
  {
    path: '/password_change_succesfull',
    element: <PasswordChangeSuccesfully />
  },

  // ----------user dashboard---------
  {
    path: "/dashboard",
    element: (<UserDashboardLayout />),
    children: [
      {
        index: true,
        element: <OrderManagement />

      },
      {
        path: "userSupport",
        element: <UserSupport></UserSupport>
      },
      {
        path: "sellerDashboardPages",
        element: <BuyerDashboardPages></BuyerDashboardPages>
      },
      {
        path: "createBuyerOrder",
        element: <CreateOrder></CreateOrder>
      },

      {
        path: "buyer_order_create",
        element: <CreatedOrderedTable />
      },
      {
        path: "buyer_candidate_list",
        element: <BuyerCandidateList />
      },
      {
        path: "user_profile_dettails",
        element: <UserProfileDettails />
      },
      {
        path: "user_wallet",
        element: <UserWallet />
      },
      {
        path: "user_withdrawal_method",
        element: <UserWithdrawalMethod />
      },
      {
        path: "user_notifications",
        element: <UserNotifications />
      }
    ]
  },

  //--------------admin dashboard----------

  {
    path: "/Admin_Dashboard",
    element: <AdminDashboardLayout />,
    children: [
      {
        index: true,
        element: <AdminDashboard />
      },
      {
        path: "Message", // Relative path under /Admin_Dashboard
        element: <AdminDashboardMessage />,
        children: [
          {
            path: ":id", // Relative path under /Admin_Dashboard/Message
            element: <AdminDashboardChats />
          },
          {
            path: "chatbot",
            element: <AdminDashboardAiChat />
          }
        ]
      },
      {
        path: "/Admin_Dashboard/notification",
        element: <AdminDashboardNotification />
      },
      {
        path: "/Admin_Dashboard/user",
        element: <AdminDashboardUser />
      },
      {
        path: "/Admin_Dashboard/order",
        element: <AdminDashboardOrder />
      },
      {
        path: "/Admin_Dashboard/blog",
        element: <AdminDashboardBlog />
      },
      {
        path: "/Admin_Dashboard/tickets",
        element: <AdminDashboardSupport />
      },
      {
        path: "/Admin_Dashboard/order_Assessment",
        element: <AdminDashboardOrderAsses />
      },
      {
        path: "/Admin_Dashboard/orders",
        element: <AdminDashboardOrders />
      },
      {
        path: "/Admin_Dashboard/withdrawal",
        element: <AdminDashboardWithdrawal />
      },
    ]
  }

]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </StrictMode>,
)
