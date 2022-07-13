import Input, { InputProps } from "../components/common/Input";
import { Meta, Story } from "@storybook/react";

const InputMeta: Meta = {
  title: "Common/Input",
  component: Input,
};

export default InputMeta;

const Template: Story<InputProps> = (args) => <Input {...args} />;

export const Default = Template.bind({});
Default.args = {
  placeholder: "input",
  type: "text",
};

export const Error = Template.bind({});
Error.args = {
  placeholder: "비밀번호를 작성해주세요",
  type: "password",
  errors: { validEmail: "올바른 비밀번호를 작성해주세요" },
  name: "password",
  label: "비밀번호를 작성",
};

export const Icon = Template.bind({});
Icon.args = {
  placeholder: "이메일을 작성해주세요",
  type: "text",
  svg: "email",
  name: "email",
  label: "이메일을 작성",
};
