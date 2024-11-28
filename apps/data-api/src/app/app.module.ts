import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Logger } from '@nestjs/common';

import { BackendFeaturesMealModule } from '@avans-nx-workshop/backend/features';
import { UsersModule } from '@avans-nx-workshop/backend/user';
import { AuthModule } from '@avans-nx-workshop/backend/auth';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DriverSchema } from './models/driver.model';
import { ConstructorSchema } from './models/constructor.model';
import { JolpicaService } from './services/jolpica.service';
import { SyncService } from './services/sync.service';
import { JolpicaController } from './controllers/jolpica.controller';

@Module({
    imports: [
        BackendFeaturesMealModule,
        AuthModule,
        UsersModule,
        MongooseModule.forRoot(process.env.MONGO_DB_CONNECTION_STRING, {
            connectionFactory: (connection) => {
                connection.on('connected', () => {
                    Logger.verbose(`Mongoose db connected to ${process.env.MONGO_DB_CONNECTION_STRING}`);
                });
                connection._events.connected();
                return connection;
            }
        }),
        MongooseModule.forFeature([
            { name: 'Driver', schema: DriverSchema },
            { name: 'Constructor', schema: ConstructorSchema }
        ])
    ],
    controllers: [AppController, JolpicaController],
    providers: [AppService, JolpicaService, SyncService]
})
export class AppModule {}
