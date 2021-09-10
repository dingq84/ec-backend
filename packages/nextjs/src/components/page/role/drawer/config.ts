// core
import { Mode } from '@/pages/role'

interface ConfigValue {
  title: string
  subtitle: string
}

interface Config extends Record<Mode, ConfigValue> {}

const config: Config = {
  create: {
    title: '創建',
    subtitle: '創建'
  },
  edit: {
    title: '編輯',
    subtitle: '編輯'
  },
  view: {
    title: '檢視',
    subtitle: ''
  }
}

export default config
