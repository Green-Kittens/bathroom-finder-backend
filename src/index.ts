import express, { Express, Response, Request } from "express";
import dotenv from "dotenv";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.get("/", (_, res: Response) => {
  res.send("Hello World!");
});

function echo(req: Request, res: Response) {
  res.send(req.originalUrl);
}

app.get("/bathrooms", echo);
app.get("/bathrooms/:bathroomId", echo);
app.post("/bathrooms", echo);
app.get("/bathrooms/:bathroomId/reviews", echo);
app.post("/bathroom/:bathroomId/reviews", echo);
app.get("/bathrooms/:bathroomId/tags", echo);
app.post("/bathroom/:bathroomId/tags", echo);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
