<template>
    <div class="d-flex h-100 justify-content-center align-items-center">
        <div class="col-md-8 mx-auto app-login-box">
            <div class="modal-dialog w-100 mx-auto">
                <div class="modal-content">
                    <div class="modal-body">
                        <div class="h5 modal-title text-center">
                            <h4 class="mt-2">
                                <div>LOGIN</div>
                                <span>Please sign in to your account below.</span>
                            </h4>
                        </div>

                        <!-- Email Input -->
                        <div class="form-group">
                            <label for="email">Email address</label>
                            <input type="email" class="form-control" id="email" v-model="email" required
                                placeholder="Enter email..." autocomplete="on" />
                            <small id="exampleInput1Help" class="form-text text-muted">We'll never share your
                                email with anyone else.</small>
                        </div>

                        <!-- Password Input -->
                        <div class="form-group">
                            <label for="password">Password</label>
                            <div class="input-group">
                                <input :type="isPasswordVisible ? 'text' : 'password'" class="form-control"
                                    id="password" v-model="password" required placeholder="Enter password..."
                                    autocomplete="on" />
                                <div class="input-group-append" @click="togglePasswordVisibility">
                                    <span class="input-group-text">
                                        <i class="pe-7s-look"></i>
                                    </span>
                                </div>
                            </div>
                        </div>

                        <!-- Checkbox -->
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" id="checkbox" name="check" />
                            <label class="form-check-label" for="checkbox">
                                Keep me logged in
                            </label>
                        </div>

                        <div class="divider"></div>

                        <!-- Sign Up Link -->
                        <h6 class="mb-0">
                            No account?
                            <a href="javascript:void(0);" class="text-primary">Sign Up Now</a>
                        </h6>
                    </div>

                    <!-- Footer with Actions -->
                    <div class="modal-footer clearfix">
                        <div class="float-left">
                            <a href="javascript:void(0);" class="btn-lg btn btn-link">Recover Password</a>
                        </div>
                        <div class="float-right">
                            <button class="btn btn-primary btn-lg" @click="handleLogin">
                                Login to Dashboard
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Footer Text -->
            <div class="text-center text-white opacity-8 mt-3">
                Copyright &copy; JoshuaTrinh 2019
            </div>
        </div>
    </div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';
import { login } from '@/supabase/authService';

export default defineComponent({
    name: 'LoginPage',

    setup() {
        const router = useRouter();
        const email = ref('');
        const password = ref('');
        const isPasswordVisible = ref(false);

        const togglePasswordVisibility = () => {
            isPasswordVisible.value = !isPasswordVisible.value;
        };

        const handleLogin = async () => {
            try {
                await login(email.value, password.value);
                router.push("/admin");
            } catch (err) {
                console.error('Unexpected error:', err);
            }
        };

        return {
            email,
            password,
            isPasswordVisible,
            togglePasswordVisibility,
            handleLogin
        };
    }
});
</script>