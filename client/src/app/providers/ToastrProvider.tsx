import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const notify = {
  success: (text: string, duration = 1000) =>
    toast.success(text, { autoClose: duration }),
  info: (text: string, duration = 1000) =>
    toast.info(text, { autoClose: duration }),
  error: (text: string, duration = 1000) =>
    toast.error(text, { autoClose: duration }),
  warning: (text: string, duration = 1000) =>
    toast.warning(text, { autoClose: duration }),
};
export const ToastrContext = React.createContext(notify);

const ToastrProvider = (props: any) => {
  return (
    <ToastrContext.Provider value={notify}>
      {props.children}
      <ToastContainer
        position="top-center"
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        className={"min-w-full sm:min-w-fit"}
      />
    </ToastrContext.Provider>
  );
};

export default ToastrProvider;
