# Ghostly
Private & Secure Stats 
# Config
Rename config.ex.js to config.js

Change the port to whatever, or leave it.

Add sites to the whitelist
# Run
```sh
npm i
node .
```

Easy enough, right?
# Usage
You can do anything to load the url on the page
I'd use an image tag
```html
<img src="https://pixel.frcat.xyz" />
```
or some js
```js
fetch("https://pixel.frcat.xyz")
```
# CORS error?
Chances are you'll see a CORS error.

Everything will still work, and it's safe to ignore it.
# Lock admin page?
Auth is up to you.
I'd use cloudflare zero trust.
