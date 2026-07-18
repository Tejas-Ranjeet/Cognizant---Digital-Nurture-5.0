# Week 5: Angular (v20.0) Hands-On Exercises

## Digital Nurture 5.0 - .NET Full Stack Engineer Track

This folder contains all 10 hands-on exercises for Angular concepts, organized by task.

## Folder Structure

```
week-5/
├── models/
│   └── course.model.ts          # Shared interfaces (Course, Student, Enrollment)
│
├── hands-on-1/                  # [Beginner] Setup & Components
│   ├── task-1/ProjectNotes.tsx
│   ├── task-2/ComponentsDemo.tsx
│   └── index.tsx
│
├── hands-on-2/                  # [Beginner] Bindings & Lifecycle
│   ├── task-1/DataBindingDemo.tsx
│   ├── task-2/LifecycleHooksDemo.tsx
│   ├── task-3/InputOutputDemo.tsx
│   └── index.tsx
│
├── hands-on-3/                  # [Beginner] Directives & Pipes
│   ├── task-1/StructuralDirectivesDemo.tsx
│   ├── task-2/AttributeDirectivesDemo.tsx
│   ├── task-3/CustomDirectivePipeDemo.tsx
│   └── index.tsx
│
├── hands-on-4/                  # [Intermediate] Template Forms
│   ├── task-1/TemplateDrivenFormDemo.tsx
│   ├── task-2/FormValidationDemo.tsx
│   └── index.tsx
│
├── hands-on-5/                  # [Intermediate] Reactive Forms
│   ├── task-1/ReactiveFormDemo.tsx
│   ├── task-2/CustomValidatorsDemo.tsx
│   └── index.tsx
│
├── hands-on-6/                  # [Intermediate] Services & DI
│   ├── task-1/CourseServiceDemo.tsx
│   ├── task-2/EnrollmentServiceDemo.tsx
│   └── index.tsx
│
├── hands-on-7/                  # [Intermediate] Routing & Guards
│   ├── task-1/RoutingDemo.tsx
│   ├── task-2/LazyLoadingGuardsDemo.tsx
│   └── index.tsx
│
├── hands-on-8/                  # [Advanced] HTTP Client
│   ├── task-1/HttpClientDemo.tsx
│   ├── task-2/RxJSOperatorsDemo.tsx
│   ├── task-3/InterceptorsDemo.tsx
│   └── index.tsx
│
├── hands-on-9/                  # [Advanced] NgRx State Management
│   ├── task-1/NgRxStoreDemo.tsx
│   ├── task-2/NgRxEffectsDemo.tsx
│   └── index.tsx
│
├── hands-on-10/                 # [Advanced] Unit Testing
│   ├── task-1/ComponentTestingDemo.tsx
│   ├── task-2/ServiceTestingDemo.tsx
│   └── index.tsx
│
├── index.tsx                    # Main exports
└── README.md                    # This file
```

## Topics Covered

| Hands-On | Level | Topics |
|----------|-------|--------|
| 1 | Beginner | CLI setup, project structure, components |
| 2 | Beginner | Data binding, lifecycle hooks, @Input/@Output |
| 3 | Beginner | *ngIf, *ngFor, *ngSwitch, ngClass, ngStyle, custom pipes |
| 4 | Intermediate | Template-driven forms, ngModel, validation |
| 5 | Intermediate | Reactive forms, FormBuilder, FormArray, custom validators |
| 6 | Intermediate | Services, dependency injection, providedIn |
| 7 | Intermediate | Routing, guards, lazy loading |
| 8 | Advanced | HttpClient, RxJS operators, interceptors |
| 9 | Advanced | NgRx store, actions, reducers, effects, selectors |
| 10 | Advanced | Jasmine, Karma, TestBed, MockStore |

## How to Use

1. Navigate to the home page to see all hands-on exercises
2. Click on any hands-on card to start
3. Use the dropdown navigation in the header to switch between tasks
4. Open browser console (F12) to see lifecycle hooks and other logs

## Angular → React Concept Mapping

| Angular | React Equivalent |
|---------|------------------|
| `{{ value }}` | `{value}` |
| `[property]="value"` | `property={value}` |
| `(event)="handler()"` | `onEvent={handler}` |
| `[(ngModel)]` | `value + onChange` |
| `ngOnInit` | `useEffect(() => {}, [])` |
| `ngOnDestroy` | `useEffect cleanup` |
| `ngOnChanges` | `useEffect with deps` |
| `@Input()` | Props |
| `@Output()` | Callback props |
| `*ngFor` | `array.map()` |
| `*ngIf` | `{condition && ...}` |
| `providedIn: 'root'` | React Context |
| `HttpClient` | fetch/axios |
| `NgRx Store` | Redux/Zustand |

## Student Course Portal

All exercises build a unified **Student Course Portal** application with:
- Home dashboard with stats
- Course listing with filtering
- Student profile
- Enrollment functionality
- Form validation
- API integration
- State management
- Unit tests
