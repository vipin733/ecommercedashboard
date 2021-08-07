<template>
<div>
    <!-- <div class="row">
      <div class="col-md-2"></div>
      <div class="col-md-8">
          <form @submit.prevent>
              <div class="row">
                  <div class="col-md-2"></div>
                  <div class="col-md-8">
                      <div class="row">
                          <div class="col-md-12">
                          <fg-input type="email"
                                  label="Username"
                                  placeholder="Email"
                                  v-model="user.email"
                                  v-validate="'required|email'"
                                  :class="{
                                    'form-control': true,
                                    'is-invalid': errors.has('email')
                                  }"
                                  name="email"
                                  >
                          </fg-input>
                          <span class="error" v-if="errors.has('email')">
                              {{errors.first("email")}}
                          </span>
                      </div>
                      <div class="col-md-12">
                          <fg-input type="password"
                                  label="password"
                                  placeholder="password"
                                  v-model="user.password"
                                    v-validate="'required'"
                                  :class="{
                                    'form-control': true,
                                    'is-invalid': errors.has('password')
                                  }"
                                  name="password"
                                  >
                          </fg-input>
                          <span class="error" v-if="errors.has('password')">
                              {{errors.first("password")}}
                          </span>
                      </div>
                      <div class="col-md-12">
                          <div class="text-center">
                              <p-button type="info"
                                          round
                                          @click.native.prevent="loginuser">
                                  Login
                              </p-button>
                          </div>
                      </div>
                      </div>
                  </div>
                  <div class="col-md-2"></div>

              </div>
          </form>
      </div>
       <div class="col-md-2"></div>
    </div> -->
    <div class="login-bg">
    <div class="login-container" id="container">
        <div class="form-container sign-up-container">
            <form action="#">
                <h1>Create Account</h1>
                <div class="social-container">
                    <a href="https://www.instagram.com/zaidirfankhan/?hl=en" target="_blank" class="social"><i class="fab fa-instagram"></i></a>
                    <a href="https://twitter.com/ZaidIrfanKhan" target="_blank" class="social"><i class="fab fa-twitter"></i></a>
                    <a href="https://www.linkedin.com/in/zaid-irfan-khan-9a4b964b/" target="_blank" class="social"><i class="fab fa-linkedin-in"></i></a>
                </div>
                <span>or use your email for registration</span>
                <input type="text" placeholder="Name"/>
                <input type="email" placeholder="Email"/>
                <input type="password" placeholder="Password"/>
                <button class="su" >Sign Up</button>
            </form>
        </div>
        <div class="form-container sign-in-container">
            
            <form @submit.prevent v-if="is_forgot">
                <div class="text-center">
                      <img src="/images/logo-1-2.png" width="200" alt="">
                </div>
                <h3>Forgot</h3>
                <fg-input type="email"
                  placeholder="Email"
                  v-model="user.email"
                  v-validate="'required|email'"
                  :class="{
                    '': true,
                    'is-invalid': errors.has('email')
                  }"
                  name="email"
                  >
                </fg-input>
                <span class="error" v-if="errors.has('email')">
                    {{errors.first("email")}}
                </span>

                <a href="#" @click.prevent="is_forgot = false"  style="color:#212121;">Login</a>
                <button class="si mt-3" @click="loginForgot">{{isLoging ? 'Submit...':  'Submit'}}</button>
            </form>

            <form @submit.prevent v-else>
                <div class="text-center">
                      <img src="/images/logo-1-2.png" width="200" alt="">
                    </div>
                <h3>Sign In</h3>
                <fg-input type="email"
                  placeholder="Email"
                  v-model="user.email"
                  v-validate="'required|email'"
                  :class="{
                    '': true,
                    'is-invalid': errors.has('email')
                  }"
                  name="email"
                  >
                </fg-input>
                <span class="error" v-if="errors.has('email')">
                    {{errors.first("email")}}
                </span>

                <fg-input type="password"
                  placeholder="password"
                  v-model="user.password"
                    v-validate="'required'"
                  :class="{
                    '': true,
                    'is-invalid': errors.has('password')
                  }"
                  name="password"
                  >
                </fg-input>
                <span class="error" v-if="errors.has('password')">
                    {{errors.first("password")}}
                </span>
                <a href="#" target="_blank" @click.prevent="is_forgot = true"  style="color:#212121;">I Forgot my Password</a>
                <button class="si mt-3" @click="loginuser">{{isLoging ? 'Sign In...': 'Sign In'}}</button>
            </form>

        </div><q></q>

        <div class="overlay-container">
            <div class="overlay">
                <div class="overlay-panel overlay-left">
                    <h1>Welcome Back!</h1>
                    <p>To Keep connected with us please login with your personal info</p>
                    <button class="ghost" id="signIn">Sign In</button>
                </div>
                <div class="overlay-panel overlay-right">
                    <img src="/images/login.svg" width="350" alt="">
                </div>
            </div>
        </div>

    </div>
    </div>
</div>
</template>
<script>

