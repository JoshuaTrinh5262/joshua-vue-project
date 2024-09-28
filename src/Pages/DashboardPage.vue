<template>
    <div>
        <page-title-component :heading=heading :subheading=subheading :icon=icon></page-title-component>
        <div class="mb-3 card">
            <div class="card-header-tab card-header">
                <div class="card-header-title font-size-lg text-capitalize font-weight-normal">
                    <i class="header-icon lnr-charts icon-gradient bg-happy-green"> </i>
                    Data Statistics
                </div>
            </div>
            <div class="no-gutters row">
                <div class="col-sm-6 col-md-4 col-xl-4">
                    <div class="card no-shadow rm-border bg-transparent widget-chart text-left">
                        <div class="icon-wrapper rounded-circle">
                            <div class="icon-wrapper-bg opacity-10 bg-warning"></div>
                            <i class="pe-7s-scissors text-white opacity-8"></i>
                        </div>
                        <div class="widget-chart-content">
                            <div class="widget-subheading">Cash Deposits</div>
                            <div class="widget-numbers">1,7M</div>
                            <div class="widget-description opacity-8 text-focus">
                                <div class="d-inline text-danger pr-1">
                                    <font-awesome-icon icon="angle-down" />
                                    <span class="pl-1">54.1%</span>
                                </div>
                                less earnings
                            </div>
                        </div>
                    </div>
                    <div class="divider m-0 d-md-none d-sm-block"></div>
                </div>
                <div class="col-sm-6 col-md-4 col-xl-4">
                    <div class="card no-shadow rm-border bg-transparent widget-chart text-left">
                        <div class="icon-wrapper rounded-circle">
                            <div class="icon-wrapper-bg opacity-9 bg-danger"></div>
                            <i class="pe-7s-radio text-white"></i>
                        </div>
                        <div class="widget-chart-content">
                            <div class="widget-subheading">Invested Dividents</div>
                            <div class="widget-numbers"><span>9M</span></div>
                            <div class="widget-description opacity-8 text-focus">
                                Grow Rate:
                                <span class="text-info pl-1">
                                    <font-awesome-icon icon="angle-down" />
                                    <span class="pl-1">14.1%</span>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div class="divider m-0 d-md-none d-sm-block"></div>
                </div>
                <div class="col-sm-12 col-md-4 col-xl-4">
                    <div class="card no-shadow rm-border bg-transparent widget-chart text-left">
                        <div class="icon-wrapper rounded-circle">
                            <div class="icon-wrapper-bg opacity-9 bg-success"></div>
                            <i class="pe-7s-musiclist text-white"></i>
                        </div>
                        <div class="widget-chart-content">
                            <div class="widget-subheading">Capital Gains</div>
                            <div class="widget-numbers text-success"><span>$563</span></div>
                            <div class="widget-description text-focus">
                                Increased by
                                <span class="text-warning pl-1">
                                    <font-awesome-icon icon="angle-up" />
                                    <span class="pl-1">7.35%</span>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="text-center d-block p-3 card-footer">
                <button class="btn-pill btn-shadow btn-wide fsize-1 btn btn-primary btn-lg">
                    <span class="mr-2 opacity-7">
                        <i class="icon icon-anim-pulse ion-ios-analytics-outline"></i>
                    </span>
                    <span class="mr-1">View Complete Report</span>
                </button>
            </div>
        </div>
        <div class="divider"></div>
        <div class="row">
            <div class="col-sm-12 col-lg-6">
                <div class="mb-3 card">
                    <div class="card-header-tab card-header">
                        <div class="card-header-title font-size-lg text-capitalize font-weight-normal">
                            <i class="header-icon lnr-cloud-download icon-gradient bg-happy-itmeo"> </i>
                            Technical Support
                        </div>
                    </div>
                    <div class="p-0 card-body">
                        <div class="p-1 slick-slider-sm mx-auto">
                            <div class="widget-chart widget-chart2 text-left p-0">
                                <div class="widget-chat-wrapper-outer">
                                    <div class="widget-chart-content widget-chart-content-lg pb-0">
                                        <div class="widget-chart-flex">
                                            <div class="widget-title opacity-5 text-muted text-uppercase">Helpdesk
                                                Tickets
                                            </div>
                                        </div>
                                        <div class="widget-numbers">
                                            <div class="widget-chart-flex">
                                                <div>
                                                    <span class="text-warning">34</span>
                                                </div>
                                                <div
                                                    class="widget-title ml-2 font-size-lg font-weight-normal text-dark">
                                                    <span class="opacity-5 text-muted pl-2 pr-1">5%</span>
                                                    increase
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="p-0 card-body">
                        <div class="p-1 slick-slider-sm mx-auto">
                            <div class="widget-chart widget-chart2 text-left p-0">
                                <div class="widget-chat-wrapper-outer">
                                    <div class="widget-chart-content widget-chart-content-lg pb-0">
                                        <div class="widget-chart-flex">
                                            <div class="widget-title opacity-5 text-muted text-uppercase">Helpdesk
                                                Tickets
                                            </div>
                                        </div>
                                        <div class="widget-numbers">
                                            <div class="widget-chart-flex">
                                                <div>
                                                    <span class="text-danger">30</span>
                                                </div>
                                                <div
                                                    class="widget-title ml-2 font-size-lg font-weight-normal text-dark">
                                                    <span class="opacity-5 text-muted pl-2 pr-1">10%</span>
                                                    decrease
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <h6 class="text-muted text-uppercase font-size-md opacity-5 pl-3 pr-3 pb-1 font-weight-normal">
                            Sales Progress</h6>
                        <ul class="list-group list-group-flush">
                            <li class="p-3 bg-transparent list-group-item">
                                <div class="widget-content p-0">
                                    <div class="widget-content-outer">
                                        <div class="widget-content-wrapper">
                                            <div class="widget-content-left">
                                                <div class="widget-heading">Total Orders</div>
                                                <div class="widget-subheading">Last year expenses</div>
                                            </div>
                                            <div class="widget-content-right">
                                                <div class="widget-numbers text-success">
                                                    <small>$</small>
                                                    1896
                                                </div>
                                            </div>
                                        </div>
                                        <div class="widget-progress-wrapper">
                                            <div class="progress-bar-sm progress-bar-animated-alt progress">
                                                <div class="progress-bar bg-primary" role="progressbar"
                                                    aria-valuenow="43" aria-valuemin="0" aria-valuemax="100"
                                                    style="width: 43%;"></div>
                                            </div>
                                            <div class="progress-sub-label">
                                                <div class="sub-label-left">YoY Growth</div>
                                                <div class="sub-label-right">100%</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="col-sm-12 col-lg-6">
                <div class="card-hover-shadow-2x mb-3 card">
                    <div class="card-header-tab card-header">
                        <div class="card-header-title font-size-lg text-capitalize font-weight-normal">
                            <i class="header-icon lnr-lighter icon-gradient bg-amy-crisp"> </i>
                            Timeline Example
                        </div>
                    </div>
                    <div class="p-4">
                        <div
                            class="vertical-time-simple vertical-without-time vertical-timeline vertical-timeline--animate vertical-timeline--one-column">
                            <div class="dot-danger vertical-timeline-element">
                                <div>
                                    <span class="vertical-timeline-element-icon bounce-in"></span>
                                    <div class="vertical-timeline-element-content bounce-in">
                                        <h4 class="timeline-title">All Hands Meeting</h4>
                                    </div>
                                </div>
                            </div>
                            <div class="dot-warning vertical-timeline-element">
                                <div>
                                    <span class="vertical-timeline-element-icon bounce-in"></span>
                                    <div class="vertical-timeline-element-content bounce-in">
                                        <p>Yet another one, at <span class="text-success">15:00 PM</span></p>
                                    </div>
                                </div>
                            </div>
                            <div class="dot-success vertical-timeline-element">
                                <div>
                                    <span class="vertical-timeline-element-icon bounce-in"></span>
                                    <div class="vertical-timeline-element-content bounce-in">
                                        <h4 class="timeline-title">Build the production release
                                            <div class="badge badge-danger ml-2">NEW</div>
                                        </h4>
                                    </div>
                                </div>
                            </div>
                            <div class="dot-primary vertical-timeline-element">
                                <div>
                                    <span class="vertical-timeline-element-icon bounce-in"></span>
                                    <div class="vertical-timeline-element-content bounce-in">
                                        <h4 class="timeline-title">
                                            Something not important
                                        </h4>
                                    </div>
                                </div>
                            </div>
                            <div class="dot-warning vertical-timeline-element">
                                <div>
                                    <span class="vertical-timeline-element-icon bounce-in"></span>
                                    <div class="vertical-timeline-element-content bounce-in">
                                        <p>Yet another one, at <span class="text-success">15:00 PM</span></p>
                                    </div>
                                </div>
                            </div>
                            <div class="dot-success vertical-timeline-element">
                                <div>
                                    <span class="vertical-timeline-element-icon bounce-in"></span>
                                    <div class="vertical-timeline-element-content bounce-in">
                                        <h4 class="timeline-title">Build the production release
                                            <div class="badge badge-danger ml-2">NEW</div>
                                        </h4>
                                    </div>
                                </div>
                            </div>
                            <div class="dot-info vertical-timeline-element">
                                <div>
                                    <span class="vertical-timeline-element-icon bounce-in"></span>
                                    <div class="vertical-timeline-element-content bounce-in">
                                        <h4 class="timeline-title">This dot has an info state</h4>
                                    </div>
                                </div>
                            </div>
                            <div class="dot-dark vertical-timeline-element">
                                <div>
                                    <span class="vertical-timeline-element-icon bounce-in"></span>
                                    <div class="vertical-timeline-element-content bounce-in">
                                        <h4 class="timeline-title">This dot has a dark state</h4>
                                    </div>
                                </div>
                            </div>
                            <div class="dot-danger vertical-timeline-element">
                                <div>
                                    <span class="vertical-timeline-element-icon bounce-in"></span>
                                    <div class="vertical-timeline-element-content bounce-in">
                                        <h4 class="timeline-title">All Hands Meeting</h4>
                                    </div>
                                </div>
                            </div>
                            <div class="dot-warning vertical-timeline-element">
                                <div>
                                    <span class="vertical-timeline-element-icon bounce-in"></span>
                                    <div class="vertical-timeline-element-content bounce-in">
                                        <p>Yet another one, at <span class="text-success">15:00 PM</span></p>
                                    </div>
                                </div>
                            </div>
                            <div class="dot-success vertical-timeline-element">
                                <div>
                                    <span class="vertical-timeline-element-icon bounce-in"></span>
                                    <div class="vertical-timeline-element-content bounce-in">
                                        <h4 class="timeline-title">Build the production release
                                            <div class="badge badge-danger ml-2">NEW</div>
                                        </h4>
                                    </div>
                                </div>
                            </div>
                            <div class="dot-primary vertical-timeline-element">
                                <div>
                                    <span class="vertical-timeline-element-icon bounce-in"></span>
                                    <div class="vertical-timeline-element-content bounce-in">
                                        <h4 class="timeline-title">
                                            Something not important
                                        </h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="d-block text-center card-footer">
                        <button class="btn-shadow btn-wide btn-pill btn btn-focus">
                            View All Messages
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <div class="divider"></div>
        <div class="row">
            <div class="col-md-6 col-xl-3" v-for="(item, index) in datasetRecords" :key="index">
                <div
                    class="card mb-3 widget-chart widget-chart2 bg-premium-dark text-white text-left card-btm-border card-shadow-primary border-primary">
                    <div class="widget-chat-wrapper-outer">
                        <div class="widget-chart-content pt-3 pl-3 pb-1">
                            <div class="widget-chart-flex">
                                <div class="widget-numbers">
                                    <div class="widget-chart-flex">
                                        <div class="fsize-4">
                                            <span><i class="pe-7s-drawer"></i> {{ item.count }}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <h6 class="widget-subheading mb-0 opacity-5">{{ item.label }}</h6>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="divider"></div>
        <div class="row">
            <div class="col-md-6 col-xl-3" v-for="(item, index) in vtuberRecords" :key="index">
                <div
                    class="card mb-3 widget-chart widget-chart2 bg-premium-dark text-white text-left card-btm-border card-shadow-primary border-primary">
                    <div class="widget-chat-wrapper-outer">
                        <div class="widget-chart-content pt-3 pl-3 pb-1">
                            <div class="widget-chart-flex">
                                <div class="widget-numbers">
                                    <div class="widget-chart-flex">
                                        <div class="fsize-4">
                                            <span><i class="pe-7s-drawer"></i> {{ item.count }}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <h6 class="widget-subheading mb-0 opacity-5">{{ item.label }}</h6>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="divider"></div>
        <div class="card mb-3 bg-premium-dark">
            <div class="no-gutters row">
                <div class="col-md-12 col-lg-4">
                    <ul class="list-group list-group-flush">
                        <li class="bg-transparent list-group-item">
                            <div class="widget-content p-0">
                                <div class="widget-content-outer">
                                    <div class="widget-content-wrapper">
                                        <div class="widget-content-left text-white">
                                            <div class="widget-heading ">Total Orders</div>
                                            <div class="widget-subheading">Last year expenses</div>
                                        </div>
                                        <div class="widget-content-right">
                                            <div class="widget-numbers text-success">1896</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li class="bg-transparent list-group-item">
                            <div class="widget-content p-0">
                                <div class="widget-content-outer">
                                    <div class="widget-content-wrapper">
                                        <div class="widget-content-left text-white">
                                            <div class="widget-heading">Clients</div>
                                            <div class="widget-subheading">Total Clients Profit</div>
                                        </div>
                                        <div class="widget-content-right">
                                            <div class="widget-numbers text-primary">$12.6k</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="col-md-12 col-lg-4">
                    <ul class="list-group list-group-flush">
                        <li class="bg-transparent list-group-item">
                            <div class="widget-content p-0">
                                <div class="widget-content-outer">
                                    <div class="widget-content-wrapper">
                                        <div class="widget-content-left text-white">
                                            <div class="widget-heading">Followers</div>
                                            <div class="widget-subheading">People Interested</div>
                                        </div>
                                        <div class="widget-content-right">
                                            <div class="widget-numbers text-danger">45,9%</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li class="bg-transparent list-group-item">
                            <div class="widget-content p-0">
                                <div class="widget-content-outer">
                                    <div class="widget-content-wrapper">
                                        <div class="widget-content-left text-white">
                                            <div class="widget-heading">
                                            </div>
                                            <div class="widget-subheading">Total revenue streams</div>
                                        </div>
                                        <div class="widget-content-right">
                                            <div class="widget-numbers text-warning">$3M</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="col-md-12 col-lg-4">
                    <ul class="list-group list-group-flush">
                        <li class="bg-transparent list-group-item">
                            <div class="widget-content p-0">
                                <div class="widget-content-outer">
                                    <div class="widget-content-wrapper">
                                        <div class="widget-content-left text-white">
                                            <div class="widget-heading">Total Orders</div>
                                            <div class="widget-subheading">Last year expenses</div>
                                        </div>
                                        <div class="widget-content-right">
                                            <div class="widget-numbers text-success">1896</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li class="bg-transparent list-group-item">
                            <div class="widget-content p-0">
                                <div class="widget-content-outer">
                                    <div class="widget-content-wrapper text-white">
                                        <div class="widget-content-left">
                                            <div class="widget-heading">Clients</div>
                                            <div class="widget-subheading">Total Clients Profit</div>
                                        </div>
                                        <div class="widget-content-right">
                                            <div class="widget-numbers text-primary">$12.6k</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { defineComponent, ref, onMounted } from "vue";
