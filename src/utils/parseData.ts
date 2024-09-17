export interface ParsedData {
  category: "date"  | "message" | "else";
  time: string | null;
  name: string | null;
  context: string | null;
}

export function parseData(data: string): ParsedData[] {
  const preparsedDate: ParsedData[] =  data.split('\n').map(line => {
    if (line.substring(0,2)==="20" && line[4]==="년"){ // 날짜 변경 구분
      return {category: "date", time: line, name: null, context: null};
    }
    else if (line.substring(0,2)==="20"){ // 짧은 메시지
      const [name, context] = line.split(',')[1].split(':');
      return {category: "message", time:line.split(',')[0], name:name.trim(), context: context.trim()};
    }
    // 연장 메시지
    return {category: "else", time: null, name: null, context: line};
  });
  
  const parsedData: ParsedData[] = [];
  let lastValidEntry: ParsedData | null = null;

  for (const entry of preparsedDate) {
    if (entry.category==="else" && lastValidEntry) {
      console.log("lastValidEntry", lastValidEntry);
      lastValidEntry.context += `\n${entry.context}`;
    } else {
      if (lastValidEntry)
        parsedData.push(lastValidEntry);
      lastValidEntry = entry;
    }
  }
  return parsedData;

}