/**
 * @author Dean Chen 2021-04-26
 * getPreviousKey 根據 item key 找出父層的 key，如果無上層，則回傳 ""
 */

function getPreviousKey(itemKey: string) {
  let previousKey = ''
  if (itemKey.length > 1) {
    const itemKeyList = itemKey.split('-')
    previousKey = itemKey
      .split('-')
      .slice(0, itemKeyList.length - 1)
      .join('-')
  }

  return previousKey
}

export default getPreviousKey
