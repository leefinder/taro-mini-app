import { CoverView, CoverImage } from '@tarojs/components';
import { ComponentClass } from 'react'
import Taro, { Component } from '@tarojs/taro'
import './index.scss';

type TabbarList = Array<{pagePath: string, text: string, iconPath: string, selectedIconPath: string}>

type PageState = {
    tabbarList: TabbarList,
    selected: number
}

type PageOwnProps = {}

class Index extends Component {
    state: PageState = {
        tabbarList: [
            {
                pagePath: '/pages/index/index',
                text: '车型',
                iconPath: '../assets/images/tab/carType-inactive.png',
                selectedIconPath: '../assets/images/tab/carType-active.png'
            },
            {
                pagePath: '/pages/discover/index',
                text: '发现',
                iconPath: '../assets/images/tab/discover-inactive.png',
                selectedIconPath: '../assets/images/tab/discover-active.png'
            },
            {
                pagePath: '/pages/store/index',
                text: '门店',
                iconPath: '../assets/images/tab/store-inactive.png',
                selectedIconPath: '../assets/images/tab/store-active.png'
            },
            {
                pagePath: '/pages/my/index',
                text: '我的',
                iconPath: '../assets/images/tab/user-inactive.png',
                selectedIconPath: '../assets/images/tab/user-active.png'
            }
        ],
        selected: 0
    }

    switchTab = (e) => {
        const data = e.currentTarget.dataset
        const { path: url, index } = data
        if (index === 2) {
            Taro.navigateTo({
                url
            })
            return false
        }
        Taro.switchTab({ url })
    }

    render () {
        const { tabbarList, selected } = this.state
        return (
            <CoverView className="tab-bar">
                <CoverView className="tab-bar-border"></CoverView>
                { tabbarList.map((tab, index) => 
                    <CoverView className="tab-bar-item" key={tab.pagePath} data-path={tab.pagePath} data-index={index}  onClick={this.switchTab}>
                        <CoverImage src={selected === index ? tab.selectedIconPath : tab.iconPath}></CoverImage>
                        <CoverView className={selected === index ? 'selectedColor' : 'color'}>{tab.text}</CoverView>
                    </CoverView>
                    )
                }
            </CoverView>
        )
    }
}

export default Index as ComponentClass<PageOwnProps, PageState>
