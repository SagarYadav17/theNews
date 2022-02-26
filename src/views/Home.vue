<template>
  <Header />

  <main v-if="!loading">
    <div class="w-full flex flex-wrap bg-grey-light justify-center">
      <div v-for="category in categoryList" v-bind:key="category">
        <button
          v-on:click="fetchCategoryNews(category.toLowerCase())"
          class="bg-transparent hover:bg-blue-600 text-blue-500 font-semibold hover:text-white m-1 py-2 px-4 border border-blue-800 hover:border-transparent rounded">
          {{ category }}
        </button>
      </div>
      <a href="/y-combinator" class="bg-transparent hover:bg-blue-600 text-blue-500 font-semibold hover:text-white m-1 py-2 px-4 border border-blue-800 hover:border-transparent rounded"
        >Y Combinator</a
      >
    </div>
    <News :newsList="news" />
  </main>

  <main v-else class="flex flex-col align-center justify-center text-center">
    <div class="text-gray-500 text-3xl mt-10 mb-6">Fetching Data</div>
  </main>
</template>

<script>
import Header from "@/components/Header";
import News from "@/components/News";
import axios from "axios";

export default {
  name: "Home",
  components: { Header, News },
  data() {
    return {
      loading: true,
      news: [],
      nextURL: null,
      previousURL: null,
      categoryList: ["Technology", "Science", "Entertainment"],
    };
  },
  methods: {
    async fetchNews() {
      const response = await axios.get("https://sagaryadav17.herokuapp.com/news/news/");
      return response.data;
    },

    // Fetch News on the basis of category
    async fetchCategoryNews(categoryName) {
      this.loading = true;
      const response = await axios.get("https://sagaryadav17.herokuapp.com/news/news/?category=" + categoryName);

      this.news = response.data.results;
      this.nextURL = response.data.next;
      this.previousURL = response.data.previous;
      this.loading = false;
    },

    // Load more news
    async fetchNextNews(url) {
      const response = await axios.get(url);
      this.news.push(...response.data.results);
      this.nextURL = response.data.next;
      this.previousURL = response.data.previous;
    },
  },

  async created() {
    document.title = "theNews";
    const data = await this.fetchNews();

    this.news = data.results;
    this.nextURL = data.next;
    this.previousURL = data.previous;
    this.loading = false;

    window.onscroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        this.fetchNextNews(this.nextURL);
      }
    };
  },
};
</script>
