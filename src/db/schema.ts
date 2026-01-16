import {
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
  integer,
  boolean,
  pgEnum,
  date,
  time,
} from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

// Enums
export const userRoleEnum = pgEnum('user_role', ['elderly', 'volunteer', 'family']);
export const meetingStatusEnum = pgEnum('meeting_status', [
  'programada',
  'próxima',
  'en_progreso',
  'completada',
  'cancelada',
]);
export const interestCategoryEnum = pgEnum('interest_category', [
  'social',
  'technical',
  'soft-skills',
  'hobbies',
]);
export const skillLevelEnum = pgEnum('skill_level', ['básico', 'intermedio', 'avanzado', 'experto']);
export const tutorialContentTypeEnum = pgEnum('tutorial_content_type', [
  'page',        // Página de contenido con texto, título, descripción
  'image',       // Imagen ilustrativa
  'video',       // Video explicativo
  'document',    // Documento PDF o similar
  'activity',    // Actividad interactiva
  'quiz',        // Pregunta/quiz
  'interaction', // Interacción específica (click, swipe, etc.)
  'tip',         // Tip o consejo destacado
]);

// Users Table
export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  fullName: varchar('full_name', { length: 255 }).notNull(),
  phone: varchar('phone', { length: 20 }).notNull(),
  cedula: varchar('cedula', { length: 50 }).notNull().unique(),
  profileImage: text('profile_image'),
  role: userRoleEnum('role').notNull(),
  email: varchar('email', { length: 255 }),
  location: varchar('location', { length: 255 }),
  availability: text('availability'), // JSON string o texto libre
  specialty: text('specialty'), // Para voluntarios
  bio: text('bio'), // Biografía/descripción
  isOnline: boolean('is_online').default(false),
  lastSeen: timestamp('last_seen', { withTimezone: true }),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
});

// Interests Catalog Table
export const interests = pgTable('interests', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull().unique(),
  category: interestCategoryEnum('category').notNull(),
  icon: varchar('icon', { length: 10 }), // Emoji o código de icono
  description: text('description'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
});

// User Interests (Many-to-Many)
export const userInterests = pgTable('user_interests', {
  id: serial('id').primaryKey(),
  userId: integer('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  interestId: integer('interest_id')
    .notNull()
    .references(() => interests.id, { onDelete: 'cascade' }),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
});

// Skills Table (Habilidades técnicas que los voluntarios pueden enseñar)
export const skills = pgTable('skills', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull().unique(),
  description: text('description'),
  category: varchar('category', { length: 100 }), // 'technical', 'social', etc.
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
});

