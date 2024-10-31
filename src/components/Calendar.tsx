import { For, createSignal, createMemo, createEffect, JSX } from 'solid-js';
import { getDaysInMonth, format, startOfMonth } from 'date-fns';

interface Props {
  availableDates: Date[];
  onSelectDate: (date: Date) => void;
  currentMonth: () => Date;
  setCurrentMonth: (date: Date) => void;
}

export function Calendar(props: Props): JSX.Element {
  const currentMonth = props.currentMonth;
  const setCurrentMonth = props.setCurrentMonth;

  // const [currentMonth, setCurrentMonth] = createSignal(new Date());

  const daysInMonth = createMemo(() => getDaysInMonth(currentMonth()));
  const firstDayOfMonth = createMemo(() =>
    startOfMonth(currentMonth()).getDay()
  );

  const handlePrevMonth = () => {
    const prev = currentMonth();
    setCurrentMonth(new Date(prev.getFullYear(), prev.getMonth() - 1));
  };

  const handleNextMonth = () => {
    const next = currentMonth();
    setCurrentMonth(new Date(next.getFullYear(), next.getMonth() + 1));
  };

  const daysArray = createMemo(() => {
    const year = currentMonth().getFullYear();
    const month = currentMonth().getMonth();
    const availableDateSet = new Set(
      props.availableDates
        .filter(
          (date) => date.getFullYear() === year && date.getMonth() === month
        )
        .map((date) => format(date, 'yyyy-MM-dd'))
    );

    return Array.from({ length: daysInMonth() }, (_, i) => {
      const day = i + 1;
      const dateString = format(new Date(year, month, day), 'yyyy-MM-dd');
      return {
        day,
        isAvailable: availableDateSet.has(dateString),
      };
    });
  });

  return (
    <div class="p-2 w-64 h-64">
      <div class="flex justify-between items-center mb-2">
        <button onClick={handlePrevMonth}>&lt;</button>
        <span class="font-bold">{format(currentMonth(), 'yyyy년 M월')}</span>
        <button onClick={handleNextMonth}>&gt;</button>
      </div>
      <div class="grid grid-cols-7 gap-1 text-center">
        <For each={['일', '월', '화', '수', '목', '금', '토']}>
          {(day) => <div class="font-semibold">{day}</div>}
        </For>
        <For each={Array(firstDayOfMonth()).fill(0)}>{() => <div></div>}</For>

        <For each={daysArray()}>
          {(item) => {
            const date = new Date(
              currentMonth().getFullYear(),
              currentMonth().getMonth(),
              item.day
            );
            return (
              <button
                class="p-1 rounded text-sm"
                classList={{
                  'bg-blue-500 text-white': item.isAvailable,
                  'bg-gray-200 text-gray-500 cursor-not-allowed':
                    !item.isAvailable,
                }}
                disabled={!item.isAvailable}
                onClick={() => props.onSelectDate(date)}
              >
                {item.day}
              </button>
            );
          }}
        </For>
      </div>
    </div>
  );
}
