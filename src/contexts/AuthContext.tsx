import React, { createContext, useEffect, useState } from "react";

import { AxiosResponse } from "axios";
import axiosInstance from "../api/axiosInstance";

export const myContext = createContext({});
export default function AuthContext(props: any) {
  const [userObject, setUserObject] = useState<any>();

  useEffect(() => {
    axiosInstance
      .get("googleAuth/getuser/" + props.email, { withCredentials: true })
      .then((res: AxiosResponse) => {
        console.log(res);
        if (res.data) {
          setUserObject(res.data);
        }
      });
  }, []);
  return (
    <myContext.Provider value={userObject}>{props.children}</myContext.Provider>
  );
}
