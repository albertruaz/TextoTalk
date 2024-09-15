import { Component, For } from "solid-js";
import { ParsedData } from "../utils/parseData";

interface ParsedDataDisplayProps {
  data: ParsedData[];
  info: string;
}

const ParsedDataDisplay: Component<ParsedDataDisplayProps> = (props) => {
  const info = () => props.info;
  return (
    <div>
      <h2>Parsed Content: username is {info()}</h2>
      <For each={props.data}>
        {(item) => (
          <div>
            <span>{item.time},,,,,,,,,,,{item.texter},,,,,,,,,,,,,,{item.context}</span>
            <br />
          </div>
        )}
      </For>
    </div>
  );
};

export default ParsedDataDisplay;