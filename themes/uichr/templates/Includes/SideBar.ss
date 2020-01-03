<div class="col-lg-4 sidebar">

	<%-- show event types --%>
	<% if $ID == 9 %>
	<%-- debugging event by type, disabling for now --%>
<%-- 		<div class="WidgetHolder">
			<h3>Event By Type</h3>
			<ul>
				<% loop $TrendingTypes.Limit(5) %>
					<li><a href = "$Link(false)" class="tag">$Title.LimitCharacters(20)</a></li>
				<% end_loop %>
			</ul>
		</div> --%>
	<% end_if %>

	<%-- Related News Posts --%>
	<% include RelatedNewsEntries %>

	<%-- include blog widgets --%>
	<% if $SideBarView %>
		$SideBarView
	<% end_if %>

	<%-- upcoming events --%>
	<%-- <% with $Page(events) %>
		<% if $EventList %>
			<div class="WidgetHolder">
				<h3>Upcoming Events</h3>
				<ul>
				<% loop $EventList.Limit(2) %>
					<li>
						<a href="$Link">$Title</a>
						<% loop $Dates %>
							<span class="date-time">
								<% with $StartDateTime %>
									$Format(F) $Format(j)
								<% end_with %>
								<% if $EndDate %>
									until
									<% with $EndDate %>
										$Format(F) $Format(j)
									<% end_with %>
								<% end_if %>
							</span>
						<% end_loop %>
					</li>
				<% end_loop %>
				</ul>
			</div>
		<% end_if %>
	<% end_with %> --%>

	<%-- show Facebook plugin if on Events url --%>
	<% if $URLSegment="events" %>
		<div id="fb-root"></div>
		<script async defer crossorigin="anonymous" src="https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v5.0"></script>
		<div class="fb-page" data-href="https://www.facebook.com/UI-Center-for-Human-Rights-180457093913/" data-tabs="timeline" data-width="" data-height="" data-small-header="false" data-adapt-container-width="true" data-hide-cover="false" data-show-facepile="false"><blockquote cite="https://www.facebook.com/UI-Center-for-Human-Rights-180457093913/" class="fb-xfbml-parse-ignore"><a href="https://www.facebook.com/UI-Center-for-Human-Rights-180457093913/">UI Center for Human Rights</a></blockquote></div>
	<% end_if %>

</div>