import { JSX } from 'solid-js';
import { Message } from '../type';

interface Props {
  message: Message;
  isMine: boolean;
  searchTerm: string;
}

export function MessageBubble(props: Props): JSX.Element {
  const bubbleClass = props.isMine
    ? 'bg-blue-500 text-white self-end'
    : 'bg-gray-200 text-black self-start';

  // 검색어를 하이라이트하는 함수
  const getHighlightedContent = () => {
    if (!props.searchTerm) {
      return props.message.content;
    }
    const regex = new RegExp(`(${props.searchTerm})`, 'gi');
    const parts = props.message.content.split(regex);
    return parts.map((part) => (regex.test(part) ? <mark>{part}</mark> : part));
  };

  return (
    <div
      class={`flex flex-col ${
        props.isMine ? 'items-end' : 'items-start'
      } my-1 max-w-full`}
    >
      {!props.isMine && (
        <span class="text-xs text-gray-500 mb-0.5">{props.message.sender}</span>
      )}
      <div class={`px-3 py-2 rounded-lg max-w-xl break-words ${bubbleClass}`}>
        {getHighlightedContent()}
      </div>
      <span class="text-xs text-gray-400 mt-0.5">
        {props.message.date.toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        })}
      </span>
    </div>
  );
}
