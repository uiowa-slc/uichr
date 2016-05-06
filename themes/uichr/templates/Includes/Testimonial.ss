<% if $TestimonialQuote %>
<div class="testimonial">
	<% if $TestimonialPhoto %><img src="$TestimonialPhoto.CroppedFocusedImage(200,200).URL" alt="$TestimonialName"><% end_if %>
	<% if $TestimonialName %><p class="cite">$TestimonialName<% if $TestimonialAttribution %><em>$TestimonialAttribution</em><% end_if %></p><% end_if %>
	<% if $TestimonialQuote %><p class="quote">"$TestimonialQuote"</p><% end_if %>

</div>
<% end_if %>