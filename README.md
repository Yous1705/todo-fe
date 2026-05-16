# Frontend Documentation

## 1. Frontend Overview & Implemented Features

This project is a **Todo List & Category Management Dashboard** built with the following technologies:

- **Next.js**: A React framework for server-side rendering and static site generation.
- **TypeScript**: A statically typed superset of JavaScript.
- **Tailwind CSS**: A utility-first CSS framework for styling.
- **Ant Design v5**: A modern UI library for React.

### Implemented Features

- **Grid/List Responsive Toggle Layout**: Users can switch between grid and list views for todos.
- **Custom Multi-Parameter Filter Toolbar**: Filter todos by title, status, priority, and category.
- **Dynamic Category Management Panel**: Includes collapsible visibility toggles and internal scrollbars.
- **Drawer-Driven Forms**: Create and update todos and categories using Ant Design drawers.
- **Client-Side Pagination Handling**: Efficient pagination for todos and categories.

---

## 2. Frontend Step-by-Step Setup & Local Run Instructions

### Setup Guide

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/Yous1705/todo-fe.git
   cd todo-fe
   ```

2. **Install Dependencies**:

   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Create a `.env.local` file in the root directory with the following content:

   ```env
   NEXT_PUBLIC_API_URL=http://localhost:3001/api/
   ```

4. **Run the Development Server**:

   ```bash
   npm run dev
   ```

5. **Build for Production**:
   ```bash
   npm run build
   ```

---

## 3. Technical Decision Questions: Responsive Design

### Tailwind CSS Breakpoints

- Tailwind's `sm:`, `md:`, and `lg:` utility classes are used to adapt layouts for different screen sizes.

### Ant Design Grid System

- The `Row` and `Col` components handle complex transformations from mobile to desktop views.
- Responsive properties like `xs`, `md`, and `lg` ensure seamless scaling.

### Ant Design Components

- **Card**: Styled for responsiveness.
- **Space**: Wraps inputs for dynamic alignment.
- **Drawer**: Adjusts width based on viewport size.

---

## 4. Technical Decision Questions: React Component Structure & State Management

### Component Hierarchy

```plaintext
layout
├── DashboardHeader
├── FilterToolbar
├── CategoryManager
├── TodoGridView
└── TodoListView
```

### State Management

- **Centralized State**: Managed in `todo.context.tsx` and `category.context.tsx`.
- **Custom Hooks**: `useTodo` and `useCategory` isolate business logic and API communication.
- **Prop Drilling Avoidance**: Context API ensures clean data sharing.

---

## 5. Technical Decision Questions: Data Validation & Error Handling

### Data Validation

- **Ant Design Form Rules**: Ensures client-side validation before API calls.

### Error Handling

- **API Failures**: Errors are displayed using Ant Design's `App.useApp()` notifications.
- **Fallback Screens**: Loading and error states are handled gracefully.

---

## 6. Future Improvements & Refactoring (Technical Debt)

- **State Optimization**: Move filtering parameters to URL query strings for shareable routes.
- **Micro-Interactions**: Add animations for smoother user experience.

---

## License

Yous Sibarani: [youssibarani17@gmail.com](mailto:youssibarani17@gmail.com)
