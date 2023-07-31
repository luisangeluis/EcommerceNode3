// import passport from "passport";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import { getUserById } from "../controllers/user.controller";

const setPassport = (passport: any) => {
  const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("jwt"),
    secretOrKey: "academlo",
  };

  passport.use(
    new JwtStrategy(opts, async (decoded, done) => {
      try {
        const user = await getUserById(decoded.id);

        if (!user) {
          return done(null, false);
        }

        return done(null, decoded);
      } catch (error: any) {
        return done(error.message);
      }
    })
  );
};

export default setPassport;
