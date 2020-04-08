// import config from './config'

/**
 * 查看受否授权
 * @returns {Procdmise<void>}
 */
export const WXgetSetting = async () => {
  return new Promise((resolve, reject) => {
    // 查看是否授权
    wx.getSetting({
      success (res) {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            lang: 'zh_CN',
            success: (res) => {
              // console.log(res.userInfo)
              resolve(res.userInfo)
            }
          })
        }
      }
    })
  })
}

/**
 * 获取用户基本信息， 不需要登录
 * @returns {Procdmise<void>}
 */
export const easyWXGetUserInfo = async () => {
  return new Promise((resolve, reject) => {
    wx.getUserInfo({
      lang: 'zh_CN',
      success: res => {
        resolve(res)
      },
      fail: err => {
        reject(err)
      }
    })
  })
}

/**
 * 失败请求
 */
export const badRequest = () => {
  wx.showModal({
    title: '糟糕 >_<',
    content: '关于小连努力处理这次请求却未能成功这件事请你不必放在心上',
    showCancel: false
  })
}

/**
 * 错误请求
 * @param msg
 */
export const errRequest = (msg) => {
  wx.showModal({
    title: '糟糕 >_<',
    content: msg.toString(),
    showCancel: false
  })
}

// /**
//  * 用户决绝授权弹窗
//  * @param callback
//  * @returns {Promise<any>}
//  */
// const failGetInfo = async (callback) => {
//   return new Promise((resolve, reject) => {
//     wx.showModal({
//       title: '用户未授权',
//       content: '如需正常使用，请前往授权',
//       showCancel: false,
//       confirmText: '去授权',
//       success: function () {
//         wxSetSystem(callback)
//           .then(() => {
//             wxGetUserInfo(callback)
//           })
//       }
//     })
//   })
// }
//
// /**
//  * 打开微信系统设置
//  * @param callback
//  * @returns {Promise<any>}
//  */
// const wxSetSystem = (callback) => {
//   return new Promise((resolve, reject) => {
//     wx.openSetting({
//       success: res => {
//         let authSetting = res.authSetting
//         let flag = authSetting['scope.userInfo']
//         if (flag) {
//           resolve()
//         }
//         // else
//         //   failGetInfo(callback)
//       }
//
//     })
//   })
// }

/**
 * 导航显示刷新状态
 */
export const wxNavBarLoading = () => {
  wx.showNavigationBarLoading()
}

/**
 * 导航隐藏刷状态
 */
export const wxHideNavBarLoading = () => {
  wx.hideNavigationBarLoading()
}

/**
 * 开始刷新
 */
export const wxRefresh = () => {
  wx.startPullDownRefresh()
}

/**
 * 停止下拉刷新
 */
export const wxStopRefresh = () => {
  wx.stopPullDownRefresh()
}

/**
 * 导航栏push
 * @param path 下一个页面路径
 */
export const wxNavPush = (path) => {
  wx.navigateTo({
    url: path
  })
}

/**
 * 跳转tabbar页面
 * @param path tab页面路径
 */
export const wxSwitchTab = (path) => {
  wx.switchTab({
    url: path
  })
}

/**
 * 设置NavBar
 * @param FontColor 前景色
 * @param BackColor 背景色
 * @param time      动画时间
 * @param timing    动画方式
 */
export const wxsetNavigationBarColor = (FontColor, BackColor, time, timing) => {
  wx.setNavigationBarColor({
    frontColor: FontColor,
    backgroundColor: BackColor,
    animation: {
      duration: time,
      timingFunc: timing
    }
  })
}

/**
 * 微信支付
 * @param params
 */
export const wxPay = async (param) => {
  return new Promise((resolve, reject) => {
    wx.requestPayment({
      timeStamp: param.timeStamp.toString(),
      nonceStr: param.nonceStr,
      package: param.packageStr,
      signType: param.signType,
      paySign: param.paySign,
      success: res => {
        resolve(res)
      },
      fail: err => {
        reject(err)
      }
    })
  })
}

