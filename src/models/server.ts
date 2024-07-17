import express, { Application, Request, Response, NextFunction } from "express";
import cors from "cors";
//
import { UploadRoutes } from "../routes";

class Server {
  private app: Application;
  private port: string;
  private paths: {
    upload: string;
  };

  constructor() {
    this.app = express();
    this.port = process.env.PORT || "4000";
    this.paths = {
      upload: "/api/upload",
    };

    this.middlewares();

    this.routes();
  }

  middlewares() {
    this.app.use(cors());
    this.app.use((req: Request, res: Response, next: NextFunction) => {
      res.header("Access-Control-Allow-Origin", "*");
      res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
      );
      next();
    });
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(express.json());
    this.app.use(express.static("public"));
  }

  routes() {
    this.app.use(this.paths.upload, UploadRoutes);
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Servidor corriendo en el puerto: ${this.port}`);
    });
  }
}

export default Server;
