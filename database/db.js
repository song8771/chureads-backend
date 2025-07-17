import { MongoClient } from 'mongodb';

let db = null;

export const connectDB = async () => {
    try {
        if (db)  return db; // 이미 연결되어 있다면 기존 db 반환
        
        const MONGODB_URI = process.env.MONGODB_URI;
        const client = new MongoClient(MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        await client.connect();
        db = client.db(process.env.DB_NAME);
        console.log("⭕ MongoDB에 연결 성공.");
        return db
    } catch (error) {
        console.error("❌ MongoDB 연결 실패:", error);
        process.exit(1);
    }
}
