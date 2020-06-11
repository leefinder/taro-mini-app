import Taro, { FC, useState, useEffect } from '@tarojs/taro';
import { View } from '@tarojs/components';
import './index.scss';

type Props = {
    bgcolor?: string,
    selector?: string, 
    loading?: string,// 'spin', 'chiaroscuro', 'shine'
    unit?: string
}
const Component: FC<Props> = ({ bgcolor, selector, loading, unit }) => {
    const [containerStyle, setContainerStyle] = useState<string>('')
    const [skeletonRectLists, setSkeletonRectLists] = useState<Array<{
        top: number,
        left: number,
        right: number,
        bottom: number,
        width: number,
        height: number,
        dataset: Object,
        id: string | number
    }>>([])
    const [skeletonCircleLists, setSkeletonCircleLists] = useState<Array<{
        top: number,
        left: number,
        right: number,
        bottom: number,
        width: number,
        height: number,
        dataset: Object,
        id: string | number
    }>>([])
    useEffect(() => {
        const propContainer = `background-color:${bgcolor};`
        setContainerStyle(propContainer)
        rectHandle()
        circleHandle()
    }, [])
    function rectHandle () {
        //绘制不带样式的节点
        Taro.createSelectorQuery().selectAll(`.${selector} >>> .${selector}-rect`).boundingClientRect().exec((res) => {
            console.log(res)
            setSkeletonRectLists(res[0])
        })
    }
    function circleHandle () {
        Taro.createSelectorQuery().selectAll(`.${selector} >>> .${selector}-circle`).boundingClientRect().exec((res) => {
            setSkeletonCircleLists(res[0])
        })
    }
    return (
        <View className="skeleton-box" style={containerStyle}>

            { skeletonRectLists.length && skeletonRectLists.map(item => <View className={loading === 'chiaroscuro' ? 'chiaroscuro' : ''}
                style={`width: ${item.width}${unit};height: ${item.height}${unit};background-color:#f2f2f2;position:absolute;left:${item.left}${unit};top:${item.top}${unit};`}>
            </View>)
            }
            { skeletonCircleLists.length && skeletonCircleLists.map(item => <View className={loading === 'chiaroscuro' ? 'chiaroscuro' : ''}
                style={`width: ${item.width}${unit};height: ${item.height}${unit};background-color:#f2f2f2;border-radius:${item.width}${unit};position:absolute;left:${item.left}${unit};top:${item.top}${unit};`}>
            </View>)
            }
            { loading === 'spin' && <View className="spinbox">
                <View className="spin"></View>
            </View>
            }
            { loading === 'shine' && <View className='skeleton__shine'></View>}
        </View>
    )
}
Component.defaultProps = {
    bgcolor: '#FFF',
    selector: 'skeleton', 
    loading: 'shine',// 'spin', 'chiaroscuro', 'shine'
    unit: 'px'
}
export default Component