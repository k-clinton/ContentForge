export interface User {
  id?: string;
  name?: string;
  email?: string;
  credits?: number;
  plan?: string;
  avatar?: string;
}

export interface VaultItem {
  id: string;
  title: string;
  description: string;
  content: string;
  platform: string;
  image?: string;
  createdAt: string;
}

export interface SynthesisJob {
  id: string;
  sourceText?: string;
  url?: string;
  outputText: string;
  platform: string;
  voice: string;
  depth: number;
  createdAt: string;
}

export interface ActivityItem {
  id: string;
  task: string;
  engine: string;
  status: string;
  tokens: string;
  progress: number;
  impact: string;
  createdAt: string;
}

export interface Notification {
  id: string;
  title: string;
  description: string;
  type: string;
  icon: string;
  color: string;
  bg: string;
  isRead: boolean;
  createdAt: string;
}
