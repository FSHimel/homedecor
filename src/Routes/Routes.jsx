import { createBrowserRouter } from "react-router";
import Home from "../Pages/Home";
import Products from "../Pages/Products";
import MainLayout from "../Layouts/MainLayout";
import Error from "../Pages/Error";
import Wishlist from "../Pages/Wishlist";
import ProductDetails from "../Pages/ProductDetails";


const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        errorElement: <Error />,
        children: [
            {
                index: true,
                element: <Home />,
                // loader: () => fetch('./furnitureData.json')
            },
            {
                path: "/products",
                element: <Products />
            },
            {
                path: '/wishlist',
                element: <Wishlist />
            },
            {
                path: '/product/:id',
                element: <ProductDetails />
            }
        ]
    },


]);

export default router;