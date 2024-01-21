<template>
    <div class="component-radio">
        <input id="checkbox" class="radio" type="checkbox" :checked="value" @change="updateValue" ref="checkbox">
        <label for="checkbox"></label>
    </div>
</template>

<script>
export default {
    name: 'ToggleSwitch',

    props: {
        value: {
            type: Boolean,
            require: true,
        },
    },

    data() {
        return {
            on: false
        }
    },

    methods: {
        updateValue() {
            this.$emit( 'input', this.$refs.checkbox.checked );
        }
    },

    computed: {

    }
}
</script>

<style scoped>
.component-radio {
	position: relative;
}

.component-radio .radio {
	position: absolute;
	opacity: 0;
	z-index: 0;
}

.component-radio .radio + label {
	position: relative;
	display: inline-flex;
	width: 80px;
	height: 30px;
	border-radius: 30px;
	border: 2px solid rgba(255, 255, 255, 0.5);
	cursor: pointer;
	transition: all 0.4s;
}

.component-radio .radio + label::after {
	font-family: 'Barlow Condensed', sans-serif;
	font-weight: 400;
	content: '';
	color: rgba(79, 79, 79, 0.5);
	display: block;
	width: 22px;
	height: 22px;
	border: 2px solid rgba(255, 255, 255, 0.4);
	border-radius: 50%;
	position: absolute;
	left: 2px;
	top: 2px;
	text-align: center;
	line-height: 22px;
	font-size: 12px;
	transition: all 0.4s;
}

.component-radio .radio:checked + label {
	border: 2px solid rgba(255, 255, 255, 0.6);
	background: rgba(0, 200, 0, 0.2);
	box-shadow: 0 0 3px 0 rgba(100, 100, 100, 0.25);
}

.component-radio .radio:checked + label::after {
	color: rgba(255, 255, 255, 1);
	left: calc(100% - 28px);
	border: 2px solid rgba(255, 255, 255, 0.8);
	background: rgba(0, 0, 0, 0.1);
	transform: rotate(360deg);
}

a {
	display: inline-block;
	cursor: pointer;
	text-decoration: none;
	text-transform: uppercase;
	font-size: 12px;
	padding: 0 4px 7px;
	margin-top: 40px;
	user-select: none;
	position: relative;
	transition: all 0.2s;
}

a::after {
	position: absolute;
	opacity: 0;
	content: '';
	left: 50%;
	bottom: 0;
	width: 0;
	height: 2px;
	background: #efefef;
	transition: all 0.2s;
}

a:hover {
	color: white;
}

a:hover::after {
	left: 0;
	opacity: 1;
	width: 100%;
}
</style>