import { app } from "./app";

const port = 5001;

app.listen(port, () => {
  console.log(`Server on port ${port} \nhttp://localhost:${port}`);
});
