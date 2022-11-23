import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { InputField } from "./InputField";

export default {
  title: "Example/Input",
  component: InputField,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes

} as ComponentMeta<typeof InputField>;

const Template: ComponentStory<typeof InputField> = (args) => (
  <InputField {...args} />
);

export const Input = Template.bind({});
Input.args = {
  label: "name",
};