import errorMessage from '~/components/lib/errors'
export default {
  
    layout: 'login',
   data() {
    return {
        user: {
            email: "",
            password: ""
        },
        is_forgot: false,
        isLoging: false,
    };
  },

  methods: {

    async loginuser() {

        let validate = await this.$validator.validateAll()
        if(!validate){
          return  
        }
     
        if (this.isLoging) {
            return
        }

        this.isLoging= true

        this.$auth
        .loginWith('local', { data: this.user })
        .then(res => {
          this.isLoging = false
          let user = this.$auth.user
          window.location = '/dashboard'
          this.$router.push({ path: '/dashboard' })
        })
        .catch(err => {
          this.isLoging = false
          let errMsg = errorMessage(err.response)
          this.$swal('Oops!', errMsg, 'error')
          
        })
    },

    async loginForgot() {
        console.log("ffff");
        
        // let validate = await this.$validator.validateAll()
        // if(!validate){
        //   return  
        // }
     
        if (this.isLoging || !this.user.email) {
            return
        }
        this.isLoging= true
        try {
            await this.$axios.post('/forgot/password', {email: this.user.email})
            let errMsg = 'An email has been sent to your account to reset your password'
            this.$swal('Success', errMsg, 'success')
        } catch (error) {
            this.isLoging = false
            let errMsg = errorMessage(error.response)
            this.$swal('Oops!', errMsg, 'error')
        }
    }
  },
  auth: false,
   mounted() {
    if (this.$auth.loggedIn) this.$router.push({ path: '/dashboard' })
  }

};
</script>
<style>
.form-group{
  width: 100%;
}
.login-bg{
  background-image: linear-gradient(-27deg, #005AFF 0%, #012A76 100%);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    /* margin: -20px 0 50px; */
}
.login-container{
    background: #fff;
    border-radius: 10px;
    box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
    position: relative;
    overflow: hidden;
    width: 768px;
    max-width: 100%;
    min-height: 480px;
}
.form-container form{
    background: #fff;
    display: flex;
    flex-direction: column;
    padding: 0 50px;
    height: 100%;
    justify-content: center;
    text-align: center;
    align-items: center;
}
.social-container{
    margin: 20px 0;
}
.social-container a{
    border: 1px solid #ddd;
    border-radius: 50%;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    margin: 0 5px;
    height: 40px;
    width: 40px;
}
.form-container input{
    background: #eee;
    border: none;
    padding: 12px 15px;
    margin: 8px 0;
    width: 100%;
}
button{
    border-radius: 20px;
    border: 1px solid #f3f3f3;
    background: #23bebe;
    color: #fff;
    font-size: 12px;
    font-weight: bold;
    padding: 12px 45px;
    letter-spacing: 1px;
    text-transform: uppercase;
    transition: transform 80ms ease-in;
}
button:active{
    transform: scale(0.95);
}
button:focus{
    outline: none;
}
button.ghost{
    background: transparent;
    border-color: #fff;
}
.si{
    background-color: #da0000;
}
.su{
    background-color: rgb(235, 201, 13);
}
.form-container{
    position: absolute;
    top: 0;
    height: 100%;
    transition: all 0.6s ease-in-out;
}

.sign-in-container{
    left: 0;
    width: 50%;
    z-index: 2;
}
.sign-up-container{
    left: 0;
    width: 50%;
    opacity: 0;
    z-index: 1;  
}
.overlay-container{
    position: absolute;
    top: 0;
    left: 50%;
    width: 50%;
    height: 100%;
    overflow: hidden;
    transition: transform 0.6s ease-in-out;
    z-index: 100;
}
.overlay{
    background: #ffffff;
    /* background: linear-gradient(to right, #ebd511, #d20afa) no-repeat 0 0 / cover; */
    color: #fff;
    position: relative;
    left: -100%;
    height: 100%;
    width: 200%;
    transform: translateX(0) ;
    transition: transform 0.6s ease-in-out;
}
.overlay-panel{
    position: absolute;
    top: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
     align-items: center; 
    padding: 0 40px;
    height: 100%;
    width: 50%;
    text-align: center;
    transform: translateX(0);
    transition: transform 0.6s ease-in-out;
}

.overlay-right{
    right: 0;
    transform: translateX(0);
}
 .overlay-left{ 
    transform: translateX(-20%);
}

/* Animation */

/* Move signin to the right */
.login-container.right-panel-active .sign-in-container{
    transform: translateX(100%);
}
/* Move overlay */
.login-container.right-panel-active .overlay-container{
    transform: translateX(-100%);
}
/* Sign up over Sign In */
.login-container.right-panel-active .sign-up-container{
    transform: translateX(100%);
    opacity: 1;
    z-index: 5;
}
/* Overlay Back to right */
.login-container.right-panel-active .overlay{
    transform: translateX(50%);
}
.login-container.right-panel-active .overlay-left{
    transform: translateX(0);
}
.login-container.right-panel-active .overlay-right{
    transform: translateX(20%);
}
</style>
