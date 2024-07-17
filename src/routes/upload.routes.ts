import { Request, Response, Router } from "express";
import multer from "multer";
import path from "path";
import { validateApiKeyMiddlewares } from "../middlewares";

const router = Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../../../public/uploads/"));
  },
  filename: (req, file, cb) => {
    const { name } = req.params;
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, `/${name}/${file.fieldname}-${uniqueSuffix}${ext}`);
  },
});

const upload = multer({ storage });

router.post(
  "/:name",
  [validateApiKeyMiddlewares, upload.single("file")],
  (req: Request, res: Response) => {
    res.status(200).json({
      message: "El archivo ha subido correctamente",
      data: {
        url: req.file?.filename,
      },
    });
  }
);

export default router;
