import Checkbox, { CheckboxProps } from "../components/common/Checkbox";
import { Meta, Story } from "@storybook/react";

const CheckboxMeta: Meta = {
  title: "Checkbox",
  component: Checkbox,
  argTypes: {
    onClick: { action: "clicked" },
  },
};

export default CheckboxMeta;

const Template: Story<CheckboxProps> = (args) => <Checkbox {...args} />;

export const Default = Template.bind({});
Default.args = {
  name: "terms_commerce",
  label: "[필수] 전자금융거래 이용약관 동의",
  labelId: "terms_commerce",
};

export const Link = Template.bind({});
Link.args = {
  name: "advReceive",
  label: "[선택] 광고성 정보 수신 동의",
  labelId: "advReceive",
  link: "/auth/login",
};

export const Bold = Template.bind({});
Bold.args = {
  name: "allAgree",
  label: "모두 동의하기",
  labelId: "allAgree",
  bold: true,
};
