import { Story } from '@storybook/react'
import Drawer, { DrawerProps } from '.'

const Template: Story<DrawerProps> = args => (
  <Drawer {...args}>
    <h1>This is drawer</h1>
  </Drawer>
)

const Default = Template.bind({})
Default.args = {
  open: false,
  position: 'left'
}

Default.argTypes = {
  position: {
    options: ['top', 'left', 'right', 'bottom'],
    control: { type: 'radio' }
  }
}

const defaultSetting = {
  component: Drawer,
  title: 'components/shared/drawer'
}

export default defaultSetting
export { Default }
