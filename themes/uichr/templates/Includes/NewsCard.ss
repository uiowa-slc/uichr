<div class="newscard clearfix <% if $Photo %>withphoto<% end_if %>">

	<%-- Featured Image --%>
		<% if $FeaturedImage %>
			<img src="$FeaturedImage.SetWidth(150).URL" alt="$Title Featured Image" class="newscard-featured right">
		<% end_if %>

	<%-- Title --%>
	<h4 class="newscard-title">
		<a href="$Link">$Title</a>
	</h4>

	<%-- Meta --%>
	<p class="newscard-meta">
		<% if $Credits %>
			<span class="author">by
			<% loop $Credits %><% if not $First && not $Last %>, <% end_if %><% if not $First && $Last %> and <% end_if %><% if $URLSegment %><a href="$URL">$Name.XML</a><% else %>$Name.XML<% end_if %><% end_loop %> <span class="bar">|</span> </span>
		<% end_if %>
		<span class="date">$PublishDate.format("F d, Y")</span>
		<% if $Categories.exists %>
			<span class="bar">|</span>
			<% loop $Categories %>
				<a href="$Link" title="$Title">$Title</a><% if not Last %>, <% else %><% end_if %>
			<% end_loop %>
		<% end_if %>

		<% if $Tags.exists %>
			<span class="bar">|</span> Tagged:
			<% loop $Tags %>
				<a href="$Link" title="$Title">$Title</a><% if not Last %>, <% else %><% end_if %>
			<% end_loop %>
		<% end_if %>
	</p>

	<div class="clearfix newscard-content">
		<%-- Content Summary --%>
		<% if $Summary %>
			<p class="newscard-summary">$Summary
		<% else %>
			<p class="newscard-summary">$Content.LimitCharacters(250)
		<% end_if %>
			<a href="$Link">
				Read more
			</a>
		</p>
	</div>

</div>