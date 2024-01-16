import express from "express";
import {
  deleteRoom,
  getRoom,
  getMyRoom,
  newRoom,
  updateRoom,
  editVac,
} from "../controllers/room.js"
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/new", newRoom);

router.get("/roomAll", getRoom);

// router.put("/edit/:id", updateRoom);

router
  .route("/edit/:id")
  .put(updateRoom);

  router
  .route("/vac/:id")
  .put(editVac);

router.get("/my", getMyRoom);

router.get("/");


router
  .route("/del/:id")
  .delete(deleteRoom);

export default router;
