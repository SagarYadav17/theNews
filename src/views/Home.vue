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
      title: "theNews",
      loading: true,
      news: [],
      nextURL: null,
      categoryList: ["Technology", "Science", "Entertainment"],
    };
  },
  methods: {
    async fetchNews() {
      const response = await axios.get("https://sagaryadav17.herokuapp.com/news/news/");
      return response.data;
    },

    // Fetch News on the basis of category
    async fetchCategoryNews(categoryName = String) {
      document.title = `${categoryName[0].toUpperCase() + categoryName.substring(1)} | theNews`;
      this.loading = true;
      const response = await axios.get("https://sagaryadav17.herokuapp.com/news/news/?category=" + categoryName);
      this.news = response.data.results;
      this.nextURL = response.data.next;
      this.loading = false;
    },

    // Load more news
    async fetchNextNews(url = String) {
      const response = await axios.get(url);
      this.news.push(...response.data.results);
      this.nextURL = response.data.next;
    },

    handleScroll() {
      if (window.scrollY + window.innerHeight >= document.body.scrollHeight) {
        this.fetchNextNews(this.nextURL);
      }
    },
  },

  created() {
    document.title = this.title;
  },

  async mounted() {
    const data = await this.fetchNews();

    this.news = data.results;
    this.nextURL = data.next;
    this.loading = false;
    window.addEventListener("scroll", this.handleScroll);
  },
};
</script>
