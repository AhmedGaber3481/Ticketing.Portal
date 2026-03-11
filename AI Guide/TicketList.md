🎟️ Ticket List – Table View (Bootstrap 5 Style)

Create a responsive Ticket List interface using Bootstrap 5 design principles.

Layout

Use Auto Layout (Vertical) for the main container

Spacing: 16–24px between sections

Max width container centered

Fully responsive layout (desktop, tablet, mobile)

Main Components
1. Header Section

Include:

Page Title: “Tickets”

Right aligned button: “Create Ticket”

Optional search input

Layout:

Horizontal Auto Layout

Space between title and actions

2. Ticket Table (List View)

Create a Bootstrap-style responsive table.

Columns

Ticket ID

Title

Created At

Status

Priority

Category

Type

Actions

Table Styling

Use striped rows

Row height ~56px

Header background: light gray

Border radius: 8px container

Padding inside cells: 12–16px

3. Status & Priority UI

Use colored badges:

Status

Open → Green badge

Pending → Orange badge

Closed → Gray badge

Priority

High → Red badge

Medium → Yellow badge

Low → Blue badge

4. Actions Column

Right aligned icons:

✏️ Edit

🗑️ Delete

Design:

Icon buttons

32x32 clickable area

Hover background highlight

5. Pagination

Place pagination below the table aligned right.

Requirements

Show max 5 page numbers

Include:

Previous | 1 | 2 | 3 | 4 | 5 | Next

Behavior:

Active page highlighted

Disabled state for Previous/Next when unavailable

Style:

Bootstrap pagination style

Button height: ~36px

Rounded corners

6. Responsive Behavior
Desktop

Full table visible.

Tablet

Reduce column widths.

Mobile

Hide less important columns:

Hidden columns:

Category

Type

Show:

Ticket ID

Title

Status

Priority

Actions

7. Figma Structure

Use Auto Layout for all components.

Suggested hierarchy:

Ticket List Frame
   Header
      Title
      Actions
   Table Container
      Table Header
      Table Rows
   Pagination

Spacing:

Section spacing: 24px

Table row spacing: 16px

Container padding: 24px

✅ Design tokens

Border radius: 8px

Icon size: 16px

Font: Inter / Bootstrap default

Table text: 14–16px