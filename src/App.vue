<template>
  <v-app id="inspire">
    <v-navigation-drawer app class="pt-4" color="grey lighten-3" mini-variant>
      <v-avatar
        v-for="n in 1"
        :key="n"
        :color="`grey ${n === 1 ? 'darken' : 'lighten'}-1`"
        :size="n === 1 ? 36 : 20"
        class="d-block text-center mx-auto mb-9"
      ></v-avatar>
      <v-list>
        <v-list-item
          v-for="(item, index) in itensNav"
          :key="index"
          :to="item.link"
        >
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";
import Vue from "vue";
import api from "./service/axios";

@Component
export default class Home extends Vue {
  private itensNav = [
    { title: "Home", icon: "mdi-home", link: "/" },
    { title: "Tabela", icon: "mdi-table", link: "/tabela" },
  ];
  created() {
    api.get("").then(({ data }) => {
      this.$store.dispatch("getLigas", data.data);
    });
  }
}
</script>
