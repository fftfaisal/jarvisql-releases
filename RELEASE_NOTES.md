What's new in 0.10.0
- Redis: connect to a Redis server, with a password, TLS, or through an SSH tunnel. Each database (db0, db1 and so on) shows as a table and its keys as rows.
- Edit Redis keys in the row editor: change a value or its time to live, add, rename and delete keys. Hashes, lists, sets and sorted sets are edited as JSON. Clear the time to live to make a key never expire.
- Redis links: open redis:// and rediss:// links, and import them from a URL.
- Big Redis values no longer freeze the app. Large values are cut in the grid, and a cut value can't be saved by mistake.
- A better grid: columns fit their contents, a tinted header, striped rows, and no empty column when a table has few columns. Column widths you set are remembered for each table.
- The tab bar scrolls to the tab you open, so you always see which one is active.
- On Linux, JarvisQL now uses the Ubuntu font by default. It is also in the font list in Settings.
