import { lazy, Suspense } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
const App = lazy(() => import("./App.jsx"));
import { Provider } from "react-redux";
const Loading = lazy(() => import("./components/Loading/Loading.jsx"));

import store from "./store/index";
import { Toaster } from "react-hot-toast";
createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <Suspense fallback={<Loading />}>
      <App />
      <Toaster
        toastOptions={{
          position: "bottom-center",
          style: {
            background: "#283046",
            color: "white",
          },
        }}
      />
    </Suspense>
  </Provider>
);
