import { app } from "./app";

const port = 5000;

app.listen(port, () => {
  console.log(`Server on port ${port} \nhttp://localhost:${port}`);
});
