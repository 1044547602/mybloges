<template>
  <div>
    <h1>登录</h1>
    <span>账号：</span>
    <el-input v-model="userid" size="medium" placeholder="请输入ID" class="userFrom"></el-input>
    <br />
    <br />
    <span>密码：</span>
    <el-input v-model="userpassword" size="medium" placeholder="请输入密码" class="userFrom"></el-input>
    <br />
    <br />
    <el-button type="primary" round @click="login(userid,userpassword)">登录</el-button>
    <router-link to="/Register" class="Goregister"><el-button type="primary" round> 前往注册</el-button></router-link> 
  </div>
</template>
<script>

export default {
  name: "Login",
  data() {
    return {
      userid: "",
      userpassword: "",
    };
  },
  methods: {
    login: function (userid, userpassword) {
      this.axios
        .post(
          "http://localhost:3000/api/login",
          {
            userId: userid,
            userPassword: userpassword,
          },
          { withCredentials: true }
        )
        .then(function (response) {
          
          console.log(response.data.massage=='处理成功')
          if(response.data.massage=='处理成功'){
         this.$router.push({ path: '/' })
          }
        }.bind(this))
        .catch(function (error) {
          console.log(error);
        });
    },
  },
};
</script>

<style >
.userFrom {
  width: 600px;
}
.el-input {
  width: 300px;
}
.el-button {
  width: 150px;
}
.Goregister{
text-decoration: none;
color:#fff;
margin-left: 5%;
}

</style>