import Taro, { useState, useEffect, FC } from '@tarojs/taro';
import { View, Text, PickerView, PickerViewColumn } from '@tarojs/components';
import './index.scss';

type Vl = {
    value: number | string,
    label: number | string
}

type Column = {
    values: Vl,
    defaultIndex?: number,
    children?: Columns
}

type Columns = Array<Column>

type FormatColumn = {
    values: Vl[],
    defaultIndex?: number,
}


type FormatColumns = Array<FormatColumn>


type Props = {
    showToolbar?: boolean,
    confirmText?: string,
    cancelText?: string,
    title?: string,
    confirm?: (values: Vl[]) => void,
    cancel?: () => void,
    change?: () => void,
    columns: Columns,
    defaultIndex?: number
}


const Component: FC<Props> = ({ showToolbar = true, confirmText = '确定', cancelText = '取消', title = '', confirm, cancel, change, columns, defaultIndex = 0 }) => {
    const [formatColumns, setFormatColumns] = useState<FormatColumns>([])
    const [curSelect, setCurSelect] = useState<number[]>([])
    const [hasDone, setHasDone] = useState<boolean>(true)
    useEffect(() => {
        const tp = columnType()
        if (tp === 'cascade') {
            formatCascade()
        } else if (tp === 'object') {
            // setFormatColumns(columns)
        }
    }, [])
    useEffect(() => {
        if (curSelect.length > 0) {
            onCascadeChange()
        }
    }, [curSelect])
    function formatCascade () {
        const formatted: FormatColumns  = []
        let cursor: Column = { values: { label: '', value: ''}, children: columns, defaultIndex }
        let arr: number[] = []
        while (cursor && cursor.children) {
            const idx = cursor.defaultIndex !== undefined ? cursor.defaultIndex : defaultIndex
            formatted.push({
                values: cursor.children.map(item => item.values),
                defaultIndex: idx
            })
            cursor = cursor.children[idx]
            arr.push(idx)
        }
        setFormatColumns(formatted)
        setCurSelect(arr)
    }
    function onCascadeChange () {
        const formatted: FormatColumns  = []
        let cursor: Column = { values: { label: '', value: ''}, children: columns, defaultIndex: 0 }
        let index = 0
        while (cursor && cursor.children) {
            const idx = curSelect[index]
            formatted.push({
                values: cursor.children.map(item => item.values),
                defaultIndex: idx
            })
            cursor = cursor.children[idx]
            index++
        }
        setFormatColumns(formatted)
    }
    function columnType () {
        const firstColumn = columns[0]
        if (firstColumn.children) {
            return 'cascade'
        }
        if (firstColumn.values) {
            return 'object'
        }
    }
    function onChange ({ detail }) {
        const { value } = detail
        setCurSelect(value)
    }
    function onHandleCancel () {
        if (cancel && typeof cancel === 'function') {
            cancel()
        }
    }
    function onHandleConfirm () {
        if (!hasDone) {
            return
        }
        if (confirm && typeof confirm === 'function') {
            confirm(formatColumns.map(({ values }, index) => values[curSelect[index]]))
        }
    }
    function preventEvent (e) {
        e.preventDefault()
    }
    function stopEvent (e) {
        e.stopPropagation()
    }
    function onPickStart () {
        setHasDone(false)
    }
    function onPickEnd () {
        setHasDone(true)
    }
    return (
        <View className="picker-cont" onClick={onHandleCancel}>
            <View className="picker-box" onClick={stopEvent}>
                { showToolbar &&
                    <View className="tool-bar">
                        <View onClick={onHandleCancel}>{cancelText}</View>
                        <Text>{title}</Text>
                        <View onClick={onHandleConfirm}>{confirmText}</View>
                    </View>
                }
                <PickerView
                    indicatorStyle='height: 50px;'
                    className="picker"
                    onChange={onChange}
                    onPickStart={onPickStart}
                    onPickEnd={onPickEnd}
                    onClick={stopEvent}
                    value={curSelect}
                    >
                        { formatColumns.map((column) => {
                            const { values } = column
                            return <PickerViewColumn>
                                {
                                    values.map((val) => {
                                        const { label, value } = val
                                        return <View key={value}>{label}</View>
                                    })
                                }
                            </PickerViewColumn>
                        })}
                </PickerView>
            </View>
        </View>
    )
}
Component.defaultProps = {
    confirm: (values: Vl[]) => {},
    cancel: () => {}
}
export default Component;