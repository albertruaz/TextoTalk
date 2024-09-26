import { JSX } from 'solid-js';

interface Props {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  searchResultsCount: number;
  currentResultIndex: number;
  onPrevResult: () => void;
  onNextResult: () => void;
}

export function SearchBar(props: Props): JSX.Element {
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      props.onPrevResult();
    }
  };

  return (
    <div class="flex items-center space-x-2 p-2 bg-gray-100">
      <input
        type="text"
        class="border rounded px-2 py-1 flex-grow"
        placeholder="검색어를 입력하세요"
        value={props.searchTerm}
        onInput={(e) => props.setSearchTerm(e.currentTarget.value)}
        onKeyDown={handleKeyDown} // Enter 키 입력 처리
      />
      {props.searchResultsCount > 0 && (
        <span>
          {props.currentResultIndex + 1}/{props.searchResultsCount}
        </span>
      )}
      <button onClick={props.onPrevResult}>▲</button>
      <button onClick={props.onNextResult}>▼</button>
    </div>
  );
}
