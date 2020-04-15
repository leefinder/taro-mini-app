import { ReactNode } from 'react'
import Taro, { useState, useEffect, FC } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './index.scss'

type Props = {
    children?: ReactNode,
    title?: string,
    warnHtml?: string,
    confirmText?: string,
    onHandlerClose?: () => void
}

const Component: FC<Props> = ({ title, children, confirmText, onHandlerClose }) => {
    const [ showModal, setShowModal ] = useState<boolean>(false)
    useEffect(() => {
        setShowModal(true)
    }, [])
    function toggleModal () {
        this.setState({
            showModal: false
        })
        if (onHandlerClose && typeof onHandlerClose === 'function') {
            onHandlerClose()
        }
    }
    return (
        <View className='m-d'>
            <View className={ showModal ? 'content content-active' : 'content'}>
                <View className='c-hd'>
                    <Text>{title}</Text>
                    <View className='close' onClick={toggleModal}></View>
                </View>
                <View className='c-dt'>
                    {children}
                </View>
                <View className='c-btn' onClick={toggleModal}>{confirmText}</View>
            </View>
        </View>
    )
} 
Component.defaultProps = {
    title: '提示',
    confirmText: '确定',
    onHandlerClose: function () {}
}

export default Component