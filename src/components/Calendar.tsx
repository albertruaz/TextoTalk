import { For, createSignal, JSX } from 'solid-js';
import {
  getMonth,
  getYear,
  getDaysInMonth,
  format,
  isValid,
  startOfMonth,
} from 'date-fns';

interface Props {
  availableDates: Date[];
  onSelectDate: (date: Date) => void;
}

export function Calendar(props: Props): JSX.Element {
  const [currentMonth, setCurrentMonth] = createSignal(new Date());

  const daysInMonth = () => getDaysInMonth(currentMonth());
  const firstDayOfMonth = () => startOfMonth(currentMonth()).getDay();

  const availableDateStrings = props.availableDates
    .filter((date) => isValid(date))
    .map((date) => format(date, 'yyyy-MM-dd'));

  const handlePrevMonth = () => {
    const prevMonth = new Date(currentMonth());
    prevMonth.setMonth(prevMonth.getMonth() - 1);
    setCurrentMonth(prevMonth);
  };

  const handleNextMonth = () => {
    const nextMonth = new Date(currentMonth());
    nextMonth.setMonth(nextMonth.getMonth() + 1);
    setCurrentMonth(nextMonth);
  };

  const isDateAvailable = (date: Date) => {
    const dateString = format(date, 'yyyy-MM-dd');
    return availableDateStrings.includes(dateString);
  };

  return (
    <div class="p-2 w-64 h-64">
      {' '}
      {/* 달력 크기 조정 */}
      <div class="flex justify-between items-center mb-2">
        <button onClick={handlePrevMonth}>&lt;</button>
        <span class="font-bold">{format(currentMonth(), 'yyyy년 M월')}</span>
        <button onClick={handleNextMonth}>&gt;</button>
      </div>
      <div class="grid grid-cols-7 gap-1 text-center">
        {/* 요일 표시 */}
        {['일', '월', '화', '수', '목', '금', '토'].map((day) => (
          <div class="font-semibold">{day}</div>
        ))}

        {/* 첫 주 빈 칸 */}
        <For each={Array(firstDayOfMonth()).fill(0)}>{() => <div></div>}</For>

        {/* 날짜 표시 */}
        <For
          each={Array(daysInMonth())
            .fill(0)
            .map((_, i) => i + 1)}
        >
          {(day) => {
            const date = new Date(
              getYear(currentMonth()),
              getMonth(currentMonth()),
              day
            );
            const available = isDateAvailable(date);
            return (
              <button
                class={`p-1 rounded text-sm ${
                  available
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                }`}
                disabled={!available}
                onClick={() => props.onSelectDate(date)}
              >
                {day}
              </button>
            );
          }}
        </For>
      </div>
    </div>
  );
}
