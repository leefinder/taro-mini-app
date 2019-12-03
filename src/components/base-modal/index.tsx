import { ComponentClass, ReactNode } from 'react'
import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'

type PageOwnProps = {
    children?: ReactNode,
    title?: string,
    warnHtml?: string,
    confirmText?: string,
    onHandlerClose?: () => void
}
type PageState = {
    showModal: boolean
}
type DefaultProps = {
    title: string,
    confirmText: string,
    onHandlerClose: () => void
}
type IProps = PageOwnProps & DefaultProps

interface Index {
    props: IProps,
    state: PageState
}
class Index extends Component {
    constructor (props) {
        super(props)
    }
    state: PageState = {
        showModal: false
    }
    componentDidMount () {
        this.setState({
            showModal: true
        })
    }
    static defaultProps: DefaultProps = {
        title: '提示',
        confirmText: '确定',
        onHandlerClose: function () {}
    }
    closeModal = () => {
        this.setState({
            showModal: false
        })
        this.props.onHandlerClose()
    }
    render () {
        const { showModal } = this.state
        const { title, confirmText, children } = this.props
        return (
            <View className='m-d'>
                <View className={ showModal ? 'content content-active' : 'content'}>
                    <View className='c-hd'>
                        <Text>{title}</Text>
                        <View className='close' onClick={this.closeModal}></View>
                    </View>
                    <View className='c-dt'>
                        {children}
                    </View>
                    <View className='c-btn' onClick={this.closeModal}>{confirmText}</View>
                </View>
            </View>
        )
    }
}
export default Index as ComponentClass<PageOwnProps, PageState>