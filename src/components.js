Vue.component('joke-display',{
	props: ['joke'],
	template: `
	<div>
	<h4>Question:</h4>
	<p>{{joke.q}}</p>
	<h4>Answer:</h4>
	<p>{{joke.a}}</p>
	</div>
	`
});