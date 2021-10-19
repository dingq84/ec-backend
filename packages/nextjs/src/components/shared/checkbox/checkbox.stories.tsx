import { Story } from '@storybook/react'

import Checkbox, { CheckboxProps } from '.'

const Template: Story<CheckboxProps> = args => <Checkbox {...args} />

const Default = Template.bind({})
Default.args = {
  label: 'Checkbox label',
  labelPosition: 'left',
  value: false,
  disabled: false
}

Default.argTypes = {
  labelPosition: {
    options: ['top', 'left'],
    control: { type: 'radio' }
  }
}

const defaultSetting = {
  component: Checkbox,
  title: 'components/shared/checkbox'
}

export default defaultSetting
export { Default }
