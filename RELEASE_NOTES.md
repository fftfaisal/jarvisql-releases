What's new in 0.7.0
- PostgreSQL: connect directly or through an SSH tunnel, with SSL from Disable to Verify full. Browse, filter and edit rows, run SQL, view DDL, indexes, triggers and foreign keys, change table structure, create or drop databases, and import or export CSV, JSON and SQL, including pg_dump files.
- Schemas: pick the PostgreSQL schema to show from the top bar, and create, rename or drop schemas there. Tables from different schemas open in their own tabs, so two tables with the same name never mix.
- Roles: manage PostgreSQL roles in the Users dialog. Set log in, superuser, creating databases and creating roles, whether the role can connect to the database, and None, Read, Read and write or Full access for each schema. Review the SQL before it runs.
- Create table: set up the columns, types, defaults, primary key and auto-number when you create a table, with the SQL shown as you go. Works for SQLite, MySQL, MariaDB and PostgreSQL.
- Filters: apply a single filter row with its own Apply button, or every ticked row with Apply all. Unset shows all rows again and keeps your filters, and the SQL button shows the query behind the rows on screen. New in and not in filters take a list of values separated by commas. Filter queries are now plain SQL for each database.
- Shortcuts: Ctrl+K opens the database list and Ctrl+F opens the row filters.
- PostgreSQL URLs: copy, import and open postgres:// and postgresql:// links, including +ssh ones.
- Smaller things: a server connection without a database now asks you to pick one before showing tables or New table. The connection name in the SQL editor is easier to read in the light theme. The selected cell no longer stays on the same spot when you change page or filters.
