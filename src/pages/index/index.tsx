/* eslint-disable jsx-quotes */
import React, { useState } from "react";
import Taro from "@tarojs/taro";
import { View, Text, Input, Button } from "@tarojs/components";
import "./index.scss";
import useInputEvent from "../../hooks/useInputEvent";

const Index: Taro.FC = () => {
  const [list, setList] = useState<string[]>([]);
  const { inputValue: todo, onInputEvent, setValue: setTodo } = useInputEvent(
    ""
  );
  const onSubmit = () => {
    setList([...list, todo]);
    setTodo("");
  };

  return (
    <View className="index">
      <View className="submit">
        <Input
          type="text"
          placeholder="请输入todo"
          className="input"
          onInput={onInputEvent}
          value={todo}
        />
        <Button onClick={onSubmit} className="button" size="mini">
          Sumbit
        </Button>
      </View>
      <View className="list">
        {list.map((item, index) => (
          <Text key={index}>{index+1}、{item}</Text>
        ))}
      </View>
    </View>
  );
};

export default Index;
