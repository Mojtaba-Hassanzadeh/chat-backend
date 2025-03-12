// src/config/database.config.ts
import { MongooseModule } from '@nestjs/mongoose';

export const DatabaseConfig = MongooseModule.forRoot(process.env.MONGO_URI);
