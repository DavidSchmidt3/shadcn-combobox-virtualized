# Shadcn Combobox Virtualized

This is an example of a shadcn combobox using virtualized list(react-window) and flexseach utilizing high performance fuzzy search.
The main performance bottleneck is initializing the index(100 000 entries takes around 300 ms on M1 max), searching is super fast, the list itself is never slow, since it's virtualized.

Feel free to fork, modify and use this component in your own projects 😊