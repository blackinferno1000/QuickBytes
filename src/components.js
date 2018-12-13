Vue.component('restaurant-card', {
	props: ['name','phone','rating','url','imageURL','distance','location'],
	template: `
	<div>
  <b-card title="{{name}}"
          img-src="{{imageURL}}"
          img-alt="{{name}}"
          img-top
          tag="article"
          style="max-width: 20rem;"
          class="mb-2">
    <p class="card-text">
      {{location.display_address[0]}}
	</p>
	<p class="card-text">
      {{location.display_address[1]}}
	</p>
	<p class="card-text">
      Phone Number: {{phone}}
	</p>
	<p class="card-text">
      Rating: {{rating}}
	</p>
	<p class="card-text">
      It's only {{distance/1609.344}} miles away
	</p>
    <b-button href="{{url}}" variant="primary">Reviews</b-button>
  </b-card>
</div>
	`
});