import Backdrop from '.'

// types
import { Story, Meta } from '@storybook/react'
import type { BackdropType } from '.'

export default {
  title: 'Backdrop',
  component: Backdrop
} as Meta

//👇 We create a “template” of how args map to rendering
const Template: Story<BackdropType> = args => <Backdrop {...args} />

//👇 Each story then reuses that template
export const Default = Template.bind({})

Default.args = {
  inProps: true,
  timeout: 500
}

export const Invisible = () => (
  <Backdrop inProps invisible>
    The background is transparent, but the size equals screen size
  </Backdrop>
)

export const Hidden = () => (
  <Backdrop inProps hidden>
    Size equals content size
  </Backdrop>
)
