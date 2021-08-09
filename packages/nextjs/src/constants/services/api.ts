/**
 * @author Dean Chen 2021-06-07
 * 這邊定義兩個常數： url 和 key，前者針對 api call，後者提供給 react-query 當 key，
 * 兩者都必須為唯一值，Url 不能直接當 Key 的原因是：可能會使用到相同 route， 但參數不同，
 * 這樣就是不一樣的資料往返
 *
 * @modified
 * [Ding.Chen-20210807]: 將邏輯抽至 core，所以原本的 api url 不再需要，如果未來專案不使用 react-query，
 * 這隻檔案也不再需要
 */

// 表示專案總共有幾種 api call
enum ApiKey {
  // auth
  login = 'login',
  logout = 'logout',
  me = 'me',
  isLogged = 'isLogged'
}

export { ApiKey }
