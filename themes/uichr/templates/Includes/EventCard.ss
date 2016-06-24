<div class="eventcard">

	<%-- image --%>
	<div class="eventcard-imgwrap">
		<% if $Image %>
			<div style="background-image: url($Image.URL);"></div>
			<%-- <img src="$Image.URL" alt="$Title" class="eventcard-img"> --%>
		<% else_if $Venue.ImageURL %>
			<div style="background-image: url($Venue.ImageURL);"></div>
			<%-- <img src="$Venue.ImageURL" alt="$Venue.Title" class="eventcard-img"> --%>
		<% else %>
			<div style="background-image: url({$ThemeDir}/images/LocalistEventPlaceholder.jpg);"></div>
			<%-- <img src="{$ThemeDir}/images/LocalistEventPlaceholder.jpg" alt="$Title" class="eventcard-img"> --%>
		<% end_if %>
	</div>

	<div class="clearfix eventcard-content">
		<h4 class="eventcard-title">
			<a href="$Link">
				<span>$Title</span><% if Event.CancelReason %>
				<div class="homepage-cancel-reason">
					Note: $Event.CancelReason</div><% end_if %>
			</a>
		</h4>

		<%-- Dates --%>
		<% if $Dates %>
			<p class="eventcard-dates">
				<% loop $Dates.Limit(1) %>
					<% include DateTimesList %>
				<% end_loop %>
			</p>
		<% else %>
				No upcoming dates.
		<% end_if %>

		<%-- Venue --%>
		<% if $Venue %>
			<p class="eventcard-venue">
				$Venue.Title
			</p>
		<% end_if %>

		<%-- Summary --%>
		<p class="eventcard-summary">$Content.Summary(30)</p>

		<p class="eventcard-btn">
			<%-- <a href="$Link" class="btn btn-default">View Event</a> --%>
			<a class="btn btn-default btn-sm" href="$Link">View Event</a>
		</p>
	</div>
</div>

