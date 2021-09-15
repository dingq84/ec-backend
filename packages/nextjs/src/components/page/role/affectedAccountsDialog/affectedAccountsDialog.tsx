import 'twin.macro'

// components
import Button from '@/components/shared/button'
import Dialog from '@/components/shared/dialog'
import Select from '@/components/shared/select'

interface RoleDialogProps {
  id: number
  open: boolean
  close: () => void
  callback: () => void
}

const AffectedAccountsDialog = (props: RoleDialogProps) => {
  const { open, close, callback } = props
  const handleClick = () => {
    callback()
    close()
  }

  return (
    <Dialog
      open={open}
      content={
        <div tw="pt-5 py-6 w-full px-15">
          <h1 tw="font-medium text-black text-2xl mb-6 text-center">系統提醒</h1>
          <p tw="text-lg font-normal text-black text-center mb-6 whitespace-pre">
            {'確訂要停用此角色？\n 停用後，綁定的帳號皆會改為預設角色。'}
          </p>
          <Select
            value=""
            options={[
              {
                key: '123',
                value: 'abc'
              },
              {
                key: '12',
                value: 'cde'
              }
            ]}
            inputProps={{ placeholder: '查看受影響帳號' }}
          />
        </div>
      }
      Footer={
        <div className="flex-center" tw="pb-9">
          <Button label="取消" className="btn-outline" onClick={close} />
          <Button label="確認" className="btn" tw="ml-10" onClick={handleClick} />
        </div>
      }
      close={close}
    />
  )
}

export default AffectedAccountsDialog
