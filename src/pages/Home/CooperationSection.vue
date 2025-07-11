<template>
	<div
		id="app-home-cooperation"
		class="text-white column content-center justify-center q-pa-xl relative-position items-center"
	>
		<h2 class="text-weight-medium text-center text-uppercase">
			{{ SECTION.TITLE }}
		</h2>

		<p class="text-body1 text-weight-light">{{ SECTION.CONTACT }}</p>
		<q-btn
			flat
			:href="`mailto:${SECTION.EMAIL}`"
			no-caps
			>{{ SECTION.EMAIL }}</q-btn
		>

		<div class="app-max-width-1680 q-my-xl q-py-lg full-width">
			<div class="row justify-center q-col-gutter-xl">
				<div
					class="col-2"
					v-for="(partner, index) in PARTNERS"
					:key="index"
				>
					<q-card
						class="text-center q-pa-md"
						style="background-color: rgba(255, 255, 255, 0.2)"
						square
						flat
					>
						<q-card-section>
							<q-avatar
								size="96px"
								square
							>
								<q-img :src="partner.SRC"></q-img>
							</q-avatar>
						</q-card-section>
						<q-card-section class="text-h6">
							{{ partner.NAME }}
						</q-card-section>
					</q-card>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
const SECTION = {
	TITLE: 'Partners',
	CONTACT:
		'If you are interested in cooperation, please contact us via email: ',
	EMAIL: 'fei_ni@tju.edu.cn',
};

const PARTNERS = [
	{
		SRC: '/partner/Huawei_Standard_logo.svg',
		NAME: '华为',
	},
	{
		SRC: '/partner/Huawei_Standard_logo.svg',
		NAME: '中山大学',
	},
];

defineOptions({ name: 'AppPageHomeSectionCooperation' });
</script>

<style>
#app-home-cooperation {
	background: #2a799b;
	background: radial-gradient(
		circle,
		rgba(26, 35, 126, 0.61) 0%,
		rgba(26, 35, 126, 1) 70%
	);
}
</style>
