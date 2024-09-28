import * as authUserApi from "./api/authUserApi";
import * as agencyApi from "./api/agencyApi";
import * as albumApi from "./api/albumApi";
import * as discographyApi from "./api/discographyApi";
import * as eventApi from "./api/eventApi";
import * as talentApi from "./api/talentApi";
import * as datasetApi from "./api/datasetApi";
import * as chatgroupApi from "./api/chatgroupApi";
import * as messageApi from "./api/messageApi";

export const apiService = {
    ...authUserApi,
    ...agencyApi,
    ...albumApi,
    ...discographyApi,
    ...eventApi,
    ...talentApi,
    ...datasetApi,
    ...chatgroupApi,
    ...messageApi,
};
