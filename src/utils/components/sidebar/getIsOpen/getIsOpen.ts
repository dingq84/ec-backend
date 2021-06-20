/**
 * @author Dean Chen 2021-04-26
 * getIsOpen 找出 active key 的前綴含有 item key，如果有：表示 active key 為 item key 的本身或是子層
 */

function getIsOpen(itemKey: string, activeKey: string): boolean {
  return Boolean(activeKey.length >= itemKey.length && new RegExp(`^${itemKey}`).test(activeKey))
}

export default getIsOpen