// User Skills (Many-to-Many para voluntarios)
export const userSkills = pgTable('user_skills', {
  id: serial('id').primaryKey(),
  userId: integer('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  skillId: integer('skill_id')
    .notNull()
    .references(() => skills.id, { onDelete: 'cascade' }),
  level: skillLevelEnum('level').default('intermedio'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
});

// Conversations Table
export const conversations = pgTable('conversations', {
  id: serial('id').primaryKey(),
  participant1Id: integer('participant1_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  participant2Id: integer('participant2_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  lastMessage: text('last_message'),
  lastMessageTime: timestamp('last_message_time', { withTimezone: true }),
  lastMessageSenderId: integer('last_message_sender_id').references(() => users.id),
  unreadCount1: integer('unread_count_1').default(0), // Mensajes no leídos para participant1
  unreadCount2: integer('unread_count_2').default(0), // Mensajes no leídos para participant2
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
});

// Messages Table
export const messages = pgTable('messages', {
  id: serial('id').primaryKey(),
  conversationId: integer('conversation_id')
    .notNull()
    .references(() => conversations.id, { onDelete: 'cascade' }),
  senderId: integer('sender_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  text: text('text').notNull(),
  isRead: boolean('is_read').default(false),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
});

// Meetings/Sessions Table
export const meetings = pgTable('meetings', {
  id: serial('id').primaryKey(),
  elderlyId: integer('elderly_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  volunteerId: integer('volunteer_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  topic: varchar('topic', { length: 255 }).notNull(),
  description: text('description'),
  scheduledDate: date('scheduled_date').notNull(),
  scheduledTime: time('scheduled_time').notNull(),
  actualStartTime: timestamp('actual_start_time', { withTimezone: true }),
  actualEndTime: timestamp('actual_end_time', { withTimezone: true }),
  duration: integer('duration'), // Duración en minutos
  status: meetingStatusEnum('status').default('programada').notNull(),
  meetingLink: text('meeting_link'), // URL de la videollamada
  notes: text('notes'), // Notas de la sesión
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
});

// Ratings Table
export const ratings = pgTable('ratings', {
  id: serial('id').primaryKey(),
  meetingId: integer('meeting_id')
    .notNull()
    .references(() => meetings.id, { onDelete: 'cascade' })
    .unique(), // Una calificación por reunión
  raterId: integer('rater_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }), // Quien califica (generalmente el elderly)
  ratedUserId: integer('rated_user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }), // Quien es calificado (generalmente el volunteer)
  rating: integer('rating').notNull(), // 1-5
  comment: text('comment'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
});

// Tutorials Catalog Table (Catálogo de tutoriales disponibles)
export const tutorials = pgTable('tutorials', {
  id: serial('id').primaryKey(),
  key: varchar('key', { length: 100 }).notNull().unique(), // 'welcome', 'calendar', 'search', 'messages', 'profile', etc.
  title: varchar('title', { length: 255 }).notNull(),
  description: text('description'),
  category: varchar('category', { length: 100 }), // 'onboarding', 'feature', 'quick-action', etc.
  targetRole: userRoleEnum('target_role'), // null = todos los roles, 'elderly' = solo adultos mayores, etc.
  icon: varchar('icon', { length: 50 }), // Nombre del icono o emoji
  order: integer('order').default(0), // Orden de visualización
  isActive: boolean('is_active').default(true),
  isRequired: boolean('is_required').default(false), // Si es obligatorio completarlo
  estimatedDuration: integer('estimated_duration'), // Duración estimada en minutos (calculado automáticamente)
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
});

// Tutorial Content Table (Contenido individual de cada tutorial)
export const tutorialContent = pgTable('tutorial_content', {
  id: serial('id').primaryKey(),
  tutorialId: integer('tutorial_id')
    .notNull()
    .references(() => tutorials.id, { onDelete: 'cascade' }),
  contentType: tutorialContentTypeEnum('content_type').notNull(),
  order: integer('order').notNull(), // Orden dentro del tutorial
  title: varchar('title', { length: 255 }), // Título del contenido (opcional)
  text: text('text'), // Texto descriptivo o contenido
  description: text('description'), // Descripción adicional
  // URLs y recursos
  imageUrl: text('image_url'), // URL de imagen
  videoUrl: text('video_url'), // URL de video (YouTube, Vimeo, etc.)
  documentUrl: text('document_url'), // URL de documento (PDF, etc.)
  thumbnailUrl: text('thumbnail_url'), // URL de miniatura para videos/imágenes
  // Metadata específica por tipo
  metadata: text('metadata'), // JSON con metadata adicional (duración video, tamaño archivo, etc.)
  // Configuración de visualización
  isRequired: boolean('is_required').default(false), // Si el usuario debe ver/completar este contenido
  canSkip: boolean('can_skip').default(true), // Si se puede saltar
  duration: integer('duration'), // Duración estimada en segundos (para videos, actividades, etc.)
  // Para actividades interactivas
  activityData: text('activity_data'), // JSON con datos de la actividad (preguntas, opciones, etc.)
  correctAnswer: text('correct_answer'), // Respuesta correcta (para quizzes)
  feedback: text('feedback'), // Feedback al completar (para actividades/quizzes)
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
});

// Tutorial Progress Table (Para trackear qué tutoriales ha visto/completado el usuario)
export const tutorialProgress = pgTable('tutorial_progress', {
  id: serial('id').primaryKey(),
  userId: integer('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  tutorialId: integer('tutorial_id')
    .notNull()
    .references(() => tutorials.id, { onDelete: 'cascade' }),
  hasSeen: boolean('has_seen').default(false),
  hasCompleted: boolean('has_completed').default(false), // Si completó todos los pasos/contenidos
  currentContentId: integer('current_content_id').references(() => tutorialContent.id), // Contenido actual en el que está
  progressPercentage: integer('progress_percentage').default(0), // Porcentaje de completitud (0-100)
  completedAt: timestamp('completed_at', { withTimezone: true }),
  seenAt: timestamp('seen_at', { withTimezone: true }),
  skippedAt: timestamp('skipped_at', { withTimezone: true }), // Si el usuario saltó el tutorial
  timeSpent: integer('time_spent'), // Tiempo total en segundos
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
});

// Tutorial Content Progress Table (Progreso detallado por cada elemento de contenido)
export const tutorialContentProgress = pgTable('tutorial_content_progress', {
  id: serial('id').primaryKey(),
  userId: integer('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  tutorialProgressId: integer('tutorial_progress_id')
    .notNull()
    .references(() => tutorialProgress.id, { onDelete: 'cascade' }),
  contentId: integer('content_id')
    .notNull()
    .references(() => tutorialContent.id, { onDelete: 'cascade' }),
  hasViewed: boolean('has_viewed').default(false), // Si vio el contenido
  hasCompleted: boolean('has_completed').default(false), // Si completó el contenido (para actividades/quizzes)
  // Para quizzes y actividades
  answer: text('answer'), // Respuesta del usuario
  isCorrect: boolean('is_correct'), // Si la respuesta es correcta (para quizzes)
  score: integer('score'), // Puntuación obtenida
  attempts: integer('attempts').default(0), // Número de intentos
  timeSpent: integer('time_spent'), // Tiempo en segundos viendo/completando este contenido
  viewedAt: timestamp('viewed_at', { withTimezone: true }),
  completedAt: timestamp('completed_at', { withTimezone: true }),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
});

// Relations
export const usersRelations = relations(users, ({ many }) => ({
  interests: many(userInterests),
  skills: many(userSkills),
  conversationsAsParticipant1: many(conversations, { relationName: 'participant1' }),
  conversationsAsParticipant2: many(conversations, { relationName: 'participant2' }),
  sentMessages: many(messages),
  meetingsAsElderly: many(meetings, { relationName: 'elderly' }),
  meetingsAsVolunteer: many(meetings, { relationName: 'volunteer' }),
  ratingsGiven: many(ratings, { relationName: 'rater' }),
  ratingsReceived: many(ratings, { relationName: 'rated' }),
  tutorialProgress: many(tutorialProgress),
}));

export const tutorialsRelations = relations(tutorials, ({ many }) => ({
  content: many(tutorialContent),
  progress: many(tutorialProgress),
}));

export const tutorialContentRelations = relations(tutorialContent, ({ one, many }) => ({
  tutorial: one(tutorials, {
    fields: [tutorialContent.tutorialId],
    references: [tutorials.id],
  }),
  contentProgress: many(tutorialContentProgress),
}));

export const interestsRelations = relations(interests, ({ many }) => ({
  users: many(userInterests),
}));

export const userInterestsRelations = relations(userInterests, ({ one }) => ({
  user: one(users, {
    fields: [userInterests.userId],
    references: [users.id],
  }),
  interest: one(interests, {
    fields: [userInterests.interestId],
    references: [interests.id],
  }),
}));

export const skillsRelations = relations(skills, ({ many }) => ({
  users: many(userSkills),
}));

export const userSkillsRelations = relations(userSkills, ({ one }) => ({
  user: one(users, {
    fields: [userSkills.userId],
    references: [users.id],
  }),
  skill: one(skills, {
    fields: [userSkills.skillId],
    references: [skills.id],
  }),
}));

export const conversationsRelations = relations(conversations, ({ one, many }) => ({
  participant1: one(users, {
    fields: [conversations.participant1Id],
    references: [users.id],
    relationName: 'participant1',
  }),
  participant2: one(users, {
    fields: [conversations.participant2Id],
    references: [users.id],
    relationName: 'participant2',
  }),
  lastMessageSender: one(users, {
    fields: [conversations.lastMessageSenderId],
    references: [users.id],
  }),
  messages: many(messages),
}));

export const messagesRelations = relations(messages, ({ one }) => ({
  conversation: one(conversations, {
    fields: [messages.conversationId],
    references: [conversations.id],
  }),
  sender: one(users, {
    fields: [messages.senderId],
    references: [users.id],
  }),
}));

export const meetingsRelations = relations(meetings, ({ one }) => ({
  elderly: one(users, {
    fields: [meetings.elderlyId],
    references: [users.id],
    relationName: 'elderly',
  }),
  volunteer: one(users, {
    fields: [meetings.volunteerId],
    references: [users.id],
    relationName: 'volunteer',
  }),
  rating: one(ratings),
}));

export const ratingsRelations = relations(ratings, ({ one }) => ({
  meeting: one(meetings, {
    fields: [ratings.meetingId],
    references: [meetings.id],
  }),
  rater: one(users, {
    fields: [ratings.raterId],
    references: [users.id],
    relationName: 'rater',
  }),
  ratedUser: one(users, {
    fields: [ratings.ratedUserId],
    references: [users.id],
    relationName: 'rated',
  }),
}));

export const tutorialProgressRelations = relations(tutorialProgress, ({ one, many }) => ({
  user: one(users, {
    fields: [tutorialProgress.userId],
    references: [users.id],
  }),
  tutorial: one(tutorials, {
    fields: [tutorialProgress.tutorialId],
    references: [tutorials.id],
  }),
  currentContent: one(tutorialContent, {
    fields: [tutorialProgress.currentContentId],
    references: [tutorialContent.id],
  }),
  contentProgress: many(tutorialContentProgress),
}));

export const tutorialContentProgressRelations = relations(tutorialContentProgress, ({ one }) => ({
  user: one(users, {
    fields: [tutorialContentProgress.userId],
    references: [users.id],
  }),
  tutorialProgress: one(tutorialProgress, {
    fields: [tutorialContentProgress.tutorialProgressId],
    references: [tutorialProgress.id],
  }),
  content: one(tutorialContent, {
    fields: [tutorialContentProgress.contentId],
    references: [tutorialContent.id],
  }),
}));
