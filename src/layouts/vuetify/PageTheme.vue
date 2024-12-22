<template>
  <!-- Page Heading -->
  <div class="d-sm-flex align-items-center justify-content-between mb-4">
    <h1 class="h3 mb-0 text-gray-800 capitalize-first"><slot name="title"></slot></h1>
    <slot name="nextToTitle"></slot>
  </div>
  <slot name="default"></slot>
</template>
