import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI as string, {
            dbName: 'test',
        });
        console.log('MongoDB 연결 성공 ✅');
    } catch (err) {
        console.error('MongoDB 연결 실패 ❌', err);
    }
};

export default connectDB;
