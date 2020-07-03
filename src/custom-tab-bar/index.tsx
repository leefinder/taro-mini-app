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
                text: 'tab1',
                iconPath: '',
                selectedIconPath: ''
            },
            {
                pagePath: '/pages/store/index',
                text: 'tab2',
                iconPath: '',
                selectedIconPath: ''
            },
            {
                pagePath: '/pages/discover/index',
                text: 'tab3',
                iconPath: '',
                selectedIconPath: ''
            },
            {
                pagePath: '/pages/my/index',
                text: 'tab4',
                iconPath: '',
                selectedIconPath: ''
            }
        ],
        selected: 0
    }

    switchTab = (e) => {
        const data = e.currentTarget.dataset
        const { path: url, index } = data
        if (index === 1) {
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
                { tabbarList.map((tab, index) => 
                    <CoverView className="tab-bar-item" key={tab.pagePath} data-path={tab.pagePath} data-index={index}  onClick={this.switchTab}>
                        <CoverImage className="image" src={selected === index ? tab.selectedIconPath : tab.iconPath}></CoverImage>
                        <CoverView className={selected === index ? 'text text-selected' : 'text'}>{tab.text}</CoverView>
                    </CoverView>
                    )
                }
            </CoverView>
        )
    }
}

export default Index as ComponentClass<PageOwnProps, PageState>
