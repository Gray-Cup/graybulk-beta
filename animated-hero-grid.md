# Animated Hero Grid

The homepage hero grid animates through messages letter-by-letter using `@react-spring/web`. Hovering a cell spins it through the full character set; clicking ripples the transition outward from the clicked cell.

---

## `constants.ts`

```ts
/** Total number of rows in the grid. */
export const numberOfRows = 4;
/** Total number of columns in the grid. */
export const numberOfColumns = 15;

/**
 * Characters and display values that each grid cell animation will iterate through.
 */
export const characterSet = [
  'A',
  '#F07836',
  'I',
  'G',
  'Y',
  '@',
  '+',
  'M',
  'X',
  '5',
  '9',
  '(',
  '3',
  'Q',
  '#E5CD30',
  'D',
  'E',
  '7',
  '#27AD75',
  'C',
  'B',
  '#',
  'V',
  '-',
  'L',
  'N',
  'U',
  'J',
  'S',
  '6',
  'P',
  '1',
  '!',
  '#CD99FD',
  ' ',
  '$',
  'W',
  '<',
  '/',
  ':',
  '0',
  '4',
  'H',
  '&',
  '#E175D6',
  'F',
  'R',
  'K',
  '2',
  'T',
  '#578BFA',
  ',',
  'O',
  '8',
  '%',
  '~',
  'Z',
];

/**
 * All the messages that the animated hero can display.
 */
export const messages = [
  [
    ['G', 'R', 'A', 'Y', ' ', 'B', 'U', 'L', 'K', ' ', 'T', 'R', 'A', 'D', 'E'],
    ['C', 'O', 'N', 'N', 'E', 'C', 'T', 'I', 'N', 'G', ' ', ' ', 'Y', 'O', 'U'],
    ['W', 'I', 'T', 'H', ' ', 'W', 'H', 'O', 'L', 'E', 'S', 'A', 'L', 'E', ' '],
    ['M', 'A', 'N', 'U', 'F', 'A', 'C', 'T', 'U', 'R', 'E', 'R', 'S', ' ', ' '],
  ],
  [
    ['B', 'U', 'L', 'K', ' ', 'O', 'R', 'D', 'E', 'R', 'S', ' ', 'F', 'O', 'R'],
    ['M', 'A', 'N', 'U', 'F', 'A', 'C', 'T', 'U', 'R', 'E', 'R', 'S', ' ', ' '],
    ['W', 'H', 'O', 'L', 'E', 'S', 'A', 'L', 'E', 'R', 'S', ' ', '&', ' ', ' '],
    ['D', 'I', 'S', 'T', 'R', 'I', 'B', 'U', 'T', 'O', 'R', 'S', ' ', ' ', ' '],
  ],
  [
    ['G', 'L', 'O', 'B', 'A', 'L', ' ', 'S', 'O', 'U', 'R', 'C', 'I', 'N', 'G'],
    ['F', 'O', 'R', ' ', 'E', 'V', 'E', 'R', 'Y', ' ', 'S', 'C', 'A', 'L', 'E'],
    ['F', 'R', 'O', 'M', ' ', 'F', 'A', 'C', 'T', 'O', 'R', 'Y', ' ', 'T', 'O'],
    ['Y', 'O', 'U', 'R', ' ', 'W', 'A', 'R', 'E', 'H', 'O', 'U', 'S', 'E', ' '],
  ],
  [
    ['T', 'R', 'A', 'D', 'E', ' ', 'S', 'M', 'A', 'R', 'T', 'E', 'R', ' ', ' '],
    ['S', 'O', 'U', 'R', 'C', 'E', ' ', 'F', 'A', 'S', 'T', 'E', 'R', ' ', ' '],
    ['G', 'R', 'A', 'Y', ' ', 'B', 'U', 'L', 'K', ':', ' ', 'Y', 'O', 'U', 'R'],
    ['T', 'R', 'A', 'D', 'E', ' ', 'P', 'A', 'R', 'T', 'N', 'E', 'R', ' ', ' '],
  ],
  [
    ['W', 'H', 'O', 'L', 'E', 'S', 'A', 'L', 'E', ' ', 'R', 'A', 'T', 'E', 'S'],
    ['D', 'I', 'R', 'E', 'C', 'T', ' ', 'F', 'R', 'O', 'M', ' ', 'T', 'H', 'E'],
    ['M', 'A', 'N', 'U', 'F', 'A', 'C', 'T', 'U', 'R', 'E', 'R', ' ', ' ', ' '],
    ['N', 'O', ' ', 'M', 'I', 'D', 'D', 'L', 'E', 'M', 'E', 'N', ' ', ' ', ' '],
  ],
];

/**
 * Maps each message's characters to its index in the characterSet.
 */
export const messagesCharSetIndices = messages.map((message) => {
  return message.map((line) => {
    return line.map((character) => {
      const index = characterSet.indexOf(character);
      return index === -1 ? 36 : index;
    });
  });
});

export const messageAccessibilityDescriptions = messages.map(
  (message) =>
    `Current message: ${message
      .map((row) => row.join('').trim())
      .filter((row) => !!row)
      .join(' ')}. Press Enter or Space to skip to the next message.`,
);

// Grid animation constants
export const autoTransitionIntervalMs = 10000; // Interval for automatic message rotation
export const gridCellDistanceDelayMs = 80; // Delay per grid unit for ripple effect
export const maxUpdatesPerSecond = 20;
```

