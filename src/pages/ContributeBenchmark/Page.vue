<template>
	<q-page
		padding
		id="app-contribute-benchmark"
		class="column justify-center content-center"
	>
		<div
			class="full-width"
			style="max-width: 800px"
		>
			<div class="row">
				<div class="col-12">
					<q-form>
						<div class="text-h5 q-mb-lg">Contribute Benchmark</div>
						<q-input
							class="q-mt-lg"
							stack-label
							label="Benchmark Name"
							placeholder="Please input English, numbers, or characters+. -_ ( )"
							name="benchmark-name"
							v-model="form.name"
							square
							filled
						></q-input>

						<q-select
							class="q-mt-lg"
							stack-label
							label="Leaderboard"
							emit-value
							map-options
							name="benchmark-leaderborad"
							:options="leaderboardOptionList"
							v-model="form.leaderboard"
							square
							filled
						></q-select>

						<q-input
							class="q-mt-lg"
							stack-label
							label="Organization"
							placeholder="Please input the name of release organization"
							name="benchmark-organization"
							v-model="form.organization"
							square
							filled
						></q-input>

						<q-input
							class="q-mt-lg"
							stack-label
							label="Release Time"
							placeholder="Please input the name of release organization"
							name="benchmark-organization"
							v-model="form.releasedAt"
							square
							filled
						></q-input>

						<q-input
							class="q-mt-lg"
							stack-label
							label="Repository"
							placeholder="Please input the name of release organization"
							name="benchmark-organization"
							v-model="form.repository"
							square
							filled
						></q-input>

						<q-input
							class="q-mt-lg"
							stack-label
							label="Paper"
							placeholder="Please input the name of release organization"
							name="benchmark-organization"
							v-model="form.paper"
							square
							filled
						></q-input>

						<q-input
							class="q-mt-lg"
							stack-label
							label="Website"
							placeholder="Please input the name of release organization"
							name="benchmark-organization"
							v-model="form.website"
							square
							filled
						></q-input>

						<q-input
							class="q-mt-lg"
							type="textarea"
							stack-label
							label="Introduction(English)"
							placeholder="Please input the name of release organization"
							name="benchmark-organization"
							v-model="form.introduction.enUS"
							square
							filled
						></q-input>

						<q-input
							class="q-mt-lg"
							type="textarea"
							stack-label
							label="Introduction(Chinese)"
							placeholder="Please input the name of release organization"
							name="benchmark-organization"
							v-model="form.introduction.zhCN"
							square
							filled
						></q-input>

						<q-separator class="q-my-md" />

						<q-list>
							<q-item>
								<q-item-section class="col-shrink">
									<q-radio
										v-model="accessibility"
										val="public"
									></q-radio>
								</q-item-section>
								<q-item-section class="col-shrink">
									<q-icon
										name="public"
										class="text-h4"
									/>
								</q-item-section>

								<q-item-section>
									<q-item-label>Public</q-item-label>
									<q-item-label
										caption
										lines="2"
										>Improving the introduction of benchmarks can accelerate the
										approval process</q-item-label
									>
								</q-item-section>
							</q-item>

							<q-item>
								<q-item-section class="col-shrink">
									<q-radio
										v-model="accessibility"
										val="private"
									></q-radio>
								</q-item-section>
								<q-item-section class="col-shrink">
									<q-icon
										name="lock"
										class="text-h4"
									/>
								</q-item-section>

								<q-item-section>
									<q-item-label>Private</q-item-label>
									<q-item-label
										caption
										lines="2"
										>Private benchmark are visible only to the author，And
										benchmark can still be made public after
										created</q-item-label
									>
								</q-item-section>
							</q-item>
						</q-list>

						<q-space class="q-my-xl"></q-space>

						<div class="row q-col-gutter-lg">
							<div class="col-6">
								<q-btn
									class="full-width no-shadow"
									label="Create"
									square
									unelevated
									color="indigo-10"
								></q-btn>
							</div>
							<div class="col-6">
								<q-btn
									class="full-width no-shadow"
									label="Cancel"
									square
									unelevated
									outline
									color="indigo-10"
								></q-btn>
							</div>
						</div>
					</q-form>
				</div>
			</div>
		</div>
	</q-page>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';

const form = reactive<{
	name: string | null;
	leaderboard: '2D' | '3D' | null;
	organization: string | null;
	releasedAt: string | null;
	repository: string | null;
	paper: string | null;
	website: string | null;
	introduction: {
		enUS: string | null;
		zhCN: string | null;
	};
}>({
	name: null,
	leaderboard: null,
	organization: null,
	releasedAt: null,
	repository: null,
	paper: null,
	website: null,
	introduction: {
		enUS: null,
		zhCN: null,
	},
});

const accessibility = ref<'public' | 'private'>('public');

const leaderboardOptionList = [
	{
		label: 'Please select leaderboard',
		value: null,
	},
	{
		label: 'Embodied QA Leaderboard',
		value: 'qa',
	},
	{
		label: 'Embodied Navigation Leaderboard',
		value: 'navigation',
	},
	{
		label: 'Embodied Task Planning Leaderboard',
		value: 'taskPlanning',
	},
];

defineOptions({ name: 'AppContributeBenchmarkPage' });
</script>
