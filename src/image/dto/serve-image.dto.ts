import { Response } from 'express';

export interface ServeImageInputDto {
  id: string;
  width?: number;
  quality?: number;
  response: Response;
}
