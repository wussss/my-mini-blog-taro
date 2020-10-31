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
  const onClose = () => setFlag(false);
  const setStore = (key: string, data: any) => {
    const data1 = JSON.stringify(data); //对象转成字符
    Taro.setStorageSync(key, data1);
  };
  const getStore = (key: string) => {
    const data = Taro.getStorageSync(key);
    if (!data) {
      return [];
    }
    return JSON.parse(data); //字符转成对象
  };
  const [questions, setInfo] = useState(getStore("questions"));
  const onRecieve = (question) => {
    setInfo([...questions, question]);
    Taro.showToast({ title: "问题提交成功" });
    setStore("questions", [...questions, question]);
  };
  const onDelete = (index: number) => {
    questions.splice(index, 1);
    setInfo([...questions]);
    setStore("questions", [...questions]);
  };
  return (
    <View className="index">
      <Text className="title">Taro问答实例</Text>
      <View className="list">
        {questions.map((item, index) => {
          return (
            <View key={index} className="list-item">
              <Text>·</Text>
              <View
                key={index}
                onClick={() => {
                  onDelete(index);
                }}
              >
                {item}
              </View>
            </View>
          );
        })}
      </View>
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
