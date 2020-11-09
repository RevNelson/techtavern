import { useState } from "react";
import { useRouter } from "next/router";
import { useMutation } from "@apollo/client";
import { notification } from "antd";
import Cookies from "js-cookie";

import { RegistrationForm } from "../components/registrationForm";
import { useUserInfo } from "../hooks/user";
import { USER_REGISTER, CREATE_NAME, USER_UPDATE } from "../api/mutations";

// const Context = createContext({ name: "Registration" });

const Register = () => {
  const { user: loggedIn } = useUserInfo();
  const router = useRouter();
  const [userName, setUserName] = useState();
  const [registrationKey, setRegistrationKey] = useState();
  const [userNameKey, setUserNameKey] = useState();
  const [updateKey, setUpdateKey] = useState();
  const [userNameID, setUserNameID] = useState();
  const [userPhone, setUserPhone] = useState();

  notification.config({ placement: "bottomRight" });

  // Push user to user page if already logged in
  if (loggedIn) {
    console.log("LOGGED IN: ", loggedIn);
    router.push("/user");
  }

  const openNotification = ({ message, description, key }) => {
    !key && (key = `open${Date.now()}`);
    notification.info({
      message,
      description,
      key: key,
      duration: 0,
    });
    return key;
  };

  // User Registration Mutation
  const [userRegister] = useMutation(USER_REGISTER, {
    update: (_, { data: { registration } }) => {
      Cookies.set("api", registration.jwt, { expires: 7 });
    },
    onCompleted: (data) => {
      // Show success in notification and set expiration
      notification.success({
        key: registrationKey,
        duration: 2,
        message: "Registration successful.",
      });

      // Push user to user page
      setTimeout(() => {
        router.push("/user");
      }, 2000);
    },
    awaitRefetchQueries: true,
    onError: (error) => {
      // Show error in notification and set expiration
      notification.warn({
        key: registrationKey,
        duration: 2,
        message: "There was a problem with the registration.",
      });

      console.log(error);
    },
  });

  const onFinish = (values) => {
    console.log("FORM VALS: ", values);
    const { name, ...user } = values;
    console.log(user);
    console.log(name);
    setRegistrationKey(
      openNotification({
        message: "Registering User",
        description: "Sending registration data...",
      })
    );
    userRegister({
      variables: { name, user },
    });
  };

  return <RegistrationForm onFinish={onFinish} />;
};

export default Register;
