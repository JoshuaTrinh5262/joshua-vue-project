<template>
    <div>
        <page-title-component :heading=heading :subheading=subheading :icon=icon></page-title-component>
        <div class="row">
            <div class="col-md-12">
                <div class="alert alert-warning fade show" role="alert">
                    <h5>Bootstrap Helpers</h5>
                    <p class="mb-0">
                        All Bootstrap 4 helper classes available in the official Bootstrap documentation are
                        also available in JoshuaTrinh Framework: Spacing, resets, typography utilities, sizing and
                        others.
                    </p>
                </div>
            </div>
            <div class="col-lg-6">
                <div class="main-card mb-3 card">
                    <div class="card-body">
                        <h5 class="card-title">Opacity</h5>
                        <table class="mb-0 table table-bordered">
                            <tbody>
                                <tr>
                                    <th scope="row"><b>.opacity-01 </b> - <b>.opacity-09</b></th>
                                    <td>Adding this class to any element sets the opacity to <b>1% ... 9%</b></td>
                                </tr>
                                <tr>
                                    <th scope="row"><b>.opacity-2 </b> - <b>.opacity-10</b></th>
                                    <td>Adding this class to any element sets the opacity to <b>10% ... 100%</b></td>
                                </tr>
                                <tr>
                                    <th scope="row"><b>.opacity-01</b></th>
                                    <td>Adding this class to any element sets the opacity to <b>10%</b></td>
                                </tr>
                                <tr>
                                    <th scope="row"><b>.opacity-15</b></th>
                                    <td>Adding this class to any element sets the opacity to <b>15%</b></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div class="col-lg-6">
                <div class="main-card mb-3 card">
                    <div class="card-body">
                        <h5 class="card-title">Breadcrumbs</h5>
                        <div>
                            <nav class="" aria-label="breadcrumb">
                                <ol class="breadcrumb">
                                    <li class="active breadcrumb-item" aria-current="page">Home</li>
                                </ol>
                            </nav>
                            <nav class="" aria-label="breadcrumb">
                                <ol class="breadcrumb">
                                    <li class="breadcrumb-item"><a href="javascript:void(0);">Home</a></li>
                                    <li class="active breadcrumb-item" aria-current="page">Library</li>
                                </ol>
                            </nav>
                            <nav class="" aria-label="breadcrumb">
                                <ol class="breadcrumb">
                                    <li class="breadcrumb-item"><a href="javascript:void(0);">Home</a></li>
                                    <li class="breadcrumb-item"><a href="javascript:void(0);">Library</a></li>
                                    <li class="active breadcrumb-item" aria-current="page">Data</li>
                                </ol>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="card main-card mb-3">
            <div class="card-header">Height</div>
            <div class="card-body">
                <div class="row">
                    <div class="col-sm">
                        <div class="clearfix">
                            <div class="d-inline-block float-left h-50p bg-light p-5 mr-5 mb-5">50px</div>
                            <div class="d-inline-block float-left h-75p bg-light p-5 mr-5 mb-5">75px</div>
                            <div class="d-inline-block float-left h-100p bg-light p-5 mr-5 mb-5">100px</div>
                            <div class="d-inline-block float-left h-125p bg-light p-5 mr-5 mb-5">125px</div>
                        </div>
                        <div class="table-wrap mt-40">
                            <table class="table table-bordered mb-0">
                                <thead>
                                    <tr>
                                        <th class="w-35">Class</th>
                                        <th class="w-65">Values</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td><code class="bg-transparent pa-0">class="h-[value]p"</code></td>
                                        <td class="font-14">25 / 30 / 35 / 40 / 45 / 50 ... / 800 (step of 5)</td>
                                    </tr>
                                    <tr>
                                        <td><code class="bg-transparent pa-0">class="mh-[value]p"</code></td>
                                        <td class="font-14">100 / 125 / 150 / 200 / 225 ... / 800 (step of 25)<br>Set
                                            max-height
                                            of an element
                                        </td>
                                    </tr>
                                    <tr>
                                        <td><code class="bg-transparent pa-0">class="mnh-[value]p"</code></td>
                                        <td class="font-14">100 / 125 / 150 / 200 / 225 ... / 800 (step of 25)<br>Set
                                            min-height
                                            of an element
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="card main-card mb-3">
            <div class="card-header">Height in percentage</div>
            <div class="card-body">
                <div class="row">
                    <div class="col-sm">
                        <div class="h-200p">
                            <div class="d-inline-block float-left h-auto bg-light p-5 mr-5 mb-2">auto</div>
                            <div class="d-inline-block float-left h-25 bg-light p-5 mr-5 mb-2">25%</div>
                            <div class="d-inline-block float-left h-50 bg-light p-5 mr-5 mb-2">50%</div>
                            <div class="d-inline-block float-left h-75 bg-light p-5 mr-5 mb-2">75%</div>
                            <div class="d-inline-block float-left h-100 bg-light p-5 mr-5 mb-2">100%</div>
                        </div>
                        <div class="table-wrap mt-40">
                            <table class="table table-bordered mb-0">
                                <thead>
                                    <tr>
                                        <th class="w-35">Class</th>
                                        <th class="w-65">Values</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td><code class="bg-transparent pa-0">class="h-[value]"</code></td>
                                        <td class="font-14">25 / 30 / 35 / 40 / 45 / 50 ... / 100 (step of 5)</td>
                                    </tr>
                                    <tr>
                                        <td><code class="bg-transparent pa-0">class="h-auto"</code></td>
                                        <td class="font-14">Set the height to auto</td>
                                    </tr>
                                    <tr>
                                        <td><code class="bg-transparent pa-0">class="mh-100"</code></td>
                                        <td class="font-14">Set max-height of an element to 100%</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="card main-card mb-3">
            <div class="card-header">Width</div>
            <div class="card-body">
                <div class="row">
                    <div class="col-sm">
                        <div>
                            <div class="w-50p bg-light p-0 mr-5 mb-5">50px</div>
                            <div class="w-75p bg-light p-0 mr-5 mb-5">75px</div>
                            <div class="w-100p bg-light p-0 mr-5 mb-5">100px</div>
                            <div class="w-150p bg-light p-0 mr-5 mb-5">150px</div>
                        </div>
                        <div class="table-wrap mt-40">
                            <table class="table table-bordered mb-0">
                                <thead>
                                    <tr>
                                        <th class="w-35">Class</th>
                                        <th class="w-65">Values</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>
                                            <code class="d-block bg-transparent pa-0">class="w-[value]p"</code>
                                            <code class="d-block bg-transparent pa-0">class="w-sm-[value]p"</code>
                                            <code class="d-block bg-transparent pa-0">class="w-md-[value]p"</code>
                                            <code class="d-block bg-transparent pa-0">class="w-lg-[value]p"</code>
                                            <code class="d-block bg-transparent pa-0">class="w-xl-[value]p"</code>
                                            <code class="d-block bg-transparent pa-0">class="w-xxl-[value]p"</code>
                                        </td>
                                        <td class="font-14">25 / 30 / 35 / 40 / 45 / 50 ... / 800 (step of 5)</td>
                                    </tr>
                                    <tr>
                                        <td><code class="bg-transparent pa-0">class="mw-[value]p"</code></td>
                                        <td class="font-14">25 / 50 / 75 / 100 / 125 / 150 / 200 / 225 ... / 800 (step
                                            of
                                            25)<br>Set max-width of an element
                                        </td>
                                    </tr>
                                    <tr>
                                        <td><code class="bg-transparent pa-0">class="mnw-[value]p"</code></td>
                                        <td class="font-14">25 / 50 / 75 / 100 / 125 / 150 / 200 / 225 ... / 800 (step
                                            of
                                            25)<br>Set min-width of an element
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="card main-card mb-3">
            <div class="card-header">Width in percentage</div>
            <div class="card-body">
                <div class="row">
                    <div class="col-sm">
                        <div>
                            <div class="w-25 bg-light p-5 mr-5 mb-5">25%</div>
                            <div class="w-50 bg-light p-5 mr-5 mb-5">50%</div>
                            <div class="w-75 bg-light p-5 mr-5 mb-5">75%</div>
                            <div class="w-100 bg-light p-5 mr-5 mb-5">100%</div>
                            <div class="w-auto bg-light p-5 mr-5 mb-5">auto</div>
                        </div>
                        <div class="table-wrap mt-40">
                            <table class="table table-bordered mb-0">
                                <thead>
                                    <tr>
                                        <th class="w-35">Class</th>
                                        <th class="w-65">Values</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>
                                            <code class="d-block bg-transparent pa-0">class="w-[value]"</code>
                                            <code class="d-block bg-transparent pa-0">class="w-sm-[value]"</code>
                                            <code class="d-block bg-transparent pa-0">class="w-md-[value]"</code>
                                            <code class="d-block bg-transparent pa-0">class="w-lg-[value]"</code>
                                            <code class="d-block bg-transparent pa-0">class="w-xl-[value]"</code>
                                            <code class="d-block bg-transparent pa-0">class="w-xxl-[value]"</code>
                                        </td>
                                        <td class="font-14">5 / 10 / 15 / 20 / 25 / 30 / 35 / 40 / 45 / 50 ... / 100
                                            (step of
                                            5)
                                        </td>
                                    </tr>
                                    <tr>
                                        <td><code class="bg-transparent pa-0">class="w-auto"</code></td>
                                        <td class="font-14">Set the width to auto</td>
                                    </tr>
                                    <tr>
                                        <td><code class="bg-transparent pa-0">class="mw-100"</code></td>
                                        <td class="font-14">Set max-width of an element to 100%</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="card main-card mb-3">
            <div class="card-header">Equal Height &amp; Width</div>
            <div class="card-body">
                <div class="row">
                    <div class="col-sm">
                        <div class="clearfix">
                            <div class="d-inline-block  float-left d-46 bg-light mr-5 mb-5">
                                <div class="d-flex justify-content-center align-items-center h-100 w-100">d-46</div>
                            </div>
                            <div class="d-inline-block  float-left d-74 bg-light mr-5 mb-5">
                                <div class="d-flex justify-content-center align-items-center h-100 w-100">d-74</div>
                            </div>
                            <div class="d-inline-block  float-left d-100 bg-light mr-5 mb-5">
                                <div class="d-flex justify-content-center align-items-center h-100 w-100">d-100</div>
                            </div>
                        </div>
                        <div class="table-wrap mt-40">
                            <table class="table table-bordered mb-0">
                                <thead>
                                    <tr>
                                        <th class="w-35">Class</th>
                                        <th class="w-65">Values</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td><code class="bg-transparent pa-0">class="d-[value]"</code></td>
                                        <td class="font-14">8 / 10 / 12 / 14 / 16 / 18 / 20 / 22 / 24 ... / 50 (step of
                                            2)
                                        </td>
                                    </tr>
                                    <tr>
                                        <td><code class="bg-transparent pa-0">class="d-[value]"</code></td>
                                        <td class="font-14">54 / 58 / 62 / 66 / 70 / 74 / 78 / 82 / 86 / 90 / 94 / 98
                                            (step
                                            of 4)
                                        </td>
                                    </tr>
                                    <tr>
                                        <td><code class="bg-transparent pa-0">class="d-[value]"</code></td>
                                        <td class="font-14">100 / 110 / 120 / 130 / 140 / 150 (step of 10)</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { defineComponent, ref } from 'vue';
import PageTitleComponent from "@/Layout/Components/PageTitleComponent.vue";

export default defineComponent({
    components: {
        PageTitleComponent,
    },
    setup() {
        const heading = ref('Utilities');
        const subheading = ref('These are helpers that speed up the dev time for various components and effects.');
        const icon = ref('pe-7s-wristwatch icon-gradient bg-deep-blue');

        return {
            heading,
            subheading,
            icon,
        };
    },
});
</script>
