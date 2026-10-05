export interface Task {
  id: number;
  title: string;
  assignedTo: string;
  priority: 'High' | 'Medium' | 'Low';
  deadline: string;
  status: 'Pending' | 'In-Progress' | 'Completed';
}