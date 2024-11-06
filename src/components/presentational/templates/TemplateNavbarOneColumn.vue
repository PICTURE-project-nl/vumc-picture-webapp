<template>
  <div>

    <ContainerNavigationBar />

    <div class="o-page-container">
      <div class="o-wrapper o-wrapper--extended">

        <slot></slot>

      </div>
    </div>

  </div>
</template>

<script>
  import { ContainerNavigationBar } from '@/components/container/general'

  export default {
    name: 'TemplateNavbarOneColumn',
    components: {
      ContainerNavigationBar
    }
  }
</script>
