import { Message } from '../types';

export function parseKakaoTalk(text: string): Message[] {
  const lines = text.split('\n');
  const messages: Message[] = [];
  let currentDate = '';

  const dateRegex = /^(\d{4})년 (\d{1,2})월 (\d{1,2})일 [월화수목금토일]요일$/;
  const messageRegex =
    /^(\d{4}\. ?\d{1,2}\. ?\d{1,2}\.? ?\d{1,2}:\d{2}), (.+?) : (.+)$/;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    if (dateRegex.test(line)) {
      currentDate = line;
    } else {
      const match = line.match(messageRegex);
      if (match) {
        const [, dateTime, sender, content] = match;
        const dateString = dateTime.replace(/\./g, '-'); // '2023-6-10 12:25'
        const date = new Date(dateString);

        let type: 'text' | 'photo' | 'system' = 'text';
        let finalContent = content;

        if (content.startsWith('사진') || content.startsWith('사진 ')) {
          type = 'photo';
        } else if (content === '삭제된 메시지입니다.') {
          type = 'system';
        }

        messages.push({
          date,
          sender,
          content: finalContent,
          type,
        });
      } else if (line !== '') {
        // 다음 라인들이 추가적인 메시지 내용인지 확인
        let content = line;
        while (
          i + 1 < lines.length &&
          !messageRegex.test(lines[i + 1]) &&
          lines[i + 1].trim() !== ''
        ) {
          i++;
          content += '\n' + lines[i].trim();
        }
        messages.push({
          date: new Date(),
          sender: '',
          content,
          type: 'system',
        });
      }
    }
  }

  return messages;
}
