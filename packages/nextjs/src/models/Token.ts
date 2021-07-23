/**
 * @author Dean Chen 2021-06-07
 * 建立一個 Token 的 model，用意是希望透過記憶體儲存 token，
 * 不儲存在 localStorage 提高安全性，但須和後端討論，因此先暫時以 class 實現
 */

class Token {
  private _token: string | null = null

  getToken() {
    return this._token
  }

  setToken(token: string): void {
    this._token = token
  }
}

export default Token
