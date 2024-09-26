// src/components/FileUploader.tsx
import { createSignal } from 'solid-js';
import { parseKakaoTalk } from '../utils/parseKakaoTalk';
import { Message } from '../type';

interface Props {
  onMessagesParsed: (messages: Message[]) => void;
}

export function FileUploader(props: Props) {
  const [error, setError] = createSignal('');

  const handleFileChange = async (event: Event) => {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) return;

    const file = input.files[0];
    if (file.type !== 'text/plain') {
      setError('텍스트 파일을 선택해주세요.');
      return;
    }

    const text = await file.text();
    const messages = parseKakaoTalk(text);
    props.onMessagesParsed(messages);
  };

  return (
    <div>
      <input type="file" accept=".txt" onChange={handleFileChange} />
      {error() && <p class="text-red-500">{error()}</p>}
    </div>
  );
}
