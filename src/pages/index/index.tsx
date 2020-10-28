/* eslint-disable jsx-quotes */
import React, { useState } from "react";
import Taro from "@tarojs/taro";
import { View, Text, Image ,Button} from "@tarojs/components";
import "./index.scss";
import TodoList from "../../components/todolist/todolist";
import Img from "../../statics/test.png";

const Index: Taro.FC = () => {
  const [list] = useState(["示例1", "示例2"]);
  return (
    <View>
      <Text>首页</Text>;<Image src={Img}></Image>
      <TodoList list={list}>
        <Text>测试一下</Text>
      </TodoList>
    </View>
  );
};

export default Index;
