/**
 * HANDS-ON 2: Data Binding, Lifecycle Hooks & Component Communication
 * 
 * This file exports all components from Hands-On 2 for easy importing.
 * 
 * Task 1: All Four Binding Types
 *   - HomeWithBindings: Demonstrates interpolation, property, event, and two-way binding
 * 
 * Task 2: Lifecycle Hooks
 *   - LifecycleDemo: Demonstrates ngOnInit, ngOnDestroy, ngOnChanges
 *   - CourseCardWithLifecycle: Child component with lifecycle hooks
 * 
 * Task 3: @Input and @Output
 *   - CourseCard: Child component with @Input props and @Output callbacks
 *   - CourseListWithIO: Parent component demonstrating data flow
 */

// Task 1: Data Binding
export { default as HomeWithBindings } from './task-1/HomeWithBindings';

// Task 2: Lifecycle Hooks
export { default as LifecycleDemo } from './task-2/LifecycleDemo';
export { default as CourseCardWithLifecycle } from './task-2/CourseCardWithLifecycle';

// Task 3: Input/Output Communication
export { default as CourseCard } from './task-3/CourseCard';
export { default as CourseListWithIO } from './task-3/CourseListWithIO';
