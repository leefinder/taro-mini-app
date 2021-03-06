import Taro, { Component, Config } from '@tarojs/taro'
import { Provider } from '@tarojs/redux'

import Index from './pages/index/index'

import configStore from './store'

import './app.scss'

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

const store = configStore()

class App extends Component {

    /**
     * 指定config的类型声明为: Taro.Config
     *
     * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
     * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
     * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
     */
    config: Config = {
        pages: [
        ],
        subPackages: [
            {
                root: 'page-activitys',
                pages: [
                ]
            }
        ],
        window: {
            backgroundTextStyle: 'light',
            navigationBarBackgroundColor: '#fff',
            navigationBarTitleText: '',
            navigationBarTextStyle: 'black'
        },
        tabBar: {
            custom: true,
            color: '#BDC3C7',
            selectedColor: '#253746',
            backgroundColor: "#fff",
            list: [
                {
                    pagePath: 'pages/index/index',
                    text: '车型',
                    iconPath: './assets/images/tab/carType-inactive.png',
                    selectedIconPath: './assets/images/tab/carType-active.png'
                },
                {
                    pagePath: 'pages/discover/index',
                    text: '发现',
                    iconPath: './assets/images/tab/discover-inactive.png',
                    selectedIconPath: './assets/images/tab/discover-active.png'
                },
                {
                    pagePath: 'pages/my/index',
                    text: '我的',
                    iconPath: './assets/images/tab/user-inactive.png',
                    selectedIconPath: './assets/images/tab/user-active.png'
                }
            ]
        }
    }

    componentDidMount() { }

    componentDidShow() { }

    componentDidHide() { }

    componentDidCatchError() { }

    // 在 App 类中的 render() 函数没有实际作用
    // 请勿修改此函数
    render() {
        return (
            <Provider store={store}>
                <Index />
            </Provider>
        )
    }
}

Taro.render(<App />, document.getElementById('app'))
