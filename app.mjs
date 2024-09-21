import cors from "cors";
import express from "express";
import routes from "./routes/index.mjs";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import morgan from "morgan";
import passport from "passport";
import jsonErrorMiddleware from "./middleware/jsonError.mjs";
import passportStrategy from "./lib/passportStrategy.mjs";
const app = express();
const port = 3000;

const options = {
  definition: {
    openapi: "3.1.0",
    info: {
      title: "Express API with Swagger",
      version: "0.1.0",
      description: "CRUD DB API",
      license: {
        name: "MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },
      contact: {
        name: "Adha Nur Qahar",
        url: "https://github.com",
        email: "adha.nur.qahar@gmail.com",
      },
    },
    components: {
      securitySchemes: {
        Authorization: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
          value: "Bearer <JWT token here>",
        },
      },
    },
    servers: [
      {
        url: "https://backend-app-chi.vercel.app",
      },
      {
        url: `http://localhost:${port}`,
      },
    ],
  },
  apis: ["./routes/*.mjs"],
};
const specs = swaggerJsdoc(options);
const CSS_URL =
  "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.1.0/swagger-ui.min.css";

app.use(cors());
app.use(express.json());
app.use(morgan("combined"));
passport.use(passportStrategy);
app.use(passport.initialize());

app.use("/api", routes);
app.use(
  "/",
  swaggerUi.serve,
  swaggerUi.setup(specs, { explorer: true, customCssUrl: CSS_URL })
);
app.use(jsonErrorMiddleware);

app.listen(port, () => {
  console.log(`API run at http://localhost:${port}`);
});
