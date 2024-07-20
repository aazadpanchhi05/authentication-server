import mongoose from "mongoose";

export const connectDB = () => {
  mongoose
    .connect(process.env.MONGO_URL || "")
    .then(() => console.log("Database connected successfully.."))
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });
};
