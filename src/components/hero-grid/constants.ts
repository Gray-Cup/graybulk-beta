export const numberOfRows = 4;
export const numberOfColumns = 7;

export const characterSet = [
  'A', '#F07836', 'I', 'G', 'Y', '@', '+', 'M', 'X', '5', '9', '(', '3', 'Q', '#E5CD30',
  'D', 'E', '7', '#27AD75', 'C', 'B', '#', 'V', '-', 'L', 'N', 'U', 'J', 'S', '6', 'P',
  '1', '!', '#CD99FD', ' ', '$', 'W', '<', '/', ':', '0', '4', 'H', '&', '#E175D6', 'F',
  'R', 'K', '2', 'T', '#578BFA', ',', 'O', '8', '%', '~', 'Z',
];

export const messages = [
  [
    ['F', 'A', 'C', 'T', 'O', 'R', 'Y'],
    ['D', 'I', 'R', 'E', 'C', 'T', ' '],
    ['T', 'R', 'A', 'D', 'I', 'N', 'G'],
    ['N', 'E', 'T', 'W', 'O', 'R', 'K'],
  ],
  [
    ['B', 'U', 'L', 'K', ' ', ' ', ' '],
    ['O', 'R', 'D', 'E', 'R', 'S', ' '],
    ['F', 'A', 'S', 'T', 'E', 'R', ' '],
    ['C', 'H', 'E', 'A', 'P', 'E', 'R'],
  ],
  [
    ['S', 'O', 'U', 'R', 'C', 'E', ' '],
    ['D', 'I', 'R', 'E', 'C', 'T', ' '],
    ['N', 'O', ' ', 'F', 'E', 'E', 'S'],
    ['E', 'V', 'E', 'R', ' ', ' ', ' '],
  ],
  [
    ['G', 'L', 'O', 'B', 'A', 'L', ' '],
    ['S', 'U', 'P', 'P', 'L', 'Y', ' '],
    ['C', 'H', 'A', 'I', 'N', 'S', ' '],
    ['S', 'O', 'L', 'V', 'E', 'D', ' '],
  ],
  [
    ['T', 'R', 'A', 'D', 'E', ' ', ' '],
    ['S', 'M', 'A', 'R', 'T', 'E', 'R'],
    ['G', 'R', 'O', 'W', ' ', ' ', ' '],
    ['B', 'I', 'G', 'G', 'E', 'R', ' '],
  ],
];

export const messagesCharSetIndices = messages.map((message) =>
  message.map((line) =>
    line.map((character) => {
      const index = characterSet.indexOf(character);
      return index === -1 ? 36 : index;
    }),
  ),
);

export const messageAccessibilityDescriptions = messages.map(
  (message) =>
    `Current message: ${message
      .map((row) => row.join('').trim())
      .filter((row) => !!row)
      .join(' ')}. Press Enter or Space to skip to the next message.`,
);

export const autoTransitionIntervalMs = 10000;
export const gridCellDistanceDelayMs = 80;
export const maxUpdatesPerSecond = 20;
