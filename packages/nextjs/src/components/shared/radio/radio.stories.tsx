import { Story } from '@storybook/react'

import Radio, { RadioProps } from '.'

const Template: Story<RadioProps> = args => <Radio {...args} />

const Default = Template.bind({})
Default.args = {
  label: 'Checkbox label',
  checked: false,
  disabled: false,
  onChange() {}
}

const defaultSetting = {
  component: Radio,
  title: 'components/shared/radio'
}

export default defaultSetting
export { Default }
