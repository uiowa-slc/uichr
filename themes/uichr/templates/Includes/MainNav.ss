<div class="headertest">
	<div class="container">
		<div class="test clearfix">
			<a href="{$BaseHref}" class="logo">
				<img src="{$ThemeDir}/images/UICHR-logo.png" alt="Youth Ballet">
			</a>
			<nav id="dawgdrops" role="navigation" aria-label="Main menu" class="nav-wrapper">
				<ul class="nav-menu main-nav">
					<% loop Menu(1) %>
						<li class="nav-item $FirstLast<% if $LinkOrSection = "section" %> active<% end_if %><% if Children %> parent<% end_if %>"><a href="$Link">$MenuTitle</a>
							<% if Children %>
								<ul class="sub-nav">
									<% loop Children %>
										<li class="$FirstLast <% if $LinkOrCurrent = "current" %>active<% end_if %>"><a href="$Link">$MenuTitle</a></li>
									<% end_loop %>
								</ul>
							<% end_if %>
						</li>
					<% end_loop %>
				</ul>
			</nav>
			<%-- <nav role="navigation" class="nav-wrapper no-print" aria-label="Main menu">
				<ul class="main-nav clearfix">
					<% loop Menu(1) %>
						<li class="$FirstLast<% if $LinkOrSection = "section" %> active<% end_if %><% if Children %> parent<% end_if %>"><a href="$Link">$MenuTitle</a>
							<% if Children %>
								<ul>
									<% loop Children %>
										<li class="$FirstLast <% if $LinkOrCurrent = "current" %>active<% end_if %>"><a href="$Link">$MenuTitle</a></li>
									<% end_loop %>
								</ul>
							<% end_if %>
						</li>
					<% end_loop %>
				</ul>
			</nav> --%>
		</div>
		<% if $ClassName != "HomePage" %>$Breadcrumbs<% end_if %>
	</div>
</div>