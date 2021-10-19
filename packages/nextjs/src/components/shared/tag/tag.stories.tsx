import { Story } from '@storybook/react'
import 'twin.macro'

import Tag, { TagProps } from '.'

const Template: Story<TagProps> = args => <Tag {...args} />

const Default = Template.bind({})
Default.args = {
  label: 'apple',
  disabled: false,
  clear: true
}

const ManyTags = () => (
  <div className="flex-center" tw="space-x-1.5 justify-start">
    <Tag label="apple" />
    <Tag label="banana" />
    <Tag label="pineapple" />
  </div>
)

const defaultSetting = {
  component: Tag,
  title: 'components/shared/tag'
}

export default defaultSetting
export { Default, ManyTags }
