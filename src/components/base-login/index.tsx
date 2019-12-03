import { ComponentClass } from 'react'
import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image, Button, Input, Navigator } from '@tarojs/components'
import { LoginService } from '@/services/index'
import './index.scss'
import successImage from '../../images/toast/success.png'
import errorImage from '../../images/toast/error.png'

import { loginCode } from './utils'
type PageOwnProps = {
    redirect?: string,
    showAsModal?: boolean,
    onHandlerClose?: () => void
}
type DefaultProps = {
    onHandlerClose: () => void
}
type PageState = {
    chooseLogin: number,
    phone: string,
    smscode: string,
    closeIcon: string,
    closeModal: string,
    clearBtn: boolean,
    hasSend: boolean,
    phoneValid: boolean,
    second: number,
    formValid: boolean,
    iv: string,
    encryptedData: string,
    loginCode: string,
    agreementWindow: boolean,
    authorizeTips: boolean
}

type IProps = PageOwnProps & DefaultProps

interface Index {
    props: IProps,
    state: PageState
}
class Index extends Component {
    state: PageState = {
        chooseLogin: 1,
        phone: '',
        smscode: '',
        closeIcon: '',
        closeModal: '',
        clearBtn: false,
        hasSend: false,
        phoneValid: false,
        second: 60,
        formValid: false,
        iv: '',
        encryptedData: '',
        loginCode: '',
        agreementWindow: false,
        authorizeTips: false
    }
    static defaultProps: DefaultProps = {
        onHandlerClose: () => {}
    }
    constructor (props) {
        super(props)
    }
    render() {
        const { chooseLogin, phone, smscode, closeModal, closeIcon, clearBtn, hasSend, phoneValid, second, formValid, agreementWindow, authorizeTips } = this.state
        const { showAsModal } = this.props
        return (
            <View className={showAsModal ? 'modal-mask' : ''}>
                <View className='modal-login'>
                    <View className='title'>立即登录</View>
                    <View className='title'>领跑智慧生活</View>
                    {showAsModal ? <View className="close-btn" onClick={this.onHandlerClose}>
                        <Image src={closeModal}></Image>
                    </View> : ''}
                    <View className='login-tabtitle'>
                        <Text className={chooseLogin === 1 ? 'active' : ''} onClick={() => this.loginClick(1)}>微信登录</Text>
                        <Text className={chooseLogin === 2 ? 'active' : ''} onClick={() => this.loginClick(2)}>登录</Text>
                    </View>
                    {chooseLogin === 1 ? <View className='wechat-login'>
                        <Button className='basic-btn' hover-className='none' open-type='getPhoneNumber' onGetPhoneNumber={this.getPhoneNumber}>快捷登录</Button>
                    </View> : ''}
                    {chooseLogin === 2 ? <View className='login-form'>
                        <View className='item'>
                            <Input type='number' value={phone} placeholder='请输入手机号' placeholder-className='Input-placeholder' className='flex-one' onInput={this.phoneInput} maxLength={11} cursorSpacing={150} />
                            {clearBtn ? <Image src={closeIcon} className='close' onClick={this.clearPhoneInput}></Image> : ''}
                        </View>
                        <View className='tip-txt'>未注册手机验证后自动登录</View>
                        <View className='item'>
                            <Input type='number' value={smscode} placeholder='验证码' onInput={this.codeInput} maxLength={4} cursorSpacing={76} />
                            {hasSend ? <Text className='code-btn disable'>{second + 's'}</Text> : <Text className={phoneValid ? 'code-btn' : 'code-btn disable'} onClick={this.sendCode}>获取验证码</Text>}
                        </View>
                        <View className='flex-one'>
                            <Button className={formValid ? 'basic-btn' : 'basic-btn disable'} onClick={this.onSubmit}>登录</Button>
                        </View>
                    </View> : ''}
                    <View className='cent protocol-link'>
                        <Navigator url='../protocol/index' hover-className='none' open-type='navigate'>《用户协议》</Navigator>
                    </View>
                </View>
                {authorizeTips ? <View className='modal-mask'>
                    <View className='modal-exit'>
                        <View className="txt cent">微信请求授权使</View>
                        <View className='txt cent' style='padding-top:0rpx;'>用你的个人信息</View>
                        <View className='foot-btn'>
                            <Button className='item' hover-class="none" onClick={this.closeAuthorizeTips}>拒绝</Button>
                            <Button className='item' style='color:#2F9833' open-type='getUserInfo' onGetUserInfo={this.getUserInfo}>允许</Button>
                        </View>
                    </View>
                </View> : ''}
                {agreementWindow ? <View className='modal-maskx'>
                    <View className='modal-protocol'>
                        <View className='title'>《零跑用户协议》</View>
                        <View className='protocol-scroll'>
                            <View className='txt'>本协议是您（或称“用户”）与“零跑APP”所有者（以下简称为'零跑科技'）之间就“零跑APP”服务等相关事宜所订立的协议，浙江零跑科技有限公司及其关联方（以下统称“零跑科技”）在此
                            <Text className='bold'>特别提醒您认真阅读、充分理解</Text>---本协议中各条款，
                            <Text className='bold'>包括免除或者限制零跑科技责任的免责条款及对用户的权利限制条款</Text>。请您审慎阅读并选择接受或不接受本协议。除非您接受本协议所有条款，否则您无权注册、登录或使用本协议所涉相关服务。请您仔细阅读本注册协议，您点击'同意并继续'按钮后，本协议即构成对双方有约束力的法律文件。</View>
                            <View className='txt'>第1条 “零跑APP”服务条款的确认和接纳 </View>
                            <View className='txt'>1.1“零跑APP”的各项电子服务的所有权和运作权归零跑科技所有。用户同意所有注册协议条款并完成注册程序，才能成为“零跑APP”的正式用户。用户确认：本协议条款是处理双方权利义务的协议，自用户同意注册之日起生效，法律另有强制性规定或双方另有特别约定的，依其规定。</View>
                            <View className='txt'>1.2用户点击同意本协议的，即视为用户确认自己具有享受“零跑APP”服务、下单购物等相应的权利能力和行为能力，能够独立承担法律责任。</View>
                            <View className='txt'>1.3如果您在18周岁以下，您只能在父母或监护人的监护参与下才能使用“零跑APP”。 </View>
                            <View className='txt'>1.4零跑科技保留在中华人民共和国法律允许的范围内单方决定拒绝服务、关闭用户账户、清除或编辑内容或取消订单的权利。</View>
                            <View className='txt'>第2条 “零跑APP”服务 </View>
                            <View className='txt'>2.1零跑科技通过互联网依法为用户提供产品、服务等各类服务及体验，用户在完全同意本协议及“零跑APP”规定的情况下，方有权直接或间接使用“零跑APP”的内容及相关服务。</View>
                            <View className='txt'>2.2用户必须自行准备如下设备和承担如下开支：</View>
                            <View className='txt'>（1）上网设备，包括并不限于电脑或者其他上网终端、调制解调器及其他必备的上网装置；</View>
                            <View className='txt'>（2）上网开支，包括并不限于网络接入费、上网设备租用费、手机流量费等。 </View>
                            <View className='txt'> 第3条 用户信息 </View>
                            <View className='txt'>3.1用户应自行诚信向“零跑APP”提供注册资料，用户同意其提供的注册资料真实、准确、完整、合法有效，用户注册资料如有变动的，应及时更新其注册资料。如果用户提供的注册资料不合法、不真实、不准确、不详尽的，用户需承担因此引起的相应责任及后果，并且零跑科技保留终止用户使用零跑科技各项服务，包括但不限于使用零跑科技各类网站、APP等的权利。</View>
                            <View className='txt'>3.2用户在“零跑APP”进行浏览、下单购物等活动时，涉及用户真实姓名/名称、通信地址、联系电话、电子邮箱等隐私信息的，“零跑APP”将予以严格保密，除非得到用户的授权或法律另有规定，“零跑APP”不会向无关联的第三方披露用户隐私信息。</View>
                            <View className='txt'>3.3用户注册成功后，将产生用户名和密码等账户信息，您可以根据“零跑APP”规定改变您的密码。用户应谨慎合理的保存、使用其用户名和密码。零跑科技对由于用户使用不当或其他非零跑科技自身原因而导致任何个人信息的泄露不承担责任。用户若发现任何非法使用用户账号或存在安全漏洞的情况，请立即通知“零跑APP”并向公安机关报案。</View>
                            <View className='txt'>3.4用户同意，零跑科技拥有通过邮件、短信电话等形式，向在“零跑APP”注册、购物用户、收货人发送订单信息、促销活动等告知信息的权利。 </View>
                            <View className='txt'>3.5用户不得将在“零跑APP”注册获得的账户借给他人使用，否则用户应承担由此产生的全部责任，并与实际使用人承担连带责任。 </View>
                            <View className='txt'>3.6用户同意，零跑科技有权在提供商品及服务相关范围内合理使用用户的注册信息等，以合理的方式管理用户的注册账户，进行证据保全，包括但不限于公证、见证等。</View>
                            <View className='txt'>第4条 用户依法言行义务 </View>
                            <View className='txt'>本协议依据国家相关法律法规规章制定，用户同意严格遵守以下义务：</View>
                            <View className='txt'>（1）不得传输或发表：煽动抗拒、破坏宪法和法律、行政法规实施的言论，煽动颠覆国家政权，推翻社会主义制度的言论，煽动分裂国家、破坏国家统一的的言论，煽动民族仇恨、民族歧视、破坏民族团结的言论；</View>
                            <View className='txt'>（2）从中国大陆向境外传输资料信息时必须符合中国有关法规； </View>
                            <View className='txt'>（3）不得利用“零跑APP”从事洗钱、窃取商业秘密、窃取个人信息等违法犯罪活动；</View>
                            <View className='txt'>（4）不得干扰“零跑APP”的正常运转，不得侵入“零跑APP”及国家计算机信息系统； </View>
                            <View className='txt'>（5）不得传输或发表任何违法犯罪的、骚扰性的、中伤他人的、辱骂性的、恐吓性的、伤害性的、庸俗的，淫秽的、不文明的等信息资料；</View>
                            <View className='txt'>（6）不得传输或发表损害国家社会公共利益和涉及国家安全的信息资料或言论； </View>
                            <View className='txt'>（7）不得教唆他人从事本条所禁止的行为； </View>
                            <View className='txt'>（8）不得利用在“零跑APP”注册的账户进行牟利性经营活动；</View>
                            <View className='txt'>（9）不得发布任何侵犯他人著作权、商标权等知识产权或合法权利的内容；</View>
                            <View className='txt'>用户应不时关注并遵守“零跑APP”不时公布或修改的各类合法规则规定。 </View>
                            <View className='txt'>“零跑APP”保有删除站内各类不符合法律政策或不真实的信息内容而无须通知用户的权利。</View>
                            <View className='txt'>若用户未遵守以上规定的，“零跑APP”有权作出独立判断并采取暂停或关闭用户帐号等措施。用户须对自己在网上的言论和行为承担法律责任。</View>
                            <View className='txt'>第5条 商品信息 </View>
                            <View className='txt'>“零跑APP”上的商品价格、数量、是否有货等商品信息随时都有可能发生变动，“零跑APP”不作特别通知。由于APP上商品信息的数量极其庞大，虽然“零跑APP”会尽最大努力保证您所浏览商品信息的准确性，但由于众所周知的互联网技术因素等客观原因存在，“零跑APP”网页显示的信息可能会有一定的滞后性或差错，对此情形您知悉并理解；零跑科技欢迎纠错，并会视情况给予纠错者一定的奖励。</View>
                            <View className='txt'>为表述便利，商品和服务简称为'商品'或'货物'。 </View>
                            <View className='txt'>第6条 订单 </View>
                            <View className='txt'>如您拟采购零跑科技商品，请认真阅读零跑科技订购的官方信息，履行在线订购程序。交易涉及的各方具体权利义务、配送等事宜以最终签署的购买协议为准。</View>
                            <View className='txt'>6.1在您下订单时，请您仔细确认所购商品的名称、价格、数量、型号、规格、尺寸、联系地址、电话、收货人等信息。收货人与用户本人不一致的，收货人的行为和意思表示视为用户的行为和意思表示，用户应对收货人的行为及意思表示的法律后果承担连带责任。</View>
                            <View className='txt'>6.2除法律另有强制性规定外，双方约定如下：“零跑APP”上销售方展示的商品和价格等信息仅仅是交易信息的发布，您下单时须填写您希望购买的商品数量、价款及支付方式、收货人、联系方式、收货地址等内容；系统生成的订单信息是计算机信息系统根据您填写的内容自动生成的数据，仅是您向销售方发出的交易诉求；销售方收到您的订单信息并在销售方根据实际库存等情况，在订购流程中正式确认订单信息后，方视为您与销售方之间就实际直接向您发出的商品建立了交易关系；如果您在一份订单里订购了多种商品并且销售方只确认了订单的部分商品时，您与销售方之间仅就实际确认的商品建立了交易关系。您可以随时登录您在“零跑APP”注册的账户，查询您的订单状态。</View>
                            <View className='txt'>6.3由于市场变化及各种以合理商业努力难以控制的因素的影响，“零跑APP”无法保证您提交的订单信息中希望购买的商品都会有货；如您拟购买的商品，发生缺货，您有权取消订单。</View>
                            <View className='txt'>第7条 配送 </View>
                            <View className='txt'>7.1销售方将会把商品按照最终签署的购车协议的约定配送至约定地点。</View>
                            <View className='txt'>7.2因如下情况造成订单延迟或无法配送等，销售方不承担延迟配送的责任：</View>
                            <View className='txt'>（1）用户提供的信息错误、地址不详细等原因导致的；</View>
                            <View className='txt'>（2）货物送达后无人签收，导致无法配送或延迟配送的； </View>
                            <View className='txt'>（3）情势变更因素导致的； </View>
                            <View className='txt'>（4）不可抗力因素导致的，例如：自然灾害、交通戒严、突发战争等；</View>
                            <View className='txt'>（5）其它购车协议中约定的免责事由。</View>
                            <View className='txt'>第8条 所有权及知识产权条款 </View>
                            <View className='txt'>8.1用户一旦接受本协议，即表明该用户主动将其在任何时间段在“零跑APP”发表的任何形式的信息内容（包括但不限于客户评价、客户咨询、各类话题文章等信息内容）的财产性权利等任何可转让的权利，如著作权财产权（包括并不限于：复制权、发行权、出租权、展览权、表演权、放映权、广播权、信息网络传播权、摄制权、改编权、翻译权、汇编权以及应当由著作权人享有的其他可转让权利），全部独家且不可撤销地转让给零跑科技所有，用户同意零跑科技有权就任何主体侵权而单独提起诉讼。</View>
                            <View className='txt'>
                                <Text className='bold'>8.2本协议已经构成《中华人民共和国著作权法》第二十五条（条文序号依照2011年版著作权法确定）及相关法律规定的著作财产权等权利转让书面协议，其效力及于用户在“零跑APP”上发布的任何受著作权法保护的作品内容，无论该等内容形成于本协议订立前还是本协议订立后。</Text>
                            </View>
                            <View className='txt'>
                                <Text className='bold'>8.3用户同意并已充分了解本协议的条款，承诺不将已发表于“零跑APP”的信息，以任何形式发布或授权其它主体以任何方式使用（包括但不限于在各类网站、媒体上使用）。</Text>
                            </View>
                            <View className='txt'>
                                <Text className='bold'>用户在“零跑APP”或互动平台上发布的信息不得侵犯任何第三人的知识产权及其它合法权益，未经相关权利人事先同意，用户不得以任何方式上传、发布、修改、传播或复制任何受保护的材料或属于其他人的专有信息。如果任何权利人向零跑科技提出异议，零跑科技将在适当审查的基础上移除该等侵犯他人合法权益的内容。</Text>
                            </View>
                            <View className='txt'>
                                <Text className='bold'>未经零跑科技事先书面同意，用户不得将零跑科技标识以任何方式展示或使用或作其他处理，任何单位及个人不得以任何方式或理由对该标识的任何部分进行使用、复制、修改、传播、抄录或与其它产品捆绑使用销售。</Text>
                            </View>
                            <View className='txt'>8.4零跑科技是“零跑APP”的制作者,拥有此APP内容及资源的著作权等合法权利,受国家法律保护,有权不时地对本协议及“零跑APP”的内容进行修改，并在“零跑APP”公布，无须另行通知用户。零跑科技对本协议及“零跑APP”内容拥有解释权。</View>
                            <View className='txt'>8.5除法律另有强制性规定外，未经零跑科技明确的特别书面许可,任何单位或个人不得以任何方式非法地全部或部分复制、转载、引用、链接、抓取或以其他方式使用“零跑APP”的信息内容，否则，零跑科技有权追究其法律责任。</View>
                            <View className='txt'>8.6“零跑APP”所刊登的资料信息（诸如文字、图表、标识、按钮图标、图像、声音文件片段、数字下载、数据编辑和软件），均是零跑科技或其内容提供者的财产，受中国和国际版权法的保护。“零跑APP”上所有内容的汇编是零跑科技的排他财产，受中国和国际版权法的保护。“零跑APP”上所有软件都是零跑科技或其关联公司或其软件供应商的财产，受中国和国际版权法的保护。</View>
                            <View className='txt'>第9条
                            <Text className='bold'>责任限制及不承诺担保 </Text>
                            </View>
                            <View className='txt'>
                                <Text className='bold'>除非另有明确的书面说明, “零跑APP”及其所包含的或以其它方式通过“零跑APP”提供给您的全部信息、内容、材料、产品（包括软件）和服务，均是在'按现状'和'按现有'的基础上提供的。</Text>
                            </View>
                            <View className='txt'>
                                <Text className='bold'>除非另有明确的书面说明,零跑科技不对“零跑APP”的运营及其包含在APP上的信息、内容、材料、产品（包括软件）或服务作任何形式的、明示或默示的声明或担保（根据中华人民共和国法律另有规定的以外）。</Text>
                            </View>
                            <View className='txt'>
                                <Text className='bold'>零跑科技不担保“零跑APP”所包含的或以其它方式通过“零跑APP”提供给您的全部信息、内容、材料、产品（包括软件）和服务、其服务器或从“零跑APP”发出的电子信件、信息没有病毒或其他有害成分。</Text>
                            </View>
                            <View className='txt'>
                                <Text className='bold'>如因不可抗力或其它“零跑APP”无法控制的原因使“零跑APP”销售系统崩溃或无法正常使用导致网上交易无法完成或丢失有关的信息、记录等，零跑科技会合理地尽力协助处理善后事宜。</Text>
                            </View>
                            <View className='txt'>
                                <Text className='bold'>任何由于黑客攻击，电脑病毒的侵入，非法内容信息、骚扰信息的屏蔽，政府管制以及其他任何网络、技术、通信线路、信息安全管理措施等原因造成的服务中断、受阻等不能满足用户要求的情形，零跑科技不承担责任；</Text>
                            </View>
                            <View className='txt'>
                                <Text className='bold'>用户因第三方如运营商的通讯线路故障、技术问题、网络、电脑故障、系统不稳定及其他因不可抗力造成的损失的情形，零跑科技不承担责任；</Text>
                            </View>
                            <View className='txt'>第10条 协议更新及用户关注义务 </View>
                            <View className='txt'>根据国家法律法规变化及APP运营需要，零跑科技有权对本协议条款不时地进行修改，修改后的协议一旦被公布在“零跑APP”上即生效，并代替原来的协议。用户可随时登录查阅最新协议；用户有义务不时关注并阅读最新版的协议及公告。如用户不同意更新后的协议，可以且应立即停止接受“零跑APP”依据本协议提供的服务，包括但不限于注销账号、电话取消会员注册、停止接收信息；如用户继续使用本APP提供的服务的，即视为同意更新后的协议。零跑科技建议您在使用“零跑APP”之前阅读本协议及“零跑APP”的公告。</View>
                            <View className='txt'>如果本协议中任何一条被视为废止、无效或因任何理由不可执行，该条应视为可分的且并不影响任何其余条款的有效性和可执行性。 </View>
                            <View className='txt'>第11条 法律管辖和适用 </View>
                            <View className='txt'>本协议的订立、执行和解释及争议的解决均应适用在中华人民共和国大陆地区适用之有效法律（但不包括其冲突法规则）。</View>
                            <View className='txt'>如发生本协议与适用之法律相抵触时，则这些条款将完全按法律规定重新解释，而其它有效条款继续有效。</View>
                            <View className='txt'>如缔约方就本协议内容或其执行发生任何争议，双方应尽力友好协商解决；协商不成时，任何一方均可向零跑科技住所地有管辖权的法院提起诉讼。</View>
                            <View className='txt'>第12条 其他 </View>
                            <View className='txt'>12.1“零跑APP”所有者是指在政府部门依法许可或备案的“零跑APP”经营主体。</View>
                            <View className='txt'>12.2零跑科技尊重用户和消费者的合法权利，本协议及APP上发布的各类规则、声明等其他内容，均是为了更好的、更加便利的为用户和消费者提供服务。“零跑APP”欢迎用户和社会各界提出意见和建议，零跑科技将虚心接受并适时修改本协议及“零跑APP”上的各类规则。</View>
                            <View className='txt'>12.3本协议内容中以黑体、加粗、下划线、斜体等方式显著标识的条款，请用户着重阅读。 </View>
                        </View>
                        <View className='protocol-btn'>
                            <Button className='item' onClick={this.closeAgreement} hover-className='none'>不同意</Button>
                            <Button className='basic-btn item' over-className='none' open-type='getUserInfo' onGetUserInfo={this.onUserRegister}>同意本协议</Button>
                        </View>
                    </View>
                </View> : ''}
            </View>
        )
    }
}

export default Index as ComponentClass<PageOwnProps, PageState>