import PageTitleComponent from "../Layout/Components/PageTitleComponent.vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { apiService } from "../supabase/apiService";

import {
    faTrashAlt,
    faCheck,
    faCalendarAlt,
    faAngleDown,
    faAngleUp,
    faTh,
} from "@fortawesome/free-solid-svg-icons";

library.add(
    faTrashAlt,
    faCheck,
    faAngleDown,
    faAngleUp,
    faTh,
    faCalendarAlt,
);

export default defineComponent({
    name: "DashboardPage",
    components: {
        PageTitleComponent,
        FontAwesomeIcon,
    },
    setup() {
        const heading = ref("Analytics Dashboard");
        const subheading = ref("This is an example dashboard created using build-in elements and components.");
        const icon = ref("pe-7s-plane icon-gradient bg-tempting-azure");
        const vtuberRecords = ref(null);
        const datasetRecords = ref(null);

        const getTalentCount = async () => {
            try {
                const count = await apiService.countTalentRecord();
                if (count.error) {
                    throw new Error(count.error);
                }
                return count;
            } catch (err) {
                return count = 0;
            }
        };

        const getAgencyCount = async () => {
            try {
                const count = await apiService.countAgencyRecord();
                if (count.error) {
                    throw new Error(count.error);
                }
                return count;
            } catch (err) {
                return count = 0;
            }
        };

        const getAlbumCount = async () => {
            try {
                const count = await apiService.countAlbumRecord();
                if (count.error) {
                    throw new Error(count.error);
                }
                return count;
            } catch (err) {
                return count = 0;
            }
        };

        const getDiscographyCount = async () => {
            try {
                const count = await apiService.countDiscographyRecord();
                if (count.error) {
                    throw new Error(count.error);
                }
                return count;
            } catch (err) {
                return count = 0;
            }
        };

        const getEventCount = async () => {
            try {
                const count = await apiService.countEventRecord();
                if (count.error) {
                    throw new Error(count.error);
                }
                return count;
            } catch (err) {
                return count = 0;
            }
        };

        const getDatasetCount = async () => {
            try {
                const count = await apiService.countDatasetRecord();
                if (count.error) {
                    throw new Error(count.error);
                }
                return count;
            } catch (err) {
                return count = 0;
            }
        };

        const getChatgroupCount = async () => {
            try {
                const count = await apiService.countChatgroupRecord();
                if (count.error) {
                    throw new Error(count.error);
                }
                return count;
            } catch (err) {
                return count = 0;
            }
        };

        const getMessageCount = async () => {
            try {
                const count = await apiService.countMessageRecord();
                if (count.error) {
                    throw new Error(count.error);
                }
                return count;
            } catch (err) {
                return count = 0;
            }
        };

        const getRecords = async () => {
            const talentCount = await getTalentCount();
            const agencyCount = await getAgencyCount();
            const albumCount = await getAlbumCount();
            const discographyCount = await getDiscographyCount();
            const eventCount = await getEventCount();

            const datasetCount = await getDatasetCount();
            const chatgroupCount = await getChatgroupCount();
            const messageCount = await getMessageCount();

            datasetRecords.value = [
                { label: "Dataset Record", count: datasetCount },
                { label: "Chat Group Record", count: chatgroupCount },
                { label: "Message Record", count: messageCount },
            ];

            vtuberRecords.value = [
                { label: "Talent Record", count: talentCount },
                { label: "Agency Record", count: agencyCount },
                { label: "Album Record", count: albumCount },
                { label: "Discography Record", count: discographyCount },
                { label: "Event Record", count: eventCount },
            ];
        };

        onMounted(async () => {
            getRecords();
        });



        return {
            heading,
            subheading,
            icon,
            datasetRecords,
            vtuberRecords
        };
    },
});
</script>