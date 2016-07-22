<div class="col-lg-4 sidebar">

	<% if Menu(2) %>
		<h4 id="handle2">Navigation</h4>
		<nav class="subnavigation" data-navigation-handle="#handle2">
			<% if Menu(2) %>
				<% with Level(1) %>
					<h3 class="section-title">
						<% if $LinkOrCurrent = "current" %>$MenuTitle<% else %><a href="$Link">$MenuTitle</a><% end_if %>
					</h3>
				<% end_with %>
			<% end_if %>
			<ul class="unstyled first-level">
				<% loop Menu(2) %>
					<li class="$LinkingMode"><a href="$Link">$MenuTitle</a>

					<%-- second level nav --%>
					<% if $LinkOrSection = "section" && Children %>
						<ul class="unstyled second-level">
							<% loop Children %>
								<li class="$LinkingMode">
									<a href="$Link">$MenuTitle</a>

									<%-- third level nav --%>
									<% if $LinkOrSection = "section" && Children %>
										<ul class="unstyled third-level">
											<% loop Children %>
												<li class="$LinkingMode">
													<a href="$Link">$MenuTitle</a>
												</li>
											<% end_loop %>
										</ul>
									<% end_if %>
									<%-- end third level --%>

								</li>
							<% end_loop %>
						</ul>
					<% end_if %>
					<%-- end second level --%>

					</li>
				<% end_loop %>

			</ul>
		</nav>
	<% end_if %>
</div>