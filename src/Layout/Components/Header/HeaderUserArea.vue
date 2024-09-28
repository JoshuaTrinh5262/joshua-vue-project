<template>
    <div class="d-flex">
        <div class="header-btn-lg pr-0">
            <div class="widget-content p-0">
                <div class="widget-content-wrapper">
                    <div class="widget-content-left">
                        <div class="dropdown" :class="{ show: isDropdownOpen }" ref="dropdown">
                            <button class="btn p-0 mr-2 dropdown-toggle" type="button" id="dropdownMenuButton"
                                @click="toggleDropdown" aria-haspopup="true" aria-expanded="false">
                                <div class="icon-wrapper icon-wrapper-alt rounded-circle">
                                    <img width="40" class="rounded-circle" src="@/assets/images/avatars/0.jpg" alt="">
                                </div>
                            </button>
                            <div class="dropdown-menu dropdown-menu-lg" aria-labelledby="dropdownMenuButton">
                                <button class="dropdown-item" type="button">Profile</button>
                                <button class="dropdown-item" type="button">Menus</button>
                                <button class="dropdown-item" type="button">Setting</button>
                                <h6 class="dropdown-header">Header</h6>
                                <button class="dropdown-item" type="button">Actions</button>
                                <div class="dropdown-divider"></div>
                                <button class="dropdown-item" type="button">Dividers</button>
                                <div class="dropdown-divider"></div>
                                <button class="dropdown-item" type="button" @click="handleLogout">Logout</button>
                            </div>
                        </div>
                    </div>
                    <div class="widget-content-left ml-3 header-user-info">
                        <div class="widget-heading">Joshua Trinh</div>
                        <div class="widget-subheading">Admin</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { defineComponent, ref, onMounted, onBeforeUnmount} from 'vue';
import { useRouter } from 'vue-router';
import { logout } from '../../../supabase/authService';

export default defineComponent({
    setup() {
        const router = useRouter();
        const isDropdownOpen = ref(false);
        const dropdown = ref(null);

        const toggleDropdown = () => {
            isDropdownOpen.value = !isDropdownOpen.value;
        };
        const closeDropdown = () => {
            isDropdownOpen.value = false;
        };

        const handleClickOutside = (event) => {
            if (dropdown.value && !dropdown.value.contains(event.target)) {
                closeDropdown();
            }
        };

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

        onMounted(() => {
            document.addEventListener('click', handleClickOutside);
        });

        onBeforeUnmount(() => {
            document.removeEventListener('click', handleClickOutside);
        });

        return {
            dropdown,
            isDropdownOpen,
            handleLogout,
            toggleDropdown
        };
    }
});
</script>

<style scoped>
.show {
    display: block;
}

.dropdown-menu {
    display: none;
}

.dropdown.show .dropdown-menu {
    display: block;
}
</style>