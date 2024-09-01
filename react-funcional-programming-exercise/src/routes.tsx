import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { HomePage } from "./pages/home/home-page";
import { ViewBookPage } from "./pages/books/view/view-book-page";
import { ListBooksPage } from "./pages/books/list/list-books-page";
import { EditBookPage } from "./pages/books/edit/edit-book-page";
import BaseLayout from "./layouts/base-layout/base-layout";

const routes = createBrowserRouter([
  {
    path: "",
    Component: BaseLayout,
    children: [
      {
        path: "",
        Component: HomePage,
      },
      {
        path: "/books",
        Component: ListBooksPage,
      },
      {
        path: "/books/:id",
        Component: ViewBookPage,
      },
      {
        path: "/books/:id/edit",
        Component: EditBookPage,
      },
      {
        path: "/books/new",
        Component: EditBookPage,
      },
    ],
  },
]);

export const Router = () => <RouterProvider router={routes} />;
