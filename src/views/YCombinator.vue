<template>
  <Header />

  <main v-if="!loading">
    <div class="flex flex-col items-start justify-center px-8 max-w-4xl mx-auto mt-5 mb-16">
      <a class="w-full">
        <div v-for="story in stories" v-bind:key="story" class="w-full mb-8">
          <div class="flex flex-col justify-between md:flex-row">
            <a :href="story.url" target="_blank" rel="noopener noreferrer" class="w-full mb-2 text-lg font-medium md:text-xl text-gray-100">{{ story.title }}</a>
            <p class="w-32 mb-4 text-left text-gray-500 md:text-right md:mb-0">{{ story.by }}</p>
          </div>
        </div>
      </a>
    </div>
  </main>

  <main v-else class="flex flex-col align-center justify-center text-center">
    <div class="text-gray-500 text-3xl mt-10 mb-6">Fetching Data</div>
  </main>
</template>

<script>
import Header from "@/components/Header";
import axios from "axios";

export default {
  name: "YCombinator",
  components: { Header },
  data() {
    return {
      loading: true,
      stories_ids: [],
      stories: [],
      start_number: 0,
      end_number: 20,
    };
  },

  methods: {
    async fetchStories(ids) {
      ids.forEach((id) => {
        axios.get(`https://hacker-news.firebaseio.com/v0/item/${id}.json`).then((response) => {
          this.stories.push(response.data);
        });
      });
    },
  },

  async created() {
    document.title = "YCombinator Stories | theNews";
    const stories = await axios.get("https://hacker-news.firebaseio.com/v0/topstories.json");
    this.stories_ids = stories.data;
    this.fetchStories(this.stories_ids.slice(this.start_number, this.end_number));
    this.start_number += 20;
    this.end_number += 20;
    this.loading = false;

    window.onscroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        this.fetchStories(this.stories_ids.slice(this.start_number, this.end_number));
        this.start_number += 20;
        this.end_number += 20;
      }
    };
  },
};
</script>
