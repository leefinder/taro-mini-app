import { ComponentClass } from 'react'
import Taro, { Component } from '@tarojs/taro'
import { Image, Button } from '@tarojs/components'

import './index.scss'

class Index extends Component {
    state = {
        serviceIcon: '',
    }
    render () {
        const { serviceIcon } = this.state
        return (
            <Button className='s-btn' open-type='contact' plain>
                <Image className='s-img' src={serviceIcon}></Image>
            </Button>
        )
        
    }
}

export default Index as ComponentClass<{}, {}>