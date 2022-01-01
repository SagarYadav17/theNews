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
    </div>
    <News :newsList="news" />
  </main>

  <main v-else class="flex flex-col align-center justify-center text-center">
    <div class="text-gray-500 text-3xl mt-10 mb-6">Fetching Data</div>
  </main>

  <!-- Next and Previous buttons -->
  <ul v-if="!loading" class="w-full pb-4 flex flex-wrap bg-grey-light justify-center">
    <li v-if="previousURL" class="mx-1 px-3 py-2 bg-gray-200 text-gray-700 hover:bg-gray-700 hover:text-gray-200 rounded-lg">
      <button class="flex items-center font-bold" v-on:click="fetchNextNews(previousURL)">Previous</button>
    </li>
    <li v-if="nextURL" class="mx-1 px-3 py-2 bg-gray-200 text-gray-700 hover:bg-gray-700 hover:text-gray-200 rounded-lg">
      <button class="flex items-center font-bold" v-on:click="fetchNextNews(nextURL)">Next</button>
    </li>
  </ul>
  <!-- END Next and Previous buttons -->
</template>

<script>
import Header from "@/components/Header";
import News from "@/components/News";

export default {
  name: "Home",
  components: { Header, News },
  data() {
    return {
      loading: true,
      news: [],
      nextURL: null,
      previousURL: null,
      categoryList: ["Technology", "Sports", "Science", "Health", "General", "Entertainment", "Business", "Top"],
    };
  },
  methods: {
    async fetchNews() {
      const res = await fetch("https://sagaryadav17.herokuapp.com/news/news/");
      const data = await res.json();
      return data;
    },

    // Fetch News on the basis of category
    async fetchCategoryNews(categoryName) {
      this.loading = true;
      const res = await fetch("https://sagaryadav17.herokuapp.com/news/news/?category=" + categoryName);
      const data = await res.json();
      this.news = data.results;
      this.nextURL = data.next;
      this.previousURL = data.previous;
      this.loading = false;
    },

    // Fetch News on the basis of page number
    async fetchNextNews(url) {
      this.loading = true;
      const res = await fetch(url);
      const data = await res.json();
      this.news = data.results;
      this.nextURL = data.next;
      this.previousURL = data.previous;
      this.loading = false;
    },
  },

  async created() {
    document.title = "theNews";
    const data = await this.fetchNews();

    this.news = data.results;
    this.nextURL = data.next;
    this.previousURL = data.previous;
    this.loading = false;
  },
};
</script>
