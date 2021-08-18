import { Story } from '@storybook/react'

import Toast, { ToastProps } from '.'

const Template: Story<ToastProps> = args => <Toast {...args} />

const Default = Template.bind({})
Default.args = {
  show: false,
  level: 'info',
  close: true,
  position: 'leftBottom',
  message: 'This is an example of toast',
  closeTimeout: 3000,
  autoClose: true
}

Default.argTypes = {
  level: {
    options: ['info', 'success', 'warning', 'remind'],
    control: { type: 'radio' }
  },
  position: {
    options: ['leftTop', 'left', 'leftBottom', 'bottom', 'rightBottom', 'right', 'rightTop', 'top'],
    control: { type: 'radio' }
  }
}

const defaultSetting = {
  component: Toast,
  title: 'components/shared/toast'
}

export default defaultSetting
export { Default }
