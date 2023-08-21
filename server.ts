import { getPlayerById, getPlayers } from "./app/players/controller";
import * as express from "express";
import { Express, Router, Request, Response } from "express";
import * as bodyParser from "body-parser";
import { loginUser, registerUser } from "./app/users/controller";

const app: Express = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const port = 8084;

const router: Router = express.Router();

router.get("/", (req: Request, res: Response) => {
  res.json({ message: "Hi there, welcome to NativeScripting!" });
});

router.post("/register", registerUser);
router.post("/login", loginUser);

router.get("/players", getPlayers);
router.get("/players/:id", getPlayerById);

app.use("/api", router);

app.listen(port);
