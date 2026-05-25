'use client';

import React, { useCallback } from 'react';
import { characterSet, maxUpdatesPerSecond } from './constants';
import { useThrottledValue } from './useThrottledValue';

type HeroCellProps = {
  charSetIndex: number;
  cellIndex: number;
  onHoverStart: (cellIndex: number) => void;
  onHoverEnd: (cellIndex: number) => void;
  onClick: (cellIndex: number) => void;
};

export const HeroCell = ({
  charSetIndex,
  cellIndex,
  onHoverStart,
  onHoverEnd,
  onClick,
}: HeroCellProps) => {
  const throttledCharSetIndex = useThrottledValue(charSetIndex, 1000 / maxUpdatesPerSecond);
  const character = characterSet[throttledCharSetIndex % characterSet.length];
  const isColor = character.startsWith('#') && character !== '#';

  const handleHoverStart = useCallback(
    (event: React.PointerEvent<HTMLButtonElement> | React.FocusEvent<HTMLButtonElement>) => {
      if ('pointerType' in event && event.pointerType === 'mouse') onHoverStart(cellIndex);
    },
    [onHoverStart, cellIndex],
  );
  const handleHoverEnd = useCallback(
    (event: React.PointerEvent<HTMLButtonElement> | React.FocusEvent<HTMLButtonElement>) => {
      if ('pointerType' in event && event.pointerType === 'mouse') onHoverEnd(cellIndex);
    },
    [onHoverEnd, cellIndex],
  );
  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      event.stopPropagation();
      onClick(cellIndex);
    },
    [onClick, cellIndex],
  );

  return (
    <button
      aria-hidden={true}
      className="aspect-square bg-neutral-100 rounded-md border-0 overflow-hidden p-0 cursor-pointer"
      onBlur={handleHoverEnd}
      onClick={handleClick}
      onFocus={handleHoverStart}
      onPointerEnter={handleHoverStart}
      onPointerLeave={handleHoverEnd}
      tabIndex={-1}
    >
      <div
        className="flex items-center justify-center w-full h-full rounded-md overflow-hidden"
        style={isColor ? { backgroundColor: character } : undefined}
      >
        <span className="text-xl sm:text-2xl font-mono font-medium leading-none select-none text-neutral-700">
          {isColor ? ' ' : character}
        </span>
      </div>
    </button>
  );
};