---

## `HeroCell.tsx`

```tsx
import React, { useCallback } from 'react';
import { Box } from '@coinbase/cds-web/layout/Box';
import type { PressableProps } from '@coinbase/cds-web/system/Pressable';
import { Pressable } from '@coinbase/cds-web/system/Pressable';
import { Text } from '@coinbase/cds-web/typography';
import { useThrottledValue } from '@site/src/utils/useThrottledValue';

import { characterSet, maxUpdatesPerSecond } from './constants';

type HeroCellProps = Omit<
  PressableProps<'button'>,
  'children' | 'background' | 'onHoverStart' | 'onHoverEnd' | 'onClick'
> & {
  charSetIndex: number;
  cellIndex: number;
  onHoverStart: (cellIndex: number) => void;
  onHoverEnd: (cellIndex: number) => void;
  onClick: (cellIndex: number) => void;
  style?: React.CSSProperties;
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
    <Pressable
      aria-hidden={true}
      aspectRatio={1}
      background="bgAlternate"
      borderRadius={{ base: 200, phone: 100 }}
      borderWidth={0}
      onBlur={handleHoverEnd}
      onClick={handleClick}
      onFocus={handleHoverStart}
      onPointerEnter={handleHoverStart}
      onPointerLeave={handleHoverEnd}
      overflow="hidden"
      tabIndex={-1}
    >
      <Box
        alignItems="center"
        borderRadius={{ base: 200, phone: 100 }}
        height="100%"
        justifyContent="center"
        overflow="hidden"
        style={isColor ? { backgroundColor: character } : undefined}
        width="100%"
      >
        <Text font={{ base: 'display2', tablet: 'display3', phone: 'title4' }}>
          {isColor ? ' ' : character}
        </Text>
      </Box>
    </Pressable>
  );
};
```

---

## `HeroGrid.tsx`

