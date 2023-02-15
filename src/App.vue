<script setup lang="ts">
import Home from './components/Home.vue'
</script>

<template>
<div class="panel flex-row flex-1">
    <header>
    </header>

    <main>
        <Home msg="You did it!"/>
    </main>
</div>

</template>

<style scoped>
  
header {
  line-height: 1.5;
    
}
.panel{
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 1;
    /* padding: 10px; */
}
.logo {
  display: block;
  /* margin: 0 auto 2rem; */
}

@media (min-width: 1024px) {
  header {
    display: flex;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

   .wrapper {
    display: flex;
    flex-wrap: wrap;
  }
}
</style>
