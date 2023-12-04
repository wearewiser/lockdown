# @wiser/lockdown

Generated with `npm init nodets@0.0.0`.

This project is used to add a HTTP authentication lock screen to a React application.

The purpose of this repository is to control access to DEV and UAT websites that are under development. The scope is simple brand management. This is not real security!

> ⚠️ This project is not application security! It should only be used for simple brand protection, but not to secure important information!

## Usage
This project can be installed into your application and added to your `server.js` file.

### Installation
Run the following installation command to install [@wiser/lockdown](https://npmjs.com/package/@wiser/lockdown) into your local React project.

```bash
npm install --save @wiser/lockdown
```

### Adding to Code
Here's an example of adding [@wiser/lockdown](https://npmjs.com/package/@wiser/lockdown)'s accessCheckOk function to a [NextJS custom server](https://nextjs.org/docs/pages/building-your-application/configuring/custom-server).

```js
const { createServer } = require("http");
const { parse } = require("url");
const next = require("next");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

const routes = [ ];

app.prepare().then(() => {
  createServer(async (req, res) => {

    const parsedUrl = parse(req.url, true);
    const { pathname, query } = parsedUrl;

    for (let route of routes) {
      if (!!pathname.match(route.path)) {
        await route.ctrl(req, res);
        return;
      }
    }

    // This is where we add lockdown's accessCheckOk function
    if (!accessCheckOk(req, res)) {
      return;
    }

    handle(req, res, parsedUrl);

  }).listen(3000, (err) => {
    if (err) throw err;
    console.log("> Ready on http://localhost:3000");
  });
});
```

### Configuration

Access management is done through environment variables. Setting LOCKDOWN_ACL with a list of `user:pass` strings, delimited by a comma. This will grant access to the username `user` providing the password `pass`, also providing access to any other username and password combinations provided in the list.

```bash
LOCKDOWN_ON=true
LOCKDOWN_ACL="hello:world,user:pass,abc:xyz"
```
> This is not a substitute for IAM or application layer user management! You will be hacked if you use this!

### User Experience
The user will now be presented with a basic authentication login form when visiting your application. If they fail to authenticate, they will be presented a fresh form with a 1,500ms delay.

Once they're logged in, they will be allowd to access the requested page

![Login Form](https://i.stack.imgur.com/QnUZW.png)

## Scripts

### npm run build
Builds the project and outputs it to the `./lib/` directory. Bundled with webpack and outputs a single executable.

### npm run lint
Runs the linter.

### npm run test
Runs the unit tests.

### npm run test:watch
Runs the unit tests with watchers on the directory. Reruns when file changes are detected.

### npm run coverage
Generates a coverage report.

### npm run clean
Cleans the project directory of all compilation artifacts.

### npm run docs
Generates the TSDocs for the current project.
