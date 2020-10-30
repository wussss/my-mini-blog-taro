/* eslint-disable jsx-quotes */
import React, { useState } from "react";
import Taro from "@tarojs/taro";
import classnames from "classnames";
import { View, Text, Button } from "@tarojs/components";
import useToggle from "../../hooks/useToggle";
import Question from "../../components/question/question";

import "./index.scss";

const Index: Taro.FC = () => {
  const { flag: isVisible, setFlag, onToggle } = useToggle(false);
  const [question, setInfo] = useState("");
  const onClose = () => setFlag(false);
  const onRecieve = (newInfo) => {
    setInfo(newInfo);
    Taro.showToast({ title: "问题提交成功" });
    console.log(newInfo)
  };
  return (
    <View className="index">
      <Text className="title">Taro问答实例</Text>
      <View>{question}</View>
      {isVisible && <Question onClose={onClose} onRecieve={onRecieve} />}
      <Button
        className={classnames({
          button: true,
          button_back: isVisible,
        })}
        size="mini"
        onClick={onToggle}
      >
        {isVisible ? "返回" : "提问"}
      </Button>
    </View>
  );
};

export default Index;
