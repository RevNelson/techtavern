import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";

import { USER_INFO } from "../api/queries";

export const useUserInfo = () => {
  const [user, setUser] = useState();
  const { loading, error, data } = useQuery(USER_INFO);

  useEffect(() => {
    if (data) {
      if (data.self) {
        setUser(data.self);
      }
    }
  }, [data]);

  if (!user && !error && !loading) {
    return { loading: true, error, user };
  }
  return { loading, error, user };
};
