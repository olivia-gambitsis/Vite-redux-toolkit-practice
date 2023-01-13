export interface todo {
	id: string;
  name: string;
  description: string;
  estimatedTimeToComplete: string;
  isComplete?: boolean;
  orderIndex?: number;
}

export interface newTodoRequest {
  name: string;
  description: string;
  estimatedTimeToComplete: string;
  isComplete?: boolean;
  orderIndex?: number;
}

export const todoData: todo[] = [
  {
		id: '1',
    name: "Shopping",
    description: "Buy some groceries",
    estimatedTimeToComplete: "2",
    isComplete: false
  },
  {
		id: '2',
    name: "Cleaning",
    description: "Clean the entire housr",
    estimatedTimeToComplete: "2",
    isComplete: false
  },
  {
		id: '3',
    name: "Cooking",
    description: "Cook some dinner",
    estimatedTimeToComplete: "2",
    isComplete: false
  },
  {
		id: '4',
    name: "Study",
    description: "Study everything.. all the things",
    estimatedTimeToComplete: "2",
    isComplete: false
  },
];
