import { connect } from "mongoose";

const db_conn = async () => {
  try {
    await connect(process.env.MONGO_URL || "");
  } catch (error) {
    console.error("Error conectando:", error);
    }
};

export default db_conn;

