import { MongoClient } from 'mongodb';

let db = null;

const MONGODB_URI_LOCAL='mongodb://localhost:27017'
const MONGODB_URI_ATLAS='mongodb+srv://song8771:1K6LOf5AW1bXCo4R@song-cluster.1tgghrr.mongodb.net/?retryWrites=true&w=majority&appName=song-cluster'

export const connectDB = async () => {
    try {
        if (db)  return db; // 이미 연결되어 있다면 기존 db 반환
        console.log("🚀 ~ connectDB ~ process.env.NODE_ENV:", process.env.NODE_ENV)
        const MONGODB_URI = process.env.NODE_ENV === 'development' ? MONGODB_URI_LOCAL : MONGODB_URI_ATLAS;
        const client = new MongoClient(MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        await client.connect();
        db = client.db(process.env.DB_NAME);
        console.log("✅ MongoDB에 연결 성공.");
        return db
    } catch (error) {
        console.error("❌ MongoDB 연결 실패 :", error);
        process.exit(1);
    }
}