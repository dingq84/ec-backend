/**
 * @author Dean Chen 2021-04-26
 * getIsActive 找出 active key 等於 item key，找出目前停留的 item
 */

function getIsActive(itemKey: string, activeKey: string): boolean {
  return itemKey === activeKey
}

export default getIsActive
