# Hands-On 2: Data Binding, Lifecycle Hooks & Component Communication

## Topics Covered
- ✅ Property Binding
- ✅ Event Binding
- ✅ Two-Way Binding (ngModel)
- ✅ Lifecycle Hooks — ngOnInit, ngOnChanges, ngOnDestroy
- ✅ @Input and @Output Decorators
- ✅ EventEmitter

## Folder Structure

```
src/hands-on-2/
├── task-1/
│   └── HomeWithBindings.tsx    # All four binding types demo
├── task-2/
│   ├── LifecycleDemo.tsx       # Parent component with lifecycle hooks
│   └── CourseCardWithLifecycle.tsx  # Child component with ngOnChanges
├── task-3/
│   ├── CourseCard.tsx          # Child component with @Input/@Output
│   └── CourseListWithIO.tsx    # Parent component with courses array
├── index.tsx                   # Export file for all components
└── README.md                   # This file
```

## Task 1: All Four Binding Types

**File:** `task-1/HomeWithBindings.tsx`

### Steps Completed:
- **Step 11:** `portalName` property with interpolation `{portalName}`
- **Step 12:** `isPortalActive` property with property binding `disabled={!isPortalActive}`
- **Step 13:** `onEnrollClick()` method with event binding `onClick={onEnrollClick}`
- **Step 14:** `searchTerm` with two-way binding `value={searchTerm} onChange={handler}`
- **Step 15:** Code comment explaining [property] vs [(ngModel)]

### Angular → React Mapping:
| Angular | React |
|---------|-------|
| `{{ portalName }}` | `{portalName}` |
| `[disabled]="!isPortalActive"` | `disabled={!isPortalActive}` |
| `(click)="onEnrollClick()"` | `onClick={onEnrollClick}` |
| `[(ngModel)]="searchTerm"` | `value={searchTerm} onChange={...}` |

---

## Task 2: Lifecycle Hooks

**Files:** 
- `task-2/LifecycleDemo.tsx`
- `task-2/CourseCardWithLifecycle.tsx`

### Steps Completed:
- **Step 16:** `ngOnInit` - useEffect with empty dependency array
- **Step 17:** `ngOnDestroy` - cleanup function returned from useEffect
- **Step 18:** CourseCardComponent with `ngOnChanges` - useEffect with dependency
- **Step 19:** Render three CourseCards with hardcoded inputs

### Angular → React Mapping:
| Angular | React |
|---------|-------|
| `ngOnInit()` | `useEffect(() => {...}, [])` |
| `ngOnDestroy()` | `useEffect(() => { return () => {...} }, [])` |
| `ngOnChanges(changes)` | `useEffect(() => {...}, [prop])` + useRef |

---

## Task 3: @Input and @Output

**Files:**
- `task-3/CourseCard.tsx`
- `task-3/CourseListWithIO.tsx`

### Steps Completed:
- **Step 20:** CourseCard with `@Input() course` - Props interface
- **Step 21:** `@Output() enrollRequested` - Callback prop with EventEmitter pattern
- **Step 22:** CourseList with 5 courses array and *ngFor mapping
- **Step 23:** `onEnroll(courseId)` handler logging and updating state
- **Step 24:** Display `selectedCourseId` with *ngIf conditional

### Angular → React Mapping:
| Angular | React |
|---------|-------|
| `@Input() course` | `course: Course` prop |
| `@Output() enrollRequested = new EventEmitter<number>()` | `onEnrollRequested: (id: number) => void` |
| `enrollRequested.emit(course.id)` | `onEnrollRequested(course.id)` |
| `*ngFor="let c of courses"` | `courses.map(c => ...)` |
| `*ngIf="selectedCourseId"` | `{selectedCourseId && ...}` |

---

## How to Test

1. Navigate to `/hands-on-2` in the browser
2. Use the sub-navigation to switch between tasks
3. Open browser console (F12) to see lifecycle hook logs

### Task 1 Testing:
- Toggle "Portal Active" button to enable/disable Enroll button
- Click "Enroll Now" to see event binding message
- Type in search box to see real-time two-way binding

### Task 2 Testing:
- Check console for "HomeComponent initialised" on page load
- Click "Unmount Course Cards" and check console for destroy logs
- Click "Add Credit" on any card to trigger ngOnChanges

### Task 3 Testing:
- Click "Enroll" on any course card
- Check console for "Enrolling in course: X" logs
- See selectedCourseId displayed below the course list

---

## Expected Outcomes

✅ Typing in search box updates "Searching for:" text in real time
✅ Clicking Enroll Now shows the enrollment message
✅ Button is disabled/enabled based on isPortalActive
✅ Console shows ngOnInit log on Home page load
✅ Console shows ngOnDestroy log on navigation away
✅ Console shows ngOnChanges with previous/current values
✅ Clicking Enroll logs course ID and shows selected ID below list
