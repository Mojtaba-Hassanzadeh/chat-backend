import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import * as Joi from 'joi';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { RootModule } from './root/root.module';
import { ClientIdMiddleWare } from './auth/middleware/client-id.middleware';
import { CacheModule } from '@nestjs/cache-manager';
import * as redisStore from 'cache-manager-redis-store';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({}),
    }),
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      useFactory: () => {
        return {
          fieldResolverEnhancers: ['guards'],
          uploads: false,
          autoSchemaFile: true,
          context: (ctx) => ctx,
          sortSchema: true,
          transformSchema: (schema) => {
            const sc = schema;
            return sc;
          },
          subscriptions: {
            'graphql-ws': true,
          },
          playground: false,
          plugins: [ApolloServerPluginLandingPageLocalDefault()],
          cors: {
            credentials: true,
            // eslint-disable-next-line @typescript-eslint/ban-types
            origin: function (origin: string, callback: Function) {
              const ALLOWED_SITES = process.env.ALLOWED_SITES?.split(
                ',',
              ) as string[];
              if (
                !origin ||
                ALLOWED_SITES.includes('*') ||
                ALLOWED_SITES.indexOf(origin) !== -1
              ) {
                callback(null, true);
              } else {
                callback(new Error('Not allowed by CQRS'));
              }
            },
          },
        };
      },
      inject: [],
    }),
    MongooseModule.forRoot(process.env.MONGO_URI as string),
    CacheModule.registerAsync<any>({
      isGlobal: true,
      useFactory: (config: ConfigService) => {
        const host = config.get('REDIS_HOST');
        const port = config.get('REDIS_PORT');
        const ttl = config.get('TTL_CACHE');

        return {
          store: redisStore,
          host,
          port,
          ttl,
        };
      },
      imports: [ConfigModule],
      inject: [ConfigService],
    }),
    RootModule,
  ],
  controllers: [],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ClientIdMiddleWare).forRoutes({
      path: '/graphql',
      method: RequestMethod.ALL,
    });
  }
}
