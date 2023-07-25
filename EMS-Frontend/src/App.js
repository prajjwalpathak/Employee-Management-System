import React from 'react';
import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignIn from './Components/SignIn/SignIn';
import SignUp from './Components/SignUp/SignUp';
import EditProfile from './Components/Profile/EditProfile';
import GetProfile from './Components/Profile/GetProfile';
import AdminEmployeeTable from './Components/AdminEmployeeTable/AdminEmployeeTable';
import Dashboard from './Components/Dashboard/Dashboard';
import { ProtectRoute, AdminProtect } from './Services/UserServices/ProtectRoute';
import TimesheetForm from './Components/Timesheet/TimesheetForm';
import { RedirectRoute, AdminRedirect } from './Services/UserServices/RedirectRoute';
import ErrorPage from './Components/ErrorPage/ErrorPage';
import RequestForm from './Components/Request/RequestForm';
import Home from './Components/Dashboard/Home';
import Hierarchy from './Components/Profile/Hierarchy';
import GetRequest from './Components/Request/GetRequest';
import ViewRequest from './Components/Request/ViewRequest';
import EditRequest from './Components/Request/EditRequest';
import GetTimesheet from './Components/Timesheet/GetTimesheet';
import ViewTimesheet from './Components/Timesheet/ViewTimesheet';
import EditTimeSheet from './Components/Timesheet/EditTimesheet';
import SearchProfile from './Components/Profile/SearchProfile';
import AdminLogin from './Components/AdminLogin/AdminLogin';
import AdminSignUp from './Components/AdminSignUp/AdminSignUp';
import AdminDashboard from './Components/AdminDashboard/AdminDashboard';
import AdminHome from './Components/AdminDashboard/AdminHome';
import AdminUserProfile from './Components/AdminUserProfile/AdminUserProfile';
import UserProfile from './Components/AdminUserProfile/AdminUserProfile.js';
import AdminUserHierarchy from './Components/AdminUserHierarchy/AdminUserHierarchy';
import SuccessMessage from './Components/Message/SuccessMessage';
import AdminRequest from './Components/AdminRequest/AdminRequest';
import AdminTimesheet from './Components/AdminTimesheet/AdminTimesheet';
import AdminProject from './Components/AdminProject/AdminProject';
import ProjectDetails from './Components/Project/ProjectDetails';

function App() {
	return (
		<>
			<Router>
				<Routes>
					<Route element={<AdminRedirect />} path='/adminlogin'>
						<Route element={<AdminLogin />} path='/adminlogin'></Route>
					</Route>

					<Route element={<AdminSignUp />} path='/adminsignup'></Route>

					<Route element={<AdminProtect />} path='/admindashboard'>
						<Route element={<AdminDashboard />} path='/admindashboard'>
							<Route element={<AdminHome />} path='' />
							<Route element={<AdminUserProfile />} path='search-user/:id' />
							<Route element={<UserProfile />} path='user-profile' />
							<Route element={<AdminRequest />} path='requests' />
							<Route element={<AdminTimesheet />} path='timesheets' />
							<Route element={<Hierarchy />} path='get-hierarchy' />
							<Route element={<AdminProject />} path='project-detail' />

							<Route element={<Home />} path='' />
						</Route>
					</Route>

					<Route element={<RedirectRoute />} path='/'>
						<Route element={<SignIn />} path='/'></Route>
					</Route>
					<Route element={<SignUp />} path='/signup'></Route>
					<Route element={<AdminEmployeeTable />} path='/table'></Route>

					<Route element={<ProtectRoute />} path='/dashboard'>
						<Route element={<Dashboard />} path='/dashboard'>
							<Route element={<Home />} path='' />
							<Route element={<RequestForm />} path='leave' />
							<Route element={<GetRequest />} path='getRequest' />
							<Route element={<EditRequest />} path='editrequest/:id' />
							<Route element={<ViewRequest />} path='viewRequest' />
							<Route element={<GetProfile />} path='getProfile/' />
							<Route element={<ProjectDetails />} path='project-detail' />
							<Route element={<SearchProfile />} path='searchprofile/:id' />
							<Route element={<EditProfile />} path='profile' />
							<Route element={<GetTimesheet />} path='getTimesheet' />
							<Route element={<ViewTimesheet />} path='viewTime' />
							<Route element={<EditTimeSheet />} path='editTime/:id' />
							<Route element={<TimesheetForm />} path='timesheetform'></Route>
							<Route element={<Hierarchy />} path='get-hierarchy' />
						</Route>
					</Route>

					<Route element={<ProtectRoute />} path='/leaverequest'>
						<Route element={<RequestForm />} path='/leaverequest'></Route>
					</Route>

					<Route element={<SuccessMessage />} path='/success'></Route>
					<Route element={<ErrorPage />} path='*'></Route>
				</Routes>
			</Router>

			<ToastContainer />
		</>
	);
}

export default App;
