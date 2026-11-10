What's new in 0.11.0
- Fixed: tables with long text or JSON values no longer load forever or freeze the app, on MySQL, PostgreSQL and SQLite, local or over SSH. Long values show their first 1000 characters in the grid, and pages load much faster.
- Click to edit: a long value that is cut shows a Click to edit button in the row editor. Click it to load the whole value and edit it. Saving writes the whole value.
- Copy, Copy as and Duplicate use the whole value, not the cut one.
- Duplicate and Add row scroll the grid to the new row.
- Click a cell in the grid and the row editor marks that column and scrolls to it.
- On macOS, the scrollbars in the grid and the row editor always show.
