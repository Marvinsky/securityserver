import { getPlayerById, getPlayers } from "./app/players/controller";
import * as express from "express";
import { Express, Router, Request, Response } from "express";

const app: Express = express();

const port = 8084;

const router: Router = express.Router();

router.get("/", (req: Request, res: Response) => {
  res.json({ message: "Hi there, welcome to NativeScripting!" });
});

router.get("/players", getPlayers);
router.get("/players/:id", getPlayerById);

app.use("/api", router);

app.listen(port);
