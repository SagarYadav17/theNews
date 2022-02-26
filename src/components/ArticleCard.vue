<template>
  <div class="w-full rounded-md shadow-md shadow-gray-200 hover:shadow-blue-400/80 hover:shadow-2xl bg-gray-800">
    <div class="p-4">
      <span class="text-blue-600 font-normal text-base">{{ article.source }}</span>
      <a :href="article.url" rel="noopener" target="_blank">
        <p class="cursor-pointer text-xl py-2 text-gray-300 hover:text-blue-600">
          {{ article.title }}
        </p>
      </a>
      <p class="font-light text-gray-400 text-justify line-clamp-3">
        {{ article.description }}
      </p>
      <div class="flex flex-wrap mt-10 space-x-4 align-bottom">
        <i class="text-gray-400 fas fa-newspaper p-2 bg-gray-800 rounded-full" />

        <div class="flex flex-col space-y-0">
          <p class="font-semibold text-base text-gray-400">
            {{ article.author }}
          </p>
          <p class="font-light text-sm text-gray-400">
            {{ article.publishedAt }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ArticleCard",
  props: ["article"],
};
</script>
