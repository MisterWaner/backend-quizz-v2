import { Router } from 'express';
import { getEuropeanCapitals } from '../controllers/GeographyController';

const geographyRouter: Router = Router();

geographyRouter.get('/european-capitals', getEuropeanCapitals);

export { geographyRouter };