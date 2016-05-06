<div class="naver">

	<div class="subnavigation">

		<%-- <h4 id="handle2">Navigation</h4> --%>
		<%-- <% if Menu(2) %>
			<% with Level(1) %>
				<h3 class="section-title">
					<% if $LinkOrCurrent = "current" %>$MenuTitle<% else %><a href="$Link">$MenuTitle</a><% end_if %>
				</h3>
			<% end_with %>
		<% end_if %> --%>

<% if Menu(2) %>

<nav class="block sec-nav current" data-navigation-handle="#handle2">
	<% if Menu(2) %>
		<% with Level(1) %>
			<h5 class="section-title">
				<% if $LinkOrCurrent = "current" %>$MenuTitle<% else %><a href="$Link">$MenuTitle</a><% end_if %>
			</h5>
		<% end_with %>
	<% end_if %>
	<ul class="first-level">
			<% loop Menu(2) %>
				<li <% if LinkOrSection = section || current %>class="active"<% end_if %>><a href="$Link">$MenuTitle</a>

				<%-- third level nav option 1 --%>
					<% if $LinkOrSection = "section" && Children %>
						<ul class="second-level">
							<% loop Children %>
								<li <% if $LinkOrCurrent = "current" %>class="active"<% end_if %>>
									<a href="$Link">$MenuTitle</a>
									<% if $LinkOrSection = "section" && Children %>
										<ul class="third-level">
											<% loop Children %>
												<li <% if $LinkOrCurrent = "current" %>class="active"<% end_if %>>
													<a href="$Link">$MenuTitle</a>
												</li>
											<% end_loop %>
										</ul>
									<% end_if %>

								</li>
							<% end_loop %>
						</ul>
					<% end_if %>

				<%-- end third level nav option 1 --%>

				</li>
			<% end_loop %>

	</ul>
</nav>
<% end_if %>

	</div><!-- end .subnavigation -->
</div><!-- end Naver -->