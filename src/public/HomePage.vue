<template>
  <!-- <div class="banner">
    <BannerComponent></BannerComponent>
  </div> -->
  <div class="timeline">
    <div
      v-for="(event, index) in timelineData"
      :key="index"
      :class="['timeline-container', index % 2 === 0 ? 'right' : 'left']"
    >
      <div class="timeline-content">
        <div class="timeline-title">
          <h3>{{ event.title }}</h3>
          <div class="badge badge-danger">Rejected</div>
        </div>
        <p>{{ event.description }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import BannerComponent from "../Layout/Components/BannerComponent.vue";

export default defineComponent({
  name: "HomePage",
  data() {
    const timelineData = [
      {
        title: "2025",
        description:
          "Lorem ipsum dolor sit amet, quo ei simul congue exerci, ad nec admodum perfecto mnesarchum, vim ea mazim fierent detracto. Ea quis iuvaret expetendis his, te elit voluptua dignissim per, habeo iusto primis ea eam.",
      },
      {
        title: "2024",
        description:
          "Lorem ipsum dolor sit amet, quo ei simul congue exerci, ad nec admodum perfecto mnesarchum, vim ea mazim fierent detracto. Ea quis iuvaret expetendis his, te elit voluptua dignissim per, habeo iusto primis ea eam.",
      },
      {
        title: "2023",
        description:
          "Lorem ipsum dolor sit amet, quo ei simul congue exerci, ad nec admodum perfecto mnesarchum, vim ea mazim fierent detracto. Ea quis iuvaret expetendis his, te elit voluptua dignissim per, habeo iusto primis ea eam.",
      },
      {
        title: "2022",
        description:
          "Lorem ipsum dolor sit amet, quo ei simul congue exerci, ad nec admodum perfecto mnesarchum, vim ea mazim fierent detracto. Ea quis iuvaret expetendis his, te elit voluptua dignissim per, habeo iusto primis ea eam.",
      },
      {
        title: "2021",
        description:
          "Lorem ipsum dolor sit amet, quo ei simul congue exerci, ad nec admodum perfecto mnesarchum, vim ea mazim fierent detracto. Ea quis iuvaret expetendis his, te elit voluptua dignissim per, habeo iusto primis ea eam.",
      },
      {
        title: "2020",
        description:
          "Lorem ipsum dolor sit amet, quo ei simul congue exerci, ad nec admodum perfecto mnesarchum, vim ea mazim fierent detracto. Ea quis iuvaret expetendis his, te elit voluptua dignissim per, habeo iusto primis ea eam.",
      },
      {
        title: "2019",
        description:
          "Lorem ipsum dolor sit amet, quo ei simul congue exerci, ad nec admodum perfecto mnesarchum, vim ea mazim fierent detracto. Ea quis iuvaret expetendis his, te elit voluptua dignissim per, habeo iusto primis ea eam.",
      },
      {
        title: "2018",
        description:
          "Lorem ipsum dolor sit amet, quo ei simul congue exerci, ad nec admodum perfecto mnesarchum, vim ea mazim fierent detracto. Ea quis iuvaret expetendis his, te elit voluptua dignissim per, habeo iusto primis ea eam.",
      },
      {
        title: "2017",
        description:
          "Lorem ipsum dolor sit amet, quo ei simul congue exerci, ad nec admodum perfecto mnesarchum, vim ea mazim fierent detracto. Ea quis iuvaret expetendis his, te elit voluptua dignissim per, habeo iusto primis ea eam.",
      },
      {
        title: "2016",
        description:
          "Lorem ipsum dolor sit amet, quo ei simul congue exerci, ad nec admodum perfecto mnesarchum, vim ea mazim fierent detracto. Ea quis iuvaret expetendis his, te elit voluptua dignissim per, habeo iusto primis ea eam.",
      },
      {
        title: "2015",
        description:
          "Lorem ipsum dolor sit amet, quo ei simul congue exerci, ad nec admodum perfecto mnesarchum, vim ea mazim fierent detracto. Ea quis iuvaret expetendis his, te elit voluptua dignissim per, habeo iusto primis ea eam.",
      },
      {
        title: "2014",
        description:
          "Lorem ipsum dolor sit amet, quo ei simul congue exerci, ad nec admodum perfecto mnesarchum, vim ea mazim fierent detracto. Ea quis iuvaret expetendis his, te elit voluptua dignissim per, habeo iusto primis ea eam.",
      },
      {
        title: "2013",
        description:
          "Lorem ipsum dolor sit amet, quo ei simul congue exerci, ad nec admodum perfecto mnesarchum, vim ea mazim fierent detracto. Ea quis iuvaret expetendis his, te elit voluptua dignissim per, habeo iusto primis ea eam.",
      },
      {
        title: "2012",
        description:
          "Lorem ipsum dolor sit amet, quo ei simul congue exerci, ad nec admodum perfecto mnesarchum, vim ea mazim fierent detracto. Ea quis iuvaret expetendis his, te elit voluptua dignissim per, habeo iusto primis ea eam.",
      },
      {
        title: "2011",
        description:
          "Lorem ipsum dolor sit amet, quo ei simul congue exerci, ad nec admodum perfecto mnesarchum, vim ea mazim fierent detracto. Ea quis iuvaret expetendis his, te elit voluptua dignissim per, habeo iusto primis ea eam.",
      },
      {
        title: "2010",
        description:
          "Lorem ipsum dolor sit amet, quo ei simul congue exerci, ad nec admodum perfecto mnesarchum, vim ea mazim fierent detracto. Ea quis iuvaret expetendis his, te elit voluptua dignissim per, habeo iusto primis ea eam.",
      },
      {
        title: "2009",
        description:
          "Lorem ipsum dolor sit amet, quo ei simul congue exerci, ad nec admodum perfecto mnesarchum, vim ea mazim fierent detracto. Ea quis iuvaret expetendis his, te elit voluptua dignissim per, habeo iusto primis ea eam.",
      },
      {
        title: "2008",
        description:
          "Lorem ipsum dolor sit amet, quo ei simul congue exerci, ad nec admodum perfecto mnesarchum, vim ea mazim fierent detracto. Ea quis iuvaret expetendis his, te elit voluptua dignissim per, habeo iusto primis ea eam.",
      },
      {
        title: "2007",
        description:
          "Lorem ipsum dolor sit amet, quo ei simul congue exerci, ad nec admodum perfecto mnesarchum, vim ea mazim fierent detracto. Ea quis iuvaret expetendis his, te elit voluptua dignissim per, habeo iusto primis ea eam.",
      },
      {
        title: "2006",
        description:
          "Lorem ipsum dolor sit amet, quo ei simul congue exerci, ad nec admodum perfecto mnesarchum, vim ea mazim fierent detracto. Ea quis iuvaret expetendis his, te elit voluptua dignissim per, habeo iusto primis ea eam.",
      },
      {
        title: "2005",
        description:
          "Lorem ipsum dolor sit amet, quo ei simul congue exerci, ad nec admodum perfecto mnesarchum, vim ea mazim fierent detracto. Ea quis iuvaret expetendis his, te elit voluptua dignissim per, habeo iusto primis ea eam.",
      },
      {
        title: "2004",
        description:
          "Lorem ipsum dolor sit amet, quo ei simul congue exerci, ad nec admodum perfecto mnesarchum, vim ea mazim fierent detracto. Ea quis iuvaret expetendis his, te elit voluptua dignissim per, habeo iusto primis ea eam.",
      },
      {
        title: "2003",
        description:
          "Lorem ipsum dolor sit amet, quo ei simul congue exerci, ad nec admodum perfecto mnesarchum, vim ea mazim fierent detracto. Ea quis iuvaret expetendis his, te elit voluptua dignissim per, habeo iusto primis ea eam.",
      },
      {
        title: "2002",
        description:
          "Lorem ipsum dolor sit amet, quo ei simul congue exerci, ad nec admodum perfecto mnesarchum, vim ea mazim fierent detracto. Ea quis iuvaret expetendis his, te elit voluptua dignissim per, habeo iusto primis ea eam.",
      },
      {
        title: "2001",
        description:
          "Lorem ipsum dolor sit amet, quo ei simul congue exerci, ad nec admodum perfecto mnesarchum, vim ea mazim fierent detracto. Ea quis iuvaret expetendis his, te elit voluptua dignissim per, habeo iusto primis ea eam.",
      },
      {
        title: "2000",
        description:
          "Lorem ipsum dolor sit amet, quo ei simul congue exerci, ad nec admodum perfecto mnesarchum, vim ea mazim fierent detracto. Ea quis iuvaret expetendis his, te elit voluptua dignissim per, habeo iusto primis ea eam.",
      },
      {
        title: "1999",
        description:
          "Lorem ipsum dolor sit amet, quo ei simul congue exerci, ad nec admodum perfecto mnesarchum, vim ea mazim fierent detracto. Ea quis iuvaret expetendis his, te elit voluptua dignissim per, habeo iusto primis ea eam.",
      },
      {
        title: "1998",
        description:
          "Lorem ipsum dolor sit amet, quo ei simul congue exerci, ad nec admodum perfecto mnesarchum, vim ea mazim fierent detracto. Ea quis iuvaret expetendis his, te elit voluptua dignissim per, habeo iusto primis ea eam.",
      },
    ];
    return {
      timelineData,
    };
  },
  components: {
    BannerComponent,
  },
});
</script>

<style scoped>
.dark .timeline::after {
  background-color: #333;
  color: #fafbfc;
}
.dark .timeline-content {
  background-color: #333;
  color: #fafbfc;
}
.dark .timeline-container::after {
  background-color: #333;
}
.dark .left::before {
  border: medium solid #333;
  border-width: 10px 0 10px 10px;
  border-color: transparent transparent transparent #333;
}

.dark .right::before {
  border: medium solid #333;
  border-width: 10px 10px 10px 0;
  border-color: transparent #333 transparent transparent;
}
.timeline {
  position: relative;
}

/* The actual timeline (the vertical ruler) */
.timeline::after {
  content: "";
  position: absolute;
  width: 6px;
  background-color: white;
  top: 0;
  bottom: 0;
  left: 50%;
  margin-left: -3px;
}

/* Container around content */
.timeline-container {
  padding: 10px 30px;
  position: relative;
  background-color: inherit;
  width: 50%;
  min-width: 300px;
}

/* The circles on the timeline */
.timeline-container::after {
  content: "";
  position: absolute;
  width: 25px;
  height: 25px;
  right: -13px;
  background-color: white;
  border: 4px solid red;
  top: 15px;
  border-radius: 50%;
  z-index: 1;
  animation: cd-bounce 0.8s;
}

/* Place the container to the right */
.right {
  left: 50%;
}

.timeline-title {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.timeline-container.left .timeline-title {
  flex-direction: row-reverse;
}

.timeline-container.right .timeline-title {
  flex-direction: row;
}

@keyframes slice-in-left {
  0% {
    opacity: 0;
    transform: translateX(-50px);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slice-in-right {
  0% {
    opacity: 0;
    transform: translateX(50px);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
}

.timeline-container.left::before,
.timeline-container.left .timeline-content {
  animation: slice-in-left 0.6s ease forwards;
  opacity: 0;
}

.timeline-container.right::before,
.timeline-container.right .timeline-content {
  animation: slice-in-right 0.6s ease forwards;
  opacity: 0;
}
/* Add arrows to the left container (pointing right) */
.left::before {
  content: " ";
  height: 0;
  position: absolute;
  top: 22px;
  width: 0;
  z-index: 1;
  right: 20px;
  border: medium solid white;
  border-width: 10px 0 10px 10px;
  border-color: transparent transparent transparent white;
}

/* Add arrows to the right container (pointing left) */
.right::before {
  content: " ";
  height: 0;
  position: absolute;
  top: 22px;
  width: 0;
  z-index: 1;
  left: 20px;
  border: medium solid white;
  border-width: 10px 10px 10px 0;
  border-color: transparent white transparent transparent;
}

/* Fix the circle for containers on the right side */
.right::after {
  left: -13px;
}

/* The actual content */
.timeline-content {
  padding: 10px 10px;
  background-color: white;
  position: relative;
  border-radius: 6px;
}

/* Media queries - Responsive timeline on screens less than 600px wide */
@media screen and (max-width: 800px) {
  /* Place the timelime to the left */
  .timeline::after {
    left: 31px;
  }

  /* Full-width containers */
  .timeline-container {
    width: 100%;
    padding-left: 70px;
    padding-right: 25px;
  }

  /* Make sure that all arrows are pointing leftwards */
  .timeline-container::before {
    left: 60px;
    border: medium solid white;
    border-width: 10px 10px 10px 0;
    border-color: transparent white transparent transparent;
  }

  /* Make sure all circles are at the same spot */
  .left::after,
  .right::after {
    left: 15px;
  }

  /* Make all right containers behave like the left ones */
  .right {
    left: 0%;
  }
  .timeline-container.left .timeline-title {
    flex-direction: row;
  }

  .left::before {
    content: " ";
    height: 0;
    position: absolute;
    top: 22px;
    width: 0;
    z-index: 1;
    right: 20px;
    border: medium solid white;
    border-width: 10px 10px 10px 0;
    border-color: transparent white transparent transparent;
  }
  .dark .left::before {
    content: " ";
    height: 0;
    position: absolute;
    top: 22px;
    width: 0;
    z-index: 1;
    right: 20px;
    border: medium solid #333;
    border-width: 10px 10px 10px 0;
    border-color: transparent #333 transparent transparent;
  }
}

@keyframes cd-bounce {
  0% {
    opacity: 0;
    transform: scale(0.5);
  }
  60% {
    opacity: 1;
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
}
</style>
