import passport from "passport";
import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt";
import { getUserById } from "../controllers/user.controller";

const jwtKey = process.env.JWT_KEY;
const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: jwtKey, // debe estar en una variable de entorno
};

passport.use(
  new JwtStrategy(opts, async (payload: any, done: any) => {
    try {
      // console.log("payload", payload);
      const user = await getUserById(payload.id);

      if (!user) {
        return done(null, false);
      }

      return done(null, user);
    } catch (error: any) {
      return done(error, false);
    }
  })
);

export default passport;
