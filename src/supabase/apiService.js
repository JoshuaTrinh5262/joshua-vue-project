import * as agencyApi from './api/agencyApi';
import * as albumApi from './api/albumApi';
import * as discographyApi from './api/discographyApi';
import * as talentApi from './api/talentApi';
import * as datasetApi from './api/datasetApi';

export const apiService = { 
    ...agencyApi,
    ...albumApi,
    ...discographyApi,
    ...talentApi,
    ...datasetApi
};