import React, { useEffect } from "react";
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Route,Routes} from 'react-router-dom';

import InnerContent from "./components/nav/InnerContent"
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Home from './pages/Home';
import ForgotPassword from './pages/auth/ForgotPassword';
import Header from './components/nav/Header';
import RegisterComplete from './pages/auth/RegisterComplete';
import History from "./pages/user/History";
//import UserRoute from "./components/routes/UserRoute";
//import AdminRoute from "./components/routes/AdminRoute";
import Password from "./pages/user/Password";
import Wishlist from "./pages/user/Wishlist";
import AdminDashboard from "./pages/admin/AdminDashboard";
import CategoryCreate from "./pages/admin/category/CategoryCreate";
import CategoryUpdate from "./pages/admin/category/CategoryUpdate";
import LoadingToRedirect from "./components/routes/LoadingToRedirect";
import SubCreate from "./pages/admin/sub/SubCreate";
import SubUpdate from "./pages/admin/sub/SubUpdate";
import ProductCreate from "./pages/admin/product/ProductCreate";
import AllProducts from "./pages/admin/product/AllProducts";
import ProductUpdate from "./pages/admin/product/ProductUpdate";
import Product from "./pages/Product";
import CategoryHome from "./pages/category/CategoryHome";
import SubHome from "./pages/sub/SubHome";
import Shop from "./pages/Shop";

import { auth } from "./firebase";
import { useDispatch, useSelector } from "react-redux";
import { currentUser } from "./functions/auth";

const App = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => ({ ...state }));
 
  
  // to check firebase auth state
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const idTokenResult = await user.getIdTokenResult();
        console.log("user", user);
        currentUser(idTokenResult.token)
          .then((res) => {
            dispatch({
              
              type: "LOGGED_IN_USER",
              payload: {
                name: res.data.name,
                email: res.data.email,
                token: idTokenResult.token,
                role: res.data.role,
                _id: res.data._id,
              },
            });
          })
          .catch((err) => console.log(err));
      }
    });
    // cleanup
    return () => unsubscribe();
  }, [dispatch]);

  


  return (
    <>
    
      <Header />
      
      <ToastContainer />
      
      <div>
          
          <Routes>
            
            <Route path='/' element={<Home />} />
            <Route path='/register' element={<Register />}/>
              ±
            <Route path='/register/complete'element={<RegisterComplete />}/>
            <Route path='/login' element={<Login />}/>
            <Route path="/forgot/password" element={ <ForgotPassword/> } />
            
          
            <Route element={<InnerContent />}>

            {user && user.role === "subscriber" && <Route path="/user/history" element={<History />} />}
            {user && user.role === "subscriber" && <Route path="/user/password" element={<Password />} />}
            {user && user.role === "subscriber" && <Route path="/user/wishlist" element={<Wishlist />} />}
            <Route exact path="/product/:slug" element={ <Product/> } />
            <Route exact path="/category/:slug" element={<CategoryHome/>} />
            <Route exact path="/sub/:slug" element={<SubHome/>} />
            <Route path="/shop" element={<Shop/>} />
            {user && user.role === "admin" && <Route path="/admin/dashboard" element={<AdminDashboard />} />}
            {user && user.role === "admin" && <Route path="/admin/category" element={<CategoryCreate />} />}
            {user && user.role === "admin" && <Route path="/admin/category/:slug" element={<CategoryUpdate />} />}
            {user && user.role === "admin" && <Route path="/admin/sub" element={<SubCreate />} />}
            {user && user.role === "admin" && <Route path="/admin/sub/:slug" element={<SubUpdate />} />}
            {user && user.role === "admin" && <Route path="/admin/product" element={<ProductCreate />} />}
            {user && user.role === "admin" && <Route path="/admin/products" element={<AllProducts />} />}
            {user && user.role === "admin" && <Route path="/admin/product/:slug" element={<ProductUpdate />} />}
            </Route>
            <Route path="/product/:slug" element={ <Product/> } />
            <Route path="/*" element={!user? <LoadingToRedirect />: "/*"} />
            
          </Routes>
      </div>
    </>
  );
};
export default App;