/**
 * 文字提示信息
 * @param msg 提示内容
 * @param time 延迟时间
 */
export const messageTip = async (msg, time, icon) => {
  wx.showToast({
    title: msg,
    icon: icon || 'none',
    duration: time || 1500
  })
}

/**
 * 显示loading
 * @param msg
 */
export const wxLoading = (msg) => {
  wx.showLoading({
    title: msg,
    mask: true
  })
}

/**
 * 隐藏loading
 */
export const wxHideLoading = () => {
  wx.hideLoading()
}

/**
 * 关闭当前页面跳转
 * @param path 跳转页面路径
 */
export const wxRedirectTo = (path) => {
  wx.redirectTo({
    url: path
  })
}

/**
 * 关闭所有页面，打开到应用内的某个页面
 * @param path 跳转页面路径
 */
export const wxReLaunch = (path) => {
  wx.reLaunch({
    url: path
  })
}

/**
 * 弹窗，有取消按钮
 * resolve 确认回调
 * reject 取消回调
 */
export const wxAlert = (msg) => {
  return new Promise((resolve, reject) => {
    wx.showModal({
      title: '',
      content: msg,
      success: res => {
        if (res.confirm) {
          resolve(res)
        } else {
          reject(res)
        }
      }
    })
  })
}

/**
 * 选择图片
 */
export const wxChooseImage = (count, sizeType, sourceType) => {
  console.log('wxChooseImage')
  return new Promise((resolve, reject) => {
    wx.chooseImage({
      count: count || 1, // 默认9
      sizeType: sizeType || ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: sourceType || ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        console.log('wxChooseImage_success')
        resolve(res)
      },
      fail: function (err) {
        reject(err)
      }
    })
  })
}

/**
 * 获取图片信息(设置图片为本地缓存路径)
 * @param srcPath 图片路径，可以是相对路径，临时文件路径，存储文件路径，网络图片路径
 * @returns {Promise<any>}
 */
export const wxGetImageInfo = (srcPath) => {
  console.log('wxGetImageInfo', srcPath)
  return new Promise((resolve, reject) => {
    wx.getImageInfo({
      src: srcPath,
      success: function (res) {
        console.log('wxGetImageInfo_success')
        resolve(res)
      },
      fail: function (err) {
        console.log('getImage_err')
        reject(err)
      }
    })
  })
}

/**
 * 上传文件
 */
// export const wxUploadFile = (url, filePath, name, formData) => {
//   return new Promise((resolve, reject) => {
//     wx.uploadFile({
//       url: config.rootUrl + url,
//       filePath: filePath,
//       name: name,
//       formData: formData,
//       success: function (res) {
//         console.log('uploadFile_success')
//         resolve(res)
//       },
//       fail: function (err) {
//         reject(err)
//         wxAlert('图片上传失败')
//       }
//     })
//   })
// }

/**
 * 获取设备信息
 * @returns {Promise<any>}
 */
export const wxGetSystemInfo = () => {
  return new Promise((resolve, reject) => {
    wx.getSystemInfo({
      success: function (res) {
        resolve(res)
      },
      fail: function (err) {
        reject(err)
      }
    })
  })
}

/**
 * 下载图片到本地为缓存路径
 * @param path
 * @returns {Promise<any>}
 */
export const wxDownloadFile = (path) => {
  return new Promise((resolve, reject) => {
    wx.downloadFile({
      url: path,
      success: res => {
        resolve(res.tempFilePath)
      },
      fail: err => {
        console.log(err)
        reject(err)
      }
    })
  })
}

/**
 * 获取节点信息
 * @param dom
 * @returns {Promise<*>}
 * @constructor
 */
export const WXselectDom = async (dom) => {
  return new Promise((resolve, reject) => {
    const query = wx.createSelectorQuery()
    query.select(dom).boundingClientRect()
    query.selectViewport().scrollOffset()
    query.exec((res) => {
      resolve(res)
    })
  })
}
