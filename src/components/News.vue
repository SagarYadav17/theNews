<template>
  <div class="min-h-screen">
    <div class="flex flex-col items-start justify-center px-8 max-w-4xl mx-auto mt-5">
      <div class="w-full" v-for="news in newsList" v-bind:key="news.id">
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
