import { For, createSignal, JSX } from 'solid-js';
import {
  getMonth,
  getYear,
  getDaysInMonth,
  format,
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

  const availableDateStrings = props.availableDates.map((date) =>
    format(date, 'yyyy-MM-dd')
  );

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

  const isDayAvailable = (day: number) => {
    const year = currentMonth().getFullYear().toString();
    const month = (currentMonth().getMonth() + 1).toString().padStart(2, '0'); // 월은 0부터 시작하므로 1을 더함
    const dayString = day.toString().padStart(2, '0'); // 일(day)을 문자열로 변환
    const dateString = `${year}-${month}-${dayString}`;
    return availableDateStrings.includes(dateString);
  };

  const handleSelectDate = (date: Date) => {
    if (isDateAvailable(date)) {
      props.onSelectDate(date); // 날짜가 활성화되었을 경우 해당 날짜로 이동
    }
  };

  return (
    <div class="p-2 w-64 h-64">
      <div class="flex justify-between items-center mb-2">
        <button onClick={handlePrevMonth}>&lt;</button>
        <span class="font-bold">{format(currentMonth(), 'yyyy년 M월')}</span>
        <button onClick={handleNextMonth}>&gt;</button>
      </div>
      <div class="grid grid-cols-7 gap-1 text-center">
        {['일', '월', '화', '수', '목', '금', '토'].map((day) => (
          <div class="font-semibold">{day}</div>
        ))}

        <For each={Array(firstDayOfMonth()).fill(0)}>{() => <div></div>}</For>

        <For
          each={Array(daysInMonth())
            .fill(0)
            .map((_, i) => i + 1)}
        >
          {(day) => {
            const date = new Date(
              currentMonth().getFullYear(),
              currentMonth().getMonth(),
              day
            );
            // const available = isDateAvailable(date);
            const available = isDayAvailable(day);

            return (
              <button
                class={`p-1 rounded text-sm ${
                  available
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                }`}
                disabled={!available}
                onClick={() => handleSelectDate(date)}
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
