import { useEffect } from "react";
import { useRouter } from "next/router";
import { Button } from "antd";

import { Spinner } from "../components/spinner";

import { useUserInfo } from "../hooks/user";
import { formatDate, logout } from "../lib/utils";

const User = () => {
  const router = useRouter();
  const { loading, error, user } = useUserInfo();

  useEffect(() => {
    if (!(user || loading)) {
      router.push("/login");
    }
  }, [user, loading]);

  const formatName = (name) => {
    const { title, first, middle, last, suffix } = name;
    return `${title ? title + " " : ""}${first ? first + " " : ""}${
      middle ? middle + " " : ""
    }${last ? last + " " : ""}${suffix ? suffix + " " : ""}`;
  };

  if (loading) {
    return <Spinner loading />;
  }

  if (user) {
    console.log(user);
    return (
      <Spinner spinning={loading}>
        <div className="username">
          <span>{user.username && user.username}</span>
        </div>
        {user.name && (
          <div className="name">
            Name: <span>{formatName(name)}</span>
          </div>
        )}
        {user.email && (
          <div className="email">
            Email: <span>{user.email}</span>
          </div>
        )}
        {user.phone && (
          <div className="phone">
            Phone: <span>{user.phone}</span>
          </div>
        )}
        {user.created_at && (
          <div className="created_at">
            Joined: <span>{formatDate(user.created_at)}</span>
          </div>
        )}
        {user.updated_at && (
          <div className="updated_at">
            Last Update: <span>{formatDate(user.updated_at)}</span>
          </div>
        )}
        <div>
          <Button onClick={() => logout(window.location.pathname)}>
            Logout
          </Button>
        </div>
      </Spinner>
    );
  }
  return (
    <Spinner spinning={loading}>
      <div>Redirecting...</div>
    </Spinner>
  );
};

export default User;
