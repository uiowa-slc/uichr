<% if $PhotoEntries %>
	<section class="photogallery">
		<div class="photogallery-header">
			<h4>Gallery</h4>
			<h3>$Title</h3>
		</div>
		<div class="photogallery-flickity">
			<% loop $PhotoEntries %>
				<div class="gallery-cell">
					<div class="scale">
						<img data-flickity-lazyload="$Photo.CroppedFocusedImage(900,600).URL" alt="<% if $ImageCaption %>$ImageCaption<% end_if %>">
						<% if $ImageCaption %>
							<p class="photogallery-caption">$ImageCaption</p>
						<% end_if %>
					</div>
				</div>
			<% end_loop %>
		</div>
	</section>
<% end_if %>