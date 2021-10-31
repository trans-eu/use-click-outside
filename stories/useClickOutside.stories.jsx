import React from 'react';
import { Button } from './Button';

export default {
  title: 'Example/useClickOutside',
  component: Button,
  parameters: {
    layout: 'centered',
  }
};

const Template = (args) => <Button {...args} />;

export const Default = Template.bind({});
Default.args = {
  label: 'Click outside of me and see action logger!',
};
