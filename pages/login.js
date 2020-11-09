import { useEffect } from "react";
import { useRouter } from "next/router";
import { useMutation } from "@apollo/client";
import { Form, Input, Button } from "antd";
import Cookies from "js-cookie";

import { useUserInfo } from "../hooks/user";
import { USER_LOGIN } from "../api/mutations";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 24 },
};

const Login = () => {
  const router = useRouter();
  const { user } = useUserInfo();

  const [userLogin, { data: loginData }] = useMutation(USER_LOGIN);

  useEffect(() => {
    if (loginData && loginData.login.jwt) {
      Cookies.set("api", loginData.login.jwt, { expires: 7 });
      router.reload(window.location.pathname);
    }
  }, [loginData]);

  useEffect(() => {
    if (user) {
      router.push("/user");
    }
  }, [user]);

  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log("FORM VALS: ", values);
    userLogin({
      variables: { email: values.email, password: values.password },
    });
  };

  const onReset = () => {
    form.resetFields();
  };

  const onEnroll = () => {
    router.push("/register");
  };

  console.log("LOGIN DATA: ", loginData);

  return (
    <Form {...layout} form={form} name="control-hooks" onFinish={onFinish}>
      <Form.Item name="email" label="Email" required={true}>
        <Input />
      </Form.Item>
      <Form.Item name="password" label="Password" required={true}>
        <Input />
      </Form.Item>
      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
        <Button htmlType="button" onClick={onReset}>
          Reset
        </Button>
        <Button htmlType="button" onClick={onEnroll}>
          Sign Up
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Login;
