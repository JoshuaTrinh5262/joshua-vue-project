import * as authUserApi from "./api/authUserApi";
import * as agencyApi from "./api/agencyApi";
import * as albumApi from "./api/albumApi";
import * as discographyApi from "./api/discographyApi";
import * as eventApi from "./api/eventApi";
import * as talentApi from "./api/talentApi";
import * as datasetApi from "./api/datasetApi";
import * as datasetUnprocessApi from "./api/datasetUnprocessApi";
import * as chatgroupApi from "./api/chatgroupApi";
import * as messageApi from "./api/messageApi";
import * as userRoleApi from "./api/userRoleApi";
import * as taskApi from "./api/taskApi";
import * as yugiohBanlistApi from "./api/yugiohBanlistApi";
import * as yugiohCardApi from "./api/yugiohCardApi";
import * as yugiohDecklistApi from "./api/yugiohDecklistApi";
import * as yugiohDuelistApi from "./api/yugiohDuelistApi";
import * as yugiohProductApi from "./api/yugiohProductApi";
import * as yugiohTournamentApi from "./api/yugiohTournamentApi";

export const apiService = {
    ...authUserApi,
    ...agencyApi,
    ...albumApi,
    ...discographyApi,
    ...eventApi,
    ...talentApi,
    ...datasetApi,
    ...datasetUnprocessApi,
    ...chatgroupApi,
    ...messageApi,
    ...userRoleApi,
    ...taskApi,
    ...yugiohBanlistApi,
    ...yugiohCardApi,
    ...yugiohDecklistApi,
    ...yugiohDuelistApi,
    ...yugiohProductApi,
    ...yugiohTournamentApi,
};
