<template>
  <div class="panel panel-white post panel-shadow">
    <div class="post-footer">
      <div class="input-group">
        <input class="form-control" placeholder="Add a comment" type="text" />
        <span class="input-group-addon">
          <a href="#"><i class="fa fa-edit"></i></a>
        </span>
      </div>
      <ul class="comments-list">
        <li class="comment">
          <a class="pull-left" href="#">
            <img
              class="avatar"
              src="http://bootdey.com/img/Content/user_1.jpg"
              alt="avatar"
            />
          </a>
          <div class="comment-body">
            <div class="comment-heading">
              <h4 class="user">Gavino Free</h4>
              <h5 class="time">5 minutes ago</h5>
            </div>
            <p>Sure, oooooooooooooooohhhhhhhhhhhhhhhh</p>
          </div>
          <ul class="comments-list">
            <li class="comment">
              <a class="pull-left" href="#">
                <img
                  class="avatar"
                  src="http://bootdey.com/img/Content/user_3.jpg"
                  alt="avatar"
                />
              </a>
              <div class="comment-body">
                <div class="comment-heading">
                  <h4 class="user">Ryan Haywood</h4>
                  <h5 class="time">3 minutes ago</h5>
                </div>
                <p>Relax my friend</p>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped src="@/assets/css/reply.css"></style>
