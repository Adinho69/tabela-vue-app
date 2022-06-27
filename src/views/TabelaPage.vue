
<template>
  <v-container>
    <v-row justify="center" align="start">
      <v-col md="3">
        <v-card>
          <v-card-title primary-title> Ligas </v-card-title>
          <v-list>
            <v-list-item
              v-for="(item, index) in $store.state.ligas"
              :key="index"
              @click="league(item.id, selectSeason)"
            >
              <span>
                <img :src="item.logos.light" height="30" width="30" />
              </span>
              {{ item.name }}
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
      <v-col justify="center" align="center" md="9">
        <v-card>
          <v-card-title primary-title> Tabela de Classificação </v-card-title>
          <v-spacer />
          <v-select
            class="select"
            :items="season"
            v-model="selectSeason"
            label="Selecione a temporada"
            dense
            flat
          ></v-select>
          <v-data-table
            :headers="headers"
            :items="liga"
            :items-per-page="liga.length"
          >
            <template #[`item.team.logos`]="{ item }">
              <img
                :src="item.team.logos[0].href"
                height="30px"
                width="30px"
                class="pa-0"
              />
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";

import api from "@/service/axios";

@Component
export default class Home extends Vue {
  private loading = true;
  private liga: Array<object> = [];
  private season: Array<string> = ["2021", "2020", "2019", "2018", "2017"];
  private selectSeason = this.season[0];
  private id = "";

  created() {
    api.get("bra.1/standings?season=2021&sort=asc").then(({ data }) => {
      //console.log(this.liga);

      this.liga = data.data.standings;
      //console.log(this.liga);
      //console.log(this.$store.state.ligas);
    });
    this.league("bra.1", "2021");
  }

  headers = [
    {
      text: "Classificação",
      value: "stats[8].value",
      align: "center",
      sortable: false,
    },
    { text: "", value: "team.logos", width: "30px" },
    { text: "Times", value: "team.displayName" },
    { text: "Pontos", value: "stats[6].displayValue" },
    { text: "Pts jogadas", value: "stats[3].value" },
    { text: "Vitorias", value: "stats[0].value" },
    { text: "Derrotas", value: "stats[1].value" },
    { text: "Empates", value: "stats[2].value" },
    { text: "Gols marcados", value: "stats[4].value" },
    { text: "Gols sofridos", value: "stats[5].value" },
    { text: "Saldo de Gols", value: "stats[9].value" },
  ];

  private league(id: string, season: string): void {
    this.id = id;
    //console.log(this.id);
    api
      .get(`${this.id}/standings?season=${season}&sort=asc`)
      .then(({ data }) => {
        //console.log(this.liga);

        this.liga = data.data.standings;
        this.$forceUpdate();
      });
  }
  @Watch("selectSeason")
  selectSeasonChanged(newValue: string) {
    //console.log(newValue);
    //console.log(this.id);
    this.league(this.id, newValue);
  }
}
</script>
<style scoped>
.select {
  max-width: 15%;
}
</style>