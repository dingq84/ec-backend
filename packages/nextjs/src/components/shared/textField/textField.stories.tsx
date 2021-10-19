import { Story } from '@storybook/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faEye } from '@fortawesome/free-solid-svg-icons'

import TextField, { TextFieldProps } from '.'

const Template: Story<TextFieldProps> = args => <TextField {...args} />

const Default = Template.bind({})
Default.args = {
  label: 'Input label',
  value: 'test',
  placeholder: 'Please enter something...',
  labelPosition: 'top',
  clear: true,
  disabled: false,
  border: true,
  id: 'adornment'
}

Default.argTypes = {
  labelPosition: {
    options: ['top', 'left'],
    control: { type: 'radio' }
  }
}

const Adornment = () => (
  <TextField
    id="adornment"
    label="Adornment"
    adornment={{
      start: <FontAwesomeIcon icon={faSearch} />,
      end: <FontAwesomeIcon icon={faEye} />
    }}
    value=""
    onChange={(_: string) => {}}
  />
)

const Error = Template.bind({})
Error.args = {
  label: 'error',
  id: 'error',
  error: true
}

const defaultSetting = {
  component: TextField,
  title: 'components/shared/textfield'
}

export default defaultSetting
export { Default, Adornment, Error }
