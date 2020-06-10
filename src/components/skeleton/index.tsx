import Taro, { FC } from '@tarojs/taro';
import { View, Block } from '@tarojs/components';
import { SkeletonType } from '@/typeTs/index';
import './index.scss';

type Props = {
    skeletonNodes: SkeletonType,
    loading: string // 'spin', 'chiaroscuro', 'shine'
}
const Component: FC<Props> = ({ skeletonNodes: PropsNodes, loading }) => {
    return (
        <View
            style={PropsNodes.container}
            className={`skeleton skeleton_${loading}`}
            >
            { PropsNodes.lists.map(item => <Block key={item.key}>
                    {
                        item.nodeList.map((node) => <View key={node.key}
                        className={`skeleton__item skeleton__item_${item.type}`}
                        style={node.cssText}
                    ></View>)
                    }
                </Block>)
            }
            <View className='skeleton__spinbox'>
                <View className='skeleton__spin'></View>
            </View>
            <View className='skeleton__shine'></View>
        </View>
    )
}
Component.defaultProps = {
    skeletonNodes: {
        container: '',
        lists: []
    },
    loading: 'spin'
}
export default Component