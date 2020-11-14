import { myRequest } from './request.js'
import Cache from './cache'

class User {
  constructor () {
    this._session_key = 0
    this._openid = ''
    this._isLogin = 0
    this._userInfo = null
    this._localLoginStatus = 0
    this.cache = new Cache('state_user_', true)
    try {
      let session = this.cache.get('session')
      let userInfo = this.cache.get('userInfo')
      if (session) {
        this.loginWithSession(session)
      } else {
        this._session_key = 0
        this._isLogin = 0
      }
      if (userInfo) {
        this._userInfo = userInfo
      }
    } catch (e) {
      console.log(e)
    }
  }

  get session_key () {
    return this._session_key
  }

  set session_key (value) {
    this._session_key = value
  }

  get openid () {
    return this._openid
  }

  set openid (value) {
    this._openid = value
  }

  get isLogin () {
    return this._isLogin
  }

  set isLogin (value) {
    this._isLogin = value
  }

  get userInfo () {
    return this._userInfo
  }

  set userInfo (value) {
    this._userInfo = value
    this.cache.set('userInfo', value)
  }

  init () {
    return new Promise((resolve, reject) => {
      wx.checkSession({
        success: () => {
          if (!this.session_key) {
            this.localLogin().then(resolve, reject)
          } else {
            resolve()
          }
        },
        fail: () => {
          this.localLogin().then(resolve, reject)
        }
      })
    })
  }

  localLogin () {
    return new Promise((resolve, reject) => {
      if (this._localLoginStatus === 1) {
        resolve()
      } else {
        wx.login({
          success: res => {
            myRequest({
              url: 'http://xiaoyi-9gbmzgun8d099b01.service.tcloudbase.com/express-starter/login',
              data: {
                js_code: res.code
              }
            }).then(res => {
              if (res.data.success) {
                this._localLoginStatus = 1
                const data = res.data.data
                data.isLogin = 1
                this.loginWithSession(data)
                this.cacheSession()
                resolve()
              } else {
                reject()
              }
            }, () => reject())
          },
          fail: () => reject()
        })
      }
    })
  }

  loginWithSession (data) {
    if (data.hasOwnProperty('session_key')) {
      this._session_key = data.session_key
    }
    if (data.hasOwnProperty('openid')) {
      this._openid = data.openid
    }
    if (data.hasOwnProperty('isLogin') && data.isLogin) {
      this._isLogin = 1
    }
  }

  logout () {
    this.loginWithSession({
      session_key: 0,
      isLogin: 0,
      _localLoginStatus: 0
    })
    this.cacheSession()
    return this
  }

  cacheSession () {
    let session = { session_key: this.session_key, openid: this.openid, isLogin: this.isLogin }
    this.cache.set('session', session)
  }
}

const user = new User()

export default user
