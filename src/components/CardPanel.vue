<template>
  <div class="card-panel">

    <div class="row">
      <div class="col s7">
        <div class="people-header layout vertical flex">
          <router-link class="username" :to="profileLink">
            <span>{{ person.firstname }}</span>
            <span class="lastname">{{ person.lastname }}</span>
          </router-link>
        </div>
        <div class="people-data">
          <div class="">
            <img src="~images/md-email.svg">
            <span>{{ person.email }}</span>
          </div>
          <div class="">
            <img src="~images/md-phone.svg">
            <span>{{ person.phone }}</span>
          </div>
        </div>
        <div class="">
          <div class="">
            <span class="label">Manager: </span>
            <span>{{ person.manager }}</span>
          </div>
          <div class="">
            <span class="label">Location: </span>
            <span>{{ person.location }}</span>
          </div>
        </div>
      </div>
      <div class="col s5">
        <img class="picture" :src="person.photo">
        <img class="icon" src="~images/md-map.svg">
        <router-link :to="editProfileLink"><i class="icon material-icons">mode_edit</i></router-link>
        <router-link :to="editProfileLink"><i class="icon material-icons">delete</i></router-link>
      </div>
    </div>

    <div v-if="full" class="skills">
      <h3>Skills</h3>
      <a class="btn-large"
         v-for="skill in person.skills"
      >{{ skill }}</a>
    </div>

    <div v-if="full" class="links row">
      <a v-for="link, service in person.links"
         :href="link"
      >
        <img :src="imageForLink(service)">
      </a>
    </div>

  </div>
</template>

<script>
export default {
  props: {
    person: Object,
    full: {
      type: [String, Boolean],
      default: false
    }
  },
  computed: {
    editProfileLink () {
      return {
        name: 'profile-edit',
        params: {
          id: this.person.id
        }
      }
    },
    profileLink () {
      return {
        name: 'profile',
        params: {
          id: this.person.id
        }
      }
    }
  },
  methods: {
    imageForLink (service) {
      return require(`images/md-${service}.svg`)
    }
  }
}
</script>

<style>
.card-panel {
  padding: 10px;
  margin: 10px !important;
}

.username {
  color: #337ab7;
  font-size: 24px;
  font-weight: 400;
}

.lastname {
  text-transform: uppercase;
}

.people-data {
  padding-top: 30px;
}

.people-data a {
  padding-left: 10px;

}

.picture {
  border: 10px solid #F1F1F1;
}

.icon {
  color: black;
  width: 24px;
  height: 24px;
  margin-left: 10px;
}

.item {
  font-weight: bold;
}

.skills {
  padding: 10px;
  background-color: #FAFAFA;
}

.skills h3 {
  font-size: 24px;
  font-weight: normal;
  line-height: 1.1;
}

.skills a {
  background-color: white;
  color: #000;
  margin: 5px;
}

.links{
  text-align: center;
}

.links img{
  padding:0 5px;
}
</style>
