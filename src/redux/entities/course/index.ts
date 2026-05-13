import { createSlice } from "@reduxjs/toolkit";
import type {PayloadAction} from "@reduxjs/toolkit";
import type {TCourse} from "../../../types/course.ts";

interface CourseState {
    entities: Record<string, TCourse>;
    ids: string[];
}

const initialState: CourseState = {
    entities: {},
    ids: [],
};

export const courseSlice = createSlice({
    name: "course",
    initialState,
    reducers: {
        addCourse: (state, action: PayloadAction<TCourse>) => {
            const course = action.payload;
            state.entities[course.id] = course;
            if (!state.ids.includes(course.id)) {
                state.ids.push(course.id);
            }
        },
        addCourses: (state, action: PayloadAction<TCourse[]>) => {
            action.payload.forEach(course => {
                state.entities[course.id] = course;
                if (!state.ids.includes(course.id)) {
                    state.ids.push(course.id);
                }
            });
        },
        removeCourse: (state, action: PayloadAction<string>) => {
            const id = action.payload;
            delete state.entities[id];
            state.ids = state.ids.filter(courseId => courseId !== id);
        },
        clearCourses: (state) => {
            state.entities = {};
            state.ids = [];
        },
    },
});

export const { addCourse, addCourses, removeCourse, clearCourses } = courseSlice.actions;

export default courseSlice.reducer;
