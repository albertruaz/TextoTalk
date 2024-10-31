import { createSignal, JSX } from 'solid-js';
import { parseKakaoTalk } from '../utils/parseKakaoTalk';
import { Message } from '../type';

interface Props {
  onFileUploaded: (name: string, messages: Message[]) => void;
}

export function FileUploader(props: Props): JSX.Element {
  const [isDragging, setIsDragging] = createSignal(false);

  const handleDrop = async (event: DragEvent) => {
    event.preventDefault();
    setIsDragging(false);
    const files = event.dataTransfer?.files;
    if (files && files.length > 0) {
      await processFile(files[0]);
    }
  };

  const handleDragOver = (event: DragEvent) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleFileChange = async (event: Event) => {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      await processFile(input.files[0]);
    }
  };

  const processFile = async (file: File) => {
    if (file.type !== 'text/plain') {
      alert('텍스트 파일을 선택해주세요.');
      return;
    }
    const text = await file.text();
    const messages = parseKakaoTalk(text);
    props.onFileUploaded(file.name, messages);
  };

  return (
    <div
      class="border-dashed border-2 p-4"
      classList={{
        'border-blue-500': isDragging(),
        'border-gray-300': !isDragging(),
      }}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
    >
      <p class="text-center text-gray-500">
        여기에 파일을 드래그 앤 드롭 하세요.
      </p>
      <p class="text-center text-gray-500">또는</p>
      <input type="file" accept=".txt" onChange={handleFileChange} />
    </div>
  );
}
