import type { Request } from 'express';

export interface AuthenticatedRequestModel extends Request {
  user: {
    id: string;
    email: string;
    name: string;
    createdAt: string;
  };
}