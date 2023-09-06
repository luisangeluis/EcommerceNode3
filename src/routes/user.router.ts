import { Router } from "express";
import passport from "../middleware/passport.middleware";
import * as userServices from "../services/user.http";

const router = Router();

router.route("/my-user").get(passport.authenticate("jwt", { session: false }),userServices.getMyUser)
    .put(passport.authenticate("jwt", { session: false }),userServices.updateMyUser);

export default router;
