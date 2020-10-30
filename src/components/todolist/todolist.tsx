/* eslint-disable jsx-quotes */
import React, { useState } from "react";
import Taro from "@tarojs/taro";
import { View, Text, Input, Button } from "@tarojs/components";
import "./todolist.scss";
import useInputEvent from "../../hooks/useInputEvent";


const TodoList: Taro.FC = () => {
  const { inputValue: todo, onInputEvent, setValue: setTodo } = useInputEvent(
    ""
  );
  const [newList, setList] = useState<string[]>([]);
  const onSubmit = () => {
    setList([...newList, todo]);
    setTodo("");
  };
  const onDelete = (index: number) => {
    newList.splice(index, 1);
    setList([...newList]);
  };
  return (
    <View className="todolist">
      <View className="submit">
        <Input
          type="text"
          placeholder="请输入todo"
          className="input"
          onInput={onInputEvent}
          value={todo}
        />
        <Button onClick={onSubmit} className="todo-button" size="mini">
          Sumbit
        </Button>
      </View>
      <View className="list">
        {newList.map((item, index) => (
          <Text
            key={index}
            onClick={() => {
              onDelete(index);
            }}
          >{`${index + 1}.${item}`}</Text>
        ))}
      </View>
    </View>
  );
};

export default TodoList;
