<template>
    <div>
        <page-title-component :heading=heading :subheading=subheading :icon=icon></page-title-component>
        <div class="row mt-4">
            <div class="col-lg-6 col-xl-4">
                <div class="card mb-3 widget-content">
                    <div class="widget-content-wrapper">
                        <div class="widget-content-left">
                            <div class="widget-heading">Total Orders</div>
                            <div class="widget-subheading">Last year expenses</div>
                        </div>
                        <div class="widget-content-right">
                            <div class="widget-numbers text-success"><span>1896</span></div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-lg-6 col-xl-4">
                <div class="card mb-3 widget-content">
                    <div class="widget-content-wrapper">
                        <div class="widget-content-left">
                            <div class="widget-heading">Clients</div>
                            <div class="widget-subheading">Total Clients Profit</div>
                        </div>
                        <div class="widget-content-right">
                            <div class="widget-numbers text-primary"><span>$ 568</span></div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-lg-6 col-xl-4">
                <div class="card mb-3 widget-content">
                    <div class="widget-content-wrapper">
                        <div class="widget-content-left">
                            <div class="widget-heading">Products Sold</div>
                            <div class="widget-subheading">Total revenue streams</div>
                        </div>
                        <div class="widget-content-right">
                            <div class="widget-numbers text-warning"><span>$14M</span></div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-lg-6 col-xl-4">
                <div class="card mb-3 widget-content">
                    <div class="widget-content-wrapper">
                        <div class="widget-content-left">
                            <div class="widget-heading">Followers</div>
                            <div class="widget-subheading">People Interested</div>
                        </div>
                        <div class="widget-content-right">
                            <div class="widget-numbers text-danger"><span>46%</span></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="divider mt-0" style="margin-bottom: 30px;"></div>
        <div class="row">
            <div class="col-lg-6 col-xl-4" v-for="(item, index) in bgItems" :key="index">
                <div class="card mb-3 widget-content" :class="item.bgClass">
                    <div class="widget-content-wrapper text-white">
                        <div class="widget-content-left">
                            <div class="widget-heading">{{ item.heading }}</div>
                            <div class="widget-subheading">{{ item.subheading }}</div>
                        </div>
                        <div class="widget-content-right">
                            <div class="widget-numbers text-warning"><span>{{ item.percentage }}</span></div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-lg-6 col-xl-4">
                <div class="card mb-3 widget-content bg-strong-bliss">
                    <div class="widget-content-wrapper text-white">
                        <div class="widget-content-left">
                            <div class="widget-heading">Background Strong Bliss</div>
                            <div class="widget-subheading">bg-strong-bliss</div>
                        </div>
                        <div class="widget-content-right">
                            <div class="widget-numbers text-warning"><span>100%</span></div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-lg-6 col-xl-4">
                <div class="card mb-3 widget-content bg-grow-early">
                    <div class="widget-content-wrapper text-white">
                        <div class="widget-content-left">
                            <div class="widget-heading">Background Love Kiss</div>
                            <div class="widget-subheading">bg-grow-early</div>
                        </div>
                        <div class="widget-content-right">
                            <div class="widget-numbers text-warning"><span>100%</span></div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-lg-6 col-xl-4">
                <div class="card mb-3 widget-content bg-love-kiss">
                    <div class="widget-content-wrapper text-white">
                        <div class="widget-content-left">
                            <div class="widget-heading">Background Love Kiss</div>
                            <div class="widget-subheading">bg-love-kiss</div>
                        </div>
                        <div class="widget-content-right">
                            <div class="widget-numbers text-warning"><span>100%</span></div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-lg-6 col-xl-4">
                <div class="card mb-3 widget-content bg-premium-dark">
                    <div class="widget-content-wrapper text-white">
                        <div class="widget-content-left">
                            <div class="widget-heading">Background Premium Dark</div>
                            <div class="widget-subheading">bg-premium-dark</div>
                        </div>
                        <div class="widget-content-right">
                            <div class="widget-numbers text-warning"><span>100%</span></div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-lg-6 col-xl-4">
                <div class="card mb-3 widget-content bg-happy-green">
                    <div class="widget-content-wrapper text-white">
                        <div class="widget-content-left">
                            <div class="widget-heading">Background Happy Green</div>
                            <div class="widget-subheading">bg-happy-green</div>
                        </div>
                        <div class="widget-content-right">
                            <div class="widget-numbers text-warning"><span>100%</span></div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-lg-6 col-xl-4">
                <div class="card mb-3 widget-content bg-midnight-bloom">
                    <div class="widget-content-wrapper text-white">
                        <div class="widget-content-left">
                            <div class="widget-heading">Background Midnight Bloom</div>
                            <div class="widget-subheading">bg-midnight-bloom</div>
                        </div>
                        <div class="widget-content-right">
                            <div class="widget-numbers text-warning"><span>100%</span></div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-lg-6 col-xl-4">
                <div class="card mb-3 widget-content bg-night-sky">
                    <div class="widget-content-wrapper text-white">
                        <div class="widget-content-left">
                            <div class="widget-heading">Background Night Sky</div>
                            <div class="widget-subheading">bg-night-sky</div>
                        </div>
                        <div class="widget-content-right">
                            <div class="widget-numbers text-warning"><span>100%</span></div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-lg-6 col-xl-4">
                <div class="card mb-3 widget-content bg-slick-carbon">
                    <div class="widget-content-wrapper text-white">
                        <div class="widget-content-left">
                            <div class="widget-heading">Background Slick Carbon</div>
                            <div class="widget-subheading">bg-slick-carbon</div>
                        </div>
                        <div class="widget-content-right">
                            <div class="widget-numbers text-warning"><span>100%</span></div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-lg-6 col-xl-4">
                <div class="card mb-3 widget-content bg-asteroid">
                    <div class="widget-content-wrapper text-white">
                        <div class="widget-content-left">
                            <div class="widget-heading">Background Asteroid</div>
                            <div class="widget-subheading">bg-asteroid</div>
                        </div>
                        <div class="widget-content-right">
                            <div class="widget-numbers text-warning"><span>100%</span></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="divider mt-0" style="margin-bottom: 30px;"></div>
        <div class="row">
            <div class="col-lg-6 col-xl-4">
                <div class="card mb-3 widget-content">
                    <div class="widget-content-outer">
                        <div class="widget-content-wrapper">
                            <div class="widget-content-left">
                                <div class="widget-heading">Total Orders</div>
                                <div class="widget-subheading">Last year expenses</div>
                            </div>
                            <div class="widget-content-right">
                                <div class="widget-numbers text-success">1896</div>
                            </div>
                        </div>
                        <div class="widget-progress-wrapper">
                            <div class="progress-bar-xs progress">
                                <div class="progress-bar bg-primary" role="progressbar" aria-valuenow="65"
                                    aria-valuemin="0" aria-valuemax="100" style="width: 65%;"></div>
                            </div>
                            <div class="progress-sub-label">
                                <div class="sub-label-left">YoY Growth</div>
                                <div class="sub-label-right">100%</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-lg-6 col-xl-4">
                <div class="card mb-3 widget-content">
                    <div class="widget-content-outer">
                        <div class="widget-content-wrapper">
                            <div class="widget-content-left">
                                <div class="widget-heading">Clients</div>
                                <div class="widget-subheading">Total Clients Profit</div>
                            </div>
                            <div class="widget-content-right">
                                <div class="widget-numbers text-primary">$12.6k</div>
                            </div>
                        </div>
                        <div class="widget-progress-wrapper">
                            <div class="progress-bar-lg progress-bar-animated progress">
                                <div class="progress-bar bg-warning" role="progressbar" aria-valuenow="47"
                                    aria-valuemin="0" aria-valuemax="100" style="width: 47%;"></div>
                            </div>
                            <div class="progress-sub-label">
                                <div class="sub-label-left">Retention</div>
                                <div class="sub-label-right">100%</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-lg-6 col-xl-4">
                <div class="card mb-3 widget-content">
                    <div class="widget-content-outer">
                        <div class="widget-content-wrapper">
                            <div class="widget-content-left">
                                <div class="widget-heading">Products Sold</div>
                                <div class="widget-subheading">Total revenue streams</div>
                            </div>
                            <div class="widget-content-right">
                                <div class="widget-numbers text-warning">$3M</div>
                            </div>
                        </div>
                        <div class="widget-progress-wrapper">
                            <div class="progress-bar-xs progress-bar-animated-alt progress">
                                <div class="progress-bar bg-danger" role="progressbar" aria-valuenow="85"
                                    aria-valuemin="0" aria-valuemax="100" style="width: 85%;"></div>
                            </div>
                            <div class="progress-sub-label">
                                <div class="sub-label-left">Sales</div>
                                <div class="sub-label-right">100%</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-lg-6 col-xl-4">
                <div class="card mb-3 widget-content">
                    <div class="widget-content-outer">
                        <div class="widget-content-wrapper">
                            <div class="widget-content-left">
                                <div class="widget-heading">Followers</div>
                                <div class="widget-subheading">People Interested</div>
                            </div>
                            <div class="widget-content-right">
                                <div class="widget-numbers text-danger">45,9%</div>
                            </div>
                        </div>
                        <div class="widget-progress-wrapper">
                            <div class="progress-bar-sm progress-bar-animated-alt progress">
                                <div class="progress-bar bg-success" role="progressbar" aria-valuenow="65"
                                    aria-valuemin="0" aria-valuemax="100" style="width: 65%;"></div>
                            </div>
                            <div class="progress-sub-label">
                                <div class="sub-label-left">Twitter Progress</div>
                                <div class="sub-label-right">100%</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="divider mt-0" style="margin-bottom: 30px;"></div>
        <div class="main-card mb-3 card">
            <div class="no-gutters row">
                <div class="col-md-4">
                    <div class="widget-content">
                        <div class="widget-content-wrapper">
                            <div class="widget-content-right ml-0 mr-3">
                                <div class="widget-numbers text-success">1896</div>
                            </div>
                            <div class="widget-content-left">
                                <div class="widget-heading">Total Orders</div>
                                <div class="widget-subheading">Last year expenses</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="widget-content">
                        <div class="widget-content-wrapper">
                            <div class="widget-content-right ml-0 mr-3">
                                <div class="widget-numbers text-warning">$ 14M</div>
                            </div>
                            <div class="widget-content-left">
                                <div class="widget-heading">Products Sold</div>
                                <div class="widget-subheading">Total revenue streams</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="widget-content">
                        <div class="widget-content-wrapper">
                            <div class="widget-content-right ml-0 mr-3">
                                <div class="widget-numbers text-danger">45.9%</div>
                            </div>
                            <div class="widget-content-left">
                                <div class="widget-heading">Followers</div>
                                <div class="widget-subheading">People Interested</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="divider mt-0" style="margin-bottom: 30px;"></div>
        <div class="main-card mb-3 card">
            <div class="no-gutters row">
                <div class="col-md-4">
                    <div class="pt-0 pb-0 card-body">
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item">
                                <div class="widget-content p-0">
                                    <div class="widget-content-outer">
                                        <div class="widget-content-wrapper">
                                            <div class="widget-content-left">
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
                            <li class="list-group-item">
                                <div class="widget-content p-0">
                                    <div class="widget-content-outer">
                                        <div class="widget-content-wrapper">
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
                <div class="col-md-4">
                    <div class="pt-0 pb-0 card-body">
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item">
                                <div class="widget-content p-0">
                                    <div class="widget-content-outer">
                                        <div class="widget-content-wrapper">
                                            <div class="widget-content-left">
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
                            <li class="list-group-item">
                                <div class="widget-content p-0">
                                    <div class="widget-content-outer">
                                        <div class="widget-content-wrapper">
                                            <div class="widget-content-left">
                                                <div class="widget-heading">Products Sold</div>
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
                </div>
                <div class="col-md-4">
                    <div class="pt-0 pb-0 card-body">
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item">
                                <div class="widget-content p-0">
                                    <div class="widget-content-outer">
                                        <div class="widget-content-wrapper">
                                            <div class="widget-content-left">
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
                            <li class="list-group-item">
                                <div class="widget-content p-0">
                                    <div class="widget-content-outer">
                                        <div class="widget-content-wrapper">
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
        <div class="divider mt-0" style="margin-bottom: 30px;"></div>
        <div class="main-card mb-3 card">
            <div class="row">
                <div class="col-lg-6 col-xl-4">
                    <div class="widget-content">
                        <div class="widget-content-outer">
                            <div class="widget-content-wrapper">
                                <div class="widget-content-left">
                                    <div class="widget-heading">Total Orders</div>
                                    <div class="widget-subheading">Last year expenses</div>
                                </div>
                                <div class="widget-content-right">
                                    <div class="widget-numbers text-success">1896</div>
                                </div>
                            </div>
                            <div class="widget-progress-wrapper">
                                <div class="progress-bar-sm progress-bar-animated-alt progress">
                                    <div class="progress-bar bg-primary" role="progressbar" aria-valuenow="43"
                                        aria-valuemin="0" aria-valuemax="100" style="width: 43%;"></div>
                                </div>
                                <div class="progress-sub-label">
                                    <div class="sub-label-left">YoY Growth</div>
                                    <div class="sub-label-right">100%</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-6 col-xl-4">
                    <div class="widget-content">
                        <div class="widget-content-outer">
                            <div class="widget-content-wrapper">
                                <div class="widget-content-left">
                                    <div class="widget-heading">Clients</div>
                                    <div class="widget-subheading">Total Clients Profit</div>
                                </div>
                                <div class="widget-content-right">
                                    <div class="widget-numbers text-primary">$12.6k</div>
                                </div>
                            </div>
                            <div class="widget-progress-wrapper">
                                <div class="progress-bar-sm progress-bar-animated-alt progress">
                                    <div class="progress-bar bg-warning" role="progressbar" aria-valuenow="47"
                                        aria-valuemin="0" aria-valuemax="100" style="width: 47%;"></div>
                                </div>
                                <div class="progress-sub-label">
                                    <div class="sub-label-left">Retention</div>
                                    <div class="sub-label-right">100%</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-6 col-xl-4">
                    <div class="widget-content">
                        <div class="widget-content-outer">
                            <div class="widget-content-wrapper">
                                <div class="widget-content-left">
                                    <div class="widget-heading">Products Sold</div>
                                    <div class="widget-subheading">Total revenue streams</div>
                                </div>
                                <div class="widget-content-right">
                                    <div class="widget-numbers text-warning">$3M</div>
                                </div>
                            </div>
                            <div class="widget-progress-wrapper">
                                <div class="progress-bar-sm progress-bar-animated-alt progress">
                                    <div class="progress-bar bg-danger" role="progressbar" aria-valuenow="77"
                                        aria-valuemin="0" aria-valuemax="100" style="width: 77%;"></div>
                                </div>
                                <div class="progress-sub-label">
                                    <div class="sub-label-left">Sales</div>
                                    <div class="sub-label-right">100%</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-6 col-xl-4">
                    <div class="widget-content">
                        <div class="widget-content-outer">
                            <div class="widget-content-wrapper">
                                <div class="widget-content-left">
                                    <div class="widget-heading">Followers</div>
                                    <div class="widget-subheading">People Interested</div>
                                </div>
                                <div class="widget-content-right">
                                    <div class="widget-numbers text-danger">45,9%</div>
                                </div>
                            </div>
                            <div class="widget-progress-wrapper">
                                <div class="progress-bar-sm progress-bar-animated-alt progress">
                                    <div class="progress-bar bg-success" role="progressbar" aria-valuenow="65"
                                        aria-valuemin="0" aria-valuemax="100" style="width: 65%;"></div>
                                </div>
                                <div class="progress-sub-label">
                                    <div class="sub-label-left">Twitter Progress</div>
                                    <div class="sub-label-right">100%</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="divider mt-0" style="margin-bottom: 30px;"></div>
        <div class="main-card mb-3 card">
            <div class="row">
                <div class="col-md-4">
                    <div class="widget-content">
                        <div class="widget-content-outer">
                            <div class="widget-content-wrapper">
                                <div class="widget-content-left">
                                    <div class="widget-heading">Total Orders</div>
                                    <div class="widget-subheading">Last year expenses</div>
                                </div>
                                <div class="widget-content-right">
                                    <div class="widget-numbers text-success">1896</div>
                                </div>
                            </div>
                            <div class="widget-progress-wrapper">
                                <div class="progress-bar-sm progress-bar-animated-alt progress">
                                    <div class="progress-bar bg-primary" role="progressbar" aria-valuenow="43"
                                        aria-valuemin="0" aria-valuemax="100" style="width: 43%;"></div>
                                </div>
                                <div class="progress-sub-label">
                                    <div class="sub-label-left">YoY Growth</div>
                                    <div class="sub-label-right">100%</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="widget-content">
                        <div class="widget-content-outer">
                            <div class="widget-content-wrapper">
                                <div class="widget-content-left">
                                    <div class="widget-heading">Products Sold</div>
                                    <div class="widget-subheading">Total revenue streams</div>
                                </div>
                                <div class="widget-content-right">
                                    <div class="widget-numbers text-warning">$3M</div>
                                </div>
                            </div>
                            <div class="widget-progress-wrapper">
                                <div class="progress-bar-sm progress-bar-animated-alt progress">
                                    <div class="progress-bar bg-danger" role="progressbar" aria-valuenow="77"
                                        aria-valuemin="0" aria-valuemax="100" style="width: 77%;"></div>
                                </div>
                                <div class="progress-sub-label">
                                    <div class="sub-label-left">Sales</div>
                                    <div class="sub-label-right">100%</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="widget-content">
                        <div class="widget-content-outer">
                            <div class="widget-content-wrapper">
                                <div class="widget-content-left">
                                    <div class="widget-heading">Followers</div>
                                    <div class="widget-subheading">People Interested</div>
                                </div>
                                <div class="widget-content-right">
                                    <div class="widget-numbers text-danger">45,9%</div>
                                </div>
                            </div>
                            <div class="widget-progress-wrapper">
                                <div class="progress-bar-sm progress-bar-animated-alt progress">
                                    <div class="progress-bar bg-success" role="progressbar" aria-valuenow="65"
                                        aria-valuemin="0" aria-valuemax="100" style="width: 65%;"></div>
                                </div>
                                <div class="progress-sub-label">
                                    <div class="sub-label-left">Twitter Progress</div>
                                    <div class="sub-label-right">100%</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="divider mt-0" style="margin-bottom: 30px;"></div>
        <div class="row">
            <div class="col-md-6">
                <div class="main-card mb-3 card">
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">
                            <div class="widget-content p-0">
                                <div class="widget-content-outer">
                                    <div class="widget-content-wrapper">
                                        <div class="widget-content-left">
                                            <div class="widget-heading">Total Orders</div>
                                            <div class="widget-subheading">Last year expenses</div>
                                        </div>
                                        <div class="widget-content-right">
                                            <div class="widget-numbers text-success">1896</div>
                                        </div>
                                    </div>
                                    <div class="widget-progress-wrapper">
                                        <div class="progress-bar-xs progress">
                                            <div class="progress-bar bg-primary" role="progressbar" aria-valuenow="65"
                                                aria-valuemin="0" aria-valuemax="100" style="width: 65%;"></div>
                                        </div>
                                        <div class="progress-sub-label">
                                            <div class="sub-label-left">YoY Growth</div>
                                            <div class="sub-label-right">100%</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li class="list-group-item">
                            <div class="widget-content p-0">
                                <div class="widget-content-outer">
                                    <div class="widget-content-wrapper">
                                        <div class="widget-content-left">
                                            <div class="widget-heading">Clients</div>
                                            <div class="widget-subheading">Total Clients Profit</div>
                                        </div>
                                        <div class="widget-content-right">
                                            <div class="widget-numbers text-primary">$12.6k</div>
                                        </div>
                                    </div>
                                    <div class="widget-progress-wrapper">
                                        <div class="progress-bar-lg progress-bar-animated progress">
                                            <div class="progress-bar bg-warning" role="progressbar" aria-valuenow="47"
                                                aria-valuemin="0" aria-valuemax="100" style="width: 47%;"></div>
                                        </div>
                                        <div class="progress-sub-label">
                                            <div class="sub-label-left">Retention</div>
                                            <div class="sub-label-right">100%</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li class="list-group-item">
                            <div class="widget-content p-0">
                                <div class="widget-content-outer">
                                    <div class="widget-content-wrapper">
                                        <div class="widget-content-left">
                                            <div class="widget-heading">Followers</div>
                                            <div class="widget-subheading">People Interested</div>
                                        </div>
                                        <div class="widget-content-right">
                                            <div class="widget-numbers text-danger">45,9%</div>
                                        </div>
                                    </div>
                                    <div class="widget-progress-wrapper">
                                        <div class="progress-bar-sm progress-bar-animated-alt progress">
                                            <div class="progress-bar bg-success" role="progressbar" aria-valuenow="65"
                                                aria-valuemin="0" aria-valuemax="100" style="width: 65%;"></div>
                                        </div>
                                        <div class="progress-sub-label">
                                            <div class="sub-label-left">Twitter Progress</div>
                                            <div class="sub-label-right">100%</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li class="list-group-item">
                            <div class="widget-content p-0">
                                <div class="widget-content-outer">
                                    <div class="widget-content-wrapper">
                                        <div class="widget-content-left">
                                            <div class="widget-heading">Products Sold</div>
                                            <div class="widget-subheading">Total revenue streams</div>
                                        </div>
                                        <div class="widget-content-right">
                                            <div class="widget-numbers text-warning">$3M</div>
                                        </div>
                                    </div>
                                    <div class="widget-progress-wrapper">
                                        <div class="progress-bar-xs progress-bar-animated-alt progress">
                                            <div class="progress-bar bg-danger" role="progressbar" aria-valuenow="85"
                                                aria-valuemin="0" aria-valuemax="100" style="width: 85%;"></div>
                                        </div>
                                        <div class="progress-sub-label">
                                            <div class="sub-label-left">Sales</div>
                                            <div class="sub-label-right">100%</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="col-md-6">
                <div class="main-card mb-3 card">
                    <div class="card-body">
                        <ul class="list-group">
                            <li class="list-group-item">
                                <div class="widget-content p-0">
                                    <div class="widget-content-outer">
                                        <div class="widget-content-wrapper">
                                            <div class="widget-content-left">
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
                            <li class="list-group-item">
                                <div class="widget-content p-0">
                                    <div class="widget-content-outer">
                                        <div class="widget-content-wrapper">
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
                            <li class="list-group-item">
                                <div class="widget-content p-0">
                                    <div class="widget-content-outer">
                                        <div class="widget-content-wrapper">
                                            <div class="widget-content-left">
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
                            <li class="list-group-item">
                                <div class="widget-content p-0">
                                    <div class="widget-content-outer">
                                        <div class="widget-content-wrapper">
                                            <div class="widget-content-left">
                                                <div class="widget-heading">Products Sold</div>
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
                </div>
            </div>
        </div>
    </div>
