export interface Episode {
  id: number;
  title: string;
  duration: number; // in seconds
  description: string;
  subtitle: string;
  narrative: string; // Detail voice script
  targetSection: string; // ERP program code, e.g., 'ACPI02', 'AJSB01'
  imageUrl?: string;
  steps: EpisodeStep[];
}

export interface EpisodeStep {
  time: number; // trigger time in seconds
  actionType: 'focus' | 'click' | 'type' | 'status' | 'highlight' | 'show_dialog';
  targetId: string;
  targetLabel: string;
  value?: string;
  narrativeText?: string;
}

export interface ERPStep {
  id: number;
  guide: string;
  targetId: string;
  action: 'click' | 'type' | 'select' | 'check' | 'done';
  value?: string;
  selector: string;
  errorMsg: string;
}

export interface DirectMessage {
  id: number;
  sender: string;
  avatar: string;
  role: string;
  time: string;
  message: string;
  isMe: boolean;
  unread: boolean;
}
