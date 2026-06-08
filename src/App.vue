<script>
import Game from './components/Game.vue';
import Lobby from './components/Lobby.vue';

export default {
  components: { Game, Lobby},

  data() {
    return {
      currentScreen: 'lobby',
      code: '',
      playerID: '',
      players: []
    }
  },

  methods: {
    joinRoom(code, playerID, players) {
      this.code = code
      this.playerID = playerID
      this.players = players
      this.currentScreen = 'game'
    }
  },

}
</script>

<template>
  <div id="header">
    <Lobby v-if="currentScreen === 'lobby'" @joinedRoom="joinRoom" />

    <Game v-if="currentScreen === 'game'" :code="code" :playerID="playerID" :players="players" />
  </div>
</template>

<style>
#header {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  margin: 0;
}
</style>