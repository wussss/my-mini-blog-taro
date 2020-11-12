/* eslint-disable jsx-quotes */
import React, { useState } from "react";
import Taro from "@tarojs/taro";
import classnames from "classnames";
import { View, Text, Button } from "@tarojs/components";
import useToggle from "../../hooks/useToggle";
import Question from "../../components/question/question";

import "./index.scss";
import "../../statics/iconfont/iconfont.scss";

interface IQuestion {
  id: number;
  question: String;
  like: number;
  unlike: number;
}
const Index: Taro.FC = () => {
  const { flag: isVisible, setFlag, onToggle } = useToggle(false);
  const onClose = () => setFlag(false);
  const setStore = (key: string, data: IQuestion[]) => {
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
  const [questions, setInfo] = useState<IQuestion[]>(getStore("questions"));
  const onRecieve = (question) => {
    const questionItem: IQuestion = {
      id: Math.random() * 10000,
      question: question,
      like: 0,
      unlike: 0,
    };
    setInfo([...questions, questionItem]);
    Taro.showToast({ title: "问题提交成功" });
    setStore("questions", [...questions, questionItem]);
  };
  const onDelete = (index: number) => {
    questions.splice(index, 1);
    setInfo([...questions]);
    setStore("questions", [...questions]);
    console.log(questions);
  };
  const addCount1 = (item: IQuestion) => {
    item.like = item.like + 1;
    const List = questions;
    const newList = List.map((question_item) => {
      if (question_item.id === item.id) {
        question_item = item;
      }
      return question_item;
    });
    setInfo([...newList]);
    setStore("questions", [...newList]);
  };
  const addCount2 = (item: IQuestion) => {
    item.unlike = item.unlike + 1;
    const List = questions;
    const newList = List.map((question_item) => {
      if (question_item.id === item.id) {
        question_item = item;
      }
      return question_item;
    });
    setInfo([...newList]);
    setStore("questions", [...newList]);
  };
  const sortNumber = (a: IQuestion, b: IQuestion) => {
    return b.like - a.like;
  }; //按数字从大到小排序
  return (
    <View className="index">
      <Text
        style={{
          color: " #4d344d",
          fontSize: "14PX",
          textDecoration: "underline",
        }}
        onClick={() => {
          Taro.navigateTo({ url: "../TodoList/index" });
        }}
      >
        查看TodolList
      </Text>
      <Text className="title">Taro问答实例</Text>
      <View className="list">
        {questions.sort(sortNumber).map((item, index) => {
          return (
            <View key={item.id} className="list-item">
              <Text className="contont-before">·</Text>
              <View
                className="content"
                key={item.id}
                onClick={() => {
                  onDelete(index);
                }}
              >
                {item.question}
              </View>
              <View className="icon-list">
                <View
                  className="iconfont icon-weibiaoti--"
                  style="font-size:20PX;color:#c597c5;margin-left:20PX"
                  onClick={() => {
                    addCount1(item);
                  }}
                >
                  {item.like}
                </View>
                <View
                  className="iconfont icon-dislike"
                  style="font-size:20PX;color:#c597c5;margin-left:20PX"
                  onClick={() => {
                    addCount2(item);
                  }}
                >
                  {item.unlike}
                </View>
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
