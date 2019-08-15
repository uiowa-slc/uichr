<% if $TestimonialQuote %>
	<blockquote class="testimonial">
		<% if $TestimonialPhoto %>
			<img src="$TestimonialPhoto.FocusFill(200,200).URL" alt="Testimony from $TestimonialName">
		<% end_if %>
		<% if $TestimonialName %>
			<footer>
				<cite class="cite">
					$TestimonialName
					<% if $TestimonialAttribution %><em>$TestimonialAttribution</em><% end_if %>
				</cite>
			</footer>
		<% end_if %>
		<% if $TestimonialQuote %>
			<p class="quote">"$TestimonialQuote"</p>
		<% end_if %>
	</blockquote>
<% end_if %>