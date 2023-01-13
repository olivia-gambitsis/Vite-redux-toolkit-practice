// DUCKS pattern
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { newTodoRequest, todo } from "../../fakeData";

interface TodosState {
  entities: todo[];
  loading: boolean;
  error: null | string;
}

const initialState: TodosState = {
  entities: [],
  loading: false,
  error: null,
};

const API_URL = "https://localhost:7124/api/todoitems";

export const fetchTodos = createAsyncThunk(
  "todos/fetchTodos",
  async (data, thunkApi) => {
    try {
      const response = await axios.get<todo[]>(API_URL);
      return response.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const addNewTodo = createAsyncThunk(
  "todos/addNewTodo",
  async (newTodo: newTodoRequest) => {
    const todoItem = {
      name: newTodo.name,
      description: newTodo.description,
      estimatedTimeToComplete: newTodo.estimatedTimeToComplete,
      isComplete: false,
      orderIndex: newTodo.orderIndex 
    };
    const response = await axios.post<todo>(API_URL, todoItem);
    return response.data;
  }
);

export const updateTodo = createAsyncThunk(
  "todos/updateTodo",
  async (todo: todo) => {
    const updatedTodo = {
      id: todo.id,
      name: todo.name,
      description: todo.description,
      estimatedTimeToComplete: todo.estimatedTimeToComplete,
      isComplete: todo.isComplete,
      orderIndex: todo.orderIndex
    };
    const response = await axios.put(`${API_URL}/${todo.id}`, updatedTodo);
    if(response){
      return updatedTodo
    }
  }
);

export const toggleComplete = createAsyncThunk(
  "todos/toggleComplete",
  async (todo: todo) => {
    const updatedTodo = {
      isComplete: !todo.isComplete
    };
    const response = await axios.patch(`${API_URL}/${todo.id}`, updatedTodo);
    if(response){
      return response
    }
  }
);


export const deleteTodo = createAsyncThunk(
  "todos/deleteTodo",
  async (id: string) => {
    const response = await axios.delete(`${API_URL}/${id}`);
    if(response){
      return id
    }
  }
);

const todosSlice = createSlice({
  name: "todos",
  initialState,
  //these are normal reducers (that do not have an async operation)
  reducers: {
    // todoAdded(state, action: PayloadAction<todo>) {
    //   // it's okay to do this because immer makes it immutable
    //   // under the hood ( we don't have to do ...state, )
    //   state.entities.push(action.payload);
    // },
    // todoToggled(state, action: PayloadAction<string>) {
    //   const todo = state.entities.find((todo) => todo.id === action.payload)!;
    //   todo.completed = !todo?.completed;
    // },
    // todoDeleted(state, action: PayloadAction<number>) {
    //   delete state.entities[action.payload];
    // },
    // todoColorSelected: {
    //   reducer(state, action: PayloadAction<{ color: string; todoId: number }>) {
    //     const { color, todoId } = action.payload;
    //     state.entities[todoId].color = color;
    //   },
    //   prepare(todoId: number, color: string) {
    //     return {
    //       payload: { todoId, color },
    //     };
    //   },
    // },
  },
  extraReducers: (builder) => {
    //here we have different cases for the different states we can have from our action
    builder
      //what is going to happen when our action "fetch posts" is pending
      .addCase(fetchTodos.pending, (state, action) => {
        state.loading = true;
      })
      //if fufilled we get an array of todos
      .addCase(fetchTodos.fulfilled, (state, action: PayloadAction<todo[]>) => {
        state.loading = false;
        state.entities = action.payload;
      })
      .addCase(fetchTodos.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addNewTodo.fulfilled, (state, action: PayloadAction<todo>) => {
        state.entities.push(action.payload);
      })
      .addCase(deleteTodo.fulfilled, (state, action: PayloadAction<any>) => {
        state.entities = state.entities.filter(entity => entity.id !== action.payload)
      })
      .addCase(updateTodo.fulfilled, (state, action:PayloadAction<any>) =>{
        let todo = state.entities.find(todo => todo.id === action.payload.id);
        if(todo){
         todo.name = action.payload.name;
         todo.description = action.payload.description;
         todo.estimatedTimeToComplete = action.payload.estimatedTimeToComplete;
         todo.isComplete = action.payload.completed;
         todo.orderIndex = action.payload.orderIndex;
        }
      })
      .addCase(toggleComplete.fulfilled, (state, action:PayloadAction<any>) =>{
        let todo = state.entities.find(todo => todo.id === action.payload.id);
        if(todo){
          todo.isComplete = !action.payload.completed;
        }
      })
  },
});

// export const { todoAdded, todoToggled, todoDeleted, todoColorSelected } =
//   todosSlice.actions;
export default todosSlice.reducer;
