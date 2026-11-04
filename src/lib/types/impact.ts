export type ImpactCategory = {
  name: string;
  count: number;
};

export type RecentActivity = {
  eventId: string;
  title: string;
  type: string;
  location: string;
  date: string;
  volunteerHours: number;
  confirmedAt: string | null;
};

export type ImpactData = {
  totalJoined: number;
  completedActivities: number;
  volunteerHours: number;
  achievements: string[];
  categories: ImpactCategory[];
  recentActivities: RecentActivity[];
};