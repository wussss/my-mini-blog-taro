/* eslint-disable jsx-quotes */
import React from "react";
import Taro from "@tarojs/taro";
import { View, Input, Textarea, Text, Button } from "@tarojs/components";
import "./question.scss";
import useInputEvent from "../../hooks/useInputEvent";

interface IProps {
  onClose: () => void;
  onRecieve: (string) => void;
}
const Question: Taro.FC<IProps> = ({ onClose, onRecieve }) => {
  const { inputValue: question, onInputEvent } = useInputEvent("");
  const {
    inputValue: phoneNumber,
    onInputEvent: onPhoneNumber,
  } = useInputEvent("");
  const onSubmit = () => {
    //数据非空校验
    if (!question || !phoneNumber) {
      Taro.showToast({ title: "请输入问题描述或手机号", icon: "none" });
      return;
    }
    if (phoneNumber.length !== 11) {
      Taro.showToast({ title: "请输入正确的手机号", icon: "none" });
      return;
    }
    //调用父组件的方法向父组件传值
    onRecieve(question);
    onClose()
  };
  return (
    <View className="dialog">
      <View className="question">
        <View className="question-item">
          <Text>问题描述:</Text>
          <Textarea
            focus
            value={question}
            onInput={onInputEvent}
            placeholder="请详细描述您的问题"
          />
        </View>
        <View className="question-item">
          <Text>手机号:</Text>
          <Input
            value={phoneNumber}
            onInput={onPhoneNumber}
            type="number"
            placeholder="请输入您的手机号"
          />
        </View>

        <View className="bottom-button">
          <Button size="mini" className="cancel" onClick={onClose}>
            取消
          </Button>
          <Button size="mini" className="OK" onClick={onSubmit}>
            确定
          </Button>
        </View>
      </View>
    </View>
  );
};

export default Question;
