import { Routes, Route, useLocation } from "react-router-dom";
import { Suspense, lazy } from "react";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

// Lazy load pages
const HomePage = lazy(() => import("@/pages/HomePage"));
const BrandsPage = lazy(() => import("@/pages/BrandsPage"));
const CartPage = lazy(() => import("@/pages/CartPage"));
const LoginPage = lazy(() => import("@/pages/LoginPage"));
const ProductPage = lazy(() => import("@/pages/ProductPage"));
const ShopPage = lazy(() => import("@/pages/ShopPage"));
const WishListPage = lazy(() => import("@/pages/WishListPage"));
const ProfilePage = lazy(() => import("@/pages/ProfilePage"));
const ShippingPage = lazy(() => import("@/pages/ShippingPage"));
const PaymentPage = lazy(() => import("@/pages/PaymentPage"));
const PlaceOrderPage = lazy(() => import("@/pages/PlaceOrderPage"));
const OrderPage = lazy(() => import("@/pages/OrderPage"));
const RegisterPage = lazy(() => import("@/pages/RegisterPage"));

// Lazy load admin pages
const UserListPage = lazy(() => import("@/pages/admin/UserListPage"));
const UserEditPage = lazy(() => import("@/pages/admin/UserEditPage"));

const OrderListPage = lazy(() => import("@/pages/admin/OrderListPage"));
const ProductListPage = lazy(() => import("@/pages/admin/ProductListPage"));

const EditProductPage = lazy(() => import("@/pages/admin/EditProductPage"));
const CreateProductPage = lazy(() => import("@/pages/admin/CreateProductPage"));

// Components that might be needed immediately
import PrivateRoute from "@/components/auth/PrivateRoute";
import AdminRoute from "@/components/auth/AdminRoute";
import BrandsShop from "@/components/brand/BrandsShop";

/**
 * Main routing configuration component with code-splitting via lazy loading.
 */
function RoutesConfig() {
  const location = useLocation();
  // Separate routing logic for pages that might need special treatment
  const isSpecialPage = ["/", "/wishlist"].includes(location.pathname);

  return (
    <Suspense fallback={<LoadingSpinner />}>
      {isSpecialPage ? (
        // Separate routes for pages that might need custom handling
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/wishlist" element={<WishListPage />} />
        </Routes>
      ) : (
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/brands" element={<BrandsPage />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/shop/*" element={<ShopPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/brand/:slug" element={<BrandsShop />} />

          {/* Protected Routes */}
          <Route element={<PrivateRoute />}>
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/shipping" element={<ShippingPage />} />
            <Route path="/payment" element={<PaymentPage />} />
            <Route path="/placeorder" element={<PlaceOrderPage />} />
            <Route path="/order/:id" element={<OrderPage />} />
          </Route>

          {/* Admin Routes */}
          <Route element={<AdminRoute />}>
            <Route path="/admin/userlist" element={<UserListPage />} />
            <Route path="/admin/user/:id/edit" element={<UserEditPage />} />
            <Route path="/admin/orderlist" element={<OrderListPage />} />
            <Route path="/admin/product-list" element={<ProductListPage />} />
            <Route
              path="/admin/product/:id/edit"
              element={<EditProductPage />}
            />
            <Route
              path="/admin/create-product"
              element={<CreateProductPage />}
            />
          </Route>
        </Routes>
      )}
    </Suspense>
  );
}

export default RoutesConfig;
