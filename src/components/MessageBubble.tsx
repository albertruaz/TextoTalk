// src/components/MessageBubble.tsx
import { Message } from '../types';

interface Props {
  message: Message;
  isMine: boolean;
}

export function MessageBubble(props: Props) {
  const bubbleClass = props.isMine
    ? 'bg-blue-500 text-white self-end'
    : 'bg-gray-200 text-black self-start';

  return (
    <div class={`flex flex-col ${props.isMine ? 'items-end' : 'items-start'} my-1`}>
      {!props.isMine && (
        <span class="text-xs text-gray-500 mb-0.5">{props.message.sender}</span>
      )}
      <div class={`px-3 py-2 rounded-lg ${bubbleClass}`}>
        {props.message.content}
      </div>
      <span class="text-xs text-gray-400 mt-0.5">
        {props.message.date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
      </span>
    </div>
  );
}
