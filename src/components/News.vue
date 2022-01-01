<template>
  <div class="min-h-screen">
    <div class="p-4 gap-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 select-none">
      <div v-for="news in newsList" v-bind:key="news.id">
        <ArticleCard :article="news" />
      </div>
    </div>
  </div>
</template>

<script>
import ArticleCard from "@/components/ArticleCard";
export default {
  name: "News",
  components: { ArticleCard },
  props: ["newsList"],
};
</script>
