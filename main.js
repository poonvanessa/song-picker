Vue.component('song', {
    props: {
        name: {
            type: String,
            required: true,
        },
        singer: {
            type: String,
            required: true,
        },
        link: {
            type: String,
            required: false,
        },
    },
    // data must be a function while defining in a component
    data: function() {
        return {
            likes: 0,
        }
    },
    template: `<div class="song-wrapper" :key="name">
<h2>{{ title }}</h2>
<ul>
    <li>Link: <a v-if="link" :href="link">{{ link }}</a><span v-else>-</span></li>
    <li>Likes: {{ likes }}</li>
</ul>
<button @click="addLike">Like</button>
</div>`,
    methods: {
        addLike() {
            this.likes += 1
            this.$emit('add-like', 1)
        }
    },
    // uses cache, more efficient than methods
    computed: {
        title() {
            return this.name + ' - ' + this.singer
        }
    }
})
Vue.component('new-song', {
    template: `<div class="song-wrapper">
    <h2>Add a New Song</h2>
    <form class="song-form" @submit.prevent="onSubmit">
        <div class="song-formInput">
            <label for="name">Name</label>
            <input id="name" v-model="name">
        </div>
        <div class="song-formInput">
            <label for="singer">Singer</label>
            <input id="singer" v-model="singer">
        </div>
        <div class="song-formInput">
            <label for="link">Link</label>
            <input id="link" v-model="link">
        </div>
        <input type="submit" value="Submit">
    </form>
</div>`,
    data() {
        return {
            name: null,
            singer: null,
            link: null,
        }
    },
    methods: {
        onSubmit() {
            let newSong = {
                name: this.name,
                singer: this.singer,
                link: this.link
            }
            this.$emit('add-new-song', newSong)
            this.name = null
            this.singer = null
            this.link = null
        }
    }
})
var app = new Vue({
    el: '#app',
    data: {
        title: 'Song Picker',
        votes: 0,
        songs: [{
                name: '天使と悪魔',
                singer: '世界の終わり',
                link: 'https://youtu.be/hVFY4Yvv3ho',
            },
            {
                name: 'マリーゴールド',
                singer: 'あいみょん',
                link: 'https://youtu.be/0xSiBpUdW4E'
            },
            {
                name: '帰り道',
                singer: 'ＯＡＵ',
                link: 'https://youtu.be/-HJpWz8O97Y',
            },
            {
                name: '香水',
                singer: '瑛人',
                link: 'https://youtu.be/9MjAJSoaoSo',
            },
            {
                name: '別の人の彼女になったよ',
                singer: 'wacci',
            }
        ]
    },
    methods: {
        addVotes(like) {
            this.votes += like
        },
        addSong(song) {
            this.songs.unshift(song)
        }
    }
})