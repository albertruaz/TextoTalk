import { Component, For } from "solid-js";
import { ParsedData } from "../utils/parseData";

interface ParsedDataDisplayProps {
  data: ParsedData[];
  info: string;
}

const ParsedDataDisplay: Component<ParsedDataDisplayProps> = (props) => {
  const info = () => props.info;

  const getAlignment = (item: ParsedData) => {
    if (item.category === "date") {
      return "center";
    } else if (item.name === info()) {
      return "right";
    } else {
      return "left";
    }
  };
  const getContext = (item: ParsedData) => {
    if (item.category === "date") {
      return item.time;
    }
    return item.context;
  }

  return (
    <div>
      <h2>Parsed Content: username is {info()}</h2>
      <For each={props.data}>
        {(item) => (
          <div style={{ "text-align": getAlignment(item) }}>
            <span>{getContext(item)}</span>
            <br />
          </div>
        )}
      </For>
    </div>
  );
};

export default ParsedDataDisplay;