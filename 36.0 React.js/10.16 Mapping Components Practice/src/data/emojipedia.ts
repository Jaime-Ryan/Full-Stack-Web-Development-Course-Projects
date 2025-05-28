export interface EmojiEntry {
  id: number;
  emoji: string;
  name: string;
  meaning: string;
  category: 'gestures' | 'emotions' | 'activities' | 'symbols' | 'nature' | 'objects';
  tags: string[];
}

export const emojipedia: EmojiEntry[] = [
  {
    id: 1,
    emoji: "💪",
    name: "Flexed Biceps",
    meaning: "Represents strength, determination, and the ability to overcome challenges. Often used to show encouragement or to express 'you can do it!' Also commonly used in fitness and workout contexts.",
    category: 'gestures',
    tags: ['strength', 'motivation', 'fitness', 'power', 'determination']
  },
  {
    id: 2,
    emoji: "🙏",
    name: "Folded Hands",
    meaning: "Two hands pressed together in prayer or gratitude. Can represent saying grace, meditation, or expressing thanks. Also used as a high-five gesture or to show appreciation and respect.",
    category: 'gestures',
    tags: ['prayer', 'gratitude', 'thanks', 'respect', 'meditation']
  },
  {
    id: 3,
    emoji: "🤣",
    name: "Rolling on the Floor Laughing",
    meaning: "Extreme laughter! A face tilted and rolling with laughter, tears streaming from both eyes. The digital equivalent of 'ROFL' - represents something hilariously funny.",
    category: 'emotions',
    tags: ['laughter', 'funny', 'hilarious', 'ROFL', 'humor']
  },
  {
    id: 4,
    emoji: "🎉",
    name: "Party Popper",
    meaning: "A cone-shaped party hat with confetti bursting out. Used to celebrate achievements, birthdays, promotions, or any joyous occasion. Represents festivity and celebration.",
    category: 'activities',
    tags: ['celebration', 'party', 'confetti', 'achievement', 'success']
  },
  {
    id: 5,
    emoji: "🚀",
    name: "Rocket",
    meaning: "A rocket blasting off into space. Symbolizes rapid growth, progress, innovation, or launching something new. Popular in startup and tech contexts to represent explosive growth.",
    category: 'objects',
    tags: ['launch', 'growth', 'innovation', 'startup', 'progress']
  },
  {
    id: 6,
    emoji: "❤️",
    name: "Red Heart",
    meaning: "The classic symbol of love and affection. Used to express romantic love, deep friendship, or strong positive feelings. The most popular heart emoji across all platforms.",
    category: 'symbols',
    tags: ['love', 'romance', 'affection', 'heart', 'care']
  },
  {
    id: 7,
    emoji: "🌟",
    name: "Glowing Star",
    meaning: "A bright, shining star that represents excellence, achievement, or something special. Often used to highlight important points or to express that something is outstanding.",
    category: 'nature',
    tags: ['excellence', 'achievement', 'special', 'bright', 'outstanding']
  },
  {
    id: 8,
    emoji: "🔥",
    name: "Fire",
    meaning: "Represents something hot, trendy, or amazing. In modern usage, it often means 'lit' or indicates that something is particularly good, popular, or impressive.",
    category: 'nature',
    tags: ['hot', 'trendy', 'amazing', 'lit', 'popular']
  },
  {
    id: 9,
    emoji: "🎯",
    name: "Direct Hit",
    meaning: "A target with an arrow hitting the bullseye. Represents precision, achieving goals, hitting targets, or being exactly right. Popular in business contexts for goal achievement.",
    category: 'activities',
    tags: ['target', 'precision', 'goals', 'accuracy', 'achievement']
  },
  {
    id: 10,
    emoji: "💡",
    name: "Light Bulb",
    meaning: "Represents bright ideas, innovation, creativity, or having a 'lightbulb moment'. Used when sharing insights, solutions, or creative thoughts.",
    category: 'objects',
    tags: ['idea', 'innovation', 'creativity', 'insight', 'solution']
  }
];

export default emojipedia; 