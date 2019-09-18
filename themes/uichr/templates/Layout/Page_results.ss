<main class="main" role="main">
	<header class="page-header">
		<div class="container">
			<h1 class="page-title">$Title</h1>
			<% if $ClassName != "HomePage" %>$Breadcrumbs<% end_if %>
		</div>
	</header>
	<section class="container page-content">
		<div class="row">
			<!-- Main Content -->
			<h3 id="main-content" class="sr-only" tabindex="-1">Main Content</h3>
			<div class="<% if $Children || $Parent %>col-lg-8 children<% else %>col-md-10 col-md-offset-1<% end_if %>">
					<% if $Query %>
					<p class="searchQuery">You searched for <strong>&quot;{$Query}&quot;</strong></p>
				<% end_if %>

				<% if $Results %>
				<ul id="SearchResults">
					<% loop $Results %>
					<li class="clearfix">
						<p><strong class="results-title"><a href="$Link">
								<% if $MenuTitle %>
								$MenuTitle
								<% else %>
								$Title
								<% end_if %>
							</a></strong>
						<br>
						<% if $Content %>
							$Content.Summary(50)
						<% end_if %>
						</p>
						<div class="results-url">$AbsoluteLink</div>


						<!-- <a class="readMoreLink" href="$Link" title="Read more about &quot;{$Title}&quot;">Read more about &quot;{$Title}&quot;...</a> -->

					</li>
					<% end_loop %>
				</ul>
				<% else %>
				<p>Sorry, your search query did not return any results.</p>
				<% end_if %>

				<% if $Results.MoreThanOnePage %>
				<div id="PageNumbers">
					<ul class="clearfix pagination" role="menubar" aria-label="Pagination">
						<% if $Results.NotFirstPage %>
							<li class="arrow">
								<a href="$Results.PrevLink" title="View the previous page">&laquo; Previous</a>
							</li>
						<% end_if %>

						<% loop $Results.Pages %>
							<% if $CurrentBool %>
								<li class="current"><a href="">$PageNum</a></li>
							<% else %>
								<li>
									<a href="$Link" title="View page number $PageNum" class="go-to-page">$PageNum</a>
								</li>
							<% end_if %>
						<% end_loop %>

						<% if $Results.NotLastPage %>
							<li class="arrow">
								<a href="$Results.NextLink" title="View the next page">Next &raquo;</a>
							</li>
						<% end_if %>
					</ul>
					<p>Page $Results.CurrentPage of $Results.TotalPages</p>
				</div>
				<% end_if %>
			</div><!-- end .col -->

			<!-- Side Bar -->
			<% if $Children || $Parent %><%--Determine if Side Nav should be rendered, you can change this logic --%>
				<% include SideBar %>
			<% end_if %>
		</div><!-- end .row -->
	</section>
</main><!-- end .container -->