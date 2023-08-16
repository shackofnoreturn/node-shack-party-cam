# Developer Notes

## Creating the project
``` bash
npm init
```

## Restart node on change
I'm tired of restarting node every time I make a change.
So I installed "nodemon". This will restart node when it detects a change on a set of watched extensions.

```bash
sudo npm install nodemon --global
nodemon server.js
```