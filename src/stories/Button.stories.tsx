import Button, { ButtonProps } from "../components/common/Button";
import { Meta, Story } from "@storybook/react";

const Buttonmeta: Meta = {
  title: "Common/Button",
  component: Button,
  argTypes: {
    onClick: { action: "clicked" },
    children: {
      defaultValue: "Default",
    },
  },
};

export default Buttonmeta;

const Template: Story<ButtonProps<React.ElementType>> = (args) => (
  <Button {...args} />
);

export const Default = Template.bind({});

export const CoralBlue = Template.bind({});
CoralBlue.args = {
  color: "coral_blue",
};

export const Medium = Template.bind({});
Medium.args = {
  size: "medium",
};

export const Small = Template.bind({});
Small.args = {
  size: "small",
};

export const SVG = Template.bind({});
SVG.args = {
  size: "svg",
};

export const WidthHeight = Template.bind({});
WidthHeight.args = {
  width: "300px",
  height: "50px",
};

export const As = Template.bind({});
As.args = {
  as: "a",
};

export const Custom = Template.bind({});
Custom.args = {
  custom: "color: red; padding: 50px; font-size: 22px;",
};

export const Usage = Template.bind({});
Usage.args = {
  size: "medium",
  color: "coral_blue",
  height: "40px",
  width: "300px",
  children: "click",
  as: "a",
};