```tsx
import React, { useCallback, useEffect, useRef, useState } from 'react';
import type { IconSize } from '@coinbase/cds-common';
import { useBreakpoints } from '@coinbase/cds-web/hooks/useBreakpoints';
import { Icon } from '@coinbase/cds-web/icons';
import { Box } from '@coinbase/cds-web/layout';
import { Grid } from '@coinbase/cds-web/layout/Grid';
import { Pressable } from '@coinbase/cds-web/system';
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
import styles from './styles.module.css';

const AnimatedHeroCell = animated(HeroCell);

/**
 * Returns a useSprings callback function used to animate the grid cells iterating through
 * characters in the characterSet. If the animation was triggered by a user click on the grid,
 * then the index of the clicked cell will also be passed and used to create an interactive
 * animation delay.
 */
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

    // Ensure the animation always progresses "forward" in the characterSet
    if (currentCharSetIndex > nextCharSetIndex) nextCharSetIndex += characterSet.length;

    // Calculate delay based on distance from origin in the grid
    let delay = 0;

    // Calculate cell animation delay if the animation was triggered by a user click on a cell
    if (clickedCellIndex !== undefined) {
      const clickedRow = Math.floor(clickedCellIndex / numberOfColumns);
      const clickedColumn = clickedCellIndex % numberOfColumns;

      // Calculate Euclidean distance from clicked cell in the grid
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

/**
 * Returns a useSpring callback function used to animate a single cell iterating through
 * characters in the character set as a user hovers over it.
 */
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

const commonGridProps = {
  columns: numberOfColumns,
  rows: numberOfRows,
  columnGap: { base: 1, tablet: 0.75, phone: 0.5 } as const,
  rowGap: { base: 2, tablet: 1.5, phone: 0.75 } as const,
  gridTemplateColumns: `repeat(${numberOfColumns}, 1fr)`,
  gridTemplateRows: `repeat(${numberOfRows}, 1fr)`,
};

export const AnimatedHeroGrid = () => {
  const currentMessageIndexRef = useRef(0);
  const [accessibilityDescription, setAccessibilityDescription] = useState(
    messageAccessibilityDescriptions[currentMessageIndexRef.current],
  );
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [isPeriodicUpdatePaused, setIsPeriodicUpdatePaused] = useState(false);
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
  const { isPhone } = useBreakpoints();
  const pauseIconSize: IconSize = isPhone ? 'xs' : 'm';

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
      const newAccessibilityDescription = messageAccessibilityDescriptions[nextMessageIndex];

      setAccessibilityDescription(newAccessibilityDescription);
      currentMessageIndexRef.current = nextMessageIndex;
    },
    [gridCellSpringsRef],
  );

  const pauseMessageUpdateInterval = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  }, []);

  const resumeMessageUpdateInterval = useCallback(() => {
    intervalRef.current = setInterval(animateMessage, autoTransitionIntervalMs);
  }, [animateMessage]);

  const handlePauseButtonClick = useCallback(() => {
    pauseMessageUpdateInterval();
    setIsPeriodicUpdatePaused(true);
  }, [pauseMessageUpdateInterval]);

  const handleResumeButtonClick = useCallback(() => {
    setIsPeriodicUpdatePaused(false);
    animateMessage();
    resumeMessageUpdateInterval();
  }, [animateMessage, resumeMessageUpdateInterval]);

  const handleFullGridFocusChange: React.FocusEventHandler<HTMLDivElement> = useCallback(
    ({ target, type }) => {
      if (target !== gridRef.current) return;
      if (type === 'focus') {
        pauseMessageUpdateInterval();
        return;
      }
      if (type === 'blur' && !isPeriodicUpdatePaused) {
        resumeMessageUpdateInterval();
        return;
      }
    },
    [isPeriodicUpdatePaused, pauseMessageUpdateInterval, resumeMessageUpdateInterval],
  );

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
      if (!isPeriodicUpdatePaused) {
        resumeMessageUpdateInterval();
      }
    },
    [animateMessage, isPeriodicUpdatePaused, pauseMessageUpdateInterval, resumeMessageUpdateInterval],
  );

  const handleCellHoverStart = useCallback(
    (cellIndex: number) => {
      if (!isPeriodicUpdatePaused) setHoveredCellIndex(cellIndex);
    },
    [isPeriodicUpdatePaused],
  );

  const handleCellHoverEnd = useCallback(() => {
    setHoveredCellIndex(null);
  }, []);

  useEffect(() => {
    resumeMessageUpdateInterval();
    return () => {
      pauseMessageUpdateInterval();
    };
  }, [pauseMessageUpdateInterval, resumeMessageUpdateInterval]);

  return (
    <Box display="block" position="relative">
      <Grid
        ref={gridRef}
        accessibilityLabel={accessibilityDescription}
        aria-live="polite"
        borderRadius={200}
        className={styles.grid}
        onBlur={handleFullGridFocusChange}
        onFocus={handleFullGridFocusChange}
        onKeyDown={handleFullGridKeyDown}
        position="relative"
        role="button"
        tabIndex={0}
        {...commonGridProps}
      >
        {gridCellSprings.map(({ charSetIndex }, cellIndex) =>
          cellIndex < numberOfColumns * numberOfRows - 1 ? (
            <AnimatedHeroCell
              key={charSetIndex.id}
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
      </Grid>
      <Grid
        bottom={0}
        className={styles.gridOverlay}
        height="100%"
        left={0}
        position="absolute"
        right={0}
        top={0}
        {...commonGridProps}
      >
        <Pressable
          accessibilityLabel={isPeriodicUpdatePaused ? 'Play message' : 'Pause message'}
          alignItems="center"
          aria-live="polite"
          aspectRatio={1}
          background="bgAlternate"
          borderRadius={{ base: 200, phone: 100 }}
          borderWidth={0}
          className={styles.pauseButton}
          gridColumnEnd={numberOfColumns + 1}
          gridColumnStart={numberOfColumns}
          gridRowEnd={numberOfRows + 1}
          gridRowStart={numberOfRows}
          justifyContent="center"
          onClick={isPeriodicUpdatePaused ? handleResumeButtonClick : handlePauseButtonClick}
        >
          <Icon
            active
            color="fgMuted"
            name={isPeriodicUpdatePaused ? 'play' : 'pause'}
            size={pauseIconSize}
          />
        </Pressable>
      </Grid>
    </Box>
  );
};
```

---

## `styles.module.css`

```css
.grid:focus-visible {
  outline-offset: 2px;
  outline-style: solid;
  outline-width: 2px;
  outline-color: var(--color-bgPrimary);
}

.gridOverlay {
  pointer-events: none;
}

.pauseButton {
  pointer-events: all;
}
```

---

## `useThrottledValue.ts`

```ts
import { useCallback, useRef, useState } from 'react';

export const useThrottledValue = <T>(value: T, delay: number) => {
  const [throttledValue, setThrottledValue] = useState(value);
  const lastExecutedAt = useRef(0);
  const throttleTimeoutIdRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  const updateThrottledValue = useCallback(
    (newValue: T) => {
      const now = Date.now();
      const timeElapsed = now - lastExecutedAt.current;

      if (timeElapsed >= delay) {
        if (throttleTimeoutIdRef.current) {
          clearTimeout(throttleTimeoutIdRef.current);
          throttleTimeoutIdRef.current = undefined;
        }
        setThrottledValue(newValue);
        lastExecutedAt.current = now;
      } else if (!throttleTimeoutIdRef.current) {
        throttleTimeoutIdRef.current = setTimeout(() => {
          setThrottledValue(newValue);
          lastExecutedAt.current = Date.now();
          throttleTimeoutIdRef.current = undefined;
        }, delay - timeElapsed);
      }
    },
    [delay],
  );

  if (value !== throttledValue) updateThrottledValue(value);

  return throttledValue;
};
```
