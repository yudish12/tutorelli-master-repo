## Scope of Improvement

### 1. Duplication in Previous Session Row Code

- The code for handling previous session rows has duplications. Consider refactoring this code to remove redundancies and make it more maintainable.

### 2. Duplication in Quiz and Flashcards Views for Students and Tutors

- The views for quiz and flashcards have duplicated code across student and tutor interfaces. This could be improved by consolidating shared logic into reusable components or functions, reducing repetition and making future updates easier.

### 3. Supabase Queries for Quiz and Flashcards

- Currently, the Supabase queries for quiz and flashcards return different keys, leading to separate handling in both the quiz and flashcards views for students and tutors. Standardizing the response keys or implementing a unified handling strategy could simplify the codebase and improve consistency across different views.
