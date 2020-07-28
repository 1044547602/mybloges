<template>
<div class="Register">

  
      <h1>注册</h1>
    <span>账号：</span> <el-input v-model="userid" size="medium" placeholder="请输入ID" class="userFrom"></el-input>
      <br>
     <span>昵称：</span> <el-input v-model="usernames" size="medium" placeholder="请输入昵称" class="userFrom"></el-input>
      <br>  
    <span>密码：</span> <el-input v-model="userpassword" size="medium" placeholder="请输入密码" class="userFrom"></el-input>
    <br>
   <span>性别：</span> <el-radio v-model=" usersex" label="男">男</el-radio>
        <el-radio v-model=" usersex" label="女">女</el-radio>
        <br>
    <el-button type="primary" round @click="register(userid,usernames,userpassword,usersex)">注册</el-button>
    <el-button type="primary" round >前往登录</el-button>


</div>
</template>

<script>

export default {
name: 'Register',
data() {
    return {
     userid: '',
     usernames:'',
     userpassword : '',
     usersex:'男'
    
    }
  },
methods:{
    register : function(userid,usernames,userpassword,usersex){
    this.axios.post('http://localhost:3000/api/register', {
    userId:userid,
    userName:usernames,
    userPassword:userpassword,
    userSex:usersex
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
    }
}
}
</script>

<style >

 .userFrom{
     width: 600px;
 }
.el-input{
  width: 300px;
}
.el-button{
  width: 150px;
}
</style>