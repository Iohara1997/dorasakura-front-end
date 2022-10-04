import React, { createContext, useState } from "react";

export const SnackBarContext = createContext({});
export function SnackBarProvider(props) {
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [showMessagesSnackBar, setMessageSnackBar] = useState("");
  return (
    <SnackBarContext.Provider
      value={{
        openSnackBar,
        setOpenSnackBar,
        showMessagesSnackBar,
        setMessageSnackBar,
      }}
    >
      {props.children}
    </SnackBarContext.Provider>
  );
}

export const useSnack = () => React.useContext(SnackBarContext);
