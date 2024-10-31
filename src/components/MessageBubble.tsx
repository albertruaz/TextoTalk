import { For, Show, JSX } from 'solid-js';
import { Message } from '../type';
import { format } from 'date-fns';

interface Props {
  message: Message;
  isDate: boolean;
  isMine: boolean;
  searchTerm: string;
  theme: string;
}

export function MessageBubble(props: Props): JSX.Element {
  // 테마에 따른 말풍선 클래스 설정
  const bubbleClass = () => {
    if (props.isDate) {
      switch (props.theme) {
        case 'kakao':
          return 'bg-[#A8B9CA] text-gray-500'; // 카카오: 밝은 노란색, 둥근 말풍선
        case 'imessage':
          return 'bg-gray-300 text-gray-500'; // iMessage: 파란색, 약간 둥근 말풍선
        case 'telegram':
          return 'bg-blue-700 text-gray-300'; // 텔레그램: 짙은 파란색, 둥근 말풍선
        default:
          return 'bg-blue-500 text-gray-500'; // 기본값
      }
    }
    if (props.isMine) {
      // 내 메시지
      switch (props.theme) {
        case 'kakao':
          return 'bg-[#f9e000] text-black self-end rounded-2xl p-3'; // 카카오: 밝은 노란색, 둥근 말풍선
        case 'imessage':
          return 'bg-blue-500 text-white self-end rounded-lg p-3'; // iMessage: 파란색, 약간 둥근 말풍선
        case 'telegram':
          return 'bg-blue-700 text-white self-end rounded-lg p-3'; // 텔레그램: 짙은 파란색, 둥근 말풍선
        default:
          return 'bg-blue-500 text-white self-end rounded-lg p-3'; // 기본값
      }
    } else {
      // 상대방 메시지
      switch (props.theme) {
        case 'kakao':
          return 'bg-white text-black self-start rounded-2xl p-3'; // 카카오: 흰색, 둥근 말풍선
        case 'imessage':
          return 'bg-gray-200 text-black self-start rounded-lg p-3'; // iMessage: 연회색, 약간 둥근 말풍선
        case 'telegram':
          return 'bg-gray-700 text-white self-start rounded-lg p-3'; // 텔레그램: 짙은 회색, 둥근 말풍선
        default:
          return 'bg-gray-200 text-black self-start rounded-lg p-3'; // 기본값
      }
    }
  };

  if (props.isDate) {
    return (
      <div class="flex justify-center my-2">
        <div class={`${bubbleClass()} text-center rounded-md px-4 py-1`}>
          {format(props.message.date, 'yyyy-MM-dd')}
        </div>
      </div>
    );
  }
  // 검색어를 하이라이트하는 함수
  const getHighlightedContent = () => {
    if (!props.searchTerm) {
      return props.message.content;
    }
    const regex = new RegExp(`(${props.searchTerm})`, 'gi');
    const parts = props.message.content.split(regex);
    return (
      <For each={parts}>
        {(part) => (
          <Show when={regex.test(part)} fallback={<>{part}</>}>
            <mark>{part}</mark>
          </Show>
        )}
      </For>
    );
  };

  return (
    <div
      class="flex flex-col my-1 max-w-full"
      classList={{
        'items-end': props.isMine,
        'items-start': !props.isMine,
      }}
    >
      {!props.isMine && (
        <span class="text-xs text-gray-500 mb-0.5">{props.message.sender}</span>
      )}
      <div class={`px-3 py-2 rounded-lg max-w-xl break-words ${bubbleClass()}`}>
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
