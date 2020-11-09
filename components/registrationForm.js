import { Form, Input, Button, Collapse } from "antd";
import { useRouter } from "next/router";
import FormItem from "antd/lib/form/FormItem";
import { validate } from "../lib/validate";

const { Panel } = Collapse;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 24 },
};
export const RegistrationForm = ({ onFinish }) => {
  const router = useRouter();
  const [form] = Form.useForm();

  const onReset = () => {
    form.resetFields();
  };

  const onLogin = () => {
    router.push("/login");
  };
  return (
    <Form {...layout} form={form} name="control-hooks" onFinish={onFinish}>
      <Form.Item
        name="email"
        label="Email"
        required={true}
        validateTrigger="onBlur"
        rules={[
          {
            required: true,
            message: "Email address is required!",
          },
          () => ({
            validator(rule, value) {
              const valid = validate.email(value);
              if (valid || !value) {
                return Promise.resolve();
              }

              return Promise.reject("Please enter a valid email address.");
            },
          }),
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="username"
        label="Username"
        validateTrigger="onBlur"
        rules={[
          {
            required: true,
            message: "Username address is required!",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="password"
        label="Password"
        validateTrigger="onBlur"
        rules={[
          {
            required: true,
            message: "Password address is required!",
          },
          () => ({
            validator(rule, value) {
              const valid = validate.password(value);
              if (valid || !value) {
                return Promise.resolve();
              }

              return Promise.reject(
                "Password must be 6-16 characters and include a number OR special character."
              );
            },
          }),
        ]}
      >
        <Input />
      </Form.Item>
      <FormItem>
        <Collapse>
          <Panel header="Name" key="1">
            <Form.Item name={["name", "title"]} label="Title">
              <Input />
            </Form.Item>
            <Form.Item name={["name", "first"]} label="First">
              <Input />
            </Form.Item>
            <Form.Item name={["name", "middle"]} label="Middle">
              <Input />
            </Form.Item>
            <Form.Item name={["name", "last"]} label="Last">
              <Input />
            </Form.Item>
            <Form.Item name={["name", "suffix"]} label="Suffix">
              <Input />
            </Form.Item>
          </Panel>
        </Collapse>
      </FormItem>

      <Form.Item name="phone" label="Phone">
        <Input />
      </Form.Item>
      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
        <Button htmlType="button" onClick={onReset}>
          Reset
        </Button>
        <Button htmlType="button" onClick={onLogin}>
          Login
        </Button>
      </Form.Item>
    </Form>
  );
};
