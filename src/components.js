Vue.component('restaurant-card', {
	props: ['name','phone','rating','url','image','distance','location'],
	template: `
	<div>
  <b-card :title="name"
          :img-src="image"
          :img-alt="name"
          img-top
          tag="article"
          style="max-width: 20rem;"
          class="mb-2">
	<p class="card-text">
      Phone Number: {{phone}}
	</p>
	<p class="card-text">
      Rating: {{rating}}
	</p>
	<p class="card-text">
      It's only {{(distance/1609.344).toFixed(2)}} miles away
	</p>
    <b-button target='_blank' :href="url" variant="primary">Reviews</b-button>
  </b-card>
</div>
	`
});