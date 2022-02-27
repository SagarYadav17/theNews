<template>
  <div>
    <div class="flex flex-col justify-between md:flex-row">
      <a :href="article.url" target="_blank" class="w-full mb-2 text-lg font-medium md:text-xl text-gray-100">{{ article.title }}</a>
      <p class="w-32 text-left text-gray-500 md:text-right md:mb-0">
        {{ article.source }}
      </p>
    </div>
    <p class="text-gray-400">
      {{ article.description }}
    </p>
    <hr class="my-2" />
  </div>
</template>

<script>
export default {
  name: "ArticleCard",
  props: ["article"],
};
</script>
