import { Story } from '@storybook/react'

import Checkbox, { CheckboxProps } from '.'

const Template: Story<CheckboxProps> = args => <Checkbox {...args} />

const Default = Template.bind({})
Default.args = {
  label: 'Checkbox label',
  id: 'checkbox',
  labelPosition: 'left',
  initialValue: false,
  disabled: false
}
Default.argTypes = {
  labelPosition: {
    options: ['top', 'left'],
    control: { type: 'radio' }
  }
}

export default {
  component: Checkbox,
  title: 'components/shared/checkbox'
}

export { Default }
