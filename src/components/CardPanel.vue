<template>
  <div class="card-panel">

    <div class="row">
      <div class="col s7">
        <div class="people-header layout vertical flex">
          <a class="username" href="detail.html">
            <span>Bob</span>
            <span class="lastname">Dylan</span>
          </a>
        </div>
        <div class="people-data">
          <div class="">
            <img src="~images/md-email.svg">
            <span>bobo@soc.com</span>
          </div>
          <div class="">
            <img src="~images/md-phone.svg">
            <span>0949494994</span>
          </div>
        </div>
        <div class="">
          <div class="">
            <span class="label">Manager: </span>
            <span>Paul</span>
          </div>
          <div class="">
            <span class="label">Location: </span>
            <span>Paris</span>
          </div>
        </div>
      </div>
      <div class="col s5">
        <img class="picture" src="https://randomuser.me/portraits/men/59.jpg">
        <img class="icon" src="~images/md-map.svg">
        <a href="edit.html"><i class="icon material-icons">mode_edit</i></a>
        <a href="list.html"><i class="icon material-icons">delete</i></a>
      </div>
    </div>

    <div v-if="full" class="skills">
      <h3>Skills</h3>
      <a class="btn-large">JS</a>
      <a class="btn-large">HTML5</a>
      <a class="btn-large">CSS3</a>
    </div>

    <div v-if="full" class="links row">
      <img src="~images/md-twitter.svg">
      <img src="~images/md-slack.svg">
      <img src="~images/md-github.svg">
      <img src="~images/md-linkedin.svg">
    </div>

  </div>
</template>

<script>
export default {
  props: {
    full: {
      type: [String, Boolean],
      default: false
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
