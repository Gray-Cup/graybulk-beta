'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { animated, useSpring, useSprings } from '@react-spring/web';

import {
  autoTransitionIntervalMs,
  characterSet,
  gridCellDistanceDelayMs,
  messageAccessibilityDescriptions,
  messagesCharSetIndices,
  numberOfColumns,
  numberOfRows,
} from './constants';
import { HeroCell } from './HeroCell';

const AnimatedHeroCell = animated(HeroCell);

const createGridCellSprings =
  ({
    currentMessageIndex,
    clickedCellIndex,
    initial,
  }: {
    currentMessageIndex: number;
    clickedCellIndex?: number;
    initial?: boolean;
  }) =>
  (springIndex: number) => {
    const message = messagesCharSetIndices[currentMessageIndex];
    const row = Math.floor(springIndex / numberOfColumns);
    const column = springIndex % numberOfColumns;
    const currentCharSetIndex = message[row][column];

    const nextMessageIndex = (currentMessageIndex + 1) % messagesCharSetIndices.length;
    const nextMessage = messagesCharSetIndices[nextMessageIndex];
    let nextCharSetIndex = nextMessage[row][column];

    if (currentCharSetIndex > nextCharSetIndex) nextCharSetIndex += characterSet.length;

    let delay = 0;
    if (clickedCellIndex !== undefined) {
      const clickedRow = Math.floor(clickedCellIndex / numberOfColumns);
      const clickedColumn = clickedCellIndex % numberOfColumns;
      const deltaRow = row - clickedRow;
      const deltaColumn = column - clickedColumn;
      const gridDistance = Math.sqrt(deltaRow * deltaRow + deltaColumn * deltaColumn);
      delay = gridDistance * gridCellDistanceDelayMs;
    }

    return {
      from: { charSetIndex: currentCharSetIndex },
      to: { charSetIndex: initial ? currentCharSetIndex : nextCharSetIndex },
      config: { round: 1, tension: 160, friction: 30 },
      delay,
    };
  };

const createHoverCellSpring = (currentMessageIndex: number, cellIndex: number) => () => {
  const row = Math.floor(cellIndex / numberOfColumns);
  const column = cellIndex % numberOfColumns;
  const currentCharSetIndex = messagesCharSetIndices[currentMessageIndex][row][column];

  const steps: { charSetIndex: number }[] = [];
  let i = 1;
  while (i < characterSet.length) {
    steps.push({ charSetIndex: currentCharSetIndex + i });
    i++;
  }

  return {
    from: { charSetIndex: currentCharSetIndex },
    to: steps,
    config: { tension: 600, friction: 12, mass: 0.1, round: 1 },
    loop: true,
  };
};

export const AnimatedHeroGrid = () => {
  const currentMessageIndexRef = useRef(0);
  const [accessibilityDescription, setAccessibilityDescription] = useState(
    messageAccessibilityDescriptions[currentMessageIndexRef.current],
  );
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [gridCellSprings, gridCellSpringsRef] = useSprings(
    numberOfRows * numberOfColumns,
    createGridCellSprings({
      currentMessageIndex: currentMessageIndexRef.current,
      initial: true,
    }),
  );

  const [hoveredCellIndex, setHoveredCellIndex] = useState<number | null>(null);

  const [hoverCellSpring] = useSpring(
    createHoverCellSpring(currentMessageIndexRef.current, hoveredCellIndex ?? 0),
    [currentMessageIndexRef, hoveredCellIndex],
  );

  const gridRef = useRef<HTMLDivElement>(null);

  const animateMessage = useCallback(
    (clickedCellIndex?: number) => {
      const currentMessageIndex = currentMessageIndexRef.current;
      void gridCellSpringsRef.start(
        createGridCellSprings({
          currentMessageIndex,
          clickedCellIndex,
          initial: false,
        }),
      );
      const nextMessageIndex = (currentMessageIndex + 1) % messagesCharSetIndices.length;
      setAccessibilityDescription(messageAccessibilityDescriptions[nextMessageIndex]);
      currentMessageIndexRef.current = nextMessageIndex;
    },
    [gridCellSpringsRef],
  );

  const pauseMessageUpdateInterval = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  }, []);

  const resumeMessageUpdateInterval = useCallback(() => {
    intervalRef.current = setInterval(animateMessage, autoTransitionIntervalMs);
  }, [animateMessage]);

  const handleFullGridKeyDown: React.KeyboardEventHandler<HTMLDivElement> = useCallback(
    (event) => {
      if (event.target !== gridRef.current) return;
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        event.stopPropagation();
        animateMessage();
      }
    },
    [animateMessage],
  );

  const handleCellClick = useCallback(
    (cellIndex: number) => {
      pauseMessageUpdateInterval();
      animateMessage(cellIndex);
      resumeMessageUpdateInterval();
    },
    [animateMessage, pauseMessageUpdateInterval, resumeMessageUpdateInterval],
  );

  const handleCellHoverStart = useCallback((cellIndex: number) => {
    setHoveredCellIndex(cellIndex);
  }, []);

  const handleCellHoverEnd = useCallback(() => {
    setHoveredCellIndex(null);
  }, []);

  useEffect(() => {
    resumeMessageUpdateInterval();
    return () => pauseMessageUpdateInterval();
  }, [pauseMessageUpdateInterval, resumeMessageUpdateInterval]);

  const totalCells = numberOfRows * numberOfColumns;

  return (
    <div
      ref={gridRef}
      aria-label={accessibilityDescription}
      aria-live="polite"
      className="rounded-2xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-900"
      onKeyDown={handleFullGridKeyDown}
      role="button"
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${numberOfColumns}, 1fr)`,
        gridTemplateRows: `repeat(${numberOfRows}, 1fr)`,
        gap: '8px',
      }}
      tabIndex={0}
    >
      {gridCellSprings.map(({ charSetIndex }, cellIndex) =>
        cellIndex < totalCells ? (
          <AnimatedHeroCell
            key={cellIndex}
            cellIndex={cellIndex}
            charSetIndex={
              hoveredCellIndex === cellIndex ? hoverCellSpring.charSetIndex : charSetIndex
            }
            onClick={handleCellClick}
            onHoverEnd={handleCellHoverEnd}
            onHoverStart={handleCellHoverStart}
          />
        ) : null,
      )}
    </div>
  );
};
