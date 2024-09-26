<template>
    <div class="d-flex">
        <div class="header-btn-lg pr-0">
            <div class="widget-content p-0">
                <div class="widget-content-wrapper">
                    <div class="widget-content-left">
                        <div class="dropdown">
                            <button class="btn p-0 mr-2 dropdown-toggle" type="button" id="dropdownMenuButton"
                                aria-haspopup="true" aria-expanded="false">
                                <div class="icon-wrapper icon-wrapper-alt rounded-circle">
                                    <img width="40" class="rounded-circle" src="@/assets/images/avatars/0.jpg" alt="">
                                </div>
                            </button>
                            <div class="dropdown-menu dropdown-menu-lg" aria-labelledby="dropdownMenuButton">
                                <button class="dropdown-item" type="button">Profile</button>
                                <button class="dropdown-item" type="button">Menus</button>
                                <button class="dropdown-item" type="button">Settings</button>
                                <h6 class="dropdown-header">Header</h6>
                                <button class="dropdown-item" type="button">Actions</button>
                                <div class="dropdown-divider"></div>
                                <button class="dropdown-item" type="button">Dividers</button>
                                <div class="dropdown-divider"></div>
                                <button class="dropdown-item" type="button">Logout</button>
                            </div>
                        </div>
                    </div>
                    <div class="widget-content-left ml-3 header-user-info">
                        <div class="widget-heading">Joshua Trinh</div>
                        <div class="widget-subheading">Admin</div>
                    </div>
                    <div class="widget-content-right header-user-info ml-3">
                        <div class="btn-shadow p-1">
                            <button class="btn btn-primary btn-sm" @click="handleLogout">Logout</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';
import { logout } from '../../../supabase/authService';

export default defineComponent({
    setup() {
        const router = useRouter();

        const handleLogout = async () => {
            const confirmed = window.confirm('Are you sure you want to log out?');
            if (confirmed) {
                try {
                    const { error } = await logout();
                    if (error) {
                        console.error('Logout error:', error);
                    } else {
                        router.push("/admin/login");
                    }
                } catch (err) {
                    console.error('Unexpected error:', err);
                }
            }
        };

        return {
            handleLogout,
        };
    }
});
</script>