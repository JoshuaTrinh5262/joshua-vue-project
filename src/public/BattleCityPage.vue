<template>
    <div class="section">
        <div class="section-title">
            <h1>BATTLE CITY</h1>
        </div>
        <div class="row">
            <div class="col-lg-6 col-md-6" v-for="page in pageList" :key="page">
                <div class="card animated-card mb-4">
                    <span class="ribbon">{{ page.name }}</span>
                    <img src="/img/abstract6.f96a397f.jpg" height="360" alt="Card image cap" class="card-img" />
                    <div class="card-img-overlay">
                        <div>
                            <h5 class="card-title">
                                {{ page.name }}
                            </h5>
                        </div>
                        <div class="card-body transparent-card">
                            <p>{{ page.description }}</p>
                            <br />
                            <small class="text-white">
                                <a :href="`/battlecity/${page.name}`">Know More</a>
                            </small>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { defineComponent, ref } from "vue";

export default defineComponent({
    name: "Page",
    setup() {
        const pageList = ref([{
            name: "Policy",
            description: "Policy"
        },
        ]);

        return {
            pageList,
        };
    },
});
</script>

<style scoped>
.section {
    padding: 1rem;
}

.section-title {
    padding-bottom: 1rem;
}

.transparent-card {
    background-color: rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(5px);
    padding: 15px;
    border-radius: 10px;
    transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out;
    opacity: 0;
    transform: translateY(30px);
}

.card:hover .transparent-card {
    opacity: 1;
    transform: translateY(0);
}

.ribbon {
    position: absolute;
    top: 10px;
    right: -10px;
    background: red;
    color: white;
    font-size: 14px;
    font-weight: bold;
    padding: 5px 20px;
    box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.2);
    z-index: 10;
    border-radius: 5px;
}

.ribbon::before {
    content: "";
    position: absolute;
    bottom: -5px;
    left: 0;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-top: 10px solid red;
}

.animated-card {
    opacity: 0;
    transform: translateY(50px);
    animation: slideUp 0.6s ease-out forwards;
}

@keyframes slideUp {
    from {
        opacity: 0;
        transform: translateY(50px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}
</style>
