What's new in 0.8.0
- LibSQL and Turso: connect to a Turso database or your own LibSQL server with its URL and auth token, or open a local LibSQL file. Browse, filter and edit rows, run SQL, change table structure, and import or export data, the same as with SQLite. The auth token is kept in your system keychain.
- LibSQL links: copy, import and open libsql:// links, including ones with an authToken.
- Select several tables: Ctrl+click tables in the list, Shift+click to select a range, or press Ctrl+A to select them all. Right-click to drop, truncate or export them together, or copy their names.
- Copy SQL: the drop and truncate dialogs can copy the exact SQL that will run.
- Export several tables: SQL goes into one file, and CSV or JSON into a file per table in a folder you choose.
- Imports are faster on remote databases, because rows are sent in batches. If a row fails, the error now names the range of rows it was in.
