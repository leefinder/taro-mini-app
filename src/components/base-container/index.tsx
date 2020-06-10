import { ReactNode } from 'react'
import Taro, { FC } from '@tarojs/taro'
import { View } from '@tarojs/components'
import './index.scss'
type Props = {
    children?: ReactNode
}

const Component: FC<Props> = ({ children }) => {
    return (
        <View className="root-page">
            {children}
        </View>
    );
};
export default Component;