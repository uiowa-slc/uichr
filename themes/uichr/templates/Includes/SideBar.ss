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

</div>