<template>
    <div>
        <div class="h-100 bg-plum-plate bg-animation">
            <div class="d-flex h-100 justify-content-center align-items-center">
                <div class="col-md-8 mx-auto app-login-box">
                    <div class="modal-dialog w-100 mx-auto">
                        <div class="modal-content">
                            <div class="modal-body">
                                <div class="h5 modal-title text-center">
                                    <h4 class="mt-2">
                                        <div>Welcome back,</div>
                                        <span>Please sign in to your account below.</span>
                                    </h4>
                                </div>
                                <div class="form-group" id="exampleInputGroup1">
                                    <label for="email">Email address</label>
                                    <input type="email" class="form-control" id="email" v-model="email" required placeholder="Enter email...">
                                    <small id="exampleInput1Help" class="form-text text-muted">We'll never share your email with anyone else.</small>
                                </div>

                                <div class="form-group" id="exampleInputGroup2">
                                    <label for="password">Password</label>
                                    <input type="password" class="form-control" id="password" v-model="password" required placeholder="Enter password...">
                                </div>

                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" id="exampleCheck" name="check">
                                    <label class="form-check-label" for="exampleCheck">
                                        Keep me logged in
                                    </label>
                                </div>
                                <div class="divider"></div>
                                <h6 class="mb-0">
                                    No account?
                                    <a href="javascript:void(0);" class="text-primary">Sign up now</a>
                                </h6>
                            </div>
                            <div class="modal-footer clearfix">
                                <div class="float-left">
                                    <a href="javascript:void(0);" class="btn-lg btn btn-link">Recover
                                        Password</a>
                                </div>
                                <div class="float-right">
                                    <button class="btn btn-primary btn-lg" @click="handleLogin">Login to Dashboard</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="text-center text-white opacity-8 mt-3">
                        Copyright &copy; JoshuaTrinh 2019
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { signup } from "../../supabase/auth";

export default {
  data() {
    return {
      email: '',
      password: '',
      error: null,
    }
  },
  methods: {
    async handleLogin() {
    const { error } = await signup(this.email, this.password);
    if (error) {
      this.error = error;
    } else {
      this.error = null;
      this.$router.push('admin/dashboard');
    }
  },
  },
}
</script>