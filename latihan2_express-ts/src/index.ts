import express from "express";
import mainRoute from "./routes/index";
import { errorHandler } from "./middlewares/errorHandler";

const app = express();
const port = 3000;

app.use(express.json());
app.use("/", mainRoute);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
