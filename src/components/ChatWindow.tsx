// src/components/ChatWindow.tsx

import { For, createEffect, onMount, JSX } from 'solid-js';
import { Message } from '../type';
import { MessageBubble } from './MessageBubble';

interface Props {
  messages: Message[];
  currentUser: string;
  searchResults: number[];
  currentResultIndex: number;
  searchTerm: string;
  ref: (el: HTMLDivElement) => void;
  theme: string; // 테마 추가
}

export function ChatWindow(props: Props): JSX.Element {
  let messageListRef: HTMLDivElement;

  onMount(() => {
    if (messageListRef) {
      messageListRef.scrollTop = messageListRef.scrollHeight;
    }
  });

  createEffect(() => {
    const index = props.searchResults[props.currentResultIndex];
    if (index !== undefined && messageListRef) {
      const messageElement = messageListRef.children[index] as HTMLDivElement;
      if (messageElement) {
        messageElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  });

  // 테마에 따른 클래스 설정
  const themeClass = () => {
    switch (props.theme) {
      case 'kakao':
        return 'bg-[#BACEE0] text-black'; // 카카오톡 배경은 하늘색
      case 'imessage':
        return 'bg-gray-100 text-blue-700'; // iMessage 배경은 연한 회색
      case 'telegram':
        return 'bg-blue-100 text-white'; // 텔레그램 배경은 연한 파란색
      default:
        return 'bg-gray-100 text-black'; // 기본 배경
    }
  };

  return (
    <div
      ref={(el) => {
        messageListRef = el;
        props.ref(el);
      }}
      class={`flex-grow flex flex-col p-4 space-y-2 overflow-auto ${themeClass()}`}
    >
      <For each={props.messages}>
        {(message, index) => {
          const isSearchResult = props.searchResults.includes(index());
          const isCurrentResult =
            isSearchResult &&
            index() === props.searchResults[props.currentResultIndex];

          return (
            <div
              classList={{
                'bg-yellow-200': isSearchResult,
                'border border-blue-500': isCurrentResult,
              }}
            >
              <MessageBubble
                message={message}
                isDate={message.type === 'date'}
                isMine={message.sender === props.currentUser}
                searchTerm={props.searchTerm}
                theme={props.theme} // MessageBubble에도 테마 전달
              />
            </div>
          );
        }}
      </For>
    </div>
  );
}
