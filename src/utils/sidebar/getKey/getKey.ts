/**
 * @author Dean Chen 2021-04-26
 * getKey 根據前一個 key（父層）往後加上 - 本身的 key，做出一個有層級的 key tree
 */

function getKey(previousKey: string, currentKey: string): string {
  if (previousKey) {
    return `${previousKey}-${currentKey}`
  }

  return currentKey
}

export default getKey
