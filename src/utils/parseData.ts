export interface ParsedData {
  time: string;
  texter: string;
  context: string;
}

export function parseData(data: string): ParsedData[] {
  return data.split('\n').map(line => {
    if (line.substring(0,2)==="20"){
      if(line[4]==="년"){
        return {time: line, texter: "", context: ""};
      }
      const [texter, context] = line.substring(21).split(':');
        return {time:line.substring(0,20), texter:texter, context: context};
    }
    return {time: "", texter: "", context: line};
  });
}