'use client';

import { useFormStatus } from 'react-dom';
import { useState, useEffect } from 'react';
import { deleteGuestbookEntries } from 'app/db/actions';

export default function Form({ entries }) {
  const [selectedInputs, setSelectedInputs] = useState<string[]>([]);
  const [startShiftClickIndex, setStartShiftClickIndex] = useState<number>(0);
  const [isShiftKeyPressed, setIsShiftKeyPressed] = useState(false);
  const [isCommandKeyPressed, setIsCommandKeyPressed] = useState(false);

  useEffect(() => {
    const keyDownHandler = ({ key }) => {
      if (key === 'Shift') {
        setIsShiftKeyPressed(true);
      }
      if (key === 'Meta' || key === 'Control') {
        setIsCommandKeyPressed(true);
      }
    };
    const keyUpHandler = ({ key }) => {
      if (key === 'Shift') {
        setIsShiftKeyPressed(false);
      }
      if (key === 'Meta' || key === 'Control') {
        setIsCommandKeyPressed(false);
      }
    };

    window.addEventListener('keydown', keyDownHandler);
    window.addEventListener('keyup', keyUpHandler);

    return () => {
      window.removeEventListener('keydown', keyDownHandler);
      window.removeEventListener('keyup', keyUpHandler);
    };
  }, []);

  const handleNormalClick = (checked: boolean, id: string, index: number) => {
    setSelectedInputs((prevInputs) =>
      checked
        ? [...prevInputs, id]
        : prevInputs.filter((inputId) => inputId !== id),
    );
    setStartShiftClickIndex(index);
  };

  const handleCommandClick = (id: string) => {
    setSelectedInputs((prevInputs) =>
      prevInputs.includes(id)
        ? prevInputs.filter((inputId) => inputId !== id)
        : [...prevInputs, id],
    );
  };

  const handleShiftClick = (index: number, checked: boolean) => {
    const startIndex = Math.min(startShiftClickIndex!, index);
    const endIndex = Math.max(startShiftClickIndex!, index);

    setSelectedInputs((prevInputs) => {
      const newSelection = entries
        .slice(startIndex, endIndex + 1)
        .map((item) => item.id);

      if (checked) {
        const combinedSelection = Array.from(
          new Set([...prevInputs, ...newSelection]),
        );
        return combinedSelection;
      } else {
        return prevInputs.filter((inputId) => !newSelection.includes(inputId));
      }
    });
  };

  const handleCheck = (checked: boolean, id: string, index: number) => {
    if (isCommandKeyPressed) {
      handleCommandClick(id);
    } else if (isShiftKeyPressed && startShiftClickIndex !== null) {
      handleShiftClick(index, checked);
    } else {
      handleNormalClick(checked, id, index);
    }
  };

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>,
    id: string,
    index: number,
  ) => {
    if (event.key === 'Enter') {
      // Check if the checkbox was already selected
      const isChecked = selectedInputs.includes(id);

      // Toggle the checkbox
      handleCheck(!isChecked, id, index);
    }
  };

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        await deleteGuestbookEntries(selectedInputs);
      }}
    >
      <DeleteButton isActive={selectedInputs.length !== 0} />
      {entries.map((entry, index) => (
        <GuestbookEntry key={entry.id} entry={entry}>
          <div className="mr-2 inline-flex items-center my-[2px]">
            <label className="relative flex cursor-pointer items-center rounded-full">
              <input
                name={entry.id}
                type="checkbox"
                className="before:content[''] peer relative h-4 w-4 cursor-pointer appearance-none rounded-none checked:rounded-full border border-[var(--foreground)] transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-pink-500 before:opacity-0 before:transition-opacity checked:border-pink-500 checked:bg-pink-500 checked:before:bg-pink-500 hover:before:opacity-10"
                onChange={(e) => handleCheck(e.target.checked, entry.id, index)}
                onKeyDown={(e) => handleKeyDown(e, entry.id, index)}
                checked={selectedInputs.includes(entry.id)}
              />
              <div className="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-white opacity-0 transition-opacity peer-checked:opacity-100">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3.5 w-3.5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  stroke="currentColor"
                  strokeWidth="1"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </div>
            </label>
          </div>
        </GuestbookEntry>
      ))}
    </form>
  );
}

function GuestbookEntry({ entry, children }) {
  return (
    <div className="flex flex-col space-y-1 mb-4">
      <div className="w-full text-sm break-words items-center flex">
        {children}
        <span className="text-neutral-600 dark:text-neutral-400 mr-1 border-neutral-100">
          {entry.fullname}:
        </span>
        {entry.message}
      </div>
    </div>
  );
}

const cx = (...classes) => classes.filter(Boolean).join(' ');

function DeleteButton({ isActive }) {
  const { pending } = useFormStatus();

  return (
    <button
      className={cx(
        'px-3 py-2 border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 rounded p-1 text-sm inline-flex items-center leading-4 text-neutral-900 dark:text-neutral-100 mb-8 transition-all',
        {
          'bg-red-300/50 dark:bg-red-700/50': isActive,
        },
      )}
      disabled={pending}
      type="submit"
    >
      Delete Entries
    </button>
  );
}
