import { useEffect } from 'react'
import './App.css';
import './styles/variables.module.css';
import { Routes, Route, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MainLayout from './components/templates/MainLayout/MainLayout';
import LoginPage from './components/pages/LoginPage/LoginPage';
import RegisterPage from './components/pages/RegisterPage/RegisterPage';
import DashboardPage from './components/pages/DashboardPage/DashboardPage';
import CalendarPage from './components/pages/CalendarPage/CalendarPage';
import HomePage from './components/pages/HomePage/HomePage';
import SeasonalForecastPage from './components/pages/SeasonalForecastPage/SeasonalForecastPage';
import MapPage from './components/pages/MapPage/MapPage';
import CollectedPage from './components/pages/CollectedPage/CollectedPage';
import UserManagementPage from './components/pages/UserManagementPage/UserManagementPage';
import SettingPage from './components/pages/SettingPage/SettingPage';
import CropManagementPage from './components/pages/CropManagementPage/CropManagementPage';
import PriceTrendsPage from './components/pages/PriceTrendsPage/PriceTrendsPage';
import CollectedDemandPage from './components/pages/CollectedDemandPage/CollectedDemandPage';
import ForgotPassword from './components/pages/ForgotPasswordPage/ForgotPassword';
import ProtectedRoute from './ProtectedRoute';
import NotFoundPage from './components/pages/NotFoundPage/NotFoundPage';
import { useDispatch } from 'react-redux';
import { fetchAdminData } from './redux/actions/AdminActions/AdminAuthAction';


function App() {
    const location = useLocation();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchAdminData());

        //loading effect
        // dispatch(fetchAdminData()).then(() => setLoading(false));
        //format the title based on the pathname
        // const path = location.pathname === '/' ? 'login' : location.pathname.substring(1);
        const path = location.pathname === '/' ? ' - Tagum City Economic Enterprise Office' : `/${location.pathname.substring(1)}`;
        document.title = `FoodCast${path}`;

        //disable scrolling in the map page
        if (location.pathname === '/map') {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto'; //enable scrolling for other pages
        }

        return () => {
            document.body.style.overflow = 'auto'; //cleanup when leaving the MapPage
        };


    }, [dispatch, location.pathname]);

  return (
    <>
        <Routes>

            <Route path='*' element={<NotFoundPage />} />

            <Route path='/' element={<LoginPage />}/>
            <Route path='/register' element={<RegisterPage />}/>
            <Route path='/forgot-password' element={<ForgotPassword />}/>

            <Route path='/dashboard' 
                element={
                    <ProtectedRoute>
                        <MainLayout>
                            <DashboardPage />
                        </MainLayout>
                    </ProtectedRoute>
                }
            />

            <Route path='/calendar' 
                element={
                    <ProtectedRoute>
                        <MainLayout>
                            <CalendarPage />
                        </MainLayout>
                    </ProtectedRoute>
                } 
            />


            <Route path='/home' 
                element={
                    <ProtectedRoute>
                        <MainLayout>
                            <HomePage />
                        </MainLayout>
                    </ProtectedRoute>
                } 
            />

            <Route path='/seasonal-forecast' 
                element={
                    <ProtectedRoute>
                        <MainLayout>
                            <SeasonalForecastPage />
                        </MainLayout>
                    </ProtectedRoute>
                } 
            />

            <Route path='/map' 
                element={
                    <ProtectedRoute>
                        <MainLayout>
                            <MapPage />
                        </MainLayout>
                    </ProtectedRoute>
                } 
            />

            <Route path='/collected' 
                element={
                    <ProtectedRoute>
                        <MainLayout>
                            <CollectedPage />
                        </MainLayout>
                    </ProtectedRoute>
                } 
            />

            {/* <Route path='/supply-waste' 
                element={
                    <ProtectedRoute>
                        <MainLayout>
                            <SupplyWastePage />
                        </MainLayout>
                    </ProtectedRoute>
                } 
            /> */}
            <Route path='/collected-demand' 
                element={
                    <ProtectedRoute>
                        <MainLayout>
                            <CollectedDemandPage />
                        </MainLayout>
                    </ProtectedRoute>
                } 
            />

            <Route path='/crop-management' 
                element={
                    <ProtectedRoute>
                        <MainLayout>
                            <CropManagementPage />
                        </MainLayout>
                    </ProtectedRoute>
                } 
            />

            <Route path='/users-management' 
                element={
                    <ProtectedRoute>
                        <MainLayout>
                            <UserManagementPage />
                        </MainLayout>
                    </ProtectedRoute>
                } 
            />

            <Route path='/price-trends' 
                element={
                    <ProtectedRoute>
                        <MainLayout>
                            <PriceTrendsPage />
                        </MainLayout>
                    </ProtectedRoute>
                } 
            />

            <Route path='/settings' 
                element={
                    <ProtectedRoute>
                        <MainLayout>
                            <SettingPage />
                        </MainLayout>
                    </ProtectedRoute>
                } 
            />

        </Routes>

        <ToastContainer
            position='top-right'
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme='light'
        />
    </>
  )
}

export default App
