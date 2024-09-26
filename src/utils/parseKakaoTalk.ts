import { Message } from '../type';

export function parseKakaoTalk(text: string): Message[] {
  const lines = text.split('\n');
  const messages: Message[] = [];
  let currentDate = '';
  let currentMessage: Message | null = null;

  const dateRegex = /^(\d{4})년 (\d{1,2})월 (\d{1,2})일 [월화수목금토일]요일$/;
  const messageRegex =
    /^(\d{4}\.\s*\d{1,2}\.\s*\d{1,2}\.\s*\d{1,2}:\d{2}),\s([^:]+?)\s:\s(.*)$/;

  for (let i = 0; i < lines.length; i++) {
    let line = lines[i].trim();

    if (dateRegex.test(line)) {
      currentDate = line;
      if (currentMessage) {
        messages.push(currentMessage);
        currentMessage = null;
      }
    } else {
      let match = line.match(messageRegex);
      if (match) {
        if (currentMessage) {
          messages.push(currentMessage);
        }

        let [, dateTime, sender, content] = match;

        // 날짜 문자열을 표준 형식으로 변환
        const dateTimeString = dateTime.replace(/\.\s*/g, '-'); // '2024-9-12-19:19'
        const date = new Date(dateTimeString);

        let type: 'text' | 'photo' | 'system' = 'text';

        if (content.startsWith('사진') || content.startsWith('사진 ')) {
          type = 'photo';
        } else if (content === '삭제된 메시지입니다.') {
          type = 'system';
        }

        currentMessage = {
          date,
          sender: sender.trim(),
          content: content.trim(),
          type,
        };
      } else if (line === '') {
        // 빈 줄은 무시
      } else {
        // 메시지 형식이 아닌 경우 (여러 줄 메시지의 연속)
        if (currentMessage) {
          currentMessage.content += '\n' + line;
        } else {
          // 현재 메시지가 없으면 시스템 메시지로 취급
          currentMessage = {
            date: new Date(),
            sender: '',
            content: line,
            type: 'system',
          };
        }
      }
    }
  }

  // 마지막 메시지 추가
  if (currentMessage) {
    messages.push(currentMessage);
  }

  return messages;
}
