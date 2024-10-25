import { App } from "./app/app";

let port: number;

if (process.env.PORT) {
  port = parseInt(process.env.PORT);
} else {
  throw new Error("Port not set in env");
}

const app = new App(port);

app.listen();
