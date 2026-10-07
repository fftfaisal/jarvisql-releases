What's new in 0.4.0
- MariaDB: connect to MariaDB servers, with the same SSH and SSL options as MySQL. The status bar shows the server you are connected to, and Test warns when the server doesn't match the connection type.
- Index editing: add, change and drop indexes in the Index tab, like columns in Structure. SQLite and MySQL.
- Structure editor: undo and redo with Ctrl+Z and Ctrl+Y, dropped columns stay visible until you save and can be restored, and the type list now opens for UNSIGNED and ENUM types.
- Top bar: Save, Discard and Review changes now include structure and index changes, and Review lists them next to row edits.
- SSH: connections over SSH show the SSH host in the connection list and the status bar.
- Connection lost: a plain "Server disconnected" message with a Reconnect button, and the Reconnect button shows a spinner while it works.
- Smaller things: a spinner on Test in the connection dialog.
