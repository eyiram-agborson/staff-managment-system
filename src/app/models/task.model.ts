export interface Task {
  id: number;
  title: string;
  description: string;
  assignedTo: number;
  priority: 'low' | 'medium' | 'high';
  status: 'pending' | 'in-progress' | 'completed';
  deadline: string;
}