</template>


<script>
import { defineComponent, ref } from "vue";
import PageTitleComponent from "../../Layout/Components/PageTitleComponent.vue";

export default defineComponent({
    name: "ChartBoxesPage",

    components: {
        PageTitleComponent,
    },

    setup() {
        const heading = ref("Chart Boxes III");
        const subheading = ref("Highly configurable boxes best used for showing numbers in a user-friendly way.");
        const icon = ref("pe-7s-wallet icon-gradient bg-plum-plate");

        const bgItems = ref([
            {
                bgClass: "bg-happy-itmeo",
                heading: "Background Happy Itmeo",
                percentage: "100%",
            },
            {
                bgClass: "bg-mixed-hopes",
                heading: "Background Mixed Hopes",
                percentage: "100%",
            },
            {
                bgClass: "bg-strong-bliss",
                heading: "Background Strong Bliss",
                percentage: "100%",
            },
            {
                bgClass: "bg-grow-early",
                heading: "Background Grow Early",
                percentage: "100%",
            },
            {
                bgClass: "bg-love-kiss",
                heading: "Background Love Kiss",
                percentage: "100%",
            },
            {
                bgClass: "bg-premium-dark",
                heading: "Background premium dark",
                percentage: "100%",
            },
            {
                bgClass: "bg-happy-green",
                heading: "Background happy green",
                percentage: "100%",
            },
            {
                bgClass: "bg-vicious-stance",
                heading: "Background vicious stance",
                percentage: "100%",
            },
            {
                bgClass: "bg-midnight-bloom",
                heading: "Background midnight bloom",
                percentage: "100%",
            },
        ]);

        return {
            heading,
            subheading,
            icon,
            bgItems,
        };
    },
});
</script>
