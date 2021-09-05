import bodyParser from "body-parser";
import express from "express";
import { Request, Response } from "express";
import { BatchUpdateService } from "./modules/batch-update/batch-update.service";
import { HttpClientService } from "./modules/http/http-client.service";
import rateLimit from "express-rate-limit";

const app = express();
const port = 3000;

const httpClient = new HttpClientService();
const service = new BatchUpdateService(httpClient);

app.use(bodyParser.json());
const limiter = rateLimit({
  windowMs: 10 * 1000, // 10 seconds
  max: 5, // max 5 requests
});

app.use(limiter);

app.get("/", (_: Request, res: Response) => {
  res.send("Hello World!");
});

app.post("/batch", (req: Request, res: Response) => {
  service.batchUpdate(req.body).then((result) => res.json(result));
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
