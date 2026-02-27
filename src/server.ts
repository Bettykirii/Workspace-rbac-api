import app from "./app";
import { env } from "./config/env";
import { sequelize } from "./config/db";

async function start() {
  try {
    await sequelize.authenticate();
    console.log("✅ Database connected");

    app.listen(env.PORT, () => {
      console.log(`✅ API running on http://localhost:${env.PORT}`);
    });
  } catch (err) {
    console.error("❌ Failed to start server:", err);
    process.exit(1);
  }
}

start();