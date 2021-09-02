import { Story } from '@storybook/react'
import 'twin.macro'

import Switch, { SwitchProps } from '.'

const Template: Story<SwitchProps> = args => <Switch {...args} />

const Default = Template.bind({})
Default.args = {
  label: 'apple',
  disabled: false,
  value: false
}

const defaultSetting = {
  component: Switch,
  title: 'components/shared/switch'
}

export default defaultSetting
export { Default }
