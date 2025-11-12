import { createBrowserRouter } from "react-router";
import HomeLayout from "../Layout/HomeLayout";
import Home from "../Home/Home";
import ExploreArt from "../ExploreArtwork/ExploreArt";
import AddArtwork from "../AddArtwork/AddArtwork";
import MyGallery from "../MyGallery/MyGallery";
import MyFavorites from "../MyFavorites/MyFavorites";
import Error from "../Error/Error";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import AuthLayout from "../Layout/Authlayout";
import ArtWorkDetails from "../ArtCard/ArtWorkDetrails";
import PrivateRoute from "../Pages/PrivateRoutes";


const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout></HomeLayout>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/exploreArt",
        element: <ExploreArt></ExploreArt>,
      },
      {
        path: "/addArt",
        element: <PrivateRoute>
          <AddArtwork></AddArtwork>
        </PrivateRoute>,
      },
      {
        path: "/myGallery",
        element:<PrivateRoute>
           <MyGallery></MyGallery>
        </PrivateRoute>,
      },
      {
        path: "/myFavorites",
        element: <PrivateRoute>
          <MyFavorites></MyFavorites>
        </PrivateRoute>,
      },
       { 
        path: "/art/:id",  
        element: <PrivateRoute>
          <ArtWorkDetails></ArtWorkDetails>
        </PrivateRoute>
      },
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout></AuthLayout>,
    children: [
      {
        path: "/auth/login",
        element: <Login></Login>,
      },
      {
        path: "/auth/register",
        element: <Register></Register>,
      },
    ],
  },
  {
    path: "/*",
    element: <Error></Error>,
  },
]);

export default router;
