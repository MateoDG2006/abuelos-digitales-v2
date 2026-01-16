import { InferSelectModel, InferInsertModel } from 'drizzle-orm';
import {
  users,
  interests,
  userInterests,
  skills,
  userSkills,
  conversations,
  messages,
  meetings,
  ratings,
  tutorials,
  tutorialContent,
  tutorialProgress,
  tutorialContentProgress,
} from './schema';

// Select types (para leer datos)
export type User = InferSelectModel<typeof users>;
export type Interest = InferSelectModel<typeof interests>;
export type UserInterest = InferSelectModel<typeof userInterests>;
export type Skill = InferSelectModel<typeof skills>;
export type UserSkill = InferSelectModel<typeof userSkills>;
export type Conversation = InferSelectModel<typeof conversations>;
export type Message = InferSelectModel<typeof messages>;
export type Meeting = InferSelectModel<typeof meetings>;
export type Rating = InferSelectModel<typeof ratings>;
export type Tutorial = InferSelectModel<typeof tutorials>;
export type TutorialContent = InferSelectModel<typeof tutorialContent>;
export type TutorialProgress = InferSelectModel<typeof tutorialProgress>;
export type TutorialContentProgress = InferSelectModel<typeof tutorialContentProgress>;

// Insert types (para crear datos)
export type NewUser = InferInsertModel<typeof users>;
export type NewInterest = InferInsertModel<typeof interests>;
export type NewUserInterest = InferInsertModel<typeof userInterests>;
export type NewSkill = InferInsertModel<typeof skills>;
export type NewUserSkill = InferInsertModel<typeof userSkills>;
export type NewConversation = InferInsertModel<typeof conversations>;
export type NewMessage = InferInsertModel<typeof messages>;
export type NewMeeting = InferInsertModel<typeof meetings>;
export type NewRating = InferInsertModel<typeof ratings>;
export type NewTutorial = InferInsertModel<typeof tutorials>;
export type NewTutorialContent = InferInsertModel<typeof tutorialContent>;
export type NewTutorialProgress = InferInsertModel<typeof tutorialProgress>;
export type NewTutorialContentProgress = InferInsertModel<typeof tutorialContentProgress>;
