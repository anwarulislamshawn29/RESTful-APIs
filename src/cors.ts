import { ForbiddenException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

const whitelist = {
  development: ['*', 'http://localhost:3000'],
  staging: ['*', 'http://localhost:3000', 'http://127.0.0.1:3000'],
  production: ['*'],
};

const env = new ConfigService().get('ENV');

export const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist[env].indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(
        new ForbiddenException(
          `Origin ${origin} is not allowed by CORS policy`,
        ),
      );
    }
  },
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  preflightContinue: false,
  optionsSuccessStatus: 204,
  credentials: true,
};
