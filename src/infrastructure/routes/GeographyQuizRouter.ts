import { Router } from 'express';
import { getEuropeanCapitals, getAfricanCapitals, getAmericanCapitals, getOceanicCapitals, getAsianCapitals, getRandomCapitals } from '../controllers/GeographyController';

const geographyRouter: Router = Router();

geographyRouter.get('/european-capitals', getEuropeanCapitals);
geographyRouter.get('/african-capitals', getAfricanCapitals);
geographyRouter.get('/american-capitals', getAmericanCapitals);
geographyRouter.get('/oceanic-capitals', getOceanicCapitals);
geographyRouter.get('/asian-capitals', getAsianCapitals);
geographyRouter.get('/random-capitals', getRandomCapitals);

export { geographyRouter };