<template>
  <Header />

  <main v-if="!loading">
    <div class="flex flex-col items-start justify-center max-w-2xl mx-auto mt-5 mb-16">
      <a class="w-full">
        <div v-for="post in stories" v-bind:key="post" class="w-full mb-8">
          <div class="flex flex-col justify-between md:flex-row">
            <a :href="post.url" target="_blank" rel="noopener noreferrer" class="w-full mb-2 text-lg font-medium md:text-xl text-gray-100">{{ post.title }}</a>
            <p class="w-32 mb-4 text-left text-gray-500 md:text-right md:mb-0">{{ post.by }}</p>
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
    };
  },

  methods: {},

  async created() {
    document.title = "YCombinator Stories | theNews";
    const stories = await axios.get("https://hacker-news.firebaseio.com/v0/topstories.json");
    this.stories_ids = stories.data;
    this.stories_ids.forEach((id) => {
      axios
        .get(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
        .then((response) => {
          this.stories.push(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    });
    this.loading = false;
  },
};
</script>
