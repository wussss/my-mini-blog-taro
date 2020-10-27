import {useState } from 'react'

export default function useInputEvent<T>(initValue: T) {

	const [ inputValue, setValue ] = useState(initValue)
	const onInputEvent = (e) => setValue(e.target.value)
	//参数e接收事件对象; e.target.value获取的就是你选择接受事件的元素输入的或者选择的值。
	return { inputValue, onInputEvent, setValue }
}