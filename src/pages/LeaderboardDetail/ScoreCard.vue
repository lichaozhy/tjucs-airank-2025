<template>
	<q-card square>
		<q-item class="card-header justify-between">
			<slot name="header"></slot>
		</q-item>
		<slot></slot>
	</q-card>
</template>
