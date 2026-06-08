<script>

export default {
    emits: ['joinedRoom'],

    data() {
        return {
            playerID: "",
            code: ""
        }
    },

    methods: {
        createRoom() {
            fetch(`https://playset-celibacy-myspace.ngrok-free.dev/api/rooms/create?maxPlayers=4&playerID=${this.playerID}`, {
                method: 'POST',
                headers: {
                    'ngrok-skip-browser-warning': 'true'
                }
            })
                .then(response => response.json())
                .then(data => {
                    this.$emit('joinedRoom', data.code, this.playerID, data.players)
                    console.log(data)
                })
        },

        joinRoom() {
            fetch(`https://playset-celibacy-myspace.ngrok-free.dev/api/rooms/${this.code}/join?playerID=${this.playerID}`, {
                method: 'POST',
                headers: {
                    'ngrok-skip-browser-warning': 'true'
                }
            })
                .then(response => {
                    if (response.ok) {
                        return fetch(`https://playset-celibacy-myspace.ngrok-free.dev/api/rooms/${this.code}`, {
                            headers: {
                                'ngrok-skip-browser-warning': 'true'
                            }
                        })
                    }
                })
                .then(response => response.json())
                .then(data => {
                    this.$emit('joinedRoom', this.code, this.playerID, data.players)
                    console.log(data)
                })
        }
    }
}
</script>

<template>
    <input type="text" placeholder="Insert UserName" v-model="playerID">
    <button v-on:click="createRoom" id="CRButton"></button>

    <input type="text" placeholder="Enter room code" v-model="code">
    <button v-on:click="joinRoom" id="CRButton"></button>
</template>

<style>
#CRButton {
    width: 50px;
    height: 50px;
}
</style>